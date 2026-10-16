/** SVG performance chart - Jesper-inspired */
import { toPercentSeries, fmtPct, fmtDate } from './data.js';

export function renderChart(container, rows, events = [], opts = {}) {
  const series = toPercentSeries(rows);
  container.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'chart-inner';
  container.appendChild(wrap);

  if (series.length < 2) {
    wrap.innerHTML = '<p class="chart-readout">Ingen data for perioden.</p>';
    return;
  }
  const W = 1000, H = 410, pad = { l: 52, r: 24, t: 20, b: 36 };
  const vs = series.map((s) => s.v);
  let min = Math.min(0, ...vs), max = Math.max(0, ...vs);
  const span = max - min || 1;
  min -= span * 0.06; max += span * 0.06;
  const x = (i) => pad.l + (i / (series.length - 1)) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const path = series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(s.v).toFixed(1)}`).join(' ');
  const zeroY = y(0);

  const evMap = new Map((events || []).map((e) => [e.d, e]));
  const yTicks = 5;
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
    if (prev && prev.kind !== 'x' && e.kind === 'x') continue;
    if (!prev || (prev.kind === 'x' && e.kind !== 'x')) placed.set(i, e);
  }
  const marks = [...placed.entries()].map(([i, e]) => {
    const s = series[i];
    const cls = e.kind === 'x' ? 'evt-x' : (e.kind === 'peak' ? 'evt-peak' : 'evt-dip');
    const title = (e.title || '').replace(/"/g, '&quot;');
    const tip = `${title}${e.text ? ' — ' + String(e.text).slice(0, 80).replace(/"/g, '&quot;') : ''}`;
    if (e.kind === 'x' && e.url) {
      const href = String(e.url).replace(/"/g, '&quot;');
      return `<a href="${href}" target="_blank" rel="noopener"><circle class="${cls}" cx="${x(i)}" cy="${y(s.v)}" r="5.5"><title>${tip}</title></circle></a>`;
    }
    return `<circle class="${cls}" cx="${x(i)}" cy="${y(s.v)}" r="5"><title>${tip}</title></circle>`;
  }).join('');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', opts.label || 'Afkastgraf');
  svg.innerHTML = `${grid}<line class="zero" x1="${pad.l}" x2="${W - pad.r}" y1="${zeroY}" y2="${zeroY}"/>` +
    `<path class="fund" d="${path}"/>${marks}${xLabels}`;
  wrap.appendChild(svg);

  const readout = document.createElement('p');
  readout.className = 'chart-readout';
  const last = series[series.length - 1];
  readout.textContent = `${fmtDate(last.d)}: ${fmtPct(last.v)} siden periodens start`;
  wrap.appendChild(readout);

  svg.addEventListener('mousemove', (ev) => {
    const rect = svg.getBoundingClientRect();
    const px = ((ev.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (series.length - 1));
    if (i < 0 || i >= series.length) return;
    const s = series[i];
    const e = placed.get(i) || evMap.get(s.d);
    let extra = '';
    if (e) {
      extra = ` · ${e.title}`;
      if (e.kind === 'x' && e.url) extra += ' (klik markør → X)';
    }
    readout.textContent = `${fmtDate(s.d)}: ${fmtPct(s.v)}` + extra;
  });
}
