

(function () {
  "use strict";
  if (!window.matchMedia || !document.querySelectorAll) return;
  var rolig = window.matchMedia("(prefers-reduced-motion: reduce)");
  var stor = window.matchMedia("(min-width: 600px) and (min-height: 480px), (orientation: portrait) and (min-width: 600px)"); 
  function lyt(mq, fn) { if (mq.addEventListener) mq.addEventListener("change", fn); else if (mq.addListener) mq.addListener(fn); }

  function spacex(svg, knap) {
    if (!svg.pauseAnimations || !("IntersectionObserver" in window)) return;
    var ude = false;
    var io = new IntersectionObserver(function (e) {
      var synlig = e[0].isIntersecting;
      if (!synlig && !ude) { ude = true; svg.pauseAnimations(); }
      else if (synlig && ude) {
        ude = false;
        if (!rolig.matches && !(knap && knap.getAttribute("aria-pressed") === "true")) svg.unpauseAnimations();
      }
    }, { threshold: 0 });
    io.observe((svg.closest && svg.closest(".hero-billede")) || svg);
  }

  function opsaet(svg) {
    var kort = svg.closest ? svg.closest(".kort") : null;
    var knap = kort ? kort.querySelector(".ta-knap, .hero-pause") : null;
    if (svg.hasAttribute("data-loop")) { spacex(svg, knap); return; }
    var varighed = parseFloat(svg.getAttribute("data-varighed")) || 4;
    var tilstand = "slut", runde = 0, set = false, ude = false;
    var kanSpille = function () { return !rolig.matches; };

    function visKnap(t) {
      tilstand = t;
      if (!knap) return;
      knap.hidden = !kanSpille() || !stor.matches;
      var brug = knap.querySelector("use"), tekst = knap.querySelector(".hero-pause-tekst");
      if (t === "spiller") { knap.setAttribute("aria-pressed", "false"); if (brug) brug.setAttribute("href", "#i-pause"); if (tekst) tekst.textContent = "Stop animation"; }
      else if (t === "pause") { knap.setAttribute("aria-pressed", "true"); if (brug) brug.setAttribute("href", "#i-afspil"); if (tekst) tekst.textContent = "Start animation"; }
      else { knap.removeAttribute("aria-pressed"); if (brug) brug.setAttribute("href", "#i-afspil"); if (tekst) tekst.textContent = "Afspil igen"; }
      if (tekst) knap.title = tekst.textContent; 
    }
    function stop() { runde++; svg.classList.remove("ta-spil", "ta-pause", "ta-ude"); visKnap("slut"); }
    function spil() {
      if (!kanSpille()) { stop(); return; }
      var r = ++runde;
      svg.classList.remove("ta-spil", "ta-pause", "ta-ude");
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
        var inde = e[0].isIntersecting;
        if (!set) { if (inde && e[0].intersectionRatio >= 0.35) start(); return; }
        
        if (!inde && tilstand === "spiller") { ude = true; svg.classList.add("ta-ude"); }
        else if (inde && ude) { ude = false; svg.classList.remove("ta-ude"); }
      }, { threshold: [0, 0.35] });
      
      io.observe((svg.closest && svg.closest(".ta-baand")) || svg);
    } else start();
    lyt(rolig, function () { if (rolig.matches) stop(); else visKnap(tilstand); });
    lyt(stor, function () { visKnap(tilstand); });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".ta-svg"), opsaet);

})();
