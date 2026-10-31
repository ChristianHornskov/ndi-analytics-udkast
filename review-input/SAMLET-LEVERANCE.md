# Samlet leverance og afslutningskontrol — v19 review

Dette er den autoritative opgaveliste fra 31. oktober 2026. ARBEJDSLISTE.md er fremdriftsnotat, ikke definitionen på hele opgaven. Ingen række må slettes ved opsummering. Nye ønsker tilføjes eller ændrer en navngiven række. Historiske drift-, Azure- og mailopgaver fra chatten genåbnes ikke af denne liste.

## Slutmål
En sammenhængende, visuelt gennemarbejdet reviewversion af widget → portefølje/tech → tema/selskab, med de aftalte forbedringer og hver relevant botanbefaling behandlet. Brug eksisterende dokumenterede data. Bevar accepteret design; byg ikke sitet forfra. Reviewgren: codex/v18-animation-integration-20261031. Ingen main-merge, Wix, Azure, produktionsændringer eller nye datakilder.

## Statusregler
Tilladte statusser: mangler; under arbejde; verificeret færdigt; afventer Christian; fravalgt med Christians godkendelse. En implementeringspåstand uden kontrolbevis er under arbejde. Hver færdig række skal have fil/commit og relevant test eller visuel kontrol. Et botforslag er input, ikke automatisk godkendelse. Gamle designs frem for nye skal vises med billeder og godkendes af Christian. Ét afventende punkt blokerer ikke uafhængige punkter. Udskudt compliance og publicering er uden for slutmålet.

## Brugerkrav og tværgående leverance
| ID | Krav | Status | Bevis eller næste handling |
|---|---|---|---|
| U01 | Widget med eksisterende foretrukket graf, kalender, klasseskift og kopierbar ISIN | under arbejde | Klasseskift tidligere browserkontrolleret; samlet slutkontrol af begge klasser og ISIN udestår. |
| U02 | To visuelle indgange med korrekt destination: porteføljeanalyse og tech | under arbejde | Widgetgrafik findes; kontrollér ruter og sammenhæng. Porteføljeillustration kræver Christians visuelle vurdering før endelig accept. |
| U03 | Fordybelsesdata kun PMINDI | under arbejde | portfolio.js fastholder selected=0; kontrollér øvrige indgange. |
| U04 | Porteføljeoverblik før selskabsliste; grafisk top | verificeret færdigt | f0f2df6; 390/1280 px browserkontrol, PMINDI-serie bevaret. |
| U05 | Mobilkort/desktop-tabel, seks perioder, rød/grøn, sortering, kort historik | verificeret færdigt | f0f2df6; browser: Tesla, tom søgning, begge sorteringsretninger, kursdato og links. |
| U06 | Ét felt pr. sektor, oprindelig 52-ugers-farveskala, mobilbjælker | verificeret færdigt | 2d10201/f0f2df6; Christian godkendte kombination; diagramfilter kontrolleret. |
| U07 | Kalender lodret på mobil; Claude-nedtursgraf | verificeret færdigt | 2d10201; browserkontroller beskrevet i CLAUDE-INTEGRATION-20261031.md. |
| U08 | Kompakte gamle risiko/nøgletal og gamle omkostninger bevares | verificeret færdigt | Christians eksplicitte billedbaserede godkendelser. Ingen nyt redesign af disse. |
| U09 | Grafisk klasse/udlodning og forklarende geografi/metode | verificeret færdigt | f0f2df6/225c798; to bekræftede udlodninger, responsiv graf og dataproces; ingen falsk automatisk freshness. |
| U10 | Tech: tæt menu med 12 temaer, forbindelsesdiagram og forklaring | verificeret færdigt | Tech desktop og mobil390: alle 12 temaer i menuen, mobilklikmål 44 px, aktiv sektionsmarkør og lukning efter ankerklik. Prikdiagram Chips åbner chips.html; forklaringen står før diagrammet. |
| U11 | AI-telefonens zoom og spørgsmål som én sammenhængende scene | verificeret færdigt | Direkte tryk på illustrationen skifter 1 til 2 med zoom og tekst; mobil direkte lagvalg til 6 giver strømforklaring og korrekt slutlink. Tekst og billede i samme scene. |
| U12 | SpaceX: interaktiv raket/Starlink, billeder/videoer, historie og regnskabstal | under arbejde | Tidligere implementeret; afstem hver seneste brugerrettelse med den renderede side. |
| U13 | Chips: ingen følgelampe, hoverlys, forståelig selskabsoversigt, rigtige X-opslag | under arbejde | Chipkæde og oprydning findes; slutkontrollér alle interaktioner. |
| U14 | Medier: thumbnails, to synlige med mulighed for flere, relevante Mads-videoer/X | under arbejde | 56 sider/98 YouTube/9 Instagram/26 X integrationer registreret; 5 runtime-tests. Kontrollér faktisk udvalg og synlige embeds på stikprøver. |
| U15 | Hele aftalte brugerrejse på 390/desktop, lyst/mørkt hvor understøttet | mangler | Dokumentér sider og interaktioner; ingen påstand om fysisk Safari/Wix-test. |
| U16 | Reproducerbart build, tests, scoped commits/push, tilgængeligt reviewlink | under arbejde | 19 tests/5 medietests bestået, HEAD 225c798. Gentag kun efter relevante ændringer; endelig scopekontrol udestår. |

