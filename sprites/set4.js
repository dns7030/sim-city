// Set 4: hotels, socialist modernism from the republics, and monuments.

const STONE = '#c9c5b8';
const ribbon = (cols, rows, glass = '#4a5f70') => windows({ cols, rows, gw: .85, gh: .5, glass, lit: 0, mx: 2 });

sprites.push({ name: 'Hotel Intourist (slab)', w: 2, d: 1, draw() {
  box(0.05, 0.15, 1.9, 0.8, 0, 16, '#cfc8b6', { left: windows({ cols: 9, rows: 1, gw: .6, gh: .6, glass: '#7fa6c0', lit: 0, my: 3, top: 3 }), right: windows({ cols: 3, rows: 1, gw: .6, gh: .6, glass: '#7fa6c0', lit: 0 }) });
  box(0.25, 0.3, 1.5, 0.4, 16, 96, '#dfe2e4', { left: windows({ cols: 22, rows: 16, gw: .55, gh: .5, glass: '#5a7890', lit: 0.1, mx: 2, seam: true }), right: windows({ cols: 6, rows: 16, gw: .55, gh: .5, glass: '#4a6880', lit: 0.08 }) });
  box(0.5, 0.42, 1.0, 0.12, 112, 9, '#c0392b', { left: (W, H) => faceText('ИНТУРИСТ', W / 2, H / 2, 5.5, '#fff') });
  box(0.7, 0.9, 0.6, 0.15, 0, 10, '#2f5f8a'); // entrance canopy
}});

sprites.push({ name: 'Hotel Cosmos (curved)', w: 2, d: 2, draw() {
  box(0.1, 1.0, 1.8, 0.9, 0, 12, '#cfc8b6', { left: windows({ cols: 9, rows: 1, gw: .6, gh: .6, glass: '#7fa6c0', lit: 0, my: 2, top: 2 }) });
  const cx = sx(1.0, 0.75), b = sy(1.0, .75, 12), bands = [];
  for (let i = 0; i < 16; i++) bands.push([i / 16 + .02, i / 16 + .045, '#5a7890']);
  cyl(cx, b, 48, 24, 104, '#dfe3e6', { bands });
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (let i = 1; i < 12; i++) { const a = Math.PI * i / 12; ctx.beginPath(); ctx.moveTo(cx + 48 * Math.cos(a), b + 24 * Math.sin(a)); ctx.lineTo(cx + 48 * Math.cos(a), b + 24 * Math.sin(a) - 104); ctx.stroke(); }
  ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.ellipse(cx, b - 104, 20, 10, 0, 0, 7); ctx.fill();
}});

sprites.push({ name: 'Tourist Hotel', w: 2, d: 1, draw() {
  box(0.05, 0.1, 1.9, 0.7, 0, 46, '#e3d9bf', { left: windows({ cols: 12, rows: 6, gw: .45, gh: .5, glass: '#6f8ea6', lit: 0.12, balc: 2 }), right: windows({ cols: 3, rows: 6, gw: .4, gh: .5, glass: '#5f7e96', lit: 0.1 }) });
  box(0.05, 0.1, 1.9, 0.7, 46, 3, '#c9bf9f');
  box(0.6, 0.8, 0.8, 0.18, 0, 14, '#d0c4a2', { left: (W, H) => { ctx.fillStyle = '#4a3a2a'; ctx.fillRect(W / 2 - 8, 0, 16, 9); } });
  box(0.55, 0.78, 0.9, 0.2, 14, 3, '#2f5f8a');
  box(0.5, 0.35, 1.0, 0.1, 49, 9, '#2f5f8a', { left: (W, H) => faceText('ГОСТИНИЦА', W / 2, H / 2, 5, '#fff') });
  [.25, .45].forEach((x, i) => { const c = sx(x, 1.05), b = sy(x, 1.05, 0); line(c, b, c, b - 36, '#666', 1.5); poly([[c, b - 36], [c + 12, b - 33], [c, b - 28]], ['#c0392b', '#3a6fa8'][i]); });
}});

