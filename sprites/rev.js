// Epoch: Russian Revival & Industrial Empire (c. 1850 - 1917).
const RBR = '#a8483a', RBR2 = '#b8574a', STN = '#e8dcc0', RSLT = '#5a6a6a', IRN = '#4a5a60', ART = '#d8c8a0', WAVE = '#7aa89a';
const brickBand = (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.14)'; ctx.lineWidth = .6; for (let j = 0; j < 8; j++) { ctx.beginPath(); ctx.moveTo(0, 1 + j * 3); ctx.lineTo(W, 1 + j * 3); ctx.stroke(); } };
const kokosh = (W, H) => { ctx.fillStyle = '#f4efe4'; for (let i = 0; i < 6; i++) { const x = 3 + i * (W - 6) / 6, w = (W - 6) / 6; ctx.beginPath(); ctx.moveTo(x, H - 4); ctx.quadraticCurveTo(x + w / 2, H + 2, x + w, H - 4); ctx.lineTo(x + w, H - 6); ctx.lineTo(x, H - 6); ctx.fill(); } };
const rf = (c, r, o = {}) => facade(Object.assign({ cols: c, rows: r, gw: .4, gh: .55, glass: '#2f4452', trim: WHT, cornice: 3, corniceCol: WHT, plinth: 3 }, o));
const glassVault = (x0, y0, w, d, z) => { for (let i = 0; i < 8; i++) { const x = x0 + w * i / 8; poly([[sx(x, y0), sy(x, y0, z)], [sx(x + w / 8, y0), sy(x + w / 8, y0, z)], [sx(x + w / 8, y0 + d), sy(x + w / 8, y0 + d, z)], [sx(x, y0 + d), sy(x, y0 + d, z)]], i % 2 ? 'rgba(170,215,230,.85)' : 'rgba(150,200,220,.85)'); } };

