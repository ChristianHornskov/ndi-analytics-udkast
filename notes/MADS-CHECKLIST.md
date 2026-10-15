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
- [x] Quantum-tag — 4 selskaber (forslag); Quantumscape uændret (batteri)
- [ ] Legacy-mistænkt / Trump-tags — deferred (UX skjult)
- [ ] Sortering: 52u-drawdown, optrend, vol, insider — deferred (compliance på per-aktie)
- [x] Tema-hub polish (lane-B c2): korrekt forslag-banner (fra Andet vs. omtagget Compute→Quantum via `themeFrom`), fund-switch, Andet sidst, små temaer (Quantum/SpaceTech) fremhævet m. egen kæde, kæde-link pr. tema
- [x] Compliance-sikker sortering (lane-B): whitelist navn/vægt/tema i screener + A-Z; temastatus-filter (forslag/uden); tomme tilstande med hjælp
- [x] NDI-linse (unique-metrics) for kernenavne (lane-B c3+c5): c5 → 68 selskaber (+33, Arm opgraderet), linse-badge + filter "Kun med NDI-linse" i screeneren. c3: 35 selskaber med 5 kvalitative felter (tag, hvad ejer man, plads i 13-led-kæden, hold øje med, livscyklus = ikke klassificeret); A-Z-filter "Kun med NDI-linse"
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
