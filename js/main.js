import { CHAPTERS, WORKS as ALL, PROFILE, INFLUENCES, SELECTION, ALSO, SOUND } from './data.js?v=1794995220';
const WORKS = ALL;

const $ = (s, el = document) => el.querySelector(s);
const el = (tag, props = {}, kids = []) => {
  const n = Object.assign(document.createElement(tag), props);
  for (const k of [].concat(kids)) n.append(k);
  return n;
};
const body = document.body;
const look = 'rooms';
body.dataset.look = look;
const getJSON = (url, fallback) => fetch(url).then((r) => (r.ok ? r.json() : fallback)).catch(() => fallback);

// ── Gather the work: the hand-kept list, plus whatever the Canva export and the
//    prepared-files folder contain, plus the write-ups ─────────────────────────
function chapterFor(x) {
  const s = `${x.campaign || ''} ${x.title || ''} ${x.client || ''}`.toLowerCase();
  if (/photograph/.test((x.medium || '').toLowerCase())) return 'eye';
  if (/\bdor\b/.test(s)) return 'dor';
  if (/air india|lizol|mr muscle|dettol|floron|aibizz|mccann|vihaan|maharaja/.test(s)) return 'agency';
  if (/marriott|dira|eera|kapoor|bni|\bitm\b|event masters|ventota|maple|zebrians|mentor|lohri/.test(s)) return 'houses';
  if (/architecture of innovation|\bgbm\b|general body|matcha|mafia|pitch night|speed networking|meet the board|mini hackathon/.test(s)) return 'masters';
  if (/compiled|c0mpiled|hackathon|datahacks|bow capital/.test(s)) return 'interfaces';
  if (/liftoff|launch ?point|makerspace|recruitment flyer|retro|ideas/.test(s)) return 'liftoff';
  if (/billboard|how does startup|merch|sticker|thrift|canopy|startup info|triton|marketing plan|brand|tee\b|label/.test(s)) return 'street';
  if (/networking|gliderport|potluck|info night|sales|hiring|voiceos|pickle|mobbin|podcast|fireside|panel|internship/.test(s)) return 'magazine';
  return 'play';
}
const [deep, canva, more, reels2, ig, notes, colours] = await Promise.all([
  getJSON('assets/deep/manifest.json', []),
  getJSON('assets/canva/manifest.json', []),
  getJSON('assets/more/manifest.json', []),
  getJSON('assets/reels2/manifest.json', []),
  getJSON('assets/ig/manifest.json', []),
  getJSON('assets/notes.json', {}),
  getJSON('assets/colors.json', {}),
]);
const have = new Set(WORKS.map((w) => w.src));
// the same artwork arrived twice (once from Canva, once from Downloads): keep the Canva export
const DUPES = /assets\/more\/(fall26-info-night-frame|fall26-info-night-tvs|fall26-networking-night-walk|gliderport-get-funded|how-sic-works-[125]|launchpoint-main|curated-clothes|tce-logo-option|that-label|nn-panel-3)\./;
// Not on the Instagram feed as of 17 Nov 2026: drafts, alternates, internal decks and mockups.
// Kept on disk; delete a name from this list to hang it again.
const DRAFTS = new Set(`
canva/nn-walking-man work/nn-panel-1 canva/thrift-clothes-so-good work/gliderport-panel work/pickleball
ig/DfVKWH0OFl9 ig/DfTVcohTOdE
canva/save-the-makerspace-tee canva/liftoff-desert canva/liftoff-pitch-night-prism canva/liftoff-social-night
canva/ideas-carousel-1 canva/ideas-carousel-2 canva/ideas-carousel-4 canva/ideas-carousel-5 canva/info-night-deck-cover
canva/shape-whats-next-tee canva/sic-stickers canva/what-is-si-cover canva/what-is-si-gap canva/what-is-si-why-us
canva/compiled5-countdown-2 canva/compiled5-judge canva/compiled5-deck-cover canva/compiled5-deck-why canva/compiled5-deck-roadmap
canva/info-night-keyhole canva/info-night-frame canva/info-night-tvs canva/nn-colonnade
canva/nn-deck-cover canva/nn-deck-investor canva/nn-deck-gliderport canva/nn-deck-cubism canva/gliderport-panel-alvin
canva/thrift-popup canva/salesathon-cash canva/salesathon-make-the-sale canva/salesathon-celsius canva/how-does-si-work
canva/tce-logo-1 canva/tce-logo-4 canva/brand-delusional-but-right canva/brand-guidelines canva/sic-mobbin-mixer
canva/that-label canva/cine-awards-vote
more/sic-gbm-lightbulb-arena more/sic-gbm-crown more/launchpoint-makerspace-needs-you more/sic-officer-applications
more/sic-merch-tee more/corgi-board-game-cafe
`.trim().split(/\s+/));
const isDraft = (src) => DRAFTS.has(src.replace(/^assets\//, '').replace(/\.\w+$/, ''));
const RETITLE = { 'assets/more/meet-the-board-yash.jpg': 'Meet the Board — Member Card' };
for (const [list, dir] of [[canva, 'assets/canva/'], [more, 'assets/more/'], [reels2, 'assets/reels2/'], [ig, 'assets/ig/'], [deep, 'assets/deep/']]) {
  for (const x of list) {
    const at = (f) => (!f ? f : f.startsWith('assets/') ? f : dir + f);
    const src = at(x.file);
    if (!src || have.has(src) || !x.w || !x.h || DUPES.test(src) || isDraft(src)) continue;
    if (RETITLE[src]) x.title = RETITLE[src];
    have.add(src);
    WORKS.push({ ch: chapterFor(x), src, poster: at(x.poster), w: x.w, h: x.h, title: x.title || 'Untitled', client: x.client || '', year: x.year || '', medium: x.medium || '', style: x.style || '' });
  }
}
// Keep only the chosen work. `house` pieces hang on the walls; the rest live in the Index only.
{
  const key = (src) => src.replace(/^assets\//, '').replace(/\.\w+$/, '');
  const pool = new Map(WORKS.map((w) => [key(w.src), w]));
  const picked = [];
  for (const [list, house] of [[SELECTION, true], [ALSO, false]]) {
    for (const [ch, keys] of Object.entries(list)) for (const k of keys) {
      const w = pool.get(k);
      if (w) { w.ch = ch; w.house = house; w.colour = colours[`assets/${k}`] || ''; picked.push(w); } else console.warn('selection: missing', k);
    }
  }
  WORKS.length = 0; WORKS.push(...picked);
}
// Team work is credited as team work.
const TEAM = /startup incubator/i;
const weify = (t) => t.replace(/\bI'm\b/g, "we're").replace(/\bI've\b/g, "we've").replace(/\bI\b/g, 'we').replace(/\bmy\b/g, 'our').replace(/\bMy\b/g, 'Our').replace(/\bme\b/g, 'us').replace(/(^|[.!?]\s+)we\b/g, (m, a) => `${a}We`);
WORKS.forEach((w) => {
  if (!w.type) w.type = /\.(mp4|webm|mov)$/i.test(w.src) ? 'video' : 'image';
  const n = notes[w.src];
  if (n) { w.idea = n.idea || ''; w.devices = n.devices || []; w.alt = n.alt || ''; }
  if (TEAM.test(w.client || '')) { w.role = 'Creative direction, with the Startup Incubator marketing team'; if (w.idea) w.idea = weify(w.idea); }
});
const kindOf = (w) => (w.type === 'video' ? 'reel' : w.ch === 'eye' ? 'photo' : 'graphic');
const chOf = (w) => CHAPTERS.find((c) => c.id === w.ch);
WORKS.forEach((w) => {
  w.kind = kindOf(w);
  w.hay = [w.title, w.client, w.medium, w.year, w.colour, w.kind, chOf(w)?.title, chOf(w)?.style, w.style, ...(w.devices || [])].filter(Boolean).join(' ').toLowerCase();
});

// ── Index: one grid, three ways to cut it (kind, colour, words) ─────────────
const index = $('#index');
const filter = { kind: 'all', colour: '', q: '' };
let shown = [];                       // indices currently in the grid, in order; the viewer steps through these
const SWATCH = { red: '#d83a34', orange: '#e8762a', yellow: '#e8c23a', green: '#3f8f5a', teal: '#2f9fa0', blue: '#2f5fc4', purple: '#7a3fb0', pink: '#e58fb0', black: '#141413', grey: '#8d8a84', white: '#f6f3ed' };

const sized = (src, tag) => (/^assets\/(?!_)/.test(src || '') && /\.jpe?g$/i.test(src) ? src.replace(/^assets\//, `assets/${tag}/`) : src);

function buildFilters() {
  const kinds = [['all', 'Everything'], ['graphic', 'Graphics'], ['reel', 'Reels'], ['photo', 'Photographs']];
  const tabs = $('#f-kinds');
  kinds.forEach(([k, label]) => {
    const n = k === 'all' ? WORKS.length : WORKS.filter((w) => w.kind === k).length;
    const b = el('button', { type: 'button' }, [label, el('sup', { textContent: String(n) })]);
    b.dataset.kind = k; b.setAttribute('aria-pressed', String(k === filter.kind));
    b.addEventListener('click', () => { filter.kind = k; tabs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); buildIndex(); });
    tabs.append(b);
  });
  const sw = $('#f-colours');
  Object.keys(SWATCH).filter((c) => WORKS.some((w) => w.colour === c)).forEach((c) => {
    const b = el('button', { type: 'button', title: c }); b.style.setProperty('--c', SWATCH[c]); b.setAttribute('aria-label', `Mostly ${c}`); b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => { filter.colour = filter.colour === c ? '' : c; sw.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b && filter.colour === c))); buildIndex(); });
    sw.append(b);
  });
  const q = $('#f-q');
  q.addEventListener('input', () => { filter.q = q.value.trim().toLowerCase(); buildIndex(); });
  $('#f-clear').addEventListener('click', () => {
    filter.kind = 'all'; filter.colour = ''; filter.q = ''; q.value = '';
    tabs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.kind === 'all')));
    sw.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    buildIndex();
  });
}
function buildIndex() {
  const words = filter.q.split(/\s+/).filter(Boolean);
  const order = CHAPTERS.map((c) => c.id);
  shown = WORKS.map((w, i) => ({ w, i }))
    .filter(({ w }) => (filter.kind === 'all' || w.kind === filter.kind) && (!filter.colour || w.colour === filter.colour) && words.every((t) => w.hay.includes(t)))
    .sort((a, b) => order.indexOf(a.w.ch) - order.indexOf(b.w.ch) || Number(b.w.house) - Number(a.w.house))
    .map(({ i }) => i);
  const active = filter.kind !== 'all' || filter.colour || filter.q;
  $('#f-count').textContent = shown.length === 1 ? '1 piece' : `${shown.length} pieces`;
  $('#f-clear').hidden = !active;
  index.replaceChildren();
  if (!shown.length) { index.append(el('p', { className: 'empty', textContent: 'Nothing matches that.' })); return; }
  let ul = null, last = null;
  for (const i of shown) {
    const w = WORKS[i], ch = chOf(w);
    if (ch.id !== last) {                                  // a quiet divider each time the room changes
      last = ch.id;
      index.append(el('header', { className: 'band' }, [el('h2', { className: 'band-title', textContent: ch.title }), el('p', { className: 'band-style', textContent: ch.style })]));
      ul = el('ul', { className: 'plates' }); index.append(ul);
    }
    const media = el('img', { src: sized(w.type === 'video' ? w.poster : w.src, '_s'), alt: w.alt || `${w.title}${w.client ? `, ${w.client}` : ''}`, loading: 'lazy', width: w.w, height: w.h });
    const btn = el('button', { type: 'button' }, [
      el('span', { className: `plate-frame${w.type === 'video' ? ' is-film' : ''}` }, media),
      el('span', { className: 'plate-title', textContent: w.title }),
      el('span', { className: 'plate-cap', textContent: [w.medium, w.client, w.year].filter(Boolean).join(' · ') }),
    ]);
    btn.addEventListener('click', () => openViewer(i));
    ul.append(el('li', { className: 'plate' }, btn));
  }
}
buildFilters();
buildIndex();

