import {
  loadAll, fundById, slicePeriod, cagr, periodReturn, ytdReturn,
  monthlyReturns, maxDrawdown, fmtPct, fmtDate, daTheme, daMat, daMatPlain, WARN_HIST,
  MATURITY_LABELS, THEME_LABELS, calendarYearReturns, lastNav, publicTags, tagsFor, fillKidFooter, themeProposals,
  searchPosition, themeShift, themeShifts, shiftLabel, shiftFromLabel, themeDoubt, doubtAltLabel, warrantParent, displayName,
} from './data.js';
import { renderChart } from './chart.js';

const state = {
  fund: 'pmindi',
  view: 'entre', // entre | fonden | portefolje | udforsk
  period: 'all', // kun all|ytd|year:YYYY
  tags: [],
  maturity: [],
  sort: 'weight',
  dir: 'desc',
  status: '', // '' | 'forslag' | 'fast' - temastatus, ikke et tal pr. aktie
  skift: '', // '' | '<fra>~<til>' - gennemgang af ét temaforslag-skift (kræver status=forslag)
  tvivl: false, // kun usikre temaforslag (themeDoubt) - NDI-beslutningsliste; kræver status=forslag; URL tvivl=1
  linse: false, // kun selskaber med kvalitativ NDI-linse (unique-metrics.json); samme URL som A-Z: linse=1
  q: '',
  calFull: false,
};

let DATA = null;
let MONTHS = null;
let LENS = {}; // isin → NDI-linse (kun kvalitativ tekst)
const hasLens = (p) => !!LENS[p.isin]?.metrics?.length;
let HITS = new Map(); // isin → søgehit fra seneste filterPositions (via navn/tema/linse) - kun til visning

// Compliance: kun disse sorteringer findes (whitelist). Ingen kurs-, P/S-, P/E-, 52u-, vol- eller
// insider-sortering pr. aktie i v1 - se notes/MADS-CHECKLIST.md (deferred).
const SORTS = { weight: 'vægt', name: 'navn', theme: 'tema' };
const STATUSES = { forslag: 'kun temaforslag', fast: 'uden temaforslag' };

// Modenhed (livscyklus): værdier med maturityStatus=forslag er heuristik fra offentlige industrier — ikke NDI's endelige rating.
function maturityCounts(fund) {
  const n = Object.fromEntries(Object.keys(MATURITY_LABELS).map((m) => [m, 0]));
  for (const p of fund.positions || []) if (p.maturity in n) n[p.maturity]++;
  return n;
}
// Gamle/delte links med ?mat= må ikke give en tavs tom liste: behold kun faser, som findes i data.
function sanitizeMaturity() {
  const known = new Set(DATA.portfolio.funds.flatMap((f) =>
    Object.entries(maturityCounts(f)).filter(([, n]) => n).map(([m]) => m)));
  const before = state.maturity.join(',');
  state.maturity = state.maturity.filter((m) => known.has(m));
  return before !== state.maturity.join(',');
}

function weightSpark(isin, fundId) {
  // Kun fondens vægt pr. kvartalssnapshot (≤ cutoff) - aldrig aktiekurs. Søjler fra nul pr. række,
  // så det ikke ligner en kurslinje (UX 22:00 MUST 3).
  const rows = MONTHS?.funds?.[fundId];
  if (!rows) return '';
  const pts0 = rows.map((row) => ({ d: row.date, w: row.weights?.[isin] })).filter((p) => p.w != null);
  if (pts0.length < 2) return '';
  const series = pts0.map((p) => p.w);
  const max = Math.max(...series, 0.01);
  const h = 16, bw = 4, gap = 2;
  const w = series.length * (bw + gap) - gap;
  const bars = series.map((v, i) => {
    const bh = Math.max(1, (v / max) * h);
    return `<rect x="${i * (bw + gap)}" y="${(h - bh).toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" rx="1"/>`;
  }).join('');
  const pct = (v) => v.toFixed(2).replace('.', ',') + ' %';
  const first = pts0[0], last = pts0[pts0.length - 1];
  const label = `Vægt i fonden: ${pct(first.w)} (${fmtDate(first.d)}) → ${pct(last.w)} (${fmtDate(last.d)}), ${pts0.length} kvartalsrapporter. Ikke aktiekurs.`;
  return `<svg class="spark spark-bars" width="${w}" height="${h}" role="img" aria-label="${label}"><title>${label}</title><g fill="var(--cyan)">${bars}</g></svg>`;
}


function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function readUrl() {
  const u = new URL(location.href);
  state.fund = (u.searchParams.get('fund') || 'pmindi').toLowerCase();
  state.view = u.searchParams.get('view') || 'entre';
  state.period = u.searchParams.get('periode') || 'all';
  // Interne tags (legacy/Trump) må aldrig ende i chips eller URL - UX §0.2, INTERNAL-TAGS.md
  state.tags = publicTags((u.searchParams.get('tags') || '').split(',').filter(Boolean));
  state.maturity = (u.searchParams.get('mat') || '').split(',').filter(Boolean);
  const sort = u.searchParams.get('sort');
  state.sort = SORTS[sort] ? sort : 'weight';
  state.dir = u.searchParams.get('dir') === 'asc' ? 'asc' : (u.searchParams.get('dir') === 'desc' ? 'desc' : (state.sort === 'weight' ? 'desc' : 'asc'));
  const status = u.searchParams.get('status');
  state.status = STATUSES[status] ? status : '';
  // Skift valideres mod data i main() (sanitizeShift); her kun formen <fra>~<til>
  const skift = u.searchParams.get('skift') || '';
  state.skift = state.status === 'forslag' && /^[a-z-]+~[a-z-]+$/.test(skift) ? skift : '';
  state.tvivl = state.status === 'forslag' && u.searchParams.get('tvivl') === '1';
  state.q = u.searchParams.get('q') || '';
  state.linse = u.searchParams.get('linse') === '1';
  state.calFull = u.searchParams.get('cal') === 'all';
}

function writeUrl(replace = false) {
  const u = new URL(location.href);
  const set = (k, v, def) => {
    if (!v || v === def) u.searchParams.delete(k);
    else u.searchParams.set(k, v);
  };
  set('fund', state.fund, 'pmindi');
  set('view', state.view, 'entre');
  set('periode', state.period, 'all');
  set('tags', state.tags.join(','), '');
  set('mat', state.maturity.join(','), '');
  set('sort', state.sort, 'weight');
  set('dir', state.dir, state.sort === 'weight' ? 'desc' : 'asc');
  set('status', state.status, '');
  set('skift', state.status === 'forslag' ? state.skift : '', '');
  set('tvivl', state.status === 'forslag' && state.tvivl ? '1' : '', '');
  set('q', state.q, '');
  set('linse', state.linse ? '1' : '', '');
  set('cal', state.calFull ? 'all' : '', '');
  history[replace ? 'replaceState' : 'pushState'](null, '', u);
}

function toast(msg) {
  let t = $('.toast');
  if (!t) {
    t = document.createElement('div'); t.className = 'toast';
    t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
    document.body.append(t);
  }
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._id);
  toast._id = setTimeout(() => { t.hidden = true; }, 2800);
}

function openDialog(id) {
  const tpl = document.getElementById(id);
  if (!tpl) return;
  // Kun én dialog ad gangen (synkront, uden at stjæle fokus-retur fra den nye)
  document.querySelectorAll('.dialog-backdrop').forEach((el) => el.remove());
  document.querySelectorAll('header[inert], main[inert], footer[inert], .skip[inert]').forEach((el) => { el.inert = false; });
  const prevFocus = document.activeElement;
  const backdrop = document.createElement('div');
  backdrop.className = 'dialog-backdrop';
  backdrop.innerHTML = tpl.innerHTML;
  const dialog = backdrop.querySelector('.dialog');
  if (dialog) {
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
  }
  // Modal: baggrunden er inert (ingen fokus/skærmlæser), toast forbliver læsbar
  const behind = [...document.body.children].filter((el) => el.matches('header, main, footer, .skip'));
  behind.forEach((el) => { el.inert = true; });
  const close = () => {
    behind.forEach((el) => { el.inert = false; });
    backdrop.remove();
    if (prevFocus?.isConnected && prevFocus.focus) prevFocus.focus();
  };
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  backdrop.querySelector('[data-close]')?.addEventListener('click', close);
  // focus trap
  const focusables = () => [...backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.disabled && el.getAttribute('aria-hidden') !== 'true');
  backdrop.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const list = focusables();
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.body.append(backdrop);
  // Dobbelt rAF: sikr at fokus flyttes ind i dialogen efter paint (Playwright/desktop)
  const focusFirst = () => {
    const list = focusables();
    (list.find((el) => el.matches('[data-close]')) || list[0])?.focus();
  };
  focusFirst();
  requestAnimationFrame(focusFirst);
  backdrop.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
        toast('ISIN kopieret');
      } catch {
        toast('Kunne ikke kopiere - markér koden manuelt');
      }
    });
  });
  backdrop.querySelector('[data-subscribe]')?.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Udkast: tilmelding er ikke aktiv endnu');
  });
}

/** Ordliste-link ved metriklabel (UX I6/F10): virker ved klik og fokus, ikke kun hover. */
const GLOSS = {
  total: 'Totalafkast', cagr: 'CAGR', ytd: 'År til dato', drawdown: 'Fald fra top',
  ps: 'P/S', pe: 'P/E', modenhed: 'Modenhed', sri: 'Risikoindikator (SRI)',
};
function gl(key) {
  return `<a class="info-btn" href="om-data.html#g-${key}" title="Hvad betyder ${GLOSS[key]}? Se ordlisten" aria-label="Hvad betyder ${GLOSS[key]}? Se ordlisten">?</a>`;
}

/** Segmenteret vælger (vælg én af N) = APG radiogroup: roving tabindex, pile/Home/End i wireKeyboard. */
function segHtml(label, items) {
  return `<div class="seg" role="radiogroup" aria-label="${label}">${items.map((it) =>
    `<button type="button" class="control ${it.on ? 'active' : ''}" ${it.attr} role="radio" aria-checked="${it.on}" tabindex="${it.on ? 0 : -1}"${it.title ? ` title="${it.title}"` : ''}>${it.label}</button>`).join('')}</div>`;
}
function fundSeg() {
  return segHtml('Andelsklasse', DATA.portfolio.funds.map((f) =>
    ({ attr: `data-fund="${f.id}"`, on: f.id === state.fund, label: f.short })));
}

