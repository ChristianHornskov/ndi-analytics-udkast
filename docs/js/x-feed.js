/** Shared X card renderer. Own UI, static snapshot only. No embed script, no X API from the browser. */
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const X_LABEL = "Udvalgte offentlige opslag — ikke NDI's holdning";

const AVATAR = ['#9ecfd6', '#89aeb4', '#d5e4e7', '#e7d4d8', '#b7d4dc'];
const STOP = new Set(['GROUP', 'HOLDINGS', 'HOLDING', 'INC', 'CORP', 'LTD', 'PLC', 'CLASS', 'THE', 'AND', 'ADR']);
const HOUSE = /^(InvestNewdeal|CHornskov|MadsC007|jesper_baek)$/;

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
#x-grid{scroll-margin-top:88px}
@media(min-width:900px){#x-grid{scroll-margin-top:240px}}
@media(min-width:980px){.x-grid{grid-template-columns:1fr 1fr}}
.x-grid .x-card.panel{margin:0}
article.x-card{display:flex;flex-direction:column;gap:12px;min-width:0;padding:16px 16px 14px;background:radial-gradient(120% 90% at 0% 0%,rgba(158,207,214,.09),transparent 46%),linear-gradient(180deg,#16303a 0%,#102228 100%);border:1px solid #345860;border-radius:16px;box-shadow:0 14px 34px rgba(0,0,0,.22)}
article.x-card.is-direct{box-shadow:inset 3px 0 0 #9ecfd6,0 14px 34px rgba(0,0,0,.22)}
article.x-card.is-lead{border-color:#4e7380;padding:18px 18px 16px}
article.x-card.is-lead .x-text{font-size:18px;line-height:1.5;max-width:68ch}
.x-top{display:flex;gap:10px;align-items:flex-start}
.x-ava{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;color:#050a0f;flex:none;letter-spacing:.2px;box-shadow:0 0 0 2px #0c1c22,0 0 0 3px #89aeb466}
.x-who{min-width:0;flex:1}
.x-who strong{display:block;font-size:14.5px;line-height:1.25;color:var(--text);letter-spacing:-.2px}
.x-who span{display:block;color:var(--muted);font-size:12px}
.x-card time{margin-left:auto;font-size:12px;color:var(--faint);white-space:nowrap;font-variant-numeric:tabular-nums}
.x-text{color:var(--text);line-height:1.55;font-size:15px;margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
.x-why{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0}
.x-hit{font-size:10px;letter-spacing:.8px;text-transform:uppercase;border-radius:999px;padding:3px 8px;border:1px solid #9ecfd666;color:var(--cyan)}
.x-hit.theme{color:var(--muted);border-color:#617d84}
.x-because{font-size:12px;color:var(--cyan)}
.x-foot{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto}
.x-curated{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:#f5ee9e;border:1px solid #f5ee9e66;border-radius:999px;padding:3px 8px}
.x-house{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--cyan);border:1px solid #9ecfd666;border-radius:999px;padding:3px 8px}
.x-mark{background:#f5ee9e33;color:inherit;border-radius:3px;padding:0 2px}
.x-spot{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:4px 0 16px}
.x-door{text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:8px;min-height:208px;padding:16px 16px 14px;border-radius:16px;border:1px solid #345860;background:radial-gradient(90% 80% at 100% 0%,rgba(158,207,214,.13),transparent 52%),#0d1c22}
.x-door:hover{border-color:var(--cyan);background:#132a32}
.x-door.is-on{border-color:var(--cyan);box-shadow:inset 0 -2px 0 var(--yellow)}
.x-door .k{font-size:11px;letter-spacing:1.4px;color:var(--brand);font-weight:700}
.x-door-top{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.x-door-top strong{font-size:22px;letter-spacing:-.4px}
.x-door-n{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-door-q{color:var(--text);font-size:14px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:calc(1.45em * 3)}
.x-door-by{margin-top:auto;color:var(--faint);font-size:12px}
.x-tools{margin-top:4px}
@media(min-width:900px){
  .x-tools{position:sticky;top:64px;z-index:25;padding:8px 0 10px;background:#050a0ff2;backdrop-filter:blur(12px);border-bottom:1px solid #16262c}
}
.x-filters{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.x-filters .x-count{margin-left:6px;color:var(--faint);font-weight:500;font-variant-numeric:tabular-nums}
.x-filters .control.is-zero{opacity:.5}
.x-filters .control[aria-pressed="true"]{background:#203e47;color:#fff;border-color:#9ecfd6;box-shadow:inset 0 -2px 0 #f5ee9e;font-weight:600}
.x-live{font-size:13px;color:var(--muted);margin:8px 0 0;font-variant-numeric:tabular-nums}
.x-active{margin-top:8px}
.x-active:empty{display:none}
.x-empty{border:1px dashed #89aeb488;border-radius:16px;padding:28px 18px;text-align:center;background:#89aeb40a}
.x-empty p{color:var(--muted);line-height:1.5}
.x-empty .k{color:var(--text);font-weight:600;font-size:16px;margin-bottom:6px}
.x-suggest{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}
.x-says-h{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:8px}
.x-says-h .panel-h{margin:0}
.x-says-n{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-says .band{border-left:3px solid var(--cyan)}
.x-says .x-grid{margin-top:4px}
@media(min-width:980px){
  .x-says .x-card.is-lead,#x-grid .x-card.is-lead{grid-column:1 / -1}
}
.x-says .x-card:not(.is-lead) .x-text{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
@media(max-width:700px){
  .x-spot{grid-template-columns:1fr}
  .x-grid{grid-template-columns:1fr}
  .x-card time{white-space:normal}
  .x-door{min-height:0}
  .x-door-q{min-height:0}
}
@media(prefers-reduced-motion:reduce){
  .x-door{transition:none}
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
  const one = parts[0] || '?';
  return (one.length > 2 ? one[0] + one[one.length - 1] : one).toUpperCase();
}

function avatarColor(username) {
  let h = 0;
  const s = String(username || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR[h % AVATAR.length];
}

function isHouse(p) {
  return HOUSE.test(p?.username || '');
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
      || isHouse(p);
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
  if (who === 'house') return isHouse(p);
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

function highlightTerms(q) {
  const query = String(q || '').trim();
  if (query.length < 2) return [];
  const terms = [query];
  const add = (s) => {
    const t = String(s || '');
    if (t.length < 4 || !/[A-Za-zÆØÅæøå]/.test(t)) return;
    if (!terms.some((x) => x.toLowerCase() === t.toLowerCase())) terms.push(t);
  };
  const u = query.toUpperCase();
  for (const a of ALIAS[u] || []) add(a);
  for (const [k, arr] of Object.entries(ALIAS)) {
    if (k.toLowerCase() === query.toLowerCase() || arr.some((a) => a.toLowerCase() === query.toLowerCase())) {
      add(k);
      arr.forEach(add);
    }
  }
  return terms.sort((a, b) => b.length - a.length);
}

function highlight(text, q) {
  const safe = esc(text);
  const terms = highlightTerms(q);
  if (!terms.length) return safe;
  const needle = terms.map((t) => esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
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
  const house = isHouse(p) ? '<span class="x-house">NDI-konto</span>' : '';
  const hit = opt.hitKind === 'direct'
    ? '<span class="x-hit direct">Direkte træf</span>'
    : opt.hitKind === 'theme'
      ? '<span class="x-hit theme">Tema</span>'
      : '';
  const because = reasons.length ? `<span class="x-because">Vist fordi: ${reasons.map((r) => esc(r)).join(' · ')}</span>` : '';
  const why = (hit || because) ? `<p class="x-why">${hit}${because}</p>` : '';
  const cls = ['x-card', 'panel', opt.lead ? 'is-lead' : '', opt.hitKind === 'direct' ? 'is-direct' : ''].filter(Boolean).join(' ');
  return `<article class="${cls}">
  <header class="x-top">
    <span class="x-ava" style="background:${avatarColor(p.username)}" aria-hidden="true">${esc(initials(p))}</span>
    <div class="x-who">
      <strong>${esc(p.name || p.username)}</strong>
      <span>@${esc(p.username)}</span>
    </div>
    <time datetime="${esc(p.created_at)}">${esc(fmtXDate(p.created_at))}</time>
  </header>
  ${why}
  <p class="x-text">${highlight(p.text, opt.query)}</p>
  <p class="x-foot">
    <a class="outline-btn small" href="${esc(p.url)}" rel="noopener noreferrer" target="_blank">Åbn på X ↗</a>
    ${house}
    ${curated}
    ${tags}
  </p>
</article>`;
}

function feedHref({ tickers = [], themes = [] } = {}) {
  const tick = tickers.map((t) => String(t || '').toUpperCase()).filter(Boolean);
  const shortList = tick.length > 0 && tick.length <= 3;
  const family = new Set(tick.flatMap((t) => [t, ...(ALIAS[t] || [])]));
  const has = (keys) => keys.some((k) => family.has(k));
  if (shortList && has(['SOFTBANK', '9984.T', '9984', 'SFTBY'])) return 'ndi-paa-x.html?q=SoftBank';
  if (shortList && has(['NVDA', 'NVIDIA'])) return 'ndi-paa-x.html?q=NVDA';
  const themeHit = themes.map((t) => String(t || '').toLowerCase()).find((t) => t === 'ai' || X_FILTERS.some((f) => f.id === t));
  if (themeHit) {
    const id = themeHit === 'ai' ? 'chips' : themeHit;
    return `ndi-paa-x.html?f=${encodeURIComponent(id)}`;
  }
  const primary = shortList ? tickers[0] : ((themes && themes[0]) || (tickers && tickers[0]) || '');
  if (!primary) return 'ndi-paa-x.html';
  return `ndi-paa-x.html?q=${encodeURIComponent(primary)}`;
}

/**
 * Panel for company and theme pages.
 * No hits: returns '' so pages without a match stay quiet.
 * Pass showEmpty:true to render the empty state.
 */
export function xSaysPanel(pack, { tickers = [], themes = [], limit = 4, title = 'Hvad siger X', showEmpty = false } = {}) {
  ensureXStyles();
  if (!pack?.posts?.length) return '';
  const ranked = matchPosts(pack, { tickers, themes });
  const hits = ranked.slice(0, limit);
  const snap = esc(fmtXDate(pack.snapshotAt) || String(pack.snapshotAt || '').slice(0, 10));
  const more = feedHref({ tickers, themes });
  if (!hits.length) {
    if (!showEmpty) return '';
    return `<section class="panel x-says">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2></div>
  <p class="band">${esc(X_LABEL)}. Snapshot ${snap}.</p>
  <div class="x-empty">
    <p class="k">Ingen opslag i udsnittet</p>
    <p>Der er ikke et udvalgt opslag, der matcher dette selskab eller tema.</p>
    <p><a href="ndi-paa-x.html">Se hele feedet</a></p>
  </div>
</section>`;
  }
  const nLabel = ranked.length > hits.length
    ? `Viser ${hits.length} af ${ranked.length} opslag`
    : `${hits.length} opslag`;
  const cards = hits.map((h, i) => xCard(h.post, {
    reasons: h.reasons,
    lead: i === 0,
    hitKind: h.score >= 2 ? 'direct' : 'theme',
  })).join('');
  return `<section class="panel x-says">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2><span class="x-says-n">${nLabel}</span></div>
  <p class="band">${esc(X_LABEL)}. Snapshot ${snap}.</p>
  <div class="x-grid">${cards}</div>
  <p class="link-row" style="margin-top:12px"><a class="outline-btn small" href="${more}">Flere opslag i feedet →</a></p>
</section>`;
}
