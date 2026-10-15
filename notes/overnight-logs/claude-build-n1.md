You are Claude Code for Leo (NDI). Overnight BUILD cycle N1. Quality > speed. Work ONLY in /workspace/ndi-analytics.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

Context: HEAD 63d90c6 just shipped Leo 22:00 decisions (quarter holdings, AKK NAV-only, no Nasdaq, Fundmarket notes on ÅTD/100k, dash scrub). Smokes were 108/108 + 66/66.

Read notes/UX-review.md and notes/VIDENSBOT-live-check.md first. Address new findings if any. Do not reopen locked Leo decisions (public repo, first-NAV, physical→led2, quarter snapshots, no AKK returns, no Nasdaq).

Build (pick 2–4 real gaps, finish what you start):
1. Lær: short "variance drag" explainer (CAGR vs gennemsnit) if missing — educational, no advice words.
2. Portefølje/udforsk: note that Level-1 is roughly equal-ish weights (ca. 0,05–1 % typisk) if sourced from delayed snapshot — qualitative, no fake precision.
3. Sitemap vs robots: while udkast, either remove sitemap or align robots (VIDENSBOT non-blocker #9).
4. Keep smoke-quality and smoke-cycle3 green. Run them before push.

Append "Fra Claude build N1" to notes/STATUS.md. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
