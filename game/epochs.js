// Epochs: which buildings exist, how they grow, and defaults. Sprites carry {epoch, role, tier}; stats are generated from role templates.
const EPOCHS = {
  rus:    { name: 'Old Rus & Muscovy', years: '10th-17th century', year: 1480, power: false, blurb: 'Log houses, white-stone churches, onion domes, kremlin walls. No electricity: no power needed.' },
  imp:    { name: 'Imperial St. Petersburg', years: '18th-19th century', year: 1800, power: false, blurb: 'Baroque and Neoclassical palaces, canals, cathedrals and shipyards. No electricity yet.' },
  rev:    { name: 'Russian Revival & Industry', years: '1850-1917', year: 1890, power: true, blurb: 'Merchant mansions, brick mills, railway termini, Art Nouveau. Power stations arrive.' },
  soviet: { name: 'Soviet Union', years: '1920s-1991', year: 1970, power: true, blurb: 'Panel blocks, Stalinist towers, atomic plants, palaces of culture and monuments.' },
  mod:    { name: 'Modern Russia', years: '1991-today', year: 2010, power: true, blurb: 'Glass towers, malls, new housing complexes, arenas and cathedrals.' },
  mixed:  { name: 'Mixed Russia (all eras)', years: 'every epoch together', year: 2020, power: true, blurb: 'The whole country at once: historic centre, Soviet suburbs and modern skyline.' },
};
const EPOCH_ORDER = ['rus', 'imp', 'rev', 'soviet', 'mod', 'mixed'];
const CATS = ['Power', 'Education', 'Health & Safety', 'Culture', 'Hotels', 'Government', 'Transport', 'Parks & Monuments'];
const ROLE_CAT = { power: 'Power', edu: 'Education', health: 'Health & Safety', safe: 'Health & Safety', cult: 'Culture', relig: 'Culture', hotel: 'Hotels', gov: 'Government', transit: 'Transport', mon: 'Parks & Monuments', decor: 'Parks & Monuments' };

// Existing Soviet buildings: derive their menu category from the old palette.
PALETTE.forEach(([title, items]) => { if (CATS.includes(title)) items.forEach(it => { if (it.b && DEF[N[it.b]]) DEF[N[it.b]].cat = title; }); });

function genDef(s) {
  const a = s.w * s.d, q = Math.pow(a, .9), sq = Math.sqrt(a), t = s.tier, r = s.role, R = n => Math.round(n);
  const d = { key: s.name, name: s.name, epoch: s.epoch, kind: 'S', cat: ROLE_CAT[r] || null, tier: t, cost: 0, up: 0, pw: 0, gen: 0, jobs: 0, cap: 0, r: 0, poll: 0, tour: 0 };
  switch (r) {
    case 'R': d.kind = 'R'; d.cap = R([8, 50, 100, 180, 300][t] * q); d.pw = d.cap / 28; break;
    case 'C': d.kind = 'C'; d.jobs = R([8, 28, 55, 95, 150][t] * q); d.pw = d.jobs / 8; break;
    case 'I': d.kind = 'I'; d.jobs = R([18, 55, 100, 170, 260][t] * q); d.pw = d.jobs / 4; d.poll = 2 + t * 2.5; d.r = 5 + t; break;
    case 'edu': Object.assign(d, { cost: R(600 * a), up: R(18 * a), jobs: R(15 * a), pw: 2 * sq, r: R(6 + 3 * sq), edu: +(.7 + .25 * sq).toFixed(2) }); break;
    case 'health': Object.assign(d, { cost: R(650 * a), up: R(20 * a), jobs: R(18 * a), pw: 2.5 * sq, r: R(6 + 3 * sq), health: +(.7 + .25 * sq).toFixed(2) }); break;
    case 'safe': Object.assign(d, { cost: R(500 * a), up: R(20 * a), jobs: R(15 * a), pw: 2, r: R(8 + 2 * sq), police: .7, fire: .7 }); break;
    case 'cult': Object.assign(d, { cost: R(1000 * a * (1 + t * .25)), up: R(25 * a), jobs: R(18 * a), pw: 3 * sq, r: R(7 + 3 * sq), cult: +(.7 + .4 * sq).toFixed(2), tour: R(40 * a) }); break;
    case 'relig': Object.assign(d, { cost: R(900 * a), up: R(15 * a), jobs: R(10 * a), pw: 2 * sq, r: R(7 + 3 * sq), cult: +(.6 + .35 * sq).toFixed(2), happy: .3 }); break;
    case 'gov': Object.assign(d, { cost: R(1500 * a), up: R(40 * a), jobs: R(45 * a), pw: 4 * sq, r: 8, cult: .3 }); break;
    case 'hotel': Object.assign(d, { cost: R(700 * a * (1 + t * .3)), up: R(25 * a), jobs: R(25 * a), pw: 4 * sq, tour: R(90 * a * (1 + t * .2)) }); break;
    case 'power': Object.assign(d, { cost: R(2500 * a), up: R(100 * a), gen: R(150 * a), jobs: R(25 * a), poll: s.name === 'Wind Farm' ? 0 : 8, r: 6 }); break;
    case 'transit': Object.assign(d, { cost: R(1200 * a), up: R(35 * a), jobs: R(18 * a), pw: 3, r: R(8 + 2 * sq), transit: +(1 + .15 * sq).toFixed(2) }); break;
    case 'mon': Object.assign(d, { cost: R(1800 * a), up: R(15 * a), r: R(8 + 3 * sq), happy: +(1 + .3 * sq).toFixed(2), cult: .8 }); break;
    case 'decor': Object.assign(d, { cost: R(100 * a), up: R(2 * a), r: 3, happy: .25 }); break;
  }
  if (!EPOCHS[s.epoch].power) d.pw = 0;
  d.w = s.w; d.d = s.d; return d;
}
sprites.forEach(s => { if (s.role && s.epoch) DEF[s.name] = genDef(s); });
const ZONE_DEFS = { 1: [], 2: [], 3: [] };
Object.values(DEF).forEach(d => { if (d.kind === 'R') ZONE_DEFS[1].push(d); else if (d.kind === 'C') ZONE_DEFS[2].push(d); else if (d.kind === 'I') ZONE_DEFS[3].push(d); });
