# Claude: gennemgang af live-udgaven 16.11.2026 og opgaver til Codex

Grundlag: den udgave, Wix viser nu (release `9a0112aa`, gren `codex/claude-rettelser-20261116`).
Mine rettelser ligger på grenen `claude/live-review-20261116`, som bygger direkte oven på `33aa6ee3`. Grenen kan udgives, som den er.

Alle sider er læst igennem. Alle knapper er klikket igennem på forside, portefølje, tech og temaer, og nøgletalsboksen er testet på alle 87 nye selskabssider. Regnskabstallene er ikke efterprøvet ét for ét.

## A. Det skal Codex gøre (i denne rækkefølge)

1. **Upload nøgletallene til Azure.** Filerne ligger færdige i `azure-staging/company-keyfigures-v1/` på grenen. Upload først `releases/2cbd7737...json` og derefter `latest.json` til `graph/company-keyfigures-v1/`. Snapshottet har alle 87 selskaber og er bygget fra `data/noegletal/*.js`. Det indeholder også rettelserne til Samsung, eToro, Horizon og HUBER+SUHNER. Hvert selskab er kontrolleret med sidernes egen `valid()`, og alle 87 sider er testet med snapshottet ved 360 px uden fejl. Se `azure-staging/LAES-MIG.md`. Skal det bygges igen: `node tools/build-keyfigures.js` fra `docs/energi-konkurrence/v19-review`.

2. **Udgiv grenen `claude/live-review-20261116` som ny frontend-release** på samme måde som 9a0112aa: upload, kontrol af hash og flyt af `current.json` med ETag. Kun mappen `docs/energi-konkurrence/v19-review` skal med. 164 filer er ændret:
   - 128 selskabssider under `selskaber/`
   - `tech.html`, `temaer/datacenter.html`, `temaer/fintech.html` og `temaer/platforme.html`
   - `portfolio/` og `widget/` (index.html, homepage-patch.js, review.js, simple-refinement.js, highs.js, portfolio.js)
   - `assets/js/` (journey-polish.js, review-widget.js, v18-afkast.js, v18-portefolje.js, zoom-camera.mjs)
   - `assets/claude/` (21-noegletal.js, 41-undernavigation.js)

   `azure-staging/`, `tools/`, `tests/` og denne note skal ikke med i releasen. Da hver release har sin egen mappe, skal versionsnumrene i adresserne ikke ændres.

3. **Kun hvis Christian godkender det: price/sales.** Grenen `claude/uden-price-sales` er den samme som `claude/live-review-20261116` plus én ændring i `21-noegletal.js`, der fjerner price/sales. Udgiv den gren i stedet for punkt 2, hvis Christian siger ja.

4. **Test fanerne i Wix efter udgivelsen:** `python3 tests/wix_tabs_check.py`. Scriptet åbner den rigtige Wix-side, klikker på alle seks faner ved mobil- og desktopbredde og fejler, hvis siden ikke flytter sig. Det er den fejl, Mads har meldt (punkt B1).

5. **Kør X-opslagene og top-ti-researchen.** Jeres egen driftskontrol viser, at de er over 36 timer gamle. Opslagene på de 20 største selskaber står ellers som gamle.

Kontrolleret og i orden, så det kræver ikke noget:
- Kolonnen "Året" i porteføljens månedstabel virker. Den var bare ikke tegnet endnu, da jeg aflæste den første gang.
- Regnskabstallene på Kioxia og SK hynix stemmer med selskabernes meddelelser. SK hynix havde en omsætning på 79,3 billioner won i 2. kvartal 2026, og Kioxia havde 1.767 mia. yen i 1. kvartal af regnskabsåret 2026.
- Kildefilerne i noter-repoet er nu synkroniseret med de udgivne selskabssider.

## B. Det har jeg rettet på grenen

### B1. Fanerne virker ikke i Wix (Mads' fejl)
**Årsag:** `homepage-patch.js` stopper klikket på fanerne og sender kun beskeden `ndi-preview-scroll` til forældrevinduet. Den nye Wix-host (`host.js`) lytter ikke efter den besked, så intet sker. Rammen er nu fuldskærm og ruller selv, men siden rullede kun af sig selv, når den ikke lå i en ramme.

**Rettelse:**
- `portfolio/homepage-patch.js` og `widget/homepage-patch.js` sender nu også beskeden til siden selv, når den ligger i en ramme.
- `assets/js/journey-polish.js` og `assets/claude/41-undernavigation.js` ruller nu også, når siden ligger i en ramme.

Testet i en fuldskærmsramme som Wix': alle seks faner ruller til den rigtige sektion, og den aktive fane markeres.

