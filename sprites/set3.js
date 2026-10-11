// Set 3: infrastructure. Tiles are drawn flat first, objects on top.

const SIDEWALK = '#b4b3aa', ASPH = '#5d6066';
const roadStrip = (y0, y1) => flat(0, y0, 1, y1, ASPH);
const dashes = y => { for (let i = 0; i < 3; i++) flat(0.1 + i * .3, y - .02, 0.28 + i * .3, y + .02, '#ecebe4', 0.1); };

sprites.push({ name: 'Road', w: 1, d: 1, ground: SIDEWALK, draw() {
  roadStrip(.18, .82); dashes(.5);
  flat(0, .18, 1, .21, '#ecebe4', .1); flat(0, .79, 1, .82, '#ecebe4', .1);
}});

sprites.push({ name: 'Intersection', w: 1, d: 1, ground: SIDEWALK, draw() {
  roadStrip(.18, .82); flat(.18, 0, .82, 1, ASPH);
  for (let i = 0; i < 5; i++) { const o = .22 + i * .12;
    flat(o, .05, o + .06, .17, '#ecebe4', .1); flat(o, .83, o + .06, .95, '#ecebe4', .1);
    flat(.05, o, .17, o + .06, '#ecebe4', .1); flat(.83, o, .95, o + .06, '#ecebe4', .1); }
  const px = sx(.12, .12), py = sy(.12, .12, 0); line(px, py, px, py - 36, '#555', 2);
  [['#d8332a', -30], ['#e0b030', -25], ['#3a9a4a', -20]].forEach(([c, dy]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(px, py + dy, 2.5, 0, 7); ctx.fill(); });
}});

sprites.push({ name: 'Tram Line', w: 1, d: 1, ground: SIDEWALK, draw() {
  roadStrip(.1, .9); flat(0, .38, 1, .41, '#9a9a94', .1); flat(0, .59, 1, .62, '#9a9a94', .1);
  [0.3, 0.9].forEach(x => { wire(x, .05, 0, x, .05, 46, '#666', 2); wire(x, .05, 46, x, .5, 46, '#666', 1.5); });
  wire(0, .5, 46, 1, .5, 46, '#333', 1);
  box(0.12, 0.4, 0.76, 0.2, 2, 17, '#c0392b', { left: windows({ cols: 5, rows: 1, gw: .6, gh: .55, glass: '#e8e4d0', lit: 0, my: 4, top: 4 }), right: windows({ cols: 1, rows: 1, gw: .6, gh: .55, glass: '#e8e4d0', lit: 0 }) });
  box(0.12, 0.4, 0.76, 0.2, 19, 2, '#ece6d2'); wire(.5, .5, 21, .5, .5, 46, '#555', 1.2);
}});

sprites.push({ name: 'Concrete Panel Fence', w: 1, d: 1, ground: SIDEWALK, draw() {
  box(0, 0.1, 1, 0.07, 0, 24, '#bdbcb4', { left: (W, H) => {
    const n = 2, sw = W / n;
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(i * sw, 0, 1.2, H);
      const c = i * sw + sw / 2;
      ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1;
      [[0, 6], [1, 12]].forEach(([k, yy]) => { ctx.beginPath(); ctx.moveTo(c - 7, H / 2); ctx.lineTo(c, H / 2 + 6); ctx.lineTo(c + 7, H / 2); ctx.lineTo(c, H / 2 - 6); ctx.closePath(); ctx.stroke(); });
      ctx.strokeRect(i * sw + 3, 3, sw - 6, H - 6);
    }
  }});
  box(0, 0.1, 1, 0.07, 24, 2, '#a3a29a');
}});

