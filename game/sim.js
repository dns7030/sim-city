// Simulation: state, placement, growth, monthly economy.
const SAVE_KEY = 'gorod-save-v1', SETTINGS_KEY = 'gorod-settings';
// seasonMin: real minutes per season at 1x speed (1-100). lock: -1 = automatic cycle, else 0..3 forces that season.
let settings = { seasonMin: 5, lock: -1 };
try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')); } catch (e) {}
function saveSettings() { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} }
let S = null;
const idx = (x, y) => y * MAP + x;
const inMap = (x, y) => x >= 0 && y >= 0 && x < MAP && y < MAP;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pick = a => a[Math.floor(Math.random() * a.length)];

function noiseAt(x, y, ph) {
  return Math.sin(x * .19 + ph[0]) * Math.sin(y * .16 + ph[1]) + .6 * Math.sin(x * .41 + ph[2] + y * .13) * Math.sin(y * .37 + ph[3] - x * .09) + .35 * Math.sin((x + y) * .23 + ph[4]);
}
function newState(biome = 'taiga') {
  const n = MAP * MAP, B = BIOMES[biome];
  const s = { biome, ter: new Uint8Array(n), tree: new Uint8Array(n), rock: new Uint8Array(n), road: new Uint8Array(n), zone: new Uint8Array(n),
    bmap: new Int32Array(n).fill(-1), blds: [], money: 60000, day: 0, rate: 9, speed: 1, seasonClock: 0,
    cov: {}, roadNear: new Uint8Array(n), stats: {}, last: { inc: 0, exp: 0, tax: 0, biz: 0, tour: 0, roads: 0, up: 0 }, log: [], drawDirty: true, covDirty: true };
  const phase = Math.random() * 6, ph = [0, 1, 2, 3, 4].map(() => Math.random() * 6.28), c = (MAP - 1) / 2;
  for (let y = 0; y < MAP; y++) for (let x = 0; x < MAP; x++) {
    const i = idx(x, y), rx = MAP * B.river.x + Math.sin(y * .13 + phase) * B.river.amp * .6 + Math.sin(y * .31 + phase * 2) * 2;
    if (Math.abs(x - rx) < B.river.w) s.ter[i] = 1;
    const d = Math.hypot(x - MAP * B.lake.x, y - MAP * B.lake.y) + Math.sin(x * .7 + y * .5) * .8; if (d < B.lake.r) s.ter[i] = 1;
  }
  for (let y = 0; y < MAP; y++) for (let x = 0; x < MAP; x++) {
    const i = idx(x, y); if (s.ter[i]) continue;
    const v = noiseAt(x, y, ph), centre = Math.hypot(x - c, y - c) < (biome === 'mountains' ? 7 : 11);
    if (!centre) { if (v > B.rock[1]) s.rock[i] = 2; else if (v > B.rock[0]) s.rock[i] = 1; }
    if (!s.rock[i] || s.rock[i] === 1) {
      const cluster = Math.sin(x * .4) * Math.sin(y * .37) > .3 ? 1.9 : 1;
      if (Math.random() < B.trees * cluster * (s.rock[i] ? .3 : 1)) { let r = Math.random(), t = B.treeKinds[0][0]; for (const [k, p] of B.treeKinds) { if (r < p) { t = k; break; } r -= p; } s.tree[i] = t; }
    }
  }
  ['edu', 'health', 'cult', 'happy', 'transit', 'police', 'fire', 'poll'].forEach(k => s.cov[k] = new Float32Array(n));
  s.cov.lv = new Float32Array(n);
  s.stats = { pop: 0, jobs: 0, jobsC: 0, jobsI: 0, happy: 50, gen: 0, use: 0, dem: { 1: .5, 2: .2, 3: .3 }, avgOcc: 1, unemp: 0 };
  return s;
}
function placeResources() {
  const B = BIOMES[S.biome], placed = [], c = (MAP - 1) / 2;
  B.res.forEach(([key, count]) => { const d = DEF[N[key]];
    for (let k = 0; k < count; k++) for (let tries = 0; tries < 300; tries++) {
      const ax = 3 + Math.floor(Math.random() * (MAP - 8)), ay = 3 + Math.floor(Math.random() * (MAP - 8)), dc = Math.hypot(ax - c, ay - c);
      if (dc < 10 || dc > 30 || !canPlace(d, ax, ay) || placed.some(p => Math.hypot(p[0] - ax, p[1] - ay) < 9)) continue;
      addBuilding(d, ax, ay); placed.push([ax, ay]); break; } });
}
function seasonIdx() { if (settings.lock >= 0) return settings.lock; return (1 + Math.floor(S.seasonClock / (clamp(settings.seasonMin, 1, 100) * 60000))) % 4; }