sprites.push({ name: 'Highways Ministry (Tbilisi)', w: 2, d: 2, draw() {
  const c = '#b8ad98';
  box(0.1, 0.55, 1.8, 0.8, 0, 18, c, { left: ribbon(1, 1, '#38454d'), right: ribbon(1, 1, '#38454d') });
  box(0.55, 0.1, 0.8, 1.8, 18, 18, '#c3b9a4', { left: ribbon(1, 1, '#38454d'), right: ribbon(1, 1, '#38454d') });
  box(0.1, 0.5, 1.8, 0.9, 36, 18, '#aea38d', { left: ribbon(1, 1, '#38454d'), right: ribbon(1, 1, '#38454d') });
  box(0.9, 0.7, 0.2, 0.2, 54, 14, '#938a78');
  [[.6, 1.55], [1.4, 1.55]].forEach(([x, y]) => wire(x, y, 0, x, y, 18, '#8a8470', 3));
}});

sprites.push({ name: 'Flying Saucer Institute (Kyiv)', w: 1, d: 1, draw() {
  const cx = sx(.5, .5), b = sy(.5, .5, 0);
  cyl(cx, b, 6, 3, 52, '#aeb6ba');
  [[-12, 6], [12, 6], [0, 11]].forEach(([dx, dy]) => line(cx + dx, b + dy * .3, cx + dx * .4, b - 50, '#9aa3a8', 2));
  cyl(cx, b - 50, 30, 15, 16, '#d6dadd', { bands: [[.28, .72, '#5d6f7c']] });
  cyl(cx, b - 66, 16, 8, 8, '#e6e9eb'); dome(cx, b - 74, 10, '#f2f4f5');
  line(cx, b - 82, cx, b - 96, '#666', 1.2);
}});

sprites.push({ name: 'Matenadaran (Yerevan)', w: 2, d: 1, draw() {
  [0, 1, 2].forEach(i => box(0.25 + i * .03, 0.82 + i * .06, 1.5 - i * .06, 0.06, 0, 3 - i, '#a39f94'));
  box(0.05, 0.2, 1.9, 0.6, 0, 40, '#6f5d55', {
    left: (W, H, l) => { windows({ cols: 11, rows: 1, gw: .28, gh: .75, glass: '#cbbba8', lit: 0, my: 4, top: 4 })(W, H, l);
      ctx.fillStyle = '#4e413b'; ctx.fillRect(W / 2 - 14, 0, 28, 14); ctx.fillStyle = '#85736a'; for (let i = 0; i < 5; i++) ctx.fillRect(W / 2 - 12 + i * 6, 0, 3, 14); },
    right: ribbon(2, 1, '#cbbba8'),
  });
  box(0.05, 0.2, 1.9, 0.6, 40, 3, '#58493f');
  box(0.9, 0.95, 0.2, 0.2, 0, 8, '#a39f94'); const c = sx(1, 1.05), b = sy(1, 1.05, 8); ctx.fillStyle = '#4e413b'; ctx.fillRect(c - 3, b - 14, 6, 14); sphere(c, b - 17, 3, '#5a4a40');
}});

