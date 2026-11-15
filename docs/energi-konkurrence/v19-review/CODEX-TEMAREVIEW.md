# Review af de 12 temasider

Dato: 15. november 2026. Grundlag: `claude/upstart-eksempel`, commit `5c746d65c5e88f5fb80aada65bfb783e182d6b9e`. Rapportgren: `codex/temareview-20261115`.

**Status: Indholdsreview og kontrol af kildekode gennemført. Den krævede visuelle browsergennemgang er ikke gennemført.** Det gælder samtlige 12 sider ved både 360 og 1300 CSS-pixels. Rapporten er derfor en delleverance, ikke en færdig godkendelse af siderne.

En lokal Python HTTP-server blev startet fra `docs/energi-konkurrence/v19-review` på port 8000. Browseradgangen til localhost blev blokeret med `ERR_NETWORK_ACCESS_DENIED` i den lokale automatiserede browser og timeout i den integrerede browser. Det er en begrænsning i reviewmiljøet, ikke dokumentation for en fejl på sitet. Overlap, beskæring, farveadskillelse, læsbar skrift, vandret mobilscroll, faktisk billedindlæsning og browserkonsollen står derfor åbne på alle sider. Der er ikke ændret sider, scripts eller data for at komme uden om blokeringen.

Alle 12 HTML-filer er læst sammen med relevante scripts og data. Relative filhenvisninger og sidernes egne ankre er kontrolleret mod repositoryets filtræ. Den kontrol fandt ingen manglende filhenvisninger, manglende interne ankre eller dublerede id'er i de 12 sider. Det er ikke en kontrol af alle eksterne links eller af ankre på andre sider. Eksterne adgangsfejl er ikke kategoriseret som døde links.

Faktuelle indsigelser nedenfor bygger på primærkilder. Udvalgte centrale tal er efterprøvet, men samtlige oplysninger om samtlige selskaber er ikke uafhængigt verificeret. Kodefund er markeret særskilt. De isolerede scriptforsøg anvender den eksisterende JavaScript-kode med et minimalt simuleret dokument og er ikke browsertests.

Prioritet **P1** er forkert selskabsstatus, misvisende forklaringer eller funktioner, der mister væsentlige oplysninger. **P2** er øvrige funktionsfejl, manglende dokumentation og uklarheder. Siderne står efter deres væsentligste fund. Den fælles P1-fejl ved datanedbrud er beskrevet i den afsluttende liste.

## 1. Råstoffer, raastoffer.html

### Fejl

