"""Sequential, lossless reclamation of the explicit generated-cache allowlist."""

import importlib.util
import json
from pathlib import Path
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    'cache_archive', ROOT / 'scripts/cache-archive.py'
)
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)
groups = sys.argv[1:]
if not groups:
    raise SystemExit('E_CACHE_GROUPS_REQUIRED')
out = ROOT / '.local/cache-batch-01'
out.mkdir(exist_ok=True)
progress = out / f'progress-{time.time_ns()}.json'
results = []
for name in groups:
    try:
        source = archive.group_path(name)
        if not source.exists():
            results.append({'group': name, 'status': 'absent'})
            continue
        index = archive.STORE / 'indexes' / (name + '.jsonl.gz')
        if not index.exists():
            archive.pack(name)
        outcome = archive.evict(name)
        results.append(
            {
                'group': name,
                'status': 'retained-changed-or-new-files'
                if outcome['remainingSelectedFiles']
                else 'losslessly-archived',
            }
        )
    except Exception as error:
        code = str(error)
        results.append(
            {
                'group': name,
                'status': 'retained',
                'code': code if code.startswith('E_CACHE_') else 'E_CACHE_ARCHIVE',
            }
        )
    progress.write_text(json.dumps(results, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'groups': results}), flush=True)
if any(row['status'] == 'retained' for row in results):
    raise SystemExit(1)
