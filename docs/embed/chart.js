(() => {
  const FUNDS = { PMINDI: 'pmindi', PMINDIAKK: 'pmindiakk' };
  function lacksReturns(fund) {
    const pts = fund?.data || [];
    return !pts.length || pts[0].total == null || fund.returnsDeferred;
  }

  // Compliance: kun ÅTD og hele perioden. Aldrig 1 md / 3 md (ukendte ?periode= falder tilbage til 'all')
  const PERIODS = {
    ytd: 'År til dato',
    all: 'Hele perioden'
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const number = new Intl.NumberFormat('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const dateFormat = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const axisFormat = new Intl.DateTimeFormat('da-DK', { month: 'short', year: 'numeric', timeZone: 'UTC' });

  const timestamp = d => Date.parse(d + 'T12:00:00Z');
  const fmtDate = d => dateFormat.format(new Date(timestamp(d)));
  const pct = (n, sign = false) => {
    if (n == null || Number.isNaN(n)) return '-';
    const value = Math.abs(n) < 0.05 ? 0 : n;
    return `${sign && value > 0 ? '+' : ''}${number.format(value)} %`;
  };
  const toneOf = n => (n < -0.05 ? 'neg' : 'pos');
  const escape = s => String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const params = new URLSearchParams(location.search);
  const requestedFund = (params.get('klasse') || params.get('fund') || 'PMINDI').toUpperCase();
  const requestedPeriod = (params.get('periode') || params.get('period') || 'all').toLowerCase();

  const state = {
    fund: FUNDS[requestedFund] ? requestedFund : 'PMINDI',
    period: PERIODS[requestedPeriod] ? requestedPeriod : 'all', // unknown/1m/3m/1y → all
    ready: false,
    series: [],
    geometry: null,
    selectedDate: null,
    truncated: false
  };

  let payload = null;
  let lastHeight = 0;
  let heightFrame = 0;
  let resizeFrame = 0;

  function publishHeight() {
    const height = Math.ceil(Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0,
      document.documentElement.offsetHeight
    ));
    if (!Number.isFinite(height) || height < 80 || height === lastHeight) return;
    lastHeight = height;
    parent.postMessage({ type: 'ndi-embed-height', height }, '*');
  }

  function sendHeight() {
    publishHeight();
    cancelAnimationFrame(heightFrame);
    heightFrame = requestAnimationFrame(publishHeight);
  }

  function syncURL() {
    try {
      const url = new URL(location.href);
      url.searchParams.set('klasse', state.fund);
      url.searchParams.set('periode', state.period);
      url.searchParams.delete('fund');
      url.searchParams.delete('period');
      history.replaceState(null, '', url);
    } catch { /* iframe sandbox or file URL */ }
  }

  function fundRecord() {
    const id = FUNDS[state.fund];
    return payload.funds.find(f => f.id === id || f.short === state.fund);
  }

  function cutoffDate(period, lastDate) {
    if (period !== 'ytd') return null;
    return `${Number(lastDate.slice(0, 4)) - 1}-12-31`;
  }

  // PMINDIAKK: ingen afkasttal, graf eller tooltip før klassen har 12 måneders historik
  const isAkk = () => state.fund === 'PMINDIAKK' || lacksReturns(fundRecord());

  function periodSlice(points, period) {
    const cutoff = cutoffDate(period, points.at(-1).d);
    if (!cutoff) return { points, truncated: false };
    let base = null;
    for (const p of points) {
      if (p.d <= cutoff) base = p;
      else break;
    }
    if (!base) return { points, truncated: true };
    return { points: points.filter(p => p.d >= base.d), truncated: false };
  }

  function indexSeries(points) {
    const start = points[0].total;
    if (start == null) return;
    return points.map(p => ({
      date: p.d,
      value: start ? (p.total / start - 1) * 100 : 0,
      total: p.total
    }));
  }

  function yearsBetween(a, b) {
    return (timestamp(b) - timestamp(a)) / (365.25 * 86400000);
  }

  function cagr(first, last) {
    const years = yearsBetween(first.d, last.d);
    if (years < 1 || !(first.total > 0) || !(last.total > 0)) return null;
    return ((last.total / first.total) ** (1 / years) - 1) * 100;
  }

  function nearest(series, target) {
    const t = typeof target === 'number' ? target : timestamp(target);
    let best = 0;
    for (let i = 1; i < series.length; i++) {
      if (Math.abs(timestamp(series[i].date) - t) < Math.abs(timestamp(series[best].date) - t)) best = i;
    }
    return best;
  }

  function verbFor(value) {
    if (value > 0.05) return 'steget';
    if (value < -0.05) return 'faldet';
    return 'uændret';
  }

  function updateChrome() {
    $$('[data-fund]').forEach(el => {
      const active = el.dataset.fund === state.fund;
      el.classList.toggle('selected', active);
      el.setAttribute('aria-checked', String(active));
      el.tabIndex = active ? 0 : -1;
    });
    $$('[data-period]').forEach(el => {
      const active = el.dataset.period === state.period;
      el.classList.toggle('active', active);
      el.setAttribute('aria-selected', String(active));
      el.tabIndex = active ? 0 : -1;
    });
    const dd = document.getElementById('drawdown-link');
    if (dd) {
      const id = FUNDS[state.fund] || 'pmindi';
      dd.href = `../drawdown.html?fund=${id}`;
      dd.textContent = state.fund === 'PMINDIAKK'
        ? 'Fald fra top vises efter 12 måneder →'
        : 'Se største fald →';
    }
  }

  function updateMetrics() {
    const row = document.querySelector('.metrics-row');
    const totalLabel = document.querySelector('.metric:first-child .metric-label');
    if (isAkk()) {
      row?.classList.add('is-gated');
      if (totalLabel) totalLabel.textContent = 'Kurs og afkast';
      const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
      set('fund-return', 'Ny andelsklasse, kurs vises efter 12 måneder');
      set('metric-total', '-');
      set('metric-cagr', '-');
      set('metric-ytd', '-');
      set('metric-dd', '-');
      const note = document.getElementById('metric-total-note');
      const gate = 'Ny andelsklasse, kurs vises efter 12 måneder';
      if (note) note.textContent = gate;
      set('metric-cagr-note', gate);
      set('metric-ytd-note', gate);
      set('metric-dd-note', gate);
      const gatedWell = document.getElementById('metric-dd-well');
      if (gatedWell) gatedWell.hidden = true;
      return;
    }
    row?.classList.remove('is-gated');
    if (totalLabel) totalLabel.textContent = 'Totalafkast';

    const fund = fundRecord();
    const points = fund.data;
    const first = points[0];
    const last = points.at(-1);
    const total = (last.total / first.total - 1) * 100;
    const annual = cagr(first, last);
    const ytd = indexSeries(periodSlice(points, 'ytd').points).at(-1)?.value ?? null;
    const shown = periodSlice(points, state.period).points;
    const dd = periodDrawdown(shown);
    const years = yearsBetween(first.d, last.d);

    $('#metric-total').textContent = pct(total, true);
    $('#metric-cagr').textContent = annual == null ? 'Under 1 år' : pct(annual, true);
    $('#metric-ytd').textContent = pct(ytd, true);
    $('#metric-dd').textContent = pct(dd.max, true);
    $('#metric-total-note').textContent = `Siden ${fmtDate(first.d)} · efter løbende omkostninger`;
    $('#metric-cagr-note').textContent = annual == null
      ? `Historik ${number.format(years)} år · vises efter ét års data`
      : `${number.format(years)} år siden start`;
    $('#metric-ytd-note').innerHTML = `Fra 1. jan. ${last.d.slice(0, 4)} til <span class="keep">${fmtDate(last.d)}</span>. Delår, afventer <span class="keep">Fundmarket-godkendelse.</span>`;
    $('#metric-dd-note').textContent = `Bund ${fmtDate(dd.trough)} · fra en top i perioden`;
    const well = document.getElementById('metric-dd-well');
    if (well) {
      if (dd.max < -0.05) {
        well.hidden = false;
        const depth = Math.min(100, Math.max(4, Math.round(-dd.max)));
        well.style.setProperty('--dd', depth + '%');
      } else well.hidden = true;
    }
    $('#metric-cagr').classList.toggle('smaller', annual == null);
  }

  function periodDrawdown(points) {
    let peak = points[0].total;
    let max = 0;
    let trough = points[0].d;
    for (const p of points) {
      if (p.total >= peak) peak = p.total;
      const dd = (p.total / peak - 1) * 100;
      if (dd < max) { max = dd; trough = p.d; }
    }
    return { max, trough };
  }

  function niceScale(values) {
    let lower = Math.min(...values);
    let upper = Math.max(...values);
    const span = Math.max(upper - lower, 4);
    const rough = span / 4;
    const power = 10 ** Math.floor(Math.log10(rough));
    const step = [1, 2, 2.5, 5, 10].map(n => n * power).find(n => n >= rough) || power * 10;
    lower = Math.floor((lower - span * 0.06) / step) * step;
    upper = Math.ceil((upper + span * 0.08) / step) * step;
    if (lower === upper) upper = lower + step;
    return { lower, upper, step };
  }

  function renderAkkGate() {
    const fund = fundRecord();
    $('.chart-toolbar').hidden = true;
    $('#chart-container').hidden = true;
    $('#chart-tooltip').hidden = true;
    $('#performance-chart').innerHTML = '';
    $('#chart-readout').textContent = '';
    $('#legend-fund').textContent = state.fund;
    const started = fund?.inception ? fmtDate(fund.inception) : '';
    document.querySelector('.legend')?.classList.add('is-sentence');
    $('#fund-return').innerHTML = 'Ny andelsklasse, kurs vises efter <span class="keep">12 måneder</span>';
    $('#updated').innerHTML = started
      ? `Klassen startede ${started}. Kursen vises efter <span class="keep">12 måneder.</span>`
      : 'Kursen vises efter <span class="keep">12 måneder.</span>';
    $('#source-label').textContent = `${fund?.short || state.fund} · ingen kurs i grafen endnu`;
    $('#chart-context').hidden = true;
    $('#chart-pointe').innerHTML = 'Ny andelsklasse, kurs vises efter <span class="keep">12 måneder.</span> Ingen NAV eller graf før <span class="keep">5. december 2026.</span>';
    $('#chart-loading').hidden = true;
    state.series = [];
    state.geometry = null;
    sendHeight();
  }

  function renderChart() {
    if (!state.ready) return;
    if (isAkk()) { renderAkkGate(); return; }
    document.querySelector('.legend')?.classList.remove('is-sentence');
    $('.chart-toolbar').hidden = false;
    $('#chart-container').hidden = false;
    const fund = fundRecord();
    const sliced = periodSlice(fund.data, state.period);
    state.truncated = sliced.truncated || (state.period !== 'all' && sliced.points.length === fund.data.length);
    state.series = indexSeries(sliced.points);
    const series = state.series;
    const first = series[0];
    const last = series.at(-1);
    const periodReturn = last.value;

    $('#legend-fund').textContent = state.fund;
    $('#fund-return').textContent = pct(periodReturn, true);
    $('#updated').textContent = `Seneste kursdato: ${fmtDate(fund.data.at(-1).d)}`;
    $('#source-label').textContent = `Totalafkast i DKK · ${fund.short}`;

    const context = [];
    if (state.truncated) context.push('Viser den tilgængelige historik i den valgte periode.');
    if (state.period === 'ytd') context.push('År til dato afventer <span class="keep">Fundmarket-godkendelse.</span>');
    $('#chart-context').innerHTML = context.join(' ');
    $('#chart-context').hidden = !context.length;

    const direction = verbFor(periodReturn);
    const keep = (s) => `<span class="keep">${s}</span>`;
    const pointe = periodReturn === 0 || Math.abs(periodReturn) < 0.05
      ? `${state.fund} er ${direction} fra ${keep(fmtDate(first.date))} til ${keep(fmtDate(last.date))}.`
      : `${state.fund} er ${direction} ${pct(Math.abs(periodReturn))} fra ${keep(fmtDate(first.date))} til ${keep(fmtDate(last.date))}.`;
    $('#chart-pointe').innerHTML = pointe;

    const svg = $('#performance-chart');
    const box = $('#chart-container');
    const width = Math.max(300, box.clientWidth || 1000);
    const height = Math.max(220, box.clientHeight || 380);
    const mobile = width < 500;
    const left = mobile ? 40 : width * 0.072;
    const right = mobile ? 68 : width * 0.09;
    const top = 14;
    const bottom = 36;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const { lower, upper, step } = niceScale(series.map(p => p.value));
    const t0 = timestamp(first.date);
    const t1 = timestamp(last.date);
    const x = p => left + (timestamp(p.date) - t0) / Math.max(1, t1 - t0) * plotWidth;
    const y = v => top + (upper - v) / (upper - lower) * plotHeight;
    const plotBottom = height - bottom;
    const yZero = Math.max(top, Math.min(plotBottom, y(0)));
    const deepest = Math.min(...series.map((p) => p.value));
    const belowEnd = Math.max(yZero + 8, y(Math.min(0, deepest)));
    const trough = series.reduce((a, b) => (b.value < a.value ? b : a));
    // Kun et tal, når dalen er høj nok til at læses. Et kort dyk på hele perioden bliver i fyldet.
    const markTrough = trough.value < -0.05 && (y(trough.value) - yZero) >= 22;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const parts = [
      `<title id="svg-title">Totalafkast for ${state.fund}</title>`,
      `<desc id="svg-description">Totalafkast i DKK, indekseret til 0 % den ${fmtDate(first.date)}. Seneste punkt ${fmtDate(last.date)}: ${pct(periodReturn, true)}.${deepest < -0.05 ? ' Feltet under nul er rosa.' : ''}${markTrough ? ` Dybeste punkt under nul er ${pct(trough.value, true)} den ${fmtDate(trough.date)}.` : ''} Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast.</desc>`,
      `<defs><linearGradient id="fund-fill" gradientUnits="userSpaceOnUse" x1="0" y1="${top}" x2="0" y2="${yZero}"><stop offset="0%" stop-color="#9ecfd6" stop-opacity=".22"/><stop offset="100%" stop-color="#9ecfd6" stop-opacity=".05"/></linearGradient><linearGradient id="below-fill" gradientUnits="userSpaceOnUse" x1="0" y1="${yZero}" x2="0" y2="${belowEnd}"><stop offset="0%" stop-color="#e5b3ba" stop-opacity=".45"/><stop offset="100%" stop-color="#e5b3ba" stop-opacity=".92"/></linearGradient><clipPath id="above-zero"><rect x="0" y="0" width="${width}" height="${Math.max(0, yZero)}"/></clipPath><clipPath id="below-zero"><rect x="0" y="${yZero}" width="${width}" height="${Math.max(0, plotBottom - yZero)}"/></clipPath></defs>`
    ];

    for (let tick = lower; tick <= upper + step / 2; tick += step) {
      const pos = y(tick);
      const text = Number.isInteger(tick) ? String(tick) : number.format(tick);
      const zero = Math.abs(tick) < 0.001;
      parts.push(`<line class="axis-grid${zero ? ' zero-line' : ''}" x1="${left}" x2="${width - right}" y1="${pos}" y2="${pos}"/>`);
      parts.push(`<text${zero ? ' class="zero-tick"' : ''} x="${left - 10}" y="${pos + 4}" text-anchor="end" style="font-size:${mobile ? 10 : Math.max(10, width / 78)}px">${text} %</text>`);
    }

    const tickCount = mobile ? 3 : 5;
    for (let i = 0; i < tickCount; i++) {
      const index = Math.round(i * (series.length - 1) / (tickCount - 1));
      const point = series[index];
      const label = axisFormat.format(new Date(timestamp(point.date)));
      const anchor = i === 0 ? 'start' : i === tickCount - 1 ? 'end' : 'middle';
      parts.push(`<text x="${x(point)}" y="${height - 8}" text-anchor="${anchor}" style="font-size:${mobile ? 10 : Math.max(10, width / 80)}px">${escape(label)}</text>`);
    }

    const line = series.map((p, i) => `${i ? 'L' : 'M'}${x(p).toFixed(2)},${y(p.value).toFixed(2)}`).join(' ');
    const area = `${line} L${x(last).toFixed(2)},${yZero.toFixed(2)} L${x(first).toFixed(2)},${yZero.toFixed(2)} Z`;
    parts.push(`<path class="fund-area" d="${area}" fill="url(#fund-fill)" clip-path="url(#above-zero)"/>`);
    parts.push(`<path class="fund-area below" d="${area}" fill="url(#below-fill)" clip-path="url(#below-zero)"/>`);
    parts.push(`<path class="fund-path" d="${line}"/>`);
    if (markTrough) {
      const tx = x(trough);
      const ty = y(trough.value);
      const size = mobile ? 12 : Math.max(11, width / 83);
      parts.push(`<circle class="trough-dot" cx="${tx.toFixed(2)}" cy="${ty.toFixed(2)}" r="3.2"/>`);
      parts.push(`<text class="trough-label" x="${tx.toFixed(2)}" y="${(ty + 20).toFixed(2)}" text-anchor="middle" style="font-size:${size}px">${escape(pct(trough.value, true))}</text>`);
    }
    parts.push(`<text class="end-label ${toneOf(periodReturn)}" x="${width - right + 8}" y="${y(last.value) + 4}" style="font-size:${mobile ? 12 : Math.max(11, width / 83)}px">${pct(periodReturn, true)}</text>`);
    parts.push(`<g id="crosshair-group"><line id="crosshair" class="crosshair" y1="${top}" y2="${height - bottom}"/><circle id="fund-dot" r="3.4" fill="var(--cyan)" stroke="var(--panel)" stroke-width="1.5"/></g>`);
    parts.push(`<rect id="plot-hit" x="${left}" y="0" width="${plotWidth}" height="${height - bottom + 10}" fill="transparent" style="cursor:crosshair"/>`);
    svg.innerHTML = parts.join('');
    placeTroughLabel(svg);

    state.geometry = { x, y, left, plotWidth, width, height, t0, t1 };
    $('#chart-slider').max = String(series.length - 1);
    const index = state.selectedDate ? nearest(series, state.selectedDate) : series.length - 1;
    setPoint(index, false);
    $('#chart-loading').hidden = true;
    sendHeight();
  }

  function placeTroughLabel(svg) {
    const label = svg.querySelector('.trough-label');
    const dot = svg.querySelector('.trough-dot');
    if (!label || !dot) return;
    const vb = svg.viewBox.baseVal;
    const overlaps = (a, b) => a.width > 0 && b.width > 0
      && a.x < b.x + b.width && a.x + a.width > b.x
      && a.y < b.y + b.height && a.y + a.height > b.y;
    const dy = (n) => label.setAttribute('y', (Number(label.getAttribute('y')) + n).toFixed(2));
    let box = label.getBBox();
    const dotY = Number(dot.getAttribute('cy'));
    if (box.y < dotY + 8) dy(dotY + 8 - box.y);
    box = label.getBBox();
    const grids = [...svg.querySelectorAll('.axis-grid')].map((line) => Number(line.getAttribute('y1')));
    for (const gy of grids) {
      if (gy > box.y - 1 && gy < box.y + box.height + 1) dy(gy + 3 - box.y);
    }
    box = label.getBBox();
    if (box.y + box.height > vb.height - 2) dy(vb.height - 2 - (box.y + box.height));
    box = label.getBBox();
    const others = [...svg.querySelectorAll('text')].filter((n) => n !== label).map((n) => n.getBBox());
    if (others.some((b) => overlaps(box, b)) || box.x < 1 || box.x + box.width > vb.width - 1 || box.y < 1 || box.y + box.height > vb.height - 1) {
      label.remove();
    }
  }

  function setPoint(index, showTooltip) {
    const p = state.series[index];
    if (!p || !state.geometry) return;
    const { x, y, width, height } = state.geometry;
    $('#crosshair').setAttribute('x1', x(p));
    $('#crosshair').setAttribute('x2', x(p));
    $('#fund-dot').setAttribute('cx', x(p));
    $('#fund-dot').setAttribute('cy', y(p.value));
    $('#fund-dot').setAttribute('fill', toneOf(p.value) === 'neg' ? 'var(--neg-ink)' : 'var(--cyan)');
    $('#chart-slider').value = String(index);
    const value = pct(p.value, true);
    const tone = toneOf(p.value);
    $('#chart-readout').innerHTML = `<span class="date">${fmtDate(p.date)}</span> · ${state.fund}: <span class="${tone}">${value}</span>`;
    $('#chart-slider').setAttribute('aria-valuetext', `${fmtDate(p.date)}, ${state.fund}: ${value}`);
    const tooltip = $('#chart-tooltip');
    tooltip.hidden = !showTooltip;
    if (showTooltip) {
      tooltip.innerHTML = `<b>${fmtDate(p.date)}</b><div class="tooltip-row ${tone}"><span>${state.fund}</span><strong>${value}</strong></div>`;
      const tooltipWidth = tooltip.offsetWidth || 180;
      const end = $('.end-label');
      const gutter = end ? Math.max(0, end.getBBox().x - 8) : width;
      let left = x(p) + 14;
      if (left + tooltipWidth > gutter) left = gutter - tooltipWidth;
      if (left < 0) left = Math.max(0, x(p) - tooltipWidth - 14);
      left = Math.min(Math.max(0, left), Math.max(0, width - tooltipWidth));
      tooltip.style.left = left + 'px';
      tooltip.style.top = Math.max(5, Math.min(y(p.value) - 72, height - 90)) + 'px';
      if (end) {
        const tipBox = tooltip.getBoundingClientRect();
        const endBox = end.getBoundingClientRect();
        const overlapX = tipBox.right - endBox.left;
        const overlapY = Math.min(tipBox.bottom, endBox.bottom) - Math.max(tipBox.top, endBox.top);
        if (overlapX > -8 && overlapY > 0) {
          tooltip.style.left = Math.max(0, left - overlapX - 8) + 'px';
        }
      }
    }
  }

  function pointFromPointer(event) {
    if (!state.ready || !state.geometry) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const { width, left, plotWidth, t0, t1 } = state.geometry;
    const cx = (event.clientX - rect.left) / rect.width * width;
    const fraction = Math.max(0, Math.min(1, (cx - left) / plotWidth));
    return nearest(state.series, t0 + fraction * (t1 - t0));
  }

  function update() {
    updateChrome();
    if (!state.ready) {
      sendHeight();
      return;
    }
    syncURL();
    updateMetrics();
    renderChart();
  }

  function selectFund(fund) {
    if (!FUNDS[fund] || fund === state.fund) return;
    state.fund = fund;
    state.selectedDate = null;
    paintSri();
    update();
  }

  function selectPeriod(period) {
    if (!PERIODS[period] || period === state.period) return;
    state.period = period;
    state.selectedDate = null;
    update();
  }

  function showError(message) {
    const el = $('#chart-loading');
    el.hidden = false;
    el.classList.add('error');
    el.innerHTML = `<div><p>${escape(message)}</p><button type="button" class="outline-button" id="retry-chart">Prøv igen</button></div>`;
    $('#retry-chart').addEventListener('click', () => {
      el.classList.remove('error');
      el.textContent = 'Henter data…';
      start();
    });
    sendHeight();
  }

  $('#performance-chart').addEventListener('pointermove', event => {
    const index = pointFromPointer(event);
    if (index !== undefined) setPoint(index, true);
  });
  $('#performance-chart').addEventListener('pointerdown', event => {
    const index = pointFromPointer(event);
    if (index === undefined) return;
    state.selectedDate = state.series[index].date;
    setPoint(index, true);
  });
  $('#performance-chart').addEventListener('pointerleave', () => {
    if (state.ready) setPoint(state.selectedDate ? nearest(state.series, state.selectedDate) : state.series.length - 1, false);
  });
  $('#performance-chart').addEventListener('keydown', event => {
    if (!state.ready || !state.series.length) return;
    const keys = { ArrowLeft: -1, ArrowRight: 1, Home: 'start', End: 'end' };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const current = state.selectedDate ? nearest(state.series, state.selectedDate) : state.series.length - 1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? state.series.length - 1 : current + keys[event.key];
    const index = Math.max(0, Math.min(state.series.length - 1, next));
    state.selectedDate = state.series[index].date;
    setPoint(index, true);
  });

  $('#chart-slider').addEventListener('input', event => {
    const i = Number(event.target.value);
    state.selectedDate = state.series[i].date;
    setPoint(i, true);
  });
  $('#chart-slider').addEventListener('blur', () => { $('#chart-tooltip').hidden = true; });

  document.addEventListener('click', event => {
    const fund = event.target.closest('[data-fund]');
    const period = event.target.closest('[data-period]');
    if (fund) selectFund(fund.dataset.fund);
    if (period) selectPeriod(period.dataset.period);
  });

  $('#share-chart')?.addEventListener('click', async () => {
    const note = $('#share-note');
    const pointe = $('#chart-pointe')?.textContent?.trim() || `${state.fund}, totalafkast.`;
    const text = `${pointe} ${location.href}\nHistorisk afkast er ikke en pålidelig indikator for fremtidigt afkast.`;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-999px';
      document.body.append(ta);
      ta.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
    }
    if (note) {
      note.hidden = false;
      note.textContent = ok ? 'Teksten er kopieret.' : text;
    }
    sendHeight();
  });

  function paintSri() {
    const line = $('#sri-line');
    const priip = state.meta?.funds?.[FUNDS[state.fund]]?.priip;
    if (!line || !priip) return;
    line.hidden = false;
    line.innerHTML = `Risikoindikator (SRI) ${priip.risk_class} af ${priip.risk_scale_max} ifølge KID. Gælder fonden som helhed. <a href="${escape(priip.url)}">Læs KID ↗</a>`;
  }

  document.addEventListener('keydown', event => {
    const tab = event.target.closest('[data-period]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const keys = Object.keys(PERIODS);
      let i = keys.indexOf(state.period);
      i = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + keys.length) % keys.length;
      selectPeriod(keys[i]);
      $(`[data-period="${keys[i]}"]`).focus();
      return;
    }
    const radio = event.target.closest('[data-fund]');
    if (radio && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      const next = state.fund === 'PMINDI' ? 'PMINDIAKK' : 'PMINDI';
      selectFund(next);
      $(`[data-fund="${next}"]`).focus();
    }
  });

  window.addEventListener('popstate', () => {
    const p = new URLSearchParams(location.search);
    const fund = (p.get('klasse') || 'PMINDI').toUpperCase();
    const period = (p.get('periode') || 'all').toLowerCase();
    state.fund = FUNDS[fund] ? fund : 'PMINDI';
    state.period = PERIODS[period] ? period : 'all';
    state.selectedDate = null;
    update();
  });

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        renderChart();
        sendHeight();
      });
    }).observe($('#chart-container'));
    new ResizeObserver(sendHeight).observe(document.body);
  } else {
    window.addEventListener('resize', () => { renderChart(); sendHeight(); });
  }

  window.addEventListener('message', event => {
    if (event.data?.type === 'ndi-embed-measure') sendHeight();
  });

  async function start() {
    updateChrome();
    sendHeight();
    try {
      const response = await fetch(new URL('../data/portfolio.json', location.href), { cache: 'no-store' });
      if (!response.ok) throw new Error('Grafdata kunne ikke indlæses.');
      payload = await response.json();
      if (!payload?.funds?.length) throw new Error('Datasættet er tomt.');
      const pmindi = payload.funds.find((f) => f.id === 'pmindi' || f.short === 'PMINDI');
      if (!pmindi || lacksReturns(pmindi)) throw new Error('Afkastserien er ufuldstændig.');
      state.ready = true;
      try {
        const metaRes = await fetch(new URL('../data/fund-meta.json', location.href), { cache: 'no-store' });
        if (metaRes.ok) state.meta = await metaRes.json();
      } catch { /* SRI-linjen er ekstra */ }
      paintSri();
      update();
      if (document.fonts?.ready) document.fonts.ready.then(() => { renderChart(); sendHeight(); });
    } catch (error) {
      showError(error.message || 'Grafdata kunne ikke indlæses.');
    }
  }

  start();
})();