function stripCashtags(text) {
  return String(text || '')
    .replace(/\$[A-Za-z][A-Za-z0-9._]*/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function warnHtml() {
  return `<p class="eyebrow" style="margin-bottom:6px">MARKEDSFØRINGSMATERIALE</p><p class="warn warn-hist" role="note">${WARN_HIST}</p>`;
}

/** Vandret scroll. Hint og fade vises kun, når indholdet er bredere end feltet. */
function hscroll(inner, hint) {
  return `<div class="hscroll" data-hscroll><p class="hscroll-hint" hidden>${hint}</p><div class="hscroll-clip">${inner}</div></div>`;
}

function syncHscroll(box) {
  const scroller = box.querySelector('.hscroll-clip > .table-wrap, .hscroll-clip > #calendar');
  const hint = box.querySelector('.hscroll-hint');
  if (!scroller || !hint) return;
  const overflow = scroller.scrollWidth > scroller.clientWidth + 2;
  const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;
  hint.hidden = !overflow;
  box.classList.toggle('is-hscroll', overflow && !atEnd);
  if (overflow) {
    scroller.tabIndex = 0;
    scroller.setAttribute('role', 'region');
    scroller.setAttribute('aria-label', hint.textContent.trim());
  } else {
    scroller.removeAttribute('tabindex');
    if (scroller.getAttribute('role') === 'region') scroller.removeAttribute('role');
    scroller.removeAttribute('aria-label');
  }
}

function markHscroll(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-hscroll]').forEach((box) => {
    const scroller = box.querySelector('.hscroll-clip > .table-wrap, .hscroll-clip > #calendar');
    if (scroller && !scroller.dataset.hscrollBound) {
      scroller.dataset.hscrollBound = '1';
      scroller.addEventListener('scroll', () => syncHscroll(box), { passive: true });
    }
    syncHscroll(box);
  });
}

function renderEntre(root) {
  // Samme klasse som temaer.html?fund= (hub'en tæller fra den valgte klasses beholdning), så tallet matcher siden bag døren
  const prop = themeProposals(fundById(DATA.portfolio, state.fund));
  const nMat = Object.values(maturityCounts(fundById(DATA.portfolio, state.fund))).reduce((x, y) => x + y, 0);
  root.innerHTML = `
    <p class="eyebrow">NDI ANALYTICS · UDKAST</p>
    <h1>Gå på opdagelse i NewDeal Invest</h1>
    <p class="lede">Et sted hvor du kan se fondens udvikling, forstå porteføljen gennem NDI's egne temaer - og finde selskaberne uden de klassiske 11 sektorkasser. Dette er et klikbart udkast (ikke den live hjemmeside).</p>
    <p class="updated-stamp"><strong>Senest opdateret</strong>
      <span>Afkast-snapshot: <time datetime="${DATA.portfolio.performanceAsOf || DATA.portfolio.asOf}">${fmtDate(DATA.portfolio.performanceAsOf || DATA.portfolio.asOf)}</time></span>
      <span>Beholdning (forsinket snapshot): <time datetime="${DATA.portfolio.asOf}">${fmtDate(DATA.portfolio.asOf)}</time></span></p>
    <p class="band">Segmenter og temaer viser <strong>eksponering</strong>, ikke en anbefaling. Indholdet er generel information.</p>
    <p class="doors-h"><span class="doors-step">Start her</span> Tre spørgsmål, tre døre</p>
    <div class="doors" role="navigation" aria-label="Vælg område">
      <a class="door" href="?view=fonden&fund=${state.fund}" data-nav="fonden">
        <span class="door-q">1 · Hvordan har fonden klaret sig?</span>
        <strong>Fonden</strong>
        <span>Udvikling siden start, kalenderår, største fald og dokumenterede udbytter.</span>
        <span class="go">Åbn fonden →</span>
      </a>
      <a class="door" href="?view=portefolje&fund=${state.fund}" data-nav="portefolje">
        <span class="door-q">2 · Hvad ejer fonden?</span>
        <strong>Porteføljen</strong>
        <span>Forsinket snapshot fordelt på NDI-temaer.${nMat ? ` Modenhed: ${nMat} selskaber med <span class="badge badge-draft">forslag</span>.` : ' Modenhed er endnu ikke sat (forslag mangler).'}</span>
        <span class="go">Se beholdninger →</span>
      </a>
      <a class="door" href="?view=udforsk&fund=${state.fund}" data-nav="udforsk">
        <span class="door-q">3 · Hvilke selskaber er det?</span>
        <strong>Udforsk tech</strong>
        <span>Find porteføljens selskaber efter tema, navn eller ISIN - uden de klassiske sektorkasser.</span>
        <span class="go">Åbn Udforsk →</span>
      </a>
    </div>
    <p class="doors-h"><span class="doors-step">Forstå linsen</span> Hvordan NDI ser tech</p>
    <nav class="doors-sub doors-sub-3" aria-label="Forstå linsen">
      <a href="temaer.html?fund=${state.fund}"><strong>Temaer${prop.moved ? ` <span class="badge badge-draft" title="Forslag, afventer gennemgang">${prop.moved} forslag</span>` : ''}</strong><span>Fra chips til software - hvad hvert tema dækker</span></a>
      <a href="vaerdikaeder.html"><strong>Teknologiske værdikæder</strong><span>Fra chip til energi og rum — hvor flaskehalsene sidder</span></a>
      <a href="laer/saadan-taenker-vi.html"><strong>Sådan tænker vi</strong><span>Møntspil, udviklingen frem for vinderen, bogen vs fonden</span></a>
      <a href="omkostninger.html"><strong>Omkostninger</strong><span>Hvad koster det at eje fonden? (ca. 2,8 % om året)</span></a>
      <a href="laer/index.html"><strong>Lær</strong><span>Livscyklus, P/E, variance drag og FAQ</span></a>
    </nav>
    <a class="why-card" href="ideer.html"><strong>Hvorfor NDI Analytics?</strong><span>Idéerne bag udkastet: flere temaer pr. selskab, værdikæden og forsinket beholdning som et bevidst valg.</span><span class="go" aria-hidden="true">→</span></a>
    <p class="more-links">Også i udkastet:
      <a href="drawdown.html?fund=${state.fund}">Største fald</a> ·
      <a href="sammenlign.html">PMINDI vs PMINDIAKK</a> ·
      <a href="invester.html">Sådan investerer du</a> ·
      <a href="selskab.html?isin=JP3436100006&fund=${state.fund}">Eksempel: SoftBank</a> ·
      <a href="selskaber.html?fund=${state.fund}">Selskaber A-Z</a> ·
      <a href="nyhedsarkiv.html">Nyhedsarkiv</a> ·
      <a href="om-data.html">Ordliste &amp; data</a> ·
      <a href="fakta.html">Fakta</a> ·
      <a href="omkostninger.html">Omkostninger</a> ·
      <a href="risici.html">Risici / KID</a> ·
      <a href="ndi-paa-x.html">NDI på X</a> ·
      <a href="embed/chart.html">Embed-graf</a> ·
      <a href="kort.html">Sidekort</a> ·
      <button type="button" class="link-btn" data-open="dlg-follow">Følg med</button></p>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Porteføljeholdet</h2>
      <p style="color:var(--muted);font-size:14px;line-height:1.5"><strong style="color:var(--text)">Mads Christiansen</strong> (fondschef og medstifter) og <strong style="color:var(--text)">Jesper Bæk</strong> — forfattere til <em>Den lille guide til investering i teknologiaktier</em>. NewDeal Invest forvaltes med fokus på teknologi og bred spredning. <a href="https://newdealinvest.dk/">Mere om holdet på newdealinvest.dk →</a></p>
    </section>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Sådan tænker vi (kort)</h2>
      <ol style="color:var(--muted);font-size:14px;line-height:1.55;padding-left:20px;display:grid;gap:8px">
        <li>Teknologi er drivkraften — retningen kan skimtes, vinderne kan ikke udpeges sikkert. <a href="laer/saadan-taenker-vi.html">Sådan tænker vi →</a></li>
        <li>Vi vælger <strong style="color:var(--text)">udviklingen frem for vinderen</strong>: bred spredning, ikke én “vinderaktie”. Eksempel: 100 kr. → +50 % → −40 % = 90 kr. — store udsving æder afkastet. <a href="laer/variance-drag.html">CAGR og gennemsnit →</a></li>
        <li>Store kursudsving er et grundvilkår i tech. Fald kan være store og vare længe. <a href="drawdown.html?fund=${state.fund}">Største fald →</a></li>
        <li>P/E er ikke vores hovedværktøj for vækstvirksomheder, der investerer tungt i fremtiden. <a href="laer/pe-forklaring.html">Hvad P/E fortæller →</a></li>
        <li>Fonden er tænkt med lang horisont. Bogens råd til privatpersoner og fondens forvaltning er ikke det samme: <a href="laer/rebalancering.html">Bogen og fonden →</a></li>
      </ol>
      <p class="link-row" style="margin-top:12px">
        <a class="outline-btn small" href="laer/saadan-taenker-vi.html">Sådan tænker vi</a>
        <a class="outline-btn small" href="omkostninger.html">Omkostninger</a>
        <a class="outline-btn small" href="laer/index.html">Alle lær-sider</a>
      </p>
    </section>`;
}

