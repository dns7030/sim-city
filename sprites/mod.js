// Epoch: Modern Russia (1991 - today).
const GL1 = '#5f95b8', GL2 = '#a8cde0', GL3 = '#3f6f92', CON = '#cfd2d4', WH = '#f2f3f2', ACC = '#d8483a';
const glass = (cols, rows, o = {}) => (W, H) => {
  const g = ctx.createLinearGradient(0, H, W, 0); g.addColorStop(0, o.c1 || GL3); g.addColorStop(.5, o.c2 || GL1); g.addColorStop(1, o.c3 || GL2); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = o.mull || 'rgba(235,245,250,.55)'; ctx.lineWidth = .7; for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i * W / cols, 0); ctx.lineTo(i * W / cols, H); ctx.stroke(); } for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * H / rows); ctx.lineTo(W, j * H / rows); ctx.stroke(); }
  if (o.sun) { ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.beginPath(); ctx.moveTo(W * .1, 0); ctx.lineTo(W * .35, 0); ctx.lineTo(W * .15, H); ctx.lineTo(0, H); ctx.fill(); } };
const mwin = (c, r, o = {}) => windows(Object.assign({ cols: c, rows: r, gw: .55, gh: .6, glass: '#4f7a96', lit: .08, mx: 3, my: 3, top: 3 }, o));
const balcs = (n, col = '#e8ece8') => (W, H) => { ctx.fillStyle = col; for (let j = 1; j < n; j++) ctx.fillRect(0, j * H / n - 1, W, 1.4); };
const parking = (x0, y0, x1, y1, n) => { flat(x0, y0, x1, y1, '#5a5e64'); for (let i = 1; i < n; i++) { const x = x0 + (x1 - x0) * i / n; flat(x - .008, y0 + .02, x + .008, y1 - .02, '#e8e8e0', .1); } };
const slab = (x0, y0, w, d, z, h, o = {}) => box(x0, y0, w, d, z, h, o.col || CON, { left: o.left || glass(o.cols || 8, o.rows || 6, o), right: o.right || glass(Math.max(2, Math.round((o.cols || 8) * d / w)), o.rows || 6, Object.assign({}, o, { c1: '#2f5a78', c2: '#4a7a98', c3: '#7aa8c4' })) });
const car = (x, y, col) => { box(x, y, .14, .07, 0, 3, col); box(x + .03, y + .005, .07, .06, 3, 2, '#dfe8ee'); };

