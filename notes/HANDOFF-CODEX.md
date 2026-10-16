# Handoff til Codex (næste uge)

Udkast: NDI Analytics · GitHub Pages `main:/docs` · Repo: ChristianHornskov/ndi-analytics-udkast (offentligt, bevidst — ingen historikomskrivning).

Live: https://christianhornskov.github.io/ndi-analytics-udkast/

## Formål
Klikbart dansk udkast af "stedet man researcher tech-aktier i Danmark" (Mads). Statisk SPA under `docs/`. Ingen live Azure, ingen secrets i repo.

## Arkitektur
- **Hosting:** GitHub Pages, source `docs/`.
- **App-shell:** `docs/index.html` + `docs/js/app.js` (views: entre/fonden/portefolje/udforsk) + `docs/css/ndi.css`.
- **Undersider:** HTML-filer (tema, temaer, selskab, selskaber, drawdown, periode, sammenlign, invester, risici, om-data, kort, vaerdikaede, ndi-perspektiv, nyhedsarkiv, laer/*, embed/).
- **Data:** JSON-snapshots i `docs/data/` (ingen pipeline i udkastet).
- **Tests:** Playwright smokes (`scripts/smoke.mjs`, `smoke-quality.mjs`, `smoke-cycle3.mjs`). Precheck: `scripts/precheck.sh` før hvert push.
- **Interne noter:** kun `/notes` (repo root). `docs/notes/` er stub-advarsel.

## Vigtige filer
| Sti | Rolle |
|---|---|
| docs/js/app.js | SPA-views, screener, fonden, a11y |
| docs/js/data.js | loaders, afkast-matematik, tema-labels |
| docs/embed/* | forenklet embed-graf (YTD+all, AKK-gate) |
| docs/data/portfolio.json | fonde, NAV/totalafkast (PMINDI), NAV-only (AKK), positions |
| docs/data/company-months.json | kvartalssnapshots ≤ 2026-06-01 |
| docs/data/themes.json | aggregat pr. tema (genopbygges ved klassifikation) |
| docs/data/unique-metrics.json | NDI-linse placeholders |
| docs/data/multi-tags.json | Tesla m.fl. multi-tema |
| docs/data/fund-meta.json | KID/SRI/legal |
| scripts/precheck.sh | HARD compliance gate |
| notes/SPEC.md | krav ↔ status |
| notes/THEME-FORSLAG.md | overnight temaforslag |
| notes/DATA-DEFINITIONS.md | første NAV, physical→led2, osv. |
| notes/IDEAS.md | produktidéer |
| notes/VIDENSBOT-*.md | compliance reviews |

## Datakilder (udkast)
1. **Afkast:** Fundmarket-baseret snapshot i `portfolio.funds[].data` (PMINDI: price+total; PMINDIAKK: price only indtil 12 mdr.).
2. **Beholdning:** offentlig Fundmarket-rapport, forsinket øjebliksbillede pr. 2026-06-01 (første tilgængelige rapport i juni, ikke et kvartalsskifte; Vidensbot blokering 2 er stadig åben).
3. **Temaer:** manuel/NDI-linse + overnight forslag (`themeStatus: forslag`).
4. **Profiler:** `company-profiles.json` (AI-assisteret, mærket).
5. **KID:** `fund-meta.json` (SRI, key risks, URL).

## Leo-locks (må ikke genåbnes uden Christian)
- Offentligt repo, ingen force-push/historikomskrivning.
- Notes aldrig under docs/ (undtagen stub).
- Holdings ≤ 2026-06-01; company-months kun mar/jun/sep/dec.
- Ingen d1/per-stock returns/P/S/P/E i docs/.
- PMINDIAKK: ingen afkastgraf før 12 mdr.
- PMINDI: ingen 1m/3m.
- Nasdaq-knap væk; "Fonden har intet fast benchmark."
- Første NAV = performance-start.
- ÅTD + 100k: beholdt med "afventer Fundmarket-godkendelse".

## Før live (checkliste til Codex/Christian)
- [ ] Privat vs offentligt Pages-setup (compliance: notes i historik er synlige mens repo er offentligt).
- [ ] Fundmarket-godkendelse af ÅTD, 100k-eksempel, eventuel benchmark.
- [ ] Gennemgang af alle `themeStatus: forslag` (notes/THEME-FORSLAG.md).
- [ ] Modenhedsklassifikation (alle er "ikke-klassificeret").
- [ ] Erstat AI-profiltekster med NDI-godkendte.
- [ ] Live data-pipeline (Azure) — ikke i udkastet.
- [ ] X/nyhedsresuméer med sanity check.
- [ ] Fjern noindex når klar til indeks.
- [ ] GA4 / tracking efter brand-site beslutning.
- [ ] Juridisk review (KID-links, risikotekst, marketingproces).
- [ ] **Markedsføringsmærkning (compliance MUST 1):** lane-C-siderne (ideer, kort, om-data, invester, risici, ndi-perspektiv, 15 × laer/) har nu en `footer.site-footer` med «Markedsføringsmateriale. Læs prospektet og KID for PMINDI/PMINDIAKK, før du træffer en endelig investeringsbeslutning» og direkte links. Forside, fonden, omkostninger, vaerdikaeder, selskab, embed m.fl. (andre lanes) mangler stadig den linje. Christian/Fundmarket: bekræft, at sitet skal mærkes som markedsføring (reviewer anser det som blocker).

## Smokes (seneste overnight)
Se notes/STATUS.md. Forvent: smoke-quality ~108, smoke-cycle3 ~82+, precheck PASS.

## Kontaktpunkter
- Design: Jesper (brand tokens i SPEC).
- Indhold/klassifikation: Mads + porteføljehold.
- Compliance: Vidensbot-noter.


## Morning demo script (Christian, ~6 min)
Kort version. Ét trin = én side, ét greb, én sætning. Detaljer og tal står i «Demo-detaljer» længere nede.

| # | Side | Vis | Sig | Tid |
|---|---|---|---|---|
| 1 | Entré (`index.html`) | De tre døre og «Teknologiske værdikæder» | «Stedet man researcher tech-aktier i Danmark.» | 0:30 |
| 2 | `vaerdikaeder.html` | Flodsystemet (5 dæmninger), skift AI → robotik → energi → rum → quantum, fold ét led ud | «Efterspørgslen er vandet, flaskehalsene er dæmninger.» | 1:00 |
| 3 | Fonden (SPA) | Totalafkast, «Max drawdown» i nøgletal (sig «største fald fra top»), kalender, AKK uden graf før 12 mdr. | «Den korrekte performance først.» | 0:45 |
| 4 | `drawdown.html` | Middel og median for episoder + underwater | «Fald er normalt. Her kan man se hvor dybe og hvor lange.» | 0:30 |
| 5 | Portefølje / Udforsk | Tesla med to tags, SoftBank, forslag-mærker | «Én aktie, flere temaer. Ingen sektorkasser.» | 0:45 |
| 6 | `ideer.html` | Rul gennem de atten former (17 i indholdsfortegnelsen + citaterne), stop ved «Tre ure på samme side». Spørger nogen til temaer: «Lag på lag» (`#h-stk`). Spørger nogen til spredning: «Hvor mange selskaber er halvdelen?» (`#h-kv`, 76 af 345) | «Hver slags tal har sin egen dato, og forsinkelsen er med vilje.» / «Hvert lag bygger på laget under.» / «Bred, men ikke flad.» | 1:00 |
| 7 | `risici.html` → `om-data.html` | Klasse 5 af 7, «Udsving og fald i tal» (`#tal`), KID-risici som links → ordlisten (147 begreber, 4 grupper), «Hvad prospektet nævner» (`#prospekt`) til FO | «Hvert fagord kan slås op.» | 0:45 |
| 8 | `laer/index.html` | «Ny her? Start med de tre», så én side: P/E *eller* Risikoklasse (skyder). Spørger nogen «hvad er kursen?»: Indre værdi (tre skydere). Spørger nogen «hvorfor ingen 3 måneder?»: Sådan læser du grafen (flyt startdagen: +17 % fra toppen, +69 % fra bunden, samme kurve) | «P/E straffer investeringen, derfor viser vi fase og eksponering først.» | 0:45 |
| 9 | `kort.html` | Sidekortet | «Hvis nogen spørger, hvor alt er.» | 0:10 |

Spørgsmål om risikoklasse kontra udsving («32 % burde give klasse 6?»): `risici.html#tal` → «Hvorfor passer tallet ikke med risikoklassen?», og `om-data.html#g-kid-udsving`. Svar: KID'et regner udsvinget efter sin egen metode, så de to tal er ikke ens. Spørgsmål om «hvem passer på pengene?» (familiekontor): `invester.html#hvem` (depot → forening → Fundmarket → Danske Bank som depotbank, NDIIR som rådgiver).

Tjek før demo (2 min): seneste NAV-dato på Fonden, at `#g-…`-links på risici.html folder ordlisten ud på mobil, at FAQ-søgning på «dæmning» skifter til alle typer.

Undgå at sige: «køb», «sælg», «kursmål», «billig», «god aktie», «timing». Temaer og led er eksponering, ikke anbefaling.

## 2026-10-15/16 overnight (Grok) — værdikæder
- Primær side: `docs/vaerdikaeder.html` + `docs/data/value-chains.json` (Vidensbot-indhold).
- Kæder: ai-compute (13), physical, energy, **space**, quantum. Fintech = tema, ikke kæde.
- Compliance: ingen handelsprog; Musk-citat kun med kilde; holdings asOf 2026-06-01.
- Klassisk `vaerdikaede.html` bevares som enkel AI-kæde.
- Visual variety: treemap/sunburst, timeline, flaskehalse, chapter-nav.
- Drawdown: middel/median + maxDD-fix (~−35,8 % PMINDI).
- Åbne MADS uden data: market cap, produktkategori, modenhed.

## Demo-detaljer (opslag ved spørgsmål · tjekket mod siden 16/10 ~02:30, lane-C efter merge af main)
Tal fra beholdningen er PMINDI pr. 1. jun 2026 efter lane-B's temaforslag (main): 345 aktier, 229 med tema, 85 forslag, 31 i Andet.

1. **Entré** (`index.html`). Døre + «Teknologiske værdikæder». Sig: «stedet man researcher tech-aktier».
2. **Værdikæder** (`vaerdikaeder.html`). Flodsystem med 5 dæmninger, skift AI → robotik → energi → rum → quantum, fold et led ud (Til siden + NDI-blik). Musk-citat kun med kilde.
3. **Fonden** (SPA). Totalafkast, kalender, 100k-eksempel med Fundmarket-note, AKK uden graf før 12 mdr. Nøgletallet hedder stadig **«Max drawdown»** (ca. −35,8 %) i app.js; linket i fanerne hedder «Største fald». Sig «største fald fra top», uanset etiketten.
4. **Fald fra top** (`drawdown.html`). Middel og median for episoder + underwater.
5. **Portefølje / Udforsk.** Tesla med to temaer (fysisk tech + energi), SoftBank, forslag-mærker.
6. **Idéer** (`ideer.html`), atten former i denne rækkefølge: Flodsystemet på ét billede (`#h-flod`) · Én kasse eller flere temaer (Tesla, `#h-vs`) · Samme 345 selskaber, to sorteringer (varmekort 11 temaer × 8 sektorer, teknologi 151 → seks temaer, `#h-mx`) · Vægt er ikke kurs (`#h-wk`) · Fra «Andet» til tema (31 · 85 · 229, ca. 6,3 / 19,7 / 66,0 %; flest forslag i Energi, 28; alle 4 i Quantum er forslag, `#h-tf`) · 345 aktier, én prik hver (median ca. 0,2 %, top 10 ca. 11,9 %, største ca. 2,1 %, `#h-pr`) · Hvor mange selskaber er halvdelen? (26 / 76 / 160 = ¼ / ½ / ¾, ligevægt 173, `#h-kv`) · Hvor på bakken ligger vægten? (livscyklus-bobler: før omsætning 1,0 % · før overskud 1,5 % · høj vækst 55,5 % · vækst med overskud 30,2 % · moden 11,8 %, alle maskinelle forslag, `#h-lc`) · Fald fra top som episoder (tænkt kurve, `#h-uw`) · Tre ure på samme side (`#h-ur`) · Hvad står der i tallet? (`#h-lag`) · To klasser, samme temaer (største forskel 1,6 pp, Platforme, `#h-kl`) · Lag på lag (`#h-stk`) · Tre drivkræfter, ét overlap (Venn: AI · realkapital · ny kold krig fra ugebrev 19. jan 2026, temaerne lagt ind som NDI Analytics-skitse, Chips i midten, `#h-dr`) · Hvorfor ejer vi den? (NDI-linsens fem spørgsmål rundt om ASML, 0,22 %, `#h-ln`) · Hvem står bag tallet? (fire kildestempler: offentliggjort af andre · regnet ud af NDI Analytics · NDI's egen inddeling · AI-udkast, hel → stiplet ramme, `#h-kd`) · Bygget som et hus (`#h-hus`) · Tre sætninger, siden bygger på (`#h-q`). Alle temaantal og -vægte på siden er regnet om fra portfolio.json efter main-merge 16/10. Sig: «samme pointer som værdikæderne, men på 30 sekunder».
7. **Risici** (`risici.html`). SRI 1–7 (klasse 5) for begge klasser, KID-risici som links til ordlisten, **«Udsving og fald i tal»** (`#tal`: udsving pr. år ca. 32,5 %, afkast pr. udsving 0,89, største fald −35,8 %, regnet af NDI Analytics, ikke KID) med svar på «hvorfor passer det ikke med klasse 5?», **«Hvor langt er sorteringen i temaer?»** (`#sortering`, tæller direkte fra portfolio.json), seks risikokort i NDI-sprog, **«Hvad prospektet nævner»** (`#prospekt`: otte risikofaktorer fra fællesprospektet s. 82–84/102–105 i almindeligt dansk + «Rammer for, hvad fonden må»: ingen derivater, intet værdipapirudlån, ingen aktive unoterede køb, min. 500 mio. kr. markedsværdi, intet benchmark/absolut afkast, Jyske Bank A/S som market maker for PMINDI, s. 128), fast «Sådan bruges NDI Analytics». FO-spørgsmål «bruger I derivater/gearing?» → `risici.html#prospekt` (vi siger kun det, prospektet siger: ingen derivater, intet udlån). Spørger nogen til Sharpe: ordlisten `#g-sharpe`.
8. **Ordliste** (`om-data.html`). 147 begreber i 4 grupper (31 · 36 · 42 · 38), foldet sammen på mobil, dybe links `#g-…` åbner den rigtige gruppe. Alle elleve temaer og alle led i value-chains.json har en post. «Hvem gør hvad?» (forening, forvaltningsselskab, depotbank, investeringsrådgiver), markedsføringsmateriale og kalenderår/delår har også en post. Nyt 03:00: ESG, krypto/stablecoin, EDA, autonom kørsel, LEO.
9. **Lær** (`laer/index.html`). «Ny her? Start med de tre» (Sådan tænker vi → Hvorfor så mange aktier? → Årligt afkast og gennemsnit), så 18 døre i fire grupper (5 · 5 · 4 · 4): Tankegangen · Afkast og udsving · Fonden i praksis · Slå op. *Sådan tænker vi* har nu møntspillet (100 → 150 → 90 kr.) under «Vi vælger udviklingen, ikke vinderen» og «Hvorfor ejer vi den?» (NDI-linsens fem spørgsmål med Tesla som eksempel). Bedste skydere at vise: *Risikoklasse* (25 % → klasse 5, 40 % → klasse 6), *Indre værdi* (tre skydere), *Sådan læser du grafen* (flyt startdagen: +62 / +17 / +69 % på samme kurve), *Rebalancering* (+300 % → 30,8 %), *Valuta* (+10 % × −5 % = +4,5 %). Ny dør (03:05): *Hvorfor ikke de 11 sektorer?* (`laer/sektorer.html`): sektoren teknologi = 151 selskaber delt i seks temaer, temaet energi spredt over syv sektorer, og «Vælg et selskab» (Tesla, Nvidia, Broadcom, Meta, Fluence, CoreWeave: sektorkasse → NDI-temaer). FAQ: 24 korte svar + «Prøv»-chips; skriv «dæmning», så skifter visningen til alle typer. Nye svar (02:22): «Hvad koster det mig om året?» (KID 2,79/2,85 %), «Hvordan bliver afkastet beskattet?», «Hvorfor er 2023 ikke et helt år?», «Hvad skal jeg sammenligne afkastet med?», «Hvem træffer beslutningerne?». Alle sider i lane-C har nu en `meta description` uden procenttal (delings-preview).
10. **Sidekort** (`kort.html`). «Hvor er alt».
11. **NDI-perspektiv** (`ndi-perspektiv.html`), kun hvis nogen spørger til «Hvorfor ejer I den?». Siden er nu foldet sammen i 12 temagrupper (Chips 54 · Software 46 · Platforme 38 · Energi 38 · Energiressourcer 29 · Fysisk tech 26 · SpaceTech 21 · Optik & netværk 19 · Compute 18 · Connect 10 · Quantum 5 · Andet 6 = 310 selskaber med linse) med søgefelt og temachips. Synlig tekst er ca. 2.500 tegn i stedet for ca. 192.000. Skriv «kobber» i søgefeltet (7 selskaber), eller åbn Quantum: alle 5 er forslag. Livscyklus er udeladt pr. selskab (NDI har ikke sat den for nogen) og står én gang i forklaringen. KID-links til begge klasser står nederst.

Tal at have klar: første NAV PMINDI 22. sep 2023, PMINDIAKK 5. dec 2025, beholdning pr. 1. jun 2026, KID pr. 14. aug 2026. Alle tænkte eksempler på lær-siderne står som tænkte.

Åbne spørgsmål: market cap/produkt/modenhed (alle 345 modenheder er forslag), gennemgang af 85 temaforslag, privat repo vs Pages, Fundmarket på ÅTD/100k, officielle tal for udsving/Sharpe.


## Åbne spørgsmål til Codex / Christian (2026-10-16 ~02:15 CEST · Leo FO + privat)

**Ikke tilføjet i dette overnight-build (compliance):**
- **Sammenligningskurve / benchmark-kurve** (fx Nasdaq) mod fondens totalafkast. Beslutningen står: ingen benchmark-kurve i UI. Behov for eventuelt senere: neutral «sådan vurderer du selv»-tekst er på Fonden; en egentlig kurve kræver eksplicit beslutning fra Christian + compliance.
- **Nasdaq-kurve:** må **ikke** tilføjes uden den beslutning.

**Mangler / udestår (data fra NDI eller Fundmarket):**
- **AUM** (formue under forvaltning) — ikke i Fundmarket-snapshot som brugbart felt i udkastet.
- **Auditor / revision** — `fund-facts.json` har `auditor.name = udfyldes af NDI` (samlet i «Mangler fra NDI» på fakta.html).
- **Officiel volatilitet / Sharpe** — kun beregnede tal i risk-stats; officielle Fundmarket-tal mangler.
- Evt. samlet KID-omkostningstal bekræftet af NDI (vi gengiver 2,79 % / 2,85 % ved 5 år fra KID som marketingkrav; bekræft kilde/dato).

**Allerede landet i UI ( overnight):** KID RIY på omkostninger; «andet»-vægt synket fra portfolio.json; to-klasser-beholdningsforklaring; «Mangler fra NDI»-boks.

### Åbent spørgsmål (lane-C, 16/10 ~02:30): prospektet og AKK-klassen
Fællesprospektet (opdateret 24.10.2025) nævner under NewDeal Invest KL kun andelsklassen «kl n» (PMINDI) og skriver «Afdelingen er udloddende». PMINDIAKK har eget KID. Christian/Fundmarket: findes der et nyere prospekt eller tillæg, der omfatter AKK-klassen? Indtil da siger `risici.html#prospekt` kun «afdelingen» og market maker-linjen kun «PMINDI». Prospektet skriver også «fokuseret portefølje», mens sitet beskriver flere hundrede små positioner. Det bør NDI selv afstemme. Jeg har ikke ændret noget af den grund.

### 02:41 CEST lane-C · ideer foldet på mobil
- Demo: åbn `ideer.html` på telefon (375). 4 billeder står åbne, derefter «Fold alle ud» + 11 foldede overskrifter. Tryk «Tre drivkræfter, ét overlap» i indholdsfortegnelsen → sektionen folder ud. På desktop er alt åbent som før.
- Risici: "Sharpe" er ikke længere underlabel (kun i ordlisten). Invester-kilde: "andelsklasse PMINDI" i stedet for "kl n".

### 02:43 CEST lane-C · fagord ud af overskrifterne
- Lær-døren hedder nu «Årligt afkast og gennemsnit» (før «CAGR og gennemsnit»). Siden hedder «Hvorfor det årlige afkast er lavere end gennemsnittet». CAGR står kun i parentes og i ordlisten. Skyderen viser «Afkast pr. år» og «Tommelfingerregel» uden σ²/2 i etiketten.
- «max drawdown» er væk fra *Sådan læser du grafen*. Sidekortet siger ikke længere «underwater-graf».
- Ordliste 140 → 142: «Årlig omkostningsmæssig konsekvens (KID)» (`#g-riy`, 2,79/2,63 % og 2,85/2,71 %, «ikke et ÅOP») og «Øjebliksbillede (snapshot)» (`#g-snapshot`). Gruppetal: 31 · 35 · 41 · 35.
- Til Codex (js, ikke lane-C): `app.js` linker stadig med teksten «CAGR og gennemsnit». Målet er det samme, så intet er brudt.

### 02:58 CEST lane-C · «Hvem står bag tallet?»
- Demo: `ideer.html#h-kd` folder ud. Fire stempler, fra det mest faste til det mest foreløbige. Sig: «Hvert tal kunne bære et lille stempel, så man kan se, hvor sikkert det er.» (IDESPEJDER #20, konfidensmærke.) Ingen tal pr. aktie, kun links til ordlisten.

### 02:55 CEST lane-C · lær «Fra chip til datacenter»
- Ny side `docs/laer/tidslinje.html` (12 milepæle, filter pr. dæmning). Demo: Lær → Tankegangen → «Fra chip til datacenter», klik «Energi». Årstallene skal tjekkes af NDI før live (se VIDENSBOT-live-check).


## Åbent: Modenhed / livscyklus (Vidensbot 03:00 · Leo)

- UI skal sige **forslag**, aldrig «klassificeret», indtil NDI har godkendt.
- **Mads’ input på modenhed** mangler stadig: hvem sætter præ-revenue → value, og er heuristikken fra offentlig industri OK som midlertidigt forslag?
- Codex/Christian: aftal proces med Mads før modenhedsfiltre præsenteres som andet end forslag.


## Åbne spørgsmål til Christian / Mads (FO 05:00 · 2026-10-16)

- **AUM** (formue under forvaltning): ikke udfyldt fra Fundmarket-snapshot — indsæt officiel AUM når NDI leverer.
- **Revisor**: `fund-facts.auditor.name` står stadig «udfyldes af NDI». Bekræft navn fra fællesprospekt.
- **Benchmarkbeslutning**: UI siger eksplicit «intet fast benchmark; vi viser derfor ingen sammenligningskurve». Bekræft at det forbliver policy (ingen Nasdaq/peer-kurve) før demo.
- **Modenhed (maturity)**: alle 345 er `maturityStatus: forslag`. Mads skal gennemgå / godkende før det præsenteres som andet end forslag.
- **Kontantandel**: UI viser ca. 8,1 % (100 − aktievægte) fra forsinket PMINDI-snapshot pr. 1. jun. 2026. Fundmarket kan vise anden kontantandel på en anden dato — bekræft om vi skal hente officiel cash % fra Fundmarket.
- **AKK startdato**: ensrettet til Fundmarket «Startdato» **05-12-2025** (fund-facts + fund-meta + første NAV). Tidligere fund-meta 02-12-2025 er rettet.
- **Dækning 91,01 % vs 96,59 %**: UI bruger 91,01 % (antal positioner uden theme=andet). fund-meta.classificationCoverage 96,59 % er ældre vægt-felt — ikke vist. Bekræft om Mads vil have vægt-baseret dækning i stedet.

