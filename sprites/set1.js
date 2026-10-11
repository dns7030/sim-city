// Set 1: first eight buildings

sprites.push({ name: 'Khrushchyovka (5-storey)', w: 2, d: 1, draw() {
  box(0.05, 0.1, 1.9, 0.8, 0, 40, '#d9d2bf', {
    left: (W, H, l) => { windows({ cols: 8, rows: 5, gw: .45, gh: .55, seam: true })(W, H, l); },
    right: (W, H, l) => windows({ cols: 3, rows: 5, gw: .35, gh: .55, glass: '#4a5f70' })(W, H, l),
  });
  box(0.05, 0.1, 1.9, 0.8, 40, 3, '#8a4b3b'); // roof lip
}});

sprites.push({ name: 'Brezhnevka (9-storey)', w: 2, d: 1, draw() {
  box(0.05, 0.1, 1.9, 0.8, 0, 76, '#c9cdd1', {
    left: (W, H, l) => { windows({ cols: 10, rows: 9, gw: .4, gh: .5, balc: 2, seam: true, lit: .15 })(W, H, l); },
    right: (W, H, l) => windows({ cols: 3, rows: 9, gw: .35, gh: .5, glass: '#4a5f70' })(W, H, l),
  });
  box(0.3, 0.3, 0.3, 0.3, 76, 8, '#8d9399'); // lift machine room
}});

sprites.push({ name: 'Tower block (16-storey)', w: 1, d: 1, draw() {
  box(0.1, 0.1, 0.8, 0.8, 0, 130, '#bfc4c8', {
    left: (W, H, l) => windows({ cols: 5, rows: 16, gw: .5, gh: .55, seam: true })(W, H, l),
    right: (W, H, l) => windows({ cols: 5, rows: 16, gw: .5, gh: .55, glass: '#4a5f70' })(W, H, l),
  });
  box(0.35, 0.35, 0.3, 0.3, 130, 10, '#7d8389');
  // antenna
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(sx(.5, .5), sy(.5, .5, 140)); ctx.lineTo(sx(.5, .5), sy(.5, .5, 165)); ctx.stroke();
}});

sprites.push({ name: 'Stalinist tower (Seven Sisters style)', w: 2, d: 2, draw() {
  const win = (c, r) => windows({ cols: c, rows: r, gw: .4, gh: .6, mx: 3, glass: '#6a7f8c' });
  box(0.1, 0.1, 1.8, 1.8, 0, 50, '#d6c9a8', { left: win(11, 6), right: win(11, 6) });
  box(0.4, 0.4, 1.2, 1.2, 50, 45, '#d6c9a8', { left: win(7, 5), right: win(7, 5) });
  box(0.65, 0.65, 0.7, 0.7, 95, 40, '#d6c9a8', { left: win(4, 5), right: win(4, 5) });
  box(0.8, 0.8, 0.4, 0.4, 135, 20, '#cdbf9c');
  // spire
  const c = 1.0, cx = sx(c, c);
  poly([[cx - 7, sy(c, c, 155)], [cx + 7, sy(c, c, 155)], [cx, sy(c, c, 200)]], '#a8b0a0');
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, sy(c, c, 200)); ctx.lineTo(cx, sy(c, c, 212)); ctx.stroke();
  ctx.fillStyle = '#d8332a'; ctx.beginPath(); // star
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 3 : 7;
    ctx.lineTo(cx + Math.cos(a) * r, sy(c, c, 218) + Math.sin(a) * r); }
  ctx.closePath(); ctx.fill();
}});

sprites.push({ name: 'Factory', w: 2, d: 2, draw() {
  box(0.1, 0.5, 1.8, 1.3, 0, 26, '#a9553a', {
    left: (W, H, l) => { windows({ cols: 9, rows: 1, gw: .6, gh: .45, glass: '#8aa0ab', lit: 0, mx: 6, my: 8 })(W, H, l); },
    right: (W, H, l) => windows({ cols: 5, rows: 1, gw: .6, gh: .45, glass: '#8aa0ab', lit: 0, mx: 6, my: 8 })(W, H, l),
  });
  // sawtooth roof
  for (let i = 0; i < 4; i++) {
    const x = 0.2 + i * 0.42;
    poly([[sx(x, .5), sy(x, .5, 26)], [sx(x, .5 + 1.3), sy(x, .5 + 1.3, 26)], [sx(x, .5 + 1.3), sy(x, .5 + 1.3, 38)]], shade('#8a4630', .8));
    poly([[sx(x, .5), sy(x, .5, 26)], [sx(x + .42, .5), sy(x + .42, .5, 26)], [sx(x + .42, .5 + 1.3), sy(x + .42, .5 + 1.3, 26)], [sx(x, .5 + 1.3), sy(x, .5 + 1.3, 26)]], '#6b6b6b');
    poly([[sx(x, .5), sy(x, .5, 38)], [sx(x + .42, .5), sy(x + .42, .5, 26)], [sx(x + .42, .5 + 1.3), sy(x + .42, .5 + 1.3, 26)], [sx(x, .5 + 1.3), sy(x, .5 + 1.3, 38)]], '#8f8f8f');
  }
  // chimneys
  [[0.35, 0.3], [0.75, 0.2]].forEach(([x, y], k) => {
    const cx = sx(x, y), b = sy(x, y, 0), t = b - (95 + k * 15);
    const g = ctx.createLinearGradient(cx - 6, 0, cx + 6, 0);
    g.addColorStop(0, '#d9d9d9'); g.addColorStop(1, '#8a8a8a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 6, b); ctx.lineTo(cx - 4, t); ctx.lineTo(cx + 4, t); ctx.lineTo(cx + 6, b); ctx.fill();
    ctx.fillStyle = '#c0392b';
    for (let s = 0; s < 3; s++) { const y0 = t + s * 22, w0 = 4 + s * .6; ctx.fillRect(cx - w0, y0, w0 * 2, 9); }
    ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(cx, t, 4, 2, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(230,230,230,.75)';
    [[6, -10, 7], [14, -22, 9], [24, -36, 11]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx + dx, t + dy, r, 0, 7); ctx.fill(); });
  });
}});

