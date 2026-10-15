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
5. ~~Året med det dybeste fald var umarkeret i søjlerne.~~ Lukket 00:17. 2025 har gul overkant og teksten "Dybeste fald". Søjlen er stadig årets afkast.
6. ~~Valgt dag var kun en lodret streg.~~ Lukket 00:20. En cyan prik sættes på kurven. Den skjules, når dagen allerede er den gule bund eller den gule ring, så de to mærker ikke dækkes.

### Pas på
- Ingen Nasdaq-kontrol i embed. Teksten er "Fonden har intet fast benchmark."
- Ingen per-aktie afkast. Tallene er fondens totalafkast-serie.
- `.scarce` og `.tm-svg` er ikke globale.
