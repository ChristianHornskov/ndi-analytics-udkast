# Review af NDI Analytics udkast v1 (15. oktober 2026)

Gennemgået: live siden https://christianhornskov.github.io/ndi-analytics-udkast/ (HTTP 200, commit b4f4e00) og de lokale filer i /workspace/ndi-analytics/docs, herunder ikke publicerede ændringer i js/app.js, selskab.html og embed/. Data er tjekket mod /workspace/viden, data/fund-meta.json og Fundmarkets offentlige fondssider (hentet 15. oktober 2026 ca. kl. 20.20).
Note om citater: siden bruger tankestreger. I citaterne nedenfor er de erstattet med kolon eller punktum, så filen overholder stilreglen. [V] = verificeret. [A] = min vurdering.

## Samlet vurdering
Udkastet er solidt bygget og har gode compliancegreb (advarsler ved alle tal, Nasdaq slået fra, eksponering frem for anbefaling, ingen holdninger pr. aktie). Det bør dog ikke vises uden for kredsen, før fire blokerende forhold er løst: interne noter med fortrolige tal er offentligt tilgængelige, den fulde portefølje vises uden forsinkelse, PMINDIAKK viser afkast for under 12 måneder, og flere selskabstal er tydelige datafejl. Det passer godt til Mads' "hus" og hans afvisning af GICS og P/E, men daglige "movers" og et enkelt tema pr. selskab trækker i den forkerte retning. [A]

## 1. Fakta

### Korrekt [V]
* ISIN PMINDI DK0062499810 og PMINDIAKK DK0064642623 stemmer med newdealinvest.dk (viden/_web/7eab3afb.txt) og fund-meta.json.
* Klassebetegnelser: "NewDeal Invest, kl. n" udloddende og "NewDeal Invest Akk., kl. n" akkumulerende stemmer med Fundmarket.
* "Ingen minimumsinvestering" stemmer med newdealinvest.dk ("ingen minimuminvestering") for de to danske kl. n klasser.
* Årsafkast: fund-meta.json afstemmer 2023 (16,74 %), 2024 (46,37 %) og 2025 (15,21 %) for PMINDI og 2025 (minus 5,61 %) for PMINDIAKK mod Fundmarkets årsrapport.
* Seneste NAV i serien (14. oktober: PMINDI 126,52, PMINDIAKK 98,40) passer med Fundmarket 15. oktober (122,48 og 95,20 efter et fald på 3,20 % og 3,25 % i dag). Serien giver ÅTD ca. 4,0 % og 4,2 % pr. 14. oktober, hvilket efter dagens fald svarer til Fundmarkets 0,72 % og 0,86 %.
* NAV 30. september (139,35 og 108,79) stemmer med Fundmarkets risikorapporter (viden/00_overblik.md).
* Risikoklasse 5 af 7 og anbefalet ejertid 5 år står i fund-meta.json fra KID produceret 14. august 2026 (vises ikke på siden, se compliance).
* Siden nævner ikke AUM. Det er godt, fordi tallene i viden ikke er ens (736,8 eller ca. 758 mio. kr. i september).

### Forkert [V]
1. **Selskabstal med tydelige data fejl** (data/portfolio.json, vises i tabel, selskabsside og "movers"): KLA ÅTD minus 86,1 %, Tokyo Electron minus 69,5 %, Carvana minus 86,7 %, SoftBank 1 år minus 77,8 % men ÅTD plus 8,8 %. Det ligner aktiesplit eller valutafejl, ikke kursfald. SoftBank er sidens "Eksempel" knap. Alle ÅTD og 1 års tal pr. selskab skal kontrolleres mod justerede kurser, eller fjernes i v1.
2. **"Fald fra top" er ikke fald fra top.** Feltet drawdown52Approx er bare det laveste af ÅTD og 1 år. Den lokale, ikke publicerede version kalder det endda "Fald fra 52-ugers top". Det er forkert betegnelse.
3. **Modenhed er misvisende:** 364 af 392 selskaber i PMINDI står som "High growth", kun 10 "Præ-revenue" og 4 "Value". SpaceX står som "GARP" med P/S 9,0. Heuristikken giver ikke et retvisende billede af bogens livscyklus.
4. **Tema "Andet / uklassificeret" omfatter 140 af 392 selskaber (36 %).** Det strider mod budskabet om at erstatte de 11 sektorer.
5. **Startdatoer er uens:** portfolio.json siger 22. september 2023 (PMINDI) og 5. december 2025 (PMINDIAKK), fund-meta.json siger 25. september 2023 og 2. december 2025. Prospektet siger første handelsdag 9. oktober 2023 for kl. n og at Akk afdelingen er stiftet 21. november 2025 (viden/emner/konflikter.md). Vælg én definition og skriv den: f.eks. "Beregnet fra første NAV 22. september 2023".