SP_('Suburban Cottage', 1, 1, 'mod', 'R', 0, () => {
  box(.15, .25, .55, .5, 0, 26, '#e8e0d0', { left: cmp(mwin(2, 2, { gw: .4, gh: .45 }), (W, H) => { ctx.fillStyle = '#7a5a40'; ctx.fillRect(W * .7, 0, 5, 9); }), right: mwin(2, 2, { gw: .4, gh: .4 }) }); pyramid(.13, .23, .59, .54, 26, 14, '#6a5a52'); box(.7, .35, .22, .4, 0, 14, '#d8d0c0', { left: (W, H) => { ctx.fillStyle = '#9aa0a4'; ctx.fillRect(2, 0, W - 4, 9); } }); roof(.69, .34, .24, .42, 14, 6, '#5a5a5a', '#d8d0c0', 'y'); tree(.2, .88, .8); tree(.85, .15, .7);
});
SP_('Townhouse Row', 2, 1, 'mod', 'R', 1, () => {
  ['#d8c0a0', '#b8d0c0', '#e0b8a8', '#c0c8d8'].forEach((c, i) => { const x = .06 + i * .47; box(x, .22, .43, .56, 0, 34 + (i % 2) * 5, c, { left: cmp(mwin(2, 3, { gw: .4, gh: .5 }), (W, H) => { ctx.fillStyle = '#4a4a4a'; ctx.fillRect(W * .35, 0, 5, 8); }), right: mwin(2, 3, { gw: .4 }) }); roof(x - .02, .2, .47, .6, 34 + (i % 2) * 5, 9, '#5a5a62', c, 'y'); });
});
SP_('Brick Monolith Apartments', 2, 1, 'mod', 'R', 2, () => {
  box(.05, .15, 1.9, .7, 0, 96, '#b8704e', { left: cmp(brickBand, mwin(10, 12, { gw: .55, gh: .55, glass: '#4f7a96', lit: .12, my: 4, top: 4 }), balcs(12)), right: cmp(brickBand, mwin(3, 12, { glass: '#3f6a86' })) }); box(.05, .15, 1.9, .7, 96, 3, '#e8e4dc'); box(.8, .3, .4, .35, 99, 8, '#d0ccc4');
});
SP_('Residential Complex (ZhK Towers)', 2, 2, 'mod', 'R', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#6f9a5a'); box(.1, .1, 1.8, 1.8, 0, 10, '#b8bcc0'); const tw = [[.2, .2, .6, 1.0, 104, '#e8dcc8', ACC], [.9, .3, .6, .6, 140, '#d8e4e8', '#3a8aa8'], [.3, 1.1, .7, .6, 80, '#e8d8d0', '#e0a030']];
  tw.forEach(([x, y, w, d, h, c, a]) => box(x, y, w, d, 10, h, c, { left: cmp(mwin(Math.round(w * 9), Math.round(h / 12), { gw: .5, gh: .55, glass: '#5a86a2' }), (W, H) => { ctx.fillStyle = a; ctx.fillRect(W * .8, 0, 3, H); }), right: cmp(mwin(Math.round(d * 6), Math.round(h / 12), { glass: '#486f88' }), (W, H) => { ctx.fillStyle = a; ctx.fillRect(0, 0, 3, H); }) })); tree(1.5, 1.5, 1.1); tree(1.7, 1.7, 1);
});
SP_('Curved Waterfront Complex', 2, 2, 'mod', 'R', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8b4a8'); flat(.1, 1.5, 1.9, 1.95, '#4a86b8'); box(.15, .2, 1.7, 1.0, 0, 12, '#c8ccd0');
  [[.65, .6, 20, 112, '#e8e4dc'], [1.25, .7, 18, 84, '#dce4e8'], [1.1, .3, 14, 66, '#e8dcd0']].forEach(([x, y, r, h, c], i) => { const cx = sx(x, y), b = sy(x, y, 12), bands = []; for (let k = 0; k < h / 6; k++) bands.push([k * 6 / h + .02, k * 6 / h + .05, '#5a86a2']); cyl(cx, b, r, r / 2, h, c, { bands }); ctx.fillStyle = [ACC, '#3a8aa8', '#e0a030'][i]; ctx.beginPath(); ctx.ellipse(cx, b - h, r * .6, r * .3, 0, 0, 7); ctx.fill(); });
});
SP_('Premium Glass Tower', 1, 1, 'mod', 'R', 4, () => {
  slab(.18, .18, .64, .64, 0, 120, { cols: 5, rows: 20, sun: true }); box(.3, .3, .4, .4, 120, 10, '#8aa8bc'); box(.4, .4, .2, .2, 130, 12, '#b0c8d8'); const c = sx(.5, .5), b = sy(.5, .5, 142); line(c, b, c, b - 22, '#888', 1.2); ctx.fillStyle = '#d6d0c0'; ctx.fillRect(sx(.18, .82) - 1, sy(.18, .82, 0) - 8, 2, 8);
});
SP_('Convenience Store', 1, 1, 'mod', 'C', 0, () => {
  box(.12, .25, .76, .5, 0, 20, '#f0eee8', { left: (W, H) => { glass(4, 1, { sun: true })(W, H - 8); ctx.fillStyle = ACC; ctx.fillRect(0, H - 7, W, 7); ctx.fillStyle = '#fff'; ctx.font = 'bold 5px sans-serif'; ctx.save(); ctx.scale(1, -1); ctx.textAlign = 'center'; ctx.fillText('24', W / 2, -(H - 5.5)); ctx.restore(); }, right: glass(2, 1) }); parking(.1, .78, .9, .98, 4); car(.3, .82, '#d8c040');
});
SP_('Supermarket', 2, 1, 'mod', 'C', 1, () => {
  box(.05, .12, 1.9, .55, 0, 28, '#e8e8e4', { left: (W, H) => { ctx.fillStyle = '#e8e8e4'; ctx.fillRect(0, 0, W, H); glass(8, 1, { sun: true })(W * .7, 14); ctx.fillStyle = '#3a8a4a'; ctx.fillRect(0, H - 9, W, 9); ctx.fillStyle = '#fff'; ctx.fillRect(W * .4, H - 7, W * .2, 5); }, right: mwin(2, 1, { gw: .3, gh: .3 }) }); parking(.05, .72, 1.95, .98, 14); car(.3, .78, '#c0392b'); car(.8, .78, '#3a6fb0'); car(1.3, .78, '#e8e8e8'); car(1.55, .78, '#2a2a2a');
});
SP_('Glass Business Center', 2, 1, 'mod', 'C', 2, () => { slab(.05, .15, 1.9, .7, 0, 78, { cols: 14, rows: 8, sun: true }); box(.05, .15, 1.9, .7, 78, 3, '#d8dcde'); box(.7, .3, .6, .4, 81, 8, '#b8c0c4'); });
SP_('Shopping Mall', 3, 2, 'mod', 'C', 3, () => {
  parking(.1, 1.2, 2.9, 1.95, 22); [[.4, 1.4, '#c0392b'], [1.2, 1.45, '#e8e8e8'], [2.0, 1.4, '#3a6fb0'], [2.4, 1.5, '#2a2a2a']].forEach(([x, y, c]) => car(x, y, c));
  box(.1, .2, 2.8, .95, 0, 36, '#e4e2dc', { left: (W, H) => { ctx.fillStyle = '#e4e2dc'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = GL1; ctx.fillRect(W * .32, 2, W * .36, H - 4); glass(6, 3, { sun: true })(W * .36, H - 4); ctx.fillStyle = ACC; ctx.fillRect(0, H - 10, W, 6); [.1, .8].forEach(f => { ctx.fillStyle = '#3a6fb0'; ctx.fillRect(W * f, H - 20, 16, 8); }); }, right: cmp(stripesFace('#cfcdc6', '#c6c4bc', 10), mwin(2, 1, { gw: .3, gh: .3 })) });
  box(.9, .25, 1.2, .8, 36, 12, '#cfe6ee', { left: glass(10, 2, { sun: true }), right: glass(6, 2) });
});
SP_('Federation-Style Skyscraper', 1, 1, 'mod', 'C', 4, () => {
  slab(.14, .14, .72, .72, 0, 150, { cols: 6, rows: 28, sun: true }); slab(.22, .22, .56, .56, 150, 28, { cols: 5, rows: 5 }); slab(.32, .32, .36, .36, 178, 22, { cols: 3, rows: 4 }); const c = sx(.5, .5), b = sy(.5, .5, 200); poly([[c - 6, b], [c + 6, b], [c, b - 22]], '#9ab4c4'); line(c, b - 22, c, b - 40, '#888', 1.2);
});
SP_('City Twin Towers', 2, 2, 'mod', 'C', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8bcc0'); box(.1, .9, 1.8, .9, 0, 14, '#c8cccf', { left: glass(10, 2) }); slab(.2, .15, .65, .65, 14, 140, { cols: 5, rows: 22, sun: true }); slab(1.05, .25, .65, .65, 14, 110, { cols: 5, rows: 18 });
  const a = sx(.52, .47), ab = sy(.52, .47, 154); poly([[a - 20, ab + 12], [a + 20, ab + 12], [a + 20, ab], [a, ab - 14], [a - 20, ab]], GL2); box(.85, .45, .2, .25, 60, 8, '#c8d0d4'); line(sx(1.37, .57), sy(1.37, .57, 124), sx(1.37, .57), sy(1.37, .57, 140), '#888', 1.2);
});
SP_('Needle Tower (Lakhta-Style)', 2, 2, 'mod', 'C', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#bcc0c4'); flat(.1, 1.4, 1.9, 1.95, '#4a86b8'); const c = sx(1, 1), b = sy(1, 1, 0);
  for (let i = 0; i < 16; i++) { const s = .7 - i * .04, h = 13, z = i * h; slab(1 - s / 2, 1 - s / 2, s, s, z, h, { cols: Math.max(2, Math.round(s * 6)), rows: 2, c2: i % 2 ? GL1 : GL3 }); }
  poly([[c - 3, b - 208], [c + 3, b - 208], [c, b - 262]], '#c8d4dc'); box(.3, 1.1, .8, .6, 0, 18, '#c8cccf', { left: glass(6, 2) });
});
SP_('Four-Star Hotel', 2, 1, 'mod', 'hotel', 2, () => {
  box(.05, .15, 1.9, .7, 0, 62, '#e4d8c8', { left: cmp(mwin(12, 7, { gw: .5, gh: .55, glass: '#5a86a2', lit: .15 }), balcs(7, '#cfc4b0')), right: mwin(3, 7, { gw: .45 }) }); box(.05, .15, 1.9, .7, 62, 3, '#d8dcde'); box(.6, .82, .8, .16, 0, 12, '#c8ccd0', { left: glass(4, 1) }); box(.55, .8, .9, .22, 12, 3, ACC);
  const c = sx(1, .5), b = sy(1, .5, 65); ctx.fillStyle = '#c8a050'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(c - 9 + i * 6, b - 4, 2.5, 0, 7); ctx.fill(); }
});
SP_('Auto Repair Workshop', 1, 1, 'mod', 'I', 0, () => {
  box(.15, .25, .7, .5, 0, 20, '#a8aeb4', { left: cmp((W, H) => { for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#9ea4aa' : '#b2b8be'; ctx.fillRect(i * W / 12, 0, W / 12 + .5, H); } ctx.fillStyle = '#d8483a'; ctx.fillRect(W * .15, 0, W * .3, 13); ctx.fillStyle = '#b8c0c8'; ctx.fillRect(W * .55, 0, W * .3, 13); ctx.strokeStyle = '#7a8088'; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(W * .15, i * 2.2); ctx.lineTo(W * .45, i * 2.2); ctx.stroke(); } }), right: stripesFace('#9ea4aa', '#94999f', 8) }); box(.12, .22, .76, .56, 20, 2, '#6a6e72'); car(.25, .82, '#3a6fb0'); car(.55, .85, '#c0392b');
});
SP_('Logistics Hub', 2, 2, 'mod', 'I', 1, () => {
  parking(.05, 1.15, 1.95, 1.95, 16); box(.1, .15, 1.8, .9, 0, 36, '#d0d4d8', { left: (W, H) => { ctx.fillStyle = '#d0d4d8'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 3 === 0 ? '#3a6fb0' : '#9aa2a8'; ctx.fillRect(3 + i * (W - 6) / 12, 0, 6, 12); } ctx.fillStyle = '#3a6fb0'; ctx.fillRect(0, H - 6, W, 4); }, right: stripesFace('#bcc0c4', '#b2b6ba', 10) });
  [.3, .75, 1.2, 1.55].forEach((x, i) => { box(x, 1.2, .3, .12, 0, 8, ['#e8e8e8', '#d8483a', '#3a6fb0', '#e8e8e8'][i]); box(x - .09, 1.2, .1, .12, 0, 5, '#2a2a2a'); });
});
SP_('Data Center', 2, 1, 'mod', 'I', 2, () => {
  box(.05, .15, 1.9, .7, 0, 34, '#bcc2c8', { left: cmp(stripesFace('#bcc2c8', '#b2b8be', 20), (W, H) => { ctx.fillStyle = '#2a3a48'; ctx.fillRect(W * .4, 0, 14, 12); ctx.fillStyle = '#4af0a0'; for (let i = 0; i < 8; i++) ctx.fillRect(4 + i * 6, H - 7, 2, 2); }), right: stripesFace('#a8aeb4', '#a0a6ac', 10) });
  for (let i = 0; i < 6; i++) { const c = sx(.3 + (i % 3) * .5, .3 + Math.floor(i / 3) * .35), b = sy(.3 + (i % 3) * .5, .3 + Math.floor(i / 3) * .35, 34); cyl(c, b, 7, 3.5, 4, '#8a9298'); ctx.fillStyle = '#4a5258'; ctx.beginPath(); ctx.ellipse(c, b - 4, 4, 2, 0, 0, 7); ctx.fill(); }
});
SP_('Gas Processing Plant', 2, 2, 'mod', 'I', 2, () => {
  flat(.05, .05, 1.95, 1.95, '#8a8c84'); [[.4, .4], [.85, .3], [1.3, .45]].forEach(([x, y], i) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 7, 3.5, 90 - i * 12, '#d4d8dc', { bands: [[.3, .34, '#8a949a'], [.62, .66, '#8a949a']] }); line(c + 8, b - 4, c + 8, b - 84 + i * 12, '#3a6fb0', 1.5); });
  [[.5, 1.3], [1.0, 1.4], [1.5, 1.3]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); [-5, 5].forEach(o => line(c + o, b, c + o * .8, b - 10, '#777', 2)); sphere(c, b - 20, 12, '#e8eef0'); });
  const f = sx(1.7, .9), fb = sy(1.7, .9, 0); line(f, fb, f, fb - 80, '#666', 2); ctx.fillStyle = '#e8531a'; ctx.beginPath(); ctx.moveTo(f - 4, fb - 80); ctx.quadraticCurveTo(f - 7, fb - 94, f, fb - 108); ctx.quadraticCurveTo(f + 7, fb - 94, f + 4, fb - 80); ctx.fill(); ctx.fillStyle = '#ffd060'; ctx.beginPath(); ctx.moveTo(f - 2, fb - 80); ctx.quadraticCurveTo(f - 3, fb - 90, f, fb - 98); ctx.quadraticCurveTo(f + 3, fb - 90, f + 2, fb - 80); ctx.fill(); wire(.3, 1.0, 6, 1.7, 1.0, 6, '#c0392b', 3);
});
SP_('Modern Metal Works', 2, 2, 'mod', 'I', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#85888a'); box(.1, .15, 1.4, .8, 0, 36, '#8a9298', { left: stripesFace('#8a9298', '#80888e', 20), right: stripesFace('#707880', '#687078', 10) }); for (let i = 0; i < 5; i++) { const x = .12 + i * .27; poly([[sx(x, .15), sy(x, .15, 36)], [sx(x, .95), sy(x, .95, 36)], [sx(x, .95), sy(x, .95, 46)]], '#6a7278'); poly([[sx(x, .15), sy(x, .15, 46)], [sx(x + .27, .15), sy(x + .27, .15, 36)], [sx(x + .27, .95), sy(x + .27, .95, 36)], [sx(x, .95), sy(x, .95, 46)]], '#aab2b8'); }
  const c = sx(1.7, .5), b = sy(1.7, .5, 0); cyl(c, b, 14, 7, 54, '#b04a30', { bands: [[.4, .5, '#702a1a']] }); ctx.fillStyle = '#ff9a2e'; ctx.beginPath(); ctx.ellipse(c, b - 54, 10, 5, 0, 0, 7); ctx.fill();
  const c2 = sx(1.4, 1.5), b2 = sy(1.4, 1.5, 0); [-8, 0, 8].forEach(o => { ctx.fillStyle = '#b8bec2'; ctx.fillRect(c2 + o - 3, b2 - 14, 6, 14); }); line(c2 - 12, b2 - 14, c2 + 12, b2 - 14, '#555', 2); box(.2, 1.2, 1.0, .5, 0, 20, '#a8aeb4', { left: stripesFace('#a8aeb4', '#9ea4aa', 14) });
});
SP_('Car Factory', 3, 2, 'mod', 'I', 3, () => {
  flat(.05, .05, 2.95, 1.95, '#7e8286'); box(.1, .15, 2.2, 1.0, 0, 34, '#d4d8dc', { left: cmp(stripesFace('#d4d8dc', '#cacfd3', 22), (W, H) => { ctx.fillStyle = GL1; ctx.fillRect(4, H - 14, W - 8, 8); ctx.fillStyle = ACC; ctx.fillRect(0, H - 4, W, 3); }), right: stripesFace('#b8bcc0', '#aeb2b6', 12) });
  for (let i = 0; i < 6; i++) { const x = .12 + i * .36; poly([[sx(x, .15), sy(x, .15, 34)], [sx(x, 1.15), sy(x, 1.15, 34)], [sx(x, 1.15), sy(x, 1.15, 46)]], '#5a8aa8'); poly([[sx(x, .15), sy(x, .15, 46)], [sx(x + .36, .15), sy(x + .36, .15, 34)], [sx(x + .36, 1.15), sy(x + .36, 1.15, 34)], [sx(x, 1.15), sy(x, 1.15, 46)]], '#9ac4dc'); }
  parking(.1, 1.3, 2.9, 1.95, 24); [[.3, 1.4, '#c0392b'], [.6, 1.4, '#e8e8e8'], [.9, 1.4, '#3a6fb0'], [1.2, 1.4, '#2a2a2a'], [1.5, 1.4, '#c0392b'], [1.8, 1.4, '#e8e8e8'], [.45, 1.65, '#3a6fb0'], [.9, 1.65, '#e0c040']].forEach(([x, y, c]) => car(x, y, c)); box(2.45, .3, .45, .6, 0, 18, '#e8e8e8', { left: glass(3, 1) });
});
SP_('Gas Turbine Power Plant', 2, 2, 'mod', 'power', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#85888a'); box(.1, .3, 1.3, .8, 0, 34, '#cfd4d8', { left: cmp(stripesFace('#cfd4d8', '#c4c9cd', 18), (W, H) => { ctx.fillStyle = '#3a6fb0'; ctx.fillRect(0, H - 7, W, 3); }), right: stripesFace('#b0b6ba', '#a6acb0', 8) });
  [[1.6, .5], [1.75, .85]].forEach(([x, y], i) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 5, 2.5, 90 + i * 8, '#e8eaec', { bands: [[.8, .87, ACC], [.93, 1, ACC]] }); });
  for (let i = 0; i < 5; i++) { const c = sx(.3 + i * .2, 1.5), b = sy(.3 + i * .2, 1.5, 0); cyl(c, b, 9, 4.5, 16, '#9aa2a8'); ctx.fillStyle = '#4a5258'; ctx.beginPath(); ctx.ellipse(c, b - 16, 6, 3, 0, 0, 7); ctx.fill(); } wire(1.5, 1.3, 0, 1.5, 1.3, 40, '#6b7a86', 2); wire(1.35, 1.3, 40, 1.65, 1.3, 40, '#6b7a86', 2);
});
SP_('Wind Farm', 2, 2, 'mod', 'power', 2, () => {
  flat(.05, .05, 1.95, 1.95, '#86a860'); [[.5, .5, 1], [1.4, .6, .9], [.9, 1.4, 1]].forEach(([x, y, s], i) => { const c = sx(x, y), b = sy(x, y, 0); poly([[c - 3 * s, b], [c + 3 * s, b], [c + 1.5 * s, b - 80 * s], [c - 1.5 * s, b - 80 * s]], '#e8eaec'); const a = i * .7; for (let k = 0; k < 3; k++) { const an = a + k * 2.094, ex = c + Math.cos(an) * 38 * s, ey = b - 80 * s + Math.sin(an) * 38 * s; poly([[c, b - 80 * s], [ex, ey], [ex + Math.sin(an) * 3, ey - Math.cos(an) * 3]], '#f4f6f6'); } sphere(c, b - 80 * s, 3, '#c8ccd0'); });
  box(1.5, 1.4, .3, .3, 0, 8, '#8a9298');
});
SP_('Modern Metro Vestibule', 1, 1, 'mod', 'transit', 2, () => {
  box(.15, .25, .7, .5, 0, 24, '#dfe4e6', { left: cmp(glass(4, 2, { sun: true }), (W, H) => { ctx.fillStyle = ACC; ctx.fillRect(0, H - 4, W, 3); }), right: glass(3, 2) }); box(.1, .2, .8, .6, 24, 3, '#9aa2a8'); const c = sx(.5, .5), b = sy(.5, .5, 27); ctx.fillStyle = ACC; ctx.beginPath(); ctx.arc(c, b - 10, 9, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('M', c, b - 9);
});
SP_('Airport Terminal', 3, 2, 'mod', 'transit', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#6a6e72'); flat(.2, 1.35, 2.8, 1.6, '#e8e8e0', .1); box(.15, .15, 2.7, .75, 0, 28, '#dde2e6', { left: cmp(glass(16, 2, { sun: true }), (W, H) => { ctx.fillStyle = '#9aa2a8'; ctx.fillRect(0, H - 3, W, 3); }), right: glass(4, 2) });
  const cx = sx(1.5, .5), b = sy(1.5, .5, 28); ctx.fillStyle = '#e8ecee'; ctx.beginPath(); ctx.moveTo(cx - 90, b + 18); ctx.quadraticCurveTo(cx - 50, b - 30, cx - 10, b - 6); ctx.quadraticCurveTo(cx + 30, b - 40, cx + 90, b - 8); ctx.lineTo(cx + 92, b + 6); ctx.quadraticCurveTo(cx + 30, b - 26, cx - 10, b + 6); ctx.quadraticCurveTo(cx - 50, b - 14, cx - 90, b + 32); ctx.closePath(); ctx.fill();
  box(2.5, .2, .22, .22, 0, 80, '#cfd4d8', { left: glass(1, 6), right: glass(1, 6) }); box(2.45, .15, .32, .32, 80, 14, GL3, { left: glass(4, 1, { c1: '#2f5a78' }) });
  const pl = sx(1.4, 1.5), pb = sy(1.4, 1.5, 4); ctx.fillStyle = WH; ctx.beginPath(); ctx.moveTo(pl - 26, pb); ctx.lineTo(pl + 22, pb - 7); ctx.lineTo(pl + 26, pb - 5); ctx.lineTo(pl - 20, pb + 2); ctx.closePath(); ctx.fill(); poly([[pl - 4, pb - 4], [pl + 12, pb - 22], [pl + 18, pb - 20], [pl + 6, pb - 3]], '#dfe4e6'); poly([[pl - 4, pb], [pl - 18, pb + 12], [pl - 12, pb + 14], [pl + 4, pb + 1]], '#dfe4e6'); poly([[pl - 24, pb - 1], [pl - 30, pb - 14], [pl - 24, pb - 12], [pl - 18, pb]], ACC);
});
SP_('Glass University Campus', 2, 2, 'mod', 'edu', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#6f9a5a'); flat(.4, .9, 1.6, 1.2, '#cfc8b0'); slab(.1, .1, .8, 1.5, 0, 60, { cols: 6, rows: 8, sun: true }); slab(1.1, .3, .8, 1.3, 0, 48, { cols: 6, rows: 6 }); box(.85, .6, .3, .6, 20, 22, '#cfe6ee', { left: glass(3, 2), right: glass(3, 2) }); tree(.6, 1.75, 1); tree(1.5, 1.75, 1); tree(1.0, 1.85, .9);
});
SP_('New School', 2, 1, 'mod', 'edu', 1, () => {
  [[.05, '#e0a030', 30], [.65, '#3a8aa8', 36], [1.25, '#d8483a', 30]].forEach(([x, c, h]) => box(x, .15, .55, .55, 0, h, c, { left: cmp(mwin(3, 3, { gw: .6, gh: .55, glass: '#dfe8ee', lit: 0 })), right: mwin(2, 3, { glass: '#cfdde4', lit: 0 }) })); box(.05, .15, 1.75, .12, 30, 3, WH); parking(.05, .8, 1.95, .98, 1); flat(1.0, .8, 1.9, .98, '#c0392b', .1); const f = sx(.3, .85), fb = sy(.3, .85, 0); line(f, fb, f, fb - 30, '#666', 1.4); poly([[f, fb - 30], [f + 11, fb - 27], [f, fb - 22]], '#2f5aa8');
});
SP_('Innovation Center Ring', 2, 2, 'mod', 'edu', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8bcb4'); const cx = sx(1, 1), b = sy(1, 1, 0); cyl(cx, b, 56, 28, 40, '#e4e8ea', { open: true }); ctx.fillStyle = '#d0d6d8'; ctx.beginPath(); ctx.ellipse(cx, b - 40, 56, 28, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#6f9a5a'; ctx.beginPath(); ctx.ellipse(cx, b - 38, 38, 19, 0, 0, 7); ctx.fill();
  for (let i = 0; i <= 14; i++) { const a = i * Math.PI / 14, px = cx + 56 * Math.cos(a), py = b + 28 * Math.sin(a); ctx.fillStyle = 'rgba(70,110,140,.9)'; ctx.fillRect(px - 2.5, py - 34, 5, 28); }
  dome(cx, b - 38, 14, '#a8d0e4'); tree(1, 1, .8);
});
SP_('Hospital Complex', 2, 2, 'mod', 'health', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#a8aca8'); box(.1, .1, 1.2, .6, 0, 44, '#f4f6f6', { left: cmp(mwin(8, 4, { gw: .5, gh: .5, glass: '#6f9ab8', lit: 0 }), balcs(4, '#d8e0e4')), right: mwin(3, 4, { glass: '#5f8aa8', lit: 0 }) }); box(.1, .7, .6, 1.2, 0, 36, '#f4f6f6', { left: mwin(3, 3, { gw: .5, glass: '#6f9ab8', lit: 0 }), right: mwin(8, 3, { gw: .5, glass: '#5f8aa8', lit: 0 }) }); box(1.3, .5, .55, .8, 0, 28, '#f4f6f6', { left: glass(3, 2), right: glass(4, 2) });
  const cx = sx(1.0, 1.4), b = sy(1.0, 1.4, 0); ctx.fillStyle = '#4a5258'; ctx.beginPath(); ctx.ellipse(cx, b, 22, 11, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#e8c840'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, b, 19, 9.5, 0, 0, 7); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('H', cx, b);
  const k = sx(.4, .4), kb = sy(.4, .4, 44); ctx.fillStyle = ACC; ctx.fillRect(k - 2, kb - 14, 4, 12); ctx.fillRect(k - 6, kb - 10, 12, 4);
});
SP_('Fire Station (Modern)', 2, 1, 'mod', 'safe', 2, () => {
  box(.05, .15, 1.5, .6, 0, 28, '#ecece8', { left: cmp((W, H) => { ctx.fillStyle = '#ecece8'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#d8483a'; ctx.fillRect(4 + i * 15, 0, 12, 16); ctx.fillStyle = '#f4f4f0'; for (let k = 1; k < 5; k++) ctx.fillRect(4 + i * 15, k * 3, 12, .8); } ctx.fillStyle = '#d8483a'; ctx.fillRect(0, H - 5, W, 5); }), right: mwin(3, 1, { gw: .4, gh: .4 }) }); box(1.5, .2, .4, .45, 0, 46, '#d8483a', { left: glass(1, 4), right: glass(1, 4) }); box(1.45, .15, .5, .55, 46, 3, '#ecece8');
});
SP_('Police Precinct', 1, 1, 'mod', 'safe', 1, () => {
  box(.14, .22, .72, .56, 0, 30, '#e8ecee', { left: cmp(glass(3, 2, { sun: true }), (W, H) => { ctx.fillStyle = '#2f5aa8'; ctx.fillRect(0, H - 6, W, 4); ctx.fillStyle = '#d8483a'; ctx.fillRect(0, H - 8, W, 1.5); }), right: mwin(2, 2, { gw: .4 }) }); box(.12, .2, .76, .6, 30, 2, '#2f5aa8'); car(.15, .85, '#e8ecee');
});
SP_('Modern Orthodox Cathedral', 2, 2, 'mod', 'relig', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#b8b4a4'); box(.35, .35, 1.3, 1.3, 0, 44, '#f6f4ee', { left: cmp(rustic, facade({ cols: 5, rows: 1, gw: .15, gh: .5, glass: '#4a5a6a', arch: true, trim: '#c9a050', cornice: 4, corniceCol: '#e0d8c0', pilasters: true, my: 16, door: true, doorW: 12, doorH: 18 })), right: facade({ cols: 5, rows: 1, gw: .15, gh: .5, glass: '#4a5a6a', arch: true, cornice: 4, corniceCol: '#e0d8c0', pilasters: true, my: 16 }) });
  [[.55, .55], [1.45, .55], [.55, 1.45], [1.45, 1.45]].forEach(([x, y]) => cupola(x, y, 44, 6, 8, 12, GOLD, { win: true })); cupola(1, 1, 44, 9, 14, 20, GOLD, { win: true, cross: 11 });
  box(1.7, .3, .24, .24, 0, 70, '#f6f4ee', { left: windows({ cols: 1, rows: 3, gw: .4, gh: .3, glass: '#4a5a6a', arch: true }), right: windows({ cols: 1, rows: 3, gw: .4, gh: .3, glass: '#4a5a6a', arch: true }) }); pyramid(1.68, .28, .28, .28, 70, 14, GOLD); crossAt(sx(1.82, .42), sy(1.82, .42, 84), 7);
});
SP_('Mosque (Qolsharif-Style)', 2, 2, 'mod', 'relig', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#c4bfae'); box(.4, .4, 1.2, 1.2, 0, 34, '#f4f6f4', { left: cmp(stripesFace('#f4f6f4', '#e8ece8', 20), windows({ cols: 5, rows: 1, gw: .22, gh: .6, glass: '#3a8a9a', arch: true, trim: '#c9d8d8', my: 8, top: 6 }), (W, H) => { ctx.fillStyle = '#3a9aa8'; ctx.fillRect(0, H - 5, W, 4); }), right: cmp(stripesFace('#dfe4e0', '#d4dad6', 14), windows({ cols: 5, rows: 1, gw: .22, gh: .6, glass: '#3a8a9a', arch: true, my: 8, top: 6 })) });
  const cx = sx(1, 1), b = sy(1, 1, 34); cyl(cx, b, 20, 10, 12, '#f4f6f4'); onion(cx, b - 12, 22, 34, '#2fa8b8', '#f0f8f8'); line(cx, b - 46, cx, b - 58, GOLD, 1.5); ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx + 1, b - 60, 3, .6, 5.6); ctx.stroke();
  [[.25, .25], [1.65, .25]].forEach(([x, y]) => { const c = sx(x + .05, y + .05), by = sy(x + .05, y + .05, 0); cyl(c, by, 4, 2, 90, '#f4f6f4', { bands: [[.55, .6, '#2fa8b8'], [.82, .87, '#2fa8b8']] }); onion(c, by - 90, 5, 14, '#2fa8b8'); line(c, by - 104, c, by - 112, GOLD, 1.2); });
});
SP_('Zaryadye Glass Hall', 2, 2, 'mod', 'cult', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#7aa860'); const cx = sx(1, 1), b = sy(1, 1, 0); ctx.fillStyle = '#6a9a58'; ctx.beginPath(); ctx.ellipse(cx, b, 62, 31, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5a8a48'; ctx.beginPath(); ctx.ellipse(cx, b - 6, 50, 25, 0, 0, 7); ctx.fill();
  const g = ctx.createRadialGradient(cx - 14, b - 40, 6, cx, b - 14, 48); g.addColorStop(0, 'rgba(210,240,250,.95)'); g.addColorStop(1, 'rgba(70,130,160,.9)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 40, b - 6); ctx.quadraticCurveTo(cx - 36, b - 54, cx, b - 62); ctx.quadraticCurveTo(cx + 36, b - 54, cx + 40, b - 6); ctx.ellipse(cx, b - 6, 40, 20, 0, 0, Math.PI); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(cx + i * 12, b - 4); ctx.quadraticCurveTo(cx + i * 9, b - 40, cx, b - 62); ctx.stroke(); } tree(.25, 1.7, 1); tree(1.75, 1.6, 1);
});
SP_('Football Arena', 3, 2, 'mod', 'cult', 4, () => {
  flat(.05, .05, 2.95, 1.95, '#a8aca8'); const cx = sx(1.5, 1), b = sy(1.5, 1, 0), rx = 78, ry = 39;
  cyl(cx, b, rx, ry, 30, '#e8ecee', { open: true, bands: [[.55, .75, '#3a6fb0']] }); for (let i = 0; i <= 22; i++) { const a = i * Math.PI / 22, px = cx + rx * Math.cos(a), py = b + ry * Math.sin(a); ctx.fillStyle = 'rgba(80,120,150,.85)'; ctx.fillRect(px - 1.5, py - 26, 3, 20); }
  ctx.fillStyle = '#cfd4d8'; ctx.beginPath(); ctx.ellipse(cx, b - 30, rx, ry, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#4f9a4a'; ctx.beginPath(); ctx.ellipse(cx, b - 28, 44, 21, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, b - 28, 44, 21, 0, 0, 7); ctx.moveTo(cx - 20, b - 20); ctx.lineTo(cx + 20, b - 36); ctx.stroke();
  ctx.fillStyle = 'rgba(240,244,246,.92)'; ctx.beginPath(); ctx.ellipse(cx, b - 40, rx + 4, ry + 2, 0, Math.PI, 0); ctx.ellipse(cx, b - 30, rx - 14, ry - 8, 0, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#8a949a'; ctx.lineWidth = 1; for (let i = 0; i <= 10; i++) { const a = Math.PI + i * Math.PI / 10; ctx.beginPath(); ctx.moveTo(cx + (rx + 4) * Math.cos(a), b - 40 + (ry + 2) * Math.sin(a)); ctx.lineTo(cx + (rx - 14) * Math.cos(a), b - 30 + (ry - 8) * Math.sin(a) * -1); ctx.stroke(); }
});
SP_('Ice Palace', 2, 2, 'mod', 'cult', 3, () => {
  flat(.05, .05, 1.95, 1.95, '#b8bcc0'); box(.15, .3, 1.7, 1.4, 0, 26, '#e8eef2', { left: cmp(glass(10, 2, { sun: true }), (W, H) => { ctx.fillStyle = '#3a8ac0'; ctx.fillRect(0, H - 3, W, 3); }), right: stripesFace('#cfd8dc', '#c4ced2', 12) });
  const cx = sx(1, 1), b = sy(1, 1, 26), g = ctx.createLinearGradient(cx - 70, 0, cx + 70, 0); g.addColorStop(0, '#f4f8fa'); g.addColorStop(1, '#8aa0ac'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 62, b + 14); ctx.quadraticCurveTo(cx - 40, b - 56, cx, b - 50); ctx.quadraticCurveTo(cx + 40, b - 56, cx + 62, b + 14); ctx.lineTo(cx, b + 38); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.18)'; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(cx + i * 9, b - 52 + Math.abs(i) * 2); ctx.lineTo(cx + i * 18, b + 28 - Math.abs(i) * 3); ctx.stroke(); }
});
SP_('New Theatre', 2, 1, 'mod', 'cult', 3, () => {
  box(.05, .15, 1.9, .7, 0, 42, '#e8ddc0', { left: cmp((W, H) => { ctx.fillStyle = '#e8ddc0'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#d4b060'; for (let i = 0; i < 14; i++) ctx.fillRect(3 + i * (W - 6) / 14, 4, 2.5, H - 8); glass(6, 3, { sun: true })(W * .4, H - 10); }), right: cmp(stripesFace('#d8cca8', '#cfc19c', 10), glass(3, 3)) }); box(.05, .15, 1.9, .7, 42, 3, '#d4b060'); box(.6, .3, .8, .4, 45, 10, '#cfe6ee', { left: glass(5, 1), right: glass(3, 1) });
});
SP_("Mayor's Office Complex", 2, 1, 'mod', 'gov', 3, () => {
  slab(.05, .2, .7, .6, 0, 56, { cols: 5, rows: 8, sun: true }); slab(1.25, .2, .7, .6, 0, 56, { cols: 5, rows: 8 }); box(.75, .3, .5, .4, 0, 34, '#dfe4e6', { left: glass(4, 4), right: glass(3, 4) }); slab(.85, .32, .3, .36, 34, 36, { cols: 2, rows: 5 }); const f = sx(1, .5), fb = sy(1, .5, 70); line(f, fb, f, fb - 26, '#666', 1.4); [['#f4f4f4', 0], ['#2f5aa8', 3], ['#d8332a', 6]].forEach(([c, o]) => { ctx.fillStyle = c; ctx.fillRect(f, fb - 26 + o, 12, 3); });
});
SP_('Peter the Great Monument', 1, 1, 'mod', 'mon', 3, () => {
  flat(.05, .05, .95, .95, '#4a86b8'); box(.2, .2, .6, .6, 0, 6, '#a8a49a'); const cx = sx(.5, .5), b = sy(.5, .5, 6), bz = '#6a7a62';
  ctx.fillStyle = '#7a8a72'; ctx.beginPath(); ctx.moveTo(cx - 28, b); ctx.quadraticCurveTo(cx - 24, b - 24, cx - 12, b - 28); ctx.lineTo(cx + 18, b - 34); ctx.quadraticCurveTo(cx + 28, b - 26, cx + 26, b); ctx.ellipse(cx, b, 27, 13, 0, 0, Math.PI); ctx.closePath(); ctx.fill();
  line(cx, b - 28, cx, b - 96, '#5a4a38', 2.5); line(cx + 14, b - 32, cx + 14, b - 80, '#5a4a38', 2); [[cx - 22, b - 40, cx - 2, b - 86], [cx + 2, b - 50, cx + 10, b - 90]].forEach(([x1, y1, x2, y2], i) => poly([[cx, b - 36 - i * 6], [cx + (i ? 12 : -22), b - 40 - i * 20], [cx + (i ? 12 : -22), b - 84 - i * 4], [cx, b - 88 + i * 4]], i ? '#d8d8cc' : '#e4e4d8'));
  ctx.fillStyle = '#5f6a52'; ctx.fillRect(cx - 4, b - 40, 8, 14); ctx.beginPath(); ctx.arc(cx, b - 45, 3.5, 0, 7); ctx.fill(); line(cx + 4, b - 38, cx + 14, b - 52, '#5f6a52', 2.5);
});
SP_('Victory Park Fountains', 2, 2, 'mod', 'mon', 4, () => {
  flat(.05, .05, 1.95, 1.95, '#bcb8a8'); [[.5, 1.4], [1.0, 1.6], [1.5, 1.4]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); ctx.fillStyle = '#c8c4b4'; ctx.beginPath(); ctx.ellipse(c, b, 20, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5ba0c8'; ctx.beginPath(); ctx.ellipse(c, b - 1, 17, 8.5, 0, 0, 7); ctx.fill(); for (let k = -3; k <= 3; k++) line(c + k * 2, b - 1, c + k * 3.5, b - 20 + Math.abs(k) * 3, 'rgba(225,245,252,.9)', 1.3); });
  box(.7, .5, .6, .6, 0, 8, '#a8a49a'); box(.82, .62, .36, .36, 8, 10, '#b4b0a4'); const cx = sx(1, .8), b = sy(1, .8, 18), g = ctx.createLinearGradient(cx - 5, 0, cx + 5, 0); g.addColorStop(0, '#e8ecee'); g.addColorStop(1, '#8a949a'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 7, b); ctx.lineTo(cx - 3, b - 130); ctx.lineTo(cx + 3, b - 130); ctx.lineTo(cx + 7, b); ctx.closePath(); ctx.fill(); poly([[cx - 3, b - 130], [cx + 3, b - 130], [cx, b - 146]], '#e0b44a'); star(cx, b - 154, 6);
});
SP_('Playground & Fitness Park', 1, 1, 'mod', 'decor', 0, () => {
  flat(.05, .05, .95, .95, '#76a063'); flat(.1, .1, .9, .9, '#c0553a', .1); flat(.15, .15, .55, .5, '#3a8a5a', .2);
  const sl = sx(.65, .3), sb = sy(.65, .3, 0); line(sl - 8, sb, sl - 8, sb - 20, '#3a6fb0', 2); line(sl + 8, sb, sl + 8, sb - 20, '#3a6fb0', 2); line(sl - 8, sb - 20, sl + 8, sb - 20, '#3a6fb0', 2); line(sl - 3, sb - 20, sl - 3, sb - 6, '#555', 1); line(sl + 3, sb - 20, sl + 3, sb - 6, '#555', 1);
  const fx = sx(.3, .72), fb = sy(.3, .72, 0); line(fx - 6, fb, fx - 6, fb - 16, '#d8483a', 2); line(fx + 6, fb, fx + 6, fb - 16, '#d8483a', 2); line(fx - 6, fb - 14, fx + 6, fb - 14, '#d8483a', 2); tree(.85, .85, .8); tree(.12, .12, .7);
});
