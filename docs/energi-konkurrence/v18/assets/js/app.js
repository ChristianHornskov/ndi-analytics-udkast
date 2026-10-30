/* NewDeal Invest · fælles adfærd på alle sider: skuffemenu, scrollspy, faner, temaliste.
   Alle dele er valgfrie: en del uden sine elementer springes over. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mq = window.matchMedia("(max-width: 1023.98px)");

  /* ---------- Skuffemenu (under 1024 px) ---------- */
  var menu = $("#sidemenu"), slor = $("#slor"), aabn = $("#menu-aaben"), luk = $("#menu-luk");
  var hoved = $(".hoved"), topbar = $(".topbar-mobil");
  var sidsteFokus = null;
  function fokusbare() {
    return $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', menu)
      .filter(function (n) { return n.offsetParent !== null; });
  }
  function saetSkuffeTilstand() {
    if (mq.matches) {
      if (!menu.classList.contains("aaben")) menu.setAttribute("inert", "");
      menu.setAttribute("aria-label", "Hovedmenu");
    } else {
      lukMenu(true);
      menu.removeAttribute("inert");
    }
  }
  function aabnMenu() {
    sidsteFokus = document.activeElement;
    menu.removeAttribute("inert");
    menu.classList.add("aaben");
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    slor.hidden = false;
    requestAnimationFrame(function () { slor.classList.add("synlig"); });
    aabn.setAttribute("aria-expanded", "true");
    hoved.setAttribute("inert", ""); topbar.setAttribute("inert", "");
    document.body.classList.add("laast");
    var aktivLink = $('.sm-link[aria-current="location"], [aria-current="page"]', menu);
    (aktivLink || luk).focus({ preventScroll: true });
  }
  function lukMenu(stille) {
    if (!menu.classList.contains("aaben")) return;
    menu.classList.remove("aaben");
    menu.removeAttribute("role"); menu.removeAttribute("aria-modal");
    slor.classList.remove("synlig");
    setTimeout(function () { slor.hidden = true; }, 220);
    aabn.setAttribute("aria-expanded", "false");
    hoved.removeAttribute("inert"); topbar.removeAttribute("inert");
    document.body.classList.remove("laast");
    if (mq.matches) menu.setAttribute("inert", "");
    if (!stille) aabn.focus({ preventScroll: true }); /* v16 P3-3: fokus altid tilbage til menuknappen (touch giver ikke knappen fokus) */
  }
  if (menu && aabn && luk && slor) {
  aabn.addEventListener("click", aabnMenu);
  luk.addEventListener("click", function () { lukMenu(); });
  slor.addEventListener("click", function () { lukMenu(); });
  document.addEventListener("keydown", function (e) {
    if (!menu.classList.contains("aaben")) return;
    if (e.key === "Escape") { e.preventDefault(); lukMenu(); return; }
    if (e.key === "Tab") {
      var f = fokusbare(); if (!f.length) return;
      var forste = f[0], sidste = f[f.length - 1];
      if (e.shiftKey && document.activeElement === forste) { e.preventDefault(); sidste.focus(); }
      else if (!e.shiftKey && document.activeElement === sidste) { e.preventDefault(); forste.focus(); }
    }
  });
  /* Klik på et ankerlink i skuffen lukker den */
  $$('a[href^="#"]:not([data-snart])', menu).forEach(function (a) {
    a.addEventListener("click", function () { if (mq.matches) lukMenu(true); });
  });
  (mq.addEventListener ? mq.addEventListener("change", saetSkuffeTilstand) : mq.addListener(saetSkuffeTilstand));
  saetSkuffeTilstand();
  }

  /* ---------- Flere temaer ---------- */
  var visFlere = $(".sm-vis-flere"), flere = $("#sm-temaer");
  if (visFlere && flere) visFlere.addEventListener("click", function () {
    var aaben = visFlere.getAttribute("aria-expanded") === "true";
    visFlere.setAttribute("aria-expanded", String(!aaben));
    flere.classList.toggle("vis-alle", !aaben);
    $(".sm-vis-tekst", visFlere).hidden = !aaben; $(".sm-vis-faerre", visFlere).hidden = aaben;
  });

  /* ---------- "Kommer snart" ---------- */
  var toast = $("#toast"), toastTimer;
  function visToast(txt) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = txt;
    toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("synlig"); });
    toastTimer = setTimeout(function () {
      toast.classList.remove("synlig");
      setTimeout(function () { toast.hidden = true; }, 240);
    }, 3200);
  }
  $$("[data-snart]").forEach(function (a) {
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", function (e) { e.preventDefault(); visToast(a.getAttribute("data-snart")); });
  });

  /* ---------- Scrollspy ---------- */
  var links = $$(".sm-link[data-spy]");
  var aktuel = $("#aktuel-sektion");
  var sektioner = links.map(function (l) { return document.getElementById(l.dataset.spy); }).filter(Boolean);
  function marker(id) {
    links.forEach(function (l) {
      if (l.dataset.spy === id) {
        l.setAttribute("aria-current", "location");
        if (aktuel) aktuel.textContent = l.textContent.trim();
      } else l.removeAttribute("aria-current");
    });
  }
  function opdaterSpy() {
    if (!sektioner.length) return;
    var linjeY = window.innerHeight * 0.3, valgt = sektioner[0];
    /* v5: skjulte sektioner (fx kursgrafen uden data) tæller ikke */
    sektioner.forEach(function (s) { if (!s.hidden && s.getClientRects().length && s.getBoundingClientRect().top <= linjeY) valgt = s; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) valgt = sektioner[sektioner.length - 1];
    marker(valgt.id);
  }
  var raf = 0;
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; opdaterSpy(); }); }, { passive: true });
  window.addEventListener("resize", opdaterSpy);
  opdaterSpy();

  /* v5: fanerne til nøgletal er fjernet. Tallene står i HTML og assets/js/data.js, begge bygget af _kilde/sec_tal.py. */
})();
/* v2: foldbare lister er åbne på brede skærme og lukkede på mobil.
   v5 (F-70): en telefon på langs (fx 844×390) tæller som mobil, så folderne bliver lukkede. */
