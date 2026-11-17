"""Phase22 completion audit. Historical evidence and unobserved real input stay open."""
from pathlib import Path
import datetime
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'evidence/phase22'


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def save(path, value):
    Path(path).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')


def run():
    errors = []

    def require(value, reason):
        if not value:
            errors.append(reason)

    docs = {name: (ROOT / 'docs' / name).read_text(encoding='utf-8') for name in ('Todo', 'PRD.md', 'Function.md')}
    if '--todo-from-index' in sys.argv:
        docs['Todo'] = subprocess.check_output(['git', 'show', ':docs/Todo'], cwd=ROOT).decode('utf-8')
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', docs['Todo'], re.M)
    expected = set(range(1, 190)) | set(range(191, 209)) | set(range(210, 221))
    require([int(n) for _, n in tasks] == list(range(1, 411)), 'Task order changed')
    require(all((mark == 'x') == (int(n) in expected) for mark, n in tasks), 'T190/T209 must remain open; only T211-220 newly complete')
    for name, text in docs.items():
        require('v0.23' in text[:2000], name + ' version mismatch')
    baseline = load(ROOT / 'experiments/phase05/results/baseline.json')
    for key, name, pattern in [('function_ids', 'Function.md', r'\bF-[A-Z0-9]{2,3}-\d{3}\b'), ('product_direction_ids', 'PRD.md', r'\bPD-\d{2}\b'), ('acceptance_ids', 'PRD.md', r'\bAC-\d{2}\b')]:
        require(sorted(set(re.findall(pattern, docs[name]))) == baseline[key], key + ' changed')
    m0 = load(ROOT / 'experiments/phase05/decisions.json')['m0']
    require(m0['state'] == 'HOLD' and not m0['passed'] and len(m0['open_revalidation']) == 5 and all(r['state'] == 'OPEN' for r in m0['open_revalidation']), 'M0 changed')
    frozen = ['experiments/phase02', 'experiments/phase03', 'experiments/phase04', 'experiments/phase05'] + [f'evidence/phase{i:02}' for i in range(6, 22)]
    require(not subprocess.check_output(['git', 'diff', 'HEAD', '--name-only', '--', *frozen], cwd=ROOT).strip(), 'Historical evidence changed')
    require(not load(ROOT / 'evidence/phase19/live-summary.json')['passed'], 'T190 failure relabeled')
    require(not load(ROOT / 'evidence/phase21/pending-review.json')['phaseComplete'], 'T209 pending evidence relabeled')
    verification = load(OUT / 'verification.json')
    require(verification['passed'] and verification['nodeTestGroups'] == 262 and verification['pythonTestGroups'] == 36 and verification['totalTestGroups'] == 298 and verification['newRuntimeChangeNodeGroups'] == 20, 'Required gate incomplete')
    prior = load(OUT / 'manifest.json') if (OUT / 'manifest.json').exists() else {}
    equivalents = prior.get('verifiedLFEquivalent', {})
    for path, digest in verification['sourceSha256'].items():
        data = (ROOT / path).read_bytes()
        actual = hashlib.sha256(data).hexdigest()
        e = equivalents.get(path, {})
        require(actual == digest or b'\r\n' not in data and e.get('testedSha256') == digest and e.get('lfSha256') == actual, 'Verified source changed: ' + path)
        if actual == digest and b'\r\n' in data and b'\0' not in data:
            equivalents[path] = {'testedSha256': digest, 'lfSha256': hashlib.sha256(data.replace(b'\r\n', b'\n')).hexdigest()}

    def changes(report):
        ui = report['runtimeChanges']
        require(ui['passed'] and ui['actualAudioWorklet'] and ui['actualLocalInference'] and ui['syntheticMediaOnly'] and ui['deviceRequests'] == 2 and ui['editorCleanupCannotRevokeRun'] and ui['projectRebindKeepsBothStreams'] and ui['modeOwnerStable'] and ui['deferredWorkAvailableAfterStop'], 'Runtime ownership/alternative failed')
        require(not ui['devicesOpened'] and ui['physicalDevices'] == 'NOT_RUN' and ui['osGlobalKeyDelivery'] == 'NOT_RUN' and not ui['rawAudioSaved'] and not ui['cameraFramesSaved'] and ui['m0'] == 'HOLD', 'Synthetic media scope relabeled')
        require([r['route'] for r in ui['routes']] == ['parts', 'single-image', 'split-image'], 'Three actual routes missing')
        for route in ui['routes']:
            for key in ['passed', 'actualRoutePreparation', 'validatedImmediateControls', 'expressionSnapshotApplied', 'workingAndExecutionSeparate', 'candidateGPUIsolation', 'duplicatePrepareSuppressed', 'prepareCancel', 'staleCommitRejected', 'realGPUReplacement', 'rendererFailureKeepsHealthy', 'logicalRestart', 'transitionCancelKeepSwitch', 'explicitInputBasis', 'workingSavePinned', 'heavyDeferred', 'noUnneededDeviceOpen', 'allSurfacesReleased']:
                require(route[key], route['route'] + ': ' + key)
        require(report['protections'] == {'sandbox': True, 'contextIsolation': True, 'nodeIntegration': False, 'externalNetworkBlocked': True}, 'Protections changed')

    dev = load(OUT / 'development-run.json')
    require(dev['passed'] and dev['channel'] == 'test' and dev['appVersion'] == '0.17.0', 'Full development run failed')
    changes(dev)
    for key in ['execution', 'projects', 'editor', 'motion', 'input', 'parts', 'structure', 'corrections', 'split', 'detail', 'expressions', 'tracking', 'inputRecovery']:
        require(dev[key]['passed'], 'Prior regression failed: ' + key)
    require(dev['renderer']['partsPixels']['frames'] == 1472 and dev['renderer']['partsPixels']['passed'] and dev['renderer']['motionPixels']['passed'], 'Prior GPU regressions failed')
    package = load(OUT / 'package-audit.json')
    require(package['passed'] and package['appVersion'] == '0.17.0' and package['commonProjectSchema'] == '1.9' and not package['cleanWindowsOS'] and not package['isolation']['developerToolsOnPath'] and package['isolation']['freshProfiles'] == 2, 'Package scope invalid')
    for attempt in (1, 2):
        report = load(OUT / f'packaged-run-{attempt}.json')
        require(report['passed'] and report['packaged'] and report['channel'] == 'release' and report['worker']['frozen'] and report['worker']['dependencyFilesInsideBundle'] and report['workerStopped'] and report['priorRouteUI'] == 'NOT_RUN', 'Release run failed')
        changes(report)
        if attempt == 2:
            require(report['windowSize'] == [1080, 720], 'Compact release missing')
    portable = ROOT / 'out/make/zip/win32/x64/2DSketcher-win32-x64-0.17.0.zip'
    require(portable.is_file(), 'Portable ZIP missing')
    artifacts = ['README.md', 'docs/Todo', 'docs/PRD.md', 'docs/Function.md', 'docs/planning/05-decisions.md', 'docs/planning/22-runtime-changes.md', 'docs/architecture/runtime-changes.md', 'scripts/verify-runtime-changes.mjs', 'scripts/runtime-changes-package-check.mjs', 'scripts/runtime-changes-audit.py']
    for name in artifacts:
        if not name.endswith(('.md', 'Todo')):
            continue
        doc = ROOT / name
        for link in re.findall(r'\]\(([^)]+)\)', doc.read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'):
                continue
            target = (doc.parent / link.split('#')[0]).resolve()
            require(target.exists() or target in (OUT / 'audit.json', OUT / 'manifest.json'), 'Broken link: ' + name + ': ' + link)
    artifacts += [str(p.relative_to(ROOT)).replace('\\', '/') for p in OUT.iterdir() if p.is_file() and p.name not in ('audit.json', 'manifest.json')]
    hashes = {name: sha(ROOT / name) for name in artifacts}
    hashes['docs/Todo'] = hashlib.sha256(docs['Todo'].encode('utf-8')).hexdigest()
    save(OUT / 'manifest.json', {'phase': 22, 'created': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'appVersion': '0.17.0', 'modelSchema': '1.9', 'sourceSha256': verification['sourceSha256'], 'verifiedLFEquivalent': equivalents, 'artifacts': hashes, 'todoFromIndex': '--todo-from-index' in sys.argv, 'portableZip': {'path': str(portable.relative_to(ROOT)).replace('\\', '/'), 'bytes': portable.stat().st_size, 'sha256': sha(portable)}, 'frozenHistoricalDirectories': frozen, 'm0': 'HOLD', 'openM0Revalidations': 5})
    save(OUT / 'audit.json', {'passed': not errors, 'errors': errors, 'phase': 22, 'completedTasks': 218, 'remainingTasks': 192, 'newTasksChecked': list(range(211, 221)), 'task190Complete': False, 'task209Complete': False, 'nodeGroups': 262, 'pythonGroups': 36, 'samePcReleaseRuns': 2, 'actualPhysicalDevicesChecked': False, 'm0': 'HOLD', 'openM0Revalidations': 5, 'manifestSha256': sha(OUT / 'manifest.json')})
    print(json.dumps({'passed': not errors, 'errors': errors}))
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
