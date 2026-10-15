# STATUS – NDI Analytics overnight build

**2026-10-15 20:31 CEST — Cycle 3b: livscyklus, CSV, sparklines (vægt), FAQ, sidekort**

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/  
notes/STATUS.md → **404** (korrekt). tema.html live 200.

## Compliance locked
Notes kun `/notes`. Holdings ≤2026-06-01. AKK no returns. PMINDI no 1m/3m. No Nasdaq. No fake stock figures. Context = udbytte only.

## Shipped tonight (cycles 1–3)
- Entré 6 døre + sidekort
- Tema hub + dybsider, lær (5+FAQ), drawdown+recovery, periode, sammenlign, invester, nyhedsarkiv, selskaber A–Z
- Multi-tag (Tesla m.fl.), vægt-over-tid, weight-sparklines (ikke kurs), CSV-eksport, tastatur Esc/pile, livscyklus-strip
- Glossary, embed CTA, mobile polish, værdikæde→tema
- Playwright smoke 40/40 local

## Next (keep going)
- UX-review.md @ 22:00
- Richer period narratives (uden opfundede facts)
- More multi-tags where justified
- Keyboard APG polish, focus traps on dialogs
- Claude/Grok cross-review still running
- Never report done

## Fra Claude (polish-pass, 2026-10-15 20:33 CEST)
Landet (meget blev fejet med i Leos Cycle 2/3-commits):
- `selskab.html` læser `data/company-profiles.json` pr. ISIN: problem, rolle, produkter/kunder, "hold øje med", kilde + gennemgået-dato. Fallback = `position.*`. SoftBank: "Kort fortalt" (narrativ i `<details>`), kilder, X-konti. Medielinks matches på ISIN. Findes ISIN kun i den anden klasse, skiftes klasse med besked; ukendt ISIN → venlig tom-tilstand + FAQ-link.
- `tema.html?slug=` accepterer både slug (`optik-netvaerk`) og intern nøgle (`connect`) → alle eksisterende links fra screener/selskab/værdikæde virker. Selskabslisten beregnes fra **forsinket beholdning + multi-tags** (ikke det top-40-udsnit i themes.json), med klassevælger PMINDI/PMINDIAKK (kun vægt, ingen afkast), klikbar værdikæde-række og "andre temaer".
- Entré: 3 hoveddøre (UX §1.1) + 4 rolige sekundære døre (Lær, Temaer, Største fald, Sådan investerer du) + én linje med øvrige links. Erstatter 6 døre + 13 knapper, som virkede rodet.
- KID-footer genereres fra `fund-meta.json` (begge klasser, ISIN, SRI, dato) på index + selskab + tema; statisk fallback.
- Mobil 375: brand-tekst skjult, nav scroller vandret, mindre døre, rolle-kolonne skjult, ingen horisontal overflow (Playwright-tjek på 10 sider × 2 bredder, 0 konsolfejl; smoke 40/40).

Uenighed/observationer:
- Footeren på index nævnte "Nasdaq-sammenligning kræver Fundmarkets godkendelse", selvom der ingen Nasdaq-serie er. Fjernet for ikke at antyde en kommende sammenligning.
- "Hold øje med"-teksten fik en linje om, at det er forhold, ikke en prognose. Bør compliance-læses.
- Flere agenter skriver samtidig i `app.js`/STATUS med `git add -A`, så halvfærdige filer kan nå Pages. Forslag: én committer ad gangen.
