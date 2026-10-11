const HW = 32, HH = 16, T = 32; // half tile w/h in px; face-space units per tile (1u ~ 1px)
let ctx;
const initCtx = c => { ctx = c; };

const shade = (hex, f) => {
  const n = parseInt(hex.slice(1), 16);
  const c = s => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * f)));
  return `rgb(${c(16)},${c(8)},${c(0)})`;
};

// Cell origin: screen position of tile (0,0) corner of a sprite.
let OX = 0, OY = 0;
const sx = (x, y) => OX + (x - y) * HW;
const sy = (x, y, z) => OY + (x + y) * HH - z;

function poly(pts, fill, stroke) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function ground(w, d, color) {
  poly([[sx(0, 0), sy(0, 0, 0)], [sx(w, 0), sy(w, 0, 0)], [sx(w, d), sy(w, d, 0)], [sx(0, d), sy(0, d, 0)]], color, 'rgba(0,0,0,.25)');
}

// Box with decor callbacks drawn in face space (u along face in 1/T tiles, v up in px).
function box(x0, y0, w, d, z0, h, base, decor = {}) {
  const top = shade(base, 1.12), left = shade(base, 0.92), right = shade(base, 0.7);
  const z1 = z0 + h;
  // left face (y = y0+d)
  poly([[sx(x0, y0 + d), sy(x0, y0 + d, z0)], [sx(x0 + w, y0 + d), sy(x0 + w, y0 + d, z0)],
        [sx(x0 + w, y0 + d), sy(x0 + w, y0 + d, z1)], [sx(x0, y0 + d), sy(x0, y0 + d, z1)]], left);
  if (decor.left) {
    ctx.save();
    ctx.transform(HW / T, HH / T, 0, -1, sx(x0, y0 + d), sy(x0, y0 + d, z0));
    decor.left(w * T, h, 1.0); ctx.restore();
  }
  // right face (x = x0+w)
  poly([[sx(x0 + w, y0), sy(x0 + w, y0, z0)], [sx(x0 + w, y0 + d), sy(x0 + w, y0 + d, z0)],
        [sx(x0 + w, y0 + d), sy(x0 + w, y0 + d, z1)], [sx(x0 + w, y0), sy(x0 + w, y0, z1)]], right);
  if (decor.right) {
    ctx.save();
    ctx.transform(-HW / T, HH / T, 0, -1, sx(x0 + w, y0), sy(x0 + w, y0, z0));
    decor.right(d * T, h, 0.7); ctx.restore();
  }
  // top
  poly([[sx(x0, y0), sy(x0, y0, z1)], [sx(x0 + w, y0), sy(x0 + w, y0, z1)],
        [sx(x0 + w, y0 + d), sy(x0 + w, y0 + d, z1)], [sx(x0, y0 + d), sy(x0, y0 + d, z1)]], top, 'rgba(0,0,0,.2)');
}

// Window grid in face space.
function windows(opt) {
  return (W, H, light) => {
    const { cols, rows, mx = 4, my = 6, gw = 0.5, gh = 0.5, glass = '#5b7a92', lit = 0.12, seam, balc } = opt;
    const cw = (W - mx * 2) / cols, rh = (H - my - (opt.top ?? 4)) / rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const w = cw * gw, h = rh * gh;
      const x = mx + c * cw + (cw - w) / 2, y = my + r * rh + (rh - h) / 2;
      const on = ((r * 7 + c * 13) % 10) / 10 < lit;
      ctx.fillStyle = on ? '#f3d37a' : shade(glass, light);
      if (opt.arch) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h - w / 2); ctx.quadraticCurveTo(x, y + h, x + w / 2, y + h); ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - w / 2); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill(); }
      else ctx.fillRect(x, y, w, h);
      if (opt.trim) { ctx.strokeStyle = opt.trim; ctx.lineWidth = .9; ctx.strokeRect(x - .6, y - .6, w + 1.2, h + 1.2); }
      if (balc && c % balc === 0) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - 1, y - 1.5, w + 2, 1.5); }
    }
    if (seam) { // panel seams
      ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 0.6;
      for (let r = 0; r <= rows; r++) { const y = my + r * rh; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    }
  };
}

function stairCore(col, W, H) { // vertical strip on a face
  ctx.fillStyle = col; ctx.fillRect(W / 2 - 3, 2, 6, H - 3);
}


const sprites = [];

