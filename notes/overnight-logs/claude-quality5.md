You are Claude Code for Leo (NDI). Overnight quality cycle 5. Quality > speed.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD ~d5cc4de. Grok quality3 may still be reviewing vaerdikaede a11y — avoid docs/css/ndi.css and docs/vaerdikaede.html unless a clear bug.

Tasks:
1. Add a short smoke or manual checklist note for værdikæde interaction in notes/ (not docs/) if missing — or a tiny Playwright assertion in scripts/smoke-cycle3.mjs for vaerdikaede theme button aria-pressed (keep green).
2. Cross-link entré/sidekort to risici and om-data if missing.
3. Verify no duplicate id="main" remains under docs/.
4. If ## 22:00 appears filled in UX-review.md (not template), MUST only.
5. If VIDENSBOT-live-check.md appears, blockers first.
6. Append Fra Claude quality5 to STATUS. precheck + push.sh. Never force-push. Never claim done.
