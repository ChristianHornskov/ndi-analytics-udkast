# Visual variety pass — værdikæder & udkast

**Mål:** Jesper-palette (brand #89aeb4, cyan #9ecfd6, yellow #f5ee9e, dark panels) men **ikke monoton**. Hvert afsnit skal bruge en anden form, så øjet ikke ser "endnu et panel-gitter".

## Inventar (skal bruges på tværs af udkastet)

| Form | Brug | Status på vaerdikaeder.html |
|---|---|---|
| Værdikæde-diagram (lodret) | Led → led med ikon + vægtbjælke | ✅ |
| Værdikæde vandret (desktop) | Scroll-snap strip, samme data | ✅ toggle |
| SVG-treemap (squarify) | Tema-eksponering (areal ≈ vægt) | ✅ |
| Tidslinje | Teknologiske skift | ✅ |
| Small multiples | Top-led KPI pr. kæde | ✅ |
| Filosofi-callout / 4-kort | NDI-blik | ✅ |
| Annoterede chart-elementer | Gul annotation / heat på celler | ✅ heat |
| Ikoner pr. led | Unicode i kæde | ✅ |
| Scroll-telling chapters | #kap-treemap / kæder / timeline / flaskehalse / filosofi | ✅ |
| Sticky chapter-nav | Hurtig hop mellem former | ✅ |
| Sunburst | Alternativ til treemap | ✅ toggle på vaerdikaeder |
| Annoteret fondsgraf | Peak/trough labels (fond-view) | findes allerede i app |

## Anti-monotoni-regler
1. Aldrig tre ens `.panel`-blokke i træk uden formskift.
2. Gul (#f5ee9e) kun til fokus: callout-kant, timeline-dots, annotation — ikke som fyld.
3. Cyan til tal og overskrifter i led; brand til kanter og pile.
4. Én "wow"-sektion pr. side (her: treemap + kæde-toggle), resten støtter.
5. Mobil: lodret kæde default; vandret kun desktop.

## Grok review (denne cyklus)
Se `notes/VISUAL-VARIETY-REVIEW.md`.

| Flodsystem-dæmninger | 5 dams grafik | ✅ vaerdikaeder |
| Rum-citatblok | Musk kun som citat | ✅ |

## Fra Claude lane-A · 2026-10-16 ~00:30 CEST
| Form | Brug | Status på vaerdikaeder.html |
|---|---|---|
| Orbit-trappe (SVG) | Rumkæden fra jorden og op, led placeret i "højde" med antal selskaber, klikbar | ✅ kun på rum-fanen |
| Nummererede trin | Rum i fire trin (billigere opsendelse → flere satellitter → tjenester → måske compute) | ✅ |
| Kildekort | Fire NDI-pointer om rum, hver med BLOG-dato | ✅ |
| Tredelt led-kort | Hvad er det / Hvorfor følger NDI det / Hvad ændrer sig + NDI- eller baggrund-mærke | ✅ alle kæder |
| Stiplet nabo-led | Luftfart i SpaceTech-temaet vist som nabo, ikke som rumled | ✅ |
| Klikbare dæmninger | Flod-dæmning → åbner AI-led | ✅ |
| Selskabs-chips | Stiplet chip = selskab fra et andet tema end kædens | ✅ |

## Fra Claude lane-A · 2026-10-15 ~23:55 CEST (vaerdikaede.html)
| Form | Brug | Status |
|---|---|---|
| Lodret flod-gradient | Venstre "flod" fra gul (fysisk) til cyan (digital) langs de 13 led | ✅ vaerdikaede.html |
| Dæmnings-mærker | 13 led grupperet under de 5 dæmninger med gul markør og kort hint | ✅ |
| Ikon-badge med nummer | Ikon pr. led med gult nummer-badge (1 til 13) | ✅ |
| Dæmpet ikke-træf | Ved filter dæmpes led uden træf, træf får gul kant | ✅ |
## Drawdown (lane D)

Siden må ikke være fire ens kort plus to mørke kasser. Formerne skifter ned ad siden.

| Form | Hvad den viser | Status |
|---|---|---|
| Hero-tal | Det ene dybeste fald, med datoer og genopretning | ✅ `.hero-stat` |
| Rolige tal | Middel og median som to linjer, ikke kort | ✅ `.quiet-stats` |
| Gul annotation | Hvor serien ligger under vand i dag | ✅ `.anno` |
| Underwater | Tid. Gul prik = dybeste bund. Ring = seneste dag. Tynd gul streg = toppen i den åbne episode. Søjler mellem kurve og årstal = episoder dybere end 10 %. Højden er dybden, bredden er tiden. Streg ved 10 % under nul er grænsen. Klik på søjlen hopper til bunden. Ordet tilbage = dagen det dybeste fald nåede toppen igen. Når toppen ligger tæt på seneste dag, står ordet top til venstre for stregen, så det ikke rammer "nu". Slider vælger en dag, cyan prik på kurven. Nøgle under grafen, ikke et afsnit. På smal skærm er nøglen to kolonner, og den sidste linje går hele vejen. På bred skærm er den én række. Ordet nu og procenten står på hver sin linje. Den lange læsevejledning er foldet. Tallene på kurven står på en plade, så stregerne ikke skærer dem. Årstallene står tæt under søjlerne. Den valgte søjle har en lys kant. På den gule søjle er kanten tykkere, så den ses mod baggrunden. Stregen ved nul er lys og hel. Tallet 0 har samme farve. Grænsen ved 10 % under nul er stadig brand. Den gule del af kurven er den episode, den valgte dag ligger i. Tallet ved ringen står til højre for kurven, på to linjer, så stregen ved toppen ikke skærer det. Sliderens knap står under den valgte dag. Udlæsningen holder datoen og ordene løbende top samlet. Selve feltet er 44 px højt, så det kan rammes med tommelfingeren. De søjler, der ikke er det dybeste fald, har tallet over sig, så de to næsten lige høje kan skelnes. Det dybeste fald beholder tallet ved prikken | ✅ `.figure` + `.uw-scrub` + `.uw-span` + `.uw-gate` + `.uw-key` + `.uw-plate` |
| Nøgletalskort | Tre tal under kurven, ikke et panel: nu under vand (gul topkant), antal dybe episoder, længste af dem. Ved siden af står en brønd for den åbne episode: 0 er toppen, fyldet er dybden i dag, hullet under prikken er hvor meget dybere bunden var. På mobil står brønden til venstre og kortene til højre | ✅ `.stat-strip` + `.depth-well` |
| Dage på toppen | En tynd andel, ikke et kort. Brand er dagene på den løbende top. Resten af sporet er dagene under den. Tallet er 93 af 770, ikke en procent. Middel og median tæller episoder, og det står under sporet | ✅ `.peak-days` |
| Del grafen | Kopierer en sætning med det dybeste fald, hvor serien ligger nu, adressen og den historiske advarsel | ✅ `.share-row` |
| Prikfordeling | Hvorfor middel ligger dybere end median. Navnene står under aksen. Streg ved 10 % under nul er den samme grænse som på kurven. De fire prikker til højre har tal. To fald med næsten samme dybde får tallet ud til hver sin side, så de ikke stables oven på hinanden. De står også i listen. Bunken til venstre er uden tal. Den lange forklaring er foldet under «Sådan læser du prikkerne» | ✅ `.figure.plain` + `.uw-gate` |
| Episodeliste | De fire fald dybere end 10 %, med varighed. Bjælken under teksten er dagene fra top til genopretning, på samme skala. Den længste er 520 px på bred skærm og rækken på mobil. Klik hopper til bunden på kurven. En tynd søjle ved procenten er dybden, på samme skala. Den dybeste er højest. Den åbne er gul, ligesom varighedsbjælken. Datoer og procenten i sætningen holder sammen på smal skærm. «Seneste dag» står sammen med procenten | ✅ `.ep-ledger` + `.ep-stem` |
| Årssøjler | Kalenderafkast som small multiples, link til periode. Året med det dybeste fald har gul kant. Året, serien stadig ligger under vand, har cyan kant, teksten Under vand, og "til dato" i gult. Søjlen er årets afkast, op til 92 px bred, i et spor på 72 px. En streg i bunden af sporet er gulvet, og den går ud over søjlen, så de fire år deler bundlinje. 2024 er den høje søjle. 2026 er den lave. Ned til 361 px står de fire år på én række, så 2024 og 2026 stadig deler gulvet. Under 360 px er det to rækker. Under søjlerne står, at ÅTD er et delår og afventer Fundmarket-godkendelse. Ordet holder sammen, også når linjen er smal. Datoerne i brøndens note og i den gule note holder sammen. «Læs KID ↗», «årets afkast», «på kurven», «dag for dag», «sin top igen», «under aksen», «i listen», «disse dage», «til genopretning», «er tilbagelagt» og «Ikke enkeltaktier» holder sammen. Advarslen holder «din investering» sammen | ✅ `.year-rail` |

Et plus-år kan rumme det dybeste fald. 2025 er eksemplet i copy, regnet fra serien.

## Sammenlign

Kortpar (to klasser), tidslinje uden panel. Når alle selskaber i PMINDIAKK også er i PMINDI, er bjælken under tallet hel og i brand. På mobil er linkrækkerne chips på 44 px, uden prikker imellem. Knapperne på kortene er 44 px, også på bred skærm. Stregen møder midten af næste prik, også på mobil. Stort tal for overlap, ét panel med parvise temasøjler. Søjlerne er 12 px høje, fylder rækken og deler skala. Hver række siger PMINDI og AKK i samme farve som søjlen, så listen kan læses uden at huske tegnforklaringen. Tallet har 64 px, så procenten ikke står i klemme. Bredden følger vægten, også når forskellen er under ét procentpoint af den længste søjle. Ikke tre `.panel` i træk. Kortene er et par med samme opbygning. PMINDI har en pil ud af kassen. PMINDIAKK har et loop tilbage i kassen. Rækken med den største forskel har en gul kant, og teksten nævner temaet. Krydslink til drawdown overlever, når siden er hentet. Datoen for AKK-gaten står på sin egen linje. Når klassen ikke har en offentlig kurs, hedder feltet "Klassen startede", seneste NAV siger "Ingen kurs", og tidslinjen siger ingen NAV eller graf før gaten. Datoen «5. dec. 2026» holder sammen, også når forklaringen skifter linje. «siden start» holder sammen. «i PMINDI» holder sammen. Overskriften holder «udbyttet på» sammen. «i fonden», «12 måneder», «klassens afkast», «ikke anbefaling», «to forskellige strategier» og linket «Risici / KID» holder sammen. AKK-teksten på drawdown holder «som PMINDI», «12 måneders historik» og «5. december 2026» sammen. KID-omkostningen ved 5 år står under kortene, i sit eget par. PMINDI ca. 2,79 % har brand-streg. PMINDIAKK ca. 2,85 % har cyan-streg. Tallet er i tekstfarve. Noten siger årlig omkostning i KID, før kurtage og depot, og de to sætninger kan skifte linje hver for sig. På bred skærm står hvert tal under sit kort. På smal skærm står de to tal stadig ved siden af hinanden.

## Embed

Widgetten er ét panel. Call-to-action står udenfor, med link til største fald (AKK-teksten siger, at fald fra top vises efter 12 måneder) og knappen Del grafen. Sætningen "Fonden har intet fast benchmark." er en rolig linje. Nasdaq-klasser er fjernet fra embed-CSS. Fyldet går til 0 %-linjen: cyan over, rosa under. Rosa er `#e5b3ba` og stærkest i bunden af faldet, så et dyk under nul ikke ligner en grå plet. 0 %-linjen er brand og tydeligere end gitteret. Tallet 0 % har samme farve. En dag under nul er rosa (`#e5b3ba`) i prik, udlæsning og tooltip. Samme farve i alle tre. Dybeste punkt under nul har samme farve og et tal, når dalen er høj nok til at læses. På år til dato er det −10,0 % den 30. mar. 2026. På hele perioden er dykket for kort, så tallet udebliver og feltet bliver rosa. Tooltip holder sig fri af sluttallet. Sluttallet følger periodens fortegn og er 12 px på smal skærm. Advarslen ved siden af nøgletallene er så høj som teksten. Under grafen er nøgletallene kort, ikke en delt række: totalafkast er det høje kort med cyan kant, gennemsnitligt afkast og år til dato står ved siden af, og største fald ligger under dem i fuld bredde med rosa kant. På bred skærm står advarslen ved siden af det årlige afkast, og år til dato går ind under advarslen. Totalafkast og år til dato deler bund. På mobil følger de to små kort deres egen tekst. På mobil under 640 px er det samme hierarki: totalafkast i fuld bredde, de to små kort side om side, største fald i fuld bredde. Ved tallet for største fald står en smal søjle. Fuld søjle ville være −100 %. Fyldet er faldet som andel af toppen. Tallet er facit. «CAGR» står ikke i kortet. År til dato har gul kant og teksten om, at tallet afventer Fundmarket-godkendelse. Største fald er fra en top i den viste periode, ikke det rosa tal på kurven. Klasse-kortene bruger samme mærke som sammenlign: pil ud på PMINDI, loop på PMINDIAKK. Mærket står ved siden af navnet. Sætningen under har hele kortets bredde og holder sammen på én linje ned til 320 px. Det valgte kort har gul overkant. Sætningen under grafen siger slutdatoen én gang, og datoen holder sammen. «Store fald» i opfordringen holder sammen. Noten under år til dato holder datoen og «Fundmarket-godkendelse» sammen. Advarslen holder «din investering» sammen. «Kilde: Fundmarket» holder sammen. Periode-knapperne er 44 px høje. Over 640 px følger de teksten og står til venstre, så de ikke bliver et andet kortpar under klasse-kortene. Under 438 px står «Undersøg porteføljen mere» på sin egen række, og «Del grafen» står ved siden af den korte knap, når der er plads. Knapperne følger teksten. De bliver ikke tre lige brede bjælker. Under 640 px deler de rækken. På mobil følger kortene deres egen tekst, så forbeholdet på år til dato ikke trækker det andet kort med op. PMINDIAKK har ingen kurs i data. Grafen skjules, og nøgletallene bliver ét gult kort ("Kurs og afkast"), ikke fire ens streger. Ingen procent. Teksten siger ingen NAV eller graf før 5. december 2026. «5. december 2026» holder sammen. «12 måneder» holder sammen i sætningen under navnet, i dato-linjen og under grafen. Sætningen under navnet er 16 px, så den ikke ligner et afkasttal. PMINDI beholder det store tal.

## Fælles tokens i `ndi.css` (sparsomt)

`--ink`, `.figure`, `.figure.plain`, `.anno`, `.hero-stat`, `.quiet-stats`, `.ep-ledger`, `.year-rail`, `.h-section`, `.stat-strip`, `.under-row`, `.depth-well`, `.peak-days`, `.share-row`, `.chip-links`.

Footer-links (`a` i `.site-footer` og i embed) holder sig på én linje, så «KID PMINDI ↗» ikke knækker. Teksten omkring dem må stadig skifte linje. KID-parentesen med ISIN, SRI og dato holder sammen på én linje. «tabe penge» holder sammen i footeren og i embed.

På mobil er «Også i udkastet» chips med 44 px højde. Prikkerne mellem linkene vises ikke. Desktop er uændret. «← Fonden» er 44 px høj, så den kan rammes. På PMINDIAKK er «Sammenlign andelsklasser» en chip på 44 px under 640 px. På bred skærm er det stadig en linje.

`.scarce` og `.tm-svg` bliver page-local på vaerdikaeder. De er ikke løftet ud.

## Fra Claude lane-A · 2026-10-15 ~23:58 CEST (rum-pædagogik)
| Form | Brug | Status |
|---|---|---|
| Logaritmisk højdeskala (lodret SVG) | ISS, Starlink, Iridium, GPS, geostationær og Månen på én akse, LEO- og MEO-bånd, "rummets grænse ≈ 100 km". Etiketterne skubbes fra hinanden og er klikbare til leddet | ✅ rum-fanen |
| Ordbogs-kort (`<dl>` i `<details>`) | 10 rumbegreber med ◇-markør og "Se leddet"-link. Åben på desktop, foldet på mobil | ✅ rum-fanen |
| Gul citatlinje | Latens-forklaring (GEO ca. ½ sekund og LEO få hundrededele) som venstrekant-note | ✅ |

## Fra Claude lane-A · 2026-10-16 ~00:05 CEST (broer, faser, kvante)
| Form | Brug | Status |
|---|---|---|
| Bro-kort (⇄) beregnet fra data | Under hver kæde: op til 6 led-par, hvor kæden deler selskaber med andre kæder. Gult tal = antal fælles, 3 navne. Klik hopper til leddet i den anden kæde | ✅ vaerdikaeder.html, alle faner |
| Fase-trin med pil | Robotik-fanen: Mads' fase 1 → 2 → 3 som tre kort. Fase 3 har gul topkant, og citatet har gul venstrekant | ✅ robotik-fanen |
| Faglige bro-kort | Kvante-fanen: 4 kort (cloud, chipdesign, udstyr og Sådan tænker vi) mærket baggrund eller NDI | ✅ kvante-fanen |
| Kæde-indgangskort med ikon | vaerdikaede.html: "Fire andre kæder" med 🤖⚡🚀⚛, antal led og selskaber og "Start ved første led" | ✅ vaerdikaede.html |
| Før/nu-tegning (inline SVG) | Rum-fanen: to små raket-tegninger, "brugt én gang" (✕) og "lander og flyver igen" (stiplet bue), med pil imellem. Pilen drejer 90° på mobil | ✅ rum-fanen |
| Årsagskæde med stiplede kort | Rum-fanen: Genbrug → Flere ture → Satellitter i serie → Tjenester. Ikon i rund plet, gul pil mellem kortene på desktop, og hvert kort åbner sit led. NDI-tallet står i en separat linje med cyan NDI-mærke | ✅ rum-fanen |
| Robot-ordbog (⚙) | Robotik-fanen: 9 ord i samme gitter som rum-ordbogen, men med tandhjul i stedet for ◇. "Edge-AI" hopper til AI-kædens led for fysisk AI | ✅ robotik-fanen |
| Strøm-rør (flowlist) | Energi-fanen: 5 stationer forbundet af et gult-til-cyan "rør" (lodret på mobil, vandret på desktop). Stationer med NDI-pres har en gul topkant og et gult "NDI · pres"-mærke med kilde. Lagring har et dæmpet "NDI · nævnt"-mærke | ✅ energi-fanen |
| Energi-ordbog (⚡) | Energi-fanen: 13 ord i samme gitter som de andre ordbøger, med ⚡ som markør. "Væskekøling" hopper til AI-kædens datacenterled | ✅ energi-fanen |
| Tidshorisont (inline SVG) | Kvante-fanen: stiplet akse 2025 til ca. 2045 med cyan prik ("udsagnet, jan. 2025") og en gul stiplet cirkel med "?". Udsagnet står som gengivet med navn, dato og kilde, ikke i citationstegn | ✅ kvante-fanen |
| Lær-link i kæde-kort | vaerdikaede.html: hvert af de fire kort har en ekstra linje under en stiplet streg (🚀 ⚡ ⚙ ⏳), der deep-linker til fanens forklaring | ✅ vaerdikaede.html |

## Fra Claude lane-A · 2026-10-16 ~00:23 CEST (flodkort)
| Form | Brug | Status |
|---|---|---|
| Flodkort (inline SVG, to retninger) | AI-fanen: de 13 led som nummererede stationer på en bugtet flod (gul ved energi, cyan ved efterspørgslen). Dæmninger som gule bjælker med "1./2./3. flaskehals", halvlederne i en stiplet boks, åbne led med stiplet ring og kilde-led i cyan. Hvid stiplet strøm flyder fra agenter mod energi (slås fra ved reduced motion). Vandret på desktop, lodret med undertekst på mobil (skifter ved 760 px). Hver station åbner sit led | ✅ vaerdikaeder.html, AI-fanen |
| Pres-mærke på led-kort | Alle 13 AI-led har en lille mærkelinje (gul, gul kontur, dæmpet eller cyan) med NDI-kilde eller "(vores tolkning)". Samme mærke på vaerdikaede.html | ✅ begge sider |

## lane-A · 2026-10-16 ~01:20 CEST · rum: satellittens rejse
- Ny form på vaerdikaeder (rum-fanen): **trinvis fortælling med scene**. En SVG viser seks stationer fra jorden op i lavt kredsløb og en gul markør, der glider mellem trinene. Under scenen er der runde ikon-knapper (tablist med piletaster og Home/End), et kort pr. trin og knapperne Forrige/Næste (sidste trin: ↺ Forfra). En stiplet gul pil fra "udskiftes" tilbage til "samles" viser, at kæden er en løkke.
- AI-flodkortet har fået et stiplet "sidespor"-kort med ikon (⏳) til kvante. Det er en anden form end bro-kortene.
- Alt er page-local CSS (trip-*, rv-side). ndi.css er ikke rørt.

## lane-A · 2026-10-16 ~01:45 CEST
- Energi-strømvej: hver station har nu en stiplet "↻ Det ændrer sig"-linje i cyan under pres-mærket, så kortet læses i tre lag (hvad, pres, skift). Kun sidens egen CSS (`.ef-s`).
- Kvante-ordbog med ⚛ i cyan som ord-ikon (rum bruger ◇, energi ⚡, robotik ⚙), så hver kædes ordbog har sit eget mærke.

## lane-A · 2026-10-16 ~00:55 CEST · rum: hvordan tjener kæden penge
- Ny form på rum-fanen (`#sp-money`): **tre betalingsspor side om side** (én gang, løbende, endnu tidligt). Hvert spor har sin egen farve i topkanten (brand, cyan, stiplet grå), et rundt ikon (🧾 🔁 ⏳) og en lille SVG-skitse af betalinger over tid: én høj søjle, en række små søjler og stiplede tomme søjler med "?". Under står led-knapper som piller med ikon og antal, og de åbner leddet. Det er en stiplet gul "⇄"-boks, der binder sporene sammen og linker til satellit-rejsen.
- Skitserne er mærket "en skitse, ikke tal" i noten.
- vaerdikaede.html: kæde-kortene har fået en tredje, dæmpet linje "◇ Ordbog: N ord →".
- Kun sidens egen CSS (`.mn-*`, `.oc-gl`).

## lane-A · 2026-10-16 ~00:45 CEST · rum: usikkerheder og læse-rute
- **Usikkerheds-kort med kæde-strimmel** (`#sp-risk`): gul venstrekant på hele sektionen, ikon i en let drejet gul firkant (ikke rund som penge-sporene), og under teksten en strimmel med de syv led som små cirkler, hvor de ramte led lyser gult med glød. Det er en ny form: man ser *hvor* i kæden noget rammer uden at læse.
- **Læse-rute** (`#sp-route`): vandret række af nummererede stop med ikon og undertekst, der ruller vandret på mobil.
- Kvante-horisont: stiplet cyan "⤳"-boks med hop til AI-floden.
- Kun sidens egen CSS (`.sp-route`, `.risk`, `.rk-*`, `.q-river`).

## lane-A · 2026-10-16 ~00:51 CEST · energi: usikkerheder
- Energi-usikkerheder genbruger rummets gule kort, men strimlen er en **strømvej**: afrundede firkanter i stedet for cirkler, "›" som forbindelse i stedet for streg og et dæmpet "→ datacenter" i enden. Så kan man se forskel på rumkæden (op i højden) og energikæden (frem mod datacentret).
- vaerdikaede.html: kæde-kortene har fået en "⚠"-linje ved siden af ordbogens "◇".
- Kun sidens egen CSS (`.rk-strip.flow`, `.e-pane .risk h3`).

### lane-A · 2026-10-16 · rum: højdebånd og tjek dig selv
- **Højdebånd** (`#sp-bands`): lodret tidslinje-agtig liste med runde ikon-nåle på en brand-farvet akse, vist fra Månen øverst til jorden nederst (`column-reverse`, så DOM-rækkefølgen stadig går nedefra og op). Hover eller fokus på et bånd tænder LEO, MEO eller GEO på højdeskalaen ved siden af. Ny form i forhold til kortgitre og strimler.
- **Tjek dig selv** (`#sp-quiz`): spørgsmålskort med svarknapper, ✓ i cyan og ✗ med stiplet kant, og en gul forklaringslinje med link. Første interaktive element på siden, der giver feedback. Kun lokal CSS i vaerdikaeder.html.

### lane-A · 2026-10-16 · energi: tjek dig selv
- **Tjek dig selv** (`#e-quiz`) på energi-fanen genbruger rum-quizzens form (svarknapper, ✓/✗, gul forklaringslinje), så læseren genkender mønstret på tværs af kæder. Svar-linket åbner leddet direkte (elnet, lagring, atomkraft). Ingen ny CSS ud over scroll-margin for de nye ankre.

- Kvante-fanen (lane-A, 2026-10-16): lodret termometer-SVG på logaritmisk skala med boble i bunden og varm-til-kold-gradient. Etiketter skubbes fra hinanden med skrå hjælpelinjer, så helium og det tomme rum kan læses selvom de ligger tæt. Ved siden af står en nummereret årsagskæde i cirkler og en stiplet gul strøm-boks. Formen er ny på siden, og den er kun lavet med lokal CSS i vaerdikaeder.html.

- Robotik-fanen (lane-A, 2026-10-16): cirkulær løkke-SVG "Sanse, tænke, handle, lære" med fire klikbare knuder rundt om en robot i midten og gule pile langs ringen. Det er den første cirkelform på siden (de andre er strimler, skalaer og lister). Hover eller fokus på et kort fremhæver samme knude i løkken og omvendt. Genvejs-piller øverst i fanen og "Hvad kan gå galt?"/"Tjek dig selv" genbruger rum- og energiformen. Kun lokal CSS i vaerdikaeder.html.
- 2026-10-16 lane-A: AI-floden fik mini-flod over 13 led i usikkerhedskortene (mindre prikker og bølge via nth-child, ingen ændring i delt CSS).
- 2026-10-16 lane-A: energi-ledkortene fik en "Hvor i strømvejen"-strimmel med fem afrundede firkanter, hvor leddet selv står som en større gul firkant uden link og de andre trin er dæmpede links. Det giver hvert ledkort en placering i helheden, som ellers kun findes i oversigten. Kun lokal CSS i vaerdikaeder.html.

- **Kvante: modenhedstrappe (`#q-lad`, lane-A 2026-10-16).** Fem trin som en trappe, hvor søjlerne under kortene stiger mod højre på desktop. På mobil bliver det til en trappe nedad med indrykning. Status vises med farve og streg: cyan fuld = vist, gul = i dag, stiplet = undervejs eller ukendt. Det er en ny form på siden, som ikke ligner flod, ring eller termometer. Kvantes "Hvad kan gå galt?"-strimmel går på tværs af kæder, og prikker i en anden kæde har stiplet kant (`.rk-strip a.xc`, page-local).
- **Rum: trådediagram (`#sp-web`, lane-A 2026-10-16).** To søjler (rum-led til venstre, led i andre kæder til højre) bundet sammen af bløde kurver i hver kædes farve: AI cyan, energi gul, robotik lilla og kvante grøn. Tråden med kilde (compute i rummet) er stiplet. Hover eller fokus på et kort, en tråd eller en knude dæmper resten og fremhæver tråden og begge ender. Kortene har en farvet venstrekant i målkædens farve. Det er den første tosøjle-/bipartite-form på siden. Kun lokal CSS i vaerdikaeder.html.
- **Rum: "Leddet i rum-fanen" på ledkortene (lane-A 2026-10-16).** En lille rejse-strimmel i 6 trin med ↺ i enden (rejsen starter forfra), hvor leddets trin lyser gult, og under den piller, der hopper til penge, usikkerheder, tråde og højde. Når man lander, får de kort, der handler om leddet, en gul kant med to pulser (ingen puls ved reduced motion). Det er første gang, siden peger tilbage fra et led ind i sine egne forklaringer, så ledkortet bliver et knudepunkt og ikke en blindgyde. Kun lokal CSS (`.sp-hub`, `.mk`).
- **Alle faner: "Find leddet igen" på ledkortene (lane-A 2026-10-16).** Rum-fanens knudepunkt er nu på alle 22 ledkort i AI, energi, robotik og kvante. Pillerne fører til leddets plads i floden (kun AI), usikkerheder, quiz og ordbog og til tråde fra rummet og broer fra kvante. Krydshop til en anden fane lander med gul kant på netop det kort, der handler om leddet. Rum-fanens piller har også fået quiz og ordbog. Ordbogsord, quizspørgsmål og kvantebroer bærer nu `data-lks`, så `.mk` virker der. Kun lokal CSS (`.f-hub`).
- **Energi, robotik og kvante: "Kort fortalt" øverst på ledkortet (lane-A 2026-10-16).** En lille boks med to rækker og runde ikoner: ⚙ "Gør" (hvad leddet laver, med et udsagnsord) og en pres-række, hvis ikon og venstrekant viser niveauet: gul fuld med "!" = NDI har skrevet om pres, gul stiplet med ⏳ = endnu tidligt, ✎ = nævnt, cyan ➜ = næste fase, grå "·" = intet mærke. Hver pres-række har mærket NDI, baggrund eller vores tolkning og en kilde, når der er en. Leddet kan læses på fem sekunder, før man går i dybden. Kun lokal CSS (`.vc-brief`, `.vb-row`). Data i `links[].brief`.
- **Rum: "Kort fortalt" med pengespor (lane-A 2026-10-16).** Rum-ledkortene har fået samme boks, men anden række hedder "Penge" og bruger pengesporets eget ikon: 🧾 én gang (grå), 🔁 løbende (cyan) og ⏳ endnu tidligt (gul stiplet). Ikonet går igen i pillen "Betales én gang" længere nede på kortet og i "Hvordan tjener rumkæden penge?", så øjet kan følge sporet fra kort til forklaring. Nabo-leddet luftfart har rækken "Venter på". `briefBox` tager nu et valgfrit ikon (`why.i`). Kun lokal CSS.

- 2026-10-16 lane-A · vaerdikaeder.html rum-fanen: stop-bjælke med ni fremskridtsprikker (læst cyan, her gul) og "Næste"-pille nederst i hvert stop. Ruten øverst markerer "du er her" og læste stop. Kun lokal CSS (`.sp-next`).
