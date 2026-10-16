# UX-inspiration til NDI Analytics

**Formål:** Studere detaljerne i verdens stærkeste apps og datasider, så vi kan tænke ud af boksen inden for Jespers stil — uden at erstatte den.

**Kontekst:** NDI Analytics er et klikbart udkast for New Deal Invest: https://christianhornskov.github.io/ndi-analytics-udkast/. Brugere: private investorer (også ældre), family offices og analytikere.

**Jespers stil (ramme, ikke til forhandling):** mørk, rolig palet — teal `#89aeb4`, gul `#f5ee9e` (sparsomt: én accent pr. skærm), baggrund `#050a0f`, tekst `#e6e8ed`, flader/linjer `#313a4a`. Jesper ejer designet; forslagene skal passe ind.

**Rammer for forslag:**
- ingen prognoser eller kursmål
- risikoadvarsler og historisk-afkast-tekst bevares
- gamle eller manglende data skjules ikke
- ingen ÅOP- eller ESMA-forslag

**Metode:** Kun observationer fra sider og artikler, der faktisk er hentet (se kildeliste). Intet er opfundet. Lokale noter i `/workspace/ux/` er brugt som baggrund.

---

## Top 5 (mest handlingsrettede)

1. **Én synlig pointe under hver graf (Stripe + OWID).** Stripe-dashboardet holder hierarki med store nøgletal og små kontekstlinjer; OWID skriver en kort tekstpointe over/ved grafen og linker til kilde. NDI: under fondsgrafen altid én sætning i `#e6e8ed` ("Fonden steg X % siden … pr. dato") plus den eksisterende risikoadvarsel — aldrig erstat advarslen.

2. **Tabular numerals + "pr. dato" på hvert tal (Linear/Vercel + iShares-mønster fra videnbase).** Linear og Vercel kræver tabular nums til sammenlignelige tal; fonds-benchmarks sætter "as of"/dato på næsten hvert nøgletal. NDI: alle afkast, NAV og vægte i tabeller med `font-variant-numeric: tabular-nums` og synlig "pr. [dato]" i muted `#89aeb4` eller sekundær tekst — gamle tal markeres, aldrig skjules.

3. **Vercel-agtig bevægelse, ikke Linear-bounce (DesignMD + Apple HIG).** DesignMD: fintech med bouncy springs skaber angst; Vercel bruger korte, rolige `ease-out`-overgange (ca. 150–250 ms) og stilhed som signal om tillid. Apple: motion skal kunne undværes og ikke være eneste feedback. NDI: periode-skift og filter-opdateringer med kort fade/opacity på `#050a0f`-flader; respektér `prefers-reduced-motion`; ingen bouncing på penge-UI.

4. **Tre døre + progressiv disclosure (Things + Robinhood + UX-krav).** Things gemmer detaljer, indtil man åbner en opgave; Robinhood bruger cards med lidt info først og dybde ved tap. NDI Analytics’ tre døre (Fonden / Porteføljen / Udforsk) er den rigtige first-screen: én klar handling pr. dør, detaljer bag næste klik — især for ældre private investorer.

5. **Kilde, metode og huller synlige (OWID + FT).** OWID viser kilde, "Learn more about this data", last updated og næste opdatering; FT Visual Vocabulary vælger diagramtype efter relation og advarer om misleading skala. NDI: ved hver graf/tabel kilde + dato; manglende eller forsinkede data får eksplicit tom/ældre-tilstand (ikke blank flade) inden for `#313a4a`-paneler.

---

## 1. Typografi

### 1.1 Hierarki via størrelse og vægt — ikke via farve (Stripe)
- **Hvad/hvor:** Stripe Dashboard Design Breakdown (925 Studios): 6 størrelser/vægte; primære nøgletal er størst og tungest, støttetal mellem, labels mindst/lettest. Hierarki bygges med typografi og whitespace, ikke farve. stripe.design: Söhne med lette display-vægte (ofte 300) og negativ tracking på store headings (fx heading-1 48px, tracking −0,96px).
- **Hvorfor:** Finansdata under stress skal kunne scannes; farve spares til status.
- **NDI:** På Fonden: ét stort tal (fx ÅTD eller "siden start") i `#e6e8ed`, under det periode + "pr. dato" i mindre teal/sekundær. Gul `#f5ee9e` aldrig til body-tekst — kun til én accent (aktivt filter, "i porteføljen").