### B2. Forside og portefølje: sprog
- "(KID-estimat; kan variere)" er blevet til "(skøn fra KID, kan variere)". Det gælder alle steder.
- "Rapportens indikative Aktuel IV bruges ikke som afsluttet dagskurs." er blevet til "Rapportens foreløbige kurs (indikativ indre værdi) bruges ikke som dagens lukkekurs."
- "Efter PRIIP-KID af ... er klassen klassificeret som 5 ud af 7" er blevet til "... har klassen risikoklasse 5 ud af 7".
- "Emissions- og indløsningstillæg på henholdsvis 0,25 % og 0,25 % ved køb og salg" er blevet til "på 0,25 % ved både køb og salg". Er de to satser forskellige, nævnes de hver for sig.
- Nasdaq-teksten uden semikolon: "Der er ingen Nasdaq-data fra samme startdato, så fondens afkast vises alene."
- Porteføljesiden:
  - Semikoloner er fjernet i forklaringen af afkast, volatilitet og Sharpe-ratio.
  - Intervalteksten under 52-ugers-grafen er skrevet i almindeligt dansk.
  - "Ikke børsnotering, handelsvaluta eller geografisk omsætning." er blevet til "Kortet viser hovedsædet, ikke hvor aktien handles, eller hvor selskabet tjener pengene."
  - "Sektoroplysninger er foreløbige leverandørklassifikationer." er blevet til "Sektorerne er dataleverandørens foreløbige inddeling."
  - "Alle positive værdipapirpositioner" er blevet til "Alle aktier, fonden ejer". "værdipapirpositioner" er blevet til "aktier og andre værdipapirer".
  - "Ukendt: 1 positioner" bøjes nu korrekt.
  - "Kortere historik kan give et mindre observeret fald uden lavere fremtidig risiko." er blevet til "En kort historik kan vise et mindre fald, end fonden kan få fremover."

### B3. Tech og temaer
- `tech.html`: semikolon fjernet ("Vækst er ikke det samme som overskud. Det afgørende er ...").
- AI-rejsen (`zoom-camera.mjs`): semikolon fjernet.
- `temaer/datacenter.html`: tankestreg fjernet.

Alle knapper på de 12 temasider, forsiden, porteføljen og tech er klikket igennem på mobil. De virker alle, og der er ingen JavaScript-fejl.

### B4. Selskabssider
- **Boksen "Fra produkt til anvendelse" er skrevet om på 80 sider.** Den var det værste sted. Teksten var maskinagtig og nogle steder meningsløs:
  - Howmet: "1948 er et lastbilhjul. Gasturbine og Apollo er dele."
  - Planet Labs: "Arlington er ikke Washington D.C."
  - Satellogic: "Davidson er ikke Charlotte."
  - York: "Det er en tegning, ikke et målt år."
  - Canadian Solar: "Recurrent Energy er nævnt som kontorer."

  Nu har hver boks tre korte, forklarende afsnit (Produktet, Brugeren, Rollen i teknologien). De bygger på de oplysninger, siden i forvejen havde.
- Soitec: "Salg af wafere." er blevet til "Salg af siliciumskiver til chipproducenter."
- På 18 sider er de AI-agtige formuleringer i boksen "Hvad er det vigtige at forstå?" fjernet:
  - "Spørgsmålene er redaktionelle læsegreb." er blevet til "Forklaringen bygger på kilderne nederst på siden."
  - Overskriften "Det er værd at skelne mellem" er blevet til "Godt at vide".
- Nøgletalsboksen:
  - "LTM" er blevet til "12 mdr."
  - Forklaringen "Markedsværdi / LTM-omsætning" er blevet til "Markedsværdi delt med omsætningen de seneste 12 måneder".

### B5. Fuld gennemlæsning af alle sider (anden runde)
Alle 473 selskabssider, de 12 temasider, tech, alle-selskaber, forsiden og porteføljen er nu læst igennem. Rettelserne ligger i de senere commits på grenen.

- **18 selskabssider**, boksen "Hvad er det vigtige at forstå?": begge tekster er skrevet om fra AI-dansk til almindeligt dansk. Det gælder AppLovin, Babcock & Wilcox, Carvana, Cerebras, Ford, GlobalFoundries, HUBER+SUHNER, Kioxia, LPKF, Samsung, Sea, Sivers, SK hynix, SoftBank, SoundHound, T1 Energy, Tesla og Tower.
- **Joby Aviation**: beskrivelsen handlede kun om datterselskabet Blade. Nu står det først, at Joby udvikler en elektrisk lufttaxa.
- **USA Rare Earth**: boksen sagde "ingen kunder", men selskabet har salg gennem Less Common Metals. Det er rettet.
- **Tal skrevet i hele dollar** (fx "496.072.000 USD") er ændret til mio. på Camtek, Cohu, Enphase, Eos og First Solar.
- **Enkelte sætninger på omkring 35 sider**, fx:
  - Agility, Dow og Fortinet: metasætninger.
  - MARA og Riot: jargon.
  - TSMC: gentagelse.
  - SK hynix: det ødelagte ord "produkterneet".
  - Broadcom, Ballard, Ciena, Coupang, Dell, HUBER+SUHNER, Iridium, Klarna, Rocket Lab, Opendoor, Semtech, Serve, Solaris, Silicon Motion, Sandisk, Uber og Wolfspeed: stive eller oversatte risikotekster.
  - NVIDIA og Ciena: "programmel" er blevet til "software".