(function () {
  if (!window.matchMedia("(min-width: 600px) and (min-height: 600px)").matches) return;
  document.querySelectorAll("details[data-aaben-bred]").forEach(function (d) { d.open = true; });
  /* v5: en åben sektionsfold viser ikke sin overskrift på brede skærme, så den skjulte overskrift må ikke kunne få fokus */
  document.querySelectorAll("details.fold-sektion[data-aaben-bred] > summary").forEach(function (s) { s.setAttribute("tabindex", "-1"); });
})();
/* v3: et link til et afsnit i en lukket fold åbner folden */
(function () {
  function aabn(id) {
    var m = id && document.getElementById(id); if (!m) return;
    var d = m.tagName === "DETAILS" ? m : m.querySelector("details.fold-sektion") || m.closest("details");
    if (d) d.open = true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a) aabn(a.getAttribute("href").slice(1));
  });
  if (location.hash) aabn(location.hash.slice(1));
})();
/* v5 (F-68): "Vis alle" viser resten af en afkortet liste og flytter fokus til det første nye punkt */
(function () {
  document.addEventListener("click", function (e) {
    var k = e.target.closest && e.target.closest("[data-vis-alle]"); if (!k) return;
    var m = document.getElementById(k.getAttribute("aria-controls")); if (!m) return;
    var n = parseInt(m.getAttribute("data-afkort"), 10) || 0;
    m.classList.add("vis-alle"); k.setAttribute("aria-expanded", "true"); k.hidden = true;
    var li = m.children[n]; var f = li && li.querySelector("a, button");
    if (f) f.focus();
  });
})();

/* v13: mobilfoldenes knap fortæller skærmlæsere, om folden er åben. Grafer i folden tegnes igen ved åbning (ResizeObserver i charts.js). */
(function () {
  document.querySelectorAll("details.fold-mobil").forEach(function (d) {
    var s = d.querySelector(":scope > summary"); if (!s) return;
    /* v15: knapteksten skifter mellem "Vis …" og "Skjul …" */
    var t = s.firstChild && s.firstChild.nodeType === 3 ? s.firstChild : null;
    var rest = t ? t.nodeValue.replace(/^\s*(Vis|Skjul)\s+/, "") : "";
    function synk() {
      s.setAttribute("aria-expanded", d.open ? "true" : "false");
      if (t && rest) t.nodeValue = (d.open ? "Skjul " : "Vis ") + rest;
    }
    synk(); d.addEventListener("toggle", synk);
  });
})();
/* v14 (F-125): på mobil viser mobilfolden grafen direkte, så den indre graffold er altid åben */
(function () {
  if (window.matchMedia("(min-width: 600px) and (min-height: 600px)").matches) return;
  document.querySelectorAll("details.fold-mobil details.fold-graf").forEach(function (d) { d.open = true; });
})();
