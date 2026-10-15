# Build, test and deploy V2

## Requirements and build

Python 3.10+ and Node.js 22+ on PATH. No pip/npm dependencies, accounts or local
absolute paths are required for the build. From a fresh checkout:

```sh
python tools/build.py
python -m unittest discover -s tests -v
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080/preview-module-20260930.html` or
`http://localhost:8080/selskab.html?isin=JP3436100006&fund=pmindi`.
Browser preview needs internet and cloud CORS access. The same sources produce
the same five files and SHA256 manifest, without accessing Azure during build.

## Data boundary

The shared V1 renderer (`simple-embed.html`, scripts, styles) is an explicit
external runtime dependency from the validated release referenced by
`https://ndigrafdatab5174313.blob.core.windows.net/graph/latest.json`.
It is NOT rebuilt or published by this repo. This is a standalone V2 build,
not an offline replica of the financial pipeline.

Current Nasdaq JSON comes from the production wrapper; current distance history
and additional analysis JSON come from the existing V2 wrapper. The loader parses
only these JSON assignments, never evaluates fetched wrapper code. The three
values are `null` in the offline build and must load before first rendering.
The present cloud job's inline-data interface remains compatible. Moving these
three values to a dedicated validated JSON endpoint is a separate future change.

Company holdings/high history comes from cloud `v2-test/company-months.json` and
`company-high-months.json`; X comes from `v2-test/x-feed.json`. None is overwritten
by this deployment. Public, approved narrative/media inputs live in `src/`.
The old inline company history is intentionally empty, not a stale snapshot.

The partial V1 `build_production.py`, `update_live.py` and operational
`security_master_azure.py` are deliberately not imported. Their private input
files, V1 dist, credentials and cloud-job mutation functions are not needed here.

## Azure deployment — separate and explicit

**Not performed as part of this migration.** Install Azure CLI, use `az login`,
select the correct tenant/subscription and use existing authorized Blob access.
Never add tokens, CLI state, secrets or login files to Git.

```sh
python tools/deploy.py
# Read-only plan: fetch current hashes/ETags and preserve cloud JSON values.
# After tests, review and explicit publication approval:
python tools/deploy.py --apply
```

Only five exact existing paths under `graph/v2-test/` are writable. No user-supplied
destination, V1 file, release pointer, X-feed or cloud job can be targeted. The
publisher rebuilds locally, inserts only the current three JSON data values,
checks ETags, uploads and verifies anonymous readback. Thus deployment artifacts
differ from offline artifacts only in these data values. The cloud wrapper is
never used as source code. Missing/malformed data aborts deployment.

Every replaced artifact is backed up with its plan in ignored `.runtime/`.
The five uploads are NOT transactional. A conflict/error stops processing;
inspect `completed.json`, refresh the plan and review before retrying. Do not
force-upload or automatically roll back over a concurrent cloud update. Protected
hash changes may be a legitimate cloud run and require investigation, not override.

## Wix — manual, V2 only

Keep the `/graf-v2` HTML component in **Link** mode pointing to:
`https://ndigrafdatab5174313.blob.core.windows.net/graph/v2-test/preview-module-20260930.html`.
Accessible iframe title must be `NewDeal Invest – graf v2` for the existing bridge.
The custom code is `graph-v2/wix-resize.html` (Head, page `/graf-v2` only, load on each
page); inspect it before pasting and replace the whole existing "Kun Graf v2" snippet.
Do not restore the deleted intermediate `wix-embed.html` bridge.
No Azure script changes or publishes Wix, the shared header, or the live V1 pages.

The Wix Studio HTML element is never server-rendered; its iframe only appears after
Wix's client bundle mounts (1-13 s on slow mobiles). The bridge therefore reserves
section height, shows a loading text, and creates its own iframe in the same section
if Wix has none after 10 s. It hard-codes the section id `comp-muzfx98n`; if the
section is recreated in Wix, update the id (the check below then fails visibly).

Check the bridge locally against the public page before pasting (needs Chrome):
`node tools/wix_check.mjs new normal 3 6 390 844` (slow mobile) and
`node tools/wix_check.mjs new block 2` (Wix element never mounts; must show `fallback=true`).

## Acceptance after an approved deployment

Test both the direct Azure page and Wix: cold load/reload, class/period selection,
Nasdaq, expand/collapse, company links/back, mobile width, monthly history and X.
Repeat Wix reloads at top and restored scroll positions, and confirm the console shows
no "reserve-iframe" warning on normal loads. Automated syntax/build
tests do not establish that the known disappearing-iframe bug is resolved.
No live deployment or browser acceptance is claimed by this repository migration.
