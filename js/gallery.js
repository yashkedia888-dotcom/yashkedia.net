// The house. An enfilade of neoclassical rooms: plaster walls panelled in gilt
// moulding, pilasters between the pictures, a painted sky in each ceiling, parquet
// or marble underfoot, a chandelier overhead. One room per body of work, told apart
// by the colour of the plaster. One control: scroll.

import * as THREE from 'three';

const EYE = 1.66;
const INTRO = 4.2;          // quiet wall inside each doorway before the first picture
const GAP = 2.6;            // bare wall between pieces: each one gets a panel to itself
const DOOR_W = 2.8, DOOR_H = 3.7, WALL_T = 0.5;
const INK = '#141413';
const GOLD = 0xb8924a, TRIM = '#f3eee3';

const BASE = { w: 11, h: 6.2, trim: TRIM, floor: 'parquet', ceil: 'fresco', mould: 'gold', gap: 'pilaster', fog: '#ebe6da', glow: '255,240,214', text: INK };
// Each room is the same house in a different mood, after the references:
const KINDS = {
  // pale blue salon under a painted sky
  observatory: { ...BASE, wall: '#bccbd1', fog: '#dfe5e6', sky: ['#7fa6c4', '#e9dcc6'], bench: 0x2f4a5c },
  // white stucco hall: barrel vault in relief, black and white marble, urns
  salon:       { ...BASE, h: 4.7, rise: 2.5, wall: '#ece7dc', ceil: 'vault', mould: 'white', floor: 'chequer', extras: 'urns', fog: '#efebe2', bench: 0x6e1f24 },
  // mint cabinet of mirrors with a dark painted ceiling
  terminal:    { ...BASE, w: 10, h: 5.4, wall: '#b4cbb1', ceil: 'painted', floor: 'darkparquet', rug: ['#2f4a3a', '#d9c9a3'], fog: '#d5dfd0', sky: ['#22383a', '#5d7f78'], bench: 0x2f4a3a },
  // a small pink drawing room: lower ceiling, a rug, a rosette
  living:      { ...BASE, w: 9.4, h: 4.6, wall: '#e2c4ba', ceil: 'rosette', rug: ['#8a4a4a', '#ecdcc8'], fog: '#eedfd8', bench: 0x8a4a4a },
  // walnut and amber: a dim panelled room lit by sconces, red carpet
  billiards:   { ...BASE, w: 10, h: 5.0, wall: '#6a4526', trim: '#3d2614', ceil: 'coffer', ceilColor: '#2e1c0f', floor: 'carpet', gap: 'sconce', windows: false, dim: true, fog: '#3a2414', glow: '255,206,140', bench: 0x7a1a20 },
  // a conservatory: sage ironwork, glass roof, terracotta, plants
  courtyard:   { ...BASE, h: 4.2, rise: 3.0, wall: '#c9d4b8', trim: '#eef0e2', ceil: 'glass', mould: 'white', floor: 'terracotta', extras: 'plants', fog: '#e6efe0', bench: 0x4a6a3a },
  // the long gallery: arches marching away under a vault, skylights
  darkroom:    { ...BASE, h: 4.9, rise: 2.0, wall: '#d6d2c6', ceil: 'vault', ribs: true, fog: '#e6e2d8', bench: 0x2a2a2c },
  theater:     { ...BASE, w: 12, h: 6.0, wall: '#3a1216', trim: '#4a181d', floor: '#1a0a0c', fog: '#12070a', glow: '216,58,52', text: '#f3f0ea', dark: true },
};

function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData.ctx = g;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
const glowTex = (rgb) => canvasTex(128, 128, (g, w, h) => {
  const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  r.addColorStop(0, `rgba(${rgb},1)`); r.addColorStop(0.45, `rgba(${rgb},.5)`); r.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = r; g.fillRect(0, 0, w, h);
});
const shade = (hex, k) => { const c = new THREE.Color(hex); c.multiplyScalar(k); return `#${c.getHexString()}`; };
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ── Floors ──────────────────────────────────────────────────────
function floorTex(kind, w, len) {
  const rep = (m) => [w / m, len / m];
  if (kind === 'marble') return canvasTex(256, 256, (g, s) => {
    g.fillStyle = '#e6dfd1'; g.fillRect(0, 0, s, s); g.fillStyle = '#b9b0a1';
    g.beginPath(); g.moveTo(s / 2, 0); g.lineTo(s, s / 2); g.lineTo(s / 2, s); g.lineTo(0, s / 2); g.fill();
  }, rep(1.9));
  if (kind === 'parquet') return canvasTex(256, 256, (g, s) => {       // chevron oak
    const r = rng(7), tones = ['#b98d5a', '#ad8150', '#c3986a', '#b58855', '#a87a49'];
    g.fillStyle = '#b08453'; g.fillRect(0, 0, s, s);
    const pw = 32;
    for (let half = 0; half < 2; half++) for (let i = -6; i < 14; i++) {
      g.fillStyle = tones[Math.floor(r() * tones.length)];
      const x0 = half * s / 2, y = i * pw;
      g.beginPath();
      if (half === 0) { g.moveTo(x0, y); g.lineTo(x0 + s / 2, y + s / 2); g.lineTo(x0 + s / 2, y + s / 2 + pw); g.lineTo(x0, y + pw); }
      else { g.moveTo(x0, y + s / 2); g.lineTo(x0 + s / 2, y); g.lineTo(x0 + s / 2, y + pw); g.lineTo(x0, y + s / 2 + pw); }
      g.closePath(); g.fill(); g.strokeStyle = 'rgba(60,36,14,.28)'; g.lineWidth = 1; g.stroke();
    }
    g.strokeStyle = 'rgba(60,36,14,.3)'; g.beginPath(); g.moveTo(s / 2, 0); g.lineTo(s / 2, s); g.moveTo(0.5, 0); g.lineTo(0.5, s); g.stroke();
  }, rep(1.5));
  if (kind === 'darkparquet') return canvasTex(256, 256, (g, s) => {
    const r = rng(11), tones = ['#6b4a2e', '#5f4127', '#755235', '#644529'];
    for (let i = 0; i < 8; i++) { g.fillStyle = tones[Math.floor(r() * 4)]; g.fillRect(i * 32, 0, 32, s); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(i * 32, 0, 1, s); g.fillRect(i * 32, r() * s, 32, 1); }
  }, rep(2));
  if (kind === 'chequer') return canvasTex(128, 128, (g, s) => { g.fillStyle = '#ece7dc'; g.fillRect(0, 0, s, s); g.fillStyle = '#2b2a2c'; g.fillRect(0, 0, s / 2, s / 2); g.fillRect(s / 2, s / 2, s / 2, s / 2); }, rep(1.5));
  if (kind === 'terracotta') return canvasTex(128, 128, (g, s) => { g.fillStyle = '#b8714a'; g.fillRect(0, 0, s, s); g.fillStyle = '#c47d55'; g.fillRect(3, 3, s / 2 - 6, s / 2 - 6); g.fillRect(s / 2 + 3, s / 2 + 3, s / 2 - 6, s / 2 - 6); g.strokeStyle = '#96573a'; g.lineWidth = 2; g.strokeRect(0, 0, s / 2, s / 2); g.strokeRect(s / 2, s / 2, s / 2, s / 2); g.strokeRect(s / 2, 0, s / 2, s / 2); g.strokeRect(0, s / 2, s / 2, s / 2); }, rep(1.1));
  if (kind === 'carpet') return canvasTex(64, 64, (g, s) => { g.fillStyle = '#5a1418'; g.fillRect(0, 0, s, s); g.fillStyle = '#66191d'; g.beginPath(); g.moveTo(s / 2, 4); g.lineTo(s - 4, s / 2); g.lineTo(s / 2, s - 4); g.lineTo(4, s / 2); g.fill(); }, rep(0.7));
  return null;
}

