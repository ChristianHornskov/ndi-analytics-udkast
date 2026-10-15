# STATUS – NDI Analytics overnight build

**2026-10-15 20:54 CEST — Sole lead. Precheck HARD. NOT DONE / NOT BLOCKED.**

## HARD RULE (every push)
```bash
bash scripts/precheck.sh          # must exit 0
bash scripts/push.sh origin main  # wraps precheck
bash scripts/test-precheck.sh     # after editing precheck
```
Prompt footer: `notes/AGENT-PROMPT-FOOTER.md` · Hook sample: `scripts/git-hooks/pre-push`

Fails on: notes in docs/ (except stub warning+index), raw data.json, holdings >2026-06-01, d1/per-stock returns, JS reading those fields.

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/ · notes → 404

## HEAD
67da54f

## Quality shipped this hour
- precheck/push/test-precheck + local pre-push hook
- Grok CSS polish committed first
- Dropped leftover P/S sort
- Embed: YTD+all only; hard AKK gate
- a11y: skip-links, radiogroup, dialog focus (96/96 smoke-quality)
- Calendar aria fix; copy/caveats polish

## Agents
Claude + Grok quality2 running with precheck in prompts.

## NEXT
- UX-review.md @ 22:00 CEST
- VIDENSBOT-live-check.md when it arrives
- Keep cycling; quality > speed; never report done
