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
- [~] Modenhedsgrader (UI klar, data tom — manuel klassifikation mangler). Lane-B c4: UI ærlig + datadrevet - filter/chips/entré-tekst/selskab-kort vises kun ud fra `portfolio.json` `maturity`; stale `?mat=` normaliseres væk; c19: main har nu maskinelle modenhedsforslag (maturityStatus=forslag, GICS-heuristik) for alle 345 - selskab.html sagde fejlagtigt "Manuel klassifikation" og "High growth" i NDI-linsen; nu almindeligt dansk (Før omsætning/Før overskud/Høj vækst/Vækst med overskud/Moden) + "(forslag)" + "Maskinelt forslag … afventer NDI-gennemgang"; screener-filter siger "345 af 345 placeret - alle som forslag" (manuel kun når data siger det)
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
- [x] Tema-hub polish (lane-B c2): korrekt forslag-banner (fra Andet vs. omtagget Compute→Quantum via `themeFrom`), fund-switch, Andet sidst, små temaer (Quantum/SpaceTech) fremhævet m. egen kæde, kæde-link pr. tema; c13: tema.html har søgning (fælles `searchPosition`), sortering navn/vægt, temastatus-filter, kombinerede tomme tilstande og screener-link der bevarer q/linse/status/sort; 'X primært + Y via multi-tag'; hub-kort nævner multi-tags (tallene stemmer nu med temasiden), små temaer viser navne (efter vægt) + linse-dækning, banner grupperer omtag pr. måltema og forklarer at runde 2/3 bygger på kædeplads
- [x] Compliance-sikker sortering (lane-B): whitelist navn/vægt/tema i screener + A-Z; temastatus-filter (forslag/uden); tomme tilstande med hjælp; c12: fælles søgning (data.js `searchPosition`) i screener + A-Z dækker alle tema-tags (inkl. multi-tag) og NDI-linsens tekst med "Match i NDI-linsen · felt: uddrag"; tema-sortering med gruppe-overskrifter + antal i screeneren; A-Z forstår `status=` og linker frem/tilbage med samme q/linse/status/sort; c15: gennemgang af temaforslag - `skift=<fra>~<til>`-filter (fx Andet → Energi 28, Compute → Quantum 4, 'Stadig Andet' 35) i screener + A-Z, synlig 'før: X'-linje på forslag-rækker (screener/A-Z/tema), tema-sidens 'Før forslaget'-tal linker til skiftet i screeneren, CSV med Temastatus/Før-kolonner; c18: mobil (≤560 px) - tema-kolonnen skjules og tema/forslag/usikkert/før står som kompakt linje under navnet; sortér-knaprække Navn/Vægt/Tema (kun whitelist) erstatter kolonneknappen; A-Z: ISIN + tema under navnet (375 px: screener 460 → 345, A-Z 573 → 345, ingen vandret rulning); c16: NDI-beslutningsliste - 18 usikre forslag (`themeDoubt`/`themeAlt` i portfolio.json: gas → Energi?, elnet → Energi?, forsikring/solana/kemi → bliv i Andet?) med filter `tvivl=1` i screener + A-Z, 'usikkert'-mærke + begrundelse/alternativ på rækker, tema-sider, selskabsside og hub-banner; CSV-kolonner; Albemarle rettet til Energiressourcer (runde 4); linse-NDI-tag siger nu 'forslag' for alle 41 forslag
- [x] NDI-linse (unique-metrics) for kernenavne (lane-B c18: "Ghl" identificeret som Grab Holdings via ISIN/ticker → linse 333 + temaforslag runde 5 Software → Platforme; c3+c5+c6+c7+c8+c10+c11+c14): c14 → 332 (+22 Andet-navne med vægt: guld/sølv, sundhed/biotek, forbrug/ejendomme/kemi, Fermi; ærligt 'Uden for værdikæderne' eller 'tæt på et led'; tema.html?slug=andet har nu panelet 'Hvad ligger i Andet?' med grupper + kandidater til NDI-gennemgang); c11 → 310 (+41: resten af Software/Optik/Platforme - fintech/kryptobeholdninger ærligt som 'Uden for AI-kæden', robotaxi/ADAS i Robotik-kæden, kemi-forslag markeret usikre; 6 udeladt pga. usikker viden: GHL, Sharonai, Swarmer, Keel, Farfetch, DeFi-serie) + temaforslag runde 3 (Infleqtion → Quantum, ASP Isotopes + Neo → Energiressourcer); c10 → 269 (+52: alle resterende i Energi (18 temaforslag: sol, brint, batterier, SMR), Chips, Compute, Fysisk tech, Energiressourcer (kobber/lithium/wolfram/magneter), SpaceTech → 100 % linse-dækning i de 7 hardware-/energitemaer); c8 → 217 (+67: TSMC, chipudstyr AMAT/Lam/KLA/TEL/ASM, EDA Synopsys/Cadence, analog/effekt, sikkerhedssoftware, datacenter-omstillere, sol/lagring i Andet, rum, platforme); c7 → 150 (+49 kerne-AI: ASML, Micron/hukommelse/lagring, servere, netværk, optik, SMR/el, rum, platforme) + "Andre med NDI-linse i samme led" på selskab.html; c6 → 101 (+33 i tynde temaer: SpaceTech 1→6, Fysisk tech, Chips, Energiressourcer, Optik); linse på tema-sider (dæknings-kort, badge, 'hvad ejer man?'-kolonne, filter `linse=1`) og pr. tema-kort på temaer.html. c5 → 68 selskaber (+33, Arm opgraderet), linse-badge + filter "Kun med NDI-linse" i screeneren. c3: 35 selskaber med 5 kvalitative felter (tag, hvad ejer man, plads i 13-led-kæden, hold øje med, livscyklus = ikke klassificeret); A-Z-filter "Kun med NDI-linse"
- [x] Ingen P/E i v1 (skjult); P/S skjult
- [x] Læsbare selskabsnavne + warrants (lane-B c20–c23, UX-MUST 2–4): `displayName` i data.js (≈45 kendte depotbank-forkortelser + sikre regler for ADR/aktieklasse/Br/N/'/The') i h1, sidetitel, screener, A-Z (bogstavgrupper/sortering), tema-sider, tema-hub og naboer; beholdningsnavnet står i meta-linjen/tooltip og bruges fortsat i CSV; søgning matcher begge navne. Opendoor-warrants mærket 'Warrant (tegningsret) på Opendoor Tech - ikke et selvstændigt selskab' i alle lister + bånd på selskabssiden. Tomme profiler: 'Rolle/Produkter/Kunder' med '-' skjules, i stedet én linje med link til tema/NDI-linse
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
- [x] Rum: "Leddet i rum-fanen" på hvert rum-ledkort (rejse-strimmel i 6 trin med klik til trinnet + piller til penge, usikkerheder, tråde og højde, som fremhæver de relevante kort); kvante-genvej til tråden "Kvantenøgler via satellit"; `#sp-web` lander under menuen (lane-A)
- [x] Deep links til kapitler (`?kaede=space#kap-kaeder` fra vaerdikaede.html, `#kap-rum`, `#kap-flod`) lander nu rigtigt, efter at siden er bygget; AI-ledkortets "Led N af 13 i floden" lyser knuden op på flodkortet; "Rummet og de andre kæder" har ramme som de andre rum-sektioner (lane-A)
- [x] Rum: "Kort fortalt" på alle 8 rum-ledkort (Gør + Penge med pengesporets ikon: én gang, løbende eller endnu tidligt; NDI-linjen om Starlink med kilde, compute i rummet linker kun til citatet med kilde); "Hvad er det" gentager ikke længere "Gør" og forklarer i stedet fart, bus, signalvej, radar og afstand (baggrund) (lane-A)

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
| lane-B c19 | Merge origin/main → lane-B (portfolio-konflikter felt for felt); forslag-mærker kun i gennemgangstilstand (Leo 02:07); ærlig modenhed: forslag ≠ manuel, dansk; Opendoor usikker | lane-B |
| lane-B c18 | Mobil: kompakt tema-linje + sortér-knaprække i screener, ISIN/tema under navnet i A-Z; Ghl = Grab Holdings (linse 333, Software → Platforme forslag) | lane-B |
| lane-B c17 | Mobil-læsbarhed af temagennemgang: forslag/usikkert/før/linse-match-noter ombrydes (td nowrap gav 933-1674 px brede tabeller på 375 px) i screener, A-Z og tema.html; NDI-linse-led for Planet Labs/Intuitive Machines rettet til kædens faktiske led | lane-B |
| lane-B c12 | Søge-/sorteringsparitet: fælles `searchPosition` (multi-tag + NDI-linse-tekst, hit-note), tema-grupper i screener, A-Z `status=`-filter + filter-bevarende links | lane-B |
| lane-B c13 | Tema-hub/tema-side polish: søg/sortér/temastatus på tema.html, multi-tag-tal på hub, navne i små temaer (Quantum/SpaceTech), præcist forslag-banner | lane-B |
| lane-B c14 | NDI-linse 310 → 332 (+22 Andet-navne); tema Andet: 'Hvad ligger i Andet?' (tæt på et led / ædelmetaller / sundhed / restpositioner / øvrige) | lane-B |
| lane-B c15 | Temaforslag-gennemgang: `skift=`-filter (fra → til) i screener + A-Z, synlig 'før'-linje, tema→screener-links, CSV temastatus | lane-B |
| lane-B c16 | NDI-beslutningsliste: 18 usikre temaforslag (themeDoubt/themeAlt) + `tvivl=1` i screener/A-Z, mærker på tema/selskab/hub; Albemarle → Energiressourcer; linse-NDI-tag 'forslag' for 41 | lane-B |
