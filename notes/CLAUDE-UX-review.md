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
