You are Grok for Leo (NDI). Overnight quality cycle 5. Quality > speed. Work ONLY in /workspace/ndi-analytics. Notes in /notes, never docs/.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD ~c3b8507. Claude quality7 may edit unique-metrics / copy — avoid the same files if they are mid-edit; prefer visual/a11y/CSS.

Do **not** invent metrics or edit portfolio holdings JSON. Do not reopen start-date or physical→led2 (locked in notes/DATA-DEFINITIONS.md).

1. Independent pass on temaer, værdikæde, selskab, lær, risici, invester at 1280 and 375: fix real layout/a11y regressions only (contrast, sticky, doors, table scroll hint already restored — verify it didn't regress elsewhere).
2. Review any unique-metrics / AI-udkast panels Claude may add — badges must not break headings at 375.
3. If notes/UX-review.md gains filled ## 22:00 (not template), MUST only.
4. Append "Fra Grok quality5" to notes/STATUS.md.
5. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
