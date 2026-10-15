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
