// Set 5: small utility sprites the game needs (low-density housing, shop, workshop, fire, police).

sprites.push({ name: 'Dacha', w: 1, d: 1, ground: '#76a063', draw() {
  const ym = .49;
  box(0.22, 0.28, 0.5, 0.42, 0, 15, '#c99a62', { left: windows({ cols: 2, rows: 1, gw: .45, gh: .55, glass: '#9fc2d8', lit: 0, top: 3, my: 3 }), right: windows({ cols: 2, rows: 1, gw: .4, gh: .55, glass: '#9fc2d8', lit: 0, my: 3 }) });
  poly([[sx(.2, .28), sy(.2, .28, 15)], [sx(.74, .28), sy(.74, .28, 15)], [sx(.74, ym), sy(.74, ym, 28)], [sx(.2, ym), sy(.2, ym, 28)]], '#6e3022');
  poly([[sx(.72, .28), sy(.72, .28, 15)], [sx(.72, .7), sy(.72, .7, 15)], [sx(.72, ym), sy(.72, ym, 28)]], shade('#c99a62', .7));
  poly([[sx(.2, .72), sy(.2, .72, 14)], [sx(.74, .72), sy(.74, .72, 14)], [sx(.74, ym), sy(.74, ym, 28)], [sx(.2, ym), sy(.2, ym, 28)]], '#a04a35', 'rgba(0,0,0,.2)');
  box(0.55, 0.32, 0.08, 0.08, 15, 17, '#9a8a7a');
  flat(.15, .78, .75, .9, '#6b4a2e'); [.25, .4, .55, .7].forEach(x => flat(x - .02, .82, x + .02, .86, '#c0392b', .2));
  box(0.08, 0.93, 0.84, 0.02, 0, 7, '#8a6a46'); tree(.85, .25, .8);
}});

sprites.push({ name: 'Magazin (Shop)', w: 1, d: 1, draw() {
  box(0.1, 0.15, 0.8, 0.7, 0, 24, '#e6d9b0', {
    left: (W, H) => {
      ctx.fillStyle = '#6fa0be'; ctx.fillRect(3, 1.5, W - 6, 10);
      for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#c0392b'; ctx.fillRect(2 + i * (W - 4) / 8, 11.5, (W - 4) / 8, 4); }
      ctx.fillStyle = '#2f5f8a'; ctx.fillRect(2, 16, W - 4, 7); faceText('ПРОДУКТЫ', W / 2, 19.5, 4.5, '#fff');
    },
    right: windows({ cols: 2, rows: 1, gw: .4, gh: .5, lit: 0, glass: '#6fa0be' }),
  });
}});

sprites.push({ name: 'Workshop', w: 1, d: 1, ground: '#8c8c84', draw() {
  box(0.1, 0.25, 0.8, 0.6, 0, 18, '#a9553a', { left: windows({ cols: 4, rows: 1, gw: .6, gh: .45, glass: '#8aa0ab', lit: 0, my: 6 }), right: windows({ cols: 3, rows: 1, gw: .6, gh: .45, glass: '#8aa0ab', lit: 0, my: 6 }) });
  for (let i = 0; i < 2; i++) { const x = .12 + i * .38, y0 = .25, y1 = .85;
    poly([[sx(x, y0), sy(x, y0, 18)], [sx(x, y1), sy(x, y1, 18)], [sx(x, y1), sy(x, y1, 28)]], shade('#8a4630', .8));
    poly([[sx(x, y0), sy(x, y0, 28)], [sx(x + .38, y0), sy(x + .38, y0, 18)], [sx(x + .38, y1), sy(x + .38, y1, 18)], [sx(x, y1), sy(x, y1, 28)]], '#8f8f8f'); }
  const c = sx(.82, .3), b = sy(.82, .3, 0); cyl(c, b, 3, 1.5, 48, '#d9d9d9', { bands: [[.4, .6, '#c0392b']] }); smoke(c, b - 48, .7);
}});

sprites.push({ name: 'Fire Station', w: 2, d: 1, draw() {
  box(0.05, 0.15, 1.5, 0.7, 0, 24, '#e2ddd0', {
    left: (W, H) => { for (let i = 0; i < 3; i++) { const x = 5 + i * 15; ctx.fillStyle = '#c0392b'; ctx.fillRect(x, 0, 12, 17); ctx.fillStyle = '#f2ede0'; ctx.fillRect(x, 8, 12, 1.5); } ctx.fillStyle = '#c0392b'; ctx.fillRect(0, H - 3, W, 3); },
    right: windows({ cols: 3, rows: 1, gw: .4, gh: .5, lit: 0, glass: '#6f8ea6' }),
  });
  box(0.05, 0.15, 1.5, 0.7, 24, 2, '#c0392b');
  box(1.5, 0.3, 0.35, 0.35, 0, 52, '#e2ddd0', { left: windows({ cols: 1, rows: 4, gw: .4, gh: .4, lit: 0, glass: '#6f8ea6' }), right: windows({ cols: 1, rows: 4, gw: .4, gh: .4, lit: 0, glass: '#6f8ea6' }) });
  box(1.5, 0.3, 0.35, 0.35, 52, 3, '#c0392b');
}});

sprites.push({ name: 'Police Station', w: 1, d: 1, draw() {
  box(0.1, 0.15, 0.8, 0.7, 0, 30, '#cfd6dc', {
    left: (W, H, l) => { windows({ cols: 3, rows: 2, gw: .5, gh: .4, lit: 0, glass: '#6f8ea6', top: 9 })(W, H, l); ctx.fillStyle = '#2f5f8a'; ctx.fillRect(0, H - 8, W, 6); faceText('МИЛИЦИЯ', W / 2, H - 5, 4.5, '#fff'); },
    right: windows({ cols: 2, rows: 2, gw: .4, gh: .4, lit: 0, glass: '#6f8ea6' }),
  });
  box(0.1, 0.15, 0.8, 0.7, 30, 2, '#2f5f8a');
  const f = sx(.5, .5), fb = sy(.5, .5, 32); line(f, fb, f, fb - 20, '#666', 1.5); poly([[f, fb - 20], [f + 10, fb - 17], [f, fb - 13]], '#d8332a');
}});
