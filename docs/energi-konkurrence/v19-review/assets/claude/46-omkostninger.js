/* Graf-review punkt 46: henvisning til omkostningseksemplet og klasse på porteføljekortet. */
/* global data, selected */
(function () {
  'use strict';
  var GAMMEL = /Se det standardiserede omkostningseksempel under Data om fonden (?:&|og) metode\.?/;
  function henvisning() {
    var boks = document.getElementById('preview-visible-costs');
    if (!boks || boks.querySelector('a[data-cr46]')) return;
    var w = document.createTreeWalker(boks, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) {
      var m = GAMMEL.exec(n.textContent);
      if (!m) continue;
      var efter = n.splitText(m.index);
      efter.textContent = efter.textContent.slice(m[0].length);
      var a = document.createElement('a');
      a.href = '../portfolio/index.html#method';
      a.setAttribute('data-cr46', '');
      a.textContent = "Se KID's samlede omkostningseksempel under Datagrundlag i porteføljen";
      efter.before(document.createTextNode(''), a);
      a.after(document.createTextNode('.'));
      break;
    }
  }
  function klasse() {
    var span = document.querySelector('#preview-entries .entry-holdings-title span');
    if (!span) return;
    var navn = '';
    try { navn = data.funds[selected].short || String(data.funds[selected].id).toUpperCase(); } catch (e) { return; }
    if (navn && span.textContent !== navn) span.textContent = navn;
  }
  function kør() { henvisning(); klasse(); }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    requestAnimationFrame(function () { venter = false; kør(); });
  }
  function start() {
    kør();
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true });
    document.addEventListener('click', function (e) { if (e.target.closest('#class-choice')) setTimeout(plan, 0); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
