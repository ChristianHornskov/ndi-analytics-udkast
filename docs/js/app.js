import {
  loadAll, fundById, slicePeriod, cagr, periodReturn, ytdReturn, last12mReturn,
  monthlyReturns, maxDrawdown, fmtPct, fmtDate, daTheme, daMat, WARN_HIST,
  MATURITY_LABELS, THEME_LABELS,
} from './data.js';
import { renderChart } from './chart.js';

const state = {
  fund: 'pmindi',
  view: 'entre', // entre | fonden | portefolje | udforsk
  period: 'all',
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
  state.tags = (u.searchParams.get('tags') || '').split(',').filter(Boolean);
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
        <span>Performance, afkastkalender, drawdowns og hvordan du finder ISIN.</span>
        <span class="go">Åbn fonden →</span>
      </a>
      <a class="door" href="?view=portefolje&fund=${state.fund}" data-nav="portefolje">
        <strong>Porteføljen</strong>
        <span>Beholdninger fordelt på NDI-temaer og modenhed. Data pr. dato.</span>
        <span class="go">Se beholdninger →</span>
      </a>
      <a class="door" href="?view=udforsk&fund=${state.fund}" data-nav="udforsk">
        <strong>Udforsk tech</strong>
        <span>Screener med NDI-tags, sortering og søgning – kun porteføljens selskaber i level 1.</span>
        <span class="go">Åbn screener →</span>
      </a>
    </div>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:10px">Hurtige genveje</h2>
      <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Data opdateret pr. ${fmtDate(DATA.portfolio.asOf)} · Snapshot (ikke live pipeline).</p>
      <div class="seg">
        <a class="outline-btn small" href="selskab.html?isin=JP3436100006&fund=${state.fund}">Eksempel: SoftBank Group</a>
        <a class="outline-btn small" href="om-data.html">Om data & begreber</a>
        <a class="outline-btn small" href="embed/chart.html">Embed-graf (forside-komponent)</a>
        <a class="outline-btn small" href="vaerdikaede.html">AI-værdikæde (light)</a>
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
  const sliced = slicePeriod(rows, state.period);
  const totAll = periodReturn(rows);
  const c = cagr(rows);
  const ytd = ytdReturn(rows);
  const y1 = last12mReturn(rows);
  const dd = maxDrawdown(rows);
  const asOf = rows[rows.length - 1]?.d || DATA.portfolio.asOf;

  root.innerHTML = `
    <a class="back" href="?view=entre&fund=${state.fund}" data-nav="entre">← Entré</a>
    <p class="eyebrow">FONDEN</p>
    <h1>${fund.short || fund.id.toUpperCase()}</h1>
    <p class="lede">${fund.kind || ''} · Totalafkast i DKK efter fondens løbende omkostninger, før skat og egne handelsomkostninger. Pr. ${fmtDate(asOf)}.</p>
    <div class="toolbar">
      <div class="seg" role="tablist" aria-label="Andelsklasse">
        ${DATA.portfolio.funds.map((f) => `<button type="button" class="control ${f.id===state.fund?'active':''}" data-fund="${f.id}" role="tab" aria-selected="${f.id===state.fund}">${f.short}</button>`).join('')}
      </div>
      <div class="seg" role="tablist" aria-label="Periode">
        ${[['1m','1 md.'],['3m','3 mdr.'],['ytd','ÅTD'],['1y','1 år'],['all','Siden start']].map(([k,l]) =>
          `<button type="button" class="control ${state.period===k?'active':''}" data-period="${k}" role="tab" aria-selected="${state.period===k}">${l}</button>`).join('')}
      </div>
    </div>
    <section class="panel">
      <div class="metrics">
        <div class="metric"><div class="label">Totalafkast siden start</div><strong>${fmtPct(totAll)}</strong><small>Fra ${fmtDate(rows[0]?.d)} · DKK</small></div>
        <div class="metric"><div class="label">Gns. årligt afkast (CAGR)</div><strong>${fmtPct(c)}</strong><small>Efter løbende omkostninger</small></div>
        <div class="metric"><div class="label">År til dato</div><strong>${fmtPct(ytd)}</strong><small>Pr. ${fmtDate(asOf)}</small></div>
        <div class="metric"><div class="label">Seneste 12 måneder</div><strong>${fmtPct(y1)}</strong><small>Rullende</small></div>
      </div>
      ${warnHtml()}
      <p class="note-fundmarket">Nasdaq-sammenligning er ikke aktiveret i udkastet – kræver Fundmarkets godkendelse. Fonden har ikke et fast benchmark.</p>
      <div class="chart-wrap" id="perf-chart"></div>
      <p style="font-size:12px;color:var(--muted)">Gule prikker = illustrative toppe · mørkere prikker = illustrative dyk (begge sider – ingen cherry-picking). Redaktionel gennemgang mangler.</p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Månedlige afkast</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px">${state.calFull ? 'Hele historikken' : 'Seneste op til 36 måneder'} · rolige farver · røde måneder er synlige med vilje</p>
      ${warnHtml()}
      <div id="calendar"></div>
      <p style="margin-top:12px"><button type="button" class="outline-btn small" id="cal-toggle">${state.calFull ? 'Vis seneste 3 år' : 'Se hele historikken'}</button></p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Største fald fra top (drawdown)</h2>
      ${dd ? `<p style="font-size:15px">Største fald i serien: <strong style="color:var(--cyan)">${fmtPct(dd.dd)}</strong> fra ${fmtDate(dd.peakD)} til ${fmtDate(dd.troughD)}.</p>` : '<p>–</p>'}
      ${warnHtml()}
      <p class="band">Visningen er beskrivende. Den er ikke en opfordring til at handle.</p>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:6px">Det skete i porteføljen</h2>
      <p style="font-size:12px;color:var(--muted)">Største daglige kursbevægelser blandt beholdningerne · pr. ${fmtDate(asOf)} · kun fakta, ingen forklaring af dispositioner</p>
      <div id="movers" class="movers" style="margin-top:12px"></div>
    </section>
    <section class="panel">
      <h2 style="font-size:18px;margin-bottom:8px">Risiko (kort)</h2>
      <ul style="color:var(--muted);font-size:13px;line-height:1.55;padding-left:18px;display:grid;gap:6px">
        <li>Du kan tabe en del af eller hele din investering.</li>
        <li>Porteføljen er koncentreret i teknologi og typisk i USD-noterede papirer – det øger valutakurs- og sektorrisiko.</li>
        <li>Se gældende Central Information Dokument (KID) før du investerer.</li>
      </ul>
      <p style="margin-top:12px"><button type="button" class="outline-btn small" data-open="dlg-invest">Sådan investerer du · Kopiér ISIN</button></p>
    </section>`;

  const chartEl = $('#perf-chart', root);
  renderChart(chartEl, sliced, DATA.context.events || [], { label: 'Totalafkast' });
  // remove duplicate readout if chart.js inserted after container's next – ensure one
  renderCalendar($('#calendar', root), rows);
  renderMovers($('#movers', root), fund);
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

function renderMovers(el, fund) {
  const pos = [...fund.positions].filter((p) => typeof p.d1 === 'number');
  const up = [...pos].sort((a, b) => b.d1 - a.d1).slice(0, 5);
  const down = [...pos].sort((a, b) => a.d1 - b.d1).slice(0, 5);
  const item = (p) => `<li><a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${state.fund}">${p.name}</a><span class="${p.d1>=0?'up':'down'}">${fmtPct(p.d1)}</span></li>`;
  el.innerHTML = `
    <div><h3 style="font-size:13px;color:var(--muted);margin-bottom:8px">Største stigninger (dagen)</h3><ul class="mover-list">${up.map(item).join('')}</ul></div>
    <div><h3 style="font-size:13px;color:var(--muted);margin-bottom:8px">Største fald (dagen)</h3><ul class="mover-list">${down.map(item).join('')}</ul></div>`;
}

function filterPositions(fund) {
  let list = [...fund.positions];
  if (state.tags.length) list = list.filter((p) => state.tags.includes(p.theme));
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
  list.sort((a, b) => {
    const key = state.sort;
    let av = a[key], bv = b[key];
    if (key === 'name') return dir * (a.name || '').localeCompare(b.name || '', 'da');
    if (key === 'drawdown52Approx') { av = a.drawdown52Approx ?? 0; bv = b.drawdown52Approx ?? 0; }
    if (key === 'ps') { av = a.ps ?? -999; bv = b.ps ?? -999; }
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
    <p class="lede">Beholdning pr. ${fmtDate(fund.positionsAsOf || DATA.portfolio.asOf)}. Vægte summerer til ca. 100 %. Klassifikationer er udkast.</p>
    <p class="band">Segmenter viser eksponering, ikke en anbefaling.</p>
    ${fundToolbar()}
    <p class="band" style="font-size:11px">Udkast-klassifikation (modenhed/P/S) — ikke officiel NDI-rating. P/E kun for value. P/S vises ikke for præ-revenue.</p>
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
    ${th('name','Navn')}${th('weight','Vægt %')}<th>Tema</th><th>Modenhed</th>${th('ps','P/S')}<th>P/E</th>${th('drawdown52Approx','Fald fra top*')}
  </tr></thead><tbody>${list.map((p) => `<tr>
    <td><a href="selskab.html?isin=${encodeURIComponent(p.isin)}&fund=${fund.id}">${p.name}</a><br><small style="color:var(--muted)">${p.isin}</small></td>
    <td>${(p.weight ?? 0).toFixed(2).replace('.', ',')}</td>
    <td><span class="tag">${daTheme(p.theme)}</span></td>
    <td><span class="badge">${daMat(p.maturity)}</span></td>
    <td>${p.ps == null ? '–' : String(p.ps).replace('.', ',')}</td>
    <td>${p.pe == null ? '–' : String(p.pe).replace('.', ',')}</td>
    <td>${fmtPct(p.drawdown52Approx)}</td>
  </tr>`).join('')}</tbody></table></div>
  <p style="font-size:11px;color:var(--muted);margin-top:8px">* Fald fra top er tilnærmet i udkastet (YTD/1År) – ikke officiel 52-ugers drawdown.</p>`;
}

function renderUdforsk(root) {
  const fund = fundById(DATA.portfolio, state.fund);
  const list = filterPositions(fund);
  const themes = [...new Set(fund.positions.map((p) => p.theme))].sort();
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
      <button type="button" class="outline-btn small" data-open="dlg-follow">Følg tema (stub)</button>
    </div>
    <div class="filters" aria-label="Temaer">
      ${themes.map((t) => `<button type="button" class="control ${state.tags.includes(t)?'active':''}" data-tag="${t}">${daTheme(t)}</button>`).join('')}
    </div>
    <div class="filters" aria-label="Modenhed">
      ${Object.entries(MATURITY_LABELS).map(([k,l]) =>
        `<button type="button" class="control ${state.maturity.includes(k)?'active':''}" data-mat="${k}">${l}</button>`).join('')}
    </div>
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
  const t = e.target.closest('[data-nav],[data-fund],[data-period],[data-sort],[data-tag],[data-mat],[data-open],[data-x],#reset-filters');
  if (!t) return;
  if (t.matches('[data-open]')) { openDialog(t.getAttribute('data-open')); return; }
  if (t.id === 'reset-filters') {
    state.tags = []; state.maturity = []; state.q = ''; writeUrl(); paint(); return;
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
  try {
    DATA = await loadAll();
  } catch (err) {
    $('#app').innerHTML = `<p class="warn">Data kunne ikke hentes (${err.message}). Genindlæs siden.</p>`;
    return;
  }
  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  window.addEventListener('popstate', () => { readUrl(); paint(); });
  $all('[data-open]').forEach((b) => b.addEventListener('click', () => openDialog(b.getAttribute('data-open'))));
  paint();
}

main();