// ── Info / contact ──────────────────────────────────────────────
PROFILE.about.forEach((p) => $('#about').append(el('p', { textContent: p })));
PROFILE.numbers.forEach(({ n: num, l }) => $('#numbers').append(el('div', {}, [el('dt', { textContent: num }), el('dd', { textContent: l })])));
INFLUENCES.forEach((name) => $('#influences').append(el('li', { textContent: name })));
PROFILE.cv.forEach((r) => $('#cv tbody').append(el('tr', {}, [el('td', { textContent: r.when }), el('td', { textContent: `${r.role}, ${r.where}` }), el('td', { textContent: r.place })])));
[[`mailto:${PROFILE.email}`, PROFILE.email], [PROFILE.linkedin, 'LinkedIn'], ['resume/Yash_Kedia_Resume.pdf', 'Resume']]
  .forEach(([href, text]) => $('#contact-links').append(el('li', {}, el('a', { href, textContent: text, target: /^(http|resume)/.test(href) ? '_blank' : '', rel: 'noopener' }))));

// ── Viewer ──────────────────────────────────────────────────────
const viewer = $('#viewer');
let viewing = -1, lastFocus = null;
function openViewer(i) {
  if (i === -1) { setMode('list', '#info'); return; }
  const w = WORKS[i];
  if (!w) return;
  if (viewer.hidden) lastFocus = document.activeElement;
  viewing = i;
  $('#viewer-media').replaceChildren(w.type === 'video'
    ? el('video', { src: w.src, poster: w.poster || '', controls: true, autoplay: true, loop: true, playsInline: true })
    : el('img', { src: w.src, alt: w.alt || w.title }));
  const ch = CHAPTERS.find((c) => c.id === w.ch);
  $('#cap-no').textContent = ch ? ch.title : '';
  $('#cap-title').textContent = w.title;
  $('#cap-idea').textContent = w.idea || '';
  $('#cap-tags').replaceChildren(...(w.devices || []).map((d) => el('li', { textContent: `${d}.` })));
  const dl = $('#cap-dl');
  dl.replaceChildren();
  [['For', w.client], ['What', w.medium], ['Role', w.role], ['When', w.year]].forEach(([k, v]) => { if (v) dl.append(el('dt', { textContent: k }), el('dd', { textContent: v })); });
  viewer.hidden = false;
  gallery?.pause?.();
  $('#viewer-close').focus();
}
function closeViewer() {
  viewer.hidden = true; viewing = -1;
  $('#viewer-media').replaceChildren();
  lastFocus?.focus?.();
}
function stepViewer(d) {
  const order = shown.includes(viewing) ? shown : WORKS.map((_, i) => i);
  openViewer(order[(order.indexOf(viewing) + d + order.length) % order.length]);
}
$('#viewer-close').addEventListener('click', closeViewer);
$('#viewer-media').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeViewer(); });   // click the empty margin to close
$('#viewer-prev').addEventListener('click', () => stepViewer(-1));
$('#viewer-next').addEventListener('click', () => stepViewer(1));

