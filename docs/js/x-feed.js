/** Shared X card renderer. Own UI, static snapshot only. No embed script, no X API from the browser. */
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const X_LABEL = "Udvalgte offentlige opslag — ikke NDI's holdning";

const AVATAR = ['#9ecfd6', '#89aeb4', '#d5e4e7', '#e7d4d8', '#b7d4dc'];
const STOP = new Set(['GROUP', 'HOLDINGS', 'HOLDING', 'INC', 'CORP', 'LTD', 'PLC', 'CLASS', 'THE', 'AND', 'ADR']);

/** So 9984.T / SoftBank Group and NVDA / Nvidia hit the same posts on selskab and tema. */
const ALIAS = {
  '9984.T': ['9984', 'SOFTBANK', 'SFTBY'],
  '9984': ['9984.T', 'SOFTBANK', 'SFTBY'],
  SOFTBANK: ['9984.T', '9984', 'SFTBY'],
  SFTBY: ['9984.T', '9984', 'SOFTBANK'],
  NVDA: ['NVIDIA'],
  NVIDIA: ['NVDA'],
};

const THEME_ALIAS = {
  spacetech: ['space'],
  'fysisk-tech': ['physical'],
  energi: ['energy'],
  energiressourcer: ['energy-resources', 'energy'],
  'optik-netvaerk': ['connect'],
};

const THEME_DA = {
  chips: 'chips',
  ai: 'AI',
  platforms: 'platforme',
  quantum: 'quantum',
  space: 'space',
  physical: 'fysisk tech',
  energy: 'energi',
  software: 'software',
  ndi: 'NDI',
  compute: 'compute',
  europe: 'Europa',
};

export const X_FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'ndi', label: 'NDI / fond' },
  { id: 'chips', label: 'Chips / AI' },
  { id: 'platforms', label: 'Platforme' },
  { id: 'quantum', label: 'Quantum' },
  { id: 'space', label: 'Space' },
  { id: 'physical', label: 'Fysisk tech' },
  { id: 'energy', label: 'Energi' },
  { id: 'software', label: 'Software' },
];

function ensureXStyles() {
  if (typeof document === 'undefined' || document.getElementById('x-feed-css')) return;
  const s = document.createElement('style');
  s.id = 'x-feed-css';
  s.textContent = `
.x-grid{display:grid;gap:12px;margin-top:12px}
@media(min-width:980px){.x-grid{grid-template-columns:1fr 1fr}}
.x-grid .x-card.panel{margin:0}
.x-card{display:flex;flex-direction:column;gap:10px;min-width:0;background:linear-gradient(180deg,#16303a 0%,#11252c 70%);border-color:#345860}
.x-card.has-why{box-shadow:inset 3px 0 0 #89aeb4}
.x-top{display:flex;gap:10px;align-items:flex-start}
.x-ava{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;color:#050a0f;flex:none;letter-spacing:.2px}
.x-who{min-width:0;flex:1}
.x-who strong{display:block;font-size:14px;line-height:1.25;color:var(--text)}
.x-who span{display:block;color:var(--muted);font-size:12px}
.x-card time{margin-left:auto;font-size:12px;color:var(--faint);white-space:nowrap}
.x-text{color:var(--text);line-height:1.55;font-size:14.5px;margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
.x-why{margin:0;font-size:11px;letter-spacing:.2px;color:var(--cyan)}
.x-foot{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto}
.x-curated{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:#f5ee9e;border:1px solid #f5ee9e66;border-radius:999px;padding:3px 8px}
.x-mark{background:#f5ee9e33;color:inherit;border-radius:3px;padding:0 2px}
.x-spot{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:4px 0 18px}
.x-spot a{text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:6px;padding:14px 14px 12px;border-radius:14px;border:1px solid #345860;background:#0d1c22;min-height:112px}
.x-spot a:hover{border-color:var(--cyan);background:#163038}
.x-spot .k{font-size:11px;letter-spacing:1.4px;color:var(--brand);font-weight:700}
.x-spot strong{font-size:20px;letter-spacing:-.4px}
.x-spot span{color:var(--muted);font-size:12.5px;line-height:1.4}
.x-filters{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.x-filters .x-count{margin-left:4px;color:var(--faint);font-weight:500}
.x-live{font-size:13px;color:var(--muted);margin:8px 0 0}
.x-empty{border:1px dashed #89aeb488;border-radius:14px;padding:28px 18px;text-align:center;background:#89aeb40a}
.x-empty p{color:var(--muted);line-height:1.5}
.x-empty .k{color:var(--text);font-weight:600;font-size:16px;margin-bottom:6px}
.x-empty .outline-btn{margin-top:12px}
@media(max-width:700px){
  .x-spot{grid-template-columns:1fr}
  .x-grid{grid-template-columns:1fr}
  .x-card time{white-space:normal}
}
`;
  document.head.appendChild(s);
}

