/* Graf-review punkt 42: rensede selskabsnavne og links. */
(function () {
  'use strict';
  var N = window.CR42_NAVNE;
  if (!N) return;
  window.CR42_NAVN = function (raa) { var x = N[String(raa || '').trim()]; return x ? x[0] : raa; };
  var OMRAADER = ['holdings', 'analysis-mobile-holdings', 'highs-content', 'geography-review', 'topmini', 'analysis-dashboard', 'preview-risk-summary'];
  function ret(rod) {
    var w = document.createTreeWalker(rod, NodeFilter.SHOW_TEXT);
    var n, liste = [];
    while ((n = w.nextNode())) liste.push(n);
    liste.forEach(function (n) {
      var t = n.textContent.trim();
      if (!t || !N[t]) return;
      var x = N[t], el = n.parentElement;
      if (!el || el.closest('script,style,option,title')) return;
      if (n.textContent.trim() !== x[0]) n.textContent = n.textContent.replace(t, x[0]);
      if (!x[1] || el.closest('a') || el.closest('button') || el.closest('summary') || el.closest('svg')) return;
      if (!(el.closest('td,th') || el.closest('.analysis-holding-title, .cr1-navn'))) return;
      var a = document.createElement('a');
      a.className = 'up-company-link';
      a.href = '../selskaber/' + x[1] + '.html';
      n.before(a);
      a.appendChild(n);
    });
  }
  var NOEGLER = Object.keys(N).sort(function (a, b) { return b.length - a.length; });
  function retListe(el) {
    // Lister med flere navne i én tekst, fx "Største: ..." fra punkt 5.
    var t = el.textContent, ny = t;
    NOEGLER.forEach(function (k) {
      if (ny.indexOf(k) === -1 || k === N[k][0]) return;
      ny = ny.split(k + ' ').join(N[k][0] + ' ').split(k + ',').join(N[k][0] + ',');
    });
    if (ny !== t) el.textContent = ny;
  }
  function kør() {
    OMRAADER.forEach(function (id) { var e = document.getElementById(id); if (e) ret(e); });
    document.querySelectorAll('.cr5-top').forEach(retListe);
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    requestAnimationFrame(function () { venter = false; kør(); });
  }
  function start() {
    kør();
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