### 1.2 Tæt tracking på overskrifter, ro på brødtekst (Linear)
- **Hvad/hvor:** Linear redesign-post: Inter Display til headings, regular Inter til resten. DesignMD: tight letter-spacing på headings signalerer præcision; løs tracking læses dekorativt.
- **Hvorfor:** Hurtigere horisontal scanning; "professionelt værktøj"-signal til analytikere uden at skræmme private investorer, hvis brødtekst forbliver rolig.
- **NDI:** Lidt tættere tracking på H1/H2 i Jespers font-stack; brødtekst og forklaringer med normal tracking og generøs line-height (Apple tips: øg line height/letter spacing ved overlap — undgå sammenklemt tekst for ældre).

### 1.3 Tabular numbers overalt, hvor tal sammenlignes (Linear, Vercel Geist)
- **Hvad/hvor:** Linear: tabular nums til issue-ID’er, så kolonner ikke "hopper". Vercel Web Interface Guidelines: `font-variant-numeric: tabular-nums` eller mono (Geist Mono) til sammenligninger. Geist typography: label-13 med tabular til tal.
- **Hvorfor:** Beholdningstabeller og afkastkolonner bliver læsbare ved scroll.
- **NDI:** Screener, porteføljetabel og graf-tooltips: tabular nums. Procent og DKK i samme kolonnebredde.

### 1.4 System-tekststilarter og minimumsstørrelse (Apple)
- **Hvad/hvor:** Apple UI Design Dos and Don’ts: tekst mindst 11 pt; kontrast mellem font og baggrund; touch targets mindst 44×44 pt.
- **Hvorfor:** Ældre private investorer og mobil; NDI’s WCAG-krav (videnbase) kræver også ≥4,5:1 for tekst.
- **NDI:** Ingen labels under ca. 12–13 px på mobil; periodeknapper og filtre ≥44 pt hit-area (visuel knap kan være mindre, hit-area udvides — Vercel guidelines: visual &lt;24px → hit ≥24px; mobil 44px).

### 1.5 Mono til metadata, ikke til storytelling (Vercel Geist)
- **Hvad/hvor:** Geist: mono til labels, kode, tabular; copy-klasser til flerlinjet tekst med højere line-height end labels.
- **Hvorfor:** Adskiller "system" (ISIN, dato, kilde) fra "fortælling" (hvorfor NDI ejer).
- **NDI:** ISIN, "pr. dato", datakilde i lidt smallere/mono eller muted teal; "Hvorfor ejer vi den?" i normal copy `#e6e8ed`.

---

## 2. Rytme og whitespace

### 2.1 Flat, mindre "card chrome" (Stripe dashboard-historie)
- **Hvad/hvor:** Config 2021 / 925-genfortælling: Stripe gik fra tunge cards med skygger til flat UI — sektionstitler, grafer i fuld bredde, mindre støj. stripe.design: 4px spacing-grid (2–24px-skala).
- **Hvorfor:** Data får fokus; ro og tillid.
- **NDI:** `#313a4a`-paneler med tynde kanter, ikke tunge skygger på mørk `#050a0f`. Ét panel = én opgave. Undgå tre ens paneler i træk (jf. VISUAL-VARIETY.md).

### 2.2 Alignment man mærker, ikke ser (Linear)
- **Hvad/hvor:** Linear redesign: labels, ikoner og knapper i sidebar/tabs aligned lodret og vandret — "something you’ll feel after a few minutes". Mindre chrome, mere content; kontrast øget (tekst lysere i dark mode).
- **Hvorfor:** Professionelt ro uden ekstra dekoration.
- **NDI:** Periodeknapper, fond-toggle og filter-chips på samme baseline; ikoner og tekst i filtre optisk aligned. Teal til outlines, ikke til store fyldflader.

### 2.3 "Sheet of paper"-fokus (Things)
- **Hvad/hvor:** Cultured Code: åben to-do bliver et klart hvidt papir; detaljer (tags, checklist, dato) er tuck’et væk, indtil man behøver dem. WIRED: "clean, crisp piece of paper"; whitespace og skjulte menuer; aldrig overbearing.
- **Hvorfor:** Reducerer kognitiv load for ikke-eksperter.
- **NDI:** Selskabsside: først problem + rolle i porteføljen (2–3 linjer); nøgletal og X/nyheder under fold eller i sekundær sektion. På mørk baggrund: "papiret" = ét `#313a4a`-panel med luft indeni, ikke flere konkurrerende cards.

