import {
  loadAll, fundById, slicePeriod, cagr, periodReturn, ytdReturn,
  monthlyReturns, maxDrawdown, fmtPct, fmtDate, daTheme, daMat, WARN_HIST,
  MATURITY_LABELS, THEME_LABELS, calendarYearReturns, lastNav, publicTags, tagsFor, fillKidFooter, themeProposals,
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
  q: '',
  calFull: false,
};

let DATA = null;
let MONTHS = null;

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
  state.sort = u.searchParams.get('sort') || 'weight';
  state.dir = u.searchParams.get('dir') || 'desc';
  state.q = u.searchParams.get('q') || '';
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
  set('dir', state.dir, 'desc');
  set('q', state.q, '');
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

function warnHtml() {
  return `<p class="warn" role="note">${WARN_HIST}</p>`;
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
  // Samme klasse som temaer.html (themes.json er bygget på PMINDI), så tallet matcher siden bag døren
  const prop = themeProposals(fundById(DATA.portfolio, 'pmindi'));
  root.innerHTML = `
    <p class="eyebrow">NDI ANALYTICS · UDKAST</p>
    <h1>Gå på opdagelse i NewDeal Invest</h1>
    <p class="lede">Et sted hvor du kan se fondens udvikling, forstå porteføljen gennem NDI's egne temaer og modenhedsgrader - og finde selskaberne uden de klassiske 11 sektorkasser. Dette er et klikbart udkast (ikke den live hjemmeside).</p>
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
        <span>Forsinket snapshot fordelt på NDI-temaer og modenhed.</span>
        <span class="go">Se beholdninger →</span>
      </a>
      <a class="door" href="?view=udforsk&fund=${state.fund}" data-nav="udforsk">
        <span class="door-q">3 · Hvilke selskaber er det?</span>
        <strong>Udforsk tech</strong>
        <span>Find porteføljens selskaber efter tema, navn eller ISIN - uden de klassiske sektorkasser.</span>
        <span class="go">Åbn screener →</span>
      </a>
    </div>
    <p class="doors-h"><span class="doors-step">Forstå linsen</span> Hvordan NDI ser tech</p>
    <nav class="doors-sub doors-sub-3" aria-label="Forstå linsen">
      <a href="temaer.html?fund=${state.fund}"><strong>Temaer${prop.moved ? ` <span class="badge badge-draft" title="Forslag, afventer gennemgang">${prop.moved} forslag</span>` : ''}</strong><span>Fra chips til software - hvad hvert tema dækker</span></a>
      <a href="vaerdikaeder.html"><strong>Teknologiske værdikæder</strong><span>AI-compute, fysisk tech og energi · treemap + tidslinje</span></a>
      <a href="laer/index.html"><strong>Lær</strong><span>Sådan tænker vi, livscyklus, P/E og FAQ</span></a>
    </nav>
    <a class="why-card" href="ideer.html"><strong>Hvorfor NDI Analytics?</strong><span>Idéerne bag udkastet: multi-tag, værdikæden og forsinket beholdning som et bevidst valg.</span><span class="go" aria-hidden="true">→</span></a>
    <p class="more-links">Også i udkastet:
      <a href="drawdown.html?fund=${state.fund}">Største fald</a> ·
      <a href="sammenlign.html">PMINDI vs PMINDIAKK</a> ·
      <a href="invester.html">Sådan investerer du</a> ·
      <a href="selskab.html?isin=JP3436100006&fund=${state.fund}">Eksempel: SoftBank</a> ·
      <a href="selskaber.html?fund=${state.fund}">Selskaber A-Z</a> ·
      <a href="nyhedsarkiv.html">Nyhedsarkiv</a> ·
      <a href="om-data.html">Ordliste &amp; data</a> ·
      <a href="risici.html">Risici / KID</a> ·
      <a href="embed/chart.html">Embed-graf</a> ·
      <a href="kort.html">Sidekort</a> ·
      <button type="button" class="link-btn" data-open="dlg-follow">Følg med</button></p>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Porteføljeholdet</h2>
      <p style="color:var(--muted);font-size:14px;line-height:1.5">NewDeal Invest forvaltes af et porteføljehold med fokus på teknologi og bred spredning. Læs mere om holdet på <a href="https://newdealinvest.dk/">newdealinvest.dk</a>.</p>
    </section>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Sådan tænker vi (kort)</h2>
      <ol style="color:var(--muted);font-size:14px;line-height:1.55;padding-left:20px;display:grid;gap:8px">
        <li>Teknologi er drivkraften - retningen kan skimtes, vinderne kan ikke udpeges sikkert.</li>
        <li>Derfor bred spredning på tværs af værdikæden, ikke én “vinderaktie”.</li>
        <li>Store kursudsving er et grundvilkår i tech. Fald kan være store og vare længe.</li>
        <li>P/E er ikke vores hovedværktøj for vækstvirksomheder, der investerer tungt i fremtiden.</li>
        <li>Fonden er tænkt med lang horisont. Historisk afkast siger ikke, hvad der sker fremover.</li>
      </ol>
      ${warnHtml()}
    </section>`;
}

