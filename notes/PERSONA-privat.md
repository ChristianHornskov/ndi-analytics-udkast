# PERSONA – Testinvestor Privat

## Runde 16. okt. 2026 kl. 05:15
Persona: dansk privatsparer, ca. 40 år, sparer op via Nordnet, ingen erfaring med fonde, aldrig set et pitch deck, har læst Mads og Jespers bog som nysgerrig lægmand. Testet live på GitHub Pages med Playwright/Chromium headless, desktop 1366x900 og iPhone 13 (390x844), 11 sider pr. enhed (entré, fonden, porteføljen, udforsk, omkostninger, sådan investerer du, risici, lær, temaer, om data, største fald). Screenshots: `ux-screens/privat-20261016-0510-{desk,mob}-p0..p10.png`. Sammenlignet med runden 15. okt. kl. 23:45 (seneste runde i filen).

### Top 3
1. **Omkostningerne står der nu, men siden om dem gør mig mere forvirret end tryg.** "Sådan investerer du" punkt 4 siger det perfekt: ca. 2,79 % om året, altså ca. 2.790 kr. på 100.000 kr. Men selve siden "Hvad koster fonden?" gør forskellen på 60 kr./80 kr. mellem de to klasser til det største tal på skærmen, har en "≠ ANDET BELØB"-boks og skriver "ikke et ÅOP" ca. 10 gange. Som almindelig sparer vil jeg bare se: "Det koster ca. 2,8 % om året. Det svarer til ca. 2.800 kr. på 100.000 kr. Hertil kommer din banks kurtage." Resten kan foldes ud. "Tomme felter = udfyldes af NDI" og "NewDeal Invest, kl n" ser ufærdigt ud.
2. **Månedstabellen og kalenderåret 2023 passer ikke sammen.** 2023 (delår) står til +16,7 %, men månedstabellen viser kun nov. +9,8 % og dec. +12,1 %, hvilket alene giver ca. +23 %. Sep. og okt. 2023 står som "–", så der må have været et fald på ca. 5 %, som ikke vises, selvom der står "røde måneder er synlige med vilje". 2024, 2025 og 2026 stemmer (min egen gange-regning: +46,2 / +15,1 / +4,0 %). Hvis jeg opdager sådan noget, begynder jeg at tvivle på resten af tallene.
3. **Tankegangen er nu forklaret godt. Til gengæld vises interne arbejdsgange og mærkater for meget.** Møntspillet (100 kr. → +50 % → −40 % = 90 kr.) står på forsiden, og "Sådan tænker vi" er nu den bedste side i udkastet. Men hver eneste række i tabellerne har mærket "NDI-linse" (over 700 gange), Temaer-siden viser "usikkert 22", "en kort beslutningsliste til NDI" og "foreslået tema → alternativ", og forsiden siger stadig "multi-tag" og "Modenhed: 345 selskaber med forslag". Det er sprog til porteføljeholdet, ikke til mig. Holdet har stadig ingen navne på forsiden.

### Ændringer siden sidst (15. okt. kl. 23:45)
- **Løst:** Omkostninger er tilføjet (KID 2,79 %/2,85 % pr. år ved 5 år, intet resultathonorar, egen side og kort boks på "Fonden"). Det var mit punkt 1 sidst.
- **Løst:** Møntspillet og "Vi vælger udviklingen frem for vinderen" står på forsiden. Ny side "Sådan tænker vi" med tre udgangspunkter, fem principper, kildehenvisning til bogen (s. 27–28) og "Markedet har som udgangspunkt ret" (s. 64).
- **Løst:** Bogen og fonden adskilles nu ("Bogens råd til privatpersoner og fondens forvaltning er ikke det samme"), og der er en lær-side om rebalancering. Det var min bekymring om "køb og hold" sidst.
- **Løst:** "Top 10 efter vægt" vises før den lange liste. Lær-forsiden har "Ny her? Start med de tre (ca. 9 min)". Rigtig godt for en nybegynder.
- **Løst:** "Følg tema (stub)" og "Mailchimp" er væk. Udbytte vises nu som "38,9 kr." med komma. Cipher Mining står nu som Compute/Energi. "Andet" er faldet fra 11,61 % til 6,27 % (31 selskaber).
- **Løst:** Livscyklus-boksen er ikke længere tom (5 præ-revenue, 6 præ-profit, 186 high growth, 104 GARP, 44 value), tydeligt mærket "heuristik, afventer NDI".
- **Nyt:** Kæden "Hvor ligger pengene, og hvem gør hvad?" på "Sådan investerer du" (dit depot, PortfolioManager, Fundmarket A/S under Finanstilsynet, depotbank). Det giver mig meget tryghed.
- **Ikke løst:** Holdet er stadig navnløst på forsiden ("Læs mere om holdet på newdealinvest.dk"). Mads Christiansen nævnes kun i et X-opslag og som forfatter på lær-siden.
- **Ikke løst:** "Central Information Dokument" står stadig i footeren. Rå dataforkortelser som "Sea Sp ADR", "Lumentum Hldngs", "Coreweave Inc-Cl A" står stadig i top 10.
- **Ikke løst:** Intet referencepunkt for afkastet ("Fonden har intet fast benchmark" uden forklaring på, hvorfor).

