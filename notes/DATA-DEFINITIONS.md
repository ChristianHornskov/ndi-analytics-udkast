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

## År til dato på periodesiden

`ytdReturn` i `data.js` bruger sidste punkt i året før som udgangspunkt, ikke 1. januar. For PMINDI pr. 2026-10-14 er det 2025-12-31, ikke 2026-01-02. `periode.html` viser den samme dato i "Fra → til". Kalenderår bruger samme base (`calendarYearReturns`).
