# Data definitions (overnight defaults)

Leo: when stuck on a question for Christian, pick a sensible default and document it here.

## Fund start dates (VIDENSBOT-review #5)

**Default for all afkast / "siden start" / 100k-eksempel / embed:**
`portfolio.json` → `funds[].inception` = **første NAV** (matches `funds[].data[0].d`).

| Fond | Første NAV (performance) | legalInception (fund-meta, stiftelse/juridisk) |
|------|--------------------------|-----------------------------------------------|
| PMINDI | 2023-09-22 | 2023-09-25 |
| PMINDIAKK | 2025-12-05 | 2025-12-02 |

Prospektet nævner også første handelsdag 9. okt. 2023 (kl. n) og Akk stiftet 21. nov. 2025 — det er **ikke** performance-seriens start.

**UI-regel:** Vis altid formuleringen **"første NAV"** (eller "ved første NAV"), aldrig bare "stiftet" for afkasttal. `legalInception` må kun bruges i juridisk/meta-kontekst, ikke som afkast-anker.

**Copy-eksempel:** "Beregnet fra første NAV 22. september 2023."

## As-of stamps

- `performanceAsOf` / sidste punkt i `data[]` → afkast-snapshot (pt. 2026-10-14)
- `asOf` / `positionsAsOf` → forsinket beholdning (pt. 2026-06-01, cutoff for precheck)

Skriv dem adskilt: "Afkast pr. … · Beholdning (forsinket) pr. …"


## Værdikæde: physical → led 2 (default)

**Default overnight:** temaet `physical` (Fysisk tech) forbliver koblet til led 2 "Datacenter & racks" i `docs/vaerdikaede.html`.

Begrundelse: Level-1-modellen er pædagogisk og forenklet; fysisk hardware (racks, robotik, elbil-platforme) samles under det fysiske led, indtil Christian/Mads eventuelt splitter led 2. Tesla kan derfor fremhæves dér via multi-tag — det er eksponering, ikke en anbefaling.

## Drawdown (fondniveau)
- **Max:** dybeste peak→trough i totalafkast-serien (ratio), i procent.
- **Episoder:** hver tur under en løbende all-time peak indtil ny peak (eller åben serie).
- **Middel / median:** over episode-dybder (ikke over alle dage under vand).
- **Fix 2026-10-15:** `maxDrawdown` sammenlignede først fraction med senere procent og underdrev max (viste ca. −21 % i stedet for ca. −35,8 % på PMINDI). Rettet til konsistente enheder.

## Energi- og rumkæde: eksempler efter forretning (lane E, 2026-10-15)

Gælder `docs/data/value-chains.json`, kæderne `energy` og `space`.

Eksemplerne er valgt efter selskabets forretning i den forsinkede beholdning pr. 2026-06-01 (PMINDI). De er ikke de seks største vægte i temaet. `weightSum` og `count` på leddet er summen af de navngivne eksempler. Temaets samlede tal står i `themes.json` og i `treemap`.

Samme selskab kan stå på to led. GE Vernova står på elproduktion og elnet. Rocket Lab står på opsendelse og satellitter. Solaris står på elproduktion og elnet.

Udeladt med vilje, også når temaet hedder noget andet:

- CoreWeave, Nebius og IREN ligger i energitemaet som datacentre. De er ikke kraftværker.
- ProPetro er boreservice.
- Merlin, Archer og Airo Group ligger i SpaceTech og er luftfart.
- SpaceX har en profil, men indgår ikke i beholdningen pr. 2026-06-01.

AI-compute-kædens første led er ikke rettet her, så det ikke støder sammen med lane A. Det led viser stadig de største vægte i energitemaet.

Nye selskabsprofiler i `company-profiles.json` har ingen `reviewedAt`. Siden skal derfor blive ved med at sige AI-udkast, uden en dato for gennemgang. Kilden er selskabets egen side. Ingen kurser, afkast, P/E eller P/S.

`narrative` er valgfri og vises som "Kort fortalt". Uden `reviewedAt` bliver badget stående. Fem profiler har feltet fra 2026-10-16: Starfighters Space, Oklo, Northern Dynasty, Terra Innovatum og The Metals Company. Teksten beskriver forretningen og siger, hvor der ikke er drift. Den er ikke en gennemgang fra NDI.

