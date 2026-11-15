# Selskabsreview

Løbende checkpoint, 15. november 2026. Reviewet er ikke færdigt.

Grundlag: `claude/selskabssider-review`, commit `7d4b6d6b7d343a3862d5b3231f322effccbbad8b`. Kun rapportfilen ændres på `codex/selskabsreview-20261115`.

87 sider i gk. Rolls-Royce mangler i gk og gennemgås særskilt fra selskaber/. Det private kildearkiv er tilgængeligt. Computerforbindelsen blev utilgængelig under arbejdet. Ingen af siderne er endnu visuelt kontrolleret ved 360 eller 1300 punkter. Reservevisning ved manglende fondsdata regnes ikke som en fejl.

P1: væsentlig tal-, periode- eller funktionsfejl. P2: øvrig dokumentations-, sprog- eller forståelsesfejl. Kodefund er ikke browserobservationer. Foreløbige afsnit er ikke en fuld godkendelse af alle faktuelle oplysninger.

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

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

**Forbedringsforslag**

- Del bilsalg, energilagring og fremtidige indtægter fra selvkørsel tydeligt. Vis derefter forskellen på FSD med førerovervågning og den afgrænsede taxatjeneste, så de ikke glider sammen for en førstegangslæser.

## samsung-electronics

**Fejl**

- **P1, alle beløb i nøgletalsgrafen: Tallene er 1.000 gange for små i forhold til den viste enhed.** Datafilen angiver 333605.938 for omsætning 2025, men rendererens enhed er mio. KRW. Samsungs resultatopgørelse angiver 333.605.938 mio. KRW. Brødtekstens 333,6 billioner won er dermed korrekt, mens grafen bliver ca. 333,6 mia. won. Samme faktorfejl findes i årets resultat, halvår, kvartal og LTM. LTM-omsætningen skal med denne enhed være 333.605.938 + 305.372.914 - 153.706.820 = 485.272.032 mio. KRW. Kilder: [Samsung, resultatopgørelse 2025](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_con_quarter04_soi.pdf) og [halvårsregnskab 2026](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_con_quarter02_all.pdf), efterprøvet mod arkivernes ordrette tabeluddrag.

- **P2, dansk tekst i temabaggrundens link:** 'Uge 36 - Vælg udviklingen, ikke vinderen' bruger bindestreg som tankestreg.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Samsung Electronicss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

**Forbedringsforslag**

- Tilføj risikoen ved priser og konkurrence i hukommelse samt produktionsteknologi, dokumenteret i selskabets egne oplysninger. Den nuværende liste fokuserer næsten kun på generelle finansielle risici, selv om halvledere driver forklaringen af indtjeningen.

## micron-technology

**Fejl**

- **P1, nøgletalskortets kvartal:** 54.230 mio. dollar mærkes 3. kvartal 2026 ud fra slutdatoen 3.9.2026. Datafilen og brødteksten identificerer det som 4. kvartal i regnskabsåret 2026. Se `micron-technology.js` og `21-noegletal.js`.

- **P2, indledning:** 'gøre intelligens hurtigere og rigere for alle' er en uidiomatisk gengivelse af et selskabsslogan. Det fortæller ikke læseren, hvad hukommelsen gør. 'SSD' i tegningen forklares heller ikke ved forkortelsen.

**Forbedringsforslag**

- Vis, hvor meget af væksten der kommer fra priser, og hvor meget der kommer fra solgte mængder. Det vil gøre faktabåndets store vækst og prisstigning forståelige og forbinde dem med risikoen for en vending i markedet.

## softbank-group

**Fejl**

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

- **P2, USDC-forklaringen:** 'Jo mere USDC der er i omløb, desto mere får Coinbase i betaling' beskriver sammenhængen uden at holde renten konstant. Siden nævner selv renter som risiko, men ikke ved forklaringen af denne indtægt. Formuleringen bør afgrænses, så stigende omløb ikke fremstilles som en garanti for højere betaling.

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

- **P1, produktforklaring:** SoC beskrives som flere funktioner på 'én skive'. En siliciumskive rummer normalt mange chips. SoC handler om funktioner samlet på én chip. Forklaringen forveksler produktet med skiven, som det fremstilles på.

- **P2, produkttekst og tegning:** 'chipene' og 'chipen' bør være 'chippene' og 'chippen'. 'mixet' kan med fordel blive til fordelingen mellem produkter og service.

## am-electric

**Fejl**

- **P2, indtjeningsforklaringen:** 'en tariff' er engelsk stavning. På dansk hedder det 'en tarif'. 'transmissionselskab' i tegningsforklaringen mangler desuden et s: transmissionsselskab.

## amphenol

**Fejl**

- **P2, indtjeningsforklaringen:** 'hvilke produkter og markeder der sælges' siger, at markeder bliver solgt. Meningen er, hvilke produkter selskabet sælger, og på hvilke markeder.

## applovin

**Fejl**

