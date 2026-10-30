/* NewDeal Invest · topanimationer (drop-in). Animationen spiller én gang, når heroen er synlig, og står derefter
   stille i slutbilledet. Slutbilledet er SVG'ens grundtilstand, så uden JS, ved prefers-reduced-motion og i
   mobilbåndet (under 600 px) vises det med det samme. Knappen: "Stop animation" under afspilning,
   "Afspil igen", når slutbilledet står. Ingen knap ved reduced motion og under 600 px (F-149, F-154).
   SpaceX (data-loop) styres som før af pointer.js; her stilles den kun på 12 s og pauses i mobilbåndet. */
(function () {
  "use strict";
  if (!window.matchMedia || !document.querySelectorAll) return;
  var rolig = window.matchMedia("(prefers-reduced-motion: reduce)");
  var stor = window.matchMedia("(min-width: 600px) and (min-height: 480px), (orientation: portrait) and (min-width: 600px)"); // v17.1 Mobil P2-1: lav landskabsvisning bruger båndet
  function lyt(mq, fn) { if (mq.addEventListener) mq.addEventListener("change", fn); else if (mq.addListener) mq.addListener(fn); }

  function spacex(svg, knap) {
    if (!svg.pauseAnimations) return;
    var iBaand = false;
    function tjek() {
      if (!stor.matches) { svg.setCurrentTime(12); svg.pauseAnimations(); iBaand = true; }
      else if (iBaand) {
        iBaand = false;
        if (!rolig.matches && !(knap && knap.getAttribute("aria-pressed") === "true")) svg.unpauseAnimations();
      }
    }
    tjek(); lyt(stor, tjek);
  }

  function opsaet(svg) {
    var kort = svg.closest ? svg.closest(".kort") : null;
    var knap = kort ? kort.querySelector(".ta-knap, .hero-pause") : null;
    if (svg.hasAttribute("data-loop")) { spacex(svg, knap); return; }
    var varighed = parseFloat(svg.getAttribute("data-varighed")) || 4;
    var tilstand = "slut", runde = 0, set = false;
    var kanSpille = function () { return stor.matches && !rolig.matches; };

    function visKnap(t) {
      tilstand = t;
      if (!knap) return;
      knap.hidden = !kanSpille();
      var brug = knap.querySelector("use"), tekst = knap.querySelector(".hero-pause-tekst");
      if (t === "spiller") { knap.setAttribute("aria-pressed", "false"); if (brug) brug.setAttribute("href", "#i-pause"); if (tekst) tekst.textContent = "Stop animation"; }
      else if (t === "pause") { knap.setAttribute("aria-pressed", "true"); if (brug) brug.setAttribute("href", "#i-afspil"); if (tekst) tekst.textContent = "Start animation"; }
      else { knap.removeAttribute("aria-pressed"); if (brug) brug.setAttribute("href", "#i-afspil"); if (tekst) tekst.textContent = "Afspil igen"; }
      if (tekst) knap.title = tekst.textContent; // v17.1 F-164: synlig forklaring, når knappen kun er et ikon (1024-1279 px)
    }
    function stop() { runde++; svg.classList.remove("ta-spil", "ta-pause"); visKnap("slut"); }
    function spil() {
      if (!kanSpille()) { stop(); return; }
      var r = ++runde;
      svg.classList.remove("ta-spil", "ta-pause");
      void svg.getBoundingClientRect();
      svg.classList.add("ta-spil");
      visKnap("spiller");
      var anim = svg.getAnimations ? svg.getAnimations({ subtree: true }) : [];
      var faerdig = anim.length
        ? Promise.all(anim.map(function (a) { return a.finished; }))
        : new Promise(function (ok) { setTimeout(ok, varighed * 1000 + 100); });
      faerdig.then(function () { if (r === runde) visKnap("slut"); }, function () {});
    }
    if (knap) {
      knap.addEventListener("click", function () {
        if (tilstand === "spiller") { svg.classList.add("ta-pause"); visKnap("pause"); }
        else if (tilstand === "pause") { svg.classList.remove("ta-pause"); visKnap("spiller"); }
        else spil();
      });
    }
    visKnap("slut");
    function start() { if (set) return; set = true; if (kanSpille()) spil(); else visKnap("slut"); }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { io.disconnect(); start(); }
      }, { threshold: 0.35 });
      // F-207 (Claude T5, animationer-claude/animationer/topanimation.js): observér det synlige bånd, ikke SVG'en (slice er langt større end båndet og når aldrig 35 %)
      io.observe((svg.closest && svg.closest(".ta-baand")) || svg);
    } else start();
    lyt(rolig, function () { if (rolig.matches) stop(); else visKnap(tilstand); });
    lyt(stor, function () { if (!stor.matches) stop(); else visKnap(tilstand); });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".ta-svg"), opsaet);

})();