function renderFonden(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const rows = fund.data;
  const isAkk = fund.id === 'pmindiakk' || (fund.short || '').includes('AKK');
  const asOfPerf = rows[rows.length - 1]?.d || DATA.portfolio.performanceAsOf || DATA.portfolio.asOf;
  const posAsOf = fund.positionsAsOf || DATA.portfolio.asOf;
  const nav = lastNav(rows);

  // PMINDIAKK: ingen afkast før 12 mdr. historik
  if (isAkk) {
    root.innerHTML = `
      <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
      <p class="eyebrow">FONDEN</p>
      <h1>${fund.short}</h1>
      <p class="lede">Akkumulerende andelsklasse · ISIN ${fund.isin}</p>
      <div class="toolbar">
        ${fundSeg()}
      </div>
      <section class="panel">
        <div class="metrics">
          <div class="metric"><div class="label">Seneste NAV</div><strong>${nav ? nav.price.toFixed(2).replace('.', ',') : '-'}</strong><small>Pr. ${fmtDate(nav?.d)} · DKK</small></div>
          <div class="metric metric-wide"><div class="label">Afkast</div><strong>Vises efter 12 måneder</strong><small>Klassen har endnu ikke 12 måneders historik</small></div>
        </div>
        <p class="band">Afkasthistorik for PMINDIAKK vises, når klassen har 12 måneders historik (fra december 2026). Klassen følger samme overordnede strategi som PMINDI.</p>
        ${warnHtml()}
        <p class="note-fundmarket">Fonden har intet fast benchmark.</p>
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
    <p class="eyebrow">FONDEN</p>
    <h1>${fund.short || fund.id.toUpperCase()}</h1>
    <p class="lede">Udloddende andelsklasse. Totalafkast i DKK efter fondens løbende omkostninger, før skat og egne handelsomkostninger. Afkast pr. ${fmtDate(asOfPerf)}. Beholdning nedenfor er et forsinket snapshot, pr. ${fmtDate(posAsOf)}.</p>
    <div class="toolbar">
      ${fundSeg()}
      ${periodSeg}
    </div>
    <section class="panel">
      <div class="metrics">
        <div class="metric"><div class="label">Totalafkast siden start ${gl('total')}</div><strong>${fmtPct(totAll)}</strong><small>Fra første NAV ${fmtDate(rows[0]?.d)} · DKK</small></div>
        <div class="metric"><div class="label">Gns. årligt afkast (CAGR) ${gl('cagr')}</div><strong>${fmtPct(c)}</strong><small>Efter løbende omkostninger</small></div>
        <div class="metric"><div class="label">År til dato ${gl('ytd')}</div><strong>${fmtPct(ytd)}</strong><small>Pr. ${fmtDate(asOfPerf)}</small></div>
        <div class="metric"><div class="label">Max drawdown ${gl('drawdown')}</div><strong class="neg">${fmtPct(maxDrawdown(rows)?.dd)}</strong><small><a href="drawdown.html?fund=${state.fund}">Middel/median →</a></small></div>
        <div class="metric"><div class="label">Risikoindikator (KID) ${gl('sri')}</div><strong>5 / 7</strong><small>Anbefalet ejertid 5 år</small></div>
      </div>
      ${warnHtml()}
      <p class="note-fundmarket">Fonden har intet fast benchmark.</p>
      <p style="font-size:13px;color:var(--muted);margin:8px 0">Graf: ${periodLabel}</p>
      <div class="chart-wrap" id="perf-chart"></div>
      <p style="font-size:12px;color:var(--muted)">PMINDI: andelskursen falder med udbyttet på ex-dato. Totalafkastet viser værdien, hvis udbyttet var geninvesteret.</p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Afkast pr. kalenderår</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">Afsluttede år + delår fra start (*). Ingen 1- eller 3-måneders fremhævning.</p>
      ${warnHtml()}
      ${hscroll(`<div class="table-wrap"><table class="data" style="min-width:0"><thead><tr><th>År</th><th>Afkast</th><th>Periode</th><th></th></tr></thead><tbody>${yearTableDeep}</tbody></table></div>`, 'Rul til siden for flere kolonner.')}
      <p style="margin-top:12px"><a class="outline-btn small" href="drawdown.html?fund=${state.fund}">Åbn drawdown-side →</a>
      <a class="outline-btn small" href="periode.html?fund=${state.fund}&year=YTD" style="margin-left:8px">YTD dyb side →</a>
      <a class="outline-btn small" href="sammenlign.html" style="margin-left:8px">Vs PMINDIAKK →</a>
      <button type="button" class="outline-btn small" style="margin-left:8px" onclick="window.print()">Print / PDF</button></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Månedlige afkast</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">${state.calFull ? 'Hele historikken' : 'Seneste op til 36 måneder'} · røde måneder er synlige med vilje</p>
      ${warnHtml()}
      ${hscroll('<div id="calendar"></div>', 'Rul til siden for alle måneder.')}
      <p style="margin-top:12px"><button type="button" class="outline-btn" id="cal-toggle">${state.calFull ? 'Vis seneste 3 år' : 'Se hele historikken (ét klik)'}</button>
      <span style="display:block;margin-top:8px;font-size:12px;color:var(--muted)">Fuld historik er altid ét klik væk.</span></p>
    </section>

    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Eksempel: 100.000 kr. siden start</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55;margin-bottom:10px">Hvis du havde investeret 100.000 kr. ved første NAV (${fmtDate(rows[0]?.d)}) og geninvesteret udbytte, ville beløbet pr. ${fmtDate(asOfPerf)} være ca. <strong style="color:var(--text)">${totAll!=null ? (100000 * (1 + totAll/100)).toLocaleString('da-DK',{maximumFractionDigits:0}) : '-'} kr.</strong> (totalafkast ${fmtPct(totAll)}). Efter fondens løbende omkostninger, før skat og egne handelsomkostninger.</p>
      <p class="band">Eksemplet starter ved første NAV (ikke stiftelsesdato). Det er ikke et gunstigt valg af dato midt i en stigning. Regneeksempel, ikke en prognose. <span class="src">ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse.</span></p>
      ${warnHtml()}
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Omkostninger (kort)</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55">Afkasttal er efter fondens løbende omkostninger. Egne kurtage-/platformgebyrer og skat er ikke med. Se KID for officielle omkostningsoplysninger. Vi laver ikke nye ÅOP-beregninger i dette udkast.</p>
      <p style="margin-top:10px"><button type="button" class="outline-btn small" data-open="dlg-invest">ISIN &amp; investeringsflow</button>
      <a class="outline-btn small" style="margin-left:8px" href="om-data.html">Om data →</a></p>
    </section>

    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Det skete i porteføljen</h2>
      <p style="font-size:13px;color:var(--muted);line-height:1.55">Daglige top-bevægelser pr. aktie vises <strong style="color:var(--text)">ikke</strong> i denne version. Beholdningen er et forsinket snapshot, og kursafkast pr. aktie er under verifikation.</p>
      <p class="band">Beholdninger vises kun som forsinket snapshot (seneste offentlige kvartalsrapport i udkastet), så siden aldrig afslører fondens aktuelle handler. Ingen anbefaling om at købe eller sælge.</p>
      <p style="margin-top:10px"><a class="outline-btn small" href="selskaber.html?fund=${state.fund}">Se forsinket beholdning →</a>
      <a class="outline-btn small" style="margin-left:8px" href="temaer.html">Temaer →</a></p>
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
      <a class="outline-btn small" style="margin-left:8px" href="risici.html">Risici / KID →</a></p>
    </section>`;

  const ctxEvts = (DATA.context?.events || []).filter((e) => {
    if (!sliced.length) return false;
    return e.d >= sliced[0].d && e.d <= sliced[sliced.length - 1].d;
  });
  const ddMark = maxDrawdown(sliced);
  const ddEvts = [];
  if (ddMark?.peakD && sliced.some((r) => r.d === ddMark.peakD)) {
    ddEvts.push({ d: ddMark.peakD, kind: 'peak', title: 'Top før største fald', chartOnly: true });
  }
  if (ddMark?.troughD && sliced.some((r) => r.d === ddMark.troughD)) {
    ddEvts.push({ d: ddMark.troughD, kind: 'dip', title: `Bund (max drawdown ${fmtPct(ddMark.dd)})`, chartOnly: true });
  }
  const evts = [...ctxEvts, ...ddEvts];
  renderChart($('#perf-chart', root), sliced, evts, { label: 'Totalafkast' });
  if (ctxEvts.length) {
    const box = document.createElement('section');
    box.className = 'panel';
    box.innerHTML = `<h2 style="font-size:16px;margin-bottom:8px">Dokumenterede begivenheder i perioden</h2>
      <ul style="color:var(--muted);line-height:1.55;padding-left:18px">${ctxEvts.map((e) => `<li><strong style="color:var(--text)">${fmtDate(e.d)}</strong>. ${e.title}${e.source ? ` <span style="font-size:11px">(${e.source})</span>` : ''}<br><span style="font-size:12px">${e.text || ''}</span></li>`).join('')}</ul>
      <p style="font-size:11px;color:var(--muted);margin-top:8px">Kun dokumenterede fondsbegivenheder (udbytte). Grafen markerer også top/bund for max drawdown i perioden.</p>`;
    $('#perf-chart', root)?.closest('section')?.after(box);
  } else if (ddEvts.length) {
    const note = document.createElement('p');
    note.className = 'src';
    note.style.marginTop = '6px';
    note.innerHTML = `Grafmarkering: top/bund for max drawdown i perioden (${fmtPct(ddMark.dd)}). <a href="drawdown.html?fund=${state.fund}">Drawdown-side →</a>`;
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
  if (!state.calFull) list = months.slice(-36);
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
  el.innerHTML = `<div class="cal">${head}${body}</div>`;
}


function filterPositions(fund) {
  let list = [...fund.positions];
  if (state.tags.length) list = list.filter((p) => {
    const t = tagsFor(p, DATA.multiTags);
    return state.tags.some((x) => t.includes(x));
  });
  if (state.maturity.length) list = list.filter((p) => state.maturity.includes(p.maturity));
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter((p) =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.symbol || '').toLowerCase().includes(q) ||
      (p.isin || '').toLowerCase().includes(q) ||
      daTheme(p.theme).toLowerCase().includes(q)
    );
  }
  const dir = state.dir === 'asc' ? 1 : -1;
  // Compliance: no per-stock P/S, P/E, YTD, drawdown sorts in v1
  if (state.sort === 'ps' || state.sort === 'pe' || state.sort === 'drawdown52Approx') state.sort = 'weight';
  list.sort((a, b) => {
    const key = state.sort;
    let av = a[key], bv = b[key];
    if (key === 'name') return dir * (a.name || '').localeCompare(b.name || '', 'da');
    if (av == null) av = 0; if (bv == null) bv = 0;
    return dir * (av - bv);
  });
  return list;
}


