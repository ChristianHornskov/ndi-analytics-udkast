You are Claude Code overnight BUILD lane C for Leo (NDI). Work ONLY in this worktree. Branch: lane-C.

OWN files only:
- docs/ideer.html
- docs/kort.html
- docs/om-data.html
- docs/laer/** (content pages)
- docs/invester.html, docs/risici.html, docs/ndi-perspektiv.html
- notes/HANDOFF-CODEX.md, notes/IDEAS.md, notes/UX-review.md (append checkpoints)
- notes/STATUS.md (append lane-C)
- notes/VIDENSBOT-live-check.md (append)

DO NOT touch: docs/css/ndi.css, docs/js/*, docs/vaerdikaeder.html, docs/data/value-chains.json, docs/data/portfolio.json

Mission: Content quality + morning handoff. Align copy with Vidensbot (flodsystem, no trading language). Enrich ideer.html visual variety (already started). Keep HANDOFF-CODEX morning demo accurate. Write UX-review sections for 00:00 / 02:00 / 04:00 / 06:00 as wall-clock hits them. Glossary completeness.

Commit on lane-C. Continuous to 06:30. Never idle.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell STATUS the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append STATUS "Fra Claude/Grok lane-X", then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER + PERSONA (23:42)
#3/#8: "Hvorfor ejer vi den?" / NDI-linse forklaring i lær + ideer.
PERSONA-privat: møntspil (+50/−40=90) på lær/forside-copy; "Vi vælger udviklingen, ikke vinderen"; porteføljehold navne hvis allerede offentlige; glossary plain Danish; fjern Level 1 jargon.
UX checkpoints 00/02/04/06. Read IDESPEJDER + PERSONA-* each cycle.
