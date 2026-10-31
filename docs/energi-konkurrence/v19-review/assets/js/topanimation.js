/*
 * Topanimationer på selskabssiderne (procesvisualer og SpaceX-heroen).
 *
 * Forløb for hver animation:
 *   venter  -> startbilledet vises (ikke slutbilledet), indtil illustrationen
 *              reelt er i syne: mindst halvdelen af båndet i viewporten, siden
 *              er færdigindlæst, og fanen er aktiv.
 *   spiller -> afspilles én gang. Sættes på pause, når båndet ruller ud af
 *              syne eller fanen skjules, og fortsætter, når det kommer tilbage.
 *   slut    -> slutbilledet står stille. Intet bevæger sig længere.
 *   pause   -> brugeren har stoppet afspilningen.
 *
 * Brugeren kan altid afspille igen med den lille ikonknap eller ved at trykke
 * på selve illustrationen (touch og mus). Ved prefers-reduced-motion: reduce
 * vises kun slutbilledet, der afspilles intet, og knappen skjules.
 *
 * CSS-animationerne styres med klasserne ta-spil / ta-pause / ta-ude, som
 * hver SVG selv definerer. SpaceX (data-loop) er SMIL og styres med
 * pauseAnimations/setCurrentTime; den står stille efter data-varighed sekunder.
 */
