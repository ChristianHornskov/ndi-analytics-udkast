import {
  loadAll, fundById, slicePeriod, cagr, periodReturn, ytdReturn,
  monthlyReturns, fmtPct, fmtDate, daTheme, daMat, WARN_HIST,
  MATURITY_LABELS, THEME_LABELS, calendarYearReturns, lastNav, publicTags, tagsFor,
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

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function readUrl() {
  const u = new URL(location.href);
  state.fund = u.searchParams.get('fund') || 'pmindi';
  state.view = u.searchParams.get('view') || 'entre';
  state.period = u.searchParams.get('periode') || 'all';
  // Interne tags (legacy/Trump) må aldrig ende i chips eller URL – UX §0.2, INTERNAL-TAGS.md
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
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.append(t); }
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._id);
  toast._id = setTimeout(() => { t.hidden = true; }, 2800);
}

function openDialog(id) {
  const tpl = document.getElementById(id);
  if (!tpl) return;
  const backdrop = document.createElement('div');
  backdrop.className = 'dialog-backdrop';
  backdrop.innerHTML = tpl.innerHTML;
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.remove(); });
  backdrop.querySelector('[data-close]')?.addEventListener('click', () => backdrop.remove());
  document.body.append(backdrop);
  backdrop.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
        toast('ISIN kopieret');
      } catch {
        toast('Kunne ikke kopiere – markér koden manuelt');
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

function warnHtml() {
  return `<p class="warn" role="note">${WARN_HIST}</p>`;
}

function renderEntre(root) {
  root.innerHTML = `
    <p class="eyebrow">NDI ANALYTICS · UDKAST</p>
    <h1>Gå på opdagelse i NewDeal Invest</h1>
    <p class="lede">Et sted hvor du kan se fondens udvikling, forstå porteføljen gennem NDI's egne temaer og modenhedsgrader – og finde selskaberne uden de klassiske 11 sektorkasser. Dette er et klikbart udkast (ikke den live hjemmeside).</p>
    <p class="band">Segmenter og temaer viser <strong>eksponering</strong>, ikke en anbefaling. Indholdet er generel information.</p>
    <div class="doors" role="navigation" aria-label="Vælg område">
      <a class="door" href="?view=fonden&fund=${state.fund}" data-nav="fonden">
        <strong>Fonden</strong>
        <span>Performance, afkastkalender, drawdown og dokumenterede udbytter.</span>
        <span class="go">Åbn fonden →</span>
      </a>
      <a class="door" href="?view=portefolje&fund=${state.fund}" data-nav="portefolje">
        <strong>Porteføljen</strong>
        <span>Forsinket beholdning fordelt på NDI-temaer. Eksponering, ikke anbefaling.</span>
        <span class="go">Se beholdninger →</span>
      </a>
      <a class="door" href="?view=udforsk&fund=${state.fund}" data-nav="udforsk">
        <strong>Udforsk tech</strong>
        <span>Screener med NDI-tags, tema-dybsider og søgning — kun porteføljens selskaber.</span>
        <span class="go">Åbn screener →</span>
      </a>
      <a class="door" href="laer/index.html">
        <strong>Lær</strong>
        <span>Sådan tænker vi, varians, P/E, livscyklus og FAQ.</span>
        <span class="go">Åbn lær →</span>
      </a>
      <a class="door" href="invester.html">
        <strong>Sådan investerer du</strong>
        <span>Fra produktforståelse til ISIN og platform — generel info.</span>
        <span class="go">Se flow →</span>
      </a>
      <a class="door" href="sammenlign.html">
        <strong>Sammenlign</strong>
        <span>PMINDI vs PMINDIAKK: udbytte vs akkumulering.</span>
        <span class="go">Sammenlign →</span>
      </a>
    </div>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:10px">Hurtige genveje</h2>
      <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Beholdning pr. ${fmtDate(DATA.portfolio.asOf)} · Afkast-snapshot (ikke live pipeline).</p>
      <div class="seg">
        <a class="outline-btn small" href="temaer.html">Alle temaer</a>
        <a class="outline-btn small" href="tema.html?slug=chips&fund=${state.fund}">Tema: Chips</a>
        <a class="outline-btn small" href="laer/index.html">Lær</a>
        <a class="outline-btn small" href="drawdown.html?fund=${state.fund}">Drawdown</a>
        <a class="outline-btn small" href="sammenlign.html">PMINDI vs AKK</a>
        <a class="outline-btn small" href="invester.html">Sådan investerer du</a>
        <a class="outline-btn small" href="selskaber.html?fund=${state.fund}">Alle selskaber</a>
        <a class="outline-btn small" href="nyhedsarkiv.html">Nyhedsarkiv</a>
        <a class="outline-btn small" href="om-data.html">Ordliste & data</a>
        <a class="outline-btn small" href="vaerdikaede.html">AI-værdikæde</a>
        <a class="outline-btn small" href="embed/chart.html">Embed-graf</a>
        <a class="outline-btn small" href="selskab.html?isin=JP3436100006&fund=${state.fund}">Eksempel: SoftBank</a>
        <button type="button" class="outline-btn small" data-open="dlg-follow">Følg med (stub)</button>
      </div>
    </section>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Porteføljeholdet</h2>
      <p style="color:var(--muted);font-size:14px;line-height:1.5">NewDeal Invest forvaltes af et porteføljehold med fokus på teknologi og bred spredning. Læs mere om holdet på <a href="https://newdealinvest.dk/">newdealinvest.dk</a>.</p>
    </section>
    <section class="panel" style="margin-top:18px">
      <h2 style="font-size:18px;margin-bottom:8px">Sådan tænker vi (kort)</h2>
      <ol style="color:var(--muted);font-size:14px;line-height:1.55;padding-left:20px;display:grid;gap:8px">
        <li>Teknologi er drivkraften – retningen kan skimtes, vinderne kan ikke udpeges sikkert.</li>
        <li>Derfor bred spredning på tværs af værdikæden, ikke én “vinderaktie”.</li>
        <li>Store kursudsving er et grundvilkår – ikke det samme som langsigtet risiko.</li>
        <li>Vi bruger ikke P/E som hovedværktøj til vækstvirksomheder, der investerer tungt i fremtiden.</li>
        <li>Lang horisont. Historisk afkast siger ikke, hvad der sker fremover.</li>
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
        <div class="seg" role="tablist" aria-label="Andelsklasse">
          ${DATA.portfolio.funds.map((f) => `<button type="button" class="control ${f.id===state.fund?'active':''}" data-fund="${f.id}" role="tab" aria-selected="${f.id===state.fund}">${f.short}</button>`).join('')}
        </div>
      </div>
      <section class="panel">
        <div class="metrics">
          <div class="metric"><div class="label">Seneste NAV</div><strong>${nav ? nav.price.toFixed(2).replace('.', ',') : '–'}</strong><small>Pr. ${fmtDate(nav?.d)} · DKK</small></div>
          <div class="metric"><div class="label">Afkast</div><strong style="font-size:18px">Vises efter 12 måneder</strong><small>Klassen har endnu ikke 12 måneders historik</small></div>
        </div>
        <p class="band">Afkasthistorik for PMINDIAKK vises, når klassen har 12 måneders historik (fra december 2026). Klassen følger samme overordnede strategi som PMINDI.</p>
        ${warnHtml()}
        <p class="note-fundmarket">Fonden har intet benchmark.</p>
      </section>
      <section class="panel">
        <h2 style="font-size:18px;margin-bottom:8px">Risiko (kort)</h2>
        <p style="color:var(--muted);font-size:13px;line-height:1.55">Risikoindikator <strong style="color:var(--text)">5</strong> på en skala fra 1 til 7 (KID). Anbefalet ejertid 5 år. Du kan tabe en del af eller hele din investering. Se KID-links i footeren.</p>
        <p style="margin-top:12px"><button type="button" class="outline-btn small" data-open="dlg-invest">Sådan investerer du · Kopiér ISIN</button></p>
      </section>`;
    return;
  }

  // PMINDI: kun siden start, YTD, afsluttede kalenderår — ingen 1 md / 3 md
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

  const yearBtns = years.map((y) =>
    `<button type="button" class="control ${state.period===('year:'+y.year)?'active':''}" data-period="year:${y.year}" role="tab" aria-selected="${state.period===('year:'+y.year)}">${y.year}${y.partial?'*':''}</button>`
  ).join('');

  const yearTable = years.map((y) =>
    `<tr><td>${y.year}${y.partial ? ' <span class="badge">delår</span>' : ''}</td><td>${fmtPct(y.ret)}</td><td style="color:var(--muted);font-size:12px">${fmtDate(y.from)} – ${fmtDate(y.to)}</td></tr>`
  ).join('');
  const yearTableDeep = years.map((y) =>
    `<tr><td>${y.year}${y.partial ? ' <span class="badge">delår</span>' : ''}</td><td>${fmtPct(y.ret)}</td><td style="color:var(--muted);font-size:12px">${fmtDate(y.from)} – ${fmtDate(y.to)}</td><td><a href="periode.html?fund=${state.fund}&year=${y.year}">Dyb →</a></td></tr>`
  ).join('');

  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">FONDEN</p>
    <h1>${fund.short || fund.id.toUpperCase()}</h1>
    <p class="lede">Udloddende andelsklasse. Totalafkast i DKK efter fondens løbende omkostninger, før skat og egne handelsomkostninger. Afkast pr. ${fmtDate(asOfPerf)}. Beholdning nedenfor er forsinket (pr. ${fmtDate(posAsOf)}).</p>
    <div class="toolbar">
      <div class="seg" role="tablist" aria-label="Andelsklasse">
        ${DATA.portfolio.funds.map((f) => `<button type="button" class="control ${f.id===state.fund?'active':''}" data-fund="${f.id}" role="tab" aria-selected="${f.id===state.fund}">${f.short}</button>`).join('')}
      </div>
      <div class="seg" role="tablist" aria-label="Periode">
        <button type="button" class="control ${state.period==='all'?'active':''}" data-period="all" role="tab" aria-selected="${state.period==='all'}">Siden start</button>
        <button type="button" class="control ${state.period==='ytd'?'active':''}" data-period="ytd" role="tab" aria-selected="${state.period==='ytd'}">ÅTD</button>
        ${yearBtns}
      </div>
    </div>
    <section class="panel">
      <div class="metrics">
        <div class="metric"><div class="label">Totalafkast siden start ${gl('total')}</div><strong>${fmtPct(totAll)}</strong><small>Fra ${fmtDate(rows[0]?.d)} · DKK</small></div>
        <div class="metric"><div class="label">Gns. årligt afkast (CAGR) ${gl('cagr')}</div><strong>${fmtPct(c)}</strong><small>Efter løbende omkostninger</small></div>
        <div class="metric"><div class="label">År til dato ${gl('ytd')}</div><strong>${fmtPct(ytd)}</strong><small>Pr. ${fmtDate(asOfPerf)}</small></div>
        <div class="metric"><div class="label">Risikoindikator (KID) ${gl('sri')}</div><strong>5 / 7</strong><small>Anbefalet ejertid 5 år</small></div>
      </div>
      ${warnHtml()}
      <p class="note-fundmarket">Fonden har intet benchmark.</p>
      <p style="font-size:13px;color:var(--muted);margin:8px 0">Graf: ${periodLabel}</p>
      <div class="chart-wrap" id="perf-chart"></div>
      <p style="font-size:12px;color:var(--muted)">PMINDI: andelskursen falder med udbyttet på ex-dato. Totalafkastet viser værdien, hvis udbyttet var geninvesteret.</p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Afkast pr. kalenderår</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">Afsluttede år + delår fra start (*). Ingen 1- eller 3-måneders fremhævning.</p>
      ${warnHtml()}
      <div class="table-wrap"><table class="data" style="min-width:0"><thead><tr><th>År</th><th>Afkast</th><th>Periode</th><th></th></tr></thead><tbody>${yearTableDeep}</tbody></table></div>
      <p style="margin-top:12px"><a class="outline-btn small" href="drawdown.html?fund=${state.fund}">Åbn drawdown-side →</a>
      <a class="outline-btn small" href="periode.html?fund=${state.fund}&year=YTD" style="margin-left:8px">YTD dyb side →</a>
      <a class="outline-btn small" href="sammenlign.html" style="margin-left:8px">Vs PMINDIAKK →</a></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Månedlige afkast</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">${state.calFull ? 'Hele historikken' : 'Seneste op til 36 måneder'} · røde måneder er synlige med vilje</p>
      ${warnHtml()}
      <div id="calendar"></div>
      <p style="margin-top:12px"><button type="button" class="outline-btn" id="cal-toggle">${state.calFull ? 'Vis seneste 3 år' : 'Se hele historikken (ét klik)'}</button>
      <span style="display:block;margin-top:8px;font-size:12px;color:var(--muted)">Fuld historik er altid ét klik væk.</span></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Risiko (kort)</h2>
      <ul style="color:var(--muted);font-size:13px;line-height:1.55;padding-left:18px;display:grid;gap:6px">
        <li>Risikoindikator 5 på en skala fra 1 til 7 (KID, 14. august 2026). Anbefalet ejertid 5 år.</li>
        <li>Du kan tabe en del af eller hele din investering.</li>
        <li>Store kursudsving er et grundvilkår for teknologiaktier. Du skal kunne holde investeringen i mindst 5 år og tåle store fald undervejs.</li>
        <li>Porteføljen er koncentreret i teknologi og typisk i USD-noterede papirer.</li>
      </ul>
      <p style="margin-top:12px"><button type="button" class="outline-btn small" data-open="dlg-invest">Sådan investerer du · Kopiér ISIN</button></p>
    </section>`;

  renderChart($('#perf-chart', root), sliced, [], { label: 'Totalafkast' });
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
    return `<div class="yh">${y}</div>` + arr.map((v) => {
      if (v == null) return '<div class="cell muted">–</div>';
      const cls = v >= 0 ? 'up' : 'down';
      return `<div class="cell ${cls}" title="${fmtPct(v)}">${v.toFixed(1).replace('.', ',')}</div>`;
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
  const psOf = (p) => (p.maturity === 'prerevenue' ? null : p.ps ?? null);
  list.sort((a, b) => {
    const key = state.sort;
    if (key === 'ps') {
      const av = psOf(a), bv = psOf(b);
      if (av == null || bv == null) return (av == null) - (bv == null);
      return dir * (av - bv);
    }
    let av = a[key], bv = b[key];
    if (key === 'name') return dir * (a.name || '').localeCompare(b.name || '', 'da');
    if (av == null) av = 0; if (bv == null) bv = 0;
    return dir * (av - bv);
  });
  return list;
}

function renderPortefolje(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund).slice(0, 80);
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">PORTEFØLJEN</p>
    <h1>Beholdninger · ${fund.short}</h1>
    <p class="lede">Forsinket offentlig beholdning pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)} (Fundmarket månedsrapport) — ikke dagsaktuel. Vægte summerer til ca. 100 %.</p>
    <p class="band">Segmenter viser eksponering, ikke en anbefaling.</p>
    ${fundToolbar()}
    <p class="band" style="font-size:11px">Ingen P/S, P/E eller kursafkast pr. aktie i denne version. Tema-tags er udkast.</p>
    ${positionsTable(list, fund)}
    <p style="font-size:12px;color:var(--muted);margin-top:10px">Viser ${list.length} af ${fund.positions.length} (top efter nuværende sortering). Åbn Udforsk for filtre.</p>`;
}