function renderFonden(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const rows = fund.data;
  const isAkk = fund.id === 'pmindiakk' || (fund.short || '').includes('AKK');
  const asOfPerf = rows[rows.length - 1]?.d || DATA.portfolio.performanceAsOf || DATA.portfolio.asOf;
  const posAsOf = fund.positionsAsOf || DATA.portfolio.asOf;
  const nav = lastNav(rows);

  // PMINDIAKK: skjul NAV og kursserie indtil 12 måneder efter start (5. dec. 2026)
  if (isAkk) {
    root.innerHTML = `
      <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
      <p class="eyebrow">FONDEN · MARKEDSFØRINGSMATERIALE</p>
      <h1>${fund.short}</h1>
      <p class="lede">Akkumulerende andelsklasse · ISIN ${fund.isin}</p>
      <div class="toolbar">
        ${fundSeg()}
      </div>
      <section class="panel">
        <p class="band" style="font-size:16px;color:var(--text);line-height:1.55"><strong>Ny andelsklasse, kurs vises efter 12 måneder.</strong></p>
        <p style="color:var(--muted);line-height:1.55">Kurs og afkast for PMINDIAKK vises fra 5. december 2026. Klassen følger samme overordnede strategi som PMINDI. Der vises ingen NAV og ingen kursserie før da.</p>
        ${warnHtml()}
        <p class="note-fundmarket">Fonden har intet fast benchmark; vi viser derfor ingen sammenligningskurve. Beholdningen er et forsinket kvartalssnapshot (seneste offentlige Fundmarket-rapport) — ikke dagsaktuelt.</p>
      </section>
      <section class="panel">
        <h2 style="font-size:18px;margin-bottom:8px">Risiko (kort)</h2>
        <p style="color:var(--muted);font-size:13px;line-height:1.55">Risikoindikator <strong style="color:var(--text)">5</strong> på en skala fra 1 til 7 (KID). Anbefalet ejertid 5 år. Du kan tabe en del af eller hele din investering. Se KID-links i footeren.</p>
        <p style="margin-top:12px"><button type="button" class="outline-btn small" data-open="dlg-invest">Sådan investerer du · Kopiér ISIN</button>
      <a class="outline-btn small" style="margin-left:8px" href="risici.html">Risici / KID →</a></p>
      </section>`;
    return;
  }

  // PMINDI: kun siden start, YTD, afsluttede kalenderår, ingen 1 md / 3 md
  const years = calendarYearReturns(rows);
  const totAll = periodReturn(rows);
  const c = cagr(rows);
  const ytd = ytdReturn(rows);
  const periodKey = state.period;
  let sliced = rows;
  let periodLabel = 'Siden start';
  if (periodKey === 'ytd') {
    sliced = slicePeriod(rows, 'ytd');
    periodLabel = 'År til dato';
  } else if (String(periodKey).startsWith('year:')) {
    const y = periodKey.slice(5);
    const yr = years.find((x) => x.year === y);
    if (yr) {
      sliced = rows.filter((r) => r.d >= yr.from && r.d <= yr.to);
      periodLabel = y + (yr.partial ? ' (delår fra start)' : '');
    }
  } else {
    state.period = 'all';
  }

  const periodSeg = segHtml('Periode', [
    { attr: 'data-period="all"', on: state.period === 'all', label: 'Siden start' },
    { attr: 'data-period="ytd"', on: state.period === 'ytd', label: 'ÅTD', title: 'År til dato' },
    ...years.map((y) => ({
      attr: `data-period="year:${y.year}"`, on: state.period === 'year:' + y.year,
      label: y.year + (y.partial ? '*' : ''), title: y.partial ? 'Delår fra start' : '',
    })),
  ]);

  const yearTable = years.map((y) =>
    `<tr><td>${y.year}${y.partial ? ' <span class="badge">delår</span>' : ''}</td><td>${fmtPct(y.ret)}</td><td style="color:var(--muted);font-size:12px">${fmtDate(y.from)} - ${fmtDate(y.to)}</td></tr>`
  ).join('');
  const yearTableDeep = years.map((y) =>
    `<tr><td>${y.year}${y.partial ? ' <span class="badge">delår</span>' : ''}</td><td>${fmtPct(y.ret)}</td><td style="color:var(--muted);font-size:12px">${fmtDate(y.from)} - ${fmtDate(y.to)}</td><td><a href="periode.html?fund=${state.fund}&year=${y.year}">Dyb →</a></td></tr>`
  ).join('');

  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">FONDEN · MARKEDSFØRINGSMATERIALE</p>
    <h1>${fund.short || fund.id.toUpperCase()}</h1>
    <p class="lede fonden-lede">Udloddende · totalafkast i DKK efter løbende omkostninger · afkast pr. ${fmtDate(asOfPerf)} · beholdning forsinket pr. ${fmtDate(posAsOf)}.</p>
    <div class="toolbar">
      ${fundSeg()}
      ${periodSeg}
    </div>
    <section class="panel">
      <div class="metrics metrics-returns">
        <div class="metric"><div class="label">Totalafkast siden start ${gl('total')}</div><strong>${fmtPct(totAll)}</strong><small>Fra første NAV ${fmtDate(rows[0]?.d)} · DKK</small></div>
        <div class="metric"><div class="label">Gns. årligt afkast ${gl('cagr')}</div><strong>${fmtPct(c)}</strong><small>Efter løbende omkostninger</small></div>
      </div>
      ${warnHtml()}
      <div class="metrics metrics-more">
        <div class="metric"><div class="label">År til dato ${gl('ytd')}</div><strong>${fmtPct(ytd)}</strong><small>Pr. ${fmtDate(asOfPerf)} · delår, afventer Fundmarket-godkendelse</small></div>
        <div class="metric"><div class="label">Største fald ${gl('drawdown')}</div><strong class="neg">${fmtPct(maxDrawdown(rows)?.dd)}</strong><small><a href="drawdown.html?fund=${state.fund}">Middel/median →</a></small></div>
        <div class="metric"><div class="label">Risikoindikator (KID) ${gl('sri')}</div><strong>5 / 7</strong><small>Anbefalet ejertid 5 år</small></div>
      </div>
      <p class="note-fundmarket">Fonden har intet fast benchmark; vi viser derfor ingen sammenligningskurve. Beholdningen er et forsinket kvartalssnapshot (seneste offentlige Fundmarket-rapport) — ikke dagsaktuelt.</p>
      <p style="font-size:13px;color:var(--muted);margin:8px 0">Graf: ${periodLabel}</p>
      <div class="chart-wrap" id="perf-chart"></div>
      <p class="chart-takeaway" id="chart-takeaway" style="font-size:14px;color:var(--text);margin:8px 0 4px;line-height:1.45"></p>
      <p style="font-size:13px;color:var(--muted);line-height:1.55;margin:8px 0">Sådan kan du selv vurdere afkastet ${fmtPct(totAll)} siden start: se <a href="drawdown.html?fund=${state.fund}">største fald</a>, udsvingene på <a href="risici.html#tal">Risici</a>, og om din horisont matcher KID’ets 5 år. <a href="laer/laes-grafen.html">Sådan læser du grafen →</a></p>
      <p class="src" style="margin:0 0 8px">Kilde: Fundmarket-baseret totalafkast-snapshot · pr. ${fmtDate(asOfPerf)}. X-markører: kun @InvestNewdeal.</p>
      <p style="font-size:12px;color:var(--muted)">PMINDI: andelskursen falder med udbyttet på ex-dato. Totalafkastet viser værdien, hvis udbyttet var geninvesteret.</p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Afkast pr. kalenderår</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">Afsluttede år + delår fra start (*). Ingen 1- eller 3-måneders fremhævning. Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast.</p>
      ${hscroll(`<div class="table-wrap"><table class="data" style="min-width:0"><thead><tr><th>År</th><th>Afkast</th><th>Periode</th><th></th></tr></thead><tbody>${yearTableDeep}</tbody></table></div>`, 'Rul til siden for flere kolonner.')}
      <p style="margin-top:12px"><a class="outline-btn small" href="drawdown.html?fund=${state.fund}">Åbn drawdown-side →</a>
      <a class="outline-btn small" href="periode.html?fund=${state.fund}&year=YTD" style="margin-left:8px">YTD dyb side →</a>
      <a class="outline-btn small" href="sammenlign.html" style="margin-left:8px">Vs PMINDIAKK →</a>
      <button type="button" class="outline-btn small" style="margin-left:8px" onclick="window.print()">Print / PDF</button></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Månedlige afkast</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">${state.calFull ? 'Hele historikken' : 'Seneste op til 36 måneder'} · røde måneder er synlige med vilje · historisk afkast er ikke en pålidelig indikator for fremtidigt afkast</p>
      ${hscroll('<div id="calendar"></div>', 'Rul til siden for alle måneder.')}
      <p style="margin-top:12px"><button type="button" class="outline-btn" id="cal-toggle">${state.calFull ? 'Vis seneste 3 år' : 'Se hele historikken (ét klik)'}</button>
      <span style="display:block;margin-top:8px;font-size:12px;color:var(--muted)">Fuld historik er altid ét klik væk.</span></p>
    </section>

    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Eksempel: 100.000 kr. siden start</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55;margin-bottom:10px">Hvis du havde investeret 100.000 kr. ved første NAV (${fmtDate(rows[0]?.d)}) og geninvesteret udbytte, ville beløbet pr. ${fmtDate(asOfPerf)} være ca. <strong style="color:var(--text)">${totAll!=null ? (100000 * (1 + totAll/100)).toLocaleString('da-DK',{maximumFractionDigits:0}) : '-'} kr.</strong> (totalafkast ${fmtPct(totAll)}). Efter fondens løbende omkostninger, før skat og egne handelsomkostninger.</p>
      <p class="band">Eksemplet starter ved første NAV (ikke stiftelsesdato). Det er ikke et gunstigt valg af dato midt i en stigning. Regneeksempel, ikke en prognose. Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. <span class="src">ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse.</span></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Omkostninger (kort)</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55">Afkasttal er efter fondens løbende omkostninger. Egne kurtage-/platformgebyrer og skat er ikke med. KID «samlede omkostninger» (RIY, 5 år): <strong style="color:var(--text)">2,79 %</strong> (PMINDI) / <strong style="color:var(--text)">2,85 %</strong> (PMINDIAKK) pr. år. Intet resultathonorar.</p>
      <p style="margin-top:10px"><a class="outline-btn small" href="omkostninger.html">Omkostninger med tal →</a>
      <a class="outline-btn small" style="margin-left:8px" href="fakta.html">Fakta →</a>
      <a class="outline-btn small" style="margin-left:8px" href="om-data.html">Om data →</a></p>
    </section>

    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Det skete i porteføljen</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55">Daglige top-bevægelser pr. aktie vises <strong style="color:var(--text)">ikke</strong> i denne version. Beholdningen er et forsinket snapshot, og kursafkast pr. aktie er under verifikation.</p>
      <p class="band">Beholdninger vises kun som forsinket snapshot (seneste offentlige kvartalsrapport i udkastet), så siden aldrig afslører fondens aktuelle handler. Ingen anbefaling om at købe eller sælge.</p>
      <p style="margin-top:10px"><a class="outline-btn small" href="selskaber.html?fund=${state.fund}">Se forsinket beholdning →</a>
      <a class="outline-btn small" style="margin-left:8px" href="temaer.html?fund=${state.fund}">Temaer →</a></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Risiko (kort)</h2>
      <ul style="color:var(--muted);font-size:13px;line-height:1.55;padding-left:18px;display:grid;gap:6px">
        <li>Risikoindikator 5 på en skala fra 1 til 7 (KID, 14. august 2026). Anbefalet ejertid 5 år.</li>
        <li>Du kan tabe en del af eller hele din investering.</li>
        <li>Store kursudsving er et grundvilkår for teknologiaktier. KID angiver en anbefalet investeringshorisont på 5 år, og der kan komme store fald undervejs.</li>
        <li>Porteføljen er koncentreret i teknologi og typisk i USD-noterede papirer.</li>
      </ul>
      <p style="margin-top:12px"><button type="button" class="outline-btn small" data-open="dlg-invest">Sådan investerer du · Kopiér ISIN</button>
      <a class="outline-btn small" style="margin-left:8px" href="risici.html">Risici / KID →</a>
      <a class="outline-btn small" style="margin-left:8px" href="fakta.html">Fakta →</a></p>
    </section>`;

  const ctxEvts = (DATA.context?.events || []).filter((e) => {
    if (!sliced.length) return false;
    return e.d >= sliced[0].d && e.d <= sliced[sliced.length - 1].d;
  });
  const xMarks = (DATA.xPosts?.chartMarkers || []).filter((e) => {
    if (!sliced.length) return false;
    if (e.d < sliced[0].d || e.d > sliced[sliced.length - 1].d) return false;
    // Fondsgrafen: kun @InvestNewdeal-markører
    const title = String(e.title || '');
    const url = String(e.url || '');
    const who = ((title.match(/@([A-Za-z0-9_]+)/) || [])[1]
      || (url.match(/x\.com\/([^/]+)\//) || [])[1]
      || '').toLowerCase();
    return who === 'investnewdeal';
  });
  const ddMark = maxDrawdown(sliced);
  const ddEvts = [];
  if (ddMark?.peakD && sliced.some((r) => r.d === ddMark.peakD)) {
    ddEvts.push({ d: ddMark.peakD, kind: 'peak', title: 'Top før største fald', chartOnly: true });
  }
  if (ddMark?.troughD && sliced.some((r) => r.d === ddMark.troughD)) {
    ddEvts.push({ d: ddMark.troughD, kind: 'dip', title: `Bund (største fald ${fmtPct(ddMark.dd)})`, chartOnly: true });
  }
  const xMarksSafe = xMarks.map((e) => ({ ...e, text: stripCashtags(e.text) }));
  const evts = [...ctxEvts, ...ddEvts, ...xMarksSafe];
  renderChart($('#perf-chart', root), sliced, evts, { label: 'Totalafkast' });
  const take = $('#chart-takeaway', root);
  if (take && sliced.length >= 2) {
    const first = sliced[0], last = sliced[sliced.length - 1];
    const ret = ((last.total / first.total) - 1) * 100;
    const dir = ret >= 0 ? 'steg' : 'faldt';
    take.textContent = `Fonden ${dir} ${fmtPct(ret)} i den valgte periode (${fmtDate(first.d)} → ${fmtDate(last.d)}, pr. ${fmtDate(last.d)}).`;
  }
  if (ctxEvts.length || xMarks.length) {
    const box = document.createElement('section');
    box.className = 'panel';
    const fundLis = ctxEvts.map((e) => `<li><strong style="color:var(--text)">${fmtDate(e.d)}</strong>. ${e.title}${e.source ? ` <span style="font-size:11px">(${e.source})</span>` : ''}<br><span style="font-size:12px">${e.text || ''}</span></li>`).join('');
    const xLis = xMarks.map((e) => `<li><strong style="color:var(--text)">${fmtDate(e.d)}</strong>. ${e.title}${e.url ? ` · <a href="${e.url}" rel="noopener" target="_blank">X ↗</a>` : ''}<br><span style="font-size:12px">${stripCashtags(e.text) || ''}</span></li>`).join('');
    box.innerHTML = `<h2 style="font-size:16px;margin-bottom:8px">Kontekst i perioden</h2>
      ${fundLis ? `<p style="font-size:12px;color:var(--muted);margin-bottom:4px">Dokumenterede fondsbegivenheder</p><ul style="color:var(--muted);line-height:1.55;padding-left:18px">${fundLis}</ul>` : ''}
      ${xLis ? `<p style="font-size:12px;color:var(--muted);margin:10px 0 4px">X-opslag fra @InvestNewdeal (fondens konto)</p><ul style="color:var(--muted);line-height:1.55;padding-left:18px">${xLis}</ul>` : ''}
      <p style="font-size:11px;color:var(--muted);margin-top:8px">Grafmarkører: udbytte (gul), drawdown (rød), X (cyan — klik åbner opslaget). <a href="ndi-paa-x.html">NDI på X →</a></p>`;
    $('#perf-chart', root)?.closest('section')?.after(box);
  } else if (ddEvts.length) {
    const note = document.createElement('p');
    note.className = 'src';
    note.style.marginTop = '6px';
    note.innerHTML = `Grafmarkering: top/bund for største fald i perioden (${fmtPct(ddMark.dd)}). <a href="drawdown.html?fund=${state.fund}">Drawdown-side →</a>`;
    $('#perf-chart', root)?.closest('section')?.appendChild(note);
  }

  renderCalendar($('#calendar', root), rows);
  $('#cal-toggle', root)?.addEventListener('click', () => {
    state.calFull = !state.calFull;
    writeUrl();
    paint();
  });
}

function renderCalendar(el, rows) {
  const months = monthlyReturns(rows);
  let list = months;
  if (!state.calFull) {
    list = months.slice(-36);
    // Behold startåret (fx 2023 sep/okt), så delårsafkastet kan stemme med månedsgitteret
    const firstY = months[0]?.month?.slice(0, 4);
    if (firstY) {
      const early = months.filter((m) => m.month.startsWith(firstY));
      const have = new Set(list.map((m) => m.month));
      for (const m of early) if (!have.has(m.month)) list.push(m);
      list.sort((a, b) => a.month.localeCompare(b.month));
    }
  }
  const byYear = new Map();
  for (const m of list) {
    const y = m.month.slice(0, 4);
    const mo = Number(m.month.slice(5, 7));
    if (!byYear.has(y)) byYear.set(y, Array(12).fill(null));
    byYear.get(y)[mo - 1] = m.ret;
  }
  const years = [...byYear.keys()].sort();
  const head = ['', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    .map((h, i) => `<div class="${i ? 'mh' : 'yh'}">${h}</div>`).join('');
  const body = years.map((y) => {
    const arr = byYear.get(y);
    return `<div class="yh">${y}</div>` + arr.map((v, mi) => {
      if (v == null) return '<div class="cell muted">-</div>';
      const cls = v >= 0 ? 'up' : 'down';
      return `<div class="cell ${cls}" title="${fmtPct(v)}" aria-label="${y} måned ${mi + 1}: ${fmtPct(v)}">${v.toFixed(1).replace('.', ',')}</div>`;
    }).join('');
  }).join('');
  const note = months[0]?.partial
    ? `<p style="font-size:11px;color:var(--muted);margin-top:8px">Første måned (${months[0].month.slice(5)}/${months[0].month.slice(0, 4)}) er et delår fra første NAV — derfor kan den se anderledes ud end et helt kalenderår.</p>`
    : '';
  el.innerHTML = `<div class="cal">${head}${body}</div>${note}`;
}


function filterPositions(fund, { ignoreShift = false, ignoreDoubt = false } = {}) {
  let list = [...fund.positions];
  if (state.tags.length) list = list.filter((p) => {
    const t = tagsFor(p, DATA.multiTags);
    return state.tags.some((x) => t.includes(x));
  });
  if (state.maturity.length) list = list.filter((p) => state.maturity.includes(p.maturity));
  if (state.status === 'forslag') list = list.filter((p) => p.themeStatus === 'forslag');
  if (state.status === 'fast') list = list.filter((p) => p.themeStatus !== 'forslag');
  if (state.skift && !ignoreShift) list = list.filter((p) => themeShift(p)?.key === state.skift);
  if (state.tvivl && !ignoreDoubt) list = list.filter((p) => themeDoubt(p));
  if (state.linse) list = list.filter(hasLens);
  HITS = new Map();
  if (state.q.trim()) {
    // Fælles søgning (data.js): navn/ticker/ISIN, alle tema-tags inkl. multi-tag, NDI-linsens tekst
    list = list.filter((p) => {
      const hit = searchPosition(p, state.q, DATA.multiTags, LENS);
      if (hit) HITS.set(p.isin, hit);
      return !!hit;
    });
  }
  return sortPositions(list, state.sort, state.dir);
}

// Kun whitelistede nøgler (SORTS). Tema: alfabetisk på dansk temanavn, inden for tema efter vægt;
// "andet" (uklassificeret) altid sidst, uanset retning.
// Stabil tie-break på navn, så rækkefølgen ikke hopper mellem visninger.
function sortPositions(list, sort, dirName) {
  const dir = dirName === 'asc' ? 1 : -1;
  const byName = (a, b) => displayName(a).localeCompare(displayName(b), 'da');
  const w = (p) => (typeof p.weight === 'number' ? p.weight : 0);
  const cmp = {
    name: (a, b) => dir * byName(a, b),
    weight: (a, b) => dir * (w(a) - w(b)) || byName(a, b),
    theme: (a, b) => ((a.theme === 'andet') - (b.theme === 'andet'))
      || dir * daTheme(a.theme).localeCompare(daTheme(b.theme), 'da') || (w(b) - w(a)) || byName(a, b),
  }[SORTS[sort] ? sort : 'weight'];
  return [...list].sort(cmp);
}

function renderLivscyklus(fund) {
  // Pædagogisk kurve (bogen: præ-revenue → value). Prikker = selskaber med en modenhed i data
  // (i dag maskinelle forslag, maturityStatus=forslag); uden modenhed placeres ikke (lær/livscyklus.html).
  // Etiketter i almindeligt dansk (MATURITY_PLAIN), samme ord som selskab.html og screenerens filter.
  const stages = [
    { id: 'prerevenue', t: 0.07 },
    { id: 'preprofit', t: 0.29 },
    { id: 'highgrowth', t: 0.5 },
    { id: 'garp', t: 0.71 },
    { id: 'value', t: 0.93 },
  ].map((st) => ({ ...st, label: daMatPlain(st.id) }));
  const W = 720, H = 190, L = 24, R = 24, TOP = 26, BOT = 54;
  const px = (t) => L + t * (W - L - R);
  const py = (t) => H - BOT - (H - BOT - TOP) / (1 + Math.exp(-9 * (t - 0.5)));
  const path = Array.from({ length: 61 }, (_, i) => i / 60)
    .map((t, i) => `${i ? 'L' : 'M'}${px(t).toFixed(1)},${py(t).toFixed(1)}`).join(' ');
  const byStage = Object.fromEntries(stages.map((st) => [st.id, []]));
  let unknown = 0;
  for (const pos of fund.positions || []) {
    if (byStage[pos.maturity]) byStage[pos.maturity].push(pos);
    else unknown++;
  }
  const classified = (fund.positions || []).length - unknown;
  const nodes = stages.map((st) => {
    const list = byStage[st.id];
    // Selskabsprikker spredes langs kurven omkring fasen; radius ~ √vægt. Store faser bliver bredere
    // i stedet for højere, så stakken ikke klippes i toppen af SVG'en (maks. 0,18 af bredden pr. fase).
    const rowsMax = Math.max(1, Math.floor((py(st.t) - 10 - 6) / 7));
    const cols = Math.max(9, Math.ceil(list.length / rowsMax));
    const step = Math.min(0.012, 0.18 / cols);
    const dots = list.map((p, i) => {
      const t = Math.min(0.99, Math.max(0.01, st.t + ((i % cols) - (cols - 1) / 2) * step));
      const r = Math.max(2.5, Math.sqrt(p.weight || 0) * 2.4);
      return `<circle class="life-co" cx="${px(t).toFixed(1)}" cy="${(py(t) - 10 - Math.floor(i / cols) * 7).toFixed(1)}" r="${r.toFixed(1)}"><title>${displayName(p)} · ${(p.weight ?? 0).toFixed(2).replace('.', ',')} %</title></circle>`;
    }).join('');
    return `${dots}<circle class="life-node" cx="${px(st.t)}" cy="${py(st.t).toFixed(1)}" r="7"/>
      <text class="life-lbl" x="${px(st.t)}" y="${H - 26}" text-anchor="middle">${st.label}</text>
      <text class="life-n" x="${px(st.t)}" y="${H - 8}" text-anchor="middle">${list.length ? `${list.length} selskaber` : '-'}</text>`;
  }).join('');
  const summary = stages.map((st) => `${st.label}: ${byStage[st.id].length}`).join(', ');
  const empty = classified === 0;
  const curve = `<div class="life-body">
    <p class="life-intro">Pædagogisk model fra bogen: selskaber bevæger sig typisk fra før omsætning mod moden. Det er <strong>ikke en officiel NDI-rating</strong> og ikke en anbefaling.</p>
    <div class="life-scroll"><svg class="life-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Livscykluskurve. ${summary}. ${unknown} uden forslag.">
      <path class="life-curve" d="${path}"/>${nodes}
    </svg></div>
    <ol class="life-legend" aria-hidden="true">${stages.map((st) => `<li><strong>${st.label}</strong><span>${byStage[st.id].length || '-'}</span></li>`).join('')}</ol>
  </div>`;
  const nForslag = (fund.positions || []).filter((p) => p.maturityStatus === 'forslag' && byStage[p.maturity]).length;
  const foot = empty
    ? `Ingen af fondens ${fund.positions.length} selskaber har et modenheds<strong>forslag</strong> endnu.`
    : `${classified} af ${fund.positions.length} selskaber har et modenheds<span class="badge badge-draft">forslag</span> (maskinelt ud fra offentlig branche og tema, afventer NDI-gennemgang). ${unknown ? unknown + ' uden forslag.' : ''}`;
  return `<section class="panel life-strip${empty ? ' is-empty' : ''}">
    <div class="life-head"><h2>Livscyklus</h2><span class="badge badge-draft" title="Heuristik — afventer NDI">udkast</span></div>
    ${curve}
    <p class="life-note">${foot} <a href="laer/livscyklus.html">Læs om livscyklus →</a></p>
  </section>`;
}

function renderPortefolje(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  // Udvalget er altid efter vægt (overskriften lover det); sorteringsknapperne styrer kun rækkefølgen i tabellen.
  const byWeight = sortPositions(filterPositions(fund), 'weight', 'desc');
  const top10 = sortPositions(byWeight.slice(0, 10), state.sort, state.dir);
  const more = sortPositions(byWeight.slice(10, 80), state.sort, state.dir);
  const top10All = sortPositions(fund.positions, 'weight', 'desc').slice(0, 10);
  const top10Sum = top10All.reduce((s, p) => s + (p.weight || 0), 0);
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">PORTEFØLJEN</p>
    <h1>Beholdninger · ${fund.short}</h1>
    <p class="lede">Forsinket snapshot, pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)} (offentlig Fundmarket-rapport). Ikke dagsaktuel.</p>
    ${weightProfileNote(fund)}
    <p class="band">Segmenter viser eksponering, ikke en anbefaling. <a href="temaer.html?fund=${state.fund}">Se tema-oversigt →</a> Temaer mærket <span class="badge badge-draft">forslag</span> afventer NDI-gennemgang.</p>
    ${fundToolbar()}
    ${renderLivscyklus(fund)}
    <section class="panel">
      <h2 style="font-size:16px;margin-bottom:6px">Top 10 efter vægt</h2>
      <p class="src" style="margin-bottom:10px">pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)} · forsinket snapshot. De 10 største udgør tilsammen ${top10Sum.toFixed(1).replace('.', ',')} % af ${fund.short} (${fund.positions.length} selskaber i alt). Eksponering, ikke anbefaling.</p>
      ${positionsTable(top10, fund)}
    </section>
    <details class="panel" style="padding:12px 16px">
      <summary style="cursor:pointer;font-weight:600">Vis flere beholdninger (${more.length} mere, op til 80 i alt)</summary>
      <div style="margin-top:12px">${more.length ? positionsTable(more, fund) : '<p class="empty-state">Ingen flere i denne sortering.</p>'}</div>
    </details>
    <p class="src" style="margin-top:10px">Kilde: Fundmarket-beholdning (forsinket). Åbn <a href="?view=udforsk&fund=${state.fund}">Udforsk</a> for søgning og filtre. Tomme/ældre felter er markeret — ikke skjult.</p>
    <p class="band" style="font-size:11px">Ingen P/S, P/E eller kursafkast pr. aktie i denne version. Tema-tags er udkast.</p>`;
  // Mobil: livscyklus-kurven er skjult som standard, så tabellen ikke skubbes ned.
  root.querySelector('.life-head')?.addEventListener('click', () => {
    root.querySelector('.life-strip')?.classList.toggle('is-open');
  });
  const lh = root.querySelector('.life-head');
  if (lh && !lh.querySelector('.life-toggle-hint')) {
    const hint = document.createElement('small');
    hint.className = 'life-toggle-hint';
    hint.style.cssText = 'color:var(--muted);font-size:12px;margin-left:auto';
    hint.textContent = 'Vis kurve';
    lh.appendChild(hint);
  }
}