// ---------- extra helpers (screen-space) ----------
// Elliptical cylinder: centre cx, base y by, radii rx/ry, height h. col must be hex.
function cyl(cx, by, rx, ry, h, col, opt = {}) {
  const g = ctx.createLinearGradient(cx - rx, 0, cx + rx, 0);
  g.addColorStop(0, shade(col, 1.1)); g.addColorStop(0.55, shade(col, 0.95)); g.addColorStop(1, shade(col, 0.62));
  ctx.beginPath();
  ctx.moveTo(cx - rx, by - h); ctx.lineTo(cx - rx, by);
  ctx.ellipse(cx, by, rx, ry, 0, Math.PI, 0, true);
  ctx.lineTo(cx + rx, by - h); ctx.closePath();
  ctx.fillStyle = g; ctx.fill();
  if (opt.bands) { // horizontal stripes: [[fromFrac,toFrac,colour],...]
    opt.bands.forEach(([a, b, c]) => {
      const y0 = by - h * b, y1 = by - h * a;
      ctx.save(); ctx.beginPath();
      ctx.moveTo(cx - rx, y0); ctx.lineTo(cx - rx, y1); ctx.ellipse(cx, y1, rx, ry, 0, Math.PI, 0, true);
      ctx.lineTo(cx + rx, y0); ctx.ellipse(cx, y0, rx, ry, 0, 0, Math.PI, false); ctx.closePath();
      ctx.fillStyle = c; ctx.fill(); ctx.restore();
    });
  }
  if (!opt.open) {
    ctx.fillStyle = shade(col, opt.topShade ?? 1.18);
    ctx.beginPath(); ctx.ellipse(cx, by - h, rx, ry, 0, 0, 7); ctx.fill();
  }
}

function sphere(cx, cy, r, col) {
  const g = ctx.createRadialGradient(cx - r * .35, cy - r * .4, r * .1, cx, cy, r);
  g.addColorStop(0, shade(col, 1.25)); g.addColorStop(1, shade(col, .65));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
}

function dome(cx, by, r, col) { // hemisphere sitting on a base at by
  const g = ctx.createRadialGradient(cx - r * .35, by - r * .6, r * .1, cx, by, r * 1.1);
  g.addColorStop(0, shade(col, 1.25)); g.addColorStop(1, shade(col, .65));
  ctx.beginPath(); ctx.arc(cx, by, r, Math.PI, 0); ctx.ellipse(cx, by, r, r / 2, 0, 0, Math.PI, false); ctx.closePath();
  ctx.fillStyle = g; ctx.fill();
}

function smoke(cx, cy, s = 1) {
  ctx.fillStyle = 'rgba(240,240,240,.8)';
  [[6, -10, 7], [14, -22, 9], [24, -36, 11]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx + dx * s, cy + dy * s, r * s, 0, 7); ctx.fill(); });
}

function star(cx, cy, R, col = '#d8332a') {
  ctx.fillStyle = col; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * .45 : R; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  ctx.closePath(); ctx.fill();
}

function line(x1, y1, x2, y2, col = '#444', w = 1.5) {
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

function coolTower(cx, by, r, h, smokeOn = true) {
  const prof = t => [by - t * h, r - r * 0.36 * Math.sin(Math.PI * t)];
  ctx.beginPath(); ctx.moveTo(cx - r, by);
  for (let t = 0; t <= 1.001; t += .05) ctx.lineTo(cx - prof(t)[1], prof(t)[0]);
  ctx.lineTo(cx + prof(1)[1], prof(1)[0]);
  for (let t = 1; t >= -.001; t -= .05) ctx.lineTo(cx + prof(t)[1], prof(t)[0]);
  ctx.closePath();
  const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
  g.addColorStop(0, '#d8d8d2'); g.addColorStop(.6, '#b6b6b0'); g.addColorStop(1, '#7c7c78');
  ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = '#6e6e6a'; ctx.beginPath(); ctx.ellipse(cx, prof(1)[0], prof(1)[1], prof(1)[1] / 4, 0, 0, 7); ctx.fill();
  if (smokeOn) smoke(cx, prof(1)[0], r / 22);
}

function tree(x, y, s = 1) { // tile coords
  const cx = sx(x, y), by = sy(x, y, 0);
  ctx.fillStyle = '#5a4630'; ctx.fillRect(cx - 1.5 * s, by - 9 * s, 3 * s, 9 * s);
  sphere(cx, by - 15 * s, 8 * s, '#3f7a3a'); sphere(cx + 2 * s, by - 20 * s, 6 * s, '#4f8d45');
}

// Text on a face (face space has v pointing up, so flip).
function faceText(txt, u, v, px, col = '#b83a2e') {
  ctx.save(); ctx.scale(1, -1); ctx.fillStyle = col; ctx.font = `bold ${px}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, u, -v); ctx.restore();
}

// Flat rectangle on the ground (tile coords) at height z.
function flat(x0, y0, x1, y1, col, z = 0) {
  poly([[sx(x0, y0), sy(x0, y0, z)], [sx(x1, y0), sy(x1, y0, z)], [sx(x1, y1), sy(x1, y1, z)], [sx(x0, y1), sy(x0, y1, z)]], col);
}
function wire(x0, y0, z0, x1, y1, z1, col = '#333', w = 1) { line(sx(x0, y0), sy(x0, y0, z0), sx(x1, y1), sy(x1, y1, z1), col, w); }
