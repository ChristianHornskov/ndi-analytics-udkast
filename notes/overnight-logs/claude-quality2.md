You are Claude Code for Leo (NDI). Overnight quality cycle 2. Christian asleep.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

Read notes/STATUS.md, notes/SPEC.md, notes/UX-review.md, notes/PRECHECK-RULE.md.

Build carefully (quality > speed):
1. Review docs/ for any remaining "kl. n." or advice wording; soften
2. Ensure smoke-quality.mjs still 96/96 after calendar aria fix
3. If UX-review.md has a 22:00 section from reviewer, address MUST items only
4. If notes/VIDENSBOT-live-check.md exists, address blockers first
5. Small polish only — no new speculative data
6. bash scripts/precheck.sh && commit as Leo (NDI) <leo@ndi.local> && bash scripts/push.sh origin main
7. Update notes/STATUS.md with NEXT; never claim done
