 
(function () {
  var rod = document.getElementById("virksomhedsfaser"); if (!rod) return;
  var knapper = rod.querySelectorAll("[data-fase]"), felter = rod.querySelectorAll("[data-fase-felt]"), tekster = rod.querySelectorAll(".v18-fase-tekst");
  function vaelg(i) {
    knapper.forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.fase === i)); });
    felter.forEach(function (f) { f.classList.toggle("aktiv", +f.dataset.faseFelt === i); });
    tekster.forEach(function (t, k) { t.hidden = k !== i; });
  }
  knapper.forEach(function (b) { b.addEventListener("click", function () { vaelg(+b.dataset.fase); }); });
  felter.forEach(function (f) { f.addEventListener("pointerenter", function () { vaelg(+f.dataset.faseFelt); }); });
})();