sprites.push({ name: 'Construction Site', w: 2, d: 2, ground: '#a99a78', draw() {
  box(0.3, 0.3, 1.0, 0.8, 0, 36, '#c4c3bb', { left: windows({ cols: 5, rows: 3, gw: .45, gh: .5, glass: '#6a7480', lit: 0, seam: true }), right: windows({ cols: 4, rows: 3, gw: .45, gh: .5, glass: '#6a7480', lit: 0, seam: true }) });
  box(0.3, 0.3, 0.5, 0.8, 36, 12, '#c4c3bb'); // upper floor in progress
  for (let i = 0; i < 4; i++) { const x = sx(0.3 + .12 + i * .13, .3), z = 48; wire(0.3 + .12 + i * .13, .3, 48, 0.3 + .12 + i * .13, 1.1, 48, '#7a7a74', 1); }
  // panel stacks
  box(1.45, 0.25, 0.35, 0.18, 0, 6, '#c9c8c0'); box(1.45, 0.55, 0.35, 0.18, 0, 6, '#c9c8c0');
  // tower crane
  const mx = sx(1.25, .85), mb = sy(1.25, .85, 0), top = 118;
  line(mx - 4, mb, mx - 4, mb - top, '#e0b030', 2); line(mx + 4, mb, mx + 4, mb - top, '#e0b030', 2);
  for (let k = 0; k < top; k += 14) line(mx - 4, mb - k, mx + 4, mb - k - 14, '#e0b030', 1);
  line(mx - 44, mb - top + 2, mx + 70, mb - top - 2 + 54 * 0, '#e0b030', 3); // jib
  line(mx - 44, mb - top + 2, mx - 44 + 0, mb - top + 12, '#555', 1);
  ctx.fillStyle = '#777'; ctx.fillRect(mx - 52, mb - top - 3, 12, 9);
  line(mx, mb - top - 14, mx - 44, mb - top + 2, '#e0b030', 1); line(mx, mb - top - 14, mx + 70, mb - top, '#e0b030', 1); line(mx, mb - top - 14, mx, mb - top, '#e0b030', 2);
  line(mx + 40, mb - top, mx + 40, mb - 60, '#444', 1); ctx.fillStyle = '#c4c3bb'; ctx.fillRect(mx + 31, mb - 60, 18, 6);
  // site fence (front edges)
  box(0.05, 1.88, 1.9, 0.05, 0, 14, '#d6b24a', { left: (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(i * W / 6, 0); ctx.lineTo(i * W / 6, H); ctx.stroke(); } } });
  box(1.88, 0.05, 0.05, 1.83, 0, 14, '#d6b24a');
}});

sprites.push({ name: 'Bus Stop', w: 1, d: 1, ground: SIDEWALK, draw() {
  flat(0, .5, 1, .95, ASPH);
  [0.25, 0.75].forEach(x => wire(x, .22, 0, x, .22, 24, '#3a6fa8', 2));
  box(0.2, 0.12, 0.6, 0.22, 24, 2, '#3a6fa8');
  box(0.25, 0.14, 0.5, 0.05, 6, 10, '#9fc2d8'); box(0.3, 0.2, 0.4, 0.08, 0, 4, '#8a6a46');
  box(0.05, 0.58, 0.9, 0.3, 0, 19, '#c0392b', { left: (W, H, l) => { windows({ cols: 6, rows: 1, gw: .65, gh: .5, glass: '#e8e4d0', lit: 0, my: 6, top: 5 })(W, H, l); ctx.fillStyle = '#ece6d2'; ctx.fillRect(0, 3, W, 2); }, right: windows({ cols: 1, rows: 1, gw: .6, gh: .5, glass: '#e8e4d0', lit: 0 }) });
  box(0.05, 0.58, 0.9, 0.3, 19, 1.5, '#ece6d2');
}});

sprites.push({ name: 'Trolleybus Route', w: 1, d: 1, ground: SIDEWALK, draw() {
  roadStrip(.2, .8); dashes(.5);
  [.25, .85].forEach(x => { wire(x, .12, 0, x, .12, 50, '#4a4a46', 2); wire(x, .12, 50, x, .35, 50, '#4a4a46', 1.5); });
  wire(0, .35, 50, 1, .35, 50, '#222'); wire(0, .45, 50, 1, .45, 50, '#222');
  box(0.1, 0.52, 0.8, 0.22, 0, 20, '#3a77b8', { left: (W, H, l) => { windows({ cols: 5, rows: 1, gw: .7, gh: .5, glass: '#dfe9ef', lit: 0, my: 7, top: 5 })(W, H, l); ctx.fillStyle = '#ece6d2'; ctx.fillRect(0, 0, W, 3); }, right: windows({ cols: 1, rows: 1, gw: .6, gh: .5, glass: '#dfe9ef', lit: 0 }) });
  box(0.1, 0.52, 0.8, 0.22, 20, 1.5, '#ece6d2');
  wire(.4, .6, 22, .85, .4, 50, '#444', 1.5); wire(.4, .66, 22, .85, .45, 50, '#444', 1.5);
}});

sprites.push({ name: 'Power Pylon', w: 1, d: 1, ground: '#76a063', draw() {
  const cx = sx(.5, .5), b = sy(.5, .5, 0), col = '#5f6e7a';
  wire(0, .5, 70, .5, .5, 72, '#2a2a2a'); wire(.5, .5, 72, 1, .5, 70, '#2a2a2a'); wire(0, .35, 70, .5, .35, 72, '#2a2a2a'); wire(.5, .35, 72, 1, .35, 70, '#2a2a2a'); wire(0, .65, 70, .5, .65, 72, '#2a2a2a'); wire(.5, .65, 72, 1, .65, 70, '#2a2a2a');
  [[-14, -3], [14, 3]].forEach(([bx, tx]) => line(cx + bx, b, cx + tx / 3, b - 100, col, 2.5));
  for (let k = 0; k < 100; k += 20) { const w = (14 - k * .1) * (1 - k / 130); line(cx - w, b - k, cx + w * .6, b - k - 20, col, 1); line(cx + w, b - k, cx - w * .6, b - k - 20, col, 1); }
  [[100, 30], [78, 24], [56, 20]].forEach(([z, a]) => { line(cx - a, b - z, cx + a, b - z, col, 2.5); [-a, 0, a].forEach(o => line(cx + o, b - z, cx + o, b - z + 7, '#d6d2c0', 2)); });
}});

