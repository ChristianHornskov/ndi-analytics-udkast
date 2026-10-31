# Arbejdsliste — 31. oktober 2026

## Arbejdsform
Delrapporter, tests og commits afslutter ikke opgaven. Fortsæt uafhængige autoriserede punkter. Gamle designs, der foretrækkes frem for forslag, kræver Christians billedbaserede godkendelse.

## Godkendt og indarbejdet
- Kompakte eksisterende nøgletal/risiko og uændrede omkostninger.
- Lodret mobilkalender, rød/grøn; Claudes nedtursgraf.
- 52-ugers-visning: desktopdiagram, mobile vægtbjælker i oprindelig farveskala.
- Selskaber: nye mobilkort med røde/grønne afkast; sorterbar tabel på computer.
- Sektorer: ét felt pr. sektor, ikke et felt for hvert selskab.

## Seneste arbejde
- Claude-integration committed/pushet som 2d10201; 19 tests og 5 medietests bestod.
- Geografiens vægtbjælker bruger samme kontrollerede data og fælles 0–100 %-skala; filtre bevaret.
- Fysisk AI: inaktive grupper er læselige i lyst tema.
- Mobilkort: alle seks afkastperioder, topafstand, kort historik og kursdato bevaret. Sortering, selskabslinks, søgning og tomt resultat kontrolleret ved 390 px.
- Rettet søgningens gamle callback, som ellers genindførte en forældet firekolonners tabel.
- Desktop 1280 px: oprindelig tabel med 11 kolonner, ingen mobilkort. Ingen vandret sideoverflow i mobilkontrollen.

## Senest afsluttet og til visuel vurdering
- Ny grafisk top godkendt og implementeret; kontrolleret ved 390 og 1280 px.
- Ny grafisk udlodningstidslinje godkendt og implementeret med bekræftede datoer.
- Porteføljeknappens illustration afventer visuel vurdering.
- Metodeforslagets procesvisning er indarbejdet med korrekte oplysninger om fast reviewudtræk; eksisterende metode- og kildeoplysninger bevares.

## Afgrænsning
Kun reviewgren. Ingen main-merge, Wix, Azure, nye datakilder eller afsluttende compliancegennemgang. Ingen fysisk iPhone/Safari-test.


## Afsluttende kontrol
19 automatiske tests og 5 medietests bestået. JavaScript-syntaks kontrolleret. To dokumenterede udlodningsmarkører verificeret i browser; gammel dublet skjult. Ingen vandret overflow ved 390 px. Fysisk Safari/Wix ikke testet. Implementeringsomgangen er klar til Christians visuelle review; ingen liveudgivelse.


## Autoritativt slutmål (tilføjet 31. oktober)
Læs SAMLET-LEVERANCE.md før næste handling. Denne fil erstatter ikke tidligere ønsker; den genindsætter de tematiske/selskabsspecifikke og småfejlsforslag, som manglede i ovenstående delstatus. Formuleringen "implementeringsomgangen klar" ovenfor vedrører kun porteføljedelen og er IKKE en afslutning af hele opgaven.

## Goal-fremdrift: energi og NVIDIA
- S05, S07, S14 og F03 verificeret i SAMLET-LEVERANCE.md. Ingen øvrige rækker lukket.
- Nyt reproducerbart section_visuals.py bygger forklaringerne; eksisterende tekst/kilder og data beholdes.
- 20 automatiske tests bestået. Ny test kontrollerer tre energiled, eksisterende klokkeslæt, NVIDIA-kilder og alle otte chip-links.
- Visuel kontrol: energi lyst/mørkt desktop og lyst mobil390; NVIDIA mørkt desktop/mobil og lyst desktop. Linket til Regner åbner korrekt panel og scroller dertil efter navigation.
- Næste åbne spor: S04/S12 krypto-overlap og forretningsforklaring; derefter kvante/råstoffer samt samlet brugerrejse. Goal fortsat aktivt.

