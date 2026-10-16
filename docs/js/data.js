/** NDI Analytics - static data loader (no live pipeline). */
export const WARN_MARKETING = 'Markedsføringsmateriale.';
export const WARN_HIST =
  'Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering.';

export const MATURITY_LABELS = {
  prerevenue: 'Før omsætning',
  preprofit: 'Før overskud',
  highgrowth: 'Høj vækst',
  garp: 'Vækst med overskud',
  value: 'Moden',
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
  quantum: 'Quantum',
  andet: 'Andet / uden tema',
};

let cache = null;

export async function loadAll() {
  if (cache) return cache;
  const [portfolio, latest, context, multiTags, xPosts] = await Promise.all([
    fetch('data/portfolio.json').then((r) => {
      if (!r.ok) throw new Error('portfolio.json');
      return r.json();
    }),
    fetch('data/latest.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch('data/context-events.json').then((r) => (r.ok ? r.json() : { events: [] })).catch(() => ({ events: [] })),
    fetch('data/multi-tags.json').then((r) => (r.ok ? r.json() : { byIsin: {} })).catch(() => ({ byIsin: {} })),
    fetch('data/x-posts.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
  ]);
  cache = { portfolio, latest, context, multiTags, xPosts };
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
  if (!rows?.length) return [];
  const byMonth = new Map();
  const firstByMonth = new Map();
  for (const r of rows) {
    const m = r.d.slice(0, 7);
    if (!firstByMonth.has(m)) firstByMonth.set(m, r);
    byMonth.set(m, r);
  }
  const months = [...byMonth.keys()].sort();
  const out = [];
  // Første (del)måned: fra første NAV til månedens sidste kurs — så sep. 2023 ikke står som «-»
  if (months.length) {
    const m0 = months[0];
    const a = firstByMonth.get(m0);
    const b = byMonth.get(m0);
    if (a && b && a.d !== b.d && a.total) {
      out.push({ month: m0, ret: ((b.total / a.total) - 1) * 100, partial: true });
    }
  }
  for (let i = 1; i < months.length; i++) {
    const prev = byMonth.get(months[i - 1]);
    const cur = byMonth.get(months[i]);
    out.push({ month: months[i], ret: ((cur.total / prev.total) - 1) * 100 });
  }
  return out;
}


/** All peak→trough drawdown episodes (pct). Mean/median of episode depths (not daily underwater). */
export function drawdownEpisodes(rows) {
  if (!rows?.length) return [];
  const eps = [];
  let peak = rows[0].total, peakD = rows[0].d;
  let trough = rows[0].total, troughD = rows[0].d;
  let inDd = false;
  for (const r of rows) {
    if (r.total >= peak) {
      if (inDd && trough < peak) {
        eps.push({
          dd: ((trough / peak) - 1) * 100,
          peakD, troughD,
          recoveredD: r.d,
        });
      }
      peak = r.total; peakD = r.d;
      trough = r.total; troughD = r.d;
      inDd = false;
    } else {
      inDd = true;
      if (r.total < trough) { trough = r.total; troughD = r.d; }
    }
  }
  if (inDd && trough < peak) {
    eps.push({ dd: ((trough / peak) - 1) * 100, peakD, troughD, recoveredD: null });
  }
  return eps;
}

export function drawdownSummary(rows) {
  const eps = drawdownEpisodes(rows);
  if (!eps.length) return { episodes: [], max: null, mean: null, median: null };
  const depths = eps.map(e => e.dd).sort((a, b) => a - b); // more negative first
  const max = depths[0];
  const mean = depths.reduce((s, x) => s + x, 0) / depths.length;
  const mid = Math.floor(depths.length / 2);
  const median = depths.length % 2 ? depths[mid] : (depths[mid - 1] + depths[mid]) / 2;
  return { episodes: eps, max, mean, median };
}

export function maxDrawdown(rows) {
  if (!rows?.length) return null;
  let peak = rows[0].total, peakD = rows[0].d;
  let best = { dd: 0, peakD: rows[0].d, troughD: rows[0].d }; // dd as fraction until return
  for (const r of rows) {
    if (r.total >= peak) { peak = r.total; peakD = r.d; }
    const dd = (r.total / peak) - 1; // fraction
    if (dd < best.dd) best = { dd, peakD, troughD: r.d };
  }
  return { dd: best.dd * 100, peakD: best.peakD, troughD: best.troughD };
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

// Livscyklus i almindeligt dansk (samme ord som ideer.html/laer). Kun etiketter - ingen tal.
export const MATURITY_PLAIN = {
  prerevenue: 'Før omsætning',
  preprofit: 'Før overskud',
  highgrowth: 'Høj vækst',
  garp: 'Vækst med overskud',
  value: 'Moden',
};
export function daMatPlain(m) { return MATURITY_PLAIN[m] || daMat(m); }

// Modenhed for ét selskab, ærligt mærket: maskinelt forslag (maturityStatus=forslag) eller manuel klassifikation.
export function maturityView(p) {
  if (!(p?.maturity in MATURITY_LABELS)) return { set: false, forslag: false, value: 'Intet forslag', hint: 'NDI har endnu ikke sat et modenhedsforslag. Vi gætter ikke.' };
  const forslag = p.maturityStatus === 'forslag';
  return forslag
    ? { set: true, forslag, value: `${daMatPlain(p.maturity)} (forslag)`, hint: 'Maskinelt forslag ud fra offentlig branche og tema. Afventer NDI-gennemgang. Pædagogisk fase, ikke en rating.' }
    : { set: true, forslag, value: daMatPlain(p.maturity), hint: 'Manuel klassifikation i udkastet. Pædagogisk fase, ikke en rating.' };
}


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
  return `Dokument med central information (KID, Fundmarket, ekstern PDF): ${links.join(' · ')}`;
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
// moved = fik et foreslået NDI-tema; open = står stadig i "andet".
// themeFrom = temaet før forslaget. fromAndet = flyttet ud af Andet; retagged = flyttet fra et andet
// NDI-tema (fx Compute → Quantum), grupperet som { 'compute→quantum': n }.
export function themeProposals(fund) {
  const props = (fund?.positions || []).filter((p) => p.themeStatus === 'forslag');
  const byTheme = {};
  const retaggedPairs = {};
  let fromAndet = 0;
  for (const p of props) {
    if (p.theme === 'andet') continue;
    byTheme[p.theme] = (byTheme[p.theme] || 0) + 1;
    const from = p.themeFrom || 'andet';
    if (from === 'andet') fromAndet++;
    else { const k = `${from}→${p.theme}`; retaggedPairs[k] = (retaggedPairs[k] || 0) + 1; }
  }
  const moved = props.filter((p) => p.theme !== 'andet').length;
  const retagged = Object.entries(retaggedPairs).map(([k, n]) => {
    const [from, to] = k.split('→');
    return { from, to, n };
  }).sort((a, b) => b.n - a.n);
  return { total: props.length, moved, open: props.length - moved, byTheme, fromAndet, retagged };
}

// Temaforslag som skift "fra → til" (themeFrom → theme; uden themeFrom = fra Andet). Bruges til
// gennemgangs-filteret skift=<fra>~<til> i screener og A-Z. "andet~andet" = forslag uden tema endnu.
// Kun tema-felter - ingen tal pr. aktie.
export function themeShift(p) {
  if (p?.themeStatus !== 'forslag') return null;
  const from = p.themeFrom || 'andet';
  return { from, to: p.theme, key: `${from}~${p.theme}` };
}
export function themeShifts(positions) {
  const m = new Map();
  for (const p of positions || []) {
    const s = themeShift(p);
    if (!s) continue;
    if (!m.has(s.key)) m.set(s.key, { ...s, n: 0 });
    m.get(s.key).n++;
  }
  // Flyttede først (flest øverst), "stadig Andet" sidst
  return [...m.values()].sort((a, b) => ((a.to === 'andet') - (b.to === 'andet')) || b.n - a.n
    || daTheme(a.to).localeCompare(daTheme(b.to), 'da'));
}
// Usikre temaforslag (portfolio.json themeDoubt/themeAlt): udkastets egen tvivl om et forslag, så NDI
// har en kort beslutningsliste. why = begrundelse (tekst), alt = alternativt tema-nøgle ('andet' = bliv i Andet).
export function themeDoubt(p) {
  if (p?.themeStatus !== 'forslag' || !p.themeDoubt) return null;
  return { why: p.themeDoubt, alt: p.themeAlt || '' };
}
// Læsbart visningsnavn til overskrifter. Beholdningsnavnet (p.name) er depotbankens forkortede navn
// ("Sea Sp ADR", "SUESS MicroTec N", "Southern Co/The" → "Southern Co"); det bevares til søgning, sortering og som "beholdningsnavn".
// Kun sikre omskrivninger: kendte forkortelser, ADR som parentes, tysk "N" (navneaktie) fjernes.
const NAME_FIX = {
  'Sea Sp ADR': 'Sea Limited (ADR)', 'Infineon Technolo N': 'Infineon Technologies', 'Taiwan Semi Sp ADR': 'TSMC (ADR)',
  'Silicon Mot Sp ADR': 'Silicon Motion (ADR)', 'Himax Tech Sp ADR': 'Himax Technologies (ADR)',
  'CrwdStrik Hldg': 'CrowdStrike Holdings', 'Cslm Digital Asset Acqu - A': 'CSLM Digital Asset Acquisition',
  'Advanced Micro D': 'Advanced Micro Devices (AMD)', 'United Microelectron-Sp Adr': 'United Microelectronics (ADR)',
  'Aehr Test System': 'Aehr Test Systems', 'Applied Material': 'Applied Materials', 'ASML Hold NY Reg': 'ASML Holding',
  'Alibaba Grp Sp ADS': 'Alibaba Group (ADR)', 'Aurora Innovtn': 'Aurora Innovation', 'Bitmine Immersion Technologi': 'Bitmine Immersion Technologies',
  'Cadence Design': 'Cadence Design Systems', 'Coinbase Glb': 'Coinbase Global', 'Howmet Aerspc': 'Howmet Aerospace',
  'Lattice Semicond': 'Lattice Semiconductor', 'Navitas Semicond': 'Navitas Semiconductor', 'Nordic Semicondu': 'Nordic Semiconductor',
  'Palantir Tchnl': 'Palantir Technologies', 'Palo Alto Net': 'Palo Alto Networks', 'Renesas Electro': 'Renesas Electronics',
  'Robinhood Mkts': 'Robinhood Markets', 'Texas Instrument': 'Texas Instruments', 'Tower Semicon In': 'Tower Semiconductor',
  'Lynas Rare': 'Lynas Rare Earths', 'Meituan Dianpi-B': 'Meituan', 'Pinduoduo Sp ADS': 'PDD Holdings (ADR)',
  'Li Auto Sp ADS': 'Li Auto (ADR)', 'Kaspi Sp GDR-Reg S': 'Kaspi.kz (GDR)', 'Keysight Technologies In': 'Keysight Technologies',
  'Macom Technology Solutions H': 'MACOM Technology Solutions', 'Idaho Strategic Resources In': 'Idaho Strategic Resources',
  'Neo Performance Materials In': 'Neo Performance Materials', 'International Workplace Grou': 'International Workplace Group',
  'Power Solutions Internationa': 'Power Solutions International', 'Solaris Energy Infrastructur': 'Solaris Energy Infrastructure',
  'Figure Technology Solut-Cl A': 'Figure Technology Solutions', 'Asm Int': 'ASM International', 'Crdo': 'Credo Technology',
  'Prosus Rg-N': 'Prosus', 'Huber + Suhner Ag-Reg': 'Huber + Suhner',
};
export function displayName(p) {
  const raw = (p?.name || '').trim();
  if (NAME_FIX[raw]) return NAME_FIX[raw];
  let n = raw.replace(/\/The$/, '').replace(/\s*\/\s*(Us|Delaware)$/i, '');
  const adr = /(\s+Sp)?[\s-]+ADR$/i.test(n);
  n = n.replace(/(\s+Sp)?[\s-]+ADR$/i, '')
    .replace(/\s*-\s*(Cl(ass)?\s*)?A$/i, '') // aktieklasse A
    .replace(/(\s|-)N$/, '').replace(/\s+Br$/, '') // tysk navneaktie / ihændehaver
    .replace(/\bHld(n)?gs?\b/g, 'Holdings').trim();
  return adr ? `${n} (ADR)` : n;
}
// Warrants (tegningsretter) ligger som egne positioner med ~0 % vægt, men er ikke selvstændige selskaber.
// Moderselskabet findes ud fra navnet før "Warrant" (fx "Opendoor Tech Warrant Series A" → "Opendoor Tech").
export function warrantParent(p, positions = []) {
  const m = /^(.*?)\s+warrants?\b/i.exec(p?.name || '');
  if (!m) return null;
  const base = m[1].trim();
  const hit = positions.find((x) => x.isin !== p.isin && x.name.trim().toLowerCase() === base.toLowerCase());
  return hit || { name: base, isin: null };
}
export const doubtAltLabel = (alt) => (!alt ? '' : alt === 'andet' ? 'bliv i Andet' : daTheme(alt));

// "Andet / uklassificeret" forkortes til "Andet" i skift-etiketter og før-linjer
export const shiftFromLabel = (from) => (from === 'andet' ? 'Andet' : daTheme(from));
export const shiftLabel = (s) => (s.to === 'andet' ? 'Stadig Andet (intet tema passede)' : `${shiftFromLabel(s.from)} → ${daTheme(s.to)}`);

// Værdikæde for et tema (value-chains.json). Et tema kan optræde i flere kæder; hjem-kæden er den,
// hvor temaet er et bærende led. AI-stakkens temaer hører hjemme i AI-compute, Energiressourcer i Energi.
// Øvrige temaer: kæde med samme id, ellers første kæde hvor temaet indgår.
const CHAIN_HOME = {
  chips: 'ai-compute', compute: 'ai-compute', connect: 'ai-compute', software: 'ai-compute', platforms: 'ai-compute',
  'energy-resources': 'energy',
};
export function chainForTheme(chains, key) {
  const list = chains || [];
  return list.find((c) => c.id === (CHAIN_HOME[key] || key))
    || list.find((c) => (c.links || c.steps || []).some((l) => (l.themes || []).includes(key)))
    || null;
}

// Anker på vaerdikaeder.html: Rum har eget kapitel; øvrige kæder vælges i fanerne i #kap-kaeder.
export const chainHref = (key) => (key === 'space' ? 'vaerdikaeder.html#kap-rum' : 'vaerdikaeder.html#kap-kaeder');

// Fælles søgning for screener (app.js) og A-Z (selskaber.html). Rækkefølge: navn/ticker/ISIN → alle
// tema-tags (inkl. multi-tag) → NDI-linsens kvalitative tekst (værdi + hint; ikke Livscyklus/NDI-tag, min. 3 tegn).
// Returnerer null eller { via: 'navn' | 'tema' | 'linse', label?, value? } - linse-hits viser,
// hvilket felt der matchede, så et hit som "kvante" på QuantumScape kan læses i kontekst.
const fold = (s) => String(s ?? '').toLocaleLowerCase('da');
export function searchPosition(p, q, multiTags, lensByIsin) {
  const needle = fold(q).trim();
  if (!needle) return { via: 'alle' };
  if ([p.name, displayName(p), p.symbol, p.isin].some((x) => fold(x).includes(needle))) return { via: 'navn' };
  const tags = tagsFor(p, multiTags);
  const tagHit = tags.find((t) => fold(daTheme(t)).includes(needle) || fold(t).includes(needle));
  if (tagHit) return { via: 'tema', value: daTheme(tagHit) };
  if (needle.length < 3) return null; // 1-2 tegn rammer næsten al fritekst
  for (const m of lensByIsin?.[p.isin]?.metrics || []) {
    // Livscyklus: samme tekst for alle. NDI-tag: dækket af tema-tags ovenfor ("før: Andet" ville forvirre).
    if (m.label === 'Livscyklus' || m.label.startsWith('NDI-tag')) continue;
    if (fold(m.value).includes(needle)) return { via: 'linse', label: m.label, value: m.value };
    const at = fold(m.hint).indexOf(needle);
    if (at >= 0) {
      // Match kun i hint-teksten: vis et uddrag omkring ordet i stedet for feltets overskrift
      const from = Math.max(0, m.hint.lastIndexOf(' ', Math.max(0, at - 30)) + 1);
      const end = m.hint.indexOf(' ', Math.min(m.hint.length, at + needle.length + 30));
      const cut = end < 0 ? m.hint.length : end;
      const snip = (from > 0 ? '…' : '') + m.hint.slice(from, cut).replace(/[.,;:]$/, '') + (cut < m.hint.length ? '…' : '');
      return { via: 'linse', label: m.label, value: snip };
    }
  }
  return null;
}
