// Helpers for historic Russian architecture. Colours passed to roof()/pyramid() must be hex.

function SP_(name, w, d, epoch, role, tier, draw, ground) { sprites.push({ name, w, d, epoch, role, tier, ground, draw }); }
const TRI = (a, b, c, col, st) => poly([a, b, c], col, st);

// Gabled roof over a box footprint. axis 'x' = ridge runs along x.
function roof(x0, y0, w, d, z0, rh, col, wall, axis = 'x', o = .03) {
  const X0 = x0 - o, X1 = x0 + w + o, Y0 = y0 - o, Y1 = y0 + d + o, P_ = (x, y, z) => [sx(x, y), sy(x, y, z)];
  if (axis === 'x') { const ym = y0 + d / 2;
    poly([P_(X0, Y0, z0), P_(X1, Y0, z0), P_(X1, ym, z0 + rh), P_(X0, ym, z0 + rh)], shade(col, .72));
    poly([P_(x0 + w, y0, z0), P_(x0 + w, y0 + d, z0), P_(x0 + w, ym, z0 + rh)], shade(wall, .7));
    poly([P_(X0, Y1, z0), P_(X1, Y1, z0), P_(X1, ym, z0 + rh), P_(X0, ym, z0 + rh)], col, 'rgba(0,0,0,.2)');
  } else { const xm = x0 + w / 2;
    poly([P_(X0, Y0, z0), P_(X0, Y1, z0), P_(xm, Y1, z0 + rh), P_(xm, Y0, z0 + rh)], shade(col, .72));
    poly([P_(x0, y0 + d, z0), P_(x0 + w, y0 + d, z0), P_(xm, y0 + d, z0 + rh)], shade(wall, .92));
    poly([P_(X1, Y0, z0), P_(X1, Y1, z0), P_(xm, Y1, z0 + rh), P_(xm, Y0, z0 + rh)], col, 'rgba(0,0,0,.2)');
  }
}
// Four-sided pyramid / tent roof.
function pyramid(x0, y0, w, d, z0, rh, col, o = .02) {
  const X0 = x0 - o, X1 = x0 + w + o, Y0 = y0 - o, Y1 = y0 + d + o, cx = x0 + w / 2, cy = y0 + d / 2, A = [sx(cx, cy), sy(cx, cy, z0 + rh)], P_ = (x, y) => [sx(x, y), sy(x, y, z0)];
  poly([P_(X0, Y0), P_(X1, Y0), A], shade(col, .6)); poly([P_(X0, Y0), P_(X0, Y1), A], shade(col, .68));
  poly([P_(X0, Y1), P_(X1, Y1), A], shade(col, .98), 'rgba(0,0,0,.15)'); poly([P_(X1, Y0), P_(X1, Y1), A], shade(col, .78), 'rgba(0,0,0,.15)');
}
// Onion dome at screen position (cx, base y by), radius r, height h.
function onion(cx, by, r, h, col, stripes) {
  const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0); g.addColorStop(0, shade(col, 1.25)); g.addColorStop(.5, shade(col, .95)); g.addColorStop(1, shade(col, .55));
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - r * .42, by); ctx.bezierCurveTo(cx - r * 1.35, by - h * .3, cx - r * .5, by - h * .72, cx, by - h);
  ctx.bezierCurveTo(cx + r * .5, by - h * .72, cx + r * 1.35, by - h * .3, cx + r * .42, by); ctx.closePath(); ctx.fill();
  if (stripes) { ctx.strokeStyle = stripes; ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(cx + i * r * .22, by - h * .08); ctx.quadraticCurveTo(cx + i * r * .75, by - h * .45, cx, by - h * .97); ctx.stroke(); } }
}
function crossAt(cx, by, h = 9, col = '#e0b44a') { line(cx, by, cx, by - h, col, 1.4); line(cx - 2.5, by - h * .65, cx + 2.5, by - h * .65, col, 1.2); line(cx - 1.6, by - h * .35, cx + 1.6, by - h * .35, col, 1); }
// Drum + onion + cross on a tile position.
function cupola(xc, yc, z, r, dh, oh, col, opt = {}) {
  const cx = sx(xc, yc), by = sy(xc, yc, z);
  cyl(cx, by, r * .72, r * .36, dh, opt.drum || '#efe9dc'); if (opt.win) { ctx.fillStyle = '#3a4a56'; ctx.fillRect(cx - 1, by - dh * .75, 2, dh * .5); }
  onion(cx, by - dh, r, oh, col, opt.stripes); crossAt(cx, by - dh - oh, opt.cross || 8, opt.crossCol);
}
function spire(xc, yc, z, hw, h, col, orb) { const cx = sx(xc, yc), by = sy(xc, yc, z); poly([[cx - hw, by], [cx + hw, by], [cx, by - h]], col); if (orb) sphere(cx, by - h - 2, 2.5, '#e0b44a'); line(cx, by - h, cx, by - h - 9, '#e0b44a', 1.3); }
function merlons(x0, y0, w, d, z, col, step = .14) {
  for (let t = 0; t < w - .02; t += step) box(x0 + t, y0 + d - .05, step * .55, .05, z, 4, col);
  for (let t = 0; t < d - .02; t += step) box(x0 + w - .05, y0 + t, .05, step * .55, z, 4, col);
}
// Generic face decorator (window grid, trim, cornice, plinth, pilasters, door).
function facade(o) {
  return (W, H, l) => {
    const ph = o.plinth || 0, ch = o.cornice || 0;
    windows({ cols: o.cols, rows: o.rows, gw: o.gw ?? .5, gh: o.gh ?? .62, glass: o.glass || '#4f6a7e', lit: o.lit ?? 0, mx: o.mx ?? 3, my: (o.my ?? 4) + ph, top: (o.top ?? 3) + ch, arch: o.arch, trim: o.trim, balc: o.balc })(W, H, l);
    if (ph) { ctx.fillStyle = o.plinthCol || 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, W, ph); }
    if (ch) { ctx.fillStyle = o.corniceCol || 'rgba(255,255,255,.4)'; ctx.fillRect(0, H - ch, W, ch); }
    if (o.pilasters) { ctx.fillStyle = o.pilCol || 'rgba(255,255,255,.28)'; for (let i = 0; i <= o.cols; i++) ctx.fillRect(3 + (W - 6) * i / o.cols - 1, ph, 2, H - ph - ch); }
    if (o.band) { ctx.fillStyle = o.band[1]; ctx.fillRect(0, o.band[0], W, o.band[2] || 2); }
    if (o.door) { const dw = o.doorW || 8, dh = o.doorH || 12; ctx.fillStyle = o.doorCol || '#4a3426'; ctx.beginPath(); ctx.moveTo(W / 2 - dw / 2, 0); ctx.lineTo(W / 2 - dw / 2, dh - dw / 2); ctx.quadraticCurveTo(W / 2 - dw / 2, dh, W / 2, dh); ctx.quadraticCurveTo(W / 2 + dw / 2, dh, W / 2 + dw / 2, dh - dw / 2); ctx.lineTo(W / 2 + dw / 2, 0); ctx.fill(); }
    if (o.pedi) { ctx.fillStyle = o.pediCol || 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.moveTo(W / 2 - o.pedi, H - ch - 1); ctx.lineTo(W / 2, H - ch - 1 + o.pedi * .35); ctx.lineTo(W / 2 + o.pedi, H - ch - 1); ctx.closePath(); ctx.fill(); }
  };
}
function colonnade(n, col = '#f4efe2', o = {}) {
  return (W, H) => { const ph = o.base ?? 3, ch = o.ent ?? 5, mx = o.mx ?? 4;
    if (o.back) { ctx.fillStyle = o.back; ctx.fillRect(mx, ph, W - mx * 2, H - ph - ch); }
    ctx.fillStyle = col; for (let i = 0; i < n; i++) { const x = mx + (W - mx * 2) * i / (n - 1); ctx.fillRect(x - 1.5, ph, 3, H - ph - ch); }
    ctx.fillRect(0, H - ch, W, ch); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, W, ph); if (o.door) { ctx.fillStyle = '#4a3426'; ctx.fillRect(W / 2 - 4, ph, 8, 12); } };
}
function stripesFace(c1, c2, n, vertical = true) { return (W, H) => { for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? c2 : c1; if (vertical) ctx.fillRect(i * W / n, 0, W / n + .5, H); else ctx.fillRect(0, i * H / n, W, H / n + .5); } }; }
