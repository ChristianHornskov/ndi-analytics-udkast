/* Graf-review punkt 27: udviklertekst flyttes bag en teknisk fold eller fjernes. */
(function () {
  'use strict';
  function fold(efter, id) {
    var d = document.getElementById(id);
    if (d) return d;
    d = document.createElement('details');
    d.id = id;
    d.className = 'cr27-teknik';
    d.innerHTML = '<summary>Teknisk om datagrundlaget</summary><div class="cr27-indhold"></div>';
    efter.after(d);
    return d;
  }
  function tekstnoder(rod, fn) {
    var w = document.createTreeWalker(rod, NodeFilter.SHOW_TEXT);
    var n, liste = [];
    while ((n = w.nextNode())) liste.push(n);
    liste.forEach(fn);
  }
  function kør() {
    // Eksempelnoten på fondens udvikling.
    document.querySelectorAll('p.v18-eksempel:not([data-cr27])').forEach(function (p) {
      p.setAttribute('data-cr27', '');
      var d = fold(p, 'cr27-eksempel');
      p.classList.add('cr27-flyttet');
      d.querySelector('.cr27-indhold').appendChild(p);
    });
    var m = document.getElementById('method-content');
    if (!m) return;
    tekstnoder(m, function (n) {
      var t = n.textContent, ny = t;
      if (/Denne testversion bruger/.test(ny)) ny = ny.replace('Denne testversion bruger', 'Siden bruger');
      if (/Ringdiagrammet/.test(ny)) {
        ny = ny.replace(/Ringdiagrammet normaliserer alene positive værdipapirvægte; alle viste procenttal er af hele formuen\./, 'Alle viste procenttal er af hele formuen.')
          .replace(/\s*Konti og andre nettobalanceposter indgår ikke i ringen\./, '');
      }
      if (ny !== t) n.textContent = ny;
    });
    Array.prototype.slice.call(m.querySelectorAll('p')).forEach(function (p) {
      if (p.hasAttribute('data-cr27') || !/SHA-256/.test(p.textContent)) return;
      p.setAttribute('data-cr27', '');
      var d = fold(p, 'cr27-hash');
      d.querySelector('.cr27-indhold').appendChild(p);
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
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
