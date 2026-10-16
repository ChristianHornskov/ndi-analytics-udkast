# Mads-checklist (Slack + møde + filosofi)

Én ting pr. cyklus. Markér `[x]` når shipped i udkastet. `[~]` delvist. `[ ]` åben.
Kilder: slack_ny_graf_2026-10-15.md, vision.txt, mads_tankemodel.md, investeringsfilosofi_bog.md.

## Vision / produkt
- [x] Stedet man researcher tech-aktier i DK (entré + udforsk + lær) — Level 1
- [x] Dedikeret underside / hus med knapper (ikke kun forside-graf)
- [x] Embed-graf + fuld analytics-side
- [~] App på sigt — stub i IDEAS
- [x] SoftBank som demo-selskabsside
- [x] "Sådan investerer du" / kopiér ISIN
- [x] To andelsklasser valg (PMINDI / AKK)

## Performance
- [x] Totalafkast-graf siden start
- [x] Afkastkalender (maks 3 år teaser + fuld historik ét klik)
- [x] Drawdown / største fald (fondniveau)
- [x] 100.000 kr.-eksempel (med advarsel + Fundmarket-note)
- [x] Ingen Nasdaq i udkast (Leo) — Mads bad oprindeligt om vs Nasdaq til video
- [x] Drawdown middel/median som tal (episoder peak→bund) + underwater SVG
- [x] Ingen daglige dispositioner / "det skete i går"

## Klassifikation (Mads 14/10 + møde)
- [x] Tema-tags (ikke GICS som hoved) + multi-tag
- [~] Modenhedsgrader (UI klar, data tom — manuel klassifikation mangler). Lane-B c4: UI ærlig + datadrevet - filter/chips/entré-tekst/selskab-kort vises kun ud fra `portfolio.json` `maturity`; stale `?mat=` normaliseres væk
- [ ] Market cap-lag — blokeret natten over (ingen mcap i portfolio.json; kræver kilde)
- [ ] Produktkategori-lag — blokeret natten over (ingen produktkatalog-data)
- [~] Tema: reindustrialisering USA — dækket pædagogisk via physical/energy/rum (ingen separat tag; legacy deferred)
- [x] Energiforsyning / -transmission / -ressourcer (temaer energy + energy-resources)
- [x] Optiske connects (tema connect)
- [x] SpaceTech (tema space)
- [x] Quantum-tag — 5 selskaber (forslag; Infleqtion tilføjet i lane-B c11 fra Software); Quantumscape uændret (batteri)
- [ ] Legacy-mistænkt / Trump-tags — deferred (UX skjult)
- [ ] Sortering: 52u-drawdown, optrend, vol, insider — deferred (compliance på per-aktie)
- [x] Temaforslag runde 2 (lane-B c9): 32 Andet-navne med klar kædeplads → foreslået tema (sol/brint/batterier → Energi, satellit → SpaceTech, maskiner/autonom kørsel → Fysisk tech, TSMC → Chips, Lumen → Optik, kernebrændsel/batterigenanvendelse → Energiressourcer); PMINDI Andet 67 → 35; selskab.html viser forslag-mærke + 'før'
- [x] Tema-hub polish (lane-B c2): korrekt forslag-banner (fra Andet vs. omtagget Compute→Quantum via `themeFrom`), fund-switch, Andet sidst, små temaer (Quantum/SpaceTech) fremhævet m. egen kæde, kæde-link pr. tema
- [x] Compliance-sikker sortering (lane-B): whitelist navn/vægt/tema i screener + A-Z; temastatus-filter (forslag/uden); tomme tilstande med hjælp
- [x] NDI-linse (unique-metrics) for kernenavne (lane-B c3+c5+c6+c7+c8+c10+c11): c11 → 310 (+41: resten af Software/Optik/Platforme - fintech/kryptobeholdninger ærligt som 'Uden for AI-kæden', robotaxi/ADAS i Robotik-kæden, kemi-forslag markeret usikre; 6 udeladt pga. usikker viden: GHL, Sharonai, Swarmer, Keel, Farfetch, DeFi-serie) + temaforslag runde 3 (Infleqtion → Quantum, ASP Isotopes + Neo → Energiressourcer); c10 → 269 (+52: alle resterende i Energi (18 temaforslag: sol, brint, batterier, SMR), Chips, Compute, Fysisk tech, Energiressourcer (kobber/lithium/wolfram/magneter), SpaceTech → 100 % linse-dækning i de 7 hardware-/energitemaer); c8 → 217 (+67: TSMC, chipudstyr AMAT/Lam/KLA/TEL/ASM, EDA Synopsys/Cadence, analog/effekt, sikkerhedssoftware, datacenter-omstillere, sol/lagring i Andet, rum, platforme); c7 → 150 (+49 kerne-AI: ASML, Micron/hukommelse/lagring, servere, netværk, optik, SMR/el, rum, platforme) + "Andre med NDI-linse i samme led" på selskab.html; c6 → 101 (+33 i tynde temaer: SpaceTech 1→6, Fysisk tech, Chips, Energiressourcer, Optik); linse på tema-sider (dæknings-kort, badge, 'hvad ejer man?'-kolonne, filter `linse=1`) og pr. tema-kort på temaer.html. c5 → 68 selskaber (+33, Arm opgraderet), linse-badge + filter "Kun med NDI-linse" i screeneren. c3: 35 selskaber med 5 kvalitative felter (tag, hvad ejer man, plads i 13-led-kæden, hold øje med, livscyklus = ikke klassificeret); A-Z-filter "Kun med NDI-linse"
- [x] Ingen P/E i v1 (skjult); P/S skjult
- [x] "Hvilket problem løser det?" på selskab
- [x] Teslas multi-rolle (energi+fysisk) — multi-tag + pædagogisk callout på vaerdikaeder

