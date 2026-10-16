# Grok visual-variety review — vaerdikaeder.html

**Tid:** 2026-10-15 ~22:58 CEST  
**Lens:** Jesper-palette + variation (ikke monoton) · understreg pointen · scroll-telling  
**Side:** `docs/vaerdikaeder.html` (+ `docs/data/value-chains.json`)

## Dom
**Godkendt med mindre SHOULD.** Siden undgår "panel-suppe": treemap → kæde med lodret/vandret → tidslinje → filosofi-kort er fire forskellige former. Palette er tro (brand/cyan/yellow/dark). Ikke monoton.

## Stærkt
1. **Formskift:** mosaik (treemap) ≠ accordion-kæde ≠ vertikal timeline ≠ small-multiples filosofi.
2. **Kæde-toggle AI / fysisk / energi** genbruger samme UI-sprog men skifter indhold — understøtter "hele kæden"-pointen.
3. **Yellow sparsomt:** callout-kant + timeline-dots + heat — ikke støj.
4. **Small multiples** over kæden gør vægte scannable før man folder led ud.
5. **Scroll chapters** med `#kap-*` gør siden fortællende uden slideshow-gimmick.

## MUST (ingen denne cyklus)
Ingen blockers for push. Data er forsinket snapshot; advarsel findes.

## SHOULD (næste cyklus hvis tid)
1. **Ægte SVG-treemap eller sunburst** i stedet for CSS-grid mosaik (stadig Jesper-farver). Grid er læsbar, men "treemap" i copy lover mere præcis areal-kodning.
2. **Annotering på første led:** én gul `anno`-linje ("her sidder knaphed i 2024–26") synlig uden fold-ud.
3. **Reduced-motion:** respekter `prefers-reduced-motion` på hover/shadow (klassisk kæde har det allerede).
4. **Nav aria-current** på multi-kæde-siden; entré-dør er opdateret.
5. **Sunburst valgfrit** under treemap som "alternativ visning"-toggle — kun hvis det ikke fortynder.

## MUST NOT / pas på
- Undgå at kopiere samme `.vc-link`-kort til temaer/selskab — hold formen unik for kæder.
- Ingen Nasdaq, ingen 1m/3m, ingen per-stock returns i visuals.
- Forslag-tags skal forblive synlige i led-lister (allerede).

## Konklusion
Ship. Visual-variety pass er i planen (`VISUAL-VARIETY.md`). Næste builder: SHOULD 1–3 eller næste Mads-item (drawdown middel/median / market cap-lag).


## Update ~23:02 CEST
- **SVG-treemap + sunburst shipped** på vaerdikaeder (toggle). SHOULD 1 lukket. Legend + klik til tema.

## Review · drawdown, sammenlign, embed · ~23:55 CEST

**Sider:** `docs/drawdown.html`, `docs/sammenlign.html`, `docs/embed/chart.html` + `ndi.css`.  
**Set i Chromium** ved 1280, 375 og 320. Ingen sidescroll. Ingen konsolfejl. AKK-gate holder (ingen procent på AKK-kortet, drawdown-siden siger 12 måneder).

### Dom
**Godkendt med SHOULD.** Drawdown skifter form: hero-tal, annotation, underwater, prikker, liste, årssøjler. Gul bruges til "lige nu" og til den dybeste bund. Sammenlign har ét panel tilbage (temasøjler). Embed er stadig ét widget-panel, med handlingen udenfor.

### Stærkt
1. Underwater viser både bunden i april 2025 (ca. −36 %) og at serien stadig er under vand (ca. −23 % pr. 14. okt. 2026).
2. Prikfordelingen gør middel (−5,2 %) og median (−2,8 %) forståelige: de fleste fald ligger tæt på nul.
3. De fire dybe episoder kan læses uden hover. Den åbne episode er den gule bjælke.
4. 2025 i plus og alligevel det dybeste fald. Søjlen er afkast, ikke drawdown.

### SHOULD
1. ~~Underwater kan ikke skrubbes.~~ Lukket 23:59. Slideren står synlig under grafen. Home hopper til første dag. Klik og træk flytter en lodret streg. Udlæsningen er altid i teksten.
2. På 375 er prikbunken tæt. Delvist lukket 00:17. Median og middel har navn under aksen, og stregerne har en mørk kant, så de kan ses i bunken. Bunken er stadig tæt. Det er pointen. Listen under har de fire dybe tal.
3. De to sammenlign-kort ligner stadig hinanden. Det er parret. De må ikke få en tredje ens kasse ved siden af.
4. ~~Episodelisten var løsrevet fra kurven.~~ Lukket 00:01. Et klik eller Enter hopper slideren til bunddatoen og markerer rækken.
5. ~~Året med det dybeste fald var umarkeret i søjlerne.~~ Lukket 00:17. 2025 har gul overkant og teksten "Dybeste fald" over søjlen. Søjlerne deler bundlinje. Søjlen er stadig årets afkast.
6. ~~Valgt dag var kun en lodret streg.~~ Lukket 00:20. En cyan prik sættes på kurven. Den skjules, når dagen allerede er den gule bund eller den gule ring, så de to mærker ikke dækkes.
7. ~~Embed farvede en dag under nul med cyan.~~ Lukket 00:22. Prik, udlæsning og tooltip er rosa (`#e5b3ba`), når tallet er under nul. Hele perioden er stadig +104,8 % i cyan. År til dato slutter på +4,0 %.
8. ~~Den åbne episode havde ingen markør på kurven.~~ Lukket 00:27. En tynd gul streg står på toppen 2. jun. 2026, med ordet "top". Den dækker ikke "nu −23 %" eller årstallene. Gul prik på den dybeste bund bliver stående.
9. ~~AKK-datoen brækkede midt i måneden på 320.~~ Lukket 00:29. "fra 5. dec. 2026" står på sin egen linje. Ingen afkastprocent på kortet.
10. ~~Sluttallet på embed var 9 px på mobil.~~ Lukket 00:31. Det er 12 px og står inden for svg'en ved 375 og 320. Hele perioden er stadig +104,8 %.

### Update · episoder på kurven · 2026-10-16 ~00:50 CEST

De fire episoder dybere end 10 % står som søjler mellem kurven og årstallene. Brand for de lukkede. Gul for den åbne. Den valgte har en lys kant. Seneste dag ligger i den åbne, så den er valgt ved start. Klik på −35,8 % flytter kanten til søjlen for 18. feb. 2025 til 26. aug. 2025 og sætter udlæsningen på 8. apr. 2025. En dag uden for de fire, 17. nov. 2023, slukker kanten og rækken.

Ordet "tilbage" står over 26. aug. 2025. Det er dagen, det dybeste fald igen nåede sin top. "top" og "nu −23 %" rammer det ikke, ved 1280, 375 og 320. Ingen tekst uden for svg'en. Ingen sidescroll. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · embed-prik · 2026-10-16 ~01:00 CEST

