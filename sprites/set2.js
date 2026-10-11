// Set 2: sixteen more buildings (1920s constructivism -> 1980s retro-futurism). All drawn "as new".

const ASPHALT = '#8c8c84';

sprites.push({ name: 'School', w: 2, d: 1, draw() {
  box(0.05, 0.1, 1.9, 0.7, 0, 38, '#ead9a0', {
    left: windows({ cols: 11, rows: 3, gw: .7, gh: .55, glass: '#7fa6c0', lit: 0, mx: 5, my: 7 }),
    right: windows({ cols: 3, rows: 3, gw: .5, gh: .55, glass: '#6a8ea6', lit: 0 }),
  });
  box(0.8, 0.8, 0.4, 0.15, 0, 46, '#d6c27a', { left: (W, H) => { ctx.fillStyle = '#5b4a3a'; ctx.fillRect(W / 2 - 6, 0, 12, 14); } });
  line(sx(1, .5), sy(1, .5, 38), sx(1, .5), sy(1, .5, 62), '#555'); poly([[sx(1, .5), sy(1, .5, 62)], [sx(1, .5) + 14, sy(1, .5, 58)], [sx(1, .5), sy(1, .5, 54)]], '#c0392b');
  tree(0.3, 1.0, .8); tree(1.7, 1.0, .8);
}});

sprites.push({ name: 'VDNKh Central Pavilion', w: 2, d: 2, draw() {
  box(0.1, 0.3, 1.8, 1.5, 0, 34, '#f0e8cf', {
    left: (W, H) => {
      ctx.fillStyle = '#f9f5e6'; for (let i = 0; i < 9; i++) if (i < 3 || i > 5) ctx.fillRect(8 + i * (W - 16) / 8 - 2, 3, 4, H - 10);
      ctx.fillStyle = '#6b8fb0'; ctx.beginPath(); ctx.moveTo(W / 2 - 22, 0); ctx.lineTo(W / 2 - 22, 18); ctx.arc(W / 2, 18, 22, Math.PI, 0); ctx.lineTo(W / 2 + 22, 0); ctx.fill();
      ctx.strokeStyle = '#e0b44a'; ctx.lineWidth = 2; ctx.stroke();
    },
    right: windows({ cols: 6, rows: 2, gw: .35, gh: .5, glass: '#6b8fb0', lit: 0 }),
  });
  box(0.1, 0.3, 1.8, 1.5, 34, 3, '#e0b44a'); // gilded cornice
  box(0.55, 0.75, 0.9, 0.6, 37, 26, '#f0e8cf', { left: windows({ cols: 4, rows: 2, gw: .3, gh: .5, glass: '#6b8fb0', lit: 0 }), right: windows({ cols: 3, rows: 2, gw: .3, gh: .5, glass: '#6b8fb0', lit: 0 }) });
  const cx = sx(1, 1.05), z = 63;
  poly([[cx - 11, sy(1, 1.05, z)], [cx + 11, sy(1, 1.05, z)], [cx, sy(1, 1.05, z + 52)]], '#e0b44a');
  line(cx, sy(1, 1.05, z + 52), cx, sy(1, 1.05, z + 62), '#e0b44a', 2); star(cx, sy(1, 1.05, z + 68), 7);
  [[0.25, 1.8], [1.75, 1.8]].forEach(([x, y]) => tree(x, y, .8));
}});

sprites.push({ name: 'Hospital', w: 2, d: 1, draw() {
  box(0.05, 0.15, 1.9, 0.7, 0, 52, '#f0f1ee', {
    left: (W, H, l) => { windows({ cols: 12, rows: 4, gw: .45, gh: .5, glass: '#7fa6c0', lit: 0 })(W, H, l); },
    right: windows({ cols: 3, rows: 4, gw: .4, gh: .5, glass: '#6a8ea6', lit: 0 }),
  });
  box(0.75, 0.1, 0.5, 0.8, 52, 16, '#e6e8e4', {
    left: (W, H) => { ctx.fillStyle = '#d6342a'; ctx.fillRect(W / 2 - 2.5, 3, 5, 10); ctx.fillRect(W / 2 - 5, 6, 10, 4); },
    right: (W, H) => { ctx.fillStyle = '#d6342a'; ctx.fillRect(W / 2 - 2.5, 3, 5, 10); ctx.fillRect(W / 2 - 5, 6, 10, 4); },
  });
}});

