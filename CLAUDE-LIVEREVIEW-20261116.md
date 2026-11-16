# Claude: gennemgang af live-udgaven 16.11.2026 og opgaver til Codex

Grundlag: den udgave, Wix viser nu (release `9a0112aa`, gren `codex/claude-rettelser-20261116`).
Mine rettelser ligger på grenen `claude/live-review-20261116`, som bygger direkte oven på `33aa6ee3`. Der er fire commits, og der er ingen merge-konflikter.

Gennemgangen er bevidst gjort hurtigt og bredt. Målet var at finde knapper, der ikke virker, data, der kommer det forkerte sted fra, og det værste sprog. Regnskabstallene er ikke efterprøvet ét for ét.

## A. Det skal Codex gøre

1. **Udgiv grenen `claude/live-review-20261116` som ny frontend-release** på samme måde som 9a0112aa: upload, kontrol af hash og flyt af `current.json` med ETag. 118 filer er ændret i `docs/energi-konkurrence/v19-review`:
   - 98 selskabssider under `selskaber/`
   - `tech.html` og `temaer/datacenter.html`
   - `portfolio/` (index.html, homepage-patch.js, portfolio.js, review.js, simple-refinement.js, highs.js)
   - `widget/` (index.html, homepage-patch.js, review.js, simple-refinement.js, highs.js)
   - `assets/js/` (journey-polish.js, review-widget.js, v18-afkast.js, v18-portefolje.js, zoom-camera.mjs)
   - `assets/claude/` (21-noegletal.js, 41-undernavigation.js)

   Da hver release har sin egen mappe, skal versionsnumrene i adresserne ikke ændres.

2. **Test fanerne i Wix efter udgivelsen.** Åbn `newdealinvest.dk/graf-review?side=portfolio%2Findex` og klik på Overblik, Risiko i tal, Afstand til toppen, Fordeling & selskaber, Nedture & afkast og Datagrundlag. Siden skal rulle til hver sektion, både på mobil og desktop.
   - Det skal også testes, at hoppene på forsiden (`widget/index.html`) virker inde i Wix.
   - Det er den fejl, Mads har meldt (punkt B1).

3. **Kontrollér nøgletallene i Azure** (`graph/company-keyfigures-v1`). Snapshottet skal indeholde mine seneste data fra commit 59683a5, dvs.:
   - Samsung i mio. KRW (tallene var 1.000 gange for små)
   - eToro med `omsNavn: "Nettobidrag"` og `omsForkl`
   - Horizon Robotics og Huber+Suhner med `kvartal.periode: "halvår"`

   Er det ikke tilfældet, skal snapshottet genereres fra `data/noegletal/*.js` på grenen.

4. **Kontrollér kolonnen "Året" i månedstabellen på porteføljesiden** (`portfolio/grafik-v19.js`, kalenderen). Med testdata var kolonnen tom i desktop-tabellen, selv om forsidens tabel viser årsafkast. Hvis den også er tom på den rigtige side, skal årsafkastet vises, eller kolonnen skal fjernes.

5. **Kontrollér de hårdkodede regnskabstal på Kioxia og SK hynix** (afsnittet "Historiske regnskabseksempler").
   - Kioxia viser en kvartalsomsætning på 1.767.117 mio. JPY og et resultat på 842.165 mio. JPY for Q1 FY2026, mod 342.799 mio. JPY året før.
   - SK hynix viser 79.318.746 mio. KRW for Q2 2026 mod 22.231.952 mio. KRW året før.
   - Spring på 3,5 til 5 gange ser forkerte ud. Er tallene ikke dokumenteret i den angivne kilde, skal afsnittet fjernes fra de to sider.

6. **X-publiceringen og top-ti-researchen er over 36 timer gamle** ifølge jeres egen driftskontrol. Det skal være kørt før i aften, ellers står opslagene på de 20 største selskaber som gamle.

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

## C. Til Christians stillingtagen (ikke rettet)
- **Price/sales** vises i nøgletalsboksen på de 87 nye selskabssider. Christian har tidligere sagt, at værdiansættelsestal som P/E ikke skal vises. Skal price/sales også fjernes?
- **De 386 ældre selskabssider:** Beskrivelserne øverst er i orden, men korte og ensartede. De er ikke skrevet om. Det gælder især de 96 sider for selskaber, fonden ikke længere ejer.
