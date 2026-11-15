# Selskabsreview

Løbende checkpoint, 15. november 2026. Reviewet er ikke færdigt.

Grundlag: `claude/selskabssider-review`, commit `7d4b6d6b7d343a3862d5b3231f322effccbbad8b`. Kun rapportfilen ændres på `codex/selskabsreview-20261115`.

87 sider i gk. Rolls-Royce mangler i gk og gennemgås særskilt fra selskaber/. Det private kildearkiv er tilgængeligt. Computerforbindelsen blev utilgængelig under arbejdet. Ingen af siderne er endnu visuelt kontrolleret ved 360 eller 1300 punkter. Reservevisning ved manglende fondsdata regnes ikke som en fejl.

P1: væsentlig tal-, periode- eller funktionsfejl. P2: øvrig dokumentations-, sprog- eller forståelsesfejl. Kodefund er ikke browserobservationer. Foreløbige afsnit er ikke en fuld godkendelse af alle faktuelle oplysninger.

## nvidia

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** Kortet mærker de 96.221 mio. dollar som 3. kvartal 2026, fordi `21-noegletal.js` udleder kvartalet af slutdatoens måned. Datafilen og kilden angiver 2. kvartal i regnskabsåret 2027, afsluttet 26.7.2026. Perioden er dermed forkert navngivet. Kilde: [NVIDIA, 10-Q](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm).

**Forbedringsforslag**

- Vis datacenter og spil som to indtægtsstrømme med deres størrelse. Forklar, at CUDA understøtter salget af hardware, mens særskilte softwarelicenser er en anden betaling, så tegningen ikke antyder betaling for enhver brug af CUDA.