sprites.push({ name: 'Atomic Power Plant', w: 3, d: 3, ground: ASPHALT, draw() {
  box(0.1, 1.9, 2.8, 1.0, 0, 30, '#c2c9cd', {
    left: (W, H, l) => { windows({ cols: 16, rows: 1, gw: .6, gh: .4, glass: '#7fa0b4', lit: 0, mx: 6, my: 12 })(W, H, l);
      ctx.strokeStyle = '#2f7fd0'; ctx.lineWidth = 1.2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(W / 2, 14, 9, 3.5, i * Math.PI / 3, 0, 7); ctx.stroke(); } },
    right: windows({ cols: 5, rows: 1, gw: .5, gh: .4, glass: '#7fa0b4', lit: 0, my: 12 }),
  });
  coolTower(sx(2.3, 0.7), sy(2.3, .7, 0), 26, 105); coolTower(sx(2.55, 1.35), sy(2.55, 1.35, 0), 22, 90);
  box(0.2, 0.5, 1.3, 1.2, 0, 42, '#d9ddde', { left: windows({ cols: 5, rows: 3, gw: .25, gh: .3, glass: '#8aa0ab', lit: 0 }), right: windows({ cols: 5, rows: 3, gw: .25, gh: .3, glass: '#8aa0ab', lit: 0 }) });
  const rx = sx(.85, 1.1), ry = sy(.85, 1.1, 42);
  cyl(rx, ry, 25, 12.5, 14, '#c8cdd0'); dome(rx, ry - 14, 25, '#d9dde0');
  box(1.6, 1.0, 0.2, 0.2, 0, 14, '#9aa3a8');
  [[0.3, 0.2]].forEach(([x, y]) => { const cx = sx(x, y), b = sy(x, y, 0); cyl(cx, b, 5, 2.5, 90, '#d9d9d9', { bands: [[.35, .5, '#c0392b'], [.7, .85, '#c0392b']] }); });
}});

sprites.push({ name: 'Chemical Plant', w: 2, d: 2, ground: ASPHALT, draw() {
  [[0.35, 0.35, 110, 8], [0.8, 0.3, 85, 7], [1.2, 0.4, 100, 8]].forEach(([x, y, h, r]) => {
    const cx = sx(x, y), b = sy(x, y, 0); cyl(cx, b, r, r / 2, h, '#b9c2c7', { bands: [[.3, .34, '#8a949a'], [.62, .66, '#8a949a']] });
    line(cx + r + 1, b - 4, cx + r + 1, b - h + 6, '#c0392b', 1.5);
  });
  box(1.2, 0.9, 0.7, 0.7, 0, 26, '#cdb78a', { left: windows({ cols: 4, rows: 2, gw: .35, gh: .4, lit: 0 }), right: windows({ cols: 4, rows: 2, gw: .35, gh: .4, lit: 0 }) });
  box(0.1, 0.95, 1.0, 0.12, 0, 7, '#d6a02e'); box(0.1, 0.95, 1.0, 0.12, 7, 2, '#c0392b');
  [[0.4, 1.5], [0.9, 1.45], [1.45, 1.55]].forEach(([x, y]) => { const cx = sx(x, y), b = sy(x, y, 0); [-5, 5].forEach(o => line(cx + o, b, cx + o * .7, b - 12, '#666', 2)); sphere(cx, b - 22, 13, '#e6e8e4'); });
}});