// Kvalitativ beskrivelse af vægtfordelingen i det forsinkede snapshot. Afrundet, ingen falsk præcision.
function weightProfileNote(fund) {
  const ws = fund.positions.map((p) => p.weight).filter((w) => typeof w === 'number');
  if (!ws.length) return '';
  const sum = ws.reduce((a, b) => a + b, 0);
  const tenths = Math.round((ws.filter((w) => w >= 0.05 && w <= 1).length / ws.length) * 10);
  const over1 = ws.filter((w) => w > 1).length;
  const spread = tenths >= 8
    ? `Bred spredning: ${tenths >= 10 ? 'næsten alle' : `ca. ${tenths} ud af 10`} positioner vejer mellem ca. 0,05 % og 1 %, og ${over1 <= 10 ? 'kun få' : over1} vejer mere end 1 %. Vægtene ligger forholdsvis tæt, men fonden er ikke ligevægtet. `
    : '';
  const cash = Math.max(0, 100 - sum);
  const cashTxt = ' Resten er bl.a. kontanter; officiel kontantandel afventer Fundmarket.';
  return `<p class="note-weights" style="font-size:13px;color:var(--muted);line-height:1.55">${spread}Aktievægtene i snapshottet summerer til ca. ${Math.round(sum)} %.${cashTxt} <a href="laer/hvorfor-mange-aktier.html">Hvorfor så mange aktier?</a></p>`;
}