### Forklarer udkastet NDI's tankegang?
Ja, nu langt bedre. Bogens kerne, som jeg forstår den, er: (a) retningen kan ses, vinderne kan ikke, (b) udsving koster afkast, (c) derfor mange små positioner, (d) P/E passer dårligt til tech, der investerer, (e) lang horisont. Alle fem står nu på forsiden i "Sådan tænker vi (kort)", og (b) har fået møntspillet direkte på forsiden. Lær-siden "Sådan tænker vi" forklarer med Tesla som gennemgående eksempel og et regnestykke (1,5 × 0,6 = 0,9), som jeg kan følge. Sætningen "Det dæmper ikke udsvingene i hele teknologimarkedet, og du kan tabe penge" er ærlig og vigtig.
- Det, der stadig mangler: hvorfor temaerne hænger sammen. "Flodsystem" og "dæmninger" forklares på lær-siden ("efterspørgslen er vandet, flaskehalsene er dæmningerne"), men på forsiden står bare "Flodsystem: AI, robotik, energi, rum, quantum", som ikke siger mig noget.
- "NDI-linse" er forklaret godt på "Sådan tænker vi" (fem faste spørgsmål), men mærket på hver række i tabellen siger mig intet, når jeg kommer direkte til porteføljen.

### Desktop
- Forsiden "Tre spørgsmål, tre døre" virker stadig godt. Kortet "Omkostninger: KID-tal og Fundmarket-postsatser — du kan tabe penge" er tungt formuleret. "Hvad koster det at eje fonden?" ville være nok.
- "Fonden": nøgletallene er klare, og "Eksempel: 100.000 kr. siden start" (ca. 204.840 kr.) er konkret og forklaret ærligt (første NAV, ikke en gunstig dato). Men "afventer Fundmarket-godkendelse" ved ÅTD og eksemplet gør mig i tvivl, om jeg må stole på tallene endnu.
- Den gentagne advarsel "Historisk afkast er ikke en pålidelig indikator …" står 4-5 gange på "Fonden"-siden. Jeg forstår, at den skal stå der, men jeg holder op med at læse den.
- Porteføljen: "Vægtene ligger forholdsvis tæt, men fonden er ikke ligevægtet" og "summerer til ca. 92 %" er gode, ærlige oplysninger. Jeg ved ikke, hvad de sidste ca. 8 % er (kontanter?).

### Mobil
- Ingen vandret overflow på nogen af de 11 sider (scrollWidth = 390). Menuen er pæn, og "Sådan investerer du" står nu som knap øverst. Godt.
- Ordlisten er foldet sammen på mobil (4 grupper med 31-41 begreber). Det er rigtigt valg.
- Omkostningssiden på mobil: det første store tal efter overskriften er "forskel 60 kr.", og lige under kommer "80 kr." i endnu større skrift. En nybegynder kan nemt tro, at fonden koster 80 kr.
- Udforsk-tabellen har stadig over 1.000 tekstelementer under 12 px. Den er kun til de nysgerrige.

### Fejl/bugs
- Ingen JS-fejl, ingen 4xx/5xx på de 22 testede sidevisninger.
- Data: 2023 delår +16,7 % passer ikke med månedstabellen (kun nov./dec. vist = ca. +23 %). Sep./okt. 2023 mangler.
- "NewDeal Invest, kl n (PMINDI)" på omkostningssiden ligner et rå dataudtræk.
- "Tomme felter = udfyldes af NDI" på omkostningssiden.

### Ting der virker godt
- "Sådan tænker vi" med kildehenvisning til bogen og ugebrevet. Det er præcis, hvad en læser af bogen har brug for.
- "Hvor ligger pengene, og hvem gør hvad?" med Finanstilsynet nævnt.
- Konkrete kronebeløb på 100.000 kr. både for afkast og omkostninger.
- "Ny her? Start med de tre" på Lær.
- Ærlig mærkning af forslag, heuristik og AI-udkast.

