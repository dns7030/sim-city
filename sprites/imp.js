// Epoch: Imperial St. Petersburg (18th - early 19th century).
const OCH = '#e6c070', PINK = '#d9a3a0', MINT = '#8fc4a8', CRM = '#f0e6c8', SKY = '#8fb4d0', WHT = '#f6f1e6', IGRN = '#6faa90', IRED = '#b5503c', TEAL = '#5a9a9a', GRY = '#b4b4aa';
const fac = (c, r, o = {}) => facade(Object.assign({ cols: c, rows: r, gw: .4, gh: .55, glass: '#33495a', trim: WHT, cornice: 3, corniceCol: WHT, plinth: 3, arch: false }, o));
const rustic = (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = .7; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(0, 1 + j * 2.4); ctx.lineTo(W, 1 + j * 2.4); ctx.stroke(); } };
const statuesTop = (x0, y0, w, d, z, n) => { for (let i = 0; i < n; i++) { const x = x0 + w * (i + .5) / n, c = sx(x, y0 + d - .05), b = sy(x, y0 + d - .05, z); ctx.fillStyle = '#e8e4d8'; ctx.fillRect(c - 1, b - 7, 2, 7); ctx.beginPath(); ctx.arc(c, b - 8, 1.5, 0, 7); ctx.fill(); } };
const portico = (n, col = WHT) => colonnade(n, col, { base: 3, ent: 6, back: 'rgba(0,0,0,.28)', door: true });

