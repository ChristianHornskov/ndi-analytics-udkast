/* Lyst og mørkt tema (v11). Hovedets inline-script har allerede sat data-tema uden blink.
   Knappen gemmer valget i localStorage. v17 (punkt 1): uden gemt valg er mørkt tema standard, som på newdealinvest.dk. */
(function () {
  var d = document.documentElement, KEY = "ndi-tema";
  function saet(t) {
    d.setAttribute("data-tema", t);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", t === "lys" ? "#F4F6F8" : "#0A1220");
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
})();
