/* Graf-review punkt 40: samme periodenavne som widgeten. */
(function () {
  'use strict';
  var NAVNE = { m1: '1 md.', y1: '1 år' };
  function kør() {
    document.querySelectorAll('#fund-chart .periods button[data-period]').forEach(function (b) {
      var navn = NAVNE[b.getAttribute('data-period')];
      if (!navn) return;
      var lang = b.querySelector('.cr6-lang'), kort = b.querySelector('.cr6-kort');
      if (lang || kort) {
        if (lang && lang.textContent !== navn) lang.textContent = navn;
        if (kort && kort.textContent !== navn) kort.textContent = navn;
      } else if (b.textContent !== navn) {
        b.textContent = navn;
      }
      if (b.getAttribute('aria-label') && b.getAttribute('aria-label') !== navn) b.setAttribute('aria-label', navn);
    });
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    Promise.resolve().then(function () { venter = false; kør(); });
  }
  function start() {
    kør();
    new MutationObserver(plan).observe(document.getElementById('afkast') || document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
