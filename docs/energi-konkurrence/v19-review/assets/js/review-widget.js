

(function () {
  "use strict";
  var V = window.NDI_VALG || {};
  var DL = window.NDI_DATALAG || { ndi: function () { return null; } };
  var U = DL.ndi("fondsudvikling"), M = (DL.ndi("portefolje") || {}).metode, F = (window.DAGENS_TAL || {}).fond;
  var NQ = V.Aa9_nasdaq !== false;    
  var app = document.getElementById("afkast");
  var info = document.getElementById("vigtig-information-indhold");
   
  if (!U || !U.perioder || !U.perioder.length) { if (app) app.innerHTML = '<p class="lille v18-fejl" role="status">Grafen er ikke tilgængelig lige nu. Der vises ingen gemte tal som erstatning.</p>'; return; }
  var NAVN = (F && F.id) || V.D3_fond || "PMINDI";

  var fmt = function (v) { return v == null ? "—" : Number(v).toLocaleString("da-DK", { maximumFractionDigits: 1, minimumFractionDigits: 1 }); };
  var pct = function (v) { return v == null ? "—" : (v > 0 ? "+" : "") + fmt(v) + " %"; };
  var date = function (s) { return new Date(s + "T12:00:00").toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" }); };
  var money = function (v) { return v == null ? "—" : Number(v).toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var kr = function (v) { return v == null ? "—" : Number(v).toLocaleString("da-DK") + " kr."; };
  var per = "all", obs;
  function P() { return U.perioder.filter(function (p) { return p.id === per; })[0] || U.perioder[U.perioder.length - 1]; }

  function calendar() {
    var labels = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    var body = (U.kalender || []).slice(0,3).map(function (y) {
      return '<tr><th scope="row">' + y.aar + '</th><td class="annual-total ' + (y.afkast >= 0 ? "positive" : "negative") + '">' + pct(y.afkast) + (y.delvis ? " *" : "") + "</td>" +
        labels.map(function (m, i) { var r = y.maaneder.filter(function (r) { return +r.maaned.slice(5) === i + 1; })[0]; return '<td class="' + (r ? (r.afkast >= 0 ? "positive" : "negative") : "muted") + '">' + (r ? pct(r.afkast) : "") + (r && r.delvis ? " *" : "") + "</td>"; }).join("") + "</tr>";
    }).join("");
    return '<section class="calendar-block"><p class="calendar-mobile-hint">Stryg til siden for at se alle måneder. Årsafkastet bliver stående.</p><div class="calendar-scroll" tabindex="0" role="region" aria-label="Månedlige afkast; rul vandret på små skærme"><table class="return-calendar"><thead><tr><th scope="col">År</th><th scope="col" class="annual-total">Årsafkast</th>' + labels.map(function (m) { return '<th scope="col">' + m + "</th>"; }).join("") + "</tr></thead><tbody>" + body + '</tbody></table></div><p class="small muted">Totalafkast i DKK. Årsafkastet medregner renters rente — det er ikke summen af månederne. * Delvis måned eller år; det aktuelle år vises til seneste kursdato. En kortere historik vises fra klassens start.</p></section>';
  }

  function metrics() {
    var p = P();
    return '<div><span>Afkast i den valgte periode</span><strong>' + pct(p.afkast) + '</strong>' + (NQ ? '<small>Nasdaq-100: ' + pct(p.sammenligning) + '</small>' : '') + '</div>' +
      '<div><span>Årligt gennemsnit siden start</span><strong>' + pct(U.aarligtSidenStart) + "</strong>" + (U.aarligtSidenStart == null ? "<small>Vises, når afdelingen har ét års historik.</small>" : "") + "</div>" +
      '<div><span>100.000 kr. i den valgte periode</span><strong>' + kr(p.vaerdi100000) + "</strong></div>";
  }

  function skelet() {
    var risiko = M ? M.risikoklasse + " af " + M.risikoskalaMax : "—";
    return '<span class="eyebrow">NEWDEAL INVEST · MARKEDSFØRING</span><h1>Se fondens udvikling.</h1>' + (U.eksempeldata ? '<p class="v18-eksempel" role="note"><strong>Eksempeldata</strong> ' + U.eksempelNote + '</p>' : '') +
      '<section class="panel" id="fund-chart" aria-labelledby="h-udvikling"><div class="panel-head"><div><span class="eyebrow">' + NAVN + '</span><h2 id="h-udvikling">Udviklingen i fonden</h2></div><span class="small">Data pr. ' + date(U.andelsdato) + " · kursdata til " + date(U.kursdato) + "</span></div>" +
      '<div class="metrics" aria-live="polite" aria-atomic="true">' + metrics() + "</div>" +
      '<div class="toolbar"><div class="periods" role="group" aria-label="Vælg periode">' + U.perioder.map(function (p) { return '<button type="button" data-period="' + p.id + '" ' + (p.tilgaengelig ? "" : "disabled ") + 'aria-pressed="' + (per === p.id) + '">' + p.navn + "</button>"; }).join("") + '</div>' + (NQ ? '<span class="small">Nasdaq-100 · fast sammenligning i DKK</span>' : '') + '</div>' +
      '<div class="legend"><span>' + NAVN + ' · inkl. geninvesteret udbytte</span>' + (NQ ? '<span>Nasdaq-100 · omregnet til DKK</span>' : '') + '</div>' +
      '<div class="chart-wrap"><div class="chart-plot"></div><output class="chart-reading" aria-live="polite"></output></div>' +
      '<p class="risk chart-disclosure">Afkastet bygger på fondens indre værdi og inkluderer geninvesteret udbytte. Afkastet vises efter fondens løbende omkostninger. ' + (NQ ? 'Nasdaq-100 er en sammenligning i DKK, ikke fondens benchmark. ' : '') + 'Det årlige gennemsnit beregnes for hele afdelingens tilgængelige historik. Historisk afkast er ingen garanti for fremtidigt afkast. Du kan miste en del af eller hele din investering. Valutaudsving kan påvirke afkastet. Risiko: ' + risiko + '. <a href="https://www.newdealinvest.dk/risici" target="_blank" rel="noopener">Læs om risiko ↗</a></p></section>' +
      '<details id="return-calendar"' + (V.D1_kalender_foldet === false ? " open" : "") + '><summary><span class="fold-knap"><span class="fold-luk">Vis afkast måned for måned</span><span class="fold-aaben">Skjul afkast måned for måned</span></span></summary>' + calendar() + "</details>";
  }

  function bindChart() {
    var host = app.querySelector(".chart-plot"); if (!host) return;
    var p = P(), series = p.punkter.map(function (r) { return { d: r[0], v: r[1] }; }), other = (NQ ? p.sammenligningPunkter || [] : []).map(function (r) { return { d: r[0], v: r[1] }; });
    var byDate = new Map(other.map(function (r) { return [r.d, r.v]; })), index = series.length - 1;
    var output = app.querySelector(".chart-reading");
    var t0 = Date.parse(series[0].d), span = (Date.parse(series[series.length - 1].d) - t0) || 1;
    function read(i) { index = Math.max(0, Math.min(series.length - 1, i)); var r = series[index]; var last = index === series.length - 1; output.textContent = date(r.d) + " · " + NAVN + ": " + pct(last ? p.afkast : r.v) + (NQ ? " · Nasdaq-100: " + pct(last && p.sammenligning != null ? p.sammenligning : byDate.get(r.d)) : ""); var svg = host.querySelector("svg"), cur = host.querySelector(".chart-cursor"); if (cur) { var w = Number(svg.getAttribute("data-width")), x = 48 + (Date.parse(r.d) - t0) / span * (w - 126); cur.setAttribute("x1", x); cur.setAttribute("x2", x); } }
    function draw() {
      var w = Math.max(240, host.clientWidth), h = 280, values = [0].concat(series.map(function (r) { return r.v; }), other.map(function (r) { return r.v; }));
      var min = Math.min.apply(null, values), max = Math.max.apply(null, [1].concat(values)), raw = (max - min) / 4, power = Math.pow(10, Math.floor(Math.log10(raw))), step = [1, 2, 2.5, 5, 10].filter(function (n) { return n * power >= raw; })[0] * power, lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
      var x = function (d) { return 48 + (Date.parse(d) - t0) / span * (w - 126); }, y = function (v) { return 242 - (v - lo) / (hi - lo) * 222; };
      var path = function (arr) { return arr.map(function (r, i) { return (i ? "L" : "M") + x(r.d).toFixed(2) + "," + y(r.v).toFixed(2); }).join(" "); };
      var grid = "";
      for (var v = lo; v <= hi + step / 100; v += step) grid += '<line x1="48" x2="' + (w - 78) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="' + (Math.abs(v) < .001 ? "nul" : "gitter") + '"/><text x="40" y="' + (y(v) + 4) + '" text-anchor="end">' + Number(v.toFixed(2)).toLocaleString("da-DK") + " %</text>";
      var ends = [{ v: p.afkast, py: y(series[series.length - 1].v), c: "fond", label: NAVN }].concat(other.length ? [{ v: p.sammenligning, py: y(other[other.length - 1].v), c: "sammen", label: "Nasdaq-100" }] : []).map(function (r) { r.y0 = r.py; return r; }).sort(function (a, b) { return a.py - b.py; });
      if (ends.length === 2 && ends[1].py - ends[0].py < 26) { ends[0].py = Math.max(24, ends[0].py - 13); ends[1].py = ends[0].py + 26; }
      var endLabels = ends.map(function (r) { return '<line class="linje-' + r.c + '" x1="' + (w - 78) + '" x2="' + (w - 68) + '" y1="' + r.y0 + '" y2="' + r.py + '"/><text class="end-return tekst-' + r.c + '" x="' + (w - 62) + '" y="' + (r.py + 4) + '"><title>' + r.label + "</title>" + pct(r.v) + "</text>"; }).join("");
      host.innerHTML = '<svg class="chart" data-width="' + w + '" viewBox="0 0 ' + w + " " + h + '" role="img" tabindex="0" aria-label="Afkastgraf for ' + NAVN + (NQ ? ' og Nasdaq-100' : '') + '. Brug venstre og højre piletast til at aflæse datoer.">' + grid + endLabels +
        (other.length ? '<path class="linje-sammen" d="' + path(other) + '" fill="none" stroke-width="2" stroke-dasharray="5 5"/>' : '') + '<path class="linje-fond" d="' + path(series) + '" fill="none" stroke-width="2.8"/><line class="chart-cursor" y1="20" y2="242" stroke-dasharray="3 3"/><text x="48" y="272">' + date(series[0].d) + '</text><text x="' + (w - 78) + '" y="272" text-anchor="end">' + date(series[series.length - 1].d) + "</text></svg>";
      read(index);
    }
    host.onpointermove = function (e) { var rect = host.getBoundingClientRect(), t = Math.max(0, Math.min(1, (e.clientX - rect.left - 48) / (rect.width - 126))), target = t0 + t * span, best = 0; for (var i = 1; i < series.length; i++) if (Math.abs(Date.parse(series[i].d) - target) < Math.abs(Date.parse(series[best].d) - target)) best = i; read(best); };
    host.onkeydown = function (e) { if (["ArrowLeft", "ArrowRight", "Home", "End"].indexOf(e.key) >= 0) { e.preventDefault(); read(e.key === "Home" ? 0 : e.key === "End" ? series.length - 1 : index + (e.key === "ArrowLeft" ? -1 : 1)); } };
    host.onpointerleave = function () { read(series.length - 1); };
    if (obs) obs.disconnect(); if (window.ResizeObserver) { var sidstW = 0; obs = new ResizeObserver(function () { if (host.clientWidth !== sidstW) { sidstW = host.clientWidth; draw(); } }); obs.observe(host); }
    draw();
  }

  function pmindiVigtig() {
    if (!info || !M || !F) return;
    var c = M.omkostninger, kid = F.kidUrl || M.kidUrl;
    info.innerHTML = '<div class="information-grid"><div><h3>Datagrundlag</h3><p>Grafen viser totalafkast i DKK med geninvesteret udbytte for ' + String(M.juridiskNavn).replace(/kl\.? n/i, "andelsklasse n") + ", ISIN " + F.isin + ". Kurserne er hentet fra Fundmarkets offentliggjorte historik og afstemt mod rapporternes officielle NAV. Siden viser den validerede rapport med kursdata til " + date(U.kursdato) + ". Det er ikke realtidskurser eller officielt godkendte fondsnøgletal.</p>" +
      "<h3>Afkast og omkostninger</h3><p>Afkastet er efter fondens løbende omkostninger. Emissions- og indløsningstillæg på henholdsvis " + money(c.indgang) + " % og " + money(c.udgang) + " % ved køb og salg indgår ikke, og det samme gælder dine egne handelsomkostninger og skat. Historisk afkast er ingen garanti for fremtidigt afkast og er ikke en pålidelig indikator for, hvad du kan forvente fremover.</p>" +
      "<p>Forvaltning og drift: " + money(c.loebende) + " % årligt. Transaktionsomkostninger: " + money(c.transaktion) + " % (KID-estimat; kan variere). Fondens løbende omkostninger er allerede indregnet i afkastet og skal ikke trækkes fra igen.</p>" +
      '<p class="small">Årlig omkostningsvirkning (PRIIP-KID): ' + money(c.aarligFemAar) + " % ved " + M.anbefaletAar + " års ejertid og " + money(c.aarligEtAar) + ' % ved 1 års ejertid. <a href="' + kid + '" target="_blank" rel="noopener">Læs dokumentet med central information ↗</a></p></div>' +
      "<div><h3>Risiko og investeringshorisont</h3><p>Efter PRIIP-KID har afdelingen risikoklasse " + M.risikoklasse + " ud af " + M.risikoskalaMax + ", svarende til " + M.risikoTekst + " risiko. Klassificeringen forudsætter, at du beholder produktet i " + M.anbefaletAar + " år, som også er den anbefalede investeringsperiode. Den faktiske risiko kan variere betydeligt, hvis du indløser tidligere, og du kan da få mindre tilbage.</p>" +
      "<p>Produktet har ingen beskyttelse mod den fremtidige markedsudvikling, og du kan tabe noget af eller hele din investering. De væsentligste risici er aktiemarkedsrisiko, vækst- og sektorrisiko samt valutarisiko. Teknologi- og vækstaktier svinger ofte mere end det brede aktiemarked, både op og ned. Investeringen henvender sig til investorer med høj risikovillighed og lang investeringshorisont.</p>" +
      '<h3>Valg af afdeling og skat</h3><p class="small">Generel information, ikke en personlig anbefaling eller skatterådgivning. Skattebehandlingen afhænger af din individuelle situation og kan ændres. Valget afhænger også af depotudbyderens muligheder.</p>' +
      '<h3>Din investeringsbeslutning</h3><p>NewDeal Invest yder ikke investeringsrådgivning til investorer og formidler ikke ordrer. Materialet er markedsføring og ikke personlig investeringsrådgivning. Det tager ikke hensyn til din økonomi, erfaring eller risikovillighed, og enhver investeringsbeslutning træffer du selv. Læs <a href="' + kid + '" target="_blank" rel="noopener">PRIIP-KID ↗</a>, <a href="https://www.newdealinvest.dk/risici" target="_blank" rel="noopener">risikofaktorerne ↗</a> og <a href="https://node-api.fundmarket.dk/funds/documents/prospekt_ipm" target="_blank" rel="noopener">prospektet ↗</a> inden en endelig investeringsbeslutning.</p>' +
      "<p>PRIIP-KID indeholder et moderat resultatscenarie med de tilhørende beregningsforudsætninger. Scenariet er ikke en prognose eller en garanti for afkast. Aktiv forvaltning er ikke en garanti for merafkast.</p></div></div>";
  }

  function vigtig() {
      if(F.id==='PMINDI'){pmindiVigtig();return;}
      if(info) info.innerHTML='<p>Grafen viser totalafkast efter fondens løbende omkostninger. Historisk afkast er ingen garanti for fremtidigt afkast. Du kan tabe penge. <a target="_blank" rel="noopener" href="'+F.kidUrl+'">Læs klassens PRIIP-KID ↗</a> · <a href="https://www.newdealinvest.dk/risici" target="_blank" rel="noopener">Risici ↗</a></p>';
  }
  function opdater() {
    app.querySelector(".metrics").innerHTML = metrics();
    app.querySelectorAll("[data-period]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-period") === per)); });
    bindChart();
  }
  var selected=0;
  function renderFund(){
    var fund=window.REVIEW_FUNDS[selected];
    U=fund.u;F=fund;NAVN=fund.id;
    if(!P().tilgaengelig)per='all';
    var cards='<div class="review-fund-cards" aria-label="Vælg andelsklasse">'+window.REVIEW_FUNDS.map(function(f,i){return '<div class="review-fund-card"><button class="review-fund-select" data-fund="'+i+'" aria-pressed="'+(i===selected)+'"><strong>'+(i===selected?'✓ ':'')+f.id+(i===0?' – udbyttebetalende':' – akkumulerende')+'</strong><span>'+(i===0?'Udbytte udbetales til dig.':'Afkastet bliver i fonden.')+'</span><small>'+(i===0?'Typisk relevant for private med frie midler eller aktiesparekonto. Kan også bruges til pension, børneopsparing og selskaber. Ikke til VSO.':'Relevant til pension, VSO og selskaber, hvis du ønsker afkastet geninvesteret i fonden. Kan også bruges til børneopsparing og frie midler. Ikke til aktiesparekonto.')+'</small></button><button class="review-copy" data-copy="'+f.isin+'" aria-label="Kopiér ISIN for '+f.id+'">'+f.isin+' · Kopiér ISIN</button></div>';}).join('')+'</div><p id="copy-status" role="status"></p>';
    app.innerHTML=cards+skelet();
    var heading=app.querySelector('h1'), eyebrow=app.querySelector('.eyebrow');
    if(heading)app.insertBefore(heading,app.firstChild);
    if(eyebrow)app.insertBefore(eyebrow,app.firstChild);
    app.querySelectorAll('[data-fund]').forEach(function(b){b.addEventListener('click',function(){selected=Number(b.dataset.fund);renderFund();app.querySelector('[data-fund="'+selected+'"]').focus();});});
    app.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',async function(){try{await navigator.clipboard.writeText(b.dataset.copy);app.querySelector('#copy-status').textContent='ISIN kopieret: '+b.dataset.copy;}catch(e){app.querySelector('#copy-status').textContent='Kopiér ISIN manuelt: '+b.dataset.copy;}});});
    app.querySelectorAll('[data-period]').forEach(function(b){b.addEventListener('click',function(){per=b.dataset.period;opdater();});});
    var calendar=app.querySelector('#return-calendar');
    if(calendar){var section=document.createElement('section');section.id='return-calendar';section.innerHTML=calendar.querySelector('.calendar-block').outerHTML;calendar.replaceWith(section);}
    bindChart();vigtig();
  }
  if(app&&window.REVIEW_FUNDS)renderFund();
})();
