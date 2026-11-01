/* Punkt 16: initialer på en plade i temaets farve i tabellen "Alle selskaber",
   når logoet mangler. Temafarverne læses fra sidemenuens temalinks (--tf). */
(function () {
  function initialer(navn) {
    var ord = String(navn || '').replace(/&/g, ' ').split(/\s+/).filter(function (w) { return /[A-Za-zÆØÅæøå0-9]/.test(w); });
    return ord.slice(0, 2).map(function (w) { return w.replace(/[^A-Za-zÆØÅæøå0-9]/g, '').charAt(0); }).join('').toUpperCase() || '?';
  }
  var farver = null;
  function temafarver() {
    if (farver) return farver;
    farver = {};
    var id = {};
    document.querySelectorAll('.sm-link--tema').forEach(function (a) {
      var m = /--tf:\s*(#[0-9a-fA-F]{3,8})/.exec(a.getAttribute('style') || '');
      var h = /temaer\/([a-z0-9-]+)\.html/.exec(a.getAttribute('href') || '');
      if (m && h) id[h[1]] = m[1];
      // Navnet står foran andelen, fx "Chips og halvledere23,79 %"
      var n = (a.textContent || '').replace(/\s+/g, ' ').replace(/\s*[\d.,]+\s*%\s*$/, '').trim();
      if (m && n) farver[n] = m[1];
    });
    var T = window.DAGENS_TAL;
    if (T && T.temaer) T.temaer.forEach(function (t) { if (id[t.id]) farver[t.navn] = id[t.id]; });
    return farver;
  }
  function ret(rod) {
    rod.querySelectorAll('.alle-logo:not(.sm-logo--billede)').forEach(function (s) {
      var r = s.closest('tr'); if (!r) return;
      var n = r.querySelector('[data-f="navn"]'), t = r.querySelector('[data-f="temaNavn"]');
      if (!n) return;
      var ini = initialer(n.textContent);
      if (s.textContent !== ini) s.textContent = ini;
      if (!s.classList.contains('cr-logo-init')) s.classList.add('cr-logo-init');
      var f = t && temafarver()[t.textContent.replace(/\s+/g, ' ').trim()];
      if (f && s.style.getPropertyValue('--lf') !== f) s.style.setProperty('--lf', f);
    });
  }
  function start() {
    var tbl = document.querySelector('table'); if (!tbl) return;
    var rod = tbl.parentNode || document.body;
    ret(rod);
    new MutationObserver(function () { ret(rod); }).observe(rod, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
