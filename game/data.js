// Game data: building definitions, zone growth lists and the build palette.
const MAP = 64;
const N = {
  khr: 'Khrushchyovka (5-storey)', brezh: 'Brezhnevka (9-storey)', tower: 'Tower block (16-storey)', stalTower: 'Stalinist tower (Seven Sisters style)',
  factory: 'Factory', coal: 'Power plant (cooling tower)', pkult: 'Palace of Culture', metro: 'Metro station',
  school: 'School', vdnh: 'VDNKh Central Pavilion', hospital: 'Hospital', atom: 'Atomic Power Plant', chem: 'Chemical Plant', steel: 'Steel Mill',
  grain: 'Grain Elevator', tractor: 'Tractor Works', inst: 'Research Institute', circus: 'Circus', stadium: 'Stadium', univermag: 'Univermag (Department Store)',
  club: "Workers' Club (Constructivist)", kinder: 'Kindergarten', tv: 'TV Tower (Ostankino style)', stalinka: 'Stalinka (Courtyard Block)',
  bus: 'Bus Stop', pylon: 'Power Pylon', watert: 'Water Tower', park: 'Park', rail: 'Railway Station', billboard: 'Slogan Billboard', garage: 'Garage Cooperative', fence: 'Concrete Panel Fence',
  intourist: 'Hotel Intourist (slab)', cosmos: 'Hotel Cosmos (curved)', thotel: 'Tourist Hotel', highways: 'Highways Ministry (Tbilisi)', saucer: 'Flying Saucer Institute (Kyiv)',
  maten: 'Matenadaran (Yerevan)', linna: 'Linnahall (Tallinn)', vilnius: 'Palace of Concerts & Sports (Vilnius)', sovets: 'House of Soviets (Kaliningrad)',
  sanat: 'Sanatorium (Sochi)', pioneers: 'Palace of Pioneers', planet: 'Planetarium', mother: 'Motherland Monument', worker: 'Worker & Kolkhoz Woman',
  space: 'Space Conquerors Obelisk', flame: 'Eternal Flame Memorial',
  dacha: 'Dacha', shop: 'Magazin (Shop)', workshop: 'Workshop', fire: 'Fire Station', police: 'Police Station',
};

const DEF = {};
// kind: R/C/I grow on zones (free). S = placed by the player.
// cap residents, jobs, pw = MW used, gen = MW made, up = upkeep/month, r = coverage radius,
// edu/health/cult/happy/transit/police/fire = coverage strength, poll = pollution, tour = tourism income/month.
function def(key, o) { DEF[N[key]] = Object.assign({ key, name: N[key], epoch: 'soviet', cat: null, kind: 'S', cost: 0, up: 0, pw: 0, gen: 0, jobs: 0, cap: 0, r: 0, poll: 0, tour: 0, tier: 0 }, o); }

// Residential
def('dacha',    { kind: 'R', cap: 6,   pw: .2, tier: 0 });
def('khr',      { kind: 'R', cap: 100, pw: 3,  tier: 1 });
def('brezh',    { kind: 'R', cap: 220, pw: 7,  tier: 2 });
def('tower',    { kind: 'R', cap: 240, pw: 8,  tier: 2 });
def('stalinka', { kind: 'R', cap: 420, pw: 13, tier: 3 });
def('stalTower',{ kind: 'R', cap: 700, pw: 22, tier: 4 });
// Commercial
def('shop',     { kind: 'C', jobs: 10, pw: 1.5, tier: 0 });
def('univermag',{ kind: 'C', jobs: 70, pw: 8,   tier: 1 });
def('thotel',   { kind: 'C', jobs: 40, pw: 5,   tier: 2, tour: 120, cost: 900, up: 20 });
def('intourist',{ kind: 'C', jobs: 120, pw: 14, tier: 3, tour: 400, cost: 3000, up: 60 });
// Industrial
def('workshop', { kind: 'I', jobs: 20,  pw: 4,  poll: 3,  tier: 0, r: 5 });
def('factory',  { kind: 'I', jobs: 140, pw: 30, poll: 8,  tier: 1, r: 6 });
def('tractor',  { kind: 'I', jobs: 220, pw: 40, poll: 7,  tier: 1, r: 6 });
def('grain',    { kind: 'I', jobs: 50,  pw: 8,  poll: 3,  tier: 1, r: 5 });
def('chem',     { kind: 'I', jobs: 180, pw: 45, poll: 12, tier: 2, r: 7 });
def('steel',    { kind: 'I', jobs: 320, pw: 80, poll: 14, tier: 3, r: 7 });