## Goal-fremdrift: krypto, råstoffer og årsrapport
- S04/S12: krypto-overlap og forskelle mellem forretninger gjort læsbare. Original klassifikation og syv kildepunkter bevaret; to dynamiske temalinks rettet.
- S13: råstofperspektiv efter Critiquitos forslag, med dansk læsevej og originalcitat i fold-ud.
- S10: årsrapportkort og starttidslinje implementeret i widget/portfolio ud fra uændret kildefil. PMINDI browserkontrolleret, anden klasse/runtimekontrol udestår.
- Visuel kontrol: krypto desktop lys/mørk og mobil lys390; råstoffer desktop mørk/mobil lys390; årsrapport desktop og mobil390.
- Fortsæt med S10 anden klasse, derefter S11 metode/foldning, F06 dublet og resterende samlet brugerrejse. Ingen afslutning eller liveudgivelse.
- S10 færdigkontrolleret: widget skifter til PMINDIAKK med negativ stribet bjælke, PDF-side104, datoer 2/12 før 5/12 og eksisterende uafklaret kildeforskel. Tilbage til PMINDI giver korrekte tre år. Begge ISIN-knapper verificeret via kvittering og udklipsholder.
- S11: seks originale formelafsnit er foldbare. Sharpe åbnet desktop, lukket og månedsafkast åbnet mobil390. Kilder og tekst bevaret, omkostninger urørt.
- F06: dubletoverskriften er skjult, hvor den ydre navngivne informationssektion allerede findes. Ingen informationsafsnit fjernet.

## Brugerrejsekontrol efter edcf144
- U10/U11/F08 verificeret: techmenu med 12 temaer, 44px trykflader, ankerlukning/aktiv markør, prikdiagram til chips, direkte AI-zoom og alle fem forretningsfaser.
- Chips: NVIDIA-søgning giver ét selskab, Regner-filter syv. Mobilkontrol uden tabeltvungen bredde. Resterende chips-/mediekontrol fortsætter.
- Brugeren oplyser 18 % usage tilbage. Prioritér konkrete fejl/kontrol og gem dokumenteret fremdrift; det er ikke en tilladelse til at afslutte ufuldstændigt.
- S03, S06 og F07 verificeret: kvantebeløb/støttestadier, fysisk-AI-skala og Alphabet-opstilling. Alle ændringer i section_visuals.py med eksisterende datagrundlag.
- Mediekontrol fandt ældre xs-liste-nyheder og SpaceX-filmrække uden to-synlige-begrænsning. Begge følger nu reglen. Energi browser:2 synlige+3 foldet; SpaceX tredje video skjult→foldet ud→korrekt YouTube-nocookie-iframe.
- F01 energithumbnail faktisk indlæst. U14 fortsat under arbejde, eksterne X-embeds og resterende udvalg ikke færdigverificeret.
- Christian har godkendt porteføljeindgangens illustration med de tre selskaber/vægte. U02 afsluttet.
- SpaceX mobil: Mads på X viser faktisk indlejrede opslag (ikke kun links); begge officielle X-iframes observeret, første opslag visuelt læst. Tidslinje2015 og Starlink/AI-valg fungerer med skiftende forklaring. Medieudfoldning virker.

- F11/F12 slutkontrolleret: tech-bridge navigerer korrekt; porteføljenavigation har nu44px trykflader og aktiv sektionsmarkør ved scroll.20 tests bestået efter rettelsen.
- Chips mobil Husker-panel og desktop Maskiner-valg verificeret; isometrisk scene vises ved1512px, kompakt trinliste ved1280px. Ingen lampenode i renderet grafik. S01 visuelt gennemset i lys desktop, resterende kontrol fortsætter.
- Brugerens seneste usageoplysning er14%; ingen nye redesigns, resterende kontrol og dokumenteret aflevering prioriteres.

- S08: Christian valgte kompakt klassevælger efter billedsammenligning. Opfølgende ønskede han fremhævede kontotyper; eksisterende ord nu diskret gule/fede, øvrig tekst uændret. Browsermobil og klasseskift verificeret (en efterrender-overskrivning blev opdaget og rettet). U01 og F09 nu verificeret.
