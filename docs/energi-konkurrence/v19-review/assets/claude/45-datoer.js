/* Graf-review punkt 45: danske datoer i stedet for ISO-datoer. */
(function () {
  'use strict';
  var MD = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  var ISO = /\b(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/g;
  var INTERVAL = /\b(\d{4}-\d{2}-\d{2})\s*[–—-]\s*(\d{4}-\d{2}-\d{2})\b/g;
  function dato(_, y, m, d) { return (+d) + '. ' + MD[+m - 1] + ' ' + y; }
  var TID = /\b(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]00:00)?/g;
  function om(t) {
    return t.replace(TID, function (_, y, m, d, hh, mm, z) { return dato(_, y, m, d) + ' kl. ' + hh + '.' + mm + (z ? ' UTC' : ''); }).replace(INTERVAL, function (_, a, b) { return a + ' til ' + b; }).replace(ISO, dato);
  }
  var harPunkt2 = !!document.querySelector('script[data-claude-punkt="2"]');
  function spring(el) {
    if (el.closest('script,style,code,pre,textarea,input,select,option,[contenteditable]')) return true;
    if (harPunkt2 && el.closest('#analysis-hero-chart svg, #analysis-distributions svg') && el.tagName.toLowerCase() === 'text') return true;
    return false;
  }
  function kør() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { return /\d{4}-\d{2}-\d{2}/.test(n.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
    });
    var n, liste = [];
    while ((n = w.nextNode())) liste.push(n);
    liste.forEach(function (n) {
      var el = n.parentElement;
      if (!el || spring(el) || /(?:review|release)-\d{4}-\d{2}-\d{2}/.test(n.textContent)) return;
      var ny = om(n.textContent);
      if (ny !== n.textContent) n.textContent = ny;
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
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