sprites.push({ name: 'Steel Mill', w: 2, d: 2, ground: ASPHALT, draw() {
  const fx = sx(0.9, 0.6), fb = sy(0.9, .6, 0);
  [-15, 15].forEach(o => cyl(fx + o + (o > 0 ? 8 : -8), fb + 4, 8, 4, 65, '#8a5a48'));
  cyl(fx, fb, 15, 7.5, 100, '#8a5a48', { bands: [[.45, .5, '#5e3b30'], [.8, .85, '#5e3b30']] });
  ctx.fillStyle = '#ff9a2e'; ctx.beginPath(); ctx.ellipse(fx, fb - 100, 11, 5, 0, 0, 7); ctx.fill();
  poly([[fx - 4, fb - 100], [fx + 4, fb - 100], [fx + 2, fb - 112], [fx - 2, fb - 108]], 'rgba(255,170,60,.7)');
  box(0.1, 1.0, 1.8, 0.9, 0, 26, '#8d9aa3', { left: windows({ cols: 8, rows: 1, gw: .5, gh: .45, glass: '#c97a3a', lit: 0, my: 9 }), right: windows({ cols: 4, rows: 1, gw: .5, gh: .45, glass: '#c97a3a', lit: 0, my: 9 }) });
  box(1.4, 0.2, 0.5, 0.5, 0, 36, '#a9553a');
  poly([[sx(.9, 1), sy(.9, 1, 30)], [sx(.9, 1) + 6, sy(.9, 1, 30) - 3], [fx + 8, fb - 85], [fx + 2, fb - 88]], '#444');
  const cx = sx(1.65, .45), b = sy(1.65, .45, 36); cyl(cx, b, 5, 2.5, 55, '#d9d9d9', { bands: [[.4, .55, '#c0392b'], [.8, .95, '#c0392b']] }); smoke(cx, b - 55, .9);
}});

sprites.push({ name: 'Grain Elevator', w: 2, d: 1, ground: '#a39a6a', draw() {
  box(1.55, 0.15, 0.4, 0.7, 0, 78, '#d9d5c8', { left: windows({ cols: 2, rows: 8, gw: .3, gh: .3, lit: 0 }), right: windows({ cols: 3, rows: 8, gw: .3, gh: .3, lit: 0 }) });
  [[0.35, 0.3], [0.75, 0.3], [1.15, 0.3], [0.35, 0.7], [0.75, 0.7], [1.15, 0.7]].forEach(([x, y]) => {
    const cx = sx(x, y), b = sy(x, y, 0); cyl(cx, b, 12, 6, 58, '#d6d2c6'); });
  poly([[sx(.2, .3), sy(.2, .3, 66)], [sx(1.6, .3), sy(1.6, .3, 66)], [sx(1.6, .3), sy(1.6, .3, 72)], [sx(.2, .3), sy(.2, .3, 72)]], '#8a8a80');
  line(sx(.2, .7), sy(.2, .7, 66), sx(1.6, .7), sy(1.6, .7, 66), '#777', 4);
}});

sprites.push({ name: 'Tractor Works', w: 2, d: 2, ground: ASPHALT, draw() {
  box(0.1, 0.1, 1.8, 1.0, 0, 34, '#8fb0c6', {
    left: (W, H, l) => { windows({ cols: 12, rows: 1, gw: .75, gh: .35, glass: '#d9e6ee', lit: 0, mx: 5, my: 19 })(W, H, l);
      ctx.fillStyle = '#4a5a66'; ctx.fillRect(W / 2 - 14, 0, 28, 17); ctx.fillStyle = '#c0392b'; ctx.fillRect(W / 2 - 14, 17, 28, 2); },
    right: windows({ cols: 5, rows: 1, gw: .6, gh: .35, glass: '#d9e6ee', lit: 0, my: 19 }),
  });
  box(0.4, 0.3, 1.2, 0.5, 34, 9, '#7a9ab0', { left: windows({ cols: 10, rows: 1, gw: .7, gh: .5, glass: '#d9e6ee', lit: 0, my: 2, top: 1 }) });
  // gantry crane over the yard
  [[0.2, 1.45], [1.8, 1.45]].forEach(([x, y]) => line(sx(x, y), sy(x, y, 0), sx(x, y), sy(x, y, 38), '#d6a02e', 3));
  line(sx(.2, 1.45), sy(.2, 1.45, 38), sx(1.8, 1.45), sy(1.8, 1.45, 38), '#d6a02e', 4);
  // tractors
  [0.5, 0.95, 1.4].forEach(x => { box(x, 1.5, .22, .14, 0, 6, '#c0392b'); box(x + .02, 1.5, .1, .14, 6, 5, '#d9d9d9'); const c = sx(x + .22, 1.64), b = sy(x + .22, 1.64, 0); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(c, b - 3, 3, 4, 0, 0, 7); ctx.fill(); });
}});