### 2.4 Luft mellem sektioner, tæthed i data (Vercel + Linear)
- **Hvad/hvor:** Linear: tæt UI (ofte ~13px body i analyser), men fokus-mode fjerner unødvendig chrome. Vercel: optical alignment ±1px; deliberate alignment til grid/baseline.
- **Hvorfor:** Analytikere vil have densitet; private investorer vil have vejledning — samme data, forskellig indpakning.
- **NDI:** Forside/entre: generøs sektion-luft. Screener/tabel: tættere rækker, men sticky header og zebra/hover i `#313a4a`-nuancer, så tætheden ikke bliver kaos.

### 2.5 Arc: "clean and calm" som produktløfte
- **Hvad/hvor:** arc.net: "Clean and calm, Arc shapes itself to how you use the internet."
- **Hvorfor:** Calm er et tillidssignal for værktøjer, man bruger længe.
- **NDI:** Undgå blinkende live-tickers og aggressive rød/grøn-floods (Robinhood bruger kraftig farveflood — se forbehold under mikrointeraktioner). Jespers rolige palet *er* allerede calm; bevar den.

---

## 3. Mikrointeraktioner

### 3.1 Immediate, ikke theatrical (Linear)
- **Hvad/hvor:** Linear redesign + DesignMD: animation bekræfter at noget *allerede skete*; hover snaps; menus uden bounce. Varigheder ofte 100–150 ms hover, op til ~350 ms view-change; springs kun hvor brugeren trækker.
- **Hvorfor:** Belønner eksperter; føles præcist.
- **NDI:** Filter/søg: liste opdateres med kort opacity-fade. Undgå lange intro-animationer på Fonden.

### 3.2 Restraint som tillid (Vercel)
- **Hvad/hvor:** DesignMD Linear vs Vercel: Vercel 150–250 ms, mest `ease-out`, næsten ingen springs; status skifter uden flourish. "Silence is the system." Fintech med bounce → angst.
- **Hvorfor:** Infrastruktur/penge: forudsigelighed &gt; delight.
- **NDI:** Primær motion-filosofi = Vercel-agtig. Behold Jespers ro; teal-outline-knapper får kun subtil border/background-transition (Stripe: ofte 0,3s `cubic-bezier(0.25, 1, 0.5, 1)` på color — kan lånes som *rolig* hover, ikke som bounce).

### 3.3 Motion valgfri og ikke eneste signal (Apple HIG Motion)
- **Hvad/hvor:** Apple HIG v25 Motion: purposeful motion; make motion optional; supplementér med andre cues; brevity; undgå motion på meget hyppige UI-handlinger; lad brugeren afbryde animation.
- **Hvorfor:** Tilgængelighed og ældre brugere; vestibular komfort.
- **NDI:** `prefers-reduced-motion: reduce` → øjeblikkeligt skift uden fade. Periodeaktiv markeres med gul accent *og* tekst/"valgt", ikke kun animation.

### 3.4 Loading uden flicker (Vercel guidelines)
- **Hvad/hvor:** Minimum visible time ~300–500 ms for spinner/skeleton; show-delay ~150–300 ms; skeletons spejler final layout; knapper beholder label under loading.
- **Hvorfor:** Hurtige svar skal ikke blinke; langsomme svar skal føles ærlige.
- **NDI:** Ved datahentning: skeleton i `#313a4a` med samme højde som graf/tabel; "Henter data…" (udkastet viser allerede denne tilstand) plus dato, når data lander.

### 3.5 Tooltip-timing og hit targets (Vercel + Apple)
- **Hvad/hvor:** Vercel: delay første tooltip i gruppe, ingen delay på peers; hit targets. Apple: 44 pt. NN/g (videnbase): tooltips ikke eneste kilde til kritisk info; touch = tap.
- **Hvorfor:** Graf-tooltips på mobil fejler ellers.
- **NDI:** Grafværdier også som synlig tekstlinje / datatabel-toggle; tooltip ved hover *og* fokus/tap.