// UX 22:00 SHOULD 1: på Udforsk er man allerede i screeneren, så knappen udelades dér
function fundToolbar({ screener = true } = {}) {
  return `<div class="toolbar">${fundSeg()}${screener ? `
    <a class="outline-btn small" href="?view=udforsk&fund=${state.fund}">Åbn Udforsk</a>` : ''}</div>`;
}

function positionsTable(list, fund) {
  const th = (key, label) =>
    `<th><button type="button" data-sort="${key}" aria-sort="${state.sort===key?(state.dir==='asc'?'ascending':'descending'):'none'}">${label}${state.sort===key?(state.dir==='asc'?' ↑':' ↓'):''}</button></th>`;
  return `<p class="spark-legend"><svg class="spark-key" width="16" height="12" aria-hidden="true"><g fill="var(--cyan)"><rect x="0" y="6" width="4" height="6" rx="1"/><rect x="6" y="3" width="4" height="9" rx="1"/><rect x="12" y="0" width="4" height="12" rx="1"/></g></svg><span>Søjlerne ved navnet viser <strong>vægt i fonden pr. kvartal</strong>. Ikke aktiekurs.</span></p>` +
  mobileSortHtml() +
  hscroll(`<div class="table-wrap"><table class="data screener-table"><thead><tr>
    ${th('name','Navn')}${th('weight','Vægt %')}${th('theme','Tema')}
  </tr></thead><tbody>${list.map((p, i) => `${themeGroupRow(list, i)}<tr>
    <td><a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${fund.id}" title="Beholdningsnavn: ${p.name}">${displayName(p)}</a>${hasLens(p) ? ` <a class="lens-mark" href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${fund.id}#ndi-linse" title="NDI’s fem spørgsmål om selskabet (udkast)" aria-label="NDI-perspektiv for ${p.name}">◉</a>` : ''} ${weightSpark(p.isin, fund.id)}<br><small style="color:var(--muted)">${p.isin}</small>${warrantNote(p, fund)}${hitNote(p)}${mobileThemeLine(p, fund)}</td>
    <td>${(p.weight ?? 0).toFixed(2).replace('.', ',')}</td>
    <td>${tagsFor(p, DATA.multiTags).map((t) => `<a class="tag" href="tema.html?slug=${encodeURIComponent(t)}&fund=${fund.id}">${daTheme(t)}</a>`).join(' ')}${forslagCell(p)}</td>
  </tr>`).join('')}</tbody></table></div>`, 'Rul til siden for flere kolonner.') +
  `<p style="font-size:11px;color:var(--muted);margin-top:8px">Kun vægt og tema. De små søjler ved navnet er selskabets <strong style="color:var(--text)">vægt i fonden</strong> pr. kvartalssnapshot frem til ${fmtDate(MONTHS?.cutoff || fund.positionsAsOf)}. Ikke aktiekurs. Ingen kursafkast pr. aktie i v1. Beholdning er forsinket.</p>`;
}

// Mobil (≤560 px): tema-kolonnen skjules, og temaet står som kompakt linje under navnet, så hele rækken
// (navn, vægt, tema, forslag/usikkert) kan læses uden vandret rulning. Sorteringen flyttes til en knaprække,
// fordi kolonneknappen "Tema" forsvinder med kolonnen. Kun navn/vægt/tema (whitelist SORTS).
const MOBILE_CSS = `<style>
  .pt-m-theme,.pt-m-sort{display:none}
  @media (max-width:560px){
    table.screener-table{min-width:0}
    table.screener-table th:nth-child(3),table.screener-table td:nth-child(3){display:none}
    table.screener-table th:first-child,table.screener-table td:first-child{max-width:none;min-width:0;box-shadow:none}
    .pt-m-theme{display:block;margin-top:4px;white-space:normal;line-height:1.6}
    .pt-m-theme .tag{margin:0 4px 2px 0}
    .pt-m-sort{display:flex}
  }