function renderLivscyklus(fund) {
  // Pædagogisk kurve (bogen: præ-revenue → value). Prikker = selskaber MED manuel modenhed;
  // uklassificerede placeres ikke - vi gætter ikke i UI (lær/livscyklus.html).
  const stages = [
    { id: 'prerevenue', label: 'Præ-revenue', t: 0.07 },
    { id: 'preprofit', label: 'Præ-profit', t: 0.29 },
    { id: 'highgrowth', label: 'High growth', t: 0.5 },
    { id: 'garp', label: 'GARP', t: 0.71 },
    { id: 'value', label: 'Value', t: 0.93 },
  ];
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
    // Selskabsprikker spredes langs kurven omkring fasen; radius ~ √vægt
    const dots = list.map((p, i) => {
      const t = Math.min(0.99, Math.max(0.01, st.t + ((i % 9) - 4) * 0.012));
      const r = Math.max(2.5, Math.sqrt(p.weight || 0) * 2.4);
      return `<circle class="life-co" cx="${px(t).toFixed(1)}" cy="${(py(t) - 10 - Math.floor(i / 9) * 7).toFixed(1)}" r="${r.toFixed(1)}"><title>${p.name} · ${(p.weight ?? 0).toFixed(2).replace('.', ',')} %</title></circle>`;
    }).join('');
    return `${dots}<circle class="life-node" cx="${px(st.t)}" cy="${py(st.t).toFixed(1)}" r="7"/>
      <text class="life-lbl" x="${px(st.t)}" y="${H - 26}" text-anchor="middle">${st.label}</text>
      <text class="life-n" x="${px(st.t)}" y="${H - 8}" text-anchor="middle">${list.length ? `${list.length} selskaber` : '-'}</text>`;
  }).join('');
  const summary = stages.map((st) => `${st.label}: ${byStage[st.id].length}`).join(', ');
  const empty = classified === 0;
  const curve = `<div class="life-body">
    <p class="life-intro">Pædagogisk model fra bogen: selskaber bevæger sig typisk fra præ-revenue mod value. Det er <strong>ikke en officiel NDI-rating</strong> og ikke en anbefaling.</p>
    <div class="life-scroll"><svg class="life-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Livscykluskurve. ${summary}. ${unknown} ikke klassificeret.">
      <path class="life-curve" d="${path}"/>${nodes}
    </svg></div>
    <ol class="life-legend" aria-hidden="true">${stages.map((st) => `<li><strong>${st.label}</strong><span>${byStage[st.id].length || '-'}</span></li>`).join('')}</ol>
  </div>`;
  const foot = empty
    ? `Ingen af fondens ${fund.positions.length} selskaber er klassificeret endnu. Prikker kommer, når porteføljeholdet har klassificeret dem manuelt.`
    : `${classified} af ${fund.positions.length} selskaber er placeret (manuel klassifikation). ${unknown} mangler.`;
  return `<section class="panel life-strip${empty ? ' is-empty' : ''}">
    <div class="life-head"><h2>Livscyklus</h2><span class="badge badge-draft">UDKAST</span></div>
    ${curve}
    <p class="life-note">${foot} <a href="laer/livscyklus.html">Læs om livscyklus →</a></p>
  </section>`;
}

