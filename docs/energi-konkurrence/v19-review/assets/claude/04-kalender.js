/* Graf-review punkt 4: hele afkastkalenderen med start- og igangværende måned. */
(function () {
  'use strict';
  var MDR = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  var MD = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
  function tal(v) {
    if (typeof window.n === 'function') return window.n(v, 1);
    return Number(v).toLocaleString('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
  function dato(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    return m ? m[3] + '.' + m[2] + '.' + m[1] : '';
  }
  function fond() {
    try {
      /* global data, selected */
      var f = data.funds[selected];
      return (window.REVIEW_FUNDS || []).filter(function (x) { return x.id.toLowerCase() === String(f.id).toLowerCase(); })[0];
    } catch (e) { return null; }
  }
  function celle(year, i, u) {
    var key = year.aar + '-' + String(i + 1).padStart(2, '0');
    var m = (year.maaneder || []).filter(function (x) { return x.maaned === key; })[0];
    if (!m || m.afkast == null) return '<td class="heat cr4-tom"></td>';
    var kl = ['heat', m.afkast >= 0 ? 'pos' : 'neg'];
    var titel = '';
    var start = String(u.start || '').slice(0, 7), nu = String(u.kursdato || '').slice(0, 7);
    if (m.delvis && key === start) { kl.push('cr4-start'); titel = ' title="Startperiode, fra ' + dato(u.start) + '"'; }
    else if (m.delvis && key === nu) { kl.push('cr4-nu'); titel = ' title="Igangværende måned, til ' + dato(u.kursdato) + '"'; }
    else if (m.delvis) { kl.push('cr4-nu'); }
    return '<td class="' + kl.join(' ') + '"' + titel + '>' + tal(m.afkast) + ' %</td>';
  }
  function aarTekst(year, u) {
    var v = year.afkast == null ? '—' : tal(year.afkast) + ' %';
    var sub = '';
    if (year.delvis) {
      if (String(u.start || '').slice(0, 4) === String(year.aar)) sub = 'fra start';
      else if (String(u.kursdato || '').slice(0, 4) === String(year.aar)) sub = 'år til dato';
    }
    return sub ? '<span title="' + sub + '" aria-label="' + v + ', ' + sub + '">' + v + '</span>' : v;
  }
  function byg() {
    var kal = document.getElementById('preview-calendar');
    if (!kal || kal.querySelector('table[data-cr4]')) return;
    var s = fond();
    if (!s || !s.u || !Array.isArray(s.u.kalender) || !s.u.kalender.length) return;
    var u = s.u;
    var aar = u.kalender.slice().sort(function (a, b) { return b.aar - a.aar; });
    var harStart = aar.some(function (y) { return (y.maaneder || []).some(function (m) { return m.delvis && m.maaned === String(u.start || '').slice(0, 7); }); });
    var harNu = aar.some(function (y) { return (y.maaneder || []).some(function (m) { return m.delvis && m.maaned !== String(u.start || '').slice(0, 7); }); });
    var desk = '<div class="tablewrap" tabindex="0" role="region" aria-label="Månedlige afkast; rul vandret på små skærme"><table data-cr4><thead><tr><th>År</th><th>Årsafkast</th>' +
      MDR.map(function (m) { return '<th>' + m + '</th>'; }).join('') + '</tr></thead><tbody>' +
      aar.map(function (y) {
        return '<tr><th>' + y.aar + '</th><td class="annual">' + aarTekst(y, u) + '</td>' + MDR.map(function (_, i) { return celle(y, i, u); }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    var mob = '<table class="widget-calendar-mobile" data-cr4><thead><tr><th>Måned</th>' + aar.map(function (y) { return '<th>' + y.aar + '</th>'; }).join('') + '</tr></thead><tbody>' +
      MDR.map(function (lab, i) { return '<tr><th>' + lab + '</th>' + aar.map(function (y) { return celle(y, i, u); }).join('') + '</tr>'; }).join('') +
      '<tr class="widget-calendar-year"><th>Året</th>' + aar.map(function (y) { return '<td>' + aarTekst(y, u) + '</td>'; }).join('') + '</tr></tbody></table>';
    var forkl = '<ul class="cr4-forklaring" aria-label="Forklaring">' +
      '<li><i class="cr4-f-pos"></i>Plus</li><li><i class="cr4-f-neg"></i>Minus</li>' +
      (harStart ? '<li><i class="cr4-f-start"></i>Startperiode, fra ' + dato(u.start) + '</li>' : '') +
      (harNu ? '<li><i class="cr4-f-nu"></i>Igangværende måned</li>' : '') + '</ul>';
    kal.innerHTML = desk + mob + forkl;
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    Promise.resolve().then(function () { venter = false; byg(); });
  }
  function start() {
    byg();
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
