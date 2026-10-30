

(function () {
  "use strict";
  var midte = document.getElementById("ring-midte");
  if (!midte) return;
  var NS = "http://www.w3.org/2000/svg";
  function start(e) {
  var g = document.getElementById("ring-segmenter");
  if (g) e.detail.temaer.forEach(function (t) {
    var p = document.createElementNS(NS, "path");
    p.setAttribute("class", "ring-seg"); p.setAttribute("data-tema", t.id); p.setAttribute("data-trin", t.plads);
    p.setAttribute("d", t.ringSti); g.appendChild(p);
  });
  var segs = Array.prototype.slice.call(document.querySelectorAll(".ring-seg"));
  var raekker = Array.prototype.slice.call(document.querySelectorAll(".legende-raekke"));
  var ikon = midte.querySelector(".ring-ikon use"), navn = midte.querySelector(".ring-navn"), tal = midte.querySelector(".ring-tal");
  var start = { i: ikon && ikon.getAttribute("href"), n: navn.textContent, t: tal.textContent };
  function vis(id, r) {
    segs.forEach(function (s) { s.classList.toggle("er-valgt", s.dataset.tema === id); });
    document.documentElement.classList.toggle("ring-har-valg", !!id);
    raekker.forEach(function (x) { x.classList.toggle("er-valgt", x.dataset.tema === id); });
    if (r) {
      if (ikon) ikon.setAttribute("href", "#t-" + id);
      navn.textContent = r.querySelector(".legende-navn").textContent;
      tal.textContent = r.querySelector(".legende-tal").textContent;
    } else {
      if (ikon) ikon.setAttribute("href", start.i);
      navn.textContent = start.n; tal.textContent = start.t;
    }
  }
  raekker.forEach(function (r) {
    var id = r.dataset.tema;
    r.addEventListener("mouseenter", function () { vis(id, r); });
    r.addEventListener("focus", function () { vis(id, r); });
    r.addEventListener("mouseleave", function () { vis(null); });
    r.addEventListener("blur", function () { vis(null); });
  });
  segs.forEach(function (s) {
    var r = raekker.filter(function (x) { return x.dataset.tema === s.dataset.tema; })[0];
    s.addEventListener("mouseenter", function () { vis(s.dataset.tema, r); });
    s.addEventListener("mouseleave", function () { vis(null); });
    s.addEventListener("click", function () { if (r) window.location.href = r.getAttribute("href"); });
  });
  }
  if (window.NDI_TAL) start({ detail: window.NDI_TAL }); else document.addEventListener("ndi:tal", start);
})();
