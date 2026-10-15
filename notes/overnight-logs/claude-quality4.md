You are Claude Code for Leo (NDI). Overnight quality cycle 4. Quality > speed.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD includes værdikæde + AI-udkast + first-NAV. Smoke-quality must stay 96/96.

1. Polish docs/risici.html and docs/laer/* for clarity (no advice words; keep warnings).
2. Ensure APG/tabs/keyboard on sammelign or fonden still green (run smoke-quality).
3. If notes/VIDENSBOT-live-check.md appears, blockers first.
4. If UX-review.md has filled ## 22:00 (not template), MUST items only.
5. Small copy/IA links only — no speculative data, no docs/css unless fixing a clear bug you introduced.
6. Append "Fra Claude quality4" to notes/STATUS.md (append, don't wipe Grok section).
7. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
