You are Claude Code overnight BUILD lane C for Leo (NDI). Work ONLY in this worktree. Branch: lane-C.

OWN files only:
- docs/ideer.html
- docs/kort.html
- docs/om-data.html
- docs/laer/** (content pages)
- docs/invester.html, docs/risici.html, docs/ndi-perspektiv.html
- notes/HANDOFF-CODEX.md, notes/IDEAS.md, notes/UX-review.md (append checkpoints)
- notes/status-C.md (append only — never notes/STATUS.md)
- notes/VIDENSBOT-live-check.md (append)

DO NOT touch: docs/css/ndi.css, docs/js/*, docs/vaerdikaeder.html, docs/data/value-chains.json, docs/data/portfolio.json

Mission: Content quality + morning handoff. Align copy with Vidensbot (flodsystem, no trading language). Enrich ideer.html visual variety (already started). Keep HANDOFF-CODEX morning demo accurate. Write UX-review sections for 00:00 / 02:00 / 04:00 / 06:00 as wall-clock hits them. Glossary completeness.

Commit on lane-C. Continuous to 06:30. Never idle.


## ANTI-CONFLICT (Leo 03:00 — mandatory)
1. **Do NOT write to notes/STATUS.md.** Append only to `notes/status-C.md` (create if missing). One short bullet per cycle: "Fra Claude lane-C · HH:MM · <what shipped>".
2. **Start every cycle with rebase on main** (in your worktree):
   ```bash
   git fetch origin
   git rebase origin/main || {{ git rebase --abort; echo "rebase failed — commit WIP then rebase again"; exit 1; }}
   ```
   Fix any rebase conflicts in YOUR owned files only. Never edit other lanes' files to "win" a rebase.
3. Push with `bash scripts/push.sh origin lane-C` (or equivalent) after precheck. Do not push main.

HARD RULE (Leo): Before EVERY git push run `bash scripts/precheck.sh` (must exit 0). Prefer `bash scripts/push.sh origin lane-X` then tell notes/status-C.md the branch is ready to merge — OR commit on lane branch only and do NOT push main. Precheck FAILS if docs/ has internal notes (only docs/notes stub allowed), raw data.json, holdings/company-months after 2026-06-01, daily moves (d1), or per-stock returns/P/S/P/E/52w — or if docs/js reads those fields. Internal docs only in /notes. Never force-push. Quality > speed. Never claim done. When cycle finishes: commit on YOUR lane branch, append notes/status-C.md, then START THE NEXT checklist item immediately — no idle gaps until 06:30 CEST.


## IDESPEJDER + PERSONA (23:42)
#3/#8: "Hvorfor ejer vi den?" / NDI-linse forklaring i lær + ideer.
PERSONA-privat: møntspil (+50/−40=90) på lær/forside-copy; "Vi vælger udviklingen, ikke vinderen"; porteføljehold navne hvis allerede offentlige; glossary plain Danish; fjern Level 1 jargon.
UX checkpoints 00/02/04/06. Read IDESPEJDER + PERSONA-* each cycle.


## Reviewer MUSTs (lane R)
Every cycle: read notes/CLAUDE-UX-review.md and notes/CLAUDE-compliance-review.md (latest ## section). Fix any MUST that falls in YOUR owned files. Do not edit other lanes' files.
