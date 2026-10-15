/** NDI Analytics - static data loader (no live pipeline). */
export const WARN_HIST =
  'Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.';

export const MATURITY_LABELS = {
  prerevenue: 'Præ-revenue',
  preprofit: 'Præ-profit',
  highgrowth: 'High growth',
  garp: 'GARP',
  value: 'Value',
};

export const THEME_LABELS = {
  chips: 'Chips',
  compute: 'Compute',
  software: 'Software',
  platforms: 'Platforme',
  connect: 'Optik & netværk',
  space: 'SpaceTech',
  physical: 'Fysisk tech',
  energy: 'Energi',
  'energy-resources': 'Energiressourcer',
  andet: 'Andet / uklassificeret',
};

let cache = null;

export async function loadAll() {
  if (cache) return cache;
  const [portfolio, latest, context, multiTags] = await Promise.all([
    fetch('data/portfolio.json').then((r) => {
      if (!r.ok) throw new Error('portfolio.json');
      return r.json();
    }),
    fetch('data/latest.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch('data/context-events.json').then((r) => (r.ok ? r.json() : { events: [] })).catch(() => ({ events: [] })),
    fetch('data/multi-tags.json').then((r) => (r.ok ? r.json() : { byIsin: {} })).catch(() => ({ byIsin: {} })),
  ]);
  cache = { portfolio, latest, context, multiTags };
  return cache;
}

export function fundById(portfolio, id) {
  const key = String(id || '').toLowerCase();
  return portfolio.funds.find((f) => f.id === key) || portfolio.funds[0];
}

/** Slice series by period key; returns {d, total}[] */
export function slicePeriod(rows, period, asOf) {
  if (!rows?.length) return [];
  const end = rows[rows.length - 1].d;
  const endDate = new Date(end + 'T12:00:00Z');
  let start = rows[0].d;
  if (period === '1m') {
    const x = new Date(endDate); x.setUTCMonth(x.getUTCMonth() - 1); start = x.toISOString().slice(0, 10);
  } else if (period === '3m') {
    const x = new Date(endDate); x.setUTCMonth(x.getUTCMonth() - 3); start = x.toISOString().slice(0, 10);
  } else if (period === 'ytd') {
    start = end.slice(0, 4) + '-01-01';
  } else if (period === '1y') {
    const x = new Date(endDate); x.setUTCFullYear(x.getUTCFullYear() - 1); start = x.toISOString().slice(0, 10);
  }
  const filtered = rows.filter((r) => r.d >= start);
  return filtered.length ? filtered : rows.slice(-2);
}

/** Index to % from first total */
export function toPercentSeries(rows) {
  if (!rows.length) return [];
  const base = rows[0].total;
  return rows.map((r) => ({ d: r.d, v: ((r.total / base) - 1) * 100, total: r.total, price: r.price }));
}

export function cagr(rows) {
  if (!rows || rows.length < 2) return null;
  const a = rows[0], b = rows[rows.length - 1];
  const years = (new Date(b.d) - new Date(a.d)) / (365.25 * 86400000);
  if (years <= 0) return null;
  return (Math.pow(b.total / a.total, 1 / years) - 1) * 100;
}

export function periodReturn(rows) {
  if (!rows || rows.length < 2) return null;
  return ((rows[rows.length - 1].total / rows[0].total) - 1) * 100;
}

export function ytdReturn(rows) {
  if (!rows?.length) return null;
  const end = rows[rows.length - 1];
  const startYear = end.d.slice(0, 4) + '-01-01';
  let base = rows.find((r) => r.d >= startYear) || rows[0];
  // use last point of previous year if available
  const prev = [...rows].reverse().find((r) => r.d < startYear);
  if (prev) base = prev;
  return ((end.total / base.total) - 1) * 100;
}

export function last12mReturn(rows) {
  return periodReturn(slicePeriod(rows, '1y'));
}

/** Monthly calendar returns from daily totals */
export function monthlyReturns(rows) {
  const byMonth = new Map();
  for (const r of rows) {
    const m = r.d.slice(0, 7);
    byMonth.set(m, r);
  }
  const months = [...byMonth.keys()].sort();
  const out = [];
  for (let i = 1; i < months.length; i++) {
    const prev = byMonth.get(months[i - 1]);
    const cur = byMonth.get(months[i]);
    out.push({ month: months[i], ret: ((cur.total / prev.total) - 1) * 100 });
  }
  return out;
}

export function maxDrawdown(rows) {
  if (!rows?.length) return null;
  let peak = rows[0].total, maxDd = 0, peakD = rows[0].d, troughD = rows[0].d, startPeak = rows[0].d;
  let best = { dd: 0, peakD: rows[0].d, troughD: rows[0].d };
  for (const r of rows) {
    if (r.total >= peak) { peak = r.total; peakD = r.d; }
    const dd = (r.total / peak) - 1;
    if (dd < best.dd) best = { dd: dd * 100, peakD, troughD: r.d };
  }
  return best;
}

export function fmtPct(n, digits = 1) {
  if (n == null || Number.isNaN(n)) return '-';
  const sign = n > 0 ? '+' : '';
  return sign + n.toFixed(digits).replace('.', ',') + ' %';
}

export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00Z' : ''));
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function daTheme(t) { return THEME_LABELS[t] || t; }
export function daMat(m) { return MATURITY_LABELS[m] || m; }


/** Tags der ikke må vises offentligt før compliance-review (UX §0.2). */
export const BANNED_PUBLIC_TAGS = new Set([
  'legacy', 'mistænkt-legacy', 'trump-vinder', 'trump-taber', 'trump-winner', 'trump-loser',
]);

export function publicTags(tags) {
  return (tags || []).filter((t) => !BANNED_PUBLIC_TAGS.has(String(t).toLowerCase()));
}


/** Afsluttede kalenderårsafkast fra total-serien (1. jan → 31. dec / sidste punkt i året). */
export function calendarYearReturns(rows) {
  if (!rows?.length) return [];
  const byYear = new Map();
  for (const r of rows) {
    const y = r.d.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, { first: r, last: r });
    else byYear.get(y).last = r;
  }
  // For each year use last point of previous year as base when available
  const years = [...byYear.keys()].sort();
  const out = [];
  for (let i = 0; i < years.length; i++) {
    const y = years[i];
    const cur = byYear.get(y).last;
    let base;
    if (i === 0) base = byYear.get(y).first;
    else base = byYear.get(years[i - 1]).last;
    const partial = byYear.get(y).first.d.slice(5) !== '01-01' && i === 0;
    out.push({
      year: y,
      ret: ((cur.total / base.total) - 1) * 100,
      from: base.d,
      to: cur.d,
      partial: i === 0, // first year from inception is delår
    });
  }
  return out;
}