// Power
def('coal',  { cost: 3000,  up: 120, gen: 300,  jobs: 40,  poll: 16, r: 7 });
def('atom',  { cost: 15000, up: 500, gen: 1000, jobs: 120, poll: 1,  r: 4 });
// Education
def('kinder',   { cost: 500,  up: 15, pw: 2, jobs: 15,  r: 6,  edu: .8 });
def('school',   { cost: 800,  up: 25, pw: 3, jobs: 30,  r: 10, edu: 1 });
def('pioneers', { cost: 1800, up: 45, pw: 5, jobs: 50,  r: 12, edu: 1.2, cult: .6 });
def('inst',     { cost: 3500, up: 90, pw: 10, jobs: 100, r: 14, edu: 2 });
def('saucer',   { cost: 3000, up: 70, pw: 8, jobs: 80,  r: 14, edu: 1.5, cult: 1.2 });
// Health & safety
def('hospital', { cost: 1800, up: 60, pw: 8, jobs: 70, r: 12, health: 1 });
def('sanat',    { cost: 2500, up: 60, pw: 6, jobs: 50, r: 10, health: 1.4, cult: .8, tour: 200 });
def('fire',     { cost: 700,  up: 25, pw: 2, jobs: 25, r: 10, fire: 1 });
def('police',   { cost: 600,  up: 25, pw: 2, jobs: 25, r: 8,  police: 1 });
// Culture
def('club',    { cost: 1200, up: 30, pw: 3, jobs: 20, r: 8,  cult: 1 });
def('pkult',   { cost: 2000, up: 50, pw: 5, jobs: 40, r: 12, cult: 1.5 });
def('circus',  { cost: 2500, up: 60, pw: 6, jobs: 50, r: 12, cult: 1.5, tour: 150 });
def('planet',  { cost: 1800, up: 40, pw: 4, jobs: 30, r: 10, cult: 1, edu: .5 });
def('stadium', { cost: 3500, up: 80, pw: 12, jobs: 60, r: 14, cult: 2, tour: 250 });
def('linna',   { cost: 4000, up: 90, pw: 10, jobs: 60, r: 14, cult: 2.2, tour: 300 });
def('vilnius', { cost: 4000, up: 90, pw: 10, jobs: 60, r: 14, cult: 2.2, tour: 300 });
def('vdnh',    { cost: 5000, up: 120, pw: 10, jobs: 90, r: 16, cult: 2.8, tour: 400 });
def('maten',   { cost: 2500, up: 50, pw: 4, jobs: 40, r: 11, cult: 1.4, edu: 1 });
def('tv',      { cost: 3000, up: 60, pw: 8, jobs: 30, r: 20, cult: .8, happy: .6 });
// Government
def('highways',{ cost: 3000, up: 80, pw: 8, jobs: 150, r: 8,  cult: .4 });
def('sovets',  { cost: 4500, up: 110, pw: 14, jobs: 300, r: 10, cult: .6 });
// Hotels
def('cosmos',  { cost: 5000, up: 120, pw: 18, jobs: 200, r: 6, tour: 900 });
// Transport
def('bus',   { cost: 60,   up: 2,  r: 4,  transit: .4, happy: .1 });
def('metro', { cost: 1500, up: 40, pw: 4, jobs: 20, r: 9,  transit: 1.2 });
def('rail',  { cost: 2500, up: 60, pw: 5, jobs: 30, r: 11, transit: 1.4 });
// Parks, monuments & decor
def('park',     { cost: 80,   up: 1, r: 4,  happy: .8 });
def('billboard',{ cost: 30,   up: 0, r: 2,  happy: .15 });
def('garage',   { cost: 200,  up: 3, r: 3,  happy: .2 });
def('watert',   { cost: 300,  up: 5, r: 5,  happy: .1 });
def('fence',    { cost: 10,   up: 0 });
def('mother',   { cost: 6000, up: 40, r: 18, happy: 2, cult: 1.6 });
def('worker',   { cost: 4000, up: 30, r: 14, happy: 1.5, cult: 1 });
def('space',    { cost: 3500, up: 25, r: 14, happy: 1.2, cult: .8 });
def('flame',    { cost: 2000, up: 15, r: 10, happy: 1.5 });