SP_('Petersburg Wooden House', 1, 1, 'imp', 'R', 0, () => {
  box(.2, .28, .6, .46, 0, 18, '#9fb8c8', { left: cmp(stripesFace('#9fb8c8', '#92acbe', 18, false), windows({ cols: 3, rows: 1, gw: .28, gh: .5, glass: '#33495a', trim: WHT, my: 5, top: 5 })), right: stripesFace('#8ea6b6', '#83a0b2', 18, false) });
  roof(.17, .25, .66, .52, 18, 10, '#6a7a6a', '#9fb8c8', 'x'); box(.4, .5, .2, .04, 18, 8, WHT); tree(.85, .85, .7);
});
SP_('Baroque Townhouse', 1, 1, 'imp', 'R', 1, () => {
  box(.15, .2, .7, .6, 0, 40, OCH, { left: fac(3, 3, { gw: .3, gh: .5, trim: WHT, pilasters: true, door: true, doorW: 8, doorH: 11, band: [14, WHT, 1.5] }), right: fac(3, 3, { gw: .3, gh: .5, pilasters: true }) }); roof(.13, .18, .74, .64, 40, 10, '#7a4a3a', OCH, 'x');
});
SP_('Tenement House (Dokhodny Dom)', 2, 1, 'imp', 'R', 2, () => {
  box(.05, .15, 1.9, .7, 0, 56, '#d9b080', { left: fac(8, 5, { gw: .35, gh: .5, trim: WHT, balc: 3, corniceCol: '#8a5a40' }), right: fac(3, 5, { gw: .35, gh: .5 }) }); roof(.03, .13, 1.94, .74, 56, 10, '#5a5a5a', '#d9b080', 'x');
  [.55, 1.45].forEach(x => box(x, .2, .08, .08, 62, 10, '#8a6a58'));
});
SP_('Neoclassical Mansion', 2, 1, 'imp', 'R', 3, () => {
  box(.05, .2, 1.9, .65, 0, 36, CRM, { left: cmp(rustic, fac(8, 2, { gw: .3, gh: .5, trim: '#d8c8a0', arch: true })), right: fac(3, 2) });
  box(.65, .85, .7, .18, 0, 36, CRM, { left: portico(6, WHT) }); poly([[sx(.62, 1.03), sy(.62, 1.03, 36)], [sx(1.38, 1.03), sy(1.38, 1.03, 36)], [sx(1, 1.03), sy(1, 1.03, 46)]], '#ece2c8');
  roof(.03, .18, 1.94, .69, 36, 8, '#6a7a6a', CRM, 'x');
});
SP_('Country Estate (Usadba)', 2, 2, 'imp', 'R', 3, () => {
  flat(.1, .1, 1.9, 1.9, '#7aa860');
  box(.5, .3, 1.0, .7, 0, 30, CRM, { left: fac(5, 2, { gw: .3, arch: true }), right: fac(4, 2, { gw: .3 }) }); roof(.48, .28, 1.04, .74, 30, 9, IGRN, CRM, 'x');
  box(.5, 1.0, .6, .2, 0, 30, CRM, { left: colonnade(5, WHT, { back: 'rgba(0,0,0,.3)', door: true }) }); poly([[sx(.48, 1.2), sy(.48, 1.2, 30)], [sx(1.12, 1.2), sy(1.12, 1.2, 30)], [sx(.8, 1.2), sy(.8, 1.2, 40)]], '#ece2c8');
  box(.05, .3, .4, .6, 0, 20, CRM, { left: fac(2, 1), right: fac(3, 1) }); roof(.03, .28, .44, .64, 20, 7, IGRN, CRM, 'y'); box(1.55, .3, .4, .6, 0, 20, CRM, { left: fac(2, 1), right: fac(3, 1) }); roof(1.53, .28, .44, .64, 20, 7, IGRN, CRM, 'y');
  cupola(.8, .65, 36, 4, 3, 0, WHT); tree(.3, 1.55, 1); tree(1.7, 1.5, 1); tree(1.45, 1.8, .9); flat(.9, 1.3, 1.1, 2, '#d8cca0');
});
SP_('Embankment Palace-Mansion', 2, 2, 'imp', 'R', 4, () => {
  box(.1, .35, 1.8, 1.3, 0, 52, PINK, { left: cmp(rustic, fac(8, 4, { gw: .3, gh: .5, trim: WHT, pilasters: true, arch: true, balc: 2 })), right: fac(5, 4, { gw: .3, gh: .5, pilasters: true }) });
  box(.6, 1.55, .8, .2, 0, 52, PINK, { left: portico(6, WHT) }); poly([[sx(.56, 1.75), sy(.56, 1.75, 52)], [sx(1.44, 1.75), sy(1.44, 1.75, 52)], [sx(1, 1.75), sy(1, 1.75, 64)]], '#ece2c8');
  roof(.08, .33, 1.84, 1.34, 52, 12, '#7a8a7a', PINK, 'x'); statuesTop(.1, .35, 1.8, 1.3, 52, 7); cupola(1, .8, 64, 5, 3, 0, WHT);
});
SP_('Merchant Shop (Lavka)', 1, 1, 'imp', 'C', 0, () => {
  box(.15, .25, .7, .5, 0, 22, '#d8b88a', { left: (W, H) => { ctx.fillStyle = '#33495a'; ctx.fillRect(3, 2, W - 6, 11); ctx.fillStyle = '#3f8a5a'; ctx.fillRect(0, 14, W, 5); ctx.fillStyle = '#e8d8a8'; ctx.fillRect(4, 15, W - 8, 3); }, right: fac(2, 1, { gh: .4 }) });
  roof(.13, .23, .74, .54, 22, 8, '#6a4a3a', '#d8b88a', 'x');
});
SP_('Nevsky Cafe-Bakery', 1, 1, 'imp', 'C', 1, () => {
  box(.15, .2, .7, .6, 0, 36, '#e8d0b0', { left: (W, H) => { ctx.fillStyle = '#33495a'; ctx.fillRect(3, 2, W * .6, 14); ctx.fillStyle = '#c0392b'; for (let i = 0; i < 6; i++) if (i % 2 === 0) ctx.fillRect(2 + i * W * .1, 16, W * .1, 4); windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#33495a', trim: WHT, my: 22, top: 4 })(W, H, 1); }, right: fac(2, 2, { gh: .4 }) });
  roof(.13, .18, .74, .64, 36, 9, '#7a4a3a', '#e8d0b0', 'x');
});
SP_('Passage Arcade', 2, 1, 'imp', 'C', 2, () => {
  box(.05, .2, 1.9, .65, 0, 38, '#e0cf9c', { left: cmp(rustic, fac(9, 2, { gw: .5, gh: .45, arch: true, trim: WHT, my: 2, top: 4 })), right: fac(3, 2) });
  box(.05, .2, 1.9, .65, 38, 3, WHT); roof(.03, .18, 1.94, .69, 41, 6, '#6a7a6a', '#e0cf9c', 'x'); box(.75, .45, .5, .2, 47, 8, '#cfe6ee', { left: windows({ cols: 5, rows: 1, gw: .6, gh: .6, glass: '#9bc4d8', lit: 0, my: 1, top: 1 }) });
});
SP_('Great Gostiny Dvor', 2, 2, 'imp', 'C', 3, () => {
  flat(.1, .1, 1.9, 1.9, '#b8ae94'); const A = { left: fac(9, 2, { gw: .5, gh: .45, arch: true, trim: WHT, my: 2, plinth: 2, corniceCol: '#d8b868' }), right: fac(7, 2, { gw: .5, gh: .45, arch: true, trim: WHT, my: 2, plinth: 2 }) };
  box(.1, .1, 1.8, .45, 0, 34, OCH, A); roof(.08, .08, 1.84, .49, 34, 7, '#6a7a6a', OCH, 'x'); box(.1, .55, .45, 1.35, 0, 34, OCH, A); roof(.08, .53, .49, 1.39, 34, 7, '#6a7a6a', OCH, 'y');
  box(1.45, .55, .45, 1.35, 0, 34, OCH, A); roof(1.43, .53, .49, 1.39, 34, 7, '#6a7a6a', OCH, 'y'); box(.55, 1.45, .9, .45, 0, 34, OCH, A); roof(.53, 1.43, .94, .49, 34, 7, '#6a7a6a', OCH, 'x');
  cupola(1, 1.7, 41, 3, 2, 0, WHT);
});
SP_('Stock Exchange (Birzha)', 2, 2, 'imp', 'C', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#a8a490'); box(.35, .35, 1.3, 1.1, 0, 24, '#e6dcb8', { left: colonnade(12, WHT, { base: 5, ent: 6, back: 'rgba(0,0,0,.3)' }), right: colonnade(10, WHT, { base: 5, ent: 6, back: 'rgba(0,0,0,.3)' }) });
  poly([[sx(.3, 1.5), sy(.3, 1.5, 30)], [sx(1.7, 1.5), sy(1.7, 1.5, 30)], [sx(1, 1.5), sy(1, 1.5, 44)]], '#d6cca4'); roof(.33, .33, 1.34, 1.14, 30, 10, '#6a7a6a', '#e6dcb8', 'x');
  [[.15, 1.75], [1.85, 1.75]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 5, 2.5, 52, '#b53a30'); cyl(c, b - 52, 7, 3.5, 4, '#8a2a24'); ctx.fillStyle = '#e8531a'; ctx.beginPath(); ctx.arc(c, b - 59, 3, 0, 7); ctx.fill();
    [8, 20, 32].forEach(h => { ctx.fillStyle = '#e0b44a'; ctx.fillRect(c - 7, b - h, 4, 2); ctx.fillRect(c + 3, b - h, 4, 2); }); });
});
SP_('Grand Hotel Europe', 2, 1, 'imp', 'hotel', 3, () => {
  box(.05, .15, 1.9, .7, 0, 62, '#e8d4a0', { left: cmp(rustic, fac(9, 5, { gw: .35, gh: .5, trim: WHT, balc: 2, door: true, doorW: 10, doorH: 14, corniceCol: '#a86a4a' })), right: fac(3, 5, { gw: .35 }) });
  roof(.03, .13, 1.94, .74, 62, 12, '#4a5a5a', '#e8d4a0', 'x'); box(.8, .3, .4, .4, 74, 14, '#e8d4a0', { left: fac(2, 1, { gw: .3, arch: true }), right: fac(2, 1, { gw: .3, arch: true }) }); pyramid(.78, .28, .44, .44, 88, 14, '#4a5a5a');
});
SP_('Wind Sawmill (Lesopilnya)', 1, 1, 'imp', 'I', 0, () => {
  box(.12, .3, .6, .45, 0, 14, '#a67c4a', { left: logs(4), right: logs(4) }); roof(.1, .28, .64, .49, 14, 9, SHING, '#a67c4a', 'x');
  const cx = sx(.6, .5), b = sy(.6, .5, 14); line(cx, b, cx, b - 22, '#6a4a2a', 3); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + .3; line(cx, b - 22, cx + Math.cos(a) * 20, b - 22 + Math.sin(a) * 20, '#6a4a2a', 1.5); poly([[cx + Math.cos(a) * 8, b - 22 + Math.sin(a) * 8], [cx + Math.cos(a) * 20, b - 22 + Math.sin(a) * 20], [cx + Math.cos(a) * 20 - Math.sin(a) * 4, b - 22 + Math.sin(a) * 20 + Math.cos(a) * 4]], '#e8dcc0'); }
  [[.1, .85], [.35, .9], [.6, .88]].forEach(([x, y]) => box(x, y, .22, .08, 0, 4, '#c9a060'));
});
SP_('Rope Walk (Kanatny Dvor)', 2, 1, 'imp', 'I', 1, () => {
  box(.05, .35, 1.9, .3, 0, 16, '#c9b88a', { left: cmp(logs(3), windows({ cols: 12, rows: 1, gw: .4, gh: .5, glass: '#33495a', lit: 0, my: 4, top: 3 })), right: logs(3) }); roof(.03, .33, 1.94, .34, 16, 8, '#6a4a3a', '#c9b88a', 'x');
  for (let i = 0; i < 6; i++) wire(.2 + i * .28, .8, 0, .2 + i * .28, .8, 8, '#8a6538', 2); wire(.2, .8, 8, 1.65, .8, 8, '#d6c490', 1.5);
});
SP_('Imperial Porcelain Works', 2, 1, 'imp', 'I', 2, () => {
  box(.05, .2, 1.4, .6, 0, 34, '#d8c0a0', { left: fac(7, 2, { gw: .3, gh: .5, trim: WHT }), right: fac(3, 2) }); roof(.03, .18, 1.44, .64, 34, 9, '#6a7a6a', '#d8c0a0', 'x');
  const c = sx(1.65, .45), b = sy(1.65, .45, 0); cyl(c, b, 9, 4.5, 30, '#a88a78', { bands: [[.8, .9, '#d8d0c0']] }); cyl(c, b - 30, 5, 2.5, 22, '#a88a78'); smoke(c, b - 52, .8);
});
SP_('Mint (Monetny Dvor)', 2, 1, 'imp', 'I', 2, () => {
  box(.05, .2, 1.9, .6, 0, 40, '#cfc8b8', { left: cmp(rustic, fac(9, 3, { gw: .3, gh: .5, trim: WHT, glass: '#2a3a48' })), right: fac(3, 3, { gw: .3 }) }); roof(.03, .18, 1.94, .64, 40, 8, '#4a5a5a', '#cfc8b8', 'x');
  box(.8, .3, .4, .4, 48, 22, '#cfc8b8', { left: fac(2, 1, { gw: .3 }), right: fac(2, 1, { gw: .3 }) }); pyramid(.78, .28, .44, .44, 70, 24, '#d8b868'); spire(1, .5, 94, 1.5, 12, '#e0b44a', true);
});
SP_('Admiralty Shipyard', 2, 2, 'imp', 'I', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#8c8470'); flat(.1, 1.1, 1.9, 1.9, '#4a86b8');
  box(.1, .15, 1.2, .6, 0, 30, '#d8b070', { left: fac(6, 1, { gw: .5, gh: .6, arch: true, glass: '#2a2018', trim: WHT, my: 4 }), right: fac(3, 1) }); roof(.08, .13, 1.24, .64, 30, 12, '#6a4a3a', '#d8b070', 'x');
  const hx = sx(1.0, 1.4), hb = sy(1.0, 1.4, 0); ctx.fillStyle = '#7a5a34'; ctx.beginPath(); ctx.moveTo(hx - 40, hb - 6); ctx.quadraticCurveTo(hx - 10, hb + 14, hx + 36, hb - 14); ctx.lineTo(hx + 32, hb - 20); ctx.lineTo(hx - 38, hb - 18); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#9a7548'; ctx.fillRect(hx - 38, hb - 24, 70, 6); line(hx - 12, hb - 24, hx - 12, hb - 70, '#4a3426', 2); line(hx + 8, hb - 24, hx + 8, hb - 78, '#4a3426', 2); poly([[hx - 12, hb - 66], [hx - 12, hb - 36], [hx + 4, hb - 40], [hx + 4, hb - 62]], '#efe9d4'); poly([[hx + 8, hb - 74], [hx + 8, hb - 40], [hx + 24, hb - 44], [hx + 24, hb - 70]], '#e4dcc4');
});
SP_('Arsenal Foundry', 2, 2, 'imp', 'I', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#8c8470'); box(.15, .15, 1.7, .7, 0, 30, BRICK, { left: fac(8, 1, { gw: .5, gh: .6, arch: true, glass: '#2a2018', trim: WHT, my: 5 }), right: fac(3, 1, { arch: true, glass: '#2a2018' }) }); roof(.13, .13, 1.74, .74, 30, 11, '#4a5a5a', BRICK, 'x');
  [[.4, 1.3], [1.0, 1.35]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 6, 3, 48, '#a8483a', { bands: [[.9, 1, '#6a2a22']] }); smoke(c, b - 48, .9); });
  [[1.4, 1.35], [1.65, 1.5]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); line(c - 8, b - 1, c + 8, b - 5, '#3a3a38', 4); });
});
SP_('Kunstkamera (Academy of Sciences)', 2, 1, 'imp', 'edu', 3, () => {
  box(.05, .25, 1.9, .55, 0, 44, '#d98a78', { left: fac(9, 3, { gw: .3, gh: .5, trim: WHT, pilasters: true, arch: true }), right: fac(3, 3, { gw: .3 }) }); roof(.03, .23, 1.94, .59, 44, 9, '#6a7a6a', '#d98a78', 'x');
  box(.75, .3, .5, .45, 53, 24, '#d98a78', { left: fac(2, 2, { gw: .3, pilasters: true }), right: fac(2, 2, { gw: .3 }) }); box(.8, .35, .4, .35, 77, 14, WHT, { left: windows({ cols: 2, rows: 1, gw: .3, gh: .6, glass: '#33495a', arch: true }), right: windows({ cols: 2, rows: 1, gw: .3, gh: .6, glass: '#33495a', arch: true }) });
  const cx = sx(1, .5), b = sy(1, .5, 91); sphere(cx, b - 8, 7, '#b8b8ae'); spire(1, .5, 99, 2, 14, '#e0b44a', true);
});
SP_('Smolny Institute', 2, 1, 'imp', 'edu', 2, () => {
  box(.05, .2, 1.9, .6, 0, 46, '#f0e8c8', { left: cmp(rustic, fac(10, 3, { gw: .3, gh: .55, trim: '#d8c8a0', arch: true, pilasters: true })), right: fac(3, 3, { gw: .3 }) }); roof(.03, .18, 1.94, .64, 46, 9, '#6a7a6a', '#f0e8c8', 'x');
  box(.7, .75, .6, .15, 0, 46, '#f0e8c8', { left: portico(6, WHT) }); poly([[sx(.66, .9), sy(.66, .9, 46)], [sx(1.34, .9), sy(1.34, .9, 46)], [sx(1, .9), sy(1, .9, 56)]], '#e8dcc0');
});
SP_('Twelve Collegia (University)', 3, 1, 'imp', 'edu', 4, () => {
  box(.05, .2, 2.9, .6, 0, 48, '#d98a78', { left: cmp(rustic, fac(16, 3, { gw: .3, gh: .55, trim: WHT, pilasters: true, arch: true })), right: fac(3, 3, { gw: .3 }) });
  for (let i = 0; i < 4; i++) { const x = .1 + i * .72; poly([[sx(x, .8), sy(x, .8, 48)], [sx(x + .6, .8), sy(x + .6, .8, 48)], [sx(x + .3, .8), sy(x + .3, .8, 58)]], WHT); }
  roof(.03, .18, 2.94, .64, 48, 7, '#6a7a6a', '#d98a78', 'x');
});
SP_('Obukhov Hospital', 2, 1, 'imp', 'health', 2, () => {
  box(.05, .2, 1.9, .6, 0, 40, '#f0e8c8', { left: fac(9, 3, { gw: .3, gh: .55, trim: '#d8c8a0', arch: true }), right: fac(3, 3, { gw: .3 }) }); roof(.03, .18, 1.94, .64, 40, 9, '#6a7a6a', '#f0e8c8', 'x');
  box(.75, .75, .5, .15, 0, 40, '#f0e8c8', { left: portico(4, WHT) }); poly([[sx(.72, .9), sy(.72, .9, 40)], [sx(1.28, .9), sy(1.28, .9, 40)], [sx(1, .9), sy(1, .9, 49)]], '#e8dcc0'); cupola(1, .45, 49, 5, 4, 7, '#6faa90', { drum: WHT });
});
SP_('Apothecary', 1, 1, 'imp', 'health', 0, () => {
  box(.15, .22, .7, .56, 0, 30, '#d8c8b0', { left: cmp(fac(3, 2, { gw: .3, gh: .5, trim: WHT }), (W, H) => { ctx.fillStyle = '#3f8a5a'; ctx.fillRect(W / 2 - 6, 3, 12, 8); ctx.fillStyle = WHT; ctx.fillRect(W / 2 - 1, 4, 2, 6); ctx.fillRect(W / 2 - 3, 6, 6, 2); }), right: fac(2, 2) }); roof(.13, .2, .74, .6, 30, 8, '#7a4a3a', '#d8c8b0', 'x');
});
SP_('Winter Palace', 3, 2, 'imp', 'cult', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#bfb8a0'); const A = { left: cmp(rustic, fac(18, 3, { gw: .32, gh: .55, trim: WHT, arch: true, pilasters: true, cornice: 4, corniceCol: WHT, plinth: 5, pilCol: 'rgba(255,255,255,.55)' })), right: fac(10, 3, { gw: .32, gh: .55, trim: WHT, arch: true, pilasters: true, pilCol: 'rgba(255,255,255,.55)' }) };
  box(.1, .2, 2.8, 1.6, 0, 56, IGRN, A); box(.1, .2, 2.8, 1.6, 56, 4, '#9aa890'); statuesTop(.1, .2, 2.8, 1.6, 60, 18);
  box(1.2, 1.7, .6, .2, 0, 40, IGRN, { left: cmp((W, H) => { ctx.fillStyle = '#e0b44a'; ctx.fillRect(W / 2 - 6, 0, 12, 22); ctx.fillStyle = '#33495a'; ctx.beginPath(); ctx.moveTo(W / 2 - 4, 0); ctx.lineTo(W / 2 - 4, 16); ctx.quadraticCurveTo(W / 2, 22, W / 2 + 4, 16); ctx.lineTo(W / 2 + 4, 0); ctx.fill(); }) });
  [[.1, 1.5], [2.5, 1.5]].forEach(([x, y]) => { box(x, y, .4, .3, 40, 22, IGRN, { left: fac(2, 2, { gw: .3, arch: true, trim: WHT }) }); });
  const cx = sx(1.5, 1), b = sy(1.5, 1, 60); cyl(cx, b, 8, 4, 8, WHT); cyl(cx, b - 8, 5, 2.5, 6, '#e0b44a');
});
SP_('Kazan Cathedral', 2, 2, 'imp', 'relig', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8b4a0'); box(.1, 1.0, .35, .9, 0, 30, '#e8e2cc', { right: colonnade(8, WHT, { back: 'rgba(0,0,0,.3)' }) }); box(1.55, 1.0, .35, .9, 0, 30, '#e8e2cc', { right: colonnade(8, WHT, { back: 'rgba(0,0,0,.3)' }) });
  box(.45, .3, 1.1, 1.3, 0, 46, '#d8cfae', { left: cmp(rustic, fac(5, 2, { gw: .2, gh: .5, arch: true, trim: WHT, pilasters: true })), right: fac(5, 2, { gw: .2, gh: .5, arch: true, trim: WHT }) }); box(.55, 1.6, .9, .2, 0, 46, '#d8cfae', { left: portico(6, WHT) }); poly([[sx(.52, 1.8), sy(.52, 1.8, 46)], [sx(1.48, 1.8), sy(1.48, 1.8, 46)], [sx(1, 1.8), sy(1, 1.8, 58)]], '#c8bf9e');
  const cx = sx(1, .9), b = sy(1, .9, 46); cyl(cx, b, 17, 8.5, 16, '#d8cfae', { bands: [[.4, .6, '#6a8a9a']] }); dome(cx, b - 16, 17, '#8fb4a8'); cyl(cx, b - 34, 4, 2, 6, WHT); onion(cx, b - 40, 4, 8, '#e0b44a'); crossAt(cx, b - 48, 8);
});
SP_("St. Isaac's Cathedral", 2, 2, 'imp', 'relig', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8b4a0'); box(.2, .2, 1.6, 1.6, 0, 50, '#c8c0b0', { left: cmp(rustic, colonnade(8, '#b8b0a0', { base: 6, ent: 6, back: 'rgba(0,0,0,.28)', mx: 6 })), right: colonnade(8, '#a8a090', { base: 6, ent: 6, back: 'rgba(0,0,0,.28)', mx: 6 }) });
  poly([[sx(.15, 1.8), sy(.15, 1.8, 50)], [sx(1.85, 1.8), sy(1.85, 1.8, 50)], [sx(1, 1.8), sy(1, 1.8, 62)]], '#b4ac9c');
  [[.3, .3], [1.7, .3], [.3, 1.7], [1.7, 1.7]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 50); cyl(c, b, 5, 2.5, 6, '#c8c0b0'); dome(c, b - 6, 5, '#e0b44a'); });
  const cx = sx(1, 1), b = sy(1, 1, 50); cyl(cx, b, 16, 8, 24, '#c8c0b0', { bands: [[.3, .7, '#8a8272']] }); cyl(cx, b - 24, 18, 9, 4, '#a8a090'); dome(cx, b - 28, 18, '#e0b44a'); cyl(cx, b - 46, 4, 2, 8, '#c8c0b0'); dome(cx, b - 54, 4, '#e0b44a'); crossAt(cx, b - 58, 8);
});
SP_('Peter & Paul Cathedral', 2, 1, 'imp', 'relig', 3, () => {
  box(.05, .25, 1.2, .5, 0, 28, '#f0e8d0', { left: fac(5, 1, { gw: .22, gh: .55, arch: true, trim: '#c9a050', pilasters: true, my: 6, door: true, doorW: 8, doorH: 12 }), right: fac(2, 1, { gw: .22, gh: .55, arch: true }) }); roof(.03, .23, 1.24, .54, 28, 8, '#6a7a6a', '#f0e8d0', 'x');
  box(1.2, .28, .5, .44, 0, 44, '#f0e8d0', { left: fac(2, 3, { gw: .25, gh: .4, arch: true }), right: fac(2, 3, { gw: .25, gh: .4, arch: true }) }); box(1.27, .35, .36, .3, 44, 16, '#f6efd8', { left: windows({ cols: 2, rows: 1, gw: .25, gh: .6, glass: '#33495a', arch: true }) });
  const cx = sx(1.45, .5), b = sy(1.45, .5, 60); poly([[cx - 5, b], [cx + 5, b], [cx, b - 62]], '#e0b44a'); sphere(cx, b - 28, 3.5, '#e0b44a'); line(cx, b - 62, cx, b - 70, '#e0b44a', 1.5);
});
SP_('Smolny Cathedral', 2, 2, 'imp', 'relig', 4, () => {
  const bl = '#7fb6d8'; box(.25, .25, 1.5, 1.5, 0, 56, bl, { left: cmp(stripesFace(bl, '#76acce', 3), fac(5, 2, { gw: .22, gh: .5, arch: true, trim: WHT, pilasters: true, cornice: 4, corniceCol: WHT, glass: '#33495a', pilCol: 'rgba(255,255,255,.75)', door: true, doorW: 10, doorH: 16 })), right: cmp(stripesFace('#6aa0c0', '#6097b8', 3), fac(5, 2, { gw: .22, gh: .5, arch: true, trim: WHT, pilasters: true, cornice: 4, corniceCol: WHT, pilCol: 'rgba(255,255,255,.6)' })) });
  [[.25, .25], [1.55, .25], [.25, 1.55], [1.55, 1.55]].forEach(([x, y]) => { box(x, y, .2, .2, 56, 26, bl, { left: fac(1, 1, { gw: .3, gh: .5, arch: true, trim: WHT }) }); cupola(x + .1, y + .1, 82, 5, 4, 10, '#3a6fb0', { drum: WHT, stripes: GOLD }); });
  cupola(1, 1, 56, 11, 22, 24, '#3a6fb0', { drum: bl, stripes: GOLD, cross: 12 });
});
SP_('Mariinsky Theatre', 2, 1, 'imp', 'cult', 3, () => {
  box(.05, .2, 1.9, .6, 0, 38, TEAL, { left: fac(9, 3, { gw: .3, gh: .5, trim: WHT, arch: true, pilasters: true, pilCol: 'rgba(255,255,255,.5)' }), right: fac(3, 3, { gw: .3, trim: WHT }) });
  box(.6, .8, .8, .18, 0, 38, TEAL, { left: portico(6, WHT) }); poly([[sx(.56, .98), sy(.56, .98, 38)], [sx(1.44, .98), sy(1.44, .98, 38)], [sx(1, .98), sy(1, .98, 49)]], '#e8e0cc');
  roof(.03, .18, 1.94, .64, 38, 8, '#6a7a6a', TEAL, 'x'); box(.7, .3, .6, .35, 46, 14, '#4a8a8a'); roof(.68, .28, .64, .39, 60, 8, '#6a7a6a', '#4a8a8a', 'x');
});
SP_('Alexandrinsky Theatre', 2, 1, 'imp', 'cult', 3, () => {
  box(.05, .2, 1.9, .6, 0, 40, '#f0e0b8', { left: fac(9, 3, { gw: .3, gh: .5, trim: WHT, arch: true, pilasters: true }), right: fac(3, 3, { gw: .3 }) }); box(.55, .8, .9, .22, 0, 40, '#f0e0b8', { left: portico(6, WHT) });
  poly([[sx(.5, 1.02), sy(.5, 1.02, 40)], [sx(1.5, 1.02), sy(1.5, 1.02, 40)], [sx(1, 1.02), sy(1, 1.02, 52)]], '#e8d8a8'); roof(.03, .18, 1.94, .64, 40, 8, '#6a7a6a', '#f0e0b8', 'x');
  const cx = sx(1, .85), b = sy(1, .85, 54); ctx.fillStyle = '#7a8a6a'; ctx.fillRect(cx - 6, b - 8, 12, 4); [-4, 0, 4].forEach(o => { ctx.beginPath(); ctx.arc(cx + o, b - 11, 2.2, 0, 7); ctx.fill(); }); line(cx - 6, b - 8, cx + 6, b - 14, '#7a8a6a', 1.5);
});
SP_('Admiralty', 3, 2, 'imp', 'gov', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#bfb8a0'); box(.1, .7, 2.8, .7, 0, 34, '#e8c070', { left: cmp(rustic, fac(16, 2, { gw: .32, gh: .55, trim: WHT, arch: true, pilasters: true, corniceCol: WHT })), right: fac(5, 2, { gw: .3 }) });
  box(1.05, .7, .9, .75, 34, 22, WHT, { left: colonnade(8, '#e8dcb8', { base: 2, ent: 3, back: 'rgba(0,0,0,.25)' }), right: fac(4, 1, { gw: .3, arch: true }) }); box(1.15, .8, .7, .55, 56, 22, '#e8c070', { left: fac(3, 1, { gw: .3, arch: true, trim: WHT, pilasters: true }), right: fac(3, 1, { gw: .3, arch: true, trim: WHT }) });
  box(1.25, .9, .5, .35, 78, 10, WHT, { left: colonnade(5, '#e8dcb8', { base: 1, ent: 2, back: 'rgba(0,0,0,.3)' }) }); spire(1.5, 1.08, 88, 4, 52, '#e0b44a', false);
  const c = sx(1.5, 1.08), b = sy(1.5, 1.08, 140); poly([[c - 6, b - 3], [c + 8, b - 3], [c + 5, b + 2], [c - 3, b + 2]], '#e0b44a'); line(c, b - 3, c, b - 14, '#e0b44a', 1.5); poly([[c, b - 14], [c + 8, b - 12], [c, b - 9]], '#e0b44a');
  [[.1, 1.4], [2.5, 1.4]].forEach(([x, y]) => { box(x, y, .4, .3, 0, 38, '#e8c070', { left: fac(2, 2, { gw: .3, arch: true, trim: WHT }) }); });
});
SP_('General Staff Arch', 3, 2, 'imp', 'gov', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#bfb8a0'); const A = { left: cmp(rustic, fac(14, 3, { gw: .32, gh: .55, trim: WHT, arch: true, pilasters: true, corniceCol: WHT, glass: '#33495a' })), right: fac(5, 3, { gw: .32, gh: .55, trim: WHT, arch: true, pilasters: true }) };
  box(.1, .2, 1.1, .8, 0, 48, '#e0b878', A); box(1.8, .2, 1.1, .8, 0, 48, '#e0b878', A); box(1.2, .2, .6, .8, 0, 30, '#e0b878', { left: (W, H) => { ctx.fillStyle = '#e0b878'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#b4d8f0'; ctx.fillRect(W / 2 - 8, 0, 16, 1); } });
  box(1.15, .3, .7, .6, 30, 26, '#e0b878', { left: cmp(stripesFace('#e0b878', '#d8ae6c', 10), colonnade(4, WHT, { base: 2, ent: 3 })), right: stripesFace('#c8a060', '#c09858', 10) }); box(1.1, .25, .8, .7, 56, 3, WHT);
  const cx = sx(1.5, .55), b = sy(1.5, .55, 59); [-9, 0, 9].forEach((o, i) => { ctx.fillStyle = '#7a8a5a'; ctx.fillRect(cx + o - 3, b - 6, 6, 6); ctx.beginPath(); ctx.arc(cx + o, b - 9, 2.5, 0, 7); ctx.fill(); }); line(cx - 12, b - 6, cx + 12, b - 14, '#7a8a5a', 1.8);
  box(.1, 1.0, 1.1, .8, 0, 48, '#e0b878', A);
});
SP_('Senate & Synod', 2, 1, 'imp', 'gov', 3, () => {
  box(.05, .25, .75, .55, 0, 46, '#e8d0a8', { left: fac(4, 3, { gw: .3, trim: WHT, pilasters: true, arch: true }), right: fac(3, 3, { gw: .3 }) }); box(1.2, .25, .75, .55, 0, 46, '#e8d0a8', { left: fac(4, 3, { gw: .3, trim: WHT, pilasters: true, arch: true }), right: fac(3, 3, { gw: .3 }) });
  box(.8, .3, .4, .45, 0, 20, '#e8d0a8', { left: (W, H) => { ctx.fillStyle = '#e8d0a8'; ctx.fillRect(0, 0, W, H); } }); box(.8, .25, .4, .5, 20, 26, '#e8d0a8', { left: fac(2, 1, { gw: .3, arch: true, trim: WHT }) });
  roof(.03, .23, .79, .59, 46, 9, '#6a7a6a', '#e8d0a8', 'x'); roof(1.18, .23, .79, .59, 46, 9, '#6a7a6a', '#e8d0a8', 'x'); statuesTop(.8, .25, .4, .5, 46, 4);
});
SP_('Peterhof Grand Cascade', 2, 2, 'imp', 'cult', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#6faa6a'); flat(.8, .9, 1.2, 1.95, '#4a86b8'); flat(.4, 1.5, 1.6, 1.95, '#4a86b8');
  for (let i = 0; i < 4; i++) { const y = .75 + i * .22; flat(.6 - i * .02, y, 1.4 + i * .02, y + .1, '#bfd8e0', i * 3); box(.6 - i * .02, y + .1, .8 + i * .04, .02, i * 3 - 3, 3, '#d8d2c0'); }
  box(.3, .2, 1.4, .5, 0, 36, '#f0e0a8', { left: fac(8, 2, { gw: .3, trim: WHT, arch: true, pilasters: true, corniceCol: '#e0b44a' }), right: fac(3, 2, { gw: .3 }) }); roof(.28, .18, 1.44, .54, 36, 8, '#6a7a6a', '#f0e0a8', 'x');
  [0.8, 1.0, 1.2].forEach(x => { const c = sx(x, 1.2), b = sy(x, 1.2, 4); ctx.fillStyle = '#e0b44a'; ctx.fillRect(c - 1.5, b - 8, 3, 8); sphere(c, b - 10, 2.2, '#e0b44a'); });
  const c = sx(1, 1.75), b = sy(1, 1.75, 0); for (let k = -2; k <= 2; k++) line(c, b, c + k * 4, b - 26 + Math.abs(k) * 4, 'rgba(220,240,250,.9)', 1.5);
});
SP_('Bronze Horseman', 1, 1, 'imp', 'mon', 4, () => {
  const cx = sx(.5, .5), b = sy(.5, .5, 0), g = ctx.createLinearGradient(cx - 22, 0, cx + 22, 0); g.addColorStop(0, '#9a968c'); g.addColorStop(1, '#5a574f');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 24, b + 2); ctx.lineTo(cx - 20, b - 18); ctx.quadraticCurveTo(cx - 8, b - 36, cx + 8, b - 30); ctx.lineTo(cx + 22, b - 14); ctx.lineTo(cx + 26, b + 2); ctx.ellipse(cx, b + 2, 25, 12, 0, 0, Math.PI); ctx.closePath(); ctx.fill();
  const bz = '#4a3a2a'; ctx.fillStyle = bz; ctx.beginPath(); ctx.moveTo(cx - 10, b - 32); ctx.quadraticCurveTo(cx - 14, b - 50, cx - 6, b - 62); ctx.lineTo(cx + 2, b - 70); ctx.lineTo(cx + 8, b - 66); ctx.lineTo(cx + 4, b - 56); ctx.quadraticCurveTo(cx + 10, b - 46, cx + 14, b - 34); ctx.lineTo(cx + 6, b - 30); ctx.lineTo(cx + 2, b - 44); ctx.lineTo(cx - 4, b - 32); ctx.closePath(); ctx.fill();
  ctx.fillRect(cx - 2, b - 62, 5, 14); ctx.beginPath(); ctx.arc(cx, b - 74, 3, 0, 7); ctx.fill(); line(cx + 2, b - 66, cx + 12, b - 78, bz, 2.5);
});
SP_('Alexander Column', 1, 1, 'imp', 'mon', 3, () => {
  box(.15, .15, .7, .7, 0, 8, '#b8b4a8'); box(.22, .22, .56, .56, 8, 18, '#c4beb0', { left: (W, H) => { ctx.fillStyle = '#e0b44a'; ctx.fillRect(W / 2 - 5, H / 2 - 3, 10, 6); }, right: (W, H) => { ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(3, 3, W - 6, H - 6); } });
  const cx = sx(.5, .5), b = sy(.5, .5, 26), g = ctx.createLinearGradient(cx - 6, 0, cx + 6, 0); g.addColorStop(0, '#d8a090'); g.addColorStop(1, '#8a5a4e'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 7, b); ctx.lineTo(cx - 5, b - 90); ctx.lineTo(cx + 5, b - 90); ctx.lineTo(cx + 7, b); ctx.ellipse(cx, b, 7, 3.5, 0, 0, Math.PI); ctx.fill();
  cyl(cx, b - 90, 8, 4, 3, '#a8a49a'); ctx.fillStyle = '#4a4a44'; ctx.fillRect(cx - 2, b - 108, 4, 12); ctx.beginPath(); ctx.arc(cx, b - 110, 2.4, 0, 7); ctx.fill(); line(cx, b - 104, cx - 8, b - 98, '#4a4a44', 1.5); line(cx, b - 104, cx + 8, b - 98, '#4a4a44', 1.5); line(cx, b - 110, cx, b - 120, '#4a4a44', 1.5); line(cx - 3, b - 116, cx + 3, b - 116, '#4a4a44', 1.2);
});
SP_('Rostral Column', 1, 1, 'imp', 'mon', 2, () => {
  box(.2, .2, .6, .6, 0, 10, '#b8b4a8'); box(.28, .28, .44, .44, 10, 6, '#c8c2b4');
  const cx = sx(.5, .5), b = sy(.5, .5, 16), g = ctx.createLinearGradient(cx - 9, 0, cx + 9, 0); g.addColorStop(0, '#e0d0b0'); g.addColorStop(1, '#7a6a4a');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 9, b); ctx.lineTo(cx - 7, b - 62); ctx.lineTo(cx + 7, b - 62); ctx.lineTo(cx + 9, b); ctx.ellipse(cx, b, 9, 4.5, 0, 0, Math.PI); ctx.fill();
  [14, 28, 42].forEach((h, i) => { ctx.fillStyle = '#c9a050'; ctx.fillRect(cx - 12, b - h, 5, 3); ctx.fillRect(cx + 7, b - h, 5, 3); poly([[cx - 12, b - h], [cx - 17, b - h - 1], [cx - 12, b - h + 3]], '#c9a050'); poly([[cx + 12, b - h], [cx + 17, b - h - 1], [cx + 12, b - h + 3]], '#c9a050'); });
  cyl(cx, b - 62, 10, 5, 4, '#a8a49a'); ctx.fillStyle = '#e8531a'; ctx.beginPath(); ctx.moveTo(cx - 5, b - 66); ctx.quadraticCurveTo(cx - 6, b - 74, cx, b - 82); ctx.quadraticCurveTo(cx + 6, b - 74, cx + 5, b - 66); ctx.fill(); ctx.fillStyle = '#ffd060'; ctx.beginPath(); ctx.moveTo(cx - 2, b - 66); ctx.quadraticCurveTo(cx - 3, b - 72, cx, b - 77); ctx.quadraticCurveTo(cx + 3, b - 72, cx + 2, b - 66); ctx.fill();
});
SP_('Summer Garden Tea House', 1, 1, 'imp', 'decor', 1, () => {
  flat(.05, .05, .95, .95, '#7aa860'); flat(.1, .45, .9, .55, '#d8cca0'); box(.3, .3, .4, .4, 0, 5, '#d8d2c0'); [[.32, .32], [.62, .32], [.32, .62], [.62, .62]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 5); ctx.fillStyle = WHT; ctx.fillRect(c - 1.5, b - 20, 3, 20); });
  pyramid(.26, .26, .48, .48, 25, 14, IGRN); cupola(.5, .5, 39, 2, 2, 5, '#e0b44a'); tree(.15, .8, .9); tree(.85, .2, .9);
});
SP_('Kalancha (Fire Watchtower)', 1, 1, 'imp', 'safe', 1, () => {
  box(.15, .3, .7, .5, 0, 26, OCH, { left: fac(3, 1, { gw: .3, gh: .55, trim: WHT, arch: true, door: true, doorW: 10, doorH: 14, my: 5 }), right: fac(2, 1) }); roof(.13, .28, .74, .54, 26, 7, '#6a7a6a', OCH, 'x');
  box(.4, .35, .22, .22, 26, 38, OCH, { left: windows({ cols: 1, rows: 3, gw: .3, gh: .3, glass: '#33495a', arch: true, trim: WHT }), right: windows({ cols: 1, rows: 3, gw: .3, gh: .3, glass: '#33495a' }) }); box(.36, .31, .3, .3, 64, 8, WHT, { left: colonnade(4, '#c9a050', { base: 0, ent: 1 }) }); pyramid(.34, .29, .34, .34, 72, 14, '#6a7a6a'); spire(.5, .46, 86, 1.2, 10, '#e0b44a', true);
});
SP_('Drawbridge (Raising Bridge)', 1, 1, 'imp', 'transit', 2, () => {
  flat(0, 0, 1, 1, '#4a86b8'); for (let i = 0; i < 3; i++) flat(.1, .15 + i * .3, .45, .17 + i * .3, 'rgba(255,255,255,.35)');
  box(0, .3, .2, .4, 0, 12, '#a8a49a'); box(.8, .3, .2, .4, 0, 12, '#a8a49a'); flat(0, .32, .2, .68, ASPH, 12.2); flat(.8, .32, 1, .68, ASPH, 12.2);
  poly([[sx(.2, .32), sy(.2, .32, 12)], [sx(.2, .68), sy(.2, .68, 12)], [sx(.28, .68), sy(.28, .68, 46)], [sx(.28, .32), sy(.28, .32, 46)]], '#6a6a66'); poly([[sx(.8, .32), sy(.8, .32, 12)], [sx(.8, .68), sy(.8, .68, 12)], [sx(.72, .68), sy(.72, .68, 46)], [sx(.72, .32), sy(.72, .32, 46)]], '#5a5a56');
  [[.12, .5], [.88, .5]].forEach(([x, y]) => { box(x - .05, y - .1, .1, .2, 0, 30, '#c9a050'); });
});
