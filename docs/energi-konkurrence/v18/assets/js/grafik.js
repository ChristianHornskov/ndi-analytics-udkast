/* grafik.js (v11, fase B2): tegner prikkort, halvring og verdenskort ud fra data/dagens-tal.json.
   Alle koordinater, radier og buer er regnet på forhånd i _kilde/grafik_data.py. Her sættes kun attributter.
   Tekstudgaven af tallene står i HTML ved siden af hver figur (datalag.js fylder den). */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  function el(navn, attr, far) {
    var e = document.createElementNS(NS, navn);
    Object.keys(attr).forEach(function (k) { if (attr[k] !== null && attr[k] !== undefined) e.setAttribute(k, attr[k]); });
    if (far) far.appendChild(e);
    return e;
  }
  function tom(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  /* Prikkort: <svg data-prikkort="prikkort.bred" [data-aktiv-tema="id"] [data-etiketter]> */
  function prikkort(svg, d) {
    var p = window.NDI_DATALAG.slaaOp(d, svg.getAttribute("data-prikkort"));
    if (!p) return;
    var g = svg.querySelector(".prikkort-lag") || el("g", { "class": "prikkort-lag" }, svg);
    tom(g);
    svg.setAttribute("viewBox", "0 0 " + p.bredde + " " + p.hoejde);
    var aktiv = svg.getAttribute("data-aktiv-tema");
    
    var kNr = {}, iKl = {};
    p.klynger.forEach(function (k, i) { kNr[k.id] = i; });
    p.prikker.forEach(function (q) {
      var j = iKl[q.tema] = (iKl[q.tema] || 0) + 1;
      var c = el("circle", { cx: q.cx, cy: q.cy, r: q.r, "class": "prik" + (aktiv && q.tema !== aktiv ? " prik--ude" : ""), "data-gruppe": q.tema,
        style: "--pd:" + ((kNr[q.tema] || 0) * 90 + (j % 12) * 22) + "ms" }, g);
      if (!aktiv) el("title", {}, c).textContent = q.navn;
    });
    
    if (svg.hasAttribute("data-kortnavne")) {
      var ng = svg.querySelector(".prikkort-navne") || el("g", { "class": "prikkort-navne", "aria-hidden": "true" }, svg);
      tom(ng);
      p.klynger.forEach(function (k) {
        var tx = el("text", { x: k.x, y: k.y2, "text-anchor": "middle", "class": "prikkort-kortnavn" + (k.id === aktiv ? " er-aktiv" : "") }, ng);
        tx.textContent = k.kort;
      });
    }
    if (svg.hasAttribute("data-etiketter")) {
      var tema = {};
      d.temaer.forEach(function (t) { tema[t.id] = t; });
      var rod = svg.getAttribute("data-rod") || "";
      var lg = svg.querySelector(".prikkort-links");
      if (!lg) { lg = el("g", { "class": "prikkort-links" }); svg.insertBefore(lg, g); }
      tom(lg);
      p.klynger.forEach(function (k) {
        var t = tema[k.id];
        var a = el("a", { href: rod + k.link, "class": "prikkort-link" }, lg);
        el("rect", { x: k.fx, y: k.fy, width: k.fb, height: k.fh, "class": "prikkort-flade" }, a);
        el("title", {}, a).textContent = k.navn + ": " + window.NDI_DATALAG.format(t.antal, "heltal") + " selskaber, " + window.NDI_DATALAG.format(t.andel, "pct") + " af fonden";
        var t1 = el("text", { x: k.x, y: k.y1, "text-anchor": "middle", "class": "prikkort-navn" }, a);
        t1.textContent = k.navn;
        var t2 = el("text", { x: k.x, y: k.y2, "text-anchor": "middle", "class": "prikkort-tal" }, a);
        t2.textContent = window.NDI_DATALAG.format(t.antal, "heltal") + " selskaber · " + window.NDI_DATALAG.format(t.andel, "pct");
        /* v17 (punkt 9): peg på et tema, så lyser dets streger op */
        /* v17: peg på et tema, så fremhæves dets streger, og de andre dæmpes */
        function fokus(id) {
          if (id) svg.setAttribute("data-fokus", id); else svg.removeAttribute("data-fokus");
          svg.querySelectorAll(".traad").forEach(function (t) { t.classList.toggle("er-naer", !!id && (t.getAttribute("data-fra") === id || t.getAttribute("data-til") === id)); });
        }
        a.addEventListener("mouseenter", function () { fokus(k.id); });
        a.addEventListener("focus", function () { fokus(k.id); });
        a.addEventListener("mouseleave", function () { fokus(null); });
        a.addEventListener("blur", function () { fokus(null); });
      });
    }
    /* v17 (punkt 9): streger mellem temaerne. Stierne og bredderne står færdige i dagens-tal.json (prikkort.*.traade). */
    if (svg.hasAttribute("data-traade") && p.traade) {
      var tg = svg.querySelector(".prikkort-traade");
      if (!tg) { tg = el("g", { "class": "prikkort-traade", "aria-hidden": "true" }); svg.insertBefore(tg, g); }
      tom(tg);
      var nv = {};
      d.temaer.forEach(function (t) { nv[t.id] = t.navn; });
      p.traade.forEach(function (q, i) {
        var s = el("path", { d: q.d, "stroke-width": q.w, "class": "traad traad--" + q.styrke, "data-fra": q.fra, "data-til": q.til, style: "--i:" + i }, tg);
        el("title", {}, s).textContent = nv[q.fra] + " og " + nv[q.til] + ": " + window.NDI_DATALAG.format(q.antal, "antal", { dataset: { en: "selskab", fl: "selskaber" } });
      });
    }
  }

  /* Halvring: <svg data-halvring="top10.halvring"> med <path class="halvring-spor"> og <path class="halvring-bue"> */
  function halvring(svg, d) {
    var h = window.NDI_DATALAG.slaaOp(d, svg.getAttribute("data-halvring"));
    if (!h) return;
    svg.querySelector(".halvring-spor").setAttribute("d", h.spor);
    svg.querySelector(".halvring-bue").setAttribute("d", h.bue);
  }

  /* Verdenskort: <svg data-verden="verden"> */
  function verden(svg, d) {
    var v = window.NDI_DATALAG.slaaOp(d, svg.getAttribute("data-verden"));
    if (!v) return;
    svg.setAttribute("viewBox", "0 0 " + v.bredde + " " + v.hoejde);
    var g = svg.querySelector(".verden-lag") || el("g", { "class": "verden-lag" }, svg);
    tom(g);
    el("path", { d: v.land, "class": "verden-baggrund" }, g);
    v.lande.forEach(function (l) {
      var c = el("circle", { cx: l.cx, cy: l.cy, r: l.r, "class": "verdens-prik" }, g);
      el("title", {}, c).textContent = l.navn + ": " + window.NDI_DATALAG.format(l.antal, "heltal") + " selskaber, " + window.NDI_DATALAG.format(l.andel, "pct");
    });
  }

  /* Rangfigur: markér det aktuelle selskab blandt temaets søjler (opslag, ingen beregning). */
  function rang(box) {
    var slug = box.getAttribute("data-aktiv-slug");
    var s = box.querySelector('[data-slug="' + slug + '"]');
    if (!s) return;
    s.classList.add("rang-soejle--aktiv");
    
    var alle = box.querySelectorAll(".rang-soejle"), i = Array.prototype.indexOf.call(alle, s);
    if (i > alle.length / 2) s.classList.add("rang-soejle--etiket-venstre");
  }

  /* 30.10: prikkortet animeres, når det kommer ind på skærmen (også på mobil). Reduceret bevægelse: slutbilledet (CSS). */
  function vent(svg) {
    if (svg.hasAttribute("data-vent")) return;
    svg.setAttribute("data-vent", "");
    if (!("IntersectionObserver" in window)) { svg.classList.add("er-synlig"); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { svg.classList.add("er-synlig"); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(svg);
  }

  function tegn(e) {
    var d = (e && e.detail) || window.NDI_TAL;
    if (!d) return;
    document.querySelectorAll("svg[data-prikkort]").forEach(function (s) { prikkort(s, d); vent(s); });
    document.querySelectorAll("svg[data-halvring]").forEach(function (s) { halvring(s, d); });
    document.querySelectorAll("svg[data-verden]").forEach(function (s) { verden(s, d); });
    document.querySelectorAll("[data-aktiv-slug]").forEach(rang);
  }
  document.addEventListener("ndi:tal", tegn);
  if (window.NDI_TAL) tegn();
})();
