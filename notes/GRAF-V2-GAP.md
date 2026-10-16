# graf-v2 → NDI Analytics: gap-liste (07:35-opgaven, read-only)

Opdateret 16. okt. 2026 kl. ca. 07:55 CEST. graf-v2 og live-siden er ikke ændret. Der er kun læst offentlige sider og filer.

## Hvad jeg kunne se
- https://www.newdealinvest.dk/graf-v2 er en Wix-side. Den har et head-script ("Kun Graf v2 – højde og navigation"), der lytter efter postMessage `ndi-v2-height`/`ndi-v2-scroll` og sender `ndi-v2-measure` til en iframe med titlen "NewDeal Invest – graf v2".
- **Den offentligt renderede side indeholder ingen graf-iframe.** Jeg prøvede headless og headed Chromium, desktop-UA og scroll (5 forsøg). Brødteksten er kun menu, kontaktformular og footer. Wix' HTML-komponent har altså ingen src i den publicerede version 516, eller også loader den ikke for ukendte klienter. Iframe-src'en kunne derfor ikke findes uden at logge ind i Wix, og det har jeg ikke gjort.
- Datahosten `ndigrafdatab5174313.blob.core.windows.net/graph/` peger via `latest.json` på release `59bd88d8…` (asOf 2026-10-15, validated). Det er portefolje-modellens graf ("NewDeal Invest – afkast og portefølje"), og den deler stack og data med graf-v2. Featurelisten nedenfor bygger på den release (production-embed.js, refinement.js, highs.js, evidence.js, review.js, data.json) plus den oprindelige graf-v2-spec i UX-krav (G2: Nasdaq-100 TR, stiplet linje + label).
- Releasen indeholder **ingen Nasdaq-serie**. Nasdaq-funktionen i graf-v2 er derfor kun kendt fra spec/Christian, ikke fra kode jeg har kunnet læse.

## Features og status
| # | graf-v2-feature | Vi har | Værdi | Handling |
|---|---|---|---|---|
| 1 | Nasdaq-100-sammenligningslinje (stiplet, indekseret til samme start) | **Ja (nu)** | Høj, Christians beslutning | Tilføjet 07:46 (76b0e7d). Valgfri, slået fra som standard, URL `cmp=nasdaq`, rebaseret til periodens start, med den præcise label |
| 2 | Perioder 1 md / 3 mdr / ÅTD / 1 år / Siden start | Delvis | Mellem | Vi har Siden start, ÅTD og kalenderår. 1 md/3 mdr er bevidst udeladt (FO/compliance: ingen kortperiode-fremhævning). Ikke ændret; spørgsmål til Christian/Mads |
| 3 | Toggle Totalafkast ↔ Kurs | **Ja (nu)** | Mellem, forklarer udbyttefald | Tilføjet. URL `visning=kurs`, med forklarende tekst |
| 4 | Udbyttemarkør "U" på ex-dato | **Ja (nu)** | Mellem | Tilføjet. Lodret stiplet linje + U, tooltip med beløb pr. andel (PMINDI 2025-01-22 38,9 kr., 2026-01-20 38,0 kr.) |
| 5 | Tooltip ved træk/hover + piletaster ("Træk hen over grafen, eller brug piletasterne") | **Ja (nu)** | Mellem (a11y) | Mus havde vi i forvejen. Tilføjet touch, ←/→ (Shift = 20 dage), Home/End og cursorlinje |
| 6 | Klassevælger PMINDI / PMINDIAKK | Ja | Høj | AKK uden kursserie til 5. dec. 2026 (compliance) |
| 7 | Periodeafkast-tekst under grafen ("Totalafkast: x %") | Ja | Mellem | `#chart-takeaway` |
| 8 | "Hvis du investerede 100.000 kr." (ved klassens start, geninvesteret udbytte) | Mangler | Mellem-høj for private, men compliance-følsom | Ikke tilføjet. Kræver FO-godkendelse af illustrativ beregning |
| 9 | Drawdown-graf + "fem dybeste nedture" markeret | **Ja (nu)** | Mellem | Vi har drawdown.html og top/bund-markører. De fem dybeste som liste mangler |
| 10 | Rullende 12-måneders afkast ("Hvad gav en investering de foregående 12 måneder?") | **Ja (nu)** | Mellem | Kandidat til næste tilføjelse |
| 11 | Årsafkast-tabel fra Fundmarkets årsrapport + "evidence"-note | Ja (kalenderår) | Mellem | Kildenote kan skærpes |
| 12 | Top-10 / spredning, sektorring | Ja (Portefølje) | Høj | Snapshot ≤ 2026-06-01 |
| 13 | 52-ugers-højeste-fordeling (highs.js) | Mangler | Lav-mellem | Bruger aktiekurser pr. aktie, compliance-tvivl. Udeladt |
| 14 | Kort over hovedsæder (geography.json) | Delvis | Lav | Vi har landeliste/tema |
| 15 | Datafriskhed ("ikke realtid", >3 dage gammel advarsel) | **Ja (nu)** | Mellem | Vi viser "pr. dato". Stale-advarsel mangler |
| 16 | PRIIP-KID-dokumentplade | Ja | Høj | Footer + risici |
| 17 | Auto-højde/scroll via postMessage til Wix | Ja (embed/chart.html) | Lav | Ikke relevant for Pages |
| 18 | Eksport/CSV/PNG af grafen | Ikke set i graf-v2 | Lav | Vi har Print/PDF og CSV i Udforsk |

## Hvad der er tilføjet (rækkefølge)
1. Nasdaq-100-sammenligningslinje + label + precheck/smoke-regler (76b0e7d)
2. Kurs/Totalafkast-toggle
3. Udbytte-U-markører
4. Touch- og tastatur-tooltip med cursorlinje (d24c675)
5. Rullende 12-mdr., 5 dybeste fald, datafriskhed-advarsel >3 dage (4b67fa6)

## Nasdaq-serie: metode
`docs/data/nasdaq-compare.json`: Nasdaq-100 **kursindeks** (^NDX, uden udbytte), omregnet til DKK med DKK=X-dagslukkekurs, kun på fondens handelsdage (766 punkter, 2023-09-22 → 2026-10-14). Kilde: Yahoo Finance. Et total return-indeks (^XNDX) var ikke tilgængeligt. Legenden siger det eksplicit. **Åbent spørgsmål:** skal det være Nasdaq-100 TR (fair over for fondens totalafkast), og må Yahoo bruges som kilde i markedsføring (Fundmarket-godkendelse)?

## Tests
- precheck har 4 nye regler: Nasdaq kræver præcis label, er slået fra som standard, kaldes aldrig benchmark, og serien er velformet.
- smoke: 27 URL × 2 bredder + Nasdaq-tjek (fra = ingen linje, til = 1 linje + synlig label) = 58/0 (inkl. rullende/top-5-tjek).
