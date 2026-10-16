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

## 2026-10-16 00:40 CEST · cyklus 4
Grundlag: `origin/main` `820f116` (uændret siden cyklus 3, `docs/` uændret siden `8b30c48`). Pages last-modified 15. okt. 21:57 UTC = main. Playwright 375 + 1366 på 24 sider. Fokus denne gang: sider, der ikke var dækket før (`laer/*` ×10, tema, temaer, ndi-paa-x, nyhedsarkiv, om-data, omkostninger, ideer, embed). 0 JS-fejl, 0 4xx.

### MUST (stadig åbne, uændret)
1. Drawdown-datoer peak > trough (risici, fakta).
2. drawdown.html 375: scrollWidth **587** (gentjekket). Stadig den eneste side med vandret scroll af de 24.
3. invester trin 1 + 4 mangler direkte links til prospekt/KID og omkostninger.html.

### SHOULD (nyt)
- **omkostninger.html giver ingen samlet årlig sats.** Kortene viser "Øvrige løbende 1,49 %" og "Porteføljetransaktion 0,64 %" hver for sig. Privat-personaen lægger ikke selv tallene sammen, og FO vil have ét tal, der kan sammenlignes på tværs af fonde. Tilføj en linje "I alt pr. år ca. 2,13 % (PMINDI) / 2,21 % (AKK), ekskl. emission/indløsning". Tilføj også et kr.-eksempel ("100.000 kr. → ca. 2.130 kr./år"), som KID'ets omkostningstabel gør det. Tjek tallene mod KID.
- **omkostninger: tastefejl og intern tekst.** "ikke et **inventeret** ÅOP" (skal formentlig være "beregnet"). "Tomme felter = udfyldes af NDI" står offentligt, men der er ingen tomme felter på siden. Slet sætningen. "NewDeal Invest, kl n" er Fundmarkets interne navn. Brug "NewDeal Invest (PMINDI)".
- **om-data.html har udviklertekst:** "Ingen live Azure-kald. Nyere end cutoff må ikke lægges i `docs/` (se precheck)." Det er jargon, som en investor ikke forstår, og det afslører pipelinen. Skriv i stedet "Beholdningen opdateres kun, når et nyt forsinket snapshot er offentliggjort".
- **nyhedsarkiv.html er en tom stub** ("Indhold er placeholder i dette udkast", 2× "Placeholder:"). Den linkes fra ndi-paa-x ("← Entré · Nyhedsarkiv"). Skjul linket, til der er indhold, eller fyld siden med de 7 @InvestNewdeal-opslag, som allerede findes i x-posts.json (webinar, udbytte, børsnotering AKK).
- **ndi-paa-x.html, tone:** Mads' "Listening to Bloomberg about AI is like asking a BWM sales rep…" (inkl. tastefejlen "BWM") og "de lavede den bedste bil" om Tesla. For FO-personaen virker det som et fan-forum, ikke en kapitalforvalter. Se compliance cyklus 4 MUST 1.
- **tema.html (Chips):** "Taiwan Semi Sp ADR **også Andet / uklassificeret**". TSMC er det mest oplagte chip-selskab, så sekundærtemaet "uklassificeret" ser ud som en fejl. Fjern sekundærtemaet. "Aixtron N" er et afkortet navn (kildens suffiks). Brug et pænt navn.
- Samme X-blok (FundaAI, MilkRoadAI m.fl.) står nu også på tema.html. X-opslag optræder på Fonden, selskab, tema og ndi-paa-x. Det er visuel gentagelse og trætter brugeren: de samme 3–4 opslag ses på hver side.

### Positivt (laer/*)
- De 10 Lær-sider er korte (≤ 1.300 px på 375), uden overflow og i et klart sprog. variance-drag har et godt regneeksempel. udbytte-vs-akk forklarer AKK's 12-måneders-regel tydeligt. faq-mangler-aktie siger "Fravær er ikke en anbefaling". Det er den bedste del af sitet til privat-personaen. **Forslag:** link til Lær fra Fonden-hero ("Hvad betyder CAGR?" → variance-drag) og fra drawdown.
- om-data på 375 folder grupperne sammen (1.514 px mod 4.621 px på desktop). Det er godt.

### Persona-status
- **Privat:** Lær-sektionen besvarer de fleste begynderspørgsmål, men den er svær at finde. Omkostninger mangler stadig ét samlet tal + kr.
- **Family office:** blokeres stadig af drawdown-datofejlen. Ny bekymring: tonen på ndi-paa-x.

## 2026-10-16 00:18 CEST · cyklus 5
Grundlag: `origin/main` `60cebcc`. Første cyklus med nye `docs/`-ændringer siden `8b30c48`: 41 filer er ændret (merges fra lane-A/B/C/D/E/X). Pages last-modified 15. okt. 22:11 UTC, og `drawdown.html` er byte-identisk med main, så Pages = main. (Klokkeslættet ligger før "00:40" i cyklus 4. Tidsstemplerne i cyklus 3–4 var ikke vægurstid.) Playwright 375 + 1366 på 27 sider (lokal server på `docs/`): 0 JS-fejl, 0 4xx. `fonden.html`/`portefolje.html`/`udforsk.html` giver 404, fordi de er `?view=` i index. Det er forventet.

### Lukket siden cyklus 4 ✅
- **drawdown.html 375: scrollWidth 375** (var 587). Ingen side har vandret scroll på 375 længere.
- **drawdown.html viser nu korrekt dybeste fald 18. feb. 2025 → 8. apr. 2025** (−35,8 %, tilbage på toppen 26. aug. 2025), plus en "lige nu"-linje (−23,4 % under top 2. jun. 2026). Den er god og ærlig.
- omkostninger: "inventeret" → "beregnet". Der er nu et **kr.-eksempel pr. post på 100.000 kr.** og en fælles skala på søjlerne. Det er et stort løft for privat-personaen.
- invester: "tre spørgsmål" og en KID-tabel for begge klasser med ISIN og links.

### MUST
1. **Ny inkonsistens: drawdown-datoer.** drawdown.html siger 18. feb. 2025 → 8. apr. 2025. **risici.html og fakta.html siger stadig "2. jun. 2026 → 8. apr. 2025"** (top efter bund, fra `risk-stats.json` `maxDdPeak`). To sider viser nu hver sin dato for det samme tal. FO-personaen ser det med det samme. Ret `risk-stats.json` maxDdPeak til 2025-02-18, eller lad risici/fakta læse samme beregning som drawdown.html.
2. **omkostninger + fakta: intern tekst over folden på 375.** "Tomme felter = udfyldes af NDI" står i en stiplet boks som det første efter introen (screenshot 375), og kortets titel er "NewDeal Invest, **kl n** (PMINDI)". Det er det første, privat-personaen ser på siden om penge. Slet sætningen (omkostninger har ingen tomme felter) og vis "NewDeal Invest (PMINDI)".
3. invester trin 1 linker stadig ikke direkte til prospekt/KID (tabellen længere nede har links ✅), og **trin 4 "Ordre & omkostninger" linker ikke til omkostninger.html**. Det er én linje: "Fondens egne omkostninger: se Omkostninger →".

### SHOULD
- **omkostninger: stadig ingen samlet sats.** kr.-eksemplet står pr. post (1.490 + 640 kr.), men der er ingen "i alt pr. år ca. 2.130 kr. (PMINDI) / 2.210 kr. (AKK) ekskl. emission/indløsning". Det er den sidste lille ting, før FO-MUST om én sammenlignelig omkostning er opfyldt.
- **ndi-perspektiv.html: 74 "AI-udkast"-mærker** (var 9 i cyklus 2), fordi lane-B har lagt NDI-linsen på 35 navne. På 375 er siden 16.196 px. Mærket står ved hvert felt og er nu ren støj. Brug **ét** banner øverst pr. side ("Linse-teksterne er AI-udkast og afventer NDI-gennemgang") og et lille mærke pr. selskabskort, ikke pr. felt. Det samme gælder SoftBank (9).
- **ndi-paa-x.html** er poleret (opsummeringskort, filtre, søgning, egne kort uden embed), og det er visuelt godt. Men den gør modsigelsen tydeligere: lige under "ikke NDI's holdning" står "NDI-relaterede konti: @InvestNewdeal · @MadsC007 …" og filteret "NDI / fond 14". Den nye badge **"MADS FØLGER"** på tredjepartsopslag (FundaAI om SoftBanks kreditrisiko, Melvin om $CRWV/$NBIS/$NVDA) kan læses som en anbefaling fra forvalteren. Se compliance cyklus 5.
- Fonden på 375 er 5.855 px (var 5.738). X-blokken står stadig mellem graf og kalenderår. Det gør også "ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse".
- Ugyldig selskabs-URL: "ISIN - indgår ikke …" med tom ISIN er uændret.
- Uændret: udforsk 26.330 px på 375, ingen top 10 på porteføljen, "Følg tema (stub)", "Koncept-stub" på kort.html → nyhedsarkiv (stadig placeholder), "38.9 kr."/"38.0 kr." (punktum som decimaltegn), "Central Information Dokument", udviklertekst på om-data ("Ingen live Azure-kald … (se precheck)"), "Tekst inspireret af NDI ugebreve" synligt på vaerdikaeder.

### Nice
- Link fra drawdown-hero til `laer/variance-drag` og fra "Middel/median →" på Fonden til drawdown (det sidste findes ✅). Den nye "lige nu −23,4 %"-linje bør have et "Hvad betyder det?"-link til Lær.
- Visuel variation: drawdown (underwater/fordeling/episoder) og Lær-siderne (møntspil, skyder) gør nu sitet mindre ensformigt. Mosaik/sunburst/treemap går stadig igen på temaer, vaerdikaeder og tema. Overvej at give tema.html en anden hovedvisual end treemap.

### Persona-status
- **Privat:** omkostninger i kr. hjælper meget. Siden skal bare starte uden intern tekst og ende med ét "i alt". Lær er stadig svær at finde fra Fonden.
- **Family office:** drawdown.html er nu troværdig. Til gengæld ser FO, at risici/fakta siger noget andet (MUST 1), og det er værre end én fejl alene. ndi-paa-x med "Mads følger" er en tillidsrisiko.

## 2026-10-16 00:25 CEST · cyklus 6 (delta)
Grundlag: `origin/main` `60cebcc`, **uændret siden cyklus 5**. Pages last-modified 15. okt. 22:11 UTC, og `drawdown.html` har samme md5 som main. Ingen ny build-leverance at vurdere, så alle punkter fra cyklus 5 gælder uændret. Stikprøver er bekræftet:

### MUST (åbne, prioriteret til næste build)
1. Drawdown-datoer er inkonsistente: `risk-stats.json` `maxDdPeak` = 2026-06-02 (efter trough 2025-04-08). risici/fakta modsiger drawdown.html. Det er stadig den mest synlige fejl for FO.
2. omkostninger/fakta: "Tomme felter = udfyldes af NDI" + "kl n" over folden på 375.
3. invester trin 1 → KID/prospekt-link, trin 4 → omkostninger.html.

### SHOULD
- Én samlet løbende omkostning i kr./% på omkostninger (privat + FO).
- AI-mærker: ét banner pr. side i stedet for 74 mærker på ndi-perspektiv.
- ndi-paa-x: fjern "Mads følger"-badge (`js/x-feed.js:279`). Den er både en UX- og en compliance-risiko.
- Uændret: udforsk 26k px på 375, ingen top 10, stubs (nyhedsarkiv "Placeholder: …" er stadig synlig, `nyhedsarkiv.html:37`), punktum som decimaltegn, "Central Information Dokument".

### Nice
- Ingen nye. Se cyklus 5.

Forslag til watchdog: Næste cyklus bør kun køre fuld Playwright, hvis `origin/main` har bevæget sig.

## 2026-10-16 00:23 CEST · cyklus 7 (delta)
Tidsstemplet er vægurstid. Cyklus 6's "00:25" lå lidt foran. Grundlag: `origin/main` `60cebcc`, **stadig uændret**. Pages last-modified 15. okt. 22:11 UTC, og `drawdown.html` har samme md5 lokalt og live (`cc07504…`). `docs/` på lane-R = main (0 filer i diff). Der er ingen ny leverance, så ingen ny Playwright-kørsel. Cyklus 5-målingerne gælder.

### MUST (uændret, stadig åbne)
1. Drawdown-datoer: `data/risk-stats.json` `maxDdPeak` = 2026-06-02 (efter trough). risici/fakta modsiger drawdown.html.
2. omkostninger/fakta: "Tomme felter = udfyldes af NDI" + "kl n" over folden på 375.
3. invester trin 1 → KID/prospekt, trin 4 → omkostninger.html.

### SHOULD (uændret)
- Én samlet løbende omkostning (kr. + %) på omkostninger.
- Ét AI-banner pr. side i stedet for 74 mærker (ndi-perspektiv).
- Fjern "Mads følger"-badgen (`js/x-feed.js:279`).
- nyhedsarkiv: to synlige "Placeholder: …"-afsnit (`nyhedsarkiv.html:37,42`). Skjul siden eller fjern linket fra kort.html, indtil den har indhold.
- udforsk 26k px på 375, ingen top 10, punktum som decimaltegn, "Central Information Dokument".

### Nice
- Ingen nye.

Watchdog: main har ikke bevæget sig i to cyklusser. Næste fulde review først ved ny commit på main.

## 2026-10-16 00:45 CEST · cyklus 8 (main `1bc0d43`, fuld runde)

Main har bevæget sig siden `60cebcc`: lane-A/B/C/D/E/X er merget (flodkort, NDI-linse 68, lær/valuta, drawdown-markeringer, omkostninger med kvitteringer). Live-sitet har de nye sider (valuta 200, omkostninger med `receipt`), så Pages er ikke bagud. Testet lokalt med Playwright på 16 sider ved 375 og 1280: ingen vandret scroll og ingen konsolfejl.

### MUST
- **"MADS FØLGER"-badge står stadig på selskabssiden** (SoftBank `JP3436100006` viser det 3 gange) og som filteret "Konti Mads følger" på ndi-paa-x. For en privatinvestor ser det ud, som om fonden går ind for tredjeparts opslag. Kilde: `js/x-feed.js:339` og `ndi-paa-x.html:86/109/163`. Badget skal omdøbes til noget neutralt, fx "Udvalgt offentligt opslag", eller fjernes.
- **Fakta viser stadig toppunktet 2. jun. 2026 efter bunden 8. apr. 2025.** Siden siger det nu selv ("står som 2. jun. 2026, altså efter bunden, og er ikke tegnet"). Det er ærligt, men det er en rå datafejl, som brugeren kan se. `risk-stats.json:maxDdPeak` skal rettes i data, ikke forklares i teksten.
- **Der står stadig "udfyldes"/"afventer" i UI'et:** på fonden ("afventer Fundmarket-godkendelse"), fakta (3×), omkostninger ("Tomme felter = udfyldes") og risici ("vol/Sharpe: udfyldes", "afventer gennemgang: 115"). FO-personaen læser det som et ufærdigt produkt.

### SHOULD
- **Omkostninger er blevet klart bedre.** Sammenligningen har nu mærker for Forskel/Ens, og kvitteringerne regner i kr. pr. 100.000 kr. med en sætning som "80 kr. i regneeksemplet. Det er ikke et ÅOP". Det dækker personaens krav om at kunne se omkostninger i kroner. Der mangler stadig én samlet linje "løbende omkostninger i alt (OCF) fra KID", så FO ikke selv skal lægge satserne sammen.
- **Lær/valuta er god formidling.** Eksemplet 1,10 × 0,95 og skyderne er pædagogiske. Siden mangler dog en "næste side"-dør tilbage til fonden.
- **Værdikæder er tung på 375** (ca. 17.800 tegn tekst). Flodkort, energi-strømvej, rum-før/nu og robot-ordbog ligger nu på samme side, og der er stor risiko for, at variationen trætter. Fanerne bør åbne lukket på mobil, ligesom om-data gør med `details` under 700 px.
- **NDI-linse** ("hvad man kan holde øje med") er fint kvalitativ. Hold øje med, at formuleringen ikke glider over i "hvad man bør gøre".

### Nice
- Drawdown: prikken på valgt dag og markeringen "Dybeste fald" virker godt. AKK-teksten om 12 måneder står stadig.
- Om-data folder ordlisten sammen på mobil, så den er ca. 1.150 tegn over folden. Det er godt.

## 2026-10-16 00:31 CEST · cyklus 9 (main `1bc0d43` uændret, delta)

Main er ikke flyttet siden cyklus 8. Live-sitet er byte-identisk med `docs/` for 13 af 13 tjekkede filer, så Pages er ikke bagud. Jeg har kørt Playwright mod live-sitet på 18 sider (entré, fonden, portefølje, udforsk, værdikæder, drawdown, risici, SoftBank, temaer, invester, om-data, omkostninger, fakta, ndi-paa-x, nyhedsarkiv, sammenlign, idéer, lær/valuta) ved 375 og 1280 px. Der er 0 sider med vandret scroll og 0 konsolfejl.

### MUST (uændret fra cyklus 8)
- "Mads følger" vises stadig: renderet på SoftBank-siden og ndi-paa-x (`js/x-feed.js:339`, `ndi-paa-x.html:86,109,163`).
- Toppunktet for drawdown ligger efter bunden (`data/risk-stats.json:9` `maxDdPeak 2026-06-02`).
- Der står stadig "afventer"/"udfyldes" i UI'et: fonden 1 sted ("ÅTD og 100.000 kr.-eksemplet afventer Fundmarket-godkendelse"), fakta 3, risici 2, selskab 2, temaer 1 ("FORSLAG AFVENTER GENNEMGANG"), omkostninger 1.

### SHOULD
- **Den tomme livscyklus-boks står øverst på porteføljen.** Der står "Ingen af fondens 345 selskaber er klassificeret endnu" lige efter overskriften. Det er det første, en ny bruger møder efter vægtteksten. Boksen bør skjules, indtil der er mindst én klassificering, eller flyttes under tabellen.
- **Porteføljen har stadig ingen eksplicit top-10.** Tabellen er sorteret efter vægt (Sea 2,13, SoftBank 1,51, Carvana 1,28 …), men der er ingen overskrift eller kort opsummering som "De 10 største udgør X %". FO-personaen vil have det tal i ét blik.
- **Nyhedsarkiv** har 8 synlige "Placeholder:"-tekster og bliver linket fra nav/app.js, kort og ndi-paa-x. Fjern linket, indtil siden har indhold, eller skriv "Kommer" i stedet for "Placeholder".
- Værdikæder er uændret ca. 17.800 tegn på 375 (se cyklus 8).

### Nice
- Drawdown, sammenlign og lær/valuta er rene: korte sider med risikolinje og ingen stubs.

## 2026-10-16 00:36 CEST · cyklus 10 (main `1bc0d43` uændret, delta + nye sider)

Main har ikke flyttet sig. Jeg har kørt Playwright mod live-sitet på 25 sider ved 375 og 1280 px. Nye i denne runde er ndi-perspektiv, periode, selskaber A–Z, vaerdikaede, tema/chips, kort og lær/index. Alle sider svarer 200. Der er 0 sider med vandret scroll, 0 konsolfejl og 0 billeder uden alt-tekst. Hver side har præcis én h1.

### MUST (uændret)
- "Mads følger"/"Konti Mads følger" vises stadig på SoftBank og ndi-paa-x.
- Toppunktet for drawdown ligger efter bunden (`data/risk-stats.json:9`).
- "afventer"/"udfyldes" står synligt på fonden, fakta (×3), omkostninger, risici og temaer.

### SHOULD (nyt)
- **ndi-perspektiv er vokset til ca. 44.700 tegn og er 31.300 px høj på 375**, med **139 "AI-udkast"-mærker** (74 i cyklus 3) fordelt på 68 selskaber. Det er den længste side på sitet. Mærkerne er ren støj, og en privatinvestor kommer aldrig til bunden. Lav ét AI-banner øverst og en søgning, eller én kortside pr. selskab (linsen findes allerede på selskab.html).
- **Dataformat:** udbytte vises som "38.9 kr." og "38.0 kr." (engelsk decimalpunktum) på fonden og periode.html, mens X-opslaget skriver "38,00 kr./andel". Brug da-DK med 2 decimaler (`38,90 kr.`).
- **"Sådan investerer du", trin 4 "Ordre & omkostninger"** nævner kun kurtage og platformgebyr. Fondens egne løbende omkostninger (1,49 % + 0,64 % transaktion) og et link til omkostninger.html mangler. Det er netop her privat-personaen leder efter prisen.
- **Primær-nav har ingen omkostninger:** Entré, Fonden, Porteføljen, Udforsk, Følg med, Risici og Invester. Omkostninger findes kun i "Også i udkastet"-listen nederst på entréen og som kort på fonden. FO-personaen forventer pris i højst ét klik fra forsiden.
- **Små trykflader:** udforsk (ca. 700 links/knapper under 24 px høje på 375), selskaber A–Z (ca. 640) og portefølje (ca. 210). Det er hovedsageligt tabelrækkernes navne-links og tags. Det giver risiko for fejltryk på mobil (WCAG 2.5.8 kræver 24×24 px). Giv rækkerne `padding-block`, eller gør hele rækken klikbar.
- Uændret fra cyklus 9: den tomme livscyklus-boks står øverst på porteføljen, der er ingen top-10-opsummering, nyhedsarkiv har 8 "Placeholder:", og værdikæder er stadig ca. 17.800 tegn.