sprites.push({ name: 'Substation', w: 1, d: 1, ground: '#9a968c', draw() {
  box(0.7, 0.15, 0.22, 0.3, 0, 24, '#c9c5b6', { left: windows({ cols: 1, rows: 1, gw: .4, gh: .4, lit: 0 }), right: windows({ cols: 2, rows: 1, gw: .4, gh: .4, lit: 0 }) });
  [[0.12, 0.2], [0.12, 0.6]].forEach(([x, y]) => { box(x, y, .3, .22, 0, 16, '#7f95a3'); [0, 1, 2].forEach(i => { const c = sx(x + .08 + i * .07, y + .08), b = sy(x + .08 + i * .07, y + .08, 16); cyl(c, b, 2.5, 1.2, 12, '#d9cdb0'); }); });
  [[.55, .75], [.9, .75]].forEach(([x, y]) => wire(x, y, 0, x, y, 40, '#6b7a86', 2)); wire(.55, .75, 40, .9, .75, 40, '#6b7a86', 2); wire(.55, .75, 40, .9, .75, 30, '#222');
  box(0, 0.93, 1, 0.03, 0, 10, '#6e6a60'); box(0.97, 0, 0.03, 1, 0, 10, '#6e6a60');
}});

sprites.push({ name: 'Water Tower', w: 1, d: 1, ground: '#76a063', draw() {
  const cx = sx(.5, .5), b = sy(.5, .5, 0);
  cyl(cx, b, 8, 4, 62, '#d6d2c6'); cyl(cx, b - 62, 18, 9, 26, '#d6d2c6', { bands: [[.35, .5, '#3a6fa8']] });
  poly([[cx - 18, b - 88], [cx + 18, b - 88], [cx, b - 106]], '#8a8a80');
  ctx.fillStyle = '#4a4a46'; ctx.beginPath(); ctx.ellipse(cx, b - 88, 18, 9, 0, Math.PI, 0); ctx.fill();
  poly([[cx - 18, b - 88], [cx + 18, b - 88], [cx + 6, b - 100], [cx - 6, b - 100]], '#a8a89e');
}});

sprites.push({ name: 'Bridge', w: 1, d: 1, ground: '#4a86b8', draw() {
  for (let i = 0; i < 4; i++) { const y = .15 + i * .22; flat(.1, y, .35, y + .02, 'rgba(255,255,255,.35)'); flat(.6, y + .08, .85, y + .1, 'rgba(255,255,255,.35)'); }
  box(0.22, 0.25, 0.12, 0.5, 0, 8, '#a0a098'); box(0.66, 0.25, 0.12, 0.5, 0, 8, '#a0a098');
  box(0, 0.22, 1, 0.56, 8, 4, '#b4b3aa');
  flat(0, .3, 1, .7, ASPH, 12.2); for (let i = 0; i < 3; i++) flat(.1 + i * .3, .49, .28 + i * .3, .51, '#ecebe4', 12.3);
  box(0, 0.22, 1, 0.03, 12, 7, '#d9d5c8'); box(0, 0.75, 1, 0.03, 12, 7, '#d9d5c8');
}});

sprites.push({ name: 'River Embankment', w: 1, d: 1, ground: '#4a86b8', draw() {
  for (let i = 0; i < 3; i++) flat(.1, .12 + i * .22, .4 + i * .1, .14 + i * .22, 'rgba(255,255,255,.35)');
  box(0, 0.78, 1, 0.22, 0, 7, '#a39f94', { left: (W, H) => { ctx.strokeStyle = 'rgba(0,0,0,.2)'; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(i * W / 5, 0); ctx.lineTo(i * W / 5, H); ctx.stroke(); } } });
  [.15, .5, .85].forEach(x => { const c = sx(x, .78), b = sy(x, .78, 7); line(c, b, c, b - 20, '#333', 1.5); sphere(c, b - 22, 3, '#fff6c0'); });
  box(0.15, 0.3, 0.45, 0.14, 0, 5, '#f0f0ec', { left: windows({ cols: 4, rows: 1, gw: .6, gh: .5, glass: '#6fa0be', lit: 0, my: 1, top: 1 }) }); // river boat
  box(0.3, 0.32, 0.15, 0.1, 5, 4, '#d8332a');
}});

