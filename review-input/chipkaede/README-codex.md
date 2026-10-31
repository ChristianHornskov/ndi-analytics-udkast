# Chipkæden: ny version af "Sådan bliver en chip til"

Erstatter sektionen `<section id="cq-kaede">` på `v19-review/temaer/chips.html` (bygget og testet mod origin/main 5612ea1e).

## Filer

- `chipkaede.html`: hele sektionen (SVG-scene, mobilliste, panel og data som JSON). Indsættes i stedet for `<section aria-labelledby="cq-ch-h" class="cq-ch" id="cq-kaede">...</section>` inde i `.v5f.v5f-chips`.
- `chipkaede.css`: læg i `v19-review/assets/chipkaede/` og link i `<head>` efter `chips.css` og `review.css`.
- `chipkaede.js`: læg samme sted og indlæs med `defer` sidst i `<body>`.
- `data.json` og `build.py`: kilden. Kør `python3 build.py` for at generere `chipkaede.html` igen, hvis tekster, selskaber eller andele ændres. Data er trukket direkte ud af den nuværende sektion (tekster, selskaber, logoer, beskrivelser og bjælkebredder).

## Opførsel

- Bred (komponenten mindst 960 px bred): isometrisk scene. Søjlehøjden følger andelen af temaet (samme tal som bjælken i dag). Peg, fokus eller tryk på en søjle vælger trinnet: søjlen løftes og lyser, lampen flytter sig derhen, ledningsbanerne tændes frem til trinnet, og panelet nedenunder viser tekst og selskaber. Valget bliver stående, når musen forlader scenen, så man kan gå videre til selskaberne.
- Selskaber: peg, fokus eller tryk viser beskrivelsen. Over 8 selskaber vises "Vis alle n".
- Smal (komponenten under 960 px, dvs. mobil, tablet og desktop med sidemenu under ca. 1300 px): scenen skjules, og trinnene står som en lodret liste med andelsbjælke. Panelet åbner under det valgte punkt.
- Tastatur: Tab til et trin, piletaster, Home og End flytter, Enter eller mellemrum vælger. Søjlerne har `role="button"`, `aria-pressed` og en fuld `aria-label`.
- Links til et trin virker stadig: `#cq-ch-p-<slug>` (bruges af X-opslagene på siden) og `#ck-trin-<slug>` vælger trinnet.
- Lyst og mørkt tema følger `:root[data-tema]`. `prefers-reduced-motion: reduce` slår overgange fra. Skiftet mellem bred og smal styres af en container query (`container: ck / inline-size`) og en ResizeObserver, ikke af viewporten, fordi sidemenuen gør indholdet smallere end skærmen.

## Forhold til eksisterende kode

- `assets/v5-temaer/chips.js` gør ingenting, når `#cq-kaede` mangler (kontrolleret). Den kan blive stående. Ønsker I at rydde op, er det blokkene for `cq-kaede` i chips.js og `.cq-ch`-reglerne i chips.css, der ikke længere bruges.
- Siden tvinger `font-weight: 500 !important` på overskrifter, knapper og SVG-tekst. Komponenten bruger derfor 500 overalt.
- Ingen ændringer i fælles filer.

## Testet

Chrome 153 (Playwright) mod en lokal kopi af v19-review: 390, 800, 1024 og 1440 px i lyst og mørkt tema, mus, tastatur (fokus, pile, End), tryk på mobil, hash-links til husker, "Vis alle 17", ingen JS-fejl, ingen vandret rul ved 390 px.

Ikke testet: Safari og Firefox, rigtige telefoner, skærmlæser, og samspil med andre ændringer, Codex har lavet på chips.html efter 5612ea1e.
