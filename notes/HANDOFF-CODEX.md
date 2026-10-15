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
1. **Entré** — døre + **Teknologiske værdikæder**. Sig: "stedet man researcher tech-aktier".
2. **Værdikæder (vaerdikaeder.html)** — flodsystem (5 dæmninger), skift AI→robotik→energi→**rum**→quantum. Fold et led (Til siden + NDI-blik). Treemap/sunburst. Musk-citat kun med kilde.
3. **Fonden** — totalafkast, **max drawdown** i nøgletal (~−35,8 %), graf top/bund-markering, kalender, 100k + Fundmarket-note, AKK-gate.
4. **Drawdown** — middel/median episoder + underwater.
5. **Portefølje / Udforsk** — Tesla multi-tag, SoftBank, forslag-badges.
6. **Temaer** — Quantum-forslag, SpaceTech, Andet krympet.
7. **Idéer (ideer.html)** — ti forskellige former under hinanden (nyeste 16/10 ~01:10: *Tre ure på samme side*, tidslinje 2024–2027 med fire spor: PMINDI afkast fra 22. sep 2023, PMINDIAKK kun NAV fra 5. dec 2025 med prikket streg ved 12 måneder, beholdning pr. 1. jun 2026 med skraveret forsinkelse frem til seneste NAV 14. okt 2026, risikoklasse fra KID 14. aug 2026. Sig: "hver slags tal har sin egen dato, og forsinkelsen er med vilje"): flodsystem-SVG (5 dæmninger, de 3 nummererede i gult, citat 30. marts 2026), *Én kasse eller flere tags* (Tesla: GICS «Forbrugsgoder» vs tags fysisk tech + energi og en forgrening til de fire led, Tesla står i: AI-compute · Datacentre og køling / Fysisk AI, Robotik · Komponenter / Robotter — tjekket mod value-chains.json), *Samme 345 selskaber, to sorteringer* (varmekort som rigtig tabel: 11 NDI-temaer × 8 klassiske sektorer, antal selskaber; teknologi 151 → seks temaer, Platforme samler finans/forbrug/kommunikation, SpaceTech og fysisk tech næsten alle under industri; sektor = `sector`-feltet i portfolio.json, ikke kaldt GICS; vandret rul på smal skærm), *Vægt er ikke kurs* (to mini-linjer), *Fra «Andet» til tema* (proportionsbjælke 67 · 48 · 230 af 345 aktier, tre trin Andet → Forslag → Tema med antal og vægt ca. 11,6 / 13,6 / 66,8 %, og de 48 forslag fordelt på temaer — alle 4 Quantum er forslag; tal fra portfolio.json PMINDI pr. 1. jun 2026), *345 aktier, én prik hver* (enhedsdiagram: én firkant pr. selskab, grupperet pr. tema med antal og vægt, Andet i grå; under det antal selskaber pr. vægtinterval med ligevægten ca. 0,27 % markeret; nøgletal median ca. 0,2 %, top 10 ca. 11,9 %, største ca. 2,1 % — ingen navne), *Fald fra top som episoder* (tænkt kurve øverst, tre røde episoder under nul-linjen −16/−24/−8 %, gul klamme for varighed; tre nøgleord dybde/varighed/hyppighed; tydeligt «tænkt eksempel, ikke fondens tal» + link til drawdown.html), *Bygget som et hus* (plantegning: entré med de tre døre øverst, rum = links til Fonden/Porteføljen/Udforsk/Værdikæder/Temaer/Lær/Risici), tre citatkort fra ugebreve med dato. På mobil (<660 px) vises floden lodret. Sig: "samme pointer som værdikæder, men på 30 sekunder — og husets plantegning er vejvisningen til dem, der kun giver det et minut".
8. **Risici / Om data** — risici.html viser SRI-skala 1–7 (klasse 5 markeret) for begge klasser, seks risikokort i NDI-sprog (bl.a. «flaskehalse kan flytte sig») og en fast «Sådan bruges NDI Analytics»-boks. Ordlisten er nu 101 begreber i 4 grupper (gruppe-tællerne passer: 24 · 18 · 32 · 27; nye ~01:35: vækst- og sektorrisiko, ingen markedsbeskyttelse, boble, anbefalet investeringsperiode — KID-risikolisten på risici.html linker nu hvert punkt til ordlisten; nye ~01:10: omsætning, indtjening (bruges på livscyklus og P/E uden forklaring); nye ~01:15: median, markedsrisiko, selskabsspecifik risiko, PRIIPs; nye ~01:20: depot, platforme (tema), software (tema), energiressourcer (tema), så de tre største temaer og ordet fra invester.html har en forklaring; ~01:00: rebalancering, hold øje med, kundekoncentration, kapitalbehov, indre værdi, qubit og fejlretning, neocloud, wafer, eksportregler — så NDI-linsens felter og Quantum-temaet har en forklaring; før det: cloud og AI-modeller, robotik, energilagring og batterier; tidligere: fastkurspolitik, koncentrationsrisiko, kurtage og spread, halvleder, GPU/XPU/CPU, hukommelse (HBM), datacenter og køling, elnet og transformere, kritiske råstoffer) (Afkast og risiko · Fonden · Portefølje/temaer/modenhed · Værdikæder og flodsystemet) med spring-links. Vis *Dæmning / flaskehals* og *Vægt* («linjen er vægt, ikke kurs»). På mobil er de 4 grupper foldet sammen (ordlisten ~1.500 px i stedet for ~8.500); dybe links som `om-data.html#g-vaegt` åbner den rigtige gruppe. *Sådan investerer du* har «Tre spørgsmål før du investerer» + ISIN/KID for begge klasser; *NDI-perspektiv* har forklaring af linsens 5 felter (nu med links til ordlisten for kundekoncentration, kapitalbehov, eksportregler og indre værdi) og kan læses på mobil (kort-layout). FAQ (lær/faq) viser som standard kun de 16 korte svar + «Prøv»-chips (nye 00:30: *Hvad er flodsystemet?*, *Er det ikke meget teknologi i én fond?*, *Hvad koster det at købe andele?*, *Hvorfor står Tesla ikke bare som bilselskab?*; P/E-, invester- og tema-svaret er skrevet om, så de ikke er stikord); skriv «dæmning», så skifter visningen til alle typer (svar, artikler, ordliste).
9. **Lær: hub + Sådan tænker vi / Livscyklus / P/E** (valgfrit, 1 min) — Start på `laer/index.html`: øverst «Ny her? Start med de tre» (nummereret læsesti 1→2→3, ca. 9 min, lodret på mobil), derunder de 15 døre i fire grupper (4 · 4 · 4 · 3, siden 16/10 ~01:30: P/E flyttet til «Afkast og udsving», Risici til «Fonden i praksis») (Tankegangen · Afkast og udsving · Fonden i praksis · Slå op), hver dør med form og læsetid (fx «Skyder · ≈ 3 min»). Sig: "man kan se på døren, om der er noget at trække i". *Sådan tænker vi* starter med de tre udgangspunkter som kæde (kan ikke forudsige → kan ikke beregne → derfor udsving), så de fem principper hver med «Derfor:» og et link videre, og en boks «Bogen og fonden er to forskellige ting» (privatråd ≠ fondens forvaltning). *Livscyklus* har en kurve (omsætning + overskudsgrad) med sidens 5 modenhedsgrupper under; lodret på mobil. *P/E* har «Samme selskab, to valg»: A investerer 30 → P/E 100, B investerer ikke → P/E 25. Sig: "P/E straffer investeringen — derfor viser vi fase og eksponering først". Alle tal er opdigtede og står som sådan. *Valuta* (ny): «+10 % i dollar × −5 % dollar = +4,5 % i kroner» som regnestykke-kort, to skydere, og søjler for ISIN-landekode fra snapshottet (USA 253 af 345 = 67,6 % af fonden). Sig: "afkastet i kroner er to bevægelser — vi viser summen, vi gætter ikke på dollaren". *Rebalancering* (ny, 16/10): skyder «Selskab A stiger X %» med ti søjler (ti selskaber à 10 %), ved +300 % fylder A 30,8 %; flow «fylder mere end tiltænkt → fylder mindre», fondens tre tal (345 positioner, største 2,1 %, 5 over 1 %, pr. 1. jun 2026) og «Bogen og fonden siger ikke det samme. Med vilje». Sig: "rebalancering er en regel om vægte, ikke et gæt på kurser". FAQ har nyt svar «Hvorfor sælger fonden noget, der er steget?». *Risikoklasse 5* (ny, 16/10 ~01:30): kæde udsving → markedsrisiko → kreditrisiko → risikoindikator, skyder «udsving pr. år» der viser klassen på skalaen 1–7 (25 % → klasse 5, 40 % → klasse 6), tabel med de syv PRIIPs-intervaller (klasse 5 = 20–30 %, klasse 6 = 30–80 %) og «Hvad klassen ikke siger». Sig: "klasse 5 er et mål for udsving, ikke en garanti". Linket fra risici.html under hver klasse, ordlisten (SRI + udsving), FAQ og kort.

Sidekort (kort.html) er nu grupperet i 6 sektioner med alle lær-sider — brug den som «hvor er alt» hvis nogen spørger.

Åbne spørgsmål: market cap/produkt/modenhed (ingen data), forslag-gennemgang, privat repo vs Pages, Fundmarket på ÅTD/100k.

## 2026-10-15/16 overnight (Grok) — værdikæder
- Primær side: `docs/vaerdikaeder.html` + `docs/data/value-chains.json` (Vidensbot-indhold).
- Kæder: ai-compute (13), physical, energy, **space**, quantum. Fintech = tema, ikke kæde.
- Compliance: ingen handelsprog; Musk-citat kun med kilde; holdings asOf 2026-06-01.
- Klassisk `vaerdikaede.html` bevares som enkel AI-kæde.
- Visual variety: treemap/sunburst, timeline, flaskehalse, chapter-nav.
- Drawdown: middel/median + maxDD-fix (~−35,8 % PMINDI).
- Åbne MADS uden data: market cap, produktkategori, modenhed.