sprites.push({ name: 'Research Institute', w: 2, d: 2, draw() {
  box(0.1, 0.9, 1.8, 1.0, 0, 38, '#dfe3e6', {
    left: windows({ cols: 11, rows: 3, gw: .6, gh: .45, glass: '#6f9ab8', lit: 0.08, mx: 5 }),
    right: windows({ cols: 5, rows: 3, gw: .5, gh: .45, glass: '#5f89a6', lit: 0 }),
  });
  const ob = sx(1.55, 1.4), oy = sy(1.55, 1.4, 38); cyl(ob, oy, 15, 7.5, 12, '#c9d0d4'); dome(ob, oy - 12, 15, '#f2f4f5');
  line(ob, oy - 12 - 14, ob, oy - 12 - 6, '#555', 1);
  const mx = sx(.75, .55), my = sy(.75, .55, 0);
  cyl(mx, my, 4, 2, 52, '#aeb6ba', { open: false });
  ctx.save(); ctx.translate(mx, my - 56); ctx.rotate(-0.55);
  ctx.fillStyle = '#e6e9eb'; ctx.beginPath(); ctx.ellipse(0, 0, 28, 14, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#9aa3a8'; ctx.beginPath(); ctx.ellipse(1, 0, 20, 9, 0, 0, 7); ctx.fill();
  ctx.restore();
  line(mx, my - 56, mx + 9, my - 82, '#555', 1.2); sphere(mx + 9, my - 83, 2.5, '#d8332a');
}});

sprites.push({ name: 'Circus', w: 2, d: 2, draw() {
  const cx = sx(1, 1), b = sy(1, 1, 0), rx = 52, ry = 26, h = 38;
  cyl(cx, b, rx, ry, h, '#f2ecd8');
  for (let i = 0; i <= 14; i++) { const a = i * Math.PI / 14, px = cx + rx * Math.cos(a), py = b + ry * Math.sin(a);
    ctx.fillStyle = 'rgba(70,90,110,.85)'; ctx.fillRect(px - 2.2, py - h + 10, 4.4, h - 17); }
  ctx.fillStyle = '#d8332a'; ctx.beginPath(); ctx.moveTo(cx - rx, b - h); ctx.lineTo(cx - rx, b - h + 6);
  ctx.ellipse(cx, b - h + 6, rx, ry, 0, Math.PI, 0, true); ctx.lineTo(cx + rx, b - h);
  ctx.ellipse(cx, b - h, rx, ry, 0, 0, Math.PI, false); ctx.closePath(); ctx.fill();
  const g = ctx.createLinearGradient(cx - rx, 0, cx + rx, 0); g.addColorStop(0, '#5a92cc'); g.addColorStop(1, '#2d5483');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - rx, b - h);
  ctx.quadraticCurveTo(cx - rx * .45, b - h - 24, cx, b - h - 40); ctx.quadraticCurveTo(cx + rx * .45, b - h - 24, cx + rx, b - h);
  ctx.ellipse(cx, b - h, rx, ry, 0, 0, Math.PI, false); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1;
  for (let i = 1; i < 6; i++) { const a = i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(cx, b - h - 40); ctx.lineTo(cx + rx * Math.cos(a), b - h + ry * Math.sin(a)); ctx.stroke(); }
  ctx.fillStyle = '#e0b44a'; ctx.beginPath(); ctx.ellipse(cx, b - h - 40, 8, 4, 0, 0, 7); ctx.fill();
  line(cx, b - h - 40, cx, b - h - 54, '#e0b44a', 2); star(cx, b - h - 60, 6);
}});

