You are Claude Code for Leo (NDI). Overnight quality cycle 7. Quality > speed.
Work ONLY in /workspace/ndi-analytics. Notes live in /notes (repo root), never under docs/.

## Mandatory footer for every Claude / Grok overnight prompt

```
HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin main`. Precheck FAILS if docs/ has internal notes (only docs/notes/DO_NOT_ADD_NOTES_HERE.txt + stub index.html allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done.
```

Also run `bash scripts/test-precheck.sh` after changing precheck.sh itself.

HEAD is ~c3b8507 (Claude quality6 NDI-linse + Grok quality4 table scroll hints). Keep smoke green: smoke.mjs, smoke-cycle3.mjs (66), smoke-quality.mjs (108) at 1280 and 375.

Tasks (pick high-value, finish what you start):
1. Unique NDI metrics (SPEC D2): deepen qualitative NDI-linse for remaining thinner names in unique-metrics.json (Apple, AMD, Broadcom, Poet, Fluence — match depth of Tesla/Nvidia/SoftBank/Meta: tags, "Hvad ejer man?", værdikæde link, "Hold øje med", livscyklus). Qualitative only from company-profiles + multi-tags. No invented P/E/P/S/returns/%. Label AI-udkast (`"ai": true`) where text is AI-summarised. Use portfolio.json classification for livscyklus (do not invent High growth).
2. Deeper værdikæde UX only if a real gap remains (e.g. empty states, mobile 375, keyboard). Prefer small targeted fixes.
3. Dialog focus-return / APG tabs polish only if smoke shows gaps.
4. If notes/UX-review.md gains a filled ## 22:00 section (not template), implement MUST items only.
5. If notes/VIDENSBOT-live-check.md appears, blockers first.
6. Append "Fra Claude quality7" to notes/STATUS.md (append, don't wipe). Update the Lead/NEXT blurb to HEAD + waiting UX 22:00.
7. precheck + bash scripts/push.sh origin main. Never force-push. Never claim done.

Do not touch graf-v2, Azure, Wix, live newdealinvest.dk, or invent portfolio holdings. Do not reopen start-date or physical→led2 (locked in notes/DATA-DEFINITIONS.md).
