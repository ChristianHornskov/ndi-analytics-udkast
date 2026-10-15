# HARD RULE — Pages precheck (Leo)

Before **every** `git push` to this repo:

```bash
bash scripts/precheck.sh   # must exit 0
# or: bash scripts/push.sh origin main
```

`scripts/precheck.sh` **fails** if `docs/` contains:

1. Internal notes (`STATUS.md`, `SPEC.md`, `IDEAS.md`, `UX-*.md`, `VIDENSBOT*.md`, …) — only `docs/notes/DO_NOT_ADD_NOTES_HERE.txt` + stub `index.html` are allowed under `docs/notes/`
2. Raw `data.json` anywhere under `docs/`
3. Holdings / company-months dated **after 2026-06-01**
4. Per-position daily moves (`d1`, …) or per-stock returns / P/S / P/E / 52w drawdown fields in snapshot JSON
5. `docs/js` reading those forbidden position fields

Internal docs live only in `/notes` (repo root), never on GitHub Pages.

Include this rule in every Claude and Grok overnight prompt.

## Optional local git hook

```bash
cp scripts/git-hooks/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```

Installed on the overnight build machine.