Prikken på en dag under nul var `#c98a94` (`--neg`), mens udlæsning og tooltip var `#e5b3ba` (`--neg-ink`). Prikken er nu samme rosa. 4. feb. 2026 er −2,0 %. Sluttallet på år til dato er stadig +4,0 % i cyan. Hele perioden er +104,8 % i cyan.

På 320 dækkede tooltip sluttallet. Det stopper nu 8 px før tallet, på år til dato og på hele perioden, ved 1280, 375 og 320. Ingen sidescroll. Ingen konsolfejl. PMINDIAKK har stadig tom svg og ingen procent.

### Update · største forskel · 2026-10-16 ~01:02 CEST

Sammenlign sagde "største forskel" uden at vise hvilken række. Det er Andet / uklassificeret, ca. 1,5 procentpoint (11,6 % og 13,2 %). Rækken har en gul kant. Ét panel. Ingen afkastprocent på AKK-kortet. Datoen står på sin egen linje. Krydslink til drawdown er der. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · embed-tal · 2026-10-16 ~01:05 CEST

De tre tal under grafen var lige store. Totalafkast er nu 36 px (32 px under 640). CAGR og år til dato er 22 px. Tallene er de samme: +104,8 %, +26,4 % og +4,0 %. På PMINDIAKK står der stadig en streg, og svg'en er tom. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · søjlehøjde er dybden · 2026-10-16 ~01:15 CEST

Søjlerne under kurven var lige høje. Højden er nu dybden, bredden er stadig tiden. −16,7 % er den lave søjle. −35,8 % er den høje. −26,6 % og −26,8 % er næsten lige høje, fordi faldene er det. De deler overkant. Stregen ved −10 er brand og tykkere end de andre gitterlinjer. Tallet −10 er samme farve. Et klik på søjlen for 8. apr. 2025 sætter udlæsningen til −35,8 % og markerer rækken. En dag uden for de fire, 3. nov. 2023, slukker kant og række.

"tilbage", "top" og "nu −23 %" rammer ikke søjlerne eller hinanden, ved 1280, 375 og 320. Ingen tekst uden for svg'en. Ingen sidescroll. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · udbytte-mærke · 2026-10-16 ~01:22 CEST

De to sammenlign-kort er stadig et par, med samme felter. Forskellen er tegnet: PMINDI har en pil ud af kassen. PMINDIAKK har et loop, der vender tilbage i kassen. Ingen tredje kasse. Ét panel. AKK-kortet har ingen afkastprocent. "fra 5. dec. 2026" står på sin egen linje. Gul kant på Andet. Link til drawdown er der. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · nøgle under kurven · 2026-10-16 ~01:28 CEST

Forklaringen under underwater var ét afsnit. Den er nu en linje, en nøgle og en kort sætning. Nøglen har dybeste bund, seneste dag, valgt dag, stregen ved 10 % under nul, og de to søjler (højde er dybde, gul er åben). Svg-beskrivelsen har stadig den fulde tekst. Et klik på −35,8 % sætter udlæsningen til 8. apr. 2025. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · embed-kort og sætning · 2026-10-16 ~01:34 CEST

Klasse-kortene i embed havde tom plads til højre. PMINDI har nu pilen ud. PMINDIAKK har loopet tilbage. Teksten rammer ikke mærket, ved 1280, 375 og 320. Sætningen under grafen sagde slutdatoen to gange ("til 14. okt. 2026, pr. 14. okt. 2026"). Den siger den én gang. Hele perioden er stadig +104,8 %. År til dato er +4,0 %. PMINDIAKK har tom svg, ingen procent, og linket siger at drawdown vises efter 12 måneder. Ingen sidescroll. Ingen konsolfejl.

### Update · grænse i prikkerne · 2026-10-16 ~01:40 CEST

Prikfordelingen havde ingen grænse. En brand-streg står nu ved 10 % under nul, samme grænse som på kurven. Tallet −10 har samme farve. 4 af 41 prikker ligger til højre for stregen. Den gule prik er blandt dem. De øvrige ligger i bunken til venstre. Median og middel er uændrede, −2,8 % og −5,2 %. Ingen tekst uden for svg'en. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · året under vand · 2026-10-16 ~01:32 CEST

2026 i årssøjlerne sagde kun "til dato" og +4,0 %. Serien ligger stadig under vand i det år. Søjlen har nu cyan kant og teksten "Under vand". 2025 har stadig gul kant og "Dybeste fald", og søjlen er stadig +15,2 %. Søjlerne i samme række deler bundlinje ved 1280, 375 og 320. Teksten siger, at 2026 er året serien stadig ligger under vand, og at søjlen er årets afkast. Ingen sidescroll. Ingen konsolfejl.

### Update · tallene skæres ikke · 2026-10-16 ~01:44 CEST

Den gule streg for toppen gik gennem "nu -23 %". Streken ned til bunden gik gennem "-36 %". Begge tal står nu på en plade i samme farve som baggrunden. Stregerne stopper bag tallet og fortsætter over og under. Tallene er de samme. Ringen og den gule prik er fri af pladen. Et klik på søjlen for 8. apr. 2025 sætter udlæsningen til −35,8 %. En dag uden for de fire, 20. okt. 2023, slukker kant og række. Ingen tekst uden for svg'en. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · 0 % er brand · 2026-10-16 ~01:51 CEST

0 %-linjen i embed var en tynd stiplet streg i samme familie som gitteret. Den er nu brand, 2 px, og tallet 0 % har samme farve. De andre gitterlinjer er uændrede. Hele perioden er stadig +104,8 %, CAGR +26,4 %, år til dato +4,0 %. Sætningen siger slutdatoen én gang. 5. feb. 2026 er −6,9 %. Prik, udlæsning og tooltip er rosa, og tooltip rammer ikke sluttallet. PMINDIAKK har tom svg, ingen procent, og linket siger at drawdown vises efter 12 måneder. Ingen tekst uden for svg'en. Ingen sidescroll ved 1100, 375 og 320. Ingen konsolfejl.

### Update · årstal tæt på søjlerne · 2026-10-16 ~01:53 CEST

Der var et tomt bånd mellem søjlerne og årstallene. Årstallene står nu 12 enheder under den højeste søjle. Kurven, søjlerne og tallene har samme sted som før. "-36 %" og "nu -23 %" er uændrede. Et klik på søjlen for 8. apr. 2025 sætter udlæsningen til −35,8 %. Ingen tekst uden for svg'en. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · temasøjler fylder rækken · 2026-10-16 ~01:55 CEST