function toast(msg) { if (typeof showToast === 'function') showToast(msg); }
function bAt(x, y) { return inMap(x, y) && S.bmap[idx(x, y)] >= 0 ? S.blds[S.bmap[idx(x, y)]] : null; }

function canBuildTile(x, y) { if (!inMap(x, y)) return false; const i = idx(x, y); return !S.ter[i] && !S.rock[i] && !S.road[i] && S.bmap[i] < 0; }
function canPlace(d, ax, ay) {
  for (let y = ay; y < ay + d.d; y++) for (let x = ax; x < ax + d.w; x++) if (!canBuildTile(x, y)) return false;
  return true;
}
function addBuilding(d, ax, ay) {
  const b = { name: d.name, x: ax, y: ay, w: d.w, d: d.d, occ: d.kind === 'R' ? .3 : 1, age: 0 };
  const id = S.blds.length; S.blds.push(b);
  for (let y = ay; y < ay + d.d; y++) for (let x = ax; x < ax + d.w; x++) { const i = idx(x, y); S.bmap[i] = id; S.tree[i] = 0; }
  S.drawDirty = true; S.covDirty = true; return b;
}
function placeBuilding(name, ax, ay) {
  const d = DEF[name];
  if (!canPlace(d, ax, ay)) return false;
  if (S.money < d.cost) { toast('Not enough money'); return false; }
  S.money -= d.cost; addBuilding(d, ax, ay); return true;
}
function removeBuildingAt(x, y) {
  const id = S.bmap[idx(x, y)]; if (id < 0) return false;
  const b = S.blds[id];
  for (let yy = b.y; yy < b.y + b.d; yy++) for (let xx = b.x; xx < b.x + b.w; xx++) S.bmap[idx(xx, yy)] = -1;
  S.blds[id] = null; S.drawDirty = true; S.covDirty = true; return true;
}
function paintRoad(x, y) {
  const i = idx(x, y); if (!inMap(x, y) || S.rock[i] || S.road[i] || S.bmap[i] >= 0) return false;
  const c = S.ter[i] ? COST.bridge : COST.road;
  if (S.money < c) { toast('Not enough money'); return false; }
  S.money -= c; S.road[i] = 1; S.zone[i] = 0; S.tree[i] = 0; S.drawDirty = true; S.covDirty = true; return true;
}
function paintZone(x, y, z) {
  const i = idx(x, y); if (!inMap(x, y) || S.ter[i] || S.rock[i] || S.road[i] || S.bmap[i] >= 0 || S.zone[i] === z) return false;
  if (S.money < COST.zone) return false;
  S.money -= COST.zone; S.zone[i] = z; if (S.tree[i]) { S.tree[i] = 0; S.drawDirty = true; } return true;
}
function bulldoze(x, y) {
  if (!inMap(x, y)) return false; const i = idx(x, y);
  if (S.bmap[i] >= 0) { if (DEF[S.blds[S.bmap[i]].name].kind === 'X') { toast('Natural resource sites can\'t be removed'); return false; } if (S.money < COST.bulldozeBuilding) return false; S.money -= COST.bulldozeBuilding; return removeBuildingAt(x, y); }
  if (S.road[i]) { S.road[i] = 0; S.money -= COST.bulldoze; S.drawDirty = true; S.covDirty = true; return true; }
  if (S.tree[i]) { S.tree[i] = 0; S.drawDirty = true; return true; }
  if (S.zone[i]) { S.zone[i] = 0; return true; }
  return false;
}