sprites.push({ name: 'Stadium', w: 3, d: 2, draw() {
  const cx = sx(1.5, 1), b = sy(1.5, 1, 0), rx = 78, ry = 39, h = 24;
  cyl(cx, b, rx, ry, h, '#cfd2d4', { open: true });
  ctx.fillStyle = '#b6babd'; ctx.beginPath(); ctx.ellipse(cx, b - h, rx, ry, 0, 0, 7); ctx.fill();
  for (let i = 1; i < 5; i++) { ctx.strokeStyle = i % 2 ? '#c0392b' : '#e8e8e4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, b - h + i * 1.2 - 2, rx - 4 - i * 6.5, ry - 2 - i * 3.2, 0, 0, 7); ctx.stroke(); }
  ctx.fillStyle = '#4f9a4a'; ctx.beginPath(); ctx.ellipse(cx, b - h + 5, 38, 18, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, b - h + 5, 38, 18, 0, 0, 7); ctx.moveTo(cx - 17, b - h + 14); ctx.lineTo(cx + 17, b - h - 4); ctx.stroke();
  [[-60, -18], [60, -18], [-60, 18], [60, 18]].forEach(([dx, dy]) => { const mx = cx + dx, my = b + dy * .5 - 5; line(mx, my, mx, my - 50, '#666', 2); ctx.fillStyle = '#fff6c0'; ctx.fillRect(mx - 6, my - 56, 12, 6); });
}});

sprites.push({ name: 'Univermag (Department Store)', w: 2, d: 1, draw() {
  box(0.05, 0.15, 1.9, 0.75, 0, 34, '#d3d9dc', {
    left: (W, H) => {
      ctx.fillStyle = '#6fa0be'; ctx.fillRect(4, 3, W - 8, 15);
      ctx.strokeStyle = '#e8eef0'; ctx.lineWidth = 1.5; for (let i = 0; i <= 14; i++) { const x = 4 + i * (W - 8) / 14; ctx.beginPath(); ctx.moveTo(x, 3); ctx.lineTo(x, 18); ctx.stroke(); }
      ctx.fillStyle = '#b83a2e'; ctx.fillRect(W / 2 - 25, H - 13, 50, 10); faceText('УНИВЕРМАГ', W / 2, H - 8, 7, '#fff');
    },
    right: windows({ cols: 3, rows: 2, gw: .4, gh: .4, glass: '#6fa0be', lit: 0 }),
  });
  box(0.05, 0.9, 1.9, 0.25, 22, 3, '#f0f0ec'); // canopy
}});

sprites.push({ name: "Workers' Club (Constructivist)", w: 2, d: 1, draw() {
  box(0.05, 0.25, 1.1, 0.7, 0, 30, '#d6cdbc', { left: windows({ cols: 5, rows: 2, gw: .6, gh: .5, lit: 0, glass: '#6f8ea6' }), right: windows({ cols: 3, rows: 2, gw: .4, gh: .5, lit: 0 }) });
  box(1.0, 0.1, 0.55, 0.85, 0, 50, '#e6dfd0', {
    left: (W, H) => { ctx.fillStyle = '#7fa6c0'; ctx.fillRect(4, 3, W - 8, H - 8); ctx.strokeStyle = '#d6cdbc'; ctx.lineWidth = 1.2;
      for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(4 + i * (W - 8) / 3, 3); ctx.lineTo(4 + i * (W - 8) / 3, H - 5); ctx.stroke(); }
      for (let i = 1; i < 9; i++) { ctx.beginPath(); ctx.moveTo(4, 3 + i * (H - 8) / 9); ctx.lineTo(W - 4, 3 + i * (H - 8) / 9); ctx.stroke(); } },
    right: windows({ cols: 4, rows: 6, gw: .5, gh: .6, lit: 0, glass: '#6f8ea6' }),
  });
  box(0.45, 0.45, 0.75, 0.5, 30, 14, '#b83a2e'); // red cantilevered auditorium
  box(0.05, 0.25, 1.1, 0.7, 44, 2, '#8a8a80');
}});