På bred skærm stoppede temasøjlerne ved 560 px, og panelet havde et tomt felt til højre. Søjlerne fylder nu rækken. De to søjler i en række har samme spor, så de deler skala. Tallene er de samme. Platforme er 16,0 % og 14,7 %. Andet / uklassificeret er 11,6 % og 13,2 %, og rækken har stadig gul kant. På 800, 375 og 320 er bredden som før, fordi loftet ikke bandt. Ét panel. Link til drawdown er der. Ingen sidescroll. Ingen konsolfejl.

### Update · lys kant på den gule søjle · 2026-10-16 ~02:06 CEST

Den åbne søjle er gul og valgt fra start. Den lyse kant var 1,25 px og forsvandt mod det gule. Den er nu 3 px, så den ses mod baggrunden. En valgt søjle i brand er stadig 1,25 px. Et klik på søjlen for 8. apr. 2025 sætter udlæsningen til −35,8 %, og den gule søjle mister kanten. Ingen sidescroll ved 320. Ingen konsolfejl.

### Update · stregen ved nul er lys · 2026-10-16 ~02:15 CEST

Nul-linjen var en svag stiplet streg og forsvandt, hvor kurven lå under vand. Den er nu lys og hel, tegnet oven på fyldet, og tallet 0 har samme farve. Stregen ved 10 % under nul er stadig brand og tykkere. Nøglen siger "0 % er toppen". "-36 %" og "nu -23 %" er uændrede. Et klik på søjlen for 8. apr. 2025 sætter udlæsningen til −35,8 %. Ingen tekst uden for svg'en. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · valgt episode på kurven · 2026-10-16 ~02:31 CEST

Kurven var cyan hele vejen. Den episode, den valgte dag ligger i, er nu gul oven på cyan. Ved start er det den åbne episode, fra 2. jun. 2026 til 14. okt. 2026. Et klik på −35,8 % gør bunden i april 2025 gul og slukker den åbne strækning. En dag uden for de fire, 17. nov. 2023, slukker den gule del og rækken. Nøglen har "Valgt episode".

"nu" og "−23 %" står til højre for ringen, på to linjer. Stregen ved toppen skærer dem ikke. De står inden for svg'en ved 1280, 375 og 320. "-36 %" er uændret. Ingen sidescroll. Ingen konsolfejl. AKK siger stadig 12 måneder og har ingen procent.

### Update · rosa under nul i embed · 2026-10-16 ~02:40 CEST

Feltet under nul på år til dato var en grå plet. Det er nu `#e5b3ba`, svagt ved nul-linjen og stærkest i bunden af faldet. Samme farve som prik, udlæsning og tooltip. Hele perioden er stadig +104,8 % i cyan. År til dato slutter på +4,0 %. 20. feb. 2026 er −2,5 %, og tooltip rammer ikke sluttallet. PMINDIAKK har tom svg, ingen procent, og linket siger at drawdown vises efter 12 måneder. Ingen sidescroll ved 1100, 375 og 320. Ingen konsolfejl.

### Update · tal på de dybe prikker · 2026-10-16 ~02:45 CEST

Prikkerne til højre for 10 % under nul havde ingen tal. −16,7 %, −26,6 %, −26,8 % og −35,8 % står nu over prikken. −35,8 % og den åbne er gule. De to andre er lyse. Bunken til venstre er stadig uden tal. Tallene rammer ikke hinanden eller en prik, og de står inden for svg'en. Median er −2,8 %. Middel er −5,2 %. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · tidslinjen møder prikken · 2026-10-16 ~02:48 CEST

På mobil stoppede stregen 2 px før næste prik. Den ender nu i prikkens midte, både vandret på bred skærm og lodret på 375. Den stiplede prik for 5. dec. 2026 er stadig åben. AKK-kortet har ingen afkastprocent. Ingen sidescroll ved 320. Ingen konsolfejl.

### Update · tal på det dybeste dyk · 2026-10-16 ~02:54 CEST

På år til dato bundede serien på −10,0 % den 30. mar. 2026. Tallet stod kun i tooltip. Det står nu under prikken, i samme rosa som feltet. Prikken og tallet rammer ikke kurven, sluttallet eller et gittertal, ved 1100, 375 og 320. Tooltip på den dag rammer hverken tallet eller sluttallet +4,0 %. Hele perioden har et kort dyk i oktober 2023. Det er for lavt til et tal og bliver i det rosa felt. Sluttallet er stadig +104,8 %. 20. feb. 2026 er −2,5 %. PMINDIAKK har tom svg, ingen procent, og linket siger at drawdown vises efter 12 måneder. Ingen sidescroll. Ingen konsolfejl.

### Update · søjlebredden følger vægten · 2026-10-16 ~02:57 CEST

Temasøjlerne blev rundet til hele procent af den længste søjle. Quantum var 0,9 % og 0,8 % og lige lange. SpaceTech var 4,4 % og 4,3 % og lige lange. Bredden følger nu vægten. Quantum 0,9 % er længere end 0,8 %. SpaceTech 4,4 % er få pixel længere end 4,3 %. Det er størrelsen af 0,1 point på den skala. Andet / uklassificeret har stadig gul kant. Ét panel. AKK-kortet har ingen afkastprocent. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

### Update · slideren står under dagen · 2026-10-16 ~03:01 CEST

Sliderens knap lå i kanten af kortet, mens kurvens første og sidste dag står inde i plottet. På 1100 var hullet omkring 70 px ved starten og over 100 px ved slutningen. Knappen følger nu plottets bredde. Ved 22. sep. 2023 og ved 14. okt. 2026 møder den stregen, ved 1280, 375 og 320. Et klik på −35,8 % sætter udlæsningen på 8. apr. 2025. Der kan weekender skubbe knappen omkring 5 px, stadig inden for knappen. Ingen sidescroll. Ingen konsolfejl. PMINDIAKK har ingen slider og ingen procent.

### Update · tal over søjlerne · 2026-10-16 ~03:06 CEST

−26,6 % og −26,8 % er næsten lige høje. Tallet står nu over de søjler, der ikke er det dybeste fald. −35,8 % beholder −36 % ved prikken. Tallene rammer ikke hinanden, prikken, "nu" eller årstallene, ved 1280, 375 og 320. Et klik på −26,6 % sætter udlæsningen på 30. mar. 2026. Den åbne er gul. Ingen sidescroll. Ingen konsolfejl.

### Update · nøgletal under grafen · 2026-10-16 ~03:25 CEST

Tre kort under kurven, ikke et panel. Nu under vand er −23,4 % pr. 14. okt. 2026, med gul kant. Der er 4 episoder dybere end 10 %. Den længste er 208 dage, fra top til genopretning. Et klik på søjlen −26,6 % sætter udlæsningen på 30. mar. 2026. «Tilbage» og «top» rammer ikke «nu −23 %». Den lange tekst ligger i «Sådan læser du grafen», lukket. Overskriften er «Fald fra top». 2026 har forbeholdet om Fundmarket-godkendelse. SRI 5 af 7 og markedsføringslinjen står på siden. Ingen tekst i svg'en rammer en anden. Ingen sidescroll ved 1280, 375 og 320. Ingen konsolfejl.

