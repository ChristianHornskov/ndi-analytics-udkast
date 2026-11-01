/* Graf-review punkt 41: korrekt aktiv sektion og luft efter hop. */
(function () {
  'use strict';
  var nav, links = [], laast = null, laastTil = 0;
  function sticky() { return nav && getComputedStyle(nav).position === 'sticky'; }
  function maal() {
    var top = sticky() ? Math.ceil(nav.getBoundingClientRect().height) + 16 : 16;
    document.documentElement.style.setProperty('--cr41-top', top + 'px');
  }
  function marker() {
    if (!nav || !links.length) return;
    var aktuel = links[0];
    if (laast && Date.now() < laastTil) {
      aktuel = laast;
    } else {
      laast = null;
      var graense = (sticky() ? nav.getBoundingClientRect().bottom : 0) + 24;
      links.forEach(function (a) {
        var t = document.querySelector(a.hash);
        if (t && t.getClientRects().length && t.getBoundingClientRect().top <= graense) aktuel = a;
      });
      var bund = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (bund) {
        for (var i = links.length - 1; i >= 0; i--) {
          var t2 = document.querySelector(links[i].hash);
          if (t2 && t2.getClientRects().length && t2.getBoundingClientRect().top < window.innerHeight) { aktuel = links[i]; break; }
        }
      }
    }
    links.forEach(function (a) {
      if (a === aktuel) { if (a.getAttribute('aria-current') !== 'location') a.setAttribute('aria-current', 'location'); }
      else if (a.hasAttribute('aria-current')) a.removeAttribute('aria-current');
    });
  }
  var ramme = 0;
  function plan() { if (!ramme) ramme = requestAnimationFrame(function () { ramme = 0; marker(); }); }
  function start() {
    nav = document.getElementById('analysis-nav');
    if (!nav) return;
    links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    // Hop i siden går gennem homepage-patch.js, der stopper klikket og sender
    // beskeden ndi-preview-scroll. Uden Wix-vært ruller journey-polish.js til top-20.
    // Her rettes hoppet, så sektionen lander under den sticky navigation.
    if (window.parent === window) {
      window.addEventListener('message', function (e) {
        if (e.source !== window || e.origin !== location.origin || !e.data || e.data.type !== 'ndi-preview-scroll') return;
        var top = e.data.top;
        if (typeof top !== 'number' || !isFinite(top)) return;
        maal();
        var luft = sticky() ? Math.ceil(nav.getBoundingClientRect().height) + 16 : 20;
        links.forEach(function (a) {
          var t = document.querySelector(a.hash);
          if (t && Math.abs(t.getBoundingClientRect().top + window.scrollY - top) < 2) { laast = a; laastTil = Date.now() + 900; }
        });
        if (luft !== 20) window.scrollTo({ top: Math.max(0, top - luft), behavior: 'auto' });
        plan();
      });
    }
    window.addEventListener('scroll', plan, { passive: true });
    window.addEventListener('resize', function () { maal(); plan(); });
    maal();
    plan();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
