You are Claude Code for Leo (NDI). Overnight BUILD N2 — morning wow. Quality > speed. Sole builder (no parallel Grok). Work ONLY in /workspace/ndi-analytics.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD 8c355a9. Christian wants an impressive click-through by morning. Already shipped: Leo 22:00 locks, UX MUST 1–3, Grok scroll-trap, theme forslag (~Andet 12%), HANDOFF-CODEX, SPEC§M, IDEAS, ideer.html.

Read notes/UX-review.md, notes/VIDENSBOT-live-check.md, notes/THEME-FORSLAG.md, notes/HANDOFF-CODEX.md, notes/IDEAS.md. Do not reopen Leo locks. Do not invent per-stock returns/P/E/P/S.

Build (finish what you start; pick high-impact):
1. Temaer hub: show "forslag"-count / banner that overnight proposals await review; link to a short public note on om-data or ideer (no confidential numbers).
2. Impressive compare or fonden polish: PMINDI vs AKK story clearer; keep AKK gate.
3. Entré: add door/card to ideer.html + værdikæde if missing; make the 6-door story crisp on 375.
4. UX SHOULD still open: hide redundant "Åbn screener" on Udforsk; nav contrast if easy.
5. Keep smoke-quality + smoke-cycle3 green.

Append "Fra Claude build N2" to STATUS. precheck + push.sh. Never force-push. Never claim done.