### 3.6 Robinhood: farve som markedsstatus — med forbehold
- **Hvad/hvor:** Google Design case: grøn/rød til portfolio; fuld baggrundsskift open/closed market; cards expanderer fra origin; touch ripples ved følsomme felter.
- **Hvorfor:** Hurtigt overblik — men kraftig farveflood kan skabe FOMO og støj.
- **NDI:** **Lån ikke** full-bleed grøn/rød. Brug Jespers sparsomme gul til fokus; op/ned som fortegn + tekst ("+1,2 %") og evt. diskret teal/muted, ikke farve alene (WCAG: redundant cues — Vercel guidelines). Cards-mønstret (lidt info → dybde) passer til selskabskort.

---

## 4. Datavisualisering

### 4.1 Vælg diagram efter relation (FT Visual Vocabulary)
- **Hvad/hvor:** FT Interactive Visual Vocabulary (hentet poster-README + web): kategorier Deviation, Correlation, Change over Time, Ranking, Distribution, Part-to-whole, Magnitude, Spatial, Flow. Change over Time: linje er standard; vælg periode for kontekst; ved uregelmæssige data overvej markører. Stock price-type til OHLC. Advarer om dual axis og misleading skala; linker til diskussion om y-akse ved 0 (linjer må gerne ikke starte ved 0; søjler bør).
- **Hvorfor:** Forkert chart-type = forkert historie.
- **NDI:** Fond vs indeks = linje, samme basis (fx 100). Drawdown = deviation (fyldt area under 0 eller bar fra reference). Tema-vægte = magnitude/part-to-whole med forsigtighed (areal aflæses dårligt — videnbase/Tufte). Ingen prognose-fan charts.

### 4.2 Pointe først, så chart (OWID + Pudding)
- **Hvad/hvor:** OWID life-expectancy: korte bullet-pointes om hvad grafen viser, inkl. dips (famine, COVID) — huller og chok skjules ikke. Pudding "birthday effect": narrativ trin-for-trin; viser usikkerhed, sample size og metode åbent; "But…" som ærlig tvivl.
- **Hvorfor:** Tillid gennem transparens; ældre læsere får pointen uden at dekode akser først.
- **NDI:** Under fondsgraf: 1–2 bullets (afkast i perioden, største drawdown) + risikoadvarsel. Dårlige år synlige i kalender/fuld historik (UX-krav: ikke skjul).

### 4.3 Kilde, opdatering, download (OWID Grapher redesign)
- **Hvad/hvor:** OWID redesign-artikel: kilde prominent; "Learn more about this data"; download SVG/PNG/CSV; embed; chart/map/table views; fullscreen; social preview af *aktuel* konfiguration.
- **Hvorfor:** Genbrug og troværdighed; analytikere vil have data ud.
- **NDI:** "Kilde · pr. dato · Sidst opdateret" under grafer. SHOULD: CSV for beholdninger/tema (uden at love ESMA-dokumenter). Fullscreen-graf allerede relevant i udkastet — sørg for Tilbage lukker overlay (videnbase K26).

### 4.4 Sparklines og kontekst-sammenligning (Stripe + Tufte via videnbase)
- **Hvad/hvor:** Stripe home: få metrics + monochrome sparklines + forrige periode under tallet. Videnbase/Tufte: sparklines i tabeller reducerer recency bias.
- **Hvorfor:** "Er det godt?" besvares uden ekstra side.
- **NDI:** Ved nøgletal: lille sparkline i teal på `#050a0f` + "vs. forrige periode" som tekst — ikke som prognose. I porteføljeliste: mini-sparkline pr. selskab (IDESPEJDER-idé, nu design-belagt).

### 4.5 Small multiples vs. overlappende linjer (OWID settings)
- **Hvad/hvor:** OWID: "Align axis scales" vs. zoom pr. serie; small multiples som indstilling.
- **Hvorfor:** Min–max pr. serie ødelægger sammenligning (Tufte/videnbase).
- **NDI:** Fond vs Nasdaq-100: fælles akse. Ved mange temaer: small multiples frem for 8 linjer i én graf.

### 4.6 Koyfin: customizable density — NDI skal være opinionated først
- **Hvad/hvor:** koyfin.com: custom dashboards, advanced graphing, macro dashboards, themes. Positionerer sig som fleksibelt research-værktøj (også ift. Bloomberg i testimonials).
- **Hvorfor:** Power users elsker fleksibilitet; nybegyndere drukner.
- **NDI:** Level 1 = opinionated views (Fonden/Porteføljen/Udforsk), ikke tomt dashboard-byggerværktøj. Senere: gemte filtre i URL (allerede MUST i UX-krav).