sprites.push({ name: 'Kindergarten', w: 2, d: 1, ground: '#76a063', draw() {
  box(0.05, 0.1, 1.0, 0.6, 0, 22, '#f2c76e', { left: windows({ cols: 5, rows: 1, gw: .6, gh: .55, lit: 0, glass: '#8fbfd6', my: 6 }), right: windows({ cols: 2, rows: 1, gw: .5, gh: .55, lit: 0, glass: '#8fbfd6', my: 6 }) });
  box(0.9, 0.15, 0.6, 0.5, 0, 17, '#8fc1b5', { left: windows({ cols: 3, rows: 1, gw: .6, gh: .55, lit: 0, glass: '#8fbfd6', my: 4 }), right: windows({ cols: 2, rows: 1, gw: .5, gh: .5, lit: 0, glass: '#8fbfd6', my: 4 }) });
  // playground: mushrooms, swing, sandbox
  [[1.2, .85], [1.4, .9]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); ctx.fillStyle = '#f0e6c8'; ctx.fillRect(c - 1.5, b - 6, 3, 6); ctx.fillStyle = '#d8332a'; ctx.beginPath(); ctx.ellipse(c, b - 7, 6, 3.5, 0, Math.PI, 0); ctx.fill(); });
  const s = sx(.5, .95), sb = sy(.5, .95, 0); line(s - 9, sb, s - 3, sb - 18, '#3a6fa8', 2); line(s + 9, sb, s + 3, sb - 18, '#3a6fa8', 2); line(s - 3, sb - 18, s + 3, sb - 18, '#3a6fa8', 2);
  line(s - 1, sb - 18, s - 1, sb - 6, '#555', 1); line(s + 1, sb - 18, s + 1, sb - 6, '#555', 1);
  box(0.8, 0.85, 0.25, 0.2, 0, 3, '#e6c88a'); tree(1.75, 0.8, .8);
}});

sprites.push({ name: 'TV Tower (Ostankino style)', w: 1, d: 1, draw() {
  const cx = sx(.5, .5), b = sy(.5, .5, 0);
  const g = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0); g.addColorStop(0, '#e6e2d8'); g.addColorStop(1, '#8e8a80');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 22, b); ctx.lineTo(cx - 6, b - 85); ctx.lineTo(cx - 3.5, b - 130); ctx.lineTo(cx + 3.5, b - 130); ctx.lineTo(cx + 6, b - 85); ctx.lineTo(cx + 22, b); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7a766c'; ctx.beginPath(); ctx.ellipse(cx, b, 22, 8, 0, 0, Math.PI, false); ctx.fill();
  cyl(cx, b - 88, 10, 4, 4, '#9a968c'); cyl(cx, b - 92, 12, 5, 12, '#e6e2d8', { bands: [[.3, .7, '#5b8aa8']] });
  cyl(cx, b - 118, 7, 3, 7, '#e6e2d8', { bands: [[.3, .7, '#5b8aa8']] });
  const aTop = b - 195; ctx.fillStyle = '#d8d8d4'; ctx.beginPath(); ctx.moveTo(cx - 3.5, b - 130); ctx.lineTo(cx - 1, aTop); ctx.lineTo(cx + 1, aTop); ctx.lineTo(cx + 3.5, b - 130); ctx.fill();
  [[.1, .3], [.4, .55], [.7, .85]].forEach(([a, c]) => { ctx.fillStyle = '#d8332a'; const y0 = b - 130 - (aTop - b + 130) * -a; ctx.fillRect(cx - 2, y0, 4, 9); });
}});

sprites.push({ name: 'Stalinka (Courtyard Block)', w: 2, d: 2, draw() {
  const win = (c, r) => windows({ cols: c, rows: r, gw: .4, gh: .6, mx: 3, glass: '#6a7f8c', lit: .08 });
  box(0.1, 0.1, 1.8, 0.55, 0, 52, '#e6d28e', { left: win(10, 6), right: win(3, 6) });
  box(0.1, 0.1, 1.8, 0.55, 52, 3, '#f4ecc8');
  box(0.8, 0.12, 0.4, 0.5, 55, 22, '#e6d28e', { left: win(2, 2), right: win(2, 2) });
  const cx = sx(1, .37), tz = 77; poly([[cx - 8, sy(1, .37, tz)], [cx + 8, sy(1, .37, tz)], [cx, sy(1, .37, tz + 28)]], '#a8b0a0'); star(cx, sy(1, .37, tz + 34), 6);
  tree(.95, 1.1, .9); tree(1.25, 1.3, .9);
  box(0.1, 0.65, 0.55, 1.25, 0, 52, '#e6d28e', { left: win(3, 6), right: win(7, 6) });
  box(0.1, 0.65, 0.55, 1.25, 52, 3, '#f4ecc8');
  box(1.35, 0.65, 0.55, 1.25, 0, 52, '#e6d28e', { left: win(3, 6), right: win(7, 6) });
  box(1.35, 0.65, 0.55, 1.25, 52, 3, '#f4ecc8');
}});