function renderPortefolje(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund).slice(0, 80);
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">PORTEFØLJEN</p>
    <h1>Beholdninger · ${fund.short}</h1>
    <p class="lede">Forsinket snapshot, pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)} (offentlig Fundmarket-rapport). Ikke dagsaktuel.</p>
    ${weightProfileNote(fund)}
    <p class="band">Segmenter viser eksponering, ikke en anbefaling. <a href="temaer.html?fund=${state.fund}">Se tema-oversigt →</a> Temaer mærket <span class="badge badge-draft">forslag</span> afventer NDI-gennemgang.</p>
    ${fundToolbar()}
    ${renderLivscyklus(fund)}
    <p class="band" style="font-size:11px">Ingen P/S, P/E eller kursafkast pr. aktie i denne version. Tema-tags er udkast.</p>
    ${positionsTable(list, fund)}
    <p style="font-size:12px;color:var(--muted);margin-top:10px">Viser ${list.length} af ${fund.positions.length} (top efter nuværende sortering). Åbn Udforsk for filtre.</p>`;
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
  return `<p class="note-weights" style="font-size:13px;color:var(--muted);line-height:1.55">${spread}Aktievægtene i snapshottet summerer til ca. ${Math.round(sum)} %. <a href="laer/hvorfor-mange-aktier.html">Hvorfor så mange aktier?</a></p>`;
}

// UX 22:00 SHOULD 1: på Udforsk er man allerede i screeneren, så knappen udelades dér
function fundToolbar({ screener = true } = {}) {
  return `<div class="toolbar">${fundSeg()}${screener ? `
    <a class="outline-btn small" href="?view=udforsk&fund=${state.fund}">Åbn screener</a>` : ''}</div>`;
}

function positionsTable(list, fund) {
  const th = (key, label) =>
    `<th><button type="button" data-sort="${key}" aria-sort="${state.sort===key?(state.dir==='asc'?'ascending':'descending'):'none'}">${label}${state.sort===key?(state.dir==='asc'?' ↑':' ↓'):''}</button></th>`;
  return `<p class="spark-legend"><svg class="spark-key" width="16" height="12" aria-hidden="true"><g fill="var(--cyan)"><rect x="0" y="6" width="4" height="6" rx="1"/><rect x="6" y="3" width="4" height="9" rx="1"/><rect x="12" y="0" width="4" height="12" rx="1"/></g></svg><span>Søjlerne ved navnet viser <strong>vægt i fonden pr. kvartal</strong>. Ikke aktiekurs.</span></p>` +
  hscroll(`<div class="table-wrap"><table class="data"><thead><tr>
    ${th('name','Navn')}${th('weight','Vægt %')}<th>Tema</th>
  </tr></thead><tbody>${list.map((p) => `<tr>
    <td><a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${fund.id}">${p.name}</a> ${weightSpark(p.isin, fund.id)}<br><small style="color:var(--muted)">${p.isin}</small></td>
    <td>${(p.weight ?? 0).toFixed(2).replace('.', ',')}</td>
    <td>${tagsFor(p, DATA.multiTags).map((t) => `<a class="tag" href="tema.html?slug=${encodeURIComponent(t)}&fund=${fund.id}">${daTheme(t)}</a>`).join(' ')}${p.themeStatus==='forslag'?' <span class="badge badge-draft" title="forslag, afventer gennemgang">forslag</span>':''}</td>
  </tr>`).join('')}</tbody></table></div>`, 'Rul til siden for flere kolonner.') +
  `<p style="font-size:11px;color:var(--muted);margin-top:8px">Kun vægt og tema. De små søjler ved navnet er selskabets <strong style="color:var(--text)">vægt i fonden</strong> pr. kvartalssnapshot frem til ${fmtDate(MONTHS?.cutoff || fund.positionsAsOf)}. Ikke aktiekurs. Ingen kursafkast pr. aktie i v1. Beholdning er forsinket.</p>`;
}

function emptyScreener(fund) {
  const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const active = [
    state.q && `søgning “${esc(state.q)}”`,
    state.tags.length && `tema ${state.tags.map(daTheme).join(' / ')}`,
  ].filter(Boolean).join(' og ');
  return `<div class="empty-state" role="status">
    <strong>Ingen af fondens ${fund.positions.length} selskaber matcher ${active || 'filtrene'}</strong>
    <span>Level 1 viser kun selskaber, fonden ejede pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)}. Et selskab, der ikke er med, er ikke et signal - se <a href="laer/faq-mangler-aktie.html">Hvorfor mangler aktie X?</a></span>
    <div class="row">
      ${state.q ? '<button type="button" class="outline-btn small" data-clear-q>Ryd søgning</button>' : ''}
      <button type="button" class="outline-btn small" id="reset-filters">Nulstil alle filtre</button>
      <a class="outline-btn small" href="selskaber.html?fund=${state.fund}">Se A-Z-listen</a>
    </div>
  </div>`;
}

function renderUdforsk(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund);
  const themes = [...new Set(fund.positions.flatMap((p) => tagsFor(p, DATA.multiTags)))].sort();
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">UDFORSK TECH</p>
    <h1>Screener · NDI-linse</h1>
    <p class="lede">Level 1: kun selskaber i porteføljen. Tags er mange-til-mange i ambitionen. Her ét primært tema pr. selskab i udkastet.</p>
    <p class="band">Informationen er generel - ikke en personlig anbefaling. Segmenter = eksponering.</p>
    ${fundToolbar({ screener: false })}
    <div class="filters">
      <input type="search" id="q" placeholder="Søg navn, ticker, ISIN, tema…" value="${state.q.replace(/"/g,'&quot;')}" aria-label="Søg">
      <button type="button" class="outline-btn small" id="reset-filters">Nulstil</button>
      <button type="button" class="outline-btn small" id="copy-link">Kopiér link til denne liste</button>
      <button type="button" class="outline-btn small" id="csv-export">Download CSV (filtreret)</button>
      <button type="button" class="outline-btn small" data-open="dlg-follow">Følg tema (stub)</button>
    </div>
    <div class="filters" role="group" aria-label="Filtrér på tema">
      ${themes.map((t) => `<button type="button" class="control ${state.tags.includes(t)?'active':''}" data-tag="${t}" aria-pressed="${state.tags.includes(t)}">${daTheme(t)}</button>`).join('')}
    </div>
    <p style="font-size:12px;color:var(--muted);margin:8px 0">Tema-dybsider: ${themes.map((t) => `<a href="tema.html?slug=${encodeURIComponent(t)}&fund=${state.fund}">${daTheme(t)}</a>`).join(' · ')} · <a href="selskaber.html?fund=${state.fund}">A-Z liste</a></p>
    <!-- Modenhedsfiltre skjult indtil manuel klassifikation -->
    <div class="chips" id="chips"></div>
    <p style="font-size:12px;color:var(--muted)" id="filter-status">${list.length} ${list.length === 1 ? 'resultat' : 'resultater'} · udkast-klassifikation</p>
    ${list.length ? positionsTable(list, fund) : emptyScreener(fund)}
    ${warnHtml()}`;

  const chips = $('#chips', root);
  const parts = [
    ...state.tags.map((t) => ({ k: 'tag', v: t, label: daTheme(t) })),
    ...state.maturity.map((m) => ({ k: 'mat', v: m, label: daMat(m) })),
  ];
  chips.innerHTML = parts.map((p) =>
    `<span class="chip">${p.label}<button type="button" data-x="${p.k}:${p.v}" aria-label="Fjern filter ${p.label}">×</button></span>`).join('');
}