### Nice
- Omkostninger: tastefejlen "inventeret" er rettet. Nu står der "Det er ikke et beregnet ÅOP" ✅.
- periode.html er kort og ren og har risikolinje. AKK-tilstanden viser kun "Afkast vises efter 12 måneder" ✅.
- Entré på 375: tre døre og en klar fold, og "Sådan investerer du" står som knap i headeren ✅.

## 2026-10-16 00:41 CEST · cyklus 11 (main `fb68cd0`, delta efter merge af lane B/E/X)

Main er gået fra `1bc0d43` til `fb68cd0` (30 docs-filer ændret). Live er lig med main: invester trin 4 og fondens graf-takeaway kan ses live. Jeg har kørt Playwright på 27 sider ved 375 og 1280 px. Der er 0 sider med vandret scroll. Én konsolfejl i første kørsel: tema.html gav "Identifier 'data' has already been declared" og viste kun 214 tegn. Ved genkørsel med cache-buster rendererede siden fint (56 selskaber i Chips, 0 fejl). Det var sandsynligvis Pages-cache midt i en deploy. Hold øje med det.

### Lukket siden cyklus 10 ✅
- **Top 10 på porteføljen:** "Top 10 efter vægt pr. 1. jun. 2026" står nu på porteføljen.
- **Livscyklus-boksen er ikke længere tom.** Alle 345 selskaber er placeret og mærket "forslag fra offentlig industri/tema — afventer NDI".
- **Invester trin 4** linker nu til "officielle omkostningstal" (omkostninger.html).
- **Drawdown:** toppen er rettet til 18. feb. 2025, og der er en ny streg for "åben episode" med forklaring i figcaption og desc.
- **Fonden har en klar takeaway under grafen:** "Fonden steg +104,8 % i den valgte periode (22. sep. 2023 → 14. okt. 2026)" plus kildelinje. Det hjælper privat-personaen.

### MUST
- **ndi-perspektiv er fordoblet igen:** ca. 95.500 tegn, **66.900 px på 375** (31.300 i cyklus 10) og **303 "AI-udkast"-mærker** (139 før). Det er nu 150 linser i JSON-rækkefølge (jf. lane-B i STATUS). Siden kan ikke bruges på mobil, og mærkerne er støj. Gruppér efter tema/led med `<details>` eller filter, og brug ét AI-banner øverst i stedet for et mærke pr. felt.
- Uændret: "Mads følger"/"Konti Mads følger" (`js/x-feed.js:339`, `ndi-paa-x.html:86,109,163`).
- Uændret: "afventer"/"udfyldes" står synligt på fonden (ÅTD), fakta (×3), risici (×2), portefølje (×2), udforsk (×2), SoftBank (×2) og omkostninger.

### SHOULD
- **Livscyklus på porteføljen** bruger "Growth / GARP / Value" og "Pædagogisk model fra bogen". Det er jargon for privat-personaen. Brug danske etiketter (Vækst / Vækst til rimelig pris / Værdi), og forklar "bogen" (hvilken?) eller fjern henvisningen.
- **Udbytte vises stadig som "38.9 kr." og "38.0 kr."** på fonden og periode.html (engelsk punktum). Skriv `38,90 kr.`
- **Primær-nav på 375** har stadig kun Entré, Fonden, Porteføljen og Udforsk. Omkostninger ligger i footer-linkrækken (`js/app.js:290`) og som knap på fonden. FO-personaen skal stadig lede efter dem.
- **Små trykflader** er uændrede (tema ca. 114, ndi-perspektiv ca. 355 links under 24 px på 375).
- **om-data på 375** viser kun ca. 1.100 tegn, fordi alle 4 `<details>` er lukkede, mens de er åbne på desktop. Det er fint, men titlerne skal sige, hvad der er indeni ("Ordliste (87 ord)").
- Uændret: nyhedsarkiv har 8 "Placeholder:", og værdikæder er stadig ca. 18.000 tegn / 15.400 px på 375.

### Nice
- tema.html har nu "Kun med NDI-linse (27)" og teksten "Et selskab uden linse er ikke vurderet dårligere". Det er godt formuleret.
- Visuel variation: drawdown, tema og fonden har hver sit tydelige mønster. Træthed opstår kun på de lange liste-sider (ndi-perspektiv, værdikæder).

**Rettelse 00:45:** tema.html-fejlen var ikke Pages-cache. Det var en reel dobbelt `data`-binding efter lane-B-merge, og den er rettet i main `25b8b30`. Min genkørsel ramte den rettede deploy. Ingen handling nødvendig.

## 2026-10-16 00:55 CEST · cyklus 12 (main `822db42`, delta)

Siden cyklus 11 er main kun ændret af `25b8b30` (rettelsen af tema.html) og `822db42` (notes). Jeg har kørt Playwright på de samme 25 live-sider ved 375 og 1280 px. Alle svarer 200, og der er **0 konsolfejl**. tema.html renderer nu stabilt: 4.453 tegn på 375 og 5.758 på 1280. Der er 0 sider med vandret scroll og 0 billeder uden alt-tekst, og hver side har én h1. Pages er lig med main.

### MUST (uændret)
- **ndi-perspektiv:** ca. 95.500 tegn, 303 "AI-udkast"-mærker og 355 trykflader under 24 px på 375. Siden er stadig ikke brugbar på mobil (se cyklus 11).
- **"MADS FØLGER"-mærket spreder sig.** Udover SoftBank (×3) og ndi-paa-x står det nu på **tema.html?slug=chips (×4)**. Det sidder på X-kort med ticker-chips (NVDA, CRWV, NBIS). Kilden er den samme: `js/x-feed.js:339`. Når den linje rettes, lukker det på alle sider.
- "afventer"/"udfyldes" er stadig synligt på fonden (ÅTD), fakta, risici, omkostninger, portefølje, udforsk, SoftBank, temaer og tema.

### SHOULD (uændret)
- Udbytte står stadig som "38.9 kr." og "38.0 kr." (punktum) på fonden og periode.
- X-kort klippes stadig midt i ord ("this is an engineering…"), og der står "BREAKING:" på fonden, SoftBank og ndi-paa-x.
- Omkostninger er stadig ikke i primær-nav på 375.
- Små trykflader: udforsk 778, selskaber 637, portefølje 225 og tema 114 på 375.
- nyhedsarkiv har stadig "Placeholder:", og værdikæder er stadig ca. 18.000 tegn.

### Nice
- tema.html er stabil efter rettelsen, og "Kun med NDI-linse" virker.

## 2026-10-16 00:51 CEST · cyklus 13 (main `883e616`, delta: NDI-linse 150 → 217)

