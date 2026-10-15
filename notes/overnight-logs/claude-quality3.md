You are Claude Code for Leo (NDI). Overnight quality cycle 3. Christian asleep. Quality > speed.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

Context: HEAD is 1d392b6. Start-date default is første NAV (notes/DATA-DEFINITIONS.md) — do not reopen. Smoke-quality must stay 96/96. Grok is polishing 375px CSS — **do not edit docs/css/ndi.css** this cycle.

Tasks (pick real gaps; no invented stock figures/returns/d1):
1. Deepen docs/vaerdikaede.html interaction (filter/highlight chain nodes that map to portfolio themes) without fake numbers.
2. SoftBank selskab page: ensure AI/profile copy is marked as AI/udkast per VIDENSBOT #13 if not already.
3. Cross-check om-data + fonden stamps: "Afkast pr." vs "Beholdning pr." still distinct after first-NAV copy.
4. If UX-review.md has a ## 22:00 section, address MUST items only; else skip.
5. If notes/VIDENSBOT-live-check.md exists, blockers first.
6. Append a short "Fra Claude quality3" to notes/STATUS.md (do not rewrite whole file).
7. precheck + `bash scripts/push.sh origin main`. Never force-push. Never claim done.
