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

## 00:00 CEST
**Live:** https://christianhornskov.github.io/ndi-analytics-udkast/ · Screenshots: `notes/ux-screens/00-*.png` · Viewport: 1280 + 375 · Runde: natlig UX-review (Grok Bot).

### Løst siden 22:00 CEST
- **(mobil)** Hovednav viser nu Entré · Fonden · Porteføljen · Udforsk · Følg med · Risici (+ «Sådan investerer du»). MUST 1 lukket.
- **(desktop + mobil)** Vægt-søjler med synlig forklaring: «Søjlerne ved navnet viser vægt i fonden pr. kvartal. Ikke aktiekurs.» MUST 3 lukket.
- **(mobil)** Scroll-fælde i beholdningstabel: `max-height` væk under 560 px; siden scroller lodret, tabellen kun vandret. MUST 5 lukket (verificeret i DOM + lang screenshot).
- **(desktop + mobil)** ISIN-som-navn: 0 tilfælde i PMINDI-snapshot. Coinbase ligger nu under Platforme (ikke Andet).
- Typo «Ordliste &. data» rettet. «1 resultat» korrekt ved SoftBank-søgning. «Åbn screener» skjult på Udforsk.
- Afkastadvarsel stadig lige under nøgletal på Fonden; datostempler synlige; ingen kursmål/anbefaling set. Palet respekteret.

### MUST
1. **(desktop + mobil)** Datakvalitet stadig åben (rester af 22:00 MUST 4): Cipher Mining Inc tagget `software`; Opendoor Tech Warrant i `andet`; alle **345** positioner har `maturity: ikke-klassificeret`; Andet er stadig ~**11,6 %** vægt / 67 selskaber (bedre end ~24 % ved 22:00, men stadig stort). Temaforslag-filtre («Uden temaforslag 250 / Kun 115») understreger, at klassifikation er uafklaret. Kræver porteføljeholdet — ikke UI-polish. [I7, data]
2. **(desktop + mobil)** X-markør / feed-tekst ved performance: «Performance opdatering efter Q2 2026 — fonde NewDeal Invest **rådgiver** (totalafkast)» (`data/x-posts.json`). Lyder som at NDI rådgiver fonde; uheldigt ved afkasttal. Ret copy eller skjul markøren, indtil ordlyden er compliance-godkendt. [R2, compliance]
3. **(desktop)** Udforsk-søgning: deep link `?q=softbank` viser korrekt 1 resultat, men **live tast-for-tast sync** (URL vs. liste) er ikke verificeret i denne runde. Behold 22:00 MUST 2 åben, indtil nogen skriver i feltet og tjekker forældede rækker. [U1/U2]

### SHOULD
1. **(mobil)** Nav-rækken ved 375 er tæt med lille tekst — hit-area sandsynligvis under 44 px. Overvej wrap, mindre mellemrum eller hamburger med samme destinationer. [M3, Apple 44 pt]
2. **(mobil)** Portefølje-tabel: Tema-kolonne afskåret; scroll-hint er svagt/ikke synligt i første viewport — gør «Rul til siden…» tydeligere. [M1, TJ C4]
3. **(desktop + mobil)** Livscyklus-boks (alle uklassificerede) fylder stadig højt over tabellen — foldbar indtil første klassifikation findes. [fra 22:00 SHOULD 2]
4. **(desktop)** Udforsk: mange chips/filtre før første resultat — foldbart filter / sticky resultat-tæller (Stripe/Things: progressiv disclosure). [inspiration §5]
5. **(desktop)** Dæmpede nav-punkter: tjek kontrast ≥4,5:1 mod `#050a0f`. [G1]

### COULD
1. Entré-hero vs. kort-række: jævnere bredde.
2. Tabular nums konsekvent i vægt-/afkastkolonner (Linear/Vercel).
3. Én synlig tekstpointe under fondsgrafen ud over advarslen (OWID/Stripe).

### Top-3 MUST (til Leo)
1. Datakvalitet: Cipher=Software, Opendoor=Andet, 345 uden modenhed, Andet ~11,6 %.
2. X-tekst med «rådgiver» ved performance — ret eller skjul.
3. Udforsk live-søgning (URL vs. liste) stadig uverificeret.

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

## ~00:45 CEST lane-C checkpoint (Claude) — lær-hub grupperet
- **Før:** 13 ens døre i ét gitter; ingen indgang for nye, ingen forskel på «læs en tanke» og «slå et ord op». Ordliste-døren sagde «drawdown» (jargon).
- **Nu:** «Ny her? Start med de tre» (nummereret læsesti, gul top, pile → / ↓ på mobil), derefter fire grupper med farveprik og én linje: Tankegangen (2×2) · Afkast og udsving · Fonden i praksis · Slå op. Hver dør viser form + læsetid (ordtælling ÷ ~220 ord/min, rundet).
- **Jargon:** «drawdown» → «fald fra top» i link-/dørtekster på lane-C-sider (variance-drag, hvorfor-mange-aktier, kort, om-data lede, ideer, FAQ-chip + spørgsmål). **Ikke min fil:** `drawdown.html` hedder stadig «Drawdown · …» i title/h1 — til den lane, der ejer den.
- **Mobil:** hub 3.409 px (375). Læsestien dublerer 3 døre bevidst; kan skæres, hvis Mads synes den er lang.
- Test: 375/1280 på 7 sider: 0 konsolfejl, 0 døde links, ingen h-overflow.

