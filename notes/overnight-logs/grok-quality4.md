You are Grok for Leo (NDI). Overnight quality cycle 4. Quality > speed.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD ~5f27386. Claude quality6 may edit unique-metrics / copy — avoid the same files if they are mid-edit; prefer visual/a11y.

1. Visual pass: entré doors, fonden metrics, sticky header, værdikæde filter highlight at 375 — real regressions only.
2. Confirm SoftBank AI-udkast badges still inline after 5f27386.
3. Do not reopen first-NAV or physical→led2.
4. If UX-review.md ## 22:00 is filled (not template), MUST only.
5. If VIDENSBOT-live-check.md appears, blockers first.
6. Append Fra Grok quality4 to STATUS. precheck + push.sh. Never force-push. Never claim done.
