/* Chipkæden ("Sådan bliver en chip til").
 * Peg (mus), fokus (tastatur) eller tryk på et trin vælger det: søjlen løftes og
 * lyser op, ledningsbanerne tændes frem til trinnet, og
 * panelet viser trinnets tekst og selskaber. Valget bliver stående, når musen
 * forlader scenen, så man kan gå videre til selskaberne i panelet. Der
 * vises en lodret liste i stedet for scenen, når komponenten er smallere end 960 px.
 */
(function () {
  "use strict";
  var rod = document.getElementById("ck-kaede");
  if (!rod || rod.getAttribute("data-klar")) return;
  rod.setAttribute("data-klar", "1");
  var data;
  try { data = JSON.parse(document.getElementById("ck-data").textContent); } catch (e) { return; }

  var scene = rod.querySelector(".ck-scene");
  var trin = [].slice.call(rod.querySelectorAll(".ck-trin"));
  trin.sort(function (a, b) { return +a.getAttribute("data-i") - +b.getAttribute("data-i"); });
  var spor = [].slice.call(rod.querySelectorAll(".ck-spor"));
  var panel = rod.querySelector(".ck-panel");
  var pTekst = panel.querySelector(".ck-panel-tekst");
  var cosListe = panel.querySelector(".ck-cos");
  var info = panel.querySelector(".ck-info");
  var listeKnapper = [].slice.call(rod.querySelectorAll(".ck-punkt-knap"));
  var panelHjem = panel.parentNode, panelEfter = panel.nextSibling;
  // Smal visning følger komponentens egen bredde (samme grænse som @container ck i CSS).
  var GRAENSE = 960;
  var mobil = { get matches() { return rod.clientWidth < GRAENSE; } };
  var finMus = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var HINT = finMus ? "Peg på et selskab for at se, hvad det laver." : "Tryk på et selskab for at se, hvad det laver.";
  var FARVER = trin.map(function (g) { return g.style.getPropertyValue("--b"); });
  var valgt = 0, vist = -1, alleAabne = false, timer = 0;

  function el(tag, kls, tekst) {
    var e = document.createElement(tag);
    if (kls) e.className = kls;
    if (tekst != null) e.textContent = tekst;
    return e;
  }
  function antal(n) { return n === 1 ? "1 selskab" : n + " selskaber"; }

  function logo(c) {
    var s = el("span", "ck-lg" + (c.logo ? "" : " ck-lg--m"));
    if (c.logo) {
      var i = el("img"); i.src = c.logo; i.alt = ""; i.width = 26; i.height = 26; i.loading = "lazy"; i.decoding = "async";
      s.appendChild(i);
    } else s.textContent = c.mono || c.navn.charAt(0);
    return s;
  }

  function visSelskab(c, knap) {
    info.textContent = "";
    var b = el("b", null, c.navn);
    info.appendChild(b);
    info.appendChild(document.createTextNode(". " + c.d + (c.andre ? " Hører også til temaet: " + c.andre + "." : "")));
  }

  function tegnSelskaber(i) {
    var st = data[i], max = 8;
    cosListe.textContent = "";
    var vis = alleAabne ? st.selskaber : st.selskaber.slice(0, max);
    vis.forEach(function (c) {
      var li = el("li"), k = el("button", "ck-co");
      k.type = "button"; k.setAttribute("aria-pressed", "false");
      k.appendChild(logo(c)); k.appendChild(el("span", null, c.navn));
      k.addEventListener("click", function () {
        cosListe.querySelectorAll('.ck-co[aria-pressed="true"]').forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        k.setAttribute("aria-pressed", "true"); visSelskab(c, k);
      });
      k.addEventListener("focus", function () { visSelskab(c, k); });
      if (finMus) k.addEventListener("mouseenter", function () { visSelskab(c, k); });
      li.appendChild(k); cosListe.appendChild(li);
    });
    if (st.selskaber.length > max) {
      var li = el("li"), a = el("button", "ck-co ck-co--alle", alleAabne ? "Vis færre" : "Vis alle " + st.selskaber.length);
      a.type = "button"; a.setAttribute("aria-expanded", String(alleAabne));
      a.addEventListener("click", function () {
        alleAabne = !alleAabne; tegnSelskaber(i);
        var f = cosListe.querySelector(alleAabne ? "li:nth-child(" + (max + 1) + ") .ck-co" : ".ck-co--alle");
        if (f) f.focus();
      });
      li.appendChild(a); cosListe.appendChild(li);
    }
  }

  function tegnPanel(i) {
    var st = data[i];
    pTekst.textContent = "";
    pTekst.appendChild(el("p", "ck-pos", "Trin " + (i + 1) + " af 8 · " + (i < 5 ? "Fremstillingen" : "Den færdige chip")));
    var h = el("h3", "ck-h3", st.navn + " "); h.appendChild(el("span", null, st.sub + " · " + antal(st.selskaber.length)));
    pTekst.appendChild(h);
    pTekst.appendChild(el("p", "ck-x", st.tekst));
    alleAabne = false;
    tegnSelskaber(i);
    info.textContent = HINT;
    panel.style.setProperty("--b", FARVER[i]);
    panel.classList.remove("skifter"); void panel.offsetWidth; panel.classList.add("skifter");
  }


  function vis(i) {
    if (i === vist) return;
    vist = i;
    trin.forEach(function (g, k) { g.classList.toggle("er-aktiv", k === i); });
    spor.forEach(function (s) {
      var til = +s.getAttribute("data-til"), ud = s.classList.contains("ck-spor--u");
      s.classList.toggle("er-taendt", ud ? til === i : til <= Math.min(i, 5));
    });
    tegnPanel(i);
  }

  function vaelg(i, fraListe) {
    valgt = i;
    trin.forEach(function (g, k) { g.classList.toggle("er-valgt", k === i); g.setAttribute("aria-pressed", String(k === i)); });
    vist = -1; vis(i);
    if (mobil.matches) placerPanelMobil(i, fraListe);
  }

  /* ---------- scene: mus, tryk og tastatur ---------- */
  trin.forEach(function (g, i) {
    if (finMus) {
      g.addEventListener("mouseenter", function () {
        clearTimeout(timer);
        scene.classList.add("har-fokus");
        timer = setTimeout(function () { if (valgt !== i) vaelg(i); }, 120);
      });
    }
    g.addEventListener("click", function () { vaelg(i); });
    g.addEventListener("focus", function () { scene.classList.add("har-fokus"); if (valgt !== i) vaelg(i); });
    g.addEventListener("keydown", function (e) {
      var n = -1;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); vaelg(i); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = Math.min(trin.length - 1, i + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = Math.max(0, i - 1);
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = trin.length - 1;
      if (n >= 0) { e.preventDefault(); trin[n].focus(); }
    });
  });
  if (scene) {
    scene.addEventListener("mouseleave", function () {
      clearTimeout(timer);
      if (scene.contains(document.activeElement)) return;
      scene.classList.remove("har-fokus");
    });
    scene.addEventListener("focusout", function (e) {
      if (e.relatedTarget && scene.contains(e.relatedTarget)) return;
      scene.classList.remove("har-fokus");
    });
  }

  /* ---------- mobil: liste med panelet under det valgte punkt ---------- */
  function placerPanelMobil(i, rul) {
    listeKnapper.forEach(function (k, n) { k.setAttribute("aria-expanded", String(n === i)); });
    var li = listeKnapper[i] && listeKnapper[i].parentNode;
    if (li && panel.parentNode !== li) li.appendChild(panel);
    if (rul && listeKnapper[i] && listeKnapper[i].scrollIntoView) {
      var r = listeKnapper[i].getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight * .6) listeKnapper[i].scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  function placerPanelHjem() {
    if (panel.parentNode !== panelHjem) panelHjem.insertBefore(panel, panelEfter);
  }
  listeKnapper.forEach(function (k, i) {
    k.addEventListener("click", function () { vaelg(i, true); });
  });
  function tilpas() { if (mobil.matches) placerPanelMobil(valgt, false); else placerPanelHjem(); }
  var varSmal = mobil.matches;
  if (window.ResizeObserver) new ResizeObserver(function () { var s = mobil.matches; if (s !== varSmal) { varSmal = s; tilpas(); } }).observe(rod);
  else window.addEventListener("resize", tilpas);

  /* ---------- links til et trin (#cq-ch-p-maskiner eller #ck-trin-maskiner) ---------- */
  function fraHash() {
    var m = /^#(?:cq-ch-p-|ck-trin-)([a-z0-9-]+)$/.exec(location.hash || "");
    if (!m) return false;
    for (var i = 0; i < data.length; i++) if (data[i].slug === m[1]) {
      vaelg(i);
      var mal = mobil.matches ? listeKnapper[i] : rod;
      if (mal && mal.scrollIntoView) mal.scrollIntoView({ block: "start" });
      return true;
    }
    return false;
  }
  window.addEventListener("hashchange", fraHash);

  if (!fraHash()) vaelg(0);
  tilpas();
})();
