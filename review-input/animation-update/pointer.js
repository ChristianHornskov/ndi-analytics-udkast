 
(function () {
  "use strict";
  var reduceret = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

  // Hero-animationen (.hero-svg / .hero-pause) styres af topanimation.js.
  // Den tidligere styring her gav dobbelte klik-handlere på samme knap.

   
  var rod = document.getElementById("spotlight");
  if (!rod) return;
  var faner = Array.prototype.slice.call(rod.querySelectorAll('.spot-fane[role="tab"]'));
  var paneler = faner.map(function (f) { return document.getElementById(f.getAttribute("aria-controls")); });
  var prikker = Array.prototype.slice.call(rod.querySelectorAll(".tl-prik"));
  var fyld = document.getElementById("tl-fyld"), nu = document.getElementById("spot-nu");
  rod.classList.add("spot--aktiv");
  rod.querySelector(".spot-faner").hidden = false;
  rod.querySelector(".spot-styr").hidden = false;
  var aktiv = 0;

  function vaelg(i, fokus) {
    i = (i + faner.length) % faner.length;
    aktiv = i;
    faner.forEach(function (f, k) {
      var v = k === i;
      f.setAttribute("aria-selected", String(v));
      f.tabIndex = v ? 0 : -1;
      paneler[k].hidden = !v;
      paneler[k].classList.toggle("er-ny", v);
    });
    var n = String(faner[i].dataset.n);
    prikker.forEach(function (p) {
      var v = (" " + p.dataset.nr + " ").indexOf(" " + n + " ") > -1;
      p.classList.toggle("er-valgt", v);
      if (v && fyld) fyld.style.width = p.style.getPropertyValue("--x");
    });
    if (nu) nu.textContent = (i + 1 < 10 ? "0" : "") + (i + 1);
    if (fokus) faner[i].focus();
    var r = faner[i].parentNode;
    if (r.scrollWidth > r.clientWidth) {
      var mal = faner[i].offsetLeft - (r.clientWidth - faner[i].offsetWidth) / 2;
      r.scrollTo({ left: mal, behavior: reduceret && reduceret.matches ? "auto" : "smooth" });
    }
  }
  faner.forEach(function (f, k) {
    f.addEventListener("click", function () { vaelg(k); });
    f.addEventListener("keydown", function (e) {
      var ny = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") ny = aktiv + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") ny = aktiv - 1;
      else if (e.key === "Home") ny = 0;
      else if (e.key === "End") ny = faner.length - 1;
      if (ny !== null) { e.preventDefault(); vaelg(ny, true); }
    });
  });
  Array.prototype.forEach.call(rod.querySelectorAll("[data-retning]"), function (b) {
    b.addEventListener("click", function () { vaelg(aktiv + Number(b.dataset.retning)); });
  });
   
  var h = window.location.hash.match(/^#pointe-(\d+)$/);
  vaelg(h ? Number(h[1]) - 1 : 0);
})();