### Uklart, skal afklares
* Udbytte 38,90 kr. (ex 22. januar 2025) og 38,00 kr. (ex 20. januar 2026) pr. andel. Det er ca. 25 % af kursen og bør krydstjekkes mod Fundmarkets udbyttemeddelelser.
* 392 og 377 positioner pr. 15. oktober mod 381 (PA 30. september) og 383 (oktober). Sandsynligvis inklusive små poster. Skriv "værdipapirer" eller filtrer kontanter fra.
* P/S tal: kilde og dato er ikke angivet.
* Datodato: siden siger "Data opdateret pr. 15. okt. 2026", men afkastserien slutter 14. oktober.
* Teksten "PMINDIAKK: Typisk pension / VSO" og "PMINDI: Typisk frie midler / aktiesparekonto" er skattepåstande, som ikke er dokumenteret i viden.
* Akk kl. f (DK0064531552) er ikke nævnt. Det er fint, hvis det er bevidst, men "Ingen minimumsinvestering i de danske andelsklasser" bør så præciseres til kl. n.

## 2. Compliance

### Blokerende
1. **Interne noter er offentlige.** docs/notes/ ligger på GitHub Pages: STATUS.md, SPEC.md, UX-krav.md, IDEAS.md og VIDENSBOT-krav.md svarer alle HTTP 200, og STATUS er linket fra footeren. VIDENSBOT-krav.md indeholder tal fra en investeringsanalyse mærket "Fortroligt" (28,07 % halvledere, 79,54 % USD), intern compliancediskussion og navne fra mødet. **Ændring:** flyt notes/ ud af docs/ (f.eks. til /notes i repoet), fjern linket "STATUS" i footeren, og vurder om repoet skal være privat. Det kræver et push, som Leo skal godkende. Bemærk at git historikken stadig rummer filerne.
2. **Fuld beholdning uden forsinkelse.** Alle 392 positioner med vægte vises "pr. 15. okt. 2026", og "Største stigninger (dagen)" viser dagens bevægelser. Det er i praksis live beholdning. Krav: kun offentlige beholdningsdata med forsinkelse. **Ændring:** brug seneste offentliggjorte beholdning (f.eks. måneds eller kvartalsdata med mindst 30 dages forsinkelse), skriv "Beholdning pr. [dato], offentliggjort med forsinkelse", og fjern daglige movers.
3. **PMINDIAKK viser afkast for under 12 måneder.** Klassen startede i december 2025, men siden viser totalafkast, CAGR, ÅTD, månedskalender og graf. Historiske afkast for under ét helt år må ikke bruges i markedsføring. **Ændring:** for PMINDIAKK: "Afkasthistorik vises, når klassen har 12 måneders historik (december 2026). Klassen følger samme strategi som PMINDI." Brug ikke annualiseret CAGR for perioder under ét år.
4. **Korte perioder og CAGR for PMINDI.** Knapperne "1 md.", "3 mdr." og "ÅTD" samt "Seneste 12 måneder" fremhæver korte perioder. Markedsføringsforretningsgangen (FG v1.2, viden/00_overblik.md pkt. 152) kræver egen hjemmel for historiske resultater. **Ændring:** vis afsluttede kalenderår (2024, 2025 og 2023 markeret som delår fra start) og "siden start", og lad korte perioder ligge bag "Vis flere perioder" med tydelig advarsel, eller fjern dem, til Fundmarket har godkendt visningen.

