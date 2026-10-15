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

## Quality2 (Claude, ~20:55)
- Copy sweep docs/: no advice wording; all "anbefal…" hits are disclaimers or KID "anbefalet ejertid"
- "kl. n" only in portfolio.json `label`/`legalName` (not rendered; matches Fundmarket per VIDENSBOT-review) — left as-is
- Invest-dialog: "Ingen minimumsinvestering i de danske andelsklasser" → scoped to the two shown classes + source + "vilkår kan variere hos bank/platform" (VIDENSBOT-review: kl. f exists)
- Smoke: quality 96/96, base 50/50, cycle3 58/58, 0 console errors
- UX-review 22:00 section: not yet present → nothing addressed. VIDENSBOT-live-check.md: absent

## Agents
Claude + Grok quality2 running with precheck in prompts.

## NEXT
- UX-review.md @ 22:00 CEST
- VIDENSBOT-live-check.md when it arrives
- Keep cycling; quality > speed; never report done
