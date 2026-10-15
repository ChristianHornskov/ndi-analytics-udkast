// Dataloader + beregninger. Kun lokale JSON-snapshots (ingen live Azure).
const BASE = new URL('../', import.meta.url); // docs/b/
const ROOT = new URL('../../', import.meta.url); // docs/

const cache = {};
async function getJSON(url) {
  const key = String(url);
  if (!cache[key]) cache[key] = fetch(url, { cache: 'no-cache' }).then(r => {
    if (!r.ok) throw new Error(`Kunne ikke hente ${url.pathname || url} (${r.status})`);
    return r.json();
  });
  return cache[key];
}

export const THEMES = {
  chips: { label: 'Chips & udstyr', desc: 'Design, produktion og udstyr til halvledere.' },
  compute: { label: 'Compute & hukommelse', desc: 'Processorkraft, hukommelse og lagring, der behandler data.' },
  connect: { label: 'Optik & forbindelser', desc: 'Fotonik, lasere og netværk, der flytter data mellem chips og datacentre.' },
  software: { label: 'Software & AI', desc: 'Programmer, AI-modeller og infrastruktur-software.' },
  platforms: { label: 'Digitale platforme', desc: 'Markedspladser, fintech og koncerner med mange teknologiejerskaber.' },
  energy: { label: 'Energi & strøm', desc: 'Elproduktion, lagring og strøm til den digitale infrastruktur.' },
  'energy-resources': { label: 'Råstoffer & metaller', desc: 'Kobber, sjældne jordarter, lithium og andre råvarer til elektrificering.' },
  physical: { label: 'Fysisk automatisering', desc: 'Elbiler, robotter og maskiner, hvor software møder fysisk produktion.' },
  space: { label: 'Rumfart & satellitter', desc: 'Opsendelse, satellitter og rumbaseret infrastruktur.' },
  health: { label: 'Sundhed & biotek', desc: 'Bioteknologi og sundhedsdata.' },
  finance: { label: 'Finans & kapitalmarked', desc: 'Børser, forsikring og kapitalforvaltning med teknologivinkel.' },
  other: { label: 'Øvrige', desc: 'Selskaber, der endnu ikke er placeret i et NDI-tema i udkastet.' },
};
// Sekundære tags (mange-til-mange). Udledt af branche/tekst i udkastet.
export const SUBTAGS = {
  datacenter: 'AI-datacenter',
  fotonik: 'Fotonik',
  batteri: 'Batterier & lagring',
  kernekraft: 'Kernekraft',
  kvante: 'Kvantecomputere',
  robot: 'Robotter & autonomi',
  satellit: 'Satellitkommunikation',
  sol: 'Solenergi',
};
export const MATURITY = {
  prerevenue: { label: 'Præ-revenue', short: 'Før omsætning', desc: 'Selskabet har endnu ingen væsentlig omsætning.' },
  preprofit: { label: 'Præ-profit', short: 'Før overskud', desc: 'Omsætning, men endnu ikke overskud.' },
  highgrowth: { label: 'Highgrowth', short: 'Høj vækst', desc: 'Høj vækst i omsætningen; markedet prissætter fremtiden.' },
  garp: { label: 'GARP', short: 'Vækst til fornuftig pris', desc: 'Growth at a reasonable price: vækst og indtjening i balance.' },
  value: { label: 'Value', short: 'Modent', desc: 'Modent selskab med stabil indtjening; har et formål i porteføljen.' },
};
export const MATURITY_ORDER = ['prerevenue', 'preprofit', 'highgrowth', 'garp', 'value'];
export const HEURISTIC_NOTE = 'Udkast-klassifikation — ikke officiel NDI-rating';
export const WARNING = 'Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.';

const IND_THEME = [
  [/Solar|Utilities|Uranium|Oil & Gas|Electrical Equipment/i, 'energy'],
  [/Gold|Silver|Mining|Metals|Copper|Chemical/i, 'energy-resources'],
  [/Biotech|Health|Drug|Medical/i, 'health'],
  [/Insurance|Bank|Capital Markets|Credit|Asset Management|Financial/i, 'finance'],
  [/Auto|Machinery|Engineering|Construction|Freight|Waste|Airports/i, 'physical'],
  [/Internet|Gaming|Entertainment|Broadcasting|Advertising|Education|Telecom|Real Estate|REIT|Grocery/i, 'platforms'],
];
const SUB_RULES = [
  ['datacenter', /datacent|hyperscal/i],
  ['fotonik', /optisk|optik|laser|fotonik|photon/i],
  ['batteri', /batter|energilagring|lagring af elektricitet/i],
  ['kernekraft', /kernekraft|nuklear|nuclear|uran|reaktor/i],
  ['kvante', /kvante|quantum/i],
  ['robot', /robot|autonom|selvkørende|automatiser/i],
  ['satellit', /satellit|starlink/i],
  ['sol', /\bsol(?:energi|celle|ar)|solar/i],
];