- **Temaer**: fintech ("redaktionelle opdeling") og platforme ("stat-figurerne").
- **Kontrol**: Der er ikke flere semikoloner eller tankestreger i den synlige tekst på nogen side. Undtaget er titler på eksterne videoer og indlæg, som står uændret.

Kildefilerne i noter-repoet (`reviews/2026-11-13-grok/*/side/`) er synkroniseret med de udgivne sider.

### B6. Nøgletalsboksen
- Merlin-siden gav en JavaScript-fejl, når kursen manglede. Nu skriver boksen "Ikke tilgængelig" i stedet for at stoppe.
- Meget store beløb vises nu i mia. i stedet for mio. Det gælder Samsung, SoftBank og Advantest. Før stod der fx "171.499.470 mio. KRW", nu står der "171.499 mia. KRW".
- Kildelinjen havde forkerte ejefald og et svensk ord: "Astera Labss", "FuboTV's", "LPKF's" og "årsredovisning". Det er rettet i dataene på 28 sider, og ejefaldene bruger nu samme apostrof overalt.

## D. Anden runde 16.11 kl. 16 (gennemgang af den udgivne version 9b08124e)

Den udgivne version indeholder alle rettelser fra første runde. Fanerne på porteføljesiden ruller korrekt i en ramme, og nøgletallene hentes fra Azure og vises i mia., hvor det er nødvendigt.

Rettelserne fra anden runde ligger på grenen `claude/live-runde2-20261116`, som bygger direkte på `9b08124e`. Codex skal:

1. **Udgive grenen som ny frontend-release** på samme måde som før. Ændrede filer: `widget/` og `portfolio/` (homepage-patch.js, simple-refinement.js, review.js, evidence.js, index.html, portfolio.js), `assets/js/` (v18-portefolje.js, v18-afkast.js, review-widget.js) og `data/portefolje.js`/`.json`.
2. **Genudgive review-data** fra `review-input/homepage-source/` (geography.json og highs.json). Noterne om hovedsæder stod på engelsk på porteføljesiden, fx "Group headquarters Icheon, not US subsidiary". Alle 30 noter og definitionen er nu på dansk. Kursnoterne (Honeywell, IPO'er, SPAC) har fået punktum i stedet for semikolon.
3. **Sætte et link til grafen på newdealinvest.dk**, hvis siden skal kunne findes fra forsiden i aften. Hverken forsiden eller /portefoljer linker til /graf-review i dag. Siden kan kun nås ved at skrive adressen.

Rettet i anden runde:
- Nasdaq-noten på forside og portefølje er skrevet om til almindeligt dansk uden semikolon.
- "Emissions- og indløsningstillæg på henholdsvis 0,25 % og 0,25 %" hedder nu "Tillægget ved køb og salg på 0,25 % hver gang", når satserne er ens.
- Engelske ord i omkostningsboksen ("KID’s entry-omkostning", "Investorens entry/exit") er erstattet af "Tillæg ved køb/salg".
- "Alle 41 nedtures bunde" hedder nu "Bunden i alle 41 nedture".
- Metodeteksten er skrevet om, hvor den var teknisk eller havde semikolon: "Datofællesskab ... kontrolleres maskinelt", "Indikativ Aktuel IV", "principal executive office", "Azure-feed", "Følgende observationer er udeladt ...: Ingen. Ingen er erstattet".
- Tech-sidens risikoafsnit siger nu "klassen" og "Valg af klasse og skat" i stedet for "afdelingen".

Til Codex' vurdering (ikke rettet):
- SK hynix står som "Ikke klassificeret" i sektorfordelingen. Det bør være Teknologi. Det kommer fra dataleverandøren.
- Linjen "Beregninger: review-2026-09-23" i metodeafsnittet er en intern versionsbetegnelse og kan fjernes.
- 2023-rækken i porteføljens månedskalender viser "Intet grundlag" for september, mens forsidens tabel viser 0,9 %.

## C. Til Christians stillingtagen (ikke rettet)
- **Price/sales** vises i nøgletalsboksen på de 87 nye selskabssider. Christian har tidligere sagt, at værdiansættelsestal som P/E ikke skal vises. Skal price/sales også fjernes?
- **De 386 ældre selskabssider:** Beskrivelserne øverst er i orden, men korte og ensartede. De er ikke skrevet om. Det gælder især de 96 sider for selskaber, fonden ikke længere ejer.
