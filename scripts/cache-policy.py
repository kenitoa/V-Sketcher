"""Select closed, generated work directories; keep current runtime dependencies."""

import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('cache_archive', ROOT / 'scripts/cache-archive.py')
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)
keep = {
    'toolchain',
    'models',
    'research31',
    'format-tools',
    'replay-store-01',
    'cleanup-baseline-01',
    'completion26-31',
    'phase25-target-02',
}
state = ROOT / '.local/phase27-target-state.json'
if state.exists():
    keep.add(Path(json.loads(state.read_text(encoding='utf-8'))['directory']).name)
live = ROOT / '.local/phase31-current-live.json'
if live.exists():
    keep.add(Path(json.loads(live.read_text(encoding='utf-8'))['work']).name)
commands = archive.running_commands()
planned, retained = [], []
for folder in sorted((ROOT / '.local').iterdir()):
    if not folder.is_dir():
        continue
    if folder.name in keep or not archive.GENERATED.fullmatch(folder.name):
        retained.append({'group': folder.name, 'reason': 'runtime-or-unclassified'})
        continue
    try:
        archive.assert_inactive(folder, commands)
        planned.append('generated-' + folder.name)
    except ValueError:
        retained.append({'group': folder.name, 'reason': 'active-or-unverified'})
out = ROOT / ('evidence/cleanup/run-01/cache-policy-' + str(time.time_ns()) + '.json')
if out.exists():
    raise SystemExit('E_CACHE_POLICY_EXISTS')
out.write_text(
    json.dumps({'planned': planned, 'retained': retained, 'outsideWorkspaceMoved': False}, indent=2)
    + '\n',
    encoding='utf-8',
)
print(json.dumps({'generatedGroups': len(planned), 'retainedGroups': len(retained)}), flush=True)
if '--apply' in sys.argv and planned:
    raise SystemExit(
        subprocess.call(
            [sys.executable, '-I', str(ROOT / 'scripts/cache-archive-batch.py'), *planned], cwd=ROOT
        )
    )
