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

## Fra Claude lane-A · 2026-10-15 ~23:58 CEST (rum-pædagogik)
| Form | Brug | Status |
|---|---|---|
| Logaritmisk højdeskala (lodret SVG) | ISS, Starlink, Iridium, GPS, geostationær og Månen på én akse, LEO- og MEO-bånd, "rummets grænse ≈ 100 km". Etiketterne skubbes fra hinanden og er klikbare til leddet | ✅ rum-fanen |
| Ordbogs-kort (`<dl>` i `<details>`) | 10 rumbegreber med ◇-markør og "Se leddet"-link. Åben på desktop, foldet på mobil | ✅ rum-fanen |
| Gul citatlinje | Latens-forklaring (GEO ca. ½ sekund og LEO få hundrededele) som venstrekant-note | ✅ |