### Forslag
1. Gør toppen af omkostningssiden til én sætning: "ca. 2,8 % om året = ca. 2.800 kr. på 100.000 kr., før din banks kurtage." Flyt 60/80 kr.-sammenligningen og "ikke et ÅOP"-noterne ned i en udfoldelig "For de nysgerrige".
2. Ret eller forklar 2023 i månedstabellen (vis sep./okt. 2023, eller skriv hvorfor de mangler).
3. Fjern "NDI-linse"-mærket fra hver tabelrække (eller gør det til et lille ikon med forklaring), og skjul "beslutningsliste til NDI"/"usikkert 22" i en offentlig version.
4. Sæt navne på holdet på forsiden: Mads Christiansen og Jesper Bæk, forfattere til "Den lille guide til investering i teknologiaktier".
5. Erstat "multi-tag", "Modenhed: 345 selskaber med forslag" og "Flodsystem" på forsiden med almindeligt dansk.
6. Forklar i én sætning, hvorfor fonden ikke har et benchmark.

**Ville jeg vende tilbage/tilmelde mig?** Ja, mere end sidst. Nu forstår jeg tankegangen og kender omkostningerne. Jeg ville tilmelde mig en mail og nok kigge på fonden i min Nordnet-konto. Før jeg investerede, ville jeg gerne have tallene "godkendt" (de står stadig som "afventer Fundmarket-godkendelse") og vide, hvem der træffer beslutningerne.

## Runde 15. okt. 2026 kl. 23:45
Persona: dansk privatsparer, 40-60 år, ingen erfaring med fonde, aldrig set et pitch deck. Testet med Playwright/Chromium headless, desktop 1366x900 og iPhone 13 (390x844). Screenshots: `screens/privat-20261015-2340-*` og `privat-20261015-2341-*` (p0 fonden, p1 portefølje, p2 udforsk, p3 invester, p4 risici, p5 SoftBank, p6 lær, p7 temaer). Ingen tidligere runde at sammenligne med.

### Top 3
1. **Omkostningerne står ingen steder.** "Fonden"-siden siger "efter fondens løbende omkostninger", og "Sådan investerer du" punkt 4 nævner kun kurtage og platformgebyrer hos banken. Jeg kan ikke finde fondens egen årlige omkostning (ÅOP/løbende omkostninger i %) eller en eventuel emissionstillæg. Det er det første, jeg ville spørge min bankrådgiver om.
2. **Udkastet nævner NDI's tankegang, men forklarer den ikke for en begynder.** Fem gode punkter i "Sådan tænker vi (kort)" på forsiden, men det bærende argument fra bogen (møntspillet +50 %/−40 % giver 90 kr. igen, altså at udsving æder afkastet, og at bred spredning derfor er bevidst) ligger gemt bag "Lær → CAGR og gennemsnit / Hvorfor så mange aktier?". Ord som "variansdrag", "CAGR", "Max drawdown", "NAV", "ex-dato", "ISIN", "SRI", "UCITS", "screener", "Level 1", "multi-tag" møder mig før forklaringen.
3. **Hvem står bag, og hvor "færdigt" er det?** Afsnittet om porteføljeholdet nævner ingen navne (Mads Christiansen, læge og stifter i 2021, og Jesper Bæk, medforfatter til bogen, ville skabe tillid). Samtidig står der "UDKAST", "forslag", "AI-udkast", "Ingen af fondens 345 selskaber er klassificeret endnu", "Følg tema (stub)" og "Mailchimp-tags" mange steder. Det gør mig usikker på, om tallene er til at stole på.