(function () {
  "use strict";
  if (!window.matchMedia || !document.querySelectorAll) return;
  var rolig = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ANDEL = 0.5;      // andel af båndet, der skal være synlig, før afspilning
  var FORSINKELSE = 250; // ms i syne, før afspilning starter (undgår start under hurtig scroll)

  function lyt(mq, fn) { if (mq.addEventListener) mq.addEventListener("change", fn); else if (mq.addListener) mq.addListener(fn); }
  function indlaest(fn) {
    if (document.readyState === "complete") fn();
    else window.addEventListener("load", function () { fn(); }, { once: true });
  }

  function opsaet(svg) {
    var kort = svg.closest ? svg.closest(".kort") : null;
    var knap = kort ? kort.querySelector(".ta-knap, .hero-pause") : null;
    var baand = (svg.closest && svg.closest(".ta-baand")) || svg;
    var smil = svg.hasAttribute("data-loop") && typeof svg.pauseAnimations === "function";
    var varighed = parseFloat(svg.getAttribute("data-varighed")) || 4;
    var tilstand = "venter", runde = 0, iSyne = false, nokISyne = false, klar = false, timer = 0, maaler = 0;
    var kanSpille = function () { return !rolig.matches; };
    var skjult = function () { return !iSyne || document.hidden; };

    function visKnap() {
      if (!knap) return;
      knap.removeAttribute("aria-pressed");
      knap.hidden = !kanSpille();
      var brug = knap.querySelector("use"), tekst = knap.querySelector(".hero-pause-tekst");
      var navn, ikon;
      if (tilstand === "spiller") { navn = "Stop animationen"; ikon = "#i-pause"; }
      else if (tilstand === "pause") { navn = "Fortsæt animationen"; ikon = "#i-afspil"; }
      else if (tilstand === "venter") { navn = "Afspil animationen"; ikon = "#i-afspil"; }
      else { navn = "Afspil animationen igen"; ikon = "#i-afspil"; }
      if (brug) brug.setAttribute("href", ikon);
      if (tekst) tekst.textContent = navn;
      knap.title = navn;
      if (kort) kort.setAttribute("data-ta", tilstand);
    }
    function saet(t) { tilstand = t; visKnap(); }

    /* ---------- CSS-animationer ---------- */
    function cssVis(t) {
      svg.classList.remove("ta-spil", "ta-pause", "ta-ude");
      if (t === "venter") svg.classList.add("ta-spil", "ta-pause");
      else if (t === "spiller") { void svg.getBoundingClientRect(); svg.classList.add("ta-spil"); if (skjult()) svg.classList.add("ta-ude"); }
    }
    function cssSpil() {
      var r = ++runde;
      cssVis("spiller");
      saet("spiller");
      var anim = svg.getAnimations ? svg.getAnimations({ subtree: true }) : [];
      var faerdig = anim.length
        ? Promise.all(anim.map(function (a) { return a.finished; }))
        : new Promise(function (ok) { setTimeout(ok, varighed * 1000 + 100); });
      faerdig.then(function () { if (r === runde) slut(); }, function () {});
    }

    /* ---------- SMIL (SpaceX) ---------- */
    function smilStopMaaler() { if (maaler) { clearInterval(maaler); maaler = 0; } }
    function smilSaetTid(t) { try { svg.setCurrentTime(t); } catch (e) {} }
    function smilSpil() {
      runde++;
      smilSaetTid(0);
      saet("spiller");
      if (skjult()) svg.pauseAnimations(); else svg.unpauseAnimations();
      smilStopMaaler();
      maaler = setInterval(function () {
        if (tilstand === "spiller" && svg.getCurrentTime() >= varighed) slut();
      }, 200);
    }

    /* ---------- fælles ---------- */
    function slut() {
      runde++;
      clearTimeout(timer);
      if (smil) { smilStopMaaler(); svg.pauseAnimations(); smilSaetTid(varighed); }
      else cssVis("slut");
      saet("slut");
    }
    function venter() {
      if (smil) { svg.pauseAnimations(); smilSaetTid(0); }
      else cssVis("venter");
      saet("venter");
    }
    function spil() {
      clearTimeout(timer);
      if (!kanSpille()) { slut(); return; }
      if (smil) smilSpil(); else cssSpil();
    }
    function pause() {
      if (smil) svg.pauseAnimations(); else svg.classList.add("ta-pause");
      saet("pause");
    }
    function fortsaet() {
      if (smil) { if (!skjult()) svg.unpauseAnimations(); }
      else svg.classList.remove("ta-pause");
      saet("spiller");
    }
    function skift() {
      if (!kanSpille()) return;
      if (tilstand === "spiller") pause();
      else if (tilstand === "pause") fortsaet();
      else spil();
    }
    // Midlertidig pause, mens båndet er ude af syne eller fanen er skjult.
    function opdaterSynlighed() {
      if (tilstand !== "spiller") return;
      if (smil) { if (skjult()) svg.pauseAnimations(); else svg.unpauseAnimations(); }
      else svg.classList.toggle("ta-ude", skjult());
    }
    function proevStart() {
      if (tilstand !== "venter" || !klar || !nokISyne || document.hidden || !kanSpille()) return;
      clearTimeout(timer);
      timer = setTimeout(function () { if (tilstand === "venter" && nokISyne && !document.hidden) spil(); }, FORSINKELSE);
    }

    if (knap) knap.addEventListener("click", skift);
    // Tryk eller klik på selve illustrationen gør det samme som knappen.
    baand.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a, button")) return;
      skift();
    });
    if (kort) kort.classList.add("ta-aktiv");

    if (kanSpille()) venter(); else slut();
    if (smil) indlaest(function () { if (tilstand === "venter") venter(); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        var x = e[e.length - 1];
        iSyne = x.isIntersecting;
        nokISyne = iSyne && x.intersectionRatio >= ANDEL - 0.001;
        if (!nokISyne) clearTimeout(timer);
        opdaterSynlighed();
        proevStart();
      }, { threshold: [0, ANDEL] }).observe(baand);
    } else { iSyne = nokISyne = true; }

    document.addEventListener("visibilitychange", function () { opdaterSynlighed(); proevStart(); });
    indlaest(function () {
      // Webfonte kan flytte layoutet; vent på dem, men aldrig mere end 1,5 s.
      var faerdig = function () { if (!klar) { klar = true; proevStart(); } };
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(faerdig, faerdig); setTimeout(faerdig, 1500); }
      else faerdig();
    });

    lyt(rolig, function () {
      if (rolig.matches) slut();
      else { visKnap(); }
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".ta-svg"), opsaet);
})();
