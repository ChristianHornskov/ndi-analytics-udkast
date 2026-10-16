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
#spor{scroll-margin-top:76px}
@media(min-width:900px){#x-grid{scroll-margin-top:240px}}
@media(min-width:980px){.x-grid{grid-template-columns:1fr 1fr}}
.x-grid .x-card.panel{margin:0}
article.x-card{display:flex;flex-direction:column;gap:12px;min-width:0;padding:16px 16px 14px;background:radial-gradient(120% 90% at 0% 0%,rgba(158,207,214,.09),transparent 46%),linear-gradient(180deg,#16303a 0%,#102228 100%);border:1px solid #345860;border-radius:16px;box-shadow:0 14px 34px rgba(0,0,0,.22)}
article.x-card.is-direct{box-shadow:inset 3px 0 0 #9ecfd6,0 14px 34px rgba(0,0,0,.22)}
article.x-card.is-lead{border-color:#f5ee9e66;padding:18px 18px 16px;background:radial-gradient(90% 80% at 100% 0%,rgba(245,238,158,.14),transparent 46%),linear-gradient(180deg,#16303a 0%,#102228 100%)}
article.x-card.is-lead .x-text{font-size:clamp(18px,2vw,22px);line-height:1.45;letter-spacing:-.3px;max-width:68ch}
article.x-card.is-lead .x-because{color:#f5ee9e;font-size:13px}
article.x-card.is-quote{position:relative;border-color:#f5ee9e66;box-shadow:inset 3px 0 0 #f5ee9e,0 14px 34px rgba(0,0,0,.22);background:radial-gradient(90% 80% at 100% 0%,rgba(245,238,158,.14),transparent 46%),linear-gradient(180deg,#16303a 0%,#102228 100%)}
article.x-card.is-quote .x-quote{position:relative;margin:0;padding:2px 0 0 34px}
article.x-card.is-quote .x-qmark{position:absolute;left:0;top:-8px;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:46px;line-height:1;color:#f5ee9e;font-weight:500}
article.x-card.is-quote .x-text{font-size:clamp(18px,1.7vw,23px);line-height:1.4;letter-spacing:-.3px;max-width:68ch}
article.x-card.is-quote .x-by{display:flex;gap:10px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid #345860}
article.x-card.is-quote .x-by time{margin-left:auto}
article.x-card.is-quote .x-why{margin-top:8px}
article.x-card.is-quote .x-foot{margin-top:10px}
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
.x-foot a.tag.is-hit{border-color:#f5ee9eaa;color:#f5ee9e;background:#f5ee9e14}
.x-curated{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:#f5ee9e;border:1px solid #f5ee9e66;border-radius:999px;padding:3px 8px}
.x-house{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--cyan);border:1px solid #9ecfd666;border-radius:999px;padding:3px 8px}
.x-mark{background:#f5ee9e;color:#1c1604;border-radius:4px;padding:0 4px;font-weight:650}
.x-spot{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:4px 0 16px}
.x-door{text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:8px;min-height:208px;padding:16px 16px 14px;border-radius:16px;border:1px solid #345860;background:radial-gradient(90% 80% at 100% 0%,rgba(158,207,214,.13),transparent 52%),#0d1c22}
.x-door:hover{border-color:var(--cyan);background:#132a32}
.x-door.is-on{border-color:var(--cyan);box-shadow:inset 0 -2px 0 var(--yellow)}
.x-door.is-on .x-door-n{color:#f5ee9e}
.x-door .k{font-size:11px;letter-spacing:1.4px;color:var(--brand);font-weight:700}
.x-door-top{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.x-door-top strong{font-size:22px;letter-spacing:-.4px}
.x-door-n{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-door-score{display:flex;gap:10px;margin-left:auto;flex:none;align-items:flex-end}
.x-door-score span{display:flex;flex-direction:column;align-items:flex-end;min-width:0}
.x-door-score b{font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:34px;font-weight:500;line-height:.8;letter-spacing:-1px;color:#f5ee9e;font-variant-numeric:tabular-nums}
.x-door-score i{font-style:normal;margin-top:4px;font-size:9px;letter-spacing:.7px;text-transform:uppercase;color:var(--faint)}
.x-door-score b.is-theme{color:var(--muted);font-size:28px}
.x-door-q{color:var(--text);font-size:14px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:calc(1.45em * 3)}
.x-door-q::before{content:"„";color:#f5ee9e;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:22px;line-height:0;margin-right:5px}
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
.x-score-bar{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:flex-end;justify-content:space-between;margin:2px 0 10px;min-width:0}
.x-score{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:flex-end;min-width:0}
.x-score-n{min-width:44px}
.x-score-n b{display:block;font-size:clamp(28px,4vw,42px);line-height:.85;font-weight:600;letter-spacing:-1.2px;color:var(--cyan);font-variant-numeric:tabular-nums}
.x-score-n span{display:block;margin-top:4px;font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:var(--faint)}
.x-score-n.is-direct:not(.is-zero) b{color:#f5ee9e;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-weight:500}
.x-score-n.is-zero b{color:var(--faint);font-weight:500}
.x-says-h .x-score-n.is-out b,.x-says-h .x-score-n.is-all b{color:var(--faint);font-size:22px;font-family:inherit;font-weight:500}
.x-asof{color:var(--faint);font-size:12px;line-height:1.35;padding-bottom:2px;max-width:42ch}
.x-says-h .x-score-n b{font-size:clamp(26px,3vw,34px)}
.x-active{margin-top:8px}
.x-active:empty{display:none}
.x-empty{border:1px dashed #89aeb488;border-radius:16px;padding:28px 18px;text-align:center;background:#89aeb40a}
.x-empty p{color:var(--muted);line-height:1.5}
.x-empty .k{color:var(--text);font-weight:600;font-size:16px;margin-bottom:6px}
.x-suggest{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}
section.panel.x-says{background:transparent;border:0;border-top:1px solid #24383f;border-radius:0;padding:22px 0 4px;scroll-margin-top:76px}
.x-says-h{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:8px}
.x-says-h .panel-h{margin:0}
.x-says-n{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-says .band{border-left:3px solid var(--cyan)}
.x-says .x-grid{margin-top:4px}
@media(min-width:980px){
  .x-says .x-card.is-lead,#x-grid .x-card.is-lead{grid-column:1 / -1}
}
.x-says .x-card:not(.is-lead) .x-text{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.x-door.is-direct{box-shadow:inset 3px 0 0 #9ecfd6}
.x-door.is-theme{box-shadow:inset 3px 0 0 #617d84}
.x-door.is-direct.is-on{box-shadow:inset 3px 0 0 #9ecfd6,inset 0 -2px 0 var(--yellow)}
.x-door.is-theme.is-on{box-shadow:inset 3px 0 0 #617d84,inset 0 -2px 0 var(--yellow)}
.x-lane{margin-top:16px;min-width:0;border-left:3px solid transparent;padding-left:12px}
.x-lane.is-direct{border-left-color:#9ecfd6}
.x-lane.is-theme{border-left-color:#617d84}
.x-lane-h{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:baseline;margin:0 0 8px}
.x-lane-k{font-size:11px;letter-spacing:1.3px;font-weight:700;color:var(--cyan)}
.x-lane.is-theme .x-lane-k{color:var(--muted)}
.x-lane.is-curated{border-left-color:#f5ee9e}
.x-lane.is-house{border-left-color:#9ecfd6}
.x-lane.is-curated .x-lane-k{color:#f5ee9e}
.x-lane.is-house .x-lane-k{color:var(--cyan)}
.x-stage{min-width:0}
#x-grid > .x-stage{grid-column:1 / -1}
.x-empty .x-zero{font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;color:#f5ee9e;font-weight:500}
.x-lane-h span:last-child{color:var(--faint);font-size:12px}
.x-lane .x-grid{margin-top:0}
.x-lane.is-theme .x-card{background:linear-gradient(180deg,#12262c 0%,#0e1c21 100%);box-shadow:none}
.x-lane.is-theme .x-card.is-lead{background:radial-gradient(90% 80% at 100% 0%,rgba(245,238,158,.12),transparent 46%),linear-gradient(180deg,#12262c 0%,#0e1c21 100%)}
.x-lane .x-grid .x-card:only-child{grid-column:1 / -1}
#x-grid > .x-lane{grid-column:1 / -1}
@media(min-width:980px){
  #x-grid:not(:has(.is-lead)) > .x-card:last-child:nth-child(odd){grid-column:1 / -1}
}
.x-miss{font-size:12px;color:var(--faint);line-height:1.45;margin:10px 0 0}
.x-zero{font-size:40px;line-height:1;font-weight:600;letter-spacing:-1px;color:var(--cyan);margin:0 0 6px;font-variant-numeric:tabular-nums}
body.x-focused .x-door{min-height:0;padding:12px 14px 10px;gap:4px}
body.x-focused .x-door-q,body.x-focused .x-door-by{display:none}
body.x-focused .x-spot{margin-bottom:8px}
body.x-focused .x-filters{margin:4px 0}
body.x-focused .x-filters .control.is-zero:not(.active){display:none}
body.x-focused .x-tools{padding-top:4px;padding-bottom:6px}
@media(min-width:900px){
  body.x-focused #x-grid{scroll-margin-top:120px}
}
#x-grid > .x-score-bar{grid-column:1 / -1}
body.x-focused .x-intro,body.x-focused .x-snap,body.x-focused .x-jumps{display:none}
body.x-focused h1{font-size:28px;margin:0 0 6px}
body.x-focused .eyebrow{margin-bottom:2px}
body.x-focused .x-label{margin:0 0 8px}
@media(max-width:700px){
  .x-spot{grid-template-columns:1fr}
  .x-grid{grid-template-columns:1fr}
  .x-card time{white-space:normal}
  .x-door{min-height:0}
  .x-door-q{min-height:0}
  body.x-focused .x-spot{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:visible;gap:8px}
  body.x-focused .x-door{flex:none;min-width:0;padding:8px 8px 7px}
  body.x-focused .x-door .k,body.x-focused .x-door-n,body.x-focused .x-door-score{display:none}
  body.x-focused .x-door-top strong{font-size:13px;letter-spacing:-.2px}
  body.x-focused .x-tools{position:static;background:transparent;border-bottom:0;backdrop-filter:none}
  body.x-focused #x-grid{scroll-margin-top:0}
  body.x-focused main{display:flex;flex-direction:column}
  body.x-focused .eyebrow{order:1}
  body.x-focused h1{order:2;font-size:22px}
  body.x-focused .x-intro{order:3}
  body.x-focused .x-label{order:4}
  body.x-focused .x-snap{order:5}
  body.x-focused .x-spot{order:6}
  body.x-focused .x-jumps{order:7}
  body.x-focused #x-grid{order:8}
  body.x-focused .x-tools{order:9}
  body.x-focused .x-footwarn{order:10}
  body.x-focused .x-footlinks{order:11}
}
@media(prefers-reduced-motion:reduce){
  .x-door{transition:none}
}
body.x-focused .x-door-score{gap:8px;align-items:baseline}
body.x-focused .x-door-score span{flex-direction:row;gap:4px;align-items:baseline}
body.x-focused .x-door-score b,.body.x-focused .x-door-score b.is-theme{font-family:inherit;font-size:13px;font-weight:600;letter-spacing:0;line-height:1;color:var(--muted)}
body.x-focused .x-door-score i{margin-top:0;font-size:11px;letter-spacing:0;text-transform:none}
@media(min-width:900px){
  body.x-focused .x-spot{margin-bottom:4px}
  body.x-focused .x-door{padding:8px 12px 7px}
  body.x-focused .x-tools{
    display:grid;
    grid-template-columns:minmax(0,1fr) auto;
    column-gap:12px;
    row-gap:6px;
    align-items:center;
    padding-top:2px;
    padding-bottom:4px;
  }
  body.x-focused .x-tools .filters{grid-column:1;grid-row:1;margin:0;min-width:0}
  body.x-focused .x-tools .filters input[type=search]{width:100%;min-width:0}
  body.x-focused #x-who{grid-column:2;grid-row:1;margin:0;flex-wrap:nowrap}
  body.x-focused #x-f{grid-column:1 / -1;grid-row:2;margin:0}
  body.x-focused #x-live{grid-column:1 / -1;margin:0}
  body.x-focused #x-active{grid-column:1 / -1;margin-top:0}
  body.x-focused #x-live.is-echo{
    position:absolute;top:0;left:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
    clip:rect(0,0,0,0);white-space:nowrap;border:0;pointer-events:none;
  }
  body.x-focused #x-active.is-echo{display:none}
}
`;
  document.head.appendChild(s);
}

if (typeof document !== 'undefined') ensureXStyles();

/** Company and theme pages insert the panel after fetch. Honour #hvad-siger-x. */
function followPanelHash() {
  if (typeof location === 'undefined' || location.hash !== '#hvad-siger-x') return;
  const go = () => {
    const el = document.getElementById('hvad-siger-x');
    if (!el) return false;
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    return true;
  };
  const watch = () => {
    if (go()) return;
    const root = document.body;
    if (!root) return;
    const obs = new MutationObserver(() => { if (go()) obs.disconnect(); });
    obs.observe(root, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 10000);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
}
followPanelHash();

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

/**
 * Keep ranking (score, then date). On a theme basket, keep one slot for a
 * theme-only hit so NVDA/SoftBank do not hide the tema-lane.
 * Company pages pass one ticker plus a name (length ≤ 2) and do not reserve.
 */
export function arrangeHits(ranked, limit, { reserveTheme = false } = {}) {
  const cap = Math.max(0, Number(limit) || 0);
  const direct = ranked.filter((h) => h.score >= 2);
  const theme = ranked.filter((h) => h.score < 2);
  if (reserveTheme && direct.length && theme.length && cap >= 2) {
    const directTake = direct.slice(0, Math.min(direct.length, cap - 1));
    const themeTake = theme.slice(0, cap - directTake.length);
    return { direct: directTake, theme: themeTake, total: ranked.length };
  }
  const slice = ranked.slice(0, cap);
  return {
    direct: slice.filter((h) => h.score >= 2),
    theme: slice.filter((h) => h.score < 2),
    total: ranked.length,
  };
}

/** Feed badge. Query uses the same ticker match as the company panel. */
export function feedHitKind(p, { q = '', f = 'all' } = {}) {
  const query = String(q || '').trim();
  if (query) {
    const hit = matchPosts({ posts: [p] }, { tickers: [query] })[0];
    if (hit?.score >= 2) return 'direct';
    if (hit) return 'theme';
    return '';
  }
  if (!f || f === 'all' || f === 'ndi') return '';
  const themes = f === 'chips' ? ['chips', 'ai'] : [f];
  const tickers = f === 'chips' ? ['NVDA'] : [];
  const hit = matchPosts({ posts: [p] }, { tickers, themes })[0];
  if (!hit) return '';
  return hit.score >= 2 ? 'direct' : 'theme';
}

function markTerm(hit) {
  if (!hit || hit.score < 2) return '';
  return (hit.reasons || []).find((r) => /^(SoftBank|NVDA)$/i.test(String(r))) || '';
}

export function xScoreHtml(items) {
  const cells = (items || []).map((it) => {
    const n = Number(it.n) || 0;
    const zero = n === 0 ? ' is-zero' : '';
    const mod = it.mod ? ` ${it.mod}` : '';
    return `<div class="x-score-n${mod}${zero}"><b>${n}</b><span>${esc(it.label)}</span></div>`;
  }).join('');
  return `<div class="x-score">${cells}</div>`;
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

export function highlightHtml(text, q) {
  return highlight(text, q);
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
  const hitTerms = highlightTerms(opt.query).map((t) => t.toLowerCase());
  const tagCls = (label) => (hitTerms.includes(String(label).toLowerCase()) ? ' tag is-hit' : ' tag');
  const tags = [
    ...(p.tickers || []).slice(0, 4).map((t) => `<a class="${tagCls(t).trim()}" href="${esc(tickerHref(t))}">${esc(t)}</a>`),
    ...(p.tags || []).slice(0, 3).map((t) => `<a class="${tagCls(t).trim()}" href="${esc(tagHref(t))}">${esc(t)}</a>`),
  ].join('');
  const curated = p.curatedFrom === 'mads_following' ? '<span class="x-curated" title="Fra en konto NDI følger — ikke NDI\'s holdning">Fulgt konto</span>' : '';
  const house = isHouse(p) ? '<span class="x-house">NDI-konto</span>' : '';
  const hit = opt.hitKind === 'direct'
    ? '<span class="x-hit direct">Direkte træf</span>'
    : opt.hitKind === 'theme'
      ? '<span class="x-hit theme">Tema</span>'
      : '';
  const because = reasons.length ? `<span class="x-because">Vist fordi: ${reasons.map((r) => esc(r)).join(' · ')}</span>` : '';
  const why = (hit || because) ? `<p class="x-why">${hit}${because}</p>` : '';
  const cls = ['x-card', 'panel', opt.lead ? 'is-lead is-quote' : '', opt.hitKind === 'direct' ? 'is-direct' : ''].filter(Boolean).join(' ');
  const foot = `<p class="x-foot">
    <a class="outline-btn small" href="${esc(p.url)}" rel="noopener noreferrer" target="_blank">Åbn på X ↗</a>
    ${house}
    ${curated}
    ${tags}
  </p>`;
  const text = `<p class="x-text">${highlight(p.text, opt.query)}</p>`;
  if (opt.lead) {
    return `<article class="${cls}">
  <blockquote class="x-quote">
    <span class="x-qmark" aria-hidden="true">„</span>
    ${text}
  </blockquote>
  <div class="x-by">
    <span class="x-ava" style="background:${avatarColor(p.username)}" aria-hidden="true">${esc(initials(p))}</span>
    <div class="x-who">
      <strong>${esc(p.name || p.username)}</strong>
      <span>@${esc(p.username)}</span>
    </div>
    <time datetime="${esc(p.created_at)}">${esc(fmtXDate(p.created_at))}</time>
  </div>
  ${why}
  ${foot}
</article>`;
  }
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
  ${text}
  ${foot}
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
  const reserveTheme = (tickers || []).filter(Boolean).length > 2;
  const view = arrangeHits(ranked, limit, { reserveTheme });
  const shown = view.direct.length + view.theme.length;
  const snap = esc(fmtXDate(pack.snapshotAt) || String(pack.snapshotAt || '').slice(0, 10));
  const more = feedHref({ tickers, themes });
  const directAll = ranked.filter((h) => h.score >= 2).length;
  const themeAll = ranked.filter((h) => h.score < 2).length;
  const themeLeft = themeAll - view.theme.length;
  const directLeft = directAll - view.direct.length;
  const scoreItems = [
    { n: view.direct.length, label: 'direkte', mod: 'is-direct' },
    { n: view.theme.length, label: 'tema', mod: 'is-theme' },
  ];
  if (themeLeft > 0) scoreItems.push({ n: themeLeft, label: 'udeladt', mod: 'is-out' });
  else if (directLeft > 0) scoreItems.push({ n: ranked.length, label: 'i alt', mod: 'is-all' });
  const score = xScoreHtml(scoreItems);
  if (!shown) {
    if (!showEmpty) return '';
    return `<section class="panel x-says" id="hvad-siger-x">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2>${xScoreHtml([{ n: 0, label: 'direkte', mod: 'is-direct' }, { n: 0, label: 'tema', mod: 'is-theme' }])}</div>
  <p class="band">${esc(X_LABEL)}. Snapshot ${snap}.</p>
  <div class="x-empty">
    <p class="x-zero" aria-hidden="true">0</p>
    <p class="k">Ingen opslag i udsnittet</p>
    <p>Der er ikke et udvalgt opslag, der matcher dette selskab eller tema.</p>
    <p><a href="ndi-paa-x.html">Se hele feedet</a></p>
  </div>
</section>`;
  }
  const bits = [];
  if (view.direct.length) bits.push(`${view.direct.length} direkte`);
  if (view.theme.length) bits.push(`${view.theme.length} tema`);
  const nLabel = ranked.length > shown
    ? `Viser ${bits.join(' og ')} · ${ranked.length} i alt`
    : bits.join(' og ');
  const leadHit = view.direct[0] || view.theme[0];
  const leadKind = view.direct.length ? 'direct' : 'theme';
  const restDirect = view.direct.length ? view.direct.slice(1) : [];
  const restTheme = view.direct.length ? view.theme : view.theme.slice(1);
  const quote = `<div class="x-stage">${xCard(leadHit.post, {
    reasons: leadHit.reasons,
    lead: true,
    hitKind: leadKind,
    query: markTerm(leadHit),
  })}</div>`;
  const lane = (kind, hits) => {
    if (!hits.length) return '';
    const quotedTheme = !view.direct.length;
    const kicker = kind === 'direct' ? 'Øvrige direkte træf' : (quotedTheme ? 'Øvrige tema' : 'Tema');
    const hint = kind === 'direct'
      ? 'Nævner selskab eller ticker.'
      : 'Rammer temaet. Ikke en ticker fra udsnittet.';
    const cards = hits.map((h) => xCard(h.post, {
      reasons: h.reasons,
      hitKind: kind,
      query: markTerm(h),
    })).join('');
    return `<div class="x-lane ${kind === 'direct' ? 'is-direct' : 'is-theme'}">
  <p class="x-lane-h"><span class="x-lane-k">${kicker}</span><span>${hint}</span></p>
  <div class="x-grid">${cards}</div>
</div>`;
  };
  const miss = view.direct.length && !view.theme.length && themeLeft > 0
    ? '<p class="x-miss">Kun direkte træf i dette udsnit. Opslag, der bare deler tema, er udeladt, så navnet står først.</p>'
    : !view.direct.length
      ? `<p class="x-miss">Ingen opslag i udsnittet nævner selskabet eller tickeren. ${restTheme.length ? 'Kortene er tema.' : 'Kortet er tema.'}</p>`
      : '';
  return `<section class="panel x-says" id="hvad-siger-x">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2>${score}</div>
  <p class="sr-only">${esc(nLabel)}</p>
  <p class="band">${esc(X_LABEL)}. Snapshot ${snap}.</p>
  ${quote}
  ${lane('direct', restDirect)}
  ${lane('theme', restTheme)}
  ${miss}
  <p class="link-row" style="margin-top:12px"><a class="outline-btn small" href="${more}">Flere opslag i feedet →</a></p>
</section>`;
}
