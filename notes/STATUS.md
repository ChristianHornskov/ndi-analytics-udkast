# STATUS – NDI Analytics overnight build

**2026-10-15 20:47 CEST — Sole lead. Precheck HARD rule live. NOT DONE.**

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/

## HARD RULE
`bash scripts/precheck.sh` before every push (`scripts/push.sh`). See `notes/PRECHECK-RULE.md`.  
Regression: `bash scripts/test-precheck.sh`.

## Shipped since sole-lead handoff
- precheck.sh + push.sh + test-precheck.sh
- Grok CSS polish committed
- Removed leftover P/S sort
- Embed: only YTD + hele perioden (1m/3m/1y hidden; URL fallback)
- Skip-links all pages
- a11y radiogroup / dialog inert
- om-data P/S wording

## Agents
Claude + Grok quality1 running with precheck in prompts.

## NEXT
- Merge further Claude/Grok polish after review
- UX-review.md @ 22:00 CEST
- VIDENSBOT-live-check.md when it arrives
- Quality > speed. Never report done.
