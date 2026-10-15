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