Siden cyklus 12 er der kun ændret i `docs/data/unique-metrics.json` (lane-B: +67 linser, 0 eksisterende ændret). Pages er lig med main (live JSON har 217). Jeg har kørt Playwright på 23 live-sider plus 5 selskabssider (SoftBank, TSMC, QuantumScape, Affirm, Spotify) ved 375 og 1280 px. Der er 0 konsolfejl og 0 sider med vandret scroll. (De 404'er i mit crawl skyldtes forkerte filnavne fra min side: fonden = index, portefølje = selskaber.)

### MUST
- **Tomme stubs over en udfyldt linse.** 58 af de 67 nye linse-selskaber (143 af alle 217) har ingen post i `company-profiles.json`. Øverst på fx TSMC står derfor "Hvilket problem løser det? **AI-udkast** – Beskrivelse mangler i udkastet", "Rolle i værdikæden **AI-udkast** –", "Produkter –" og "Kunder –". Længere nede er der en tom "Hold øje med **AI-udkast** –", mens linsen lige ovenover allerede har både "Hvad ejer man?" og "Hold øje med" udfyldt. Det ser ufærdigt ud for privatpersonaen, og AI-mærket står på tomt indhold. **Forslag:** brug linsens "Hvad ejer man?" som fallback i problem-feltet. Skjul tomme Rolle/Produkter/Kunder og den nederste "Hold øje med", når linsen findes.
- Uændret fra cyklus 12: ndi-perspektiv på mobil er vokset til ca. 133.000 tegn, 93.800 px og 437 "AI-udkast"-mærker på 375 (før ca. 95.500 tegn / 303). Gruppér efter tema eller led og fold sammen som standard. "MADS FØLGER": se compliance.
- "afventer"/"udfyldes" er stadig synligt på risici, temaer, tema, omkostninger, selskaber, fakta, ndi-perspektiv og selskabssider.

### SHOULD
- **TSMC står under "Andet / uklassificeret"** i "NDI-tema og plads i fonden", men linsen siger "Chips". Tabellen "Andre i Andet / uklassificeret" viser Hims & Hers, Upstart, Celanese, Newmont… under TSMC. Familieofficet vil undre sig. Det samme gælder First Solar, Caterpillar, Iridium m.fl. (lane-B's egne tag-noter). Brug linse-tagget som visningstema, når det findes, eller vis "Primært tema i data: Andet" med samme forklaring som linsen.
- **Rå datanavne i h1 og naboliste:** "Taiwan Semi Sp ADR" (linsen siger "Taiwan Semiconductor (TSMC)"), "United Microelectron-Sp Adr", "Tower Semicon In". Linsens `name` kan bruges som displayName.
- Typo: "Foundry : chips-produktion." (mellemrum før kolon).
- "Modenhed GARP" og "Livscyklus GARP" står to gange på samme side (sidebar + linse).
- Uændret: udbytte med punktum, X-kort klippes midt i ord, "BREAKING:", omkostninger er ikke i primær-nav på 375, små trykflader, "Placeholder:" i nyhedsarkiv.

### Nice / OK
- Naborækken virker på de nye led: TSMC → 6 i led 5 (Samsung, GlobalFoundries, Tower, Intel, UMC, Amkor). QuantumScape → Energi led 4. Spotify → led 12. Affirm ("Uden for AI-kæden") viser ingen række, som det skal.
- Linseteksterne er korte, konkrete og ærlige ("Navnet har intet med kvantecomputere at gøre", "sælger ikke selv chips").

## 2026-10-16 01:05 CEST · cyklus 14 (main `6592e79`, delta siden `883e616`)

Pages er lig med main (deploy 00:54 CEST, `laer/rebalancering.html` er live). Jeg har kørt Playwright på 28 live-sider ved 375 og 1280 og taget skærmbilleder af omkostninger, drawdown, rebalancering og ndi-paa-x ved 375. Ændret: omkostninger/fakta (lane-X: "den ene forskel"), ndi-paa-x (lane-X: direkte/tema-spor), drawdown (episoder som søjler), ny lær-side Rebalancering, idéer (+2 former), værdikæder (energi/rum "Hvad kan gå galt?"), selskab (forslag-mærke på tema), invester trin 3–5.

### MUST
- **ndi-paa-x.html er tom (regression, live og main).** Siden viser kun "Henter X-snapshot…". Konsol: `SyntaxError: The requested module './js/x-feed.js' does not provide an export named 'feedHitKind'`. Merge `6592e79` tog `ndi-paa-x.html` fra lane-X `591f500`, men ikke `docs/js/x-feed.js` (`feedHitKind` findes kun på `origin/lane-X`, linje 320). Ret: merge lane-X's `x-feed.js` (eller fjern importen). 0 h1 og 173 tegn på siden ved begge bredder. Det er demo-siden til morgen, så det er den vigtigste fejl i denne cyklus.
- Uændret: tomme stubs ("Beskrivelse mangler" / "–") over en udfyldt NDI-linse på de fleste linse-selskaber. ndi-perspektiv er stadig ca. 133.000 tegn på 375. "afventer"/"udfyldes" er synligt på 12 af 28 sider (ndi-perspektiv 18, nyhedsarkiv 8).

### SHOULD
- **Omkostninger, "den ene forskel" (375):** god idé, og det er ærligt ("ikke et ÅOP" står 8 gange). Men 0,08 procentpoint fylder nu en hel skærm med to skalaer og en forklaring på 60 ord, før man ser 1,49 %, som er det store tal. Den private persona spørger "hvad koster det i alt?" og får det mindste tal mest fremhævet. Overvej at fremhæve 1,49 % først og lade forskels-boksen være foldet sammen. "Ikke et ÅOP" kan stå én gang øverst og én gang ved tabellen.
- **Fakta gentager det samme 3 gange:** KPI-kort, sætningen "Begge klasser har SRI 5 af 7 …" og "Porteføljetransaktion er den eneste forskel …" står lige efter hinanden. Behold én.
- **Rebalancering:** siden er pædagogisk stærk (skyder og eksempel uden JS). Men "Bogens tommelfingerregel er højst ca. 1 % pr. teknologiselskab" står lige under "Over 1 %: 5" for fonden. Det ligner en selvmodsigelse, selvom afsnittet "Bogen og fonden siger ikke det samme" forklarer det længere nede. Flyt 1 %-sætningen ned i det afsnit. "ingen fylder mere end ca. 2 %" ved siden af "Største position 2,1 %" er ok, men skriv "ca. 2,1 %".
- **Drawdown, 375:** søjlerne/episoderne er en god variation. Banneret "Lige nu … −23,4 % under toppen fra 2. jun. 2026" er gult og står over grafen. Det er korrekt, men det er den første farvede sætning, en privat læser ser. Tilføj "Historisk, ikke en prognose" i samme linje.
- Uændret: udbytte med punktum ("38.9 kr."), X-kort klippes midt i ord, "BREAKING:", omkostninger er ikke i primær-nav på 375, små trykflader (udforsk 852, selskaber 635, ndi-perspektiv 505, portefølje 225 ved 375), "Placeholder:" i nyhedsarkiv.
- Omkostninger ved 375: når man scroller, er der et tomt sort bånd på ca. 60 px over logoet i den sticky header.

### Nice / OK
- 0 h-overflow på 28×2 sider. 0 konsolfejl undtagen ndi-paa-x. Alle sider undtagen ndi-paa-x har én h1.
- Invester trin 3–5 er nu almindeligt dansk ("Depot hos bank eller handelsplatform", "Køb og omkostninger" nævner kurtage).
- Selskab: forslag-mærket ("Primært tema … er et forslag fra udkastet (før: Andet) og afventer NDI-gennemgang") løser cyklus 13's TSMC/Andet-forvirring på en ærlig måde.
- Visuel variation: drawdown-søjler, omkostnings-skala med zoom, rebalancerings-skyder og idéer-varmekort er fire forskellige former. Ingen kort-træthed på de nye sider.

## 2026-10-16 01:08 CEST · cyklus 15 (main `6592e79`, ingen ændring siden cyklus 14)

Main og Pages er uændrede siden cyklus 14. Det her er en re-verifikation: Playwright på 22 live-sider ved 375 og 1280 plus SoftBank- og NVIDIA-selskabssiden, scrollet til bunden.

### MUST (stadig åben)
- **ndi-paa-x.html er stadig tom live**, ved 375 og 1280: 173 tegn, 0 h1 og `SyntaxError … x-feed.js does not provide an export named 'feedHitKind'`. `feedHitKind` findes kun på `origin/lane-X` (`2baf5cb`). lane-X er langt bagud i forhold til main (44 filer, −20k linjer i diff), så **merge ikke hele lane-X**. Tag kun `docs/js/x-feed.js` (cherry-pick/checkout af den ene fil) og tjek derefter, at selskab/tema/fonden stadig renderer X-kort. Det er den vigtigste rettelse før morgen-demoen.
- Uændret: tomme stubs på linse-selskaber. ndi-perspektiv er 133.542 tegn ved 375 med 18 × "afventer".

### SHOULD (uændret fra cyklus 14)
- Omkostninger: 1,49 % bør stå før "den ene forskel"-boksen. Fakta gentager SRI/forskel tre gange. Rebalancering: 1 %-reglen står lige under "Over 1 %: 5". Drawdown-banneret mangler "Historisk, ikke en prognose".
- Selskabssider (SoftBank/NVIDIA): X-kortene viser nu "DIREKTE TRÆF · Vist fordi: …". Det er god gennemsigtighed, men kortene klippes stadig midt i ord, og der står "BREAKING" 2 gange på SoftBank.

### OK
- 0 h-overflow og én h1 på alle sider undtagen ndi-paa-x. Ingen andre konsolfejl.

## 2026-10-16 01:15 CEST · cyklus 16 (main `7b7734a`, delta siden `6592e79`)

Pages er lig med main (build `7b7734a`, 23:08 UTC). Jeg har kørt Playwright på 34 live-sider ved 375 og 1280 (nyt: lær/risikoklasse, NVIDIA, sammenlign a/b, hvorfor-mange-aktier, udbytte-vs-akk, faq-mangler-aktie) og taget skærmbilleder ved 375 af risikoklasse, rum-quizzen og TSMC. Delta: ny lær-side Risikoklasse 5, ordliste 95 begreber, værdikæder/rum ("Hvem arbejder hvor højt?", "Tjek dig selv", læse-rute 8 stop), NDI-linse 217 → 269, embed-graf, mindre tekstrettelser.

### MUST
- **ndi-paa-x.html er stadig tom live** (3. cyklus): 173 tegn, 0 h1, `SyntaxError … x-feed.js does not provide an export named 'feedHitKind'`. `docs/js/x-feed.js` er ikke ændret siden `6592e79`. Ret som i cyklus 15: tag kun `docs/js/x-feed.js` fra lane-X.
- **Risikoklasse-siden modsiger risici/fakta** (se compliance MUST 6). Lær-siden siger "klasse 5 svarer til udsving på 20 til 30 % om året", og risici viser "Risikoklasse 5/7 … Hvad klassen betyder →" lige over "Volatilitet (ann.) 32,46 %". En FO-læser regner straks klasse 6. Forklar forskellen på stedet.
- **Tomme stubs vokser med linserne:** 175 af 269 linse-selskaber har ingen post i `company-profiles.json` (før 143/217). TSMC (`US8740391003`) viser stadig "Beskrivelse mangler i udkastet", "Rolle i værdikæden –", "Produkter –", "Kunder –" med AI-mærke over en udfyldt linse. Det samme forslag gælder: brug linsens "Hvad ejer man?" som fallback og skjul de tomme felter.
- ndi-perspektiv er nu ca. 165.000 tegn ved 375 (før 133.500) og har 597 små trykflader. Gruppér og fold sammen som standard.
- "afventer"/"udfyldes" står 61 gange på 12 sider. Uændret.

### SHOULD
- **Rum-quizzen (375):** god og rolig form. Feedbacken ("Ikke helt." + link) er klar, og der står "Intet gemmes" ✅. Men ved hop til `#sp-quiz` dækker den sticky fanebjælke (Flaskehalse/Rum/Filosofi) overskriften. Tilføj `scroll-margin-top` på `section[id^=sp-]`. Forkert valgt svar har kun ✗ og en stiplet kant. Det er ok, men læg også farve eller tekst på.
- **Risikoklasse-siden (375):** pædagogisk stærk (skyder, ikke-JS-fallback, "Hvad klassen ikke siger", "Klasse 1 er ikke risikofri"). Til gengæld er det første kort en lang pil-kæde på 4 trin før skyderen. Skyderen kunne flyttes op som første element.
- Om-data ved 375 folder grupperne sammen (1.245 tegn mod 19.367 ved 1280) ✅. Det er den rigtige løsning for mobil.
- TSMC hedder stadig "Taiwan Semi Sp ADR" i h1, og "Foundry : chips-produktion." har stadig mellemrum før kolon.
- Uændret: omkostninger skal have 1,49 % før "den ene forskel", fakta siger SRI/forskel tre gange, drawdown-banneret mangler "Historisk, ikke en prognose", "BREAKING" står på 2 sider, "Placeholder:" står ×8 i nyhedsarkiv, og omkostninger er ikke i primær-nav på 375.

### Nice / OK
- 0 h-overflow på 34×2 sider. 0 konsolfejl undtagen ndi-paa-x. Én h1 på alle sider undtagen ndi-paa-x.
- Visuel variation: højdebånd, quiz og risiko-skyder er tre nye former og ikke flere kort. Ingen kort-træthed.
- Sammenlign: "Afkast vises efter 12 måneder fra 5. dec. 2026" med tidslinje er tydeligt for privatpersonaen.

## 2026-10-16 01:25 CEST · cyklus 17 (main `7b7734a`, ingen ændring siden cyklus 16)

Main er uændret, og Pages er stadig build `7b7734a` (last-modified 23:08 UTC). Dette er en re-verifikation: Playwright på 23 live-sider ved 375 og 1280, scrollet til bunden.

### MUST (stadig åbne)
- **ndi-paa-x.html er stadig tom live** (4. cyklus): 173 tegn, 0 h1, `SyntaxError … x-feed.js does not provide an export named 'feedHitKind'`. Rettelsen er den samme: tag kun `docs/js/x-feed.js` fra lane-X, ikke hele lane-X. Det er den eneste side med konsolfejl.
- Risikoklasse-siden modsiger stadig risici/fakta: "klasse 5 = 20–30 %" mod "Vol 32,46 %". Se compliance MUST 6.
- TSMC viser stadig "Beskrivelse mangler i udkastet" (1×). 175/269 linse-selskaber har stadig ingen profil.
- ndi-perspektiv er ca. 165.500 tegn ved 375 og har 42 × "afventer/udfyldes". Uændret.

### SHOULD (uændret fra cyklus 16)
- Omkostninger: sæt 1,49 % før "den ene forskel", og læg omkostninger i primær-nav på 375. Drawdown-banneret mangler "Historisk, ikke en prognose". "BREAKING" ×2 på fonden og SoftBank. Rum-quizzen mangler `scroll-margin-top`. TSMC's h1 er "Taiwan Semi Sp ADR".

### OK
- 0 h-overflow og én h1 på 22 af 23 sider ved begge bredder. Om-data folder sig stadig sammen på 375 (1.245 tegn) ✅.

## 2026-10-16 01:48 CEST · cyklus 18 (main `299e7a2`, 48 nye commits)

Pages er bygget fra `299e7a2` (last-modified 23:21 UTC, `g-aaop` er live). Jeg har kørt Playwright på 26 live-sider ved 375 og 1280 og scrollet til bunden. Main er merget ind i lane-R. Jeg har ikke brugt `reset --hard`, fordi lane-R har note-commits, som ellers kræver force-push.

### MUST
- **ndi-paa-x.html er stadig tom live** (5. cyklus): 173 tegn, 0 h1 og `x-feed.js does not provide an export named 'feedHitKind'`. Ingen af de 48 commits rører filen. Rettelsen er stadig at tage kun `docs/js/x-feed.js` fra lane-X. Det er den eneste side med konsolfejl.
- **Stubs vokser hurtigere end profiler:** NDI-linsen er gået fra 269 til 310 selskaber (lane-B), men profilerne er stadig 98. Nu har **215 af 310** linse-selskaber ingen profil (før 175/269). TSMC viser stadig "Beskrivelse mangler i udkastet". Sæt en pause på linse-udvidelsen, til profilerne følger med, eller skjul beskrivelsesfeltet, når der ikke er nogen profil.
- Risikoklasse siger "klasse 5 dækker udsving fra 20 til 30 % pr. år", men risici og fakta viser "Volatilitet (ann.) 32,46 %". Uændret. Se compliance MUST 6.

### SHOULD
- **ndi-perspektiv er nu ca. 192.000 tegn ved 375** (var 165.500), og "afventer/udfyldes" står 53 gange. Siden vokser med hver linse-runde. Fold temagrupperne sammen som standard, ligesom om-data gør på mobil.
- Drawdown: søjlehøjden følger nu dybden ✅, og median/middel har en forklaring ✅. Men banneret mangler stadig "Historisk, ikke en prognose" (0 hits på siden). "Halvdelen er dybere" under medianen er korrekt, men kan læses som "halvdelen af tiden". Skriv "halvdelen af faldene var dybere".
- Uændret: "BREAKING" ×2 på fonden og SoftBank, "Placeholder" ×7 i nyhedsarkiv og TSMC's h1 "Taiwan Semi Sp ADR". "MADS FØLGER" står nu også på tema energi (se compliance).

### Rettet siden cyklus 17 ✅
- Omkostninger: 1,49 % står nu øverst før forskellen. Rum- og energi-quiz har `scroll-margin-top:110px`.
- Ordlisten: ÅOP, Før skat, Anbefalet investeringsperiode, Vækst- og sektorrisiko, Ingen markedsbeskyttelse, Boble, Omsætning og Indtjening (103 begreber). Risici linker KID-nøglerisici til ordlisten. Det er godt for privatpersonaen.

### Persona-linser
- **Privat:** Idéer «Hvad står der i tallet?» (aktiekurs ± valuta + udbytte − løbende omkostninger = fondens afkast, derefter kurtage, skat og købsdato = dit afkast) er den bedste forklaring på siden af, hvorfor "+104,8 %" ikke er brugerens eget tal. Lav et link til den fra fondens afkastkort og fra omkostninger.
- **Familiekontor:** «Tre ure på samme side» (NAV 14. okt., beholdning 1. jun., KID 14. aug.) svarer direkte på FO-spørgsmålet "hvor gamle er tallene?". Link den fra fakta/om-data datakilder. Der mangler stadig et samlet omkostningstal fra KID (se compliance).
- **Visuel variation:** tidslinje med tre spor, lagstak med ±-tegn og pil kontra loop på sammenlign er tre nye former, ikke flere kort ✅. Idéer har nu 11 former. Overvej en indholdsfortegnelse øverst, så siden ikke bliver én lang scroll på 375.

### OK
- 0 h-overflow på 26×2 sider. Én h1 på 25 af 26 sider. Om-data folder sig sammen på 375 ✅. Entréen er uændret og rolig (2.804 tegn).

## 2026-10-16 01:40 CEST · cyklus 19 (main `3103bf8`, 4 nye commits)

Pages er bygget fra `3103bf8` (last-modified 23:27 UTC). Jeg har kørt Playwright på 23 live-sider ved 375 og 1280 og scrollet til bunden. Main er merget ind i lane-R (ingen reset/force-push). NB: tidsstemplet på cyklus 18 (01:48) var et skøn. Dette er wall-clock.

### Rettet ✅
- **ndi-paa-x virker igen** (`0e653d9`, x-feed.js fra lane-X). 5.989 tegn, én h1, 0 konsolfejl ved 375 og 1280. Dørene (SoftBank, Nvidia, Chips/AI) med citat og "Seneste · @konto · dato" er en god form. Fodnoten "kan være forældede, ufuldstændige eller subjektive … erstatter ikke KID" er klar.
- 0 konsolfejl og 0 h-overflow på alle 23×2 sider. Én h1 overalt.

### MUST
- **Stubs:** uændret. 215 af 310 linse-selskaber mangler profil, og TSMC viser stadig "Beskrivelse mangler i udkastet". Samme forslag: brug linsen som fallback, eller skjul de tomme felter.
- **SRI 5 kontra vol 32,46 %** står stadig på risici og fakta (1 hit hver), mens risikoklasse siger "klasse 5 dækker 20 til 30 % pr. år". Se compliance MUST 6.

### SHOULD
- **Idéer «To klasser, samme temaer» (ny, 12. form):** prikdiagrammet er roligt og letlæst ved 375. Men teksten skaber to spørgsmål, som en FO-læser vil stille:
  1. "PMINDI 345 selskaber / PMINDIAKK 320 selskaber" og forskellige vægte. To *andelsklasser* i samme afdeling har normalt én fælles portefølje. Hvis de er to porteføljer, så sig hvorfor (fx forskellig startdato eller størrelse). Ellers ligner det en datafejl.
  2. "Forskellen mellem klasserne ligger derfor især i udbyttet" passer ikke helt med omkostninger, der viser porteføljetransaktion 0,64 % mod 0,72 %. Tilføj "og en lille forskel i transaktionsomkostninger →" med link.
  - Sprog: "ingen tema skiller sig" → "intet tema skiller sig".
- **ndi-perspektiv** er ca. 192.000 tegn ved 375, med 53 × "afventer" og 623 AI-udkast-mærker. Uændret. Fold temagrupperne sammen som standard.
- **ndi-paa-x:** "MADS FØLGER" står 10 gange, og "BREAKING" 2 gange (også 2 gange på fonden og SoftBank). Mærket fylder mere end indholdet. Skriv "Fulgt konto" i små bogstaver én gang pr. kort, og fjern "BREAKING:" fra citat-uddraget.
- Uændret: drawdown "Halvdelen er dybere" → "halvdelen af faldene var dybere". Nyhedsarkiv har "Placeholder" ×8. TSMC's h1 er "Taiwan Semi Sp ADR". Idéer mangler en indholdsfortegnelse (12 former nu).

### Persona-linser
- **Privat:** «To klasser, samme temaer» svarer godt på "hvilken klasse skal jeg vælge?" uden at anbefale ✅. Link fra laer/udbytte-vs-akk er der ✅.
- **Familiekontor:** 345/320 uden forklaring svækker tilliden til datalaget. Det skal forklares, før siden vises. Omkostninger: stadig intet samlet KID-tal (se compliance).
- **Visuel variation:** prikdiagram (håndvægt) er en ny form ✅. Ingen kort-træthed.

### OK
- Entréen er uændret (2.804 tegn). Om-data folder sig sammen på 375 (1.245 tegn). Top-10 på portefølje: "pr. 1. jun. 2026 · forsinket snapshot. Eksponering, ikke anbefaling" ✅.

## 2026-10-16 01:35 CEST · cyklus 20 (main `a664f4f`, delta: `75a87c2` selskab-empty-state)

Pages er bygget fra `75a87c2` (last-modified 23:28 UTC). Jeg har kørt Playwright på 21 live-sider ved 375 og 1280 med scroll, plus 3 selskabssider (SoftBank, TSMC, Lumentum) via `?isin=`. Resultat: 0 konsolfejl, 0 h-overflow og én h1 overalt. Tegntallene er de samme som i cyklus 19, så kun selskab er ændret.

### Rettet ✅ (delvist)
- **"Beskrivelse mangler i udkastet" er væk** (0 hits). Det nye empty-state lyder "Profiltekst mangler endnu for dette selskab (NDI-linse kan stadig findes nedenfor)." Det er ærligt og peger videre. Linsen findes også nedenfor på TSMC ✅.

### MUST
- **Empty-state er stadig mærket som AI.** På TSMC og Lumentum står "AI-udkast"-badget på overskriften "Hvilket problem løser det?", og under den står "Udkast: kort beskrivelse genereret med AI og ikke gennemgået af NDI". Men der er ingen beskrivelse. Det mærker tomrum som AI-indhold, og det forvirrer. Vis `AI_BADGE` og `AI_NOTE` kun, når `f('summary')` findes.
- **Stubs findes stadig længere nede:** "Rolle i værdikæden – / Produkter – / Kunder –" på TSMC og Lumentum. 252 af 347 ISIN'er i portfolio.json har ingen profil. Skjul felter med "–", eller fold dem ind i én linje: "Profil kommer".
- **Fallback findes allerede i data:** TSMC's linse har "Hvad ejer man? Kontraktfremstilling af chips · Verdens største chipfabrik på kontrakt …". Den tekst kan bruges som kort beskrivelse (med "fra NDI-linsen"), så siden ikke åbner med et tomt felt. Lille ændring, stor effekt for TSMC/Nvidia-klassen.
- SRI 5 mod vol 32,46 % er uændret (se compliance).

### SHOULD
- TSMC: h1 er stadig "Taiwan Semi Sp ADR", mens unique-metrics siger "Taiwan Semiconductor (TSMC)". Brug det pæne navn i h1 og behold ticker/ADR som undertitel.
- TSMC: "Foundry : chips-produktion." har et mellemrum før kolon (fra multi-tags.json).
- Uændret fra cyklus 19: idéer «To klasser» (345/320 selskaber, omkostningsforskel, "intet tema"). ndi-perspektiv er ca. 192.000 tegn med 53 × "afventer". ndi-paa-x har "MADS FØLGER" ×10 og "BREAKING" ×2 (SoftBank: 3 / 2). Drawdown-formuleringen, nyhedsarkivets "Placeholder" og idéernes indholdsfortegnelse er også uændrede.

### Persona-linser
- **Privat:** det nye empty-state er venligere end "mangler i udkastet", men når en investor klikker på TSMC (et kendt navn), skal der stå *noget* øverst. Brug linse-fallback.
- **Familiekontor:** et AI-mærke på tomt indhold svækker tilliden til mærkningen generelt. Ret det før demo.
- **Visuel variation:** uændret, ingen ny træthed.

### OK
- Entré 2.804 tegn. Om-data folder sig sammen på 375 (1.245 tegn). Top-10: "pr. 1. jun. 2026 · forsinket snapshot" ✅. SoftBank-profilen har kilde + "tjekket mod kilden 12. okt. 2026" ✅.

## 2026-10-16 01:40 CEST · cyklus 21 (main `a664f4f`, intet docs-delta)

main er uændret siden cyklus 20, og Pages = `75a87c2` (docs er identiske). Jeg har kørt Playwright live på 24 sider ved 375 og 1280 med scroll, inkl. `?view=fonden/portefolje/udforsk`, laer/risikoklasse, periode og selskaber. Resultat: 0 pageerrors, 0 h-overflow og én h1 overalt. Tegntal: entré 2.804, fonden 7.075, udforsk 22.510 og ndi-perspektiv ca. 192.000 (uændret).

### MUST (nyt fund)
- **Invester har tre "trin 4"** (`docs/invester.html:47/50/53`): "4. Ordre & omkostninger", "4. Køb og omkostninger" og "4. Køb og omkostninger" igen, med næsten samme tekst. Det er en merge-rest fra `299e7a2` (lane-C). Det er den side, privatpersonaen lander på fra knappen "Sådan investerer du" i topbaren, så den er synlig. Behold én version: den sidste (med "efter løbende omkostninger, før skat") plus linket "officielle omkostningstal" fra den første.

### MUST (uændret)
- Selskab: "AI-udkast" står over et tomt summary-felt (TSMC, Lumentum). Stubs med "–" (Rolle/Produkter/Kunder). Brug linsens "Hvad ejer man?" som fallback.
- SRI 5 mod vol 32,46 % (se compliance).

### SHOULD
- **Footer-term:** "Central Information Dokument" (`index.html` ×2, `js/data.js`) er hverken KID-forordningens danske navn eller god dansk. Skriv "Dokument med central information (KID)", ligesom invester trin 1 gør.
- **Fonden/PMINDIAKK-toggle** er pæn: "Afkast vises efter 12 måneder … fra december 2026" ✅. Men "Seneste NAV 98,40" står som stort tal (se compliance #4).
- Uændret: TSMC's h1 "Taiwan Semi Sp ADR". "Foundry :" har et mellemrum før kolon. Idéer «To klasser» skal forklare 345/320 selskaber. ndi-perspektiv bør foldes sammen. "BREAKING:" står ×2 på fonden og ndi-paa-x. "MADS FØLGER" står ×7 på ndi-paa-x (var 10; feedet roterer) og ×3 på SoftBank. Nyhedsarkiv har "Placeholder" ×8. Drawdown-formuleringen og idéernes indholdsfortegnelse er også uændrede.

### Persona-linser
- **Privat:** flowet entré → "Sådan investerer du" → trin 1–5 er godt, og "Tre spørgsmål før du investerer" er stærkt og ikke-rådgivende ✅. Tre ens trin 4 får siden til at se ufærdig ud lige før KID-tabellen. Ret det før demo.
- **Familiekontor:** stadig intet samlet KID-omkostningstal på invester eller omkostninger. Ved 375 viser fonden KPI-gitteret (afkast +104,8 %, CAGR +26,4 %) før nogen omkostningslinje, ud over "efter løbende omkostninger" i ingressen.
- **Visuel variation:** ingen ændring, ingen ny træthed.

### OK
- Mobil 375: ingen h-overflow på 24 sider. Topbaren har "Sådan investerer du" som primær CTA ✅. Top-10/portefølje: "pr. 1. jun. 2026" ×4 ✅.

## 2026-10-16 01:43 CEST · cyklus 22 (main `a664f4f`, intet docs-delta)

main er uændret siden cyklus 20, og Pages = `75a87c2`. Persona- og krav-filerne er uændrede siden 23:42. Jeg har kørt Playwright live ved 375 med scroll på 17 sider (entré, fonden, portefølje, udforsk, vaerdikaeder, drawdown, risici, SoftBank, temaer, invester, om-data, omkostninger, fakta, sammenlign, ndi-paa-x, idéer og nyhedsarkiv). Resultat: 0 pageerrors, 0 h-overflow, én h1 overalt og 0 billeder uden alt. Tegntallene er identiske med cyklus 21 (entré 2.804, fonden 7.075, udforsk 22.510), så der er ingen regression.

### MUST (uændret, re-verificeret)
- Invester har tre "trin 4" (merge-rest). Behold én.
- Selskab: "AI-udkast" står over et tomt felt, og der er stubs med "–". Brug linsens fallback.
- SRI 5 mod vol 32,46 % (se compliance).

### SHOULD (nyt)
- **Lille tekst på vaerdikaeder ved 375:** 14 tekstelementer er under 11 px. Det er især flaskehals-tags ("Begyndende flaskehals", "Ingen tydelig flaskehals" i 10 px) og "Det ændrer sig · baggrund" (10,5 px). For privatpersonaen (55+) er det for småt. Hæv til mindst 12 px på mobil. Fonden og fakta har 3 elementer hver, risici og omkostninger 2.
- **Omkostninger i læseflowet:** ordet "omkostning" optræder slet ikke i renderet tekst på portefølje, udforsk, vaerdikaeder, drawdown, temaer, sammenlign og nyhedsarkiv. På fonden kommer det tidligt (tegn 266) ✅. For familiekontor-personaen bør sammenlign i det mindste have en linje: "Løbende omkostninger: se KID".

### SHOULD (uændret)
- "Central Information Dokument" i fodnoten. TSMC's h1 "Taiwan Semi Sp ADR". "Foundry :". Idéer «To klasser» (345/320). ndi-perspektiv bør foldes sammen. "BREAKING:" ×2 på fonden, ndi-paa-x og SoftBank. "MADS FØLGER" ×7 på ndi-paa-x og ×3 på SoftBank. Nyhedsarkiv har "Placeholder".

### Persona-linser
- **Privat:** ingen ændring. Lille tekst på vaerdikaeder er den nye mobil-irritation.
- **Familiekontor:** intet samlet KID-omkostningstal, og sammenlign nævner ikke omkostninger.
- **Visuel variation:** uændret.

## 2026-10-16 01:50 CEST · cyklus 23 (main `ff29ec5` = `a664f4f` + noter, intet docs-delta)

main er uændret i docs/ siden `75a87c2`, og Pages er stadig samme build (last-modified 15. okt. 23:37 GMT). Lane-R indeholder allerede origin/main, så jeg har ikke lavet `reset --hard`, fordi det ville kassere cyklus 21–22 lokalt. Persona- og krav-filerne er uændrede siden 23:43. Denne gang har jeg kørt nye vinkler: desktop 1280 med Playwright og scroll på 20 sider, KID-PDF'erne og omkostninger-siden ord for ord. Resultat: 0 pageerrors, 0 h-overflow, én h1 og `lang="da"` overalt, og 0 knapper eller formularfelter uden navn. (Portefølje gav 148 hits i første kørsel, men det var sorteringsknapper med tekst, altså et falsk positiv.)

### MUST (nyt)
- **Omkostninger viser ikke KID'ets samlede tal, selv om det står i den KID, siden linker til.** Begge KID'er (produktionsdato 2026-08-14) har "Årlig omkostningsmæssig konsekvens" ved exit efter 5 år: **2,79 % (PMINDI) og 2,85 % (PMINDIAKK) hvert år**. Ved exit efter 1 år er det 2,63 %/2,71 % (DKK 2.630/2.710 på 100.000 kr.). Siden skriver i dag "Tomme felter = udfyldes af NDI" og nægter at lægge satser sammen. Det er korrekt, men så er det netop KID-tallet, der skal stå øverst, med kilde og dato. Det lukker familiekontor-personaens MUST, som har stået åben siden de første cyklusser. Forslag: én KPI-linje "Omkostninger pr. år ifølge KID (5 år): 2,79 % / 2,85 %", et link til KID og teksten "Ikke et ÅOP. Kurtage og depot kommer oveni".
- **Label uden tal:** under hver klasse står "Forventede samlede omkostninger i indeværende regnskabsår (Fundmarket)", men der er intet tal efter. Det læses som en tom stub. Sæt tallet ind (1,49 % + 0,64 %/0,72 % ifølge KID-opdelingen), eller fjern labelen.

### SHOULD (nyt)
- **"Øvrige løbende 1,49 %" er misvisende.** I KID'et hedder posten "Forvaltningsgebyrer og andre administrations- eller driftsomkostninger". "Øvrige" får hovedposten til at lyde som en restpost. Brug KID'ets ord, eller skriv "Forvaltning og administration".
- **"Den ene forskel"-blokken** (0,08 procentpoint med en forstørret skala) fylder mest på siden, men er den mindst relevante oplysning for en privatperson. Flyt den under KID-tallet og tabellen.

### MUST/SHOULD (uændret, re-verificeret på desktop)
- Invester har tre "trin 4". Selskab viser "AI-udkast" over et tomt felt og stubs med "–". SRI 5 mod vol 32,46 % (se compliance). Lille tekst på vaerdikaeder ved 375. "Central Information Dokument". "BREAKING:" / "MADS FØLGER". Nyhedsarkiv har "Placeholder".

### Persona-linser
- **Privat:** omkostninger-siden er grundig, men svarer ikke på "hvad koster det mig om året?". KID-tallet 2,79 % er svaret.
- **Familiekontor:** samme punkt. Med KID-tallet kan FO sammenligne direkte med andre UCITS. Uden det skal de selv åbne PDF'en.
- **Visuel variation:** uændret, ingen ny træthed.

### OK ✅
- Alle 5 eksterne KID-/prospekt-links svarer 200 (2 KID-PDF'er, 2 Fundmarket-sider, fællesprospekt 24.10.2025). SRI 5/7 og 5 års anbefalet periode på siden stemmer med KID.

## 2026-10-16 02:00 CEST · cyklus 24 (main `90e7de8`, intet docs-delta)

main er uændret i docs/ siden `75a87c2`. Pages er genbygget kl. 23:49 GMT, men kun på grund af note-commits. lane-R indeholder allerede origin/main, og jeg har ikke lavet `reset --hard`, fordi det ville kassere cyklus 23, som allerede er pushet. Persona- og krav-filerne er uændrede siden 23:43. Denne gang har jeg kigget på de sider, der sjældent bliver tjekket: embed, de 5 laer-sider, periode, kort, selskaber, tema, vaerdikaede og ndi-perspektiv. Jeg har kørt dem ved **320 px** med Playwright live (20 sider) og tjekket alle interne links. Resultat: **1.007 unikke interne links svarer alle 200** ✅. Der er 0 pageerrors, én h1 og et skip-link på alle sider.

### MUST (uændret)
- Invester har tre "trin 4". Selskab viser "AI-udkast" over et tomt felt og stubs med "–". Omkostninger mangler KID-tallet 2,79 %/2,85 % (se cyklus 23). SRI 5 mod vol 32,46 %.

### SHOULD (nyt)
- **Periode-siden har intern jargon.** Eyebrow'en hedder "PERIODE · DYB SIDE" (`periode.html:65`), og knappen på fonden hedder "YTD dyb side →" (`app.js:418`). Kort skriver "År / ÅTD dyb side". "Dyb side" er bygge-sprog. Skriv "Afkast for 2025" og "Se år til dato →". Brug også ÅTD eller "år til dato" konsekvent, ikke "YTD" (periode viser "YTD: +4,0 %").
- **Periode har to "← Fonden"-links** i headeren ved 320, og der er ingen "Lær"/"Invester" i navigationen.
- **Decimalpunktum i udbytte:** "Udbytte PMINDI (ex-dato) 38.9 kr." og "38.0 kr." står på periode. Det skal være "38,90 kr." med dansk format.
- **2023 står som et helt år** ("2023: +16,7 %"), selv om serien først starter 22. sep. 2023. Skriv "2023 (fra 22. sep.)" eller fjern tallet (se compliance #10).
- **Tema chips overflower ved 320:** `span.x-says-n` "Viser 3 direkte og 1 tema · 8 i alt" har `white-space:nowrap` (`x-feed.js:121`), og scrollWidth er 327. Tillad ombrydning. Det er ikke et problem ved 375.
- **Overskriftsspring på vaerdikaede.html** (h2→h4 eller lignende, 1 spring). Det er en lille tilgængelighedsfejl.

### Nice
- **Ingen `meta description`** på 19 af 20 undersider. Kun entréen har en. Delte links (LinkedIn/Slack) viser derfor kun og:title. Giv i det mindste invester, omkostninger, fonden og drawdown en beskrivelse.
- Embed-grafen ignorerer `?periode=1m` og viser "Hele perioden" ✅ (godt for compliance). Men den har ingen links til KID, omkostninger eller fonden, kun "Undersøg porteføljen" og "Se største fald" (se compliance #11).
- ndi-perspektiv er på 191.763 tegn renderet tekst. Det er tungt på mobil og bekræfter forslaget om at folde den sammen.

### Persona-linser
- **Privat (55+):** periode-siden er nyttig ("hvad gav fonden i 2025?"), men "dyb side", "YTD" og "38.9 kr." virker uprofessionelt. Laer-siderne (FAQ, udbytte-vs-akk og forsinket beholdning) er rolige og klare ✅.
- **Familiekontor:** ville bruge embed og periode til intern rapportering. Begge mangler en kilde til omkostninger og et link til KID. Kalenderårstabellen bør vise 12-måneders perioder.
- **Visuel variation:** laer og periode er enkle tekstsider, som giver en god pause efter fonden og udforsk. Ingen træthed.

## 2026-10-16 01:57 CEST · cyklus 25 (main `90e7de8`, intet docs-delta)

main/docs og Pages er uændrede. Live ved 375 er der ingen regression (16 sider: 0 fejl, 0 overflow). Denne cyklus er et **for-merge-kig på lane-grenene**.

### MUST (uændret på main)
- Invester har stadig tre "4."-trin (`invester.html:47/50/53`: "Ordre & omkostninger" + 2× "Køb og omkostninger"). Mit tidligere tjek for "trin 4" fangede dem ikke, men de er der. Det er ikke rettet på nogen lane-gren.
- Omkostninger mangler KID-tallet (se compliance 9). "AI-udkast" over tomt felt og stubs på selskab.

### SHOULD (nyt, fra lane-grene)
- **lane-X omkostninger:** "Ikke et ÅOP" står 8 gange i den nye kode, og "Den ene forskel" (0,08 pp, 80 kr. på 100.000 kr.) bliver endnu mere fremtrædende med en forstørret skala og "receipt-gap". For en privatperson er sidens hovedbudskab stadig "forskellen er lille", ikke "det koster ca. 2,8 % om året". Vend rækkefølgen: KID-tal → postsatser → forskellen mellem klasserne. "ØVRIGE LØBENDE" er uændret (se cyklus 24: brug KID'ets ord).
- **lane-X ndi-paa-x:** de tre spor ("Konti Mads følger", "NDI-konti", "Andre opslag") er en klar forbedring ✅. Tagget "Mads følger" pr. opslag bør dog sige "Fra en konto, Mads følger", ellers læses det som "Mads følger [dette selskab]".
- **lane-C indre-vaerdi.html:** god og rolig. ".m"-grid'et med `grid-template-columns:11em 1fr 8.5em` får sit eget mobil-breakpoint ved 520 ✅. Lille faglig præcisering: "Nye penge … værdien pr. andel gør ikke [ændre sig]" passer kun uden emissionstillæg/udtrædelsesfradrag. Tilføj "(bortset fra små tillæg og fradrag, se omkostninger)".
- **lane-C ideer.html:** koncentrationskurven ("345 vægte lagt sammen", "88 til halvdelen") er en ny visuel form. Den tilføjer variation uden træthed ✅.
- **lane-X data/x-posts.json `callCountNote`:** "Andet/Tredje/Fjerde/Femte poleringspas samme dag: stadig ingen nye kald" er log-støj i en datafil, der serveres offentligt. Flyt det til notes/.

### Persona-linser
- **Privat:** lane-C's lær-sider (indre værdi, læs grafen) giver præcis den baggrund, som persona-filen efterspørger ✅. Omkostninger svarer stadig ikke på "hvad koster det mig?".
- **Familiekontor:** lane-C's SRI-forklaring fjerner et oplagt spørgsmål i due diligence ✅. Omkostninger (KID-tal) og embed (KID/SRI) er stadig hullerne.
- **Visuel variation:** ingen ny træthed. Lane-A tilføjer en modenhedstrappe og risikokort på vaerdikaeder, og det er efterhånden mange kort-typer på én side. Hold øje efter merge.

## 2026-10-16 02:05 CEST · cyklus 26 (main `90e7de8`, intet docs-delta)

main/docs og Pages er uændrede (Last-Modified 23:49 GMT). Live-regression ved 375 blev kørt i cyklus 25 og er ikke gentaget. Persona-, krav- og idéfilerne er uændrede. Fokus i denne cyklus er de nye lane-commits efter 01:57: X `b58126a`, C `74e42c4`, A `2e5fe11`, B `28190f5`, D `e3c0330` og E `29388e6`.

### MUST (uændret på main)
- Invester har tre "4."-trin. Selskab har "AI-udkast" over et tomt felt. Omkostninger mangler KID-tallet 2,79 %/2,85 %.

### SHOULD (nyt, fra lane-grene)
- **lane-X fakta.html "Ens i begge"-strip:** "SRI 5 af 7 · Horisont 5 år · Øvrige løbende 1,49 %". "Øvrige løbende" er nu kopieret til endnu en side. Brug KID'ets ord ("Forvaltning og administration") og sæt KID-totalen ved siden af. Ellers ser 1,49 % ud som den samlede pris.
- **lane-X fakta/omkostninger:** "Ikke et ÅOP" står 8 gange på omkostninger og 4 gange på fakta. Én forklaring pr. side er nok. Gentagelsen virker defensiv over for en privat læser.
- **lane-X x-door-score** (store serif-tal på 34 px for antal hits) tilføjer endnu en tal-plakat. Kombineret med "80 kr"-plakaten på omkostninger begynder plakatformen at gå igen på tværs af siderne (visuel træthed, lav).
- **lane-C ideer «To klasser, samme temaer»:** klar og rolig ✅. "intet tema skiller sig mere end 1,6 procentpoint ud" er godt konkret. Indholdsfortegnelsen med 12 former hjælper ✅.
- **lane-C møntspil** (100 → 150 → 90 kr.) er korrekt regnet og pædagogisk stærk for persona privat ✅.
- **lane-A rum-tråde:** Musk kun via citat med kilde og "ikke NDI's forventning og ikke en prognose" ✅. vaerdikaeder har nu 9-stops læse-rute + quiz + modenhedstrappe + risikokort + trådediagram. Det er mange former på én side, så tjek ved 375 efter merge, at læse-ruten står øverst.

### Nice
- lane-X `callCountNote` vokser ("Sjette poleringspas samme dag …"). Det er stadig log-støj i en offentlig datafil.

### Persona-linser
- **Privat:** lane-C giver nu svar på "hvorfor to klasser?" og "hvorfor koster udsving?" ✅. Omkostninger svarer stadig ikke på "hvad koster det om året?".
- **Familiekontor:** "Ens i begge"-strippen er nyttig til at sammenligne klasserne, men uden KID-totalen kan den ikke bruges i DD.

## 2026-10-16 02:02 CEST · cyklus 27 (main `69c9033`, intet docs-delta)

main/docs er uændrede siden `90e7de8`: `69c9033` indeholder kun notes. Pages blev genudrullet kl. 00:00 GMT, og index, invester, omkostninger og selskab er byte-ens med main ✅. Bemærk: `fonden.html` findes ikke (live 404). "Fonden" i opgavelisten svarer til `fakta.html`. Persona-, krav- og idéfilerne er uændrede. Fokus er de nye lane-commits: C `c7dae02` og E `1972434`.

### MUST
- **Invester tre "4."-trin: lukkes af lane-C `c7dae02`** ✅. Ét trin "4. Køb og omkostninger" samler omkostningslinket, kurtage og "efter løbende omkostninger, før skat". Merge, så er det løst på main.
- Uændret på main: selskab "AI-udkast" over et tomt felt. Omkostninger mangler KID-tallet 2,79 %/2,85 %.

### SHOULD (lane-grene)
- **lane-C invester «Hvor ligger pengene, og hvem gør hvad?»** (depot → forening → Fundmarket → Danske Bank, NDIIR som rådgiver). Det er præcis det, persona privat og familiekontor spørger om ("hvem passer på mine penge?") ✅. Mobil: `.flow` går til 1 kolonne ≤720 px, og pilen skifter til ↓ ✅. To små ting: (a) "Opbevarer fondens værdipapirer, adskilt fra forvalterens egne penge" bør hedde "adskilt fra forvalterens og bankens egne aktiver". (b) "kl n" i kildelinjen ligner en intern forkortelse. Skriv "andelsklassen kl. n" eller "PMINDIAKK/PMINDI".
- **lane-C SRI-tekster** (risikoklasse, faq, ordliste "Udsving efter KID-metoden"): nu skelnes der klart mellem simpelt udsving og KID-udsving ✅. Ordlisten er på 119 begreber. "Afkast og risiko" har 28 begreber og er lang at scrolle ved 375, men den er foldbar ✅.
- **lane-E Oklo:** "ikke salg af isotoper" står 4 gange i én selskabsboks (summary, watch, products, role), og ingen læser har spurgt om isotoper. Det virker defensivt og forvirrende for persona privat. Sig det én gang eller fjern det. "Det er efter beholdningen" er uklart. Skriv "Det skete efter beholdningsdatoen 1. juni 2026".

### Nice
- lane-X `callCountNote` (log-støj i en offentlig datafil) er uændret.

### Persona-linser
- **Privat:** lane-C svarer nu på "hvor ligger mine penge?" og "hvorfor er udsvinget højere end klassen?" ✅. "Hvad koster det mig om året?" er stadig ubesvaret på main.
- **Familiekontor:** flow-diagrammet med forening, IFS og depotbank plus link til fakta#organisation dækker de første DD-spørgsmål ✅. KID-omkostningstotalen mangler stadig.
- **Visuel variation:** `.flow` er en ny, rolig form (fire trin med pile). Den giver ingen træthed.

## 2026-10-16 02:15 CEST · cyklus 28 (main `69c9033`, intet docs-delta)

main/docs er uændrede siden `90e7de8`, og Pages er stadig fra 00:00 GMT. Lane-R er ikke nulstillet til main, fordi lane-R har 2 notes-commits foran main og push ellers ville kræve force. docs/ er identisk med main. Fokus er de nye lane-commits: E `4ecafbd`/`00c3c32` og D `549158a`. A, B, C og X er uændrede siden cyklus 27.

### MUST
- Uændret på main: selskab "AI-udkast" over et tomt felt. Omkostninger mangler KID-tallet 2,79 %/2,85 %. De tre "4."-trin på invester lukkes, når lane-C merges.

### SHOULD (lane-grene)
- **lane-E: nægtelser fylder nu mere end indholdet.** Oklo-mønsteret fra cyklus 27 er bredt ud. Kæde-blurbs i `value-chains.json` er vokset fra ca. 200–230 tegn på main til **1.384 / 1.286 / 977 / 791 / 737 tegn**, med 5–7 "ikke …" hver ("ikke et kraftværk", "ikke en mine i drift", "ikke en orbital rute"). Southern Copper siger "ikke en mine i drift" 5 gange i én boks og "Det er heller ikke et kraftværk", selv om ingen har påstået det. Rocket Lab siger "HASTE er ikke orbital" 4 gange. Ved 375 px er en blurb på 1.300 tegn ca. 3 skærmhøjder tekst før led-kortene. Persona privat læser det som en fejlliste, og familiekontoret spørger "hvorfor forsvarer de sig?". Forslag: blurb ≤ 250 tegn (hvad leddet er), nuancen "projekt/ikke i drift" kun i selskabets `role`, én gang, og som positiv status ("Projekt, ikke i produktion" → "Status: projekt med byggetilladelse").
- **lane-E nyhedsarkiv.html:** der er 16 nye muted-linjer af typen "Det er ikke et værk i drift". De ligner QA-noter fra kildetjekket og ikke nyheder. Flyt dem til selskabsprofilen eller notes/, eller saml dem i én foldet "Afgrænsninger"-boks.
- **lane-D `549158a`:** lys kant på den åbne drawdown-søjle (`stroke:#fff` i mørk tilstand). Lille, rolig ændring ✅.

### Nice
- lane-X `callCountNote` (log-støj i en offentlig datafil) er uændret.

### Persona-linser
- **Privat:** præcision er godt, men 5–7 nægtelser pr. afsnit gør teksten sværere at læse end den uklarhed, de retter.
- **Familiekontor:** præcise statusord ("projekt", "tilladelse givet", "efter beholdningen 1. juni 2026") er værdifulde i DD. Sig dem én gang pr. selskab.
- **Visuel variation:** ingen ny form. Risikoen er nu tekstmængde, ikke formtræthed.

## 2026-10-16 02:13 CEST · cyklus 29 (main `a34a733`, stort docs-delta: merge af lane A–E + X)

main har fået lane A, B, C, D og E samt X-panel på tema (`a34a733`, 26 docs-filer, +2.501/−308). Pages last-modified er 00:09:59 GMT, og det er samme minut som `a34a733`. Live svarer til main. Lane-R er **ikke** nulstillet: `reset --hard` ville kassere pushede notes-commits og kræve force-push. I stedet er origin/main merget ind (konflikt i STATUS.md løst ved at beholde begge sider), så docs/ er identisk med main. Persona- og krav-filerne er uændrede (kun VIDENSBOT-live-check +29 linjer). Jeg har kørt Playwright live ved 375 px på 37 URL'er, inkl. `?view=fonden|portefolje|udforsk`, `selskab.html?isin=JP3436100006` (SoftBank) og `tema.html?slug=energi|chips`.

**Resultat live:** 0 pageerrors og 0 vandret overflow på alle 37. NB: `fonden.html`, `portefolje.html` og `udforsk.html` giver 404. Ruterne er `?view=…`. Det er ikke en fejl, men links udefra med de "pæne" navne vil fejle.

### MUST
1. **X-panelet er nu på produktsider (tema + selskab), med "MADS FØLGER"-badge og "BREAKING".** `tema.html?slug=energi` og `chips` har en "Hvad siger X"-boks midt i temaet. SoftBank-siden viser @BullTheoryio "BREAKING: SoftBank is seeking to raise up to $100 billion …" og "BREAKING: Nvidia is in talks to backstop $250 BILLION …" med badgen **MADS FØLGER** og "Vist fordi: SoftBank · platforme". Teksten er engelsk, kommer fra tredjepart og er usikker. Den står under en fond, som ejer selskabet. "Udvalgte offentlige opslag — ikke NDI's holdning" står der ✅, men badgen "MADS FØLGER" i versaler trækker den modsatte vej. Forslag: (a) badge → "Konto på Mads' følgeliste" i normal skrift, eller fjern den på tema/selskab. (b) Filtrér "BREAKING"/kun-overskrift-opslag fra på produktsider. (c) Fold panelet sammen som standard på tema/selskab ("Vis 4 opslag fra X"). Se compliance MUST 2.
2. **Omkostninger: KID-totalen 2,79 %/2,85 % står stadig ingen steder** (0 hits i docs/ og live). Persona privat: "Hvad koster det mig om året?" er stadig ubesvaret på omkostninger, fakta og invester.
3. **ÅTD med "afventer Fundmarket-godkendelse"** står stadig på `?view=fonden` (chip "ÅTD", "+4,0 %", src-linje). Enten skjules ÅTD, til godkendelsen foreligger, eller også fjernes forbeholdet. Det ser uprofessionelt ud at vise et tal og samtidig sige, at det ikke er godkendt.

### SHOULD
- **ndi-perspektiv er 143.428 px høj ved 375** (ca. 180 skærme) og har 666 badges på 10 px. Fold selskaberne sammen pr. tema, eller vis 20 og "Vis flere". (Åben siden cyklus 22.)
- **Små skrifttyper på mobil:** tema energi har 113 elementer under 11 px (71 `.badge` på 10 px, 28 `small` på 10,8 px). selskaber og `?view=udforsk` har ca. 800 (tabellen). vaerdikaeder har 32 (`.vc-kind`/`.tag` på 10 px). ndi-paa-x har 9 px kursiv ×4. Minimum 11 px, gerne 12 px for alt, der skal læses.
- **"Dyb →"** i årstabellen på fonden er stadig jargon (cyklus 24: "DYB SIDE"). Skriv "Se perioden →".
- **vaerdikaeder er 15.414 px høj ved 375** efter merge af lane-A (flodkort, risikokort ×3 faner, quiz ×4, ordbøger, trappe, termometer, løkke og tråde). Genvejene øverst hjælper ✅, men siden har nu ca. 12 forskellige former. Overvej at lægge quiz og ordbog bag en fold pr. fane.
- **Nyhedsarkiv:** der er stadig 10 linjer "ikke et …" fra lane-E. Ser ud som QA-noter (fra cyklus 28).
- **invester:** "kl n" står stadig i kildelinjen (cyklus 27). Skriv "andelsklasse".

### Lukket ✅
- Invester har nu ét "4."-trin (lane-C).
- Kæde-blurbs er trimmet: 0 strenge over 600 tegn i `value-chains.json` (cyklus 28-forslaget er fulgt).
- Årstabellen siger nu "2023 delår" og chippen "2023*" (delvis lukning af compliance MUST 10).
- PMINDIAKK periode: "Afkast vises efter 12 måneder" + risikolinje ✅.
- Nye lær-sider `indre-vaerdi` og `laes-grafen`: klart dansk, "tænkt fond", intet benchmark, "før skat og dine egne handelsomkostninger" ✅. Flot.

### Nice
- Engelske X-opslag på danske sider: vis en dansk etiket ("Opslag på engelsk") eller en kort dansk overskrift.
- Hold `?view=fonden` som kanonisk og lav små redirect-sider `fonden.html` → `?view=fonden` (også portefolje/udforsk), så delte links virker.

### Persona-linser
- **Privat:** den nye "Sådan læser du grafen" og "Indre værdi" besvarer præcis de begynderspørgsmål, persona-filen stiller ✅. X-panelet med "BREAKING" på SoftBank er det modsatte af den rolige tone, personaen ønsker.
- **Familiekontor:** vil spørge, hvorfor tredjepartsrygter står på en produktside, og hvem der kuraterer dem. Kræver stadig KID-omkostningstotal og ÅOP.
- **Visuel variation:** vaerdikaeder er nu siden med flest former. Risikoen er træthed ved 375 px, ikke ensformighed. Andre sider er fine.

## 2026-10-16 02:17 CEST · cyklus 30 (main `e402f15`, docs-delta: "Leo 02:00/02:07 UX+FO + KID costs / X scrub")

Pages (00:15:49 GMT) = main `e402f15`. Jeg har kørt Playwright live ved 375 på 24 URL'er: 0 pageerrors, 0 vandret overflow og én h1 på alle sider ✅. Merge af origin/main ind i lane-R gav konflikt i `notes/STATUS.md`. Jeg har løst den ved at beholde begge sider, og der er ingen docs-ændringer. Coordinator-loopet havde allerede afbrudt sin egen merge af lane-R kl. 02:12 af samme grund.

### MUST
- **Fakta siger nu "KID'ets årlige omkostningsmæssige konsekvens er *ikke oplyst* for PMINDI og *ikke oplyst* for PMINDIAKK"** (live, `fakta.html:245`). Ny boks "Omkostningsniveau (kort)" læser `costs.kidRiy5y`, men feltet findes ikke i `data/fund-facts.json` (0 hits i hele docs/). `pct()` falder derfor tilbage til "ikke oplyst". Linket "Se opstillingen →" går til `omkostninger.html#kid-omkostning`, men det anker findes ikke, og omkostninger.html er uændret i `e402f15`. For en familiekontor-læser er det værre end ingenting: siden påstår, at KID'et ikke oplyser tallet. **Ret:** tilføj `kidRiy5y: 2.79 / 2.85` (med KID-dato) i fund-facts, og byg sektionen `#kid-omkostning` på omkostninger. Bemærk: `HANDOFF-CODEX.md` og STATUS siger "KID RIY på omkostninger" er landet. Det passer ikke med main.
- **"AI-udkast" over tomt felt: lukket** ✅. Badgen vises nu kun, når der er tekst (`selskab.html`).
- Invester har ét "4."-trin (lukket i cyklus 29) ✅.

### SHOULD
- **Fonden: tredjeparts-"BREAKING" i graf-listen.** Commit-beskeden siger "drop @MadsC007 chartMarkers", men de 14 `chartMarkers` indeholder nu @BullTheoryio "BREAKING: SoftBank is seeking to raise up to $100 billion …" og "BREAKING: Nvidia … backstop $250 BILLION". De vises under fondens hovedgraf (`?view=fonden`). Det er fondens vigtigste side. Begræns markørerne til @InvestNewdeal (webinarer, børsnotering) eller fjern X fra grafen.
- **Fonden: "det er en compliance-beslutning, ikke et datamangel"** ved benchmark-teksten. Det er internt sprog på en kundeside, og "et datamangel" skal være "en datamangel". Skriv bare: "Fonden har intet fast benchmark, så vi tegner ikke en sammenligningskurve."
- **Fakta "Mangler fra NDI"** er god som intern tjekliste ✅ (erstatter spredte "udfyldes"-pills). Men på en offentlig fakta-side ser "Revision / auditor" under "Mangler fra NDI" amatøragtigt ud for et familiekontor. Skjul boksen bag `?intern=1`, eller formulér den som "Oplysninger, der følger".
- **Livscyklus-strip foldet ind på mobil** ✅ med "Vis kurve". Overskriften er klikbar, men det er ikke en `<button>` (ingen `aria-expanded`, ikke tastatur-fokusérbar). Lav den om til en knap.
- **Udforsk ved 375:** 1.052 synlige tekstelementer under 12 px (tabelceller og tags), og siden er 28.282 px høj. vaerdikaeder er nu nede på 6 elementer under 12 px ✅ (rettet i denne commit). Udforsk er det næste sted for samme ≥12 px-regel.
- **Entréen:** "Sådan tænker vi" og "Omkostninger · du kan tabe penge" som egne døre ✅. Kortteksten "KID-tal og Fundmarket-postsatser" lover KID-tal, som omkostninger ikke viser endnu (se MUST).
- Udbytte "38,9 kr." / "38,0 kr." har nu komma ✅. "Max drawdown" er blevet til "Største fald" på fonden og fakta ✅. Den gamle term står stadig i `laer/laes-grafen.html` (1 hit).

### Nice
- ndi-perspektiv er uændret 143.436 px ved 375. `index.html`/`js/data.js` skriver stadig "Central Information Dokument".

### Persona-linser
- **Privat (55+):** fonden er roligere (Største fald, links til Sådan tænker vi, "sådan kan du selv vurdere afkastet") ✅. Men "BREAKING: $250 BILLION" i fondens graf-liste skaber uro og ligner nyhedsstrøm. Det strider mod "rolig, langsigtet".
- **Familiekontor:** "To klasser, samme strategi" svarer på DD-spørgsmålet om forskelle i beholdning ✅. Omkostningsniveau "ikke oplyst" er den mest skadelige enkeltlinje på sitet lige nu.
- **Visuel variation:** der er ingen nye former. "Mangler fra NDI" er én liste i stedet for spredte pills, hvilket giver mindre støj ✅.

## 2026-10-16 02:24 CEST · cyklus 31 (main `3e4ec15`, docs-delta `5843694` "restore KID RIY + X scrub")

Pages (00:15:49 GMT) = `e402f15`. **`5843694` er ikke live endnu (Pages-lag)**: live `fund-facts.json` har 0 × `kidRiy5y`, og live viser stadig "MADS FØLGER". Jeg har derfor reviewet live (36 URL'er × 375/1280: 0 pageerrors, 0 vandret overflow, én h1 overalt ✅) og main lokalt (9 nøglesider ved 375, 0 fejl, 0 overflow). Merge af origin/main ind i lane-R gav igen konflikt i STATUS.md. Jeg har beholdt begge sider. Ingen docs-ændringer fra lane-R.

### MUST
- **Fonden: tredjeparts-"BREAKING" under hovedgrafen (åben fra cyklus 30, nu MUST).** Main `?view=fonden` viser under "Udvalgte offentlige X-opslag" @BullTheoryio "BREAKING: SoftBank is seeking to raise up to $100 billion …" og @MilkRoadAI (Nvidia). @MadsC007 er væk ✅, men `chartMarkers` i `x-posts.json` har stadig 3 tredjepartskonti. **Ret:** begræns `chartMarkers` til @InvestNewdeal, som webinar og børsnotering.
- **SoftBank-selskabssiden:** 2 × "BREAKING" (@BullTheoryio: kapitalrejsning på 100 mia. $ og garanti på 250 mia. $) og @FundaAI om "repricing of credit risk". Badgen hedder nu "Fulgt konto" ✅ i stedet for "MADS FØLGER", men indholdet er det samme. For privat-personaen er det nyhedsstrøm, ikke ro. Fold X-panelet sammen på selskab/tema, eller filtrér "BREAKING" fra.

### Lukket ✅
- **KID-omkostningstal (cyklus 30-MUST):** omkostninger har nu metric + tabel `#kid-omkostning`. Tallene er 2,79 %/2,85 % ved 5 år og 2,63 %/2,71 % ved 1 år. Jeg har **verificeret dem mod KID-PDF'erne** (priip_ipm140b/145b, "Årlig omkostningsmæssig konsekvens") ✅. Fakta "Omkostningsniveau (kort)" viser 2,79/2,85 i stedet for "ikke oplyst" ✅. Lede'en siger "ikke et billigere alternativ til KID-tallet". Det er godt for familiekontoret.
- "Du kan tabe penge" står nu på omkostninger og ndi-paa-x ✅. "Konti NDI følger" i stedet for "Mads følger" på ndi-paa-x ✅.
- Fakta "Mangler fra NDI" er ikke ændret (SHOULD fra cyklus 30 står ved magt).

### SHOULD
- **Omkostninger, internt sprog:** "Det er det tal, marketingmateriale skal gengive ærligt — ikke kun de enkelte postsatser." Det er en regel til os selv, ikke en forklaring til kunden. Skriv fx: "Tallet samler alle fondens omkostninger i ét årligt tal og er det, du kan sammenligne med andre fonde."
- **Fakta, første opsummering (linje ~44):** den nævner stadig kun "Øvrige løbende 1,49 %" og porteføljetransaktion. KID-tallet kommer først længere nede. Sæt "KID: 2,79 %/2,85 % om året ved 5 år" først, så de to steder siger det samme.
- **Fonden X-overskrift:** "Udvalgte offentlige X-opslag — ikke NDI's holdning" står over opslag fra @jesper_baek og @InvestNewdeal, som er NDI's egne konti. ndi-paa-x skelner nu korrekt. Brug samme skel her, eller vis kun NDI-konti (se MUST).
- **Fonden linje "seneste offentlige kvartalsrapport":** om-data siger, at 1. juni "ikke er et kvartalsskifte". Ret fonden til "forsinket snapshot pr. 1. jun. 2026".
- Fra cyklus 30, stadig åbne: "compliance-beslutning, ikke et datamangel" (`js/app.js:414`), livscyklus-overskrift uden `<button>`, udforsk 28.282 px / mange tekster under 12 px ved 375, "Mangler fra NDI" på offentlig fakta.
- Ved 375 er `selskaber.html` 66.172 px høj (1280: 17.861). A-Z-listen bør gruppere/folde eller paginere på mobil.

### Nice
- ndi-perspektiv er stadig 143.436 px ved 375. "Central Information Dokument" står stadig i `index.html:47/88` og `js/data.js:251` (og i footeren på selskabssider).
- X-opslag i `x-posts.json` med `complianceNote: "Omskrevet i snapshot"`: hvis teksten vises som citat af opslaget, så marker den som "omskrevet" i UI'et, eller vis originalen.

### Persona-linser
- **Privat (55+):** omkostninger er nu klar: ét KID-tal, før tabellerne ✅. Fonden er stadig forstyrret af engelske "BREAKING"-opslag under grafen.
- **Familiekontor:** KID-total + "ikke ÅOP" + kilde-links til begge KID'er dækker deres omkostnings-MUST ✅. ÅOP er bevidst ikke vist. Det er forsvarligt, når KID-RIY er der. Næste spørgsmål bliver kurering af tredjepartsopslag på produktsider.
- **Visuel variation:** ingen nye former. Omkostninger har nu metric → tabel → "den ene forskel"-skala, hvilket er god variation.

## 2026-10-16 02:40 CEST · cyklus 32 (main `3e4ec15`, intet docs-delta siden cyklus 31)

Pages (00:22:23 GMT) = main `3e4ec15` ✅. Lag fra cyklus 31 er indhentet: live `fund-facts.json` har `kidRiy5y`, omkostninger har `#kid-omkostning`, og "MADS FØLGER" er væk. Lane-R indeholder allerede origin/main, så der var ingen merge og ingen reset (reset ville kræve force-push). Playwright live ved 375 på 22 URL'er: 0 pageerrors, 0 vandret overflow, én h1 overalt ✅.

### MUST
- **Fonden: tredjeparts-"BREAKING" under hovedgrafen (uændret fra cyklus 31, nu live).** Under "Udvalgte offentlige X-opslag — ikke NDI's holdning" står @BullTheoryio "BREAKING: SoftBank is seeking to raise up to $100 billion …" og @MilkRoadAI (Nvidia $1B) mellem @jesper_baek og @InvestNewdeal. **Ret:** `chartMarkers` → kun @InvestNewdeal (webinarer/børsnotering).

### SHOULD
- **Omkostninger: internt sprog, nu live.** (1) "Det er det tal, marketingmateriale skal gengive ærligt — ikke kun de enkelte postsatser." (2) "Tomme felter = udfyldes af NDI." Begge er regler til os selv. Forslag: "Tallet samler alle fondens omkostninger i ét årligt tal, så du kan sammenligne med andre fonde." Fjern linje (2), eller skjul den bag `?intern=1`.
- **"kl n"** står nu på 3 sider: invester, fakta ("Fundmarket – NewDeal Invest, kl n ↗") og omkostninger. Skriv "andelsklasse" eller fjern.
- **Fonden "seneste offentlige kvartalsrapport i udkastet"**: stadig live. Om-data siger, at 1. juni ikke er et kvartalsskifte. Skriv "forsinket snapshot pr. 1. jun. 2026".
- **"Dyb →"** står 4× i årstabellen på fonden. Skriv "Se perioden →".
- **Livscyklus-strip:** der er 0 elementer med `aria-expanded` på fonden ved 375. Foldningen er stadig ikke en `<button>`.
- **Nyhedsarkiv:** synlig tekst "Placeholder: Sådan investerer du" og "Arkivet er et UI-koncept". Det er OK for et udkast, men ordet "Placeholder" bør ikke kunne ses. Brug "Kommer snart".
- Højder ved 375 er uændrede: ndi-perspektiv 143.436, selskaber 66.172, udforsk 28.282, vaerdikaeder 15.593 px. Det er træthedsrisiko på mobil. Fold/paginér (åben siden cyklus 22/29/31).
- `laer/laes-grafen.html`: "max drawdown" står der stadig (1 hit). Resten af sitet siger "Største fald".

### Lukket ✅ (verificeret live)
- Omkostninger: KID 2,79 %/2,85 % (5 år) og 2,63 %/2,71 % (1 år) vises først, med "ikke et ÅOP" og "du kan tabe" ✅.
- Fakta "Omkostningsniveau (kort)" viser 2,79/2,85 og ikke "ikke oplyst" ✅.
- Fonden-chips: kun Siden start / ÅTD / 2023* / år. Ingen 1m/3m ✅.

### Nice
- "Central Information Dokument" står stadig på entré, fonden, portefølje, udforsk, selskab og tema (footer). Skriv "Central information (KID)" eller fjern.
- Fakta-opsummeringen nævner stadig "Øvrige løbende 1,49 %" før KID-tallet. Sæt KID-tallet først (cyklus 31).

### Persona-linser
- **Privat (55+):** omkostninger og fakta er nu rolige og ærlige ✅. Det største ro-brud er stadig engelske "BREAKING"-opslag på fonden og SoftBank.
- **Familiekontor:** omkostnings-MUST er dækket live ✅. Det næste, de vil stille spørgsmål ved, er interne hjælpetekster ("Tomme felter = udfyldes af NDI", "Mangler fra NDI", "kl n"), som får produktet til at virke ufærdigt.
- **Visuel variation:** ingen ændring. Problemet er længde på mobil, ikke ensformighed.

## 2026-10-16 02:31 CEST · cyklus 33 (main `3e4ec15`, intet docs-delta siden cyklus 31; live = main)

Pages (00:22:23 GMT) = main. Sidste docs-commit er `5843694`. Playwright live ved 375 på 21 URL'er (inkl. periode, drawdown, embed, sammenlign, kort, ideer, laer/laes-grafen og SoftBank via `?isin=JP3436100006`): 0 pageerrors, 0 vandret overflow, én h1 overalt ✅. Fokus i denne cyklus er de "dybe sider", som tidligere cyklusser kun har skimmet.

### MUST
- **Fonden + SoftBank: tredjeparts-"BREAKING" (uændret, 4. cyklus i træk).** Fonden viser nu @BullTheoryio "BREAKING: SoftBank … $100 billion" og "BREAKING: Nvidia is in talks to backstop $250 BILLION in financing for OpenAI" under hovedgrafen. **Ny detalje:** På SoftBank står Nvidia/OpenAI-opslaget med etiketten "DIREKTE TRÆF · Vist fordi: SoftBank". Opslaget nævner ikke SoftBank i den viste tekst, så matchningen ser forkert ud for brugeren. **Ret:** `chartMarkers` → kun @InvestNewdeal. Fold X-panelet sammen på selskab/tema.
- **Nyhedsarkiv: "Placeholder:" ×8 er synligt, og "du kan tabe" mangler (0 hits).** Uændret fra cyklus 32.

### SHOULD
- **`periode.html` har ikke fået fondens rettelser.** Fonden har "2023 delår" og "afventer Fundmarket-godkendelse" ved ÅTD. Periode viser "2023: +16,7 %" uden delår og "YTD: +4,0 %"/"2026: +4,0 %" uden forbehold. Sprog: "YTD" og "CAGR (hele serien)" på en dansk side, hvor resten siger "År til dato". Navigationen viser "← Fonden / Drawdown / ← Fonden" (dobbelt tilbage-link). Der er 10 tekster under 12 px.
- **`drawdown.html`: h1 er "Drawdown · PMINDI".** Resten af sitet siger "Største fald" (ordliste, chips, embed "Se største fald →"). "Under vand" er også jargon. Forslag til h1: "Største fald fra top · PMINDI". Indholdet er ellers ærligt og godt: "Lige nu … −23,4 % under toppen fra 2. jun. 2026" giver privat-personaen det rigtige billede.
- **Embed:** "Gns. årligt afkast (CAGR) +26,4 % · CAGR · 3,1 år siden start". CAGR står to gange. Skriv "Gns. pr. år siden start (3,1 år)".
- **Fonden, grafforklaring:** "Grafmarkører: udbytte (gul), drawdown (rød)". Skriv "største fald (rød)".
- **Risici:** "Afkast pr. udsving 0,89 · Sharpe, uden rente trukket fra". Det er godt forklaret. Men "Sharpe" bør kun stå i ordlisten, ikke som underlabel.
- Højder ved 375 er uændrede: udforsk 28.282 (1.050 tekster under 12 px), vaerdikaeder 15.593, ideer 14.377, fonden 6.565, fakta 6.379 px. Tema (chips) har 111 tekster under 12 px.
- Fra cyklus 32, stadig åbne: internt sprog på omkostninger ("Tomme felter = udfyldes af NDI", "marketingmateriale skal …"), "kl n" (invester ×1, fakta ×3, omkostninger ×2), "kvartalsrapport" på fonden, "datamangel", "Dyb →", livscyklus uden `<button>`.

### Nice
- "Central Information Dokument" står stadig i footeren (bl.a. SoftBank-siden).
- Ideer (14.377 px) bruger PROBLEM/SVAR/DATA/TONE-kort. Det er god variation, men de er lange på mobil. Fold dem efter de første 3.

### Persona-linser
- **Privat (55+):** drawdown-siden er ærlig og rolig ("−23 % under toppen nu"). Ordet "Drawdown" i overskriften og "YTD/CAGR" på periode er dog uden for deres ordforråd. Engelske BREAKING-opslag er stadig det største ro-brud.
- **Familiekontor:** de vil bemærke, at periode og fonden ikke siger det samme om 2023/ÅTD. Inkonsistens mellem sider svækker tilliden mere end selve tallet.
- **Visuel variation:** ingen ændring. Træthed skyldes længde på mobil, ikke ensformighed.

## 2026-10-16 02:36 CEST · cyklus 34 (main `65b1947`, live = main)

Pages (00:33:44 GMT) har samme md5 som main på risici, ndi-perspektiv, ideer, drawdown og embed/chart.js. Docs-delta siden cyklus 33: 26 filer (lane-C/D-merges). Det nye er risici `#prospekt`, ideer `#h-lc` (livscyklus-bobler), ndi-perspektiv (temagrupper og søgning), footer med "Markedsføringsmateriale" på lær-siderne, ordliste 138 og flere drawdown-/embed-finjusteringer. Playwright live ved 375 på 27 URL'er: 0 pageerrors, 0 vandret overflow, én h1 overalt ✅.

### MUST
- **Fonden + SoftBank: tredjeparts-"BREAKING" (uændret, 5. cyklus i træk).** Der er 2 × @BullTheoryio under fondens graf. SoftBank viser "DIREKTE TRÆF · Vist fordi: SoftBank" på Nvidia/OpenAI-opslaget. **Ret:** `chartMarkers` → kun @InvestNewdeal.
- **Nyhedsarkiv:** "Placeholder" står 8 gange, og "tabe" står 0 gange (uændret). Skjul siden fra kort/nav, indtil den har indhold, eller fyld den.

### SHOULD
- **Livscyklus siger to modsatte ting.** ndi-perspektiv: "NDI har ikke sat livscyklus for nogen selskaber endnu … Vi gætter ikke." Ideer `#h-lc` viser derimod en fordeling på faser (55,5 % høj vækst osv.) som "maskinelt forslag". Begge dele er ærlige hver for sig, men læst efter hinanden lyder det som et selvmodsigende udsagn. Skriv på perspektiv: "NDI har ikke sat livscyklus. Et maskinelt forslag ud fra branchekoder ses på Idéer →".
- **Antal selskaber:** ndi-perspektiv siger "332 selskaber i 12 temaer", mens ideer, portefølje og ordliste siger 345 (PMINDI) / 320 (PMINDIAKK). 332 er antallet af profiler, ikke af beholdninger. Skriv "332 af fondens 345 selskaber har en profil", ellers spørger familiekontoret, hvilket tal der er rigtigt.
- **ndi-perspektiv, livscyklus-feltet:** "Modenhed fra før omsætning til value". "value" er en rest fra den engelske skala. Commit `c0468bb` har ellers omdøbt den til "moden".
- **Drawdown:** h1 er stadig "Drawdown · PMINDI". Der er stadig dobbelt "← Fonden" (header og brødtekst). Grafen og episodelisten er blevet pænere (nøgle under kurven, årstal, gul åben episode). Teksten er rolig og ærlig ✅.
- **Periode:** uændret fra cyklus 33 ("2023: +16,7 %" uden delår, "YTD", "CAGR", dobbelt "← Fonden").
- **Fra cyklus 32/33, stadig åbne:** "kl n" (invester ×1, fakta ×3, omkostninger ×2), "Tomme felter = udfyldes af NDI" og "marketingmateriale skal gengive ærligt" (omkostninger), "kvartalsrapport" og "datamangel" (fonden), "Grafmarkører: … drawdown (rød)", "Sharpe" som underlabel på risici, embed "CAGR" ×2.

### Positivt (nyt)
- **Risici `#prospekt`** er det bedste stykke familiekontor-indhold på sitet. Det giver otte prospekt-risici i almindeligt dansk, rammer (ingen derivater, ingen udlån, intet benchmark, absolut afkast), market maker og "prospektets ordlyd gælder". Hvert punkt har et ordliste-link.
- **Ideer `#h-lc`** er en ny visuel form (bobler på en bakke) med tydelig "FORSLAG, IKKE NDI'S VURDERING" og "du kan tabe penge". God variation.
- **ndi-perspektiv** er gået fra en meget lang liste til 12 temachips med søgning (3.007 px ved 375). Det er en stor mobilforbedring.

### Nice
- Ideer er vokset til 16.688 px ved 375 (fra 14.377). Fold kortene efter de første 3–4, eller giv siden en indholdsfortegnelse med spring.
- "Central Information Dokument" i footeren på fonden/SoftBank/sammenlign. Lær-siderne siger nu korrekt "KID". Ensret.

### Persona-linser
- **Privat (55+):** risici-prospektafsnittet og livscyklus-bakken er forståelige. "Drawdown", "YTD" og "CAGR" er stadig de ord, de snubler over. Det engelske BREAKING-opslag under fondens graf er stadig det største ro-brud.
- **Familiekontor:** `#prospekt` med sidetal-kilde rammer dem præcist. De vil dog fange 332/345 og livscyklus "vi gætter ikke" vs. "maskinelt forslag". Det er små inkonsistenser, men de tæller.
- **Visuel variation:** forbedret (bobler, chips). Træthed skyldes længde på ideer/udforsk/vaerdikaeder, ikke ensformighed.

## 2026-10-16 02:40 CEST · cyklus 35 (main `04e1c9a`, intet docs-delta siden `65b1947`, live = main)

Main har kun fået notes/coordinator-merges siden cyklus 34, og `git diff 65b1947 04e1c9a -- docs` er tomt. Jeg har kørt Playwright live ved 375 på 28 URL'er (inkl. PMINDIAKK, tema, vaerdikaede og lær). Resultat: 0 pageerrors og 0 vandret overflow. Højderne er uændrede (selskaber 66.172, udforsk 28.282, ideer 16.688, vaerdikaeder 15.593 px). Denne cyklus ser på det, der ikke blev tjekket i 34: top-10, fondens omkostningsblok, tema-fallback og ndi-paa-x.

### MUST (uændret, se cyklus 34)
- **Fonden + SoftBank + ndi-paa-x: tredjeparts-"BREAKING"** (@BullTheoryio ×2 under fondens graf, "Vist fordi: SoftBank" ×2). Rettelsen er ét filter: `docs/js/app.js:479` `chartMarkers.filter(...)` → tilføj `&& e.username === 'InvestNewdeal'` (eller rens `x-posts.json` → `chartMarkers`). Dette er 6. cyklus i træk.
- **Nyhedsarkiv:** "Placeholder" og 0 × "tabe" (uændret).

### SHOULD (nyt i denne cyklus)
- **Fondens "Omkostninger (kort)" har intet tal.** Der står "Tallene … ligger på Fundmarket og er samlet på omkostningssiden". Invester, fakta og omkostninger viser ellers 2,79 %/2,85 % (KID, 5 år). Det er netop den side, persona-familiekontoret læser først (PERSONA-familyoffice MUST 2). Tilføj én linje: "Samlede årlige omkostninger ca. 2,79 % ved 5 års ejertid (KID)."
- **Top-10 (portefølje/udforsk) viser rå Bloomberg-forkortelser:** "Sea Sp ADR", "Lumentum Hldngs", "Sitime Corp". Det ser ufærdigt ud for en privat investor. Brug visningsnavn fra `company-profiles.json`, hvis feltet findes (Sea Ltd, Lumentum Holdings, SiTime).
- **"Søjlerne ved navnet viser vægt i fonden pr. kvartal"** (portefølje og udforsk), mens om-data siger, at 1. jun. ikke er et kvartalsskifte. Skriv "pr. snapshot" (samme problem som "kvartalsrapport" på fonden).
- **`tema.html?id=ai` viser stille "Chips".** Et ukendt id falder tilbage til første tema, og `themes.json` har ingen `id`-felter. Delte/gamle links lander dermed på et forkert tema uden besked. Vis "Temaet findes ikke → Alle temaer".
- **Fra 32–34, stadig åbne:** drawdown h1 "Drawdown · PMINDI" og dobbelt "← Fonden". Periode "YTD/CAGR/2023 uden delår". "kl n" (fakta ×3, omkostninger ×2, invester ×1). "datamangel" og "kvartalsrapport" (fonden). Sharpe-underlabel (risici, fakta). 332 vs 345. Livscyklus "vi gætter ikke" vs. maskinelt forslag.

### Positivt
- 100.000 kr.-eksemplet er eksemplarisk. Det siger "efter fondens løbende omkostninger, før skat og egne handelsomkostninger", "første NAV, ikke stiftelsesdato" og "regneeksempel, ikke en prognose".
- Invester trin 4 forklarer omkostninger med KID-tal og et tænkt kroneeksempel. Det er den bedste omkostningstekst for privatpersonaen.
- ndi-paa-x adskiller NDI-konti (@InvestNewdeal, @MadsC007, @jesper_baek, @CHornskov) fra "fulgte konti, ikke NDI's holdning". Grep efter købt/solgt/øget/buy/sell/trim: 0 handelssprog i medarbejderopslag ✅.

### Persona-linser
- **Privat (55+):** kan nu finde prisen (invester, omkostninger), men ikke på fondens egen side. Navnene "Hldngs/Sp ADR" i top-10 virker som et regneark.
- **Familiekontor:** prospekt-sektionen og 100k-eksemplet er stærke. De mangler fortsat omkostningstallet ved hero/KPI og et downloadbart faktaark (PERSONA-FO §4).
- **Visuel variation:** ingen ændring. Trætheden skyldes længde (selskaber 88 skærme ved 375), ikke ensformighed.

## 2026-10-16 02:47 CEST · cyklus 36 (main `04e1c9a`, intet docs-delta siden `65b1947`, live = main)

Pages (00:34:58 GMT) = main. Main har ikke ændret sig siden cyklus 35, så denne cyklus dækker det, som 32–35 ikke tjekkede: **desktop 1280**, **tilgængelighed** (alt, labels, overskriftsniveauer, fokus, touch-mål) og **eksterne links**. Playwright kørte live på 16 sider ved 375 og ved 1280.

### Tilgængelighed ✅ (godt)
- `lang="da"` på alle 35 HTML-filer. `noindex` på alle sider og `robots.txt` med `Disallow: /` ✅ (vigtigt for et udkast).
- 0 `<img>` uden alt. 0 store SVG'er uden `aria-label`/`role`. 0 inputs uden label. 0 spring i overskriftsniveauer på alle 16 sider.
- "Gå til indhold" er første tab-stop. Tab-rækkefølgen på fonden er logisk (logo → nav → "Sådan investerer du" → "← Entré"), og alle tab-stop har synlig fokusmarkering.
- (Sorteringsknapperne i portefølje og ordlisten på om-data er kun "tomme" i automatikken, fordi de ligger i lukkede sektioner. De er ikke en fejl.)

### SHOULD (nyt)
- **Touch-mål under 24 px ved 375** (WCAG 2.5.8 kræver mindst 24×24):
  - Udforsk: 29 chips/selskabslinks er 17–18 px høje ("Chips", "Energi", "Soitec", "Tesla" …).
  - Fonden: 16 stk, bl.a. "X ↗" (26×20) i opslagslisten og "Risici" (31×18).
  - Portefølje: 12 tema-søjler/links er 18 px høje.
  - Om-data: 22 stk ("FAQ" 28×20 og ordliste-spring).
  - Privat 55+ rammer forkert chip på telefonen. **Ret:** `min-height: 32px` + `padding-block` på `.chip`/inline-links i lister.
- **Entré siger "Modenhed: 345 selskaber klassificeret (udkast)"** (`docs/js/app.js:266`). ndi-perspektiv siger "NDI har ikke sat livscyklus for nogen selskaber endnu … Vi gætter ikke", og ideer kalder det "maskinelt forslag". Det er tredje formulering for den samme ting og den mest misvisende: "klassificeret" lyder som NDI's vurdering. Skriv "Livscyklus: maskinelt forslag for 345 selskaber (ikke NDI's vurdering)".
- **Fonden ved 1280: risikoindikator 5/7 står alene på anden række** under fire afkast-KPI'er. Den ser ud som en eftertanke, og højre halvdel af hero er tom. Fyld rækken op med **"Omkostninger 2,79 %/år (KID, 5 år)"** som 6. kort, så der står 3+3. Det løser også cyklus 35's "intet omkostningstal på fonden" og giver risiko og omkostninger samme vægt som afkastet.
- **Entré ved 1280:** kortet "Omkostninger" har undertitlen "KID-tal og Fundmarket-postsatser — du kan tabe penge". Tabsadvarslen hører ikke til omkostninger. Skriv "KID: ca. 2,79 % om året ved 5 års ejertid". Kortet "Lær" siger "variance drag", som er jargon på forsiden. Skriv "hvorfor gennemsnit snyder". Fliserne står i rækker af 3+2, så der er et hul. Det er mindre vigtigt.

### Eksterne links ✅
Alle centrale dokumenter svarer 200 live: KID PMINDI/PMINDIAKK (`priip_ipm140b`/`145b`, application/pdf), fællesprospekt (Fundmarket, opdateret 24.10.2025, pdf), Fundmarket kl. n-sider, newdealinvest.dk og group.softbank IR. Der er 25 eksterne mål i alt. 10 af dem er X-opslag, heraf 3 fra @BullTheoryio og 2 fra @MilkRoadAI (se MUST).

### MUST (uændret, se cyklus 34/35)
- Tredjeparts-"BREAKING" under fondens graf og på SoftBank (7. cyklus). Rettelsen er ét filter i `docs/js/app.js:479`.
- Nyhedsarkiv: "Placeholder" ×8 og 0 × "tabe".

### Persona-linser
- **Privat (55+):** sitet er teknisk tilgængeligt (skip-link, alt, labels). Den reelle barriere på mobil er de små chips. På desktop ser fonden rolig og overskuelig ud, men fire grønne afkasttal i stor skrift kommer før risikoen.
- **Familiekontor:** på desktop leder de efter et omkostningstal i KPI-rækken, og der er plads til det. KID- og prospektlinks virker og peger på de rigtige PDF'er ✅.
- **Visuel variation:** desktop er luftigt og ensartet. Der er ingen ny træthed. Trætheden er fortsat længden på mobil.

## 2026-10-16 02:49 CEST · cyklus 37 (main `3e25f16`, docs-delta siden `04e1c9a`: ideer-foldning, drawdown, fagord ud af overskrifter, tre drivkræfter)

Pages (00:47:36 GMT) = main. Playwright kørte live ved 375 på 28 URL'er og ved 1280 på ideer og drawdown.

### Nyt ✅
- **Ideer på mobil er foldet:** 375 = 7.560 px (før 18.199). 11 sektioner som `<details>`. "Fold alle ud" er 44 px. Dybe links folder ud: `#h-dr` åbner og lander ved y=112. Desktop er åben, og knappen hedder "Fold alle sammen". Det er den største forbedring af mobil-træthed i nattens løb.
- **Venn "Tre drivkræfter, ét overlap"** er læsbar ved 375 (SVG 317 px). Den er mærket "NDI Analytics' skitse … ikke NDI's egen opdeling", og alle vægte har datoen 1. jun 2026. Den er også et nyt billede, så variationen er god.
- **Drawdown:** episoder har tal på de dybe prikker. Den valgte episode er gul på kurven. 0 SVG-tekster under 10 px. Kalenderår mærker 2023 "delår" og 2026 "til dato" ✅.
- Lær/ordliste: "CAGR" er ude af overskrifterne ("Hvorfor det årlige afkast er lavere end gennemsnittet"). Ordlisten har 142 begreber, med nye "Årlig omkostningsmæssig konsekvens (KID)" og "Øjebliksbillede".

### MUST
- (uændret, 8. cyklus) **Tredjeparts-"BREAKING"** (@BullTheoryio) under fondens graf og på SoftBank. Se compliance.

### SHOULD (nyt)
1. **Fagord-oprydningen er halv.** Commit `1beebba` fjernede CAGR/drawdown fra lær, men de mest besøgte flader har dem stadig:
   - drawdown `h1` "**Drawdown** · PMINDI" og kicker "FONDAFKAST · DRAWDOWN". Skriv "Fald fra top · PMINDI", som sidekortet allerede kalder siden.
   - fonden KPI "Gns. årligt afkast (**CAGR**)", "Grafmarkører: … drawdown (rød)" og "Åbn drawdown-side → **YTD dyb side**".
   - entré: "Møntspillet (+50/−40) og variance drag: CAGR og gennemsnit".
   - periode: "Drawdown", "CAGR (hele serien)", "YTD: +4,0 %". Embed: "CAGR · 3,1 år siden start".
   - Privat 55+ møder fagordene på fonden, før de når lær.
2. **"kl n"** er rettet på invester, men står stadig på fakta (3×) og omkostninger (2×) ("NewDeal Invest, kl n (PMINDI)"). Skriv "andelsklasse PMINDI".
3. **Drawdown "Under vand" ved 375:** etiketterne "tilbage", "top" og "nu −23 %" sidder tæt i højre side. Forklaringen under grafen er 8 linjer plus 4 linjer. Det er meget tekst til én graf på mobil. Fold "Bredden er tiden …" ind i en `<details>` "Sådan læser du grafen".
4. Fra cyklus 36, stadig åbent: touch-mål på 17–18 px på udforsk/portefølje. Omkostningstal som 6. KPI-kort på fonden. Entré "Modenhed: 345 selskaber klassificeret (udkast)".

### Nice
- Venn: "Quantum 0,9 % · forslag" er det eneste tema med "forslag". Forklar det i figurteksten ("forslag = tema endnu ikke bekræftet af NDI"), ellers ligner det en tastefejl.
- Ideer ved 1280 er 10.961 px med alle 11 åbne. Overvej også at folde efter de første 3 på desktop.

### Persona-linser
- **Privat 55+:** ideer på mobil er nu overskuelig. Drawdown-siden hedder stadig "Drawdown" øverst, så fagord-indsatsen ses ikke dér, hvor de lander fra fonden.
- **Familiekontor:** de tre drivkræfter er klart sourcet (ugebrev 19. jan 2026) og skitse-mærket ✅. FO vil stadig se omkostningstallet på fonden.
- **Idéspejder:** Venn er et godt "ét billede"-svar på "hvad tror NDI på?".

## 2026-10-16 02:55 CEST · cyklus 38 (main `3e25f16`, intet docs-delta siden cyklus 37, live = main)

Pages (00:47:36 GMT) = main. Denne cyklus dækker det, 32–37 ikke stikprøvede: **8 selskabssider** (top, midt, warrants, mindste), **alle 11 temasider**, sammenlign, kort og to 404-tilfælde. Playwright kørte live ved 375. Resultat: 0 pageerrors og 0 vandret overflow.

### Nyt ✅
- `tema.html?slug=findesikke` viser "Temaet findes ikke", og `selskab.html?isin=XX…` viser "Selskabet findes ikke i beholdningen". Fallback-fejlen fra cyklus 35 er lukket.
- Alle temasider og selskabssider har tabsadvarsel, KID-link, SRI 5/7 med "gælder fonden som helhed – ikke X alene" og forsinket-mærket ✅.

### MUST
- **Tredjeparts-"BREAKING" er ikke kun på SoftBank. Den står på alle 44 platforme-selskaber og på `tema.html?slug=platforms`.** Stikprøven viser "BREAKING: SoftBank is seeking to raise up to $100 billion …" (@BullTheoryio) på Carvana og begge Opendoor-warrants med "Vist fordi: platforme". De andre fulgte konti følger samme mønster: @FundaAI ("$ORCL and $CRWV face a repricing of credit risk") og @MelvinInvests står på alle chips-, energi- og compute-sider, fx SUESS MicroTec. Det er altså ikke kun graf-markørerne (`app.js:479`). **Rettelsen sidder i `docs/js/x-feed.js:365` `matchPosts`:** tema-træf skal kun gælde husets konti. Tilføj `if (!nameHit && !isHouse(p)) continue;` før `hits.push`. `isHouse` findes allerede (linje 308).

### SHOULD (nyt)
1. **Livscyklus har nu en fjerde formulering.** `selskab.html:106` siger "**Manuel** klassifikation i udkastet" for alle 345, men data siger `maturityStatus: "forslag"` / "forslag fra offentlig GICS-industry/tema — afventer NDI-gennemgang" for alle 345. Den direkte modsiger data. Brug `maturityStatus === 'forslag'` → "Maskinelt forslag, afventer NDI-gennemgang. Ikke en rating."
2. **Tomme profiler:** kun 98 af 345 selskaber har en profil i `company-profiles.json`. De øvrige ~247 sider viser "Profiltekst mangler endnu" og "Rolle i værdikæden –", "Produkter –" og "Kunder –". Skjul de tre tomme felter, når profilen mangler, og vis i stedet ét link: "Se temaet Platforme".
3. **Warrants som selskaber:** "Opendoor Tech Warrant Series A/Z" har vægt 0,00 %, egen side (4.257 px) og tom profil. 10 positioner har vægt < 0,005 %. Grupper dem under moderselskabet ("Opendoor (inkl. warrants)"), eller vis dem kun i fuld liste.
4. **Rå navne er udbredt:** 187 af 345 navne har Bloomberg-suffiks/forkortelser ("Sea Sp ADR" som h1, "SUESS MicroTec N", "Southern Co/The", "Lumentum Hldngs"). h1 på en selskabsside er det første, en privatinvestor ser. Det er udvidelsen af SHOULD fra cyklus 35.
5. **Sammenlign nævner ikke omkostningsforskellen** (KID ca. 2,79 % vs. 2,85 % ved 5 år). FO spørger først om den, når de vælger mellem to klasser. Tilføj én linje i hvert kort.

### Nice
- Engelske X-citater står uoversat. Det er fint som citat, men et "(engelsk opslag)"-mærke eller en dansk resumelinje vil hjælpe 55+.

### Persona-linser
- **Privat 55+:** hvis de klikker på Carvana fra top-10, er det første eksterne opslag "BREAKING … $100 billion". Det er uro, ikke information. De tomme "–"-felter får sitet til at virke ufærdigt.
- **Familiekontor:** "Manuel klassifikation" over for data "forslag" er den slags inkonsistens, de fanger. Sammenlign uden omkostninger er en tabt chance.
- **Visuel variation:** temasiderne har ens struktur, men 3–6k px hver er acceptabelt. Selskabssider uden profil er mest X-panel og fondstekst.

## 2026-10-16 06:15 CEST · cyklus 39 (main `e9ea004`, docs-delta siden `3e25f16`: 251 commits, 38 docs-filer; live 05:49 CEST = main)

Live Playwright-sweep ved 375 px på 32 sider (entré, fonden ±AKK, portefølje, udforsk, værdikæder, drawdown, risici, SoftBank, Carvana, temaer, tema ai/platforms, invester, om-data, fakta, omkostninger, sammenlign, periode, nyhedsarkiv, ideer, kort, selskaber, ndi-på-x, embed, lær ×5). **0 pageerrors og 0 vandret overflow.**

### Lukket siden cyklus 38 ✅
- Tredjeparts-X på selskabs- og temasider er væk. `matchPosts` er nu `houseOnly = true`, og tema-træf gælder kun husets konti. SoftBank viser "Kun NDI-konti i dette panel … 3 opslag fra konti, som NDI følger … vises ikke her". Carvana og `tema?slug=platforms` har 0 "BREAKING". `chartMarkerIsInvestNewdeal` + `app.js:490` = fondsgrafen viser kun @InvestNewdeal.
- Livscyklus på selskabssiden siger "Maskinelt forslag ud fra offentlig branche og tema. Afventer NDI-gennemgang." Det matcher data.
- Sammenlign viser nu KID-omkostning. Den nye side `omkostninger.html` er grundig: KID 1 år/5 år, postsatser, 80 kr.-forskellen, "ikke et ÅOP". Fonden har "Omkostninger (kort)" med RIY 2,79/2,85 %, og entréen har "ca. 2,8 % om året" ✅. FO-kravet om omkostninger er indfriet.
- PMINDIAKK-visningen viser ingen kurs: "vises fra 5. december 2026", ingen NAV/serie ✅.
- Nyhedsarkivet har ikke længere "Placeholder". "kl n" er væk.

### MUST
- Ingen nye UX-blokere.

### SHOULD
1. **Fagord og engelsk i fondens afkasttabel (375):** "Dyb →" i hver række, "YTD dyb side →", "Vs PMINDIAKK →" og "Middel/median →" under Største fald. Privat 55+ kan ikke afkode "Dyb" og "YTD", og sitet siger ellers konsekvent "ÅTD"/"År til dato". Forslag: "Se året →", "År til dato i detaljer →", "Sammenlign med PMINDIAKK →", "Typiske fald →".
2. **Grammatikfejl `temaer.html:109`:** "22 temaforslag er afventer gennemgang" → "22 temaforslag afventer gennemgang".
3. **Entréens tal for temaforslag forvirrer:** kortet siger "Temaer **87 forslag**" (det er 87 *selskaber* med temaforslag; der er 10 temaer). Porteføljekortet siger "Modenhed: 345 selskaber med forslag", og temaer siger "22 temaforslag … afventer". Tre forskellige tal står med ordet "forslag". Skriv "87 selskaber med temaforslag" eller drop tallet på entréen.
4. **Rå Bloomberg-navne består** ("Sea Sp ADR" i "Andre i Platforme" på SoftBank, "Southern Co/The" osv.). Det er uændret fra cyklus 35/38.
5. **Omkostninger: intern meta-sætning til kunden:** "Det er det tal, marketingmateriale skal gengive ærligt — ikke kun de enkelte postsatser." Det lyder som en note til sig selv. Skriv i stedet: "Det er det samlede tal, du bør se på."
6. **Footer-navnet er inkonsistent:** PMINDIAKK-visningen og nogle sider har "Central Information Dokument", mens fakta/ndi-på-x/omkostninger har "Dokument med central information (KID)". Commit `71ce68e` ville ensrette. Det er ikke slået igennem alle steder (bl.a. footeren på `?view=fonden&fund=PMINDIAKK`).
7. Uændret fra 38: tomme profilfelter ("–") på ~247 selskaber, og warrants som selvstændige selskaber.

### Nice
- Fonden: "Gns. årligt afkast +26,4 %" mangler periode. Underteksten "Efter løbende omkostninger" kan blive til "Siden start 22. sep. 2023 · efter løbende omkostninger".
- `ndi-paa-x.html` er nu klart mærket ("7 opslag er fra konti, som NDI følger (ikke NDI's holdning)", "Hvem · 0 NDI · 3 fulgte"). Engelske tredjepartscitater bør stadig have et "(engelsk)"-mærke.

### Persona-linser
- **Privat 55+:** entré → fonden er rolig. Omkostningstallet står på entréen, og tabsadvarslen er synlig over folden ved 375 (screenshot). Tabellen med "Dyb/YTD" er det eneste sted, de falder af.
- **Familiekontor:** omkostningssiden er nu stærk (KID vs. postsatser, ikke-ÅOP-forbehold). Tre forskellige "forslag"-tal på entré/portefølje/temaer er den inkonsistens, de spørger til.
- **Visuel variation:** omkostningssiden (skala + forstørret udsnit) og X-klyngerne bryder kort-mønsteret godt. Fonden ved 375 er 5,8k px, og selskaber.html er 37k px. Det er acceptabelt for A–Z, men der bør være et hop-til-bogstav øverst. Det findes allerede ✅.

## 2026-10-16 06:10 CEST · cyklus 40 (main `5bdb064`, docs-delta siden `e9ea004`: 15 docs-filer; live 06:05 CEST = main)

Live Playwright ved 375 på 32 URL'er (entré, fonden ±AKK, portefølje, udforsk, værdikæder, værdikæde, drawdown, risici, SoftBank, Sea, Southern, SUESS, Opendoor Warrant A, temaer, tema platforms, invester, om-data, fakta, omkostninger, sammenlign, periode ×4, nyhedsarkiv, selskaber, ideer, kort, ndi-på-x, ndi-perspektiv, embed). **0 pageerrors og 0 vandret overflow.**

### Lukket siden cyklus 39 ✅
- **Rå navne i h1 (selskabsside):** `displayName()` giver "Sea Limited (ADR)", "The Southern Co" og "SUESS MicroTec". "Beholdningsnavn: Sea Sp ADR" står i meta. Det er godt. Titlen følger med.
- **Tomme profilfelter:** "Rolle –/Produkter –/Kunder –" er væk. I stedet står én linje: "Rolle, produkter og kunder er ikke beskrevet endnu … Se NDI-linsen nedenfor → · Se temaet Chips →" ✅.
- **Warrants:** selskabssiden og screeneren siger "Warrant (tegningsret) på Opendoor Tech - ikke et selvstændigt selskab" med link til moderselskabet ✅.
- Drawdown og embed: ordombrydning ved 375 er rettet (`ep-pct`).

### MUST
- Ingen nye UX-blokere.

### SHOULD (nyt)
1. **Visningsnavnet bruges kun i h1.** Screener/udforsk, top-10, "Andre med NDI-linse i …" og "Andre i Platforme" viser stadig "Sea Sp ADR", "Lumentum Hldngs", "Southern Co/The", "Seagate Hldgs", "Lpkf Laser & Electronics Se", "Formfactor Inc" og "Iqe Plc". Så privat 55+ ser to navne for samme selskab, når de klikker fra listen til siden. Brug `displayName()` i alle lister (søgning på `p.name` kan blive). Udvid reglerne med "… Se" → fjern (SE = Societas Europaea), "Inc"/"Plc"/"Corp" bevares, men ret versaler ("Iqe" → "IQE", "Formfactor" → "FormFactor") via `NAME_FIX` eller profilens navn. "The Southern Co" bør hedde "Southern Company".
2. **Warrant-siden er stadig en fuld selskabsside (3.949 px).** Under warrant-båndet følger "Hvilket problem løser det? Profiltekst mangler endnu for dette selskab", temaforslag med "iBuyer …"-tvivl, modenhed "Høj vækst (forslag)", "Vægt over tid 0,00 % → 0,00 %" og "Hold øje med -". En warrant har ingen livscyklus og intet problem, den løser. Vis kun båndet, vægten, ISIN og et link til moderselskabet. Skjul resten, når `warrantParent(p)` er sand.
3. **"Hold øje med -"** er en tom stub på selskaber uden `watch` (`selskab.html:208`). Skjul panelet som de andre tomme felter.
4. **Gentagelse i Southern-profilen:** "Ikke en lille reaktor under udvikling" står 4 gange (problem, kort fortalt, rolle, produkter), og "Plant Vogtle har fire enheder i drift" 3 gange. Det læses som en maskine, der gentager sig. Ét forbehold er nok.
5. **Periode: "PERIODE · DYB SIDE"** i kickeren og "Dyb →"/"YTD dyb side →" på fonden står stadig (SHOULD 1 fra cyklus 39). Skriv "PERIODE · I DETALJER".
6. **Periode-bjælken:** skalaen viser "1. jan. 2026" to gange (venstre ende og markeringens label), mens teksten siger "Udgangspunktet i serien er 31. dec. 2025, ikke 1. januar". Det er tre datoer for ét startpunkt. Vis kun "1. jan." og "31. dec." som skala og markeringen som "→ 14. okt.". På `year=all` er "Bjælken er ikke tegnet" en sætning om noget, der ikke er der. Drop sektionen eller skriv "Perioden dækker flere år (22. sep. 2023 → 14. okt. 2026)".
7. **Periode YTD-visningen** viser "Gennemsnitligt årligt afkast +26,4 %" lige under "År til dato +4,0 %" uden at sige, at 26,4 % gælder siden start. Det ligner årets tal. Se compliance SHOULD 2.
8. Uændret fra 39: "22 temaforslag **er afventer** gennemgang" (temaer), "CAGR og gennemsnit →" (entré), "Central Information Dokument" (footer på fonden-AKK, portefølje, drawdown, periode, sammenlign, selskab, tema), "forsinket **kvartalssnapshot**" (fonden) og "Vægt over tid (kvartalssnapshots)" (selskab), selvom om-data siger, at 1. jun. ikke er et kvartalsskifte.

### Nice
- Touch-mål: udforsk har 697 links/knapper under 24 px høje (WCAG 2.2 AA 2.5.8), og ndi-perspektiv har 418. Uændret siden cyklus 36.
- Værdikæder (11,9k px) har nye `<details open>` "Kapacitet, målt år og dato efter beholdningen". Den er god, men åben som standard. Luk den på mobil, så kæden kommer før metoden.

### Persona-linser
- **Privat 55+:** selskabssiden er nu ren (læsbart navn, ingen "–"). Bruddet ligger i listen: "Sea Sp ADR" i screeneren og "Sea Limited (ADR)" på siden.
- **Familiekontor:** warrant-mærket er korrekt og præcist. En warrant-side med "Modenhed: Høj vækst" vil de stadig undre sig over.
- **Idéspejder:** "Andre med NDI-linse i led 4" er en god sidegang, men de rå navne ("Iqe Plc", "Axt Inc") gør den mindre indbydende.
- **Visuel variation:** periode-bjælken er en ny figurtype (godt). Selskabssider er nu kortere, når profilen mangler (SUESS 4,6k px).

## 2026-10-16 06:25 CEST · cyklus 41 (main `6c06c90`, docs-delta 4 filer siden `5bdb064`; live = main)

Live Playwright ved 375 på 32 URL'er (samme sæt som cyklus 40). **0 pageerrors og 0 vandret overflow.** Pages er ajour: ideer form 19 (`#h-cs`) og ordlistens `g-warrant` er live.

### Nyt i delta ✅
- **Ideer form 19 "Hvor tjener teknologien pengene?"** (IDESPEJDER #13) viser Amazon 2024 med AWS ≈ 17 % af omsætningen og ≈ 58 % af driftsresultatet. Tallene stemmer med 10-K (638/108 og 69/40 mia. USD). To vandrette stablede søjler er en ny figurtype og giver variation. Sektionen er en lukket `<details>`, og rækkerne stables ved ≤ 520 px. Forbeholdet "Amazon er ikke i fondens beholdning … ikke en vurdering af aktien" er klart.
- **Ordliste:** "Warrant (tegningsret)" og "Forkortede navne i beholdningen" (Sp ADR, N, /The) forklarer præcis de rå navne, som persona privat 55+ snublede over. Gruppetallene tælles nu i JS, så de ikke kan blive forældede ✅.
- **Ideer-temalinks er ≥ 24 px** (WCAG 2.5.8) ✅. **Risici:** CAGR linker til ordlisten ✅.

### MUST
- Ingen UX-blokere.

### SHOULD (åbne, uændret i dette delta)
1. **Rå navne i lister:** "Sea Sp ADR" står i portefølje, udforsk, selskaber og tema platforms og under "Andre i …" på SoftBank/Carvana. "Southern Co/The" står i udforsk og selskaber, "Iqe Plc" i udforsk, tema chips og selskaber. Ordlisten forklarer nu forkortelserne, men brug `displayName()` i listerne, så navnet er det samme fra liste til side (cyklus 40 SHOULD 1).
2. **Warrant-siden er stadig en fuld selskabsside** (cyklus 40 SHOULD 2). Ordlisteopslaget er nu klar, så det kan linkes fra båndet.
3. **Jargon:** "PERIODE · DYB SIDE" og "Dyb →" (fonden, periode) og "22 temaforslag **er afventer**" (temaer) står stadig.
4. **"Kvartalssnapshot"** står stadig på fonden, fonden-AKK, portefølje, udforsk og selskab, selvom om-data siger, at 1. jun. ikke er et kvartalsskifte.
5. **"Central Information Dokument"** står i footeren på 13 af 32 URL'er (entré, fonden ±AKK, portefølje, udforsk, drawdown, periode, sammenlign, selskab ×2, temaer, tema ×2). Se compliance.
6. **Periode-YTD:** "Gennemsnitligt årligt afkast +26,4 %" står under "År til dato +4,0 %" uden "siden start".

### Nice
- Form 19 bruger Amazon, som ikke er i beholdningen. Et eksempel fra beholdningen (fx Oracle: cloud mod licens) ville binde idéen til fonden. Det kræver dog segmentdata med driftsresultat, som Oracle ikke oplyser på samme måde, så Amazon er et forsvarligt valg.
- "Hold øje med -" blev ikke set i dette sweep (SoftBank og Carvana har `watch`). Tjek en side uden `watch`, før punktet lukkes.
- Touch-mål på udforsk og ndi-perspektiv er uændrede (697/418 under 24 px).

### Persona-linser
- **Privat 55+:** ordlisten giver nu svar på "hvad er Sp ADR?", men de skal stadig finde den. Et `title`/link på rå navne i listen ville hjælpe, hvis `displayName()` ikke udrulles.
- **Familiekontor:** form 19 er den slags regnskabslæsning, de forventer, med kilde (10-K) og egen beregning. Det er godt.
- **Idéspejder:** #13 er leveret. Næste lavthængende frugt er #9 (fakta vs. vurdering-mærke), som også løser compliance-AI-mærkningen på værdikæder.

## 2026-10-16 06:20 CEST · cyklus 42 (main `6c06c90`, ingen docs-delta siden cyklus 41; live = main)

Main er uændret, og live-teksten er byte-identisk med cyklus 41 på alle 32 basis-URL'er. Sweepet er derfor udvidet med **18 nye URL'er ved 375**: 8 selskabssider (Lumentum, SiTime, Wix, MercadoLibre, SoFi, IQE, Chemours, US Antimony) og de 10 øvrige temaslugs. Resultat på alle 50: **0 pageerrors og 0 vandret overflow**. "Overvægt" står kun i negationen "ikke en bevidst overvægt" på alle 11 temasider ✅.

### MUST
- Ingen UX-blokere.

### SHOULD (nye)
1. **Halvdelen af top-10 er tomme stubs.** Efter vægt i PMINDI har nr. 4 Lumentum (1,17 %), nr. 5 SiTime (1,15 %), nr. 6 Poet (0,96 %), nr. 7 Wix (0,96 %) og nr. 9 MercadoLibre (0,93 %) ingen `summary`. På siden står "Profiltekst mangler endnu" og "Rolle, produkter og kunder er ikke beskrevet endnu". SoFi (nr. 11) og Coinbase (nr. 13) er i samme situation. Top-10 linkes fra entré og portefølje, så det er de sider, en ny besøgende åbner først. Prioritér profiler efter vægt frem for alfabetisk. Det skærper cyklus 39 SHOULD 2 (315 af 345 uden summary): de første 7 profiler giver mest.
2. **"Hold øje med -" er bekræftet** (lukker Nice-tjekket fra cyklus 41). Det ses på 7 af 8 nye selskabssider uden `watch`. Samme side viser lige over et AI-udkast under "Hold øje med" i NDI-linsen (fx Lumentum: "Kunder og produktgenerationer …"). Når `watch` mangler, så brug linsens tekst eller skjul den nederste blok. Et "-" ligner en fejl.
3. **Navne er afkortet midt i et ord ved 28 tegn** (depotbankens feltgrænse). `displayName()` fanger dem ikke, så de står også som h1: "Macom Technology Solutions H", "Power Solutions Internationa", "Solaris Energy Infrastructur", "Bitmine Immersion Technologi", "Figure Technology Solut-Cl A", "Neo Performance Materials In", "Idaho Strategic Resources In", "International Workplace Grou". Tilsvarende "Keysight Technologies In" (24 tegn). Det er 10 positioner, så de kan klares med `NAME_FIX`. Det er mere synligt end "Sp ADR", fordi det ligner en fejl.

### SHOULD (åbne, uændret)
- Cyklus 41 SHOULD 1–6 står stadig: rå navne i lister, warrant-siden, "Dyb"/"er afventer", "Kvartalssnapshot", der nu også står i overskriften "Vægt over tid (kvartalssnapshots)" på selskabssiden, hvor sidste punkt er 1. jun. 2026, KID-betegnelsen og periode-YTD.

### Nice
- **Temasider:** "før: Compute" under hvert navn på quantum (5 af 5 er "forslag") er udkastsprog. Privat 55+ ved ikke, hvad "før" henviser til. Skriv "tema før forslag: Compute", eller vis det kun i tooltip.
- **Visuel variation:** de 11 temasider har ens skabelon på 2,5–6k px. Det er fint som opslag, men ingen af dem har en figur. En lille vægt-søjle pr. selskab, som på ideer form 19, ville bryde tabellen op.
- Touch-mål under 24 px er uændrede (udforsk 697, ndi-perspektiv 418, selskaber 382). Temasiderne ligger på 26–131 og selskabssiderne på 22–39.

### Persona-linser
- **Privat 55+:** klikker de på nr. 4 i top-10 (Lumentum), får de en side, der først siger "mangler endnu" og nederst "Hold øje med -". Det er det svageste indtryk på sitet lige nu.
- **Familiekontor:** de afkortede navne (\"…Internationa\") undergraver tilliden til datakvaliteten mere end noget andet, de ser i listen.
- **Idéspejder:** #9 (fakta vs. vurdering) er stadig næste. Profiler efter vægt (SHOULD 1) er en dataopgave, ikke en idé, men har størst effekt pr. time.

> **Addendum (efter merge):** main er under cyklussen rykket til `23ad292` (13 docs-filer). `af96c18` "selskab: skjul tomt 'Hold øje med'-panel" ser ud til at løse SHOULD 2 ovenfor, og `0f32f90`/`a4d1848` berører top-10 og visningsnavne. KID-betegnelse, "kvartalssnapshot" og "Gns. årligt afkast" er uændrede i grep. Hele deltaet gennemgås live i cyklus 43.

## 2026-10-16 06:27 CEST · cyklus 43 (main `24e1fce`, docs-delta 24 filer siden `6c06c90`; live = main)

Live-sweep på 50 URL'er ved 375: **0 pageerrors og 0 vandret overflow**. Live har den nye `NAME_FIX`, så Pages er ikke forsinket.

### Lukket siden cyklus 42 ✅
- **Afkortede navne (cyklus 42 SHOULD 3):** `displayName()` dækker nu alle 10 navne, der var afkortet ved 28 tegn, plus ~35 forkortelser (Applied Material, Palantir Tchnl …). Det gælder udforsk, selskaber, portefølje, h1 og CSV (CSV har nu også "Beholdningsnavn"). 0 hits i liste-teksterne.
- **"Hold øje med -" (cyklus 42 SHOULD 2):** panelet er skjult, når det er tomt. 0 hits på 8 selskabssider.
- **Top-10:** udvalget tages nu altid efter vægt, også når man sorterer på navn, og summen står over listen ("De 10 største udgør tilsammen 11,9 % af PMINDI (345 selskaber i alt)"). Det giver en god kontekst for koncentration til familiekontoret.
- **Livscyklus på dansk:** "Før omsætning / Høj vækst / Vækst med overskud / Moden" står både i kurven og i ordlisten, og engelsk står i parentes. Det lukker jargon-punktet fra cyklus 41.
- **Tema-knapper i udforsk** viser antal (primært + multi-tag), og der er en forklaring under knapperne.
- **NDI på X:** den nye datolinje (2. maj 2025 → 15. okt. 2026) giver visuel variation. Ved 375 ligger prikkerne til højre oven i hinanden (8–10 opslag i okt.), men det fungerer stadig.

### MUST
- Ingen UX-blokere.

### SHOULD (nye)
1. **`vaerdikaeder.html` bruger ikke `displayName()`.** "6 fælles: Tesla, Lpkf Laser & Electronics Se, **Power Solutions Internationa** og 3 til" står 3 gange på siden. Det er den eneste rest af den afkortede navnefejl, og den sidder på sitets mest besøgte forklaringsside. Brug `displayName` i fælles-listen.
2. **Store/små bogstaver i h1 på selskabssider:** "Sitime Corp", "Iqe Plc", "Wix.Com Ltd", "SoFi Tech", "Chemours Co", "United States Antimony Corp". De står i rå form fra depotbanken, og 3 af dem er i top-10/top-15. Tilføj `NAME_FIX`: SiTime, IQE, Wix.com, SoFi Technologies, Chemours, United States Antimony.
3. **`omkostninger.html:356` "Tast 1 eller 5."** står i summary-teksten. Det er en tastaturgenvej, som ikke virker på mobil, og privat 55+ forstår den ikke. Flyt den til en `title`, eller vis den kun ved `(hover:hover)`.

### SHOULD (åbne)
- Cyklus 42 SHOULD 1: 5 af top-10 har stadig ingen profiltekst (Lumentum, SiTime, Poet, Wix, MercadoLibre, og også SoFi). "Profiltekst mangler endnu" er uændret på alle 6.
- Cyklus 41: "Dyb"/"YTD dyb side" på fonden, "Kvartalssnapshot" (portefølje/udforsk-forklaring og "Vægt over tid (kvartalssnapshots)").
- Touch-mål under 24 px er uændrede (udforsk 698, ndi-perspektiv 418, selskaber 382). Lane-C har rettet sine egne sider (ideer, invester, FAQ, ordliste).

### Nice
- Temasiderne har stadig ingen figur (cyklus 42).
- `fakta.html` har fået en fald-hældning ("dd-slope") og en "rail-key" ("Søjlerne deler skalaen 0 til X kr."). Det er god forklaring ✅.

### Persona-linser
- **Privat 55+:** navnene ser nu professionelle ud i listerne. Den svageste oplevelse er stadig "Profiltekst mangler" på nr. 4–7.
- **Familiekontor:** top-10-summen (11,9 %) og "Beholdningsnavn" i CSV giver mere tillid til dataene.
- **Idéspejder:** #9 (fakta vs. vurdering) er uændret næste. Profiler efter vægt er stadig det, der giver mest pr. time.

## 2026-10-16 06:33 CEST · cyklus 44 (main `24e1fce`, ingen docs-delta siden cyklus 43; live = main)

Live-sweep på 50 URL'er ved 375: **0 pageerrors og 0 vandret overflow**. Tiny-tal og sidehøjder er identiske med cyklus 43 på alle 50 URL'er, så live er uændret, og Pages er ikke forsinket.

### MUST
- Ingen UX-blokere.

### SHOULD (åbne, uændret fra cyklus 43, i prioriteret rækkefølge)
1. `vaerdikaeder.html` bruger ikke `displayName()`. "Power Solutions Internationa" og "Lpkf Laser & Electronics Se" står i fælles-listen (3×).
2. Store/små bogstaver i h1 på selskabssider står i rå form: Sitime Corp, Iqe Plc, Wix.Com Ltd, SoFi Tech, Chemours Co, United States Antimony Corp. Løsning: `NAME_FIX`.
3. `omkostninger.html:356` "Tast 1 eller 5." er en tastaturgenvej i den synlige tekst og virker ikke på mobil.
4. 5–6 af top-10/15 viser "Profiltekst mangler endnu" (Lumentum, SiTime, Poet, Wix, MercadoLibre, SoFi).
5. "Dyb"/"YTD dyb side" og "kvartalssnapshot" er jargon (cyklus 41).
6. Touch-mål under 24 px er uændrede: udforsk 698, ndi-perspektiv 418, selskaber 382.

### Ny (UX-side af en compliance-SHOULD)
- Footeren på `drawdown.html`, `embed/chart.html` og `periode.html` har ingen "Generel information, ikke investeringsrådgivning". Se compliance cyklus 44 SHOULD 7. Embed er den side, der deles uden for sitet, så footeren skal kunne stå alene.

### Nice
- Temasiderne har stadig ingen figur.

### Persona-linser
Uændret fra cyklus 43. Det, der giver mest pr. time, er stadig (a) `displayName` i værdikæder og `NAME_FIX` for h1, som er én lille ændring, og (b) profiler for top-10 efter vægt.

### Addendum 06:38: main `cfb03ab` (docs-delta 10 filer)
- **Lukket ✅:** jargon i værdikæder ("Flodsystem/Treemap/Sunburst" → "Dæmninger/Temaer", "Felter/Ringe", "Kæden som en flod", "TEKNOLOGI · VÆRDIKÆDER"). Princip-kortet "Vælg udviklingen, ikke vinderen" er nu klart i stedet for "Udvikling > vinder". "Screener · NDI-linse" → "Udforsk porteføljen". Udforsk-filtre er foldet sammen på mobil med "N aktive", hvilket burde sænke tiny-tallet (698) markant. Det bekræftes i næste live-sweep.
- **Åbne:** `vaerdikaeder.html` har stadig 0 forekomster af `displayName` (SHOULD 1). `omkostninger.html:356` "Tast 1 eller 5" er uændret (SHOULD 3). `selskab.html:202` "kvartalssnapshots" er uændret.

## 2026-10-16 06:40 CEST · cyklus 45 (main `b6dfcba` inkl. lane-D + lane-B; live = `cfb03ab`, mens lane-D-deltaet på 2 filer endnu ikke er deployet)

Live-sweep på 50 URL'er ved 375: **0 pageerrors og 0 vandret overflow.** Live er nu `cfb03ab`. Sidehøjder er ændret på 18 URL'er (værdikæde ai-compute +1062 px på grund af "Hvad ændrer sig", nyhedsarkiv +1331, temaer/selskaber −13 til −511), og tiny-tallet er faldet med 2–6 på selskabs- og temasider.

### Verificeret live (cfb03ab) ✅
- Udforsk-filtrene er foldet sammen på mobil ("Filtre (tema, status, modenhed) · 0 aktive"). Siden er 900 px kortere.
- Opslaget og markøren fra 13. aug. er væk (0 forekomster af "13. aug" på forsiden og i nyhedsarkivet).
- Værdikæde-jargon er ryddet op, og AI-udkast-mærket er synligt på `vaerdikaeder.html` og `vaerdikaede.html?id=ai-compute`.

### MUST
- Ingen UX-blokere.

### SHOULD
1. **Ny (korrektion til addendum c44): foldningen sænker IKKE tiny-tallet på udforsk.** Det er stadig 698. En opdeling viser 345× navnelink i rækkerne (h18) + 333× `a.lens-mark` ◉ (h16) + 20 andre. Filtrene var aldrig årsagen. Rettelse: `min-height:24px` (eller 44 px på rækken) på række-linket, og ◉ bør enten være en del af række-linket eller have padding. Det er det samme mønster som ndi-perspektiv 418 / selskaber 382.
2. **Ny: foldningen gemmer oplysningerne om maskinel klassifikation.** "Modenhed: 345 af 345 placeret - alle som forslag (maskinelt …, afventer NDI)" og "forslag = tema foreslået i udkastet" står nu kun inde i den lukkede `<details>`. Synligt er kun "345 resultater · udkast-klassifikation". Se compliance c45 SHOULD 8. Rettelse: én synlig linje under resultattallet: "Tema og modenhed er maskinelle forslag, afventer NDI."
3. `vaerdikaeder.html` mangler stadig `displayName()` ("Power Solutions Internationa", "Lpkf Laser & Electronics Se").
4. Rå versaler i h1 på selskabssider (Sitime Corp, Iqe Plc, Wix.Com Ltd …): `NAME_FIX`.
5. `omkostninger.html:356` "Tast 1 eller 5." står stadig i den synlige summary-tekst.
6. 5–6 af top-10/15 viser "Profiltekst mangler endnu".
7. ~~Jargon "kvartalssnapshot"~~ er lukket ✅ af lane-B (`b6dfcba`). Moderselskaber linker nu til deres warrants (fx Power Solutions) ✅.

### Nice
- Temasiderne har stadig ingen figur.

### Persona-linser
- **Privat (375):** Udforsk er markant roligere nu. Den største tilbageværende friktion er de små tap-mål i listen (punkt 1).
- **Family office:** De mærker hurtigst forsvinden af "maskinelt"-forbeholdet fra udforsk (punkt 2). Det skal være synligt uden klik.

## 2026-10-16 06:42 CEST · cyklus 46 (main `ffed556`, docs-delta 4 filer siden `b6dfcba`; live = main)

Live-sweep på 50 URL'er ved 375: **0 pageerrors, 0 vandret overflow.** Live har nu både lane-B (`b6dfcba`) og lane-C (`53fa358`, `247f815`, `03722d7`). Eneste ændringer mod c45: selskabssider +17 px (ny tekst "Vægt i fonden over tid … ikke aktiekurs"), ideer +1 tiny (19. TOC-link), udforsk +16 px.

### Verificeret live ✅
- `ndi-perspektiv.html`: 333 kort bruger nu `displayName()`. Ingen "Sp ADR", "/The" eller "Hldngs" tilbage. Søgning på "taiwan" finder TSMC via det rensede navn (lane-R SHOULD 6, delvist).
- `laer/livscyklus.html`: skitsen siger nu "Vækst med overskud" og "Moden", samme fem navne som Udforsk-filteret. GARP/value står kun som `<small>`-forklaring. 0 overflow ved 375.
- `om-data.html#g-screener` hedder nu "Udforsk (screener)" og matcher h1 "Udforsk porteføljen".
- KID-footer på selskab og udforsk: "Dokument med central information (KID, …)" ✅.

### MUST
- Ingen UX-blokere.

### SHOULD (åbne, uændret i kilden)
1. Udforsk tiny 698 (række-link h18 + ◉ h16). Rettelse som i c45.
2. Forbeholdet om maskinel klassifikation på udforsk står kun i lukket `<details>` på mobil (compliance SHOULD 8).
3. `vaerdikaeder.html` bruger stadig ikke `displayName()` (0 forekomster).
4. Rå versaler: h1 på selskabssider (Sitime Corp, Iqe Plc, Wix.Com Ltd) og nu også synligt i ndi-perspektiv ("WEBTOON"). `NAME_FIX` er én fælles rettelse begge steder.
5. `omkostninger.html:356` "Tast 1 eller 5." står stadig i summary.
6. 5–6 af top-10/15 har "Profiltekst mangler endnu".

### Nice
- ndi-perspektiv: blandede selskabssuffikser i samme liste ("ACM Research", "Advantest" ved siden af "Ambiq Micro Inc", "Alpha and Omega Semiconductor Ltd"). Navnene kommer fra forskellige kilder. Overvej at fjerne Inc/Corp/Ltd i `displayName()` til visning.
- ndi-perspektiv søgetæller: "1 selskaber passer" → "1 selskab passer".
- Temasiderne har stadig ingen figur.

### Persona-linser
- **Privat (375):** Livscyklus og Udforsk taler nu samme sprog, uden GARP/value i figuren. Godt for begynderen. Største friktion er stadig små tap-mål (1).
- **Family office:** De lægger mærke til, at forbeholdet "maskinelt, afventer NDI" ikke er synligt uden klik (2). Det samme gælder ujævne navne i ndi-perspektiv (Nice), som virker uredigeret.

## 2026-10-16 06:49 CEST · cyklus 47 (main `4f52bd6`, docs-delta 9 filer siden `ffed556`; live = main)

Main flyttede sig under cyklussen (lane-A værdikæder/kvante, lane-E fact-checks, lane-X fakta/omkostninger/periode/ndi-paa-x). Jeg har derfor kørt to sweeps på 50 URL'er ved 375. Begge gav **0 pageerrors og 0 vandret overflow.** Kontrolleret med md5: live = main for omkostninger, fakta, periode og x-feed.js.

Ændringer mod c46: vaerdikaeder +6.963 px og tiny 18 → 121; vaerdikaede?id=ai-compute +1.629 px; ndi-paa-x tiny 82 → 102; fakta/omkostninger/periode +500–630 px.

### Verificeret live ✅
- `value-chains.json`: space har 21 nøgler igen (ai-compute 11, physical 14, energy 14, quantum 15). Pædagogikblokkene fra merge-tabet kl. 03 er tilbage og renderer.
- `periode.html`: "To tal, to perioder". Kortene "År til dato +4,0 % (31. dec. 2025 → 14. okt. 2026)" og "Gennemsnit pr. år siden første NAV +26,4 %" står side om side med teksten "ingen af dem siger noget om det næste år". Klart for privatpersonaen.
- `omkostninger.html`: åbner nu med "Ca. 2,8 % om året … KID 2,79 % / 2,85 % … ca. 2.790 kr. / 2.850 kr. på 100.000 kr." og har en ny peg-figur over postsatser, hvor den eneste forskel er porteføljetransaktion (0,08 pp = 80 kr.). Det lukker FO-personaens gamle omkostnings-MUST på omkostninger og fakta.
- `fakta.html`: KID 1 år/5 år i kroner (80 kr. / 60 kr.) med "ikke det samme tal". Pædagogisk stærkt, men læs SHOULD 8.

### MUST
- Ingen UX-blokere.

### SHOULD
1–6 uændret fra c46 (udforsk tiny, forbehold i lukket details, displayName i vaerdikaeder, rå versaler, "Tast 1 eller 5", manglende profiler).
7. **Ny: `?view=fonden&fund=PMINDIAKK` viser ingen omkostninger.** `js/app.js:346–367` returnerer før blokken "Omkostninger (kort)" (`app.js:459`). Den, der vælger AKK, ser altså ikke 2,85 %, mens PMINDI-visningen viser "2,79 % (PMINDI) / 2,85 % (PMINDIAKK)". Ret: genbrug den samme omkostningssektion i AKK-grenen. Det er tilladt efter freeze som en fejlrettelse.
8. **Værdikæder: 121 tap-mål under 24 px ved 375** (før 18): 61 tekstlinks på h20, 17 `a.hit` h20, 13+1 SVG-links i riverMap (h23/h12) og 5 `a.src` h17. Det kommer af de gendannede pædagogikblokke og er ikke en regression i logik. Fakta/omkostninger bliver tunge: fakta har nu tre måder at sige "80 kr. vs. 60 kr. er ikke samme tal". Overvej at bevare én.

### Nice
- Temasider stadig uden figur. ndi-perspektiv "1 selskaber passer".

### Persona-linser
- **Privat (375):** Periode-kortene er nu den bedste forklaring af CAGR vs. periode på sitet. Omkostninger svarer direkte på "hvad koster det" i første linje.
- **Family office:** Omkostningsbilledet er nu komplet og ærligt (KID-RIY, postsatser, "ikke et ÅOP"). Det eneste hul er AKK-visningen (SHOULD 7).

## 2026-10-16 06:57 CEST · cyklus 48 (main `83c64d0`, docs-delta 17 filer siden `4f52bd6`; live = main)

Main flyttede sig to gange under cyklussen (lane-A kildeangivelser, derefter lane-B/C/E: `displayName` WORD_FIX, udforsk/ndi-perspektiv tap-mål, profil-fallback, unique-metrics +132 linjer). Jeg har kørt to sweeps på 50 URL'er ved 375 (c48, c48b). Begge gav **0 pageerrors og 0 vandret overflow**. Kontrolleret med md5: live = main for app.js, data.js, selskab, ideer, om-data, vaerdikaeder, vaerdikaede og value-chains.json.

### Lukket ✅ (verificeret live)
- **SHOULD 1 (udforsk tiny):** 698 → **20**. Rækkelinks har nu min-height 24. Portefølje 166 → 6, ndi-perspektiv 418 → 85.
- **SHOULD 2 (maskinel-forbehold i lukket details):** `.uf-machine-note` står nu synligt over tabellen ("Tema og modenhed er maskinelle forslag … afventer NDI").
- **SHOULD 4 (rå versaler):** h1 viser nu SiTime, IQE, Wix.com, SoftBank Group og Lumentum Holdings. WORD_FIX + fjernet Inc/Corp/Ltd i `displayName()` lukker også Nice-punktet om blandede suffikser.
- **SHOULD 6 (manglende profiler):** Selskaber uden profil viser nu linsens "Hvad ejer man?" med AI-udkast-mærke og "En længere profiltekst mangler endnu" (fx Lumentum: "Lasere og optiske komponenter …"). Det er ikke længere et tomt felt.
- **Fonden:** CAGR-kortet hedder nu "Gns. årligt afkast siden start" og har en dato-periode.
- **Kildeangivelser:** "NDI ugebrev"/"BLOG"/"BOG" står ikke længere nogen steder i docs/ (0 hits). Mads introduceres som NDI's stifter på værdikæder.

### MUST
- Ingen UX-blokere.

### SHOULD (åbne)
3. `vaerdikaeder.html` bruger stadig ikke `displayName()`.
5. `omkostninger.html:441` "Tast 1 eller 5." står stadig i summary.
7. `?view=fonden&fund=PMINDIAKK` viser ingen omkostninger (`app.js` AKK-grenen returnerer før "Omkostninger (kort)").
8. Værdikæder: 123 tap-mål under 24 px ved 375 (uændret fra c47).
9. **Ny (lille):** `selskab.html` `.tri` er tre lukkede `<details>` ("Kapacitet / Målt år / Efter 1. juni 2026"). På en selskabsside, der allerede er 4.300–6.000 px ved 375, bliver det endnu en klikflade. Overvej én sætning frem for tre foldere.

### Nice
- "Chemours Co" og "SoFi Tech" (Co bevares bevidst i WORD_FIX, men giver et ujævnt indtryk ved siden af "SiTime").
- Temasider stadig uden figur.

### Persona-linser
- **Privat (375):** Udforsk og portefølje er nu reelt tap-bare. Det er nattens største mobilforbedring. Profil-fallback betyder, at top-selskaber ikke længere ender i "mangler endnu".
- **Family office:** Navnene ser redigerede ud nu. Det eneste synlige hul tilbage er AKK-visningen uden omkostninger (SHOULD 7).

## 2026-10-16 07:01 CEST · cyklus 49 (main `83c64d0` uændret siden c48; live = main)

Main har ikke flyttet sig siden c48. Jeg har kørt et nyt sweep på 50 URL'er ved 375 (c49): **0 pageerrors, 0 vandret overflow**. Tiny-sum (2.800), sidehøjder, hits og flags er identiske med c48b. Kontrolleret med md5: live = main for app.js, index, omkostninger, drawdown og embed/chart.

### Korrektion
- **SHOULD 3 er lukket.** `vaerdikaeder.html:890–892` importerer `displayName` og bruger den via `coName()` (commit `7b23621`). Den var fejlagtigt listet som åben i c48.
- Nice "1 selskaber passer" (ndi-perspektiv) findes ikke længere i den synlige tekst. Lukket.

### MUST
- Ingen UX-blokere.

### SHOULD (åbne, uændret i kilden)
5. `omkostninger.html:441` "Tast 1 eller 5." står stadig i summary.
7. `?view=fonden&fund=PMINDIAKK` viser ingen omkostninger (AKK-grenen i `app.js` ca. linje 346–367 laver `return` før "Omkostninger (kort)"). **Højeste prioritet før 08:00-freeze** (fejlrettelse).
8. Værdikæder: 123 tap-mål under 24 px ved 375.
9. `selskab.html` `.tri` er tre lukkede details.

### Persona-linser
Uændret fra c48. Privat: mobil er tap-bar på udforsk/portefølje. FO: AKK-omkostninger er det eneste synlige hul.

## 2026-10-16 07:03 CEST · cyklus 50 (main `83c64d0` uændret; live = main)

Der er ingen docs-delta siden c48. Live md5 = main på de kontrollerede filer, og nøglesiderne svarer 200. Fundene fra c48/c49 (50 URL'er @375, 0 fejl/overflow) gælder uændret.

### MUST
- Ingen.

### SHOULD (åbne, uændret)
- PMINDIAKK-fondsvisningen mangler en omkostningslinje. Det er både en persona- og FO-MUST og et compliance-punkt (SHOULD 9).
- Værdikæder har stadig små tap-mål (<24px) @375, jf. c47.
- Drawdown og embed mangler en synlig ikke-rådgivningslinje (compliance-SHOULD 7).

### Nice
- Uændret fra c46 (blandede Inc/Ltd-suffikser, "1 selskaber passer").

## 2026-10-16 07:15 CEST · cyklus 51 (main `83c64d0` uændret; live = main)

Der er ingen docs-delta siden c48. Live md5 = lokal for index, drawdown, omkostninger, risici, invester, værdikæder og js/app.js. Jeg har kørt en ny live-sweep af 50 URL'er @375 (/tmp/laneR/c51). Den gav 0 sidefejl og 0 horisontalt overflow, og tiny, højde, flags og hits er identiske med c48b.

### MUST
- Ingen.

### SHOULD (åbne, genverificeret i kilden)
- `?view=fonden&fund=PMINDIAKK` har 0 forekomster af "omkostning" i den synlige tekst. "2,85 %" står kun i PMINDI-panelet (`js/app.js:460`), som AKK-grenen aldrig når frem til. Det er en persona- og FO-MUST.
- `omkostninger.html:441` "Tast 1 eller 5." står stadig i summary.
- Værdikæder har stadig tap-mål under 24 px @375 (jf. c47).
- `selskab.html` `.tri` er tre lukkede details.

### Nice
- Uændret fra c46.