## ~00:40 CEST lane-C checkpoint (Claude) — FAQ-kortsvar + risici-flodsystem
- **FAQ 11 → 15 korte svar.** Nye: *Hvad er flodsystemet?* (→ vaerdikaeder#kap-flod), *Er det ikke meget teknologi i én fond?* (→ ordliste koncentrationsrisiko), *Hvad koster det at købe andele?* (løbende omkostninger vs. kurtage/spread, ingen satser — «står i KID»), *Hvorfor står Tesla ikke bare som bilselskab?* (→ ideer#h-vs).
- **Stikord-svar skrevet om til sætninger:** P/E («Markedets forventning. Ikke en facitliste…» → hvad tallet er, og hvorfor investering trækker det ned), tema («Segmenter viser eksponering» → hvad et tema viser), invester («Generelt flow: … ordre» — anglicisme, og passede ikke til siden). Første udkast skrev «fire trin»; invester.html har «Tre spørgsmål før du investerer» → svaret følger nu siden (tid/5 år, fald, bred tech-fond).
- **risici.html:** flaskehalskortet nævnte fire dæmninger («cloud og apps»). Nu de fem fra Vidensbot (energi, datacentre, halvledere, cloud og modeller, applikationer og fysisk AI), «presset flytter videre», link direkte til `#kap-flod` + ordliste.
- Test (8763): 375/1280 FAQ 15 kort uden søgning, «flodsystem» → kortsvar, ordliste, artikel øverst; «kurtage» → ordliste-anker; risici-link findes; 0 konsolfejl, ingen h-overflow.

## ~00:35 CEST lane-C checkpoint (Claude) — ideer.html «Fra Andet til tema» + ordliste 78
- **Ny form (7. på ideer.html):** proportionsbjælke + tre-trins flow (Andet → Forslag → Tema) + små søjler for de 48 forslag pr. tema. Rigtige tal fra portfolio.json (PMINDI, 1. jun 2026): 67 / 48 / 230 af 345; vægt ca. 11,6 / 13,6 / 66,8 % (de 345 aktier vejer ca. 92 % i rapporten — står i figurteksten, så ingen undrer sig over at det ikke summer til 100).
- Ærlighed: «Tema»-trinnet siger eksplicit, at også ældre temaer gennemgås før de er endelige (matcher ordlistens g-temaforslag). Intet «endeligt» påstået.
- Fundet og rettet: klassen `.q` kolliderede med citatkortene (Quantum-rækken fik panel-baggrund) → `.qn`. Søjlerne strakte sig over 1100 px på desktop → max-width 560.
- Ordliste 75 → 78: cloud og AI-modeller, robotik, energilagring og batterier (de hyppigste værdikæde-ord uden opslag: robot ×37, cloud ×12, batteri ×8). Wafer dækkes af litografi.
- Test 375/1280: 0 konsolfejl, ingen h-overflow, #g-robotik/#g-cloud åbner rigtig gruppe på mobil.

## ~00:55 CEST lane-C checkpoint (Claude) — ordliste 87 + linse-links
### Løst
- Ordliste 78 → 87: rebalancering (Fonden); hold øje med, kundekoncentration, kapitalbehov, indre værdi, qubit og fejlretning (Portefølje); neocloud, wafer, eksportregler (Værdikæder). Valgt ud fra ord, der står på siderne (NDI-linsen, value-chains.json, Quantum-temaet), men ikke var forklaret. Gruppetællere talt fra DOM: 18 · 15 · 27 · 27.
- `ndi-perspektiv.html`: legenden linker «Hold øje med» og «Hvad ejer man?» til de nye begreber. `saadan-taenker-vi.html`: «rebalancering» linker til ordlisten.
- FAQ-søgning finder de nye begreber (neocloud, qubit, rebalancering, indre værdi).
### SHOULD (anden lane)
- `unique-metrics.json`: fem selskaber har kun ét linse-felt, og feltnavnene varierer. Se IDEAS.
### Test
- 8763, 375/1280 på 5 sider: 0 konsolfejl, ingen h-overflow, 0 døde ankre (alle `om-data.html#…` fra FAQ og linse findes). Dybt link `#g-neocloud` åbner den rigtige gruppe på mobil.

## ~00:40 CEST lane-C checkpoint (Claude) — ideer.html ottende form «345 aktier, én prik hver»
- Ny enhedsgraf: én firkant pr. selskab, grupperet pr. NDI-tema (antal · vægt til højre), «Andet» i grå sidst. Én farve (cyan), ingen kategoripalet; identitet bæres af tekstlabel, ikke farve. Legende-linje over grafen.
- Under: antal selskaber pr. vægtinterval (55 · 110 · 79 · 58 · 38 · 5); intervallet med ligevægten (ca. 0,27 %) er markeret med gul ramme. Nøgletal: median ca. 0,2 %, top 10 ca. 11,9 %, største ca. 2,1 %. Ingen selskabsnavne, ingen kurs/afkast — kun vægt fra snapshot 1. jun 2026.
- Hvorfor: siden manglede et billede af *spredning* — «vi kan ikke pege på den ene vinder» er nu synligt som 345 små prikker. Linker til lær/hvorfor-mange-aktier.
- Mobil 375: firkanter brydes under labelen (grid-række 2), ingen h-overflow. 1280: tre kolonner (label · prikker · tal).
- Næste for ideer: overvej om «Tre sætninger»-citaterne skal flyttes op som afslutning på floden (læserækkefølge).

## ~00:41 CEST lane-C checkpoint (Claude) — stilscan mod Vidensbot punkt 10
- Tankestreger og semikolon i synlig tekst på lane-C-sider: 17 steder rettet til punktum eller komma (ideer, om-data, kort, ndi-perspektiv meta). Tilbage: kun datointerval «august–november».
- «snapshot» → «øjebliksbillede»/«beholdning pr. 1. juni 2026» i synlig tekst (ideer, om-data, risici, forsinket-beholdning, hvorfor-mange-aktier, FAQ). «feature», «treemap/sunburst», «graf-pipeline», «v1», «Azure», «cutoff», «precheck» fjernet fra offentlig tekst.
- **Faktuel rettelse:** om-data kaldte 1. juni 2026 «kvartalsslut». Det er det ikke (Vidensbot blokering 2). Nu: «første tilgængelige Fundmarket-rapport i juni. Datoen er ikke et kvartalsskifte.»
- invester.html: trin 3–5 omskrevet uden skråstreger og intern jargon («Afkastfanen, kontekstgrafen», «UCITS», «v1»). ISIN'erne står nu med klassenavn.
- Bevidst beholdt: «compute», «growth/GARP/value», «tags». Det er fagord med ordlisteopslag. Til beslutning (IDEAS): skal «tags» hedde «mærker»?

## ~01:00 CEST lane-C checkpoint (Claude) — ideer.html niende form «Samme 345 selskaber, to sorteringer»
- Nyt varmekort som rigtig `<table>` (skjult caption, `th scope`): rækker = 11 NDI-temaer, kolonner = 8 klassiske sektorer (teknologi, industri, råvarer, forbrugsgoder, finans, kommunikation, forsyning og energi, øvrige). Celle = antal selskaber, farvestyrke ∝ antal (én farve, cyan). Nuller vises som en svag prik, så mønstret står frem.
- Placeret lige efter Tesla-eksemplet: «gjort for hele fonden». Tre nøglepointer: teknologi 151 → seks temaer; Platforme samler finans/forbrug/kommunikation; SpaceTech og fysisk tech står næsten alle under industri.
- Sektor = `sector`-feltet i portfolio.json (offentlige opslag). Bevidst **ikke** kaldt GICS, da feltnavnene er af Yahoo/Morningstar-typen. 14 selskaber uden sektor ligger i «Øvrige» (nævnt i figurteksten).
- Mobil 375: lodrette kolonneoverskrifter, celler 25 px, ingen rul i tabellen (329/329), ingen h-overflow. 1280: centreret, nøglepointer i tre kolonner.
- Ordliste «GICS-sektorer» linker nu til matrixen; kort.html og og:description fulgt med.

## ~01:10 CEST lane-C checkpoint (Claude) — lær/rebalancering
- Ny side `laer/rebalancering.html` dækker Vidensbot pkt. 24/31 (porteføljetekniske begrundelser) på almindeligt dansk. Skyder + ti søjler, ingen fondshandler, ingen satser.
- Fundet og rettet under test: på 375 px roterede pilen i flowet en hel boks 90° og dækkede teksten. Nu skiftes → til ↓ med to spans.
- Lær-hub: Tankegangen har nu 5 døre i et 2-kolonne gitter, så «Hvad P/E fortæller» står alene i fuld bredde på desktop. Acceptabelt, men Leo kan overveje at flytte P/E til «Afkast og udsving» (så 4 + 4).
- 375/1280: 0 konsolfejl, ingen h-overflow på rebalancering, lær/index, FAQ. Skyder ved 900 % giver 52,6 % / 81 kr. (regnet efter).

## ~01:30 CEST lane-C checkpoint (Claude) — lær/risikoklasse + hub 4 · 4 · 4 · 3
- **Hul lukket:** risici.html viste «5 / 7 (middel-høj)» uden forklaring af, hvor tallet kommer fra. Ny side `laer/risikoklasse.html`: kæde i fire trin, skyder (udsving pr. år → klasse på skalaen, fondens klasse med blå kant), tabel med de syv intervaller og bjælke for intervallets bredde (klasse 6 = 50 point, klasse 7 stiplet = ingen loft), og «Hvad klassen ikke siger».
- Risici: link «Hvad klassen betyder →» lige under hver klasse (ikke en fjerde knap i bunden, den rækkede allerede tre).
- **Lær-hub:** P/E-døren stod alene i fuld bredde. Nu Tankegangen 4 (2×2) · Afkast og udsving 4 (CAGR, Risikoklasse, Valuta, P/E) · Fonden i praksis 4 (Risici flyttet hertil, ny tekst) · Slå op 3. Ingen enlige døre på desktop.
- Ordliste: SRI og Udsving linker til hinanden og til siden. FAQ 16 korte svar.
- Test (8763) 375/1280 på 6 sider: 0 konsolfejl, ingen h-overflow, 0 døde links/ankre. Skyder kontrolleret ved 0/3/15/20/25/30/40/80/100 (grænser 20 → 5, 30 → 6, 80 → 7).
- Obs: tabellens fjerde kolonne (bjælker) skjules under 640 px. Tre kolonner er nok på mobil.

## ~01:25 CEST lane-C checkpoint (Claude) — risikoklasse committet, ordliste 91, invester
- Risikoklasse-siden lå ucommittet fra forrige cyklus. Gennemset før commit: klasse 6 hed «høj», men standardteksten i KID er «næsthøjeste». Rettet. Den uverificerede sætning «Fondens KID siger …» er fjernet, og «mindst 5 år» er tjekket mod fund-meta.json.
- `om-data.html`: de sidste interne ord ud af synlig tekst («v1» ×6 → «udkastet», «peak→bund» → «fra top til bund», «heuristik», «drawdown-siden» → «Fald fra top», 8 bindestreger brugt som tankestreg). «Max» forklaret, så det matcher kortet på drawdown.html.
- Ordliste 87 → 91: depot (ordet bruges på invester.html), platforme, software og energiressourcer (de tre temaer manglede, og platforme er det største målt på vægt i begge klasser pr. 1. jun 2026: 16,0 % / 14,7 %). Tællere 18 · 16 · 30 · 27 passer.
- `invester.html`: «risikoklasse 5 af 7» → lær/risikoklasse; «Passer en bred teknologifond?» forklarer nu flodsystemet i én sætning (→ ordliste).
- Test 375/1280 på invester, om-data, kort, FAQ, risikoklasse: 0 konsolfejl, ingen h-overflow, 0 døde ankre; FAQ-søgning rammer «depot», «platforme», «energiressourcer».

## ~01:15 CEST lane-C checkpoint (Claude) — ordliste 95 + lær-sider linker til ordlisten
- Ordliste 91 → 95: median (bruges på drawdown og ideer uden forklaring), markedsrisiko og selskabsspecifik risiko (kernen i «Hvorfor så mange aktier?», stod ikke i ordlisten), PRIIPs (nævnt på risikoklasse-siden). Tællere 21 · 17 · 30 · 27 passer.
- Lær-sider uden ordlistelinks har fået dem: hvorfor-mange-aktier (3 nye + «Se også»), saadan-taenker-vi (flodsystem, dæmning, prospekt, KID, udgangspunkter), udbytte-vs-akk («I ordlisten»-linje + NAV), faq-mangler-aktie (likviditet, ticker), risikoklasse (PRIIPs). ideer.html: «medianen» → ordliste.
- Obs til js/css-ejer: på mobil er ordlistegrupperne foldet sammen, når man åbner om-data.html uden hash. Links med #g-… folder den rigtige gruppe ud og fremhæver posten. Virker (testet #g-markedsrisiko på 375).
- Test 375/1280 på 8 sider: 0 konsolfejl, ingen h-overflow, 0 døde ankre (den eneste træffer er skabelonen `g-${key}` i selskab.html).

## ~01:10 CEST lane-C checkpoint (Claude) — ideer: tre ure + ordliste 97
- **Hul lukket:** en ny læser ser tre datoer (NAV 14. okt, beholdning 1. jun, KID 14. aug) og kan tro, at siden er rodet eller forældet. Ny tiende form på `ideer.html` «Tre ure på samme side»: fire spor på én tidslinje 2024–2027 (fyldt bjælke = afkast vises, stiplet = kun NAV, skravering = bevidst forsinkelse, gul streg = seneste NAV). PMINDIAKK-sporet viser den prikkede 12-måneders-grænse, uden at love en dato i tekst.
- Første version: prikkerne blev ovale (højden fulgte sporet), og «2027» stod forskudt. Rettet. «Kursen er fra i går» fjernet (passer ikke, når siden læses senere).
- Ordliste 95 → 97: omsætning og indtjening. P/E- og livscyklus-siden bruger begge ord bærende. Linket fra «præ-revenue» (skråstreg erstattet af «eller»), P/E- og livscyklus-sidens «Se også». «Afkast pr.»/«Beholdning pr.» har nu danske anførselstegn.
- Obs til index-ejer: `index.html` linje ~91 siger «ÅOP-beregninger bygges ikke i aften». Intern arbejdssprog på forsiden. Forslag: «ÅOP vises ikke i udkastet. Se KID.»
- Test 375/1280 på ideer, om-data, pe-forklaring, livscyklus, kort: 0 konsolfejl, ingen h-overflow, 0 døde ankre; alle `om-data.html#g-…`-links på tværs af docs/ findes.

## ~01:40 CEST lane-C checkpoint (Claude) — KID-risikolisten forklaret, ordliste 101
- **Hul lukket:** risici.html viste KID's fem nøglerisici som en tom liste af fagord («Vækst- og sektorrisiko», «Ingen markedsbeskyttelse»). Ingen af dem kunne slås op. Nu er hvert punkt et link til ordlisten (aktiemarkedsrisiko → markedsrisiko, valutarisiko → valuta, de to tab-punkter → ingen markedsbeskyttelse).
- Ordliste 97 → 101: vækst- og sektorrisiko, ingen markedsbeskyttelse, boble (bruges på P/E-siden og i et ugebrevscitat på ideer), anbefalet investeringsperiode (risici, invester, risikoklasse, FAQ). Tællere 24 · 18 · 32 · 27 passer. Teksterne citerer ikke KID ordret, de siger «står blandt de vigtigste risici på Risici, som bygger på KID».
- Linket ind: risici (risikoliste + «investeringsperiode»), invester («Har du tid?»), lær/risikoklasse, lær/pe-forklaring («boble»), kort.html 101.
- FAQ-søgning rammer «boble», «markedsbeskyttelse», «investeringsperiode».
- Obs til js-ejer: `js/faq-search.js` linje 93/96 skriver «træf for “boble”» med engelske anførselstegn. Resten af siden bruger «».
- Test 375/1280 på 7 sider: 0 konsolfejl, ingen h-overflow, 0 døde links/ankre. Dybe links #g-kapitalbeskyttelse og #g-investeringsperiode åbner den foldede gruppe og fremhæver posten på 375.

## 01:20 CEST lane-C checkpoint (Claude) — hvad står der i tallet? + ÅOP/før skat + kort demo
- **Hul lukket:** siden sagde mange steder «efter løbende omkostninger, før skat», men forklarede aldrig, hvad det betyder for læserens eget afkast. Ny ellevte form på `ideer.html` «Hvad står der i tallet?»: to grupper lag (fyldt cyan = med i fondens afkast, stiplet = kommer bagefter og afhænger af dig) med en gul «= Fondens afkast» og en stiplet «= Dit eget afkast». Hvert lag linker til ordlisten eller en lær-side. Ingen tal.
- Ordliste 101 → 103: ÅOP (stod på forsiden og i Fonden uden forklaring) og «Før skat». Fonden-gruppen 20. Linket fra invester (trin 4), FAQ «Hvad koster det?» (+ «Afkasttallene er før skat.», stadig 16 korte svar), udbytte-siden.
- HANDOFF: morgendemoen er nu en tabel med 9 trin (side · vis · sig · tid ≈ 6 min) + tjekliste + ord at undgå. Den lange tekst ligger urørt som «Demo-detaljer» nederst.
- Obs: Fonden-nøgletallet hedder «Største fald», men graftekster i app.js siger «max drawdown i perioden» (IDEAS, js-ejer).
- Test 375/1280 på ideer, om-data#g-skat, invester, FAQ, udbytte-vs-akk, kort: 0 konsolfejl, ingen h-overflow, 0 døde links/ankre. Screenshot af formen gennemset på begge bredder.

## 01:25 CEST lane-C checkpoint (Claude) · ideer «To klasser, samme temaer» + ordliste 105
### Løst
- `ideer.html` tolvte form: håndvægtdiagram (dumbbell) med temavægte for PMINDI (fyldt cyan) og PMINDIAKK (gul ring) pr. 1. jun 2026, 11 temaer. Tal genereret direkte fra portfolio.json (sum af `weight` pr. `theme`). Største forskel 1,5 procentpoint (Andet). På 375 px rykker sporet under navn og tal, så intet presses. Aksens «18 %» brød linjen, rettet med nowrap.
- Ordliste 103 → 105: «Energi (tema)» (energiressourcer-posten henviste til et tema uden egen post) og «High growth» (stod i modenhedsrækken uden forklaring).
- `ndi-perspektiv.html`: flodsystem, dæmninger, energi og modenhed i linse-forklaringen linker nu til ordlisten. Ordlyden var allerede i flodsystem-sprog, intet handelsprog fundet.
### SHOULD (andre lanes)
- Index «Porteføljen» kunne linke til `ideer.html#h-kl`, når brugeren skifter andelsklasse. Det er ikke min fil.
### Test
- 8763, 375/1280 på 5 sider: 0 konsolfejl, ingen h-overflow, 0 døde ankre (også på tværs af sider).

## 01:27 CEST lane-C checkpoint (Claude) · ideer «Lag på lag» + ordliste 109
### Løst
- `ideer.html` trettende form «Lag på lag» (`#h-stk`): de syv temaer i stakken fra energiressourcer (jord) til platforme (bruger) som centrerede bjælker, bredde = vægt i PMINDI pr. 1. jun 2026, tal = antal selskaber · vægt. Gul = NDI's nummererede flaskehalse (energi, chips). Fysisk tech, SpaceTech, Quantum og Andet står ved siden af stakken. Ny visuel form (vase/stak), ingen SVG. På 375 px rykker bjælken under navn og tal, ingen h-overflow. «TÆT PÅ …»-mærkerne centreret over bjælkekolonnen på desktop.
- Ordliste 105 → 109: Chips (tema), Compute (tema), Optik &amp; netværk (tema), Fysisk tech (tema). Fire af de elleve temaer manglede egen post; nu har alle temaer en. Tal fra portfolio.json (antal pr. andelsklasse).
- Links: flodsystem-posten → `#h-stk`; lær/sådan tænker vi → `#h-stk`; kort.html 109 + ideer-beskrivelse; HANDOFF trin 6–7.
### SHOULD (andre lanes)
- `temaer.html`/`tema.html` kunne linke temaets navn til dets ordlistepost (`#g-chips-tema`, `#g-compute-tema`, `#g-optik-tema`, `#g-fysisk-tech`, `#g-energi`, `#g-platforme`, `#g-software-tema`, `#g-energiressourcer`, `#g-quantum`, `#g-spacetech`, `#g-andet`). Ikke min fil.
### Test
- 8763, 375/1280 på ideer, om-data, kort: 0 konsolfejl, ingen h-overflow, 0 døde ankre; dybt link `om-data.html#g-chips-tema` lander i synsfeltet på mobil. Screenshot af formen gennemset på begge bredder.

## 01:30 CEST lane-C checkpoint (Claude) · ideer «Hvor mange selskaber er halvdelen?» + ordliste 110
- Fjortende form på `ideer.html` (`#h-kv`), placeret lige efter «345 aktier, én prik hver»: kumuleret vægtkurve (SVG, 345 punkter), største position først, stiplet ligevægtslinje. Tre gule punkter: 26 / 76 / 160 selskaber = ¼ / ½ / ¾ af aktiernes samlede vægt. Ligevægt ville kræve 173 til halvdelen.
- Ny visuel type på siden (linjekurve med referencelinje). De andre former er bjælker, prikker, flow, tidslinje, stak, hus.
- 375 px: kurve og tre nøgletal under hinanden. ≥860 px: nøgletal i kolonne til højre for kurven, så der ikke står tom plads. Etiketten «lige vægt» lå først oven på linjen og ud over kanten. Rettet før commit.
- Ordliste 110: «Fundmarket» (brugt på 6 sider uden forklaring). Prospekt og Forsinket beholdning linker dertil. Koncentrationsrisiko → `ideer.html#h-kv`. `lær/hvorfor-mange-aktier` → `#h-kv`.
- Test: 8763, 375/1280 på ideer, om-data, kort, lær/hvorfor-mange-aktier: 0 konsolfejl, ingen h-overflow, 0 døde links/ankre.

## 01:32 CEST lane-C checkpoint (Claude) · ordliste 114 (led fra værdikæderne + delår)
- Tjek: alle led-navne i `value-chains.json` mod ordlisten. Manglede: Serverinfrastruktur, Elproduktion, Simulering og software. Nu poster (`#g-servere`, `#g-elproduktion`, `#g-simulering`) med samme ordlyd som led-teksten.
- «delår» står i app.js, periode og drawdown uden forklaring. Ny post `#g-delaar` (2023 er delår, starter ved første NAV 22. sep 2023, ikke omregnet til helt år). Linket fra Idéer «Tre ure».
- Tællere: 25 · 21 · 38 · 30 = 114. kort.html og HANDOFF trin 7 fulgt med.
- **Til js-ejer:** delår-badge i app.js (linje ~347/350) kan linke `om-data.html#g-delaar`. **Til værdikæde-ejer:** led-kort kan linke til `#g-servere`, `#g-elproduktion`, `#g-simulering`; flere «ndi»-tekster i value-chains.json bruger stadig tankestreg (—), jf. Vidensbot punkt 10.
- Test: 8793, 375/1280 på om-data, ideer, kort: 0 konsolfejl, ingen h-overflow. 0 døde ankre på alle sider.

## 01:36 CEST lane-C checkpoint (Claude) · lær «Indre værdi» + ordliste 115
- Hul: «NAV»/andelskurs stod på Fonden, udbytte-siden og ordlisten, men ingen side forklarede, hvad tallet er, eller hvorfor nye investorer ikke flytter det. Ny `laer/indre-vaerdi.html`: regnestykke-kæde (aktier og kontanter − gæld ÷ andele = indre værdi), tre skydere (kurs ±50 %, nye penge 0–100 mio., udbytte 0–10 kr.) med tre bjælker (formue, antal andele, værdi pr. andel) mod en prikket udgangslinje, «Tre ting at tage med», «Samme ord, to betydninger» (fond vs. SoftBank-betydningen fra NDI-linsen), «Hvor du ser den på siden».
- Lær-hub: grupperne er nu 4 · 4 · 4 · 4. «Indre værdi» i Fonden i praksis, «Hvorfor mangler aktie X?» flyttet til Slå op (det er en søgning).
- Ordliste 115: ny «Udstedelse og indløsning» (Fonden 22). «Indre værdi» skrevet om til to betydninger. NAV linker til siden. FAQ: nyt kort svar «Hvad er en andel værd (NAV)?» (nu 17). kort.html, udbytte-vs-akk linker.
- 375 px: kæden lodret med operatorer imellem, skydere under hinanden, bjælken under navn og tal. Prikket udgangslinje var usynlig på den gule bjælke. Rettet (mørk streg).
- Test: 8763, 375/1280 på 6 sider: 0 konsolfejl, ingen h-overflow, 0 døde links/ankre. Skyder-regnestykket tjekket: +10 %, 50 mio., 5 kr. → 110 → 105 kr., 1,45 mio. andele.

## 01:55 CEST lane-C checkpoint (Claude) · lær «Sådan læser du grafen» + ordliste 116
- Ny side ved 375 px: graf (SVG) skalerer ned, fem numre læses som liste under; skyder fylder bredden; siger/siger-ikke stables. Ingen h-overflow. Akse-etiketter (År 1–3) er små på 375, men læsbare.
- Mini-grafen i skyderen: resten af kurven vises dæmpet, den valgte del gul, så man ser hvor man «kom ind».
- Lær-hub: «Afkast og udsving» har 5 døre; den sidste (P/E) spænder hele rækken på desktop. Overvej at flytte P/E til «Tankegangen», hvis gruppen skal være 4.
- Til js-ejer: Fonden-siden mangler et link til forklaringen tæt på grafen.

## 02:00 UX-review lane-C (Claude) · kørt 01:42–01:55 wall-clock, efter merge af origin/main ind i lane-C
Hele lane-C-fladen ved 375 px: ideer, kort, om-data, invester, risici, ndi-perspektiv og alle 15 lær-sider. Automatisk tjek pr. side: h-overflow, elementer bredere end skærmen, konsolfejl, døde ankre på siden og på tværs, `img` uden alt, store SVG'er uden etiket, tankestreger i synlig tekst, handelsord.
### Resultat
- 0 h-overflow, 0 konsolfejl, 0 døde links/ankre, 0 billeder uden alt, 0 SVG uden etiket på 21 sider.
- Handelsord: kun «anbefaling» i «ikke en anbefaling», «Anbefalet investeringsperiode» (KID-ord) og «Køb og omkostninger» om køb af andele. OK.
- Små trykflader: temalinks i varmekortet (17 px, tabelceller) og løbende links i tekst. OK efter WCAG 2.5.8 (inline). Risikokortenes «→»-links stod alene på en linje med 19 px: nu 25 px (padding).
### Fundet efter merge og rettet
- **Idéer viste gamle temaal.** Main har lane-B's temaforslag (37 selskaber flyttet ud af Andet, 4 fra compute til Quantum). Fem former havde de gamle tal hårdkodet: varmekortet, «Fra Andet til tema» (67 · 48 · 230 → 31 · 85 · 229), «345 aktier, én prik hver», «To klasser» (største forskel nu 1,6 pp) og «Lag på lag» (Energi 15 → 37 selskaber, 6,3 → 9,3 %). Alle regnet om fra portfolio.json med script. Vægte er uændrede, så «halvdelen»-kurven (26/76/160) og vægtintervallerne holder.
- **Ordlisten:** antal i Chips (54/49), Compute (19/16), Optik (31/30), Fysisk tech (27), Energi (37, heraf 28 forslag). Temaforslag-posten har nu tallene og link til `ideer.html#h-tf`.
- **risici.html viste interne ord** fra main: «Risikotal (beregnet i udkastet)», «udfyldes af NDI», «maturityStatus=forslag», «ofte 0 indtil NDI udfylder», og Andet = 63 (risk-stats.json) mens portfolio.json siger 31. Nu: «Udsving og fald i tal» (udsving pr. år 32,5 %, afkast pr. udsving 0,89, største fald −35,8 %, «regnet af NDI Analytics, ikke KID») + svar på «Hvorfor passer tallet ikke med risikoklassen?» (PRIIPs har egen metode). «Hvor langt er sorteringen i temaer?» tæller direkte fra portfolio.json, så tallene altid passer med Idéer.
- kort.html: tankestreg i «NDI på X»-døren fjernet.
### SHOULD (andre lanes)
- `data/risk-stats.json` `classification` (andetCount 63, themeForslag 116) passer ikke med portfolio.json efter lane-B-merge (31 / 85 ekskl. Andet). risici.html bruger ikke længere de felter.
- app.js nøgletal hedder stadig «Max drawdown». Resten af sitet siger «Største fald (fra top)».
### Test
- 8763, 375/1280: risici, ideer, om-data, kort, lær/risikoklasse: 0 konsolfejl, ingen h-overflow. Screenshots af `#tal` og de fem Idéer-former gennemset på 375.

## 02:15 CEST lane-C checkpoint (Claude) · NDI-perspektiv foldet sammen + KID på alle lær-sider
- **ndi-perspektiv (UX SHOULD cyklus 19–22: «ca. 192.000 tegn, 53 × afventer, fold sammen»):** Én lang tabel med 310 rækker er erstattet af 12 temagrupper som `<details>` med antal, en kort sætning i klart dansk pr. tema, temachips med ankre (`#lg-chips` osv. åbner gruppen) og et søgefelt, der filtrerer på navn og linse-tekst og åbner de grupper, der passer. Hvert selskab viser navn, tema-mærke (stiplet = forslag), «Hvad ejer man?» og «Plads i værdikæden». Forklaringer og «Hold øje med» ligger under «Hvorfor ejer vi den? Mere fra linsen». Livscyklus («Ikke klassificeret» ×309) er udeladt pr. række og forklaret én gang. Synlig tekst: ca. 2.500 tegn ved åbning (før ca. 192.000), «afventer» ×2 (før 53).
- **Persona-privat:** «Vi vælger udviklingen, ikke vinderen» står i båndet øverst og linker til «Hvorfor ejer vi den?» i *Sådan tænker vi*.
- **Compliance SHOULD (KID-link mangler i renderet tekst):** ndi-perspektiv og de 7 lær-sider uden KID (faq-mangler-aktie, forsinket-beholdning, hvorfor-mange-aktier, livscyklus, pe-forklaring, udbytte-vs-akk, variance-drag) har nu linjen «Generel information, ikke rådgivning. Før du investerer, så læs dokumentet med central information (KID) …» med direkte Fundmarket-links til PMINDI og PMINDIAKK. Den officielle titel bruges (jf. SHOULD om «Central Information Dokument»).
- Test (Playwright, lokal server): 17 sider × 375/1280: 0 konsolfejl, 0 h-overflow, én h1, KID i renderet tekst overalt. Søgning «kobber» → 7 selskaber. `#lg-chips` åbner gruppen.
- **Åbent (ikke mine filer):** vaerdikaeder, drawdown, temaer, nyhedsarkiv, periode og selskaber mangler stadig KID-link. Selskab: «AI-udkast» over tomt felt.

## 02:22 CEST lane-C checkpoint (Claude) · meta description på 21 sider + FAQ 23 svar
- UX Nice (cyklus 24, «ingen meta description på 19/20 undersider»): ideer, kort, om-data, invester, risici, ndi-perspektiv og alle 15 lær-sider har nu `<meta name="description">` i almindeligt dansk og uden procenttal. `scripts/og-meta.py` er kørt, så og:description følger med (kun mine filer er committet). Variance-drag-preview siger nu møntspillet i kroner (100 → 150 → 90 kr.), ikke «+5 %».
- UX SHOULD (cyklus 24, «dyb side»/«ÅTD»): `kort.html` «År / ÅTD dyb side» → «Afkast pr. kalenderår · Ét år ad gangen, fra 2025. Delår er mærket.», linker til `periode.html?year=2025` i stedet for YTD.
- Compliance MUST 10 i mine filer: ordlisten `#g-ytd` siger nu, at ÅTD er et delår og ikke kan sammenlignes direkte med hele år. FAQ «Hvorfor er 2023 ikke et helt år?». FAQ-svaret om 3 måneder nævner ikke længere «år til dato» som noget, fonden fremhæver.
- PERSONA-privat (#1 omkostninger, #6 referencepunkt, #3 hvem) + FO MUST 2 (skat): fem nye/omskrevne korte svar i FAQ. Skattesvaret er bevidst generelt (ingen skatteregler, «spørg din bank, revisor eller rådgiver»).
- Test: 10 sider × 375/1280: 0 konsolfejl, 0 h-overflow, én h1. FAQ-søgning «sammenligne» giver 8 træf.

## 02:24 CEST lane-C checkpoint (Claude) · footer med markedsføringsmærkning på 21 sider
- Compliance MUST 1 (blocker, cyklus 3 → 25): lane-C-siderne havde slet ingen footer. Nu har alle 21 en `site-footer`: **«Markedsføringsmateriale.»** + direkte links til fællesprospektet og begge KID + «Udkast / noindex … Du kan tabe en del af eller hele din investering» + link til ordlisten.
- Invester trin 1 linker direkte til prospektet (før: «Prospektlink findes på faktasiden»).
- Tjek af UX MUST «tre 4.-trin» på invester: lukket på lane-C (trin 1–5, ét «4. Køb og omkostninger» med KID-tallet).
- Jargon-tjek på lane-C-sider: 0 «Level 1», «screener», «multi-tag», «Max DD». «max drawdown» kun i parentes efter «Største fald» på læs-grafen.
- Test 375/1280 × 21 sider: 0 konsolfejl, 0 overflow, én h1, footer 12px med mærkningen.

## 02:25 CEST lane-C checkpoint (Claude) · ordliste 131: hvem gør hvad + markedsføring + kalenderår
- **Ordlisten 124 → 131** (grupper 29 · 28 · 39 · 35): Investeringsforening og afdeling, Forvaltningsselskab (IFS), Depotbank (adskilt fra dit eget depot), Investeringsrådgiver (NDIIR), Markedsføringsmateriale (footer-ordet på alle lane-C-sider), Generel information (modsat personlig rådgivning) og Kalenderår (hele år 2024–2025, 2023 og indeværende år er delår, jf. compliance MUST 10).
- **Fejl rettet:** «Fundmarket» stod som «platformen». Invester-siden siger, at Fundmarket A/S er forvaltningsselskabet. Nu passer ordlisten med det.
- **Invester «Hvem gør hvad?»:** afdeling, forvaltningsselskab, depotbank og investeringsrådgiver linker nu til ordlisten. Bundbåndet siger «generel information» med link (persona-privat: «hvem træffer beslutningerne?»).
- **Vidensbot/handelssprog:** lær/rebalancering gengav bogen som «tag løbende lidt gevinst, når optimismen er høj». Det er timing-sprog. Nu: «lad vægtene styre, ikke stemningen … en generel betragtning, ikke en opfordring til at handle». Grep på lane-C-sider for trade/timing/kursmål/upside/billig/dyr: kun i benægtende form («ikke et kursmål», «ikke automatisk billig»).
- Test: om-data, invester, rebalancering, kort × 375/1280: 0 konsolfejl, 0 overflow, én h1. `#g-depotbank` åbner gruppen. Alle `om-data.html#g-…`-links på docs/ og laer/ peger på et eksisterende id (0 døde).

## 02:30 CEST lane-C checkpoint (Claude) · risici: «Hvad prospektet nævner» til familiekontoret + ordliste 136
- **PERSONA-familyoffice §7 («Risici: KID-resumé; let for FO, ingen likviditet/koncentration/modpart») og MUST 1 (governance):** ny sektion `risici.html#prospekt` med otte risikofaktorer, som fællesprospektet nævner for afdelingen (aktier, investeringsområde, selskabsspecifikke forhold, valuta, modpart, kontantindestående, værdiansættelse, bæredygtighed). De er skrevet i almindeligt dansk og hver har et link til ordlisten. Under dem står «Rammer for, hvad fonden må»: ingen derivater, intet værdipapirudlån, ingen aktive køb af unoterede aktier, min. 500 mio. kr. markedsværdi, intet benchmark (absolut afkast), høj risikoprofil og 5+ år, Jyske Bank A/S som market maker for PMINDI. Kilden står med sidetal (s. 82–84, 102–105, 128) og hentedato. Kun prospektets egne udsagn, ingen fortolkning.
- **Ordlisten 131 → 136:** Modpartsrisiko, Absolut afkast (med «betyder ikke, at afkastet altid er positivt … du kan tabe penge»), Market maker, Afledte finansielle instrumenter, Artikel 6-afdeling. `#g-benchmark` forklarer nu *hvorfor* der ikke er et benchmark (prospektets ordlyd). Kort-siden viser 136.
- **FAQ 24:** «Hvad må fonden ikke?» → `risici.html#prospekt`.
- **Visuel variation:** risici har nu 14 risikokort i to grids. Ved 375 er sektionen lang (ca. 2.300 px). Hvis reviewer finder det tungt, kan den foldes som `<details>` («For dig, der vil gå i dybden»). Jeg har ikke gjort det endnu, fordi FO skal kunne finde den uden at klikke.
- **Åbent (HANDOFF):** prospektet 24.10.2025 nævner kun kl n (PMINDI) og skriver «fokuseret portefølje». NDI/Fundmarket bør afstemme det.
- Test (Playwright, lokal): risici, om-data, laer/faq, kort × 375/1280: 0 konsolfejl, 0 h-overflow, én h1. 8 kort i `#prospekt`. 0 døde `om-data.html#g-…`-links fra risici, invester, faq.

## 02:45 CEST lane-C checkpoint (Claude) · livscyklus på dansk + «Hvor på bakken ligger vægten?» + ordliste 138
- **Level 1-jargon (PERSONA-privat):** `laer/livscyklus.html` bruger nu danske fasenavne først: før omsætning (præ-revenue), før overskud (præ-profit), høj vækst, vækst med overskud (GARP), moden (value). Matcher Mads' egen inddeling i visionsmødet (#44: før omsætning, før overskud, overskud). Ordlistens «Modenhed» er skrevet om på samme måde. Kort: «Koncept-stub» → «Tidlig skitse, endnu ikke i brug».
- **Ny form på ideer (`#h-lc`):** bobler på livscyklus-bakken, areal ∝ vægt. Tal regnet fra portfolio.json (PMINDI 345: 1,0 / 1,5 / 55,5 / 30,2 / 11,8 %; AKK ca. 53 / 30 / 14 %). Tydeligt mærket «FORSLAG, IKKE NDI'S VURDERING», fordi alle 345 modenheder er `maturityStatus: forslag`. Konsistent med ASML-linsen («NDI har endnu ikke sat en modenhedsgrad»). Visuel variation: første boble-/arealform på siden.
- **Ordliste 138:** + Transaktionsomkostninger (KID-post, ≠ din kurtage), + Indeksfond og ETF (fonden er ikke en indeksfond, intet benchmark).
- Tjek: 320/375/1280 på ideer, livscyklus, om-data, kort: scrollWidth = viewport, 0 pageerrors. Precheck OK.
- Åbent til Christian/NDI: må den maskinelle modenhedsfordeling vises offentligt, før NDI har gennemgået den? Hvis nej, fjern `#h-lc` (én sektion + én TOC-linje).

## 02:38 CEST lane-C checkpoint (Claude) · tre drivkræfter (Vidensbot §5) + Venn på ideer + ordliste 140
- **Vidensbot-krav §5 «De tre langsigtede temaer» (BLOG 19. jan 2026) var ikke dækket nogen steder.** Kilden læst i /workspace/mads/blog. Ny sektion `laer/saadan-taenker-vi.html#tv-dr` «Tre drivkræfter for de næste ti år»: AI gør intelligens billigere, fra papir til fabrikker (realkapital), en ny kold krig. Ugebrevets eget ord er «investeringstemaer». Her hedder de drivkræfter, så de ikke forveksles med fondens elleve temaer. Bevidst udeladt fra kilden: «relativt enkelt at skabe gode langsigtede afkast» og «strukturel fordel» (løfte/markedsføring). Medtaget: «AI er modvind for en del software», så drivkraften ikke læses som ren medvind.
- **Ny form nr. 16 på ideer (`#h-dr`, «Tre drivkræfter, ét overlap»):** første Venn-diagram på siden. Fondens temaer lagt i tre cirkler med vægt pr. tema (PMINDI pr. 1. jun 2026, regnet fra portfolio.json): Chips (13,3 %) i midten, Energi og Fysisk tech i AI ∩ realkapital, Energiressourcer og SpaceTech i realkapital ∩ kold krig, Quantum (forslag) i AI ∩ kold krig, Andet uden for. Mærket «NDI Analytics' skitse ud fra ugebrevets ord, ikke NDI's egen opdeling». Ingen sum pr. drivkraft (det ville ligne en eksponeringsopgørelse, NDI ikke har lavet).
- **Vidensbot-spørgsmål lukket:** ASML-linsen sagde «En flaskehals». Nu «En mulig flaskehals», som i value-chains.json.
- Ordliste 138 → 140: Tre drivkræfter, Realkapital. Lær-indeks: «Sådan tænker vi» ≈ 5 min.
- Test (Playwright, lokal 8833): ideer, sådan-tænker-vi, om-data, kort, lær-indeks × 320/375/1280: scrollWidth = viewport, én h1, 0 døde ankre, 0 konsolfejl. Venn-tekster flyttet, så de ikke krydser cirkelkanterne (screenshot 375/1280). Ved 375 er SVG-teksten ca. 9 px: læsbar, men lille. Teksten står også i `<desc>` og i listen under.
- **Til Christian/NDI:** må temaerne placeres i Mads' tre drivkræfter på en offentlig side, når det er vores skitse? Hvis nej: fjern `#h-dr` (én sektion + én TOC-linje). Lær-sektionen kan blive stående uden eksempler.

## 02:41 CEST lane-C checkpoint (Claude) · ideer foldet på mobil + to reviewer-SHOULDs
- **ideer.html (lane R cyklus 33, Nice: "fold efter de første 3"):** de første fire billeder (flodsystem, én kasse/flere temaer, to sorteringer, vægt ≠ kurs), «Hvorfor ejer vi den?» og citaterne står åbne. De øvrige 11 billeder er nu native `<details>` med overskriften som summary ("Vis ▾"/"Skjul ▴", 44 px trykflade) og en «Fold alle ud»-knap. Fra 860 px er alt foldet ud som før. Indholdsfortegnelse og dybe links (fx `ideer.html#h-lc`) folder målet ud. Højde ved 375: **18.199 → 7.560 px**. 0 pageerrors, 0 vandret overflow ved 375/1280 (Playwright lokalt).
- **risici.html (SHOULD):** "Sharpe" er fjernet som underlabel → "Gns. afkast delt med udsving, uden rente trukket fra" + ordlistelink. Kilde-linjen siger "afkast pr. udsving" i stedet for "Sharpe". Ordet står kun i ordlisten.
- **invester.html (SHOULD "kl n"):** kilde-linjen siger nu "andelsklasse PMINDI".
- Persona-privat: "hvem træffer beslutningerne" er dækket (invester «hvem gør hvad» → fakta#hold, Mads Christiansen navngivet). Bogen er nævnt på 5 lær-sider.
- Ikke mine filer, stadig åbne MUSTs: BREAKING/chartMarkers (js), nyhedsarkiv-tabsadvarsel, periode/embed delår + KID.

## 02:43 CEST lane-C checkpoint (Claude) · fagord ud af overskrifterne + ordliste 142
- **Lane R cyklus 32 SHOULD (laes-grafen "max drawdown"):** lukket. Linjen hedder «Største fald fra top».
- **Persona-privat, forslag 4 ("erstat jargon med dansk"):** CAGR er fjernet fra overskrifter og dørtekster på lær-indeks, risici, rebalancering, risikoklasse, sådan-tænker-vi, laes-grafen, forsinket-beholdning, ordliste og ideer. Ordet står nu kun i parentes efter «afkast pr. år». FAQ-svaret om CAGR bruger nu møntspillet (+50/−40 = 90 kr.). Variance-drag-skyderen har ikke længere σ²/2 i etiketten.
- **kort.html:** «underwater-graf» → «hvor langt under toppen kursen er nu».
- **Ordliste:** to nye opslag, som siden bruger, men ikke forklarede: KID-omkostningstallet (RIY) og øjebliksbillede (snapshot, 7 sider bruger ordet).
- Handelsords-sweep i lane-C-filer: 0 hits uden negation eller procesbetydning.
- Test (Playwright, lokal 8839, 375): 11 sider, én h1, 0 overflow, 0 pageerrors, 0 hits på "max drawdown|underwater".
- Ikke mine filer, stadig åbne: BREAKING/chartMarkers (js), nyhedsarkiv-tabsadvarsel, periode/drawdown "YTD/CAGR/Drawdown" i h1, embed-KID.

## 02:46 CEST lane-C checkpoint (Claude) · ordliste 147: ord fra data uden forklaring
- Scannede sidetekst + docs/data/*.json for fagord uden opslag. Nye: ESG (fakta viser «ESG: Artikel 6» uden forklaring), kryptoaktiver/blockchain/stablecoin (Coinbase-profil m.fl.), chipdesign-software (EDA, fra value-chains), autonom kørsel, lavt kredsløb (LEO). Lithium føjet til kritiske råstoffer (12 hits i data).
- Krypto-opslaget siger «i den forsinkede beholdning … beskriver selskabernes forretning, ikke en anbefaling». Ingen påstand om, hvad fonden må eje (ikke verificeret mod prospekt).
- 0 brudte #-ankre, 0 dublet-id'er i om-data. kort-døren: 142 → 147 begreber.
- Reviewer-MUSTs (cyklus 33: BREAKING/X, nyhedsarkiv-tab, ÅTD-forbehold på fonden/periode/embed) ligger alle uden for lane-C-filer. Intet at rette her.

## 02:58 CEST lane-C checkpoint (Claude) · ideer: «Hvem står bag tallet?» (form 18)
- Ny form `ideer.html#h-kd` (IDESPEJDER #20, «konfidensmærke på hvert tal»): fire kildestempler i 2 × 2 på desktop og én kolonne på mobil. Offentliggjort af andre (Fundmarket/KID: afkastserie, SRI, omkostninger, beholdning pr. 1. jun. 2026), regnet ud af NDI Analytics (afkast pr. år, ÅTD, fald fra top, afkast pr. udsving, 100.000 kr., vægt pr. tema), NDI's egen inddeling (temaer, værdikæder, flodsystem, modenhed) og AI-udkast (dele af NDI-linsen). Rammen går fra hel (cyan) over dobbelt og gul til stiplet. Ingen nye tal. Alle punkter linker til ordlisten.
- Persona-linse: privat 55+ får svar på «kan jeg stole på det her?» uden fagord. Familiekontoret får sporbarhed (kilde → beregning → vurdering → udkast).
- Foldet på mobil ligesom de andre billeder efter de fire første. Dybt link `#h-kd` folder ud.
- Test (Playwright, lokal 8833) på ideer, om-data, lær-indeks og kort ved 320/375/1280: én h1, 0 overflow, 0 pageerrors. Stemplerne er 292/347/563 px brede.
- Reviewer cyklus 33: ingen MUST i lane-C-filer. 04:00-checkpointet følger.

## 03:05 CEST lane-C checkpoint (Claude) · ny lær-side «Hvorfor ikke de 11 sektorer?»
- Vidensbot §5 nævnte «Hvorfor vi ikke bruger de 11 sektorer» med Tesla-eksemplet (mødet 27:36) som egen tekst. Det fandtes kun som matrix på Idéer og som FAQ-svar. Nu er det en lær-side med tre forskellige former: en kasse, der splittes (teknologi 151 → seks temaer), søjler den anden vej (energi 37 ← syv sektorer) og «Vælg et selskab» med seks knapper (aria-pressed, aria-live).
- Fair over for sektorer: «Det er sektorer gode til» (fælles standard, må gerne stå) mod «Det kan de ikke». Det svarer til MC 27:17: «GICS må gerne vises, men ikke som hovedinddeling».
- Playwright 375/1280: 0 pageerrors, 0 overflow, én h1, 0 tekster under 12 px (segmenttekst gjort transparent på mobil i stedet for font-size 0). Højde 3.667 px ved 375.
- Linket fra lær-index (Tankegangen, nu 5 døre), kort, ordliste `#g-gics` og FAQ «Hvorfor står Tesla ikke bare som bilselskab?».
- Tal fra portfolio.json pr. 1. jun. 2026 (antal pr. sektor × tema, ingen kurser/afkast). Sektorer er offentlige opslag, der svarer til den klassiske inddeling. Det står i kildelinjen.

## 02:55 CEST lane-C checkpoint (Claude) · ny lær-side «Fra chip til datacenter: en tidslinje»
- Vidensbot §5 «Datacenter og chiptidslinje» (59:37) var ikke dækket. Værdikæder har kun en tidslinje fremad (2025–2045). Den nye `laer/tidslinje.html` ser tilbage: 12 milepæle 1971–2025 (4004, TSMC/foundry, GPU, AWS, CUDA, AlexNet, transformer, EUV, ChatGPT, chipmangel, datacentre, strøm). Hver milepæl er farvet efter flodsystemets dæmning, og knapper fremhæver én dæmning ad gangen (aria-pressed og aria-live).
- Tre kort under tidslinjen: «Kan vi lave chippen? → Kan vi regne nok? → Kan vi forsyne det?» De ender i «Vi vælger udviklingen, ikke vinderen». Afsnittet «Hvad tidslinjen ikke siger» dækker: ikke en prognose, ikke hvem der tjener pengene, ikke fondens handler.
- Links fra lær-oversigten (Tankegangen), kort, ordlisten (dæmning) og FAQ (nyt kort svar «Hvorfor flytter flaskehalsen sig?»). Ideer-meta er rettet fra «Seksten» til «Atten billeder».
- Playwright 375/1280: ingen vandret overflow, 0 JS-fejl, 0 knapper under 24 px, filteret virker (Energi: 1 af 12).

## 04:00 CEST
**Live:** https://christianhornskov.github.io/ndi-analytics-udkast/ · Screenshots: `notes/ux-screens/04-*.png` · Viewport: 1280 + 375 · Runde: natlig UX-review (Grok Bot) · Pages last-modified ~02:13 UTC (04:13 CEST).

**Perspektiver:** privatinvestor (55+, mobil først) + institutionel/family office (desktop, sporbarhed, mærkning).

### Løst siden 00:00 CEST
- **(desktop + mobil)** 00:00 MUST 1 (datakvalitet): Cipher Mining → `compute` (forslag); Opendoor (+ warrants) → `platforms` (forslag); Coinbase → `platforms`. Andet: 31 selskaber / **ca. 6,3 %** vægt (fra ~11,6 %). 0 ISIN-som-navn. Alle 345 har `maturityStatus: forslag` (ikke længere «ikke-klassificeret»).
- **(desktop + mobil)** 00:00 MUST 2: X-markørtekst uden «rådgiver» (kun i `complianceNote`). Performance-markør nu: «offentlige totalafkasttal for NewDeal Invest-fondene (Fundmarket)».
- **(desktop)** 00:00 MUST 3: `commitSearch` (150 ms) synker `?q=` ↔ liste; deep link `?q=softbank` / Cipher / Opendoor verificeret i overnight-status + live.
- **(mobil)** Hovednav viser stadig Entré · Fonden · Porteføljen · Udforsk · Følg med · Risici (CSS-override af `.hide-sm`).
- **(desktop + mobil)** Fonden: eyebrow «FONDEN · MARKEDSFØRINGSMATERIALE»; advarsel i KPI-panelet (DOM); «Største fald» (ikke Max DD); takeaway under graf; PMINDIAKK uden kursserie («efter 12 måneder»).
- **(desktop + mobil)** SoftBank-selskab: udfyldt linse med «AI-udkast» + «ikke en anbefaling»; vægt 1,51 % pr. 1. jun. 2026; ingen kursmål set.
- **(mobil)** Livscyklus: «Vis kurve» (skjult default) — 00:00 SHOULD om tom/høj boks delvist lukket.
- Palet respekteret (gul sparsomt på forslag-badges). Notes ikke på Pages.

### MUST
1. **(mobil)** Fonden: første viewport viser store afkasttal (**+104,8 %**, **+26,4 %**) uden historisk-afkast-advarsel synlig. Advarslen ligger korrekt i DOM under KPI-gitteret, men gitteret skubber den under fold på 375. Privatinvestor scanner tal før scroll. Flyt en kompakt `warn` *over* eller *mellem* første KPI-række på smalle viewports, eller gør KPI-gitteret én kolonne med advarsel efter de to første tal. [UX-krav afkastadvarsel, brief, inspiration §1 Stripe/OWID]
2. **(desktop + mobil)** X-grafmarkør med teksten **`$NVDA $SE $HIMS`** på performance-grafen. Ligner ticker-picks ved afkasttal → mistillid hos både privat og institutionel (anbefalingsagtigt). Skjul, omskriv til kontekst uden tickers, eller flyt til NDI-på-X uden grafmarkør. [R2, compliance-tone, brief «ingen rådgivning»]
3. **(desktop + mobil)** `temaer.html` mangler **Markedsføringsmateriale**-footer og KID/prospekt-links (live HTML: ingen `site-footer` / KID). Temaer er en produktdør fra Entré («87 forslag»). Andre sider har mærkningen — hullet skaber ujævn tillid. [compliance MUST 1 / HANDOFF, OWID «kilde synlig»]

### SHOULD
1. **(mobil)** Nav-rækken stadig tæt; CSS `min-height: 36px` < Apple 44 pt. Wrap hjælper, men hit-area er under mål. [M3, Apple HIG]
2. **(mobil)** Udforsk: søgning + «Følg tema (stub)» + mange chips før første resultat — fold filtre / bottom sheet (Things/Robinhood progressiv disclosure). [inspiration §4–5, 00:00 SHOULD]
3. **(desktop + mobil)** Skjul synlig stub **«Følg tema (stub)»** på Udforsk (stadig i live UI). [22:00 COULD 1]
4. **(desktop + mobil)** KPI-label «Gns. årligt afkast **(CAGR)**» — CAGR i synlig label er jargon for privatinvestor; lær-sider har allerede renset overskrifter. Brug «Gns. årligt afkast» + tooltip/ordliste. [persona-privat, lane-C precedent]
5. **(desktop)** Selskabsside: reduceret header (kun «Udforsk» + CTA) vs. fuld nav på SPA — dobbelt «tilbage»-mønster uændret. [22:00 SHOULD 5]
6. **(desktop + mobil)** Udforsk-lede nævner stadig **«Level 1»** — fagord uden forklaring i første afsnit. [minimize jargon]
7. **(mobil)** Fonden: datostempel gentaget (global linje + lede) — støj i første viewport. [scanbarhed]

### COULD
1. Tabular nums konsekvent i vægtkolonner (Linear/Vercel) — delvist på plads overnight; spot-tjek screener.
2. Entré: «87 forslag» / «345 … forslag»-badges er ærlige, men tætte gul-badges kan signalere «ufærdigt»; overvej én samlet statuslinje i stedet for badge pr. dør. [tillid, OWID huller synlige — uden at over-badge]
3. Chart-takeaway gentager procent; hold den kort og sørg for at warn forbliver i samme synsfelt som takeaway ved scroll til graf (Stripe + advarsel).

### Top-3 MUST (til Leo)
1. Mobil Fonden: afkastadvarsel under fold ved store afkasttal.
2. X-markør `$NVDA $SE $HIMS` på performance-graf — skjul/omskriv.
3. `temaer.html` uden Markedsføringsmateriale + KID-footer.


## 06:00 CEST lane-C checkpoint (Claude) · egne sider, 375 + 1280, lokal main + lane-C
**Omfang:** 14 sider i lane-C's ejerskab (ideer, kort, om-data, invester, risici, ndi-perspektiv, lær-oversigt, FAQ, tidslinje, sektorer, Sådan tænker vi, livscyklus, risikoklasse) og Entré som reference. Screenshots `notes/ux-screens/06-C-*-mob.png`.

**Resultat:** 0 JS-fejl, 0 vandret overflow ved 375 og 1280. Alle sider har «Markedsføringsmateriale» og tabsadvarsel. Handelsord («køb», «sælg», «kursmål») står kun i negationer («ikke en karakter, et kursmål eller en anbefaling»). CAGR og P/E står kun i forklaringer eller som navn på en lær-side, ikke i overskrifter.

### Rettet i denne runde
- **(mobil)** `ideer.html`: 30 temalinks i varmekortet og tre rækkediagrammer var 19 px høje, under WCAG 2.5.8 (24 px). Nu er de 24 px. Små mål ved 375: 30 → 1.
- **(desktop + mobil)** `om-data.html`: gruppetallene i ordlisten var forældede (35 · 41 · 35 mod reelt 36 · 42 · 38). Tallet tælles nu på siden, så nye begreber ikke giver skæve tal igen.
- HANDOFF-CODEX: lær-døre 18 → 19, NDI-perspektiv-grupper rettet til det, siden viser nu (333 selskaber, Andet 27).

### Status på cyklus 38-fund i andre lanes (tjekket i kode 06:02)
- X-tematræf: `x-feed.js` har nu et filter, der kun viser husets konti (precheck bekræfter) ✅.
- «Manuel klassifikation» står ikke længere i `selskab.html` ✅.

### SHOULD (lane-C, næste)
1. ~~`risici.html` «årlige afkast (CAGR)» uden link~~. Rettet i samme runde: CAGR linker nu til `om-data.html#g-cagr`.
2. `ndi-perspektiv.html`: «Andet / uklassificeret 27» er højere end de 6 fra kl. 02:30. Det kommer af lane-B's temaforslag. Tjek, at lead-teksten ikke lover færre.

## 06:06 CEST lane-C · ndi-perspektiv: livscyklus-formulering
- `ndi-perspektiv.html`: forklaringen af livscyklus siger nu «kun et maskinelt forslag, som afventer NDI's gennemgang», ikke bare «ikke sat». Det passer med `maturityStatus: forslag` (samme uoverensstemmelse som cyklus 38 SHOULD 1 på selskab.html).
- **Til Leo (ikke lane-C's fil):** `docs/data/unique-metrics.json` `note` siger «Quantum-metrics er forslag» (engelsk fagord) og «Livscyklus er ikke klassificeret for nogen selskaber endnu». Forslag: «Quantum-temaet er et forslag. Livscyklus findes kun som maskinelt forslag og afventer NDI's gennemgang.»

## 06:13 CEST lane-C · fagord i andre lanes' UI (læst live lokalt, 1280, 12 sider)
Ordlisten (lane-C) dækker nu ordene. Teksten i UI'et ligger hos andre lanes, så det følgende er **forslag til Leo**:
1. `fakta.html:415`: hullet vises som «**Revision / auditor**», og ved siden af står «Officiel volatilitet / Sharpe». Engelsk og intern huller-tone på en produktside. Forslag: «Revisor: oplyses i årsrapporten» (link) eller skjul feltet, indtil navnet er kendt.
2. `vaerdikaeder.html:877`: «multi-tagges også energi». Forslag: «hører også til temaet energi».
3. `js/app.js:441`: knaptekst «**YTD** dyb side». Forslag: «År til dato i detaljer» (ÅTD bruges andre steder, så det bør være ens).
4. Livscyklus-tællere på Udforsk: «High growth · GARP · Value» på engelsk. Ordlisten forklarer dem (#g-high-growth, #g-garp, #g-value), men plain dansk ville være «Høj vækst · Vækst med overskud · Moden», som ideer `#h-lc` allerede bruger.
5. «screener» står i UI på tema/selskab («Åbn i screeneren →»). Ordliste-opslag `#g-screener` er tilføjet. Forslag: kald den «Udforsk» i knapteksten, som i nav.

## 06:18 CEST lane-C · tap-mål, slutstatus
- **375:** 0 links eller knapper under 24 px på alle 23 lane-C-sider (ideer, kort, om-data, invester, risici, ndi-perspektiv og 17 lær-sider). Ved 06:00 var der 30+ på ideer.
- **1280:** kun den fælles undernav `nav.nav a` er 19 px høj. Den styles i `docs/css/ndi.css`, som ikke er lane-C's fil. Den består sandsynligvis WCAG 2.5.8's undtagelse for afstand, fordi der er mellemrum mellem links. Forslag til CSS-lanen: `nav.nav a{padding:3px 0}`, så den er robust.
