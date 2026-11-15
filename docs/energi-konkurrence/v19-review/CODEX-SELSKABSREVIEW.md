# Selskabsreview

Status pr. 15. november 2026: tekst- og kodegennemgang af alle 87 sider. Den visuelle browserkontrol mangler, og rapporten er derfor ikke et færdigt samlet review.

Grundlag: `claude/selskabssider-review`, commit `7d4b6d6b7d343a3862d5b3231f322effccbbad8b`. Rapporten ligger alene på `codex/selskabsreview-20261115`. Ingen sider, data eller scripts er ændret.

## Afgrænsning og kontrol

- Alle 87 HTML-sider er læst sammen med nøgletalsfilerne og teksten i de indlejrede desktop- og mobiltegninger. Tegningerne i HTML er flere steder forskellige fra de løse SVG-filer. Fund om sidens indhold gælder HTML-versionen.
- Alle 87 nøgletalsfiler er sammenholdt med TAL.json i det private kildearkiv. De numeriske felter stemmer mellem de to. Det er ikke en uafhængig faktabekræftelse, og Samsungs enhedsfejl findes begge steder.
- Udvalgte regnskabstal, perioder og udsagn er efterprøvet mod primærkilder og regnskabsuddrag fra kildearkivet, især for de prioriterede selskaber. Der er ikke foretaget en fuld uafhængig kontrol af hvert tal og hver faktuel sætning på alle 87 sider. Kontrolnoternes egne godkendelser er ikke betragtet som dokumentation i sig selv.
- De kontrollerede kvartalsvæksttal i faktabåndene, hvor teksten bruger formuleringen 'vækst i omsætningen i kvartalet', stemmer med beregning på nøgletalsfilernes sammenligningstal inden for afrunding. Udvalgte LTM-regnestykker, bl.a. Tesla, Ford, Dell og Reddit, stemmer med årsregnskab plus indeværende delperiode minus sidste års tilsvarende delperiode.
- Lokale filhenvisninger og interne ankermål er kontrolleret mod repo og HTML. Der blev ikke fundet manglende målfiler eller ankermål i denne kontrol. Det dokumenterer ikke, at alle ressourcer indlæses korrekt i browseren, eller at alle eksterne links virker.
- Computerforbindelsen blev utilgængelig under arbejdet. Ingen af siderne er visuelt kontrolleret ved 360 eller 1300 punkter. Konsolfejl, vandret scroll, faktisk tekstoverlap, klipning og læsbarhed er derfor udestående. Reservevisningen ved manglende fondsdata er ikke regnet som en fejl.
- Rolls-Royce findes ikke blandt de 87 gk-sider på denne commit. Den eksisterende side i `selskaber/` omtales særskilt, så dens anden version ikke forveksles med reviewets øvrige sider.

P1 er en væsentlig tal-, periode- eller indholdsfejl. P2 er en sprog-, dokumentations- eller forståelsesfejl. Spørgsmål er forhold, der kræver afklaring, og ikke konstaterede faktafejl. Samsung står først på grund af enhedsfejlens størrelse. Derefter kommer de prioriterede selskaber, øvrige sider med P1-fund og resten.

## samsung-electronics

**Fejl**

- **P1, alle beløb i nøgletalsgrafen: Tallene er 1.000 gange for små i forhold til den viste enhed.** Datafilen angiver 333605.938 for omsætning 2025, men rendererens enhed er mio. KRW. Samsungs resultatopgørelse angiver 333.605.938 mio. KRW. Brødtekstens 333,6 billioner won er dermed korrekt, mens grafen bliver ca. 333,6 mia. won. Samme faktorfejl findes i årets resultat, halvår, kvartal og LTM. LTM-omsætningen skal med denne enhed være 333.605.938 + 305.372.914 - 153.706.820 = 485.272.032 mio. KRW. Kilder: [Samsung, resultatopgørelse 2025](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_con_quarter04_soi.pdf) og [halvårsregnskab 2026](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_con_quarter02_all.pdf), efterprøvet mod arkivernes ordrette tabeluddrag.

- **P2, dansk tekst i temabaggrundens link:** 'Uge 36 - Vælg udviklingen, ikke vinderen' bruger bindestreg som tankestreg.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Samsung Electronicss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Tegning, kundegruppe:** 'AI-servere køber hukommelse' lader maskiner optræde som købere. Skriv, om køberen er serverproducenten eller datacenteroperatøren.

**Forbedringsforslag**

- Tilføj risikoen ved priser og konkurrence i hukommelse samt produktionsteknologi, dokumenteret i selskabets egne oplysninger. Den nuværende liste fokuserer næsten kun på generelle finansielle risici, selv om halvledere driver forklaringen af indtjeningen.

## nvidia

**Fejl**