## Værdikæde & tech-udvikling (HØJ PRIORITET Christian 22:55)
- [x] Interaktiv AI-udbygning (multi-kæde hub vaerdikaeder.html) + klassisk vaerdikaede.html
- [x] Robotics / physical tech-kæde (chain physical)
- [x] Energi-kæde (chain energy)
- [x] Tidslinje over teknologiske skift
- [x] Hvorfor NDI sidder hvor den gør (callout + filosofi-kapitel; led-blurbs)
- [x] SVG-treemap + sunburst tema-eksponering; visual-variety pass + Grok review
- [x] Rumkæde-pædagogik: rum-ordbog (10 ord) + logaritmisk højdeskala (ISS → Månen) på rum-fanen (lane-A)
- [x] Broer mellem kæder (fælles selskaber, beregnet), robotik-faser (BLOG 7. okt 2024) og faglige broer for kvante (lane-A)
- [x] vaerdikaede.html: indgangskort til de fire andre kæder (lane-A)
- [x] Rum: "Hvorfor er det blevet billigere at komme op?" (før/nu + årsagskæde, baggrund; kun NDI-tallet 90 % med kilde) og robot-ordbog med 9 ord (lane-A)
- [x] Energi-fane: "Fra råstof til regnekraft" (strømmens vej med NDI-mærker for pres og kilde pr. mærke) + energi-ordbog 13 ord; kvante: tidshorisont som gengivet NVIDIA-udsagn med kilde; vaerdikaede.html: én forklaring pr. kæde (lane-A)
- [x] AI-fane: flodkort over de 13 led i Mads' rækkefølge med NDI-pres-mærke og kilde pr. led (dæmning, begyndende, del af halvlederne, ingen tydelig flaskehals, efterspørgsel); samme mærker på vaerdikaede.html (lane-A)
- [x] Rum: "Følg én satellit fra fabrik til tjeneste" (6 trin med SVG-scene, trinknapper og tastatur; antal og eksempelnavne pr. led pr. 1. juni 2026; baggrund) + AI-flodkort: sidespor til kvante; robotik-komponenter uden ordet eksponering (lane-A)
- [x] Energi-strømvej: "Det ændrer sig" pr. station (4 med NDI-kilde, elnet mærket baggrund); kvante-ordbog med 10 ord (baggrund) + deep-link `?kaede=quantum#q-gl` (lane-A)
- [x] Rum: "Hvordan tjener rumkæden penge?" (én gang / løbende / endnu tidligt, med antal pr. led og NDI-linjen om Starlink som løbende tjeneste; baggrund) + vaerdikaede.html: ordbogs-link pr. kæde (lane-A)
- [x] Rum: "Hvad kan gå galt?" (6 usikkerheder med kæde-strimmel over ramte led; 2 NDI-linjer med kilde, resten baggrund) + læse-rute "Rum i syv stop"; kvante-horisont med hop til AI-floden (lane-A)
- [x] Energi: "Hvad kan gå galt i energikæden?" (6 usikkerheder med strømvej-strimmel; 4 NDI-linjer med kilde, resten baggrund) + energi-ledkort uden aktiesprog, råstoffer inkl. gas og uran; vaerdikaede.html: usikkerheds-link pr. kæde (lane-A)
- [x] Rum: "Hvem arbejder hvor højt?" (5 højdebånd fra jorden til Månen med led og antal pr. 1. juni 2026, fremhæver båndet på højdeskalaen; baggrund) + "Tjek dig selv" med 5 spørgsmål og link til forklaringen; læse-rute nu 8 stop; vaerdikaede.html: link til spørgsmålene (lane-A)
- [x] Energi: "Tjek dig selv" med 5 spørgsmål (første flaskehals, elnet, lagring, råstoffer og geopolitik, SMR); 3 med NDI-kilde, resten baggrund; svar-link åbner leddet; quiz-koden er fælles for rum og energi; vaerdikaede.html: quiz-link på energikortet (lane-A)
- [x] Kvante: "Hvorfor skal en kvantechip være så kold?" (termometer på logaritmisk skala fra stuetemperatur til kryostat ca. 0,01 K, årsagskæde med ordbogs-link, bro til energi via elnet; baggrund) + "Tjek dig selv" med 4 spørgsmål (NVIDIA-udsagnet som hans, ikke NDI's); vaerdikaede.html: quiz-link på kvantekortet; adressen følger hop og afsnit (lane-A)
- [x] Robotik: "Sanse, tænke, handle" (cirkulær løkke i 4 trin, hvert trin åbner sit led, "Tænke" hopper til fysisk AI; baggrund) + "Hvad kan gå galt i robotkæden?" (6 usikkerheder, 2 NDI-linjer med kilde) + "Tjek dig selv" med 4 spørgsmål + genveje øverst i fanen; korte navne på robotled; vaerdikaede.html: usikkerheds- og quiz-link på robotkortet (lane-A)
- [x] AI-flod: "Hvad kan gå galt i AI-floden?" (6 usikkerheder med en mini-flod over alle 13 led i Mads' rækkefølge; 5 NDI-linjer med kilde, resten baggrund) + "Tjek dig selv" med 5 spørgsmål, alle med NDI-kilde + AI-ordbog med 12 ord + genveje øverst i flodkortet; vaerdikaede.html: links til usikkerheder, spørgsmål og ordbog (lane-A)
- [x] Energi: "Hvor i strømvejen" på hvert ledkort (5 trin fra råstof til datacenter, leddet fremhævet, hop til AI-floden; baggrund) + led i strømmens rækkefølge + genveje i energi-fanen (lane-A)
- [x] Rum: "Rummet og de andre kæder" (trådediagram med 7 tråde fra 5 rum-led til led i AI, energi, robotik og kvante; hop til leddet, Musk-udsagnet kun via citatet med kilde; resten baggrund) + 6. quizspørgsmål + læse-rute "Rum i ni stop"; vaerdikaede.html: trådelink på rumkortet (lane-A)

## Formidling / filosofi
- [x] Variance drag / CAGR ≠ gennemsnit (lær)
- [x] Hvorfor mange aktier / spredning
- [x] Udvikling frem for vinder (lær/saadan-taenker-vi)
- [x] P/E forklarer ikke tech (lær)
- [x] Fysiske flaskehalse / knaphed som scroll-telling (kap-flaskehalse på vaerdikaeder)

## Cyklus-log
| Tid | Item | Commit |
|---|---|---|
| 22:56 | Byg: multi-kæde + timeline + treemap + filosofi-callouts | (denne) |
| 22:58 | Visual-variety pass + Grok review; ship vaerdikaeder.html | (denne) |
| 23:00 | Drawdown middel/median + underwater + episode bars | (denne) |
| 23:02 | SVG treemap + sunburst toggle på vaerdikaeder | (denne) |
| 23:05 | Quantum-tag (forslag) + flaskehalse scroll-telling | (denne) |
| 23:08 | Tesla multi-rolle callout + temaer→treemap CTA | (denne) |
| 23:10 | unique-metrics: +quantum×4 +Arm; href→vaerdikaeder | (denne) |
| 23:07 | Vidensbot flodsystem → vaerdikaeder (5 kæder inkl. space) + lær | (denne) |
| lane-B c1 | Screener: sort-whitelist, tema-sort, forslag-filter, A-Z-side | lane-B |
| lane-B c2 | Temaer-hub: korrekt forslag-banner (themeFrom), fund-switch, små temaer, kæde-links | lane-B |
| lane-B c3 | NDI-linse: +21 kernenavne, 5 tynde opgraderet, forældede led-numre rettet; A-Z linse-badge/filter; korrekte link-labels | lane-B |
| lane-B c4 | Modenhed-UI ærlig: datadrevet filter, stale mat= fjernes, entré-copy, Modenhed-kort på selskab | lane-B |
| lane-B c5 | NDI-linse 35 → 68 (+33 kvalitativt, Arm opgraderet); screener: linse-badge, filter `linse=1`, chip, tom tilstand; selskab `#ndi-linse`-anker | lane-B |
| lane-B c6 | NDI-linse 68 → 101 (+33 i tynde temaer, ærlige tag-noter); tema.html: linse-dækning, badge, 'Rolle / hvad ejer man?', filter `linse=1`; temaer.html: linse-antal pr. tema | lane-B |
| lane-B c7 | NDI-linse 101 → 150 (+49 kerne-AI-stak m.fl.); selskab.html: 'Andre med NDI-linse i samme led' (nabolag ud fra linsens placering) | lane-B |
| lane-B c8 | NDI-linse 150 → 217 (+67: foundry/udstyr/EDA/analog/sikkerhed/datacentre/sol/rum/platforme; ærlige tag-noter) | lane-B |
| lane-B c9 | Temaforslag runde 2: 32 Andet → tema ud fra kædeplads (themeFrom/forslag), themes.json genberegnet, linse-tags opdateret; selskab.html forslag-mærke | lane-B |
| lane-B c10 | NDI-linse 217 → 269 (+52): fuld dækning i Energi/Chips/Compute/Fysisk/Energiressourcer/SpaceTech/Quantum; ærlige tag-noter | lane-B |
| lane-B c11 | NDI-linse 269 → 310 (+41 Software/Optik/Platforme); temaforslag runde 3 (Infleqtion → Quantum; ASP Isotopes, Neo → Energiressourcer); themes.json genberegnet | lane-B |