function fundToolbar() {
  return `<div class="toolbar"><div class="seg">${DATA.portfolio.funds.map((f) =>
    `<button type="button" class="control ${f.id===state.fund?'active':''}" data-fund="${f.id}">${f.short}</button>`).join('')}</div>
    <a class="outline-btn small" href="?view=udforsk&fund=${state.fund}">Åbn screener</a></div>`;
}

function positionsTable(list, fund) {
  const th = (key, label) =>
    `<th><button type="button" data-sort="${key}" aria-sort="${state.sort===key?(state.dir==='asc'?'ascending':'descending'):'none'}">${label}${state.sort===key?(state.dir==='asc'?' ↑':' ↓'):''}</button></th>`;
  return `<div class="table-wrap"><table class="data"><thead><tr>
    ${th('name','Navn')}${th('weight','Vægt %')}<th>Tema</th>
  </tr></thead><tbody>${list.map((p) => `<tr>
    <td><a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${fund.id}">${p.name}</a><br><small style="color:var(--muted)">${p.isin}</small></td>
    <td>${(p.weight ?? 0).toFixed(2).replace('.', ',')}</td>
    <td>${tagsFor(p, DATA.multiTags).map((t) => `<a class="tag" href="tema.html?slug=${encodeURIComponent(t)}&fund=${fund.id}">${daTheme(t)}</a>`).join(' ')}</td>
  </tr>`).join('')}</tbody></table></div>
  <p style="font-size:11px;color:var(--muted);margin-top:8px">Kun vægt og tema. Ingen kursafkast pr. aktie i v1 (under verifikation). Beholdning er forsinket.</p>`;
}