- **P1, nøgletalskortets kvartal:** Kortet mærker de 96.221 mio. dollar som 3. kvartal 2026, fordi `21-noegletal.js` udleder kvartalet af slutdatoens måned. Datafilen og kilden angiver 2. kvartal i regnskabsåret 2027, afsluttet 26.7.2026. Perioden er dermed forkert navngivet. Kilde: [NVIDIA, 10-Q](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm).

**Forbedringsforslag**

- Vis datacenter og spil som to indtægtsstrømme med deres størrelse. Forklar, at CUDA understøtter salget af hardware, mens særskilte softwarelicenser er en anden betaling, så tegningen ikke antyder betaling for enhver brug af CUDA.

## microsoft

**Fejl**

- **P1, nøgletalskortets kvartal:** De 92.279 mio. dollar er 1. kvartal i regnskabsåret 2027, men det fælles script viser 3. kvartal 2026 ud fra slutdatoen 30.9.2026. Kilde: [Microsoft, 10-Q](https://www.sec.gov/Archives/edgar/data/789019/000119312526436133/msft-20260930.htm).

**Forbedringsforslag**

- Forklar i faktabåndet, at Azure indgår i Microsoft Cloud. De to store tal kan ellers læses som to adskilte forretninger og lægges sammen.

## broadcom

**Fejl**

- **P2, videotitel under 'Bliv klogere':** '... fået øjenene op for - hvad betyder det?' bruger bindestreg som tankestreg. Det bryder den faste sprogregel, også selv om teksten gengiver en videotitel.

- **P2, risici:** 'bruttomargin' forklares ikke. Forklar kort, at det er andelen af omsætningen tilbage efter de direkte produktomkostninger.

**Forbedringsforslag**

- Adskil direkte kunde og slutkunde i koncentrationstallene. En direkte kunde på 32 % og fem slutkunder på omkring 40 % måler ikke det samme, og læseren skal kunne forstå distributørens rolle.

## oracle

**Fejl**

- **P1, nøgletalskortets kvartal:** 19.345 mio. dollar til 31.8.2026 mærkes 3. kvartal 2026 af det fælles script, mens datafilen og brødteksten angiver 1. kvartal i regnskabsåret 2027. Se `data/noegletal/oracle.js` og `assets/claude/21-noegletal.js`.

**Forbedringsforslag**

- Sæt de indgåede aftaler ved siden af den årlige omsætning og forklar, at aftalerne skal leveres over flere år. Vis derefter behovet for nye datacentre og finansiering. Det forbinder vækstmulighed med risiko.

## tesla

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

**Forbedringsforslag**

- Del bilsalg, energilagring og fremtidige indtægter fra selvkørsel tydeligt. Vis derefter forskellen på FSD med førerovervågning og den afgrænsede taxatjeneste, så de ikke glider sammen for en førstegangslæser.

## micron-technology

**Fejl**

- **P1, nøgletalskortets kvartal:** 54.230 mio. dollar mærkes 3. kvartal 2026 ud fra slutdatoen 3.9.2026. Datafilen og brødteksten identificerer det som 4. kvartal i regnskabsåret 2026. Se `micron-technology.js` og `21-noegletal.js`.

- **P2, indledning:** 'gøre intelligens hurtigere og rigere for alle' er en uidiomatisk gengivelse af et selskabsslogan. Det fortæller ikke læseren, hvad hukommelsen gør. 'SSD' i tegningen forklares heller ikke ved forkortelsen.

- **P2. Tegning, kundegruppe:** 'Telefon og pc køber hukommelse' og 'Biler og industri køber chips' blander produkter og kunder. Vis producenterne som købere, så pengestrømmen giver mening.

**Forbedringsforslag**

- Vis, hvor meget af væksten der kommer fra priser, og hvor meget der kommer fra solgte mængder. Det vil gøre faktabåndets store vækst og prisstigning forståelige og forbinde dem med risikoen for en vending i markedet.

## softbank-group

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 30.9.2026 bliver kaldt 3. kvartal 2026, selv om selskabet opgør den som 2. kvartal i regnskabsåret til 31.3.2027. Det fælles script bruger kalendermåneden uden at oplyse, at det ændrer regnskabets kvartalsbetegnelse. Kilde: `data/noegletal/softbank-group.js`, det deri angivne regnskab og `21-noegletal.js`.

- **P1, nederste del af siden: Indholdsblokke er indsat to gange.** 'Teknologi → forretning', perspektiv og video gentages. HTML har dublerede id'er `v5-forretning`, `v5-perspektiv`, `mere-fra-ndi` og `rm-title`. Det gentager teksten og gør ankermål og tilgængelighedsreferencer tvetydige. Kodefund i `gk/softbank-group.html`.

- **P2, perspektivafsnittet:** 'Det er et historisk perspektiv; datidens ...' bruger semikolon. Linktitlen 'Uge 14 - De 10 største ...' bruger bindestreg som tankestreg. Begge optræder i de gentagne blokke.

**Forbedringsforslag**

- Skil koncernens omsætning fra værdien af investeringerne. Et oversigtsbillede med Arm, SoftBank Corp. og investeringerne vil gøre det klart, hvorfor stigende værdi i OpenAI ikke er det samme som kundebetalinger eller omsætning.

## ford-motor

**Fejl**

- **P2, temabaggrund:** 'Artiklen bruges som temabaggrund; den er ...' indeholder semikolon. 'Uge 40 - USA og Europa ...' bruger bindestreg som tankestreg.

- **P2, indledning:** 'frit valg af drivlinje' efterfølges af et langt selskabsslogan om at forfølge drømme. 'Drivlinje' forklares ikke, og sloganet skubber forklaringen af forretningen ned. Skriv almindeligt dansk om benzin, hybrid og el.

**Forbedringsforslag**

- Vis forskellen på Ford Blue, Model e, Pro og Credit i en enkel fordeling med indtjening eller tab. Så bliver det tydeligt, hvorfor elbiler, erhvervsbiler og finansiering har forskellige risici.

## rolls-royce

**Fejl**

- **P1, afgrænsning:** Der er ingen `gk/rolls-royce.html` på den gennemgåede commit. Den ønskede prioriterede side kan derfor ikke gennemgås i samme version som de 87 andre. Dette afsnit omhandler alene den eksisterende `selskaber/rolls-royce.html`.

- **P2, 'Fra produkt til anvendelse':** 'Videberg Kraft er et valg' er meningsforstyrrende dansk. En virksomhed er ikke et valg. Forklar, hvem der har valgt hvilken leverandør, og hvilket stadium projektet befinder sig på. 'SMR' er heller ikke forklaret.

**Forbedringsforslag**

- Forklar først motorforretningens salg og løbende serviceindtægter. Skeln derefter mellem den eksisterende forretning og udviklingsprogrammet for små reaktorer. Den nuværende side viser primært produkter og fondstilknytning, men forklarer kun svagt, hvordan selskabet tjener penge.

## coreweave

**Fejl**

- **P2, Mere fra NewDeal Invest:** 'Uge 52 - 2025 Wrapped' bruger bindestreg som tankestreg.

- **P2, indledning:** 'de tætte og datatunge opgaver' er uklart dansk. Tæthed beskriver her beregninger eller hardware, men det fremgår ikke. Forklar, at mange kraftige computere skal arbejde sammen.

**Forbedringsforslag**

- Sæt kontraktværdi, leveret kapacitet og indregnet omsætning ved siden af hinanden. Vis samtidig, at faste kundeaftaler ikke fjerner risikoen ved udstyr, finansiering og forsinkelser.

## marvell-technology

**Fejl**

- **P1, nøgletalskortets kvartal:** Slutdatoen 1.8.2026 bliver til 3. kvartal 2026, men de 2.739,3 mio. dollar gælder 2. kvartal i regnskabsåret 2027. Se `marvell-technology.js` og `21-noegletal.js`.

- **P2, flere afsnit og tegningsforklaring:** 'chipene' gentages, hvor den almindelige danske form er 'chippene'. 'Kunder hos cloud og datacentre' er også uklart, fordi det får slutbrugere til at lyde som Marvells direkte kunder.

**Forbedringsforslag**

- Vis én vej fra chipdesign gennem fabrik og distributør til datacenter. Forklar direkte kunde og slutkunde ved koncentrationstallene, så 14 % og 37 % ikke læses som identiske typer kunder.

## dell-tech

**Fejl**

- **P1, nøgletalskortets kvartal:** De 46.971 mio. dollar til 31.7.2026 mærkes 3. kvartal 2026 i det fælles script. Det er 2. kvartal i regnskabsåret 2027, som faktabåndet korrekt angiver. Se `dell-tech.js` og `21-noegletal.js`.

- **P2, tegningsforklaringen:** Nummereringen passer ikke til tegningen. Punkt 1 omtaler kunder, men figurens 1 er forhandleren. Punkt 2 omtaler virksomheder, mens figurens 2 er Dell. Teksten har fem punkter, figuren fire nummererede aktører. Læseren kan ikke bruge numrene til at følge forklaringen.

**Forbedringsforslag**

- Lad forklaringen vise, hvorfor højere salg af AI-servere kan ledsages af lavere avance. Det er sidens mest interessante sammenhæng for en investor og bør kobles direkte til de store ordretal.

## coinbase

**Fejl**

- **P2, USDC-forklaringen:** 'Jo mere USDC der er i omløb, desto mere får Coinbase i betaling' beskriver sammenhængen uden at holde renten konstant. Siden nævner selv renter som risiko, men ikke ved forklaringen af denne indtægt. Formuleringen bør afgrænses, så stigende omløb ikke fremstilles som en garanti for højere betaling. Kilde: [Coinbase, 10-Q for 30.9.2026](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000122/coin-20260930.htm), forklaringen af stablecoin revenue viser både effekten af større beholdninger og lavere renter.

- **P2, Mere fra NewDeal Invest:** 'Uge 19 - Den industrielle reformation' bruger bindestreg som tankestreg.

**Forbedringsforslag**

- Vis de to indtægtsstrømme handel og USDC med hver sin drivkraft: handelsaktivitet henholdsvis reservegrundlag og renter. Sæt derefter abonnement og staking ind som særskilte mindre strømme.

## reddit

**Fejl**

- **P2, videotitel:** 'Reddit-aktien (RDDT) - Klip fra ...' bruger bindestreg som tankestreg.

**Forbedringsforslag**

- Forklar, at ARPU beregnes ud fra dagligt aktive brugere, og sæt den definition tæt på de 6,9 dollar. Siden viser også ugentlige brugere, så nævneren skal være tydelig. Vis sammenhængen mellem aktive brugere, annoncepris og omsætning.

## advantest

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 30.9.2026 bliver kaldt 3. kvartal 2026, selv om selskabet opgør den som 2. kvartal i regnskabsåret til 31.3.2027. Det fælles script bruger kalendermåneden uden at oplyse, at det ændrer regnskabets kvartalsbetegnelse. Kilde: `data/noegletal/advantest.js`, det deri angivne regnskab og `21-noegletal.js`.

- **P1, produktforklaring:** SoC beskrives som flere funktioner på 'én skive'. En siliciumskive rummer normalt mange chips. SoC handler om funktioner samlet på én chip. Forklaringen forveksler produktet med skiven, som det fremstilles på. Kilde: [Arms definition af SoC](https://investors.arm.com/node/6551/html), afsnittet med definitioner.

- **P2, produkttekst og tegning:** 'chipene' og 'chipen' bør være 'chippene' og 'chippen'. 'mixet' kan med fordel blive til fordelingen mellem produkter og service.

## applovin

**Fejl**

- **P1, 'Om tallene':** 'Tallene dækker kun annonceforretningen' efterfølges af, at resultatet indeholder tab fra den solgte spilforretning. Det er ikke samme afgrænsning. Sætningen skal skelne mellem omsætning fra fortsættende aktiviteter og det viste samlede resultat.

- **P2, perspektivlink:** 'Uge 41 - Skal du være nervøs ...' bruger bindestreg som tankestreg.

## babcock-wilcox

**Fejl**

- **P1, 'Om tallene':** 'Tallene er uden de forretninger, B&W har solgt' modsiges af samme notes forklaring om mindre tab på solgte forretninger. Afgrænsningen af omsætning og resultat skal beskrives hver for sig.

- **P2, 'Om tallene':** 'warrants, altså retter til at købe ...' er forkert dansk. Skriv rettigheder.

- **P2, temabaggrund:** Teksten indeholder semikolon og linket 'Uge 50 - Fremtiden ...' bruger bindestreg som tankestreg.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Babcock & Wilcoxs samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## enovix

**Fejl**

- **P1, kvartalsbetegnelse:** Scriptet kalder perioden til 4.10.2026 for 4. kvartal 2026. Datafilen og regnskabshenvisningen angiver 3. kvartal 2026.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Enovixs samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2, flere afsnit og tegning:** 'ren silicium' skal være 'rent silicium'.

- **P2, Om tallene:** 'Warrants er retter til at købe aktier' skal være rettigheder.

## etoro-group

**Fejl**

- **P1, nøgletalskort:** Datafeltet `omsaetning` indeholder nettobidrag, som siden selv udtrykkeligt skelner fra regnskabsmæssig omsætning. Alligevel kalder det fælles script både diagrammet og væksten 'Omsætning', beskriver tallet som 'samlede indtægter' og kan beregne 'Price/sales' på grundlaget. Noten nedenunder ophæver ikke de misvisende overskrifter. Angiv nettobidrag konsekvent, og brug ikke price/sales uden den rigtige omsætningsdefinition.

- **P2, forretningsforklaring:** 'gearede positioner' forklares ikke. Forklar, at kunden handler for mere end sin egen indbetaling, og hvor renteindtægten opstår.

- **P2, videotitler:** To titler bruger bindestreg som tankestreg, bl.a. 'NewDeal Invest x eToro - Event ...'.

## globalfoundries

**Fejl**

- **P1, nederste indhold:** 'Teknologi → forretning' og 'NewDeal Invests perspektiv' gentages. `v5-forretning` og `v5-perspektiv` forekommer begge to gange som id'er. Det er en reel dobbeltindsættelse i HTML, ikke desktop- og mobiludgaver af tegningen.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'GlobalFoundriess samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2, tegningsforklaringen:** 'Wafers bliver samlet' er misvisende dansk. Forklar, at chippene skæres ud af skiven og derefter pakkes og testes. Skiven bliver ikke samlet som én færdig chip.

## horizon-robotics

**Fejl**

- **P1. Nøgletal, seneste kvartal:** Halvårsomsætningen 2.118,187 mio. CNY for januar til juni 2026 ligger i feltet `kvartal`. Den fælles visning kalder derfor seks måneders omsætning for 2. kvartal. Angiv halvår, eller brug et faktisk kvartal. Kilde: sidens nøgletalsfil og dens kildeangivelse, som udtrykkeligt siger første halvår. Primærkilde: [halvårsrapport 2026, HKEX](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0930/2026093000842.pdf).

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Horizon Roboticss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## huber-suhner

**Fejl**

- **P1. Nøgletal, seneste kvartal:** De 457,402 mio. CHF er omsætning for første halvår 2026, men vises som 2. kvartal. Sammenligningstallet 445,919 mio. CHF er også et halvår. Kilde: nøgletalsfilens periode og kildeangivelse. Primærkilde: [HUBER+SUHNER, halvårsrapport 2026](https://reports.hubersuhner.com/2026/hyr/app/uploads/HS_Half-year_Report_2026.pdf).

- **P2. Forretningsforklaring:** Radiofrekvens forklares for snævert som trådløs overførsel. Selskabets radiofrekvensprodukter omfatter også kabler og stik, der leder signalerne. Kilde: [HUBER+SUHNER, RF connectivity](https://www.hubersuhner.com/en/markets/industry/general-industrials/medical-device/imagingdiagnostics/rf-connectivity).

- **P2. Sprog:** 'luft- og forsvar' mangler 'fart', hvis der menes luftfart og forsvar. Formuleringen 'øge krav til regler, kunder og åbenhed' gør det uklart, hvem der stiller krav til hvem.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `og er ikke en særskilt analyse af dette selskab. Uge 27 - Bygger vi for meget AI? ↗ NewDeal Invest · 26.07.2026. Dateret ko` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## klarna

**Fejl**

- **P1. Tegningens forklaring om renter:** Udsagnet om, at forbrugere, der betaler over tid, betaler renter, er for bredt. Klarna tilbyder også rentefrie delbetalinger. Afgræns rentebetalingen til de relevante finansieringsprodukter. Kilde: [Klarnas egen produktbeskrivelse](https://docs.klarna.com/klarna-network-distribution/interoperability-distribution/distribute-payment-program-enablement/overview/).

## lpkf-laser-electronics

**Fejl**

- **P1. Nederste del af siden:** Afsnittene 'Hvad er det vigtige at forstå?' og 'NewDeal Invests perspektiv' er indsat to gange. Begge kopier har de samme id'er, `v5-forretning` og `v5-perspektiv`. Det giver gentagelser og tvetydige ankermål. Kilde: HTML-koden til siden.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'LPKF Laser & Electronicss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## microvision

**Fejl**

- **P1. Risiko om børsnotering:** 'ikke kan blive noteret på Nasdaq Global Market' er både en forkert beskrivelse af risikoen og et forældet markedsnavn. Selskabets kvartalsrapport beskriver risikoen for ikke at kunne bevare noteringen og oplyser, at aktien blev flyttet fra Global Market til Capital Market med virkning fra 20.7.2026. Kilde: [MicroVision, 10-Q for 30.6.2026](https://ir.microvision.com/sec-filings/all-sec-filings/content/0001493152-26-036371/form10-q.htm).

## nextracker

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 2.10.2026 bliver ud fra måneden kaldt 4. kvartal 2026, men teksten og regnskabet kalder den 2. kvartal 2026/27. Angiv det faktiske regnskabskvartal. Kilde: sidens kildehenvisning til kvartalsregnskabet og nøgletalsfilens slutdato.

## sandisk

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 2.10.2026 vises som 4. kvartal 2026, selv om teksten angiver første kvartal 2026/27. Kilde: nøgletalsfilen og det kvartalsregnskab, siden henviser til.

- **P2. Risiko:** 'skade konkurrencen' er misvisende i beskrivelsen af egne produktfejl. Der menes selskabets konkurrenceevne.

## semtech

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 26.7.2026 vises som 3. kvartal 2026. Teksten angiver korrekt 2. kvartal 2026/27. Kilde: sidens nøgletalsfil og regnskabshenvisning.

## super-micro-computer

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 30.9.2026 bliver kaldt 3. kvartal 2026, selv om selskabet opgør den som 1. kvartal i regnskabsåret til 30.6.2027. Det fælles script bruger kalendermåneden uden at oplyse, at det ændrer regnskabets kvartalsbetegnelse. Kilde: `data/noegletal/super-micro-computer.js`, det deri angivne regnskab og `21-noegletal.js`.

## taiyo-yuden

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 30.9.2026 bliver kaldt 3. kvartal 2026, selv om selskabet opgør den som 2. kvartal i regnskabsåret til 31.3.2027. Det fælles script bruger kalendermåneden uden at oplyse, at det ændrer regnskabets kvartalsbetegnelse. Kilde: `data/noegletal/taiyo-yuden.js`, det deri angivne regnskab og `21-noegletal.js`.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `og er ikke en særskilt analyse af dette selskab. Uge 20 - Amerikansk-kinesisk chip forsoning ↗ NewDeal Invest · 18.05.2026.` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## wolfspeed

**Fejl**

- **P1. Nøgletal, kvartalsbetegnelse:** Perioden til 27.9.2026 vises som 3. kvartal 2026, men er første kvartal 2026/27. Kilde: sidens nøgletalsfil og henvisning til kvartalsregnskabet.

- **P2. Kildeafsnit:** 'Wolfspeed egne oplysninger' mangler ejefald. Skriv 'Wolfspeeds egne oplysninger'.

## am-electric

**Fejl**

- **P2, indtjeningsforklaringen:** 'en tariff' er engelsk stavning. På dansk hedder det 'en tarif'. 'transmissionselskab' i tegningsforklaringen mangler desuden et s: transmissionsselskab.

## amphenol

**Fejl**

- **P2, indtjeningsforklaringen:** 'hvilke produkter og markeder der sælges' siger, at markeder bliver solgt. Meningen er, hvilke produkter selskabet sælger, og på hvilke markeder.

## astera-labs

**Fejl**

- **P2, genitiv:** 'Astera Labs årsrapport' og 'Astera Labs egne oplysninger' mangler apostrof efter navnet. Det er 'Astera Labs’'. Siden bruger også den korrekte form andre steder.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Astera Labss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## ballard-power-systems

**Fejl**

- **P2, forretningsforklaringen:** 'producenter af færdigudstyr og systemintegratorer' forklares kun indirekte. Skriv producenter af køretøjer og virksomheder, der samler brændselscellerne med resten af systemet. Det er netop disse kunders rolle, læseren skal forstå.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Ballard Power Systemss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## besi

**Fejl**

- **P2, produktforklaring og vækstafsnit:** 'hybrid bonding' gentages uden forklaring. Fortæl, at teknologien forbinder chips direkte meget tæt, og hvorfor kunden bruger den. En henvisning til logik, hukommelse og optik forklarer ikke selve teknologien.

## carvana

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## celanese

**Fejl**

- **P2, billedtekst og kildeafgrænsning:** 'Celanese årsrapport' og 'Celanese egne oplysninger' mangler genitiv-s. Skriv Celaneses.

## cerebras-systems

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Cerebrass samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2, faktabånd:** '750 MW regnekraft' blander elektrisk effekt og beregningsydelse. MW angiver effekt, ikke antallet eller hastigheden af beregninger. Forklar kapaciteten i datacenteranlæggene og undgå, at tallet læses som et direkte mål for computerens hastighed.

- **P2, medielinks:** 'Uge 42 - Global System Rupture', 'Cerebras - hurtigt men dyrt' og 'Ugens blog for uge 43 - ...' bruger bindestreg som tankestreg.

## ciena

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## cipher-mining

**Fejl**

- **P2, kundeaftaler:** 'med Google som sikkerhed' er upræcist. Google er en virksomhed, ikke et stillet aktiv. Beskriv den konkrete garanti eller anden støtte og henvis til aftalens begrænsninger, som siden senere selv omtaler.

## circle-internet-group

**Fejl**

- **P2, Om tallene:** 'fælles aktionærer' er en fejloversættelse af common shareholders. Der menes ordinære aktionærer, ikke aktionærer der ejer noget i fællesskab.

- **P2, risici:** 'beder om at få vekselret' er uklart og rammer ikke handlingen. Indehaverne ønsker at indløse deres stablecoins til almindelig valuta.

## cms-energy

**Fejl**

- **P2, indledning:** 'overkommelig, ren og retfærdig energi' gengiver et slogan uden at forklare, hvad egenskaberne betyder for kunden. 'Overkommelig' er her en uklar oversættelse af energi til en pris, kunderne kan betale.

## comstock-resources

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Comstock Resourcess samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2, produktbeskrivelse:** 'Comstock drev 99 % af reserverne selv' er uklart. Man driver anlæg eller opererer felter, ikke reserver. Beskriv, at selskabet er operatør for den relevante andel af reserverne.

## corning

**Fejl**

- **P2, indledning:** 'Optik er læren om lys og om, hvordan det ledes gennem glasfibre' gør optik til en snæver fiberdisciplin. Skriv i stedet, hvad Corning bruger optikken til.

- **P2, tegning:** Boksen 'Skærme køber glas' gør et produkt til kunde, og pilen 'glas og filtre' peger mod samme kundegruppe. Filtrenes anvendelse i biler fremgår af teksten, men ikke af denne fordeling.

## coupang

**Fejl**

- **P2, indledning og produktbeskrivelse:** Samme løfte om levering og vareudvalg fortælles to gange lige efter hinanden. 'fra næste dag til samme dag' er desuden en bagvendt tidsangivelse.

- **P2, tegningsforklaring:** 'kunderne betaler for medlemskab og reklame' sammenblander forbrugere og annoncører. Angiv hver betaler særskilt.

## expand-energy

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## fluor

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## fubotv

**Fejl**

- **P2, risici:** 'kan undlade at opnå ... overskud' og 'kan undlade at give de fordele' får manglende succes til at lyde som et bevidst valg. Skriv fx, at selskabet måske ikke opnår overskud, og at sammenslutningen måske ikke giver fordelene.

## gemini-space-station

**Fejl**

- **P2, risikoafsnittet:** 'Et afbrud i produkterne' er uidiomatisk. Beskriv driftsafbrydelser i tjenester, it-systemer eller netværk.

## generac

**Fejl**

- **P2, kildeafgrænsning:** Den afsluttende kildebeskrivelse nævner kun materiale om 2025, selv om faktabånd og tekst indeholder tal for tredje kvartal og ni måneder 2026. Angiv det nyere grundlag også her, så læseren kan efterprøve de aktuelle tal.

## iren

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## iridium-communications

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Iridium Communicationss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## kodiak-ai

**Fejl**

- **P2. Risiko:** 'kan undlade at blive rentabelt' lyder som et bevidst valg. Der menes en risiko for ikke at opnå rentabilitet.

- **P2. Indledning og produktforklaring:** Forklaringen af det førerløse system gentages næsten ordret. Gentagelsen afbryder fremdriften, før læseren når frem til kunder og indtjening.

## macom

**Fejl**

- **P2. Risiko:** 'fabrikkerne ikke bruges højt' er ikke naturligt dansk. Forklar, at lav kapacitetsudnyttelse kan presse indtjeningen.

## merlin

**Fejl**

- **P2. Risiko:** 'kan undlade at blive rentabelt' giver indtryk af et valg. Der menes, at selskabet måske ikke bliver rentabelt.

## mntn

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## monolithic-power-systems

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Monolithic Power Systemss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Sprog:** 'chipene' og 'chipen' skal være 'chippene' og 'chippen'.

## myr-group

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## nextera-energy

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## nova

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## nuscale-power

**Fejl**

- **P2. Produktbeskrivelse og tegningsforklaring:** 'modulene' skal være 'modulerne' begge steder.

## omada-health

**Fejl**

- **P2. Produktbeskrivelse, spørgsmål:** Højt kolesterol omtales som et eksisterende tilbud, men senere står der, at programmet planlægges lanceret. Er den første kommercielle lancering sket? Angiv samme status begge steder.

## ondas-holdings

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Ondass samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Om tallene:** 'retter til at købe aktier' skal være 'rettigheder til at købe aktier'.

## opendoor

**Fejl**

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `NEWDEAL INVEST · 13.06.2025 Webinar 12. juni kl. 20:00 - Forskellen på teknologi- og valuevirksomheder Om Opendoor Se på Y` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## rambus

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Rambuss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## rocket-lab

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## root

**Fejl**

- **P2. Risiko:** 'undlade at få nye, via samarbejdskanalen' er en klodset oversættelse og har et overflødigt komma. Det er risikoen for ikke at kunne tiltrække nye kunder, der skal beskrives.

## sea

**Fejl**

- **P2. Risiko:** 'kan undlade at fastholde' og 'kan undlade at forblive rentabelt' fremstiller negative udfald som bevidste valg. Skriv, at selskabet måske ikke kan fastholde brugerne eller overskuddet.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `de tal. Shopees rolle er central i gennemgangen. Uge 33 - Samme tal, modsatte konklusioner ↗ NewDeal Invest · 17.08.2026. D` / `AL INVEST · 13.05.2026 NewDeal Invest: Sea Limited 1Q26 - Increasing our investment! Om Sea Se på YouTube ↗ ▶ NEWDEAL INVES` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## serve-robotics

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Serve Roboticss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## sharplink-gaming

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## sigma-lithium

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## silicon-motion

**Fejl**

- **P2. Tegningsforklaring, spørgsmål:** 'Fabrikkerne støber chippenes siliciumskiver efter Silicon Motions tegninger' sammenblander fremstilling af selve skiven med fremstilling af kredsløb på den. Beskriv chipproduktion på siliciumskiver. 'Foundry' bør ikke oversættes til støbning i denne forklaring.

## sivers-semiconductors

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Sivers Semiconductorss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Indledning:** 'designe rygraden i intelligent opkobling' er en uklar oversat reklameformulering. Den giver ikke læseren mere viden om produkterne.

- **P2. Kildeafsnit:** Svenske ord som 'årsredovisning' og 'forvaltningsberättelsen' står i den danske brødtekst. Brug dansk beskrivelse af rapport og afsnit, og behold eventuelt originaltitlen i selve linket.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `og er ikke en særskilt analyse af dette selskab. Uge 27 - Bygger vi for meget AI? ↗ NewDeal Invest · 26.07.2026. Dateret ko` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## sofi

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## solaris-energy-infrastructure

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## soundhound-ai

**Fejl**

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `ktiv på software & ai. Artiklen bruges som temabaggrund; den er ikke en særskilt analyse af dette selskab. Uge 33 - Samme` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## spire-global

**Fejl**

- **P2. Indledning:** Kundetyperne og forklaringen af flysporing over havet gentages næsten direkte i de to første afsnit. Saml forklaringen, så der er plads til forskellen på datasalg og Space Services.

## standard-lithium

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## swarmer

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## t1-energy

**Fejl**

- **P2. Risiko:** 'en amerikansk skattefradrag' har forkert køn. Forklar også ordningen ensartet: 'produktionskredit' og 'skattefradrag' bruges som synonymer uden forklaring.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `og er ikke en særskilt analyse af dette selskab. Uge 50 - Fremtiden rykker tættere på ↗ NewDeal Invest · 15.12.2025. Datere` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## tower-semiconductor

**Fejl**

- **P2. Indledning:** 'har ingen produkter af egne' er forkert dansk. Skriv eksempelvis 'har ingen egne chipprodukter'.

- **P2. Henvisninger under 'Mere fra NewDeal Invest' eller videoer:** `ces. Det er forfatterens argument om skifteomkostninger; konklusionerne er ikke en garanti for fremtidige ordrer. Tower S` / `emiconductor - Powering AI From Orbit (Pt.5) ↗ NewDeal Invest · Convequity · 20.` Indeholder bindestreg brugt som tankestreg eller semikolon og bryder sidens faste sprogregler.

## trilogy-metals

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Trilogy Metalss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Risiko:** 'kan blive ramt af de risici, som den slags selskaber ofte har' forklarer ingen konkret risiko. Sæt navn på eksempelvis finansiering, tilladelser eller risikoen for, at projekterne ikke bliver til producerende miner.

- **P2. Kildeafsnit:** Begrundelsen om at bruge de første ti risikooverskrifter er en intern metodebemærkning. Den bryder læsningen og forklarer ikke, hvorfor netop de viste risici er væsentlige.

## uber-tech

**Fejl**

- **P2. Risiko:** 'kan undlade at holde fast i et overskud' lyder som et valg. Beskriv risikoen for, at overskuddet ikke kan fastholdes.

## umc

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## united-states-antimony

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## upstart

**Fejl**

- Ingen konkrete fejl fundet i den udførte tekst- og kodegennemgang. Den fælles afgrænsning ovenfor gælder også denne side.

## Fejl på tværs af siderne

- **Perioder:** Nøgletalsscriptet udleder kvartalet af slutdatoens kalendermåned. Det fejlmærker forskudte regnskabskvartaler og viser endda halvår som kvartaler på Horizon Robotics og HUBER+SUHNER.
- **Gentagelser:** GlobalFoundries, LPKF og SoftBank har hele indholdsblokke to gange og dublerede id'er.
- **Automatisk sprog:** Fodnoten tilføjer altid s til selskabsnavnet. Det giver forkert ejefald ved navne, der allerede ender på s eller x.
- **Sprogregler:** Flere video- og artikeltitler bruger bindestreg som tankestreg. Enkelte redaktionelle tekster bruger semikolon.
- **Oversættelser:** 'kan undlade at' bruges flere steder om manglende evne eller risiko for at mislykkes. Det kan på dansk læses som et bevidst valg. Der forekommer også uforklarede fagord og direkte oversatte slogans.
- **Tegning og forklaring:** Produkter som servere, telefoner og skærme optræder flere steder som købere. Vis de faktiske kunder. På Dell passer numrene i forklaringen ikke til figurens aktører.

## Udestående visuel kontrol

Alle 87 sider mangler browserkontrol ved begge bredder gennem serveren fra `docs/energi-konkurrence`. Kontroller især de tre nøgletalskolonner på mobil og grafer med negative resultater. I den fælles CSS er årstal og kildetekst 11 px, mens negative søjlers tal placeres under søjlen tæt på årstallet. Giver det faktisk overlap eller for lille tekst på 360 punkter? Dette er et kontrolspørgsmål fra koden, ikke en observeret layoutfejl.

Eksterne links og konsol skal ligeledes kontrolleres i browseren. En reservevisning alene er ikke en fejl. Rapporten kan bruges til de dokumenterede fund nu, men må ikke omtales som en afsluttet visuel godkendelse.
