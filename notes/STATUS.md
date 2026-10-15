# STATUS – NDI Analytics overnight build

**2026-10-15 20:52 CEST — Sole lead. Precheck HARD. NOT DONE.**

## HARD RULE
`bash scripts/precheck.sh` before every push. Hook: `scripts/git-hooks/pre-push`.  
Tests: `bash scripts/test-precheck.sh`. Prompt footer: `notes/AGENT-PROMPT-FOOTER.md`.

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/

## Recent quality
- Precheck + push wrapper + regression tests + local pre-push hook
- Grok CSS + aria-checked + reduced-motion
- Embed AKK hard gate; only YTD+all periods
- a11y radiogroup/dialog focus; smoke-quality **96/96**
- Calendar aria-label fix (caught undefined `mo`)
- Skip-links sitewide

## Agents
Claude quality2 + Grok quality2 relaunched with precheck footer.

## NEXT
- Read UX-review.md after **22:00** reviewer round
- VIDENSBOT-live-check.md when present
- Keep Claude↔Grok cycles; never report done