</style>`;
function mobileSortHtml() {
  const btn = (k, label) => {
    const on = state.sort === k;
    return `<button type="button" class="control ${on ? 'active' : ''}" data-sort="${k}" aria-pressed="${on}">${label}${on ? (state.dir === 'asc' ? ' ↑' : ' ↓') : ''}</button>`;
  };
  return `${MOBILE_CSS}<div class="filters pt-m-sort" role="group" aria-label="Sortér listen">
      <small style="color:var(--muted);align-self:center">Sortér:</small>${btn('name', 'Navn')}${btn('weight', 'Vægt')}${btn('theme', 'Tema')}
    </div>`;
}
function mobileThemeLine(p, fund) {
  const tags = tagsFor(p, DATA.multiTags).map((t) => `<a class="tag" href="tema.html?slug=${encodeURIComponent(t)}&fund=${fund.id}">${daTheme(t)}</a>`).join(' ');
  return `<span class="pt-m-theme">${tags}${forslagCell(p)}</span>`;
}

// Forslag-mærke + synlig "før"-linje (tidligere kun i tooltip), så skiftet kan læses uden hover.
// Kun i gennemgangstilstand (status=forslag): færre forslag-mærker i den almindelige liste.
function forslagCell(p) {
  if (state.status !== 'forslag') return '';
  const s = themeShift(p);
  if (!s) return '';
  const before = s.to === 'andet' ? 'intet NDI-tema passede endnu' : `før: ${shiftFromLabel(s.from)}`;
  const d = themeDoubt(p);
  const doubt = d ? ` <span class="badge badge-doubt" style="background:transparent;border:1px dashed var(--yellow);color:var(--yellow)" title="Usikkert forslag: ${esc(d.why)}">til gennemgang</span>` : '';
  const doubtNote = d ? `<small class="doubt-note" style="color:var(--muted);display:block;margin-left:auto;white-space:normal;max-width:36ch;line-height:1.35;text-align:left">til gennemgang: ${esc(d.why)}${d.alt ? ` · alternativ: ${doubtAltLabel(d.alt)}` : ''}</small>` : '';
  return ` <span class="badge badge-draft" title="Temaet er et forslag fra udkastet og afventer NDI-gennemgang · ${before}">forslag</span>${doubt}<small class="shift-note" style="color:var(--muted);display:block;margin-left:auto;white-space:normal;max-width:36ch;line-height:1.35;text-align:left">${before}</small>${doubtNote}`;
}
const esc = (x) => String(x ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Gennemgang af temaforslag (vises ved status=forslag): ét filter pr. skift "fra → til" med antal
// selskaber efter øvrige filtre. Hjælper NDI med at tage stilling til ét skift ad gangen. Ingen tal pr. aktie.
function shiftPanelHtml(fund) {
  if (state.status !== 'forslag') return '';
  const base = filterPositions(fund, { ignoreShift: true });
  const shifts = themeShifts(state.tvivl ? base.filter((p) => themeDoubt(p)) : base);
  const all = themeShifts(fund.positions);
  if (!all.length) return '';
  const btn = (s) => {
    const on = state.skift === s.key;
    return `<button type="button" class="control ${on ? 'active' : ''}" data-skift="${s.key}" aria-pressed="${on}">${shiftLabel(s)} <small>(${s.n})</small></button>`;
  };
  const cur = state.skift && all.find((s) => s.key === state.skift);
  const moved = all.filter((s) => s.to !== 'andet').reduce((a, s) => a + s.n, 0);
  const open = all.filter((s) => s.to === 'andet').reduce((a, s) => a + s.n, 0);
  return `<section class="panel shift-panel" aria-label="Gennemgang af temaforslag" style="margin:10px 0;padding:12px 14px">
    <p style="margin:0 0 6px;font-size:13px"><strong>Gennemgang af temaforslag</strong> · ${moved} selskaber har fået et foreslået tema${open ? `, ${open} står stadig i Andet` : ''}. Vælg ét skift ad gangen:</p>
    <div class="filters" role="group" aria-label="Filtrér på temaskift" style="margin:0">
      ${shifts.length ? shifts.map(btn).join('') : '<small style="color:var(--muted)">Ingen temaforslag matcher de øvrige filtre.</small>'}
      ${state.skift && !shifts.some((s) => s.key === state.skift) && cur ? btn({ ...cur, n: 0 }) : ''}
    </div>
    <p style="margin:6px 0 0;font-size:12px;color:var(--muted)">${cur
      ? (cur.to === 'andet'
        ? `${cur.n} selskaber er markeret som forslag, men intet NDI-tema passede godt nok (fx guld/sølv, sundhed, forbrug). <a href="tema.html?slug=andet&fund=${state.fund}">Hvad ligger i Andet? →</a>`
        : `Foreslået flyttet fra ${shiftFromLabel(cur.from)} til ${daTheme(cur.to)} ud fra ISIN-opslag, branche og plads i værdikæderne. <a href="tema.html?slug=${encodeURIComponent(cur.to)}&fund=${state.fund}&status=forslag">Se dem på temasiden →</a>`)
      : 'Forslagene er udkast og ændrer ikke fondens beholdning. Antal = selskaber efter de øvrige filtre.'} <a href="om-data.html#g-temaforslag">Om temaforslag</a></p>
    ${doubtRowHtml(fund)}
  </section>`;
}

// NDI-beslutningsliste: forslag, som udkastet selv er i tvivl om (themeDoubt), med begrundelse og et
// alternativt tema. Antal efter øvrige filtre inkl. valgt skift. Kun tema-felter - ingen tal pr. aktie.
function doubtRowHtml(fund) {
  const all = fund.positions.filter((p) => themeDoubt(p));
  if (!all.length) return '';
  const n = filterPositions(fund, { ignoreDoubt: true }).filter((p) => themeDoubt(p)).length;
  const alts = {};
  for (const p of all) { const a = doubtAltLabel(themeDoubt(p).alt) || 'uden alternativ'; alts[a] = (alts[a] || 0) + 1; }
  const altTxt = Object.entries(alts).sort((a, b) => b[1] - a[1]).map(([a, k]) => `${k} → ${a}`).join(', ');
  return `<div class="filters" role="group" aria-label="Forslag til gennemgang" style="margin:10px 0 0;padding-top:10px;border-top:1px solid var(--line, rgba(255,255,255,.08))">
      <button type="button" class="control ${state.tvivl ? 'active' : ''}" data-tvivl aria-pressed="${state.tvivl}">Kun usikre forslag <small>(${n})</small></button>
      <small style="color:var(--muted);align-self:center"><span class="badge badge-doubt" style="background:transparent;border:1px dashed var(--yellow);color:var(--yellow)">til gennemgang</span> = ${all.length} forslag, hvor udkastet selv er i tvivl – afventer porteføljeholdets gennemgang. Hver række viser hvorfor og et alternativ (${altTxt}).</small>
    </div>`;
}

// Et skift, der ikke findes i den valgte andelsklasse (fx efter fondsskift), fjernes - ingen tavs tom liste.
function sanitizeShift() {
  const fund = fundById(DATA.portfolio, state.fund);
  // tvivl=1 kræver status=forslag og mindst ét usikkert forslag i andelsklassen
  let changed = false;
  if (state.tvivl && (state.status !== 'forslag' || !fund.positions.some((p) => themeDoubt(p)))) { state.tvivl = false; changed = true; }
  if (!state.skift) return changed;
  if (state.status === 'forslag' && themeShifts(fund.positions).some((s) => s.key === state.skift)) return false;
  state.skift = '';
  return true;
}

// Når søgningen kun rammer NDI-linsens tekst, vises hvilket felt der matchede (fx "kobber" → Hvad ejer man?).
function viaLens(list) {
  const n = list.filter((p) => HITS.get(p.isin)?.via === 'linse').length;
  return n ? ` (${n} via NDI-linsens tekst)` : '';
}

function warrantNote(p, fund) {
  const par = warrantParent(p, fund.positions);
  if (!par) return '';
  const link = par.isin ? `<a href="selskab.html?isin=${encodeURIComponent(par.isin)}&fund=${fund.id}">${par.name}</a>` : par.name;
  return `<br><small style="color:var(--muted);display:inline-block;white-space:normal;max-width:36ch;line-height:1.35;text-align:left">Warrant (tegningsret) på ${link} - ikke et selvstændigt selskab</small>`;
}
function hitNote(p) {
  const h = HITS.get(p.isin);
  if (h?.via !== 'linse') return '';
  const e = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  return `<br><small class="hit-note" style="color:var(--muted);display:inline-block;white-space:normal;max-width:36ch;line-height:1.35;text-align:left">Match i <a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${state.fund}#ndi-linse">NDI-linsen</a> · ${e(h.label)}: ${e(h.value)}</small>`;
}

// Sorteret på tema: overskriftsrække pr. primært tema (antal selskaber i den filtrerede liste, ingen vægtsum).
function themeGroupRow(list, i) {
  if (state.sort !== 'theme') return '';
  const t = list[i].theme;
  if (i > 0 && list[i - 1].theme === t) return '';
  const n = list.filter((p) => p.theme === t).length;
  return `<tr class="group-row"><th colspan="3" scope="colgroup" style="text-align:left;padding-top:14px;color:var(--muted);font-size:12px;letter-spacing:.06em">${daTheme(t)} <small style="font-weight:400">· ${n} ${n === 1 ? 'selskab' : 'selskaber'}${t === 'andet' ? ' · endnu intet primært NDI-tema' : ''}</small></th></tr>`;
}

// A-Z-listen forstår samme q/linse/status; tema-/modenhedsfiltre findes kun i screeneren.
function azHref() {
  const u = new URLSearchParams({ fund: state.fund });
  if (state.q.trim()) u.set('q', state.q.trim());
  if (state.linse) u.set('linse', '1');
  if (state.status) u.set('status', state.status);
  if (state.skift) u.set('skift', state.skift);
  if (state.tvivl) u.set('tvivl', '1');
  if (state.sort !== 'name') u.set('sort', state.sort); // A-Z: navn er standard; ingen retning (vægt altid faldende)
  return `selskaber.html?${u}`;
}