const isSecurity = p => p.symbol && !/valutakonto|skyldig|afvikl\./i.test(p.name);

function enrich(p, fundId) {
  let theme = p.theme && p.theme !== 'andet' ? p.theme : null;
  if (!theme && p.industry) for (const [re, t] of IND_THEME) if (re.test(p.industry)) { theme = t; break; }
  if (!theme) theme = 'other';
  const text = [p.name, p.industry, p.summary, p.role, p.products].filter(Boolean).join(' ');
  const sub = SUB_RULES.filter(([, re]) => re.test(text)).map(([k]) => k);
  const ps = p.maturity === 'prerevenue' ? null : p.ps;
  const pe = p.maturity === 'value' ? p.pe : null;
  return { ...p, fundId, themeKey: theme, themeDerived: p.theme === 'andet' || !p.theme, subtags: sub, ps, pe,
    tags: [theme, ...sub], slug: (p.isin || p.symbol || p.name).toLowerCase() };
}

export async function loadAll() {
  const [portfolio, events, latest, meta] = await Promise.all([
    getJSON(new URL('data/portfolio.json', ROOT)),
    getJSON(new URL('data/context-events.json', ROOT)).catch(() => ({ events: [] })),
    getJSON(new URL('data/latest.json', ROOT)).catch(() => null),
    getJSON(new URL('data/fund-meta.json', BASE)).catch(() => ({ funds: {} })),
  ]);
  const funds = {};
  for (const f of portfolio.funds) {
    const positions = f.positions.filter(isSecurity).map(p => enrich(p, f.id));
    const cash = f.positions.filter(p => !isSecurity(p)).reduce((s, p) => s + (p.weight || 0), 0);
    funds[f.id] = { ...f, positions, cashWeight: cash, meta: meta.funds?.[f.id] || {} };
  }
  return { asOf: portfolio.asOf, funds, events: events.events || [], eventsNote: events.note, latest, meta };
}

export async function loadProfiles() {
  return getJSON(new URL('data/company-profiles.json', BASE)).catch(() => ({ profiles: {}, media: [] }));
}

/* ---------- Beregninger ---------- */
export const ts = d => Date.parse(d + 'T00:00:00Z');
const DAY = 864e5;

export function series(fund, mode = 'total') {
  return fund.data.map(p => ({ d: p.d, v: mode === 'price' ? p.price : p.total }));
}

export function pointOnOrBefore(data, date) {
  const t = ts(date);
  let best = null;
  for (const p of data) { if (ts(p.d) <= t) best = p; else break; }
  return best;
}

export function periodStart(data, key) {
  const last = data.at(-1);
  const lt = new Date(ts(last.d));
  const y = lt.getUTCFullYear(), m = lt.getUTCMonth(), dd = lt.getUTCDate();
  const iso = (Y, M, D) => new Date(Date.UTC(Y, M, D)).toISOString().slice(0, 10);
  switch (key) {
    case '1m': return iso(y, m - 1, dd);
    case '3m': return iso(y, m - 3, dd);
    case 'ytd': return iso(y - 1, 11, 31);
    case '1y': return iso(y - 1, m, dd);
    case '3y': return iso(y - 3, m, dd);
    default: return data[0].d;
  }
}
export const PERIODS = [['1m', '1 md.'], ['3m', '3 mdr.'], ['ytd', 'I år'], ['1y', '1 år'], ['3y', '3 år'], ['all', 'Siden start']];

export function slice(data, key) {
  if (key === 'all') return { pts: data, complete: true };
  const start = periodStart(data, key);
  const base = pointOnOrBefore(data, start);
  const complete = !!base && ts(base.d) >= ts(data[0].d) && ts(start) >= ts(data[0].d);
  const from = base ? data.indexOf(base) : 0;
  return { pts: data.slice(from), complete };
}

