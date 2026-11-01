/* Graf-review punkt 6: fondsgrafen får hele bredden på mobil. */
(function () {
  'use strict';
  var MQ = matchMedia('(max-width:600px)');
  var NS = 'http://www.w3.org/2000/svg';
  var MD = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  var MAANED = { 'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'maj': 4, 'jun': 5, 'jul': 6, 'aug': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'dec': 11 };
  function parseDa(t) {
    var m = /(\d{1,2})\.\s*([a-zæø]{3})\S*\s+(\d{4})/i.exec(t || '');
    if (!m || MAANED[m[2].toLowerCase()] == null) return NaN;
    return Date.UTC(+m[3], MAANED[m[2].toLowerCase()], +m[1]);
  }
  function knapper(chart) {
    chart.querySelectorAll('.periods button').forEach(function (b) {
      if (b.hasAttribute('data-cr6')) return;
      var t = b.textContent.trim();
      if (t !== 'Seneste 12 måneder') return;
      b.setAttribute('data-cr6', '');
      b.setAttribute('aria-label', t);
      b.innerHTML = '<span class="cr6-lang">' + t + '</span><span class="cr6-kort" aria-hidden="true">12 mdr.</span>';
    });
  }
  function forklaring(chart, svg) {
    var leg = chart.querySelector('.legend');
    if (!leg) return;
    var ny = chart.querySelector('.cr6-legende');
    if (!ny) {
      ny = document.createElement('div');
      ny.className = 'cr6-legende';
      leg.after(ny);
    }
    var spans = leg.querySelectorAll('span');
    var data = [['fond', spans[0]], ['sammen', spans[1]]].filter(function (x) { return x[1]; }).map(function (x) {
      var t = svg.querySelector('text.end-return.tekst-' + x[0]);
      var dele = x[1].textContent.split('·');
      var navn = (dele[0] || '').trim(), note = (dele.slice(1).join('·') || '').trim();
      if (x[0] === 'sammen' && /^omregnet/.test(note)) note = 'totalafkast ' + note;
      var vaerdi = '';
      if (t) t.childNodes.forEach(function (n) { if (n.nodeType === 3) vaerdi += n.textContent; });
      vaerdi = vaerdi.trim();
      return '<div class="cr6-' + x[0] + '"><span class="cr6-navn"><i aria-hidden="true"></i>' + navn + '</span><strong>' + vaerdi + '</strong><small>' + note + '</small></div>';
    });
    ny.innerHTML = data.join('');
  }
  function graf(chart) {
    var svg = chart.querySelector('svg.chart');
    if (!svg || svg.hasAttribute('data-cr6')) return;
    svg.setAttribute('data-cr6', '');
    knapper(chart);
    forklaring(chart, svg);
    if (!MQ.matches) return;
    var w = Number(svg.getAttribute('data-width'));
    if (!(w > 140)) return;
    var hoejre = w - 10, k = (hoejre - 48) / (w - 126);
    svg.classList.add('cr6-bred');
    svg.querySelectorAll('text.end-return').forEach(function (t) { t.remove(); });
    svg.querySelectorAll('line.linje-fond, line.linje-sammen').forEach(function (l) { l.remove(); });
    svg.querySelectorAll('line.gitter, line.nul').forEach(function (l) { l.setAttribute('x2', hoejre); });
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(48 0) scale(' + k.toFixed(5) + ' 1) translate(-48 0)');
    svg.querySelectorAll('path.linje-fond, path.linje-sammen, line.chart-cursor').forEach(function (p) {
      p.setAttribute('vector-effect', 'non-scaling-stroke');
      g.appendChild(p);
    });
    svg.appendChild(g);
    var bund = Array.prototype.slice.call(svg.querySelectorAll('text')).filter(function (t) { return t.getAttribute('y') === '272'; });
    if (bund.length === 2) {
      var t0 = parseDa(bund[0].textContent), t1 = parseDa(bund[1].textContent);
      var plot = chart.querySelector('.chart-plot');
      var periode = chart.querySelector('.cr6-periode');
      if (t1 - t0 > 400 * 864e5) {
        var y0 = new Date(t0).getUTCFullYear() + 1, y1 = new Date(t1).getUTCFullYear();
        for (var y = y0; y <= y1; y++) {
          var x = 48 + (Date.UTC(y, 0, 1) - t0) / (t1 - t0) * (hoejre - 48);
          if (x < 60 || x > hoejre - 14) continue;
          var tx = document.createElementNS(NS, 'text');
          tx.setAttribute('x', x.toFixed(1));
          tx.setAttribute('y', '266');
          tx.setAttribute('text-anchor', 'middle');
          tx.textContent = String(y);
          svg.appendChild(tx);
        }
        if (!periode && plot) {
          periode = document.createElement('p');
          periode.className = 'cr6-periode';
          plot.parentElement.after(periode);
        }
        if (periode) periode.textContent = bund[0].textContent.trim() + ' til ' + bund[1].textContent.trim();
        bund.forEach(function (t) { t.remove(); });
      } else {
        bund[1].setAttribute('x', hoejre);
        if (periode) periode.remove();
      }
    }
    // Pegning og træk skal ramme den strakte kurve.
    var host = svg.parentElement;
    if (host && typeof host.onpointermove === 'function' && !host.onpointermove.__cr6) {
      var orig = host.onpointermove;
      var ny = function (e) {
        var faktor = Number(host.getAttribute('data-cr6-k')) || 1;
        var r = host.getBoundingClientRect();
        orig.call(this, { clientX: r.left + 48 + (e.clientX - r.left - 48) / faktor, clientY: e.clientY, preventDefault: function () {} });
      };
      ny.__cr6 = true;
      host.onpointermove = ny;
    }
    if (host) host.setAttribute('data-cr6-k', k.toFixed(5));
  }
  function kør() {
    var chart = document.getElementById('fund-chart');
    if (chart) graf(chart);
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    Promise.resolve().then(function () { venter = false; kør(); });
  }
  function start() {
    kør();
    var app = document.getElementById('afkast') || document.body;
    new MutationObserver(plan).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