- **P1, 'Om tallene':** 'Tallene dækker kun annonceforretningen' efterfølges af, at resultatet indeholder tab fra den solgte spilforretning. Det er ikke samme afgrænsning. Sætningen skal skelne mellem omsætning fra fortsættende aktiviteter og det viste samlede resultat.

- **P2, perspektivlink:** 'Uge 41 - Skal du være nervøs ...' bruger bindestreg som tankestreg.

## astera-labs

**Fejl**

- **P2, genitiv:** 'Astera Labs årsrapport' og 'Astera Labs egne oplysninger' mangler apostrof efter navnet. Det er 'Astera Labs’'. Siden bruger også den korrekte form andre steder.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Astera Labss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## babcock-wilcox

**Fejl**

- **P1, 'Om tallene':** 'Tallene er uden de forretninger, B&W har solgt' modsiges af samme notes forklaring om mindre tab på solgte forretninger. Afgrænsningen af omsætning og resultat skal beskrives hver for sig.

- **P2, 'Om tallene':** 'warrants, altså retter til at købe ...' er forkert dansk. Skriv rettigheder.

- **P2, temabaggrund:** Teksten indeholder semikolon og linket 'Uge 50 - Fremtiden ...' bruger bindestreg som tankestreg.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Babcock & Wilcoxs samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## ballard-power-systems

**Fejl**

- **P2, forretningsforklaringen:** 'producenter af færdigudstyr og systemintegratorer' forklares kun indirekte. Skriv producenter af køretøjer og virksomheder, der samler brændselscellerne med resten af systemet. Det er netop disse kunders rolle, læseren skal forstå.

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Ballard Power Systemss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## besi

**Fejl**

- **P2, produktforklaring og vækstafsnit:** 'hybrid bonding' gentages uden forklaring. Fortæl, at teknologien forbinder chips direkte meget tæt, og hvorfor kunden bruger den. En henvisning til logik, hukommelse og optik forklarer ikke selve teknologien.

## carvana

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

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

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

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

## enovix

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Enovixs samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P1, kvartalsbetegnelse:** Scriptet kalder perioden til 4.10.2026 for 4. kvartal 2026. Datafilen og regnskabshenvisningen angiver 3. kvartal 2026.

- **P2, flere afsnit og tegning:** 'ren silicium' skal være 'rent silicium'.

- **P2, Om tallene:** 'Warrants er retter til at købe aktier' skal være rettigheder.

## etoro-group

**Fejl**

- **P1, nøgletalskort:** Datafeltet `omsaetning` indeholder nettobidrag, som siden selv udtrykkeligt skelner fra regnskabsmæssig omsætning. Alligevel kalder det fælles script både diagrammet og væksten 'Omsætning', beskriver tallet som 'samlede indtægter' og kan beregne 'Price/sales' på grundlaget. Noten nedenunder ophæver ikke de misvisende overskrifter. Angiv nettobidrag konsekvent, og brug ikke price/sales uden den rigtige omsætningsdefinition.

- **P2, forretningsforklaring:** 'gearede positioner' forklares ikke. Forklar, at kunden handler for mere end sin egen indbetaling, og hvor renteindtægten opstår.

- **P2, videotitler:** To titler bruger bindestreg som tankestreg, bl.a. 'NewDeal Invest x eToro - Event ...'.

## expand-energy

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## fluor

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## fubotv

**Fejl**

- **P2, risici:** 'kan undlade at opnå ... overskud' og 'kan undlade at give de fordele' får manglende succes til at lyde som et bevidst valg. Skriv fx, at selskabet måske ikke opnår overskud, og at sammenslutningen måske ikke giver fordelene.

## gemini-space-station

**Fejl**

- **P2, risikoafsnittet:** 'Et afbrud i produkterne' er uidiomatisk. Beskriv driftsafbrydelser i tjenester, it-systemer eller netværk.

## generac

**Fejl**

- **P2, kildeafgrænsning:** Den afsluttende kildebeskrivelse nævner kun materiale om 2025, selv om faktabånd og tekst indeholder tal for tredje kvartal og ni måneder 2026. Angiv det nyere grundlag også her, så læseren kan efterprøve de aktuelle tal.

## globalfoundries

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'GlobalFoundriess samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P1, nederste indhold:** 'Teknologi → forretning' og 'NewDeal Invests perspektiv' gentages. `v5-forretning` og `v5-perspektiv` forekommer begge to gange som id'er. Det er en reel dobbeltindsættelse i HTML, ikke desktop- og mobiludgaver af tegningen.

- **P2, tegningsforklaringen:** 'Wafers bliver samlet' er misvisende dansk. Forklar, at chippene skæres ud af skiven og derefter pakkes og testes. Skiven bliver ikke samlet som én færdig chip.

## horizon-robotics

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Horizon Roboticss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P1. Nøgletal, seneste kvartal:** Halvårsomsætningen 2.118,187 mio. CNY for januar til juni 2026 ligger i feltet `kvartal`. Den fælles visning kalder derfor seks måneders omsætning for 2. kvartal. Angiv halvår, eller brug et faktisk kvartal. Kilde: sidens nøgletalsfil og dens kildeangivelse, som udtrykkeligt siger første halvår.