SP_('Carved-Wood Villa (Dacha)', 1, 1, 'rev', 'R', 0, () => {
  box(.18, .25, .64, .5, 0, 20, '#c9a070', { left: cmp(logs(5), windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#2f4452', trim: '#f4ead0', my: 5, top: 4 }), (W, H) => { ctx.fillStyle = '#f4ead0'; for (let i = 0; i < 12; i++) ctx.fillRect(1 + i * W / 12, H - 3, 1.6, 3); }), right: logs(5) });
  roof(.15, .22, .7, .56, 20, 12, '#4a8a6a', '#c9a070', 'y'); box(.3, .78, .4, .12, 0, 6, '#c9a070'); tree(.85, .9, .7); tree(.15, .9, .7);
});
SP_('Worker Barracks', 2, 1, 'rev', 'R', 1, () => {
  box(.05, .2, 1.9, .6, 0, 36, RBR, { left: cmp(brickBand, windows({ cols: 12, rows: 3, gw: .35, gh: .5, glass: '#2f4452', lit: .1, my: 4, top: 4 })), right: cmp(brickBand, windows({ cols: 3, rows: 3, gw: .35, gh: .5, glass: '#2f4452', lit: .1 })) }); roof(.03, .18, 1.94, .64, 36, 9, RSLT, RBR, 'x');
  [.4, 1.0, 1.6].forEach(x => box(x, .3, .08, .08, 42, 10, '#7a3a2a'));
});
SP_('Courtyard Tenement House', 2, 1, 'rev', 'R', 1, () => {
  box(.05, .15, 1.9, .7, 0, 48, '#d8b88a', { left: rf(9, 4, { gw: .32, balc: 3, corniceCol: '#8a5a40', arch: false }), right: rf(3, 4, { gw: .32 }) }); roof(.03, .13, 1.94, .74, 48, 9, '#5a5a5a', '#d8b88a', 'x'); box(.85, .8, .3, .1, 0, 10, '#d8b88a', { left: (W, H) => { ctx.fillStyle = '#3a2a22'; ctx.fillRect(W / 2 - 4, 0, 8, 8); } });
});
SP_('Merchant Mansion (Russian Revival)', 2, 1, 'rev', 'R', 2, () => {
  box(.05, .15, 1.9, .7, 0, 44, '#b8573a', { left: cmp(stripesFace('#b8573a', '#c4634a', 24), rf(7, 2, { gw: .3, gh: .55, arch: true, trim: '#f4efe4', cornice: 0, door: false }), kokosh), right: cmp(stripesFace('#a04a32', '#aa5238', 12), rf(3, 2, { gw: .3, arch: true, trim: '#f4efe4' })) });
  roof(.03, .13, 1.94, .74, 44, 12, '#3f8a5a', '#b8573a', 'x'); box(.75, .8, .5, .2, 0, 36, '#f4efe4', { left: cmp(rf(2, 1, { arch: true, gw: .3 }), (W, H) => { ctx.fillStyle = '#4a3426'; ctx.fillRect(W / 2 - 4, 0, 8, 12); }) }); pyramid(.73, .78, .54, .24, 36, 16, '#3f8a5a'); cupola(1, .9, 52, 3, 2, 6, GOLD);
});
SP_('Art Nouveau Mansion', 2, 1, 'rev', 'R', 3, () => {
  box(.05, .2, 1.9, .65, 0, 40, '#e6d8b0', { left: cmp(rustic, windows({ cols: 5, rows: 2, gw: .38, gh: .55, glass: '#2f4452', arch: true, trim: '#7aa89a', my: 5, top: 6 }), (W, H) => { ctx.strokeStyle = WAVE; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= W; i += 2) ctx.lineTo(i, H - 4 + Math.sin(i / 3) * 1.8); ctx.stroke(); ctx.fillStyle = WAVE; for (let i = 5; i < W; i += 10) { ctx.beginPath(); ctx.arc(i, H - 9, 1.6, 0, 7); ctx.fill(); } }), right: rf(3, 2, { arch: true, trim: WAVE, gw: .3 }) });
  box(1.4, .15, .55, .6, 0, 56, '#e6d8b0', { left: rf(2, 3, { arch: true, trim: WAVE, gw: .32 }), right: rf(3, 3, { arch: true, trim: WAVE, gw: .3 }) }); roof(1.38, .13, .59, .64, 56, 10, '#4a8a6a', '#e6d8b0', 'x'); roof(.03, .18, 1.38, .69, 40, 8, '#4a8a6a', '#e6d8b0', 'x');
  box(.7, .85, .5, .12, 0, 20, '#e6d8b0', { left: (W, H) => { ctx.fillStyle = '#4a3426'; ctx.fillRect(W / 2 - 5, 0, 10, 12); ctx.fillStyle = WAVE; ctx.fillRect(2, H - 3, W - 4, 2); } });
});
SP_('Grand Apartment House (Tolstoy House)', 2, 2, 'rev', 'R', 4, () => {
  const A = { left: cmp(rustic, rf(8, 6, { gw: .3, gh: .5, balc: 2, trim: WHT, arch: false, corniceCol: '#8a6a50' })), right: rf(6, 6, { gw: .3, gh: .5, balc: 2 }) };
  box(.1, .1, 1.8, .6, 0, 70, '#d8c8a0', A); box(.1, .7, .6, 1.2, 0, 70, '#d8c8a0', A); box(1.3, .7, .6, 1.2, 0, 70, '#d8c8a0', A);
  [[.1, .1], [1.3, 1.3]].forEach(([x, y]) => { box(x + .05, y + .05, .5, .5, 70, 22, '#e8dcc0', { left: rf(2, 2, { arch: true, gw: .3 }), right: rf(2, 2, { arch: true, gw: .3 }) }); pyramid(x + .02, y + .02, .56, .56, 92, 24, '#3f8a5a'); spire(x + .33, y + .33, 116, 1.5, 10, GOLD, true); });
  roof(.08, .08, 1.84, .64, 70, 8, '#5a5a5a', '#d8c8a0', 'x'); tree(1.0, 1.4, 1); tree(.95, 1.7, .9);
});
SP_('Bakaleya (Corner Grocery)', 1, 1, 'rev', 'C', 0, () => {
  box(.15, .22, .7, .56, 0, 30, '#d8b080', { left: (W, H) => { ctx.fillStyle = '#2f4452'; ctx.fillRect(3, 2, W - 6, 11); ctx.fillStyle = '#2f6f8a'; ctx.fillRect(2, 14, W - 4, 5); faceText('БАКАЛЕЯ', W / 2, 16.5, 4.2, '#f4ead0'); windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#2f4452', trim: WHT, my: 20, top: 2 })(W, H, 1); }, right: rf(2, 2, { gh: .4 }) }); roof(.13, .2, .74, .6, 30, 8, '#6a3a2a', '#d8b080', 'x');
});
SP_("Tea Merchant's House (Pagoda)", 1, 1, 'rev', 'C', 1, () => {
  box(.18, .25, .64, .5, 0, 34, '#c0392b', { left: cmp(stripesFace('#c0392b', '#b03226', 10), windows({ cols: 3, rows: 2, gw: .3, gh: .45, glass: '#2a3a46', trim: GOLD, arch: false, my: 5, top: 5 }), (W, H) => { ctx.fillStyle = GOLD; ctx.fillRect(0, H - 3, W, 2); }), right: stripesFace('#a02f24', '#942a20', 10) });
  for (let k = 0; k < 2; k++) { const z = 34 + k * 8, o = k * .08; poly([[sx(.1 + o, .18 + o), sy(.1 + o, .18 + o, z)], [sx(.9 - o, .18 + o), sy(.9 - o, .18 + o, z)], [sx(.9 - o, .82 - o), sy(.9 - o, .82 - o, z)], [sx(.1 + o, .82 - o), sy(.1 + o, .82 - o, z)]], '#3a7a5a'); }
  pyramid(.22, .28, .56, .44, 50, 12, '#2f6f4a'); spire(.5, .5, 62, 1.2, 8, GOLD, true);
});
SP_('Eliseevsky-Style Emporium', 2, 1, 'rev', 'C', 2, () => {
  box(.05, .15, 1.9, .7, 0, 52, '#ece0c0', { left: (W, H) => { ctx.fillStyle = '#2f4452'; ctx.fillRect(3, 2, W - 6, 16); ctx.strokeStyle = GOLD; ctx.lineWidth = 1.2; for (let i = 0; i <= 9; i++) { const x = 3 + i * (W - 6) / 9; ctx.beginPath(); ctx.moveTo(x, 2); ctx.lineTo(x, 18); ctx.stroke(); } ctx.strokeRect(3, 2, W - 6, 16); windows({ cols: 9, rows: 2, gw: .4, gh: .55, glass: '#2f4452', arch: true, trim: WHT, pilasters: true, my: 21, top: 5 })(W, H, 1); ctx.fillStyle = GOLD; ctx.fillRect(0, H - 4, W, 3); }, right: rf(3, 3, { arch: true }) }); roof(.03, .13, 1.94, .74, 52, 8, '#3f6a5a', '#ece0c0', 'x');
  [.4, 1.0, 1.6].forEach(x => { const c = sx(x, .85), b = sy(x, .85, 52); ctx.fillStyle = GOLD; ctx.fillRect(c - 1, b - 8, 2, 8); sphere(c, b - 10, 2.5, GOLD); });
});
SP_('Bank (Granite Palazzo)', 2, 1, 'rev', 'C', 3, () => {
  box(.05, .15, 1.9, .7, 0, 46, '#8a8478', { left: cmp(rustic, rf(7, 3, { gw: .3, gh: .55, arch: true, trim: '#c4bca8', glass: '#2a3a48', plinth: 6, plinthCol: 'rgba(0,0,0,.25)', corniceCol: '#c4bca8', pilasters: true, pilCol: 'rgba(255,255,255,.18)', door: true, doorW: 12, doorH: 16 })), right: rf(3, 3, { arch: true, gw: .3, glass: '#2a3a48', trim: '#c4bca8' }) }); roof(.03, .13, 1.94, .74, 46, 7, '#4a5a5a', '#8a8478', 'x');
  box(.85, .82, .3, .1, 0, 14, '#a8a294', { left: portico(2, '#c4bca8') });
});
SP_('Upper Trading Rows (GUM-style)', 3, 2, 'rev', 'C', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#b8b0a0'); const A = { left: cmp(rustic, rf(18, 3, { gw: .4, gh: .55, arch: true, trim: '#f4e0d8', glass: '#2f4452', pilasters: true, pilCol: 'rgba(255,255,255,.3)', corniceCol: '#f4e0d8', plinth: 4 })), right: rf(10, 3, { gw: .4, gh: .55, arch: true, trim: '#f4e0d8', glass: '#2f4452', pilasters: true }) };
  box(.1, .2, 2.8, 1.6, 0, 52, '#c88c7a', A); box(.1, .2, 2.8, 1.6, 52, 3, '#f4e0d8'); glassVault(.5, .5, 2.0, .9, 55);
  [.1, 2.55].forEach(x => { box(x, .2, .35, .45, 55, 16, '#c88c7a', { left: rf(1, 1, { arch: true, gw: .4 }), right: rf(2, 1, { arch: true, gw: .3 }) }); pyramid(x - .02, .18, .39, .49, 71, 20, '#3f8a5a'); });
  box(1.15, .2, .7, .5, 55, 24, '#c88c7a', { left: cmp(rf(3, 2, { arch: true, gw: .3, trim: '#f4e0d8' })), right: rf(2, 2, { arch: true, gw: .3 }) }); pyramid(1.13, .18, .74, .54, 79, 22, '#3f8a5a'); spire(1.5, .45, 101, 1.4, 10, GOLD, true);
});
SP_('Metropol Hotel (Art Nouveau)', 2, 1, 'rev', 'hotel', 4, () => {
  box(.05, .15, 1.9, .7, 0, 62, '#e0cca0', { left: cmp(rustic, rf(9, 5, { gw: .35, gh: .5, arch: true, trim: WAVE, balc: 3, corniceCol: '#8a6a50', door: true, doorW: 10, doorH: 15 }), (W, H) => { ctx.fillStyle = WAVE; for (let i = 0; i < 9; i++) { const x = 3 + i * (W - 6) / 9; ctx.beginPath(); ctx.arc(x + 3.5, H - 8, 2.2, 0, 7); ctx.fill(); } }), right: rf(3, 5, { arch: true, trim: WAVE, gw: .32 }) }); roof(.03, .13, 1.94, .74, 62, 11, '#4a8a6a', '#e0cca0', 'x');
  box(.8, .25, .4, .4, 73, 14, '#e0cca0', { left: rf(2, 1, { arch: true, gw: .3 }), right: rf(2, 1, { arch: true, gw: .3 }) }); pyramid(.78, .23, .44, .44, 87, 12, '#4a8a6a');
});
SP_('Brick Forge Shop', 1, 1, 'rev', 'I', 0, () => {
  box(.15, .28, .7, .5, 0, 20, RBR, { left: cmp(brickBand, windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#2a2018', arch: true, trim: STN, my: 6 })), right: brickBand }); roof(.13, .26, .74, .54, 20, 9, IRN, RBR, 'x');
  const c = sx(.75, .35), b = sy(.75, .35, 20); cyl(c, b, 3.5, 1.8, 26, '#7a3a2a'); smoke(c, b - 26, .7);
});
SP_('Textile Mill (Morozov-Style)', 2, 2, 'rev', 'I', 2, () => {
  flat(.05, .05, 1.95, 1.95, '#8c8470'); box(.1, .15, 1.8, .7, 0, 44, RBR, { left: cmp(brickBand, windows({ cols: 12, rows: 3, gw: .5, gh: .55, glass: '#e8d890', lit: .3, arch: true, trim: STN, my: 4, top: 4 })), right: cmp(brickBand, windows({ cols: 5, rows: 3, gw: .5, gh: .55, glass: '#e8d890', lit: .3, arch: true, trim: STN })) }); roof(.08, .13, 1.84, .74, 44, 10, IRN, RBR, 'x');
  box(.1, .85, .6, .8, 0, 30, RBR2, { left: windows({ cols: 3, rows: 2, gw: .4, gh: .5, glass: '#2a2018', arch: true, trim: STN }), right: windows({ cols: 5, rows: 2, gw: .4, gh: .5, glass: '#2a2018', arch: true, trim: STN }) }); roof(.08, .83, .64, .84, 30, 8, IRN, RBR2, 'y');
  const c = sx(1.6, 1.2), b = sy(1.6, 1.2, 0); cyl(c, b, 8, 4, 86, RBR, { bands: [[.75, .82, '#e8dcc0'], [.9, .96, '#e8dcc0']] }); smoke(c, b - 86, 1.1);
});
SP_('Ironworks (Putilov-Style)', 3, 2, 'rev', 'I', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#7e7868'); box(.1, .2, 2.0, .7, 0, 40, RBR, { left: cmp(brickBand, windows({ cols: 13, rows: 1, gw: .6, gh: .6, glass: '#ff9a40', lit: .4, arch: true, trim: STN, my: 12 })), right: windows({ cols: 5, rows: 1, gw: .6, gh: .6, glass: '#ff9a40', lit: .4, arch: true, my: 12 }) });
  for (let i = 0; i < 6; i++) { const x = .12 + i * .33; poly([[sx(x, .2), sy(x, .2, 40)], [sx(x, .9), sy(x, .9, 40)], [sx(x, .9), sy(x, .9, 52)]], shade(IRN, .8)); poly([[sx(x, .2), sy(x, .2, 52)], [sx(x + .33, .2), sy(x + .33, .2, 40)], [sx(x + .33, .9), sy(x + .33, .9, 40)], [sx(x, .9), sy(x, .9, 52)]], '#8a96a0'); }
  box(.1, 1.1, 1.4, .7, 0, 32, '#8a4034', { left: windows({ cols: 7, rows: 1, gw: .5, gh: .5, glass: '#2a2018', arch: true, trim: STN, my: 8 }), right: windows({ cols: 4, rows: 1, gw: .5, gh: .5, glass: '#2a2018', arch: true, my: 8 }) }); roof(.08, 1.08, 1.44, .74, 32, 8, IRN, '#8a4034', 'x');
  [[2.4, .5], [2.65, .9], [2.3, 1.3]].forEach(([x, y], i) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 5 + i, 2.5 + i / 2, 70 + i * 12, RBR); smoke(c, b - 70 - i * 12, .9); });
  const cx = sx(2.0, 1.6), cb = sy(2.0, 1.6, 0); line(cx - 20, cb, cx - 20, cb - 34, '#e0b030', 3); line(cx + 18, cb, cx + 18, cb - 34, '#e0b030', 3); line(cx - 22, cb - 34, cx + 20, cb - 34, '#e0b030', 4); ctx.fillStyle = '#e0b030'; ctx.fillRect(cx - 4, cb - 32, 8, 6);
});
SP_('Naphtha Refinery (Baku-Style)', 2, 2, 'rev', 'I', 2, () => {
  flat(.05, .05, 1.95, 1.95, '#6a5e48'); [[.4, .4], [.9, .35], [1.4, .45]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); poly([[c - 9, b], [c + 9, b], [c + 3, b - 52], [c - 3, b - 52]], '#4a4036'); for (let k = 0; k < 4; k++) line(c - 7 + k, b - k * 13, c + 7 - k, b - k * 13 - 13, '#8a7a5a', 1.2); line(c - 3, b - 52, c + 3, b - 52, '#d6a02e', 3); });
  [[.4, 1.3], [1.0, 1.4], [1.6, 1.35]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 14, 7, 20, '#8a8a82', { bands: [[.5, .6, '#c0392b']] }); });
  box(.9, .9, .9, .3, 0, 10, '#7a3a2a'); wire(.4, 1.0, 6, 1.8, 1.0, 6, '#c0392b', 3);
});
SP_('Brewery', 2, 1, 'rev', 'I', 1, () => {
  box(.05, .25, 1.35, .55, 0, 40, RBR, { left: cmp(brickBand, windows({ cols: 7, rows: 2, gw: .35, gh: .5, glass: '#2a2018', arch: true, trim: STN, my: 5, top: 5 })), right: windows({ cols: 3, rows: 2, gw: .35, gh: .5, glass: '#2a2018', arch: true, trim: STN }) }); roof(.03, .23, 1.39, .59, 40, 12, '#4a5a5a', RBR, 'x');
  const c = sx(1.7, .5), b = sy(1.7, .5, 0); cyl(c, b, 11, 5.5, 32, '#b8704a', { bands: [[.1, .2, '#7a4a2a'], [.8, .9, '#7a4a2a']] }); cyl(c + 18, b + 5, 5, 2.5, 60, RBR); smoke(c + 18, b - 55, .8);
});
SP_('Sugar Refinery', 2, 1, 'rev', 'I', 1, () => {
  box(.05, .2, 1.9, .6, 0, 36, '#d8c8a8', { left: cmp(brickBand, windows({ cols: 9, rows: 2, gw: .35, gh: .5, glass: '#2f4452', arch: true, trim: WHT, my: 5, top: 5 })), right: windows({ cols: 3, rows: 2, gw: .35, gh: .5, glass: '#2f4452', arch: true }) }); roof(.03, .18, 1.94, .64, 36, 10, '#7a3a2a', '#d8c8a8', 'x');
  box(1.4, .25, .45, .5, 36, 18, '#d8c8a8', { left: windows({ cols: 2, rows: 1, gw: .3, gh: .5, glass: '#2f4452', arch: true }) }); const c = sx(.5, .9), b = sy(.5, .9, 0); cyl(c, b, 5, 2.5, 34, '#c4b494');
});
SP_('Locomotive Depot (Roundhouse)', 2, 2, 'rev', 'I', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#6a665a'); const cx = sx(1, 1), b = sy(1, 1, 0); cyl(cx, b, 52, 26, 24, RBR, { bands: [[.6, .75, '#8a3a2e']] });
  for (let i = 0; i <= 12; i++) { const a = i * Math.PI / 12, px = cx + 52 * Math.cos(a), py = b + 26 * Math.sin(a); ctx.fillStyle = '#2a2018'; ctx.fillRect(px - 3, py - 20, 6, 14); }
  ctx.fillStyle = '#7a3a2e'; ctx.beginPath(); ctx.ellipse(cx, b - 24, 52, 26, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5a5a58'; ctx.beginPath(); ctx.ellipse(cx, b - 26, 34, 17, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#4a4a48'; ctx.beginPath(); ctx.ellipse(cx, b - 26, 8, 4, 0, 0, 7); ctx.fill();
  const c2 = sx(1.7, .4), b2 = sy(1.7, .4, 0); cyl(c2, b2, 5, 2.5, 52, '#7a3a2a'); smoke(c2, b2 - 52, .8);
});
SP_('Electric Power Station', 2, 2, 'rev', 'power', 2, () => {
  flat(.05, .05, 1.95, 1.95, '#7e7868'); box(.1, .2, 1.3, .9, 0, 38, RBR, { left: cmp(brickBand, windows({ cols: 7, rows: 1, gw: .5, gh: .7, glass: '#e8d890', lit: .3, arch: true, trim: STN, my: 8 })), right: windows({ cols: 4, rows: 1, gw: .5, gh: .7, glass: '#e8d890', lit: .3, arch: true, my: 8 }) }); roof(.08, .18, 1.34, .94, 38, 12, IRN, RBR, 'x');
  box(.1, 1.25, 1.0, .6, 0, 24, '#8a4034', { left: windows({ cols: 5, rows: 1, gw: .4, gh: .5, glass: '#2a2018', arch: true, my: 6 }) });
  [[1.55, .4], [1.7, .75]].forEach(([x, y], i) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 6, 3, 80 + i * 12, RBR, { bands: [[.85, .92, '#e8dcc0']] }); smoke(c, b - 80 - i * 12, 1); });
  box(1.4, 1.3, .4, .4, 0, 18, '#9a968c'); [[0, 0], [.14, 0], [.28, 0]].forEach(([dx]) => { const c = sx(1.45 + dx, 1.45), b = sy(1.45 + dx, 1.45, 18); cyl(c, b, 2.5, 1.2, 10, '#d9cdb0'); });
});
SP_('Grand Railway Terminal', 3, 2, 'rev', 'transit', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#a8a490'); const A = { left: cmp(stripesFace('#c05a4a', '#b8523f', 28), rf(15, 2, { gw: .4, gh: .55, arch: true, trim: '#f4efe4', glass: '#2f4452', cornice: 3, corniceCol: '#f4efe4', door: false })), right: cmp(stripesFace('#a04838', '#984232', 14), rf(8, 2, { gw: .4, arch: true, trim: '#f4efe4', glass: '#2f4452' })) };
  box(.1, .35, 2.8, 1.0, 0, 42, '#c05a4a', A); roof(.08, .33, 2.84, 1.04, 42, 12, '#3f8a5a', '#c05a4a', 'x');
  [.12, 2.48].forEach(x => { box(x, .3, .4, .45, 42, 22, '#f4efe4', { left: rf(1, 1, { arch: true, gw: .4 }), right: rf(2, 1, { arch: true, gw: .3 }) }); pyramid(x - .02, .28, .44, .49, 64, 20, '#3f8a5a'); });
  box(1.1, .4, .8, .6, 42, 28, '#f4efe4', { left: cmp(rf(3, 2, { arch: true, gw: .3, trim: '#c05a4a' })), right: rf(2, 2, { arch: true, gw: .3 }) }); const cc = sx(1.5, 1.0), cb = sy(1.5, 1.0, 70); pyramid(1.1, .4, .8, .6, 70, 34, '#3f8a5a'); cupola(1.5, .7, 104, 3, 3, 6, GOLD);
  const ck = sx(1.5, 1.01), kb = sy(1.5, 1.01, 52); ctx.fillStyle = WHT; ctx.beginPath(); ctx.arc(ck, kb, 5, 0, 7); ctx.fill(); line(ck, kb, ck, kb - 3, '#222', 1); line(ck, kb, ck + 2, kb, '#222', 1);
  flat(.2, 1.6, 2.8, 1.85, '#6a665a'); wire(.2, 1.7, 0, 2.8, 1.7, 0, '#3a3a38', 2); wire(.2, 1.8, 0, 2.8, 1.8, 0, '#3a3a38', 2);
});
SP_('Steamship Pier & Warehouse', 2, 1, 'rev', 'transit', 2, () => {
  flat(0, .5, 2, 1, '#4a86b8'); flat(0, .5, 2, .62, '#7a6a52', 3); box(.05, .1, 1.1, .4, 0, 22, RBR, { left: cmp(brickBand, windows({ cols: 5, rows: 1, gw: .5, gh: .5, glass: '#2a2018', arch: true, trim: STN, my: 5 })), right: brickBand }); roof(.03, .08, 1.14, .44, 22, 8, IRN, RBR, 'x');
  const sb = sx(1.5, .78), sy_ = sy(1.5, .78, 0); ctx.fillStyle = '#eee8d8'; ctx.beginPath(); ctx.moveTo(sb - 34, sy_ - 8); ctx.lineTo(sb + 30, sy_ - 18); ctx.lineTo(sb + 24, sy_ - 2); ctx.lineTo(sb - 28, sy_ + 4); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a3a38'; ctx.fillRect(sb - 34, sy_ - 8, 66, 3); box(1.2, .66, .5, .12, 5, 8, '#f4efe4'); const c = sx(1.45, .72), b = sy(1.45, .72, 13); cyl(c, b, 4, 2, 16, '#c0392b', { bands: [[.7, .85, '#222']] }); smoke(c, b - 16, .5);
});
SP_('Imperial University', 2, 1, 'rev', 'edu', 3, () => {
  box(.05, .2, 1.9, .6, 0, 44, '#e8d8a8', { left: cmp(rustic, rf(10, 3, { gw: .3, gh: .5, arch: true, trim: WHT, pilasters: true })), right: rf(3, 3, { gw: .3 }) }); roof(.03, .18, 1.94, .64, 44, 8, '#4a6a5a', '#e8d8a8', 'x'); box(.7, .75, .6, .15, 0, 44, '#e8d8a8', { left: portico(6, WHT) }); poly([[sx(.66, .9), sy(.66, .9, 44)], [sx(1.34, .9), sy(1.34, .9, 44)], [sx(1, .9), sy(1, .9, 54)]], '#f0e4c0'); cupola(1, .5, 52, 8, 6, 0, WHT); dome(sx(1, .5), sy(1, .5, 58), 11, '#9aa8a0');
});
SP_('Conservatoire', 2, 1, 'rev', 'edu', 2, () => {
  box(.05, .2, 1.9, .6, 0, 42, '#d8a898', { left: cmp(rustic, rf(9, 3, { gw: .3, gh: .5, arch: true, trim: WHT, pilasters: true })), right: rf(3, 3, { gw: .3 }) }); box(.55, .78, .9, .12, 0, 42, '#d8a898', { left: portico(6, WHT) }); poly([[sx(.5, .9), sy(.5, .9, 42)], [sx(1.5, .9), sy(1.5, .9, 42)], [sx(1, .9), sy(1, .9, 52)]], '#f0e4c8'); roof(.03, .18, 1.94, .64, 42, 8, '#5a6a6a', '#d8a898', 'x');
  ctx.fillStyle = '#6a5a4a'; const c = sx(1, .6), b = sy(1, .6, 50); ctx.fillRect(c - 5, b - 8, 10, 2); ctx.fillRect(c - 4, b - 14, 8, 6); ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(c, b - 18, 3, 0, 7); ctx.fill();
});
SP_('City Hospital (Pavilion)', 2, 1, 'rev', 'health', 2, () => {
  box(.05, .25, 1.9, .55, 0, 36, '#f0e8d0', { left: rf(10, 2, { gw: .3, gh: .5, arch: true, trim: '#c0392b', corniceCol: '#c0392b' }), right: rf(3, 2, { gw: .3 }) }); roof(.03, .23, 1.94, .59, 36, 9, '#6a4a3a', '#f0e8d0', 'x'); box(.8, .3, .4, .45, 45, 16, '#f0e8d0', { left: (W, H) => { ctx.fillStyle = '#c0392b'; ctx.fillRect(W / 2 - 2, 3, 4, 10); ctx.fillRect(W / 2 - 5, 6, 10, 4); }, right: rf(2, 1, { gw: .3, arch: true }) }); roof(.78, .28, .44, .49, 61, 8, '#c0392b', '#f0e8d0', 'y');
});
SP_('Fire Brigade Station', 2, 1, 'rev', 'safe', 2, () => {
  box(.05, .25, 1.3, .55, 0, 28, '#e8c880', { left: cmp(rf(1, 1, { gw: .0001 }), (W, H) => { for (let i = 0; i < 3; i++) { const x = 5 + i * 16; ctx.fillStyle = '#b02a22'; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 12); ctx.quadraticCurveTo(x + 6, 18, x + 12, 12); ctx.lineTo(x + 12, 0); ctx.fill(); } }), right: rf(2, 1, { gw: .3 }) }); roof(.03, .23, 1.34, .59, 28, 8, '#7a3a2a', '#e8c880', 'x');
  box(1.4, .3, .45, .45, 0, 40, '#e8c880', { left: windows({ cols: 1, rows: 3, gw: .3, gh: .3, glass: '#2f4452', arch: true, trim: WHT }), right: windows({ cols: 1, rows: 3, gw: .3, gh: .3, glass: '#2f4452', arch: true }) }); box(1.36, .26, .53, .53, 40, 8, WHT, { left: colonnade(4, '#c9a050', { base: 0, ent: 1 }) }); pyramid(1.34, .24, .57, .57, 48, 16, '#7a3a2a');
});
SP_('Church of the Saviour on Blood', 2, 2, 'rev', 'relig', 4, () => {
  const mz = (W, H) => { ctx.fillStyle = '#c9533a'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < W; i += 5) for (let j = 0; j < H; j += 5) { ctx.fillStyle = ['#e0b44a', '#3a6fb0', '#3f8a5a', '#f4efe4'][(i / 5 + j / 5) % 4]; ctx.fillRect(i + 1, j + 1, 3, 3); } };
  box(.25, .25, 1.5, 1.5, 0, 34, '#d8a888', { left: cmp(stripesFace('#d8a888', '#cc9c7c', 14), (W, H) => { ctx.fillStyle = '#efe4c8'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(4 + i * (W - 8) / 6, H - 6); ctx.quadraticCurveTo(4 + (i + .5) * (W - 8) / 6, H + 1, 4 + (i + 1) * (W - 8) / 6, H - 6); ctx.fill(); } mz(W * .3, 10); ctx.save(); ctx.translate(W * .35, 14); mz(W * .3, 10); ctx.restore(); }), right: stripesFace('#bc9070', '#b08464', 14) });
  const cl = [['#3a6fb0', GOLD], ['#2f7f4a', '#f0d88a'], ['#c9533a', GOLD], ['#e0b44a', '#c9533a']];
  [[.45, .45, 0], [1.55, .45, 1], [.45, 1.55, 2], [1.55, 1.55, 3]].forEach(([x, y, k]) => cupola(x, y, 34, 7, 10, 18, cl[k][0], { drum: '#efe4c8', stripes: cl[k][1] }));
  box(.7, .7, .6, .6, 34, 24, '#e8c8a8', { left: windows({ cols: 3, rows: 1, gw: .25, gh: .5, glass: '#2f4452', arch: true, trim: WHT }), right: windows({ cols: 3, rows: 1, gw: .25, gh: .5, glass: '#2f4452', arch: true, trim: WHT }) }); pyramid(.66, .66, .68, .68, 58, 30, '#3a6fb0'); cupola(1, 1, 88, 6, 6, 14, GOLD, { stripes: '#c9533a' });
});
SP_('State Historical Museum', 3, 1, 'rev', 'cult', 4, () => {
  box(.05, .25, 2.9, .5, 0, 42, '#a8483a', { left: cmp(brickBand, rf(16, 2, { gw: .3, gh: .5, arch: true, trim: '#f4efe4', glass: '#2a2018', corniceCol: '#f4efe4' })), right: rf(3, 2, { gw: .3, arch: true, trim: '#f4efe4' }) }); roof(.03, .23, 2.94, .54, 42, 9, '#5a5a5a', '#a8483a', 'x');
  [[.1, .3], [1.3, .3], [2.5, .3]].forEach(([x, y], i) => { box(x, y, .4, .4, 42, i === 1 ? 30 : 22, '#b8574a', { left: rf(2, 2, { arch: true, gw: .3, trim: WHT }), right: rf(2, 2, { arch: true, gw: .3, trim: WHT }) }); pyramid(x - .02, y - .02, .44, .44, 42 + (i === 1 ? 30 : 22), i === 1 ? 36 : 26, '#6a7a7a'); spire(x + .2, y + .2, 42 + (i === 1 ? 66 : 48), 1.3, 9, GOLD, true); });
});
SP_('Tretyakov Gallery', 2, 1, 'rev', 'cult', 3, () => {
  box(.05, .2, 1.9, .6, 0, 38, '#d8d0b8', { left: cmp(stripesFace('#c9533a', '#bd4a32', 40), rf(8, 1, { gw: .3, gh: .6, arch: true, trim: '#f4efe4', glass: '#2f4452', my: 6 }), kokosh), right: stripesFace('#b04a34', '#a4422c', 12) }); roof(.03, .18, 1.94, .64, 38, 10, '#3f8a5a', '#d8d0b8', 'x');
  box(.65, .75, .7, .2, 0, 52, '#f4efe4', { left: cmp(stripesFace('#f4efe4', '#e8e0cc', 12), (W, H) => { ctx.fillStyle = '#c9533a'; ctx.beginPath(); ctx.moveTo(W / 2 - 8, 0); ctx.lineTo(W / 2 - 8, 16); ctx.quadraticCurveTo(W / 2, 26, W / 2 + 8, 16); ctx.lineTo(W / 2 + 8, 0); ctx.fill(); ctx.fillStyle = GOLD; ctx.fillRect(2, H - 6, W - 4, 3); }) }); pyramid(.63, .73, .74, .24, 52, 20, '#3f8a5a'); cupola(1, .85, 72, 3, 3, 6, GOLD);
});
SP_('Bolshoi Theatre', 2, 2, 'rev', 'cult', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b4b0a0'); box(.2, .2, 1.6, 1.4, 0, 46, '#e8d8a8', { left: cmp(rustic, rf(8, 2, { gw: .3, arch: true, trim: WHT })), right: rf(6, 2, { gw: .3, arch: true }) }); box(.4, 1.55, 1.2, .3, 0, 46, '#e8d8a8', { left: colonnade(8, WHT, { base: 4, ent: 6, back: 'rgba(0,0,0,.3)' }) });
  poly([[sx(.35, 1.85), sy(.35, 1.85, 46)], [sx(1.65, 1.85), sy(1.65, 1.85, 46)], [sx(1, 1.85), sy(1, 1.85, 60)]], '#f0e4c0'); roof(.18, .18, 1.64, 1.44, 46, 10, '#7a8a7a', '#e8d8a8', 'x');
  const c = sx(1, 1.8), b = sy(1, 1.8, 58); ctx.fillStyle = '#6a7a4a'; ctx.fillRect(c - 10, b - 6, 20, 4); [-7, -2, 3, 8].forEach(o => { ctx.beginPath(); ctx.arc(c + o, b - 9, 2.4, 0, 7); ctx.fill(); }); line(c - 10, b - 6, c - 16, b - 12, '#6a7a4a', 2); line(c + 10, b - 6, c + 16, b - 12, '#6a7a4a', 2); ctx.fillStyle = '#6a7a4a'; ctx.fillRect(c - 3, b - 16, 6, 8);
});
SP_('Winter Garden Conservatory', 2, 1, 'rev', 'cult', 1, () => {
  box(.1, .2, 1.8, .6, 0, 8, '#8a8a82'); const fr = '#e8f0f0'; box(.1, .2, 1.8, .6, 8, 30, '#9fd0d8', { left: (W, H) => { ctx.fillStyle = 'rgba(160,215,225,.9)'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = fr; ctx.lineWidth = 1.2; for (let i = 0; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(i * W / 14, 0); ctx.lineTo(i * W / 14, H); ctx.stroke(); } for (let j = 0; j <= 4; j++) { ctx.beginPath(); ctx.moveTo(0, j * H / 4); ctx.lineTo(W, j * H / 4); ctx.stroke(); } ctx.fillStyle = 'rgba(60,120,70,.55)'; for (let i = 0; i < 14; i++) ctx.fillRect(i * W / 14 + 2, 0, 5, 6 + (i * 5) % 9); }, right: (W, H) => { ctx.fillStyle = 'rgba(130,190,205,.9)'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = fr; ctx.lineWidth = 1.2; for (let i = 0; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * W / 5, 0); ctx.lineTo(i * W / 5, H); ctx.stroke(); } } });
  const cx = sx(1, .5), b = sy(1, .5, 38); dome(cx, b, 22, '#bfe4e8'); ctx.strokeStyle = fr; ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(cx + i * 7, b); ctx.quadraticCurveTo(cx + i * 6, b - 18, cx, b - 22); ctx.stroke(); }
});
SP_('Cathedral of Christ the Saviour', 3, 3, 'rev', 'relig', 4, () => {
  flat(.05, .05, 2.95, 2.95, '#bcb8a4'); const mw = '#f2eee0'; box(.3, .3, 2.4, 2.4, 0, 50, mw, { left: cmp(rustic, colonnade(14, '#e0d8c0', { base: 4, ent: 7, back: 'rgba(0,0,0,.25)', mx: 8, door: true })), right: colonnade(14, '#d4ccb4', { base: 4, ent: 7, back: 'rgba(0,0,0,.25)', mx: 8 }) });
  poly([[sx(.2, 2.7), sy(.2, 2.7, 50)], [sx(2.8, 2.7), sy(2.8, 2.7, 50)], [sx(1.5, 2.7), sy(1.5, 2.7, 70)]], '#e4dcc4'); box(.5, .5, 2.0, 2.0, 50, 14, '#ece6d4', { left: windows({ cols: 9, rows: 1, gw: .3, gh: .6, glass: '#4a5a6a', arch: true, my: 3, top: 2 }), right: windows({ cols: 9, rows: 1, gw: .3, gh: .6, glass: '#4a5a6a', arch: true, my: 3, top: 2 }) });
  [[.6, .6], [2.4, .6], [.6, 2.4], [2.4, 2.4]].forEach(([x, y]) => cupola(x, y, 64, 8, 8, 16, GOLD, { win: true }));
  const cx = sx(1.5, 1.5), b = sy(1.5, 1.5, 64); cyl(cx, b, 26, 13, 34, '#ece6d4', { bands: [[.3, .75, '#8a8272']] }); cyl(cx, b - 34, 29, 14.5, 4, '#c8c0a8'); dome(cx, b - 38, 29, '#e0b44a'); cyl(cx, b - 66, 6, 3, 10, '#ece6d4'); dome(cx, b - 76, 6, '#e0b44a'); crossAt(cx, b - 82, 12);
});
SP_('Abramtsevo-Style Church', 1, 1, 'rev', 'relig', 1, () => {
  box(.18, .18, .64, .64, 0, 26, '#f4efe4', { left: cmp(rf(3, 1, { gw: .22, gh: .55, arch: true, trim: '#3a6fb0', glass: '#2f4452', door: true, doorW: 8, doorH: 12, my: 6 }), (W, H) => { ctx.fillStyle = '#3a6fb0'; for (let i = 0; i < 5; i++) { const x = 3 + i * (W - 6) / 5; ctx.beginPath(); ctx.moveTo(x, H - 5); ctx.quadraticCurveTo(x + (W - 6) / 10, H + 1, x + (W - 6) / 5, H - 5); ctx.fill(); } }), right: rf(3, 1, { gw: .22, arch: true, trim: '#3a6fb0', my: 6 }) }); pyramid(.16, .16, .68, .68, 26, 10, '#3f8a5a'); box(.34, .34, .32, .32, 36, 10, '#f4efe4'); cupola(.5, .5, 46, 4, 4, 9, '#3a6fb0', { stripes: GOLD });
});
SP_('City Duma', 2, 1, 'rev', 'gov', 3, () => {
  box(.05, .2, 1.9, .6, 0, 44, '#b8574a', { left: cmp(brickBand, rf(9, 3, { gw: .3, gh: .5, arch: true, trim: WHT, glass: '#2f4452', cornice: 3, corniceCol: WHT })), right: cmp(brickBand, rf(3, 3, { gw: .3, arch: true, trim: WHT })) }); roof(.03, .18, 1.94, .64, 44, 8, '#5a5a5a', '#b8574a', 'x');
  box(.78, .3, .44, .4, 52, 26, '#d8c8a8', { left: rf(2, 2, { arch: true, gw: .3, trim: WHT }), right: rf(2, 2, { arch: true, gw: .3, trim: WHT }) }); const ck = sx(1, .7), kb = sy(1, .7, 70); ctx.fillStyle = WHT; ctx.beginPath(); ctx.arc(ck, kb, 5, 0, 7); ctx.fill(); line(ck, kb, ck, kb - 3, '#222', 1); line(ck, kb, ck + 2, kb, '#222', 1); pyramid(.76, .28, .48, .44, 78, 28, '#3f8a5a'); spire(1, .5, 106, 1.5, 10, GOLD, true);
  [[.05, .25], [1.65, .25]].forEach(([x, y]) => { box(x, y, .3, .5, 44, 14, '#b8574a', { left: rf(1, 1, { arch: true, gw: .4 }) }); pyramid(x - .02, y - .02, .34, .54, 58, 14, '#3f8a5a'); });
});
SP_('Pushkin Monument', 1, 1, 'rev', 'mon', 2, () => {
  box(.15, .15, .7, .7, 0, 6, '#a8a49a'); box(.25, .25, .5, .5, 6, 22, '#b8b4a8', { left: (W, H) => { ctx.fillStyle = '#8a8272'; ctx.fillRect(4, H - 8, W - 8, 2); ctx.fillRect(4, 6, W - 8, 1.5); }, right: (W, H) => { ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(3, 3, W - 6, H - 6); } });
  const cx = sx(.5, .5), b = sy(.5, .5, 28), bz = '#4a3c2c'; ctx.fillStyle = bz; ctx.beginPath(); ctx.moveTo(cx - 7, b); ctx.lineTo(cx - 6, b - 30); ctx.lineTo(cx - 3, b - 38); ctx.lineTo(cx + 3, b - 38); ctx.lineTo(cx + 6, b - 30); ctx.lineTo(cx + 8, b); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(cx, b - 43, 4, 0, 7); ctx.fill(); line(cx - 5, b - 32, cx - 8, b - 24, bz, 3); line(cx + 5, b - 32, cx + 7, b - 26, bz, 3);
});
SP_('Gas-Lamp Boulevard', 1, 1, 'rev', 'decor', 0, () => {
  flat(.05, .05, .95, .95, '#7aa860'); flat(.1, .42, .9, .58, '#d8cca0'); [[.2, .38], [.5, .38], [.8, .38], [.35, .62], [.65, .62]].forEach(([x, y], i) => { const c = sx(x, y), b = sy(x, y, 0); line(c, b, c, b - 24, '#2a3a38', 2); ctx.fillStyle = '#f6e8a0'; ctx.fillRect(c - 3, b - 31, 6, 7); ctx.fillStyle = '#2a3a38'; ctx.fillRect(c - 4, b - 32, 8, 1.5); ctx.fillRect(c - 4, b - 24, 8, 1.5); });
  box(.3, .6, .22, .05, 0, 4, '#6a4a2a'); tree(.15, .85, .9); tree(.85, .15, .9);
});
