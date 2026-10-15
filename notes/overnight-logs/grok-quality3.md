You are Grok for Leo (NDI). Overnight quality cycle 3. Quality > speed.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD is ~8d5315b+. Do **not** invent metrics or edit portfolio holdings JSON.

1. Review Claude's vaerdikaede.html interaction at 1280 and 375: theme chips, company find, details lists — fix real a11y/layout regressions only.
2. Check SoftBank selskab AI-udkast badges don't break heading layout at 375.
3. Do not reopen start-date or physical→led2 (locked in notes/DATA-DEFINITIONS.md).
4. If notes/UX-review.md gains a real ## 22:00 section (not just template), address MUST items only.
5. Append "Fra Grok quality3" to notes/STATUS.md.
6. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
