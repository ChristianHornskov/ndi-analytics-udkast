/* Graf-review punkt 44: fast skriftstørrelse i udlodningsgrafen. */
(function () {
  'use strict';
  function kør() {
    var svg = document.querySelector('#analysis-distributions svg');
    if (!svg || !svg.getClientRects().length) return;
    var vb = (svg.getAttribute('viewBox') || '').split(/\s+/).map(Number);
    var vist = svg.getBoundingClientRect().width;
    if (vb.length !== 4 || !vb[2] || !vist) return;
    var faktor = Math.max(0.55, Math.min(1, vb[2] / vist));
    svg.querySelectorAll('text').forEach(function (t) {
      var orig = t.getAttribute('data-cr44-fs');
      if (orig == null) {
        orig = t.getAttribute('font-size') || '14';
        t.setAttribute('data-cr44-fs', orig);
      }
      var ny = (parseFloat(orig) * faktor).toFixed(2);
      if (t.getAttribute('font-size') !== ny) t.setAttribute('font-size', ny);
    });
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    requestAnimationFrame(function () { venter = false; kør(); });
  }
  function start() {
    kør();
    new MutationObserver(function (liste) {
      if (liste.some(function (m) { return m.type === 'childList'; })) plan();
    }).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', plan);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