## Groks sektioner tænkt forfra — begge TOP10-lister
D=Designbygger, C=Critiquito. Kilder under ../design-review-read/codex-overdragelse-20261031/06-designforslag/sektioner-gentaenkt/. Alle 20 forslag er repræsenteret her, også dubletter. Manglende statusbevis betyder ikke, at implementeringen nødvendigvis mangler.

| ID/kilder | Forslag | Status | Næste handling |
|---|---|---|---|
| S01 D1 | Tre ting om chips: kæde/cyklus/afhængigheder | under arbejde | Sammenhold nuværende løsning med forslag og Christians ønske om reel visuel forklaring. |
| S02 D2 | Vigtig information | fravalgt med Christians godkendelse | Christian har udskudt compliancegennemgangen. Ikke et permanent designfravalg; uden for denne omgang. |
| S03 D3 C2 | Kvante: omsætning, tilsagn og udbetaling | verificeret færdigt | Omsætningsbjælker læser de seks beløb fra eksisterende kildetekst; tre støttefaser skelner hensigt, tilsagn og ukendt udbetaling. Mobil390 mørkt og desktop lyst/mørkt kontrolleret. Originalkilder bevaret. |
| S04 D4 C5 | Krypto-overlap/Venn | verificeret færdigt | section_visuals.py: tre overlappende temaer, to læsbare forbindelser og klassifikation bevaret. Desktop lyst/mørkt og mobil390 lyst; foldbare originaloplysninger åbnet. To forkerte dynamiske temalinks rettet. |
| S05 D5 C6 | Energi: strømafbrydelse, kæde og tidslinje | verificeret færdigt | section_visuals.py: kildeprosa bevaret, tre led og tidsforløb; støttefunktioner ikke fejlagtigt seriekoblet. Browser 390/1280, lyst/mørkt. |
| S06 D6 C9 | Fysisk AI: hjul/propeller/robotters størrelsesforhold | verificeret færdigt | Fem-mod-en-blokgraf indarbejdet efter forslag. Skelner Teslas samlede omsætning fra værdien af installerede robotter; ikke fremstillet som fondsvægt eller robotomsætning. Desktop/mobil390 kontrolleret. |
| S07 D7 C4 | NVIDIA: problem, produkt, bruger og rolle | verificeret færdigt | section_visuals.py: problem → GPU/netværk/CUDA → brugere. Originale kundedefinitioner/kilder bevaret i detaljer. Mobil/mørk og desktop/lys+mørk kontrolleret. |
| S08 D8 C10 | Widget: klassernes pengestrøm/kontotyper | under arbejde | Widget må skifte klasse, mens fordybelsen kun bruger PMINDI. Kontrollér indhold og valgt løsning. |
| S09 D9 | Chipsnyheder hængt på kædens trin | fravalgt med Christians godkendelse | Christian fandt forslaget for komplekst; behold rigtige læselige X-opslag, ikke erstatninger med resuméer. |
| S10 D10 | Årsrapportafstemning som kildekort/tidslinje | verificeret færdigt | section_visuals.py: uændret annual-evidence.json. PMINDI desktop/mobil; widgetklasseskift kontrollerer PMINDIAKK -5,6 %, PDF104, korrekt datoorden og uafklaret kildeforskel. Skift tilbage PMINDI korrekt. JS-syntaks og 20 tests bestået. |
| S11 C1 | Dataproces og foldbare formelforklaringer | verificeret færdigt | Proces 225c798; seks formelafsnit nu foldbare med originaltekst/kilder bevaret. Desktop Sharpe og mobil390 månedsafkast åbnet/lukket. Omkostninger uændret efter brugerens valg. |
| S12 C3 | Krypto: aktier, ikke mønter; forskellige forretningsrisici | verificeret færdigt | Diagram fra fond til aktier til forretning; tre forskellige indtjeningspåvirkninger. Syv originale punkter og MiCA-kilde bevaret/testet. Mobilvisning kontrolleret. |
| S13 C7 | Råstoffer: mine, raffinering og afhængigheder | verificeret færdigt | Critiquitos forslag indarbejdet: udbud/efterspørgsel ved siden af fire forbundne led. Dansk citat synligt, original og kilde bevaret. Desktop mørkt/mobil lyst390 uden overflow. |
| S14 C8 | NVIDIA placeret i chipkædens otte trin | verificeret færdigt | Otte links med Regner markeret. Browserklik åbner #ck-trin-regner med korrekt mobilpanel; gammel skjult h-ct-destination rettet. Test kontrollerer alle otte mål. |

