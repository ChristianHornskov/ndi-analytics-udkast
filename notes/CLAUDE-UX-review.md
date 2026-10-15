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

## 2026-10-16 00:00 CEST · cyklus 2
Grundlag: `origin/main` `8b30c48` (lane-A: 13-leds vaerdikaede + deep-link). Pages: tekstdump af 17 sider er **identisk** med lokal main, så Pages er à jour. Playwright 1366 + 375, 26 URL'er, 0 JS-fejl, 0 4xx. Kort cyklus: kun få commits siden cyklus 1.

### MUST (åbne fra cyklus 1, ingen ændring)
1. **Drawdown-datoer** står stadig som "2. jun. 2026 → 8. apr. 2025" (risici) og "2026-06-02 → 2025-04-08" (fakta). `risk-stats.json` er uændret.
2. **drawdown.html på 375 har stadig overflow**: scrollWidth 587. Det er den eneste side med vandret scroll.
3. **Omkostningslink fra invester.html trin 4** mangler stadig.

### SHOULD (nyt i denne cyklus)
- **vaerdikaede.html (ny, 13 led) er god.** Den har dæmning-grupper, flod-gradient, "forsinket" pr. led og top 5 i `<details>`. Mindre punkter:
  - **Lednumrene modsiger NDI-linsen.** `unique-metrics.json` siger "Led 1 og led 2: Energi og fysisk tech" (Tesla), "Led 3: chips" (Nvidia) og "Led 5: platforme" (Meta). Det følger den gamle 6-leds model. Linkene peger nu på 13-leds siden, hvor led 2 er Datacentre og led 5 er Foundry. FO ser modsigelsen med det samme. Brug ledets navn i stedet for nummer, eller opdatér til de 13 led.
  - **Temaknapperne** (Energi / Fysisk tech / Software / Platforme / Chips / Compute / Optik) er en anden taksonomi end de 13 led og ligger lige over dem. Privat-personaen forstår ikke forskellen. Giv dem overskriften "Filtrér på tema".
  - **"NDI"-mærket** på alle 13 led (title: "NDI har skrevet om leddet") kan ikke ses på mobil, fordi det kun står i en tooltip. Når mærket står på alle led, skiller det ikke noget fra. Fjern det, eller vis det kun, hvor det betyder noget.
  - **Vægtsummen over leddene er ca. 50,9 %**, og selskaber kan stå i flere led. Der står "Vægt er summen af de tilordnede selskabers vægt" (godt), men tilføj "et selskab kan tælle i flere led", så ingen lægger tallene sammen.
  - "BLOG 30. marts 2026" ser ud som en intern kildekode. Skriv "NDI-blog, 30. marts 2026" og link til indlægget.
- **Udforsk på 375 er 26.300 px høj** (751 tekstlinjer). Det er den længste side. Indsæt fold eller "vis flere" efter de første sektioner (visual fatigue, begge personas).
- **Porteføljen viser nu "80 af 345"**. Det er bedre end 345 rækker, men en tydelig **top 10** med temasøjler øverst mangler stadig.
- Tomme stubs er uændrede: "Følg tema (stub)", "udfyldes af NDI" ×3 og "AFVENTER GENNEMGANG".
- Uændret: "38.9 kr." og "Central Information Dokument" ×7 i footer.

### Nice
- Deep-link `vaerdikaeder.html?kaede=ai-compute#lk-memory` virker på 1366 og 375. Behold det.
- Tesla `vaerdikaede.html?isin=` markerer 2 led. Godt til "hvor sidder mit selskab".

### Godt / behold
- Gaten for PMINDIAKK-afkast ("Vises efter 12 måneder … fra december 2026") er tydelig (se dog compliance om NAV).
- AI-udkast-mærker på ndi-perspektiv (9) og SoftBank (13).

## 2026-10-16 00:20 CEST · cyklus 3
Grundlag: `origin/main` `820f116`. Ingen ændringer i `docs/` siden `8b30c48` (kun notes/watchdog). Pages last-modified 15. okt. 21:57 UTC, svarer til main. Playwright 1366 + 375, 20 sider + SoftBank/SpaceX-selskabsside, 0 JS-fejl, 0 4xx. Cyklussen gentjekker de åbne punkter og kigger på nye vinkler (selskabssiden i dybden, invester, AKK-view).

### MUST (stadig åbne, uændret)
1. Drawdown-datoer 2. jun. 2026 → 8. apr. 2025 (risici, fakta).
2. drawdown.html 375: scrollWidth **587**. Stadig den eneste side med vandret scroll.
3. invester.html trin 4 "Ordre & omkostninger" linker ikke til omkostninger.html og nævner kun bank/kurtage. **Nyt:** trin 1 siger "Læs prospekt, central investorinformation og risici", men linker hverken til prospektet eller KID. Linkene findes (fakta/footer). Sæt dem direkte ind i trinnet.

### SHOULD (nyt i denne cyklus)
- **Selskabsside (SoftBank) på 375 er 5.354 px og har 9 "AI-udkast"-mærker.** "Hold øje med" står to gange (i NDI-linsen og som egen sektion med samme tekst). Mærket bliver støj og mister sin effekt. Brug ét banner øverst ("Teksterne er AI-udkast, tjekket mod kilden 12. okt. 2026"), behold mærket kun på felter, der afviger, og fjern dublet-sektionen.
- **AKK-view:** "Klassen følger samme overordnede strategi som PMINDI" står uden kontekst. Privat-personaen hopper til PMINDI's +104,8 % og tror, at det er AKK's afkast. Tilføj "Afkastet for PMINDI kan ikke overføres til PMINDIAKK" eller fjern sætningen (se compliance).
- **Ugyldig selskabs-URL** (`selskab.html?id=…`) viser "ISIN - indgår ikke …" med tom ISIN. Skriv "Ukendt selskab" og link til A-Z.
- **"SpaceX: større end hele jordens økonomi"** er en mellemrubrik på vaerdikaeder.html. Den er sensationel i tonen, og FO-personaen mister tilliden. Gør citatet til brødtekst under en neutral rubrik (fx "Rum og compute: Musks påstand"). Se compliance.
- Fonden på 375 er 5.738 px. X-blokken (13 opslag) fylder stadig mellem graf og kalenderår (uændret fra cyklus 1).
- Uændret: udforsk 26.330 px på 375, ingen top 10 på porteføljen, "udfyldes af NDI" ×6 i crawlet tekst, "Følg tema (stub)", "38.9 kr." / "38.0 kr.", "Central Information Dokument" i footer, lednumre i NDI-linsen vs 13 led.

### Nice
- Fonden-hero har 5 KPI-kort med samme visuelle vægt (afkast, CAGR, ÅTD, drawdown, SRI). Giv SRI og drawdown samme plads som afkast (balance; FO-persona). Det løser også compliance-SHOULD om fremhævning.
- Print/PDF-knappen findes på Fonden. Tjek om printvisningen tager footer-disclaimer + KID-links med (FO tager PDF med til investeringskomité).

### Persona-status (kort)
- **Privat:** forstår Entré og Fonden. Bliver væk i udforsk/værdikæder (længde). Mangler stadig kr.-eksempel på omkostninger og navne på holdet på Entré.
- **Family office:** fakta og omkostninger dækker det meste. Blokeres af drawdown-datofejlen og mangler et faktaark i én blok og download (CSV/PDF).