### Bør rettes
5. **Nasdaq knap og tekst.** Embed grafen viser en deaktiveret "Nasdaq-100" knap og en legend "PMINDI / Nasdaq-100". Teksten "Nasdaq-sammenligning kræver Fundmarkets godkendelse" er ikke præcis: forretningsgangen forbyder Nasdaq QQQ som sammenligning (viden/00_overblik.md pkt. 152). **Ændring:** fjern knap og legend helt og skriv kun "Fonden har intet benchmark."
6. **Risikoindikator mangler.** Siden henviser til KID, men viser ikke risikoklassen. **Ændring:** tilføj ved alle afkasttal: "Risikoindikator 5 på en skala fra 1 til 7 (KID, 14. august 2026). Anbefalet ejertid 5 år."
7. **KID og prospekt er ikke linket direkte.** Footeren siger "KID og prospekt: søg fondene hos din platform". fund-meta.json har direkte links (node-api.fundmarket.dk/funds/documents/priip_ipm140b og priip_ipm145b). **Ændring:** "Læs KID for PMINDI og PMINDIAKK og prospektet før du investerer" med direkte links.
8. **Bagatellisering af risiko.** "Store kursudsving er et grundvilkår: ikke det samme som langsigtet risiko." KID måler risiko via udsving. **Ændring:** "Store kursudsving er et grundvilkår for teknologiaktier. Du skal kunne holde investeringen i mindst 5 år og tåle store fald undervejs."
9. **Investeringsvejledning i "Sådan investerer du".** "Typisk pension / VSO" og "Typisk frie midler / aktiesparekonto" ligner rådgivning og er udokumenteret skat. **Ændring:** "PMINDI udbetaler udbytte. PMINDIAKK geninvesterer afkastet. Hvilken der passer til dig, afhænger af din situation. Søg rådgivning ved tvivl."
10. **Kontekstprikker på grafen er opdigtede.** context-events.json har tekster som "Forårsuro 2025" og "Drawdown-periode 2026 (illustration)" med kilden "Udkast: generel markedskontekst" og noten "Kræver redaktionel gennemgang". På en afkastgraf er det markedsføring uden dokumentation. **Ændring:** fjern prikkerne i v1, eller vis kun dokumenterede hændelser (udbytte ex dato) med kilde.
11. **Tilmeldingsboks (GDPR).** Teksten "Vi minimierer data (GDPR)" har en stavefejl og mangler link til privatlivspolitik, oplysning om dataansvarlig, formål, dobbelt bekræftelse og at interesse for bestemte aktier kan være følsom. Feltet er inaktivt, så det er ikke blokerende.
12. **Afkasttekst for udloddende klasse.** Grafen er totalafkast med geninvesteret udbytte, hvilket er korrekt. Skriv dog i grafen: "PMINDI: kursen falder med udbyttet på ex dato. Totalafkastet viser værdien, hvis udbyttet var geninvesteret." Det mindsker forvirring med Fundmarkets kursgraf.
13. **Selskabsdata på selskabsside** ("Hvilket problem løser det", "Hold øje med") er skrevet af AI uden mærkning. **Ændring:** "Beskrivelse genereret med AI og gennemgået af NDI [dato]. Generel information, ikke en anbefaling."
14. **Stil:** siden bruger tankestreger mange steder og blander engelske ord (High growth, GARP, Præ-revenue). Ret til NDI's sprogregler før lancering.

### OK [V]
* Advarslen "Historisk afkast er ikke en pålidelig indikator for fremtidigt afkast. Du kan tabe en del af eller hele din investering." står ved alle afkasttal, i footer og embed.
* "Totalafkast i DKK efter fondens løbende omkostninger, før skat og egne handelsomkostninger" er præcist.
* "Segmenter og temaer viser eksponering, ikke en anbefaling" står på alle udforskningssider.
* Ingen holdninger eller forklaringer af dispositioner pr. aktie. AI resuméer er ikke aktive og varslet mærket som AI.
* Ingen superlativer fundet i sidens tekster ("bedste", "unik", "eneste", "garanti" forekommer ikke).
* Ingen persondata på selve siden. Porteføljeholdet nævnes uden navne.
* noindex,nofollow og tydelig markering "Udkast". Bemærk at noindex ikke beskytter mod adgang.
* Røde måneder i kalenderen er synlige, og den lokale version linker til fuld historik.

## 3. Sammenhæng med Mads' tankegang

**Passer godt [A]**
* Husmetaforen er omsat til en entré med tre døre (vision 43:06, VIDENSBOT punkt 63).
* GICS er erstattet af NDI temaer, og P/E vises ikke for vækstselskaber (vision 13:04 og 27:36). Det svarer til bogens princip om, at værdi ikke kan beregnes (TM afsnit 10).
* "Sådan tænker vi" punkt 1 og 2 ("vinderne kan ikke udpeges sikkert", "bred spredning på tværs af værdikæden, ikke én vinderaktie") rammer "Vores mål er ikke at finde den ene vinder" (BLOG 13. juli 2026).
* CAGR beregnes geometrisk, hvilket passer med bogens pointe om at aritmetiske gennemsnit overvurderer afkast.

