/* Graf-review punkt 5: kortet over selskabernes hjemsted. */
/* global geography, data, selected */
(function () {
  'use strict';
  var DA = {
    'United States': 'USA', 'United States of America': 'USA', 'Japan': 'Japan', 'Canada': 'Canada', 'Israel': 'Israel',
    'Germany': 'Tyskland', 'Singapore': 'Singapore', 'South Korea': 'Sydkorea', 'Korea': 'Sydkorea', 'United Kingdom': 'Storbritannien',
    'Netherlands': 'Nederlandene', 'Switzerland': 'Schweiz', 'Sweden': 'Sverige', 'Australia': 'Australien', 'France': 'Frankrig',
    'China': 'Kina', 'Taiwan': 'Taiwan', 'Thailand': 'Thailand', 'Uruguay': 'Uruguay', 'Austria': 'Østrig', 'Hong Kong': 'Hongkong',
    'Brazil': 'Brasilien', 'Bulgaria': 'Bulgarien', 'Mexico': 'Mexico', 'Norway': 'Norge', 'Cayman Islands': 'Caymanøerne',
    'Poland': 'Polen', 'Kazakhstan': 'Kasakhstan', 'Ireland': 'Irland', 'Italy': 'Italien', 'Denmark': 'Danmark', 'Finland': 'Finland',
    'Belgium': 'Belgien', 'Spain': 'Spanien', 'Portugal': 'Portugal', 'India': 'Indien', 'Luxembourg': 'Luxembourg', 'Bermuda': 'Bermuda',
    'Argentina': 'Argentina', 'Chile': 'Chile', 'Indonesia': 'Indonesien', 'Malaysia': 'Malaysia', 'Philippines': 'Filippinerne',
    'Vietnam': 'Vietnam', 'New Zealand': 'New Zealand', 'South Africa': 'Sydafrika', 'Greece': 'Grækenland', 'Turkey': 'Tyrkiet',
    'Czech Republic': 'Tjekkiet', 'Czechia': 'Tjekkiet', 'Hungary': 'Ungarn', 'Romania': 'Rumænien', 'Iceland': 'Island', 'Estonia': 'Estland',
    'Lithuania': 'Litauen', 'Latvia': 'Letland', 'Cyprus': 'Cypern', 'Malta': 'Malta', 'Jersey': 'Jersey', 'Guernsey': 'Guernsey',
    'Isle of Man': 'Isle of Man', 'Macau': 'Macao', 'Monaco': 'Monaco', 'United Arab Emirates': 'De Forenede Arabiske Emirater',
    'Saudi Arabia': 'Saudi-Arabien', 'Russia': 'Rusland', 'Ukraine': 'Ukraine', 'Colombia': 'Colombia', 'Peru': 'Peru', 'Bahamas': 'Bahamas',
    'Puerto Rico': 'Puerto Rico', 'Curacao': 'Curaçao', 'British Virgin Islands': 'De Britiske Jomfruøer', 'Egypt': 'Egypten', 'Nigeria': 'Nigeria'
  };
  var KORT = { 'United States of America': 'United States', 'Republic of Korea': 'South Korea', 'Korea': 'South Korea', 'Czechia': 'Czech Republic' };
  var POS = {
    'Singapore': [103.8, 1.35], 'Hong Kong': [114.2, 22.3], 'Cayman Islands': [-81.3, 19.3], 'Israel': [35, 31.4], 'Taiwan': [121, 23.7],
    'Luxembourg': [6.1, 49.8], 'Bermuda': [-64.8, 32.3], 'Monaco': [7.4, 43.7], 'Malta': [14.4, 35.9], 'Jersey': [-2.1, 49.2],
    'Guernsey': [-2.6, 49.5], 'Isle of Man': [-4.5, 54.2], 'Macau': [113.5, 22.2], 'Curacao': [-69, 12.2], 'Bahamas': [-77.4, 25],
    'British Virgin Islands': [-64.6, 18.4], 'Cyprus': [33.2, 35], 'Puerto Rico': [-66.5, 18.2], 'Switzerland': [8.2, 46.8],
    'Netherlands': [5.5, 52.2], 'South Korea': [127.8, 36.3], 'Ireland': [-8, 53.3], 'Belgium': [4.6, 50.6]
  };
  var LILLE = 30; // flader under dette areal (viewBox-enheder) får en prik
  var valgt = null;
  var NS = 'http://www.w3.org/2000/svg';
  function da(navn) { return DA[navn] || navn; }
  function pct(v, d) { return Number(v).toLocaleString('da-DK', { minimumFractionDigits: d, maximumFractionDigits: d }) + ' %'; }
  function rækker() {
    try {
      var r = geography.funds[data.funds[typeof selected === 'number' ? selected : 0].id] || geography.funds[data.funds[0].id];
      return Array.isArray(r) ? r : [];
    } catch (e) { return []; }
  }
  function lande() {
    var agg = {};
    rækker().forEach(function (r) {
      var w = Number(r.weight);
      if (!r.country || !Number.isFinite(w)) return;
      var k = KORT[r.country] || r.country;
      if (!agg[k]) agg[k] = { navn: k, vaegt: 0, rows: [] };
      agg[k].vaegt += w;
      agg[k].rows.push(r);
    });
    return agg;
  }
  function farve(w, lo, hi) {
    var t = hi > lo ? (Math.log(w) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) : 1;
    t = Math.max(0, Math.min(1, t));
    var a = [47, 74, 83], b = [195, 236, 240];
    return 'rgb(' + a.map(function (x, i) { return Math.round(x + (b[i] - x) * t); }).join(',') + ')';
  }
  function tegnKort(svg, agg) {
    var vægte = Object.keys(agg).map(function (k) { return agg[k].vaegt; }).filter(function (w) { return w > 0; });
    if (!vægte.length) return null;
    var lo = Math.max(0.05, Math.min.apply(null, vægte)), hi = Math.max.apply(null, vægte);
    var harFlade = {};
    svg.querySelectorAll('path').forEach(function (p) {
      var t = p.querySelector('title');
      if (!t) return;
      var engelsk = t.textContent.split(':')[0].trim();
      var k = KORT[engelsk] || engelsk;
      p.setAttribute('data-cr5', k);
      var l = agg[k];
      t.textContent = da(engelsk) + ': ' + pct(l ? l.vaegt : 0, 1) + ' af formuen';
      if (l && l.vaegt > 0) {
        p.setAttribute('fill', farve(l.vaegt, lo, hi));
        p.classList.add('cr5-aktiv');
        var bb = { width: 0, height: 0 };
        try { bb = p.getBBox(); } catch (e) { /* intet */ }
        harFlade[k] = bb.width * bb.height;
      }
    });
    var gruppe = document.createElementNS(NS, 'g');
    gruppe.setAttribute('class', 'cr5-prikker');
    Object.keys(agg).forEach(function (k) {
      var l = agg[k];
      if (!(l.vaegt > 0)) return;
      if (harFlade[k] != null && harFlade[k] >= LILLE) return;
      var pos = POS[k];
      if (!pos) return;
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', (2 * pos[0] + 360).toFixed(1));
      c.setAttribute('cy', (178.3 - 2.094 * pos[1]).toFixed(1));
      c.setAttribute('r', (2.6 + Math.sqrt(l.vaegt) * 2.1).toFixed(1));
      c.setAttribute('fill', farve(l.vaegt, lo, hi));
      c.setAttribute('data-cr5', k);
      c.setAttribute('class', 'cr5-prik cr5-aktiv');
      var t = document.createElementNS(NS, 'title');
      t.textContent = da(k) + ': ' + pct(l.vaegt, 1) + ' af formuen';
      c.appendChild(t);
      gruppe.appendChild(c);
    });
    svg.appendChild(gruppe);
    return [lo, hi];
  }
  function boks(geo, agg) {
    var b = geo.querySelector('.cr5-valgt');
    if (!b) {
      b = document.createElement('div');
      b.className = 'cr5-valgt';
      b.setAttribute('aria-live', 'polite');
      var map = geo.querySelector('#hq-map');
      if (!map) return null;
      map.appendChild(b);
    }
    var l = valgt && agg[valgt];
    if (!l) { b.hidden = true; return b; }
    b.hidden = false;
    var top = l.rows.slice().sort(function (a, c) { return c.weight - a.weight; }).slice(0, 4);
    var antal = l.rows.length;
    b.innerHTML = '<span class="cr5-etiket">Valgt land</span><p class="cr5-hoved"><strong>' + pct(l.vaegt, 1) + '</strong><span>af fonden har hovedsæde i <b>' +
      da(l.navn) + '</b> · ' + antal + (antal === 1 ? ' selskab' : ' selskaber') + '</span></p>' +
      '<p class="cr5-top">' + (antal === 1 ? 'Selskab: ' : 'Største: ') + top.map(function (r) {
        return String(r.holdingName || r.name || '').replace(/[<>&]/g, '') + ' ' + pct(r.weight, 2);
      }).join(', ') + '</p>' +
      '<button type="button" class="cr5-alle">Vis alle lande</button>';
    return b;
  }
  function liste(geo) {
    var knapper = Array.prototype.slice.call(geo.querySelectorAll('.country-pick[data-hq]'));
    if (!knapper.length) return;
    var holder = knapper[0].parentElement.closest('div') || knapper[0].parentElement;
    if (holder.tagName === 'DETAILS') holder = holder.parentElement;
    holder.classList.add('cr5-liste');
    var details = holder.querySelector('details');
    var synlige = matchMedia('(max-width:700px)').matches ? 10 : 16;
    knapper.forEach(function (k, i) {
      var span = k.querySelector('span');
      var eng = k.getAttribute('data-hq');
      if (span) span.textContent = da(eng);
      if (!details) return;
      if (i < synlige && k.parentElement === details) details.before(k);
      else if (i >= synlige && k.parentElement !== details) details.appendChild(k);
    });
    if (details) {
      var rest = details.querySelectorAll('.country-pick').length;
      var sum = details.querySelector('summary');
      if (sum) sum.textContent = 'Vis ' + rest + ' øvrige lande';
      details.hidden = rest === 0;
    }
  }
  function marker(geo) {
    geo.querySelectorAll('.country-pick[data-hq]').forEach(function (k) {
      var on = (KORT[k.getAttribute('data-hq')] || k.getAttribute('data-hq')) === valgt;
      k.classList.toggle('cr5-on', on);
      k.setAttribute('aria-pressed', String(on));
    });
    geo.querySelectorAll('#hq-map [data-cr5]').forEach(function (p) {
      p.classList.toggle('cr5-on', p.getAttribute('data-cr5') === valgt);
    });
    var on = geo.querySelectorAll('#hq-map .cr5-on');
    on.forEach(function (p) { p.parentNode.appendChild(p); });
    var prikker = geo.querySelector('.cr5-prikker');
    if (prikker) prikker.parentNode.appendChild(prikker);
  }
  function legende(geo, skala) {
    var map = geo.querySelector('#hq-map');
    if (!map || !skala) return;
    var lg = map.querySelector('.cr5-legende');
    if (!lg) {
      lg = document.createElement('div');
      lg.className = 'cr5-legende';
      var svg = map.querySelector('svg');
      svg.after(lg);
    }
    lg.innerHTML = '<span>' + pct(skala[0], 1) + '</span><i aria-hidden="true"></i><span>' + pct(skala[1], 0) + '</span>' +
      '<p>Farven følger vægten på en logaritmisk skala. Prikker viser lande, der er for små til at ses.</p>';
    map.querySelectorAll(':scope > p.small.muted').forEach(function (p) {
      if (/Lysere farve/.test(p.textContent)) p.classList.add('cr5-skjul');
    });
  }
  function kør() {
    var geo = document.getElementById('geography-review');
    if (!geo) return;
    var svg = geo.querySelector('#hq-map svg');
    if (!svg || svg.hasAttribute('data-cr5-klar')) return;
    var agg = lande();
    if (!Object.keys(agg).length) return;
    svg.setAttribute('data-cr5-klar', '');
    var skala = tegnKort(svg, agg);
    if (!valgt || !agg[valgt]) {
      valgt = Object.keys(agg).sort(function (a, b) { return agg[b].vaegt - agg[a].vaegt; })[0];
    }
    liste(geo);
    legende(geo, skala);
    boks(geo, agg);
    marker(geo);
    var guide = geo.querySelector('.analysis-geo-guide');
    if (guide) guide.classList.add('cr5-skjul');
    if (!geo.hasAttribute('data-cr5-klik')) {
      geo.setAttribute('data-cr5-klik', '');
      geo.addEventListener('click', function (e) {
        var alle = e.target.closest('.cr5-alle');
        if (alle) {
          var d = geo.querySelector('.cr5-liste details');
          if (d) d.open = true;
          var f = geo.querySelector('.country-pick');
          if (f) f.focus();
          return;
        }
        var k = e.target.closest('.country-pick[data-hq], #hq-map .cr5-aktiv[data-cr5]');
        if (!k) return;
        var navn = k.getAttribute('data-cr5') || k.getAttribute('data-hq');
        valgt = KORT[navn] || navn;
        var a = lande();
        boks(geo, a);
        marker(geo);
      });
    }
  }
  var venter = false;
  function plan() {
    if (venter) return;
    venter = true;
    requestAnimationFrame(function () { venter = false; kør(); });
  }
  var sidsteMobil = null;
  function start() {
    kør();
    new MutationObserver(plan).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', function () {
      var m = matchMedia('(max-width:700px)').matches;
      if (m === sidsteMobil) return;
      sidsteMobil = m;
      var geo = document.getElementById('geography-review');
      if (geo) liste(geo);
    });
    sidsteMobil = matchMedia('(max-width:700px)').matches;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