Embed under grafen: totalafkast +104,8 % er det høje kort. Ved siden af står +26,4 % og år til dato +4,0 % med forbeholdet. Største fald på hele perioden er −35,8 %, bund 8. apr. 2025. På år til dato er største fald −26,8 %, bund 29. jul. 2026, og linjen over kortene siger, at år til dato afventer godkendelse. Det rosa tal på den kurve er stadig −10,0 %. PMINDIAKK har streger og ingen procent. Del grafen viser sætningen, når udklipsholderen er lukket. Sammenlign har ca. 2,79 % og ca. 2,85 % i hvert kort. På 375 er «Også i udkastet» 14 chips à 44 px, og siden scroller ikke sidelæns. Ingen konsolfejl.

### Update · tom AKK-serie · 2026-10-16 ~03:30 CEST

PMINDIAKK har ingen kurspunkter i data. Embed loader stadig PMINDI. Klassen viser ét gult kort, «Kurs og afkast», med en streg og sætningen om 12 måneder. De tre andre kort er skjult. Grafen er skjult. Teksten siger ingen NAV eller graf før 5. december 2026. Linket hedder «Fald fra top vises efter 12 måneder». Ingen procent. På PMINDI er de fire kort tilbage: +104,8 %, +26,4 %, +4,0 % med delår-forbeholdet, og −35,8 %. På år til dato er største fald −26,8 %. Drawdown AKK har ingen procent og samme dato. Sammenlign siger «Klassen startede 5. dec. 2025», seneste NAV er en streg, og KID 5 år er ca. 2,85 %. «til dato» på 2026-søjlen er gul. Ingen tekst i de to svg'er rammer en anden, målt hver for sig. Ingen sidescroll. Ingen konsolfejl.

### Update · nøgle i to kolonner · 2026-10-16 ~03:41 CEST

På 390 px er nøglen under kurven et gitter, to og to. Sidste linje, «Højde er dybde. Gul er åben», går hele vejen og er én linje. På 1280 er nøglen stadig én række. «nu» står over «−23 %», med luft imellem, og rammer ikke «top» eller søjletallene. Ingen tekst uden for svg'en. Ingen sidescroll. Ingen konsolfejl i den måling.

### Update · to næsten lige dybe prikker · 2026-10-16 ~03:44 CEST

−26,6 % og −26,8 % ligger to pixel fra hinanden på aksen. Tallene stod i samme søjle, så det nederste læstes som om det hørte til den øverste prik. Nu ender −26,6 % til venstre for sin prik, og −26,8 % starter til højre for den åbne. −16,7 % og −35,8 % bliver over deres prikker. Ingen tal rammer hinanden eller kanten af svg'en, ved 390. Ingen sidescroll.

### Update · prikkerne er foldet · 2026-10-16 ~03:46 CEST

Under prikkerne står én sætning: hver prik er et fald, gul er det dybeste, hul gul er åben, median og middel står under aksen. Resten ligger i «Sådan læser du prikkerne», lukket, 44 px høj. Et klik åbner grænsen ved 10 % og at prikkerne til højre står i listen. Ingen sidescroll ved 390. Ingen konsolfejl.

### Update · Del grafen siger også nu · 2026-10-16 ~03:46 CEST

Sætningen er «Fald fra top, PMINDI. Dybeste fald -35,8 % fra 18. feb. 2025 til 8. apr. 2025. Lige nu -23,4 % under toppen pr. 14. okt. 2026.» plus adressen og advarslen. Når udklipsholderen er lukket, står sætningen selv under knappen. Ingen sidescroll ved 320.

### Update · periode-knapper 44 px · 2026-10-16 ~03:47 CEST

«År til dato» og «Hele perioden» var 40 px på 390 og 42 px på 700. De er 44 px. Klasse-kortene var allerede høje nok. Ingen sidescroll. Drawdown og sammenlign har ingen knapper under 44 px ved 390.

### Update · sliderfelt 44 px · 2026-10-16 ~03:48 CEST

Feltet under kurven er 44 px højt. Knapperne er stadig 18 px, sporet er stadig tyndt. På sidste dag, 14. okt. 2026, møder knappens midte stregen (afstand 0). Udlæsningen er −23,4 %. Ingen sidescroll ved 390.

### Update · brønd ved nøgletallene · 2026-10-16 ~04:00 CEST

Under kurven står de tre kort, og til højre en brønd for den åbne episode. 0 er toppen 2. jun. 2026. Bunden var −26,8 % den 29. jul. 2026. Prikken er i dag, −23,4 %. Teksten siger, at 13 % af vejen fra bunden tilbage til toppen er tilbagelagt. «0», «nu» og «−26,8 %» rammer ikke hinanden eller prikken, og de står inden for svg'en. På 390 og 320 står brønden til venstre og kortene til højre. Ingen sidescroll. Ingen konsolfejl.

Et klik på −35,8 % sætter udlæsningen på 8. apr. 2025. De 16 tekster i kurven rammer ikke hinanden og står inden for svg'en. Fyldet under kurven er `#e5b3ba`, samme rosa som embed, svagt ved nul og stærkere i dybet.

Embed på 390 og 320: totalafkast i fuld bredde, +26,4 % og år til dato side om side, største fald i fuld bredde. Søjlen ved −35,8 % fylder omkring en tredjedel. Fuld søjle er −100 %. På år til dato er største fald −26,8 %, og søjlen er kortere. PMINDIAKK er ét gult kort, søjlen er skjult, svg'en er tom, og der er ingen procent. «CAGR» står ikke i kortet. Ingen sidescroll. Ingen konsolfejl.

### Update · årssøjler og varighed · 2026-10-16 ~04:06 CEST

Årssøjlerne deler bundlinje. På 1280 ligger alle fire bunde på samme linje. På 390 og 320 deler de to i samme række bund. 2024 er 64 px høj og 92 px bred. 2026 er 8 px høj. Søjlen er stadig årets afkast: 2025 er +15,2 % med gul kant og teksten Dybeste fald. 2026 er +4,0 % med cyan kant, Under vand, og til dato i gult. Ingen sidescroll.

Varighedsbjælken under de fire episoder bruger samme skala. 208 dage er den længste. 87 dage er under halvdelen. 189 dage ligger tæt på 208, fordi faldene er det. Den åbne er gul. Et klik på −35,8 % sætter stadig udlæsningen på 8. apr. 2025. Ingen konsolfejl.

### Update · hel bjælke og chips · 2026-10-16 ~04:09 CEST

320 af 320 selskaber i PMINDIAKK findes også i PMINDI. Bjælken er hel, 18 px høj, og fyldet går fra kant til kant. Teksten siger «I begge. Hele bjælken». PMINDI har stadig 345 positioner i noten under. AKK-kortet har ca. 2,85 % som KID-omkostning og ingen afkastprocent. Linket hedder «Fald fra top (PMINDI)».

