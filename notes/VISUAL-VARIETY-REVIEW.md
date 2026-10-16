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

### Pas på
- Ingen Nasdaq-kontrol i embed. Teksten er "Fonden har intet fast benchmark."
- Ingen per-aktie afkast. Tallene er fondens totalafkast-serie.
- `.scarce` og `.tm-svg` er ikke globale.
