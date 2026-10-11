// Set 6: natural-resource sites (placed by the map generator, not by the player).

sprites.push({ name: 'Coal Mine', w: 2, d: 2, ground: '#55554f', draw() {
  flat(.05, .05, 1.95, 1.95, '#55554f');
  const hx = sx(.6, .6), hb = sy(.6, .6, 0);
  const g = ctx.createLinearGradient(hx - 40, 0, hx + 40, 0); g.addColorStop(0, '#4a4a48'); g.addColorStop(1, '#222');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(hx - 42, hb + 6); ctx.lineTo(hx - 4, hb - 52); ctx.lineTo(hx + 8, hb - 50); ctx.lineTo(hx + 44, hb + 6); ctx.ellipse(hx, hb + 6, 43, 14, 0, 0, Math.PI, false); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.07)'; for (let i = 0; i < 12; i++) { ctx.fillRect(hx - 30 + (i * 37) % 60, hb - 6 - (i * 13) % 34, 3, 2); }
  box(0.9, 1.15, 0.9, 0.55, 0, 24, '#8a8a82', { left: windows({ cols: 4, rows: 1, gw: .5, gh: .5, glass: '#c9d0d4', lit: 0, top: 4 }), right: windows({ cols: 3, rows: 1, gw: .5, gh: .5, glass: '#c9d0d4', lit: 0 }) });
  box(0.9, 1.15, 0.9, 0.55, 24, 3, '#a3402f');
  const tx = sx(1.45, 1.0), tb = sy(1.45, 1.0, 24), top = tb - 70;
  line(tx - 12, tb, tx - 3, top, '#6b6b66', 3); line(tx + 12, tb, tx + 3, top, '#6b6b66', 3); line(tx - 8, tb - 28, tx + 8, tb - 28, '#6b6b66', 2);
  ctx.strokeStyle = '#d6a02e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(tx, top - 2, 9, 0, 7); ctx.stroke(); ctx.fillStyle = '#d6a02e'; ctx.beginPath(); ctx.arc(tx, top - 2, 2.5, 0, 7); ctx.fill();
  line(tx, top - 2, tx, tb - 10, '#333', 1); box(1.4, 0.95, .08, .08, 24, 5, '#1a1a1a');
  wire(1.1, 1.15, 24, .75, .75, 30, '#6b6b66', 3);
  [[.2, 1.5], [.4, 1.7], [.2, 1.8]].forEach(([x, y]) => box(x, y, .22, .16, 0, 6, '#1f1f1f'));
}});

sprites.push({ name: 'Iron Ore Quarry', w: 2, d: 2, ground: '#8a4a32', draw() {
  const cols = ['#a85a3c', '#97503a', '#86452f', '#753b29', '#643222'];
  for (let k = 0; k < 5; k++) { const o = .08 + k * .2; flat(o, o, 2 - o, 2 - o, cols[k], -k * 5);
    if (k) { const a = .08 + (k - 1) * .2; poly([[sx(2 - a, a + .0), sy(2 - a, a, -(k - 1) * 5)], [sx(2 - o, o), sy(2 - o, o, -k * 5)], [sx(2 - o, 2 - o), sy(2 - o, 2 - o, -k * 5)], [sx(2 - a, 2 - a), sy(2 - a, 2 - a, -(k - 1) * 5)]], shade(cols[k], .78));
      poly([[sx(a, 2 - a), sy(a, 2 - a, -(k - 1) * 5)], [sx(o, 2 - o), sy(o, 2 - o, -k * 5)], [sx(2 - o, 2 - o), sy(2 - o, 2 - o, -k * 5)], [sx(2 - a, 2 - a), sy(2 - a, 2 - a, -(k - 1) * 5)]], shade(cols[k], .92)); } }
  flat(.8, .8, 1.2, 1.2, '#4a2418', -20);
  box(1.35, 0.25, 0.3, 0.2, 0, 8, '#e0b030'); box(1.35, 0.25, 0.14, 0.2, 8, 6, '#c9c9c0'); line(sx(1.5, .35), sy(1.5, .35, 12), sx(1.2, .5), sy(1.2, .5, 30), '#e0b030', 3);
  box(0.15, 1.5, 0.3, 0.2, 0, 7, '#e0b030'); box(0.55, 1.6, 0.25, 0.18, 0, 5, '#3a3a38');
  box(1.5, 1.4, 0.3, 0.3, 0, 12, '#6b6b66'); box(1.5, 1.4, 0.3, 0.3, 12, 2, '#a3402f');
}});

