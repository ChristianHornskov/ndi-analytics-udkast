# PERSONA – Testinvestor Privat

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
