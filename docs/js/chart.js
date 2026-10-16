/** SVG performance chart - Jesper-inspired */
import { toPercentSeries, fmtPct, fmtDate } from './data.js';

export function renderChart(container, rows, events = [], opts = {}) {
  let series = toPercentSeries(rows);
  if (opts.basis === 'price' && rows.length && rows[0].price) {
    const b0 = rows[0].price;
    series = series.map((s) => ({ ...s, v: ((s.price / b0) - 1) * 100 }));
  }
  container.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'chart-inner';
  container.appendChild(wrap);

  if (series.length < 2) {
    wrap.innerHTML = '<p class="chart-readout">Ingen data for perioden.</p>';
    return;
  }
  // Mobil: viewBox = faktisk pixelbredde, så aksetekst er ≥ 11 px og grafen ≥ 220 px høj
  const cw = container.clientWidth || 1000;
  const narrow = cw < 700;
  const W = narrow ? Math.max(300, Math.round(cw)) : 1000;
  const H = narrow ? 240 : 410;
  const pad = narrow ? { l: 44, r: (opts.compare ? 108 : 12), t: 16, b: 30 } : { l: 52, r: (opts.compare ? 150 : 24), t: 20, b: 36 };
  // Valgfri sammenligningslinje (Nasdaq-100), rebaseret til periodens første fondsdato
  let cmp = null;
  if (Array.isArray(opts.compare) && opts.compare.length) {
    const m = new Map(opts.compare.map(([d, v]) => [d, v]));
    let base = null, last = null;
    cmp = series.map((s) => { const v = m.get(s.d); if (v != null) last = v; if (base == null && last != null) base = last; return base ? ((last / base) - 1) * 100 : null; });
    if (cmp.filter((v) => v != null).length < 2) cmp = null;
  }
  const vs = series.map((s) => s.v).concat(cmp ? cmp.filter((v) => v != null) : []);
  let min = Math.min(0, ...vs), max = Math.max(0, ...vs);
  const span = max - min || 1;
  min -= span * 0.06; max += span * 0.06;
  const x = (i) => pad.l + (i / (series.length - 1)) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const path = series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(s.v).toFixed(1)}`).join(' ');
  const zeroY = y(0);
  const cmpPath = cmp ? cmp.map((v, i) => v == null ? '' : `${i && cmp[i - 1] != null ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ') : '';

  const evMap = new Map((events || []).map((e) => [e.d, e]));
  const yTicks = narrow ? 4 : 5;
  let grid = '';
  for (let t = 0; t <= yTicks; t++) {
    const v = min + ((max - min) * t) / yTicks;
    const yy = y(v);
    grid += `<line class="axis" x1="${pad.l}" x2="${W - pad.r}" y1="${yy}" y2="${yy}"/>`;
    grid += `<text x="${pad.l - 8}" y="${yy + 4}" text-anchor="end">${fmtPct(v, 0)}</text>`;
  }
  const xLabels = [0, Math.floor((series.length - 1) / 2), series.length - 1].map((i) =>
    `<text x="${x(i)}" y="${H - 10}" text-anchor="middle">${fmtDate(series[i].d)}</text>`
  ).join('');

  // Map events onto nearest trading day when exact date missing (weekends / holidays)
  const dateIdx = new Map(series.map((s, i) => [s.d, i]));
  const placed = new Map();
  for (const e of (events || [])) {
    let i = dateIdx.get(e.d);
    if (i == null) {
      // nearest prior trading day within 5 calendar days
      for (let back = 1; back <= 5 && i == null; back++) {
        const d = new Date(e.d + 'T12:00:00Z');
        d.setUTCDate(d.getUTCDate() - back);
        i = dateIdx.get(d.toISOString().slice(0, 10));
      }
    }
    if (i == null) continue;
    const prev = placed.get(i);
    // Prefer non-x markers on same day; else keep first
    if (e.kind === 'div') { placed.set('div' + i, { ...e, _i: i }); continue; }
    if (prev && prev.kind !== 'x' && e.kind === 'x') continue;
    if (!prev || (prev.kind === 'x' && e.kind !== 'x')) placed.set(i, e);
  }
  const marks = [...placed.entries()].map(([k, e]) => {
    const i = e._i != null ? e._i : k;
    const s = series[i];
    if (e.kind === 'div') {
      const tipD = (e.title || '').replace(/"/g, '&quot;');
      return `<g class="evt-div"><line x1="${x(i)}" x2="${x(i)}" y1="${pad.t}" y2="${H - pad.b}"/><text x="${x(i)}" y="${pad.t + 12}" text-anchor="middle">U</text><title>${tipD}</title></g>`;
    }
    const cls = e.kind === 'x' ? 'evt-x' : (e.kind === 'peak' ? 'evt-peak' : 'evt-dip');
    const title = (e.title || '').replace(/"/g, '&quot;');
    const tip = `${title}${e.text ? ' — ' + String(e.text).slice(0, 80).replace(/"/g, '&quot;') : ''}`;
    if (e.kind === 'x' && e.url) {
      const href = String(e.url).replace(/"/g, '&quot;');
      return `<a href="${href}" target="_blank" rel="noopener"><circle class="${cls}" cx="${x(i)}" cy="${y(s.v)}" r="5.5"><title>${tip}</title></circle></a>`;
    }
    return `<circle class="${cls}" cx="${x(i)}" cy="${y(s.v)}" r="5"><title>${tip}</title></circle>`;
  }).join('');

  // Slutlabels på hver linje (kun når sammenligning vises)
  let endLabels = '';
  if (cmp) {
    const li = series.length - 1;
    const yf = y(series[li].v);
    let ci = li; while (ci > 0 && cmp[ci] == null) ci--;
    let yc = y(cmp[ci]);
    if (Math.abs(yc - yf) < 16) yc = yf + (yc >= yf ? 16 : -16);
    const lx = x(li) + 6;
    endLabels = `<text class="end-fund" x="${lx}" y="${yf + 4}">Fonden ${fmtPct(series[li].v)}</text>` +
      `<text class="end-cmp" x="${lx}" y="${yc + 4}">${narrow ? 'Nasdaq' : (opts.compareName || 'Nasdaq-100')} ${fmtPct(cmp[ci])}</text>`;
  }
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', opts.label || 'Afkastgraf');
  svg.innerHTML = `${grid}<line class="zero" x1="${pad.l}" x2="${W - pad.r}" y1="${zeroY}" y2="${zeroY}"/>` +
    (cmpPath ? `<path class="cmp" d="${cmpPath}"/>` : '') + `<path class="fund" d="${path}"/>` + endLabels + `${marks}${xLabels}`;
  wrap.appendChild(svg);

  const readout = document.createElement('p');
  readout.className = 'chart-readout';
  const last = series[series.length - 1];
  const cmpTxt = (i) => (cmp && cmp[i] != null) ? ` · ${opts.compareName || 'Sammenligning'} ${fmtPct(cmp[i])}` : '';
  readout.textContent = `${fmtDate(last.d)}: Fonden ${fmtPct(last.v)} siden periodens start${cmpTxt(series.length - 1)}`;
  wrap.appendChild(readout);
  if (cmp) {
    const lg = document.createElement('p');
    lg.className = 'chart-legend';
    lg.innerHTML = '<span class="lg-fund"></span> Fonden (' + (opts.basis === 'price' ? 'kurs uden udbytte' : 'totalafkast') + ', DKK) <span class="lg-cmp"></span> Nasdaq-100 (kursindeks uden udbytte, omregnet til DKK)';
    wrap.insertBefore(lg, svg);
  }

  // Tooltip: mus, berøring og piletaster (graf-v2-paritet)
  svg.setAttribute('tabindex', '0');
  let cur = series.length - 1;
  const cursor = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  cursor.setAttribute('class', 'cursor'); cursor.setAttribute('y1', pad.t); cursor.setAttribute('y2', H - pad.b); cursor.style.display = 'none';
  svg.appendChild(cursor);
  const show = (i) => {
    if (i < 0 || i >= series.length) return;
    cur = i; cursor.style.display = ''; cursor.setAttribute('x1', x(i)); cursor.setAttribute('x2', x(i));
    readAt(i);
  };
  svg.addEventListener('keydown', (ev) => {
    const step = ev.shiftKey ? 20 : 1;
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); show(Math.max(0, cur - step)); }
    else if (ev.key === 'ArrowRight') { ev.preventDefault(); show(Math.min(series.length - 1, cur + step)); }
    else if (ev.key === 'Home') { ev.preventDefault(); show(0); }
    else if (ev.key === 'End') { ev.preventDefault(); show(series.length - 1); }
  });
  svg.addEventListener('touchmove', (ev) => { const t = ev.touches[0]; if (t) pick(t.clientX); }, { passive: true });
  function pick(clientX) {
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    show(Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (series.length - 1)));
  }
  svg.addEventListener('mousemove', (ev) => pick(ev.clientX));
  function readAt(i) {
    const s = series[i];
    const e = placed.get(i) || placed.get('div' + i) || evMap.get(s.d);
    let extra = '';
    if (e) {
      extra = ` · ${e.title}`;
      if (e.kind === 'x' && e.url) extra += ' (klik markør → X)';
    }
    readout.textContent = `${fmtDate(s.d)}: Fonden ${fmtPct(s.v)}${cmpTxt(i)}` + extra;
  }
}