sprites.push({ name: 'Oil Field', w: 2, d: 2, ground: '#7a6a4a', draw() {
  flat(.05, .05, 1.95, 1.95, '#7a6a4a'); flat(.2, .2, .45, .45, '#2a2420', .1); flat(1.2, 1.1, 1.5, 1.35, '#2a2420', .1);
  const jack = (x, y) => { const cx = sx(x, y), b = sy(x, y, 0);
    ctx.fillStyle = '#6b6b66'; ctx.fillRect(cx - 7, b - 6, 14, 6);
    line(cx - 4, b - 6, cx, b - 26, '#d6a02e', 2); line(cx + 4, b - 6, cx, b - 26, '#d6a02e', 2);
    line(cx - 16, b - 22, cx + 14, b - 32, '#c0392b', 3); ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(cx + 15, b - 31, 4, -1, 2); ctx.fill();
    line(cx - 16, b - 22, cx - 18, b - 8, '#333', 1); ctx.fillStyle = '#555'; ctx.fillRect(cx - 21, b - 8, 6, 4); };
  jack(.35, .35); jack(1.35, .3); jack(.45, 1.35);
  [[1.45, 1.3], [1.7, 1.45]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); cyl(c, b, 10, 5, 22, '#cfd3d6', { bands: [[.45, .6, '#c0392b']] }); });
  const fx = sx(1.8, .7), fb = sy(1.8, .7, 0); line(fx, fb, fx, fb - 50, '#555', 2);
  ctx.fillStyle = '#e8531a'; ctx.beginPath(); ctx.moveTo(fx - 4, fb - 50); ctx.quadraticCurveTo(fx - 6, fb - 60, fx, fb - 72); ctx.quadraticCurveTo(fx + 6, fb - 60, fx + 4, fb - 50); ctx.fill();
  ctx.fillStyle = '#ffd060'; ctx.beginPath(); ctx.moveTo(fx - 2, fb - 50); ctx.quadraticCurveTo(fx - 3, fb - 58, fx, fb - 64); ctx.quadraticCurveTo(fx + 3, fb - 58, fx + 2, fb - 50); ctx.fill();
}});

sprites.push({ name: 'Collective Farm', w: 2, d: 2, ground: '#8fa04f', draw() {
  const rows = ['#b9b04a', '#7aa04a', '#c9be5a', '#6e9a45'];
  rows.forEach((c, i) => flat(.1, .1 + i * .14, 1.2, .1 + i * .14 + .11, c));
  [['#a8b050'], ['#86a850']].forEach(([c], i) => flat(1.3, .1 + i * .3, 1.9, .35 + i * .3, c));
  const ym = 1.55, y0 = 1.2, y1 = 1.85, x0 = .25, x1 = 1.1;
  box(x0, y0, x1 - x0, y1 - y0, 0, 16, '#b04a3a', { left: (W, H) => { ctx.fillStyle = '#e8e0cc'; ctx.fillRect(W / 2 - 7, 0, 14, 12); ctx.strokeStyle = '#b04a3a'; ctx.beginPath(); ctx.moveTo(W / 2 - 7, 0); ctx.lineTo(W / 2 + 7, 12); ctx.moveTo(W / 2 + 7, 0); ctx.lineTo(W / 2 - 7, 12); ctx.stroke(); } });
  poly([[sx(x0 - .03, y0), sy(x0 - .03, y0, 16)], [sx(x1 + .03, y0), sy(x1 + .03, y0, 16)], [sx(x1 + .03, ym), sy(x1 + .03, ym, 28)], [sx(x0 - .03, ym), sy(x0 - .03, ym, 28)]], '#5a3a2e');
  poly([[sx(x1, y0), sy(x1, y0, 16)], [sx(x1, y1), sy(x1, y1, 16)], [sx(x1, ym), sy(x1, ym, 28)]], shade('#b04a3a', .7));
  poly([[sx(x0 - .03, y1 + .03), sy(x0 - .03, y1 + .03, 15)], [sx(x1 + .03, y1 + .03), sy(x1 + .03, y1 + .03, 15)], [sx(x1 + .03, ym), sy(x1 + .03, ym, 28)], [sx(x0 - .03, ym), sy(x0 - .03, ym, 28)]], '#7a4a38', 'rgba(0,0,0,.2)');
  const c = sx(1.6, 1.5), b = sy(1.6, 1.5, 0); cyl(c, b, 9, 4.5, 40, '#d6d2c6'); poly([[c - 9, b - 40], [c + 9, b - 40], [c, b - 50]], '#8a8a80');
  box(1.4, 1.75, .25, .14, 0, 6, '#2f7f4a'); box(1.42, 1.75, .1, .14, 6, 5, '#d9d9d9');
}});
