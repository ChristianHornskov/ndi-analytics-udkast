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


## ~23:50 CEST lane-C checkpoint (Claude) — mobil-længde på lær-sider
**Perspektiv:** mobilbruger (375) der vil slå ét begreb op og komme videre.

### Løst (de 3 SHOULD fra ~23:45)
1. **FAQ** (`laer/faq.html`): 10.700 → **~1.950 px** på 375. Uden søgeord vises kun de 10 korte svar; filterknapper *Korte svar · Artikler · Ordliste · Alle* (aria-pressed) + «Prøv»-chips (udbytte, spredning, dæmning, drawdown, vægt). Når man skriver, skifter visningen automatisk til *Alle*, medmindre man selv har valgt en type. `?q=` i URL respekteres (åbner i *Alle*). Sidelokal kode; `docs/js/faq-search.js` er urørt.
2. **Ordliste** (`om-data.html`): 8.500 → **~1.500 px** på 375. Grupperne er `<details>` med antal begreber; foldet sammen under 700 px, åbne på desktop og uden JS. «Fold alle ud»-knap på mobil. Dybe links (`#g-vaegt`, `#o-portefolje`) åbner den rigtige gruppe og lander under sticky header. FAQ-indekset læser stadig alle 55 `#g-*`.
3. **Idéer-flod**: lodret SVG-variant under 660 px — alle 5 dæmninger synlige uden vandret rul; vandret rul-hint fjernet.

### Test
Playwright 375/1280: 0 konsolfejl, ingen vandret overflow. smoke 52/52 fail 0. precheck PASSED.

### Åbne (lane-C)
- FAQ-kortenes tekst er korte og gode; artikel-snippets uden søgeord starter midt i brødtekst — kunne få en `<meta name="description">`-baseret teaser (kræver ændring i `docs/js/faq-search.js` → JS-lane).


## 00:00 CEST checkpoint (lane-C, Claude) — skrevet ~23:55
**Perspektiv:** fondsinvestor over 60, der klikker «Risici» fra Fonden og vil vide «hvad kan gå galt?» på 45 sekunder. 375 + 1280, Playwright lokalt.

### Løst i denne cyklus
- **Risici** (`risici.html`): før var der kun KID-punkter + 4 linjer. Nu: **SRI-skala 1–7** pr. andelsklasse med klasse 5 markeret (role=img + aria-label), seks risikokort i NDI-sprog (udsving, koncentration i tech trods spredning, flaskehalse der flytter sig, valuta, tidlige selskaber, variance drag), hvert med link til den side der forklarer det. Fast boks «Sådan bruges NDI Analytics» (ikke rådgivning, forsinket beholdning, AI-udkast-mærke, efter omkostninger, KID gælder) jf. VIDENSBOT-krav §5 «fast risikoboks».
- **Invester** (`invester.html`): «Tre spørgsmål før du investerer» (tid ≥ 5 år jf. KID, kan du holde til fald, passer en bred fond) + tabel med ISIN og KID-link for **begge** klasser (compliancefælde 6). Ulukket `<p>` rettet. Løser SHOULD 5 fra 22:00 («Invester-trinkort med meget tom højde») delvist — siden har nu substans under trinene.
- **NDI-perspektiv**: **tabellen var ulæselig på mobil** (arvede `white-space:nowrap` + højrestilling fra `table.data` → anden kolonne løb ud af skærmen). Sidelokal fix: ombrydning, venstrestillet, kort-layout < 700 px. Hints fra `unique-metrics.json` vises nu under hver værdi; `href`-felter er links. Ny forklaring «Hvad linsen spørger om» (flodsystem + 5 felter, «Hold øje med» = ikke prognose).
- **Ordliste** 55 → **61**: valutarisiko, glidende gennemsnit (52 uger, «vises ikke for enkeltaktier i v1»), prospekt, UCITS, likviditet, stokastisk proces. KID-navn rettet til «dokument med central information».

### SHOULD (andre lanes)
1. `index.html` (ikke lane-C) skriver stadig «Central Information Dokument» to steder — officielt dansk navn er «Dokument med central information».
2. `unique-metrics.json`: Tesla-hint siger «Led 1 og led 2 i den forenklede kæde», mens værdikæder nu har 13 led. Bør pege på energi-/robotik-kæden i stedet.
3. NDI-perspektiv på 375 er nu ~5.300 px (14 selskaber × 5 felter). Overvej fold-ud pr. selskab, hvis listen vokser.

### MUST
Ingen nye.

### Lane-C checkpoint ~00:45 (tynde lær-sider)
- Tre lær-sider var én tekstblok hver. Nu har hver en visuel form, der matcher indholdet: søjler (spredning), før/efter-stabler (ex-dato), tidslinje (datoer).
- Mobil 375: hvorfor-mange-aktier ~3.000 px, udbytte ~2.560 px, forsinket ~1.900 px. Tabellen på udbytte-siden bliver til kort < 640 px.
- Åbent: `sammenlign.html` «Samme portefølje» (ikke lane-C).

