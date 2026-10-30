

(function () {
  "use strict";
  var KILDE_URL = "data/dagens-tal.json";
  var SKEMA = 1, KONTRAKT = "v18.1";

  var script = document.currentScript;
  var ROD = script ? script.src.replace(/assets\/js\/datalag\.js.*$/, "") : "";
  var url = /^https?:/.test(KILDE_URL) ? KILDE_URL : ROD + KILDE_URL;

   
  function slaaOp(d, sti) {
    var dele = sti.split("."), v = d;
    for (var i = 0; i < dele.length && v != null; i++) {
      var del = dele[i], h = del.indexOf("#");
      if (h >= 0) {
        var navn = del.slice(0, h), id = del.slice(h + 1), arr = navn ? v[navn] : v;
        v = null;
        if (arr) for (var j = 0; j < arr.length; j++) if (arr[j].id === id) { v = arr[j]; break; }
      } else v = v[del];
    }
    return v;
  }

   
  var NB = "\u00a0";
  function dec2(x) { return x.toFixed(2).replace(".", ","); }
  function heltal(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  var ORD = ["nul", "ét", "to", "tre", "fire", "fem", "seks", "syv", "otte", "ni", "ti", "elleve", "tolv"];
  var RANG = { 1: "det største", 2: "det næststørste", 3: "det tredjestørste" };
  var FMT = {
    pct: function (v) { return dec2(v) + NB + "%"; },
    tal: function (v) { return dec2(v); },
    heltal: function (v) { return heltal(v); },
    tekst: function (v) { return String(v); },
    plads: function (v) { return "nr." + NB + v; },
    Plads: function (v) { return "Nr." + NB + v; },
    antal: function (v, el) { return heltal(v) + NB + (v === 1 ? el.dataset.en : el.dataset.fl); },
     
    talord: function (v) { return ORD[v] || heltal(v); },
    Talord: function (v) { var t = ORD[v] || heltal(v); return t.charAt(0).toUpperCase() + t.slice(1); },
    ord: function (v, el) { return v === 1 ? el.dataset.en : el.dataset.fl; },
    se: function (v) { return v === 1 ? "Se selskabet" : "Se de " + heltal(v) + " selskaber"; },
    flere: function (v) { return "Vis " + heltal(v) + " mere"; },
    rang: function (v) { return RANG[v] || "nr." + NB + v + " i størrelse"; },
    Rang: function (v) { var t = RANG[v] || "nr." + NB + v + " i størrelse"; return t.charAt(0).toUpperCase() + t.slice(1); },
    rangkicker: function (v) { return v === 1 ? "Fondens største selskab" : "Nr." + NB + v + " i fonden"; },
    navne: function (v) {
      var t = v.map(function (s) { return s.navn; }).join(", ");
      var k = t.lastIndexOf(", ");            
      return k < 0 ? t : t.substring(0, k) + " og " + t.substring(k + 2);
    }
  };
  function format(v, fmt, el) { return (FMT[fmt] || FMT.pct)(v, el); }

  var VENT = "…", MANGLER = "–";

   
   
  function vaerdi(el, attr, d, base) {
    var sti = el.getAttribute(attr);
    if (sti.charAt(0) === "@") return base ? { v: base[sti.slice(1)] } : null;
    return { v: slaaOp(d, sti) };
  }
  function fyldFelter(rod, d, base) {
    rod.querySelectorAll("[data-tal]").forEach(function (el) {
      var r = vaerdi(el, "data-tal", d, base); if (!r) return;
      el.textContent = r.v == null ? (el.dataset.tom || MANGLER) : format(r.v, el.dataset.fmt || "pct", el);
    });
    rod.querySelectorAll("[data-bar]").forEach(function (el) {
      var r = vaerdi(el, "data-bar", d, base); if (r) el.style.setProperty("--v", r.v == null ? 0 : r.v);
    });
    rod.querySelectorAll("[data-hvis]").forEach(function (el) {
      var r = vaerdi(el, "data-hvis", d, base); if (r) el.hidden = r.v == null || r.v === false || r.v === 0;
    });
    rod.querySelectorAll("[data-skjul]").forEach(function (el) {
      var r = vaerdi(el, "data-skjul", d, base); if (r) el.hidden = !(r.v == null || r.v === false || r.v === 0);
    });
    rod.querySelectorAll("[data-href-selskab]").forEach(function (el) {
      var r = vaerdi(el, "data-href-selskab", d, base); if (r && r.v) el.setAttribute("href", ROD + "selskaber/" + (r.v.slug || r.v) + ".html");
    });
    rod.querySelectorAll("[data-href-tema]").forEach(function (el) {
      var r = vaerdi(el, "data-href-tema", d, base); if (r && r.v) el.setAttribute("href", ROD + "temaer/" + (r.v.id || r.v) + ".html");
    });
    rod.querySelectorAll("[data-navn]").forEach(function (el) {
      var r = vaerdi(el, "data-navn", d, base); if (r) el.textContent = r.v && r.v.navn ? r.v.navn : MANGLER;
    });
  }

   
  function fyldLister(d) {
    document.querySelectorAll("[data-liste]").forEach(function (ul) {
      var arr = slaaOp(d, ul.dataset.liste) || [];
      var tpl = document.getElementById(ul.dataset.skabelon);
      ul.textContent = "";
      arr.forEach(function (post) {
        var frag = tpl.content.cloneNode(true);
        var wrap = document.createElement("div"); wrap.appendChild(frag);
        wrap.querySelectorAll("[data-f]").forEach(function (el) {
          var v = post[el.dataset.f];
          if (el.dataset.f === "forbogstav") v = post.navn ? post.navn.charAt(0) : "";
          if (el.dataset.f === "forbogstav" && post.logo) {  
            var im = document.createElement("img"); im.src = ROD + post.logo; im.alt = ""; im.width = 56; im.height = 56; im.decoding = "async";
            el.textContent = ""; el.appendChild(im); el.classList.add("sm-logo--billede"); return;
          }
          el.textContent = v == null ? MANGLER : (el.dataset.fmt ? format(v, el.dataset.fmt, el) : String(v));
        });
        wrap.querySelectorAll("[data-saet]").forEach(function (el) {
          el.dataset.saet.split(",").forEach(function (par) { var kv = par.split(":"); if (post[kv[1]] != null) el.setAttribute(kv[0], post[kv[1]]); });
        });
        wrap.querySelectorAll("use[data-ikon-tema]").forEach(function (u) { if (post.tema || post.id) u.setAttribute("href", "#t-" + (post.tema || post.id)); });
        if (ul.dataset.aktivId && post.id === ul.dataset.aktivId && wrap.firstElementChild) wrap.firstElementChild.classList.add("aktiv");
        wrap.querySelectorAll("[data-fbar]").forEach(function (el) { el.style.setProperty("--v", post.bar || 0); });
         
        wrap.querySelectorAll("a[data-link-selskab]").forEach(function (a) {
          if (post.slug) { a.setAttribute("href", ROD + "selskaber/" + post.slug + ".html"); if (post.slug === document.body.dataset.slug) a.setAttribute("aria-current", "page"); }
          else { var s = document.createElement("span"); s.className = a.className + " uden-link"; while (a.firstChild) s.appendChild(a.firstChild); a.replaceWith(s); }
        });
        wrap.querySelectorAll("a[data-link-tema]").forEach(function (a) { if (post.tema || post.id) a.setAttribute("href", ROD + "temaer/" + (post.tema || post.id) + ".html"); });
        fyldFelter(wrap, d, post);
        while (wrap.firstChild) ul.appendChild(wrap.firstChild);
      });
      if (!arr.length) { var li = document.createElement("li"); li.className = "liste-tom lille"; li.textContent = "Ingen selskaber i dag."; ul.appendChild(li); }
    });
  }

   
  function ordne(d) {
    document.querySelectorAll("[data-ordne]").forEach(function (c) {
      var arr = slaaOp(d, c.dataset.ordne) || [];
      var boern = {};
      Array.prototype.forEach.call(c.querySelectorAll(":scope > [data-id]"), function (b) { boern[b.dataset.id] = b; });
      arr.forEach(function (post) {
        var b = boern[post.id]; if (!b) return;
        c.appendChild(b); fyldFelter(b, d, post);
        b.querySelectorAll("[data-saet]").forEach(function (el) {
          el.dataset.saet.split(",").forEach(function (par) { var kv = par.split(":"); if (post[kv[1]] != null) el.setAttribute(kv[0], post[kv[1]]); });
        });
      });
    });
  }

  function fejl(grund) {
    document.documentElement.classList.add("tal-mangler");
    document.querySelectorAll("[data-tal]").forEach(function (el) { el.textContent = MANGLER; });
    document.querySelectorAll("[data-liste]").forEach(function (ul) {
      ul.textContent = ""; var li = document.createElement("li"); li.className = "liste-tom lille";
      li.textContent = "Fondens tal kunne ikke hentes."; ul.appendChild(li);
    });
    var main = document.getElementById("indhold");
    if (main && !document.getElementById("tal-fejl")) {
      var p = document.createElement("p"); p.id = "tal-fejl"; p.className = "tal-fejl"; p.setAttribute("role", "status");
      p.textContent = "Dagens tal om fondens andele kunne ikke hentes. Tallene vises derfor ikke. Prøv at genindlæse siden.";
      main.insertBefore(p, main.firstChild);
    }
    if (window.console && console.warn) console.warn("NDI datalag:", grund);
    document.dispatchEvent(new CustomEvent("ndi:tal-fejl"));
  }

  function anvend(d) {
    if (!d || d.skema !== SKEMA) return fejl("ukendt skema");
    window.NDI_TAL = d;
    ordne(d);
    fyldLister(d);
    fyldFelter(document, d, null);
     
    var under = document.querySelector("[data-under]"), cur = document.querySelector(".sm-selskab[aria-current=page]");
    if (under && cur) { cur.parentNode.appendChild(under); under.hidden = false; }
    document.documentElement.classList.add("tal-klar");
    document.dispatchEvent(new CustomEvent("ndi:tal", { detail: d }));
  }

  

  function ndi(navn) {
    var f = (window.NDI_DATA || {})[navn], d = window.DAGENS_TAL, grund = null;
    if (!f) grund = "mangler";
    else if (f.skema !== SKEMA) grund = "skema";
    else if (f.kontrakt !== KONTRAKT) grund = "kontrakt";
    else if (!d || !d.release || !f.release || f.release.id !== d.release.id) grund = "release.id";
    else if (f.andelsdato !== d.andelsdato) grund = "andelsdato";
    if (grund && window.console && console.warn) console.warn("NDI datalag: " + navn + " afvist (" + grund + ")");
    return grund ? null : f;
  }

  window.NDI_DATALAG = { url: url, slaaOp: slaaOp, format: format, ndi: ndi };
  

  function hent() {
    if (window.DAGENS_TAL) return anvend(window.DAGENS_TAL);
    fetch(url, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(anvend)
      .catch(function (e) { fejl(e && e.message); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hent); else hent();
})();
