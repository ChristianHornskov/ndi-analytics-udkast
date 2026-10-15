// SVG-graf: totalafkast (indekseret til 0 % ved periodens start) eller kurs i DKK.
import { slice, ts, fmtDate, pct, num, esc } from './data.js';

const axisFmt = new Intl.DateTimeFormat('da-DK', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const dayFmt = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export class PerfChart {
  constructor(box, opts = {}) {
    this.box = box;
    this.opts = { events: [], showEvents: true, label: 'Fonden', onEvent: null, onPoint: null, compact: false, ...opts };
    box.innerHTML = `<svg role="img" aria-labelledby="${box.id}-t ${box.id}-d"></svg>
      <div class="tooltip" hidden></div>
      <div class="chart-loading" aria-live="polite">Henter data…</div>`;
    this.svg = box.querySelector('svg');
    this.tip = box.querySelector('.tooltip');
    this.slider = document.createElement('input');
    Object.assign(this.slider, { type: 'range', min: 0, className: 'chart-slider' });
    this.slider.setAttribute('aria-label', 'Gå gennem datapunkter med piletasterne');
    box.after(this.slider);
    this.svg.addEventListener('pointermove', e => this.#pointer(e, true));
    this.svg.addEventListener('pointerdown', e => this.#pointer(e, true));
    this.svg.addEventListener('pointerleave', () => { this.tip.hidden = true; this.#set(this.pts.length - 1, false); });
    this.slider.addEventListener('input', () => this.#set(+this.slider.value, true));
    this.slider.addEventListener('blur', () => { this.tip.hidden = true; });
    this.svg.addEventListener('click', e => {
      const g = e.target.closest('.ev'); if (g) this.#activate(g.dataset.i);
    });
    this.svg.addEventListener('keydown', e => {
      const g = e.target.closest('.ev');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.#activate(g.dataset.i); }
    });
    if (typeof ResizeObserver !== 'undefined') {
      let raf; new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => this.state && this.render()); }).observe(box);
    }
  }

  update(state) { this.state = state; this.render(); }

  render() {
    const { fund, period, mode } = this.state;
    const all = fund.data.map(p => ({ d: p.d, total: p.total, price: p.price }));
    const { pts, complete } = slice(all, period);
    this.complete = complete;
    const base = pts[0];
    const isPrice = mode === 'price';
    this.pts = pts.map(p => ({ d: p.d, v: isPrice ? p.price : (p.total / base.total - 1) * 100 }));
    const W = Math.max(300, this.box.clientWidth || 900), H = Math.max(200, this.box.clientHeight || 380);
    const mobile = W < 520;
    const L = mobile ? 40 : 56, R = mobile ? 56 : 74, T = 22, B = 30;
    const pw = W - L - R, ph = H - T - B;
    const vals = this.pts.map(p => p.v);
    let lo = Math.min(...vals), hi = Math.max(...vals);
    if (!isPrice) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    const span = Math.max(hi - lo, isPrice ? 2 : 4);
    const rough = span / 4, pow = 10 ** Math.floor(Math.log10(rough));
    const step = [1, 2, 2.5, 5, 10].map(n => n * pow).find(n => n >= rough) || pow * 10;
    lo = Math.floor((lo - span * 0.04) / step) * step;
    hi = Math.ceil((hi + span * 0.08) / step) * step;
    const t0 = ts(this.pts[0].d), t1 = ts(this.pts.at(-1).d);
    const x = d => L + (ts(d) - t0) / Math.max(1, t1 - t0) * pw;
    const y = v => T + (hi - v) / (hi - lo) * ph;
    this.geo = { x, y, L, pw, W, H, t0, t1, T, B };
    const fmtV = v => isPrice ? num(v, 2) + ' kr.' : pct(v / 100);
    this.fmtV = fmtV;
    const p = [];
    const first = this.pts[0], last = this.pts.at(-1);
    p.push(`<title id="${this.box.id}-t">${isPrice ? 'Kurs' : 'Totalafkast'} for ${esc(fund.short)}</title>
      <desc id="${this.box.id}-d">${isPrice ? 'Kurs i DKK' : 'Totalafkast inkl. udbytte, efter omkostninger, i DKK'} fra ${fmtDate(first.d)} til ${fmtDate(last.d)}: ${fmtV(last.v)}. Brug skyderen efter grafen til at læse hvert datapunkt.</desc>
      <defs><linearGradient id="ndiArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9ecfd6" stop-opacity=".22"/><stop offset="1" stop-color="#9ecfd6" stop-opacity="0"/></linearGradient></defs>`);
    for (let v = lo; v <= hi + step / 2; v += step) {
      const yy = y(v).toFixed(1);
      const lab = isPrice ? num(v, step < 1 ? 1 : 0).replace(/,0$/, '') : `${Math.round(v * 10) / 10} %`.replace('.', ',');
      p.push(`<line class="grid ${!isPrice && Math.abs(v) < 1e-9 ? 'zero' : ''}" x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}"/><text x="${L - 8}" y="${+yy + 4}" text-anchor="end">${lab}</text>`);
    }
    const nt = mobile ? 3 : 5;
    const short = ['1m', '3m'].includes(period);
    for (let i = 0; i < nt; i++) {
      const pt = this.pts[Math.round(i * (this.pts.length - 1) / (nt - 1))];
      p.push(`<text x="${x(pt.d).toFixed(1)}" y="${H - 8}" text-anchor="${i === 0 ? 'start' : i === nt - 1 ? 'end' : 'middle'}">${esc((short ? dayFmt : axisFmt).format(new Date(ts(pt.d))))}</text>`);
    }
    const line = this.pts.map((q, i) => `${i ? 'L' : 'M'}${x(q.d).toFixed(1)},${y(q.v).toFixed(1)}`).join('');
    const baseY = isPrice ? y(lo) : y(0);
    p.push(`<path class="area" d="${line}L${x(last.d).toFixed(1)},${baseY.toFixed(1)}L${x(first.d).toFixed(1)},${baseY.toFixed(1)}Z"/>`);
    p.push(`<path class="line" d="${line}"/>`);
    p.push(`<text x="${W - R + 8}" y="${y(last.v) + 4}" style="fill:#9ecfd6;font-weight:700">${esc(fmtV(last.v))}</text>`);
    // Kontekst-markører (toppe og dyk)
    this.evs = [];
    if (this.opts.showEvents && this.state.showEvents !== false) {
      const evs = (this.opts.events || []).filter(e => ts(e.d) >= t0 && ts(e.d) <= t1 && (!e.fund || e.fund === fund.id));
      evs.forEach((e, i) => {
        const near = this.pts.reduce((b, q) => Math.abs(ts(q.d) - ts(e.d)) < Math.abs(ts(b.d) - ts(e.d)) ? q : b, this.pts[0]);
        const ex = x(near.d), ey = y(near.v);
        const peak = e.kind === 'peak';
        const my = peak ? Math.max(T + 2, ey - 22) : Math.min(H - B - 4, ey + 22);
        const mark = peak
          ? `<rect class="ev-mark" x="${ex - 5}" y="${my - 5}" width="10" height="10" transform="rotate(45 ${ex} ${my})"/>`
          : `<circle class="ev-mark" cx="${ex}" cy="${my}" r="5.5"/>`;
        this.evs.push({ ...e, near });
        p.push(`<g class="ev ${peak ? 'peak' : 'dip'}" data-i="${i}" tabindex="0" role="button" aria-label="${peak ? 'Top' : 'Dyk'} ${fmtDate(e.d)}: ${esc(e.title)}">
          <line class="ev-stem" x1="${ex}" x2="${ex}" y1="${ey}" y2="${my}"/>${mark}<circle class="ev-hit" cx="${ex}" cy="${my}" r="14"/></g>`);
      });
    }
    p.push(`<line class="cross" id="${this.box.id}-x" y1="${T}" y2="${H - B}"/><circle id="${this.box.id}-dot" r="4" fill="#9ecfd6" stroke="#11252c" stroke-width="2"/>`);
    this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    this.svg.innerHTML = p.join('');
    this.cross = this.svg.querySelector(`#${this.box.id}-x`);
    this.dot = this.svg.querySelector(`#${this.box.id}-dot`);
    this.slider.max = this.pts.length - 1;
    this.#set(this.pts.length - 1, false);
    this.box.querySelector('.chart-loading').hidden = true;
    this.opts.onRender?.({ first, last, value: last.v, complete, isPrice, fmtV, events: this.evs });
  }

  #pointer(e, show) {
    if (!this.geo || e.target.closest('.ev')) return;
    const r = this.svg.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width * this.geo.W;
    const f = Math.max(0, Math.min(1, (cx - this.geo.L) / this.geo.pw));
    const t = this.geo.t0 + f * (this.geo.t1 - this.geo.t0);
    let lo = 0, hi = this.pts.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (ts(this.pts[m].d) < t) lo = m; else hi = m; }
    const i = Math.abs(ts(this.pts[lo].d) - t) < Math.abs(ts(this.pts[hi].d) - t) ? lo : hi;
    this.#set(i, show);
  }

  #set(i, show) {
    const q = this.pts[i]; if (!q) return;
    const { x, y, W, H } = this.geo;
    const px = x(q.d), py = y(q.v);
    this.cross.setAttribute('x1', px); this.cross.setAttribute('x2', px);
    this.dot.setAttribute('cx', px); this.dot.setAttribute('cy', py);
    this.slider.value = i;
    const txt = `${fmtDate(q.d)} · ${this.state.fund.short}: ${this.fmtV(q.v)}`;
    this.slider.setAttribute('aria-valuetext', txt);
    this.opts.onPoint?.(q, this.fmtV(q.v));
    this.tip.hidden = !show;
    if (show) {
      this.tip.innerHTML = `<b>${fmtDate(q.d)}</b><div class="row"><span>${esc(this.state.fund.short)}</span><strong>${esc(this.fmtV(q.v))}</strong></div>`;
      const bw = this.box.clientWidth, sx = bw / W;
      const tw = this.tip.offsetWidth || 170;
      let left = px * sx + 14; if (left + tw > bw) left = px * sx - tw - 14;
      this.tip.style.left = Math.max(0, left) + 'px';
      this.tip.style.top = Math.max(0, Math.min(py * (this.box.clientHeight / H) - 70, this.box.clientHeight - 70)) + 'px';
    }
  }

  #activate(i) {
    const e = this.evs[+i]; if (!e) return;
    this.svg.querySelectorAll('.ev').forEach(g => g.classList.toggle('active', g.dataset.i === String(i)));
    this.opts.onEvent?.(e);
  }
}