/** fund-meta.json (KID/PRIIP pr. klasse). Null hvis filen mangler. */
export async function loadFundMeta() {
  return fetch('data/fund-meta.json').then((r) => (r.ok ? r.json() : null)).catch(() => null);
}

/** company-profiles.json: { profiles: {ISIN: …}, media: [...] }. Tom ved fejl. */
export async function loadProfiles() {
  return fetch('data/company-profiles.json')
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .then((d) => d || { profiles: {}, media: [] });
}

/** Footer-linje med KID-links for begge klasser, bygget fra fund-meta (H6/B11). */
export function kidFooterHtml(meta) {
  const labels = { pmindi: 'PMINDI', pmindiakk: 'PMINDIAKK' };
  const links = Object.entries(meta?.funds || {})
    .filter(([, f]) => f.priip?.url)
    .map(([id, f]) => `<a href="${f.priip.url}">KID ${labels[id] || id} <span class="ext-mark">↗</span></a> <span class="kid-meta">(ISIN ${f.priip.isin} · SRI ${f.priip.risk_class}/${f.priip.risk_scale_max} · pr. ${fmtDate(f.priip.production_date)})</span>`);
  if (!links.length) return '';
  return `Central Information Dokument (Fundmarket, ekstern PDF): ${links.join(' · ')}`;
}

/** Udfyld [data-kid-footer] fra fund-meta; statisk fallback-tekst bevares ved fejl. */
export async function fillKidFooter() {
  const el = document.querySelector('[data-kid-footer]');
  if (!el) return;
  const html = kidFooterHtml(await loadFundMeta());
  if (html) el.innerHTML = html;
}

/** Find tema via slug ("optik-netvaerk") eller intern nøgle ("connect"). */
export function findTheme(themes, key) {
  return themes.find((t) => t.slug === key) || themes.find((t) => t.themeKey === key) || null;
}

export function lastNav(rows) {
  if (!rows?.length) return null;
  const r = rows[rows.length - 1];
  return { d: r.d, price: r.price, total: r.total };
}


/** Public theme tags for a position: multi-tag overlay ∪ primary theme. */
export function tagsFor(position, multiTags) {
  const primary = position?.theme ? [position.theme] : [];
  const extra = multiTags?.byIsin?.[position?.isin]?.tags || [];
  const set = new Set([...primary, ...extra].filter(Boolean));
  return publicTags([...set]);
}

// Overnight temaforslag (themeStatus: 'forslag'): kun antal, ingen nye tal pr. aktie.
// moved = fik et NDI-tema i stedet for "andet"; open = står stadig i "andet".
export function themeProposals(fund) {
  const props = (fund?.positions || []).filter((p) => p.themeStatus === 'forslag');
  const byTheme = {};
  for (const p of props) if (p.theme !== 'andet') byTheme[p.theme] = (byTheme[p.theme] || 0) + 1;
  const moved = props.filter((p) => p.theme !== 'andet').length;
  return { total: props.length, moved, open: props.length - moved, byTheme };
}