### 4.7 Bloomberg / FT / NYT — begrænset direkte adgang
- **Hvad/hvor:** Bloomberg og FT.com blokerede/captcha ved hentning; NYT interactive/upshot utilgængelig (404/403). FT Visual Vocabulary og Chart Doctor-materiale via GitHub/raw **er** hentet. Benchmarks i `/workspace/ux/benchmarks.md` dækker iShares, Morningstar, Sparindex, Nordnet m.fl.
- **NDI:** Brug FT-vocabulariet + eksisterende videnbase; undlad at gætte på Bloomberg Terminal-UI.

---

## 5. Onboarding og first-run

### 5.1 Value før formular (Revolut case + revolut.com)
- **Hvad/hvor:** Craft Innovations: Revolut åbner med value proposition og konkrete benefits før tunge felter; progressive disclosure; compliance framed as choice; tydelig feedback på fejl. revolut.com: "Capital at risk" / past performance-advarsler ved investeringssektion.
- **Hvorfor:** Tillid før datafangst (NN/g K8 i videnbase: ingen gate før værdi).
- **NDI:** Ingen e-mail-mur for at se Analytics. Entre med tre døre = onboarding. Ved investerings-CTA: bevar risikoformuleringer som på udkastet ("Historisk afkast er ikke…").

### 5.2 Embedded checklist, ikke modal-storm (Stripe)
- **Hvad/hvor:** 925/Stripe: progress checklist i sidebar ("Activate…", "Set up payments…"); empty states med næste handling ("Make your first test payment"), ikke undskyldning.
- **Hvorfor:** Aktivering uden at afbryde exploration.
- **NDI:** Første besøg: diskret checklist i entre ("Se fondens udvikling → Åbn en beholdning → Læs datakilder") i `#313a4a`, lukbar. Empty screener-filter: "Ingen selskaber matcher — fjern filter X" med chip.

### 5.3 Kort, animeret orientering (Robinhood)
- **Hvad/hvor:** Google Design: swipe-cards, illustrationer, progress bar low-profile, kontekstuelle billeder ved bank-link.
- **Hvorfor:** Kompleksitet deles op.
- **NDI:** Én gang: 3 korte panels der forklarer dørene (Fonden/Porteføljen/Udforsk) med Jespers illustration-stil hvis den findes — ellers ren typografi. Skip altid synlig. Ingen gamification omkring afkast.

### 5.4 Things: power features opdages gradvist
- **Hvad/hvor:** Detaljer tuck’et væk; Quick Find ved at taste; Magic Plus for power users.
- **Hvorfor:** Ældre brugere får ro; analytikere får dybde.
- **NDI:** Avancerede filtre (multi-tag, drawdown-sort) synlige men sekundære; default er simple sortering + søg. Tastatur/søg for power users (URL-state allerede planlagt).

### 5.5 Notion: citations og "system of record"-følelse
- **Hvad/hvor:** notion.so/product: "Get answers, instantly—with citations"; capture knowledge i ét system.
- **Hvorfor:** Familiekontorer vil kunne spore *hvor* et tal kommer fra.
- **NDI:** Når NDI skriver en "take" eller forklaring: citér datakilde og dato inline (ikke kun i footer). Adskil fakta fra vurdering (IDESPEJDER "Bevis vs. vurdering").

---

## 6. Følelse og tillid

### 6.1 Specifik microcopy ved fejl og status (Stripe)
- **Hvad/hvor:** 925: ikke "Payment failed" men hvad der skete + hvad man gør nu; "Respond by [dato]".
- **Hvorfor:** Usikkerhed er angst i finans.
- **NDI:** Ved manglende kurs: "Kurs mangler pr. [dato] — vi skjuler ikke hullet" + næste skridt ("Se seneste tilgængelige" / "Skriv til …"). Ved forsinket update: "Data pr. [ældre dato] — opdatering forventes …" hvis kendt; ellers ærligt "ukendt".

### 6.2 Job-baseret navigation (Stripe)
- **Hvad/hvor:** Sidebar labels efter jobs (Payments, Payouts…), ikke interne datamodeller; global search på tværs.
- **Hvorfor:** Brugeren tænker i opgaver.
- **NDI:** Dørene er allerede jobs: "Se fonden", "Se hvad I ejer", "Udforsk tech". Undgå interne labels ("graf-v2", "PMINDI" uden forklaring). Forklar ISIN ved første møde.

