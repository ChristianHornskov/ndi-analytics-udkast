/* Punkt 19: placering i fonden og temaet på selskabssiderne.
   Tallene læses fra window.DAGENS_TAL, så de følger fondens data. Mangler data,
   bliver siden som den er. */
(function () {
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst != null) e.textContent = tekst; return e; }
  function pct(v) { return v.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %'; }
  function side(slug) { var s = (window.NDI_DATA || {}).sider; return !s || s[slug] === true; }
  function start() {
    var T = window.DAGENS_TAL;
    var fig = document.querySelector('#aktien figure.rang[data-aktiv-slug]');
    if (!T || !T.selskaber || !T.temaer || !fig || fig.dataset.crRang) return;
    var slug = fig.getAttribute('data-aktiv-slug'), d = T.selskaber[slug];
    if (!d || !d.tema) return;
    var tema = null;
    T.temaer.forEach(function (t) { if (t.id === d.tema) tema = t; });
    if (!tema || !tema.selskaber || !tema.selskaber.length) return;
    var liste = tema.selskaber.slice(); // datalaget leverer listen sorteret efter andel
    var plads = 0;
    liste.forEach(function (s, i) { if (s.slug === slug) plads = i + 1; });
    if (!plads) return;
    fig.dataset.crRang = '1';

    // Placeringer under det store tal
    var tal = document.querySelector('#aktien .v18-stortal-tal');
    if (tal && !tal.querySelector('.cr-rang-chips')) {
      var ul = el('ul', 'cr-rang-chips');
      if (d.fondsPlads) {
        var a = el('li'); a.appendChild(el('b', null, 'Nr. ' + d.fondsPlads)); a.appendChild(document.createTextNode(' i fonden')); ul.appendChild(a);
      }
      var b = el('li'); b.appendChild(el('b', null, 'Nr. ' + plads + ' af ' + liste.length)); b.appendChild(document.createTextNode(' i temaet '));
      var tl = el('a', null, d.temaNavn || tema.navn); tl.href = '../temaer/' + tema.id + '.html'; b.appendChild(tl);
      ul.appendChild(b);
      var tekst = tal.querySelector('.v18-stortal-tekst');
      tal.insertBefore(ul, tekst ? tekst.nextSibling : tal.querySelector('.kildelinje'));
    }

    // Kort navneliste i stedet for søjlerne
    var vis = [];
    if (plads <= 5) vis = liste.slice(0, Math.min(5, liste.length)).map(function (s, i) { return [s, i + 1]; });
    else {
      vis = [[liste[0], 1], [liste[1], 2], null];
      for (var i = Math.max(3, plads - 2); i <= Math.min(liste.length, plads + 1); i++) vis.push([liste[i - 1], i]);
      if (plads - 2 <= 3) vis.splice(2, 1);
    }
    var maks = liste[0].andel || 1;
    var boks = el('div', 'cr-rang v18-stortal-figur');
    boks.appendChild(el('p', 'cr-rang-lab', 'Temaets selskaber efter andel'));
    var ol = el('ol');
    vis.forEach(function (r) {
      if (!r) { var g = el('li', 'cr-hul'); g.setAttribute('aria-hidden', 'true'); g.textContent = '…'; ol.appendChild(g); return; }
      var s = r[0], li = el('li', s.slug === slug ? 'cr-mig' : null);
      if (s.slug === slug) li.setAttribute('aria-current', 'true');
      li.appendChild(el('span', 'cr-p', String(r[1])));
      var n = el('span', 'cr-n');
      if (s.slug && s.slug !== slug && side(s.slug)) { var l = el('a', null, s.navn); l.href = s.slug + '.html'; n.appendChild(l); }
      else n.textContent = s.navn;
      li.appendChild(n);
      var bar = el('i'); bar.setAttribute('aria-hidden', 'true'); bar.style.setProperty('--w', Math.max(2, s.andel / maks * 100).toFixed(0) + '%');
      li.appendChild(bar);
      li.appendChild(el('b', null, pct(s.andel)));
      ol.appendChild(li);
    });
    boks.appendChild(ol);
    if (liste.length > vis.filter(Boolean).length) {
      var note = el('p', 'cr-rang-note');
      var nl = el('a', 'tekstlink', 'Se alle ' + liste.length + ' selskaber i temaet'); nl.href = '../temaer/' + tema.id + '.html';
      note.appendChild(nl); boks.appendChild(note);
    }
    fig.hidden = true;
    fig.parentNode.insertBefore(boks, fig);
    var fold = document.querySelector('#aktien details.v18-flere-tal');
    if (fold) fold.hidden = true;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
