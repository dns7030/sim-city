// Rendering, input and HUD.
const SP = {}; sprites.forEach(s => { SP[s.name] = s; });
const view = document.getElementById('view'), g = view.getContext('2d');
const cam = { x: 0, y: 0, z: 1 };
let tool = { type: 'select' }, hover = null, selected = null, pressed = 0, lastTile = null, panning = null, dragged = false;
const DAY_MS = 450;

// ---------- sprite baking ----------
function bake(s) {
  const pad = 40, top = 300, W = (s.w + s.d) * HW + pad * 2, H = top + (s.w + s.d) * HH + 20;
  const c = document.createElement('canvas'); c.width = W; c.height = H; initCtx(c.getContext('2d'));
  OX = pad + s.d * HW; OY = top; s.draw();
  s.img = c; s.ox = OX; s.oy = OY;
  const px = c.getContext('2d').getImageData(0, 0, W, H).data; let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (px[(y * W + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  s.crop = { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
function initSprites() {
  sprites.forEach(bake);
  for (const k in DEF) { const s = SP[k]; if (!s) { console.warn('missing sprite', k); continue; } DEF[k].w = s.w; DEF[k].d = s.d; }
}

// ---------- geometry ----------
const P = (x, y) => [(x - y) * HW, (x + y) * HH];
function toTile(px, py) {
  const wx = (px - cam.x) / cam.z, wy = (py - cam.y) / cam.z - HH;
  const a = wy / HH, b = wx / HW; return [Math.round((a + b) / 2), Math.round((a - b) / 2)];
}
function diamond(x, y, w = 1, d = 1) {
  const p = [P(x, y), P(x + w, y), P(x + w, y + d), P(x, y + d)];
  g.beginPath(); g.moveTo(p[0][0], p[0][1]); for (let i = 1; i < 4; i++) g.lineTo(p[i][0], p[i][1]); g.closePath();
}
function quad(x, y, u0, v0, u1, v1, col) { diamond(x + u0, y + v0, u1 - u0, v1 - v0); g.fillStyle = col; g.fill(); }

// ---------- drawing ----------
const hexToRgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function mix(a, b, t) { const A = hexToRgb(a), B = hexToRgb(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
let palKey = '', PAL = null;
function getPal() {
  const sn = seasonIdx(), key = S.biome + sn; if (key === palKey) return PAL; palKey = key;
  const b = S.biome, B = BIOMES[b], tint = c => {
    if (b === 'desert') return [mix(c, '#e6dcc4', .2), mix(c, '#c9c07a', .15), c, c][sn];
    if (b === 'arctic') return [mix(c, '#f2f6f8', .92), mix(c, '#d0d6cc', .3), mix(c, '#8fa88c', .2), mix(c, '#d0d6cc', .3)][sn];
    return [mix(c, '#eef3f6', .88), mix(c, '#9fd06a', .18), c, mix(c, b === 'steppe' ? '#c4a24a' : '#b99a45', b === 'steppe' ? .4 : .45)][sn];
  };
  const base = b === 'desert' ? '#3f8fb0' : '#4a86b8';
  PAL = { ground: B.ground.map(tint), snow: sn === 0 && b !== 'desert' || b === 'arctic' && sn !== 2, sn,
    water: b !== 'desert' && (sn === 0 || b === 'arctic' && sn !== 2) ? '#bcd9e8' : sn === 3 ? mix(base, '#6a7f8a', .2) : sn === 1 ? mix(base, '#7fc0e0', .1) : base,
    ice: b !== 'desert' && (sn === 0 || b === 'arctic' && sn !== 2),
    rock: b === 'desert' ? ['#c9a56a', '#a88650'] : b === 'arctic' ? ['#9aa5ad', '#76828a'] : ['#8d8a85', '#6d6a66'] };
  return PAL;
}
function groundColor(x, y, i) {
  const P_ = getPal(); if (S.ter[i]) return P_.water;
  return P_.ground[(x * 7 + y * 13 + (x * y) % 5) % 5];
}
function drawTile(x, y, t) {
  const i = idx(x, y), col = groundColor(x, y, i);
  diamond(x, y); g.fillStyle = col; g.fill(); g.strokeStyle = col; g.lineWidth = 1; g.stroke();
  if (S.ter[i]) { const [wx, wy] = P(x, y); if (PAL.ice) { g.fillStyle = 'rgba(120,160,190,.35)'; g.fillRect(wx - 8 + (x * 5 + y * 3) % 7, wy + HH - 1, 12, 1); } else { const s = Math.sin(t / 700 + x * .9 + y * .6); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(wx - 9 + s * 4, wy + HH - 1, 14, 1.5); } }
  if (S.zone[i]) { diamond(x, y); g.fillStyle = ZONE_COLOR[S.zone[i]] + '55'; g.fill(); g.strokeStyle = ZONE_COLOR[S.zone[i]] + '88'; g.stroke(); }
  if (S.road[i]) drawRoad(x, y, i);
}
function drawRoad(x, y, i) {
  const r = (dx, dy) => inMap(x + dx, y + dy) && S.road[idx(x + dx, y + dy)];
  const px = r(1, 0), mx = r(-1, 0), py = r(0, 1), my = r(0, -1), bridge = S.ter[i], asph = '#5d6066';
  diamond(x, y); g.fillStyle = bridge ? '#9a9a92' : '#b4b3aa'; g.fill();
  const none = !(px || mx || py || my), lo = .22, hi = .78;
  quad(x, y, lo, lo, hi, hi, asph);
  if (px || none || mx) { if (px || none) quad(x, y, hi - .01, lo, 1, hi, asph); if (mx || none) quad(x, y, 0, lo, lo + .01, hi, asph); }
  if (py) quad(x, y, lo, hi - .01, hi, 1, asph); if (my) quad(x, y, lo, 0, hi, lo + .01, asph);
  const junction = (px || mx) && (py || my), dash = '#e4e3dc';
  if (!junction) {
    if (px || mx || none) { if (px || none) quad(x, y, .75, .485, .98, .515, dash); if (mx || none) quad(x, y, .02, .485, .25, .515, dash); }
    if (py) quad(x, y, .485, .75, .515, .98, dash); if (my) quad(x, y, .485, .02, .515, .25, dash);
  }
  if (bridge) { g.strokeStyle = '#e6e2d4'; g.lineWidth = 1.5; [[0, 0, 1, 0], [0, 1, 1, 1], [0, 0, 0, 1], [1, 0, 1, 1]].forEach(([a, b, c, d]) => { if (((a === 0 && c === 1 && b === d) && (px || mx)) || ((a === c) && (py || my))) { const p1 = P(x + a, y + b), p2 = P(x + c, y + d); g.beginPath(); g.moveTo(p1[0], p1[1]); g.lineTo(p2[0], p2[1]); g.stroke(); } }); }
}
function drawTree(x, y, type) {
  const [wx, wy] = P(x, y), cx = wx + ((x * 5 + y * 3) % 7 - 3), by = wy + HH + 4, h = (x * 31 + y * 17) % 7, sn = PAL.sn;
  if (type === 2) { // conifer
    g.fillStyle = '#4a3a2a'; g.fillRect(cx - 1.5, by - 6, 3, 6);
    const col = sn === 1 ? '#3a7a45' : '#2f5f3a'; [[11, 9, 0], [9, 8, 9], [6, 7, 17]].forEach(([w, hh, o], k) => {
      g.fillStyle = col; g.beginPath(); g.moveTo(cx - w, by - 6 - o); g.lineTo(cx, by - 6 - o - hh - 4); g.lineTo(cx + w, by - 6 - o); g.closePath(); g.fill();
      if (sn === 0 || PAL.snow) { g.fillStyle = '#eef3f6'; g.beginPath(); g.moveTo(cx - w * .55, by - 6 - o - hh * .45); g.lineTo(cx, by - 6 - o - hh - 4); g.lineTo(cx + w * .55, by - 6 - o - hh * .45); g.closePath(); g.fill(); } });
  } else if (type === 3) { // desert plant
    if (h === 0) { g.fillStyle = '#5f8a4a'; g.fillRect(cx - 2, by - 14, 4, 14); g.fillRect(cx - 7, by - 10, 3, 6); g.fillRect(cx - 7, by - 10, 6, 2.5); g.fillRect(cx + 4, by - 12, 3, 6); g.fillRect(cx + 1, by - 12, 6, 2.5); }
    else { sphere(cx - 3, by - 5, 5, '#8a9a5a'); sphere(cx + 3, by - 6, 6, '#a0a864'); if (sn === 1 && h % 2) { g.fillStyle = '#f0d848'; g.fillRect(cx + 1, by - 11, 2, 2); } }
  } else { // deciduous
    g.fillStyle = '#5a4630'; g.fillRect(cx - 1.5, by - 8, 3, 8);
    if (sn === 0) { g.strokeStyle = '#5a4630'; g.lineWidth = 1.2; [[-6, -16], [0, -20], [6, -16], [-3, -13], [4, -12]].forEach(([dx, dy]) => { g.beginPath(); g.moveTo(cx, by - 8); g.lineTo(cx + dx, by + dy); g.stroke(); }); g.fillStyle = '#eef3f6'; g.fillRect(cx - 7, by - 17, 3, 2); g.fillRect(cx - 1, by - 21, 3, 2); g.fillRect(cx + 5, by - 17, 3, 2); }
    else { const c = sn === 1 ? ['#7fc060', '#9ad474'] : sn === 3 ? [['#c9702a', '#e0a030'], ['#e0a030', '#b8452a'], ['#b8452a', '#d98a2a']][h % 3] : ['#3f7a3a', '#4f8d45'];
      sphere(cx, by - 14, 8, c[0]); sphere(cx + 2, by - 19, 6, c[1]);
      if (sn === 1) { g.fillStyle = h % 2 ? '#fff' : '#f8c8d8'; [[-4, -16], [3, -21], [5, -14]].forEach(([dx, dy]) => g.fillRect(cx + dx, by + dy, 2, 2)); } }
  }
}
function drawRock(x, y, type) {
  const [wx, wy] = P(x, y), cx = wx, by = wy + HH, hs = (x * 73 + y * 41) % 11 / 11, sn = PAL.sn, b = S.biome;
  if (type === 1) { // hill / dune
    const w = HW * .92, h = 16 + hs * 9, base = PAL.ground[(x * 7 + y * 13) % 5], gr = g.createLinearGradient(cx - w, 0, cx + w, 0);
    gr.addColorStop(0, mix(base, '#ffffff', b === 'desert' ? .22 : .12)); gr.addColorStop(1, mix(base, '#000000', .28));
    g.fillStyle = gr; g.beginPath(); g.moveTo(cx - w, by + 3); g.quadraticCurveTo(cx - w * .5, by - h * 1.7, cx + hs * 6 - 3, by - h); g.quadraticCurveTo(cx + w * .6, by - h * 1.5, cx + w, by + 3); g.ellipse(cx, by + 3, w, w * .5, 0, 0, Math.PI, false); g.closePath(); g.fill();
    return;
  }
  const w = HW * 1.0, h = 36 + hs * 40, ax = cx + (hs - .5) * 10, ay = by - h, L = [cx - w, by], R = [cx + w, by], Bm = [cx, by + w * .5], A = [ax, ay];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const snowF = b === 'desert' ? 0 : sn === 0 ? .62 : b === 'arctic' || b === 'mountains' ? (sn === 2 ? .22 : .38) : .15;
  const face = (p, q, col, sc) => { g.fillStyle = col; g.beginPath(); g.moveTo(...A); g.lineTo(...p); g.lineTo(...q); g.closePath(); g.fill();
    if (snowF > 0) { const a = lerp(A, p, snowF), c = lerp(A, q, snowF); g.fillStyle = sc; g.beginPath(); g.moveTo(...A); g.lineTo(...a); g.lineTo((a[0] + c[0]) / 2, (a[1] + c[1]) / 2 + 4); g.lineTo(...c); g.closePath(); g.fill(); } };
  face(L, Bm, PAL.rock[0], '#f4f8fa'); face(Bm, R, PAL.rock[1], '#d4dde3');
}
function buildDrawList() {
  const L = [];
  for (let y = 0; y < MAP; y++) for (let x = 0; x < MAP; x++) { const i = idx(x, y); if (S.tree[i]) L.push({ k: (x + y) * 1000 + x, t: 1, x, y, v: S.tree[i] }); if (S.rock[i]) L.push({ k: (x + y) * 1000 + x, t: 2, x, y, v: S.rock[i] }); }
  for (const b of S.blds) if (b) L.push({ k: (b.x + b.w - 1 + b.y + b.d - 1) * 1000 + b.x, t: 0, b, x: b.x, y: b.y });
  L.sort((a, b) => a.k - b.k); S.drawList = L; S.drawDirty = false;
}
function ghostOK(name, ax, ay) { const d = DEF[name]; return canPlace(d, ax, ay) && S.money >= d.cost; }
function anchorFor(name, tx, ty) { const d = DEF[name]; return [tx - Math.floor((d.w - 1) / 2), ty - Math.floor((d.d - 1) / 2)]; }

function draw(t) {
  initCtx(g); getPal(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#1d2229'; g.fillRect(0, 0, view.width, view.height);
  g.setTransform(cam.z, 0, 0, cam.z, cam.x, cam.y);
  const vx0 = -cam.x / cam.z, vy0 = -cam.y / cam.z, vx1 = vx0 + view.width / cam.z, vy1 = vy0 + view.height / cam.z;
  for (let y = 0; y < MAP; y++) for (let x = 0; x < MAP; x++) { const [wx, wy] = P(x, y); if (wx + HW < vx0 || wx - HW > vx1 || wy + 2 * HH < vy0 || wy > vy1) continue; drawTile(x, y, t); }
  if (S.drawDirty) buildDrawList();
  for (const o of S.drawList) {
    const [wx, wy] = P(o.x, o.y);
    if (wx < vx0 - 300 || wx > vx1 + 300 || wy < vy0 - 100 || wy > vy1 + 330) continue;
    if (o.t === 1) drawTree(o.x, o.y, o.v); else if (o.t === 2) drawRock(o.x, o.y, o.v);
    else { const s = SP[o.b.name]; g.drawImage(s.img, wx - s.ox, wy - s.oy); if (selected === o.b) { diamond(o.b.x, o.b.y, o.b.w, o.b.d); g.strokeStyle = '#ffd24a'; g.lineWidth = 2; g.stroke(); } }
  }
  if (hover) {
    const [tx, ty] = hover;
    if (tool.type === 'b') {
      const [ax, ay] = anchorFor(tool.name, tx, ty), s = SP[tool.name], ok = ghostOK(tool.name, ax, ay), [wx, wy] = P(ax, ay);
      diamond(ax, ay, s.w, s.d); g.fillStyle = ok ? 'rgba(80,220,100,.35)' : 'rgba(230,60,50,.4)'; g.fill();
      g.globalAlpha = .75; g.drawImage(s.img, wx - s.ox, wy - s.oy); g.globalAlpha = 1;
    } else if (inMap(tx, ty)) { diamond(tx, ty); g.strokeStyle = tool.type === 'bulldoze' ? '#ff5a4a' : '#fff'; g.lineWidth = 2; g.stroke(); }
  }
}

// ---------- HUD ----------
const $ = id => document.getElementById(id);
function showToast(m) { const e = document.createElement('div'); e.className = 'toast'; e.textContent = m; $('toasts').appendChild(e); setTimeout(() => e.remove(), 4500); }
const fmt = n => Math.round(n).toLocaleString('en-US');
function bar(id, v) { const e = $(id); e.style.height = Math.abs(v) * 50 + '%'; e.style.bottom = v >= 0 ? '50%' : (50 - Math.abs(v) * 50) + '%'; e.style.background = v >= 0 ? '#4caf50' : '#d8483a'; }
function updateHud() {
  const st = S.stats; $('money').textContent = '₽ ' + fmt(S.money); $('money').style.color = S.money < 0 ? '#ff6a5a' : '';
  $('date').textContent = dateText(); $('pop').textContent = fmt(st.pop);
  $('happy').textContent = Math.round(st.happy) + '%'; $('power').textContent = `${fmt(st.use)} / ${fmt(st.gen)} MW`; $('power').style.color = st.use > st.gen ? '#ff6a5a' : '';
  bar('dR', st.dem[1]); bar('dC', st.dem[2]); bar('dI', st.dem[3]);
  document.querySelectorAll('.spd').forEach(b => b.classList.toggle('on', +b.dataset.s === S.speed));
  if (!$('budget').hidden) renderBudget();
  renderInfo();
}
function renderInfo() {
  const e = $('info'); let h = '';
  const b = selected && S.blds.includes(selected) ? selected : (hover && inMap(hover[0], hover[1]) ? bAt(hover[0], hover[1]) : null);
  if (b) { const d = DEF[b.name]; h = `<b>${b.name}</b><br>${d.kind === 'R' ? `Residents ${Math.round(d.cap * b.occ)} / ${d.cap}` : d.jobs ? `Jobs ${d.jobs}` : ''}${d.kind === 'R' && b.g != null ? `<br>Satisfaction ${Math.round(b.g)}%` : ''}<br><span class="dim">${describe(d)}</span>`; }
  else if (hover && inMap(hover[0], hover[1])) { const i = idx(hover[0], hover[1]);
    h = `<b>${S.ter[i] ? (PAL.ice ? 'Frozen water' : 'Water') : S.rock[i] === 2 ? 'Mountain' : S.rock[i] ? (S.biome === 'desert' ? 'Dune' : 'Hill') : S.road[i] ? 'Road' : S.zone[i] ? ZONE_NAME[S.zone[i]] + ' zone' : S.tree[i] ? 'Trees' : 'Grass'}</b> <span class="dim">(${hover[0]}, ${hover[1]})</span><br><span class="dim">Land value ${Math.round(S.cov.lv[i])} · Pollution ${S.cov.poll[i].toFixed(1)}</span>`; }
  else h = '<span class="dim">Hover the map. Build power, roads, then zones.</span>';
  if (e._h !== h) { e.innerHTML = h; e._h = h; }
}
function renderBudget() {
  const l = S.last, row = (a, b, c = '') => `<tr><td>${a}</td><td class="r ${c}">${b}</td></tr>`;
  $('budgetBody').innerHTML = `<table>${row('Resident taxes', '+' + fmt(l.tax))}${row('Business taxes', '+' + fmt(l.biz))}${row('Tourism', '+' + fmt(l.tour))}${row('Road upkeep', '-' + fmt(l.roads), 'neg')}${row('Service upkeep', '-' + fmt(l.up), 'neg')}${row('<b>Net per month</b>', '<b>' + (l.inc - l.exp >= 0 ? '+' : '') + fmt(l.inc - l.exp) + '</b>', l.inc - l.exp >= 0 ? '' : 'neg')}</table>`;
  $('rateVal').textContent = S.rate + '%';
}
function buildPalette() {
  const root = $('palette'); root.innerHTML = '';
  PALETTE.forEach(([title, items]) => {
    const h = document.createElement('div'); h.className = 'sec'; h.textContent = title; root.appendChild(h);
    const grid = document.createElement('div'); grid.className = 'grid'; root.appendChild(grid);
    items.forEach(it => {
      const btn = document.createElement('button'); btn.className = 'item'; const cv = document.createElement('canvas'); cv.width = 64; cv.height = 52; const c = cv.getContext('2d');
      let label, cost, tip;
      if (it.b) { const d = DEF[N[it.b]], s = SP[d.name]; label = d.name.replace(/ \(.*\)$/, ''); cost = d.cost; tip = `${d.name}\n${describe(d)}\nCost ₽${fmt(d.cost)}`;
        const k = Math.min(60 / s.crop.w, 48 / s.crop.h); c.drawImage(s.img, s.crop.x, s.crop.y, s.crop.w, s.crop.h, (64 - s.crop.w * k) / 2, 50 - s.crop.h * k, s.crop.w * k, s.crop.h * k);
        btn.onclick = () => setTool({ type: 'b', name: d.name }); btn._key = 'b' + d.name; }
      else { label = it.label; cost = it.tool === 'road' ? COST.road : it.tool === 'zone' ? COST.zone : 0; tip = label + (cost ? ` (₽${cost}/tile)` : '');
        c.fillStyle = it.tool === 'zone' ? ZONE_COLOR[it.zone] : it.tool === 'road' ? '#5d6066' : it.tool === 'bulldoze' ? '#c0392b' : '#8a8f99';
        c.beginPath(); c.moveTo(32, 14); c.lineTo(58, 28); c.lineTo(32, 42); c.lineTo(6, 28); c.closePath(); c.fill();
        if (it.tool === 'road') { c.strokeStyle = '#e4e3dc'; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(14, 24); c.lineTo(50, 32); c.stroke(); }
        if (it.tool === 'bulldoze') { c.fillStyle = '#fff'; c.font = 'bold 16px sans-serif'; c.textAlign = 'center'; c.fillText('✕', 32, 33); }
        if (it.tool === 'select') { c.fillStyle = '#fff'; c.font = 'bold 16px sans-serif'; c.textAlign = 'center'; c.fillText('?', 32, 33); }
        btn.onclick = () => setTool(it.tool === 'zone' ? { type: 'zone', zone: it.zone } : { type: it.tool }); btn._key = it.tool + (it.zone || ''); }
      btn.title = tip; btn.appendChild(cv);
      const l = document.createElement('div'); l.className = 'lbl'; l.textContent = label; btn.appendChild(l);
      if (cost) { const m = document.createElement('div'); m.className = 'cost'; m.textContent = '₽' + fmt(cost); btn.appendChild(m); }
      grid.appendChild(btn);
    });
  });
}
function showPicker(first) {
  const m = $('picker'); m.hidden = false; $('pickerTitle').textContent = first ? 'Choose your land' : 'New city: choose your land';
  const box = $('pickerCards'); box.innerHTML = '';
  [...BIOME_ORDER, 'random'].forEach(k => { const c = document.createElement('button'); c.className = 'card'; const B = BIOMES[k];
    c.innerHTML = `<b>${k === 'random' ? 'Random' : B.name}</b><span>${k === 'random' ? 'Surprise me.' : B.desc}</span>`;
    c.onclick = () => { const biome = k === 'random' ? pick(BIOME_ORDER) : k; m.hidden = true; newGame(biome); centerCam(); $('rate').value = S.rate; setTool({ type: 'select' }); showToast(BIOMES[biome].name + '. Build power, roads, then zone R / C / I.'); };
    box.appendChild(c); });
  $('pickerCancel').hidden = first; $('pickerCancel').onclick = () => { m.hidden = true; };
}
function setTool(t) {
  tool = t; selected = null;
  const key = t.type === 'b' ? 'b' + t.name : t.type + (t.zone || '');
  document.querySelectorAll('.item').forEach(b => b.classList.toggle('on', b._key === key));
  const hint = { select: 'Click a building to inspect it.', bulldoze: 'Drag to bulldoze.', road: 'Drag to build roads. Roads over water become bridges.', zone: 'Drag to zone. Buildings grow near roads when there is demand and power.' }[t.type];
  $('hint').textContent = hint || 'Click to place. Right-drag or WASD to pan, wheel to zoom.';
}

// ---------- input ----------
function resize() { view.width = innerWidth; view.height = innerHeight; }
function evTile(e) { return toTile(e.clientX, e.clientY); }
function applyAt(tx, ty, first) {
  if (!inMap(tx, ty)) return;
  if (tool.type === 'road') paintRoad(tx, ty);
  else if (tool.type === 'zone') paintZone(tx, ty, tool.zone);
  else if (tool.type === 'bulldoze') bulldoze(tx, ty);
  else if (tool.type === 'b') { const [ax, ay] = anchorFor(tool.name, tx, ty); if (placeBuilding(tool.name, ax, ay)) { if (first || ['Park', 'Concrete Panel Fence', 'Bus Stop'].includes(tool.name)) {} } else if (first && !canPlace(DEF[tool.name], ax, ay)) showToast('Can\'t build here'); }
  else if (tool.type === 'select' && first) selected = bAt(tx, ty);
}
function bresenham(a, b, fn) { let [x0, y0] = a; const [x1, y1] = b, dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), sx_ = x0 < x1 ? 1 : -1, sy_ = y0 < y1 ? 1 : -1; let e = dx - dy; for (;;) { fn(x0, y0); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 > -dy) { e -= dy; x0 += sx_; } if (e2 < dx) { e += dx; y0 += sy_; } } }
view.addEventListener('contextmenu', e => e.preventDefault());
view.addEventListener('pointerdown', e => {
  view.setPointerCapture(e.pointerId); dragged = false;
  if (e.button === 1 || e.button === 2) { panning = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y }; return; }
  pressed = 1; const t = evTile(e); lastTile = t; applyAt(t[0], t[1], true);
});
view.addEventListener('pointermove', e => {
  hover = evTile(e);
  if (panning) { cam.x = panning.cx + e.clientX - panning.x; cam.y = panning.cy + e.clientY - panning.y; return; }
  if (pressed && tool.type !== 'select' && lastTile && (hover[0] !== lastTile[0] || hover[1] !== lastTile[1])) { bresenham(lastTile, hover, (x, y) => { if (x !== lastTile[0] || y !== lastTile[1]) applyAt(x, y, false); }); lastTile = hover; }
});
view.addEventListener('pointerup', () => { pressed = 0; panning = null; lastTile = null; });
view.addEventListener('pointerleave', () => { hover = null; });
view.addEventListener('wheel', e => {
  e.preventDefault(); const k = e.deltaY < 0 ? 1.12 : 1 / 1.12, nz = clamp(cam.z * k, .35, 2.5), wx = (e.clientX - cam.x) / cam.z, wy = (e.clientY - cam.y) / cam.z;
  cam.z = nz; cam.x = e.clientX - wx * nz; cam.y = e.clientY - wy * nz;
}, { passive: false });
const keys = {};
addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return; keys[e.key.toLowerCase()] = true;
  if (e.key === ' ') { S.speed = S.speed ? 0 : 1; e.preventDefault(); }
  if (e.key === '1') S.speed = 1; if (e.key === '2') S.speed = 2; if (e.key === '3') S.speed = 4;
  if (e.key === 'Escape') setTool({ type: 'select' });
});
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
addEventListener('resize', resize);

// ---------- boot ----------
function centerCam() { cam.z = 1; cam.x = view.width / 2 + 120; cam.y = view.height / 2 - (MAP - 1) * HH * cam.z; }
function boot() {
  resize(); initSprites(); buildPalette();
  const loaded = load(); if (!loaded) { newGame('taiga'); S.speed = 0; }
  centerCam(); setTool({ type: 'select' }); if (!loaded) showPicker(true);
  document.querySelectorAll('.spd').forEach(b => b.onclick = () => { S.speed = +b.dataset.s; });
  $('btnBudget').onclick = () => { $('budget').hidden = !$('budget').hidden; renderBudget(); };
  $('closeBudget').onclick = () => { $('budget').hidden = true; };
  $('rate').oninput = e => { S.rate = +e.target.value; renderBudget(); }; $('rate').value = S.rate;
  $('btnNew').onclick = () => { if (confirm('Start a new city? The current one will be lost.')) showPicker(false); };
  $('btnSave').onclick = () => { save(); showToast('Saved'); };
  let last = performance.now(), acc = 0, hud = 0;
  (function frame(t) {
    const dt = Math.min(250, t - last); last = t;
    if (S.speed > 0) { acc += dt * S.speed; let n = 0; while (acc >= DAY_MS && n++ < 12) { acc -= DAY_MS; tick(); } if (n >= 12) acc = 0; }
    const sp = 9 / Math.sqrt(cam.z); if (keys.w || keys.arrowup) cam.y += sp; if (keys.s || keys.arrowdown) cam.y -= sp; if (keys.a || keys.arrowleft) cam.x += sp; if (keys.d || keys.arrowright) cam.x -= sp;
    if (S.covDirty) recompute();
    draw(t); if (t - hud > 200) { updateHud(); hud = t; }
    requestAnimationFrame(frame);
  })(performance.now());
}
boot();