// ── Modes ───────────────────────────────────────────────────────
let gallery = null, galleryReady = null, railRaf = 0;
const canWebGL = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();

function setMode(mode, hash) {
  if (mode === 'gallery' && !canWebGL) mode = 'list';
  body.classList.toggle('mode-gallery', mode === 'gallery');
  body.classList.toggle('mode-list', mode === 'list');
  document.querySelectorAll('.toggle button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  cancelAnimationFrame(railRaf);
  if (mode === 'gallery') {
    window.scrollTo(0, 0);
    ensureGallery().then((g) => { if (!g || !body.classList.contains('mode-gallery')) return; g.start(); rail(); });
  } else {
    gallery?.stop();
    if (hash) requestAnimationFrame(() => $(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    else window.scrollTo(0, 0);
  }
  try { localStorage.setItem('yk-mode', mode); } catch { /* private window */ }
}
function rail() {
  const fill = $('#rail-fill'), hint = $('#hint');
  const tick = () => {
    const p = gallery ? gallery.progress() : 0;
    fill.style.transform = `scaleX(${Math.max(0, Math.min(1, p)).toFixed(4)})`;
    if (p > 0.012) hint.classList.add('gone');
    railRaf = requestAnimationFrame(tick);
  };
  tick();
}

function ensureGallery() {
  if (galleryReady) return galleryReady;
  galleryReady = (async () => {
    const [{ createGallery }] = await Promise.all([
      import('./gallery.js?v=1794995220'),
      ...['500 46px "Cinzel"', '500 16px "Garet"'].map((f) => document.fonts.load(f)),
    ]);
    const hasRecap = await fetch('assets/recap/recap.mp4', { method: 'HEAD' }).then((r) => r.ok).catch(() => false);   // the cinema plays the recap film once it exists
    const hud = $('#hud');
    gallery = createGallery({
      canvas: $('#stage'),
      chapters: CHAPTERS,
      works: WORKS,
      influences: INFLUENCES,
      portrait: 'assets/work/portrait.jpg',
      look,
      showreel: hasRecap ? ['assets/recap/recap.mp4'] : WORKS.filter((w) => w.type === 'video' && w.house && w.w > w.h).map((w) => w.src),
      onProgress: setProgress,
      onOpen: openViewer,
      onFocus(i, ch, inspecting, darkRoom) {
        const w = i == null ? null : WORKS[i];
        hud.dataset.index = w ? i : '';
        body.classList.toggle('is-dark', !!darkRoom);
        $('#hud-title').textContent = w ? w.title : ch.title;
        $('#hud-meta').textContent = w ? [w.medium, w.client, w.year].filter(Boolean).join(', ') : ch.id === '_theater' ? 'The portrait on the left opens About and Contact.' : (ch.style || '');
        $('#hud-open').hidden = !w;
        $('#hud-open').textContent = w && w.type === 'video' ? 'Watch' : 'Open';
        hud.classList.toggle('is-inspect', !!inspecting);
        document.querySelectorAll('#rooms button').forEach((b) => b.setAttribute('aria-current', String(b.dataset.room === ch.id)));
      },
    });
    const nav = $('#rooms');
    gallery.chapters.forEach((r) => {
      const b = el('button', { type: 'button', title: r.title }, [el('span', { textContent: r.title }), el('i')]);
      b.dataset.room = r.id; b.setAttribute('aria-label', `Go to ${r.title}`);
      b.addEventListener('click', () => gallery.goToChapter(r.id));
      nav.append(b);
    });
    return gallery;
  })().catch((err) => { console.error(err); setProgress(1); setMode('list'); return null; });
  return galleryReady;
}

function setProgress(p) {
  const pct = Math.round(p * 100);
  $('#loader-pct').textContent = `${pct}%`;
  $('#loader-fill').style.width = `${pct}%`;
  if (p >= 1) { body.classList.remove('is-loading'); setTimeout(() => { $('#loader').hidden = true; }, 1100); }   // fade, then take it out entirely so a stalled fade can never cover the page
}
setTimeout(() => { body.classList.remove('is-loading'); $('#loader').hidden = true; }, 9000);    // never trap anyone behind the loader

document.querySelectorAll('.toggle button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
// top-bar links work from either view: the name returns to the house, the rest open the Index at that section
document.querySelectorAll('[data-go]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); if (!viewer.hidden) closeViewer(); setMode(a.dataset.go, a.dataset.go === 'list' ? a.getAttribute('href') : undefined); }));
$('#hud-open').addEventListener('click', () => { const i = $('#hud').dataset.index; if (i !== '') openViewer(Number(i)); });

window.addEventListener('keydown', (e) => {
  if (!viewer.hidden) {
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') stepViewer(-1);
    if (e.key === 'ArrowRight') stepViewer(1);
    return;
  }
  if (!body.classList.contains('mode-gallery') || !gallery) return;
  if (e.key === 'Escape') { gallery.exitInspect(); return; }
  if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); gallery.step(1); }
  if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); gallery.step(-1); }
});

// ── Sound: a tape deck. The playlist plays through YouTube's own player, which stays
//    on screen inside the deck; the keys below drive it. Nothing loads until Sound is pressed.
{
  const panel = $('#sound'), btn = $('#sound-btn'), also = $('#sound-tabs');
  const list = SOUND.find((t) => t.kind === 'youtube'), albums = SOUND.filter((t) => t.kind !== 'youtube');
  btn.replaceChildren(el('span', { className: 'eq' }, [el('i'), el('i'), el('i')]), el('span', { id: 'sound-label', textContent: 'Sound' }));
  $('#deck-name').replaceChildren(list ? list.label : 'Sound');
  let player = null, ready = false, shuffled = false;
  const setState = (playing, text) => {
    $('#deck-led').classList.toggle('on', playing); $('#deck-state').textContent = text;
    $('#deck-play').innerHTML = playing ? '&#10074;&#10074;' : '&#9654;'; $('#deck-play').setAttribute('aria-label', playing ? 'Pause' : 'Play');
    btn.classList.toggle('is-playing', playing);
  };
  const readout = () => {
    if (!ready) return;
    const ids = player.getPlaylist?.() || [], i = player.getPlaylistIndex?.() ?? -1, title = player.getVideoData?.().title || '';
    $('#deck-count').textContent = ids.length ? `${String(i + 1).padStart(2, '0')} / ${ids.length}` : '— / —';
    if (title) { $('#deck-title').textContent = title; $('#sound-label').textContent = title; }
  };
  const mount = () => {
    panel.classList.remove('is-album'); also.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    $('#sound-frame').replaceChildren(el('div', { id: 'yt-slot' }));
    const make = () => {
      player = new window.YT.Player('yt-slot', {
        host: 'https://www.youtube-nocookie.com',
        playerVars: { listType: 'playlist', list: list.id, playsinline: 1, rel: 0 },
        events: {
          onReady: () => { ready = true; player.setVolume(Number($('#deck-vol').value)); setState(false, 'Ready'); readout(); },
          onStateChange: (e) => {
            const S = window.YT.PlayerState;
            if (e.data === S.PLAYING) setState(true, 'Now playing'); else if (e.data === S.PAUSED) setState(false, 'Paused'); else if (e.data === S.BUFFERING) setState(true, 'Loading'); else if (e.data === S.ENDED) setState(false, 'Tape ended');
            readout();
          },
          onError: () => { setState(false, 'Skipping'); player.nextVideo?.(); },
        },
      });
    };
    if (window.YT?.Player) make();
    else { window.onYouTubeIframeAPIReady = make; if (!document.querySelector('script[data-yt]')) { const sc = el('script', { src: 'https://www.youtube.com/iframe_api' }); sc.dataset.yt = '1'; document.head.append(sc); } }
  };
  $('#deck-keys').addEventListener('click', (e) => {
    const act = e.target.closest('button')?.dataset.act; if (!act || !ready) return;
    if (act === 'toggle') (player.getPlayerState() === window.YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo());
    if (act === 'next') player.nextVideo();
    if (act === 'prev') player.previousVideo();
    if (act === 'shuffle') { shuffled = !shuffled; player.setShuffle(shuffled); $('#deck-shuffle').setAttribute('aria-pressed', String(shuffled)); }
  });
  $('#deck-vol').addEventListener('input', (e) => { if (ready) player.setVolume(Number(e.target.value)); });
  albums.forEach((t) => {
    const b = el('button', { type: 'button', textContent: t.label }); b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') { mount(); return; }            // press again to go back to the tape
      ready = false; player = null; setState(false, 'Album'); $('#sound-label').textContent = t.label;
      panel.classList.add('is-album'); also.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $('#sound-frame').replaceChildren(el('iframe', { src: `https://open.spotify.com/embed/${t.kind}/${t.id}?theme=0`, title: t.label, allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' }));
    });
    also.append(b);
  });
  const show = (on) => { panel.hidden = !on; btn.setAttribute('aria-expanded', String(on)); if (on && !$('#sound-frame').firstChild) (list ? mount() : also.querySelector('button')?.click()); };
  btn.addEventListener('click', () => show(panel.hidden));
  $('#sound-close').addEventListener('click', () => show(false));     // hiding keeps it playing
}

// ── Boot ────────────────────────────────────────────────────────
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let saved = null;
try { saved = localStorage.getItem('yk-mode'); } catch { /* private window */ }
const start = location.hash && location.hash !== '#top' ? 'list' : saved || (calm || !canWebGL ? 'list' : 'gallery');
if (start === 'list') { setProgress(1); setMode('list', location.hash || null); } else setMode('gallery');