// plaster coffers in relief (or dark wood ones), for flat ceilings and vaults
function cofferTex(base, deep, dot) {
  return canvasTex(128, 128, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    g.fillStyle = shade(base, 0.86); g.fillRect(12, 12, s - 24, s - 24);
    g.fillStyle = deep; g.fillRect(22, 22, s - 44, s - 44);
    g.fillStyle = shade(base, 0.94); g.fillRect(22, 22, s - 44, 5); g.fillRect(22, 22, 5, s - 44);
    g.fillStyle = dot; g.beginPath(); g.arc(s / 2, s / 2, 9, 0, 7); g.fill();
  });
}
// a glass roof: sky behind glazing bars
function glassTex() {
  return canvasTex(256, 256, (g, s) => {
    const v = g.createLinearGradient(0, 0, s, 0); v.addColorStop(0, '#cfe3ee'); v.addColorStop(0.5, '#f4f8f4'); v.addColorStop(1, '#cfe3ee'); g.fillStyle = v; g.fillRect(0, 0, s, s);
    const r = rng(5); for (let i = 0; i < 9; i++) { const x = r() * s, y = r() * s, q = 30 + r() * 50; const c = g.createRadialGradient(x, y, 0, x, y, q); c.addColorStop(0, 'rgba(255,255,255,.7)'); c.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = c; g.fillRect(x - q, y - q, q * 2, q * 2); }
    g.strokeStyle = '#7d8f6c'; g.lineWidth = 7; g.strokeRect(0, 0, s, s); g.lineWidth = 3; g.beginPath(); g.moveTo(s / 2, 0); g.lineTo(s / 2, s); g.moveTo(0, s / 2); g.lineTo(s, s / 2); g.stroke();
  });
}
function rugTex(a, b) {
  return canvasTex(256, 512, (g, w, h) => {
    g.fillStyle = a; g.fillRect(0, 0, w, h); g.strokeStyle = b; g.lineWidth = 8; g.strokeRect(14, 14, w - 28, h - 28); g.lineWidth = 2; g.strokeRect(30, 30, w - 60, h - 60);
    g.fillStyle = b; g.globalAlpha = 0.5; g.beginPath(); g.ellipse(w / 2, h / 2, w * 0.2, h * 0.24, 0, 0, 7); g.fill(); g.globalAlpha = 1;
    g.fillStyle = a; g.beginPath(); g.ellipse(w / 2, h / 2, w * 0.12, h * 0.15, 0, 0, 7); g.fill();
  });
}

// a painted sky for the ceiling: an oval of cloud inside a gilt border
function frescoTex(seed, top, bottom) {
  return canvasTex(512, 1024, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.save(); g.beginPath(); g.ellipse(w / 2, h / 2, w / 2 - 26, h / 2 - 26, 0, 0, 7); g.clip();
    const v = g.createLinearGradient(0, 0, w, h); v.addColorStop(0, top); v.addColorStop(1, bottom); g.fillStyle = v; g.fillRect(0, 0, w, h);
    const r = rng(seed * 97 + 13);
    for (let i = 0; i < 46; i++) {
      const x = r() * w, y = r() * h, q = 50 + r() * 130;
      const c = g.createRadialGradient(x, y, 0, x, y, q); const warm = r() > 0.55;
      c.addColorStop(0, warm ? 'rgba(255,236,210,.5)' : 'rgba(255,255,255,.55)'); c.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = c; g.fillRect(x - q, y - q, q * 2, q * 2);
    }
    const sh = g.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.56); sh.addColorStop(0, 'rgba(40,30,20,0)'); sh.addColorStop(1, 'rgba(40,30,20,.3)');
    g.fillStyle = sh; g.fillRect(0, 0, w, h);
    g.restore();
    g.lineWidth = 16; g.strokeStyle = '#b8924a'; g.beginPath(); g.ellipse(w / 2, h / 2, w / 2 - 20, h / 2 - 20, 0, 0, 7); g.stroke();
    g.lineWidth = 3; g.strokeStyle = '#e6cf94'; g.beginPath(); g.ellipse(w / 2, h / 2, w / 2 - 20, h / 2 - 20, 0, 0, 7); g.stroke();
    g.lineWidth = 2; g.strokeStyle = 'rgba(184,146,74,.8)'; g.beginPath(); g.ellipse(w / 2, h / 2, w / 2 - 4, h / 2 - 4, 0, 0, 7); g.stroke();
  });
}

// a tall arched window full of daylight
function windowTex() {
  return canvasTex(256, 600, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const arch = () => { g.beginPath(); g.moveTo(8, h - 6); g.lineTo(8, w / 2); g.arc(w / 2, w / 2, w / 2 - 8, Math.PI, 0); g.lineTo(w - 8, h - 6); g.closePath(); };
    g.save(); arch(); g.clip();
    const v = g.createLinearGradient(0, 0, 0, h); v.addColorStop(0, '#fffaf0'); v.addColorStop(0.55, '#fdf3dc'); v.addColorStop(1, '#f4e3c2'); g.fillStyle = v; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#f3eee3'; g.lineWidth = 7;
    g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h);
    for (let y = w / 2 + 6; y < h; y += 92) { g.moveTo(0, y); g.lineTo(w, y); }
    for (const a of [-0.6, 0.6]) { g.moveTo(w / 2, w / 2); g.lineTo(w / 2 + Math.sin(a) * w, w / 2 - Math.cos(a) * w); }
    g.stroke(); g.restore();
    g.lineWidth = 12; g.strokeStyle = '#f3eee3'; arch(); g.stroke();
    g.lineWidth = 3; g.strokeStyle = '#b8924a'; arch(); g.stroke();
  });
}