if (typeof document !== 'undefined') ensureXStyles();

export async function loadXPosts() {
  ensureXStyles();
  try {
    const r = await fetch('data/x-posts.json');
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export function fmtXDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('da-DK', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return String(iso).slice(0, 10);
  }
}

function initials(p) {
  const n = String(p.name || p.username || '?').trim();
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return n.slice(0, 2).toUpperCase();
}

function avatarColor(username) {
  let h = 0;
  const s = String(username || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR[h % AVATAR.length];
}

function expandTickers(list) {
  const out = new Set();
  for (const raw of list || []) {
    const u = String(raw || '').trim().toUpperCase();
    if (!u) continue;
    out.add(u);
    for (const a of ALIAS[u] || []) out.add(a);
    for (const part of u.split(/[^A-Z0-9]+/)) {
      if (part.length > 3 && !STOP.has(part)) {
        out.add(part);
        for (const a of ALIAS[part] || []) out.add(a);
      }
    }
  }
  return out;
}

function expandThemes(list) {
  const out = new Set();
  for (const raw of list || []) {
    const t = String(raw || '').trim().toLowerCase();
    if (!t) continue;
    out.add(t);
    for (const a of THEME_ALIAS[t] || []) out.add(a);
  }
  return out;
}

function tickerFamilyHit(postTickers, wantT) {
  const labels = [];
  for (const t of postTickers || []) {
    const u = String(t).toUpperCase();
    const family = new Set([u, ...(ALIAS[u] || [])]);
    if (![...family].some((x) => wantT.has(x))) continue;
    const label = (u === '9984' || u === '9984.T' || u === 'SFTBY' || u === 'SOFTBANK')
      ? 'SoftBank'
      : (u === 'NVIDIA' ? 'NVDA' : String(t));
    if (!labels.includes(label)) labels.push(label);
  }
  return labels;
}

function textNameHit(text, wantT) {
  const labels = [];
  const up = String(text || '').toUpperCase();
  const wantsSoft = ['SOFTBANK', '9984.T', '9984', 'SFTBY'].some((k) => wantT.has(k));
  const wantsNv = wantT.has('NVDA') || wantT.has('NVIDIA');
  if (wantsSoft && up.includes('SOFTBANK')) labels.push('SoftBank');
  if (wantsNv && (up.includes('NVIDIA') || up.includes('NVDA'))) labels.push('NVDA');
  return labels;
}

/** Ranked hits for selskab/tema. Ticker and name beat a theme-only match. */
export function matchPosts(pack, { tickers = [], themes = [] } = {}) {
  const wantT = expandTickers(tickers);
  const wantTh = expandThemes(themes);
  const hits = [];
  for (const p of pack?.posts || []) {
    const fromTicker = tickerFamilyHit(p.tickers, wantT);
    const fromText = fromTicker.length ? [] : textNameHit(p.text, wantT);
    const nameHit = fromTicker.length || fromText.length;
    const themeLabels = [];
    for (const tag of p.tags || []) {
      const key = String(tag).toLowerCase();
      if (!wantTh.has(key)) continue;
      const lab = THEME_DA[key] || key;
      if (!themeLabels.includes(lab)) themeLabels.push(lab);
    }
    if (!nameHit && !themeLabels.length) continue;
    const reasons = [...(fromTicker.length ? fromTicker : fromText), ...themeLabels].slice(0, 3);
    hits.push({ post: p, reasons, score: nameHit ? 2 : 1 });
  }
  hits.sort((a, b) => b.score - a.score || (b.post.created_at || '').localeCompare(a.post.created_at || ''));
  return hits;
}

export function postInFilter(p, f) {
  const tags = p.tags || [];
  const tickers = (p.tickers || []).map((t) => String(t).toUpperCase());
  if (!f || f === 'all') return true;
  if (f === 'ndi') {
    return tags.includes('ndi')
      || tickers.some((t) => t.includes('PMINDI'))
      || /^(InvestNewdeal|CHornskov|MadsC007|jesper_baek)$/.test(p.username);
  }
  if (f === 'chips') return tags.includes('chips') || tags.includes('ai') || tickers.includes('NVDA') || tickers.includes('NVIDIA');
  return tags.includes(f);
}

export function postMatchesQuery(p, q) {
  const s = String(q || '').trim().toLowerCase();
  if (!s) return true;
  const blob = [p.text, p.username, p.name, ...(p.tags || []), ...(p.tickers || [])].join(' ').toLowerCase();
  if (blob.includes(s)) return true;
  const extra = new Set();
  const u = s.toUpperCase();
  for (const a of ALIAS[u] || []) extra.add(a);
  for (const [k, arr] of Object.entries(ALIAS)) {
    if (k.toLowerCase() === s || arr.some((a) => a.toLowerCase() === s)) {
      extra.add(k);
      arr.forEach((a) => extra.add(a));
    }
  }
  return [...extra].some((a) => blob.includes(String(a).toLowerCase()));
}

export function postWho(p, who) {
  if (!who || who === 'all') return true;
  if (who === 'curated') return p.curatedFrom === 'mads_following';
  if (who === 'house') return /^(InvestNewdeal|CHornskov|MadsC007|jesper_baek)$/.test(p.username);
  return p.username === who;
}

function tickerHref(t) {
  const u = String(t).toUpperCase();
  if (u === 'SOFTBANK' || u === '9984.T' || u === '9984' || u === 'SFTBY') return 'selskab.html?isin=JP3436100006&fund=pmindi';
  if (u === 'NVDA' || u === 'NVIDIA') return 'selskab.html?isin=US67066G1040&fund=pmindi';
  if (u.includes('PMINDI')) return 'fakta.html';
  return `index.html?view=udforsk&q=${encodeURIComponent(t)}`;
}

function tagHref(tag) {
  const id = tag === 'ai' ? 'chips' : tag;
  if (X_FILTERS.some((f) => f.id === id)) return `ndi-paa-x.html?f=${encodeURIComponent(id)}`;
  return `ndi-paa-x.html?q=${encodeURIComponent(tag)}`;
}

function highlight(text, q) {
  const safe = esc(text);
  const query = String(q || '').trim();
  if (query.length < 2) return safe;
  const needle = esc(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    return safe.replace(new RegExp(needle, 'gi'), (m) => `<mark class="x-mark">${m}</mark>`);
  } catch {
    return safe;
  }
}

export function xCard(p, opt = {}) {
  ensureXStyles();
  const reasons = opt.reasons || [];
  const tags = [
    ...(p.tickers || []).slice(0, 4).map((t) => `<a class="tag" href="${esc(tickerHref(t))}">${esc(t)}</a>`),
    ...(p.tags || []).slice(0, 3).map((t) => `<a class="tag" href="${esc(tagHref(t))}">${esc(t)}</a>`),
  ].join('');
  const curated = p.curatedFrom === 'mads_following' ? '<span class="x-curated">Mads følger</span>' : '';
  const why = reasons.length ? `<p class="x-why">Vist fordi: ${reasons.map((r) => esc(r)).join(' · ')}</p>` : '';
  return `<article class="x-card panel${reasons.length ? ' has-why' : ''}">
  <header class="x-top">
    <span class="x-ava" style="background:${avatarColor(p.username)}" aria-hidden="true">${esc(initials(p))}</span>
    <div class="x-who">
      <strong>${esc(p.name || p.username)}</strong>
      <span>@${esc(p.username)}</span>
    </div>
    <time datetime="${esc(p.created_at)}">${esc(fmtXDate(p.created_at))}</time>
  </header>
  <p class="x-text">${highlight(p.text, opt.query)}</p>
  ${why}
  <p class="x-foot">
    <a class="outline-btn small" href="${esc(p.url)}" rel="noopener noreferrer" target="_blank">Åbn på X ↗</a>
    ${curated}
    ${tags}
  </p>
</article>`;
}

/**
 * Panel for company and theme pages.
 * No hits: returns '' so pages without a match stay quiet.
 * Pass showEmpty:true to render the empty state.
 */
export function xSaysPanel(pack, { tickers = [], themes = [], limit = 4, title = 'Hvad siger X', showEmpty = false } = {}) {
  ensureXStyles();
  if (!pack?.posts?.length) return '';
  const hits = matchPosts(pack, { tickers, themes }).slice(0, limit);
  const snap = esc((pack.snapshotAt || '').slice(0, 10));
  const primary = (tickers.length && tickers.length <= 3)
    ? tickers[0]
    : ((themes && themes[0]) || (tickers && tickers[0]) || '');
  const more = primary
    ? `ndi-paa-x.html?q=${encodeURIComponent(primary)}`
    : 'ndi-paa-x.html';
  if (!hits.length) {
    if (!showEmpty) return '';
    return `<section class="panel x-says">
  <h2 class="panel-h">${esc(title)}</h2>
  <p class="band">${esc(X_LABEL)} Snapshot ${snap}.</p>
  <div class="x-empty">
    <p class="k">Ingen opslag i udsnittet</p>
    <p>Der er ikke et udvalgt opslag, der matcher dette selskab eller tema.</p>
    <p><a href="ndi-paa-x.html">Se hele feedet</a></p>
  </div>
</section>`;
  }
  const cards = hits.map((h) => xCard(h.post, { reasons: h.reasons })).join('');
  return `<section class="panel x-says">
  <h2 class="panel-h">${esc(title)}</h2>
  <p class="band">${esc(X_LABEL)} Snapshot ${snap}.</p>
  <div class="x-grid">${cards}</div>
  <p class="link-row" style="margin-top:12px"><a class="outline-btn small" href="${more}">Flere opslag i feedet →</a></p>
</section>`;
}
