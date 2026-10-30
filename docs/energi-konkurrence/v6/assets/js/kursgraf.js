/* F-48: kursgraf på selskabssider. Læser KUN lokale filer: data/kurser/index.json og de filer, indekset peger på.
   Indekset: {"filer": {"<selskabets slug>": "<slug>.json"}}. Format pr. fil: {"navn","valuta","kilde","hentet":"ÅÅÅÅ-MM-DD","punkter":[["ÅÅÅÅ-MM-DD", lukkekurs], ...]}.
   v5 (F-54): sektionen er skjult fra start. Står et selskab ikke i indekset, forbliver den skjult. JS finder ikke på tal; den tegner kun det, filen indeholder. */
(function () {
  var rod = (document.currentScript && document.currentScript.src || '').replace(/assets\/js\/kursgraf\.js.*$/, '');
  var paneler = document.querySelectorAll('[data-kurs-id]');
  if (!paneler.length || !window.fetch) return;
  var MDR = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  function tal(x, d) { return x.toLocaleString('da-DK', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function dato(s) { var p = s.split('-'); return +p[2] + '. ' + MDR[+p[1] - 1] + ' ' + p[0]; }
  function tegn(panel, f) {
    var pk = (f.punkter || []).filter(function (p) { return p && typeof p[1] === 'number' && isFinite(p[1]); });
    if (pk.length < 2) return;
    // SVG'et tegnes i panelets egen bredde (1:1), så aksetekst altid er 12 px.
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
      '<p class="lille kg-fod">Seneste lukkekurs ' + tal(sidst[1], 2) + ' ' + f.valuta + ' den ' + dato(sidst[0]) + '. Kilde: ' + (f.kilde || '–') + (f.hentet ? ', hentet ' + dato(f.hentet) : '') + '.</p>';
    boks.hidden = false;
    var per = panel.querySelector('[data-kurs-periode]'); if (per) per.textContent = ' fra ' + dato(pk[0][0]) + ' til ' + dato(sidst[0]);
    var sek = panel.closest('[data-kurs-sektion]'); if (sek) sek.hidden = false;
    var note = panel.querySelector('[data-kurs-note]'); if (note) note.hidden = false;
  }
  function indlaes(d){
    var ix=d.kurser;if(!ix || !ix.filer)return;
    Array.prototype.forEach.call(paneler,function(p){
      var fil=ix.filer[p.getAttribute('data-kurs-id')];
      var f=fil && ix.serier && ix.serier[fil];if(f && f.valuta)tegn(p,f);
    });
  }
  if(window.NDI_TAL)indlaes(window.NDI_TAL);
  document.addEventListener('ndi:tal',function(e){indlaes(e.detail);});
})();