sprites.push({ name: 'Linnahall (Tallinn)', w: 3, d: 2, draw() {
  const c = '#d8d2bc';
  box(0.1, 0.2, 2.8, 1.6, 0, 8, c, { left: (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.18)'; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * W / 12, 0); ctx.lineTo(i * W / 12, H); ctx.stroke(); } } });
  box(0.35, 0.4, 2.3, 1.2, 8, 8, '#cfc9b2');
  box(0.6, 0.6, 1.8, 0.8, 16, 8, '#c7c1aa');
  const cx = sx(1.5, 1.0), b = sy(1.5, 1, 24);
  ctx.fillStyle = '#b8b29a'; ctx.beginPath(); ctx.ellipse(cx, b, 36, 18, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#6c7a84'; ctx.beginPath(); ctx.ellipse(cx, b + 2, 26, 13, 0, 0, 7); ctx.fill();
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.ellipse(cx, b + 2, 26 - i * 8, 13 - i * 4, 0, 0, 7); ctx.stroke(); }
  box(1.1, 1.8, 0.8, 0.1, 0, 14, '#3d5a73', { left: ribbon(4, 2, '#9bbbd0') });
  const f = sx(2.6, 1.6), fb = sy(2.6, 1.6, 8); line(f, fb, f, fb - 34, '#666', 1.5); poly([[f, fb - 34], [f + 14, fb - 30], [f, fb - 24]], '#2f5f8a');
}});

sprites.push({ name: 'Palace of Concerts & Sports (Vilnius)', w: 2, d: 2, draw() {
  box(0.1, 0.3, 1.8, 1.4, 0, 24, '#d9d6cc', { left: windows({ cols: 12, rows: 1, gw: .8, gh: .6, glass: '#5d7f98', lit: 0, mx: 2, my: 3, top: 3 }), right: windows({ cols: 9, rows: 1, gw: .8, gh: .6, glass: '#4d6f88', lit: 0, mx: 2, my: 3, top: 3 }) });
  poly([[sx(1.9, 1.7), sy(1.9, 1.7, 24)], [sx(1.9, .45), sy(1.9, .45, 64)], [sx(1.9, .45), sy(1.9, .45, 24)]], shade('#c9c5ba', .7));
  poly([[sx(.1, 1.7), sy(.1, 1.7, 24)], [sx(1.9, 1.7), sy(1.9, 1.7, 24)], [sx(1.9, .45), sy(1.9, .45, 64)], [sx(.1, .45), sy(.1, .45, 64)]], '#4f6f8a', 'rgba(0,0,0,.25)');
  for (let i = 1; i < 8; i++) { const t = i / 8; poly([[sx(.1, 1.7 - 1.25 * t), sy(.1, 1.7 - 1.25 * t, 24 + 40 * t)], [sx(1.9, 1.7 - 1.25 * t), sy(1.9, 1.7 - 1.25 * t, 24 + 40 * t)], [sx(1.9, 1.7 - 1.25 * t), sy(1.9, 1.7 - 1.25 * t, 24 + 40 * t) + 1], [sx(.1, 1.7 - 1.25 * t), sy(.1, 1.7 - 1.25 * t, 24 + 40 * t) + 1]], 'rgba(255,255,255,.22)'); }
}});

sprites.push({ name: 'House of Soviets (Kaliningrad)', w: 2, d: 2, draw() {
  const win = (c, r) => windows({ cols: c, rows: r, gw: .35, gh: .6, glass: '#4a5f70', lit: 0, mx: 3 });
  box(0.1, 0.1, 0.55, 1.8, 0, 78, '#c4c1b8', { left: win(3, 12), right: win(8, 12) });
  box(0.65, 0.5, 0.7, 1.0, 44, 50, '#b9b6ac', { left: win(5, 8), right: win(5, 8) });
  box(1.35, 0.1, 0.55, 1.8, 0, 78, '#c4c1b8', { left: win(3, 12), right: win(8, 12) });
  box(0.1, 0.1, 1.8, 0.6, 78, 14, '#aeaba1', { left: ribbon(1, 1, '#38454d'), right: ribbon(1, 1, '#38454d') });
  box(0.1, 1.3, 0.55, 0.6, 78, 10, '#aeaba1'); box(1.35, 1.3, 0.55, 0.6, 78, 10, '#aeaba1');
}});

sprites.push({ name: 'Sanatorium (Sochi)', w: 2, d: 2, ground: '#76a063', draw() {
  const pal = (x, y, s = 1) => { const c = sx(x, y), b = sy(x, y, 0); line(c, b, c + 3 * s, b - 30 * s, '#7a5a3a', 2.2);
    [[-14, -4], [-9, -12], [0, -14], [9, -12], [14, -3]].forEach(([dx, dy]) => { ctx.strokeStyle = '#3f7a3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c + 3 * s, b - 30 * s); ctx.quadraticCurveTo(c + 3 * s + dx * .6 * s, b - 30 * s + dy * s - 6, c + 3 * s + dx * s, b - 30 * s + dy * s + 6); ctx.stroke(); }); };
  box(0.1, 0.2, 1.8, 1.0, 0, 14, '#ece6d2');
  box(0.25, 0.3, 1.5, 0.7, 14, 34, '#f2eee0', {
    left: (W, H) => { ctx.fillStyle = '#fbf8ee'; for (let i = 0; i <= 8; i++) ctx.fillRect(4 + i * (W - 8) / 8 - 1.5, 2, 3, H - 8); ctx.fillStyle = '#d8d1bb'; ctx.fillRect(1, H - 6, W - 2, 6);
      windows({ cols: 8, rows: 2, gw: .3, gh: .4, glass: '#6f8ea6', lit: 0, mx: 8, my: 4 })(W, H - 6, 1); },
    right: windows({ cols: 5, rows: 3, gw: .4, gh: .5, glass: '#6f8ea6', lit: 0 }),
  });
  for (let i = 0; i < 4; i++) box(0.6 + i * 0.0, 1.0 + i * .06, 0.8, 0.06, 0, 3 - i * .6, '#cfc8b4');
  pal(.12, 1.5); pal(1.85, 1.45, .9); pal(.3, 1.8, 1);
}});

sprites.push({ name: 'Palace of Pioneers', w: 2, d: 2, draw() {
  box(0.1, 0.45, 1.5, 1.2, 0, 24, '#f2f2f0', { left: (W, H) => { ctx.fillStyle = '#6fa0be'; ctx.fillRect(3, 3, W - 6, H - 8); ctx.strokeStyle = '#f2f2f0'; ctx.lineWidth = 1.2; for (let i = 1; i < 9; i++) { ctx.beginPath(); ctx.moveTo(3 + i * (W - 6) / 9, 3); ctx.lineTo(3 + i * (W - 6) / 9, H - 5); ctx.stroke(); } }, right: windows({ cols: 5, rows: 2, gw: .5, gh: .5, glass: '#5f90ae', lit: 0 }) });
  box(0.05, 0.4, 1.6, 1.3, 24, 3, '#d8332a');
  const cx = sx(1.45, .6), b = sy(1.45, .6, 0); cyl(cx, b, 22, 11, 38, '#e6e9eb', { bands: [[.3, .75, '#6f9ab8']] });
  const f = sx(.3, 1.85), fb = sy(.3, 1.85, 0); line(f, fb, f, fb - 56, '#666', 1.5); poly([[f, fb - 56], [f + 22, fb - 51], [f, fb - 44]], '#d8332a'); star(f + 9, fb - 50, 3.5, '#f0d060');
  tree(1.6, 1.7, .8);
}});

sprites.push({ name: 'Planetarium', w: 2, d: 2, draw() {
  flat(.1, .1, 1.9, 1.9, '#b4b3aa');
  const cx = sx(1, .9), b = sy(1, .9, 0);
  cyl(cx, b, 34, 17, 22, '#e6e1d0', { bands: [[.55, .75, '#c9c3ae']] });
  dome(cx, b - 22, 34, '#d6dce0');
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(cx, b - 22, 34, 17, 0, 0, 7); }
  box(0.7, 1.45, 0.6, 0.4, 0, 18, '#e0d6bd', { left: windows({ cols: 3, rows: 1, gw: .4, gh: .6, lit: 0, glass: '#6f8ea6', top: 3, my: 3 }) });
  sphere(sx(.3, 1.6), sy(.3, 1.6, 12), 7, '#c8a040'); box(0.25, 1.55, 0.1, 0.1, 0, 5, '#8a8a80');
  line(cx, b - 56, cx, b - 70, '#666', 1.2);
}});

sprites.push({ name: 'Motherland Monument', w: 1, d: 1, ground: '#76a063', draw() {
  box(0.12, 0.12, 0.76, 0.76, 0, 8, '#a8a49a'); box(0.25, 0.25, 0.5, 0.5, 8, 10, '#b4b0a4'); box(0.35, 0.35, 0.3, 0.3, 18, 10, '#bdb9ad');
  const cx = sx(.5, .5), b = sy(.5, .5, 28);
  const g = ctx.createLinearGradient(cx - 12, 0, cx + 12, 0); g.addColorStop(0, '#d8dde0'); g.addColorStop(1, '#8f979c');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 10, b); ctx.quadraticCurveTo(cx - 12, b - 40, cx - 5, b - 62); ctx.lineTo(cx + 5, b - 62); ctx.quadraticCurveTo(cx + 12, b - 40, cx + 10, b); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#bfc5c9'; ctx.beginPath(); ctx.moveTo(cx - 5, b - 56); ctx.quadraticCurveTo(cx - 26, b - 50, cx - 24, b - 28); ctx.lineTo(cx - 10, b - 30); ctx.closePath(); ctx.fill(); // flowing cloth
  line(cx + 4, b - 58, cx + 14, b - 84, '#c8cfd3', 4); line(cx + 14, b - 84, cx + 36, b - 128, '#e6ebee', 2.5); line(cx + 36, b - 128, cx + 38, b - 134, '#e6ebee', 1.5);
  line(cx - 4, b - 58, cx - 16, b - 66, '#c8cfd3', 4);
  sphere(cx, b - 68, 5, '#d6dbde');
}});

sprites.push({ name: 'Worker & Kolkhoz Woman', w: 1, d: 1, ground: '#b4b3aa', draw() {
  box(0.1, 0.2, 0.8, 0.6, 0, 22, '#c9c5b8', { left: (W, H) => { ctx.fillStyle = '#6e6a60'; ctx.beginPath(); ctx.moveTo(W / 2 - 7, 0); ctx.lineTo(W / 2 - 7, 8); ctx.arc(W / 2, 8, 7, Math.PI, 0); ctx.lineTo(W / 2 + 7, 0); ctx.fill(); } });
  box(0.1, 0.2, 0.8, 0.6, 22, 2, '#a8a49a');
  const cx = sx(.5, .5), b = sy(.5, .5, 24), st = '#cdd4da', sh = '#8f979c';
  const fig = (x, dress) => { const g = ctx.createLinearGradient(x - 6, 0, x + 6, 0); g.addColorStop(0, st); g.addColorStop(1, sh); ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(x - 7, b); ctx.lineTo(x - 5, b - 38); ctx.lineTo(x + 5, b - 38); ctx.lineTo(x + 7 + (dress ? 2 : 0), b); ctx.closePath(); ctx.fill(); sphere(x, b - 43, 4.5, '#d6dbde'); };
  fig(cx - 10, false); fig(cx + 10, true);
  line(cx - 7, b - 36, cx - 2, b - 70, st, 3); line(cx + 7, b - 36, cx + 2, b - 70, st, 3);
  ctx.strokeStyle = '#e6ebee'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx + 8, b - 78, 9, Math.PI * .8, Math.PI * 2.1); ctx.stroke(); // sickle
  line(cx - 8, b - 70, cx - 8, b - 90, '#e6ebee', 2); ctx.fillStyle = '#e6ebee'; ctx.fillRect(cx - 14, b - 96, 12, 7); // hammer
}});

sprites.push({ name: 'Space Conquerors Obelisk', w: 1, d: 1, ground: '#b4b3aa', draw() {
  box(0.1, 0.1, 0.8, 0.8, 0, 6, '#a8a49a'); box(0.25, 0.25, 0.5, 0.5, 6, 8, '#b4b0a4');
  const cx = sx(.5, .5), b = sy(.5, .5, 14);
  const g = ctx.createLinearGradient(cx - 14, 0, cx + 30, 0); g.addColorStop(0, '#f0f3f5'); g.addColorStop(.5, '#b8c0c6'); g.addColorStop(1, '#7c858c');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 16, b); ctx.quadraticCurveTo(cx - 6, b - 80, cx + 26, b - 158); ctx.quadraticCurveTo(cx + 18, b - 80, cx + 14, b); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.translate(cx + 28, b - 164); ctx.rotate(.45); ctx.fillStyle = '#e8ecee'; ctx.beginPath(); ctx.ellipse(0, 0, 4, 12, 0, 0, 7); ctx.fill(); poly([[-4, 6], [-8, 14], [-2, 10]], '#c0c6ca'); poly([[4, 6], [8, 14], [2, 10]], '#c0c6ca'); ctx.restore();
}});

sprites.push({ name: 'Eternal Flame Memorial', w: 1, d: 1, ground: '#b4b3aa', draw() {
  const cx0 = .5, cy0 = .5, pts = r => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .42 : r; return [sx(cx0 + Math.cos(a) * rr, cy0 + Math.sin(a) * rr), sy(cx0 + Math.cos(a) * rr, cy0 + Math.sin(a) * rr, 0)]; });
  poly(pts(.5), '#8a2a2a', 'rgba(0,0,0,.3)'); poly(pts(.34), '#5f5f5a');
  const cx = sx(.5, .5), b = sy(.5, .5, 0);
  cyl(cx, b, 8, 4, 8, '#8a6a2a'); cyl(cx, b - 8, 5, 2.5, 3, '#c8a040');
  const fl = (r, col, h) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx - r, b - 11); ctx.quadraticCurveTo(cx - r * 1.1, b - 11 - h * .5, cx, b - 11 - h); ctx.quadraticCurveTo(cx + r * 1.1, b - 11 - h * .5, cx + r, b - 11); ctx.closePath(); ctx.fill(); };
  fl(5, '#e8531a', 22); fl(3.5, '#ff9a2e', 16); fl(1.8, '#ffe070', 10);
  [[.12, .88], [.88, .88]].forEach(([x, y]) => box(x - .04, y - .04, .08, .08, 0, 5, '#8a2a2a'));
  box(0.42, 0.9, 0.16, 0.06, 0, 4, '#5f5f5a');
}});