// Zone growth lists (tier = minimum land-value tier needed).
const ZONE_LIST = { 1: ['dacha', 'khr', 'brezh', 'tower', 'stalinka', 'stalTower'],
                    2: ['shop', 'univermag', 'thotel', 'intourist'],
                    3: ['workshop', 'factory', 'tractor', 'grain', 'chem', 'steel'] };
const ZONE_NAME = { 1: 'Residential', 2: 'Commercial', 3: 'Industrial' };
const ZONE_COLOR = { 1: '#4caf50', 2: '#4a90d9', 3: '#e0b030' };

// Palette: [section title, [items]]. Item: {tool,...} or {b:key}.
const PALETTE = [
  ['Tools', [{ tool: 'select', label: 'Inspect' }, { tool: 'bulldoze', label: 'Bulldoze' }]],
  ['Roads & Zones', [{ tool: 'road', label: 'Road' }, { tool: 'zone', zone: 1, label: 'Residential' }, { tool: 'zone', zone: 2, label: 'Commercial' }, { tool: 'zone', zone: 3, label: 'Industrial' }]],
  ['Power', [{ b: 'coal' }, { b: 'atom' }]],
  ['Education', [{ b: 'kinder' }, { b: 'school' }, { b: 'pioneers' }, { b: 'inst' }, { b: 'saucer' }]],
  ['Health & Safety', [{ b: 'hospital' }, { b: 'sanat' }, { b: 'fire' }, { b: 'police' }]],
  ['Culture', [{ b: 'club' }, { b: 'pkult' }, { b: 'circus' }, { b: 'planet' }, { b: 'stadium' }, { b: 'linna' }, { b: 'vilnius' }, { b: 'maten' }, { b: 'vdnh' }, { b: 'tv' }]],
  ['Hotels', [{ b: 'thotel' }, { b: 'intourist' }, { b: 'cosmos' }]],
  ['Government', [{ b: 'highways' }, { b: 'sovets' }]],
  ['Transport', [{ b: 'bus' }, { b: 'metro' }, { b: 'rail' }]],
  ['Parks & Monuments', [{ b: 'park' }, { b: 'flame' }, { b: 'worker' }, { b: 'space' }, { b: 'mother' }, { b: 'billboard' }, { b: 'garage' }, { b: 'watert' }, { b: 'fence' }]],
];
const COST = { road: 10, bridge: 40, zone: 3, bulldoze: 2, bulldozeBuilding: 10 };

const DESC = {
  gen: d => d.gen ? `Generates ${d.gen} MW` : '', jobs: d => d.jobs ? `${d.jobs} jobs` : '',
};
function describe(d) {
  const p = [];
  if (d.gen) p.push(`+${d.gen} MW`); if (d.pw) p.push(`uses ${d.pw} MW`); if (d.jobs) p.push(`${d.jobs} jobs`); if (d.cap) p.push(`${d.cap} residents`);
  ['edu', 'health', 'cult', 'happy', 'transit', 'police', 'fire'].forEach(k => { if (d[k]) p.push(`${k} r${d.r}`); });
  if (d.boost) p.push(`boosts nearby ${d.boost === 'I' ? 'industry' : 'shops'} (${d.label})`);
  if (d.poll) p.push(`pollution ${d.poll}`); if (d.tour) p.push(`tourism ${d.tour}/mo`); if (d.up) p.push(`upkeep ${d.up}/mo`);
  return p.join(' · ');
}