function paint() {
  const root = $('#app');
  if (!root || !DATA) return;
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
  const SORT = { weight: 'vægt', name: 'navn', ps: 'P/S' };
  parts.push(`sorteret efter ${SORT[state.sort] || state.sort}, ${state.dir === 'asc' ? 'stigende' : 'faldende'}`);
  const msg = parts.join(' · ');
  // Første visning af en side annonceres ikke (overskriften læses allerede); kun ændringer.
  if (lastAnnounce !== null && msg !== lastAnnounce) live.textContent = msg;
  lastAnnounce = msg;
}

function onClick(e) {
  const t = e.target.closest('[data-nav],[data-fund],[data-period],[data-sort],[data-tag],[data-mat],[data-open],[data-x],#reset-filters,#copy-link,#csv-export,[data-clear-q]');
  if (!t) return;
  if (t.matches('[data-open]')) { openDialog(t.getAttribute('data-open')); return; }
  if (t.matches('[data-clear-q]')) { state.q = ''; writeUrl(); paint(); $('#q')?.focus(); return; }
  if (t.id === 'reset-filters') {
    state.tags = []; state.maturity = []; state.q = ''; writeUrl(); paint(); return;
  }

  if (t.id === 'csv-export') {
    flushSearch();
    // Dansk Excel: UTF-8 BOM, semikolon, decimalkomma. Kun felter der også vises i UI (navn, ISIN, vægt, tema).
    const fund = fundById(DATA.portfolio, state.fund);
    const list = filterPositions(fund);
    const asOf = fund.positionsAsOf || DATA.portfolio.asOf;
    const rows = [['Navn', 'ISIN', 'Ticker', 'Vægt %', 'Temaer', 'Beholdning pr.']].concat(
      list.map((p) => [
        p.name || '', p.isin || '', p.symbol || '',
        p.weight == null ? '' : p.weight.toFixed(2).replace('.', ','),
        tagsFor(p, DATA.multiTags).map(daTheme).join(' | '),
        asOf,
      ])
    );
    const esc = (c) => `"${String(c).replace(/"/g, '""')}"`;
    const note = `"${fund.short} · forsinket beholdning pr. ${asOf} · generel information, ikke rådgivning · NDI Analytics udkast"`;
    const csv = '\ufeff' + [note, ...rows.map((r) => r.map(esc).join(';'))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const filt = [...state.tags, state.q && 'soeg'].filter(Boolean).join('-');
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
    if (state.sort === k) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
    else { state.sort = k; state.dir = k === 'name' ? 'asc' : 'desc'; }
    writeUrl(); paint(); return;
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
  if ((new URL(location.href).searchParams.get('tags') || '') !== state.tags.join(',')) writeUrl(true);
  try {
    DATA = await loadAll();
    MONTHS = await fetch('data/company-months.json').then((r) => (r.ok ? r.json() : null)).catch(() => null);
  } catch (err) {
    $('#app').innerHTML = `<p class="warn">Data kunne ikke hentes (${err.message}). Genindlæs siden.</p>`;
    return;
  }
  fillKidFooter();
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  wireKeyboard();
  window.addEventListener('popstate', () => { readUrl(); paint(); });
  window.addEventListener('resize', () => markHscroll($('#app')));
  // [data-open] håndteres af onClick-delegering (tidligere dobbelt listener → to dialoger)
  paint();
}

main();
