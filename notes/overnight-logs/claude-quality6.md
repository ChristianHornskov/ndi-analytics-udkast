You are Claude Code for Leo (NDI). Overnight quality cycle 6. Quality > speed.
Work ONLY in /workspace/ndi-analytics. Notes live in /notes (repo root), never under docs/.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD is ~5f27386 (Grok quality3 just shipped værdikæde contrast + SoftBank badges). Keep smoke green: smoke.mjs, smoke-cycle3.mjs (66), smoke-quality.mjs (96) at 1280 and 375.

Tasks (pick high-value, finish what you start):
1. Unique NDI metrics (SPEC D2): deepen qualitative NDI-linse for 3–5 core names (Tesla, SoftBank, NVIDIA or similar already in unique-metrics) — qualitative only, no invented P/E/P/S/returns. Label AI-udkast where needed. Do not invent numbers.
2. Dialog focus-return / APG tabs polish if smoke shows gaps; keep keyboard paths green.
3. Cross-link or copy polish only where clearly incomplete (nyhedsarkiv, tema hub, sidekort).
4. If notes/UX-review.md gains a filled ## 22:00 section (not template), MUST items only.
5. If notes/VIDENSBOT-live-check.md appears, blockers first.
6. Append "Fra Claude quality6" to notes/STATUS.md (append, don't wipe).
7. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.
Do not touch graf-v2, Azure, Wix, live newdealinvest.dk, or invent portfolio holdings.