function renderUdforsk(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund);
  const themes = [...new Set(fund.positions.flatMap((p) => tagsFor(p, DATA.multiTags)))].sort();
  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">UDFORSK TECH</p>
    <h1>Screener · NDI-linse</h1>
    <p class="lede">Level 1: kun selskaber i porteføljen. Tags er mange-til-mange i ambitionen; her ét primært tema pr. selskab i udkastet.</p>
    <p class="band">Informationen er generel – ikke en personlig anbefaling. Segmenter = eksponering.</p>
    ${fundToolbar()}
    <div class="filters">
      <input type="search" id="q" placeholder="Søg navn, ticker, ISIN, tema…" value="${state.q.replace(/"/g,'&quot;')}" aria-label="Søg">
      <button type="button" class="outline-btn small" id="reset-filters">Nulstil</button>
      <button type="button" class="outline-btn small" id="copy-link">Kopiér link til denne liste</button>
      <button type="button" class="outline-btn small" data-open="dlg-follow">Følg tema (stub)</button>
    </div>
    <div class="filters" aria-label="Temaer">
      ${themes.map((t) => `<button type="button" class="control ${state.tags.includes(t)?'active':''}" data-tag="${t}">${daTheme(t)}</button>`).join('')}
    </div>
    <p style="font-size:12px;color:var(--muted);margin:8px 0">Tema-dybsider: ${themes.map((t) => `<a href="tema.html?slug=${encodeURIComponent(t)}&fund=${state.fund}">${daTheme(t)}</a>`).join(' · ')} · <a href="selskaber.html?fund=${state.fund}">A–Z liste</a></p>
    <!-- Modenhedsfiltre skjult indtil manuel klassifikation -->
    <div class="chips" id="chips"></div>
    <p style="font-size:12px;color:var(--muted)">${list.length} resultater · udkast-klassifikation</p>
    ${list.length ? positionsTable(list, fund) : '<p class="band">Ingen selskaber matcher – fjern et filter.</p>'}
    ${warnHtml()}`;

  const chips = $('#chips', root);
  const parts = [
    ...state.tags.map((t) => ({ k: 'tag', v: t, label: daTheme(t) })),
    ...state.maturity.map((m) => ({ k: 'mat', v: m, label: daMat(m) })),
  ];
  chips.innerHTML = parts.map((p) =>
    `<span class="chip">${p.label}<button type="button" data-x="${p.k}:${p.v}" aria-label="Fjern">×</button></span>`).join('');
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
  $('#asof-global') && ($('#asof-global').textContent = `Data pr. ${fmtDate(DATA.portfolio.asOf)}`);
}

function onClick(e) {
  const t = e.target.closest('[data-nav],[data-fund],[data-period],[data-sort],[data-tag],[data-mat],[data-open],[data-x],#reset-filters,#copy-link');
  if (!t) return;
  if (t.matches('[data-open]')) { openDialog(t.getAttribute('data-open')); return; }
  if (t.id === 'reset-filters') {
    state.tags = []; state.maturity = []; state.q = ''; writeUrl(); paint(); return;
  }
  if (t.id === 'copy-link') {
    // U1: URL'en bærer hele visningen (fund, tags, mat, sort, q)
    navigator.clipboard.writeText(location.href)
      .then(() => toast('Link til denne liste er kopieret'))
      .catch(() => toast('Kunne ikke kopiere – kopiér adressen fra adresselinjen'));
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
  writeUrl(true);
  // debounced repaint of table only – full paint ok for draft
  clearTimeout(onInput._t);
  onInput._t = setTimeout(paint, 150);
}

async function main() {
  readUrl();
  // Strippede interne tags fjernes også fra adresselinjen, så de ikke deles via "Kopiér link"
  if ((new URL(location.href).searchParams.get('tags') || '') !== state.tags.join(',')) writeUrl(true);
  try {
    DATA = await loadAll();
  } catch (err) {
    $('#app').innerHTML = `<p class="warn">Data kunne ikke hentes (${err.message}). Genindlæs siden.</p>`;
    return;
  }
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  window.addEventListener('popstate', () => { readUrl(); paint(); });
  // [data-open] håndteres af onClick-delegering (tidligere dobbelt listener → to dialoger)
  paint();
}

main();
