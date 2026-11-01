/* Graf-review punkt 3: aksen følger data, og slutetiketterne følger kurverne.
   drawNasdaq ligger i en lukket funktion i widget/homepage-patch.js. Den kalder den
   globale niceScale med (afkast + [0], false), og det kald genkendes her. */
(function () {
  'use strict';
  if (typeof window.niceScale !== 'function' || window.niceScale.__cr3) return;
  var origSkala = window.niceScale;
  function fraNasdaq(values, zero) {
    if (zero || !Array.isArray(values) || values.length < 3 || values[values.length - 1] !== 0) return false;
    var stak = '';
    try { stak = String(new Error().stack || ''); } catch (e) { return false; }
    return stak.indexOf('homepage-patch.js') !== -1;
  }
  var nySkala = function (values, zero) {
    if (fraNasdaq(values, zero)) {
      var tal = values.filter(function (v) { return Number.isFinite(v); });
      var lo = Math.min.apply(null, tal), hi = Math.max.apply(null, tal);
      var luft = (hi - lo || 1) * 0.06;
      return origSkala(tal.concat([lo < 0 ? lo - luft : 0, hi > 0 ? hi + luft : 0]), true);
    }
    return origSkala.apply(this, arguments);
  };
  nySkala.__cr3 = true;
  window.niceScale = nySkala;
  function etiketter() {
    var box = document.getElementById('growth');
    var svg = box && box.querySelector('svg');
    if (!svg) return;
    var tekster = Array.prototype.slice.call(svg.querySelectorAll('text[font-weight="700"]'));
    if (tekster.length !== 2) return;
    var x = tekster[0].getAttribute('x');
    var linjer = Array.prototype.slice.call(svg.querySelectorAll('line')).filter(function (l) {
      return Math.abs(parseFloat(l.getAttribute('x2')) - (parseFloat(x) - 3)) < 0.01 && !l.classList.contains('growth-cursor');
    });
    if (linjer.length !== 2) return;
    var par = tekster.map(function (t) {
      var farve = t.getAttribute('fill');
      var l = linjer.filter(function (k) { return k.getAttribute('stroke') === farve; })[0];
      return { t: t, l: l, y: l ? parseFloat(l.getAttribute('y1')) : NaN };
    });
    if (par.some(function (p) { return !p.l || !Number.isFinite(p.y); })) return;
    par.sort(function (a, b) { return a.y - b.y; });
    var y0 = par[0].y, y1 = par[1].y;
    if (y1 - y0 < 24) {
      var midt = (y0 + y1) / 2;
      y0 = midt - 12;
      y1 = midt + 12;
    }
    var vb = (svg.getAttribute('viewBox') || '0 0 0 0').split(/\s+/).map(Number);
    if (y0 < 12) { y1 += 12 - y0; y0 = 12; }
    if (vb[3] && y1 > vb[3] - 50) { y0 -= y1 - (vb[3] - 50); y1 = vb[3] - 50; }
    [[par[0], y0], [par[1], y1]].forEach(function (pp) {
      pp[0].l.setAttribute('y2', pp[1]);
      pp[0].t.setAttribute('y', pp[1] + 5);
    });
  }
  function start() {
    var box = document.getElementById('growth');
    if (!box) return;
    new MutationObserver(function () { try { etiketter(); } catch (e) { /* som før */ } }).observe(box, { childList: true });
    if (typeof window.drawProductionGrowth === 'function') {
      try { window.drawProductionGrowth(); } catch (e) { /* tegnes ved næste valg */ }
    }
    try { etiketter(); } catch (e) { /* som før */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