// ---- Natural resource sites (placed by the map generator; cannot be built or bulldozed) ----
Object.assign(N, { coalmine: 'Coal Mine', ironq: 'Iron Ore Quarry', oilf: 'Oil Field', farm: 'Collective Farm' });
def('coalmine', { epoch: 'all', kind: 'X', poll: 4, r: 5, boost: 'I', label: 'coal' });
def('ironq',    { epoch: 'all', kind: 'X', poll: 3, r: 5, boost: 'I', label: 'iron ore' });
def('oilf',     { epoch: 'all', kind: 'X', poll: 3, r: 5, boost: 'I', label: 'oil' });
def('farm',     { epoch: 'all', kind: 'X', poll: 0, r: 0, boost: 'C', label: 'farmland' });

// ---- Biomes (map choices) ----
// river: width / x position / wobble; lake: radius and position (fractions of MAP); rock: [hill threshold, mountain threshold] on a noise field
const BIOMES = {
  taiga:     { name: 'Russian Forest', desc: 'Rivers, birch and spruce forests, long winters.', cold: 1.2, river: { w: 1.8, x: .33, amp: 6 }, lake: { r: 5, x: .76, y: .22 }, rock: [1.25, 9], trees: .30, treeKinds: [[2, .4], [1, .6]],
    ground: ['#6f9a55', '#729d58', '#6c9652', '#75a05a', '#6a9450'], res: [['coalmine', 2], ['ironq', 1], ['farm', 2]] },
  steppe:    { name: 'Steppe (Ukraine / Kazakhstan)', desc: 'Wide open plains, a broad river, golden fields. Few trees.', cold: 1.1, river: { w: 2.6, x: .5, amp: 9 }, lake: { r: 3, x: .2, y: .75 }, rock: [1.55, 9], trees: .035, treeKinds: [[1, 1]],
    ground: ['#9aa95a', '#a1ae5e', '#94a455', '#a6b362', '#8fa052'], res: [['coalmine', 2], ['oilf', 1], ['ironq', 1], ['farm', 3]] },
  desert:    { name: 'Desert (Uzbekistan / Turkmenistan)', desc: 'Sand, dunes and a narrow river oasis. Hot summers, mild winters.', cold: 0, river: { w: 1.1, x: .4, amp: 7 }, lake: { r: 3, x: .72, y: .7 }, rock: [.85, 9], trees: .045, treeKinds: [[3, 1]],
    ground: ['#d9c28a', '#dcc690', '#d3ba80', '#e0cb98', '#cdb47a'], res: [['oilf', 2], ['ironq', 1], ['farm', 2]] },
  mountains: { name: 'Mountains (Caucasus / Altai)', desc: 'Peaks, foothills and tight valleys. Little flat land.', cold: 1.2, river: { w: 1.4, x: .5, amp: 10 }, lake: { r: 4, x: .25, y: .25 }, rock: [.35, .95], trees: .16, treeKinds: [[2, .6], [1, .4]],
    ground: ['#68964f', '#6b9952', '#64904c', '#6f9c55', '#628c4a'], res: [['ironq', 2], ['coalmine', 1], ['farm', 1]] },
  arctic:    { name: 'Far North (Norilsk / Murmansk)', desc: 'Tundra, frozen lakes and permanent cold. Heating is expensive.', cold: 1.35, river: { w: 1.2, x: .6, amp: 5 }, lake: { r: 8, x: .2, y: .3 }, rock: [1.0, 1.75], trees: .06, treeKinds: [[2, 1]],
    ground: ['#a9b8aa', '#aebdb0', '#a3b2a5', '#b3c2b5', '#9fae9f'], res: [['coalmine', 2], ['oilf', 1], ['ironq', 2]] },
};
const BIOME_ORDER = ['taiga', 'steppe', 'desert', 'mountains', 'arctic'];
const SEASONS = ['Winter', 'Spring', 'Summer', 'Autumn'];
