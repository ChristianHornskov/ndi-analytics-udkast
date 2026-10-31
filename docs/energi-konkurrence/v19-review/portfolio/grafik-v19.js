/* Nye grafer i porteføljeanalysen (v19):
 *  1. 52-ugers top: på smal skærm vises fordelingen som en liste med vandrette
 *     bjælker i stedet for søjlediagrammet, der ellers skæres af.
 *  2. Vejen gennem nedturene: ny kurve med udfyldt flade, tal ved de fem
 *     dybeste bunde og egen tegning til mobil.
 *  3. Afkastkalender: fliser med nyeste år øverst og årets afkast i egen
 *     kolonne. På mobil vendes tabellen, så månederne står som rækker.
 * Filen indlæses sidst og bygger ovenpå de eksisterende render-funktioner
 * (render, renderHighs). Alle tal kommer fra data, insights og highData.
 */
(function () {
  'use strict';
  if (typeof render !== 'function') return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var MD = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  var tal = function (x, d) { return Number(x).toLocaleString('da-DK', { minimumFractionDigits: d == null ? 1 : d, maximumFractionDigits: d == null ? 1 : d }); };
  var procent = function (x, d) { return tal(x, d).replace('-', '−') + ' %'; };
  var e = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var datoTekst = function (d) { return new Date(d + 'T12:00:00Z').toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); };

  /* ------------------------------------------------------------ 52-ugers top, mobil */
  function highsListe(fund, source) {
    var box = document.getElementById('highs-content');
    if (!box || !fund || !source || !source.funds) return;
    var gammel = box.querySelector('.g19-hl'); if (gammel) gammel.remove();
    var scroll = box.querySelector('.hist-scroll');
    var pack = source.funds.find(function (f) { return f.short === fund.short; });
    if (!scroll || !pack || !pack.buckets) return;
    var b = pack.buckets, maks = Math.max.apply(null, b.map(function (x) { return x.weight; }).concat([0.0001]));
    var top3 = b.map(function (x, i) { return [x.weight, i]; }).sort(function (a, c) { return c[0] - a[0]; }).slice(0, 3).map(function (x) { return x[1]; });
    var valgt = typeof highBucket === 'undefined' ? null : highBucket;
    var rk = b.map(function (x, i) {
      var lab = (i * 10) + '-' + ((i + 1) * 10) + ' %';
      var kls = 'g19-hl-r' + (i === 0 ? ' er-top' : top3.indexOf(i) >= 0 ? ' er-stor' : '');
      return '<li><button type="button" class="' + kls + '" data-g19bucket="' + i + '" aria-pressed="' + (valgt === i) + '" aria-label="' +
        e(lab + ' under toppen: ' + x.count + ' aktier, ' + procent(x.weight) + ' af formuen') + '">' +
        '<span class="g19-hl-l">' + lab + '</span><span class="g19-hl-b" aria-hidden="true"><i style="width:' + (x.weight / maks * 100).toFixed(1) + '%"></i></span>' +
        '<b>' + procent(x.weight) + '</b><small>' + x.count + '</small></button></li>';
    }).join('');
    var html = '<div class="g19-hl"><p class="g19-hl-forkl">Bjælken viser, hvor stor en del af formuen der ligger i hvert spænd. Tryk for at se aktierne.</p>' +
      '<div class="g19-hl-hd" aria-hidden="true"><span>Under top</span><span></span><span>Formue</span><span>Aktier</span></div>' +
      '<ol class="g19-hl-liste" aria-label="Andel af formuen efter afstand til 52-ugers top">' + rk + '</ol></div>';
    scroll.insertAdjacentHTML('afterend', html);
    box.querySelectorAll('[data-g19bucket]').forEach(function (k) {
      k.addEventListener('click', function () {
        var org = box.querySelector('.hist-col[data-highbucket="' + k.getAttribute('data-g19bucket') + '"]');
        if (org) org.click();
      });
    });
  }

  /* ------------------------------------------------------------ nedture */
  function bunde(points) {
    var ep = [], bund = null;
    points.forEach(function (p) {
      if (p.v < -1e-9) { if (!bund || p.v < bund.v) bund = p; }
      else if (bund) { ep.push(bund); bund = null; }
    });
    if (bund) ep.push(bund);
    return ep;
  }
  function nedtureSvg(points, W, H, mob) {
    var a = mob ? 40 : 52, b = W - (mob ? 12 : 20), top = 18, bot = H - 34;
    var t0 = Date.parse(points[0].d), t1 = Date.parse(points[points.length - 1].d);
    var min = Math.min.apply(null, points.map(function (p) { return p.v; }));
    var lav = Math.min(-10, Math.floor(min / 10) * 10);
    var X = function (d) { return a + (Date.parse(d) - t0) / ((t1 - t0) || 1) * (b - a); };
    var Y = function (v) { return top + (-v) / (-lav) * (bot - top); };
    var s = [];
    for (var g = 0; g >= lav; g -= 10) {
      s.push('<line x1="' + a + '" x2="' + b + '" y1="' + Y(g).toFixed(1) + '" y2="' + Y(g).toFixed(1) + '" class="' + (g === 0 ? 'g19-nul' : 'g19-gitter') + '"/>' +
        '<text x="' + (a - 8) + '" y="' + (Y(g) + 4).toFixed(1) + '" text-anchor="end" class="g19-akse">' + (g === 0 ? '0' : '−' + (-g)) + ' %</text>');
    }
    var y0 = new Date(points[0].d).getUTCFullYear() + 1, y1 = new Date(points[points.length - 1].d).getUTCFullYear();
    for (var yr = y0; yr <= y1; yr++) {
      var x = X(yr + '-01-01');
      s.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + top + '" y2="' + bot + '" class="g19-gitter"/>' +
        '<text x="' + (x + 5).toFixed(1) + '" y="' + (bot + 20) + '" class="g19-akse">' + yr + '</text>');
    }
    var pts = points.map(function (p) { return X(p.d).toFixed(1) + ',' + Y(p.v).toFixed(1); }).join(' ');
    s.push('<polygon class="g19-flade" points="' + X(points[0].d).toFixed(1) + ',' + Y(0).toFixed(1) + ' ' + pts + ' ' + X(points[points.length - 1].d).toFixed(1) + ',' + Y(0).toFixed(1) + '"/>');
    s.push('<polyline class="g19-kurve" points="' + pts + '"/>');
    var fem = bunde(points).sort(function (p, q) { return p.v - q.v; }).slice(0, 5);
    var dyb = fem[0];
    fem.forEach(function (p) {
      var x = X(p.d), y = Y(p.v), stor = p === dyb;
      s.push('<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (stor ? 5 : 3.5) + '" class="g19-bund"><title>' + e(datoTekst(p.d) + ': ' + procent(p.v)) + '</title></circle>');
      if (stor) {
        var venstre = x > (a + b) / 2 + (mob ? 0 : 150);
        var tx = venstre ? x - 12 : x + 12, anc = venstre ? 'end' : 'start';
        s.push('<text x="' + tx.toFixed(1) + '" y="' + (y + 5).toFixed(1) + '" text-anchor="' + anc + '" class="g19-tal-stor">Største fald ' + procent(p.v) + '</text>' +
          '<text x="' + tx.toFixed(1) + '" y="' + (y + 22).toFixed(1) + '" text-anchor="' + anc + '" class="g19-dato">' + e(datoTekst(p.d)) + '</text>');
      } else if (!mob) {
        s.push('<text x="' + x.toFixed(1) + '" y="' + (y + 18).toFixed(1) + '" text-anchor="middle" class="g19-tal">' + procent(p.v) + '</text>');
      }
    });
    var sidst = points[points.length - 1], xs = X(sidst.d), ys = Y(sidst.v);
    s.push('<circle cx="' + xs.toFixed(1) + '" cy="' + ys.toFixed(1) + '" r="5" class="g19-nu"/>' +
      '<text x="' + (xs - 10).toFixed(1) + '" y="' + (ys - (mob ? 24 : 14)).toFixed(1) + '" text-anchor="end" class="g19-tal-stor">Nu ' + procent(sidst.v) + '</text>');
    var label = 'Fald fra tidligere top fra ' + datoTekst(points[0].d) + ' til ' + datoTekst(sidst.d) + '. Største fald ' + procent(dyb ? dyb.v : 0) + ' den ' + (dyb ? datoTekst(dyb.d) : '') + '. Nu ' + procent(sidst.v) + '.';
    return '<svg class="g19-nedture-svg ' + (mob ? 'g19-kun-m' : 'g19-kun-d') + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + e(label) + '">' + s.join('') + '</svg>';
  }
  function nedture() {
    var box = document.getElementById('drawdown');
    if (!box || typeof insights === 'undefined' || !insights || !insights.funds) return;
    var f = data.funds[selected], m = insights.funds[f.id];
    if (!m || !m.drawdowns || m.drawdowns.length < 2) return;
    var gammel = box.querySelector(':scope > svg, :scope > .g19-nedture');
    var ny = document.createElement('div');
    ny.className = 'g19-nedture';
    ny.innerHTML = nedtureSvg(m.drawdowns, 1060, 380, false) + nedtureSvg(m.drawdowns, 360, 290, true);
    if (gammel) box.replaceChild(ny, gammel); else box.insertBefore(ny, box.firstChild);
    box.classList.add('g19-nedture-box');
  }

  /* ------------------------------------------------------------ kalender */
  function kalender() {
    var box = document.getElementById('calendar');
    if (!box || typeof insights === 'undefined' || !insights || !insights.funds) return;
    var f = data.funds[selected], m = insights.funds[f.id];
    if (!m || !m.monthly || !m.monthly.length) return;
    var aarListe = Array.from(new Set(m.monthly.map(function (x) { return x.month.slice(0, 4); }))).sort().reverse();
    // årsafkast efter samme metode som tabellen "Afkast pr. kalenderår"
    var slut = new Map(); f.data.forEach(function (p) { slut.set(p.d.slice(0, 4), p); });
    var basis = 100, aarAfkast = {};
    Array.from(slut.keys()).sort().forEach(function (y) {
      var p = slut.get(y), v = (p.total / basis - 1) * 100; basis = p.total;
      var nu = y === data.asOf.slice(0, 4), stub = y === f.inception.slice(0, 4) && !f.inception.endsWith('01-01');
      aarAfkast[y] = { v: v, d: p.d, note: nu ? 'år til dato' : stub ? 'fra start' : '' };
    });
    var celle = function (y, i) {
      var r = m.monthly.find(function (x) { return x.month === y + '-' + String(i + 1).padStart(2, '0'); });
      if (!r) return '<td class="g19-k-tom" title="Intet grundlag"><span class="g19-sr">Intet grundlag</span></td>';
      var v = r.return * 100, kls = (v >= 0 ? 'pos' : 'neg') + (r.complete ? '' : ' g19-igang');
      var lab = MD[i] + ' ' + y + ': ' + procent(v) + (r.complete ? '' : ', måneden er ikke afsluttet');
      return '<td class="' + kls + '" title="' + e(r.start + ' til ' + r.end) + '" aria-label="' + e(lab) + '">' + tal(v).replace('-', '−') + (r.complete ? '' : '*') + '</td>';
    };
    var aarCelle = function (y) {
      var a = aarAfkast[y]; if (!a) return '<td class="g19-k-aar"></td>';
      return '<td class="g19-k-aar" title="' + e('Slutpunkt ' + a.d) + '"><b>' + procent(a.v) + '</b>' + (a.note ? '<small>' + a.note + '</small>' : '') + '</td>';
    };
    var d = '<table class="g19-kal g19-kun-d"><caption class="g19-sr">Afkast pr. måned og år i procent, nyeste år øverst</caption><thead><tr><th scope="col"><span class="g19-sr">År</span></th>' +
      MD.map(function (x) { return '<th scope="col">' + x + '</th>'; }).join('') + '<th scope="col" class="g19-k-aar">Året</th></tr></thead><tbody>' +
      aarListe.map(function (y) { return '<tr><th scope="row">' + y + '</th>' + MD.map(function (_, i) { return celle(y, i); }).join('') + aarCelle(y) + '</tr>'; }).join('') + '</tbody></table>';
    var mo = '<table class="g19-kal g19-kal-m g19-kun-m"><caption class="g19-sr">Afkast pr. måned og år i procent, nyeste år til venstre</caption><thead><tr><th scope="col"><span class="g19-sr">Måned</span></th>' +
      aarListe.map(function (y) { return '<th scope="col">' + y + '</th>'; }).join('') + '</tr></thead><tbody>' +
      MD.map(function (x, i) { return '<tr><th scope="row">' + x + '</th>' + aarListe.map(function (y) { return celle(y, i); }).join('') + '</tr>'; }).join('') +
      '<tr class="g19-k-aarr"><th scope="row">Året</th>' + aarListe.map(aarCelle).join('') + '</tr></tbody></table>';
    var leg = '<p class="g19-k-leg" aria-hidden="true"><span><i class="pos"></i>Plus</span><span><i class="neg"></i>Minus</span><span><i class="g19-igang"></i>Måneden er ikke afsluttet</span></p>';
    box.innerHTML = d + mo + leg;
    box.classList.add('g19-kal-box');
    // Den separate tabel med årsafkast er nu en del af kalenderen. Noten under den bliver stående.
    var sek = box.nextElementSibling;
    if (sek && sek.classList.contains('audit-addition') && /kalenderår/.test(sek.textContent)) {
      sek.querySelectorAll(':scope > h3, :scope > .tablewrap').forEach(function (x) { x.hidden = true; });
      sek.classList.add('g19-aar-skjult');
    }
  }

  function efterRender() {
    if (typeof data === 'undefined' || !data || !data.funds) return;
    try { highsListe(data.funds[selected], typeof highData === 'undefined' ? null : highData); } catch (err) { console.warn('g19 52-uger', err); }
    try { nedture(); } catch (err) { console.warn('g19 nedture', err); }
    try { kalender(); } catch (err) { console.warn('g19 kalender', err); }
  }

  var forrigeRender = render;
  render = function () { var r = forrigeRender.apply(this, arguments); efterRender(); return r; };
  if (typeof renderHighs === 'function') {
    var forrigeHighs = renderHighs;
    renderHighs = function (fund, source) {
      var r = forrigeHighs.apply(this, arguments);
      try { highsListe(fund, source); } catch (err) { console.warn('g19 52-uger', err); }
      return r;
    };
  }
  // Hvis siden allerede er tegnet, før denne fil blev indlæst.
  if (document.getElementById('drawdown') && document.getElementById('drawdown').querySelector('svg')) efterRender();
})();
