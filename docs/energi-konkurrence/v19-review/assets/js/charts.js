

(function () {
  "use strict";
  var D = (window.NDI_DATA || {}).regnskab;   
  var NS = "http://www.w3.org/2000/svg";

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function tekst(parent, x, y, s, attrs) {
    var t = el("text", Object.assign({ x: x, y: y }, attrs || {}), parent);
    t.textContent = s;
    return t;
  }
  function svgRod(box, w, h, skjult) {
    box.innerHTML = "";
    var s = el("svg", { viewBox: "0 0 " + w + " " + h, width: w, height: h, preserveAspectRatio: "none" }, box);
    if (skjult) s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    return s;
  }
  var nf = new Intl.NumberFormat("da-DK");
  function heltal(n) { return nf.format(n).replace("-", "\u2212"); }
   
  function mia(n, dec) { return (n / 1000).toFixed(dec).replace(".", ",").replace("-", "\u2212"); }
  function pct(n) { return n.toFixed(2).replace(".", ",") + "\u00a0%"; }
  function datoKort(iso) { var p = iso.split("-"); return p[2] + "." + p[1]; }
  function datoLang(iso) { var p = iso.split("-"); return p[2] + "." + p[1] + "." + p[0]; }
   
  var MDR = ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."];
  function mdKort(iso) { return MDR[+iso.split("-")[1] - 1]; }
  function mdLang(iso) { return mdKort(iso) + " " + iso.split("-")[0]; }
  function tid(iso) { return new Date(iso + "T00:00:00Z").getTime(); }
  function farve(v) { return getComputedStyle(document.documentElement).getPropertyValue(v.replace(/var\((--[^)]+)\)/, "$1")).trim() || v; }
  function pathFra(pts) { return pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" "); }

   
   
  function andelSerier() {
    var h = window.NDI_TAL && window.NDI_TAL.spacex && window.NDI_TAL.spacex.historik;
    if (!h) return null;
    return [
       
      { id: "andel", navn: "Andel af fonden", farve: "var(--c-accent)", punkter: h.map(function (p) { return [p.dato, p.andel]; }) }
    ];
  }
  function andelMaks() { return window.NDI_TAL.spacex.akse.maks; }

  function minigraf(box) {
    box.innerHTML = "";  
    var w = Math.max(160, box.clientWidth), h = Math.max(60, box.clientHeight);
    var s = svgRod(box, w, h, true);
    var serier = andelSerier(); if (!serier) return;
    var alle = serier[0].punkter;
    var t0 = tid(alle[0][0]), t1 = tid(alle[alle.length - 1][0]);
    var pad = { l: 4, r: 8, t: 8, b: 6 }, maks = andelMaks();
    function x(iso) { return pad.l + (tid(iso) - t0) / (t1 - t0) * (w - pad.l - pad.r); }
    function y(v) { return pad.t + (1 - v / maks) * (h - pad.t - pad.b); }
    el("line", { x1: pad.l, x2: w - pad.r, y1: y(0), y2: y(0), class: "gitterlinje", stroke: farve("var(--c-grid)") }, s);
    serier.slice().reverse().forEach(function (ser, idx) {
      var pts = ser.punkter.map(function (p) { return [x(p[0]), y(p[1])]; });
       
      el("path", { d: pathFra(pts), fill: "none", stroke: farve(ser.farve), "stroke-width": idx === 1 ? 2 : 1.5, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": idx === 1 ? "" : "4 3" }, s);
      var sidste = pts[pts.length - 1];
      el("circle", { cx: sidste[0], cy: sidste[1], r: idx === 1 ? 3.5 : 3, fill: farve(ser.farve), stroke: farve("var(--c-surface)"), "stroke-width": 2 }, s);
    });
  }

   
  function linje(box) {
    var w = Math.max(280, box.clientWidth), h = box.clientHeight || 280;
    var smal = w < 480;
    var s = svgRod(box, w, h, true);
    var serier = andelSerier(); if (!serier) { box.innerHTML = ""; return; }
    var punkter = serier[0].punkter;
    var t0 = tid(punkter[0][0]), t1 = tid(punkter[punkter.length - 1][0]);
    var pad = { l: smal ? 44 : 52, r: smal ? 58 : 66, t: 24, b: 30 }, maks = andelMaks();
    function x(iso) { return pad.l + (tid(iso) - t0) / (t1 - t0) * (w - pad.l - pad.r); }
    function y(v) { return pad.t + (1 - v / maks) * (h - pad.t - pad.b); }
    for (var v = 0; v <= maks; v++) {
      el("line", { x1: pad.l, x2: w - pad.r, y1: y(v), y2: y(v), class: v === 0 ? "nullinje" : "gitterlinje" }, s);
      tekst(s, pad.l - 10, y(v) + 4, v + " %", { "text-anchor": "end", class: "akse-tekst" });
    }
    punkter.forEach(function (p, i) {
      var anchor = i === 0 ? "start" : (i === punkter.length - 1 ? "end" : "middle");
       
      var kant = i === 0 || i === punkter.length - 1;
       
      if (!kant && x(punkter[punkter.length - 1][0]) - x(p[0]) < 56) return;
       
      if (!kant && p[0].slice(0, 7) === punkter[punkter.length - 1][0].slice(0, 7)) return;
      var nabo = i === 0 ? punkter[1] : punkter[i - 1];
      var plads = nabo ? Math.abs(x(nabo[0]) - x(p[0])) : 0;
      tekst(s, x(p[0]), h - 8, kant && plads > 100 ? mdLang(p[0]) : mdKort(p[0]), { "text-anchor": anchor, class: "akse-tekst" });
    });

    var markor = el("line", { y1: pad.t - 8, y2: h - pad.b, stroke: farve("var(--c-line-strong)"), "stroke-width": 1, "stroke-dasharray": "3 3", opacity: 0 }, s);
    var prikker = [];
    serier.slice().reverse().forEach(function (ser) {
      var accent = ser.id === "andel";
      var pts = ser.punkter.map(function (p) { return [x(p[0]), y(p[1])]; });
       
      el("path", { d: pathFra(pts), fill: "none", stroke: farve(ser.farve), "stroke-width": accent ? 1.5 : 1.25, "stroke-linejoin": "round", "stroke-dasharray": accent ? "" : "5 4" }, s);
      var serPrik = [];
      pts.forEach(function (pt, i) {
        var c = el("circle", { cx: pt[0], cy: pt[1], r: i === pts.length - 1 ? 4.5 : 3.5, fill: farve(accent ? "var(--c-surface)" : "var(--c-surface)"), stroke: farve(ser.farve), "stroke-width": 2 }, s);
        serPrik.push(c);
      });
      prikker.push(serPrik);
       
      var sidste = ser.punkter[ser.punkter.length - 1];
      var ly = y(sidste[1]) + (accent ? 12 : -2);
      tekst(s, x(sidste[0]) + 10, ly, pct(sidste[1]), { "text-anchor": "start", class: "vaerdi-tekst", fill: farve(ser.farve) });
    });

     
    var tip = document.createElement("div");
    tip.className = "graf-tip"; tip.setAttribute("aria-hidden", "true");
    box.appendChild(tip);
    box.classList.add("graf-fokus");
    box.tabIndex = 0;
    var aktiv = -1;
    function vis(i) {
      aktiv = i;
      var p = punkter[i], px = x(p[0]);
      markor.setAttribute("x1", px); markor.setAttribute("x2", px); markor.setAttribute("opacity", 1);
      prikker.forEach(function (sp) { sp.forEach(function (c, j) { c.setAttribute("r", j === i ? 6 : (j === sp.length - 1 ? 4.5 : 3.5)); }); });
      var html = "<b>" + datoLang(p[0]) + "</b>";
      serier.forEach(function (ser) {
        html += '<span class="tip-raekke"><span class="forklaring-prik" style="--farve:' + ser.farve + '"></span>' + ser.navn + "<strong>" + pct(ser.punkter[i][1]) + "</strong></span>";
      });
      tip.innerHTML = html;
      var topY = Math.min.apply(null, serier.map(function (sr) { return y(sr.punkter[i][1]); }));
      tip.classList.add("synlig");
      var tw = tip.offsetWidth / 2;
      tip.style.left = Math.max(tw, Math.min(w - tw, px)) + "px";
      tip.style.top = Math.max(tip.offsetHeight + 12, topY) + "px";
    }
    function skjul() {
      aktiv = -1; tip.classList.remove("synlig"); markor.setAttribute("opacity", 0);
      prikker.forEach(function (sp) { sp.forEach(function (c, j) { c.setAttribute("r", j === sp.length - 1 ? 4.5 : 3.5); }); });
    }
    function naermest(evx) {
      var r = box.getBoundingClientRect(), mx = evx - r.left, best = 0, bd = 1e9;
      punkter.forEach(function (p, i) { var d = Math.abs(x(p[0]) - mx); if (d < bd) { bd = d; best = i; } });
      return best;
    }
    box.onpointermove = function (e) { vis(naermest(e.clientX)); };
    box.onpointerleave = skjul;
    box.onblur = skjul;
    box.onfocus = function () { if (aktiv < 0) vis(punkter.length - 1); };
    box.onkeydown = function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var n = aktiv < 0 ? punkter.length - 1 : aktiv + (e.key === "ArrowRight" ? 1 : -1);
        vis(Math.max(0, Math.min(punkter.length - 1, n)));
      } else if (e.key === "Escape") { skjul(); }
    };
  }

   
  var MAAL = {
    oms: { felt: "omsaetning", navn: "Omsætning" },
    drift: { felt: "drift", navn: "Driftsresultat" },
    anlaeg: { felt: "anlaeg", navn: "Anlægsinvesteringer" }
  };
  function paenTrin(span, n) {
    var raa = span / n, mag = Math.pow(10, Math.floor(Math.log10(raa))), f = raa / mag;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag;
  }
  function soejler(box, maal) {
    var m = MAAL[maal]; box.dataset.maal = maal;
    var w = Math.max(280, box.clientWidth), h = box.clientHeight || 300;
    var smal = w < 480;
    var s = svgRod(box, w, h, false);
    s.setAttribute("role", "img");
    var q = D.kvartaler, segs = D.segmenter;
    var beskr = m.navn + " pr. segment i mia. dollar. " + segs.map(function (sg, i) {
      return sg + ": " + q.map(function (k) { return k.kort + " " + mia(k[m.felt][i], 2); }).join(", ");
    }).join(". ") + ".";
    el("title", null, s).textContent = beskr;
    var alle = []; q.forEach(function (k) { alle = alle.concat(k[m.felt]); });
    var min = Math.min(0, Math.min.apply(null, alle)), maks = Math.max(0, Math.max.apply(null, alle));
    var trin = paenTrin(maks - min, 4);
    var lo = Math.floor(min / trin) * trin, hi = Math.ceil(maks / trin) * trin;
    var pad = { l: smal ? 48 : 60, r: 8, t: 22, b: 30 };
    function y(v) { return pad.t + (hi - v) / (hi - lo) * (h - pad.t - pad.b); }
    for (var v = lo; v <= hi + 1e-6; v += trin) {
      el("line", { x1: pad.l, x2: w - pad.r, y1: y(v), y2: y(v), class: Math.abs(v) < 1e-6 ? "nullinje" : "gitterlinje" }, s);
      tekst(s, pad.l - 10, y(v) + 4, mia(v, 1), { "text-anchor": "end", class: "akse-tekst" });
    }
    var defs = el("defs", null, s);
    q.forEach(function (k, ki) {
      var p = el("pattern", { id: "skrav-" + ki, width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
      el("rect", { width: 6, height: 6, fill: farve(ki ? "var(--c-data-3)" : "var(--c-data-1)"), opacity: 0.22 }, p);
      el("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: farve(ki ? "var(--c-data-3)" : "var(--c-data-1)"), "stroke-width": 2.4 }, p);
    });
    var gw = (w - pad.l - pad.r) / segs.length;
    var bw = Math.min(smal ? 30 : 48, gw * 0.3), mel = smal ? 4 : 8;
    segs.forEach(function (sg, i) {
      var cx = pad.l + gw * i + gw / 2;
      tekst(s, cx, h - 8, sg, { "text-anchor": "middle", class: "akse-tekst", fill: farve("var(--c-text-2)") });
      q.forEach(function (k, ki) {
        var val = k[m.felt][i];
        var bx = cx + (ki === 0 ? -bw - mel / 2 : mel / 2);
        var y0 = y(0), y1 = y(val);
        var top = Math.min(y0, y1), hh = Math.max(1.5, Math.abs(y1 - y0));
        var neg = val < 0;
        var col = farve(ki ? "var(--c-data-3)" : "var(--c-data-1)");
        el("rect", {
          x: bx, y: top, width: bw, height: hh, rx: 3,
          fill: neg ? "url(#skrav-" + ki + ")" : col,
          stroke: neg ? col : "none", "stroke-width": neg ? 1.2 : 0
        }, s);
        var ty = neg ? top + hh + 14 : top - 7;
        tekst(s, bx + bw / 2, ty, mia(val, 2), { "text-anchor": "middle", class: "vaerdi-tekst", "font-size": 12 });
      });
    });
  }

  

  function secData() { var t = window.NDI_TAL; return t && t.spacex && t.spacex.sec; }
  function donut(box) {
    var sec = secData(); if (!sec) return;
    var size = Math.max(140, Math.min(220, box.clientWidth));
    var s = svgRod(box, size, size, true);
    var farver = { 0: "var(--c-data-1)", 1: "var(--c-data-2)", 2: "var(--c-data-3)" };
    var r = size / 2 - 12, c = size / 2, sw = Math.max(18, size * 0.13);
    var omk = 2 * Math.PI * r, gap = 3;
    el("circle", { cx: c, cy: c, r: r, fill: "none", stroke: farve("var(--c-surface-2)"), "stroke-width": sw }, s);
    sec.donut.tegneorden.forEach(function (del) {
      var len = Math.max(0, del.bue * omk - gap);
      el("circle", {
        cx: c, cy: c, r: r, fill: "none", stroke: farve(farver[del.nr]), "stroke-width": sw,
        "stroke-dasharray": len + " " + (omk - len),
        "stroke-dashoffset": -del.start * omk, transform: "rotate(-90 " + c + " " + c + ")"
      }, s);
    });
    var midte = box.querySelector(".donut-midte") || document.createElement("div");
    midte.className = "donut-midte"; midte.setAttribute("aria-hidden", "true");
    midte.innerHTML = "<strong>" + sec.donut.total + "</strong><span>mia. dollar i alt</span>";
    box.appendChild(midte);
    box.style.maxWidth = size + "px";
  }

  

  function vandret(box) {
    var sec = secData(); if (!sec) return;
    var w = Math.max(280, box.clientWidth), h = box.clientHeight || 200;
    var smal = w < 480;
    var s = svgRod(box, w, h, true);
    var q = sec.kvartaler, akse = sec.akse;
    var pad = { l: smal ? 58 : 76, r: 52, t: 6, b: 24 }, fuld = w - pad.l - pad.r;
    akse.trin.forEach(function (v, n) {
      var x = pad.l + n / (akse.trin.length - 1) * fuld;
      el("line", { x1: x, x2: x, y1: pad.t, y2: h - pad.b, class: v === 0 ? "nullinje" : "gitterlinje" }, s);
      tekst(s, x, h - 6, String(v), { "text-anchor": "middle", class: "akse-tekst" });
    });
    var rh = (h - pad.t - pad.b) / q.length, bh = Math.min(22, rh * 0.28);
    q.forEach(function (k, i) {
      var cy = pad.t + rh * i + rh / 2;
      tekst(s, 0, cy + 4, k.kort, { class: "akse-tekst", fill: farve("var(--c-text-2)") });
      [["omsaetning", "var(--c-data-1)", -1], ["anlaeg", "var(--c-data-3)", 1]].forEach(function (d) {
        var bw = k.bredde[d[0]] * fuld;
        var by = cy + (d[2] < 0 ? -bh - 2 : 2);
        el("rect", { x: pad.l, y: by, width: bw, height: bh, rx: 3, fill: farve(d[1]) }, s);
        tekst(s, pad.l + bw + 6, by + bh / 2 + 4, k[d[0]], { class: "vaerdi-tekst" });
      });
    });
  }

   
  var tegnere = [
    ["minigraf", minigraf], ["graf-andel", linje], ["graf-donut", donut], ["graf-anlaeg", vandret],
    ["graf-segment", function (b) { soejler(b, b.dataset.maal || "oms"); }]
  ];
  function tegnAlle() {
    tegnere.forEach(function (t) { var b = document.getElementById(t[0]); if (b) t[1](b); });
  }
  window.NDI_GRAF = { segment: function (maal) { var b = document.getElementById("graf-segment"); if (b) soejler(b, maal); } };

  var sidsteBredde = {};
  function start() {
    tegnAlle();
    if ("ResizeObserver" in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (en) {
          var id = en.target.id, bw = Math.round(en.contentRect.width);
          if (sidsteBredde[id] === bw) return;
          sidsteBredde[id] = bw;
          tegnere.forEach(function (t) { if (t[0] === id) t[1](en.target); });
        });
      });
      tegnere.forEach(function (t) { var b = document.getElementById(t[0]); if (b) ro.observe(b); });
    } else {
      window.addEventListener("resize", tegnAlle);
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
   
  document.addEventListener("ndi:tema", tegnAlle);
  window.addEventListener("load", function () { var b = document.getElementById("minigraf"); if (b) minigraf(b); });  
  document.addEventListener("ndi:tal", function () { ["minigraf", "graf-andel", "graf-donut", "graf-anlaeg"].forEach(function (id) { var b = document.getElementById(id); if (b) tegnere.forEach(function (t) { if (t[0] === id) t[1](b); }); }); });
})();