## microsoft

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** De 92.279 mio. dollar er 1. kvartal i regnskabsåret 2027, men det fælles script viser 3. kvartal 2026 ud fra slutdatoen 30.9.2026. Kilde: [Microsoft, 10-Q](https://www.sec.gov/Archives/edgar/data/789019/000119312526436133/msft-20260930.htm).

**Forbedringsforslag**

- Forklar i faktabåndet, at Azure indgår i Microsoft Cloud. De to store tal kan ellers læses som to adskilte forretninger og lægges sammen.

## broadcom

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P2, videotitel under 'Bliv klogere':** '... fået øjenene op for - hvad betyder det?' bruger bindestreg som tankestreg. Det bryder den faste sprogregel, også selv om teksten gengiver en videotitel.
- **P2, risici:** 'bruttomargin' forklares ikke. Forklar kort, at det er andelen af omsætningen tilbage efter de direkte produktomkostninger.

**Forbedringsforslag**

- Adskil direkte kunde og slutkunde i koncentrationstallene. En direkte kunde på 32 % og fem slutkunder på omkring 40 % måler ikke det samme, og læseren skal kunne forstå distributørens rolle.

## oracle

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** 19.345 mio. dollar til 31.8.2026 mærkes 3. kvartal 2026 af det fælles script, mens datafilen og brødteksten angiver 1. kvartal i regnskabsåret 2027. Se `data/noegletal/oracle.js` og `assets/claude/21-noegletal.js`.

**Forbedringsforslag**

- Sæt de indgåede aftaler ved siden af den årlige omsætning og forklar, at aftalerne skal leveres over flere år. Vis derefter behovet for nye datacentre og finansiering. Det forbinder vækstmulighed med risiko.

## tesla

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- Ingen konkret fejl registreret i den hidtidige gennemgang. Dette er ikke en godkendelse af alle tal.

**Forbedringsforslag**

- Del bilsalg, energilagring og fremtidige indtægter fra selvkørsel tydeligt. Vis derefter forskellen på FSD med førerovervågning og den afgrænsede taxatjeneste, så de ikke glider sammen for en førstegangslæser.

## samsung-electronics

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, alle beløb i nøgletalsgrafen: Tallene er 1.000 gange for små i forhold til den viste enhed.** Datafilen angiver 333605.938 for omsætning 2025, men rendererens enhed er mio. KRW. Samsungs resultatopgørelse angiver 333.605.938 mio. KRW. Brødtekstens 333,6 billioner won er dermed korrekt, mens grafen bliver ca. 333,6 mia. won. Samme faktorfejl findes i årets resultat, halvår, kvartal og LTM. LTM-omsætningen skal med denne enhed være 333.605.938 + 305.372.914 - 153.706.820 = 485.272.032 mio. KRW. Kilder: [Samsung, resultatopgørelse 2025](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_con_quarter04_soi.pdf) og [halvårsregnskab 2026](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_con_quarter02_all.pdf), efterprøvet mod arkivernes ordrette tabeluddrag.
- **P2, dansk tekst i temabaggrundens link:** 'Uge 36 - Vælg udviklingen, ikke vinderen' bruger bindestreg som tankestreg.

**Forbedringsforslag**

- Tilføj risikoen ved priser og konkurrence i hukommelse samt produktionsteknologi, dokumenteret i selskabets egne oplysninger. Den nuværende liste fokuserer næsten kun på generelle finansielle risici, selv om halvledere driver forklaringen af indtjeningen.

## micron-technology

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** 54.230 mio. dollar mærkes 3. kvartal 2026 ud fra slutdatoen 3.9.2026. Datafilen og brødteksten identificerer det som 4. kvartal i regnskabsåret 2026. Se `micron-technology.js` og `21-noegletal.js`.
- **P2, indledning:** 'gøre intelligens hurtigere og rigere for alle' er en uidiomatisk gengivelse af et selskabsslogan. Det fortæller ikke læseren, hvad hukommelsen gør. 'SSD' i tegningen forklares heller ikke ved forkortelsen.

**Forbedringsforslag**

- Vis, hvor meget af væksten der kommer fra priser, og hvor meget der kommer fra solgte mængder. Det vil gøre faktabåndets store vækst og prisstigning forståelige og forbinde dem med risikoen for en vending i markedet.

## softbank-group

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nederste del af siden: Indholdsblokke er indsat to gange.** 'Teknologi → forretning', perspektiv og video gentages. HTML har dublerede id'er `v5-forretning`, `v5-perspektiv`, `mere-fra-ndi` og `rm-title`. Det gentager teksten og gør ankermål og tilgængelighedsreferencer tvetydige. Kodefund i `gk/softbank-group.html`.
- **P2, perspektivafsnittet:** 'Det er et historisk perspektiv; datidens ...' bruger semikolon. Linktitlen 'Uge 14 - De 10 største ...' bruger bindestreg som tankestreg. Begge optræder i de gentagne blokke.

**Forbedringsforslag**

- Skil koncernens omsætning fra værdien af investeringerne. Et oversigtsbillede med Arm, SoftBank Corp. og investeringerne vil gøre det klart, hvorfor stigende værdi i OpenAI ikke er det samme som kundebetalinger eller omsætning.

## ford-motor

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P2, temabaggrund:** 'Artiklen bruges som temabaggrund; den er ...' indeholder semikolon. 'Uge 40 - USA og Europa ...' bruger bindestreg som tankestreg.
- **P2, indledning:** 'frit valg af drivlinje' efterfølges af et langt selskabsslogan om at forfølge drømme. 'Drivlinje' forklares ikke, og sloganet skubber forklaringen af forretningen ned. Skriv almindeligt dansk om benzin, hybrid og el.

**Forbedringsforslag**

- Vis forskellen på Ford Blue, Model e, Pro og Credit i en enkel fordeling med indtjening eller tab. Så bliver det tydeligt, hvorfor elbiler, erhvervsbiler og finansiering har forskellige risici.

## rolls-royce

- Afventer gennemgang.

## coreweave

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P2, Mere fra NewDeal Invest:** 'Uge 52 - 2025 Wrapped' bruger bindestreg som tankestreg.
- **P2, indledning:** 'de tætte og datatunge opgaver' er uklart dansk. Tæthed beskriver her beregninger eller hardware, men det fremgår ikke. Forklar, at mange kraftige computere skal arbejde sammen.

**Forbedringsforslag**

- Sæt kontraktværdi, leveret kapacitet og indregnet omsætning ved siden af hinanden. Vis samtidig, at faste kundeaftaler ikke fjerner risikoen ved udstyr, finansiering og forsinkelser.

## marvell-technology

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** Slutdatoen 1.8.2026 bliver til 3. kvartal 2026, men de 2.739,3 mio. dollar gælder 2. kvartal i regnskabsåret 2027. Se `marvell-technology.js` og `21-noegletal.js`.
- **P2, flere afsnit og tegningsforklaring:** 'chipene' gentages, hvor den almindelige danske form er 'chippene'. 'Kunder hos cloud og datacentre' er også uklart, fordi det får slutbrugere til at lyde som Marvells direkte kunder.

**Forbedringsforslag**

- Vis én vej fra chipdesign gennem fabrik og distributør til datacenter. Forklar direkte kunde og slutkunde ved koncentrationstallene, så 14 % og 37 % ikke læses som identiske typer kunder.

## dell-tech

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P1, nøgletalskortets kvartal:** De 46.971 mio. dollar til 31.7.2026 mærkes 3. kvartal 2026 i det fælles script. Det er 2. kvartal i regnskabsåret 2027, som faktabåndet korrekt angiver. Se `dell-tech.js` og `21-noegletal.js`.
- **P2, tegningsforklaringen:** Nummereringen passer ikke til tegningen. Punkt 1 omtaler kunder, men figurens 1 er forhandleren. Punkt 2 omtaler virksomheder, mens figurens 2 er Dell. Teksten har fem punkter, figuren fire nummererede aktører. Læseren kan ikke bruge numrene til at følge forklaringen.

**Forbedringsforslag**

- Lad forklaringen vise, hvorfor højere salg af AI-servere kan ledsages af lavere avance. Det er sidens mest interessante sammenhæng for en investor og bør kobles direkte til de store ordretal.

## coinbase

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P2, USDC-forklaringen:** 'Jo mere USDC der er i omløb, desto mere får Coinbase i betaling' beskriver sammenhængen uden at holde renten konstant. Siden nævner selv renter som risiko, men ikke ved forklaringen af denne indtægt. Formuleringen bør afgrænses, så stigende omløb ikke fremstilles som en garanti for højere betaling.
- **P2, Mere fra NewDeal Invest:** 'Uge 19 - Den industrielle reformation' bruger bindestreg som tankestreg.

**Forbedringsforslag**

- Vis de to indtægtsstrømme handel og USDC med hver sin drivkraft: handelsaktivitet henholdsvis reservegrundlag og renter. Sæt derefter abonnement og staking ind som særskilte mindre strømme.

## reddit

Foreløbig tekst- og kodegennemgang. Primærkildeafstemning fortsætter.

**Fejl**

- **P2, videotitel:** 'Reddit-aktien (RDDT) - Klip fra ...' bruger bindestreg som tankestreg.

**Forbedringsforslag**

- Forklar, at ARPU beregnes ud fra dagligt aktive brugere, og sæt den definition tæt på de 6,9 dollar. Siden viser også ugentlige brugere, så nævneren skal være tydelig. Vis sammenhængen mellem aktive brugere, annoncepris og omsætning.

## advantest

- Afventer gennemgang.

## am-electric

- Afventer gennemgang.

## amphenol

- Afventer gennemgang.

## applovin

- Afventer gennemgang.

## astera-labs

- Afventer gennemgang.

## babcock-wilcox

- Afventer gennemgang.

## ballard-power-systems

- Afventer gennemgang.

## besi

- Afventer gennemgang.

## carvana

- Afventer gennemgang.

## celanese

- Afventer gennemgang.

## cerebras-systems

- Afventer gennemgang.

## ciena

- Afventer gennemgang.

## cipher-mining

- Afventer gennemgang.

## circle-internet-group

- Afventer gennemgang.

## cms-energy

- Afventer gennemgang.

## comstock-resources

- Afventer gennemgang.

## corning

- Afventer gennemgang.

## coupang

- Afventer gennemgang.

## enovix

- Afventer gennemgang.

## etoro-group

- Afventer gennemgang.

## expand-energy

- Afventer gennemgang.

## fluor

- Afventer gennemgang.

## fubotv

- Afventer gennemgang.

## gemini-space-station

- Afventer gennemgang.

## generac

- Afventer gennemgang.

## globalfoundries

- Afventer gennemgang.

## horizon-robotics

- Afventer gennemgang.

## huber-suhner

- Afventer gennemgang.

## iren

- Afventer gennemgang.

## iridium-communications

- Afventer gennemgang.

## klarna

- Afventer gennemgang.

## kodiak-ai

- Afventer gennemgang.

## lpkf-laser-electronics

- Afventer gennemgang.

## macom

- Afventer gennemgang.

## merlin

- Afventer gennemgang.

## microvision

- Afventer gennemgang.

## mntn

- Afventer gennemgang.

## monolithic-power-systems

- Afventer gennemgang.

## myr-group

- Afventer gennemgang.

## nextera-energy

- Afventer gennemgang.

## nextracker

- Afventer gennemgang.

## nova

- Afventer gennemgang.

## nuscale-power

- Afventer gennemgang.

## omada-health

- Afventer gennemgang.

## ondas-holdings

- Afventer gennemgang.

## opendoor

- Afventer gennemgang.

## rambus

- Afventer gennemgang.

## rocket-lab

- Afventer gennemgang.

## root

- Afventer gennemgang.

## sandisk

- Afventer gennemgang.

## sea

- Afventer gennemgang.

## semtech

- Afventer gennemgang.

## serve-robotics

- Afventer gennemgang.

## sharplink-gaming

- Afventer gennemgang.

## sigma-lithium

- Afventer gennemgang.

## silicon-motion

- Afventer gennemgang.

## sivers-semiconductors

- Afventer gennemgang.

## sofi

- Afventer gennemgang.

## solaris-energy-infrastructure

- Afventer gennemgang.

## soundhound-ai

- Afventer gennemgang.

## spire-global

- Afventer gennemgang.

## standard-lithium

- Afventer gennemgang.

## super-micro-computer

- Afventer gennemgang.

## swarmer

- Afventer gennemgang.

## t1-energy

- Afventer gennemgang.

## taiyo-yuden

- Afventer gennemgang.

## tower-semiconductor

- Afventer gennemgang.

## trilogy-metals

- Afventer gennemgang.

## uber-tech

- Afventer gennemgang.

## umc

- Afventer gennemgang.

## united-states-antimony

- Afventer gennemgang.

## upstart

- Afventer gennemgang.

## wolfspeed

- Afventer gennemgang.

## På tværs

- Kvartalsnavne dannes ud fra kalenderen i `21-noegletal.js` uden hensyn til selskabets regnskabsår eller den præcise periode.
- Ældre medieblokke indeholder semikolon og bindestreger som tankestreger, selv hvor den nye brødtekst er renset.
- GlobalFoundries, LPKF og SoftBank har dublerede indholds-id'er. De to første efterprøves nærmere i deres afsnit.
- Visuel kontrol, konsol og faktisk indlæsning af billeder afventer en tilgængelig computer.
