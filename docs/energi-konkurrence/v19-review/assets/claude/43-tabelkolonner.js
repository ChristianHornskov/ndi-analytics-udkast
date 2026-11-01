/* Graf-review punkt 43: marker kolonner, der kan skjules på mellemstore skærme. */
(function () {
  'use strict';
  var KOL = { 'Markedskurs': 'cr43-kurs', 'Sektor': 'cr43-sektor', '1 uge': 'cr43-uge', '1 dag': 'cr43-dag' };
  function kør() {
    var body = document.getElementById('holdings');
    var tabel = body && body.closest('table');
    if (!tabel) return;
    var heads = Array.prototype.slice.call(tabel.querySelectorAll('thead th'));
    var klasser = [];
    heads.forEach(function (th, i) {
      var t = th.textContent.replace(/[↕↓↑]/g, '').trim();
      Object.keys(KOL).forEach(function (k) { if (t.indexOf(k) === 0) { klasser.push([i + 1, KOL[k]]); th.classList.add(KOL[k]); } });
    });
    tabel.setAttribute('data-cr43', klasser.map(function (k) { return k[1] + ':' + k[0]; }).join(' '));
    body.querySelectorAll('tr').forEach(function (tr) {
      if (tr.cells.length !== heads.length) return;
      klasser.forEach(function (k) { var c = tr.cells[k[0] - 1]; if (c && !c.classList.contains(k[1])) c.classList.add(k[1]); });
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
    var body = document.getElementById('holdings');
    new MutationObserver(plan).observe(body ? body.closest('table') || body : document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