## Groks småfejl — begge TOP10-lister
Kilder: samme mappe, smaafejl/. ID bevares ved afslutning. D og C nummererer hver 1–10.

| ID | Punkter | Status | Kontrol/valg |
|---|---|---|---|
| F01 | D1 videoplakat | verificeret færdigt | Energivideoens YouTube-thumbnail indlæst med naturalWidth480 ved scroll til sektionen; ikke tom gradient. |
| F02 | D2 D8 C1 C5 kalender | verificeret færdigt | Godkendt lodret mobilkalender og rød/grøn; 2d10201. |
| F03 | D3 energihero lyst tema | verificeret færdigt | section-visuals.css: hvid baggrund/kontrast i lys tilstand, mørk uændret. Browser verificerer hvid baggrund og læselige streger. |
| F04 | D4 C2 nedture | verificeret færdigt | Godkendt Claude-løsning; 2d10201. |
| F05 | D5 C6 nøgletal/omkostninger | verificeret færdigt | Gamle kompakte opstillinger udtrykkeligt valgt; ingen indholdsændring. |
| F06 | D6 C8 dobbelt vigtig-information-overskrift | verificeret færdigt | Dubletoverskrift skjules kun inde i den eksisterende navngivne informationssektion. Browser bekræfter én synlig overskrift; alt indhold bevaret. |
| F07 | D7 Alphabet-andel/kildelink | verificeret færdigt | Alphabet 0,00 % bekræftet i dagens-tal.json som tidligere position. Indramning inkl. inset-shadow fjernet og SEC-link venstrestillet. Browserkontrolleret. |
| F08 | D9 D10 C3 fasegraf | verificeret færdigt | Alle fem faseknapper kontrolleret ved 390 px; aria-pressed og tekst/selskab skifter korrekt. Hele grafen inklusive begge kurver og labels er synlig på mobil. |
| F09 | C4 widgetknapper/Nasdaqfarve | under arbejde | Sammenhold med Christians godkendte original; forelæg evt. fravalg frem for at antage godkendelse. |
| F10 | C7 52-ugers-farver | fravalgt med Christians godkendelse | Christian valgte oprindelig flerfarveskala. |
| F11 | C9 tech-krydshenvisning | under arbejde | Eksisterende bridge; kontrollér læsbarhed og klikfelt. |
| F12 | C10 sidehoved/faner | under arbejde | Ny hero godkendt; kontrollér aktive navigationsmarkører og mobilklikfelter. |

## Yderligere leverancer og afgrænsning
- De 22 porteføljeforslag: DESIGNBESLUTNINGER-20261031.md er underregister; alle rækker skal fortsat dækkes af U04–U09/U15, ikke erstatte S/F-registret.
- Claude 871aa329 og tidligere animationer: CLAUDE-INTEGRATION-20261031.md og claude-grafik/ er kildebevis. Afstem leverede filer med integrationsmodulet; dokumentér bevidste forskelle.
- Medieregistre: MEDIA-INTEGRATION-STATUS.json, private overdragelsesregister og udvælgelse. Ingen udvidet offentliggørelse af private noter. Convequity og manglende rettigheder/kilder må ikke fremstilles som afklarede; afklar eksisterende leveringsnoter før evt. integration.
- Ingen genåbning af udtrykkeligt udskudt compliance eller historiske Azure-driftsopgaver. Ikke nyt redesign af godkendte sektioner.

## Afslutningsport
1. Alle U/S/F-rækker skal være afstemt med faktisk kode og leverance; ingen åben række må omdøbes til færdig alene pga. commit eller tests.
2. Alt uafhængigt autoriseret arbejde udføres før eventuelle afventende designvalg rapporteres som blokering.
3. Afsluttende rapport angiver præcis liste over færdigt, afventer Christian og godkendte fravalg, med beviser og reviewlink.
4. Goal må først markeres complete, når slutmålet er opfyldt. Ved reelt manglende input følges Goal-værktøjets blocker-regler; ingen falsk færdigmelding.
5. Automatiske tests er nødvendige, men erstatter ikke visuel og menneskelig gennemgang.