### Forklarer udkastet NDI's tankegang?
Hovedideerne fra bogen og tankemodellen, som jeg forstår dem som almindelig læser: (a) man kan se teknologiens retning, men ikke udpege vinderne, (b) store udsving koster afkast (variansdrag), (c) derfor mange små positioner (ca. 1 % eller mindre), (d) P/E passer dårligt til tech, der investerer i fremtiden, (e) lang horisont, mindst 5 år, og store fald er normale.
- **Det, der lykkes:** a, c, d og e står klart i "Sådan tænker vi (kort)" på forsiden. Porteføljesiden konkretiserer c godt: "ca. 9 ud af 10 positioner vejer mellem ca. 0,05 % og 1 %". "Fonden"-siden viser max drawdown −35,8 % ved siden af +104,8 %. Det er ærligt.
- **Det, der mangler:** b, som ifølge bogen er selve begrundelsen, nævnes kun som link-teaser ("Hvorfor udsving trækker det årlige afkast ned"). Et lille regneeksempel (100 kr. → +50 % → −40 % = 90 kr.) direkte på forsiden ville få det til at klikke for mig. "Vælg udviklingen, ikke vinderen" (Mads' egen sætning) bør stå som overskrift. Den står ikke ordret nogen steder.
- **For teknisk:** "Flodsystem", "værdikæde", "modenhedsgrader", "NDI-linse", "Level 1: … Tags er mange-til-mange i ambitionen" og "livscyklus fra præ-revenue til value". Det er internt sprog. Temaerne (Chips, Compute, Optik & netværk …) har gode korte beskrivelser, men jeg kan ikke se, hvorfor de hænger sammen (flaskehalse og knaphed i AI-udbygningen er Mads' pointe, men nævnes ikke).
- **Risiko for misforståelse:** Siden forklarer ikke, at fonden handler meget (rebalancering), mens bogen siger "køb og hold". En læser af bogen kan undre sig. En sætning om at "fonden rebalancerer løbende, det kan du som privat ikke" ville forebygge det.

### Desktop
- Forsiden "Tre spørgsmål, tre døre" (Fonden / Porteføljen / Udforsk) er en rigtig god indgang. Jeg ved, hvor jeg skal klikke.
- "Fonden": tydelige nøgletal (+104,8 % siden 22. sep. 2023, CAGR +26,4 %, ÅTD +4,0 %, SRI 5/7) med ?-hjælp. Graf og udbytte-begivenheder (38,9 kr. og 38,0 kr.) er fine. "Fonden har intet fast benchmark" efterlader mig uden noget at sammenligne med.
- "Porteføljen"/"Udforsk": lang tabel med 345 selskaber. Overvældende. Navne som "Sea Sp ADR", "Palantir Tchnl" og "Lumentum Hldngs" er rå dataforkortelser. Livscyklus-boksen er tom ("Ingen … klassificeret endnu").
- Temaer: "Andet / uklassificeret" er det fjerdestørste tema (11,61 %, 67 selskaber). Det svækker fortællingen om en klar linse. Cipher Mining står som "Software" og Coreweave som "Energi Compute". Det ser forkert ud for en lægmand.
- SoftBank-siden er pædagogisk god ("Hvilket problem løser det?", kilder, dato for tjek). AI-mærkningen er ærlig.
- Footer-linkrækken "Også i udkastet: …" har 12 links i én linje og er rodet.

### Mobil
- Ingen vandret overflow på nogen af 8 testede sider (scrollWidth = 390). Fin læsbarhed og mørkt tema med god kontrast.
- Topmenuen er en vandret række (Entré … Risici). "Lær" og "Sidekort" er ikke i menuen. 7 elementer har tekst under 12 px.
- "Følg med" åbner en modal med e-mailfelt og teksten "Tilmelding er ikke aktiv i dette udkast". Ærligt, men "(Mailchimp-tags)" er udviklersprog.
- De store tabeller (Porteføljen/Udforsk) er tunge at scrolle på telefonen. Jeg mangler en "top 10"-visning.

### Fejl/bugs
- Ingen JS-fejl, 4xx/5xx eller døde interne links fundet på de testede sider.
- Indhold: "Ingen af fondens 345 selskaber er klassificeret endnu" (livscyklus), "Følg tema (stub)", tvivlsomme tema-tags (Cipher Mining = Software). Udbyttebeløb vises med punktum ("38.9 kr.") i stedet for dansk komma.
- "Central Information Dokument" bør hedde "Central investorinformation" / "dokument med central information", som på risikosiden.

### Ting der virker godt
- Risikosiden er klar og kort: SRI 5/7, 5 år, "Du kan tabe en del af eller hele din investering", valutarisiko i USD.
- Ærlig om forsinket beholdning (1. jun. 2026) og datostempler overalt.
- KID-links (Fundmarket PDF) og begge ISIN'er står synligt. Det skaber tillid.
- "Sådan investerer du" i 5 trin er præcis, hvad en nybegynder har brug for.
- Ingen købs-/salgsanbefalinger. Det føles som oplysning, ikke salg.

### Forslag
1. Tilføj en boks "Hvad koster det?" med løbende omkostninger i % pr. år for PMINDI/PMINDIAKK (fra KID), samt et eksempel på 10.000 kr.
2. Læg møntspillet (+50 % / −40 % = 90 kr.) og "Vi vælger udviklingen, ikke vinderen" direkte på forsiden under "Sådan tænker vi".
3. Sæt navne og fotos på porteføljeholdet (Mads, Jesper) og nævn bogen "Den lille guide til investering i teknologiaktier" som "læs mere".
4. Lav en ordliste-tooltip på første forekomst af CAGR, drawdown, ISIN, SRI, NAV og UCITS. Erstat "NDI-linse", "Level 1" og "multi-tag" med almindeligt dansk.
5. Vis "Top 10 beholdninger" og tema-søjler før den fulde tabel. Skjul tomme udkastbokse (livscyklus) i en offentlig version.
6. Giv et referencepunkt for afkastet (fx "bred global aktiefond"), med compliance-forbehold, eller forklar, hvorfor der ikke er et.

**Ville jeg vende tilbage/tilmelde mig?** Måske. Jeg ville skrive mig op til en ugentlig mail, hvis den forklarer ét tema ad gangen i almindeligt sprog. Jeg ville ikke investere, før jeg kendte de samlede omkostninger og vidste, hvem der træffer beslutningerne.