export function createGallery({ canvas, chapters, works, portrait, showreel, onFocus, onOpen, onProgress }) {
  const kindFor = (name) => ({ ...(KINDS[name] || KINDS.salon), name: KINDS[name] ? name : 'salon' });
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BASE.fog);
  scene.fog = new THREE.Fog(BASE.fog, 14, 60);
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 300);
  scene.add(new THREE.HemisphereLight(0xfff8ec, 0xb9ad98, 2.5));
  const sun = new THREE.DirectionalLight(0xffeccd, 1.1); sun.position.set(4, 10, 6); scene.add(sun);

  const loader = new THREE.TextureLoader();
  const lam = (color, extra) => new THREE.MeshLambertMaterial({ ...extra, color });
  const bas = (color, extra) => new THREE.MeshBasicMaterial({ color, ...extra });
  const glowCache = {};
  const glow = (rgb) => (glowCache[rgb] ||= glowTex(rgb));
  const BLANK = 0xd9d4c8;                                    // what a piece shows before its image arrives
  const gold = lam(GOLD, { emissive: 0x3a2a08 });
  const winTex = windowTex();
  const mirrorMap = canvasTex(64, 256, (g, w, h) => { const v = g.createLinearGradient(0, 0, w, h); v.addColorStop(0, '#dfe8e6'); v.addColorStop(0.45, '#f6faf8'); v.addColorStop(0.55, '#c9d6d3'); v.addColorStop(1, '#e9f0ee'); g.fillStyle = v; g.fillRect(0, 0, w, h); });
  const shadowMat = (op) => bas(0x000000, { map: glow('0,0,0'), transparent: true, opacity: op, depthWrite: false });

  // ── Plan ──────────────────────────────────────────────────────
  const rooms = [];
  let z = 0, counter = 0;
  const live = chapters.filter((c) => works.some((w) => w.ch === c.id && w.house !== false));
  for (const ch of [...live, { id: '_theater', room: 'theater', numeral: '', title: 'Screening Room', style: '', note: '', effect: [] }]) {
    const K = kindFor(ch.room);
    const mine = works.map((work, index) => ({ work, index })).filter(({ work }) => work.ch === ch.id && work.house !== false);
    const left = [], right = [];
    const vids = mine.filter(({ work }) => work.type === 'video'), imgs = mine.filter(({ work }) => work.type !== 'video');
    [...imgs, ...vids].forEach((p, i) => (i % 2 ? right : left).push(p));          // both walls carry the same number, so neither runs bare
    const slots = [];
    const run = (list, side) => {
      let c = -INTRO;
      for (const { work, index } of list) {
        const a = work.w / work.h, vid = work.type === 'video';
        let h = Math.sqrt((vid ? 3.0 : 4.3) / a), w = h * a;      // every piece gets about the same wall
        const maxH = Math.min(2.7, K.h - 2.6);
        if (h > maxH) { h = maxH; w = h * a; }
        if (w > 3.3) { w = 3.3; h = w / a; }
        slots.push({ work, index, w, h, vid, side, dz: c - w / 2 - GAP / 2, cy: EYE + 0.5 });
        c -= w + GAP;
      }
      return -c;
    };
    const len = Math.max(ch.room === 'theater' ? 16 : 13, run(left, -1), run(right, 1)) + 1.6;
    const room = { ch, K, z0: z, z1: z - len, len, slots, index: rooms.length, hero: (imgs[0] || mine[0])?.work };
    slots.forEach((s) => { s.z = z + s.dz; s.room = room; });
    rooms.push(room);
    z -= len + WALL_T;
  }
  const allSlots = rooms.flatMap((r) => r.slots).sort((a, b) => b.z - a.z);
  allSlots.forEach((s) => { s.no = String(++counter).padStart(2, '0'); s.work.no = s.no; });
  const Z_MAX = -0.9, Z_MIN = rooms[rooms.length - 1].z1 + 6.5;

  // the line you walk: straight through the doors, drifting a little off the axis in between
  const pathX = (zz) => {
    const r = roomAt(zz); if (!r) return 0;
    const t = THREE.MathUtils.clamp((r.z0 - zz) / r.len, 0, 1);
    const amp = 1.5 * (r.index % 2 ? -1 : 1);
    return Math.sin(t * Math.PI) ** 2 * amp * (r.ch.room === 'theater' ? 0 : 1);
  };
  function roomAt(zz) { for (const r of rooms) if (zz <= r.z0 + WALL_T && zz > r.z1) return r; return zz > 0 ? rooms[0] : rooms[rooms.length - 1]; }

  // ── Build ─────────────────────────────────────────────────────
  const hits = [], pieces = [], cloths = [], tickers = [];
  const box = (g, w, h, d, mat, x, y, zz, ry = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, zz); m.rotation.y = ry; g.add(m); return m; };
  const cyl = (g, r1, r2, h, mat, x, y, zz, seg = 20) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mat); m.position.set(x, y, zz); g.add(m); return m; };
  const disc = (g, w, h, mat, x, y, zz) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, zz); g.add(m); return m; };
  const halo = (g, rgb, size, x, y, zz, op = 0.6) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), bas(0xffffff, { map: glow(rgb), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })); m.position.set(x, y, zz); g.add(m); tickers.push(() => m.quaternion.copy(camera.quaternion)); return m; };
  // a rectangle of moulding on a wall (local x along the wall, y up, z into the room)
  const moulding = (q, w, h, cx, cy, mat, t = 0.05, d = 0.035) => {
    box(q, w, t, d, mat, cx, cy + h / 2, d / 2); box(q, w, t, d, mat, cx, cy - h / 2, d / 2);
    box(q, t, h + t, d, mat, cx - w / 2, cy, d / 2); box(q, t, h + t, d, mat, cx + w / 2, cy, d / 2);
  };

  const plasterTex = (hex, dark) => canvasTex(8, 256, (g, w, h) => {
    const v = g.createLinearGradient(0, 0, 0, h);
    v.addColorStop(0, shade(hex, dark ? 0.6 : 0.9)); v.addColorStop(0.25, hex); v.addColorStop(0.8, hex); v.addColorStop(1, shade(hex, dark ? 0.6 : 0.88));
    g.fillStyle = v; g.fillRect(0, 0, w, h);
  });

  function chandelier(g, x, y, zz, drop) {
    const c = new THREE.Group(); c.position.set(x, y, zz); g.add(c);
    cyl(c, 0.012, 0.012, drop, gold, 0, drop / 2 + 0.5, 0, 6);
    cyl(c, 0.05, 0.11, 0.5, gold, 0, 0.25, 0, 12); cyl(c, 0.1, 0.03, 0.22, gold, 0, -0.1, 0, 12);
    const flame = bas(0xfff1cf, { fog: false });
    for (const [r, n, yy] of [[0.62, 10, 0], [0.36, 6, 0.34]]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 6, 48), gold); ring.rotation.x = Math.PI / 2; ring.position.y = yy; c.add(ring);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, cx = Math.cos(a) * r, cz = Math.sin(a) * r;
        cyl(c, 0.014, 0.014, 0.16, lam(0xf6f0e2), cx, yy + 0.1, cz, 6);
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 6), flame); f.position.set(cx, yy + 0.2, cz); c.add(f);
        const arm = box(c, r, 0.012, 0.012, gold, cx / 2, yy, cz / 2, -a);
        arm.visible = true;
      }
    }
    halo(g, '255,232,190', 3.2, x, y + 0.15, zz, 0.3);
  }

  for (const room of rooms) {
    const { K, ch, len, z0 } = room;
    const g = new THREE.Group(); g.position.z = z0; scene.add(g); room.group = g;
    const W = K.w, H = K.h, mid = -len / 2;
    const dark = !!K.dark, dim = !!K.dim;
    const wallMap = plasterTex(K.wall, dark || dim);
    const mould = K.mould === 'white' ? lam(K.trim) : gold;
    const trim = lam(K.trim);
    const theater = ch.room === 'theater';

    // floor, walls, ceiling
    const ft = floorTex(K.floor, W, len);
    disc(g, W, len, ft ? bas(0xffffff, { map: ft }) : bas(K.floor), 0, 0, mid);
    if (!dark && !dim) disc(g, W * 0.5, len * 0.94, bas(0xffffff, { map: glow('255,246,226'), transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending }), 0, 0.01, mid);   // sheen down the middle
    for (const side of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(len, H), bas(0xffffff, { map: wallMap }));
      m.position.set(side * W / 2, H / 2, mid); m.rotation.y = -side * Math.PI / 2; g.add(m);
      const x = (d) => side * (W / 2 - d / 2);
      box(g, 0.06, 0.3, len, trim, x(0.06), 0.15, mid);                                   // skirting
      box(g, 0.05, 0.07, len, trim, x(0.05), 1.02, mid);                                  // dado rail
      box(g, 0.05, 0.035, len, mould, x(0.05), H - 0.74, mid);                            // gilt line under the cornice
      box(g, 0.12, 0.2, len, trim, x(0.12), H - 0.56, mid);
      box(g, 0.24, 0.2, len, trim, x(0.24), H - 0.36, mid);
      box(g, 0.4, 0.18, len, trim, x(0.4), H - 0.09, mid);
    }
    const rise = K.rise || 0, top = H + rise;
    const flat = (map, color) => { const m = disc(g, W, len, bas(color || 0xffffff, map ? { map } : {}), 0, H, mid); m.rotation.x = Math.PI / 2; return m; };
    const oval = (fw, fl, a, b) => { const fr = disc(g, fw, fl, bas(0xffffff, { map: frescoTex(room.index + 1, a, b), transparent: true }), 0, H - 0.01, mid); fr.rotation.x = Math.PI / 2; };
    if (dark) flat(null, '#1a0a0c');
    else if (K.ceil === 'vault' || K.ceil === 'glass') {
      const glass = K.ceil === 'glass';
      const tex = glass ? glassTex() : cofferTex('#f1ece1', '#d9d2c2', '#cbb27a');
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(glass ? 6 : 7, len / (glass ? 1.6 : 1.5));
      const v = new THREE.Mesh(new THREE.CylinderGeometry(W / 2, W / 2, len, 40, 1, true, Math.PI / 2, Math.PI), bas(0xffffff, { map: tex, side: THREE.BackSide, fog: !glass }));
      v.rotation.x = Math.PI / 2; v.scale.z = rise / (W / 2); v.position.set(0, H, mid); g.add(v);
      // the two ends of the vault
      const sh = new THREE.Shape(); sh.absellipse(0, 0, W / 2, rise, 0, Math.PI, false); sh.closePath();
      for (const [zz, ry] of [[-0.02, Math.PI], [-len + 0.02, 0]]) { const e = new THREE.Mesh(new THREE.ShapeGeometry(sh, 32), glass ? bas(0xeaf3f2, { fog: false }) : bas(K.wall)); e.position.set(0, H, zz); e.rotation.y = ry; g.add(e); }
      if (K.ribs || glass) for (let zc = -1.5; zc > -len + 0.5; zc -= glass ? 3.2 : 6.4) {
        const rib = new THREE.Mesh(new THREE.TorusGeometry(W / 2 - 0.06, glass ? 0.07 : 0.2, 6, 40, Math.PI), glass ? lam(0x7d8f6c) : trim);
        rib.scale.y = rise / (W / 2); rib.position.set(0, H, zc); g.add(rib);
        if (!glass) for (const s of [-1, 1]) { box(g, 0.34, 0.5, 0.5, trim, s * (W / 2 - 0.17), H - 0.3, zc); box(g, 0.4, 0.12, 0.6, gold, s * (W / 2 - 0.2), H - 0.6, zc); }     // corbels, so nothing stands in front of a picture
      }
      if (K.ribs) for (let zc = -4.7; zc > -len + 2; zc -= 6.4) halo(g, '255,250,235', 4.5, 0, top - 0.3, zc, 0.5);          // skylights between the arches
    } else if (K.ceil === 'coffer') {
      const t = cofferTex(K.ceilColor || '#f1ece1', shade(K.ceilColor || '#d9d2c2', 0.7), '#b8924a'); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(W / 1.6, len / 1.6); flat(t);
    } else if (K.ceil === 'painted') {
      flat(null, '#e9e6d6'); oval(W * 0.82, Math.min(len - 2, 18), K.sky[0], K.sky[1]);
      const cq = new THREE.Group(); cq.position.set(0, H, mid); cq.rotation.x = Math.PI / 2; g.add(cq); moulding(cq, W * 0.82 + 0.5, Math.min(len - 2, 18) + 0.5, 0, 0, gold, 0.08, 0.06);
    } else if (K.ceil === 'rosette') {
      flat(null, K.trim);
      for (let zc = -6; zc > -len + 4; zc -= 9) { const ro = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.06, 6, 40), gold); ro.rotation.x = Math.PI / 2; ro.position.set(0, H - 0.03, zc); g.add(ro); const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.04, 6, 32), trim); r2.rotation.x = Math.PI / 2; r2.position.set(0, H - 0.03, zc); g.add(r2); }
      const cq = new THREE.Group(); cq.position.set(0, H, mid); cq.rotation.x = Math.PI / 2; g.add(cq); moulding(cq, W - 2.2, len - 2.4, 0, 0, trim, 0.1, 0.06);
    } else {
      flat(null, K.trim);
      const fl = Math.min(len - 3, 15), fw = W * 0.6; oval(fw, fl, K.sky[0], K.sky[1]);
      const cq = new THREE.Group(); cq.position.set(0, H, mid); cq.rotation.x = Math.PI / 2; g.add(cq);       // a plain coffer round the painting
      moulding(cq, fw + 0.9, fl + 0.9, 0, 0, trim, 0.12, 0.08);
    }
    if (!dark && K.ceil !== 'glass') {
      const cy = Math.min(top - 1.9, H + rise * 0.55 - 0.6), drop = top - cy - 0.5;
      for (let zc = -6; zc > -len + 4; zc -= 9) chandelier(g, 0, cy, zc, drop);
      if (len < 15) chandelier(g, 0, cy, mid, drop);
    }
    if (K.rug) { const rl = Math.min(len - INTRO - 3, 9); disc(g, 3.4, rl, bas(0xffffff, { map: rugTex(K.rug[0], K.rug[1]) }), 0, 0.011, -INTRO - 1 - rl / 2); }
    if (K.extras === 'urns' || K.extras === 'plants') for (const s of [-1, 1]) for (const zz of [-1.3, -len + 1.3]) {
      const x = s * (W / 2 - 1.0);
      if (K.extras === 'urns') {
        box(g, 0.6, 1.0, 0.6, trim, x, 0.5, zz); box(g, 0.72, 0.1, 0.72, trim, x, 1.05, zz);
        const pts = [[0.02, 0], [0.16, 0.02], [0.1, 0.12], [0.26, 0.34], [0.3, 0.56], [0.2, 0.72], [0.14, 0.8], [0.22, 0.86], [0.2, 0.9]].map(([a, b]) => new THREE.Vector2(a, b));
        const u = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), trim); u.position.set(x, 1.1, zz); g.add(u);
      } else {
        cyl(g, 0.34, 0.26, 0.6, lam(0xb8714a), x, 0.3, zz, 14); cyl(g, 0.04, 0.05, 1.5, lam(0x5a4630), x, 1.3, zz, 6);
        const leaf = lam(0x4f7a3f, { flatShading: true });
        [[0, 2.3, 0, 0.75], [0.35, 1.9, 0.2, 0.5], [-0.3, 2.0, -0.25, 0.55], [0.1, 2.9, -0.1, 0.5]].forEach(([a, y, c, r]) => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), leaf); m.position.set(x + a, y, zz + c); g.add(m); });
      }
    }

    // entrance wall with its doorway, and a portal facing the room you came from
    const wm = bas(0xffffff, { map: wallMap });
    const sideW = (W - DOOR_W) / 2;
    for (const s of [-1, 1]) box(g, sideW, H, WALL_T, wm, s * (DOOR_W / 2 + sideW / 2), H / 2, WALL_T / 2);
    box(g, DOOR_W, H - DOOR_H, WALL_T, wm, 0, DOOR_H + (H - DOOR_H) / 2, WALL_T / 2);
    const prev = rooms[room.index - 1];
    const ps = lam(TRIM);
    const pz = WALL_T + 0.16;
    for (const s of [-1, 1]) {
      box(g, 0.42, DOOR_H, 0.32, ps, s * (DOOR_W / 2 + 0.21), DOOR_H / 2, pz); box(g, 0.56, 0.24, 0.42, ps, s * (DOOR_W / 2 + 0.21), 0.12, pz);
      box(g, 0.5, 0.14, 0.38, gold, s * (DOOR_W / 2 + 0.21), DOOR_H - 0.07, pz);
    }
    box(g, DOOR_W + 1.3, 0.5, 0.4, ps, 0, DOOR_H + 0.25, pz);
    box(g, DOOR_W + 1.5, 0.08, 0.5, ps, 0, DOOR_H + 0.54, pz);
    const pedH = Math.min(0.8, (prev ? prev.K.h + (prev.K.rise ? 0.6 : 0) : 9) - (DOOR_H + 0.58) - 0.12);
    if (pedH > 0.2) { const sh = new THREE.Shape(); const hw = DOOR_W / 2 + 0.75; sh.moveTo(-hw, 0); sh.lineTo(hw, 0); sh.lineTo(0, pedH); sh.closePath();
      const ped = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.34, bevelEnabled: false }), ps); ped.position.set(0, DOOR_H + 0.58, pz - 0.17); g.add(ped); }
    const label = canvasTex(1024, 96, (c, w, h) => {
      c.font = '500 46px "Cinzel", serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = '#8a7446'; c.letterSpacing = '12px'; c.fillText(ch.title.replace(/^The /, '').toUpperCase(), w / 2, h / 2 + 4);
    });
    const lm = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_W + 1.1, (DOOR_W + 1.1) * 96 / 1024), bas(0xffffff, { map: label, transparent: true })); lm.position.set(0, DOOR_H + 0.25, pz + 0.205); g.add(lm);
    // the same doorway seen from inside this room
    for (const s of [-1, 1]) box(g, 0.3, DOOR_H, 0.1, trim, s * (DOOR_W / 2 + 0.15), DOOR_H / 2, -0.05);
    box(g, DOOR_W + 0.9, 0.34, 0.12, trim, 0, DOOR_H + 0.17, -0.06);

    if (room.index < rooms.length - 1) {                        // the far wall takes this room's colour, not the next one's
      const fz = -len + 0.004, mk = (w, h, x, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wm); m.position.set(x, y, fz); g.add(m); };
      for (const s of [-1, 1]) mk(sideW, H, s * (DOOR_W / 2 + sideW / 2), H / 2);
      mk(DOOR_W, H - DOOR_H, 0, DOOR_H + (H - DOOR_H) / 2);
      for (const s of [-1, 1]) box(g, 0.3, DOOR_H, 0.1, trim, s * (DOOR_W / 2 + 0.15), DOOR_H / 2, -len + 0.05);
      box(g, DOOR_W + 0.9, 0.34, 0.12, trim, 0, DOOR_H + 0.17, -len + 0.06);
    }
    if (!dark && K.windows !== false) {
      const ww = 1.7, wh = Math.min(ww * 600 / 256, H - 1.3), wy = 0.75 + wh / 2;
      for (const s of [-1, 1]) for (const [zz, ry] of [[-0.012, Math.PI], [-len + 0.012, 0]]) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), bas(0xffffff, { map: winTex, transparent: true, fog: false }));
        m.position.set(s * (DOOR_W / 2 + sideW / 2 + 0.1), wy, zz); m.rotation.y = ry; g.add(m);
        const lz = zz > -1 ? -2.6 : -len + 2.6;
        disc(g, 3.2, 6.5, bas(0xffffff, { map: glow('255,236,196'), transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }), s * (DOOR_W / 2 + sideW / 2 + 0.2), 0.012, lz);
      }
    }
    if (!dark) for (const s of [-1, 1]) disc(g, 1.6, len, shadowMat(0.16), s * (W / 2 - 0.1), 0.008, mid);      // the floor darkens toward the walls

    const wallGroup = (side, dz) => { const q = new THREE.Group(); q.position.set(side * (W / 2 - 0.02), 0, dz); q.rotation.y = -side * Math.PI / 2; g.add(q); return q; };

    // panelling: one tall gilt panel behind each picture, a pilaster between panels
    if (!dark) {
      const top = H - 1.0, mcy = (1.32 + top) / 2, mh = top - 1.32;
      for (const side of [-1, 1]) {
        const cols = room.slots.filter((s) => s.side === side).map((s) => ({ c: s.dz, w: s.w + 1.0 }));
        // no panel is ever left empty: the one inside the door on the left carries the room's name
        if (side === -1) cols.unshift({ c: -INTRO / 2 + 0.2, w: INTRO - 1.7, title: true });
        cols.forEach((col, i) => {
          const q = wallGroup(side, col.c);
          moulding(q, col.w, mh, 0, mcy, mould);
          if (col.title) {
            const tw = col.w - 0.5, th = tw * 0.5;
            const tt = canvasTex(1024, 512, (c, w, h) => {
              c.clearRect(0, 0, w, h); c.textAlign = 'center'; c.textBaseline = 'middle';
              const ink = dim ? '#e2c88f' : '#6f5c35';
              let px = 92; c.letterSpacing = '10px'; const name = ch.title.toUpperCase();
              do { c.font = `500 ${px}px "Cinzel", serif`; px -= 4; } while (c.measureText(name).width > w - 80 && px > 30);
              c.fillStyle = ink; c.fillText(name, w / 2, h * 0.4);
              c.fillRect(w / 2 - 60, h * 0.58, 120, 2);
              if (ch.style) { c.letterSpacing = '1px'; let q2 = 34; do { c.font = `${q2}px "Garet", sans-serif`; q2 -= 2; } while (c.measureText(ch.style).width > w - 80 && q2 > 18); c.globalAlpha = 0.85; c.fillText(ch.style, w / 2, h * 0.74); }
            });
            const tm = new THREE.Mesh(new THREE.PlaneGeometry(tw, th), bas(0xffffff, { map: tt, transparent: true })); tm.position.set(0, mcy, 0.012); q.add(tm);
          }
          moulding(q, col.w, 0.5, 0, 0.66, trim, 0.035, 0.025);
          const nxt = cols[i + 1];
          const edge = col.c - col.w / 2, gapTo = nxt ? nxt.c + nxt.w / 2 : -len;
          const px = side * ((edge + gapTo) / 2 - col.c);             // local x of the gap centre (sign follows the wall's rotation)
          if (!nxt) return;                                          // nothing after the last picture
          if (edge - gapTo > 0.7 && K.gap === 'sconce') {     // a bracket of candles
            box(q, 0.1, 0.5, 0.06, gold, px, 2.5, 0.03); box(q, 0.5, 0.03, 0.03, gold, px, 2.42, 0.14);
            for (const o of [-0.22, 0.22]) { cyl(q, 0.016, 0.016, 0.2, lam(0xf6f0e2), px + o, 2.54, 0.14, 6); const f = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), bas(0xfff1cf, { fog: false })); f.position.set(px + o, 2.67, 0.14); q.add(f); }
            const hm = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), bas(0xffffff, { map: glow('255,196,120'), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })); hm.position.set(px, 2.7, 0.012); q.add(hm);
          } else if (edge - gapTo > 0.7 && !K.ribs) {
            box(q, 0.36, H - 0.84, 0.07, trim, px, (H - 0.84) / 2, 0.035);
            box(q, 0.48, 0.3, 0.11, trim, px, 0.15, 0.055);
            box(q, 0.48, 0.24, 0.11, mould, px, H - 0.96, 0.055);
          }
        });
      }
    }

    // the work, each in a gilt frame
    for (const s of room.slots) {
      const q = wallGroup(s.side, s.dz);
      const pool = new THREE.Mesh(new THREE.PlaneGeometry(s.w + 2.0, s.h + 2.0), bas(0xffffff, { map: glow(K.glow), transparent: true, opacity: dim ? 0.5 : 0, depthWrite: false }));
      pool.position.set(0, s.cy, 0.006); pool.renderOrder = -1; q.add(pool);
      const poolBase = dim ? 0.5 : 0;
      const photo = K.name === 'darkroom', rim = 0.075, mat = photo ? 0.11 : 0;
      { const sd = new THREE.Mesh(new THREE.PlaneGeometry(s.w + 1.1, s.h + 1.1), shadowMat(0.3)); sd.position.set(0.05, s.cy - 0.12, 0.004); q.add(sd); }
      const ow = s.w + 2 * (mat + rim), oh = s.h + 2 * (mat + rim);
      box(q, ow, oh, 0.09, gold, 0, s.cy, 0.045);
      box(q, ow - 0.05, oh - 0.05, 0.02, lam(0x8f6f33), 0, s.cy, 0.1);
      const bd = new THREE.Mesh(new THREE.PlaneGeometry(s.w + 2 * mat + 0.03, s.h + 2 * mat + 0.03), bas(s.vid ? 0x0b0b0b : photo ? 0xf6f3ed : 0x2a2118)); bd.position.set(0, s.cy, 0.112); q.add(bd);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), bas(BLANK)); face.position.set(0, s.cy, 0.115);
      face.userData.index = s.index; q.add(face); hits.push(face);
      pieces.push({ ...s, face, pool, poolBase, lit: 0, faceZ: face.position.z, loaded: false, video: s.vid ? { el: null, tex: null, posterTex: null } : null });
    }

    // a bench to sit on, off the walking line
    if (!theater) {
      const bx = (room.index % 2 ? 1 : -1) * 1.3, bz = Math.max(mid, -INTRO - 5);
      disc(g, 1.8, 3.4, shadowMat(0.3), bx, 0.011, bz);
      const vel = lam(K.bench);
      box(g, 0.62, 0.14, 2.2, vel, bx, 0.47, bz); box(g, 0.66, 0.05, 2.24, gold, bx, 0.385, bz);
      for (const [a, b] of [[-0.25, -0.98], [0.25, -0.98], [-0.25, 0.98], [0.25, 0.98]]) cyl(g, 0.03, 0.02, 0.36, gold, bx + a, 0.18, bz + b, 8);
    }

    if (theater) {
      const sw = Math.min(8.6, W - 2.4), shh = sw * 9 / 16;
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, shh), bas(0x111111)); screen.position.set(0, 0.9 + shh / 2, -len + 0.2); g.add(screen);
      room.screen = screen;
      const fq = new THREE.Group(); fq.position.set(0, 0, -len + 0.14); g.add(fq); moulding(fq, sw + 0.3, shh + 0.3, 0, 0.9 + shh / 2, gold, 0.12, 0.06);
      const seat = lam(0x7a1a20);
      for (let r = 0; r < 3; r++) for (let i = -3; i <= 3; i++) { if (i === 0) continue; const x = i * 0.85 + Math.sign(i) * 0.5, zz = -5 - r * 1.5; box(g, 0.7, 0.42, 0.7, seat, x, 0.3, zz); box(g, 0.7, 0.7, 0.14, seat, x, 0.72, zz + 0.32); }
      for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { cyl(g, 0.1, 0.16, 0.26, bas(0xffd9a0), side * (W / 2 - 0.25), 3.2, -3 - i * 3.4); halo(g, '255,200,140', 2.2, side * (W / 2 - 0.4), 3.1, -3 - i * 3.4, 0.3); }
      if (portrait) {
        const t = loader.load(portrait); t.colorSpace = THREE.SRGBColorSpace;
        const q = new THREE.Group(); q.position.set(-W / 2 + 0.05, 0, -3.4); q.rotation.y = Math.PI / 2; g.add(q);
        box(q, 1.76, 2.3, 0.08, gold, 0, 2.0, 0.04);
        const f = new THREE.Mesh(new THREE.PlaneGeometry(1.56, 2.08), bas(0xffffff, { map: t })); f.position.set(0, 2.0, 0.085); f.userData.index = -1; q.add(f); hits.push(f);
      }
    }
  }
  // closing wall of the last room
  { const r = rooms[rooms.length - 1]; const m = new THREE.Mesh(new THREE.PlaneGeometry(r.K.w, r.K.h), bas(r.K.wall)); m.position.set(0, r.K.h / 2, -r.len); r.group.add(m); }

  // ── Textures arrive as you approach a room ─────────────────────
  const mid = (src) => (/^assets\/(?!_)/.test(src || '') && /\.jpe?g$/i.test(src) ? src.replace(/^assets\//, 'assets/_m/') : src);
  // stepping up to a still swaps in the full-resolution file
  const sharpen = (p) => { if (p.hi || p.vid) return; p.hi = true; loader.load(p.work.src, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; p.face.material.map = t; p.face.material.needsUpdate = true; }); };
  let firstBatch = 0, firstDone = 0, primed = false;
  function ensureLoaded(cur) {
    for (const p of pieces) {
      if (p.loaded || Math.abs(p.room.index - cur.index) > 1) continue;
      p.loaded = true;
      const counted = !primed && p.room.index === 0; if (counted) firstBatch++;
      const done = () => { if (counted) { firstDone++; onProgress?.(firstDone / firstBatch); } };
      const src = p.vid ? p.work.poster : p.work.src;
      const show = (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; p.face.material.map = t; p.face.material.color.set(0xffffff); p.face.material.needsUpdate = true; if (p.video) p.video.posterTex = t; };
      // the wall copy first (small, quick); if it fails, fall back to the full file once
      loader.load(mid(src), (t) => { show(t); done(); }, undefined, () => loader.load(src, (t) => { show(t); done(); }, undefined, done));
    }
    if (!primed) { primed = true; if (!firstBatch) onProgress?.(1); }
  }

  // ── Walking: one number, driven by scroll ─────────────────────
  let zc = Z_MAX, zt = Z_MAX - 0.01, running = false, focused, curRoom = null, vel = 0;
  let yawOff = 0, pitch = 0, inspect = null, insK = 0, hover = null;      // free look, and the piece you have stepped up to
  const pointer = { x: 0, y: 0 };
  const clampZ = (v) => Math.min(Z_MAX, Math.max(Z_MIN, v));
  const goToChapter = (id) => { const r = rooms.find((x) => x.ch.id === id); if (r) { inspect = null; yawOff = 0; pitch = 0; zt = clampZ(r.z0 - 2.2); } };
  const goToWork = (idx) => { const p = pieces.find((x) => x.index === idx); if (p) zt = clampZ(p.z + 2.5); };
  function step(dir) {                               // arrow keys: door to door
    inspect = null; yawOff = 0; pitch = 0;
    const r = roomAt(zt); const i = r.index;
    if (dir > 0) zt = i < rooms.length - 1 ? clampZ(rooms[i + 1].z0 - 2.2) : Z_MIN;
    else zt = clampZ((zt < r.z0 - 4 ? r : rooms[Math.max(0, i - 1)]).z0 - 2.2);
  }

  // Scroll walks. Drag looks around (all the way round). Click a piece to step up to it;
  // click it again, or use the label, to open it. On touch, a vertical swipe walks.
  let drag = null, moved = 0;
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault(); inspect = null;
    const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    zt = clampZ(zt - d * (e.deltaMode === 1 ? 0.5 : 0.014));
  }, { passive: false });
  canvas.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, y: e.clientY, z: zt, yaw: yawOff, pitch, touch: e.pointerType === 'touch', axis: null }; moved = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch { /* fine */ }
    canvas.classList.add('is-drag');
  });
  canvas.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1; pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (!drag) {
      if (e.pointerType === 'mouse') { const h = pick(e); hover = h != null && h >= 0 ? pieces.find((x) => x.index === h) || null : null; canvas.classList.toggle('is-hit', h != null); }
      return;
    }
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y; moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    if (moved < 7) return;
    if (drag.touch && !drag.axis) drag.axis = Math.abs(dy) > Math.abs(dx) * 1.2 ? 'walk' : 'look';
    if (drag.touch && drag.axis === 'walk') { inspect = null; zt = clampZ(drag.z + dy * 0.05); return; }
    inspect = null;
    yawOff = drag.yaw - dx * (drag.touch ? 0.007 : 0.0045);
    if (!drag.touch) pitch = THREE.MathUtils.clamp(drag.pitch + dy * 0.003, -0.75, 0.75);
  });
  const release = (e) => {
    if (!drag) return;
    canvas.classList.remove('is-drag'); const wasClick = moved < 7; drag = null;
    if (!wasClick) return;
    const hit = pick(e);
    if (hit == null) {
      if (inspect) { inspect = null; return; }
      // nothing hung there: walk to where you clicked on the floor
      ray.setFromCamera(ndc, camera);
      const d = ray.ray.direction, o = ray.ray.origin;
      if (d.y < -0.02) { const t = -o.y / d.y; if (t < 40) { yawOff = 0; pitch = 0; zt = clampZ(o.z + d.z * t + 1.2); } }
      else zt = clampZ(zt - 5);
      return;
    }
    if (hit === -1) { onOpen?.(-1); return; }
    const p = pieces.find((x) => x.index === hit);
    if (inspect === p) onOpen?.(hit); else { inspect = p; zt = clampZ(p.z + 0.4); }
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', () => { drag = null; canvas.classList.remove('is-drag'); });
  canvas.addEventListener('pointerleave', () => { hover = null; });

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); ray.far = 22;
    const hit = ray.intersectObjects(hits.filter((h) => h.parent.parent.visible !== false), false)[0];
    return hit ? hit.object.userData.index : null;
  }
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 0.8 ? 84 : w / h < 1.2 ? 72 : 62; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  // one video at a time: the nearest screen, or the cinema
  let reelEl = null, reelTex = null, reelI = 0;
  function playing(target) {
    for (const p of pieces) {
      const v = p.video; if (!v) continue;
      if (p === target) {
        if (!v.el) { v.el = document.createElement('video'); v.el.muted = true; v.el.loop = true; v.el.playsInline = true; v.el.src = p.work.src; }
        if (!v.tex) { v.tex = new THREE.VideoTexture(v.el); v.tex.colorSpace = THREE.SRGBColorSpace; }
        v.el.play().then(() => { p.face.material.map = v.tex; p.face.material.color.set(0xffffff); p.face.material.needsUpdate = true; }).catch(() => {});
      } else if (v.el && !v.el.paused) { v.el.pause(); if (v.posterTex) { p.face.material.map = v.posterTex; p.face.material.needsUpdate = true; } }
    }
  }
  function cinema(on) {
    const scr = rooms[rooms.length - 1].screen; if (!scr || !showreel?.length) return;
    if (on) {
      if (!reelEl) {
        reelEl = document.createElement('video'); reelEl.muted = true; reelEl.playsInline = true;
        reelEl.addEventListener('ended', () => { reelI = (reelI + 1) % showreel.length; reelEl.src = showreel[reelI]; reelEl.play().catch(() => {}); });
        reelEl.src = showreel[0]; reelTex = new THREE.VideoTexture(reelEl); reelTex.colorSpace = THREE.SRGBColorSpace;
        scr.material.map = reelTex; scr.material.color.set(0xffffff); scr.material.needsUpdate = true;
      }
      reelEl.play().catch(() => {});
    } else reelEl?.pause();
  }

  const clock = new THREE.Clock();
  const look = new THREE.Vector3(), basePos = new THREE.Vector3(), insPos = new THREE.Vector3(), insAt = new THREE.Vector3(), fogC = new THREE.Color(), tmpC = new THREE.Color();
  let lastInspect = null, wasInspect = false;
  fogC.copy(scene.background);          // start in the dark, not a white flash
  let tickN = 0, centred = null;
  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    const before = zc; zc += (zt - zc) * (1 - Math.pow(0.0025, dt)); vel = (zc - before) / Math.max(dt, 1e-4);

    const r = roomAt(zc);
    if (r !== curRoom) {
      curRoom = r; ensureLoaded(r);
      rooms.forEach((x) => { x.group.visible = Math.abs(x.index - r.index) <= 1; });
      cinema(r.ch.room === 'theater');
    }
    // atmosphere eases toward the room you are in; in a doorway it is half and half
    tmpC.set(r.K.fog); fogC.lerp(tmpC, 1 - Math.pow(0.02, dt)); scene.fog.color.copy(fogC); scene.background.copy(fogC);

    const x = pathX(zc), ahead = zc - 6.5;
    const bob = Math.sin(zc * 2.0) * 0.018 * Math.min(1, Math.abs(vel) * 0.35);
    basePos.set(x, EYE + bob, zc);
    // forward is along the walking line; dragging adds to it. Walking eases you back to forward.
    if (!drag && Math.abs(vel) > 0.5) { const k = Math.pow(0.2, dt); yawOff *= k; pitch *= k; }
    if (yawOff > Math.PI) yawOff -= Math.PI * 2; if (yawOff < -Math.PI) yawOff += Math.PI * 2;
    const a = Math.atan2(pathX(ahead) * 0.55 - x * 0.25 - x, -(ahead - zc)) + yawOff;
    const pt = 0.05 + pitch;
    look.set(basePos.x + Math.sin(a) * Math.cos(pt) * 10, basePos.y + Math.sin(pt) * 10, basePos.z - Math.cos(a) * Math.cos(pt) * 10);
    insK += ((inspect ? 1 : 0) - insK) * (1 - Math.pow(0.0015, dt));
    if (insK > 0.001 && (inspect || lastInspect)) {
      const p = inspect || lastInspect, W = p.room.K.w;
      const dist = THREE.MathUtils.clamp(Math.max(p.h * 1.25, p.w * 0.95) + 0.5, 1.9, W - 2.2);
      const e = insK * insK * (3 - 2 * insK);
      insPos.set(p.side * (W / 2 - dist), p.cy, p.z); insAt.set(p.side * W / 2, p.cy, p.z);
      basePos.lerp(insPos, e); look.lerp(insAt, e);
    }
    if (inspect) { lastInspect = inspect; sharpen(inspect); }
    camera.position.copy(basePos);
    camera.lookAt(look);
    if (!inspect) camera.rotation.z += THREE.MathUtils.clamp(vel * 0.0016, -0.015, 0.015);

    for (const c of cloths) {
      if (!c.userData.room.group.visible) continue;
      const pos = c.geometry.attributes.position, base = c.userData.base;
      for (let k = 0; k < pos.count; k++) { const bx = base[k * 3], by = base[k * 3 + 1], hang = (c.userData.top - by) / c.userData.th; pos.array[k * 3 + 2] = (Math.sin(t * 0.9 + by * 1.4 + bx) * 0.04 + Math.cos(bx * 5) * 0.018) * hang; }
      pos.needsUpdate = true;
    }
    for (const f of tickers) f(t, dt);

    // what you are passing: the nearest piece a little ahead of you
    // what you are looking at: whatever sits in the middle of the view
    if (++tickN % 5 === 0) {
      ndc.set(0, 0.05); ray.setFromCamera(ndc, camera); ray.far = 14;
      const h = ray.intersectObjects(hits, false)[0];
      centred = h && h.object.userData.index >= 0 ? pieces.find((p) => p.index === h.object.userData.index) || null : null;
    }
    let near = hover && hover.room.group.visible ? hover : centred && centred.room === r ? centred : null;
    // the piece under the pointer (or in front of you) lights up a little
    for (const p of pieces) { if (!p.room.group.visible) continue; const want = p === near || p === inspect ? 1 : 0; p.lit += (want - p.lit) * Math.min(1, dt * 8); p.pool.material.opacity = p.poolBase + p.lit * (1 - p.poolBase) * 0.6; p.face.position.z = p.faceZ + p.lit * 0.035; }
    let nv = null, vd = 7; for (const p of pieces) { if (!p.video || p.room !== r) continue; const d = Math.abs(p.z - (zc - 3)); if (d < vd) { vd = d; nv = p; } }
    if (inspect) near = inspect;
    const key = near || r;
    if (key !== focused || !!inspect !== wasInspect) { focused = key; wasInspect = !!inspect; onFocus?.(near ? near.index : null, r.ch, !!inspect, !!(r.K.dark || r.K.dim)); }
    if (nv !== frame.nv) { frame.nv = nv; playing(nv); }
    renderer.render(scene, camera);
  }

  return {
    start() { if (running) return; running = true; resize(); clock.getDelta(); requestAnimationFrame(frame); },
    stop() { running = false; pieces.forEach((p) => p.video?.el?.pause()); reelEl?.pause(); },
    step, goToWork, goToChapter,
    exitInspect() { const was = !!inspect; inspect = null; return was; },
    progress: () => (Z_MAX - zc) / (Z_MAX - Z_MIN),
    chapters: rooms.filter((r) => r.ch.id !== '_theater').map((r) => r.ch),
  };
}