Samme felt, samme dag, på Fluence, NextEra, Rocket Lab, Planet, NuScale, Quanta og GE Vernova. NextEra og Quanta har `themeStatus` forslag i snapshottet, og teksten siger det. NuScale-teksten gengiver selskabets eget tal, 77 MW pr. modul, og siger at en designgodkendelse ikke er et værk i drift. Neutron er ikke fløjet i beskrivelsen. NextEra-forsiden omtaler en sammenlægning med Dominion Energy. Teksten siger ikke, at den er gennemført.

Samme nat også på Southern Company, Vistra, Talen, Bloom, Centrus, BWX Technologies, Rolls-Royce, Firefly, Voyager, Karman, Plug Power og Nano Nuclear. Tal fra selskabssider gengives som selskabets egne: Vogtle og mere end 1 million hjem i Georgia, Vistra mere end 2.600 MW hvoraf 2.176 MW er drift og 433 MW er øget effekt, NuScale 77 MW. En udvælgelse, en designgodkendelse eller en forberedende dialog er ikke et værk i drift. HALEU hos Centrus er brændsel, ikke et kraftværk. Eclipse hos Firefly er ikke fløjet i beskrivelsen. Starlab er ikke en station i drift og ikke et datacenter.

Senere samme nat: Terrestrial Energy, NioCorp, Critical Metals, Lithium Americas, USA Rare Earth, Standard Lithium, Trilogy, Ivanhoe Electric, Intuitive Machines, Howmet, Redwire, York, MDA, Satellogic, Hawkeye 360, QuantumScape, Eos og Solaris. Thacker Pass er under opførelse efter selskabets egen tekst, med mål om industriel skala sent i 2027, og er ikke fuld drift. Standard Lithium har et demonstrationsanlæg i drift efter selskabets tekst, ikke en stor mine. Chorus hos MDA er omtalt før opsendelse. QSE-5 hos QuantumScape er ikke masseproduktion. Tesla og T1 Energy har `reviewedAt` og er ikke rørt.

Gasproducenterne Comstock, Antero, EQT og Expand Energy står på elproduktion, fordi gassen er brændsel, ikke fordi de er metalminer. Cummins og Generac står der som motorer og generatorer, ikke som elselskaber. Primoris og MYR Group står på elnet, fordi de bygger det. MP Materials, Gibraltar hos Taseko, Freeport, Ero og de andre kobbernavne er miner i beskrivelsen, hvor siden selv skelner mellem drift og projekt. Almonty nævner Panasqueira og Los Santos som miner og Valtreixal som projekt.

Sigma Lithiums kilde er rettet fra `sigmalithium.com` til `https://sigmalithiumcorp.com/`. Den første side beskrev den 16. oktober 2026 et andet foretagende om metalliske lithiumanoder. Den nye side er Sigma Lithium Corp og lithiumkoncentrat i Brasilien. Babcock & Wilcox, T1 Energy og Tesla har `reviewedAt` og er ikke ændret.

Blurbs, der vises på værdikædesiden: SMR-leddet siger, at ingen af navnene er et anlæg i kommerciel drift, at BWX Technologies leverer komponenter, og at Rolls-Royce er en motorkoncern med et reaktorprogram ved siden af. Råstof-leddet siger, at nogle navne er projekter, og at andre driver miner, blandt andet Mountain Pass og Gibraltar. Opsendelse siger, at Neutron og Eclipse ikke er fløjet i beskrivelserne, og at Firefly skriver, at Blue Ghost er landet. Taseko vises som i beholdningen: Taseko Mines (Trekor Metals). AI-compute-leddet er ikke ændret.

Konceptkortene i `nyhedsarkiv.html` gentager de samme grænser. De er ikke ugebreve.

Indledningen på energikæden siger det samme: gas på elproduktion er brændsel, ikke en metalmine, og navnene under atomkraft og SMR er ikke værker i kommerciel drift. Indledningen på rumkæden siger, at leddet rum og compute er infrastruktur, ikke et datacenter i kredsløb. Merlin står i energikædens udeladte liste som luftfart, ikke som et rum-led. Feltet `omitted` vises ikke på siden.

Råstof-blurb siger, at Centrus beriger uran og ikke er et kraftværk. Batteri-blurb siger, at QuantumScape ikke er masseproduktion. `weightSum` er uændret.

