/* Graf-review punkt 1: kompakte beholdningskort på mobil. */
(function () {
  'use strict';
  var MD = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  function dato(t) {
    return String(t || '').replace(/(\d{4})-(\d{2})-(\d{2})/g, function (_, y, m, d) { return (+d) + '. ' + MD[+m - 1] + ' ' + y; });
  }
  function felt(dl, navn) {
    var ud = null;
    if (!dl) return ud;
    dl.querySelectorAll(':scope > div').forEach(function (d) {
      var dt = d.querySelector('dt');
      if (dt && dt.textContent.trim() === navn) ud = d.querySelector('dd');
    });
    return ud;
  }
  function vaerdi(dd, kunTal) {
    if (!dd) return '<b>Ingen data</b>';
    var kopi = dd.cloneNode(true);
    kopi.querySelectorAll('small').forEach(function (s) { s.remove(); });
    var t = kopi.textContent.trim();
    if (!t || t === '—' || t === '-') return '<b>Ingen data</b>';
    return '<b class="' + (kunTal ? '' : dd.className) + '">' + t + '</b>';
  }
  function tal(label, dd, kunTal) {
    return '<div><span>' + label + '</span>' + vaerdi(dd, kunTal) + '</div>';
  }
  function omform(kort, idx) {
    if (kort.hasAttribute('data-cr1')) return;
    var titel = kort.querySelector('.analysis-holding-title > div');
    var vaegt = kort.querySelector('.analysis-holding-title > strong');
    var bar = kort.querySelector('.analysis-holding-weight i');
    var sektor = kort.querySelector('.analysis-holding-sector');
    var dl = kort.querySelector('dl');
    var kurs = kort.querySelector('details p');
    if (!titel || !vaegt || !dl) return;
    var navn = titel.querySelector('a');
    if (!navn) {
      var tekst = '';
      titel.childNodes.forEach(function (n) { if (n.nodeType === 3) tekst += n.textContent; });
      navn = document.createElement('strong');
      navn.textContent = tekst.trim();
    }
    var smaa = titel.querySelectorAll('small');
    var info = [];
    if (smaa[0]) info.push(smaa[0].textContent.trim());
    if (sektor && sektor.textContent.trim()) info.push(sektor.textContent.trim());
    var vKopi = vaegt.cloneNode(true);
    vKopi.querySelectorAll('small').forEach(function (s) { s.remove(); });
    var top = felt(dl, 'Under toppen');
    var topDato = top && top.querySelector('small') ? dato(top.querySelector('small').textContent.replace(/^Top siden\s*/, '')) : '';
    var kursTekst = '';
    if (kurs) {
      var k = kurs.cloneNode(true);
      var ks = k.querySelector('small');
      var hd = ks ? dato(ks.textContent.trim()) : '';
      if (ks) ks.remove();
      kursTekst = k.textContent.trim() + (hd ? ' <small>' + hd + '</small>' : '');
    }
    var id = 'cr1-flere-' + idx + '-' + Math.random().toString(36).slice(2, 7);
    var navnTekst = navn ? navn.textContent.trim() : 'positionen';
    kort.setAttribute('data-cr1', '');
    kort.classList.add('cr1-kort');
    kort.innerHTML =
      '<div class="cr1-hoved"><span class="cr1-nr" aria-hidden="true"></span>' +
      '<div class="cr1-navn">' + (navn ? navn.outerHTML : '') + '<small>' + info.join(' · ') + '</small></div>' +
      '<div class="cr1-vaegt"><strong>' + vKopi.textContent.trim() + '</strong><i style="width:' + (bar ? bar.style.width : '0') + '"></i></div></div>' +
      '<div class="cr1-tal">' + tal('1 md.', felt(dl, '1 md.')) + tal('1 år', felt(dl, '1 år')) + tal('Under toppen', top, true) +
      '<button type="button" class="cr1-mere" aria-expanded="false" aria-controls="' + id + '"><span class="cr1-sr">Flere tal for ' + navnTekst.replace(/[<>&"]/g, '') + '</span></button></div>' +
      '<div class="cr1-flere" id="' + id + '" hidden>' + tal('1 dag', felt(dl, '1 dag')) + tal('1 uge', felt(dl, '1 uge')) +
      tal('3 mdr.', felt(dl, '3 mdr.')) + tal('År til dato', felt(dl, 'ÅTD')) +
      (topDato ? '<div><span>Top</span><b>' + topDato + '</b></div>' : '') +
      (kursTekst ? '<div><span>Kurs</span><b>' + kursTekst + '</b></div>' : '') + '</div>';
  }
  function skift(kort) {
    var knap = kort.querySelector('.cr1-mere');
    var flere = kort.querySelector('.cr1-flere');
    if (!knap || !flere) return;
    var aaben = knap.getAttribute('aria-expanded') !== 'true';
    knap.setAttribute('aria-expanded', String(aaben));
    flere.hidden = !aaben;
    kort.classList.toggle('cr1-aaben', aaben);
  }
  function synk() {
    var mobil = document.getElementById('analysis-mobile-holdings');
    var tabel = document.getElementById('holdings');
    if (!mobil) return;
    mobil.classList.add('cr1-liste');
    mobil.classList.toggle('cr1-alle', !!(tabel && tabel.classList.contains('preview-all')));
    mobil.querySelectorAll('.analysis-holding-card:not([data-cr1])').forEach(omform);
    if (!mobil.hasAttribute('data-cr1-klik')) {
      mobil.setAttribute('data-cr1-klik', '');
      mobil.addEventListener('click', function (e) {
        var kort = e.target.closest('.cr1-kort');
        if (!kort || e.target.closest('a')) return;
        if (e.target.closest('.cr1-flere') && !e.target.closest('.cr1-mere')) return;
        skift(kort);
      });
    }
  }
  function start() {
    synk();
    var mobil = document.getElementById('analysis-mobile-holdings');
    var obsMaal = mobil ? mobil.parentElement : document.body;
    new MutationObserver(function () { synk(); }).observe(obsMaal, { childList: true, subtree: true });
    var tabel = document.getElementById('holdings');
    if (tabel) new MutationObserver(synk).observe(tabel, { attributes: true, attributeFilter: ['class'] });
    var knap = document.getElementById('holdings-more');
    if (knap) knap.addEventListener('click', function () {
      setTimeout(function () {
        synk();
        var m = document.getElementById('analysis-mobile-holdings');
        if (m && !m.classList.contains('cr1-alle') && matchMedia('(max-width:700px)').matches) {
          var r = m.getBoundingClientRect();
          if (r.top < 0) m.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
      }, 0);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
