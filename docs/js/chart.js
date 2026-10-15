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

  const marks = series.map((s, i) => {
    const e = evMap.get(s.d);
    if (!e) return '';
    const cls = e.kind === 'peak' ? 'evt-peak' : 'evt-dip';
    return `<circle class="${cls}" cx="${x(i)}" cy="${y(s.v)}" r="5"><title>${e.title}</title></circle>`;
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
    const e = evMap.get(s.d);
    readout.textContent = `${fmtDate(s.d)}: ${fmtPct(s.v)}` + (e ? ` · ${e.title}` : '');
  });
}
