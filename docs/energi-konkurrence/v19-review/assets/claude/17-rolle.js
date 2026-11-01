/* Punkt 17: de største selskaber på selskabets trin i chipkæden.
   Navnene er lagt ind ved bygget fra chipkædens data på temasiden. Andelene læses
   fra window.DAGENS_TAL, så de følger fondens data. */
(function () {
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst != null) e.textContent = tekst; return e; }
  function pct(v) { return v.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %'; }
  function start() {
    var T = window.DAGENS_TAL;
    document.querySelectorAll('.cr-trin-top[data-navne]').forEach(function (boks) {
      if (boks.dataset.klar || !T || !T.selskaber) return;
      var navne; try { navne = JSON.parse(boks.getAttribute('data-navne')); } catch (e) { return; }
      var mig = boks.getAttribute('data-mig');
      var paaNavn = {};
      Object.keys(T.selskaber).forEach(function (k) { var s = T.selskaber[k]; if (s && s.navn && s.andel > 0) paaNavn[s.navn.toLowerCase()] = { slug: k, navn: s.navn, andel: s.andel }; });
      var rk = navne.map(function (n) { return paaNavn[String(n).toLowerCase()]; }).filter(Boolean);
      if (!rk.length) return;
      rk.sort(function (a, b) { return b.andel - a.andel; });
      var top = rk.slice(0, 4);
      if (mig && !top.some(function (r) { return r.slug === mig; })) {
        var m = rk.filter(function (r) { return r.slug === mig; })[0]; if (m) top[3] = m;
      }
      var maks = rk[0].andel;
      var ol = el('ol');
      top.forEach(function (r) {
        var li = el('li', r.slug === mig ? 'cr-mig' : null);
        li.appendChild(el('span', null, r.navn));
        var i = el('i'); i.setAttribute('aria-hidden', 'true'); i.style.setProperty('--w', Math.max(2, r.andel / maks * 100).toFixed(0) + '%'); li.appendChild(i);
        li.appendChild(el('b', null, pct(r.andel)));
        ol.appendChild(li);
      });
      boks.appendChild(ol);
      var dato = T.andelsdatoTekst ? ' pr. ' + T.andelsdatoTekst : '';
      boks.appendChild(el('p', 'cr-trin-note', 'De ' + (top.length === 4 ? 'fire' : top.length) + ' største af trinnets ' + rk.length + ' selskaber i fonden. Andel af fonden' + dato + '.'));
      boks.hidden = false;
      boks.dataset.klar = '1';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