function emptyScreener(fund) {
  const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const active = [
    state.q && `søgning “${esc(state.q)}”`,
    state.tags.length && `tema ${state.tags.map(daTheme).join(' / ')}`,
    state.maturity.length && `modenhed ${state.maturity.map(daMatPlain).join(' / ')}`,
    state.status && STATUSES[state.status],
    state.skift && `temaskift ${state.skift.split('~').map(shiftFromLabel).join(' → ')}`,
    state.tvivl && 'kun usikre forslag',
    state.linse && 'kun med NDI-linse',
  ].filter(Boolean).join(' og ');
  // Hjælp: hvis søgningen alene giver hits, men kombinationen ikke gør, så sig det.
  const qOnly = state.q.trim() && (state.tags.length || state.status || state.skift || state.tvivl || state.maturity.length || state.linse)
    ? fund.positions.filter((p) => searchPosition(p, state.q, DATA.multiTags, LENS)).length
    : 0;
  return `<div class="empty-state" role="status">
    <strong>Ingen af fondens ${fund.positions.length} selskaber matcher ${active || 'filtrene'}</strong>
    ${qOnly ? `<span>Søgningen alene giver ${qOnly} ${qOnly === 1 ? 'selskab' : 'selskaber'} - prøv at fjerne tema-, status-, modenheds- eller linsefilteret.</span>` : ''}
    ${state.linse ? `<span>NDI-linsen findes for ${fund.positions.filter(hasLens).length} af fondens ${fund.positions.length} selskaber. Et selskab uden linse er ikke vurderet dårligere - vi har bare ikke skrevet den endnu.</span>` : ''}
    <span>Listen viser kun selskaber, fonden ejede pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)}. Et selskab, der ikke er med, er ikke et signal — se <a href="laer/faq-mangler-aktie.html">Hvorfor mangler aktie X?</a></span>
    <div class="row">
      ${state.q ? '<button type="button" class="outline-btn small" data-clear-q>Ryd søgning</button>' : ''}
      ${state.linse ? '<button type="button" class="outline-btn small" data-linse>Vis også uden NDI-linse</button>' : ''}
      ${state.skift ? `<button type="button" class="outline-btn small" data-x="skift:${state.skift}">Alle temaforslag</button>` : ''}
      ${state.tvivl ? '<button type="button" class="outline-btn small" data-x="tvivl:1">Også sikre forslag</button>' : ''}
      <button type="button" class="outline-btn small" id="reset-filters">Nulstil alle filtre</button>
      <a class="outline-btn small" href="${azHref()}">Se A-Z-listen</a>
    </div>
  </div>`;
}

// Temastatus-filter: lader læseren (og NDI ved gennemgang) se, hvilke tema-tags der er forslag.
// Antal er tællinger af selskaber - ingen tal pr. aktie.
function statusFilterHtml(fund) {
  const nForslag = fund.positions.filter((p) => p.themeStatus === 'forslag').length;
  if (!nForslag) return '';
  const btn = (v, label, n) =>
    `<button type="button" class="control ${state.status === v ? 'active' : ''}" data-status="${v}" aria-pressed="${state.status === v}">${label} <small>(${n})</small></button>`;
  return `<div class="filters" role="group" aria-label="Filtrér på temastatus">
      ${btn('fast', 'Uden temaforslag', fund.positions.length - nForslag)}
      ${btn('forslag', 'Kun temaforslag', nForslag)}
      <small style="color:var(--muted);align-self:center"><span class="badge badge-draft">forslag</span> = tema foreslået i udkastet, afventer NDI-gennemgang.</small>
    </div>`;
}

// NDI-linse-filter: kvalitative beskrivelser (rolle, værdikæde, hold øje med). Antal = selskaber, ingen tal pr. aktie.
function lensFilterHtml(fund) {
  const n = fund.positions.filter(hasLens).length;
  if (!n) return '';
  return `<div class="filters" role="group" aria-label="Filtrér på NDI-linse">
      <button type="button" class="control ${state.linse ? 'active' : ''}" data-linse aria-pressed="${state.linse}">Kun med NDI-linse <small>(${n})</small></button>
      <small style="color:var(--muted);align-self:center"><span class="badge">NDI-linse</span> = kvalitativ beskrivelse af ${n} af ${fund.positions.length} selskaber (udkast, ikke en rating). <a href="ndi-perspektiv.html">Om linsen →</a></small>
    </div>`;
}

// Vises først, når mindst ét selskab i klassen har manuel modenhed. Indtil da: én ærlig linje, ingen knapper.
function maturityFilterHtml(fund) {
  const n = maturityCounts(fund);
  const total = Object.values(n).reduce((a, b) => a + b, 0);
  if (!total) {
    return `<p class="mat-pending" style="font-size:12px;color:var(--muted);margin:6px 0">Modenhed (præ-revenue → value): <strong style="color:var(--text)">ingen forslag endnu</strong> for nogen af fondens ${fund.positions.length} selskaber, så der er intet modenhedsfilter. <a href="laer/livscyklus.html">Om livscyklus →</a></p>`;
  }
  const nForslag = (fund.positions || []).filter((p) => p.maturityStatus === 'forslag' && p.maturity in MATURITY_LABELS).length;
  const btns = Object.keys(MATURITY_LABELS).filter((m) => n[m]).map((m) => [m, daMatPlain(m)]).map(([m, label]) =>
    `<button type="button" class="control ${state.maturity.includes(m) ? 'active' : ''}" data-mat="${m}" aria-pressed="${state.maturity.includes(m)}">${label} <small>(${n[m]})</small></button>`).join('');
  return `<div class="filters" role="group" aria-label="Filtrér på modenhed">
      ${btns}
      <small style="color:var(--muted);align-self:center">Modenhed: ${total} af ${fund.positions.length} placeret${nForslag ? ` - ${nForslag === total ? 'alle' : nForslag} som <span class="badge badge-draft">forslag</span> (maskinelt ud fra offentlig branche/tema, afventer NDI)` : ` — alle er <span class="badge badge-draft">forslag</span>`}. <a href="laer/livscyklus.html">Om livscyklus →</a></small>
    </div>`;
}