**Trækker i forkert retning [A]**
* **Daglige movers og 1 måneds knap** fremhæver kort sigt. Mads afviser bedømmelse på under 1 år og råder private til ikke at handle ind og ud (BLOG 16. juni 2025, TM afsnit 4).
* **Ét tema pr. selskab.** Mads og Jesper ønskede tags, så Tesla både er energi og forbrugsgoder (27:36 og 47:37). Data har kun feltet "theme". Tesla står kun som "Fysisk tech".
* **Temaoptælling kan læses som temabets.** Fonden er tæt på ligevægt med 250 til 400 positioner på 0,05 til 1 % (PA 30. september 2026). Siden siger det ikke. Tilføj: "Porteføljen er bredt spredt på ca. 380 selskaber, og ingen vægt over ca. 2 %. Temaerne viser eksponering, ikke bevidste overvægte."
* **Variance drag og spredning forklares ikke.** Mads' argument for bred spredning (høj varians i enkeltaktier, "Spredning er alfa og omega", BLOG 7. april 2025) er sidens stærkeste pædagogiske pointe og mangler.
* **P/E skjules frem for at forklares.** Mads ønskede at forklare P/E som markedets forventning (13:04): "P/E er høj, fordi markedet forventer…". Siden skjuler blot P/E.
* **"Store kursudsving er … ikke det samme som langsigtet risiko"** er Mads' synspunkt for fonden, men skal formuleres compliant (se punkt 8).
* **Målgruppe:** bogens råd er til private og fondens praksis er anden. "Sådan investerer du" og movers blander de to. Hold sidens tone på "sådan ser vi på teknologi", ikke "sådan bør du handle".

## 4. Dækning af ønskerne fra mødet (VIDENSBOT-krav punkt 1 til 82)

**Med [V]:** entré med døre (51, 58, 59, 63, 64), valg af andelsklasse (57), CAGR tydelig (62), månedskalender (69), fald fra top (73, men forkert beregnet), NDI temaer uden GICS (5, 20), modenhed (44, delvist), P/E kun value (21, delvist), screener kun med porteføljens aktier (39, 41), selskabsside med problem først (21), AI værdikæde light (32, 66 delvist), embed graf til forsiden (1, 52), "Sådan tænker vi" (4), mail stub uden login (10), AI mærkning varslet (19), "Kopiér ISIN".

**Mangler:**
* Flere tags pr. selskab (43, 66).
* Andel over 52 ugers glidende gennemsnit (72) og rigtig 52 ugers drawdown (73).
* Forklaret P/E som markedets forventning (22).
* Livscyklus forklaret med bogens kapitel og velkomstmailens graf (45, 46), samt hvorfor modne selskaber kan have et formål (47).
* Værdikædekort med markering af selskaber i og uden for porteføljen (37, 39). Nu linker den kun til filtre.
* NDI specifikke nøgletal pr. selskab, også for de mest omtalte aktier som SpaceX (8, 9, 29).
* "Hvorfor mangler aktie X?" (38).
* PDF eksport (80).
* Datacenter og chiptidslinje (81).
* Knappen "Undersøg porteføljen mere" som grænse til forsiden (53). Embed grafen mangler den.
* En forsideversion til den 60+ årige besøgende med 45 sekunder (70, 71, 76): embed grafen er tæt på, men mangler kalender og risikoboks.
* Perspektiver (49), trending og Slack eksperiment er med rette udskudt.

**Forkert:**
* "Fald fra top" (73) er beregnet forkert (se fakta punkt 2).
* "Hvad 100.000 kr. var blevet til" er fjernet. Det er fint (JB ønskede det flyttet, 36:14).
* Kontekstprikker er ikke et ønske fra mødet og bør fjernes (compliance punkt 10).

## 5. Konkrete anbefalede ændringer (prioriteret)
1. Flyt docs/notes ud af Pages, fjern STATUS link, overvej privat repo (blokerende 1).
2. Erstat dagsbeholdning med forsinket offentlig beholdning og fjern "Største stigninger/fald (dagen)" (blokerende 2).
3. Skjul afkast for PMINDIAKK indtil december 2026 (blokerende 3).
4. Vis kalenderår og siden start som standard for PMINDI. Korte perioder fjernes eller afventer Fundmarket (blokerende 4).
5. Fjern ÅTD og 1 års tal pr. selskab, indtil de er splitjusterede. Skift SoftBank eksemplet til et selskab med rene data, eller ret data.
6. Fjern Nasdaq knap og legend. Tekst: "Fonden har intet benchmark."
7. Tilføj risikoindikator 5 af 7 og direkte KID og prospekt links.
8. Omskriv "Sådan investerer du" uden skatte og kontoråd.
9. Fjern de illustrative kontekstprikker.
10. Indfør flere tags pr. selskab og reducer "Andet" til under 10 %.
11. Tilføj et afsnit "Hvorfor så mange aktier?" om bred spredning og varians (BOG, TM afsnit 10) og sætningen om tæt på ligevægt.
12. Erstat skjult P/E med en forklaring: "P/E siger mere om markedets forventninger end om værdien."
13. Gennemgå modenhedsklassifikationen manuelt for de 50 største positioner, og vis "Ikke klassificeret" i stedet for gæt.
14. Ensret startdatoer og datodato ("Afkast pr. 14. okt. 2026, beholdning pr. [dato]").
15. Mærk AI genererede selskabsbeskrivelser.
16. Ret tankestreger og engelske betegnelser.
