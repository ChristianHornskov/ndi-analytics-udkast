/* Punkt 21: Regnskab i tal. Samme opbygning på alle selskabssider.
   Læser window.NDI_NOEGLETAL[slug] og bygger blokken i <div class="cr-noegletal" data-noegletal="slug">.
   Kun historiske tal. Ingen forventninger fra selskabet eller analytikere. */
(function () {
  function dk(v, d) { if (v == null || !isFinite(v)) return 'Ikke tilgængelig'; return v.toLocaleString('da-DK', { minimumFractionDigits: d, maximumFractionDigits: d }).replace('-', '−'); }
  var talSkala = 1, enh = 'mio.';
  function mio(v) { v = v / talSkala; return dk(v, Math.abs(v) < 10 ? 1 : 0); }
  function pct(v) { return (v > 0 ? '+' : '') + dk(v, 0) + ' %'; }
  function dato(s) { var p = s.split('-'); return +p[2] + '.' + +p[1] + '.' + p[0]; }
  function kortDato(s) { var p = s.split('-'); return +p[2] + '.' + +p[1] + '.' + p[0].slice(2); }
  function kvartal(s) { var p = s.split('-'); return Math.ceil(+p[1] / 3) + '. kvt. ' + p[0]; }
  /* Selskabernes regnskabskvartaler følger ikke altid kalenderen. Perioden navngives derfor efter slutdatoen. */
  function periode(k) { return (k.periode === 'halvår' ? 'Halvår' : 'Kvartal') + ' til ' + dato(k.til); }
  function gen(x) { return /[sxz]$/i.test(x) ? x + '\u2019' : x + 's'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* Ét samlet diagram: omsætning øverst og resultat efter skat nederst i de samme kolonner.
     Hver række har sin egen skala. De seneste 12 måneder står i en ramme for sig. */
  function samletDiagram(aar, t, v, smal) {
    var W = smal ? 360 : 900, venstre = smal ? 4 : 8, hoejre = smal ? 4 : 8;
    var cols = aar.map(function (a) { return { lab: a.etiket || String(a.aar), o: a.omsaetning, r: a.resultat }; })
      .concat([{ lab: smal ? '12 mdr.' : '12 mdr. til ' + kortDato(t.til), o: t.omsaetning, r: t.resultat, seneste: true }]);
    var n = cols.length, slot = (W - venstre - hoejre) / n, bw = Math.min(smal ? 34 : 92, slot * 0.56);
    var oTop = 44, oH = smal ? 110 : 150, rTop = oTop + oH + (smal ? 58 : 64);
    var rv = cols.map(function (c) { return c.r; });
    var rMax = Math.max(0, Math.max.apply(null, rv)), rMin = Math.min(0, Math.min.apply(null, rv));
    var rH = smal ? 96 : 120, H = rTop + rH + 58;
    var oMax = Math.max.apply(null, cols.map(function (c) { return c.o; }));
    function yo(x) { return oTop + oH - x / oMax * oH; }
    function yr(x) { return rTop + (rMax - x) / ((rMax - rMin) || 1) * rH; }
    var oBase = oTop + oH, r0 = yr(0);
    function bar(x, y1, y2, kls) { // y1 er datasiden, y2 er basislinjen
      var h = Math.abs(y2 - y1), rr = Math.min(4, h), op = y1 < y2;
      var yt = op ? y1 : y2, yb = op ? y2 : y1;
      return op
        ? '<path class="' + kls + '" d="M' + x + ',' + yb + 'V' + (yt + rr) + 'Q' + x + ',' + yt + ' ' + (x + rr) + ',' + yt + 'H' + (x + bw - rr) + 'Q' + (x + bw) + ',' + yt + ' ' + (x + bw) + ',' + (yt + rr) + 'V' + yb + 'Z"/>'
        : '<path class="' + kls + '" d="M' + x + ',' + yt + 'V' + (yb - rr) + 'Q' + x + ',' + yb + ' ' + (x + rr) + ',' + yb + 'H' + (x + bw - rr) + 'Q' + (x + bw) + ',' + yb + ' ' + (x + bw) + ',' + (yb - rr) + 'V' + yt + 'Z"/>';
    }
    var g = '';
    cols.forEach(function (c, i) {
      var cx = venstre + slot * i + slot / 2, x = cx - bw / 2;
      if (c.seneste) g += '<rect class="cr-nt-ramme" x="' + (venstre + slot * i + 3) + '" y="' + (oTop - 34) + '" width="' + (slot - 6) + '" height="' + (H - oTop + 30) + '" rx="10"/>';
      var yO = yo(c.o);
      g += '<g class="cr-nt-punkt"><title>' + c.lab + ': omsætning ' + mio(c.o) + ' ' + enh + ' ' + v + ', resultat ' + mio(c.r) + ' ' + enh + ' ' + v + '</title>' +
        bar(x, yO, oBase, 'cr-nt-bar' + (c.seneste ? ' cr-nt-bar--seneste' : '')) +
        '<text class="cr-nt-vaerdi" x="' + cx + '" y="' + (yO - 8) + '" text-anchor="middle">' + mio(c.o) + '</text>';
      var yR = yr(c.r), pos = c.r >= 0;
      g += bar(x, yR, r0, 'cr-nt-bar' + (pos ? '' : ' cr-nt-bar--neg') + (c.seneste ? ' cr-nt-bar--seneste' : '')) +
        '<text class="cr-nt-vaerdi" x="' + cx + '" y="' + (pos ? yR - 8 : yR + 18) + '" text-anchor="middle">' + mio(c.r) + '</text>' +
        '<text class="cr-nt-aar" x="' + cx + '" y="' + (H - 18) + '" text-anchor="middle">' + esc(c.lab) + '</text></g>';
    });
    var enhT = '<tspan class="cr-nt-enhed-t" dx="8">' + enh + ' ' + v + '</tspan>';
    var lab = '<text class="cr-nt-band" x="' + venstre + '" y="' + (oTop - 22) + '">Omsætning' + enhT + '</text>' +
      '<text class="cr-nt-band" x="' + venstre + '" y="' + (rTop - 30) + '">Resultat efter skat' + enhT + '</text>';
    return '<svg class="cr-nt-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Omsætning og resultat efter skat, ' + enh + ' ' + v + '">' +
      '<line class="cr-nt-nul" x1="' + venstre + '" x2="' + (W - hoejre) + '" y1="' + oBase + '" y2="' + oBase + '"/>' +
      '<line class="cr-nt-nul cr-nt-nul--r" x1="' + venstre + '" x2="' + (W - hoejre) + '" y1="' + r0 + '" y2="' + r0 + '"/>' + lab + g + '</svg>';
  }

  /* Aktiens tal hentes fra fondens validerede kursdata (samme kilde som kursgrafen), så alle aktietal har samme dato.
     Mangler de, vises ingen lokal reservekurs eller kursbaserede nøgletal. */
  function live(slug) {
    var s = window.NDI_LIVE;
    try {
      var fund = s.files['data.json'].funds.filter(function (f) { return f.id === 'pmindi'; })[0];
      var pos = fund.positions.filter(function (p) { return s.identities[p.isin] && s.identities[p.isin].slug === slug && p.weight > 0; })
        .sort(function (a, b) { return b.weight - a.weight; })[0];
      var isin = pos ? pos.isin : null;
      if (!isin) Object.keys(s.identities).forEach(function (k) { if (s.identities[k].slug === slug) isin = k; });
      var rows = s.files['highs.json'].funds.filter(function (f) { return f.short === 'PMINDI'; })[0].rows;
      var r = rows.filter(function (r) { return r.isin === isin; })[0];
      if (!r || ['ok', 'short_history'].indexOf(r.status) < 0 || !(r.marketClose > 0)) return null;
      return { kurs: r.marketClose, valuta: r.marketCurrency, dato: (r.returnDate || r.date).slice(0, 10), ticker: r.ticker,
        y1: r.priceReturns && r.priceReturns.y1, y1fra: r.returnBaseDates && r.returnBaseDates.y1,
        afstand: isFinite(r.distance) ? r.distance : null, fuldtAar: r.status === 'ok' };
    } catch (e) { return null; }
  }
  function celle(titel, tal, enhed, under, kls) {
    return '<div class="cr-nt-celle"><p class="cr-nt-titel">' + titel + '</p><p class="cr-nt-tal' + (kls ? ' ' + kls : '') + '">' + tal +
      (enhed ? '<span>' + enhed + '</span>' : '') + '</p><p class="cr-nt-sm">' + under + '</p></div>';
  }

  function byg(boks, n) {
    var v = n.valuta, aar = n.aar.slice(-4), t = n.ttm, k = n.kvartal, ak = n.aktie;
    // Meget store beløb (fx won og yen) vises i mia. i stedet for mio., så tallene kan læses.
    var stoerst = Math.max.apply(null, aar.concat([t]).map(function (a) { return Math.max(Math.abs(a.omsaetning || 0), Math.abs(a.resultat || 0)); }));
    talSkala = stoerst >= 1e6 ? 1000 : 1; enh = talSkala === 1 ? 'mio.' : 'mia.';
    var smal = boks.clientWidth < 600;
    var L = live(boks.getAttribute('data-noegletal'));
    var kurs = L && L.valuta === v ? L.kurs : NaN, kursDato = L ? L.dato : null;
    // aktier er ordinære aktier; den noterede ADS repræsenterer adsForhold af dem.
    var forhold = n.adsForhold == null ? 1 : Number(n.adsForhold);
    var mv = Number.isFinite(forhold) && forhold > 0 && Number.isFinite(ak.aktier) && ak.aktier > 0
      ? ak.aktier / forhold * kurs / 1e6 : NaN;
    var ps = mv / t.omsaetning;
    /* Handles aktien i en anden valuta end regnskabet (fx ADR i USD og regnskab i NTD), kan markedsværdi og
       price/sales ikke regnes uden omregning. Så vises de ikke, og kursen vises i sin egen valuta. */
    var mvOk = isFinite(mv) && mv > 0;
    /* Selskaber uden omsætning (fx mineselskaber før produktion): ingen price/sales og intet omsætningspanel. */
    var udenOms = !(t.omsaetning > 0) && (n.aar || []).every(function (a) { return !(a.omsaetning > 0); });
    var valutaForskel = L && L.valuta && L.valuta !== v;
    var kursVis = isFinite(kurs) ? kurs : (L ? L.kurs : null), kursValuta = isFinite(kurs) ? v : (L ? L.valuta : v);
    if (!isFinite(kurs) && L) kursDato = L.dato;
    var kv = (k.omsaetning / k.sammeKvartalAaretFoer - 1) * 100;

    // Design "Midnatsblå" (valgt 13.11.2026): tre nøgletal øverst, to søjlediagrammer, fodnote med kilde.
    var cols = aar.map(function (a) { return { lab: a.etiket || String(a.aar), o: a.omsaetning, r: a.resultat }; })
      .concat([{ lab: '12 mdr.', o: t.omsaetning, r: t.resultat, seneste: true }]);
    var oMax = Math.max.apply(null, cols.map(function (c) { return c.o; }));
    var pMax = Math.max(0, Math.max.apply(null, cols.map(function (c) { return c.r; })));
    var nMax = Math.max(0, -Math.min.apply(null, cols.map(function (c) { return c.r; })));
    var skala = 118, nul = 30 + (pMax / ((pMax + nMax) || 1)) * skala;
    function soejleOms() {
      return '<div class="cr-mb-cols" role="img" aria-label="' + ON + ' i ' + enh + ' ' + v + ': ' + cols.map(function (c) { return c.lab + ' ' + mio(c.o); }).join(', ') + '">' +
        cols.map(function (c) {
          return '<div class="cr-mb-col' + (c.seneste ? ' cr-mb-col--seneste' : '') + '"><div class="cr-mb-plot"><div class="cr-mb-bar" style="height:' + (c.o / oMax * 135).toFixed(1) + 'px"><b>' + mio(c.o) + '</b></div></div><div class="cr-mb-aar">' + c.lab + '</div></div>';
        }).join('') + '</div>';
    }
    function soejleRes() {
      return '<div class="cr-mb-cols cr-mb-cols--res" role="img" aria-label="Resultat efter skat i ' + enh + ' ' + v + ': ' + cols.map(function (c) { return c.lab + ' ' + mio(c.r); }).join(', ') + '">' +
        cols.map(function (c) {
          var h = Math.abs(c.r) / ((pMax + nMax) || 1) * skala, neg = c.r < 0;
          return '<div class="cr-mb-col' + (c.seneste ? ' cr-mb-col--seneste' : '') + '"><div class="cr-mb-plot"><div class="cr-mb-nul" style="top:' + nul.toFixed(1) + 'px"></div>' +
            '<div class="cr-mb-bar' + (neg ? ' cr-mb-bar--neg' : '') + '" style="height:' + h.toFixed(1) + 'px;bottom:auto;top:' + (neg ? nul : nul - h).toFixed(1) + 'px"><b>' + mio(c.r) + '</b></div></div><div class="cr-mb-aar">' + c.lab + '</div></div>';
        }).join('') + '</div>';
    }
    function maal(lab, tal, enh, under) {
      return '<div class="cr-mb-metric"><div class="cr-mb-sub">' + lab + '</div><div class="cr-mb-value">' + tal + (enh ? ' <small>' + enh + '</small>' : '') + '</div><div class="cr-mb-sub">' + under + '</div></div>';
    }
    var ON = n.omsNavn || 'Omsætning', fra = k.periode === 'halvår' ? 'samme halvår året før' : 'samme kvartal året før';
    boks.innerHTML =
      '<div class="cr-mb">' +
        '<div class="cr-mb-metrics">' +
          (udenOms ? maal('Omsætning', 'Ingen', '', 'Selskabet har endnu ingen omsætning') : maal(ON + ' · ' + periode(k), mio(k.omsaetning), enh + ' ' + v, (k.sammeKvartalAaretFoer > 0 ? pct(kv) + ' mod ' + fra : 'Ingen sammenlignelig omsætning året før'))) +
          (mvOk ? maal('Markedsværdi', dk(mv / 1000, 1), 'mia. ' + v, 'Kurs pr. ' + dato(kursDato) + (ak.aktierDato ? ' · Aktieantal pr. ' + dato(ak.aktierDato) : '') + (forhold !== 1 ? ' · ' + dk(forhold, 0) + ' aktier pr. ADS' : '')) +
          '' : '') +
        '</div>' +
        '<div class="cr-mb-pair' + (udenOms ? ' cr-mb-pair--en' : '') + '">' +
          (udenOms ? '' : '<div class="cr-mb-panel"><h3>' + ON + '</h3><div class="cr-mb-sub">' + enh + ' ' + v + '</div>' + soejleOms() + '</div>') +
          '<div class="cr-mb-panel"><h3>Resultat efter skat</h3><div class="cr-mb-sub">' + enh + ' ' + v + '</div>' + soejleRes() + '</div>' +
        '</div>' +
        '<p class="cr-mb-foot">Historiske regnskabstal' + (n.hentet ? ' · samlet ' + dato(n.hentet) : '') + '. ' + (enh === 'mio.' ? 'Mio. ' : 'Mia. ') + v + '. 12 mdr. er de seneste 12 måneder til ' + dato(t.til) + '. ' + (n.omsForkl ? n.omsForkl + ' ' : 'Omsætning er ' + (n.navn ? gen(n.navn) : 'selskabets') + ' samlede indtægter. ') + (mvOk ? 'Markedsværdi pr. ' + dato(kursDato) + '. ' : (valutaForskel ? 'Aktien handles i en anden valuta end regnskabet, så markedsværdien vises ikke. ' : '')) +
          'Kilde: <a class="tekstlink" href="' + esc(n.kildeUrl) + '" target="_blank" rel="noopener">' + esc(n.kilde) + '</a>.</p>' +
      '</div>';

    // Aktiens tal hører til kurskortet og flyttes derind, når det findes.
    var aktieRk = isFinite(kursVis) && kursVis !== null ? celle('Seneste lukkekurs', dk(kursVis, 2), kursValuta, (L && L.ticker ? L.ticker + ' · ' : '') + dato(kursDato)) : '';
    if (L && isFinite(L.y1) && L.y1fra) aktieRk += celle('Kursændring, 12 måneder', (L.y1 > 0 ? '+' : '') + dk(L.y1, 1) + ' %', '', dato(L.y1fra.slice(0, 10)) + ' til ' + dato(kursDato));
    if (L && L.afstand !== null) aktieRk += celle(L.fuldtAar ? 'Under 52-ugers top' : 'Under toppen i perioden', dk(L.afstand, 1) + ' %', '', 'Afstand til højeste dagskurs');
    var rk = document.querySelector('.cr-nt-aktie') || document.createElement('div');
    rk.className = 'cr-nt-aktie cr-nt-raekke';
    rk.innerHTML = aktieRk;
    placerAktie(rk);
  }
  function placerAktie(rk) {
    var kort = document.getElementById('aktiekurs');
    if (kort) { if (kort.firstElementChild !== rk) kort.insertBefore(rk, kort.firstChild); return; }
    var pladsholder = document.getElementById('kurs');
    if (pladsholder && pladsholder.parentNode) pladsholder.parentNode.insertBefore(rk, pladsholder);
    if (!placerAktie.vagt && window.MutationObserver) { // kurskortet bygges, når kursdata er hentet
      placerAktie.vagt = new MutationObserver(function () { if (document.getElementById('aktiekurs')) { placerAktie.vagt.disconnect(); placerAktie(rk); } });
      placerAktie.vagt.observe(document.body, { childList: true, subtree: true });
    }
  }
  var T = null;
  function start() {
    if (!T) return;
    [].forEach.call(document.querySelectorAll('.cr-noegletal[data-noegletal]'), function (b) {
      var n = T[b.getAttribute('data-noegletal')]; if (n) byg(b, n); else b.textContent = 'Regnskabstal er endnu ikke tilgængelige for dette selskab.';
    });
  }
  document.addEventListener('ndi:live', start); // kursdata kommer efter siden er indlæst
  function load() {
    document.querySelectorAll('.cr-noegletal').forEach(function (b) { b.textContent = 'Henter regnskabstal…'; });
    Promise.resolve(window.NDI_KEYFIGURES_READY).then(function (data) {
      if (!data) throw new Error('Missing Azure figures');
      T = data; start();
    }).catch(function () {
      document.querySelectorAll('.cr-noegletal').forEach(function (b) { b.textContent = 'Regnskabstallene kan ikke hentes lige nu. Prøv at genindlæse siden.'; });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();