### 6.3 Farvedisciplin = status betyder noget (Stripe + Jespers gul)
- **Hvad/hvor:** Stripe: farve til success/warning/error; ellers monokrom. Jespers regel: gul sparsomt.
- **Hvorfor:** Når alt er farvet, betyder intet noget.
- **NDI:** Gul = ét fokus pr. viewport. Teal = brand/interaktivt. Rød/grøn kun hvis nødvendigt for fortegn — altid med tekst. Flader `#313a4a`, aldrig rainbow-sektorer.

### 6.4 Upfront disclosure og aktualitet (videnbase K8 + benchmarks)
- **Hvad/hvor:** NN/g troværdighed; iShares/Sparindex "as of"; udkastets egen disclaimer allerede på plads.
- **Hvorfor:** Private investorer og compliance-forventninger.
- **NDI:** Behold og synliggør eksisterende advarsler. Intet forslag her ændrer ÅOP/ESMA. Eksterne KID-links forbliver tydelige (udkastet linker allerede PMINDI/PMINDIAKK).

### 6.5 Calm dark (Linear + Jespers `#050a0f`)
- **Hvad/hvor:** DesignMD: Linear’s dark er ikke ren `#000` — lidt varme til lange sessioner. Linear begrænsede "chrome"-farve for mere neutrált look.
- **Hvorfor:** Family offices og analytikere kan have lange sessioner.
- **NDI:** Jespers `#050a0f` er allerede nær-sort og rolig — undgå at tilføje kolde neon-accenter. Øg kontrast på body-tekst hvis `#e6e8ed` på flader falder under 4,5:1.

### 6.6 Monzo/Nubank-mønstre (via Craft Innovations): menneskelig compliance-tone
- **Hvad/hvor:** Case study: plain language, progress ("1 section down"), tid forventning ("usually 5 minutes…"), FSCS-agtig reassurance *når* det er relevant.
- **Hvorfor:** Ældre brugere reagerer på jargon.
- **NDI:** Ordliste-popovers for NAV, drawdown, modenhed (allerede i UX-krav). Tone: rolig dansk, ingen hype ("garanti", "sikker vinder").

---

## Tværgående: hvad NDI *ikke* skal låne

| Frastød | Grund |
|---|---|
| Robinhood full-bleed grøn/rød market mood | FOMO, støj, konflikt med Jespers palet |
| Linear spring-bounce på grafer/knapper | DesignMD: bounce i fintech = utryghed |
| Koyfin tomt DIY-dashboard som first screen | Overvældende for private investorer |
| Prognosebånd / kursmål-UI | Eksplicit forbudt i opgaven |
| Skjulte huller i serier | Forbudt; OWID viser dips med forklaring |
| ÅOP/ESMA-omskrivninger | Forbudt i denne note |

---

## Kildeliste (hentet 2026-10-15, Europe/Copenhagen)

### Hentet med indhold (brugt som belæg)

