You are Grok for Leo (NDI). Overnight REVIEW cycle R1 after Claude build N1. Quality > speed. Work ONLY in /workspace/ndi-analytics.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD ~1af4a2d+. Read notes/UX-review.md (## 22:00 MUST/SHOULD) and notes/VIDENSBOT-live-check.md.

You are the sole editor this cycle (no parallel Claude). Focus:
1. MUST 5: holdings table scroll-trap on 375 (inner vertical scroll inside horizontal) — fix CSS so one scroll model works.
2. SHOULD that are visual CSS-only: redundant "Åbn screener" on Udforsk, nav contrast for Følg/Risici, hide empty livscyklus strip or collapse it.
3. Do NOT invent portfolio data (MUST 4 is for Christian — leave ISIN-as-name / Andet % alone unless a clear display bug).
4. Verify Claude's mobile nav + weight bars at 375; fix only real regressions.
5. Run smoke-quality + smoke-cycle3 before push. Append "Fra Grok review R1" to STATUS.
6. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
