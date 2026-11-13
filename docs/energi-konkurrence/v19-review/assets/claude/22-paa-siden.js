/* Punkt 22: markerer i "På siden" det afsnit, man læser. Første afsnit er markeret fra start. */
(function () {
  function start() {
    var links = [].slice.call(document.querySelectorAll('.sm-gruppe--side a[href^="#"], .v18s-trin a[href^="#"]'));
    var par = links.map(function (a) { return [a, document.getElementById(a.getAttribute('href').slice(1))]; })
      .filter(function (p) { return p[1]; });
    if (!par.length) return;
    function marker() {
      var levende = par.filter(function (p) { return p[1].isConnected && p[0].isConnected && p[1].getClientRects().length > 0; });
      if (!levende.length) return;
      var graense = window.innerHeight * 0.35, aktiv = levende[0];
      levende.forEach(function (p) { if (p[1].getBoundingClientRect().top <= graense) aktiv = p; });
      par.forEach(function (p) { if (p === aktiv) p[0].setAttribute('aria-current', 'true'); else p[0].removeAttribute('aria-current'); });
    }
    var venter = false;
    window.addEventListener('scroll', function () { if (venter) return; venter = true; requestAnimationFrame(function () { venter = false; marker(); }); }, { passive: true });
    marker();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
