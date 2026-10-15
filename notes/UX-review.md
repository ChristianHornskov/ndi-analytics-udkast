# UX-review checkpoints (overnight)

## 22:00 CEST template
- Entré: 6 døre tydelige på 1280 og 375?
- Fonden: advarsel ved afkast, ingen 1m/3m, AKK-gate?
- Udforsk: multi-tag chips (Tesla physical+energy)?
- Tema/lær/invester/sammenlign reachable?
- Notes NOT on Pages?
- Console errors?

## Log
- 20:28 Cycle 1–2 smoke: 34/34 green local. Multi-tag + mobile CSS + recovery shipped pending push.

## 20:33 CEST (pre-22 checkpoint)
- Entré 6 døre + sidekort: OK
- Fonden: 100k-eksempel, omkostninger, kontekst-udbytte markers (2), advarsel: OK
- AKK-gate / no 1m3m: locked
- Multi-tag Tesla + sparklines + CSV: OK
- Notes Pages 404: verified earlier
- Focus trap on dialogs: added
- Mobile CSS: touch 44px, table scroll hint

## Pre-22:00 working notes (20:35)
Pass checklist for 22:00:
- [ ] Entré doors readable 375
- [ ] Fonden: context markers + 100k + warn
- [ ] Udforsk: Tesla shows Energi+Fysisk when filtered energy
- [ ] Selskab SoftBank: profile + KID
- [ ] Notes 404
- [ ] No console errors on smoke
- 2026-10-15 20:36 CEST (Claude, Cycle 3): smoke 40/40 + cycle3 58/58 grønne @1280+375, 0 konsolfejl. 375: entré-døre læsbare, livscyklus fuldt synlig uden scroll, FAQ-træf læsbare, ingen sidescroll på entré/fonden/portefølje/udforsk/faq. Tastatur: pile+Home/End bevarer fokus; Escape lukker dialog og returnerer fokus. Compliance: data.json fjernet fra Pages, company-months ≤ 2026-06-01, ingen daglige movers-løfte. Åbent: tabeller på 375 kræver stadig vandret scroll (bevidst, med hint).

## 22:00 CEST
**Live:** https://christianhornskov.github.io/ndi-analytics-udkast/ · Screenshots: `notes/ux-screens/22-*.png` · Viewport: 1280 + 375.

### Løst / allerede på plads siden pre-22-noterne
- Afkastadvarsel står lige under nøgletal på Fonden (desktop + mobil).
- Datostempler: «Afkast pr. 14. okt. 2026 · Beholdning pr. 1. jun. 2026» globalt og lokalt.
- Entré: 3 primære + 4 sekundære døre læsbare på 1280 og 375.
- Tom tilstand i Udforsk (0 resultater) med Ryd søgning / Nulstil / FAQ-link.
- Tilbage fra SoftBank genskaber søgning + tag (URL-state).
- Ingen interne `target="_blank"`; eksterne markeret ↗.
- Tabel-hint «Rul til siden…» på 375; sticky navnekolonne.
- Ingen rådgivning/kursmål set; «eksponering, ikke anbefaling» + AI-udkast-badges.
- Notes ikke på Pages (404). Palet respekteret (gul sparsomt).

### MUST
1. **(mobil)** Hovednav viser kun Entré · Følg med · Risici · «Sådan investerer du». **Fonden, Porteføljen og Udforsk mangler** (ingen hamburger/overflow). Primære døre er kun nåbare via Entré-kort. Kritisk for alle tre brugerrejser på telefon. [UX-krav 1.1/1.2, M3]
2. **(desktop)** Udforsk: søgefelt opdaterer `?q=` med det samme, men listen kan vise **forældede resultater** et øjeblik (URL og liste uenige → forkert kopieret link). [U1/U2]
3. **(desktop + mobil)** Mini-linjen ved selskabsnavn (vægt over tid) **ligner en kurs-sparkline**. Forklaringen under tabellen er for svag — kolonneheader eller aria/tooltip «vægt i fonden, ikke kurs». [I6, R2]
4. **(desktop + mobil)** Datakvalitet i offentlig visning: række med **ISIN som navn** (`US12047B1052`), Cipher Mining tagget Software, Coinbase/Opendoor «Andet / uklassificeret»; ~**24 %** af fonden uklassificeret (største «tema» på Temaer). [I7, data]
5. **(mobil)** Beholdningstabel: indre vertikal scroll inde i vandret scroll (**scroll-fælde**); Tema-kolonne ude af syne uden side-rul. [M1, TJ C3/C4]