export function stats(fund) {
  const data = fund.data;
  const first = data[0], last = data.at(-1);
  const years = (ts(last.d) - ts(first.d)) / (365.25 * DAY);
  const total = last.total / first.total - 1;
  const cagr = years >= 1 ? Math.pow(last.total / first.total, 1 / years) - 1 : null;
  const ytdBase = pointOnOrBefore(data, periodStart(data, 'ytd'));
  const ytd = ytdBase ? last.total / ytdBase.total - 1 : last.total / first.total - 1;
  const ytdFromStart = !ytdBase;
  const y1Base = pointOnOrBefore(data, periodStart(data, '1y'));
  const y1 = y1Base ? last.total / y1Base.total - 1 : null;
  return { first, last, years, total, cagr, ytd, ytdFromStart, y1 };
}

export function monthly(fund) {
  const data = fund.data;
  const ends = new Map();
  for (const p of data) ends.set(p.d.slice(0, 7), p);
  const keys = [...ends.keys()];
  const rows = [];
  let prev = data[0];
  keys.forEach((k, i) => {
    const end = ends.get(k);
    const partialStart = i === 0 && data[0].d.slice(8) !== '01';
    const partialEnd = i === keys.length - 1;
    rows.push({ ym: k, y: +k.slice(0, 4), m: +k.slice(5, 7), r: end.total / prev.total - 1, end: end.d, partial: partialStart || partialEnd });
    prev = end;
  });
  const years = {};
  for (const r of rows) (years[r.y] ||= { y: r.y, months: {}, r: 1 }).months[r.m] = r;
  for (const y of Object.values(years)) {
    const ms = Object.values(y.months);
    y.r = ms.reduce((a, m) => a * (1 + m.r), 1) - 1;
    y.partial = ms.length < 12 || ms.some(m => m.partial);
  }
  return { rows, years: Object.values(years).sort((a, b) => b.y - a.y) };
}

// Drawdown-episoder: top → bund → (genvundet?).
export function drawdowns(fund) {
  const data = fund.data;
  const eps = [];
  let peak = data[0], trough = data[0], inDD = false;
  for (const p of data) {
    if (p.total >= peak.total) {
      if (inDD) { eps.push({ peak, trough, recovered: p, depth: trough.total / peak.total - 1 }); inDD = false; }
      peak = p; trough = p;
    } else {
      inDD = true;
      if (p.total < trough.total) trough = p;
    }
  }
  if (inDD) eps.push({ peak, trough, recovered: null, depth: trough.total / peak.total - 1 });
  eps.sort((a, b) => a.depth - b.depth);
  const last = data.at(-1);
  const ath = data.reduce((m, p) => (p.total > m.total ? p : m), data[0]);
  return { episodes: eps, current: last.total / ath.total - 1, ath };
}

export function exposure(positions, key = 'themeKey') {
  const m = {};
  for (const p of positions) {
    const k = p[key];
    (m[k] ||= { key: k, weight: 0, n: 0 });
    m[k].weight += p.weight || 0; m[k].n++;
  }
  return Object.values(m).sort((a, b) => b.weight - a.weight);
}

/* ---------- Formatering ---------- */
const nf1 = new Intl.NumberFormat('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const df = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const mf = new Intl.DateTimeFormat('da-DK', { month: 'short', year: 'numeric', timeZone: 'UTC' });
export const fmtDate = d => (d ? df.format(new Date(ts(d))) : '–');
export const fmtMonth = d => mf.format(new Date(ts(d)));
export const pct = (x, sign = true, digits = 1) => {
  if (x == null || Number.isNaN(x)) return '–';
  const v = x * 100;
  const s = (digits === 2 ? nf2 : nf1).format(Math.abs(v) < 0.05 ? 0 : v);
  return `${sign && v > 0.05 ? '+' : ''}${s} %`;
};
export const pctRaw = (v, sign = true) => (v == null ? '–' : pct(v / 100, sign));
export const num = (x, d = 1) => (x == null ? '–' : (d === 2 ? nf2 : nf1).format(x));
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const initials = n => String(n).replace(/\b(inc|corp|ltd|plc|ag|se|nv|sa|co|group|holdings?|the)\b\.?/gi, '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
export const arrow = x => (x == null ? '' : x > 0 ? '▲' : x < 0 ? '▼' : '■');