function renderUdforsk(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund);
  const themes = [...new Set(fund.positions.flatMap((p) => tagsFor(p, DATA.multiTags)))]
    .sort((a, b) => ((a === 'andet') - (b === 'andet')) || daTheme(a).localeCompare(daTheme(b), 'da'));
  // Antal pr. tema-knap: primært tema + via multi-tag, så multi-tags kan ses før man klikker
  const tagCount = {};
  for (const p of fund.positions) for (const t of tagsFor(p, DATA.multiTags)) {
    const c = (tagCount[t] ||= { prim: 0, multi: 0 });
    if (t === p.theme) c.prim++; else c.multi++;
  }
  const nMulti = fund.positions.filter((p) => tagsFor(p, DATA.multiTags).length > 1).length;
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">UDFORSK TECH</p>
    <h1>Screener · NDI-linse</h1>
    <p class="lede">Kun selskaber i porteføljen. Hvert selskab har ét primært tema; ${nMulti} udvalgte har flere temaer. Sortér på navn, vægt eller tema. Søgningen dækker også NDI-linsens tekst (fx “foundry”, “kobber”, “solceller”).</p>
    <p class="band">Informationen er generel - ikke en personlig anbefaling. Segmenter = eksponering.</p>
    ${fundToolbar({ screener: false })}
    <div class="filters">
      <input type="search" id="q" placeholder="Søg navn, ticker, ISIN, tema eller fx “kobber”…" value="${state.q.replace(/"/g,'&quot;')}" aria-label="Søg">
      <button type="button" class="outline-btn small" id="reset-filters">Nulstil</button>
      <button type="button" class="outline-btn small" id="copy-link">Kopiér link til denne liste</button>
      <button type="button" class="outline-btn small" id="csv-export">Download CSV (filtreret)</button>
      <!-- Følg tema stub skjult indtil tilmelding er aktiv -->
    </div>
    <div class="filters" role="group" aria-label="Filtrér på tema">
      ${themes.map((t) => `<button type="button" class="control ${state.tags.includes(t)?'active':''}" data-tag="${t}" aria-pressed="${state.tags.includes(t)}" title="${tagCount[t].prim} med ${daTheme(t)} som primært tema${tagCount[t].multi ? ` + ${tagCount[t].multi} som ekstra tema` : ''}">${daTheme(t)} <small style="opacity:.75">${tagCount[t].prim}${tagCount[t].multi ? ` +${tagCount[t].multi}` : ''}</small></button>`).join('')}
    </div>
    <p style="font-size:12px;color:var(--muted);margin:4px 0 0">Tal på knapperne: selskaber med temaet som primært tema, + dem der har det som ekstra tema. Vælger du flere temaer, vises selskaber med mindst ét af dem.</p>
    <p style="font-size:12px;color:var(--muted);margin:8px 0">Tema-dybsider: ${themes.map((t) => `<a href="tema.html?slug=${encodeURIComponent(t)}&fund=${state.fund}">${daTheme(t)}</a>`).join(' · ')} · <a href="${azHref()}">A-Z liste</a></p>
    ${statusFilterHtml(fund)}
    ${shiftPanelHtml(fund)}
    ${lensFilterHtml(fund)}
    ${maturityFilterHtml(fund)}
    <div class="chips" id="chips"></div>
    <p style="font-size:12px;color:var(--muted)" id="filter-status">${list.length} ${list.length === 1 ? 'resultat' : 'resultater'}${viaLens(list)} · udkast-klassifikation</p>
    ${list.length ? positionsTable(list, fund) : emptyScreener(fund)}
    ${warnHtml()}`;

  const chips = $('#chips', root);
  const parts = [
    ...state.tags.map((t) => ({ k: 'tag', v: t, label: daTheme(t) })),
    ...state.maturity.map((m) => ({ k: 'mat', v: m, label: daMatPlain(m) })),
    ...(state.status ? [{ k: 'status', v: state.status, label: STATUSES[state.status] }] : []),
    ...(state.skift ? [{ k: 'skift', v: state.skift, label: shiftLabel(themeShift(fund.positions.find((p) => themeShift(p)?.key === state.skift)) || { from: '', to: '' }) }] : []),
    ...(state.tvivl ? [{ k: 'tvivl', v: '1', label: 'Kun usikre forslag' }] : []),
    ...(state.linse ? [{ k: 'linse', v: '1', label: 'Kun med NDI-linse' }] : []),
  ];
  chips.innerHTML = parts.map((p) =>
    `<span class="chip">${p.label}<button type="button" data-x="${p.k}:${p.v}" aria-label="Fjern filter ${p.label}">×</button></span>`).join('');
}

function paint() {
  const root = $('#app');
  if (!root || !DATA) return;
  if (sanitizeShift()) writeUrl(true);
  $all('.nav [data-nav]').forEach((a) => {
    a.setAttribute('aria-current', a.getAttribute('data-nav') === state.view ? 'page' : 'false');
  });
  if (state.view === 'fonden') renderFonden(root);
  else if (state.view === 'portefolje') renderPortefolje(root);
  else if (state.view === 'udforsk') renderUdforsk(root);
  else renderEntre(root);
  $('#asof-global') && ($('#asof-global').textContent = `Afkast pr. ${fmtDate(DATA.portfolio.performanceAsOf || DATA.portfolio.asOf)}. Beholdning: forsinket snapshot, pr. ${fmtDate(DATA.portfolio.asOf)}`);
  announceFilters();
  markHscroll(root);
}

/** Skærmlæser: læs resultatet af filter-/sorterings-/fondsskift op via #sr-status (vedvarende region). */
let lastAnnounce = null;
function announceFilters() {
  const live = $('#sr-status');
  if (!live) return;
  if (state.view !== 'udforsk' && state.view !== 'portefolje') { lastAnnounce = null; return; }
  const fund = fundById(DATA.portfolio, state.fund);
  const n = filterPositions(fund).length;
  const parts = [`${fund.short}: ${n} af ${fund.positions.length} selskaber`];
  if (state.tags.length) parts.push(`tema ${state.tags.map(daTheme).join(', ')}`);
  if (state.q) parts.push(`søgning ${state.q}`);
  if (state.status) parts.push(STATUSES[state.status]);
  if (state.skift) parts.push(`temaskift ${state.skift.split('~').map(shiftFromLabel).join(' til ')}`);
  if (state.tvivl) parts.push('kun usikre forslag');
  if (state.linse) parts.push('kun med NDI-linse');
  parts.push(`sorteret efter ${SORTS[state.sort]}, ${state.dir === 'asc' ? 'stigende' : 'faldende'}`);
  const msg = parts.join(' · ');
  // Første visning af en side annonceres ikke (overskriften læses allerede); kun ændringer.
  if (lastAnnounce !== null && msg !== lastAnnounce) live.textContent = msg;
  lastAnnounce = msg;
}

function onClick(e) {
  const t = e.target.closest('[data-nav],[data-fund],[data-period],[data-sort],[data-tag],[data-mat],[data-status],[data-skift],[data-tvivl],[data-linse],[data-open],[data-x],#reset-filters,#copy-link,#csv-export,[data-clear-q]');
  if (!t) return;
  if (t.matches('[data-open]')) { openDialog(t.getAttribute('data-open')); return; }
  if (t.matches('[data-clear-q]')) { state.q = ''; writeUrl(); paint(); $('#q')?.focus(); return; }
  if (t.id === 'reset-filters') {
    state.tags = []; state.maturity = []; state.q = ''; state.status = ''; state.skift = ''; state.tvivl = false; state.linse = false; writeUrl(); paint(); return;
  }

  if (t.id === 'csv-export') {
    flushSearch();
    // Dansk Excel: UTF-8 BOM, semikolon, decimalkomma. Kun felter der også vises i UI (navn, beholdningsnavn, ISIN, vægt, tema).
    const fund = fundById(DATA.portfolio, state.fund);
    const list = filterPositions(fund);
    const asOf = fund.positionsAsOf || DATA.portfolio.asOf;
    const rows = [['Navn', 'Beholdningsnavn', 'ISIN', 'Ticker', 'Vægt %', 'Temaer', 'Temastatus', 'Før (forslag)', 'Usikkert forslag', 'Alternativ', 'Beholdning pr.']].concat(
      list.map((p) => [
        displayName(p), p.name || '', p.isin || '', p.symbol || '',
        p.weight == null ? '' : p.weight.toFixed(2).replace('.', ','),
        tagsFor(p, DATA.multiTags).map(daTheme).join(' | '),
        p.themeStatus === 'forslag' ? 'forslag (udkast)' : '',
        themeShift(p) ? shiftFromLabel(themeShift(p).from) : '',
        themeDoubt(p)?.why || '',
        doubtAltLabel(themeDoubt(p)?.alt),
        asOf,
      ])
    );
    const esc = (c) => `"${String(c).replace(/"/g, '""')}"`;
    const note = `"${fund.short} · forsinket beholdning pr. ${asOf} · generel information, ikke rådgivning · NDI Analytics udkast"`;
    const csv = '\ufeff' + [note, ...rows.map((r) => r.map(esc).join(';'))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const filt = [...state.tags, ...state.maturity, state.status, state.skift.replace('~', '-til-'), state.tvivl && 'usikre', state.linse && 'linse', state.q && 'soeg'].filter(Boolean).join('-');
    a.download = `ndi-${state.fund}-${asOf}${filt ? '-' + filt.replace(/[^a-z0-9-]/gi, '') : ''}.csv`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(`CSV hentet (${list.length} selskaber)`);
    return;
  }
  if (t.id === 'copy-link') {
    flushSearch();
    // U1: URL'en bærer hele visningen (fund, tags, mat, sort, q)
    navigator.clipboard.writeText(location.href)
      .then(() => toast('Link til denne liste er kopieret'))
      .catch(() => toast('Kunne ikke kopiere - kopiér adressen fra adresselinjen'));
    return;
  }
  if (t.matches('[data-x]')) {
    const [k, v] = t.getAttribute('data-x').split(':');
    if (k === 'tag') state.tags = state.tags.filter((x) => x !== v);
    if (k === 'mat') state.maturity = state.maturity.filter((x) => x !== v);
    if (k === 'status') { state.status = ''; state.skift = ''; state.tvivl = false; }
    if (k === 'tvivl') state.tvivl = false;
    if (k === 'skift') state.skift = '';
    if (k === 'linse') state.linse = false;
    writeUrl(); paint(); return;
  }
  if (t.matches('[data-nav]')) {
    e.preventDefault();
    state.view = t.getAttribute('data-nav');
    writeUrl(); paint(); window.scrollTo(0, 0); return;
  }
  if (t.matches('[data-fund]')) { state.fund = t.getAttribute('data-fund'); writeUrl(); paint(); return; }
  if (t.matches('[data-period]')) { state.period = t.getAttribute('data-period'); writeUrl(); paint(); return; }
  if (t.matches('[data-sort]')) {
    const k = t.getAttribute('data-sort');
    if (!SORTS[k]) return;
    if (state.sort === k) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
    else { state.sort = k; state.dir = k === 'weight' ? 'desc' : 'asc'; }
    writeUrl(); paint();
    // Tabellen gentegnes - giv fokus tilbage til samme kolonneknap (tastatur/skærmlæser)
    // To knapper pr. nøgle (kolonne + mobil-knaprække) - fokusér den, der er synlig
    ($all(`[data-sort="${k}"]`).find((b) => b.offsetParent) || $(`[data-sort="${k}"]`))?.focus();
    return;
  }
  if (t.matches('[data-status]')) {
    const v = t.getAttribute('data-status');
    state.status = state.status === v || !STATUSES[v] ? '' : v;
    if (state.status !== 'forslag') { state.skift = ''; state.tvivl = false; }
    writeUrl(); paint(); return;
  }
  if (t.matches('[data-skift]')) {
    const v = t.getAttribute('data-skift');
    state.status = 'forslag';
    state.skift = state.skift === v ? '' : v;
    writeUrl(); paint();
    $(`[data-skift="${CSS.escape(v)}"]`)?.focus();
    return;
  }
  if (t.matches('[data-tvivl]')) {
    state.status = 'forslag';
    state.tvivl = !state.tvivl;
    writeUrl(); paint();
    $('[data-tvivl]')?.focus();
    return;
  }
  if (t.matches('[data-linse]')) {
    state.linse = !state.linse;
    writeUrl(); paint();
    $('.filters [data-linse]')?.focus();
    return;
  }
  if (t.matches('[data-tag]')) {
    const v = t.getAttribute('data-tag');
    state.tags = state.tags.includes(v) ? state.tags.filter((x) => x !== v) : [...state.tags, v];
    writeUrl(); paint(); return;
  }
  if (t.matches('[data-mat]')) {
    const v = t.getAttribute('data-mat');
    state.maturity = state.maturity.includes(v) ? state.maturity.filter((x) => x !== v) : [...state.maturity, v];
    writeUrl(); paint(); return;
  }
}

function onInput(e) {
  if (e.target.id !== 'q') return;
  state.q = e.target.value;
  // URL og liste opdateres i samme tik, så et kopieret link altid matcher den viste liste (UX 22:00 MUST 2).
  clearTimeout(onInput._t);
  onInput._t = setTimeout(commitSearch, 150);
}

function commitSearch() {
  clearTimeout(onInput._t);
  onInput._t = null;
  // paint() genskaber søgefeltet. Fokus og markør skal blive stående, ellers mister man tegn midt i tastningen.
  const el = $('#q');
  const had = el && document.activeElement === el;
  const [a, z] = had ? [el.selectionStart, el.selectionEnd] : [0, 0];
  writeUrl(true);
  paint();
  const nu = $('#q');
  if (had && nu) { nu.focus({ preventScroll: true }); nu.setSelectionRange(a, z); }
}

// Kopiér/CSV lige efter tastning må ikke ramme en liste eller URL, der halter efter søgefeltet.
function flushSearch() {
  if (onInput._t) commitSearch();
}


/* ndi-keyboard */
function wireKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const bd = document.querySelector('.dialog-backdrop');
      if (bd) { const c = bd.querySelector('[data-close]'); if (c) c.click(); else bd.remove(); }
      return;
    }
    const seg = e.target.closest?.('.seg');
    if (!seg || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
    const controls = [...seg.querySelectorAll('.control:not(:disabled)')];
    const i = controls.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const n = controls.length;
    const fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1
      : fwd ? (i + 1) % n : (i - 1 + n) % n;
    const target = controls[next];
    // click() → paint() gentegner visningen; find samme kontrol igen og giv den fokus (APG tabs)
    const key = ['data-fund', 'data-period', 'data-tag'].find((k) => target.hasAttribute(k));
    const val = key && target.getAttribute(key);
    target.click();
    const again = key ? document.querySelector(`[${key}="${CSS.escape(val)}"]`) : target;
    (again || target).focus();
  });
}

async function main() {
  readUrl();
  // Strippede interne tags fjernes også fra adresselinjen, så de ikke deles via "Kopiér link"
  // Ugyldige/udfasede sorteringer (fx gamle links med sort=pe) normaliseres på samme måde
  const u0 = new URL(location.href).searchParams;
  if ((u0.get('tags') || '') !== state.tags.join(',') || (u0.get('sort') || 'weight') !== state.sort || (u0.has('status') && !state.status) || (u0.has('skift') && !state.skift) || (u0.has('tvivl') && !state.tvivl)) writeUrl(true);
  try {
    DATA = await loadAll();
    [MONTHS, LENS] = await Promise.all([
      fetch('data/company-months.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch('data/unique-metrics.json').then((r) => (r.ok ? r.json() : null)).then((j) => j?.byIsin || {}).catch(() => ({})),
    ]);
  } catch (err) {
    $('#app').innerHTML = `<p class="warn">Data kunne ikke hentes (${err.message}). Genindlæs siden.</p>`;
    return;
  }
  if (sanitizeMaturity()) writeUrl(true);
  fillKidFooter();
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  wireKeyboard();
  window.addEventListener('popstate', () => { readUrl(); if (sanitizeMaturity()) writeUrl(true); paint(); });
  window.addEventListener('resize', () => markHscroll($('#app')));
  // [data-open] håndteres af onClick-delegering (tidligere dobbelt listener → to dialoger)
  paint();
}

main();
