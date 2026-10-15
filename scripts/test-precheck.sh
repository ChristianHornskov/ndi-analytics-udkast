#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
python3 - <<'PY'
import json, subprocess
from pathlib import Path
root = Path('.').resolve()
def run():
    return subprocess.run(['bash','scripts/precheck.sh'], cwd=root, capture_output=True, text=True)

# data.json
p = root/'docs/data/data.json'; p.write_text('{}')
r = run(); p.unlink()
assert r.returncode != 0, 'expected fail on data.json'

p = root/'docs/sitemap.xml'; p.write_text('<urlset/>')
r = run(); p.unlink()
assert r.returncode != 0, 'expected fail on sitemap.xml'

port = root/'docs/data/portfolio.json'; bak = port.read_bytes()
d = json.loads(bak); d['funds'][0]['positions'][0]['d1'] = 1.0
port.write_text(json.dumps(d)); r = run(); port.write_bytes(bak)
assert r.returncode != 0, 'expected fail on d1'

d = json.loads(bak); d['funds'][0]['positionsAsOf'] = '2026-10-15'
port.write_text(json.dumps(d)); r = run(); port.write_bytes(bak)
assert r.returncode != 0, 'expected fail on future holdings'

r = run(); assert r.returncode == 0, r.stdout + r.stderr
print('test-precheck: all assertions passed')
PY
