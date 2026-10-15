# Claude UX review (overnight lane R)

Read-only reviewer. Build lanes fix **MUST** items.
Live: https://christianhornskov.github.io/ndi-analytics-udkast/

## 2026-10-15 23:55 CEST · cyklus 1
Grundlag: live Pages (last-modified 21:50 UTC ≈ `a341c99`) + lokal `docs/` efter reset til `origin/main` `b9e81ee` (lane A/B/C-merges landede under review; Pages halter). Playwright 1366 + 375, 22 sider, 0 JS-fejl, 0 4xx. Linser: PERSONA-privat, PERSONA-familyoffice, IDESPEJDER, UX-krav.

### MUST
1. **Drawdown-datoer modsiger hinanden.** `risk-stats.json` `maxDdPeak: 2026-06-02`, `maxDdTrough: 2025-04-08` → risici.html viser "2. jun. 2026 → 8. apr. 2025" og fakta.html "2026-06-02 → 2025-04-08": toppen ligger *efter* bunden. drawdown.html viser korrekt "18. feb. 2025 → 8. apr. 2025". FO opdager det med det samme. Ret peak til 2025-02-18 (eller genberegn) og brug dansk datoformat på fakta.
2. **Mobil 375: drawdown.html har vandret overflow** (scrollWidth 587). Årsag: episode-søjlerne `div.b` (41 × 8 px) under "Episoder (dybde)" bryder ud af containeren. Brug flex-shrink, overflow-x:auto med fade eller skaler søjlebredden.
3. **Omkostninger findes nu (godt), men indgangen er svag.** omkostninger.html har tal (1,49 % løbende + 0,64 %/0,72 % transaktion, 0,25 % / 0,25 %, intet resultathonorar). Der mangler dog: (a) et samlet tal pr. år og et eksempel i kr. (privat-persona: "10.000 kr."). Brug KID'ets omkostningseksempel, ikke vores eget regnestykke. (b) Link fra invester.html trin 4 ("Ordre & omkostninger"), som stadig kun nævner bankens kurtage. (c) Link fra Entré-dørene. Fonden har "Omkostninger med tal →", og det skal blive.

### SHOULD
- **Entré "Porteføljeholdet" er stadig navnløs**, selvom fakta.html nu har Mads, Jesper, Jordan Lambert og Simon He. Vis to navne og et link til Fakta. Det er persona-privat top 3 nr. 3.
- **Top-10 mangler stadig.** Porteføljen åbner med en tabel på 345 rækker. Vis top 10 + temasøjler først og fold resten ind (begge personas). På mobil er det tungt at scrolle.
- **Tomme stubs synlige for offentligheden:** livscyklus "Ingen af fondens 345 selskaber er klassificeret endnu", "Følg tema (stub)" på udforsk, nyhedsarkiv med 9× "Placeholder", kort.html "Koncept-stub", "udfyldes af NDI" (revisor, officiel vol/Sharpe). Skjul dem eller saml dem i én "kommer"-boks. Privat-personaen læser det som "tallene er ikke til at stole på".
- **Rå datanavne:** "Sea Sp ADR", "Palantir Tchnl", "Lumentum Hldngs", "Coinbase Glb", "Wix.Com Ltd". Tilføj et `displayName`-map for top 50.
- **Forkerte/tvivlsomme tags i top 20:** Cipher Mining = Software, Coreweave = "Energi Compute". Det er synligt i porteføljens top 20.
- **Intern jargon på offentlige sider:** om-data ("Azure", "docs/", "Vidensbot", "ugebreve"), vaerdikaeder ("Tekst inspireret af NDI ugebreve / Vidensbot"), ideer ("Jesper-palette"), udforsk ("Level 1 … mange-til-mange i ambitionen"), "NDI-linse" ×20 uden forklaring ved første forekomst.
- **Variansdrag mangler stadig på Fonden/Entré.** Ordet står ingen steder i den crawlede tekst. Læg møntkastet (+50 %/−40 % = 90 kr.) i "Sådan tænker vi (kort)". Bogens bærende pointe; begge personas.
- **Fonden-siden er blevet lang og blandet:** 13 X-opslag står mellem grafen og kalenderårene. Afkastsiden mister fokus ("netbank-følelsen", UX-krav #55/#60). Flyt X til egen side/fold (se også compliance MUST 1).
- **Månedsgitteret:** okt. 2026 (−9,2) er en delmåned uden markering. Skriv "okt. til 14." eller marker cellen.
- Udbytte "38.9 kr." med punktum. Skriv 38,9 kr.
- Footer "Central Information Dokument". Skriv "Dokument med central information (KID)", som på risici.
- Fakta: "Juridisk start 2023-09-25", men Fonden siger første NAV 22. sep. 2023. NAV før juridisk start? Afstem med Fundmarket, eller forklar.

### Nice
- Visuel variation: Entré, Fonden og Risici er stadig kort-gitter + bånd. Værdikæder/idéer har fået mere variation (lane-C/D). Fakta/omkostninger er pæne tabeller. Godt til FO, men giv dem en lille "faktaark"-header (AUM, ISIN, SRI, omkostning) som én blok, der kan printes.
- Download faktaark-PDF / CSV (FO SHOULD fra PERSONA-familyoffice §5).
- Tooltip/ordliste ved første CAGR, drawdown, NAV, SRI, UCITS på Fonden (?-ikonerne findes. Udvid til brødtekst).

### Godt / behold
- Tre døre på Entré og "Senest opdateret" med to datoer. Det står klart på 375.
- Gaten for PMINDIAKK holder i fonden-view, embed (`?fund=pmindiakk` og klik) og sammenlign (bortset fra NAV, se compliance).
- `?periode=1m/3m` i embed ignoreres korrekt (viser siden start).
- SoftBank-siden: "Hvilket problem løser det?", kilder med tjekdato, AI-udkast-mærker pr. felt, Group ≠ Corp. Stærk.
- Fakta-siden med IFS/depotbank/rådgiver/CVR lukker en stor del af FO MUST 1.