// ---- coverage / land value ----
function addDisc(arr, cx, cy, r, v) {
  const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(MAP - 1, Math.ceil(cx + r)), y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(MAP - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x + .5 - cx, y + .5 - cy); if (d <= r) arr[idx(x, y)] += v * (1 - d / (r + 1)); }
}
function recompute() {
  const c = S.cov; for (const k in c) c[k].fill(0);
  for (const b of S.blds) { if (!b) continue; const d = DEF[b.name]; if (!d.r) continue;
    const cx = b.x + b.w / 2, cy = b.y + b.d / 2, f = d.kind === 'S' ? 1 : (b.occ || 1);
    ['edu', 'health', 'cult', 'happy', 'transit', 'police', 'fire'].forEach(k => { if (d[k]) addDisc(c[k], cx, cy, d.r, d[k]); });
    if (d.poll) addDisc(c.poll, cx, cy, d.r, d.poll * (d.kind === 'S' ? 1 : f)); }
  // roads near
  S.roadNear.fill(0);
  for (let y = 0; y < MAP; y++) for (let x = 0; x < MAP; x++) if (S.road[idx(x, y)])
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (inMap(x + dx, y + dy)) S.roadNear[idx(x + dx, y + dy)] = 1;
  for (let i = 0; i < MAP * MAP; i++) c.lv[i] = 25 + c.cult[i] * 10 + c.happy[i] * 10 + c.edu[i] * 6 + c.health[i] * 5 + c.transit[i] * 8 + (c.police[i] + c.fire[i]) * 3 - c.poll[i] * .6;
  S.covDirty = false;
}
function tierAt(z, i) {
  if (z === 3) { const p = S.stats.pop; return p > 3000 ? 3 : p > 1200 ? 2 : p > 300 ? 1 : 0; }
  const p = S.stats.pop;
  return clamp(Math.floor((S.cov.lv[i] - 25) / 12) + (p > 400 ? 1 : 0) + (p > 2500 ? 1 : 0), 0, 4);
}

// ---- growth ----
function fitsAt(d, ax, ay, z) {
  let near = false;
  for (let y = ay; y < ay + d.d; y++) for (let x = ax; x < ax + d.w; x++) {
    if (!canBuildTile(x, y) || S.zone[idx(x, y)] !== z) return false; if (S.roadNear[idx(x, y)]) near = true; }
  return near;
}
function tryGrow(z) {
  let x, y, i, ok = false;
  for (let k = 0; k < 40 && !ok; k++) { x = Math.floor(Math.random() * MAP); y = Math.floor(Math.random() * MAP); i = idx(x, y); ok = S.zone[i] === z && canBuildTile(x, y) && S.roadNear[i]; }
  if (!ok) return;
  const t = tierAt(z, i);
  const cands = ZONE_LIST[z].map(k => DEF[N[k]]).filter(d => d.tier <= t);
  const w = cands.map(d => 1 / (1 + (t - d.tier))), tot = w.reduce((a, b) => a + b, 0);
  const order = []; const pool = cands.slice(), wp = w.slice();
  while (pool.length) { let r = Math.random() * wp.reduce((a, b) => a + b, 0), k = 0; while (r > wp[k] && k < wp.length - 1) { r -= wp[k]; k++; } order.push(pool[k]); pool.splice(k, 1); wp.splice(k, 1); }
  for (const d of order) for (let dy = 0; dy < d.d; dy++) for (let dx = 0; dx < d.w; dx++) if (fitsAt(d, x - dx, y - dy, z)) { addBuilding(d, x - dx, y - dy); return; }
}

function tick() {
  S.day++;
  const st = S.stats, power = st.use <= 0 ? 1 : clamp(st.gen / st.use, 0, 1);
  for (const z of [1, 2, 3]) {
    const dm = st.dem[z]; if (dm <= .03) continue;
    const tries = 1 + Math.floor(dm * 4), p = power >= 1 ? 1 : power * power;
    if (st.happy < 25) continue;
    for (let k = 0; k < tries; k++) if (Math.random() < p) tryGrow(z);
  }
  if (S.day % 30 === 0) monthly();
}

