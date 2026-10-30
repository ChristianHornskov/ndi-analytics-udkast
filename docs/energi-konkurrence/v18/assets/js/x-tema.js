

(function () {
  'use strict';
  var LIVE = false;
  var VIS = 6;
  

  var WIDGETS = 'https://platform.twitter.com/widgets.js', wp = null, pladser = [];
  function tema() { return document.documentElement.getAttribute('data-tema') === 'lys' ? 'light' : 'dark'; }
  function widgets() {
    if (wp) return wp;
    wp = new Promise(function (ok, nej) {
      if (window.twttr && window.twttr.widgets) return ok(window.twttr);
      var sc = document.createElement('script'); sc.src = WIDGETS; sc.async = true; sc.charset = 'utf-8';
      sc.onload = function () { if (window.twttr && window.twttr.ready) window.twttr.ready(ok); else nej(new Error('twttr')); };
      sc.onerror = nej; document.head.appendChild(sc);
    });
    return wp;
  }
  function indlejr(p) {
    var id = p.getAttribute('data-x-id'); if (!/^\d+$/.test(id || '')) return;
    var t = tema(); if (p.getAttribute('data-x-vist') === t) return;
    p.setAttribute('data-x-vist', t);
    widgets().then(function (tw) {
      var gl = p.querySelector('.x-embed-ramme'); if (gl) gl.remove();
      var ramme = el('div', 'x-embed-ramme'); p.appendChild(ramme);
      return tw.widgets.createTweet(id, ramme, { theme: t, dnt: true, conversation: 'none', align: 'center', lang: 'da' }).then(function (f) {
        if (!f) throw new Error('tom');
        p.classList.add('x-embed--klar');
      });
    }).catch(function () { p.classList.add('x-embed--fejl'); p.classList.remove('x-embed--henter'); p.removeAttribute('data-x-vist'); var b = p.querySelector('.x-embed-hent'); if (b) { b.disabled = false; b.textContent = 'Prøv igen'; } });
  }
   
  var MOBIL = window.matchMedia ? window.matchMedia('(max-width: 599.98px)') : { matches: false };
  function observer(p) {
    pladser.push(p);
    if (MOBIL.matches) {
      if (p.querySelector('.x-embed-hent')) return;
      var f = p.querySelector('.x-embed-vent');
      var b = el('button', 'knap knap--rolig x-embed-hent', 'Vis opslaget her'); b.type = 'button';
      b.addEventListener('click', function () { b.disabled = true; b.textContent = 'Henter opslaget …'; p.classList.add('x-embed--henter'); indlejr(p); });
      (f || p).appendChild(b);
      return;
    }
    if (!('IntersectionObserver' in window)) return indlejr(p);
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); indlejr(p); } }); }, { rootMargin: '600px 0px' });
    io.observe(p);
  }
  function plads(id, url) {
    var p = el('div', 'x-embed'); p.setAttribute('data-x-id', id);
     
    var f = el('div', 'x-embed-vent lille');
    var t = el('span', null, MOBIL.matches ? 'Opslaget hentes først fra X, når du trykker. ' : 'Opslaget hentes fra X. Virker det ikke, kan du ');
    var a = el('a', 'tekstlink', MOBIL.matches ? 'Se opslaget på X' : 'åbne det på X'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    t.appendChild(a); t.appendChild(document.createTextNode('.')); f.appendChild(t); p.appendChild(f);
    return p;
  }
  document.addEventListener('ndi:tema', function () {
    pladser.forEach(function (p) { if (p.getAttribute('data-x-vist')) { p.classList.remove('x-embed--klar'); indlejr(p); } });
  });
  window.NDI_X_EMBED = { plads: plads, observer: observer };
  var KATEGORI = { product: 'Produkt', contract: 'Aftale', earnings: 'Regnskab', criticism: 'Kritik', technology: 'Teknologi', regulation: 'Regler' };
  var KILDE = { official: 'selskabets egen konto', independent: 'uafhængig konto', employee: 'medarbejder' };
  function dato(iso, medKl) {
    var d = new Date(iso); if (isNaN(d)) return '';
    var o = { timeZone: 'Europe/Copenhagen', day: '2-digit', month: '2-digit', year: 'numeric' };
    if (medKl) { o.hour = '2-digit'; o.minute = '2-digit'; }
    return d.toLocaleString('da-DK', o).replace(',', ' kl.');
  }
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst != null) e.textContent = tekst; return e; }
  function godkendte(feed, sel) {
    var ud = [];
    sel.forEach(function (s) {
      var c = feed.companies && feed.companies[s.isin];
      if (!c || c.status !== 'ok' || !Array.isArray(c.posts)) return;
      c.posts.forEach(function (p) { if (p && p.checked_at && /^https:\/\/x\.com\//.test(p.url || '')) ud.push({ p: p, s: s }); });
    });
    return ud.sort(function (a, b) { return String(b.p.published_at).localeCompare(String(a.p.published_at)); }).slice(0, VIS);
  }
  function fejl(sek) {
    var st = sek.querySelector('.x-tema-status');
    st.textContent = 'X-opslagene kan ikke hentes lige nu. Prøv igen senere.';
    st.classList.add('x-tema-status--fejl');
  }
  function vis(sek, feed, live) {
    if (!feed || feed.kind !== 'ndi.x.curated' || !feed.companies) return fejl(sek);
    var rel = sek.getAttribute('data-x-rel') || '';
    var sel = JSON.parse(sek.getAttribute('data-x-selskaber') || '[]');
    var vis = parseInt(sek.getAttribute('data-x-vis'), 10) || VIS;
    var hits = godkendte(feed, sel).slice(0, vis);
    var egen = sek.hasAttribute('data-x-selskab');
    var st = sek.querySelector('.x-tema-status'), ul = sek.querySelector('.x-tema-liste'), kl = sek.querySelector('.x-tema-kilde');
    if (!hits.length && egen) { sek.hidden = true; return; }
    if (!hits.length) { st.textContent = 'Der er ingen godkendte X-opslag om selskaberne i temaet lige nu.'; }
    else {
      st.hidden = true; sek.hidden = false; var pending = [];
      hits.forEach(function (h) {
        var li = el('li', 'x-tema-opslag');
        var top = el('p', 'x-tema-hoved');
        top.appendChild(el('strong', null, '@' + (h.p.author_handle || 'X')));
        var meta = [dato(h.p.published_at), KILDE[h.p.source_type]].filter(Boolean).join(' · ');
        if (meta) top.appendChild(el('span', 'x-tema-meta', ' · ' + meta));
        li.appendChild(top);
        var om = el('p', 'x-tema-om');
        if (KATEGORI[h.p.category]) om.appendChild(el('span', 'x-tema-kat', KATEGORI[h.p.category]));
        if (!egen) {
          om.appendChild(document.createTextNode('Om '));
          if (h.s.slug && ((window.NDI_DATA || {}).sider || {})[h.s.slug] === true) { var a = el('a', 'tekstlink', h.s.navn); a.href = rel + 'selskaber/' + h.s.slug + '.html'; om.appendChild(a); }
          else om.appendChild(document.createTextNode(h.s.navn));    
        }
        if (om.childNodes.length) li.appendChild(om);
        var pl = h.p.post_id ? plads(String(h.p.post_id), h.p.url) : null;
        if (pl) li.appendChild(pl);
        var x = el('a', 'tekstlink tekstlink--tryk x-tema-link', 'Se opslaget på X'); x.href = h.p.url; x.target = '_blank'; x.rel = 'noopener noreferrer';
        li.appendChild(x);
        ul.appendChild(li);
        if (pl) pending.push(pl);
      });
      ul.hidden = false;
      pending.forEach(observer);
    }
    kl.textContent = 'Kilde: NewDeal Invests kuraterede X-feed, ' + (live ? 'hentet nu' : 'øjebliksbillede') + ', opdateret ' + dato(feed.updated_at, true) + '. Udvalgt af X-kontrol.';
    kl.hidden = false;
  }
  function start() {
     
    document.querySelectorAll('.x-embed[data-x-id]').forEach(observer);
    var sek = document.querySelectorAll('[data-x-tema]'); if (!sek.length) return;
    var hent = (window.NDI_X_SNAPSHOT ? Promise.resolve(window.NDI_X_SNAPSHOT) : Promise.reject(new Error('intet øjebliksbillede')));
    hent.then(function (f) { sek.forEach(function (s) { vis(s, f, LIVE); }); })
        .catch(function () { sek.forEach(fejl); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