På 390 og 320 er linkrækkerne på sammenlign og under årssøjlerne chips på 44 px. Prikkerne mellem linkene er væk. På 1280 er de stadig en linje. Ingen sidescroll. Ingen konsolfejl.

### Update · dage på toppen · 2026-10-16 ~04:16 CEST

Under brønden står en andel, 14 px høj, højst 520 px. Brand er dagene på den løbende top. Resten af sporet er mørkt. 93 af 770 dage ligger på toppen. De øvrige 677 ligger under den. Fyldet er 12 % af sporet, målt 63 px af 520 på 1280, 44 af 362 på 390 og 35 af 292 på 320. Teksten siger ikke en procent. Middel og median står som episoder, ikke som disse dage. Sætningen nederst siger kun, at max er det samme tal som største fald på Fonden.

PMINDIAKK har ingen andel og ingen procent. Footer-links er nowrap. «KID PMINDI ↗» knækker ikke. Ingen sidescroll ved 1280, 390 og 320, heller ikke på sammenlign, embed og forsiden. Ingen konsolfejl.

### Update · periode-knapper følger teksten · 2026-10-16 ~04:19 CEST

På 1100 er «År til dato» 93 px og «Hele perioden» 127 px, begge 44 px høje, til venstre i værktøjslinjen. De fylder ikke de 1042 px. På 700 og 641 er de samme. Under 640 deler de rækken. Et klik på år til dato sætter største fald til −26,8 %, sluttallet til +4,0 %, og det rosa tal på kurven er −10,0 %. Forbeholdet står der.

På 390 er kortet for gns. årligt afkast 96 px. År til dato er 127 px, fordi forbeholdet har flere linjer. Det korte kort trækkes ikke op i samme højde. PMINDIAKK har tom svg og ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · ingen kurs · 2026-10-16 ~04:21 CEST

PMINDIAKK havde en bindestreg på 4 px ud for Seneste NAV. Feltet siger nu «Ingen kurs». Det er ikke en procent. KID er stadig ca. 2,85 %. På 320 står «KID, 5 år» på én linje, og værdien bryder under den. Ingen række overlapper. PMINDI har stadig 126,52 (14. okt. 2026). Ingen sidescroll ved 1280, 390 og 320. Ingen konsolfejl.

### Update · mærket følger sætningen · 2026-10-16 ~04:27 CEST

På 1100 stod pilen og loopet i højre kant af kortet, med et tomt felt imellem. De står nu 16 px efter sætningen. Teksten rammer ikke mærket, ved 1100, 700, 390 og 320. På 320 bryder sætningen, og mærket står ved siden af. Et klik på PMINDIAKK vælger kortet. Svg'en er tom, og der er ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · temasøjler 12 px · 2026-10-16 ~04:29 CEST

Søjlerne var 8 px, og procenten fyldte sin 52 px-celle. De er 12 px høje. Tallet har 64 px, og «17,2 %» har 27 px til overs i cellen. Quantum er stadig 16 px mod 14 px på 390, så 0,1 point kan ses. Platforme har den gule kant. AKK-kortet har ca. 2,85 % og «Ingen kurs». Ingen sidescroll ved 1280, 390 og 320. Ingen konsolfejl.

### Update · advarslen følger teksten · 2026-10-16 ~04:31 CEST

På 1100 var advarslen lige så høj som de fire kort, 364 px, med én sætning i midten. Den er 62 px og står i toppen, på linje med totalafkast. Kortene er uændrede: +104,8 %, +26,4 %, +4,0 % med forbehold, −35,8 %. På 390 og 320 står advarslen under kortene. PMINDIAKK har advarslen og ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · PMINDI og AKK på hver række · 2026-10-16 ~04:36 CEST

Temasøjlerne havde farve, men ikke navn. Hver række siger nu PMINDI i brand og AKK i cyan, 52 px, før søjlen. Teksten rammer ikke søjlen. På 320 er Quantum 7 px mod 6 px. Tallene er 1,1 % og 1,0 %. På 1280 er de 49 px og 44 px. Platforme har stadig gul kant, 17,2 % og 15,3 %. Skærmlæseren siger PMINDIAKK på AKK-rækken. AKK-kortet har ca. 2,85 % og Ingen kurs. Ingen sidescroll ved 1280, 390 og 320. Ingen konsolfejl.

### Update · gul overkant og 44 px · 2026-10-16 ~04:37 CEST

Det valgte klassekort i embed har gul overkant, `#f5ee9e`. Et klik flytter kanten fra PMINDI til PMINDIAKK. PMINDIAKK har tom svg og ingen procent. På sammenlign er «Se PMINDI» og «Se PMINDIAKK» 44 px ved 1280, 768 og 390. Ingen sidescroll. Ingen konsolfejl.

### Update · tilbage-link 44 px · 2026-10-16 ~04:39 CEST

«← Fonden» på drawdown var 19 px høj. Den er 44 px ved 1280, 390 og 320, med 16 px luft ned til øjenbrynet. PMINDIAKK har ingen procent. Forsiden og om-data scroller ikke sidelæns ved 320. Ingen konsolfejl.

### Update · AKK-link er en chip · 2026-10-16 ~04:40 CEST

På PMINDIAKK var «Sammenlign andelsklasser» en tekstlinje. Under 640 px er den en chip, 44 px høj. På 1280 er den 22 px, uden pille. Siden har ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · årene deler gulv på telefonen · 2026-10-16 ~04:55 CEST

På 390 stod årene i to rækker, så 2024 og 2026 ikke kunne sammenlignes på samme gulv. Ned til 361 px er de fire søjler på én række. Bundene ligger på samme linje. 2024 er 64 px. 2026 er 8 px. 2025 har gul overkant, 2026 cyan, og «til dato» er gul. «Dybeste fald» holder én linje. Under 360 px er det to rækker igen, og hver række deler gulv. Ingen sidescroll ved 1280, 390, 361 og 320.

På sammenlign holder «5. dec. 2026» sammen, når forklaringen skifter linje. KID-noten skifter mellem «årlig omkostning i KID.» og «Før kurtage og depot.» PMINDI har stadig 126,52 (14. okt. 2026) og ca. 2,79 %. AKK har ca. 2,85 % og Ingen kurs. PMINDIAKK-drawdown har ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · gulv under årssøjlerne · 2026-10-16 ~05:01 CEST

Søjlerne delte bund, men gulvet var usynligt. Hver søjle står nu i et spor på 72 px med en streg i bunden. Stregen er længere end søjlen. På 1280, 390 og 361 ligger alle fire bunde på samme linje. 2024 er 64 px. 2026 er 8 px og sidder på stregen. 2025 har gul overkant. 2026 har cyan, og «til dato» er gul. På 320 er det to rækker, og hver række deler gulv. Ingen sidescroll. Ingen konsolfejl.