- **P1, selskabskortet USA Rare Earth og markeringen “projekt”: Status er forældet.** Siden beskriver Stillwater som under opbygning og placerer selskabet blandt projekter uden produktion. Selskabets kvartalsmeddelelse fra 9. november 2026 oplyser, at de første magneter fra Stillwater blev solgt i september. Den beskriver også produktion hos Serra Verde efter overtagelsen. Round Top er fortsat et udviklingsprojekt, men det gør ikke hele selskabet til et projekt uden produktion. Fejlen ændrer læserens forståelse af selskabets modenhed og risiko. Kilde: [USA Rare Earth, Q3 2026, SEC, især “Commenced NdFeB magnet sales from Stillwater facility”](https://www.sec.gov/Archives/edgar/data/1970622/000197062226000066/exhibit991-earningsrelease.htm).
- **P1, opgørelsen over selskaber uden produktion: Grundlaget skal genberegnes.** USA Rare Earth indgår i projektmarkeringerne flere steder, også i illustrationen med magneter. Den samlede optælling kan derfor ikke fastholdes med den nuværende definition. Der bør ikke blot ændres fra ti til ni, før status for de øvrige selskaber er kontrolleret. Dette er en følgefejl af det dokumenterede statusproblem ovenfor.

### Forbedringsforslag

- Skeln mellem “producerer og sælger”, “opskalering” og “udviklingsprojekt”, med dato ved status. Vis mine, raffinering og magnetproduktion hver for sig, når et selskab spænder over flere stadier. Det forklarer bedre, hvad investoren faktisk tager risiko på.
- Brug illustrationen til også at forklare forskellen på et stort behov for et råstof og en god forretning for en bestemt producent. Et kort eksempel med salgspris, produktionsomkostning og nødvendig finansiering vil give læseren mere end endnu en liste over anvendelser.

## 2. Fintech, fintech.html

### Fejl

- **P1, betalingsforløbet: Afbetaling fremstilles som automatisk rentebærende.** Formuleringen “ved betaling over tid kommer der renter oveni” er kategorisk. Affirm tilbyder også rentefri Pay in 4. Selskaberne kan altså få indtægter fra forhandleren, selv om kunden ikke betaler renter. Tegningens fire betalinger på 300 kr. for et køb på 1.200 kr. viser desuden selv et forløb uden et rentetillæg. Kilde: [Affirm, betalingsvilkår](https://www.affirm.com/disclosures?sub_id=undefined). Forklaringen bør skelne mellem rentefrie rater og rentebærende finansiering.
- **P1, “Forsikring i en chat”: Ategrity passer ikke til den beskrevne kunderejse.** Ategrity vises som eksempel under en forklaring om kunder, der tegner forsikring og anmelder skader i en chat. Selskabets forretning er erhvervsforsikringer til små og mellemstore virksomheder gennem forsikringsformidlere. Dets eget kort længere nede beskriver faktisk erhvervskunder korrekt. Dermed giver illustration og selskabstekst forskellige billeder af forretningen. Kilde: [Ategrity, produktmeddelelse 18. august 2026, beskrivelsen af wholesale distribution og broker network](https://investors.ategrity.com/news/news-details/2026/Ategrity-Launches-Four-New-Products-Powered-by-Its-Productionized-Underwriting-Model/default.aspx).

### Forbedringsforslag

- Følg ét køb på 1.200 kr. gennem to tydeligt adskilte finansieringsforløb. Vis, hvem der betaler gebyr, hvem der finansierer købet, og hvem der taber penge ved misligholdelse. Det forbinder den letforståelige kunderejse med den risiko, investoren skal forstå.
- Erstat den meget skarpe modsætning mellem bankfilial og telefon med forskelle i forretningsmodel: indlån, egen udlånsbalance, formidling og betalingsteknologi. En app fortæller ikke i sig selv, hvordan selskabet tjener penge eller bærer kreditrisiko.
- Del forsikringseksemplet i digital kundebetjening og automatiseret risikovurdering. Så kan både Lemonade og Ategrity forklares uden at få alle selskaber til at ligne den samme forretning.

## 3. Datacentre, datacenter.html

### Fejl

- **P1, indledning, byggetegning og sammenligningen med almindelige datacentre: Kravet om væskekøling er gjort generelt.** Teksten siger, at AI-serverne “skal køles med væske”, og gentager det som egenskab ved AI-racks. Det gælder den viste GB200 NVL72-konfiguration, men ikke alle AI-servere. NVIDIA beskriver selv luftkølede DGX B200-systemer til både træning og inferens. Kilde: [NVIDIA, DGX B200, afsnittene om inference og AI training](https://www.nvidia.com/en-eu/data-center/dgx-b200/). Den nuværende formulering gør ét konkret produkt til definitionen på hele markedet.
- **P2, selskabskort: Flere store omsætningsandele mangler periode.** Cienas 18 %, Flex' 24 % og Sterling Infrastructures 59 % står uden år eller kvartal. Sanminas 62 % angives for “3. kvartal”, men uden år eller præcis regnskabsperiode. De står ved siden af andre tal, som er dateret. Læseren kan derfor ikke sammenligne dem eller afgøre, om de beskriver samme tidspunkt. Dette er en dokumentationsfejl, ikke en konstatering af, at procenterne er forkerte. Angiv periode og konkret regnskabsreference ved hvert tal.
- **P2, “Byg dit eget datacenter”, knappen +10: Første tryk lægger kun ni til.** Startværdien er ét rack. I `assets/claude/33-hal.js` ændrer særreglen `d===10 && n===1` værdien til 10 i stedet for 11. Knappens handling stemmer derfor ikke med dens tekst. Bekræftet ved kodegennemgang.
- **P2, racktælleren: Entalsformen bliver “1 racks”.** Scriptet opdaterer kun tallet i tælleren, mens flertalsformen står fast i HTML. Det er en konkret grammatisk fejl i starttilstanden.

### Forbedringsforslag

- Præsenter 120 kW som et konkret, navngivet eksempel på et tæt pakket AI-rack. Sammenlign det med det almindelige rack uden at lade de to eksempler definere samtlige installationer.
- Sæt “Servernes elforbrug ved fuld belastning” direkte ved beregningens resultat. Forudsætningerne om 8.760 timer og udeladt køling findes allerede nedenunder, men er afgørende for at forstå resultatet. Tilføj eventuelt en belastningsvælger, så læseren kan skelne mellem kapacitet og faktisk årsforbrug.
- Forklar først de fire led server, forbindelse, strøm/køling og drift. Brug dem som læserens kort gennem selskaberne. Den lange liste bliver lettere at forstå, når hvert selskab besvarer et konkret behov i hallen.

## 4. Software og AI, software.html

### Fejl

- **P1, rumillustrationens fondsandele: Opdateringen lytter det forkerte sted.** `assets/claude/26-rum.js` beregner andelene ved initialisering og lytter derefter på `window` efter `ndi:live`. `assets/js/live-session.js` sender eventet på `document` uden bubbling. Når fondsdata kommer efter initialiseringen, bliver felterne med `data-rum-andel` derfor ikke opdateret af denne mekanisme. Et isoleret forsøg med det faktiske script bekræftede, at dokumenteventet lod feltet stå uændret, mens et window-event opdaterede det. Der er ikke fundet en anden opdatering af disse felter i `live-theme-values.js`. Dette er et kodefund, ikke en observation fra en indlæst browserside.

### Forbedringsforslag

- Lad hvert rum vise en konkret arbejdsopgave før produktkategorierne: fx at finde et angreb, besvare en kunde eller udvikle et program. Forklar derefter, hvem kunden betaler, og hvad der udløser betalingen.
- Skeln tydeligere mellem, hvad software bruges til, og hvordan selskaberne fakturerer. De fem selskabsgrupper er anvendelsesområder, mens abonnement, brugerbetaling og forbrugsbetaling er indtægtsmodeller. To forskellige inddelinger under samme idé om “måder at tjene penge på” gør det sværere at holde tråden.
- Brug et enkelt regneeksempel på en kundes regning før og efter AI. Det kan forklare både mulighed for mersalg og risikoen ved færre betalende brugere bedre end generelle formuleringer om AI-vækst.

## 5. Kvantecomputere, kvante.html

### Fejl

- **P1, “Mål en qubit”: Prikkerne holder op med at afspejle tælleren.** `assets/claude/28-maal.js` har et loft på 60 tegnede prikker for hvert udfald, men tæller videre uden loft. Med mange målinger kan grafen derfor ende med lige mange prikker i begge bunker, selv om antallet af nuller og ettaller er meget forskelligt. Et isoleret forsøg med 100 målinger med samme udfald gav 100 i teksten og 60 prikker. Begrænsningen er ikke forklaret for læseren. Grafen demonstrerer dermed efterhånden noget andet end resultatteksten.
- **P2, “Mål 50” efterfulgt af nulstilling: Nulstilling stopper ikke måleserien.** Nulstillingen rydder tællere og prikker, men annullerer ikke de planlagte kald. Et isoleret forsøg nulstillede efter første måling og endte med 49 nye målinger. Skift af blanding kalder samme nulstilling og lader også den igangværende serie fortsætte. Se `nul()`, `koer` og `setTimeout` i `28-maal.js`. Læserens handling får ikke den forventede virkning.
- **P2, støttebeløbet “300 mio. dollar”: Maksimumbeløb fremhæves som fast beløb.** Den store oplysning siger 300 mio. dollar i tilsagn, mens dens egen forklaring siger “op til 100 mio. hver”. Kildelisten beskriver også alle tre tilsagn som “op til”. Summens forbehold skal med i den fremhævede tekst, ellers er hovedtal og forklaring ikke konsistente. Fundet bygger på sidens egne formuleringer, ikke på en antagelse om faktisk udbetaling.

### Forbedringsforslag

- Forklar, at hver ny måling i øvelsen forudsætter en qubit, der er forberedt på ny i den valgte tilstand. Ellers kan gentagne tilfældige resultater ligne en påstand om at måle den samme uændrede qubit igen og igen. Tilføj også, at øvelsen viser målesandsynligheder, ikke hele forklaringen på kvanteberegning. Kilde til målingens betydning: [NIST, Quantum Computing Explained](https://www.nist.gov/quantum-information-science/quantum-computing-explained).
- Vis tre tydeligt adskilte milepæle: teknisk demonstration, betalende kunder og en økonomisk fordel i en praktisk opgave. Knyt selskabernes omsætning til den ramme, så læseren ikke automatisk læser stigende omsætning som bevis på et teknologisk gennembrud.

## 6. Krypto, krypto.html

### Fejl

- **P1, definitionen af stablecoins: Dollaren gøres til en nødvendig egenskab.** Siden forklarer stablecoins som knyttet til én dollar, men nævner selv EURC. EURC følger euroen. Forklaringen kan godt tage udgangspunkt i USDC, men må ikke gøre eksemplet til definitionen på hele kategorien. Kilde: [Circle, EURC, fuld euroreserve og indløsning 1:1](https://www.circle.com/eurc).
- **P2, kilde til Circles regnskab: Linkteksten skjuler, at destinationen er en aggregator.** Henvisningen til regnskabsmeddelelsen går til Finviz frem for den oprindelige udgiver. Det gør efterprøvning og versionskontrol unødigt besværlig. Circles egen Q3-meddelelse er tilgængelig og understøtter de kontrollerede hovedtal, så dette er en kildehenvisningsfejl, ikke et fund af forkerte Circle-tal. Primærkilde: [Circle, Q3 2026 earnings release](https://s206.q4cdn.com/265218871/files/doc_earnings/2026/q3/earnings-result/3Q26-Earnings-Release.pdf).

### Forbedringsforslag

- Adskil først bitcoin, dollarbaserede stablecoins og de børsnoterede selskaber, som leverer infrastrukturen. Forklar, hvad investoren ejer i hver situation, og hvilke indtægter der afhænger af kurs, handelsaktivitet eller renter.
- Lad blockchainillustrationen følge en overførsel mellem to wallets. Forklar særskilt, at en handel inde på en børs ikke nødvendigvis svarer til en selvstændig overførsel på blockchainen. Det giver en mere præcis forbindelse mellem kundens handling og tegningen.
- Vis ved Circle, hvordan lavere renter kan påvirke indtægten fra reserverne, også hvis mængden af stablecoins vokser. Det vil gøre de store omsætnings- og aktivitetstal mere anvendelige for en investor.

## 7. Sundhed og biotek, sundhed.html

### Fejl

- **P2, fase 3 i “Vejen til patienten”: “Virker det bedre?” er for snævert som generel overskrift.** Fase 3 skal ikke altid bevise overlegenhed over en anden aktiv behandling. Studier kan også undersøge, om effekten ikke er uacceptabelt ringere inden for en på forhånd fastlagt margin. Den efterfølgende forklaring om virkning og sikkerhed er bredere og bedre end overskriften. Kilde: [FDA, Non-Inferiority Clinical Trials](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/non-inferiority-clinical-trials).
- **P2, datagrundlaget under forsøgsillustrationen, spørgsmål til afklaring:** Er 2014 til 2023 faktisk en kohorte af lægemidler, som begyndte i fase 1 i de år, eller er det perioden for registrerede overgange mellem faser? Siden skriver det første. De oplyste faseprocenter og deres produkt dokumenterer ikke i sig selv den fortolkning. Citeline-materialets metode kunne ikke efterprøves tilstrækkeligt i denne gennemgang. Dette skal afklares før en eventuel rettelse og er ikke registreret som et bevist forkert tal.

### Forbedringsforslag

- Stil et udviklingsselskab og et selskab med godkendt medicin ved siden af hinanden: hvad finansierer driften, hvad er næste afgørende begivenhed, og hvad kan ændre værdien? Det gør risikoen ved de 100 prikker konkret.
- Forklar ved Lilly-grafen, at de to store produkter indeholder samme aktive stof. Det står allerede nedenunder, men bør indgå i selve forklaringen af koncentrationsrisikoen, så to produktnavne ikke opfattes som to uafhængige væddemål.
- Vælg et citat, der knytter sig til de sundhedsselskaber, siden netop har gennemgået, eller forklar forbindelsen til Intuitive Surgical. Som førstegangslæser bliver man ellers sendt fra medicin og digital behandling til et nyt selskab og kirurgiske robotter lige før risiciene.

## 8. Platformsøkonomi, platforme.html

### Fejl

- **P2, “Hvem får pengene, når platformen vokser?”: Årsvalget styrer ikke hele forklaringen.** Skyderen ændrer omsætningsgrundlag og år i grafen, men fordelingen af 100 kr. bliver ved med at bruge de faste 2025-tal. I `assets/claude/38-penge.js` ændrer `tegn()` år og søjler, mens `p.andel` og forklaringen kun sættes i `vaelg()`. Det er især uklart for MercadoLibre, hvor sideteksten ikke selv angiver 2025. Uber har en eksplicit note om 4. kvartal 2025, som mindsker problemet dér. Læseren kan ved valg af 2021 fejlagtigt tro, at den viste bid gælder 2021. Dette er en daterings- og betjeningsuklarhed, ikke en påstand om, at 2025-procenterne er forkerte.

### Forbedringsforslag

- Lad årsvælgeren opdatere både handelsvolumen og platformens andel, eller giv sidestykket en fast og tydelig overskrift “Fordeling i 2025”. De to løsninger fortæller forskellige historier, men begge er mere entydige.
- Bevar den gode forklaring “Bid er ikke overskud”, og gør den til en gennemgående figur med tre trin: kundernes køb, selskabets omsætning og resultat. Forklar også, hvorfor egen varesalg og formidling kræver forskellige beregninger.
- Introducer forskellen på en markedsplads og en virksomhed, der selv sælger varen, før den lange selskabsliste. Flere af selskaberne kombinerer begge dele, og en fælles platformetiket forklarer ikke deres forskellige marginer og kapitalbehov.

## 9. Robotter og fysisk AI, fysisk-ai.html

### Fejl

- **P2, sammenligningen mellem førerassistance og selvkørende biler: Rækken besvarer ikke sin egen overskrift.** “Hvem der har ansvaret” besvares for selvkørende biler med, at bilen kører selv uden fører. Det beskriver bemanding, ikke hvem der har ansvaret. En førerløs bil ophæver ikke spørgsmålet. Rækken bør enten handle om, hvem der udfører kørslen, eller forklare ansvaret med den nødvendige afgrænsning. Her er konstateret en sproglig og indholdsmæssig uoverensstemmelse, ikke foretaget en juridisk vurdering.
- **P2, “NewDeal Invests perspektiv”: En oversættelse kaldes et ordret uddrag.** Standardintroduktionen lover et ordret uddrag, mens netop dette citat udtrykkeligt er oversat fra engelsk. Oplysningen om oversættelse er god, men de to beskrivelser bør stemme overens. Det er ikke dokumentation for, at oversættelsen er forkert.

### Forbedringsforslag

- Skeln tydeligt mellem elektrificering, almindelig automatisering og AI, der tilpasser sig omgivelserne. Elbilernes udbredelse og antallet af industrirobotter er relevant baggrund, men måler ikke i sig selv udbredelsen af fysisk AI. Brug statistikkerne med den afgrænsning.
- Lad én konkret robottaxa demonstrere kæden sanse, forstå, beslutte og handle. Knyt først derefter kameraer, lidar, chips, biler og robotter til selskaberne. Det giver læseren et sammenhængende forløb frem for flere sideløbende teknologihistorier.
- Vis modenheden ved hvert eksempel: demonstreret, afprøvet i et begrænset område eller i almindelig kommerciel drift. Det gør afsnittet om forskellen på demonstration og drift anvendeligt allerede under læsningen.

## 10. Rumfart, rumfart.html

### Fejl

- **P2, kildegrundlaget for “8 ud af 10”: Den præcise nævner er uafklaret.** Kildelisten angiver 161 af 199 FAA-licenserede opsendelser i finansåret 2025 med et nyhedsmedie som kilde. FAA's egen prognoserapport opgiver 195 licenserede opsendelser og 204 opsendelser og tilbagevendinger samlet. Hvilken afgrænsning giver 199? Det omtrentlige udsagn “8 ud af 10” kan stadig være rigtigt, men nævneren bør afstemmes mod primærkilden. Kilde: [FAA Aerospace Forecast FY 2026 til 2046, afsnittet “FY 2025 Results”](https://www.faa.gov/data_research/aviation/aerospace_forecasts/FY_2026-2046_Full_Forecast_Document_Tables.pdf). Forskellen er stillet som et spørgsmål, fordi opgørelsesforskellen ikke er endeligt afklaret.
- **P2, kilde til de 204 operationer: Der linkes til en gengivelse, selv om originalen findes.** Tallet er ikke i sig selv fundet forkert. Det kan efterprøves direkte i transportministeriets rapport. Det nuværende ekstra led gør det vanskeligere at forstå, at serien tæller både opsendelser og tilbagevendinger. Primærkilde: [US Department of Transportation, Agency Financial Report FY 2025](https://www.transportation.gov/sites/dot.gov/files/2026-01/FY2025DOTAFR_508c_0.pdf).

### Forbedringsforslag

- Byg introduktionen op omkring en konkret kontrast mellem en opsendelse, der betales én gang, og en satellittjeneste, der kan give indtægter løbende. Den forklaring er allerede god længere nede og kan bære siden fra begyndelsen.
- Skriv et konkret år eller en periode i stedet for “For få år siden”, når statslig rumfart sættes over for nutidens private opsendelser. Den nuværende formulering komprimerer en lang udvikling og får forandringen til at virke mere pludselig, end sidens egen serie forklarer.
- Knyt banernes afstande til konsekvenser for forretningen: forsinkelse i signalet, antal nødvendige satellitter og kunder. Det gør zoomfunktionen til mere end en geografisk introduktion.
- Gør sammenhængen mellem SpaceX' fondsandel og dets blandede omsætning tydelig. Siden oplyser allerede, at 2025-tallene er pro forma med xAI og X. Forklar kort, hvorfor en stor position i rumfartstemaet derfor også giver eksponering mod andre aktiviteter.

## 11. Chips og halvledere, chips.html

### Fejl

- **P2, selskabskortene MKS og Rigaku: De konkrete omsætningstal mangler en sporbar reference på temasiden.** MKS angives til 43 % i 2025 og Rigaku til omkring en tredjedel i første halvår 2026. Perioderne er angivet, men kildelisten henviser kun generelt til selskabernes rapporter og hjemmesider, uden at udpege dokumentet bag netop disse oplysninger. Dette er en mangel ved dokumentationen, ikke en konstatering af forkerte tal.

### Forbedringsforslag

- Lad de otte grupper følge produktionens rækkefølge, eller giv læseren et særskilt procesoverblik før sorteringen efter fondsvægt. Siden forklarer kæden godt, men springer derefter til en anden sorteringslogik. Det gør det sværere at huske, hvor et selskab passer ind.
- Forklar en gang, hvordan samme efterspørgselsstigning kan ramme chipdesigner, fabrik og udstyrsleverandør på forskellige tidspunkter. Det forbinder det store salgstal med de forretningsmodeller, der følger.
- Giv en mulighed for at gå trinvis gennem chipbygningen uden at skulle holde en knap nede. Bevar animationen, men lad læringen være tilgængelig gennem en almindelig trinbetjening.

De kontrollerede hovedtal giver ikke grundlag for en talfejl: 301,9 + 223,1 + 266,7 = 791,7 mia. dollar, og “2 af 3 dollar” er en rimelig afrunding. Kilde: [Semiconductor Industry Association, 6. februar 2026](https://www.semiconductors.org/global-annual-semiconductor-sales-increase-25-6-to-791-7-billion-in-2025/).

## 12. Energi og elnet, energi.html

### Fejl

- **P2, “Hvad adskiller strøm fra elnettet fra strøm ved datacentret?”: Sammenligningen af hastighed er ufuldstændig.** Den ene side af rækken “Hvor hurtigt det går” angiver 4 til 8 år, mens den anden blot siger, at anlæg kan stilles ved siden af datacentret. Placeringen besvarer ikke tidsspørgsmålet. Det får alternativet til at fremstå hurtigere uden at oplyse, om der faktisk sammenlignes samme projektomfang. Siden omtaler selv lange leveringstider, så afgrænsningen er væsentlig.

### Forbedringsforslag

- Skeln tidligt mellem at producere tilstrækkelig energi, at kunne tilslutte en stor effekt og at sikre reservestrøm. De tre problemer kræver forskellige løsninger, men indledningen glider hurtigt mellem dem.
- Forklar ved strømsvigtet i Spanien og Portugal, at eksemplet illustrerer driftsstabilitet og reservestrøm. Det dokumenterer ikke, at AI-forbrug forårsagede hændelsen. Den korte afgrænsning vil forhindre en nærliggende fejlslutning efter indledningens historie om AI og strømmangel. Kilde: [ENTSO-E, ekspertpanelets slutrapport om strømsvigtet 28. april 2025](https://www.entsoe.eu/publications/blackout/28-april-2025-iberian-blackout/).
- Vis ét konkret datacenter med strøm fra nettet, eventuel lokal produktion, batteri og generator. Forklar, hvornår hver del bruges, før selskabsgrupperne foldes ud. Det vil gøre den brede liste af gas, uran, sol, batterier og elnet lettere at holde sammen på.

IEA's opgørelse understøtter de kontrollerede 485 TWh i 2025 og væksten på 17 % for alle datacentre og 50 % for AI-fokuserede datacentre. De er derfor ikke anført som fejl. Kilde: [IEA, Key Questions on Energy and AI, executive summary](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary).

## Fejl og problemer på tværs af siderne

- **P1, alle 12 sider: En fejl i fondsdata skjuler også den redaktionelle forklaring.** `assets/js/live-session.js` kræver flere eksterne datafiler, før siderne vises normalt. Fejltilstanden `ndi-live-failed` skjuler hovedindholdets børn bortset fra fejlmeddelelsen. Den redaktionelle reservevisning i scriptet gælder kun selskabssider. Dermed kan en fejl i fondsdata også gøre de statiske forklaringer af eksempelvis chips eller sundhed utilgængelige. Det er en dokumenteret kodeafhængighed, ikke en konstatering af en aktuel Azure-fejl. Bevar forklaringer og kilder, mens de berørte fondsoplysninger markeres som utilgængelige.
- **P1/P2, flere sider: Et konkret eksempel bliver til en generel definition.** Det gælder rentebærende afbetaling, væskekølede AI-servere, dollarbaserede stablecoins og fase 3 som bevis for bedre effekt. Forenklingerne bør afgrænses i selve hovedteksten, hvor læseren danner sin forståelse.
- **P2, flere sider: Tal og status mangler en præcis dokumentationskæde.** Nogle omsætningsandele mangler periode, andre har periode uden en konkret regnskabsreference. USA Rare Earth viser desuden, at status udledt af ældre materiale kan være overhalet af nyere rapportering. Angiv periode, kildedokument og dato for seneste statuskontrol tæt på oplysningen.
- **P2, flere sider: Sammenligninger svarer ikke altid på samme spørgsmål på begge sider.** Det gælder ansvar for selvkørsel og hastigheden af strømforsyning. Gennemgå hver række som et spørgsmål, der skal have to sammenlignelige svar.
- **P2, flere sider: Den indledende fortælling mister fremdrift i lange selskabslister.** Chips og energi skifter blandt andet fra en forklaring af en kæde til sortering efter fondsvægt. Et kort procesoverblik og en tydelig mulighed for at åbne selskaberne gruppevis vil hjælpe førstegangslæseren.
- **Sprogkontrol: Ingen sikre brud på de oplyste faste regler blev fundet i den statiske HTML-brødtekst.** Kode, CSS og HTML-entiteter er ikke talt som tegnsætningsfejl. Dynamisk indlæst tekst og den endelige browservisning er ikke fuldt kontrolleret. De konkrete sproglige problemer ovenfor er derfor vigtigere end en generel påstand om mange stave- eller tegnsætningsfejl.

**Tilbage før reviewet kan kaldes færdigt:** Åbn chips, datacenter, energi, fintech, fysisk-ai, krypto, kvante, platforme, raastoffer, rumfart, software og sundhed gennem den lokale server i både 360 og 1300 CSS-pixels. Gennemgå hele hver side, afprøv dens interaktioner, kontroller netværk og konsol, og vurder tekststørrelser, overlap, farver, beskæring og vandret scroll. Ingen af de 24 visuelle gennemgange er godkendt med denne rapport.
