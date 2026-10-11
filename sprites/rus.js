// Epoch: Old Rus & Muscovy (10th-17th century). Roles: R/C/I zone-grown; edu, health, relig, gov, safe, mon, decor placed by the player.
const LOG = '#a67c4a', LOGD = '#8a6538', WHITE = '#efe9dc', BRICK = '#a8483a', GRN = '#3f8a5a', GOLD = '#e0b44a', BLU = '#3a6fb0', THATCH = '#c9b070', SHING = '#7a5a34';
const cmp = (...f) => (W, H, l) => f.forEach(x => x(W, H, l));
const logs = n => (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .8; for (let i = 1; i < n; i++) { ctx.beginPath(); ctx.moveTo(0, i * H / n); ctx.lineTo(W, i * H / n); ctx.stroke(); } };
const carved = o => cmp(logs(o.n || 4), windows({ cols: o.cols, rows: o.rows || 1, gw: .3, gh: .55, glass: '#2a3a46', trim: '#f4ead0', lit: 0, my: o.my ?? 4, top: o.top ?? 4 }));

SP_('Izba (Log House)', 1, 1, 'rus', 'R', 0, () => {
  box(.2, .28, .6, .44, 0, 14, LOG, { left: carved({ cols: 2, n: 5 }), right: logs(5) });
  roof(.17, .25, .66, .5, 14, 13, THATCH, LOG, 'y'); box(.6, .3, .08, .08, 14, 14, '#8a7a6a'); tree(.85, .2, .7);
});
SP_('Peasant Farmstead (Dvor)', 2, 1, 'rus', 'R', 1, () => {
  flat(.05, .1, 1.95, .95, '#8c7a52');
  box(.1, .22, .6, .5, 0, 15, LOG, { left: carved({ cols: 2, n: 5 }), right: logs(5) }); roof(.07, .19, .66, .56, 15, 14, THATCH, LOG, 'y');
  box(.95, .15, .85, .6, 0, 18, LOGD, { left: logs(6), right: logs(6) }); roof(.92, .12, .91, .66, 18, 13, SHING, LOGD, 'x');
  const hx = sx(.8, .85), hb = sy(.8, .85, 0); poly([[hx - 8, hb], [hx, hb - 16], [hx + 8, hb]], '#d6bf6a'); ctx.fillStyle = '#b89f4e'; ctx.beginPath(); ctx.ellipse(hx, hb, 8, 3, 0, 0, Math.PI); ctx.fill();
  box(1.4, .85, .12, .1, 0, 6, '#6b5a3a'); box(.05, .93, 1.9, .02, 0, 5, '#7a5a34');
});
SP_('Boyar Manor (Terem)', 2, 2, 'rus', 'R', 3, () => {
  box(.2, .4, 1.6, 1.2, 0, 26, LOG, { left: carved({ cols: 8, n: 7, top: 6 }), right: carved({ cols: 5, n: 7, top: 6 }) });
  box(.2, .4, 1.6, 1.2, 26, 2, '#6b4a2a');
  box(.45, .62, 1.1, .76, 28, 22, '#b88a52', { left: carved({ cols: 5, n: 5, top: 4 }), right: carved({ cols: 3, n: 5, top: 4 }) });
  box(.7, .8, .6, .4, 50, 15, '#c4955c', { left: carved({ cols: 3, n: 3, my: 3, top: 3 }), right: carved({ cols: 2, n: 3, my: 3, top: 3 }) });
  pyramid(.66, .76, .68, .48, 65, 26, GRN); cupola(1.0, 1.0, 91, 4, 4, 8, GOLD);
  box(.7, 1.55, .6, .35, 0, 4, '#8a6538'); box(.75, 1.65, .5, .25, 4, 4, '#9a7548');
});
SP_('Merchant Palaty (White Stone House)', 2, 1, 'rus', 'R', 2, () => {
  box(.05, .15, 1.9, .7, 0, 36, WHITE, { left: facade({ cols: 6, rows: 2, gw: .34, gh: .5, glass: '#2f3f4c', arch: true, trim: '#d8b878', cornice: 4, corniceCol: '#c9533a', plinth: 3 }), right: facade({ cols: 3, rows: 2, gw: .34, gh: .5, glass: '#2f3f4c', arch: true, trim: '#d8b878', cornice: 4, corniceCol: '#c9533a', plinth: 3 }) });
  roof(.03, .13, 1.94, .74, 36, 16, GRN, WHITE, 'x');
  box(.8, .78, .4, .22, 0, 14, WHITE, { left: (W, H) => { ctx.fillStyle = '#4a3426'; ctx.fillRect(W / 2 - 4, 0, 8, 9); } }); pyramid(.78, .76, .44, .26, 14, 12, '#c9533a');
  [.35, 1.55].forEach(x => cupola(x, .5, 52, 3, 3, 6, GOLD));
});
SP_('Posad Row Houses', 2, 1, 'rus', 'R', 1, () => {
  [['#d9a44a', GRN], ['#b9533a', '#6a4a2a'], ['#6a9ab0', SHING]].forEach(([w, r], i) => { const x = .08 + i * .62;
    box(x, .22, .55, .56, 0, 22, w, { left: facade({ cols: 2, rows: 2, gw: .3, gh: .45, glass: '#2f3f4c', trim: '#f4ead0', plinth: 2 }), right: logs(4) }); roof(x - .02, .2, .59, .6, 22, 13, r, w, 'y'); });
});
SP_('Terem Palace', 2, 2, 'rus', 'R', 4, () => {
  const pat = (c1, c2) => (W, H) => { ctx.fillStyle = c1; ctx.fillRect(0, 0, W, H); ctx.fillStyle = c2; for (let i = 0; i < W; i += 6) for (let j = 0; j < H; j += 6) if ((i + j) / 6 % 2 === 0) ctx.fillRect(i, j, 6, 6); };
  box(.15, .35, 1.7, 1.3, 0, 30, '#e8dcc0', { left: cmp(pat('#e8dcc0', '#d8c8a0'), windows({ cols: 7, rows: 2, gw: .3, gh: .45, glass: '#2f3f4c', arch: true, trim: '#c9533a', my: 5, top: 5 })), right: cmp(pat('#e8dcc0', '#d8c8a0'), windows({ cols: 5, rows: 2, gw: .3, gh: .45, glass: '#2f3f4c', arch: true, trim: '#c9533a', my: 5, top: 5 })) });
  box(.35, .55, 1.3, .9, 30, 22, '#f0e4c8', { left: windows({ cols: 5, rows: 1, gw: .3, gh: .5, glass: '#2f3f4c', arch: true, trim: GOLD, my: 4 }), right: windows({ cols: 4, rows: 1, gw: .3, gh: .5, glass: '#2f3f4c', arch: true, trim: GOLD, my: 4 }) });
  box(.6, .75, .8, .5, 52, 16, '#e0d0a8', { left: stripesFace('#e0d0a8', '#c9533a', 8), right: stripesFace('#d0c098', '#b04a30', 6) });
  pyramid(.58, .73, .84, .54, 68, 20, GOLD); cupola(1, 1, 88, 3.5, 3, 6, GOLD); [.45, 1.55].forEach(x => cupola(x, .75, 52, 3, 3, 6, GRN));
});
SP_('Gostiny Dvor (Trading Arcade)', 2, 2, 'rus', 'C', 3, () => {
  flat(.1, .1, 1.9, 1.9, '#b4a98a');
  const arc = { left: facade({ cols: 8, rows: 1, gw: .6, gh: .75, glass: '#3a3028', arch: true, cornice: 4, corniceCol: '#c9533a', my: 2, top: 2, plinth: 2 }), right: facade({ cols: 6, rows: 1, gw: .6, gh: .75, glass: '#3a3028', arch: true, cornice: 4, corniceCol: '#c9533a', my: 2, top: 2, plinth: 2 }) };
  box(.1, .1, 1.8, .4, 0, 24, WHITE, arc); roof(.08, .08, 1.84, .44, 24, 8, GRN, WHITE, 'x');
  box(.1, .5, .4, 1.4, 0, 24, WHITE, arc); roof(.08, .48, .44, 1.44, 24, 8, GRN, WHITE, 'y');
  box(1.5, .5, .4, 1.4, 0, 24, WHITE, arc); roof(1.48, .48, .44, 1.44, 24, 8, GRN, WHITE, 'y');
  box(.5, 1.55, 1.0, .35, 0, 24, WHITE, arc); roof(.48, 1.53, 1.04, .39, 24, 8, GRN, WHITE, 'x'); cupola(1, 1.72, 32, 3.5, 3, 6, GOLD);
});
SP_('Torg (Market Stalls)', 1, 1, 'rus', 'C', 0, () => {
  flat(.05, .05, .95, .95, '#a89a74');
  [[.1, .15, '#c9533a'], [.5, .2, '#3a6fb0'], [.3, .58, '#d9a44a']].forEach(([x, y, c]) => { box(x, y, .38, .28, 0, 9, LOG); box(x - .03, y - .02, .44, .34, 14, 3, c); [[x, y + .26], [x + .36, y + .26]].forEach(([a, b]) => wire(a, b, 0, a, b, 14, '#6b4a2a', 1.5)); });
  [[.8, .75], [.88, .7]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 3.5, 1.8, 8, '#8a6538'); });
});
SP_('Traktir (Tavern)', 2, 1, 'rus', 'C', 1, () => {
  box(.1, .2, 1.8, .6, 0, 28, LOG, { left: cmp(logs(7), windows({ cols: 7, rows: 2, gw: .3, gh: .4, glass: '#e8c068', trim: '#f4ead0', lit: .3, my: 5, top: 5 })), right: logs(7) });
  pyramid(.08, .18, 1.84, .64, 28, 16, '#8a4a30'); box(.9, .8, .3, .15, 0, 4, '#8a6538');
  const sx_ = sx(.45, .9), sb = sy(.45, .9, 0); line(sx_, sb, sx_, sb - 30, '#555', 1.5); ctx.fillStyle = '#c9533a'; ctx.fillRect(sx_ - 8, sb - 30, 16, 9); ctx.fillStyle = '#f4ead0'; ctx.fillRect(sx_ - 3, sb - 28, 6, 5);
});
SP_('Kupets Warehouse', 2, 1, 'rus', 'C', 2, () => {
  box(.05, .15, 1.9, .7, 0, 30, '#e6dcc4', { left: cmp(windows({ cols: 7, rows: 1, gw: .12, gh: .3, glass: '#2f3f4c', lit: 0, my: 14, top: 4 }), (W, H) => { ctx.fillStyle = '#4a4440'; [.18, .5, .82].forEach(f => ctx.fillRect(W * f - 4, 0, 8, 13)); }), right: windows({ cols: 3, rows: 1, gw: .12, gh: .3, glass: '#2f3f4c', lit: 0, my: 14 }) });
  roof(.03, .13, 1.94, .74, 30, 14, '#8a4a3a', '#e6dcc4', 'x');
});
SP_('Windmill', 1, 1, 'rus', 'I', 0, () => {
  const cx = sx(.5, .5), b = sy(.5, .5, 0), g = ctx.createLinearGradient(cx - 14, 0, cx + 14, 0); g.addColorStop(0, '#c4965c'); g.addColorStop(1, '#6e4f2c');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 14, b); ctx.lineTo(cx - 8, b - 38); ctx.lineTo(cx + 8, b - 38); ctx.lineTo(cx + 14, b); ctx.ellipse(cx, b, 14, 7, 0, 0, Math.PI); ctx.closePath(); ctx.fill();
  poly([[cx - 10, b - 38], [cx + 10, b - 38], [cx, b - 52]], '#5a3a22');
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + .5; line(cx, b - 40, cx + Math.cos(a) * 28, b - 40 + Math.sin(a) * 28, '#4a3426', 2); const mx = cx + Math.cos(a) * 18, my = b - 40 + Math.sin(a) * 18, nx = -Math.sin(a) * 4, ny = Math.cos(a) * 4; poly([[mx - nx, my - ny], [mx + nx, my + ny], [cx + Math.cos(a) * 28 + nx, b - 40 + Math.sin(a) * 28 + ny], [cx + Math.cos(a) * 28 - nx, b - 40 + Math.sin(a) * 28 - ny]], '#e8dcc0'); }
});
SP_('Watermill', 2, 1, 'rus', 'I', 1, () => {
  flat(0, .6, 2, 1, '#4a86b8'); box(.15, .15, 1.1, .5, 0, 24, LOG, { left: carved({ cols: 4, n: 5 }), right: logs(5) }); roof(.12, .12, 1.16, .56, 24, 14, SHING, LOG, 'x');
  const wx = sx(1.45, .72), wb = sy(1.45, .72, 0); ctx.strokeStyle = '#6b4a2a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(wx, wb - 14, 14, 0, 7); ctx.stroke();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(wx, wb - 14, wx + Math.cos(a) * 14, wb - 14 + Math.sin(a) * 14, '#8a6538', 1.5); } box(1.25, .35, .5, .08, 18, 3, '#6b4a2a');
});
SP_('Kuznitsa (Smithy)', 1, 1, 'rus', 'I', 0, () => {
  box(.15, .25, .7, .5, 0, 16, '#8a7a6a', { left: cmp(logs(4), (W, H) => { ctx.fillStyle = '#2a2018'; ctx.fillRect(W * .3, 0, 9, 10); ctx.fillStyle = '#ff8a2a'; ctx.fillRect(W * .3 + 2, 1, 5, 4); }), right: logs(4) }); roof(.12, .22, .76, .56, 16, 10, SHING, '#8a7a6a', 'x');
  const c = sx(.7, .3), b = sy(.7, .3, 16); cyl(c, b, 3, 1.5, 22, '#6a5a4a'); ctx.fillStyle = 'rgba(200,200,200,.6)'; ctx.beginPath(); ctx.arc(c + 3, b - 28, 4, 0, 7); ctx.fill(); box(.8, .85, .12, .08, 0, 5, '#333');
});
SP_('Salt Works (Saltern)', 2, 1, 'rus', 'I', 2, () => {
  box(.1, .3, 1.0, .5, 0, 16, LOGD, { left: logs(4), right: logs(4) }); roof(.08, .28, 1.04, .54, 16, 10, SHING, LOGD, 'x');
  box(1.2, .3, .5, .45, 0, 64, LOG, { left: logs(14), right: logs(14) }); roof(1.17, .27, .56, .51, 64, 12, SHING, LOG, 'x');
  const a = sx(1.1, .6), b = sy(1.1, .6, 10), c = sx(1.3, .7), d = sy(1.3, .7, 50); line(a, b, c, d, '#7a6a5a', 3);
  [[.3, .9], [.7, .9]].forEach(([x, y]) => { box(x, y, .3, .1, 0, 5, '#d8d4c8'); });
});
SP_('Pushechny Dvor (Cannon Yard)', 2, 2, 'rus', 'I', 3, () => {
  flat(.1, .1, 1.9, 1.9, '#8c8268'); box(.15, .15, 1.1, .6, 0, 28, BRICK, { left: facade({ cols: 6, rows: 1, gw: .35, gh: .55, arch: true, glass: '#2a2018', trim: WHITE, my: 6 }), right: windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#2a2018', arch: true, my: 6 }) }); roof(.12, .12, 1.16, .66, 28, 14, GRN, BRICK, 'x');
  box(1.2, .8, .7, .6, 0, 20, BRICK, { left: windows({ cols: 3, rows: 1, gw: .3, gh: .5, glass: '#2a2018', arch: true }), right: windows({ cols: 2, rows: 1, gw: .3, gh: .5, glass: '#2a2018', arch: true }) });
  const c = sx(1.7, .35), b = sy(1.7, .35, 0); cyl(c, b, 5, 2.5, 52, '#c4a88a', { bands: [[.5, .6, '#8a4a30']] }); smoke(c, b - 52, .8);
  [[.3, 1.2], [.6, 1.35], [.4, 1.6]].forEach(([x, y]) => { const cx = sx(x, y), by = sy(x, y, 4); line(cx - 8, by + 1, cx + 8, by - 3, '#3a3a38', 4); ctx.fillStyle = '#6b4a2a'; ctx.beginPath(); ctx.arc(cx - 5, by + 3, 3, 0, 7); ctx.fill(); });
});
SP_('Scriptorium (Monastery Library)', 1, 1, 'rus', 'edu', 0, () => {
  box(.18, .25, .64, .5, 0, 24, WHITE, { left: facade({ cols: 3, rows: 1, gw: .3, gh: .6, glass: '#2f3f4c', arch: true, trim: '#c9a050', cornice: 3, corniceCol: '#c9533a', my: 5 }), right: facade({ cols: 2, rows: 1, gw: .3, gh: .6, glass: '#2f3f4c', arch: true, trim: '#c9a050', cornice: 3, corniceCol: '#c9533a', my: 5 }) });
  roof(.16, .23, .68, .54, 24, 12, GRN, WHITE, 'x'); cupola(.5, .5, 30, 3, 3, 6, GOLD);
});
SP_('Slavic-Greek-Latin Academy', 2, 1, 'rus', 'edu', 2, () => {
  box(.05, .15, 1.9, .7, 0, 40, '#f2ead6', { left: facade({ cols: 8, rows: 3, gw: .35, gh: .5, glass: '#2f3f4c', arch: true, trim: '#d8b878', cornice: 4, corniceCol: '#b04a3a', plinth: 3, pilasters: true }), right: facade({ cols: 3, rows: 3, gw: .35, gh: .5, glass: '#2f3f4c', arch: true, trim: '#d8b878', cornice: 4, corniceCol: '#b04a3a' }) });
  roof(.03, .13, 1.94, .74, 40, 14, '#7a3a30', '#f2ead6', 'x'); box(.75, .3, .5, .4, 54, 22, '#f2ead6', { left: windows({ cols: 2, rows: 1, gw: .3, gh: .5, glass: '#2f3f4c', arch: true }), right: windows({ cols: 2, rows: 1, gw: .3, gh: .5, glass: '#2f3f4c', arch: true }) }); pyramid(.73, .28, .54, .44, 76, 18, GRN); crossAt(sx(1, .5), sy(1, .5, 94), 8);
});
SP_('Monastery Infirmary', 2, 1, 'rus', 'health', 1, () => {
  box(.05, .25, 1.3, .6, 0, 26, WHITE, { left: facade({ cols: 5, rows: 1, gw: .3, gh: .55, glass: '#2f3f4c', arch: true, trim: '#c9a050', cornice: 3, corniceCol: '#c9533a', my: 5 }), right: windows({ cols: 2, rows: 1, gw: .3, gh: .55, glass: '#2f3f4c', arch: true }) }); roof(.03, .23, 1.34, .64, 26, 12, GRN, WHITE, 'x');
  box(1.35, .3, .55, .5, 0, 30, WHITE, { left: windows({ cols: 2, rows: 1, gw: .25, gh: .5, glass: '#2f3f4c', arch: true }) }); cupola(1.62, .55, 30, 5, 5, 11, BLU, { stripes: GOLD });
});
SP_('Banya (Bathhouse)', 1, 1, 'rus', 'health', 0, () => {
  box(.2, .3, .6, .45, 0, 14, LOG, { left: carved({ cols: 1, n: 4 }), right: logs(4) }); roof(.17, .27, .66, .51, 14, 11, SHING, LOG, 'y'); box(.62, .35, .08, .08, 14, 12, '#6a5a4a');
  ctx.fillStyle = 'rgba(240,240,240,.75)'; const c = sx(.66, .39), b = sy(.66, .39, 26); [[0, -5, 4], [5, -12, 5], [10, -21, 6]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(c + dx, b + dy, r, 0, 7); ctx.fill(); });
});
SP_('Kizhi-Style Wooden Church', 2, 2, 'rus', 'relig', 3, () => {
  const sil = '#9aa0a6'; box(.55, .55, .9, .9, 0, 22, '#b0884e', { left: logs(8), right: logs(8) }); box(.7, .7, .6, .6, 22, 18, '#b89258', { left: logs(6), right: logs(6) }); box(.8, .8, .4, .4, 40, 14, '#c09a60', { left: logs(5), right: logs(5) });
  [[.55, .55], [1.45, .55], [.55, 1.45], [1.45, 1.45]].forEach(([x, y]) => cupola(x, y, 22, 6, 4, 11, sil, { drum: '#b0884e' }));
  [[.75, .75], [1.25, .75], [.75, 1.25], [1.25, 1.25]].forEach(([x, y]) => cupola(x, y, 40, 5, 3, 10, sil, { drum: '#b89258' })); cupola(1, 1, 54, 8, 5, 18, sil, { drum: '#c09a60', cross: 10 });
  box(1.0, 1.5, .55, .35, 0, 12, '#9a7548', { left: logs(3) }); roof(.97, 1.47, .61, .41, 12, 9, SHING, '#9a7548', 'x');
});
SP_('Single-Dome Stone Church', 1, 1, 'rus', 'relig', 0, () => {
  box(.2, .2, .6, .6, 0, 28, WHITE, { left: facade({ cols: 2, rows: 1, gw: .15, gh: .5, glass: '#2f3f4c', arch: true, trim: '#c9a050', cornice: 3, corniceCol: '#c9533a', my: 10, door: true, doorW: 7, doorH: 10 }), right: facade({ cols: 2, rows: 1, gw: .15, gh: .5, glass: '#2f3f4c', arch: true, cornice: 3, my: 10 }) });
  roof(.18, .18, .64, .64, 28, 8, GRN, WHITE, 'x'); cupola(.5, .5, 34, 7, 8, 14, GOLD, { win: true });
});
SP_('Assumption Cathedral (Five Domes)', 2, 2, 'rus', 'relig', 4, () => {
  box(.2, .2, 1.6, 1.6, 0, 50, '#f4efe4', { left: facade({ cols: 6, rows: 1, gw: .12, gh: .4, glass: '#2f3f4c', arch: true, trim: '#c9a050', cornice: 4, corniceCol: '#d8c8a0', pilasters: true, my: 22, door: true, doorW: 12, doorH: 18 }), right: facade({ cols: 6, rows: 1, gw: .12, gh: .4, glass: '#2f3f4c', arch: true, cornice: 4, corniceCol: '#d8c8a0', pilasters: true, my: 22 }) });
  [[.55, .55], [1.45, .55], [.55, 1.45], [1.45, 1.45]].forEach(([x, y]) => cupola(x, y, 50, 6, 8, 12, GOLD, { win: true })); cupola(1, 1, 50, 9, 14, 20, GOLD, { win: true, cross: 11 });
});
SP_("St. Basil's Cathedral", 2, 2, 'rus', 'relig', 4, () => {
  box(.25, .25, 1.5, 1.5, 0, 24, '#b9533a', { left: cmp(stripesFace('#b9533a', '#c96a4e', 12), windows({ cols: 6, rows: 1, gw: .25, gh: .5, glass: '#2f3f4c', arch: true, trim: WHITE, my: 6 })), right: cmp(stripesFace('#a04a34', '#b05a40', 12), windows({ cols: 6, rows: 1, gw: .25, gh: .5, glass: '#2f3f4c', arch: true, trim: WHITE, my: 6 })) });
  const cols = [['#2f7f4a', '#e0b44a'], ['#c9533a', '#f0d88a'], ['#3a6fb0', '#e0b44a'], ['#e0b44a', '#c9533a']];
  [[.45, .45, 0], [1.55, .45, 1], [.45, 1.55, 2], [1.55, 1.55, 3]].forEach(([x, y, k]) => cupola(x, y, 24, 7, 12, 17, cols[k][0], { drum: '#e8dcc0', stripes: cols[k][1] }));
  box(.7, .7, .6, .6, 24, 26, '#c9533a', { left: windows({ cols: 3, rows: 1, gw: .25, gh: .5, glass: '#2f3f4c', arch: true, trim: WHITE }), right: windows({ cols: 3, rows: 1, gw: .25, gh: .5, glass: '#2f3f4c', arch: true, trim: WHITE }) });
  pyramid(.66, .66, .68, .68, 50, 34, '#2f7f4a'); cupola(1, 1, 84, 4, 3, 8, GOLD, { cross: 9 });
});
SP_('Bell Tower (Kolokolnya)', 1, 1, 'rus', 'relig', 2, () => {
  box(.22, .22, .56, .56, 0, 40, WHITE, { left: windows({ cols: 2, rows: 3, gw: .25, gh: .35, glass: '#2f3f4c', arch: true, trim: '#c9a050' }), right: windows({ cols: 2, rows: 3, gw: .25, gh: .35, glass: '#2f3f4c', arch: true }) });
  box(.27, .27, .46, .46, 40, 34, '#f4efe4', { left: (W, H) => { ctx.fillStyle = '#2f3f4c'; [.22, .5, .78].forEach(f => { ctx.beginPath(); ctx.moveTo(W * f - 3, 3); ctx.lineTo(W * f - 3, H - 10); ctx.quadraticCurveTo(W * f, H - 4, W * f + 3, H - 10); ctx.lineTo(W * f + 3, 3); ctx.fill(); }); ctx.fillStyle = GOLD; [.22, .5, .78].forEach(f => ctx.fillRect(W * f - 1.5, H - 16, 3, 4)); }, right: windows({ cols: 3, rows: 1, gw: .25, gh: .6, glass: '#2f3f4c', arch: true }) });
  box(.32, .32, .36, .36, 74, 10, WHITE); cupola(.5, .5, 84, 6, 7, 16, GOLD, { cross: 10 });
});
SP_('Tent-Roof Church (Shatyor)', 1, 1, 'rus', 'relig', 1, () => {
  box(.15, .15, .7, .7, 0, 16, '#f4efe4', { left: facade({ cols: 3, rows: 1, gw: .2, gh: .5, glass: '#2f3f4c', arch: true, door: true, doorW: 8, doorH: 11, my: 7 }), right: facade({ cols: 3, rows: 1, gw: .2, gh: .5, glass: '#2f3f4c', arch: true, my: 7 }) });
  box(.28, .28, .44, .44, 16, 36, '#f6f1e6', { left: windows({ cols: 2, rows: 2, gw: .15, gh: .4, glass: '#2f3f4c', arch: true }), right: windows({ cols: 2, rows: 2, gw: .15, gh: .4, glass: '#2f3f4c', arch: true }) });
  pyramid(.26, .26, .48, .48, 52, 44, '#e8e0cc'); cupola(.5, .5, 96, 3.5, 3, 6, GOLD, { cross: 9 });
});
SP_('Monastery Complex', 3, 3, 'rus', 'relig', 4, () => {
  flat(.1, .1, 2.9, 2.9, '#a8a07a'); const wc = '#efe9dc';
  box(.1, .1, 2.8, .15, 0, 20, wc, { left: stripesFace(wc, '#e0d8c4', 40) }); box(.1, .1, .15, 2.8, 0, 20, wc); box(2.75, .1, .15, 2.8, 0, 20, wc, { right: stripesFace('#d4ccb8', '#c8c0aa', 40) }); box(.1, 2.75, 2.8, .15, 0, 20, wc, { left: cmp(stripesFace(wc, '#e0d8c4', 40), (W, H) => { ctx.fillStyle = '#4a3426'; ctx.fillRect(W / 2 - 6, 0, 12, 12); }) });
  [[.1, .1], [2.6, .1], [.1, 2.6], [2.6, 2.6]].forEach(([x, y]) => { box(x, y, .3, .3, 0, 38, wc, { left: windows({ cols: 1, rows: 1, gw: .25, gh: .3, glass: '#2f3f4c', arch: true }), right: windows({ cols: 1, rows: 1, gw: .25, gh: .3, glass: '#2f3f4c', arch: true }) }); pyramid(x - .02, y - .02, .34, .34, 38, 20, GRN); });
  box(.9, .9, 1.2, 1.2, 0, 44, '#f4efe4', { left: facade({ cols: 5, rows: 1, gw: .12, gh: .4, glass: '#2f3f4c', arch: true, cornice: 4, corniceCol: '#d8c8a0', pilasters: true, my: 16 }), right: facade({ cols: 5, rows: 1, gw: .12, gh: .4, glass: '#2f3f4c', arch: true, cornice: 4, corniceCol: '#d8c8a0', pilasters: true, my: 16 }) });
  [[1.15, 1.15], [1.85, 1.15], [1.15, 1.85], [1.85, 1.85]].forEach(([x, y]) => cupola(x, y, 44, 5, 6, 9, BLU, { stripes: GOLD })); cupola(1.5, 1.5, 44, 8, 11, 16, GOLD);
  box(2.2, 2.0, .35, .35, 0, 46, WHITE); cupola(2.375, 2.175, 46, 4, 4, 8, GOLD);
});
SP_('Kremlin Wall & Tower', 2, 1, 'rus', 'gov', 2, () => {
  const rb = '#a8483a'; box(.05, .38, 1.9, .24, 0, 34, rb, { left: cmp(stripesFace(rb, '#9a3f32', 30, true), (W, H) => { ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let i = 0; i < 9; i++) ctx.fillRect(5 + i * (W - 10) / 8, H - 12, 3, 8); }), right: stripesFace('#8a3a2e', '#7a342a', 6) });
  merlons(.05, .38, 1.9, .24, 34, rb, .13);
  box(.7, .25, .55, .5, 0, 56, rb, { left: windows({ cols: 2, rows: 2, gw: .3, gh: .4, glass: '#2a2018', arch: true, trim: WHITE }), right: windows({ cols: 2, rows: 2, gw: .3, gh: .4, glass: '#2a2018', arch: true, trim: WHITE }) });
  box(.78, .33, .39, .34, 56, 10, '#efe9dc'); pyramid(.74, .29, .47, .42, 66, 30, GRN); spire(.97, .5, 96, 2, 12, GOLD, true);
});
SP_('Spasskaya-Style Gate Tower', 1, 1, 'rus', 'gov', 3, () => {
  const rb = '#a8483a'; box(.2, .2, .6, .6, 0, 54, rb, { left: cmp(stripesFace(rb, '#9a3f32', 14), windows({ cols: 1, rows: 1, gw: .35, gh: .22, glass: '#2a2018', arch: true, trim: WHITE, my: 10 }), (W, H) => { ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.moveTo(W / 2 - 6, 0); ctx.lineTo(W / 2 - 6, 14); ctx.quadraticCurveTo(W / 2, 20, W / 2 + 6, 14); ctx.lineTo(W / 2 + 6, 0); ctx.fill(); }), right: stripesFace('#8a3a2e', '#7a342a', 14) });
  merlons(.2, .2, .6, .6, 54, rb, .12); box(.3, .3, .4, .4, 58, 22, '#efe9dc', { left: windows({ cols: 2, rows: 1, gw: .25, gh: .5, glass: '#2a2018', arch: true }), right: windows({ cols: 2, rows: 1, gw: .25, gh: .5, glass: '#2a2018', arch: true }) });
  ctx.fillStyle = '#f4efe4'; const c = sx(.5, .8), b = sy(.5, .8, 24); ctx.beginPath(); ctx.arc(c, b, 5, 0, 7); ctx.fill(); line(c, b, c, b - 3, '#222', 1); line(c, b, c + 2, b, '#222', 1);
  pyramid(.28, .28, .44, .44, 80, 36, GRN); spire(.5, .5, 116, 1.6, 10, GOLD, true);
});
SP_('Faceted Palace (Granovitaya Palata)', 2, 2, 'rus', 'gov', 3, () => {
  const fc = (W, H) => { ctx.fillStyle = '#efe9dc'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < W; i += 7) { ctx.fillStyle = '#d8d0bc'; ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 3.5, 5); ctx.lineTo(i + 7, 0); ctx.fill(); ctx.fillStyle = '#fff8ea'; ctx.beginPath(); ctx.moveTo(i, H); ctx.lineTo(i + 3.5, H - 5); ctx.lineTo(i + 7, H); ctx.fill(); } };
  box(.15, .3, 1.7, 1.3, 0, 40, '#efe9dc', { left: cmp(fc, windows({ cols: 4, rows: 2, gw: .25, gh: .35, glass: '#2f3f4c', arch: true, trim: '#c9a050', my: 7, top: 7 })), right: cmp(fc, windows({ cols: 3, rows: 2, gw: .25, gh: .35, glass: '#2f3f4c', arch: true, trim: '#c9a050', my: 7, top: 7 })) });
  roof(.12, .27, 1.76, 1.36, 40, 26, '#a04a30', '#efe9dc', 'x'); box(.2, .7, .3, .3, 40, 22, '#efe9dc'); pyramid(.18, .68, .34, .34, 62, 14, GRN); cupola(1.4, .95, 52, 4, 3, 7, GOLD); cupola(.5, .5, 66, 3, 3, 6, GOLD);
});
SP_('Wooden Ostrog (Fort)', 2, 2, 'rus', 'safe', 1, () => {
  flat(.1, .1, 1.9, 1.9, '#8c8268'); const lg = '#9a7548', pal = (x0, y0, w, d) => { box(x0, y0, w, d, 0, 30, lg, { left: cmp(logs(1), (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.3)'; for (let i = 0; i < W; i += 3) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); } }), right: (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.3)'; for (let i = 0; i < W; i += 3) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); } } }); };
  pal(.1, .1, 1.8, .1); pal(.1, .1, .1, 1.8); pal(1.8, .1, .1, 1.8); pal(.1, 1.8, 1.8, .1);
  [[.1, .1], [1.6, .1], [.1, 1.6], [1.6, 1.6]].forEach(([x, y]) => { box(x, y, .3, .3, 0, 46, '#b0884e', { left: logs(6), right: logs(6) }); pyramid(x - .03, y - .03, .36, .36, 46, 18, '#6a4a2a'); });
  box(.7, .6, .6, .45, 0, 18, '#b88a52', { left: carved({ cols: 3, n: 4 }), right: logs(4) }); roof(.67, .57, .66, .51, 18, 12, SHING, '#b88a52', 'x');
});
SP_('Prikaz (Chancery)', 2, 1, 'rus', 'gov', 1, () => {
  box(.05, .2, 1.9, .6, 0, 30, BRICK, { left: facade({ cols: 7, rows: 2, gw: .3, gh: .42, glass: '#2f3f4c', arch: true, trim: WHITE, cornice: 3, corniceCol: WHITE, plinth: 2 }), right: facade({ cols: 3, rows: 2, gw: .3, gh: .42, glass: '#2f3f4c', arch: true, trim: WHITE, cornice: 3, corniceCol: WHITE }) });
  roof(.03, .18, 1.94, .64, 30, 18, '#6a4a2a', BRICK, 'x'); box(.8, .78, .4, .18, 0, 12, WHITE); pyramid(.78, .76, .44, .22, 12, 8, GRN);
});
SP_('Tsar Bell', 1, 1, 'rus', 'mon', 1, () => {
  box(.12, .12, .76, .76, 0, 6, '#a8a49a'); box(.22, .22, .56, .56, 6, 6, '#b8b4a8');
  const cx = sx(.5, .5), b = sy(.5, .5, 12), g = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0); g.addColorStop(0, '#d6a850'); g.addColorStop(1, '#6a4a1a');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 20, b); ctx.quadraticCurveTo(cx - 17, b - 12, cx - 12, b - 32); ctx.quadraticCurveTo(cx - 8, b - 44, cx, b - 44); ctx.quadraticCurveTo(cx + 8, b - 44, cx + 12, b - 32); ctx.quadraticCurveTo(cx + 17, b - 12, cx + 20, b); ctx.ellipse(cx, b, 20, 8, 0, 0, Math.PI); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1; [-8, 0, 8].forEach(o => { ctx.beginPath(); ctx.moveTo(cx - 14, b - 22 + o); ctx.lineTo(cx + 14, b - 22 + o); ctx.stroke(); });
});
SP_('Wayside Cross & Holy Well', 1, 1, 'rus', 'decor', 0, () => {
  flat(.1, .1, .9, .9, '#8fa04f'); box(.32, .5, .36, .3, 0, 8, '#a8a49a'); roof(.3, .48, .4, .34, 8, 8, SHING, '#a8a49a', 'y');
  const cx = sx(.3, .3), b = sy(.3, .3, 0); line(cx, b, cx, b - 36, '#7a5a34', 3); line(cx - 7, b - 26, cx + 7, b - 26, '#7a5a34', 2.5); line(cx - 4, b - 31, cx + 4, b - 31, '#7a5a34', 1.5); box(.25, .25, .1, .1, 0, 3, '#8a8a80');
  ctx.fillStyle = '#f4efe4'; ctx.fillRect(cx - 5, b - 20, 10, 4);
});
SP_('Guard Tower (Storozhevaya)', 1, 1, 'rus', 'safe', 0, () => {
  [[.3, .3], [.7, .3], [.3, .7], [.7, .7]].forEach(([x, y]) => wire(x, y, 0, x, y, 40, '#8a6538', 3)); wire(.3, .3, 20, .7, .7, 20, '#8a6538', 1.5); wire(.7, .3, 20, .3, .7, 20, '#8a6538', 1.5);
  box(.22, .22, .56, .56, 40, 16, '#a67c4a', { left: carved({ cols: 2, n: 3, my: 3, top: 3 }), right: logs(3) }); pyramid(.18, .18, .64, .64, 56, 18, SHING);
  const fx = sx(.5, .5), fb = sy(.5, .5, 74); line(fx, fb, fx, fb - 12, '#555', 1.5); poly([[fx, fb - 12], [fx + 9, fb - 9], [fx, fb - 6]], '#c9533a');
});
