# STATUS – NDI Analytics overnight build

**2026-10-15 20:49 CEST — Sole lead. Precheck on every push. NOT DONE.**

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/

## HARD RULE
`bash scripts/precheck.sh` before every push (`scripts/push.sh`).  
`bash scripts/test-precheck.sh` regression. See `notes/PRECHECK-RULE.md`.

## Recent (quality-first)
- Grok CSS polish + aria-checked
- Removed P/S sort leftover
- Embed: only YTD+all; hard AKK gate (hide chart)
- Skip-links; radiogroup a11y; dialog inert
- Smoke 50/50
- Softened risici wording; tema copy live region

## Agents
Claude + Grok quality1 still running (precheck in prompts).

## NEXT
- UX-review.md @ **22:00 CEST** (read when reviewer posts)
- VIDENSBOT-live-check.md when it lands
- Continue Claude↔Grok cycles with precheck in every prompt
- Never report done