### Update · Del grafen står ikke alene · 2026-10-16 ~05:07 CEST

På 390 stod «Del grafen» alene under de to andre knapper. Under 438 px tager «Undersøg porteføljen mere» sin egen række. «Se største fald» og «Del grafen» står ved siden af hinanden, 44 px høje, og de følger teksten. På 440 og 1100 er alle tre stadig på én linje. PMINDIAKK har den lange knap «Fald fra top vises efter 12 måneder». På 320 står den alene, og «Del grafen» under den, fordi de to ikke kan være på samme række. Ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · omkostningen står under kortene · 2026-10-16 ~05:14 CEST

KID-tallet sad i samme liste som ISIN og NAV. Nu står ca. 2,79 % og ca. 2,85 % under kortene. PMINDI har brand-streg, PMINDIAKK cyan-streg, og procenten er i tekstfarve. På 1280 og 700 ligger hvert tal i samme x som sit kort. På 390 og 320 står de to tal ved siden af hinanden, mens kortene stables. Noten er «Årlig omkostning i KID. Før kurtage og depot.» Kortene har ingen procent. AKK-drawdown har ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · dybde ved episoden · 2026-10-16 ~05:18 CEST

Listen havde kun et tal for dybden. Nu står en tynd søjle ved procenten. −16,7 % er 13 px, −35,8 % er 28 px, −26,6 % og −26,8 % er 21 px. Den åbne er gul. Varighedsbjælken er stadig vandret. Et klik på den åbne hopper til 29. jul. 2026. På 320 står «-23,4 %» samlet, og datoerne knækker ikke efter dagstallet. Ingen sidescroll ved 1280, 390 og 320. PMINDIAKK har ingen procent og ingen søjle. Ingen konsolfejl.

### Update · største fald i fuld bredde · 2026-10-16 ~05:21 CEST

Kortet «Største fald» stoppede ved nøgletallene, så der var et hul til højre under advarslen. Nu går kortet i fuld bredde. På 1100 og 700 er højrekanten den samme som advarslens. På 390 og 320 står advarslen under kortet. År til dato har stadig gul kant. PMINDIAKK viser ét gult kort og en streg, ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · år til dato går ind under advarslen · 2026-10-16 ~05:24 CEST

Advarslen er kortere end kortstakken, så der var luft ved siden af «År til dato». Nu står advarslen ved siden af «Gns. årligt afkast», og «År til dato» går ind under den. På 1100 og 700 deler totalafkast og år til dato bund. Højrekanten er den samme som advarslen og som «Største fald». Ingen overlap. På 320 er det årlige kort 96 px og år til dato 142 px. Forbeholdet trækker ikke det andet kort med. PMINDIAKK har ét gult kort og ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · klassesætningen holder sammen · 2026-10-16 ~05:26 CEST

På 700 og 800 stod «dig.» og «fonden.» alene på sidste linje, fordi mærket tog bredden fra sætningen. Mærket står nu ved siden af navnet. Sætningen har hele kortets bredde. På 1100, 800, 700, 390 og 320 er den én linje. Navn og mærke rammer ikke hinanden. Gul overkant følger det valgte kort. Ingen sidescroll. Ingen konsolfejl.

### Update · datoen holder sammen · 2026-10-16 ~05:28 CEST

På 320 stod «top.» alene under udlæsningen, og «14.» blev skilt fra «okt. 2026» i sætningen under embed-grafen. «fald?» stod alene i opfordringen. Nu holder datoen sammen, «løbende top» holder sammen, og «store fald» holder sammen. På 390 er sætningen under grafen én linje. År til dato har samme dato-sammenhold. Ingen sidescroll. Ingen konsolfejl.

### Update · «siden start» holder sammen · 2026-10-16 ~05:30 CEST

På 320 blev citatet delt, så «start». stod alene. Nu holder «siden start» sammen, og punktummet bliver på samme linje. På 390 holdt «PMINDI.» alene. Nu står «i PMINDI.» samlet. Ingen sidescroll. Ingen konsolfejl.

### Update · linjer der knækker forkert · 2026-10-16 ~05:41 CEST

På 480 og 500 stod «på» alene under overskriften på sammenlign. Nu står «udbyttet på» samlet. På 320 og 390 er det stadig to hele linjer. Fra 540 er overskriften én linje.

I footeren blev parentesen delt, så «(ISIN» eller «2026)» stod alene. Hele parentesen er nu én linje, på sammenlign, drawdown, forsiden, risici og omkostninger. Ingen sidescroll ved 320, 400, 480 og 1100. «penge.» stod alene omkring 400 og 420. Nu står «tabe penge.» samlet.

På drawdown ved 320 stod «↗» alene efter «Læs KID», «-23,4 %.» alene under den åbne episode, «2. jun.» skilt fra «2026» i brøndens note, og «godkendelse.» skilt fra Fundmarket. De fire holder nu sammen. PMINDIAKK har stadig ingen procent. I embed står «tabe penge.» samlet ved 480. Ingen konsolfejl.

### Update · ét ord alene · 2026-10-16 ~05:45 CEST

Fra 400 til 800 stod «afkast.» alene under årssøjlerne. «kurven.» stod alene fra 420 til 820, og «igen.» stod alene i læsevejledningen. De står nu med ordet foran. «dag for dag», «under aksen», «i listen» og «disse dage» holder også sammen.

Den gule note delte «29. jul.» fra «2026» ved 400. Datoen er nu én linje. På 400 er de tre linjer hele sætninger, og den sidste er «29. jul. 2026.»

På sammenlign stod «KID.» alene fra 540 til 1040, fordi linket knækkede ved skråstregen. «Risici / KID» holder sammen. «i fonden», «12 måneder» og «klassens afkast» holder sammen. På AKK-siden holder «som PMINDI» sammen. Ingen procent dér. Ingen sidescroll fra 320 til 1100. Ingen konsolfejl. Ingen nowrap-sætning stikker ud af sin forælder.

### Update · embed-noten · 2026-10-16 ~05:50 CEST

På 320 blev «14.» skilt fra «okt. 2026» i noten under år til dato, og «godkendelse.» stod alene under «Fundmarket-». Datoen er nu én linje, og «Fundmarket-godkendelse.» er én linje. Det gælder også den korte linje over grafen, når perioden er år til dato.

Advarslen lod «investering.» stå alene ved 640 og 700. Nu står «din investering.» samlet. På 320 er sidste linje den samme sætning. Ingen sidescroll. Ingen konsolfejl. PMINDIAKK har stadig ét kort og ingen procent.

### Update · de sidste enkelte ord · 2026-10-16 ~05:52 CEST

«genopretning.» stod alene i episodelisten fra 320 til 640. «tilbagelagt.» stod alene i brøndens note fra 360 til 1000. «enkeltaktier.» stod alene i ledeteksten fra 520. De tre holder nu sammen med ordet foran.

