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
| 6 | `ideer.html` | Rul gennem de fjorten former, stop ved «Tre ure på samme side». Spørger nogen til temaer: «Lag på lag» (`#h-stk`). Spørger nogen til spredning: «Hvor mange selskaber er halvdelen?» (`#h-kv`, 76 af 345) | «Hver slags tal har sin egen dato, og forsinkelsen er med vilje.» / «Hvert lag bygger på laget under.» / «Bred, men ikke flad.» | 1:00 |
| 7 | `risici.html` → `om-data.html` | Klasse 5 af 7, «Udsving og fald i tal» (`#tal`), KID-risici som links → ordlisten (124 begreber, 4 grupper) | «Hvert fagord kan slås op.» | 0:45 |
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
6. **Idéer** (`ideer.html`), fjorten former i denne rækkefølge: Flodsystemet på ét billede (`#h-flod`) · Én kasse eller flere temaer (Tesla, `#h-vs`) · Samme 345 selskaber, to sorteringer (varmekort 11 temaer × 8 sektorer, teknologi 151 → seks temaer, `#h-mx`) · Vægt er ikke kurs (`#h-wk`) · Fra «Andet» til tema (31 · 85 · 229, ca. 6,3 / 19,7 / 66,0 %; flest forslag i Energi, 28; alle 4 i Quantum er forslag, `#h-tf`) · 345 aktier, én prik hver (median ca. 0,2 %, top 10 ca. 11,9 %, største ca. 2,1 %, `#h-pr`) · Hvor mange selskaber er halvdelen? (26 / 76 / 160 = ¼ / ½ / ¾, ligevægt 173, `#h-kv`) · Fald fra top som episoder (tænkt kurve, `#h-uw`) · Tre ure på samme side (`#h-ur`) · Hvad står der i tallet? (`#h-lag`) · To klasser, samme temaer (største forskel 1,6 pp, Platforme, `#h-kl`) · Lag på lag (`#h-stk`) · Bygget som et hus (`#h-hus`) · Tre sætninger, siden bygger på (`#h-q`). Alle temaantal og -vægte på siden er regnet om fra portfolio.json efter main-merge 16/10. Sig: «samme pointer som værdikæderne, men på 30 sekunder».
7. **Risici** (`risici.html`). SRI 1–7 (klasse 5) for begge klasser, KID-risici som links til ordlisten, **«Udsving og fald i tal»** (`#tal`: udsving pr. år ca. 32,5 %, afkast pr. udsving 0,89, største fald −35,8 %, regnet af NDI Analytics, ikke KID) med svar på «hvorfor passer det ikke med klasse 5?», **«Hvor langt er sorteringen i temaer?»** (`#sortering`, tæller direkte fra portfolio.json), seks risikokort i NDI-sprog, fast «Sådan bruges NDI Analytics». Spørger nogen til Sharpe: ordlisten `#g-sharpe`.
8. **Ordliste** (`om-data.html`). 124 begreber i 4 grupper (28 · 22 · 39 · 35), foldet sammen på mobil, dybe links `#g-…` åbner den rigtige gruppe. Alle elleve temaer og alle led i value-chains.json har en post.
9. **Lær** (`laer/index.html`). «Ny her? Start med de tre» (Sådan tænker vi → Hvorfor så mange aktier? → CAGR og gennemsnit), så 17 døre i fire grupper (4 · 5 · 4 · 4): Tankegangen · Afkast og udsving · Fonden i praksis · Slå op. *Sådan tænker vi* har nu møntspillet (100 → 150 → 90 kr.) under «Vi vælger udviklingen, ikke vinderen» og «Hvorfor ejer vi den?» (NDI-linsens fem spørgsmål med Tesla som eksempel). Bedste skydere at vise: *Risikoklasse* (25 % → klasse 5, 40 % → klasse 6), *Indre værdi* (tre skydere), *Sådan læser du grafen* (flyt startdagen: +62 / +17 / +69 % på samme kurve), *Rebalancering* (+300 % → 30,8 %), *Valuta* (+10 % × −5 % = +4,5 %). FAQ: 18 korte svar + «Prøv»-chips; skriv «dæmning», så skifter visningen til alle typer.
10. **Sidekort** (`kort.html`). «Hvor er alt».
11. **NDI-perspektiv** (`ndi-perspektiv.html`), kun hvis nogen spørger til «Hvorfor ejer I den?». Siden er nu foldet sammen i 12 temagrupper (Chips 54 · Software 46 · Platforme 38 · Energi 38 · Energiressourcer 29 · Fysisk tech 26 · SpaceTech 21 · Optik & netværk 19 · Compute 18 · Connect 10 · Quantum 5 · Andet 6 = 310 selskaber med linse) med søgefelt og temachips. Synlig tekst er ca. 2.500 tegn i stedet for ca. 192.000. Skriv «kobber» i søgefeltet (7 selskaber), eller åbn Quantum: alle 5 er forslag. Livscyklus er udeladt pr. selskab (NDI har ikke sat den for nogen) og står én gang i forklaringen. KID-links til begge klasser står nederst.

Tal at have klar: første NAV PMINDI 22. sep 2023, PMINDIAKK 5. dec 2025, beholdning pr. 1. jun 2026, KID pr. 14. aug 2026. Alle tænkte eksempler på lær-siderne står som tænkte.

Åbne spørgsmål: market cap/produkt/modenhed (alle 345 modenheder er forslag), gennemgang af 85 temaforslag, privat repo vs Pages, Fundmarket på ÅTD/100k, officielle tal for udsving/Sharpe.