sprites.push({ name: 'Power plant (cooling tower)', w: 2, d: 2, draw() {
  box(0.1, 1.0, 1.0, 0.9, 0, 28, '#9aa3a8', { left: windows({ cols: 5, rows: 2, gw: .5, gh: .5, lit: 0 }), right: windows({ cols: 4, rows: 2, gw: .5, gh: .5, lit: 0 }) });
  const cx = sx(1.3, 0.7), by = sy(1.3, 0.7, 0);
  const prof = t => { const y = by - t * 120; const r = 26 - 11 * Math.sin(Math.PI * Math.min(1, t * 1.15)) * 0.0 - 9 * Math.sin(Math.PI * t) + 0; return [y, r]; };
  ctx.beginPath(); ctx.moveTo(cx - prof(0)[1], by);
  for (let t = 0; t <= 1.001; t += .05) ctx.lineTo(cx - prof(t)[1], prof(t)[0]);
  ctx.lineTo(cx + prof(1)[1], prof(1)[0]);
  for (let t = 1; t >= -.001; t -= .05) ctx.lineTo(cx + prof(t)[1], prof(t)[0]);
  ctx.closePath();
  const g = ctx.createLinearGradient(cx - 26, 0, cx + 26, 0);
  g.addColorStop(0, '#d8d8d2'); g.addColorStop(.6, '#b6b6b0'); g.addColorStop(1, '#7c7c78');
  ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = '#6e6e6a'; ctx.beginPath(); ctx.ellipse(cx, prof(1)[0], prof(1)[1], 6, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(245,245,245,.85)';
  [[0, -14, 12], [10, -30, 15], [22, -52, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx + dx, prof(1)[0] + dy, r, 0, 7); ctx.fill(); });
  // pylon
  ctx.strokeStyle = '#444'; ctx.lineWidth = 1.2;
  const px = sx(.4, .35), py = sy(.4, .35, 0);
  ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px, py - 50); ctx.lineTo(px + 8, py);
  ctx.moveTo(px - 12, py - 40); ctx.lineTo(px + 12, py - 40); ctx.stroke();
}});

sprites.push({ name: 'Palace of Culture', w: 2, d: 2, draw() {
  box(0.1, 0.1, 1.8, 1.8, 0, 6, '#c9c3b2'); // plinth
  box(0.2, 0.3, 1.6, 1.4, 6, 40, '#ece6d4', {
    left: (W, H) => { // colonnade + pediment
      ctx.fillStyle = '#f7f3e6';
      const n = 8, gap = (W - 12) / n;
      for (let i = 0; i <= n; i++) ctx.fillRect(6 + i * gap - 1.5, 2, 3, H - 10);
      ctx.fillStyle = '#d8d1bb'; ctx.fillRect(2, H - 8, W - 4, 8);
      ctx.fillStyle = '#6a5a4a'; ctx.fillRect(W / 2 - 9, 2, 18, 20); // doors
    },
    right: windows({ cols: 5, rows: 2, gw: .35, gh: .55, glass: '#8a9aa3', lit: 0 }),
  });
  // central dome-ish drum + red flag
  box(0.7, 0.7, 0.6, 0.6, 46, 14, '#e4dcc4', { left: windows({ cols: 4, rows: 1, gw: .4, gh: .6, lit: 0 }), right: windows({ cols: 4, rows: 1, gw: .4, gh: .6, lit: 0 }) });
  const fx = sx(1, 1), fy = sy(1, 1, 60);
  ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy - 30); ctx.stroke();
  poly([[fx, fy - 30], [fx + 16, fy - 26], [fx, fy - 20]], '#c0392b');
}});

sprites.push({ name: 'Metro station', w: 1, d: 1, draw() {
  box(0.1, 0.15, 0.8, 0.7, 0, 24, '#d4cdb9', {
    left: (W, H) => { // arched entrance
      ctx.fillStyle = '#4a4036';
      ctx.beginPath(); ctx.moveTo(W / 2 - 8, 0); ctx.lineTo(W / 2 - 8, 11); ctx.arc(W / 2, 11, 8, Math.PI, 0); ctx.lineTo(W / 2 + 8, 0); ctx.fill();
      ctx.fillStyle = '#b9b19b'; ctx.fillRect(1, H - 4, W - 2, 4);
    },
    right: windows({ cols: 3, rows: 1, gw: .35, gh: .5, lit: 0 }),
  });
  // roof sign: red "M"
  const cx = sx(.5, .5), cy = sy(.5, .5, 24);
  ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(cx, cy - 12, 11, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('M', cx, cy - 11);
}});