sprites.push({ name: 'Park', w: 1, d: 1, ground: '#6f9a5a', draw() {
  flat(.1, .45, .9, .55, '#d9ceaa'); flat(.45, .1, .55, .9, '#d9ceaa');
  const fc = sx(.5, .5), fy = sy(.5, .5, 0);
  ctx.fillStyle = '#c9c7bf'; ctx.beginPath(); ctx.ellipse(fc, fy, 13, 6.5, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5b9ac8'; ctx.beginPath(); ctx.ellipse(fc, fy - 1, 10, 5, 0, 0, 7); ctx.fill();
  line(fc, fy - 1, fc, fy - 14, '#bfe0f0', 1.5); line(fc, fy - 14, fc - 5, fy - 8, '#bfe0f0', 1); line(fc, fy - 14, fc + 5, fy - 8, '#bfe0f0', 1);
  [[.2, .75], [.8, .25]].forEach(([x, y]) => { const c = sx(x, y), b = sy(x, y, 0); ctx.fillStyle = '#5a4630'; ctx.fillRect(c - 1, b - 6, 2, 6); ctx.fillStyle = '#3f7a3a'; ctx.beginPath(); ctx.ellipse(c, b - 24, 5.5, 20, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#4f8d45'; ctx.beginPath(); ctx.ellipse(c + 1.5, b - 26, 3, 15, 0, 0, 7); ctx.fill(); });
  tree(.2, .8, 1); tree(.8, .2, 1);
  box(0.28, 0.58, 0.22, 0.05, 0, 5, '#8a6a46'); [[.15, .15], [.85, .85]].forEach(([x, y]) => flat(x - .06, y - .06, x + .06, y + .06, '#c0392b', .1));
}});

sprites.push({ name: 'Railway Station', w: 2, d: 1, ground: '#8a867a', draw() {
  flat(0, .12, 2, .62, '#7a7468');
  [.2, .5].forEach(y => flat(0, y - .015, 2, y + .015, '#4a4a46', .1));
  box(0.05, 0.14, 1.9, 0.3, 0, 21, '#2f7f4a', { left: (W, H, l) => { windows({ cols: 12, rows: 1, gw: .6, gh: .5, glass: '#e8f0ec', lit: 0, my: 6, top: 5 })(W, H, l); ctx.fillStyle = '#d8332a'; ctx.fillRect(0, 1.5, W, 2.5); }, right: windows({ cols: 1, rows: 1, gw: .6, gh: .5, glass: '#e8f0ec', lit: 0 }) });
  box(0.05, 0.14, 1.9, 0.3, 21, 2, '#ece6d2');
  box(0.05, 0.66, 1.9, 0.3, 0, 5, '#bcbab0');
  [.3, 1.0, 1.7].forEach(x => wire(x, .8, 5, x, .8, 24, '#6b6b66', 2)); box(0.2, 0.62, 1.6, 0.36, 24, 2, '#c0392b');
  box(0.05, 0.66, .3, .3, 5, 18, '#e6d9b0', { left: windows({ cols: 2, rows: 1, gw: .4, gh: .5, lit: 0, top: 2 }) });
}});

sprites.push({ name: 'Slogan Billboard', w: 1, d: 1, ground: SIDEWALK, draw() {
  [.2, .8].forEach(x => box(x - .03, .45, .06, .06, 0, 24, '#6b6b66'));
  box(0.05, 0.45, 0.9, 0.06, 24, 26, '#d8332a', { left: (W, H) => {
    ctx.fillStyle = '#f0e0a0'; ctx.fillRect(2, 2, W - 4, 1); ctx.fillRect(2, H - 3, W - 4, 1);
    faceText('СЛАВА ТРУДУ!', W / 2, H / 2, 5.5, '#f6e9b0'); } });
  [.3, .7].forEach(x => { const c = sx(x, .5), b = sy(x, .5, 54); line(c, b, c, b - 4, '#555', 1.5); ctx.fillStyle = '#fff6c0'; ctx.fillRect(c - 3, b - 7, 6, 3); });
}});

sprites.push({ name: 'Garage Cooperative', w: 2, d: 1, ground: '#9a968c', draw() {
  box(0.05, 0.1, 1.9, 0.55, 0, 20, '#a9aca8', { left: (W, H) => {
    const n = 8, cw = (W - 2) / n, cols = ['#2f7f4a', '#3a6fa8', '#c0392b', '#d6a02e', '#7a7f85', '#2f7f4a', '#c0392b', '#3a6fa8'];
    for (let i = 0; i < n; i++) { ctx.fillStyle = cols[i]; ctx.fillRect(1 + i * cw + 1, 0, cw - 2, 16); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(1 + i * cw + cw / 2 - .4, 0, .8, 16); }
  }});
  box(0.05, 0.1, 1.9, 0.55, 20, 2, '#4a4a46');
  tree(.5, .95, .8); tree(1.5, .95, .8);
}});
