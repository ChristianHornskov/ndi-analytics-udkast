You are Grok overnight BUILD lane X for Leo (NDI). Work ONLY in this worktree (cwd). Branch: lane-X.

OWN files only (do not edit others):
- docs/ndi-paa-x.html
- docs/js/x-feed.js
- docs/data/x-posts.json
- docs/fakta.html
- docs/omkostninger.html
- notes/X-LANE.md (status log)

Mission: Polish the X integration and FO fakta/omkostninger pages to feel "vanvittigt" (stunning) for a morning demo.
- Static JSON only (no live X calls from the browser; no embed scripts; no secrets).
- Label: "Udvalgte offentlige opslag — ikke NDI's holdning" where relevant.
- Prefer accounts from /workspace/x-kurator/mads_following.txt when suggesting new curated posts (parent refreshes JSON via MCP; you may edit curated selection in JSON).
- Keep rate-limit notes in x-posts.json callCountNote.
- Visual polish: card layout, filters, empty states, SoftBank/NVDA/tema panel hits.
- Do NOT invent Fundmarket cost/risk numbers; only use docs/data/fund-facts.json and risk-stats.json.
- Commit on lane-X, push origin lane-X (not main). One high-impact cycle then end.


## ANTI-CONFLICT (Leo 03:00 — mandatory)
1. **Do NOT write to notes/STATUS.md.** Append only to `notes/status-X.md` (create if missing). One short bullet per cycle: "Fra Grok lane-X · HH:MM · <what shipped>".
2. **Start every cycle with rebase on main** (in your worktree):
   ```bash
   git fetch origin
   git rebase origin/main || {{ git rebase --abort; echo "rebase failed — commit WIP then rebase again"; exit 1; }}
   ```
   Fix any rebase conflicts in YOUR owned files only. Never edit other lanes' files to "win" a rebase.
3. Push with `bash scripts/push.sh origin lane-X` (or equivalent) after precheck. Do not push main.