På sammenlign stod «anbefaling.» alene fra 480 til 880, og «strategier.» alene fra 560. «ikke anbefaling» og «to forskellige strategier» holder sammen.

Advarslen lod «investering.» stå alene fra 400 til 760. Sidste linje er nu «din investering.» I embed holder «Kilde: Fundmarket» sammen fra 320 til 880. Ingen sidescroll ved 320, 400 og 700. PMINDIAKK har ingen procent. Ingen konsolfejl.

### Update · AKK-sætningen · 2026-10-16 ~06:11 CEST

På PMINDIAKK stod «2026.» alene under grafen ved 520 og 540. Fra 460 til 500 stod «december 2026.» under «5.». Datoen «5. december 2026» er nu én linje.

Sætningen under navnet var 24–28 px, samme størrelse som et afkasttal. «måneder» stod alene fra 480 til 560. Den er nu 16 px, og «12 måneder» holder sammen. På 320 holder «12 måneder.» også sammen i dato-linjen. Ingen procent. Ingen sidescroll fra 320 til 1100. Ingen konsolfejl. PMINDI viser stadig +104,8 % i det store tal.

### Update · AKK-datoen på drawdown · 2026-10-16 ~06:17 CEST

På PMINDIAKK stod «2026.» for sig selv ved 440 og 460, skilt fra «5. december». «12» stod for enden af linjen og «måneders» på den næste. «12 måneders historik» og «5. december 2026» holder nu sammen. Ingen procent. Ingen sidescroll. Ingen konsolfejl.

### Update · på Fonden · 2026-10-16 ~06:19 CEST

Under 320 stod «Fonden.» alene efter «største fald på». «på Fonden» holder nu sammen ved 300 og 310. Fra 320 er sætningen én linje. Ingen sidescroll. Ingen konsolfejl.

### Update · startdato på årligt afkast · 2026-10-16 ~06:30 CEST

Noten under «Gns. årligt afkast» sagde kun «3,1 år siden start». Den siger nu også startdatoen. Under 390 står datoen på sin egen linje og holder sammen. Kortet er 15 px højere der, og rækken følger år til dato, som allerede er højere. Fra 390 er noten én linje. Advarslen strækkes ikke. På år til dato står +26,4 % stadig med startdatoen. Ingen sidescroll. Ingen konsolfejl. PMINDIAKK har stadig ét gult kort og ingen procent.

### Pas på
- Ingen Nasdaq-kontrol i embed. Teksten er "Fonden har intet fast benchmark."
- Ingen per-aktie afkast. Tallene er fondens totalafkast-serie.
- `.scarce` og `.tm-svg` er ikke globale.

### Update · tre tidspunkter · 2026-10-16 ~06:50 CEST

Ny form under «De dybe episoder»: en tidsakse, ikke et kort og ikke en søjle. Tre prikker, Top, Bund og Tilbage eller Nu. Afstanden er tiden. Gul prik er det valgte tidspunkt. Et klik sætter dagen på kurven. Listen skifter episode. Den åbne episode starter på Nu. En lukket episode har Tilbage. Ingen sidescroll ved 320 og 1100. PMINDIAKK har stadig ingen procent og ingen akse.

Drawdown og embed siger nu i footeren «Generel information, ikke investeringsrådgivning.» Markedsføringsmateriale, KID og den historiske advarsel er der stadig.

### Update · udskrift · 2026-10-16 ~06:55 CEST

«Udskriv» står ved siden af «Del grafen». På skærmen er den 44 px. På papir er knapperne væk. Episodelisten og de tre tidspunkter bliver. Øverst står «NewDeal Invest. Udskrift» med markedsføringsmateriale og ikke rådgivning. Footer med KID og den historiske advarsel følger med. PMINDIAKK har også knappen og stadig ingen procent. Ingen sidescroll på skærmen.

### Update · udbyttets vej · 2026-10-16 ~07:00 CEST

Ny form på sammenlign, under KID-parret og over tidslinjen. «Samme selskaber» står til venstre. To ruter: pil «Ud til dig» med gul streg, når den er valgt, og sløjfe «Bliver i fonden» med cyan streg. Sætningen skifter. PMINDI udbetaler til dig og ejer de samme selskaber som PMINDIAKK. PMINDIAKK lader udbyttet blive i fonden. Kursen vises efter 12 måneder, fra 5. dec. 2026. Ingen ny procent. Knapperne er 44 px. Ingen enkeltord på egen linje ved 300–1100. Ingen sidescroll. Ingen konsolfejl. På papir bliver ruterne.

### Update · stop på kurven · 2026-10-16 ~07:15 CEST

Ny form i embed, under udlæsningen. En streg med stop. Afstanden er tiden. Start sætter kurven til 0 % den 22. sep. 2023. Seneste er 14. okt. 2026. Laveste vises, når ordet har plads. På år til dato er det −10,0 % den 30. mar. 2026, og prikken får en gul ring. På hele perioden ligger det laveste punkt for tæt på starten, så det udelades. PMINDIAKK har ingen stop og ingen procent. Knapperne er 44 px. Ingen sidescroll ved 300–1100. Ingen konsolfejl. «til dig» og «en endelig investeringsbeslutning» holder sammen. «Delår, afventer» holder sammen.

### Update · udskrift af sammenlign · 2026-10-16 ~07:20 CEST

«Udskriv» står under indledningen og er 44 px. På skærmen er masten skjult. På papir er knappen væk. Kortene er hvide med mørk tekst. PMINDI har 126,52 (14. okt. 2026). PMINDIAKK har Ingen kurs. KID-parret er ca. 2,79 % og ca. 2,85 %. Udbyttets vej og tidslinjen følger med. Øverst og i footeren står markedsføringsmateriale, ikke investeringsrådgivning og den historiske advarsel. Ingen sidescroll ved 320, 390 og 1100. Ingen konsolfejl.

### Update · udskrift af embed · 2026-10-16 ~07:22 CEST

«Udskriv» står under nøgletallene og er 44 px. Den står ikke i rækken med Del grafen. På papir er knappen og opfordringen væk. Mast og footer har markedsføringsmateriale, ikke investeringsrådgivning og den historiske advarsel. År til dato beholder −10,0 %. PMINDIAKK har knappen, teksten om 12 måneder og 5. december 2026, og ingen procent. Ingen sidescroll ved 320, 390 og 1100. Ingen konsolfejl.

### Update · hele forløbet · 2026-10-16 ~07:28 CEST

Ny form på drawdown, over de tre tidspunkter. Fire streger på én linje. Bredden er tiden fra 22. sep. 2023 til 14. okt. 2026. Den åbne er gul. Et klik hopper til bunden. Sætningen siger −26,8 % for den åbne, og −16,7 %, −35,8 % og −26,6 % for de lukkede. De tre tidspunkter følger med. På 300 px er hver streg mindst 44 px. Ingen sidescroll. Ingen konsolfejl. PMINDIAKK har ingen linje og ingen procent.