function monthly() {
  recompute();
  const st = S.stats; let pop = 0, jobsC = 0, jobsI = 0, jobsS = 0, use = 0, gen = 0, capR = 0, tour = 0, up = 0, effC = 0, effI = 0;
  const resSites = S.blds.filter(b => b && DEF[b.name].kind === 'X');
  const bonusFor = (b, k) => Math.min(3, resSites.filter(r => DEF[r.name].boost === k && Math.hypot(r.x - b.x, r.y - b.y) <= 14).length) * .15;
  for (const b of S.blds) { if (!b) continue; const d = DEF[b.name];
    up += d.up; gen += d.gen; const i = idx(b.x, b.y);
    if (d.kind === 'R') { capR += d.cap; pop += Math.round(d.cap * b.occ); use += d.pw * (.3 + .7 * b.occ); }
    else { use += d.pw; if (d.kind === 'C') { jobsC += d.jobs; effC += d.jobs * (1 + bonusFor(b, 'C')); } else if (d.kind === 'I') { jobsI += d.jobs; effI += d.jobs * (1 + bonusFor(b, 'I')); } else jobsS += d.jobs;
      if (d.tour) tour += d.tour * (1 + S.cov.cult[i] * .4); } }
  const B = BIOMES[S.biome], sn = seasonIdx(); use *= sn === 0 && B.cold ? B.cold : (S.biome === 'desert' && sn === 2 ? 1.15 : 1);
  const jobs = jobsC + jobsI + jobsS, work = pop * .5, emp = Math.min(work, jobs), unemp = work > 0 ? (work - emp) / work : 0;
  const rate = S.rate, taxPen = Math.max(0, rate - 12) * 3 - Math.max(0, 7 - rate) * .5, power = use <= 0 ? 1 : clamp(gen / use, 0, 1);
  const powPen = (1 - power) * 40, uePen = unemp * 25;
  // residential occupancy & happiness
  let hw = 0, hp = 0, occSum = 0, occN = 0;
  for (const b of S.blds) { if (!b) continue; const d = DEF[b.name]; if (d.kind !== 'R') continue; const i = idx(b.x, b.y), c = S.cov;
    const sat = clamp(50 + c.edu[i] * 14 + c.health[i] * 14 + c.cult[i] * 12 + c.happy[i] * 10 + (c.police[i] + c.fire[i]) * 6 + c.transit[i] * 6 - c.poll[i] * .9, 0, 100);
    const g = sat - taxPen - uePen - powPen, target = clamp((g - 15) / 45, 0, 1);
    b.occ += (target - b.occ) * .3; b.g = g; hw += g * d.cap * b.occ; hp += d.cap * b.occ; occSum += b.occ; occN++; }
  const happy = hp > 0 ? hw / hp : 50 - taxPen - powPen;
  // finance
  const f = rate / 9, fill = jobs > 0 ? Math.min(1, work / jobs) : 0;
  const taxRes = pop * .9 * f, taxBiz = (effC * 1.1 + effI * 1.3) * fill * f, tourInc = tour * clamp(happy / 60, 0, 1.2);
  let roads = 0; for (let i = 0; i < MAP * MAP; i++) roads += S.road[i];
  const exp = roads * 1.2 + up, inc = taxRes + taxBiz + tourInc;
  S.money += inc - exp; S.last = { inc, exp, tax: taxRes, biz: taxBiz, tour: tourInc, roads: roads * 1.2, up };
  // demand
  const dm = {};
  const room = jobs + 80, dR = room > work ? (room - work) / (room + 100) : -(work - room) / (work + 100);
  dm[1] = clamp(dR - (occN ? (1 - occSum / occN) * .6 : 0) - (rate - 9) * .04, -1, 1);
  const idealC = pop * .18 + 10, idealI = pop * .28 + 20;
  dm[2] = clamp((idealC - jobsC) / (idealC + 60) - (rate - 9) * .03, -1, 1);
  dm[3] = clamp((idealI - jobsI) / (idealI + 60) - (rate - 9) * .03, -1, 1);
  S.stats = { pop, jobs, jobsC, jobsI, happy: clamp(happy, 0, 100), gen, use, dem: dm, avgOcc: occN ? occSum / occN : 1, unemp };
  S.log.push({ day: S.day, pop, money: Math.round(S.money) }); if (S.log.length > 240) S.log.shift();
  if (use > gen && use > 0 && S.day - (S.warnDay ?? -999) > 150) { toast('Power shortage! Build more power plants.'); S.warnDay = S.day; }
  if (S.money < 0) toast('The treasury is empty!');
  if ((S.day / 30) % 3 === 0) save();
}

function dateText() { const m = Math.floor(S.day / 30); return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m % 12]} ${1970 + Math.floor(m / 12)}`; }

function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify({ v: 2, clock: Math.round(S.seasonClock), biome: S.biome, rock: Array.from(S.rock), day: S.day, money: S.money, rate: S.rate, ter: Array.from(S.ter), tree: Array.from(S.tree), road: Array.from(S.road), zone: Array.from(S.zone),
  blds: S.blds.filter(Boolean).map(b => ({ n: b.name, x: b.x, y: b.y, o: +b.occ.toFixed(3) })) })); } catch (e) {} }
function load() {
  let raw; try { raw = localStorage.getItem(SAVE_KEY); } catch (e) {} if (!raw) return false;
  try { const d = JSON.parse(raw); if (d.v !== 2) return false; const s = newState(d.biome); s.rock.set(d.rock); s.day = d.day; s.seasonClock = d.clock || 0; s.money = d.money; s.rate = d.rate;
    s.ter.set(d.ter); s.tree.set(d.tree); s.road.set(d.road); s.zone.set(d.zone); S = s;
    d.blds.forEach(b => { const x = DEF[b.n]; if (x) addBuilding(x, b.x, b.y).occ = b.o; });
    const m = d.money; recompute(); monthly(); S.day = d.day; S.money = m; return true; } catch (e) { return false; }
}
function newGame(biome = 'taiga') { S = newState(biome); placeResources(); recompute(); }
