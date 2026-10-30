/* Lyst og mørkt tema (v11). Hovedets inline-script har allerede sat data-tema uden blink.
   Knappen gemmer valget i localStorage. Uden gemt valg følger siden systemets indstilling. */
(function () {
  var d = document.documentElement, KEY = "ndi-tema";
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  function gemt() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saet(t) {
    d.setAttribute("data-tema", t);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", t === "lys" ? "#F3EEE3" : "#0A1220");
    var k = document.getElementById("temaskift");
    if (k) {
      var lys = t === "lys";
      k.setAttribute("aria-label", lys ? "Skift til mørkt tema" : "Skift til lyst tema");
      var s = k.querySelector(".temaskift-tekst"); if (s) s.textContent = lys ? "Mørkt tema" : "Lyst tema";
    }
    document.dispatchEvent(new CustomEvent("ndi:tema", { detail: t }));
  }
  saet(d.getAttribute("data-tema") === "lys" ? "lys" : "mørk");
  var k = document.getElementById("temaskift");
  if (k) k.addEventListener("click", function () {
    var t = d.getAttribute("data-tema") === "lys" ? "mørk" : "lys";
    try { localStorage.setItem(KEY, t); } catch (e) {}
    saet(t);
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", function (e) { var g = gemt(); if (g !== "lys" && g !== "mørk") saet(e.matches ? "lys" : "mørk"); });
})();
