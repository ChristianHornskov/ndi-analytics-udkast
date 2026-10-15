# STATUS – NDI Analytics overnight build

**2026-10-15 20:44 CEST — Sole build lead. HARD precheck rule live. NOT DONE.**

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/  
notes on Pages → must stay **404**

## HARD RULE
`bash scripts/precheck.sh` before every push. Fails on: notes in docs/, raw data.json, holdings >2026-06-01, d1/per-stock returns, JS reading those fields. See `notes/PRECHECK-RULE.md`.

## Compliance
Delayed holdings ≤2026-06-01 · no daily movers · AKK no returns · PMINDI no 1m/3m · no Nasdaq · no fake stock figures · context = udbytte only · notes only `/notes`

## NEXT
- Commit Grok CSS polish + precheck
- Claude↔Grok cycles with precheck in every prompt
- Read UX-review.md after 22/00/02/04/06; VIDENSBOT-live-check.md when it lands
- Quality > speed. Never report done.