Opsendelses-blurb siger, at Starfighters skriver, at STARLAUNCH 1 er et suborbitalt udviklingsfartøj og ikke en orbital rute, og at Howmet leverer metaldele og ikke selv sender op. Profilen citerer selskabets meddelelse af 13. oktober 2026: planlagt flyvning med raketten under vingen, ikke en gennemført orbital opsendelse. Selskabets formulering om at være det eneste er ikke taget med. Konceptkortet i nyhedsarkivet gentager grænsen. Vægtene er uændrede. Et tjek samme nat: sum og antal på de otte led passer, og hver vægt matcher PMINDI pr. 2026-06-01.

Råstof-leddet siger også, at The Metals Company skriver, at prøvekørsel ventes i fjerde kvartal 2027, og at aftalen og ansøgningen ikke er produktion. Kilden er selskabets meddelelse i maj 2026 om Allseas og NOAA's offentliggørelse af ansøgningen i august 2026. Et navneplade-tal for kapacitet og formuleringen om verdens største ressource er ikke taget med. Northern Dynasty skriver, at Pebble er i føderal tilladelsesbehandling. Lithium Americas skriver, at Thacker Pass bygges, med mål om industriel skala sent i 2027. Ingen af de to er i fuld drift. Mountain Pass og Gibraltar er stadig miner i teksten.

Elnet-blurb skelner byggerne fra dem, der leverer strøm. Quanta, Primoris og MYR Group bygger nettet og producerer ikke strømmen. GE Vernova leverer udstyr og driver ikke værkerne. Solaris leverer strøm tæt på store forbrugere. Solaris' forside omtaler 16. oktober 2026 købet af Omega med dato 6. juli 2026 i adressen `ir.solaris-energy.com/news/2026/07-06-2026-120016135`. Købet er efter beholdningen pr. 2026-06-01 og står ikke i kædeteksten. Vægtene er uændrede.

Elproduktions-blurb navngiver forskellen. Comstock, Antero, EQT og Expand er gas som brændsel. T1 Energy laver solcellemoduler, efter den gennemgåede profil, og profilen er ikke ændret. Cummins og Generac er motorer og reservegeneratorer, ikke elselskaber. Babcock & Wilcox leverer kedler og service. GE Vernova leverer udstyr og driver ikke værkerne. Bloom er brændselsceller hos kunden. Plug er brændselsceller og brintudstyr. Teksten siger ikke, at hvert anlæg kører. Bloom og Plug gav 403 den 16. oktober 2026, så der er ingen nye produktnavne derfra.

Batteri-blurb siger, at Fluence er batterisystemer og software, ikke et kraftværk, og at teksten ikke påstår, at selskabet selv laver cellerne. Fluence gav 403 samme nat. Eos er zinkbatterier, ikke en mine. Selskabets egne ord om at være ledende og om et offentligt lån er ikke taget med. Satellit-blurb siger, at Redwire leverer dele og ikke selv sender op, at York bygger platforme, og at MDA omtaler Chorus, før konstellationen er sendt op. MDA's forside havde den formulering 16. oktober 2026. Vægtene er uændrede.

Råstof-leddet siger også, at Standard Lithium skriver, at et demonstrationsanlæg i Arkansas behandler saltvand, og at det ikke er de store projekter. Kurser på forsiden er ikke taget med. Almonty skrev 23. september 2026, at Sangdong har produceret wolfram for første gang siden 1993. Valtreixal er et projekt. Meddelelsen er efter beholdningen pr. 2026-06-01, og teksten siger det. Kilden er `https://almonty.com/almonty-marks-first-tungsten-production-at-sangdong-since-1993/`. Panasqueira og Los Santos står stadig som miner.

## År til dato på periodesiden

`ytdReturn` i `data.js` bruger sidste punkt i året før som udgangspunkt, ikke 1. januar. For PMINDI pr. 2026-10-14 er det 2025-12-31, ikke 2026-01-02. `periode.html` viser den samme dato i "Fra → til". Kalenderår bruger samme base (`calendarYearReturns`).

Kalenderåret 2026 og år til dato ender på samme punkt, 14. okt. 2026, og har samme udgangspunkt. Siden siger derfor, at de to tal er ens, indtil serien får et punkt i 2027. `partial` i `calendarYearReturns` er kun første år fra første NAV. 2026 er ikke mærket delår. Datoen viser, at året ikke er slut.
