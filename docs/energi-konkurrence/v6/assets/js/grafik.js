
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
    p.prikker.forEach(function (q) {
      var c = el("circle", { cx: q.cx, cy: q.cy, r: q.r, "class": "prik" + (aktiv && q.tema !== aktiv ? " prik--ude" : ""), "data-gruppe": q.tema }, g);
      if (!aktiv) el("title", {}, c).textContent = q.navn;
    });
    /* v12 (F-119): det lille prikkort får et kort navn under hver klynge (tekst fra dagens-tal.json) */
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
    /* v12 (F-118): etiketten vender ind mod figuren, så den ikke går ud over kanten (kun placering, ingen tal) */
    var alle = box.querySelectorAll(".rang-soejle"), i = Array.prototype.indexOf.call(alle, s);
    if (i > alle.length / 2) s.classList.add("rang-soejle--etiket-venstre");
  }

  function tegn(e) {
    var d = (e && e.detail) || window.NDI_TAL;
    if (!d) return;
    document.querySelectorAll("svg[data-prikkort]").forEach(function (s) { prikkort(s, d); });
    document.querySelectorAll("svg[data-halvring]").forEach(function (s) { halvring(s, d); });
    document.querySelectorAll("svg[data-verden]").forEach(function (s) { verden(s, d); });
    document.querySelectorAll("[data-aktiv-slug]").forEach(rang);
  }
  document.addEventListener("ndi:tal", tegn);
  if (window.NDI_TAL) tegn();
})();
