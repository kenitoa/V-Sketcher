"""Record verified phase21 implementation while real OS key delivery remains pending.

This audit never marks T209 complete and never substitutes for execution-audit.py.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'evidence/phase21'


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def run():
    errors = []

    def require(value, reason):
        if not value:
            errors.append(reason)

    todo = (ROOT / 'docs/Todo').read_text(encoding='utf-8')
    if '--todo-from-index' in sys.argv:
        todo = subprocess.check_output(['git', 'show', ':docs/Todo'], cwd=ROOT).decode('utf-8')
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', todo, re.M)
    expected = set(range(1, 190)) | set(range(191, 209)) | {210}
    require([int(n) for _, n in tasks] == list(range(1, 411)), 'Task order changed')
    require(all((mark == 'x') == (int(n) in expected) for mark, n in tasks), 'Pending scope must leave T190/T209 open')
    verification = load(OUT / 'verification.json')
    require(verification['passed'] and verification['nodeTestGroups'] == 242 and verification['pythonTestGroups'] == 36, 'Required gate failed')
    equivalents = {}
    for path, sha in verification['sourceSha256'].items():
        data = (ROOT / path).read_bytes()
        require(digest(data) == sha, 'Tested source changed: ' + path)
        if b'\r\n' in data and b'\0' not in data:
            equivalents[path] = {'testedSha256': sha, 'lfSha256': digest(data.replace(b'\r\n', b'\n'))}
    dev = load(OUT / 'development-run.json')
    require(dev['passed'] and dev['appVersion'] == '0.16.0', 'Full development run failed')
    for key in ['execution', 'projects', 'editor', 'motion', 'input', 'parts', 'structure', 'corrections', 'split', 'detail', 'expressions', 'tracking', 'inputRecovery']:
        require(dev[key]['passed'], 'Development regression failed: ' + key)
    package = load(OUT / 'package-audit.json')
    require(package['passed'] and not package['cleanWindowsOS'] and package['isolation']['freshProfiles'] == 2 and not package['isolation']['developerToolsOnPath'], 'Same-PC package scope invalid')
    for attempt in (1, 2):
        report = load(OUT / f'packaged-run-{attempt}.json')
        require(report['passed'] and report['packaged'] and report['channel'] == 'release' and report['worker']['frozen'] and report['workerStopped'], 'Packaged run failed')
        require(report['execution']['osGlobalKeyDelivery'] == 'NOT_RUN' and report['execution']['physicalDevices'] == 'NOT_RUN', 'Synthetic run relabeled')
        require(report['protections'] == {'sandbox': True, 'contextIsolation': True, 'nodeIntegration': False, 'externalNetworkBlocked': True}, 'Protections changed')
        for route in report['execution']['routes']:
            require(route['passed'] and route['quickRecent'] and route['dirtyPreserved'] and route['visiblePixels'] > 1000, 'Execution route failed')
    timed = load(OUT / 'live-global-keys-timedout-01.json')
    require(not timed['passed'] and timed['registeredBeforeInput'] and not timed['actualGlobalCallbackOutsideMain'] and timed['ownedChordReleased'] and timed['userSequenceAttestation'] == 'PENDING', 'Unconfirmed OS input was relabeled')
    frozen = ['experiments/phase02', 'experiments/phase03', 'experiments/phase04', 'experiments/phase05'] + [f'evidence/phase{i:02}' for i in range(6, 21)]
    require(not subprocess.check_output(['git', 'diff', 'HEAD', '--name-only', '--', *frozen], cwd=ROOT).strip(), 'Historical evidence changed')
    m0 = load(ROOT / 'experiments/phase05/decisions.json')['m0']
    require(m0['state'] == 'HOLD' and len(m0['open_revalidation']) == 5 and all(v['state'] == 'OPEN' for v in m0['open_revalidation']), 'M0 changed')
    require(not load(ROOT / 'evidence/phase19/live-summary.json')['passed'], 'T190 relabeled')
    portable = ROOT / 'out/make/zip/win32/x64/2DSketcher-win32-x64-0.16.0.zip'
    require(portable.is_file(), 'Portable ZIP missing')
    result = {'implementationChecksPassed': not errors, 'phaseComplete': False, 'errors': errors, 'pendingTask': 'T-209', 'pendingReason': 'OS key callback outside the main window has not been observed; native Computer Use pipe unavailable and prepared user input review timed out without attestation.', 'completedTasks': sum(mark == 'x' for mark, _ in tasks), 'phase21CompletedTasks': [n for n in range(201, 211) if n in expected], 'nodeGroups': 242, 'pythonGroups': 36, 'samePcReleaseRuns': 2, 'cleanWindowsOS': False, 'm0': 'HOLD', 'openM0Revalidations': 5, 'task190Complete': False, 'checkerSha256': digest(Path(__file__).read_bytes())}
    (OUT / 'pending-review.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    artifacts = {str(p.relative_to(ROOT)).replace('\\', '/'): digest(p.read_bytes()) for p in OUT.iterdir() if p.is_file() and p.name != 'pending-manifest.json'}
    for name in ['README.md', 'docs/PRD.md', 'docs/Function.md', 'docs/planning/21-execution.md', 'docs/architecture/execution.md', 'scripts/execution-pending-audit.py']:
        artifacts[name] = digest((ROOT / name).read_bytes())
    artifacts['docs/Todo'] = digest(todo.encode('utf-8'))
    manifest = {'phase': 21, 'phaseComplete': False, 'appVersion': '0.16.0', 'modelSchema': '1.9', 'sourceSha256': verification['sourceSha256'], 'verifiedLFEquivalent': equivalents, 'artifacts': artifacts, 'todoFromIndex': '--todo-from-index' in sys.argv, 'portableZip': {'bytes': portable.stat().st_size, 'sha256': digest(portable.read_bytes())}, 'frozenHistoricalDirectories': frozen}
    (OUT / 'pending-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    print(json.dumps(result, ensure_ascii=False))
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
