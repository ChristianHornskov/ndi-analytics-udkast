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

## Drawdown (lane D)

Siden må ikke være fire ens kort plus to mørke kasser. Formerne skifter ned ad siden.

| Form | Hvad den viser | Status |
|---|---|---|
| Hero-tal | Det ene dybeste fald, med datoer og genopretning | ✅ `.hero-stat` |
| Rolige tal | Middel og median som to linjer, ikke kort | ✅ `.quiet-stats` |
| Gul annotation | Hvor serien ligger under vand i dag | ✅ `.anno` |
| Underwater | Tid. Gul prik = dybeste bund. Ring = seneste dag. Slider vælger en dag | ✅ `.figure` + `.uw-scrub` |
| Prikfordeling | Hvorfor middel ligger dybere end median | ✅ `.figure.plain` |
| Episodeliste | De fire fald dybere end 10 %, med varighed. Klik hopper til bunden på kurven | ✅ `.ep-ledger` |
| Årssøjler | Kalenderafkast som small multiples, link til periode | ✅ `.year-rail` |

Et plus-år kan rumme det dybeste fald. 2025 er eksemplet i copy, regnet fra serien.

## Sammenlign

Kortpar (to klasser), tidslinje uden panel, stort tal for overlap, ét panel med parvise temasøjler. Ikke tre `.panel` i træk. Krydslink til drawdown overlever, når siden er hentet.

## Embed

Widgetten er ét panel. Call-to-action står udenfor, med link til største fald (AKK-teksten siger, at drawdown vises efter 12 måneder). Sætningen "Fonden har intet fast benchmark." er en rolig linje. Nasdaq-klasser er fjernet fra embed-CSS.

## Fælles tokens i `ndi.css` (sparsomt)

`--ink`, `.figure`, `.figure.plain`, `.anno`, `.hero-stat`, `.quiet-stats`, `.ep-ledger`, `.year-rail`, `.h-section`.

`.scarce` og `.tm-svg` bliver page-local på vaerdikaeder. De er ikke løftet ud.
