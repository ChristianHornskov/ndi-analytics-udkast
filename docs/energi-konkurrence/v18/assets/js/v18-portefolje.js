/* v18 (B8, B10): porteføljesektionen på forsiden, tegnet direkte fra NDI_DATA.portefolje og NDI_DATA.fondsudvikling.
   graf-v2 indlæses ikke. Filerne kontrolleres af datalag.js (NDI_DATALAG.ndi): skema, kontrakt, release.id og andelsdato.
   Her slås kun op og formateres. Ingen summer, gennemsnit, sortering, filtrering, top-N, afrunding eller omregning;
   listerne kommer færdigsorterede og afrundede fra Azure (indtil da: eksempeldata). Graferne omregner kun værdier til
   koordinater. Teksterne er ordret fra graf-v2 (v6), dog uden fondsvælger, søgning og sektorfilter (de kræver filtrering).
   Menuens underpunkter bruger #portefoeljen-<id>: portfolio · highs · risk-summary · method. */
(function () {
  "use strict";
  var knap = document.getElementById("portefolje-knap"), fold = document.getElementById("portefolje-fold");
  var rod = document.getElementById("portefolje-indhold");
  if (!knap || !fold || !rod) return;
  var DL = window.NDI_DATALAG || { ndi: function () { return null; } };
  var P = DL.ndi("portefolje"), U = DL.ndi("fondsudvikling"), VK = (window.NDI_DATA || {}).vaerdikaedeTekster || null;
  var V = window.NDI_VALG || {};
  var NB = "\u00a0", MD = ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."];

  /* ---------- formatering (kun visning) ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tal(v, d) { if (v == null) return "—"; var t = v.toFixed(d).split("."); return (t[0].replace("-", "−").replace(/\B(?=(\d{3})+(?!\d))/g, ".")) + (t[1] ? "," + t[1] : ""); }
  function p2(v) { return v == null ? "—" : tal(v, 2) + NB + "%"; }
  function p1(v) { return v == null ? "—" : tal(v, 1) + NB + "%"; }
  function fortegn(v) { return v == null ? "—" : (v > 0 ? "+" : "") + p1(v); }
  function heltal(v) { return v == null ? "—" : tal(v, 0); }
  function dato(s) { if (!s) return "—"; var d = s.slice(0, 10).split("-"); return +d[2] + ". " + MD[+d[1] - 1] + " " + d[0]; }
  function lokalDato(iso) { /* ISO med tidszone -> dato i Europe/Copenhagen (kun visning) */
    try { return new Intl.DateTimeFormat("da-DK", { timeZone: "Europe/Copenhagen", day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)); } catch (e) { return dato(iso); }
  }
  function maaned(s) { var d = s.split("-"); return MD[+d[1] - 1] + " " + d[0].slice(2); }
  function harSide(slug) { var S = (window.NDI_DATA || {}).sider || {}; return !!(slug && S[slug] === true); }   /* Å20 (B) */
  function link(navn, slug) { return harSide(slug) ? '<a href="selskaber/' + esc(slug) + '.html">' + esc(navn) + "</a>" : esc(navn); }

  /* ---------- eksempeldata-mærke ---------- */
  var hoved = document.querySelector(".v18-portefolje-hoved");
  if (P && P.eksempeldata && hoved) {
    var m = document.createElement("p"); m.className = "v18-eksempel"; m.setAttribute("role", "note");
    m.innerHTML = "<strong>Eksempeldata</strong> " + esc(P.eksempelNote); hoved.insertBefore(m, knap);
  }

  /* ---------- 1. Portefølje ---------- */
  function portfolio() {
    var b = P.beholdning, g = P.geografi;
    var top = b.top10.map(function (r) { return '<li><span class="v18p-navn">' + link(r.navn, r.slug) + '</span><span class="v18p-spor" aria-hidden="true"><i style="--v:' + r.bar + '"></i></span><b>' + p2(r.andel) + "</b></li>"; }).join("");
    var kaede = "";
    if (VK && P.vaerdikaede) {
      /* K17: portefolje.vaerdikaede = [{id, andel, antal, selskaber:[{slug, andel}]}] færdigsorteret fra data.
         Teksterne slås kun op i vaerdikaede-tekster (gruppe via id, selskab via slug). Ingen sortering eller filtrering her. */
      var navne = {};
      VK.grupper.forEach(function (x) { navne[x.id] = x; });
      kaede = '<div class="panel v18p-kaede"><span class="eyebrow">TEKNOLOGI ER MERE END ÉN SEKTOR</span><h3>Fra chips til det, chipsene gør muligt.</h3>' +
        "<p>Teknologi går på tværs af traditionelle sektorer. Her er de beskrevne selskaber fra fonden, samlet efter deres rolle i værdikæden. Vælg et selskab for at se mere.</p><ol class=\"v18p-grupper\">" +
        P.vaerdikaede.map(function (gr, i) {
          var t = navne[gr.id] || {};
          return '<li><span class="v18p-nr">' + (i < 9 ? "0" : "") + (i + 1) + "</span><h4>" + esc(t.navn) + "</h4><p>" + esc(t.tekst) + '</p><p class="small">' + heltal(gr.antal) + " selskaber · " + p2(gr.andel) + ' af fonden</p><div class="v18p-chips">' +
            gr.selskaber.map(function (s) {
              var x = VK.selskaber[s.slug] || {};
              return "<details><summary>" + esc(x.navn) + "</summary><p>" + esc(x.beskrivelse) + '</p><p class="small">' + p2(s.andel) + " af fonden" +
                (harSide(s.slug) ? ' · <a href="selskaber/' + esc(s.slug) + '.html">Se selskabet</a>' : "") + (x.kilde ? ' · <a href="' + esc(x.kilde) + '" target="_blank" rel="noopener">Kilde ↗</a>' : "") + "</p></details>";
            }).join("") + "</div></li>";
        }).join("") +
        '</ol><p class="small">Et udvalg til at forstå forretningerne — ikke en fuld fordeling af fonden eller en GICS-klassifikation. Temaerne bygger på selskabernes beskrivelser og kan overlappe. Hele beholdningslisten og den separate sektorfordeling findes nedenfor.</p></div>';
    }
    var stop = b.sektorer.map(function (s, i) { return "var(--v18p-f" + (i % 12) + ") " + s.ringFra + "% " + s.ringTil + "%"; }).join(",");
    var sekt = b.sektorer.map(function (s, i) { return '<li><i style="background:var(--v18p-f' + (i % 12) + ')"></i><span>' + esc(s.navn) + "</span><b>" + p2(s.andel) + "</b></li>"; }).join("");
    var lande = g.lande.map(function (l) { return "<li><span>" + esc(l.land) + "</span><b>" + p2(l.andel) + "</b></li>"; }).join("");
    var rk = b.positioner.map(function (r) {
      return '<tr><th scope="row">' + link(r.navn, r.slug) + "<small>" + esc(r.isin) + "</small></th><td>" + esc(r.sektor || "Ikke klassificeret") + "</td><td>" + p2(r.andel) + "</td><td>" + (r.afstand52 == null ? "—" : p1(r.afstand52) + (r.afstandBasis === "kortere" ? "*" : "")) + "</td></tr>";
    }).join("");
    return '<section class="v18p-del" id="portefoeljen-portfolio" aria-labelledby="h-p-portfolio">' +
      '<div class="panel"><span class="eyebrow">PORTEFØLJE</span><h3 id="h-p-portfolio">Mange selskaber. Ingen dominerende enkeltposition.</h3>' +
      '<div class="metrics"><div><span>Antal værdipapirpositioner</span><strong>' + heltal(b.antalPositioner) + "</strong><small>værdipapirpositioner</small></div>" +
      "<div><span>De 10 største tilsammen</span><strong>" + p2(b.top10Sum) + "</strong><small>Andel af fondens formue</small></div>" +
      "<div><span>Effektivt antal positioner</span><strong>" + heltal(b.effektivtAntal) + "</strong><small>1 / Σ(wᵢ / Σw)²</small></div></div>" +
      '<div class="v18p-konc" role="img" aria-label="De 10 største: ' + p2(b.top10Sum) + ". Øvrige værdipapirer: " + p2(b.oevrigeVaerdipapirer) + ". Konti og øvrige: " + p2(b.kontiOgOevrige) + '"><i class="a" style="flex-grow:' + b.top10Sum + '"></i><i class="b" style="flex-grow:' + b.oevrigeVaerdipapirer + '"></i><i class="c" style="flex-grow:' + b.kontiOgOevrige + '"></i></div>' +
      '<h4>De 10 største positioner</h4><p class="small">Den lyse del er deres andel af fondens formue. Resten er øvrige positioner og konti. Mange positioner fjerner ikke markedsrisikoen.</p>' +
      '<ol class="v18p-top">' + top + '</ol><p class="small">Vægtene er andele af fondens formue. Søjlerne er skaleret efter den største position.</p><a class="v18p-videre" href="#portefoeljen-beholdninger">Se alle positionerne →</a></div>' +
      kaede +
      '<div class="panel"><span class="eyebrow">FORDELING EFTER VÆGT</span><h3>Sektorer · leverandørens klassifikation</h3><p>Vi forstår teknologi bredere end en enkelt sektor: Teknologi kan være central for selskaber, der klassificeres inden for eksempelvis kommunikation, forbrug eller industri. Denne fordeling bygger på Yahoo Finances sektorinddeling, ikke en verificeret GICS-klassifikation.</p>' +
      '<div class="v18p-ringboks"><div class="v18p-ring" style="background:conic-gradient(' + stop + ')" role="img" aria-label="Sektorfordeling"><span><b>' + p2(b.vaerdipapirerIAlt) + "</b>værdipapirer</span></div><ul class=\"v18p-sektorer\">" + sekt + "</ul></div>" +
      '<p class="small">Ringen viser fordelingen inden for værdipapirerne; procenterne er af hele fondens formue. Kontanter er udenfor. ' + p2(b.klassificeret) + " af formuen er klassificeret efter leverandørens sektorinddeling, ikke GICS.</p></div>" +
      '<div class="panel"><span class="eyebrow">SELSKABERNES HJEMSTED</span><h3>Hvor ligger selskabernes hovedsæder?</h3><ul class="v18p-lande">' + lande + '</ul><p class="small">Fordelingen viser selskabernes hovedsæder, ikke hvor deres indtjening kommer fra. Konti indgår ikke i landefordelingen.</p></div>' +
      '<div class="panel" id="portefoeljen-beholdninger"><span class="eyebrow">BEHOLDNINGER</span><h3>Alle positioner</h3><p class="small">' + heltal(b.antalPositioner) + " positioner pr. " + dato(P.andelsdato) + ". Sektoroplysninger er foreløbige leverandørklassifikationer. — betyder utilstrækkelige data. * Kortere historik end 52 uger; den tilgængelige periode bruges.</p>" +
      '<div class="v18p-tabel" tabindex="0" role="region" aria-label="Alle positioner; rul for flere rækker"><table><thead><tr><th scope="col">Selskab</th><th scope="col">Sektor</th><th scope="col">Vægt</th><th scope="col">Under 52-ugers top</th></tr></thead><tbody>' + rk + "</tbody></table></div>" +
      '<p class="small">Rul i tabellen for flere rækker. På små skærme kan du også rulle til siden →</p></div></section>';
  }

  /* ---------- små linjegrafer (kun koordinater) ---------- */
  function linjegraf(serier, etiket) {
    /* Aksen afrundes til hele 10 % omkring seriernes yderpunkter: kun koordinater (afsnit 9 pkt. 3) */
    var lo = Infinity, hi = -Infinity;
    serier.forEach(function (s) { s.p.forEach(function (r) { if (r[1] < lo) lo = r[1]; if (r[1] > hi) hi = r[1]; }); });
    lo = Math.floor(Math.min(lo, 0) / 10) * 10; hi = Math.ceil(Math.max(hi, 0) / 10) * 10; if (hi === lo) hi = lo + 10;
    var w = 640, h = 200, x0 = 44, x1 = w - 8, y0 = 12, y1 = h - 26, a = serier[0].p;
    var t0 = Date.parse(a[0][0]), span = (Date.parse(a[a.length - 1][0]) - t0) || 1;
    function x(d) { return (x0 + (Date.parse(d) - t0) / span * (x1 - x0)).toFixed(1); }
    function y(v) { return (y0 + (hi - v) / (hi - lo) * (y1 - y0)).toFixed(1); }
    var g = "", step = (hi - lo) / 4;
    for (var i = 0; i <= 4; i++) { var v = lo + step * i; g += '<line class="gitter" x1="' + x0 + '" x2="' + x1 + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (x0 - 6) + '" y="' + (+y(v) + 4) + '" text-anchor="end">' + tal(v, 0) + " %</text>"; }
    var lin = serier.map(function (s) { return '<path class="' + s.k + '" fill="none" d="' + s.p.map(function (r, i) { return (i ? "L" : "M") + x(r[0]) + "," + y(r[1]); }).join("") + '"/>'; }).join("");
    return '<svg class="v18p-graf" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(etiket) + '">' + g + lin +
      '<text x="' + x0 + '" y="' + (h - 6) + '">' + dato(a[0][0]) + '</text><text x="' + x1 + '" y="' + (h - 6) + '" text-anchor="end">' + dato(a[a.length - 1][0]) + "</text></svg>";
  }

  /* ---------- 2. 52-ugers top ---------- */
  function highs() {
    var t = P.top52, r = P.risiko;
    var bars = t.intervaller.map(function (iv, i) {
      return '<button type="button" class="v18p-soejle" data-iv="' + i + '" aria-pressed="false" style="--v:' + iv.bar + '"><span class="v18p-tal">' + heltal(iv.antal) + " aktier<small>/ " + p2(iv.andel) + '</small></span><span class="v18p-stolpe"><i></i></span><span class="v18p-iv">' + iv.fra + "–" + iv.til + " %</span></button>";
    }).join("");
    var hist = t.historik.map(function (h) { return [h.dato, h.middel]; }), med = t.historik.map(function (h) { return [h.dato, h.median]; });
    var fald = r.faldSerie;
    /* K17 (Byggespec 17:49): tom tilstand, når ingen positioner er fordelt i intervallerne (alle antal = 0). Ingen tal. */
    var tom = t.intervaller.every(function (iv) { return iv.antal === 0; });
    return '<section class="v18p-del" id="portefoeljen-highs" aria-labelledby="h-p-highs"><div class="panel"><span class="eyebrow">AKTIERNES KURSUDVIKLING</span><h3 id="h-p-highs">Afstand til toppen · op til 52 uger</h3>' +
      "<p>Seneste tilgængelige lukkekurs på eller før porteføljedatoen sammenholdt med højeste dagskurs i de foregående 52 uger. Ikke totalafkast og ikke et mål for, om en aktie er billig.</p>" +
      (tom ? "" + "</div>" :
      '<div class="metrics"><div><span>Middelafstand · ligevægtet</span><strong>' + p1(t.middelAfstand) + "</strong><small>Hver målt position tæller lige meget</small></div><div><span>Medianafstand</span><strong>" + p1(t.medianAfstand) + "</strong><small>Halvdelen ligger nærmere toppen</small></div><div><span>Vægtet afstand</span><strong>" + p1(t.vaegtetAfstand) + "</strong><small>Vægtet inden for de målte positioner</small></div></div>" +
      '<div class="v18p-histogram" role="group" aria-label="Aktier fordelt efter afstand til toppen">' + bars + "</div>" +
      '<p class="small">Antal aktier / andel af hele formuen. Klik på en søjle for at se aktierne.</p><div class="v18p-ivliste" id="v18p-ivliste" aria-live="polite"></div>' +
      '<p class="small">Afstand til højeste observerede kurs inden for op til 52 uger; kortere historik bruger den tilgængelige periode.</p></div>') +
      '<div class="panel"><span class="eyebrow">TO FORSKELLIGE MÅL · SAMME TIDSAKSE</span><h3>Fondens rekorder og aktiernes egne toppe</h3>' +
      "<p>Start med fonden øverst: Når kurven når 0 %, er den samlede investering tilbage på sin hidtil højeste værdi (ATH). Sammenlign derefter med aktierne nedenunder — de har hver deres top og tæller her lige meget, uanset hvor meget fonden ejer.</p>" +
      "<h4>PMINDI · fonden samlet</h4><p class=\"small\">Afstand til fondens hidtil højeste totalafkast. Med geninvesteret udbytte, efter løbende omkostninger.</p><p>Afstand til fondens hidtil højeste værdi: <strong>" + p1(r.aktueltFald) + "</strong></p>" +
      linjegraf([{ k: "linje-fond", p: fald }], "Afstand til fondens hidtil højeste værdi") +
      '<p class="small">0 % betyder rekordniveau — ikke 0 % i afkast.</p>' +
      (tom ? "" : '<h4>De enkelte aktier · ligevægtet</h4><p class="small">Afstand til hver akties egen top i op til 52 uger. Dette er ikke fondens afkast eller fondens ATH.</p>' +
      '<div class="legend"><span>Middelafstand ' + p1(t.historikSeneste.middel) + "</span><span>Medianafstand " + p1(t.historikSeneste.median) + "</span></div>" +
      linjegraf([{ k: "linje-sammen", p: med }, { k: "linje-fond", p: hist }], "Middel- og medianafstand til aktiernes egen top") +
      "<p class=\"small\">Hver aktie har sin egen topdato. Derfor kan afstandene være over 0 %, selv når fonden samlet er på ATH.</p><p>En aktie kan være langt fra sin egen top, samtidig med at fonden sætter rekord. Andre aktier kan have løftet det samlede afkast, og både positionernes størrelse, handler og geninvesteret udbytte spiller ind. De to figurer besvarer derfor forskellige spørgsmål, ikke to versioner af det samme.</p>") +
      '<p class="risk">Historiske afkast er ikke en pålidelig indikator for fremtidige afkast. Figurerne viser historiske forløb, ikke en investeringsstrategi eller prognose.</p></div></section>';
  }
  function visInterval(i) {
    var iv = P.top52.intervaller[i], ud = document.getElementById("v18p-ivliste");
    rod.querySelectorAll(".v18p-soejle").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.iv === i)); });
    ud.innerHTML = "<h4>" + iv.fra + "–" + iv.til + " % under toppen · " + heltal(iv.antal) + " aktier</h4>" + (iv.aktier.length ? '<div class="v18p-tabel v18p-tabel--lav" tabindex="0" role="region" aria-label="Aktier i intervallet"><table><thead><tr><th scope="col">Selskab</th><th scope="col">Vægt</th><th scope="col">Lukkekurs</th><th scope="col">Top</th><th scope="col">Afstand</th></tr></thead><tbody>' +
      iv.aktier.map(function (a) { return '<tr><th scope="row">' + link(a.navn, a.slug) + "</th><td>" + p2(a.andel) + "</td><td>" + tal(a.lukkekurs, 2) + NB + esc(a.valuta) + "<small>" + dato(a.kursdato) + "</small></td><td>" + tal(a.top, 2) + NB + esc(a.valuta) + "</td><td>" + p1(a.afstand52) + (a.afstandBasis === "kortere" ? "*" : "") + "</td></tr>"; }).join("") + "</tbody></table></div>" : "");
  }

  /* ---------- 3. Risiko ---------- */
  var KAL = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  function kalender() {
    if (!U) return '<p class="v18-fejl" role="status">Grafen er ikke tilgængelig lige nu</p>';
    var rk = U.kalender.map(function (aar) {
      var pr = {}; aar.maaneder.forEach(function (m) { pr[+m.maaned.slice(5)] = m; });   /* opslag efter månedsnummer */
      return '<tr><th scope="row">' + aar.aar + (aar.delvis ? "*" : "") + '</th><td class="annual-total ' + (aar.afkast >= 0 ? "positive" : "negative") + '">' + p1(aar.afkast) + "</td>" +
        KAL.map(function (k, i) { var m = pr[i + 1]; return '<td class="' + (m ? (m.afkast >= 0 ? "positive" : "negative") : "muted") + '">' + (m ? tal(m.afkast, 1) + (m.delvis ? "*" : "") : "—") + "</td>"; }).join("") + "</tr>";
    }).join("");
    return '<section class="calendar-block"><div class="calendar-scroll" tabindex="0" role="region" aria-label="Månedlige afkast; rul vandret på små skærme"><table class="return-calendar"><thead><tr><th scope="col">År</th><th scope="col" class="annual-total">Samlet afkast</th>' +
      KAL.map(function (k) { return '<th scope="col">' + k + "</th>"; }).join("") + "</tr></thead><tbody>" + rk + '</tbody></table></div><p class="small muted">Totalafkast i %, med geninvesteret udbytte, efter løbende omkostninger og før skat. Årets samlede afkast står ved årstallet. * Delvis måned eller år. Tomme måneder er ikke 0 %. Se beregningsmetoden for datogrundlaget.</p></section>';
  }
  function risk() {
    var r = P.risiko;
    function kort(navn, v, under) { return "<div><span>" + navn + "</span><strong>" + v + "</strong><small>" + under + "</small></div>"; }
    var ned = r.nedture.map(function (n) {
      var gen = !!n.genvundet;
      return "<tr><td>" + dato(n.top) + "<br>" + dato(n.bunddato) + '</td><td><span class="negative">' + fortegn(n.fald) + '</span><br><span class="positive">' + fortegn(n.stigning) + "</span></td><td>" + (gen ? "Top genvundet" : "Ikke genvundet") + "<br>" + dato(n.slutdato) + "</td><td>" + heltal(n.dage) + " dage<small>" + (gen ? "Fra bunden til genvundet top" : "Forløbet siden bunden; toppen er endnu ikke genvundet") + "</small></td></tr>";
    }).join("");
    return '<section class="v18p-del" id="portefoeljen-risk-summary" aria-labelledby="h-p-risk"><div class="panel"><span class="eyebrow">RISIKO</span><h3 id="h-p-risk">Afkast og risiko i tal</h3><p class="small">Historiske nøgletal beregnet på klassens totalafkast i DKK.</p>' +
      '<div class="metrics v18p-kort">' + kort("Største observerede fald", p1(r.stoersteFald), "Totalafkast · siden start") + kort("Afstand til højeste top", p1(r.aktueltFald), "Totalafkast · nu") +
      kort("Årlig volatilitet", p1(r.volatilitet), "Månedsafkast · mindst 12 måneder") + kort("Sharpe-ratio", r.sharpe == null ? "—" : tal(r.sharpe, 2), "DKK · DESTR · annualiseret") +
      kort("Positive hele måneder", heltal(r.positiveMaaneder) + " / " + heltal(r.heleMaaneder), "Nulafkast tæller ikke som positivt") + kort("Bedste hele måned", p1(r.bedsteMaaned), "") + kort("Værste hele måned", p1(r.vaersteMaaned), "") + "</div>" +
      '<p class="small">Tallene beskriver historiske udsving, ikke hvor meget du kan tabe. Volatilitet og Sharpe bygger på ' + heltal(r.heleMaaneder) + " hele måneder; den igangværende måned tæller ikke med. En kort historik kan udelade store markedsfald. Datoer og beregning findes under beregningsmetoder.</p></div>" +
      '<div class="panel"><span class="eyebrow">FONDEN SAMLET · HISTORISKE FORLØB</span><h3>Nedture og efterfølgende stigninger</h3><p class="small">Siden start · de fem dybeste fald og den efterfølgende stigning. Fra top til bund (rød) og fra bund til genvundet top eller seneste dato (grøn). Procenterne har forskellige udgangspunkter: −50 % kræver +100 % for at komme tilbage. Tiden fra bund til top er antal kalenderdage.</p>' +
      '<div class="v18p-tabel v18p-tabel--auto" tabindex="0" role="region" aria-label="Nedture og stigninger"><table><thead><tr><th scope="col">Top → bund</th><th scope="col">Fald / efterfølgende stigning</th><th scope="col">Status</th><th scope="col">Fra bund til top</th></tr></thead><tbody>' + ned + "</tbody></table></div>" +
      '<p class="risk">Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Bunde kendes først bagefter. Alle fem dybeste observerede fald vises; opturene er ikke en strategi eller en prognose. Totalafkast efter løbende omkostninger og før skat. Forløbene illustrerer, at volatilitet omfatter både nedture og opture.</p></div>' +
      '<div class="panel"><span class="eyebrow">MÅNED FOR MÅNED</span><h3>Afkastkalender</h3>' + kalender() + "</div></section>";
  }

  /* ---------- 4. Metode ---------- */
  function method() {
    var m = P.metode, o = m.omkostninger, r = P.risiko;
    function afs(t, x) { return "<details><summary>" + t + "</summary>" + x + "</details>"; }
    var aar = Object.keys(m.aarsrapport.afkast).map(function (k) { return k + ": " + p2(m.aarsrapport.afkast[k]); }).join(" · ");
    var udb = U ? U.udbytte.map(function (u) { return "<tr><td>" + dato(u.exDato) + "</td><td>" + dato(u.betalingsdato) + "</td><td>" + tal(u.belob, 2) + "</td></tr>"; }).join("") : "";
    return '<section class="v18p-del" id="portefoeljen-method" aria-labelledby="h-p-method"><div class="panel"><span class="eyebrow">KILDER, FORMLER OG BEGRÆNSNINGER</span><h3 id="h-p-method">Data om fonden &amp; metode</h3>' +
      "<h4>Dagligt datagrundlag</h4><p>Data kommer fra Fundmarkets rapporter via det fælles dataregister. Nye rapporter behandles i den daglige opdateringskørsel. Datoer, afkast, beholdninger, kildedækning og PRIIP-KID kontrolleres, før en samlet version frigives. Rapportdatoen ovenfor viser, hvilket datagrundlag du ser; den er ikke en kurs i realtid.</p>" +
      '<span class="eyebrow">OMKOSTNINGER I PRIIP-KID</span><h4>Hvad koster fonden?</h4><div class="metrics v18p-kort"><div><span>Forvaltning og drift</span><strong>' + p2(o.loebende) + "</strong><small>Årlig post i KID</small></div><div><span>Transaktionsomkostninger</span><strong>" + p2(o.transaktion) + "</strong><small>KID-estimat; kan variere</small></div><div><span>Ved køb / emission</span><strong>" + p2(o.indgang) + "</strong><small>KID’s entry-omkostning</small></div><div><span>Ved salg / indløsning</span><strong>" + p2(o.udgang) + "</strong><small>KID’s exit-omkostning</small></div></div>" +
      '<p class="small">Forvaltning og transaktioner summerer til ' + p2(o.sumForvaltningTransaktion) + ". Det er ikke KID’s samlede omkostningseksempel. Resultatgebyr: " + p2(o.resultat) + ".</p>" +
      '<p class="small">Fondens løbende omkostninger er allerede indregnet i afkastet og skal ikke trækkes fra igen. Investorens entry/exit, egne handelsomkostninger og skat er ikke medregnet.</p>' +
      '<p class="small">Kilde: <a href="' + esc(m.kidUrl) + '" target="_blank" rel="noopener">PRIIP-KID ' + dato(m.kidDato) + " ↗</a>. Seneste dokumentkontrol: " + lokalDato(m.kidKontrol) + ".</p>" +
      "<h4>KID’s samlede omkostningseksempel</h4><p class=\"small\">Ved 100.000 kr. investeret: " + p2(o.aarligEtAar) + " årlig omkostningsmæssig konsekvens ved exit efter ét år og " + p2(o.aarligFemAar) + " pr. år ved exit efter fem år. Forudsætninger: 0 % afkast første år og KID’s moderate scenarie for den længere periode. Ikke en fast årlig gebyrsats eller afkastprognose. Skal ikke lægges oven i de øvrige omkostninger. Carried interest: " + p2(o.carried) + ".</p>" +
      '<p class="small">Rapportgrundlag ' + dato(m.nav.rapportdato) + ". Alle afkast er i DKK og efter afdelingens løbende omkostninger. Fonden har intet benchmark. Beregninger: " + esc(m.beregningsversion) + ".</p>" +
      afs("Totalafkast, ÅTD og CAGR", "<p>Totalafkast = (slutindeks / startindeks − 1) × 100. Startindekset er 100. ÅTD måles fra sidste officielle kursdato i det foregående år. Historikken starter ved 100 på Fundmarkets første viste dato: PMINDI " + dato(m.historikStart) + ". Det er grafhistorikkens start, ikke nødvendigvis klassens juridiske stiftelsesdato. For PMINDI beregnes udbyttekorrektionen som kursen før ex-udbyttedato divideret med samme kurs fratrukket udbyttet. Efterfølgende NAV multipliceres med de akkumulerede korrektionsfaktorer. Beregningen afstemmes mod Fundmarkets årsafkast og samtidige ÅTD. Små afrundingsafvigelser kan forekomme, fordi kildens kurser er offentliggjort med to decimaler. CAGR vises først efter ét år.</p>") +
      afs("12 måneder og månedsafkast", "<p>Månedsafkast = sidste indeks i måneden / sidste indeks i forrige måned − 1. Kun nabomåneder anvendes. Første måned uden et foregående månedspunkt udelades. Stjerne markerer en uafsluttet eller utilstrækkeligt dækket måned. Manglende årshistorik giver intet tal.</p>") +
      afs("Volatilitet og Sharpe", "<p>Volatilitet = stikprøvestandardafvigelsen (n−1) af månedsafkast, annualiseret. Sharpe = gennemsnitligt månedligt merafkast / stikprøvestandardafvigelsen af merafkast, annualiseret. Merafkast er fondens månedsafkast minus periodens sammensatte DESTR-afkast. Danmarks Nationalbanks DESTR via Statistikbanken, " + esc(r.renteKilde.tabel) + "/" + esc(r.renteKilde.serie) + " er DKK-renteproxy. Der indsættes aldrig en antaget nulrente. Kvadratrodsannualisering forudsætter, at seriel afhængighed ikke dominerer; estimatet er ikke en garanti. Metoden følger Sharpe-ratioens merafkastprincip.</p><p>For PMINDI: " + heltal(r.heleMaaneder) + " hele månedsperioder fra " + dato(r.risikoperiode.fra) + " til " + dato(r.risikoperiode.til) + ".</p>") +
      afs("Fald fra top", "<p>Drawdown på dato t = (indeks på t / højeste tidligere eller aktuelle indeks − 1) × 100. Største observerede fald er minimum af denne serie inklusive startpunktet. Fald mellem rapportobservationer kan være større.</p>") +
      afs("Beholdninger, sektorer og koncentration", "<p>Vægte kommer fra Fundmarkets rapporter, ikke fra antal aktier. Positive ISIN-positioner tælles; samme udsteder kan have flere instrumenter. Top 10 er summen af de ti største positive instrumentvægte. Effektivt antal = 1 / Σ(wᵢ / Σw)². Sektorer summerer rapportvægte efter leverandørens klassifikation (ikke GICS). Ringdiagrammet normaliserer alene positive værdipapirvægte; alle viste procenttal er af hele formuen. Ukendt sektor bevares særskilt. Konti og andre nettobalanceposter indgår ikke i ringen.</p>") +
      afs("Geografi", "<p>Landene bygger på selskabsprofiler, suppleret med selskabernes egne kontakt- og investorsider, virksomhedsprofiler samt officielle indberetninger. Operationelt hovedsæde anvendes, hvor det kan dokumenteres; ellers selskabets oplyste hovedkontor eller principal executive office. Det er ikke børsland, handelsvaluta, juridisk registreringsland eller omsætningsfordeling. Klassifikationen gælder ved opslag, ikke historisk.</p>") +
      afs("52-ugers top", "<p>Afstand = (1 − seneste lukkekurs / højeste observerede intradagkurs) × 100. Kortere historik bruger sin tilgængelige periode. Uden verificerede kurser beregnes ingen afstand. Vægtene er andele af hele formuen. Den historiske figur bruger derimod justerede lukketoppe og datidens beholdninger.</p>") +
      afs("Validering og begrænsninger", "<p>Datofællesskab, summer, positive indeks, formler, historiklængder og kildedækning kontrolleres maskinelt. Grafens datoer er officielle kursdatoer; beholdninger følger rapportdatoen. De to datoer kan være forskellige. Derfor er risikomålene indikative, ikke godkendte officielle fondsnøgletal. Eksterne kurs- og selskabsoplysninger afhænger af leverandørens noteringer og behandling af selskabshændelser. Ukendte eller uafklarede observationer vises uden et beregnet tal.</p>") +
      afs("Afstemning til årsrapport", "<p>Afsluttede års afkast er kontrolleret mod årsrapport 2025, PDF-side " + heltal(m.aarsrapport.side) + ": " + aar + ". Startåret er en delperiode.</p>") +
      '<span class="eyebrow">KLASSE OG UDLODNINGER</span><h4>Udloddende klasse</h4><p class="small">Strategien kombinerer langsigtede aktiepositioner med aktiv handel, der søger at udnytte kursudsving. Det er en metode, ikke dokumentation for et merafkast fra handlerne.</p>' +
      '<p class="small">Start: ' + dato(m.start) + ". Anbefalet investeringsperiode: " + heltal(m.anbefaletAar) + " år. Produktet kan være uegnet, hvis pengene skal bruges tidligere. Høj risikovillighed og evne til at bære tab er nødvendige.</p>" +
      (udb ? '<div class="v18p-tabel v18p-tabel--auto" tabindex="0" role="region" aria-label="Udlodninger"><table><thead><tr><th scope="col">Ex-dato</th><th scope="col">Betalingsdato</th><th scope="col">Kr. pr. bevis</th></tr></thead><tbody>' + udb + "</tbody></table></div>" : "") +
      '<p class="small">På ex-datoen fragår udlodningen normalt kursen. Det er ikke i sig selv et investeringstab. Grafens totalafkast forudsætter geninvestering og skal ikke tillægges udbyttet igen.</p>' +
      '<span class="eyebrow">OFFICIEL INDRE VÆRDI</span><p class="v18p-nav">' + tal(m.nav.kurs, 2) + NB + "DKK</p><p class=\"small\">Værdiansættelsesdato " + dato(m.nav.dato) + " · fundet i Fundmarkets rapport " + dato(m.nav.rapportdato) + ".</p>" +
      '<p class="small">Dette er rapportens felt for officiel NAV, ikke dens indikative aktuelle kurs. Den officielle værdi kan vedrøre en tidligere dato end beholdningerne.</p></div></section>';
  }

  /* ---------- fold, spring og menu ---------- */
  var tegnet = false;
  function tegn() {
    if (tegnet) return; tegnet = true;
    if (!P) { rod.innerHTML = '<p class="v18-fejl" role="status">Grafen er ikke tilgængelig lige nu</p>'; return; }
    try { rod.innerHTML = portfolio() + highs() + risk() + method(); }
    catch (e) { rod.innerHTML = '<p class="v18-fejl" role="status">Grafen er ikke tilgængelig lige nu</p>'; if (window.console) console.warn("NDI portefølje:", e); return; }
    rod.addEventListener("click", function (e) { var b = e.target.closest(".v18p-soejle"); if (b) visInterval(+b.dataset.iv); });
  }
  function aabnFold() { tegn(); fold.hidden = false; knap.setAttribute("aria-expanded", "true"); knap.hidden = true; spy(); }
  function lukFold() {
    fold.hidden = true; spy(); knap.setAttribute("aria-expanded", "false"); knap.hidden = false;
    if (/^#portefoeljen-/.test(location.hash)) history.replaceState(null, "", "#portefoeljen");
    knap.focus();
  }
  function hopTil(id) {
    aabnFold();
    var el = document.getElementById("portefoeljen-" + id); if (!el) return;
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  function fraHash() { var m = /^#portefoeljen-(.+)$/.exec(location.hash); if (m) { hopTil(decodeURIComponent(m[1])); return true; } return false; }

  knap.addEventListener("click", aabnFold);
  fold.querySelector("[data-portefolje-luk]").addEventListener("click", lukFold);
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-portefolje]"); if (!a) return;
    var href = a.getAttribute("href") || ""; if (href.charAt(0) !== "#") return;
    e.preventDefault(); history.pushState(null, "", href); hopTil(a.dataset.portefolje);
  });
  window.addEventListener("hashchange", fraHash);

  var under = Array.prototype.slice.call(document.querySelectorAll(".sm-link--under[data-portefolje]"));
  var IDS = ["portfolio", "highs", "risk-summary", "method"];
  function spy() {
    var valgt = null, linje = window.innerHeight * 0.3;
    if (!fold.hidden) IDS.forEach(function (id) { var el = document.getElementById("portefoeljen-" + id); if (el) { var r = el.getBoundingClientRect(); if (r.top <= linje && r.bottom > linje) valgt = id; } });
    under.forEach(function (a) { if (a.dataset.portefolje === valgt) a.setAttribute("data-aktiv", ""); else a.removeAttribute("data-aktiv"); });
  }
  var raf = 0;
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; spy(); }); }, { passive: true });
  fraHash();
})();
