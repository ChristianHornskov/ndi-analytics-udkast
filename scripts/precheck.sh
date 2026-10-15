#!/usr/bin/env bash
# NDI Analytics Pages precheck — fail closed before every push.
# HARD RULE (Leo): docs/ must never contain internal notes, raw data.json,
# current-day holdings, daily moves (d1), or per-stock returns.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOC="$ROOT/docs"
FAIL=0
HOLDINGS_MAX="2026-06-01"

err() { echo "PRECHECK FAIL: $*" >&2; FAIL=1; }
ok()  { echo "PRECHECK OK: $*"; }

echo "=== NDI precheck ($(date '+%Y-%m-%d %H:%M:%S %Z')) ==="

# 1) No internal notes under docs/
if [[ -d "$DOC/notes" ]]; then
  while IFS= read -r -d '' f; do
    base="$(basename "$f")"
    case "$base" in
      DO_NOT_ADD_NOTES_HERE.txt|index.html) ;;
      *) err "forbidden notes file in docs/notes: $f" ;;
    esac
  done < <(find "$DOC/notes" -type f -print0 2>/dev/null)
  # Any STATUS/SPEC/IDEAS/UX/VIDENSBOT markdown anywhere under docs/
  while IFS= read -r -d '' f; do
    err "internal note under docs/: $f"
  done < <(find "$DOC" -type f \( -iname 'STATUS.md' -o -iname 'SPEC.md' -o -iname 'IDEAS.md' -o -iname 'UX-*.md' -o -iname 'VIDENSBOT*.md' -o -iname 'OVERNIGHT*.md' -o -iname 'INTERNAL-TAGS.md' \) -print0 2>/dev/null)
else
  ok "no docs/notes dir (or empty)"
fi

# 2) No raw data.json on Pages
if [[ -f "$DOC/data/data.json" ]]; then
  err "raw docs/data/data.json must not ship on Pages"
else
  ok "no docs/data/data.json"
fi
# Also catch stray data.json elsewhere under docs/
while IFS= read -r -d '' f; do
  err "stray data.json: $f"
done < <(find "$DOC" -type f -name 'data.json' -print0 2>/dev/null)

# 2b) Udkast: robots.txt blokerer alt, så der må ikke ligge et sitemap, der siger det modsatte
if [[ -f "$DOC/sitemap.xml" ]]; then
  err "docs/sitemap.xml must not ship while robots.txt disallows everything (udkast)"
else
  ok "no docs/sitemap.xml"
fi

# 3–5) Snapshot JSON: holdings date, no d1, no per-stock returns
node << NODE
const fs = require('fs');
const path = require('path');
const DOC = ${DOC@Q};
const HOLDINGS_MAX = '${HOLDINGS_MAX}';
let fail = 0;
const err = (m) => { console.error('PRECHECK FAIL: ' + m); fail = 1; };
const ok = (m) => console.log('PRECHECK OK: ' + m);

const BAD_POS_KEYS = [
  'd1', 'd1Pct', 'd1_pct', 'daily', 'dailyReturn', 'dailyPct',
  'ytd', 'ytdPct', 'ytdReturn', 'return1d', 'return1m', 'return3m', 'return1y',
  'returnYtd', 'pct1d', 'pct1m', 'pct3m', 'pct1y', 'pctYtd',
  'drawdown52', 'drawdown52Approx', 'dd52', 'pe', 'ps', 'price', 'lastPrice',
];

function checkPortfolio(file) {
  if (!fs.existsSync(file)) return;
  const p = JSON.parse(fs.readFileSync(file, 'utf8'));
  const asOf = p.asOf || p.positionsAsOf;
  if (asOf && asOf > HOLDINGS_MAX) err(path.basename(file) + ' asOf/positionsAsOf ' + asOf + ' > ' + HOLDINGS_MAX);
  for (const f of (p.funds || [])) {
    const pa = f.positionsAsOf || asOf;
    if (pa && pa > HOLDINGS_MAX) err(f.id + ' positionsAsOf ' + pa + ' > ' + HOLDINGS_MAX);
    for (const pos of (f.positions || [])) {
      for (const k of BAD_POS_KEYS) {
        if (pos[k] != null && pos[k] !== '') {
          err(f.id + ' ' + (pos.isin || '?') + ' has forbidden per-stock field "' + k + '"=' + pos[k]);
        }
      }
    }
  }
  ok(path.basename(file) + ' holdings ≤ ' + HOLDINGS_MAX + ', no d1/per-stock returns');
}

function checkMonths(file) {
  if (!fs.existsSync(file)) return;
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [fid, rows] of Object.entries(m.funds || {})) {
    for (const row of rows) {
      if (row.date && row.date > HOLDINGS_MAX) err('company-months ' + fid + ' date ' + row.date + ' > ' + HOLDINGS_MAX);
    }
  }
  ok('company-months.json all dates ≤ ' + HOLDINGS_MAX);
}

function checkLatest(file) {
  if (!fs.existsSync(file)) return;
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  // latest may have performance date; holdings must not be current-day relative to delayed rule
  if (j.positionsAsOf && j.positionsAsOf > HOLDINGS_MAX) err('latest.json positionsAsOf ' + j.positionsAsOf + ' > ' + HOLDINGS_MAX);
  ok('latest.json checked');
}

checkPortfolio(path.join(DOC, 'data', 'portfolio.json'));
checkMonths(path.join(DOC, 'data', 'company-months.json'));
checkLatest(path.join(DOC, 'data', 'latest.json'));

// Scan JS for shipping daily movers UI promises that look live — soft: only fail if data fields present
// Already covered via portfolio keys.

process.exit(fail);
NODE

# 6) Scan docs/js for accidental per-stock return columns still rendered from position fields
if rg -n "p\.(d1|ytd|drawdown52|pe|ps)\b|position\.(d1|ytd|drawdown52Approx)" "$DOC/js" >/dev/null 2>&1; then
  err "docs/js references forbidden per-stock return/valuation fields"
  rg -n "p\.(d1|ytd|drawdown52|pe|ps)\b|position\.(d1|ytd|drawdown52Approx)" "$DOC/js" >&2 || true
else
  ok "docs/js has no forbidden per-stock field reads"
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo "=== PRECHECK FAILED — do not push ===" >&2
  exit 1
fi
echo "=== PRECHECK PASSED ==="
exit 0
