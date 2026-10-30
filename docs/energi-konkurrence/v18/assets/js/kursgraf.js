/* v17 (kurs-format.md, skema 2): kursgraf på selskabssider. Læser KUN lokale filer i data/kurs/.
   Indeks: window.KURS_INDEX fra data/kurs/index.js = {"skema":2,"kilde","opdateret","filer":{"<slug>":{"ticker","fil"}}}.
   Kursfil: data/kurs/<fil>.js sætter window.KURS["<ticker>"] = {ticker, navn?, valuta, kilde, opdateret, punkter:[["ÅÅÅÅ-MM-DD", lukkekurs], ...]}.
   Byggeren sætter <script src="../data/kurs/<fil>.js"> på siden, når selskabet står i indekset og filen består valideringen.
   Via lokal fil bruges kun .js (ingen fetch). Over http er <fil>.json reserve.
   Sektionen er skjult fra start (ingen tom ramme, ingen CLS) og forbliver skjult uden data. JS finder ikke på tal. */
(function () {
  var rod = (document.currentScript && document.currentScript.src || '').replace(/assets\/js\/kursgraf\.js.*$/, '');
  var paneler = document.querySelectorAll('[data-kurs-id]');
  if (!paneler.length) return;
  var MDR = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  function tal(x, d) { return x.toLocaleString('da-DK', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function dato(s) { var p = s.split('-'); return +p[2] + '. ' + MDR[+p[1] - 1] + ' ' + p[0]; }
  function tegn(panel, f) {
    var pk = (f.punkter || []).filter(function (p) { return p && typeof p[1] === 'number' && isFinite(p[1]); });
    if (pk.length < 2) return;
    // SVG'et tegnes i panelets egen bredde (1:1), så aksetekst altid er 12 px.
    // v18: vis sektionen før målingen; en skjult sektion har bredden 0, og grafen blev tegnet i minimumsbredden.
    var sek0 = panel.closest('[data-kurs-sektion]'); if (sek0) sek0.hidden = false;
    var cs = getComputedStyle(panel), W = Math.max(260, Math.round(panel.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
    var H = W < 520 ? 220 : 280, ml = 48, mr = 8, mt = 26, mb = 30;
    var t0 = Date.parse(pk[0][0]), t1 = Date.parse(pk[pk.length - 1][0]);
    var lo = Infinity, hi = -Infinity;
    pk.forEach(function (p) { lo = Math.min(lo, p[1]); hi = Math.max(hi, p[1]); });
    var sp = (hi - lo) || hi || 1; lo = Math.max(0, lo - sp * 0.05); hi = hi + sp * 0.05;
    function x(t) { return ml + (W - ml - mr) * (t - t0) / ((t1 - t0) || 1); }
    function y(v) { return mt + (H - mt - mb) * (1 - (v - lo) / (hi - lo)); }
    var d = pk.map(function (p, i) { return (i ? 'L' : 'M') + x(Date.parse(p[0])).toFixed(1) + ' ' + y(p[1]).toFixed(1); }).join('');
    var dec = hi < 20 ? 2 : 0, g = '';
    for (var i = 0; i <= 4; i++) {
      var v = lo + (hi - lo) * i / 4, yy = y(v).toFixed(1);
      g += '<line class="kg-gitter" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + yy + '" y2="' + yy + '"/>' +
           '<text class="kg-akse" x="' + (ml - 6) + '" y="' + yy + '" dy="4" text-anchor="end">' + tal(v, dec) + '</text>';
    }
    var a0 = new Date(t0).getFullYear(), a1 = new Date(t1).getFullYear();
    for (var a = a0 + 1; a <= a1; a++) {
      var xx = x(Date.UTC(a, 0, 1)).toFixed(1);
      g += '<line class="kg-gitter" x1="' + xx + '" x2="' + xx + '" y1="' + mt + '" y2="' + (H - mb) + '"/>' +
           '<text class="kg-akse" x="' + xx + '" y="' + (H - 10) + '" text-anchor="middle">' + a + '</text>';
    }
    var sidst = pk[pk.length - 1];
    var boks = panel.querySelector('[data-kurs-graf]');
    boks.innerHTML = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Lukkekurs for ' + (f.navn || '') + ' fra ' + dato(pk[0][0]) + ' til ' + dato(sidst[0]) + ', i ' + f.valuta + '">' +
      '<text class="kg-akse" x="0" y="12">' + f.valuta + '</text>' + g + '<path class="kg-linje" d="' + d + '"/></svg>' +
      '<p class="lille kg-fod">Seneste lukkekurs ' + tal(sidst[1], 2) + ' ' + f.valuta + ' den ' + dato(sidst[0]) + '. Kilde: ' + (f.kilde || '–') + (f.opdateret ? ', hentet ' + dato(f.opdateret) : '') + '.</p>';
    boks.hidden = false;
    var per = panel.querySelector('[data-kurs-periode]'); if (per) per.textContent = ' fra ' + dato(pk[0][0]) + ' til ' + dato(sidst[0]);
    var sek = panel.closest('[data-kurs-sektion]'); if (sek) sek.hidden = false;
    var note = panel.querySelector('[data-kurs-note]'); if (note) note.hidden = false;
  }
  function gyldig(f, tk) { return f && f.ticker === tk && typeof f.valuta === 'string' && /^[A-Z]{3}$/.test(f.valuta) && Array.isArray(f.punkter); }
  var http = /^https?:$/.test(location.protocol) && !!window.fetch;
  function hentJson(sti) { return fetch(rod + sti, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }); }
  (window.KURS_INDEX ? Promise.resolve(window.KURS_INDEX) : (http ? hentJson('data/kurs/index.json') : Promise.resolve(null))).then(function (ix) {
    if (!ix || ix.skema !== 2 || !ix.filer) return;
    Array.prototype.forEach.call(paneler, function (p) {
      var e = ix.filer[p.getAttribute('data-kurs-id')];
      /* kun den ticker, byggeren har valideret og sat på panelet */
      if (!e || typeof e.ticker !== 'string' || e.ticker !== p.getAttribute('data-kurs-ticker') || !/^[a-z0-9_][a-z0-9._-]*$/.test(e.fil || '')) return;
      var f = window.KURS && window.KURS[e.ticker];
      if (gyldig(f, e.ticker)) { tegn(p, f); return; }
      if (http) hentJson('data/kurs/' + e.fil + '.json').then(function (j) { if (gyldig(j, e.ticker)) tegn(p, j); });
    });
  }).catch(function () {});
})();