| # | Kilde | URL / sti | Metode |
|---|---|---|---|
| 1 | NDI Analytics-udkast | https://christianhornskov.github.io/ndi-analytics-udkast/ | WebFetch (begrænset JS-render) |
| 2 | Stripe marketing | https://stripe.com/ | WebFetch |
| 3 | Stripe design language study | https://stripe.design/ | WebFetch |
| 4 | Stripe Dashboard Design Breakdown | https://www.925studios.co/blog/stripe-dashboard-design-breakdown | WebFetch |
| 5 | Linear product | https://linear.app/ | WebFetch |
| 6 | Linear UI redesign part II | https://linear.app/now/how-we-redesigned-the-linear-ui | WebFetch |
| 7 | Linear design system breakdown | https://www.designmd.co/blog/linear-design-system-breakdown | WebFetch |
| 8 | Linear vs Vercel motion | https://www.designmd.co/blog/linear-vs-vercel-motion | WebFetch |
| 9 | Vercel marketing | https://vercel.com/ | WebFetch |
| 10 | Geist introduction | https://vercel.com/geist/introduction | WebFetch |
| 11 | Geist typography | https://vercel.com/geist/typography | WebFetch |
| 12 | Vercel Web Interface Guidelines | https://vercel.com/design/guidelines | WebFetch |
| 13 | Apple.com | https://www.apple.com/ | WebFetch |
| 14 | Apple UI Design Dos and Don’ts | https://developer.apple.com/design/tips/ | WebFetch |
| 15 | Apple HIG Motion (v25 mirror) | https://appguidelines.com/human-interface-guidelines/version/25/motion/ | WebFetch |
| 16 | Arc | https://arc.net/ | WebFetch |
| 17 | Robinhood Material Design case | https://design.google/library/robinhood-investing-material | WebFetch |
| 18 | Revolut UK | https://www.revolut.com/ | WebFetch |
| 19 | Banking onboarding (Revolut/Nubank/Monzo) | https://craftinnovations.global/banking-onboarding-best-practices-revolut-nubank-monzo/ | WebFetch |
| 20 | Koyfin | https://www.koyfin.com/ | WebFetch |
| 21 | FT Visual Vocabulary (web) | https://ft-interactive.github.io/visual-vocabulary/ | WebFetch |
| 22 | FT Visual Vocabulary README | https://raw.githubusercontent.com/Financial-Times/chart-doctor/main/visual-vocabulary/README.md | curl |
| 23 | Our World in Data home | https://ourworldindata.org/ | WebFetch |
| 24 | OWID Grapher life-expectancy | https://ourworldindata.org/grapher/life-expectancy | WebFetch |
| 25 | OWID Grapher redesign article | https://ourworldindata.org/redesigning-our-interactive-data-visualizations | WebFetch |
| 26 | The Pudding index | https://pudding.cool/ | WebFetch |
| 27 | Pudding: birthday effect | https://pudding.cool/2025/04/birthday-effect/ | WebFetch |
| 28 | Notion product | https://www.notion.so/product | WebFetch |
| 29 | Things features (Cultured Code) | https://culturedcode.com/things/features/ | WebFetch |
| 30 | WIRED on Things 3 | https://www.wired.com/2017/05/things-might-prettiest-list-app-ever/ | WebFetch |
| 31 | Lokal UX-videnbase | /workspace/ux/videnbase.md | Read |
| 32 | Lokal UX-tjekliste | /workspace/ux/tjekliste.md | Read |
| 33 | Lokal UX-benchmarks | /workspace/ux/benchmarks.md | Read |
| 34 | Lokal UX-kilder | /workspace/ux/kilder.md | Read |
| 35 | NDI UX-krav | /workspace/ndi-analytics/notes/UX-krav.md | Read |
| 36 | NDI VISUAL-VARIETY | /workspace/ndi-analytics/notes/VISUAL-VARIETY.md | Read |

**Antal eksterne URL’er med brugbart indhold:** 30  
**Antal lokale baggrundsdokumenter:** 6  
**I alt kilder med indhold:** 36  

### Fejlede eller ubrugelige hentninger

| Kilde | URL | Resultat |
|---|---|---|
| Bloomberg home | https://www.bloomberg.com/ | WebFetch timeout; curl → captcha/robot-check |
| Bloomberg markets | https://www.bloomberg.com/markets | curl HTTP 403 / robot-check |
| FT.com home | https://www.ft.com/ | curl HTTP 403 Security Verification |
| NYT interactive hub | https://www.nytimes.com/interactive/ | 404 |
| NYT Upshot | https://www.nytimes.com/section/upshot | 403 captcha |
| Pudding loneliness video | https://pudding.cool/2025/06/loneliness-video/ | 404 (forkert slug) |
| Apple HIG Typography | https://developer.apple.com/design/human-interface-guidelines/typography | WebFetch næsten tom (JS-shell) |
| Notion design blog (gættet URL) | https://www.notion.com/blog/designing-the-new-notion | Page not found |
| FT chart-doctor README via GitHub blob UI | https://github.com/ft-interactive/chart-doctor/blob/master/visual-vocabulary/README.md | Tom via WebFetch (raw curl virkede) |

### WebSearch brugt til at finde artikler (ikke belæg alene)
Søgninger efter Stripe/Linear/Apple/FT/Robinhood/Revolut/Things/Vercel/OWID ledte til URL’erne ovenfor; kun hentede sider er brugt som konkrete detaljer.

---

*Filplacering: `/workspace/ndi-analytics/notes/UX-inspiration.md` (ikke under `docs/`). Ingen kode er ændret.*