### Update · KID-tallet · 2026-10-16 ~07:32 CEST

KID-parret på sammenlign kan vælges. PMINDI er ca. 2,79 %. PMINDIAKK er ca. 2,85 %. Sætningen nævner klassen. For PMINDIAKK står også, at kursen vises efter 12 måneder, fra 5. dec. 2026. Den valgte har en gul streg. Knapperne er over 44 px. Ingen sidescroll ved 300–1100. Ingen konsolfejl. På papir bliver begge tal.

### Update · temarække · 2026-10-16 ~07:26 CEST

Hver temarække på sammenlign kan vælges. Sætningen gentager de to vægte, der står i rækken, og siger eksponering, ikke anbefaling. Største forskel åbner på Platforme, 17,2 % og 15,3 %. Et klik på Chips siger 13,3 % og 11,9 %. Rækken er mindst 44 px. Ingen sidescroll ved 320, 390 og 1100. Ingen konsolfejl. På papir bliver rækkerne.

### Update · første dag under 10 % · 2026-10-16 ~07:33 CEST

Ny kontrol på drawdown, ved kurven. Knappen hopper til 2. aug. 2024. Udlæsningen siger −13,8 % under den løbende top. Ved siden af står 267 af 770 dage. Det er et dagtal, ikke en procent. Knappen er 44 px. På 320 px slutter sætningen med «løbende top» på én linje. Ingen sidescroll ved 320, 390 og 1100. Ingen konsolfejl. På papir er knappen væk, og dagtallet bliver. PMINDIAKK har ingen linje og ingen procent. Cyklus 50 har ingen MUST i egne filer.

### Update · to spor på tidslinjen · 2026-10-16 ~07:37 CEST

Ny form på sammenlign, over den eksisterende tidslinje. To spor. Længden er tiden fra 22. sep. 2023 til 5. dec. 2026. PMINDI er den lange brand-streg frem til 14. okt. 2026. PMINDIAKK er den korte cyan-streg fra 5. dec. 2025. Stiplet streg til højre er datoen, kursen kan vises. Et klik på PMINDI siger første NAV og seneste kursdag. Et klik på PMINDIAKK siger, at kursen vises efter 12 måneder, fra 5. dec. 2026. Ingen ny procent. Knapperne er 44 px. Ingen sidescroll ved 300–1100. Ingen konsolfejl. På papir bliver sporene. KID-parret er stadig ca. 2,79 % og ca. 2,85 %. PMINDIAKK har stadig Ingen kurs.

### Update · dage over og under nul · 2026-10-16 ~07:40 CEST

Ny form i embed, under stoppene. En tynd streg. Brand er dagene på eller over nul. Rosa er dagene under nul. På hele perioden er det 749 af 770 og 21 af 770. På år til dato er det 161 af 197. Sætningen siger, at nul er første dag i perioden, og at dagene under nul ikke er et fald fra top. Ingen procent i sætningen. Knapperne er 44 px. Ingen sidescroll ved 300–1100. Ingen konsolfejl. På papir er knapperne væk, og stregen og sætningen bliver. PMINDIAKK har ingen streg, ingen procent, og teksten om 5. december 2026.

### Update · år under 10 % · 2026-10-16 ~07:42 CEST

Ny række på drawdown, under hoppet til første dag. Tre knapper: 2024, 2025 og 2026. Et klik hopper til årets første dag mindst 10 % under toppen. 2024 lander 2. aug. 2024 på −13,8 %. 2025 lander 25. feb. 2025 på −12,2 %. 2026 lander 2. jan. 2026 på −14,7 %. 2023 har ingen knap. Knapperne er 44 px og står på én række ved 300 px. Den valgte har en gul streg. Ingen sidescroll. Ingen konsolfejl. På papir er knapperne væk, og etiketten bliver. PMINDIAKK har ingen række og ingen procent.

### Update · siden bunden · 2026-10-16 ~07:43 CEST

Ny linje på drawdown, under år-knapperne. Knappen hopper til bunden 29. jul. 2026. Udlæsningen siger −26,8 %. Ved siden af står 77 dage siden den dato, og at serien ikke er tilbage på den top. Tallet er dage, ikke en ny procent. Knappen er 44 px. Ingen sidescroll ved 300–1100. Ingen konsolfejl. På papir er knappen væk, og sætningen bliver. PMINDIAKK har ingen linje, ingen procent, og teksten om 5. december 2026.

### Update · spor for perioden · 2026-10-16 ~07:47 CEST

Ny form i embed, over grafen. Et spor for hele perioden, fra 22. sep. 2023 til 14. okt. 2026. Den gule del til højre er år til dato. Et klik på den gule del skifter til år til dato og siger frem til 14. okt. 2026, at det er et delår, og at det afventer Fundmarket-godkendelse. Et klik på resten skifter tilbage. Knapperne er 44 px. Den gule del er 69 px ved 300. Ingen procent i sætningen. Ingen sidescroll ved 300–1100. Ingen konsolfejl. På papir bliver sporet. PMINDIAKK har ingen spor og ingen procent. Cyklus 55 har ingen MUST i egne filer.

### Update · to slags rækker · 2026-10-16 ~07:48 CEST

Main lagde en Nasdaq-række med klassen `.cmp-row`. Temarækken på sammenlign bruger samme navn. CSS er delt: temarækken er `.cmp-themes .cmp-row` og stadig et gitter med margin 0. Nasdaq-rækken er `div.cmp-row` med margin 10 px. Kontakten er 44 px og slået fra. Sætningen «Fonden har intet fast benchmark» står der stadig. Ingen konsolfejl.

### Update · dage pr. år · 2026-10-16 ~07:49 CEST

År-rækken på drawdown siger nu også et dagtal. 2024 har 16 dage, 2025 har 116, 2026 har 135. Tilsammen 267, samme tal som hele serien. Et klik hopper stadig til årets første dag under 10 %. Sætningen har ingen ny procent. Knapperne er 44 px. Ingen sidescroll ved 320 og 1100. Ingen konsolfejl. På papir er knapperne væk, og dagtallet bliver. PMINDIAKK har ingen række og ingen procent.

### Update · første dag under nul · 2026-10-16 ~07:51 CEST

Ny knap i embed, under dagtallet. Et klik sætter kurvens første dag under nul. På hele perioden er det 3. okt. 2023, og udlæsningen siger −1,9 %. På år til dato er det 4. feb. 2026, og udlæsningen siger −2,0 %. Det er afstanden til periodens start, ikke et fald fra top. Knappen er 44 px. Ingen sidescroll. Ingen konsolfejl. På papir er knappen væk. PMINDIAKK har ingen knap og ingen procent.
