/** Shared X card renderer. Own UI, static snapshot only. No embed script, no X API from the browser. */
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const X_LABEL = "Udvalgte offentlige opslag — ikke NDI's holdning";

const AVATAR = ['#9ecfd6', '#89aeb4', '#d5e4e7', '#e7d4d8', '#b7d4dc'];
const STOP = new Set(['GROUP', 'HOLDINGS', 'HOLDING', 'INC', 'CORP', 'LTD', 'PLC', 'CLASS', 'THE', 'AND', 'ADR']);
const HOUSE = /^(InvestNewdeal|CHornskov|MadsC007|jesper_baek)$/;
const cardMeta = new Map();

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
.x-filters .control{display:inline-flex;flex-direction:column;align-items:stretch;justify-content:center;gap:3px;padding-top:4px;padding-bottom:5px;line-height:1.15}
.x-filters .x-flab{display:flex;align-items:baseline}
.x-filters .x-count{margin-left:6px;color:var(--faint);font-weight:500;font-variant-numeric:tabular-nums}
.x-filters .control.is-zero{opacity:.5}
.x-filters .control[aria-pressed="true"]{background:#203e47;color:#fff;border-color:#9ecfd6;box-shadow:inset 0 -2px 0 #f5ee9e;font-weight:600}
.x-meter{display:block;height:3px;width:52px;max-width:100%;border-radius:99px;background:#0b171d;overflow:hidden;border:1px solid #24383f}
.x-meter i{display:block;height:100%;background:#617d84;border-radius:99px}
.x-filters .control[aria-pressed="true"] .x-meter i{background:#f5ee9e}
.x-filters .control.is-zero .x-meter i{width:0 !important}
.x-empty-meter{display:flex;align-items:center;justify-content:center;gap:10px;margin:12px 0 0;color:var(--faint);font-size:13px;font-variant-numeric:tabular-nums}
.x-empty-meter .x-meter{width:120px}
.x-says-h{flex-wrap:wrap}
.x-says-tools{display:flex;align-items:flex-end;gap:10px;margin-left:auto}
.x-feed-aside{display:flex;flex-direction:column;align-items:flex-end;min-width:68px;padding:6px 10px 5px;border:1px dashed #f5ee9e66;border-radius:12px;background:#f5ee9e0d}
.x-feed-aside b{font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:28px;font-weight:500;line-height:.85;letter-spacing:-.6px;color:#f5ee9e;font-variant-numeric:tabular-nums}
.x-feed-aside span{margin-top:4px;font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--muted)}
.x-feed-aside small{font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--faint)}
.x-live{font-size:13px;color:var(--muted);margin:2px 0 0;font-variant-numeric:tabular-nums}
.x-score-bar{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:flex-start;gap:10px 18px;margin:2px 0 10px;min-width:0;padding-left:12px;box-shadow:inset 3px 0 0 #f5ee9e}
.x-score{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:flex-end;min-width:0}
.x-score-n{min-width:44px}
.x-score-n b{display:block;font-size:clamp(28px,4vw,42px);line-height:.85;font-weight:600;letter-spacing:-1.2px;color:var(--cyan);font-variant-numeric:tabular-nums}
.x-score-n span{display:block;margin-top:4px;font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:var(--faint)}
.x-score-n.is-direct:not(.is-zero) b{color:#f5ee9e;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-weight:500}
.x-score-n.is-zero b{color:var(--faint);font-weight:500}
.x-says-h .x-score-n.is-out b,.x-says-h .x-score-n.is-all b{color:var(--faint);font-size:22px;font-family:inherit;font-weight:500}
.x-asof{color:var(--faint);font-size:13.5px;line-height:1.35;padding-bottom:2px;max-width:58ch;display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left}
.x-who-say{color:var(--text)}
.x-snap-mini{color:var(--faint)}
.x-prov{display:flex;flex-direction:column;align-items:stretch;flex:none;border:1px solid #345860;border-radius:12px;overflow:hidden;background:#0b171d}
.x-prov-nums{display:flex}
.x-prov .x-score-n{min-width:68px;padding:7px 12px 6px}
.x-prov .x-score-n + .x-score-n{border-left:1px solid #345860}
.x-prov .x-score-n b{font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:28px;font-weight:500;letter-spacing:-.6px;line-height:.85}
.x-prov .x-score-n.is-house:not(.is-zero) b{color:var(--cyan)}
.x-prov .x-score-n.is-curated:not(.is-zero){background:#f5ee9e12}
.x-prov .x-score-n.is-curated:not(.is-zero) b{color:#f5ee9e}
.x-prov .x-score-n.is-house.is-zero b{color:#c5d6db}
.x-prov-k{display:block;padding:0 8px 5px;font-size:10px;letter-spacing:.5px;text-transform:uppercase;color:var(--faint);text-align:center}
.x-door-who{display:block;margin-top:2px;font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}
.x-door-who b{font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-weight:500;font-size:18px;letter-spacing:-.4px;color:#f5ee9e}
.x-door-who b.is-zero{color:#c5d6db}
body.x-focused .x-door-who{display:none}
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
  .x-score-bar{display:grid;grid-template-columns:auto auto minmax(0,1fr);grid-template-areas:"n p s" "w w w";column-gap:12px;row-gap:4px;align-items:end;padding-left:10px}
  .x-score{grid-area:n}
  .x-prov{grid-area:p}
  .x-asof{display:contents;max-width:none}
  .x-snap-mini{grid-area:s;justify-self:end;align-self:end}
  .x-who-say{grid-area:w;position:static;width:auto;height:auto;margin:0;padding:0;overflow:hidden;clip:auto;white-space:normal;border:0;color:var(--text);font-size:13px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  article.x-card.is-quote,article.x-card.is-slip{padding:12px 14px 10px}
  article.x-card.is-quote .x-by,article.x-card.is-slip .x-by{margin-top:10px;padding-top:8px}
  article.x-card.is-quote .x-foot,article.x-card.is-slip .x-foot{margin-top:8px}
  .x-prov .x-score-n{min-width:54px;padding:5px 8px 4px}
  .x-prov .x-score-n b{font-size:22px}
  .x-feed-aside{min-width:56px;padding:4px 8px 4px}
  .x-feed-aside b{font-size:22px}
  .x-meter{width:40px}
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
.x-split{display:flex;flex-direction:column;gap:0;min-width:0}
#x-grid > .x-split{grid-column:1 / -1}
.x-split-main,.x-split-side{min-width:0}
.x-split-side .x-lane{margin-top:0;border-left:0;padding-left:0}
@media(min-width:980px){
  #x-grid > .x-split,.x-says > .x-split{display:grid;grid-template-columns:minmax(0,1.38fr) minmax(270px,.84fr);gap:0 16px;align-items:start}
  .x-split-side .x-grid{grid-template-columns:1fr}
  .x-says > .x-split{margin-top:4px}
}
.x-lane.is-rail{border-left:0;padding-left:0}
.x-lane.is-rail .x-grid{position:relative;display:flex;flex-direction:column;gap:0;margin-top:2px}
.x-lane.is-rail .x-grid::before{content:"";position:absolute;left:79px;top:7px;bottom:16px;width:1px;background:linear-gradient(#f5ee9e,#345860);pointer-events:none}
.x-lane.is-theme.is-rail .x-grid::before{background:#617d84}
article.x-card.is-rail{display:grid;grid-template-columns:72px minmax(0,1fr);column-gap:14px;align-items:start;position:relative;padding:0 0 12px;margin:0;background:transparent;border:0;border-radius:0;box-shadow:none}
article.x-card.is-rail .x-rail-when time{display:block;margin:0;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:18px;font-weight:500;letter-spacing:-.4px;line-height:1;color:#f5ee9e;white-space:nowrap}
article.x-card.is-rail .x-rail-when span{display:block;margin-top:4px;font-size:11px;color:var(--faint);font-variant-numeric:tabular-nums}
.x-lane.is-theme.is-rail article.x-card.is-rail .x-rail-when time{color:#c5d6db}
article.x-card.is-rail .x-dot{position:absolute;left:75px;top:5px;width:9px;height:9px;border-radius:50%;background:#f5ee9e;box-shadow:0 0 0 3px var(--bg);z-index:1}
.x-lane.is-theme.is-rail article.x-card.is-rail .x-dot{background:#9eb4ba}
article.x-card.is-rail .x-rail-body{min-width:0;padding-top:0}
article.x-card.is-rail .x-rail-who{display:flex;gap:6px;align-items:baseline;min-width:0}
article.x-card.is-rail .x-rail-who strong{font-size:13px;letter-spacing:-.2px;white-space:nowrap}
article.x-card.is-rail .x-rail-who span{color:var(--faint);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
article.x-card.is-rail .x-text{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal;font-size:13.5px;line-height:1.35;margin-top:3px}
article.x-card.is-rail .x-foot{margin-top:6px;gap:6px}
article.x-card.is-rail .x-foot .outline-btn.small{min-height:28px;padding:4px 8px}
.x-lane.is-theme article.x-card.is-rail{background:transparent;box-shadow:none}
.x-lane.is-film{border-left:0;padding-left:0;margin-top:10px}
#x-grid > .x-lane.is-film,.x-says > .x-lane.is-film{grid-column:1 / -1}
.x-lane.is-film .x-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));gap:8px;margin-top:0}
article.x-card.is-film{display:flex;flex-direction:column;gap:0;align-items:stretch;min-width:0;margin:0;padding:10px 12px 9px;background:#0b171d;border:1px solid #345860;border-top:3px solid #f5ee9e;border-radius:12px;box-shadow:none}
.x-lane.is-theme.is-film article.x-card.is-film{border-top-color:#9eb4ba;background:#0e1c21}
article.x-card.is-film time{display:block;margin:0;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:22px;font-weight:500;letter-spacing:-.5px;line-height:1;color:#f5ee9e;white-space:nowrap}
.x-lane.is-theme.is-film article.x-card.is-film time{color:#c5d6db}
article.x-card.is-film .x-film-y{display:block;margin:2px 0 6px;font-size:11px;color:var(--faint);font-variant-numeric:tabular-nums}
article.x-card.is-film .x-film-top{display:flex;gap:6px;align-items:center;min-width:0}
article.x-card.is-film .x-film-who{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit;text-decoration:none;font-size:13px;font-weight:650;letter-spacing:-.2px}
article.x-card.is-film .x-film-who:hover{color:var(--cyan)}
article.x-card.is-film .x-curated,article.x-card.is-film .x-house{flex:none;padding:2px 6px}
.x-says article.x-card.is-film .x-text,#x-grid article.x-card.is-film .x-text{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal;font-size:12.5px;line-height:1.35;margin:6px 0 0}
article.x-card.is-film .x-why{margin:6px 0 0;font-size:11px}
@media(max-width:700px){
  .x-lane.is-film .x-grid{grid-template-columns:1fr 1fr}
}
.x-no-direct{border:1px dashed #89aeb488;border-radius:16px;padding:16px 16px 14px;margin:0 0 12px;background:#0b171d}
.x-no-direct .k{margin:0 0 6px;color:var(--text);font-weight:650;font-size:16px}
.x-no-direct p{margin:0;color:var(--muted);line-height:1.45;font-size:14px}
article.x-card.is-slip{border-color:#345860;box-shadow:inset 3px 0 0 #9ecfd6,0 14px 34px rgba(0,0,0,.22);background:linear-gradient(180deg,#16303a 0%,#102228 100%)}
article.x-card.is-slip .x-slip{margin:0;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:clamp(26px,3vw,40px);font-weight:500;letter-spacing:-.8px;line-height:1.05;color:#f5ee9e}
article.x-card.is-slip .x-slip .x-mark{font-size:.72em;vertical-align:2px}
article.x-card.is-slip .x-by{display:flex;gap:10px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid #345860}
article.x-card.is-slip .x-by time{margin-left:auto}
article.x-card.is-slip .x-foot{margin-top:10px}
button.x-pick{display:block;width:100%;margin:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:8px}
button.x-pick.x-rail-when{width:auto}
button.x-pick:hover time{text-decoration:underline;text-underline-offset:3px}
button.x-pick:focus-visible{outline:2px solid #f5ee9e;outline-offset:3px}
.x-lane-h .x-lane-hint,.x-lane-n{color:var(--faint);font-size:12px;font-weight:400;letter-spacing:0}
.x-stage.x-picked{margin-top:10px}
.x-by-when{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:2px;min-width:0}
article.x-card.is-quote .x-by-when time,article.x-card.is-slip .x-by-when time{margin-left:0;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:16px;font-weight:500;letter-spacing:-.3px;line-height:1;color:#f5ee9e}
.x-now{font-style:normal;font-size:10px;letter-spacing:.7px;text-transform:uppercase;font-weight:700;line-height:1.15;color:#f5ee9e;white-space:nowrap}
.x-door kbd{font-family:inherit;font-size:10px;font-weight:650;letter-spacing:0;line-height:1.2;border:1px solid #345860;border-bottom-width:2px;border-radius:4px;padding:0 4px;margin-left:6px;color:#f5ee9e;background:#0b171d}
article.x-card.is-lead:focus{outline:none}
article.x-card.is-lead:focus-visible{outline:2px solid #f5ee9e;outline-offset:3px}
article.x-card.is-flash{box-shadow:inset 3px 0 0 #f5ee9e,0 0 0 1px #f5ee9e}
.x-spine{display:grid;grid-template-columns:auto minmax(0,1fr) auto;column-gap:10px;row-gap:4px;align-items:center;min-width:0}
.x-spine.is-home{margin:0 0 12px}
#x-grid > .x-spine,.x-says > .x-spine{grid-column:1 / -1;margin:0 0 2px}
#x-grid > .x-spine .x-spine-track,.x-says > .x-spine .x-spine-track{height:18px}
#x-grid > .x-empty{grid-column:1 / -1}
.x-spine-end{font-size:11px;color:var(--faint);white-space:nowrap;font-variant-numeric:tabular-nums}
.x-spine-track{position:relative;height:28px;min-width:0}
.x-spine-track::before{content:"";position:absolute;left:9px;right:9px;top:50%;height:2px;margin-top:-1px;border-radius:99px;background:#24383f}
.x-spine-dot{position:absolute;top:calc(50% + var(--lane, 0) * 6px);left:calc(9px + (100% - 18px) * var(--p));width:18px;height:18px;margin:0;padding:0;border:0;border-radius:50%;transform:translate(-50%,-50%);background:transparent;z-index:1}
.x-spine-dot::after{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;border-radius:50%;transform:translate(-50%,-50%);background:#617d84}
a.x-spine-dot{text-decoration:none}
.x-spine-dot.is-house::after{background:#9ecfd6}
.x-spine-dot.is-curated:not(.is-ghost)::after{background:#f5ee9e}
.x-spine-dot.is-ghost::after{width:7px;height:7px;background:transparent;box-shadow:inset 0 0 0 1.5px #617d84}
.x-spine-dot.is-ghost.is-curated::after{box-shadow:inset 0 0 0 1.5px #f5ee9e}
.x-spine-dot.is-now{z-index:2}
.x-spine-dot.is-now::after{width:11px;height:11px;box-shadow:0 0 0 2px #050a0f,0 0 0 4px #f5ee9e}
button.x-spine-dot:focus-visible,a.x-spine-dot:focus-visible{outline:2px solid #f5ee9e;outline-offset:2px}
button.x-spine-dot:hover::after,a.x-spine-dot:hover::after{transform:translate(-50%,-50%) scale(1.15)}
.x-spine-key{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0;font-size:11px;line-height:1.3;color:var(--faint)}
.x-spine-key i{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.x-spine-key i.is-house{background:#9ecfd6}
.x-spine-key i.is-curated{background:#f5ee9e;margin-left:8px}
body.x-focused .x-spine.is-home{display:none}
@media(max-width:700px){
  .x-spine-end{font-size:10px}
  .x-spine{column-gap:6px}
}
@media(prefers-reduced-motion:reduce){
  button.x-spine-dot:hover::after,a.x-spine-dot:hover::after{transform:translate(-50%,-50%)}
}
.x-atlas{margin:0 0 14px;padding:12px 12px 10px;border:1px solid #345860;border-radius:16px;background:radial-gradient(120% 80% at 0% 0%,rgba(158,207,214,.1),transparent 46%),#0d1c22;min-width:0}
.x-atlas.is-home{margin:0 0 12px}
.x-atlas-top{display:flex;justify-content:space-between;gap:8px 14px;align-items:baseline;flex-wrap:wrap;margin:0 0 8px}
.x-atlas-top .k{margin:0;font-size:11px;letter-spacing:1.4px;color:var(--brand);font-weight:700}
.x-atlas-top p{margin:0;color:var(--faint);font-size:12px;line-height:1.35}
.x-atlas-context{display:grid;grid-template-columns:auto minmax(0,1fr) auto;column-gap:8px;align-items:center;margin:0 0 6px}
.x-atlas-end{font-size:11px;color:var(--faint);font-variant-numeric:tabular-nums;white-space:nowrap}
.x-atlas-line,.x-atlas-plot{position:relative;min-width:0}
.x-atlas-line{height:16px}
.x-atlas-line::before,.x-atlas-plot::before{content:"";position:absolute;left:8px;right:8px;top:50%;height:2px;margin-top:-1px;border-radius:99px;background:#24383f}
.x-atlas-zoom,.x-atlas-out{margin:0 0 6px;font-size:12px;color:var(--muted);line-height:1.35}
.x-atlas-band{margin:8px 0 2px;font-size:10px;letter-spacing:1.1px;text-transform:uppercase;color:var(--faint);font-weight:700}
.x-atlas-band:first-child{margin-top:0}
.x-atlas-row{display:grid;grid-template-columns:minmax(0,118px) minmax(0,1fr);gap:8px;align-items:center}
.x-atlas.is-compact .x-atlas-row{grid-template-columns:minmax(0,92px) minmax(0,1fr);gap:6px}
.x-atlas-name{appearance:none;width:100%;display:flex;gap:4px;align-items:baseline;border:0;background:transparent;color:var(--muted);font:inherit;font-size:12px;line-height:1.2;text-align:left;padding:2px 0;cursor:pointer;min-width:0}
.x-atlas-name span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.x-atlas-name b{flex:none;font-weight:500;color:var(--faint);font-variant-numeric:tabular-nums}
.x-atlas-row.is-house .x-atlas-name{color:#c5e6ea}
.x-atlas-row.is-curated .x-atlas-name{color:#f5ee9e}
.x-atlas-name[aria-pressed="true"]{color:var(--text);box-shadow:inset 2px 0 0 #f5ee9e;padding-left:6px}
.x-atlas-name:hover{color:var(--text)}
.x-atlas-dot{position:absolute;width:16px;height:16px;margin:0;padding:0;border:0;border-radius:50%;background:transparent;transform:translate(-50%,-50%);top:calc(50% + var(--lane, 0) * 8px);left:calc(8px + (100% - 16px) * var(--p));z-index:1}
.x-atlas-line .x-atlas-dot{top:50%}
.x-atlas-dot::after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;transform:translate(-50%,-50%);background:#617d84}
.x-atlas-dot.is-house::after{background:#9ecfd6}
.x-atlas-dot.is-curated::after{background:#f5ee9e}
.x-atlas-dot.is-ghost::after{width:7px;height:7px;background:transparent;box-shadow:inset 0 0 0 1.5px #617d84}
.x-atlas-dot.is-ghost.is-house::after{box-shadow:inset 0 0 0 1.5px #9ecfd6}
.x-atlas-dot.is-ghost.is-curated::after{box-shadow:inset 0 0 0 1.5px #f5ee9e}
.x-atlas-dot.is-now{z-index:3}
.x-atlas-dot.is-now::after{width:10px;height:10px;box-shadow:0 0 0 2px #0d1c22,0 0 0 3.5px #f5ee9e}
button.x-atlas-dot{cursor:pointer}
button.x-atlas-dot:focus-visible,.x-atlas-name:focus-visible{outline:2px solid #f5ee9e;outline-offset:2px}
button.x-atlas-dot:hover::after{transform:translate(-50%,-50%) scale(1.15)}
.x-atlas-key{display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;margin:8px 0 0;font-size:11px;line-height:1.35;color:var(--faint)}
.x-atlas-key i{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.x-atlas-key i.is-house{background:#9ecfd6}
.x-atlas-key i.is-curated{background:#f5ee9e}
.x-atlas-key i.is-ghost{background:transparent;box-shadow:inset 0 0 0 1.5px #f5ee9e}
#x-grid > .x-split .x-atlas{margin:0 0 10px}
.x-voices{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 10px}
.x-voice{appearance:none;display:flex;flex-direction:column;align-items:flex-start;width:100%;text-align:left;border:1px solid #345860;border-radius:14px;background:#0b171d;color:inherit;font:inherit;padding:8px 10px 9px;min-width:0}
button.x-voice{cursor:pointer}
.x-voice.is-house{box-shadow:inset 3px 0 0 #9ecfd6}
.x-voice.is-curated{box-shadow:inset 3px 0 0 #f5ee9e}
.x-voice.is-zero{border-style:dashed}
.x-voice[aria-pressed="true"]{background:#f5ee9e14}
.x-voice .k{display:block;font-size:10px;letter-spacing:1.1px;text-transform:uppercase;color:var(--brand);font-weight:700}
.x-voice b{display:block;font-family:Georgia,"Iowan Old Style","Palatino Linotype",serif;font-size:32px;font-weight:500;letter-spacing:-.8px;line-height:.9;color:var(--text);margin:3px 0 4px}
.x-voice.is-zero b{color:#f5ee9e}
.x-voice p{margin:0;font-size:12px;line-height:1.35;color:var(--muted)}
.x-voice small{display:block;margin-top:5px;font-size:11px;line-height:1.35;color:var(--faint)}
.x-voice:focus-visible{outline:2px solid #f5ee9e;outline-offset:2px}
.x-voices-other{margin:-2px 0 10px;font-size:12px;line-height:1.35;color:var(--muted)}
.x-says .x-split-side .x-voice{margin:0}
@media(max-width:700px){
  .x-atlas{padding:10px}
  .x-atlas-row,.x-atlas.is-compact .x-atlas-row{grid-template-columns:minmax(0,86px) minmax(0,1fr)}
  .x-atlas-name{font-size:11px}
  .x-atlas-end{font-size:10px}
  .x-voices{grid-template-columns:1fr}
  .x-voice b{font-size:28px}
}
@media(prefers-reduced-motion:reduce){
  button.x-atlas-dot:hover::after{transform:translate(-50%,-50%)}
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
bindXPick();

export async function loadXPosts() {
  ensureXStyles();
  try {
    const r = await fetch('data/x-posts.json');
    if (!r.ok) return null;
    const pack = await r.json();
    const posts = (pack.posts || []).filter((p) => !revealsHoldings(p.text));
    const chartMarkers = (pack.chartMarkers || []).filter(
      (m) => chartMarkerIsInvestNewdeal(m) && !revealsHoldings(m.text),
    );
    return { ...pack, posts, chartMarkers };
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

function fmtXParts(iso) {
  const full = fmtXDate(iso);
  const m = String(full).match(/^(.*)\s(\d{4})$/);
  if (!m) return { label: full || '—', year: '' };
  return { label: m[1], year: m[2] };
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

/** Posts that disclose fund holdings (e.g. "også i $PMINDI") must not ship. */
export function revealsHoldings(text) {
  const t = String(text || '');
  if (/ogs[aå] i \$PMINDI/i.test(t)) return true;
  if (/begge er ogs[aå] i \$PMINDI/i.test(t)) return true;
  if (/\$PMINDI/i.test(t) && /(holder|beholdning|vi ejer|i fonden|position(?:en|erne)?)/i.test(t)) return true;
  return false;
}

export function isInvestNewdeal(p) {
  return String(p?.username || '').toLowerCase() === 'investnewdeal';
}

export function chartMarkerIsInvestNewdeal(m) {
  const title = String(m?.title || '');
  const url = String(m?.url || '');
  const fromTitle = (title.match(/@([A-Za-z0-9_]+)/) || [])[1] || '';
  const fromUrl = (url.match(/x\.com\/([^/]+)\//) || [])[1] || '';
  return String(fromTitle || fromUrl).toLowerCase() === 'investnewdeal';
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

function singleCompanyName(tickers) {
  const raw = (tickers || []).map((t) => String(t || '').trim()).filter(Boolean);
  if (!raw.length || raw.length > 3) return '';
  const set = expandTickers(raw);
  const soft = ['SOFTBANK', '9984.T', '9984', 'SFTBY'].some((k) => set.has(k));
  const nv = set.has('NVDA') || set.has('NVIDIA');
  if (soft && !nv) return 'SoftBank';
  if (nv && !soft) return 'NVDA';
  return '';
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

/** Ranked hits for selskab/tema on fund pages.
 * Compliance: ONLY house accounts. Theme matches only apply to house.
 * Third-party accounts never appear on fond/selskab/tema panels. */
export function matchPosts(pack, { tickers = [], themes = [], houseOnly = true } = {}) {
  const wantT = expandTickers(tickers);
  const wantTh = expandThemes(themes);
  const hits = [];
  for (const p of pack?.posts || []) {
    if (revealsHoldings(p.text)) continue;
    if (houseOnly && !isHouse(p)) continue;
    const fromTicker = tickerFamilyHit(p.tickers, wantT);
    const fromText = fromTicker.length ? [] : textNameHit(p.text, wantT);
    const nameHit = fromTicker.length || fromText.length;
    // Theme matches: house accounts only (even if houseOnly is later relaxed)
    const themeLabels = [];
    if (isHouse(p)) {
      for (const tag of p.tags || []) {
        const key = String(tag).toLowerCase();
        if (!wantTh.has(key)) continue;
        const lab = THEME_DA[key] || key;
        if (!themeLabels.includes(lab)) themeLabels.push(lab);
      }
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

/**
 * Archive page only (ndi-paa-x). Product panels stay on matchPosts, which is
 * house-only. A third-party tag match is tema in the archive, never on selskab/tema.
 */
export function archiveHit(p, { q = '', f = 'all' } = {}) {
  const query = String(q || '').trim();
  if (query) {
    const hit = matchPosts({ posts: [p] }, { tickers: [query], houseOnly: false })[0];
    if (!hit) return { kind: '', reasons: [] };
    return { kind: hit.score >= 2 ? 'direct' : 'theme', reasons: hit.reasons || [] };
  }
  if (!f || f === 'all' || f === 'ndi') return { kind: '', reasons: [] };
  const themes = f === 'chips' ? ['chips', 'ai'] : [f];
  const tickers = f === 'chips' ? ['NVDA'] : [];
  const hit = matchPosts({ posts: [p] }, { tickers, themes, houseOnly: false })[0];
  if (hit?.score >= 2) return { kind: 'direct', reasons: hit.reasons || [] };
  if (hit) return { kind: 'theme', reasons: hit.reasons || [] };
  const tags = (p.tags || []).map((t) => String(t).toLowerCase());
  const labs = [];
  for (const t of themes) {
    if (!tags.includes(t)) continue;
    const lab = THEME_DA[t] || t;
    if (!labs.includes(lab)) labs.push(lab);
  }
  if (!labs.length) return { kind: '', reasons: [] };
  return { kind: 'theme', reasons: labs.slice(0, 3) };
}

/** Feed badge on ndi-paa-x. Not used by selskab/tema panels. */
export function feedHitKind(p, opt = {}) {
  return archiveHit(p, opt).kind;
}

function markTerm(hit) {
  if (!hit || hit.score < 2) return '';
  return (hit.reasons || []).find((r) => /^(SoftBank|NVDA)$/i.test(String(r))) || '';
}

/** 1-based place in a date-desc series. Null when there is only one post. */
export function xPlace(posts, leadId) {
  const list = (posts || []).filter(Boolean);
  if (list.length < 2) return null;
  const ordered = [...list].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  const i = ordered.findIndex((p) => String(p.id) === String(leadId));
  if (i < 0) return null;
  return { i: i + 1, n: ordered.length };
}

/** House account, account NDI follows, or anyone else. Counts only. */
export function xWhoSplit(posts) {
  let house = 0;
  let curated = 0;
  let other = 0;
  for (const p of posts || []) {
    if (isHouse(p)) house += 1;
    else if (p.curatedFrom === 'mads_following') curated += 1;
    else other += 1;
  }
  const n = house + curated + other;
  return { house, curated, other, n };
}

/**
 * One or two sentences. Names a company when the query is SoftBank or NVDA.
 * Does not name third-party accounts.
 */
export function xWhoSentence(split, { name = '', scope = 'direct' } = {}) {
  const { house, curated, other } = split || {};
  const bits = [];
  if (name) {
    if (!house) bits.push(`Ingen NDI-opslag nævner ${name}.`);
    else if (house === 1) bits.push(`1 NDI-opslag nævner ${name}.`);
    else bits.push(`${house} NDI-opslag nævner ${name}.`);
  } else if (!house) {
    bits.push(scope === 'direct' ? 'Ingen af de direkte er fra en NDI-konto.' : 'Ingen i udsnittet er fra en NDI-konto.');
  } else if (!curated && !other) {
    bits.push('Alle i udsnittet er fra NDI-konti.');
  } else if (house === 1) {
    bits.push(scope === 'direct' ? '1 direkte er fra en NDI-konto.' : '1 er fra en NDI-konto.');
  } else {
    bits.push(`${house} er fra NDI-konti.`);
  }
  if (curated && !other) {
    const verb = scope === 'direct' ? 'direkte er' : 'er';
    bits.push(curated === 1
      ? `1 ${verb} fra en konto, som NDI følger.`
      : `${curated} ${verb} fra konti, som NDI følger.`);
  } else if (curated && other) {
    bits.push(`${curated} er fra konti, som NDI følger. ${other} er fra andre konti.`);
  } else if (other) {
    bits.push(other === 1 ? '1 er fra en anden konto.' : `${other} er fra andre konti.`);
  }
  return bits.join(' ');
}

/** Compact plate for an active track. The sentence is the accessible name. */
export function xWhoBarHtml(posts, { q = '', scope = 'direct', snap = '', caption = '' } = {}) {
  const split = xWhoSplit(posts);
  if (!split.n) return '';
  const name = singleCompanyName([q]);
  const say = xWhoSentence(split, { name, scope });
  const cell = (n, label, mod) => `<div class="x-score-n ${mod}${n ? '' : ' is-zero'}"><b>${n}</b><span>${esc(label)}</span></div>`;
  const cells = cell(split.house, 'NDI', 'is-house')
    + cell(split.curated, 'fulgte', 'is-curated')
    + (split.other ? cell(split.other, 'andre', 'is-other') : '');
  const cap = caption ? `<span class="x-prov-k">${esc(caption)}</span>` : '';
  const snapBit = snap ? `<span class="x-snap-mini">Snapshot ${esc(snap)}</span>` : '';
  return `<div class="x-prov"><div class="x-prov-nums">${cells}</div>${cap}</div><span class="x-asof"><span class="x-who-say">${esc(say)}</span>${snapBit}</span>`;
}

/** One line on a door. Hidden once a track is open, so the quote keeps the room. */
export function xWhoDoorHtml(posts) {
  const split = xWhoSplit(posts);
  if (!split.n) return '';
  const b = (n, label) => `<b class="${n ? '' : 'is-zero'}">${n}</b> ${esc(label)}`;
  const bits = [b(split.house, 'NDI'), b(split.curated, 'fulgte')];
  if (split.other) bits.push(b(split.other, 'andre'));
  const say = xWhoSentence(split, { scope: 'all' });
  return `<span class="x-door-who">Hvem · ${bits.join(' · ')}<span class="sr-only"> ${esc(say)}</span></span>`;
}

function clipVoice(text, n = 72) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const sp = cut.lastIndexOf(' ');
  return ((sp > 40 ? cut.slice(0, sp) : cut).trim()) + '…';
}

/**
 * Two voices in one filter: NDI accounts, and accounts NDI follows.
 * Counts and the newest line come from the posts passed in. No network.
 * The followed column carries X_LABEL. Used on the archive, not on house-only panels.
 */
export function xVoicesHtml(posts, { q = '', who = 'all' } = {}) {
  const list = posts || [];
  if (!list.length) return '';
  const name = singleCompanyName([q]);
  const byDate = (arr) => [...arr].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  const house = byDate(list.filter((p) => isHouse(p)));
  const curated = byDate(list.filter((p) => p.curatedFrom === 'mads_following'));
  const otherN = list.length - house.length - curated.length;
  const cell = (kind, arr) => {
    const id = kind === 'house' ? 'house' : 'curated';
    const pressed = who === id;
    const label = kind === 'house' ? 'NDI-konti' : 'Konti NDI følger';
    let line;
    if (!arr.length) {
      if (kind === 'house') line = name ? `Ingen NDI-opslag nævner ${name}.` : 'Ingen NDI-opslag i filteret.';
      else line = name ? `Ingen opslag fra konti, som NDI følger, nævner ${name}.` : 'Ingen opslag fra konti, som NDI følger, i filteret.';
    } else {
      const newest = arr[0];
      line = `${clipVoice(newest.text)} · @${newest.username} · ${fmtXDate(newest.created_at)}`;
    }
    const small = kind === 'curated'
      ? X_LABEL
      : (arr.length ? 'Kan være NDI’s holdning.' : 'Selskab og tema viser kun NDI-konti.');
    return `<button type="button" class="x-voice is-${kind}${arr.length ? '' : ' is-zero'}" data-voice="${id}" aria-pressed="${pressed ? 'true' : 'false'}">
      <span class="k">${esc(label)}</span>
      <b>${arr.length}</b>
      <p>${esc(line)}</p>
      <small>${esc(small)}</small>
    </button>`;
  };
  const say = xWhoSentence(xWhoSplit(list), { name, scope: 'all' });
  const other = otherN > 0 ? `<p class="x-voices-other">${otherN === 1 ? '1 er fra en anden konto.' : `${otherN} er fra andre konti.`}</p>` : '';
  return `<div class="x-voices" role="group" aria-label="${esc(say)} ${esc(X_LABEL)}">${cell('house', house)}${cell('curated', curated)}</div>${other}`;
}

/**
 * Proportional date line. Filled dots are in the view. Open dots are context.
 * Ghost links go to the archive. They carry a date, not an account name or a quote.
 */
export function xSpineHtml(posts, opt = {}) {
  const dots = [];
  const hotIds = opt.hotIds || null;
  const pickIds = opt.pickIds || null;
  const leadId = String(opt.leadId || '');
  for (const p of posts || []) {
    const t = Date.parse(p?.created_at || '');
    if (Number.isNaN(t)) continue;
    const id = String(p.id || '');
    const hot = !hotIds || hotIds.has(id);
    dots.push({
      t,
      id,
      hot,
      lead: Boolean(id) && id === leadId,
      house: isHouse(p),
      curated: p.curatedFrom === 'mads_following',
      pick: Boolean(pickIds && id && pickIds.has(id)),
      jump: Boolean(opt.jump && hot && id),
      href: '',
    });
  }
  for (const g of opt.ghosts || []) {
    const t = Date.parse(g?.created_at || '');
    if (Number.isNaN(t)) continue;
    dots.push({
      t,
      id: String(g.id || ''),
      hot: false,
      lead: false,
      house: false,
      curated: g.curated !== false,
      pick: false,
      jump: false,
      href: g.href || '',
    });
  }
  if (dots.length < 2) return '';
  const min = Math.min(...dots.map((d) => d.t));
  const max = Math.max(...dots.map((d) => d.t));
  const span = Math.max(max - min, 1);
  for (const d of dots) d.p = (d.t - min) / span;
  const byP = [...dots].sort((a, b) => a.p - b.p || Number(a.lead) - Number(b.lead));
  let prev = -1;
  let lane = 0;
  for (const d of byP) {
    if (prev >= 0 && d.p - prev < 0.04) lane = lane === 0 ? 1 : lane === 1 ? -1 : 0;
    else lane = 0;
    d.lane = lane;
    prev = d.p;
  }
  const paint = [...dots.filter((d) => !d.lead), ...dots.filter((d) => d.lead)];
  const html = paint.map((d) => {
    const style = `--p:${d.p.toFixed(4)};--lane:${d.lane}`;
    const when = fmtXDate(new Date(d.t).toISOString());
    const cls = [
      'x-spine-dot',
      d.house ? 'is-house' : '',
      d.curated && !d.house ? 'is-curated' : '',
      d.hot ? '' : 'is-ghost',
      d.lead ? 'is-now' : '',
    ].filter(Boolean).join(' ');
    const current = d.lead ? ' aria-current="true"' : '';
    if (d.href) {
      return `<a class="${cls}" style="${style}" href="${esc(d.href)}"${current} aria-label="${esc(when)}. I feedet, ikke her."></a>`;
    }
    if (d.hot && d.pick && d.id) {
      return `<button type="button" class="${cls}" style="${style}" data-x-spine="${esc(d.id)}"${current} aria-label="${esc(when)}"></button>`;
    }
    if (d.hot && d.jump && d.id) {
      return `<button type="button" class="${cls}" style="${style}" data-x-jump="${esc(d.id)}"${current} aria-label="${esc(when)}"></button>`;
    }
    return `<span class="${cls}" style="${style}" aria-hidden="true"></span>`;
  }).join('');
  const y0 = fmtXDate(new Date(min).toISOString());
  const y1 = fmtXDate(new Date(max).toISOString());
  const key = opt.home
    ? '<p class="x-spine-key"><i class="is-house"></i>NDI-konti<i class="is-curated"></i>konti NDI følger</p>'
    : (opt.key ? `<p class="x-spine-key">${esc(opt.key)}</p>` : '');
  const hotN = dots.filter((d) => d.hot).length;
  return `<div class="x-spine${opt.home ? ' is-home' : ''}" role="group" aria-label="${esc(opt.label || 'Datoer')}">
    <span class="x-spine-end">${esc(y0)}</span>
    <div class="x-spine-track">${html}</div>
    <span class="x-spine-end">${esc(y1)}</span>
    ${key}
    <span class="sr-only">${hotN} fyldte af ${dots.length} på linjen.</span>
  </div>`;
}

const HOUSE_ORDER = ['InvestNewdeal', 'MadsC007', 'jesper_baek', 'CHornskov'];
const ATLAS_DAY = 86400000;

function atlasSource(posts) {
  const out = [];
  for (const p of posts || []) {
    const t = Date.parse(p?.created_at || '');
    if (Number.isNaN(t) || !p?.id) continue;
    out.push({
      t,
      id: String(p.id),
      username: String(p.username || ''),
      house: isHouse(p),
      curated: p.curatedFrom === 'mads_following',
    });
  }
  return out;
}

function atlasLanes(dots) {
  const byDay = new Map();
  for (const d of dots) {
    const key = new Date(d.t).toISOString().slice(0, 10);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key).push(d);
  }
  let maxAbs = 0;
  for (const arr of byDay.values()) {
    arr.sort((a, b) => a.t - b.t || a.id.localeCompare(b.id));
    const n = arr.length;
    arr.forEach((d, i) => {
      d.lane = n === 1 ? 0 : i - (n - 1) / 2;
      maxAbs = Math.max(maxAbs, Math.abs(d.lane));
    });
  }
  return maxAbs;
}

function atlasPlace(dots, min, max) {
  const span = max - min;
  if (!(span > ATLAS_DAY / 24)) {
    for (const d of dots) d.p = 0.5;
    return;
  }
  for (const d of dots) d.p = Math.min(1, Math.max(0, (d.t - min) / span));
}

function atlasCluster(all) {
  const fullMin = Math.min(...all.map((d) => d.t));
  const fullMax = Math.max(...all.map((d) => d.t));
  const sorted = [...all].sort((a, b) => b.t - a.t);
  const cluster = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (cluster[cluster.length - 1].t - sorted[i].t > 21 * ATLAS_DAY) break;
    cluster.push(sorted[i]);
  }
  const cMin = Math.min(...cluster.map((d) => d.t));
  const cMax = Math.max(...cluster.map((d) => d.t));
  if (cluster.length >= 4 && (cMax - cMin) < (fullMax - fullMin) * 0.55) {
    return { min: cMin, max: cMax, zoom: true };
  }
  return { min: fullMin, max: fullMax, zoom: false };
}

function atlasHotWindow(hot, all) {
  const fullMin = Math.min(...all.map((d) => d.t));
  const fullMax = Math.max(...all.map((d) => d.t));
  if (!hot.length) return { min: fullMin, max: fullMax, zoom: false };
  let min = Math.min(...hot.map((d) => d.t));
  let max = Math.max(...hot.map((d) => d.t));
  if (max - min < ATLAS_DAY) {
    min -= ATLAS_DAY;
    max += ATLAS_DAY;
  }
  const zoom = (max - min) < (fullMax - fullMin) * 0.85;
  return { min, max, zoom };
}

/**
 * Account × date map. Dots are posts in the static file.
 * Filled dots are in the current filter. Open dots are context.
 * The zoom is the same dates, drawn on a shorter span.
 */
export function xAtlasHtml(posts, opt = {}) {
  const all = atlasSource(posts);
  if (!all.length) return '';
  const hotIds = opt.hotIds || null;
  const leadId = String(opt.leadId || '');
  const who = String(opt.who || 'all');
  for (const d of all) {
    d.hot = !hotIds || hotIds.has(d.id);
    d.lead = Boolean(leadId) && d.id === leadId && d.hot;
  }
  const byUser = new Map();
  for (const d of all) {
    if (!byUser.has(d.username)) byUser.set(d.username, []);
    byUser.get(d.username).push(d);
  }
  const users = [...byUser.keys()].sort((a, b) => {
    const ar = HOUSE_ORDER.indexOf(a);
    const br = HOUSE_ORDER.indexOf(b);
    const ai = ar === -1 ? 99 : ar;
    const bi = br === -1 ? 99 : br;
    if (ai !== bi) return ai - bi;
    return a.localeCompare(b);
  });
  const hot = all.filter((d) => d.hot);
  const fullMin = Math.min(...all.map((d) => d.t));
  const fullMax = Math.max(...all.map((d) => d.t));
  let win = opt.home ? atlasCluster(all) : atlasHotWindow(hot, all);
  if (opt.home && hot.length && hot.length < all.length) {
    const inside = hot.every((d) => d.t >= win.min && d.t <= win.max);
    if (!inside) win = atlasHotWindow(hot, all);
  }
  const inWin = (d) => d.t >= win.min && d.t <= win.max;
  let rowUsers = users.filter((u) => byUser.get(u).some(inWin));
  if (opt.rows === 'hot') rowUsers = rowUsers.filter((u) => byUser.get(u).some((d) => d.hot));
  if (!rowUsers.length) rowUsers = users.filter((u) => byUser.get(u).some((d) => d.hot));
  if (!rowUsers.length) rowUsers = users;

  const paint = (dots, { line = false } = {}) => {
    const ordered = [...dots.filter((d) => !d.lead), ...dots.filter((d) => d.lead)];
    return ordered.map((d) => {
      const style = `--p:${d.p.toFixed(4)};--lane:${line ? 0 : d.lane}`;
      const when = fmtXDate(new Date(d.t).toISOString());
      const cls = [
        'x-atlas-dot',
        d.house ? 'is-house' : d.curated ? 'is-curated' : '',
        d.hot ? '' : 'is-ghost',
        d.lead ? 'is-now' : '',
      ].filter(Boolean).join(' ');
      const where = d.hot ? '' : '. Uden for filteret';
      const label = `@${d.username}, ${when}${where}`;
      const current = d.lead ? ' aria-current="true"' : '';
      if (d.hot && d.id && opt.pick) {
        return `<button type="button" class="${cls}" style="${style}" data-x-spine="${esc(d.id)}"${current} aria-label="${esc(label)}"></button>`;
      }
      if (d.hot && d.id) {
        return `<button type="button" class="${cls}" style="${style}" data-x-jump="${esc(d.id)}"${current} aria-label="${esc(label)}"></button>`;
      }
      return `<span class="${cls}" style="${style}" title="${esc(label)}"></span>`;
    }).join('');
  };

  const context = all.map((d) => ({ ...d, p: 0, lane: 0 }));
  atlasPlace(context, fullMin, fullMax);
  const rows = rowUsers.map((u) => {
    const dots = byUser.get(u).filter(inWin).map((d) => ({ ...d }));
    atlasPlace(dots, win.min, win.max);
    const maxAbs = atlasLanes(dots);
    const sample = byUser.get(u)[0];
    const kind = sample.house ? 'is-house' : sample.curated ? 'is-curated' : '';
    const on = who === u;
    const total = byUser.get(u).length;
    const mark = total === dots.length ? String(dots.length) : `${dots.length}/${total}`;
    const h = 22 + Math.ceil(maxAbs) * 14;
    return `<div class="x-atlas-row ${kind}" data-atlas-user="${esc(u)}">
      <button type="button" class="x-atlas-name" data-atlas-who="${esc(u)}" aria-pressed="${on ? 'true' : 'false'}" aria-label="${esc(`Filtrér på @${u}. ${dots.length} i udsnittet, ${total} i snapshotet`)}"><span>@${esc(u)}</span><b>${mark}</b></button>
      <div class="x-atlas-plot" style="height:${h}px">${paint(dots)}</div>
    </div>`;
  });
  let banded = '';
  let band = '';
  for (let i = 0; i < rowUsers.length; i++) {
    const sample = byUser.get(rowUsers[i])[0];
    const next = sample.house ? 'house' : 'curated';
    if (next !== band) {
      band = next;
      banded += `<p class="x-atlas-band">${next === 'house' ? 'NDI-konti' : 'Konti NDI følger'}</p>`;
    }
    banded += rows[i];
  }
  const outside = users.filter((u) => !byUser.get(u).some(inWin));
  const outsideLine = win.zoom && outside.length
    ? `<p class="x-atlas-out">Før udsnittet: ${outside.map((u) => {
      const list = byUser.get(u);
      const last = [...list].sort((a, b) => b.t - a.t)[0];
      const when = fmtXDate(new Date(last.t).toISOString());
      return `@${esc(u)}, ${list.length} opslag, senest ${esc(when)}`;
    }).join('. ')}.</p>`
    : '';
  const houseHot = hot.filter((d) => d.house).length;
  const noHouse = opt.rows === 'hot' && hot.length && houseHot === 0
    ? ' Ingen NDI-konto har en prik i filteret.'
    : '';
  const zoomLine = win.zoom
    ? `<p class="x-atlas-zoom">Udsnit ${esc(fmtXDate(new Date(win.min).toISOString()))} til ${esc(fmtXDate(new Date(win.max).toISOString()))}, forstørret. Samme datoer som linjen.${esc(noHouse)}</p>`
    : (noHouse ? `<p class="x-atlas-zoom">${esc(noHouse.trim())}</p>` : '');
  const y0 = fmtXDate(new Date(fullMin).toISOString());
  const y1 = fmtXDate(new Date(fullMax).toISOString());
  const hotN = all.filter((d) => d.hot).length;
  const cls = `x-atlas${opt.home ? ' is-home' : ''}${opt.compact ? ' is-compact' : ''}`;
  return `<div class="${cls}" data-atlas="1" role="group" aria-label="${esc(opt.label || 'Konto-kort. ' + X_LABEL)}">
    <div class="x-atlas-top"><p class="k">Konto-kort</p><p>Prikken følger datoen.</p></div>
    <div class="x-atlas-context">
      <span class="x-atlas-end">${esc(y0)}</span>
      <div class="x-atlas-line">${paint(context, { line: true })}</div>
      <span class="x-atlas-end">${esc(y1)}</span>
    </div>
    ${zoomLine}
    ${banded}
    ${outsideLine}
    <p class="x-atlas-key"><i class="is-house"></i>NDI-konti<i class="is-curated"></i>konti NDI følger<i class="is-ghost"></i>uden for filteret. ${esc(X_LABEL)}.</p>
    <span class="sr-only">${hotN} fyldte af ${all.length} på kortet. ${rowUsers.length} konti i udsnittet.</span>
  </div>`;
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

function isTickerSlip(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 6) return false;
  return words.every((w) => /^\$?[A-Za-z][A-Za-z0-9.]{0,11}$/.test(w));
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
  if (p?.id) {
    cardMeta.set(String(p.id), {
      post: p,
      reasons: opt.reasons || [],
      hitKind: opt.hitKind || '',
      query: opt.query || '',
    });
  }
  const idAttr = p?.id ? ` id="xpost-${esc(p.id)}" data-x-id="${esc(p.id)}"` : '';
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
  const whenControl = (mode) => {
    const when = fmtXParts(p.created_at);
    const time = `<time datetime="${esc(p.created_at)}">${esc(when.label)}</time>`;
    const year = mode === 'film'
      ? `<span class="x-film-y">${esc(when.year)}</span>`
      : `<span>${esc(when.year)}</span>`;
    if (!opt.pickable) return { film: `${time}${year}`, rail: `<div class="x-rail-when">${time}${year}</div>` };
    const label = `Vis opslaget fra ${fmtXDate(p.created_at)} som citat`;
    const btn = `<button type="button" class="x-pick ${mode === 'film' ? 'x-film-when' : 'x-rail-when'}" data-x-pick aria-keyshortcuts="ArrowLeft ArrowRight" aria-label="${esc(label)}">${time}${year}</button>`;
    return { film: btn, rail: btn };
  };
  if (opt.rail && opt.rail !== 'film') {
    const when = whenControl('rail');
    const hitTags = [
      ...(p.tickers || []).slice(0, 4).filter((t) => hitTerms.includes(String(t).toLowerCase())).map((t) => `<a class="tag is-hit" href="${esc(tickerHref(t))}">${esc(t)}</a>`),
      ...(p.tags || []).slice(0, 3).filter((t) => hitTerms.includes(String(t).toLowerCase())).map((t) => `<a class="tag is-hit" href="${esc(tagHref(t))}">${esc(t)}</a>`),
    ].join('');
    return `<article class="${cls} is-rail"${idAttr}>
  ${when.rail}
  <span class="x-dot" aria-hidden="true"></span>
  <div class="x-rail-body">
    <header class="x-rail-who"><strong>${esc(p.name || p.username)}</strong><span>@${esc(p.username)}</span></header>
    ${text}
    ${because ? `<p class="x-why">${because}</p>` : why}
    <p class="x-foot">
      <a class="outline-btn small" href="${esc(p.url)}" rel="noopener noreferrer" target="_blank">Åbn på X ↗</a>
      ${house}
      ${curated}
      ${hitTags}
    </p>
  </div>
</article>`;
  }
  if (opt.rail === 'film') {
    const when = whenControl('film');
    const badge = curated || house;
    return `<article class="${cls} is-film"${idAttr}>
  ${when.film}
  <div class="x-film-top">
    <a class="x-film-who" href="${esc(p.url)}" rel="noopener noreferrer" target="_blank">${esc(p.name || p.username)}</a>
    ${badge}
  </div>
  ${text}
  ${because ? `<p class="x-why">${because}</p>` : (why || '')}
</article>`;
  }
  const shownWhen = () => {
    const time = `<time datetime="${esc(p.created_at)}">${esc(fmtXDate(p.created_at))}</time>`;
    if (!opt.dated) return time;
    const n = Number(opt.place?.n);
    const i = Number(opt.place?.i);
    const place = n > 1 && i > 0 ? ` · ${i} af ${n}` : '';
    return `<span class="x-by-when">${time}<i class="x-now">Denne dato${place}</i></span>`;
  };
  const currentAttr = opt.lead && opt.dated ? ' aria-current="true"' : '';
  if (opt.lead && isTickerSlip(p.text)) {
    const slipCls = ['x-card', 'panel', 'is-lead', 'is-slip', opt.hitKind === 'direct' ? 'is-direct' : ''].filter(Boolean).join(' ');
    return `<article class="${slipCls}"${idAttr}${currentAttr}>
  <p class="kicker" style="color:var(--brand);font-size:11px;font-weight:700;letter-spacing:1.4px;margin:0">KORT OPSLAG</p>
  <p class="x-slip">${highlight(p.text, opt.query)}</p>
  <div class="x-by">
    <span class="x-ava" style="background:${avatarColor(p.username)}" aria-hidden="true">${esc(initials(p))}</span>
    <div class="x-who">
      <strong>${esc(p.name || p.username)}</strong>
      <span>@${esc(p.username)}</span>
    </div>
    ${shownWhen()}
  </div>
  ${why}
  ${foot}
</article>`;
  }
  if (opt.lead) {
    return `<article class="${cls}"${idAttr}${currentAttr}>
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
    ${shownWhen()}
  </div>
  ${why}
  ${foot}
</article>`;
  }
  return `<article class="${cls}"${idAttr}>
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
 * Posts from accounts NDI follows that the feed would show and this panel will not.
 * No account names and no post text. House-only panels stay house-only.
 */
/** Followed and other accounts the feed would show and this panel will not. */
function feedContrast(pack, { tickers = [], themes = [] } = {}) {
  const href = feedHref({ tickers, themes });
  const none = { n: 0, sentence: '', href, posts: [] };
  let q = '';
  let f = '';
  try {
    const u = new URL(href, 'https://ndi.local/');
    q = u.searchParams.get('q') || '';
    f = u.searchParams.get('f') || '';
  } catch {
    return none;
  }
  if (!q && !f) return none;
  const posts = (pack?.posts || []).filter((p) => (
    !revealsHoldings(p.text)
    && !isHouse(p)
    && postInFilter(p, f || 'all')
    && postMatchesQuery(p, q)
  ));
  const use = q ? posts.filter((p) => feedHitKind(p, { q, f: f || 'all' }) === 'direct') : posts;
  if (!use.length) return none;
  const split = xWhoSplit(use);
  const n = split.curated + split.other;
  if (!n) return none;
  let from;
  if (split.other && split.curated) from = `${n} opslag i feedet fra andre konti`;
  else if (split.other) from = n === 1 ? '1 opslag i feedet fra en anden konto' : `${n} opslag i feedet fra andre konti`;
  else from = n === 1 ? '1 opslag i feedet fra en konto, som NDI følger' : `${n} opslag i feedet fra konti, som NDI følger`;
  const name = singleCompanyName(tickers) || singleCompanyName([q]);
  let sentence;
  if (name) sentence = `${from}, nævner ${name}. De vises ikke her.`;
  else {
    const theme = f && f !== 'all' ? (THEME_DA[f] || f) : '';
    sentence = theme ? `${from}, ligger på temaet ${theme}. De vises ikke her.` : `${from}. De vises ikke her.`;
  }
  return { n, sentence, href, posts: use };
}

function xFeedAsideHtml(n) {
  const v = Number(n) || 0;
  if (!v) return '';
  return `<div class="x-feed-aside"><b>${v}</b><span>i feedet</span><small>ikke her</small></div>`;
}

function ghostHref(base, id) {
  const href = base || 'ndi-paa-x.html';
  const join = href.includes('?') ? '&' : '?';
  return `${href}${join}id=${encodeURIComponent(id)}`;
}

/** Date line for the panel. Open dots are feed-only. No account names, no quotes. */
function panelSpineHtml(shownPosts, contrast, { leadId = '', pickPosts = [] } = {}) {
  const ghosts = (contrast?.posts || []).map((p) => ({
    id: p.id,
    created_at: p.created_at,
    curated: p.curatedFrom === 'mads_following',
    href: ghostHref(contrast.href, p.id),
  }));
  const pickIds = new Set((pickPosts || []).map((p) => String(p.id || '')));
  return xSpineHtml(shownPosts, {
    leadId,
    pickIds,
    jump: true,
    ghosts,
    key: contrast?.n ? 'Fyldt prik er i panelet. Åben prik er i feedet, ikke her.' : '',
    label: 'Datoer. Panelet er kun NDI-konti. Åbne prikker er i feedet, ikke her.',
  });
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
  const contrast = feedContrast(pack, { tickers, themes });
  const aside = xFeedAsideHtml(contrast.n);
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
    const emptySpine = panelSpineHtml([], contrast);
    return `<section class="panel x-says" id="hvad-siger-x">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2><div class="x-says-tools">${xScoreHtml([{ n: 0, label: 'direkte', mod: 'is-direct' }, { n: 0, label: 'tema', mod: 'is-theme' }])}${aside}</div></div>
  <p class="band">${esc(X_LABEL)}. Snapshot ${snap}.${contrast.sentence ? ` ${esc(contrast.sentence)}` : ''}</p>
  ${emptySpine}
  <div class="x-empty">
    <p class="x-zero" aria-hidden="true">0</p>
    <p class="k">Ingen opslag i udsnittet</p>
    <p>${contrast ? 'Panelet er kun NDI-konti.' : 'Der er ikke et udvalgt opslag, der matcher dette selskab eller tema.'}</p>
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
  const leadHit = view.direct[0];
  const leadKind = 'direct';
  const restDirect = view.direct.slice(1);
  const restTheme = view.theme;
  const lane = (kind, hits, mode, leadKind = 'direct') => {
    if (!hits.length) return '';
    const film = mode === 'film';
    const rail = mode === 'rail';
    const pickable = kind === leadKind && (film || rail);
    const kicker = kind === 'theme'
      ? ((film || (rail && leadKind === 'theme')) ? 'Andre datoer · tema' : 'Tema')
      : ((film || rail) ? 'Andre datoer' : 'Øvrige direkte træf');
    const hint = kind === 'direct'
      ? 'Nævner selskab eller ticker.'
      : 'Rammer temaet. Ikke en ticker fra udsnittet.';
    const note = pickable ? 'Klik en dato, eller brug piletasterne. ' : '';
    const cards = hits.map((h) => xCard(h.post, {
      reasons: h.reasons,
      hitKind: kind,
      query: markTerm(h),
      rail: film ? 'film' : rail,
      pickable,
    })).join('');
    return `<div class="x-lane ${kind === 'direct' ? 'is-direct' : 'is-theme'}${film ? ' is-film' : ''}${rail ? ' is-rail' : ''}">
  <p class="x-lane-h"><span class="x-lane-k">${kicker}</span><span class="x-lane-hint">${note}${hint}</span></p>
  <div class="x-grid">${cards}</div>
</div>`;
  };
  const packLane = (kind, hits, allowBeside, leadKind = 'direct') => {
    if (!hits.length) return { beside: '', below: '' };
    if (hits.length >= 3) return { beside: '', below: lane(kind, hits, 'film', leadKind) };
    if (allowBeside) return { beside: lane(kind, hits, 'rail', leadKind), below: '' };
    return { beside: '', below: lane(kind, hits, '', leadKind) };
  };
  let stage;
  let belowLane;
  if (!view.direct.length) {
    const who = singleCompanyName(tickers);
    const name = who ? esc(who) : '';
    const leadHit = view.theme[0];
    const restThemeOnly = view.theme.slice(1);
    const place = xPlace(view.theme.map((h) => h.post), leadHit.post.id);
    const seatLine = who
      ? `Ingen NDI-opslag nævner ${name}. Citatet deler tema og nævner ikke ${name}.`
      : 'Ingen NDI-opslag er et direkte træf. Citatet deler tema og nævner ikke en ticker fra udsnittet.';
    const emptySeat = `<div class="x-voice is-house is-zero" role="note">
  <span class="k">Direkte</span>
  <b>0</b>
  <p>${seatLine}</p>
  <small>Panelet er kun NDI-konti.</small>
</div>`;
    const quote = `<div class="x-stage">${xCard(leadHit.post, {
      reasons: leadHit.reasons,
      lead: true,
      hitKind: 'theme',
      query: '',
      dated: restThemeOnly.length > 0,
      place: restThemeOnly.length ? place : null,
    })}</div>`;
    belowLane = restThemeOnly.length ? lane('theme', restThemeOnly, 'film', 'theme') : '';
    stage = `<div class="x-split"><div class="x-split-main">${quote}</div><div class="x-split-side">${emptySeat}</div></div>`;
  } else {
    const quote = `<div class="x-stage">${xCard(leadHit.post, {
      reasons: leadHit.reasons,
      lead: true,
      hitKind: leadKind,
      query: markTerm(leadHit),
      dated: restDirect.length > 0,
      place: restDirect.length ? xPlace([leadHit.post, ...restDirect.map((h) => h.post)], leadHit.post.id) : null,
    })}</div>`;
    const directPacked = packLane('direct', restDirect, true);
    const themePacked = packLane('theme', restTheme, !restDirect.length);
    const sideLane = directPacked.beside || themePacked.beside;
    belowLane = directPacked.below + themePacked.below;
    stage = sideLane
      ? `<div class="x-split"><div class="x-split-main">${quote}</div><div class="x-split-side">${sideLane}</div></div>`
      : quote;
  }
  const miss = view.direct.length && !view.theme.length && themeLeft > 0
    ? '<p class="x-miss">Kun direkte træf i dette udsnit. Opslag, der bare deler tema, er udeladt, så navnet står først.</p>'
    : '';
  const shownPosts = [...view.direct, ...view.theme].map((h) => h.post);
  const seriesPosts = (view.direct.length ? view.direct : view.theme).map((h) => h.post);
  const spineLead = seriesPosts[0];
  const spine = panelSpineHtml(shownPosts, contrast, { leadId: spineLead?.id || '', pickPosts: seriesPosts });
  return `<section class="panel x-says" id="hvad-siger-x">
  <div class="x-says-h"><h2 class="panel-h">${esc(title)}</h2><div class="x-says-tools">${score}${aside}</div></div>
  <p class="sr-only">${esc(nLabel)}</p>
  <p class="band">Kun NDI-konti i dette panel. I feedet: ${esc(X_LABEL)}. Snapshot ${snap}.${contrast.sentence ? ` ${esc(contrast.sentence)}` : ''}</p>
  ${spine}
  ${stage}
  ${belowLane}
  ${miss}
  <p class="link-row" style="margin-top:12px"><a class="outline-btn small" href="${more}">Flere opslag i feedet →</a></p>
</section>`;
}

function bindXPick() {
  if (typeof document === 'undefined' || document.documentElement.dataset.xPickBound) return;
  document.documentElement.dataset.xPickBound = '1';
  document.addEventListener('click', (e) => {
    const jump = e.target.closest('[data-x-jump]');
    if (jump) {
      const id = jump.getAttribute('data-x-jump');
      const card = id && document.getElementById(`xpost-${id}`);
      if (!card) return;
      e.preventDefault();
      card.classList.add('is-flash');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      card.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      window.setTimeout(() => card.classList.remove('is-flash'), 900);
      return;
    }
    const spine = e.target.closest('[data-x-spine]');
    if (spine) {
      e.preventDefault();
      const id = spine.getAttribute('data-x-spine');
      const scope = spine.closest('#x-grid, section.x-says') || document;
      const sel = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : String(id).replace(/"/g, '');
      const cards = [...scope.querySelectorAll(`article.x-card[data-x-id="${sel}"]`)];
      const card = cards.find((el) => el.closest('.x-lane')) || null;
      const lane = card ? card.closest('.x-lane') : null;
      const lead = scope.querySelector('article.is-lead');
      const laneKind = lane && lane.classList.contains('is-theme') ? 'theme' : 'direct';
      const leadKind = !lead ? laneKind : (lead.classList.contains('is-direct') ? 'direct' : lead.classList.contains('is-theme') ? 'theme' : '');
      if (card && lane && lane.querySelector('[data-x-pick]') && (!leadKind || laneKind === leadKind)) {
        promoteCard(card);
        return;
      }
      const any = cards[0];
      if (!any) return;
      any.classList.add('is-flash');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      any.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      window.setTimeout(() => any.classList.remove('is-flash'), 900);
      return;
    }
    const btn = e.target.closest('[data-x-pick]');
    if (!btn) return;
    e.preventDefault();
    promoteCard(btn.closest('article.x-card'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const ae = document.activeElement;
    if (!ae || ae.closest('input, textarea, select, [contenteditable="true"]')) return;
    const scope = ae.closest('#x-grid, section.x-says');
    if (!scope) return;
    if (cyclePick(scope, e.key === 'ArrowRight' ? 1 : -1)) e.preventDefault();
  });
}

function leadKindOf(lead) {
  if (!lead) return '';
  return lead.classList.contains('is-direct') ? 'direct' : 'theme';
}

function ensurePickedStage(lane) {
  const prev = lane.previousElementSibling;
  if (prev && prev.classList.contains('x-stage') && !prev.classList.contains('x-no-direct')) return prev;
  const stage = document.createElement('div');
  stage.className = 'x-stage x-picked';
  lane.parentNode.insertBefore(stage, lane);
  return stage;
}

function promoteCard(card) {
  if (!card || typeof document === 'undefined') return;
  const nextId = card.getAttribute('data-x-id');
  const next = cardMeta.get(nextId);
  const lane = card.closest('.x-lane');
  if (!next || !lane) return;
  const mode = lane.classList.contains('is-film') ? 'film' : (lane.classList.contains('is-rail') ? 'rail' : '');
  if (!mode) return;
  const scope = card.closest('#x-grid, section.x-says') || document;
  const lead = scope.querySelector('article.is-lead');
  const nextKind = next.hitKind || (lane.classList.contains('is-theme') ? 'theme' : 'direct');
  if (lead && nextKind !== leadKindOf(lead)) return;
  const ids = [...lane.querySelectorAll('article.x-card[data-x-id]')].map((a) => a.getAttribute('data-x-id'));
  const pool = ids.filter((id) => id !== nextId);
  if (lead) {
    const prevId = lead.getAttribute('data-x-id');
    if (prevId && prevId !== nextId && !pool.includes(prevId)) pool.push(prevId);
  }
  const stageHost = lead ? lead.closest('.x-stage') : ensurePickedStage(lane);
  if (!stageHost) return;
  const sorted = pool
    .map((id) => cardMeta.get(id))
    .filter(Boolean)
    .sort((a, b) => String(b.post.created_at || '').localeCompare(String(a.post.created_at || '')));
  const place = xPlace([next.post, ...sorted.map((m) => m.post)], next.post.id);
  stageHost.innerHTML = xCard(next.post, {
    reasons: next.reasons,
    lead: true,
    hitKind: next.hitKind,
    query: next.query,
    dated: true,
    place,
  });
  const grid = lane.querySelector('.x-grid');
  if (grid) {
    grid.innerHTML = sorted.map((m) => xCard(m.post, {
      reasons: m.reasons,
      hitKind: m.hitKind,
      query: m.query,
      rail: mode,
      pickable: true,
    })).join('');
  }
  const nEl = lane.querySelector('.x-lane-n');
  if (nEl) nEl.textContent = String(sorted.length);
  const quote = stageHost.querySelector('article');
  if (quote) {
    quote.setAttribute('tabindex', '-1');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const by = quote.querySelector('.x-by') || quote;
    const r = by.getBoundingClientRect();
    if (r.top < 56 || r.bottom > window.innerHeight - 12) {
      quote.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }
    quote.focus({ preventScroll: true });
  }
  let live = document.getElementById('x-pick-live');
  if (!live) {
    live = document.createElement('p');
    live.id = 'x-pick-live';
    live.className = 'sr-only';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);
  }
  const where = place && place.n > 1 ? ` Dato ${place.i} af ${place.n}.` : '';
  live.textContent = `Citatet viser nu opslaget fra ${fmtXDate(next.post.created_at)}.${where}`;
  const spineScope = stageHost.closest('#x-grid, section.x-says');
  if (spineScope && nextId) {
    spineScope.querySelectorAll('.x-spine-dot.is-now, .x-atlas-dot.is-now').forEach((el) => {
      el.classList.remove('is-now');
      el.removeAttribute('aria-current');
    });
    const sel = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(nextId) : String(nextId).replace(/"/g, '');
    spineScope.querySelectorAll(`[data-x-spine="${sel}"], .x-atlas-dot[data-x-jump="${sel}"]`).forEach((dot) => {
      dot.classList.add('is-now');
      dot.setAttribute('aria-current', 'true');
    });
  }
  const quoteNow = stageHost.querySelector('article');
  if (quoteNow) {
    quoteNow.dispatchEvent(new CustomEvent('ndi-x-pick', { bubbles: true, detail: { id: next.post.id } }));
  }
}

function cyclePick(scope, dir) {
  const lead = scope.querySelector('article.is-lead');
  if (!lead) return false;
  const kind = leadKindOf(lead);
  const lane = [...scope.querySelectorAll('.x-lane')].find((el) => {
    if (!el.querySelector('[data-x-pick]')) return false;
    const laneKind = el.classList.contains('is-theme') ? 'theme' : 'direct';
    return laneKind === kind;
  });
  if (!lane) return false;
  const ids = [
    lead.getAttribute('data-x-id'),
    ...[...lane.querySelectorAll('article.x-card[data-x-id]')].map((a) => a.getAttribute('data-x-id')),
  ];
  const items = ids.map((id) => cardMeta.get(id)).filter(Boolean);
  items.sort((a, b) => String(b.post.created_at || '').localeCompare(String(a.post.created_at || '')));
  const cur = items.findIndex((m) => String(m.post.id) === lead.getAttribute('data-x-id'));
  if (cur < 0) return false;
  const next = items[cur + (dir > 0 ? 1 : -1)];
  if (!next) return false;
  const id = String(next.post.id).replace(/"/g, '');
  const card = lane.querySelector(`article.x-card[data-x-id="${id}"]`);
  if (!card) return false;
  promoteCard(card);
  return true;
}
