/* Graf-review punkt 54: tankestreger i den tekst, widgettens egne scripts skriver.
   Scripts fra hjemmesidens original må ikke ændres, så teksten rettes, når den vises.
   Et enkeltstående "—" (manglende værdi i tabeller) bevares. */
(function () {
  'use strict';
  var STREG = /[–—]/;
  function ret(t) {
    if (!STREG.test(t)) return t;
    return t
      .replace(/(slutdato)\s+[–—]\s+/g, '$1: ')
      .replace(/(\d{4})\s+[–—]\s+(\d)/g, '$1 til $2')
      .replace(/(\d)\s?[–—]\s?(\d)/g, '$1-$2')
      .replace(/(\S)\s+[–—]\s+(\S)/g, function (m, a, b) {
        return a + (b === b.toUpperCase() && b !== b.toLowerCase() && /^[A-ZÆØÅ]/.test(b) && !/^PMINDI/.test(b) ? '. ' : ', ') + b;
      });
  }
  function gaa(rod) {
    if (!rod) return;
    if (rod.nodeType === 3) {
      var ny = ret(rod.nodeValue);
      if (ny !== rod.nodeValue) rod.nodeValue = ny;
      return;
    }
    if (rod.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA)$/.test(rod.nodeName)) return;
    ['aria-label', 'title'].forEach(function (a) {
      var v = rod.getAttribute && rod.getAttribute(a);
      if (v && STREG.test(v)) rod.setAttribute(a, ret(v));
    });
    for (var c = rod.firstChild; c; c = c.nextSibling) gaa(c);
  }
  function start() {
    gaa(document.body);
    new MutationObserver(function (liste) {
      liste.forEach(function (m) {
        if (m.type === 'characterData') gaa(m.target);
        else m.addedNodes.forEach(gaa);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