### SHOULD
1. **(desktop + mobil)** «Åbn screener» på selve Udforsk er redundant — skjul der; behold på Porteføljen.
2. **(desktop + mobil)** Tom Livscyklus-kurve (alle «-») fylder en hel skærm — fold sammen eller flyt under tabel indtil klassifikation findes.
3. **(desktop)** Vægt-kolonne med mørkere baggrund + Tema højrejusteret → stor tom midte; rækken føles flækket.
4. **(desktop + mobil)** «Følg med» og «Risici» i nav er synligt dæmpede (ligner disabled) — tjek kontrast ≥4,5:1. [G1]
5. **(desktop)** Selskabsside: dobbelt tilbage («← Udforsk» + «← Tilbage»). Undersider har reduceret header uden fuld nav.
6. **(desktop + mobil)** Typo: «Ordliste &. data» / «Om data &. begreber» → fjern punktum efter &.
7. **(mobil)** Udforsk: 11 chips + knapper før første resultat (~950 px) — foldbart filter / bottom sheet. [M2]
8. **(desktop)** «1 resultater» → «1 resultat».

### COULD
1. Skjul synlige stubs («Følg tema (stub)»).
2. Entré-hero smallere end kort-rækken (desktop) — jævnere bredde.
3. Kort-sekundærtekst ~11–12 px lidt større.
4. Tabel fade-hint til højre på mobil er svagt (tekst-hintet er OK).
5. Invester-trinkort med meget tom højde.

### Top-3 MUST (til Leo)
1. Mobil-nav mangler Fonden / Porteføljen / Udforsk.
2. Udforsk-søgning: liste kan halte efter URL.
3. Vægt-sparkline forveksles med kurs — tydelig label.


## 23:00 CEST checkpoint (Grok sole lead) — 2026-10-15
**Perspektiv:** privatinvestor der scroller værdikæder + drawdown før sengetid.

### MUST
Ingen nye MUST. Live Pages kan halte 1–2 min bag HEAD `ba33bbe`+.

### SHOULD
1. På mobil: vandret kæde-toggle er skjult nok (desktop-first) — OK.
2. temaer-søjler vs treemap: samme data, to former — godt for variation; hold copy synket.
3. Drawdown max er nu ca. −35,8 % (bugfix). Tjek at ingen gammel screenshot/video siger −21 %.

### Nice
- Sunburst legend på smalle skærme kan wrappes (allerede flex-wrap).
- Market cap-lag mangler data — ikke et UX-hul at fikse i nat uden kilde.

### Visual variety (eget lens-review)
vaerdikaeder + drawdown leverer formskift (treemap/sunburst/kæde/timeline/flaskehalse/underwater). Entré stadig dør-gitter — acceptabelt som hub.


## ~23:45 CEST lane-C checkpoint (Claude) — indholdssider
**Perspektiv:** ny besøgende, der kommer ind via Sidekort eller Idéer. 375 + 1280, Playwright lokalt.

### Løst i denne cyklus
- **Sidekort** (`kort.html`): løse tekstlinks («· Idéer · Værdikæder») lå som tekstnoder inde i dør-gitteret → gitteret blev skævt. Nu 6 grupper (Fonden · Porteføljen og temaer · Værdikæder · Investér og risiko · Lær · Andet), og **alle 10 lær-sider** er listet (før kun index + FAQ).
- **Idéer**: fire nye visuelle former (flod-SVG, før/efter-sammenligning, to mini-linjer vægt vs kurs, citatkort). Ingen vandret overflow på 375; flod-SVG ruller vandret i sin egen boks med hint «Rul vandret…». Animation kun ved `prefers-reduced-motion: no-preference`.
- 0 konsolfejl og 0 døde interne links på kort, invester, risici, ndi-perspektiv, laer/index, saadan-taenker-vi, faq, om-data (375).

### SHOULD (lane-C, næste cyklusser)
1. FAQ er 10.700 px høj på 375 — overvej fold-ud pr. gruppe eller «spring til»-links som i ordlisten.
2. Ordlisten er 8.500 px på 375 — spring-links findes; overvej `<details>` pr. panel på mobil.
3. Idéer-flod: på 375 ses kun 3 af 5 dæmninger før rul. Alternativ: lodret variant under 660 px.

### MUST
Ingen nye fra lane-C-sider.