## huber-suhner

**Fejl**

- **P1. Nøgletal, seneste kvartal:** De 457,402 mio. CHF er omsætning for første halvår 2026, men vises som 2. kvartal. Sammenligningstallet 445,919 mio. CHF er også et halvår. Kilde: nøgletalsfilens periode og kildeangivelse.

- **P2. Forretningsforklaring:** Radiofrekvens forklares som trådløs overførsel. Radiofrekvente signaler kan også føres gennem kabler og stik, som netop indgår i selskabets produkter. Forklar frekvensområdet uden at afgrænse det til trådløs overførsel.

- **P2. Sprog:** 'luft- og forsvar' mangler 'fart', hvis der menes luftfart og forsvar. Formuleringen 'øge krav til regler, kunder og åbenhed' gør det uklart, hvem der stiller krav til hvem.

## iren

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## iridium-communications

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Iridium Communicationss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## klarna

**Fejl**

- **P1. Tegningens forklaring om renter:** Udsagnet om, at forbrugere, der betaler over tid, betaler renter, er for bredt. Klarna tilbyder også rentefrie delbetalinger. Afgræns rentebetalingen til de relevante finansieringsprodukter. Kilde: [Klarnas egen produktbeskrivelse](https://docs.klarna.com/klarna-network-distribution/interoperability-distribution/distribute-payment-program-enablement/overview/).

## kodiak-ai

**Fejl**

- **P2. Risiko:** 'kan undlade at blive rentabelt' lyder som et bevidst valg. Der menes en risiko for ikke at opnå rentabilitet.

- **P2. Indledning og produktforklaring:** Forklaringen af det førerløse system gentages næsten ordret. Gentagelsen afbryder fremdriften, før læseren når frem til kunder og indtjening.

## lpkf-laser-electronics

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'LPKF Laser & Electronicss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## macom

**Fejl**

- **P2. Risiko:** 'fabrikkerne ikke bruges højt' er ikke naturligt dansk. Forklar, at lav kapacitetsudnyttelse kan presse indtjeningen.

## merlin

**Fejl**

- **P2. Risiko:** 'kan undlade at blive rentabelt' giver indtryk af et valg. Der menes, at selskabet måske ikke bliver rentabelt.

## microvision

**Fejl**

- **P2. Risiko, spørgsmål:** Betyder 'ikke kan blive noteret på Nasdaq Global Market' i virkeligheden, at selskabet risikerer ikke at kunne bevare sin notering? Formuleringen får en allerede børsnoteret virksomhed til at lyde som en kommende børsnotering. Kontroller mod den citerede risikofaktor.

## mntn

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## monolithic-power-systems

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Monolithic Power Systemss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

- **P2. Sprog:** 'chipene' og 'chipen' skal være 'chippene' og 'chippen'.

## myr-group

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## nextera-energy

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## nextracker

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## nova

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## nuscale-power

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## omada-health

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## ondas-holdings

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Ondass samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## opendoor

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## rambus

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Rambuss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## rocket-lab

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## root

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## sandisk

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## sea

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## semtech

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## serve-robotics

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Serve Roboticss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## sharplink-gaming

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## sigma-lithium

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## silicon-motion

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## sivers-semiconductors

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Sivers Semiconductorss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## sofi

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## solaris-energy-infrastructure

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## soundhound-ai

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## spire-global

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## standard-lithium

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## super-micro-computer

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## swarmer

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## t1-energy

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## taiyo-yuden

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## tower-semiconductor

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## trilogy-metals

**Fejl**

- **P2, automatisk fodnote under nøgletallene:** `21-noegletal.js` tilføjer altid s til selskabsnavnet og danner 'Trilogy Metalss samlede indtægter'. Navne, der ender på s, x eller z, skal have apostrof i dansk genitiv. Fejlen ligger i den fælles tekstgenerator.

## uber-tech

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## umc

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## united-states-antimony

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## upstart

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## wolfspeed

**Fejl**

- Ingen yderligere fejl registreret i dette checkpoint. Afsnittet er endnu ikke en afsluttet faktuel eller visuel kontrol.

## Fejl på tværs af siderne

- Regnskabskvartaler udledes af kalendermåneden, så forskudte regnskabsår bliver fejlmærket. Halvårsdata vises også som kvartaler.
- Automatisk tilføjelse af s giver forkerte ejefald ved navne, som allerede ender på s eller x.
- Flere videohenvisninger bruger bindestreg som tankestreg, og enkelte tekster indeholder semikolon.
- Gentagne indholdsblokke og identiske id-attributter findes på GlobalFoundries, LPKF og SoftBank.

## Udestående kontrol

Visuel kontrol ved 360 og 1300 punkter, browserkonsol og netværksfejl er ikke udført. Lokale henvisninger er kontrolleret mod repoets filoversigt uden fund af manglende målfiler. Eksterne links er ikke fuldt kontrolleret. Primærkildeafstemning og tekstgennemgang fortsætter.
