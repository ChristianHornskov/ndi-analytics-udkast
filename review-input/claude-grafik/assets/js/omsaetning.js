/* Omsætning: bygger .pd-revenues om til hovedtal, ændring og bjælker.
 *
 * Komponenten læser de to tal direkte fra sidens markup:
 *   <div class="pd-revenues"><h4>Omsætning · mio. USD</h4>[<p>note</p>]
 *     <div><p>Q3 2026 <strong>28.046</strong></p><svg>…</svg></div>
 *     <div><p>Q3 2025 <strong>28.095</strong></p><svg>…</svg></div>
 *     [<a href="…">kilde</a>]</div>
 * Første række er den nyeste periode, anden række sammenligningen. Har
 * komponenten ikke præcis to tal, bliver den stående uændret.
 */
(function () {
  "use strict";
  var UAENDRET = 1; // procent: mindre ændring end dette kaldes "stort set uændret"

  function tal(t) { return parseFloat(String(t).replace(/\s/g, "").replace(/\./g, "").replace(",", ".")); }
  function dk(x, d) {
    return x.toLocaleString("da-DK", { minimumFractionDigits: d, maximumFractionDigits: d }).replace("-", "−");
  }
  function periode(lab) {
    var m = /^Q([1-4])\s+(\d{4})$/.exec(lab.trim());
    return m ? { q: +m[1], aar: +m[2], kort: m[1] + ". kvt. " + m[2], lang: m[1] + ". kvartal " + m[2] } : { kort: lab.trim(), lang: lab.trim() };
  }
  function el(tag, kls, tekst) {
    var e = document.createElement(tag);
    if (kls) e.className = kls;
    if (tekst != null) e.textContent = tekst;
    return e;
  }

  function byg(boks) {
    if (boks.getAttribute("data-oms")) return;
    var h = boks.querySelector(":scope > h4");
    var raekker = [].slice.call(boks.querySelectorAll(":scope > div")).map(function (d) {
      var s = d.querySelector("strong"), p = d.querySelector("p");
      if (!s || !p) return null;
      var lab = p.textContent.replace(s.textContent, "").trim();
      return { lab: lab, v: tal(s.textContent), vis: s.textContent.trim() };
    }).filter(Boolean);
    if (!h || raekker.length !== 2 || raekker.some(function (r) { return !isFinite(r.v) || r.v <= 0; })) return;

    var enhed = (h.textContent.split("·")[1] || "").trim();            // fx "mio. USD"
    var valuta = enhed.replace(/^mio\.\s*/, "");
    var note = boks.querySelector(":scope > p");
    var kilde = boks.querySelector(":scope > a");
    var nu = raekker[0], foer = raekker[1];
    var pn = periode(nu.lab), pf = periode(foer.lab);
    var aendring = (nu.v / foer.v - 1) * 100;
    var retning = Math.abs(aendring) < UAENDRET ? "flad" : aendring > 0 ? "op" : "ned";
    var sammeKvartal = pn.q && pf.q && pn.q === pf.q && pn.aar - pf.aar === 1;
    var mod = sammeKvartal ? "fra samme kvartal sidste år" : "fra " + pf.kort;
    var tolk = retning === "flad" ? "Omsætningen er stort set uændret " + mod + "."
      : "Omsætningen er " + (retning === "op" ? "steget " : "faldet ") + dk(Math.abs(aendring), 1) + " % " + mod + ".";

    var stort, stortEnhed;
    if (/^mio\./.test(enhed) && nu.v >= 1000) { stort = dk(nu.v / 1000, 1); stortEnhed = "mia. " + valuta; }
    else { stort = dk(Math.round(nu.v), 0); stortEnhed = enhed; }

    var ny = el("div", "oms-ramme");
    var hoved = el("div", "oms-hoved");
    hoved.appendChild(el("h4", "oms-kick", "Omsætning · " + pn.lang));
    var t = el("p", "oms-tal"); t.appendChild(el("b", null, stort)); t.appendChild(el("span", null, stortEnhed)); hoved.appendChild(t);
    var d = el("p", "oms-delta");
    d.appendChild(el("span", "oms-maerke oms-maerke--" + retning, (aendring > 0 ? "+" : "") + dk(aendring, 1) + " %"));
    d.appendChild(document.createTextNode(" mod " + pf.kort));
    hoved.appendChild(d);
    hoved.appendChild(el("p", "oms-tolk", tolk));
    ny.appendChild(hoved);

    var sojler = el("div", "oms-sojler");
    var maks = Math.max(nu.v, foer.v);
    [nu, foer].forEach(function (r, i) {
      var rk = el("div", "oms-r" + (i ? " oms-r--foer" : ""));
      rk.appendChild(el("span", "oms-lab", periode(r.lab).kort));
      var b = el("span", "oms-b"); b.setAttribute("aria-hidden", "true");
      var fyld = el("i"); fyld.style.width = (r.v / maks * 100).toFixed(2) + "%"; b.appendChild(fyld); rk.appendChild(b);
      rk.appendChild(el("b", "oms-v", r.vis));
      sojler.appendChild(rk);
    });
    var akse = el("p", "oms-akse"); akse.setAttribute("aria-hidden", "true");
    akse.appendChild(el("span", null, "0")); akse.appendChild(el("span", null, enhed)); akse.appendChild(el("span", null, dk(maks, 0)));
    sojler.appendChild(akse);
    if (note) { note.className = "oms-note"; sojler.appendChild(note); }
    if (kilde) { kilde.classList.add("oms-kilde"); sojler.appendChild(kilde); }
    ny.appendChild(sojler);

    boks.textContent = "";
    boks.appendChild(ny);
    boks.classList.add("oms");
    boks.setAttribute("data-oms", "1");
  }

  function start() { [].forEach.call(document.querySelectorAll(".pd-revenues"), byg); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
