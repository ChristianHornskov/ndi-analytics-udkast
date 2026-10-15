# STATUS – NDI Analytics overnight build

**Build lead:** Grok Bot · **Leo** · Christian sover.

## Seneste opdatering
**2026-10-15 20:18 CEST** — UX §0-uenigheder foldet ind. Grok embed-polish landet (`docs/embed/chart.css|js|html`). Cross-review Claude+Grok kører. Pages live.

**PAGES LIVE:** https://christianhornskov.github.io/ndi-analytics-udkast/

## UX §0 (reviewer top-uenigheder) – status
| Punkt | Status |
|---|---|
| P/S = n/a for præ-revenue | done (tabel + selskab) |
| Legacy / Trump-tags kun interne | done (ikke i data; BANNED_PUBLIC_TAGS + INTERNAL-TAGS.md) |
| Fuld afkasthistorik ét klik væk | done (kalender-CTA “Se hele historikken (ét klik)”) |
| Neutral drawdown-label | done (“Fald fra 52-ugers top”) |
| Ingen interne target=_blank | done (0 i served docs; check-script) |
| Datostempel på dagligt indhold | done (`.datestamp` + time på movers; «ældre» når asOf < i dag) |

## IA vs Jesper-mockup
Mockup: produkter → klassevælger → chart-panel → metrics → dialogs (invest/risk/follow).
Vores Analytics: Entré (3 døre) → Fonden/Portefølje/Udforsk (hus). Embed spejler Jespers chart-panel.
Header nu med Følg med / Risici / Sådan investerer du (som mockup). Sticky header + brand tokens aligned.

## Merge docs/b/
- `company-profiles.json` + `fund-meta.json` → `docs/data/` (KID/SRI i footer)
- Claude CSS tokens delvist adopteret (pos/neg, sticky, faint)
- `docs/b/` arkiveret (README-ARCHIVE); ikke linked

## SHOULD landed
- Kopiér link til denne liste (Udforsk)
- AI-værdikæde light
- Livscyklus-strip
- KID-links fra fund-meta
- Risici-dialog

## Agents
- Claude #3: polish + CROSS-REVIEW-CLAUDE.md (kører)
- Grok review: CROSS-REVIEW-GROK.md + visual polish (kører)
- Grok embed: færdig (chart.css/js)

## Next
1. Læs agent cross-reviews når de lander; merge “better not different”
2. Flere SHOULD: ordliste-inline, drawdown-tabel detalje, print-CSS
3. UX-review.md kl. 22:00 — læs og fold ind
4. Push often

## Spørgsmål til Christian
Uændrede defaults (se tidligere). Ingen nye blokeringer.