## ~00:15 CEST lane-C checkpoint (Claude) — ideer.html
- **Intern tekst på offentlig side fjernet:** callout'en sagde «Designvalg … Jesper-palette», og bunden sagde «Flere interne noter ligger uden for Pages». Begge erstattet med tekst til brugeren (udgangspunkt: vi kan ikke pege på vinderen · generel information + link til risici).
- **Tesla-eksemplet tjekket mod data:** portfolio.json har kun `theme: physical`, men selskabssiden viser tags «Fysisk tech + Energi», og value-chains.json har Tesla i 4 led (AI-compute: datacentre og køling, fysisk AI · Robotik: komponenter, robotter). Idésiden viser nu begge tags + en forgrening til de 4 led og linker til Tesla-siden. Første forsøg skrev «ét tema» — det ville have modsagt selskabssiden; rettet før commit.
- **Ny form: «Bygget som et hus»** — plantegning (CSS-gitter, ingen JS), entré med de tre døre øverst i gul stiplet ramme, rummene er links. Spejler den faktiske entré (`renderEntre`: Fonden / Porteføljen / Udforsk), ikke en tænkt struktur. Til 60+-brugeren: «tag den første dør».
- Jargon ryddet: «Drawdown som episoder / Max, middel og median over peak→bund» → «Fald fra top som episoder». «Andet er krympet med forslag (mærket)» → almindeligt dansk.
- Observation (ikke min fil): månedskalenderen ligger under Fonden (`?view=fonden`), ikke på entréen. Vidensbot #69 (MC 51:30) ønsker den på forsiden — til den lane, der ejer app.js.
- Test: Playwright 375/1280: 0 konsolfejl, 0 døde links, 0 døde ankre, ingen h-overflow.

## ~00:40 CEST lane-C checkpoint (Claude) — ordliste + fald fra top
- **Ordliste 66 → 74**, ud fra et ordscan af siderne og value-chains.json: begreber, som siderne bruger uden at forklare. Nye: koncentrationsrisiko, kurtage og spread, halvleder, GPU/XPU/CPU, hukommelse (HBM), datacenter og køling, elnet og transformere, kritiske råstoffer. Ordlyd fra VIDENSBOT-vaerdikaeder «Til siden»/[B]-linjer; ingen [M]-citater om købsmuligheder (fx HBM 2024) taget med.
- **Gruppetællerne var forkerte** allerede før (stod 15/11/20/15, var 16/13/22/15). Nu talt fra DOM: 17 · 14 · 22 · 21.
- Risici-kortet «Koncentreret i teknologi» og invester-teksten om kurtage linker nu til ordlisten.
- Dybe links `#g-kurtage`, `#g-koncentration`, `#g-hbm`, `#g-raastoffer` testet på 375 med foldede grupper: gruppen åbner, begrebet lander under headeren (112 px). Obs. for testere: `scroll-behavior:smooth` betyder, at man skal vente ~1 s før man måler position — ellers ser det forkert ud.
- **ideer.html: sjette form «Fald fra top som episoder»** — tænkt kurve med hidtidig top (stiplet) og tre røde episoder under nul-linjen (−16/−24/−8 %), gul klamme for varighed, tre nøgleord (dybde/varighed/hyppighed) og koblingen til variance drag (−24 % kræver +31,5 %). Mærket «tænkt eksempel, ikke fondens tal». Tidslinjekortet linker ned til tegningen.
- Testfælde fundet: port 8765 er hovedcheckoutens server, ikke lane-C's (8763). Første testrunde ramte de forkerte filer — kørt igen mod 8763.

## ~00:25 CEST lane-C checkpoint (Claude) — lær/valuta
- Ny side `laer/valuta.html`. 375: 3.309 px (efter fix, fra 3.820), 1280: 2.276 px. 0 konsolfejl, 0 døde links/ankre, ingen vandret overflow. Skærmbilleder: `ux-screens/0025-valuta-{375,1280}.png`.
- Fundet og rettet: regnestykke-kortene (aktie × valuta = kroner) stablede lodret på mobil, så de to eksempler fyldte ~1.000 px. Nu én række med tre kort, beskrivelseslinjerne skjult under 640 px.
- Skydere testet: 0/−10 → 900 kr., +10/+5 → 1.155 kr., −30/+20 → 840 kr. Fallbacktekst uden JS står under.
- FAQ: «valuta» finder artiklen (hub-scan i faq-search.js tager den automatisk med) og ordlisteopslaget.
- Obs til næste review: lær-hubben har nu 13 døre. Overvej gruppering (Afkast · Fonden · Porteføljen) ved 02:00.
