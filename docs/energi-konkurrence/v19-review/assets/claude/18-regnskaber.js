/* Punkt 18: "Tal fra daterede regnskaber" vises som tabel i danske formater.
   Listen i HTML'en bevares og bruges som kilde, så tallene altid kommer fra siden. */
(function () {
  var MULT = { 'mio.': 1, 'mia.': 1e3, 'billion': 1e3, 'bio.': 1e6 };
  function tal(s, enhed) {
    var t = s.replace(/\s/g, '');
    if (t.indexOf(',') >= 0) t = t.replace(/\./g, '').replace(',', '.');
    var v = parseFloat(t);
    return isNaN(v) ? null : v * MULT[enhed];
  }
  function fmt(v, dec) {
    return v.toLocaleString('da-DK', { minimumFractionDigits: dec, maximumFractionDigits: dec }).replace('-', '−');
  }
  // Skala vælges pr. valuta i tabellen, så alle rækker med samme valuta har samme enhed.
  function skala(vaerdier) {
    var a = vaerdier.map(Math.abs), max = Math.max.apply(null, a), min = Math.min.apply(null, a);
    if (max >= 1e6) return min >= 1e6 ? 'bio.' : 'mia.';
    return 'mio.';
  }
  function beloeb(mio, valuta, sk) {
    if (sk === 'bio.') return fmt(mio / 1e6, 1) + ' bio. ' + valuta;
    if (sk === 'mia.') return fmt(mio / 1e3, 1) + ' mia. ' + valuta;
    return fmt(mio, Math.abs(mio) >= 1000 ? 0 : 1) + ' mio. ' + valuta;
  }
  function noegle(r) {
    var m = /(\d)\. kvt\. (\d{4})/.exec(r.p) || /(\d)\. halvår (\d{4})/.exec(r.p);
    var aar = m ? +m[2] : (/(\d{4})/.exec(r.p) || [0, 0])[1] * 1;
    var del = m ? +m[1] : 0;
    return [r.n === 'Omsætning' ? 0 : 1, -aar, -del];
  }
  function periode(p) {
    return p.replace(/\bQ([1-4])\s+FY(\d{4})/g, '$1. kvt. af regnskabsåret $2')
      .replace(/\bQ([1-4])\s+FY til/g, '$1. kvt. af regnskabsåret til')
      .replace(/\bQ([1-4])\s+(\d{4})/g, '$1. kvt. $2')
      .replace(/\bH([12])\s+(\d{4})/g, '$1. halvår $2')
      .replace(/^Regnskabsår\s+(\d{4})/, 'Året $1')
      .replace(/\s*[–-]\s*/g, ' til ');
  }
  var RAEKKE = /^(.*?):\s*(Omsætning|Resultat)\s+(-?[\d.,]+)\s+(mio\.|mia\.|bio\.|billion)\s+([A-Z]{3})(?:\s+mod\s+(-?[\d.,]+)\s+(mio\.|mia\.|bio\.|billion)\s+([A-Z]{3})\s+i\s+([^.]+?))?\.?\s*$/;
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst != null) e.textContent = tekst; return e; }
  function byg(d) {
    if (d.classList.contains('cr-tal-klar')) return;
    var ul = d.querySelector(':scope > ul'); if (!ul) return;
    var rk = [];
    var ok = Array.prototype.every.call(ul.children, function (li) {
      var a = li.querySelector('a');
      var tekst = (a ? li.textContent.replace(a.textContent, '') : li.textContent).replace(/\s+/g, ' ').trim();
      var m = RAEKKE.exec(tekst); if (!m) return false;
      var v = tal(m[3], m[4]); if (v === null) return false;
      rk.push({ p: periode(m[1]), n: m[2], mio: v, c: m[5], a: a });
      if (m[6]) {
        var v2 = tal(m[6], m[7]);
        if (v2 !== null) rk.push({ p: periode(m[9]), n: m[2], mio: v2, c: m[8], a: a });
      }
      return true;
    });
    if (!ok || !rk.length) return;
    // Samme periode og nøgletal kun én gang
    var set = {};
    rk = rk.filter(function (r) { var k = r.p + '|' + r.n; if (set[k]) return false; set[k] = 1; return true; });
    var sk = {};
    rk.forEach(function (r) { (sk[r.c] = sk[r.c] || []).push(r.mio); });
    Object.keys(sk).forEach(function (c) { sk[c] = skala(sk[c]); });
    rk.forEach(function (r, i) { r.v = beloeb(r.mio, r.c, sk[r.c]); r.i = i; });
    rk.sort(function (x, y) {
      var a = noegle(x), b = noegle(y);
      for (var i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] - b[i];
      return x.i - y.i;
    });
    var tbl = el('table', 'cr-tal');
    var th = el('thead'), tr = el('tr');
    ['Periode', 'Nøgletal', 'Beløb', 'Kilde'].forEach(function (t, i) {
      var c = el('th', i === 1 ? 'cr-n' : i === 2 ? 'cr-v' : i === 3 ? 'cr-s' : null, t); c.scope = 'col'; tr.appendChild(c);
    });
    th.appendChild(tr); tbl.appendChild(th);
    var tb = el('tbody');
    rk.forEach(function (r) {
      var tr = el('tr');
      var p = el('th', null, r.p); p.scope = 'row'; tr.appendChild(p);
      tr.appendChild(el('td', 'cr-n', r.n));
      tr.appendChild(el('td', 'cr-v', r.v));
      var s = el('td', 'cr-s');
      if (r.a) { var a = r.a.cloneNode(true); s.appendChild(a); }
      tr.appendChild(s); tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    var sum = d.querySelector(':scope > summary');
    if (sum && !sum.querySelector('.cr-tal-pil')) {
      sum.insertBefore(el('span', 'cr-tal-pil'), sum.firstChild).setAttribute('aria-hidden', 'true');
      var n = el('em', 'cr-tal-antal', String(rk.length)); n.setAttribute('aria-label', rk.length + ' tal');
      sum.appendChild(n);
    }
    var intro = d.querySelector(':scope > p');
    var ny = el('p', 'cr-tal-intro', 'Hvert tal er fra det regnskab, der står ved det. Det er ikke nødvendigvis det nyeste.');
    if (intro) intro.replaceWith(ny); else d.insertBefore(ny, ul);
    ul.replaceWith(tbl);
    d.classList.add('cr-tal-klar');
  }
  function start() { document.querySelectorAll('details.c20-reports').forEach(byg); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
