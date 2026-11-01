/* Graf-review punkt 2: aksetal inden for grafen, årstal på x-aksen og danske datoer. */
(function () {
  'use strict';
  var MD = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  var ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
  function dato(t) {
    var m = ISO.exec(String(t).trim());
    return m ? (+m[3]) + '. ' + MD[+m[2] - 1] + ' ' + m[1] : t;
  }
  var NS = 'http://www.w3.org/2000/svg';
  function el(navn, attr) {
    var e = document.createElementNS(NS, navn);
    Object.keys(attr).forEach(function (k) { e.setAttribute(k, attr[k]); });
    return e;
  }
  function svgRet(fig) {
    var svg = fig.querySelector('svg');
    if (!svg || svg.hasAttribute('data-cr2')) return;
    svg.setAttribute('data-cr2', '');
    var vb = (svg.getAttribute('viewBox') || '').split(/\s+/).map(Number);
    if (vb.length !== 4) return;
    var tekster = Array.prototype.slice.call(svg.querySelectorAll('text'));
    var datoer = tekster.filter(function (t) { return ISO.test(t.textContent.trim()) && !t.closest('g'); });
    var gitter = Array.prototype.slice.call(svg.querySelectorAll('line')).filter(function (l) {
      return l.getAttribute('y1') === l.getAttribute('y2') && l.getAttribute('x1') !== l.getAttribute('x2');
    });
    // Årstal i stedet for start- og slutdato.
    if (datoer.length === 2 && gitter.length) {
      var a = datoer[0], b = datoer[1];
      var x0 = parseFloat(a.getAttribute('x')), x1 = parseFloat(b.getAttribute('x'));
      var t0 = Date.parse(a.textContent.trim()), t1 = Date.parse(b.textContent.trim());
      var yTekst = a.getAttribute('y');
      var ys = gitter.map(function (l) { return parseFloat(l.getAttribute('y1')); });
      var top = Math.min.apply(null, ys), bund = Math.max.apply(null, ys);
      var forste = gitter[0];
      var aar = new Date(t0).getFullYear() + 1, sidste = new Date(t1).getFullYear();
      var antal = sidste - aar + 1;
      var skridt = antal > 6 ? Math.ceil(antal / 6) : 1;
      if (t1 > t0 && antal > 0) {
        for (; aar <= sidste; aar += skridt) {
          var x = x0 + (Date.UTC(aar, 0, 1) - t0) / (t1 - t0) * (x1 - x0);
          if (x < x0 + 12 || x > x1 - 12) continue;
          svg.insertBefore(el('line', { x1: x, x2: x, y1: top, y2: bund, stroke: forste.getAttribute('stroke') || '#30454e', 'stroke-opacity': '.7', 'data-cr2': '' }), forste);
          var t = el('text', { x: x, y: yTekst, 'text-anchor': 'middle', fill: a.getAttribute('fill') || '#b5c8ce', 'font-size': a.getAttribute('font-size') || '14', 'data-cr2': '' });
          t.textContent = String(aar);
          svg.appendChild(t);
        }
        a.remove();
        b.remove();
      } else {
        datoer.forEach(function (d) { d.textContent = dato(d.textContent); });
      }
    } else {
      datoer.forEach(function (d) { d.textContent = dato(d.textContent); });
    }
    // Udvid viewBox, så de bredeste tal ikke skæres af.
    var minX = vb[0], maxX = vb[0] + vb[2];
    try {
      svg.querySelectorAll('text').forEach(function (t) {
        var bb = t.getBBox();
        if (bb.width) { minX = Math.min(minX, bb.x - 3); maxX = Math.max(maxX, bb.x + bb.width + 3); }
      });
    } catch (e) { return; }
    if (minX < vb[0] || maxX > vb[0] + vb[2]) {
      svg.setAttribute('viewBox', [Math.floor(minX), vb[1], Math.ceil(maxX - Math.floor(minX)), vb[3]].join(' '));
    }
    var lab = svg.getAttribute('aria-label');
    if (lab) svg.setAttribute('aria-label', lab.replace(/\d{4}-\d{2}-\d{2}/g, dato));
    return [t0, t1];
  }
  function undertekst(fig, svg) {
    var small = fig.querySelector('figcaption small');
    if (!small || small.hasAttribute('data-cr2')) return;
    var lab = svg ? svg.getAttribute('aria-label') || '' : '';
    var m = /(\d{1,2}\. \S+ \d{4}) til (\d{1,2}\. \S+ \d{4})/.exec(lab);
    var tekst = small.textContent;
    if (m) {
      small.innerHTML = '';
      small.appendChild(document.createTextNode(tekst.replace(/\s*·\s*\d{4}-\d{2}-\d{2}\s*$/, '')));
      small.appendChild(document.createElement('br'));
      small.appendChild(document.createTextNode(m[1] + ' til ' + m[2]));
    } else {
      small.textContent = tekst.replace(/\d{4}-\d{2}-\d{2}/g, dato);
    }
    small.setAttribute('data-cr2', '');
  }
  function kør() {
    ['analysis-hero-chart', 'analysis-distributions'].forEach(function (id) {
      var fig = document.getElementById(id);
      if (!fig || !fig.querySelector('svg') || !fig.getClientRects().length) return;
      svgRet(fig);
      undertekst(fig, fig.querySelector('svg'));
    });
  }
  var ventende = false;
  function planlæg() {
    if (ventende) return;
    ventende = true;
    requestAnimationFrame(function () { ventende = false; kør(); });
  }
  function start() {
    kør();
    new MutationObserver(planlæg).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', planlæg);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
