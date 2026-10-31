# Slutkontrol af v19-review

## Leverancen
Reviewgren: codex/v18-animation-integration-20261031. Kilde og genereret side ligger sammen; build.py bygger fra gemte input. Ingen main-merge, Wix, Azure eller liveændringer. Widgeten kan skifte klasse; fordybelsen anvender PMINDI. Dette er et fast dataudtræk, ikke en ny daglig driftsløsning.

## Faktisk browserkontrol
- Widget: desktop og390px, begge klasser, begge ISIN-kopieringer, periodevalg, Nasdaq-serie, tre års kalender med mobile måneder nedad, destinationskort. Kontotypefremhævning overlever klasseskift.
- Portefølje: grafisk top, mobilkort og11-kolonne-desktoptabel, søgning, tomt resultat, seks perioder, begge sorteringsretninger, positive/negative farver, kort kurshistorik. Sektor-/geografifiltre og52-ugersintervaller kontrolleret. Navigation nu44px med aktiv sektionsmarkør. Tech-krydshenvisningen åbner korrekt side.
- Tech: desktop lys og mobil390;12 temaer, kompakt menu,44px klikmål, aktiv sektionsmarkør, ankerlukning, Chips-prik til temaside. Direkte tryk i AI-scenen zoomer til næste lag; direkte valg af sidste lag virker. Alle fem forretningsfaser skifter tekst og selskab korrekt på mobil.
- Chips: mobil Husker-panel, desktop Maskiner-valg, ingen lampenode. Bred isometrisk scene ved1512px og kompakt alternativ ved1280px. Søgning på NVIDIA og Regner-filter testet. Forklaringens hukommelsesgenvej giver9 selskaber og flytter til oversigten. Faktisk X-opslag indlæst og læst i mobilvisningen. Kæde/cyklus/Taiwan-forklaringer visuelt kontrolleret.
- SpaceX: interaktiv raket/Starlink/AI-forklaring,2015-milepæl, regnskabskort, Mads-sektion og historie gennemset på mobil; desktop tidslinje/diagram kontrolleret. Tredje film foldes ud og åbner korrekt YouTube-iframe. To faktiske Mads-X-indlejringer indlæst. Ingen vandret sideoverløb ved390px.
- NVIDIA: diagram og otte trin; Regner-link åbner korrekt chiptrin. Desktop lys/mørk og mobil mørk.
- Energi: strømkæde/tidslinje, lys hero, indlæst480px thumbnail, to nyheder plus tre foldede. Desktop/mobil og begge temaer for ændrede hoveddiagrammer.
- Kvante: seks omsætningsbjælker og støttefaser; desktop lys/mørk og mobil mørk. Ukendt udbetaling vises ikke som nul.
- Krypto: overlap og forretningstyper, originale detaljer, to rettede temalinks. Desktop lys/mørk og mobil lys.
- Råstoffer: fire led og kildecitat; desktop mørk/mobil lys.
- Fysisk AI: fem-mod-en-forklaring og eksisterende kildegrundlag; desktop/mobil. Ikke fremstillet som fondsvægt.
- Alphabet:0,00% tidligere position kontrolleret i data; fejlramme/inset-shadow fjernet, kilde venstrestillet.
- Software og fintech: supplerende mobilstikprøver af indgang og betalingsforklaring.
- eToro/SoFi-animationer, Tesla-omsætning og rumfartens fordeling: tidligere kontroller dokumenteret i CLAUDE-INTEGRATION-20261031.md.

## Afstemning af forslag
SAMLET-LEVERANCE.md dækker alle U/S/F-punkter. DESIGNBESLUTNINGER-20261031.md dækker de22 porteføljeforslag. Claude-integrationens afgrænsning står i CLAUDE-INTEGRATION-20261031.md. Christians seneste valg: kompakt klassevælger med tydeligere kontotyper, kompakte risiko/nøgletal, uændrede omkostninger, oprindelig52-ugers-farveskala, ét felt pr.sektor, ny grafisk top og udlodningsgraf.

## Præcise begrænsninger
Browserkontrollen er en gennemgang af de aftalte brugerrejser og ændrede komponenter med stikprøver blandt temasider/selskaber; den er ikke en manuel gennemgang af hver eneste selskabsside. Alle lokale links/aktiver og relevante dataregler kontrolleres automatisk. Der er ikke testet på fysisk iPhone/Safari eller i Wix. Indlejring afhænger stadig af YouTube/X/Instagram, og alle videoer er ikke afspillet fuldt igennem. Eksisterende finansielle udsagn er ikke genfaktatjekket i denne designrunde. Uafklarede rettigheder, Convequity og afsluttende compliance er ikke godkendt gennem dette review. Intet er udgivet på den rigtige forside.

## Sådan ses versionen
Lokal reviewindgang: http://127.0.0.1:8880/widget/index.html (kræver denne computers previewserver). GitHub-grenen indeholder koden og den byggede v19-review-mappe; GitHub Pages/main er ikke opdateret. Wix-udgivelse er et særskilt næste trin efter review, ikke udført her.
