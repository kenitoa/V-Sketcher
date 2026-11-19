"""Phase23 evidence and completion audit; no promotion of physical/global/M0 claims."""

import datetime
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'evidence/phase23'


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load(path):
    return json.loads(Path(path).read_text(encoding='utf8'))


def save(path, value):
    Path(path).write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf8', newline='\n'
    )


def run():
    errors = []

    def require(value, reason):
        if not value:
            errors.append(reason)

    docs = {
        name: (ROOT / 'docs' / name).read_text(encoding='utf8')
        for name in ('Todo', 'PRD.md', 'Function.md')
    }
    if '--todo-from-index' in sys.argv:
        docs['Todo'] = subprocess.check_output(['git', 'show', ':docs/Todo'], cwd=ROOT).decode(
            'utf8'
        )
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', docs['Todo'], re.MULTILINE)
    expected = set(range(1, 190)) | set(range(191, 209)) | set(range(210, 231))
    require([int(n) for _, n in tasks] == list(range(1, 411)), 'Task order changed')
    require(
        all((mark == 'x') == (int(n) in expected) for mark, n in tasks),
        'Only T221-230 newly complete; T190/T209 open',
    )
    for name, text in docs.items():
        require('v0.24' in text[:2000], name + ' version mismatch')
    baseline = load(ROOT / 'experiments/phase05/results/baseline.json')
    for key, name, pattern in [
        ('function_ids', 'Function.md', r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),
        ('product_direction_ids', 'PRD.md', r'\bPD-\d{2}\b'),
        ('acceptance_ids', 'PRD.md', r'\bAC-\d{2}\b'),
    ]:
        require(sorted(set(re.findall(pattern, docs[name]))) == baseline[key], key + ' changed')
    m0 = load(ROOT / 'experiments/phase05/decisions.json')['m0']
    require(
        m0['state'] == 'HOLD'
        and not m0['passed']
        and len(m0['open_revalidation']) == 5
        and all(r['state'] == 'OPEN' for r in m0['open_revalidation']),
        'M0 changed',
    )
    frozen = [
        'experiments/phase02',
        'experiments/phase03',
        'experiments/phase04',
        'experiments/phase05',
    ] + [f'evidence/phase{i:02}' for i in range(6, 23)]
    require(
        not subprocess.check_output(
            ['git', 'diff', 'HEAD', '--name-only', '--', *frozen], cwd=ROOT
        ).strip(),
        'Historical evidence changed',
    )
    verification = load(OUT / 'verification.json')
    require(
        verification['passed']
        and verification['nodeTestGroups'] == 275
        and verification['pythonTestGroups'] == 36
        and verification['totalTestGroups'] == 311
        and verification['newBroadcastNodeGroups'] == 13
        and verification['obsRuntimeMatchesCurrentBuild'],
        'Required gate incomplete',
    )
    prior = load(OUT / 'manifest.json') if (OUT / 'manifest.json').exists() else {}
    equivalents = prior.get('verifiedLFEquivalent', {})
    for path, digest in verification['sourceSha256'].items():
        data = (ROOT / path).read_bytes()
        actual = hashlib.sha256(data).hexdigest()
        e = equivalents.get(path, {})
        require(
            actual == digest
            or b'\r\n' not in data
            and e.get('testedSha256') == digest
            and e.get('lfSha256') == actual,
            'Verified source changed: ' + path,
        )
        if actual == digest and b'\r\n' in data and b'\0' not in data:
            equivalents[path] = {
                'testedSha256': digest,
                'lfSha256': hashlib.sha256(data.replace(b'\r\n', b'\n')).hexdigest(),
            }
    dev = load(OUT / 'development-run.json')
    require(dev['passed'] and dev['appVersion'] == '0.18.0', 'Prior full development run failed')
    for key in [
        'runtimeChanges',
        'execution',
        'projects',
        'editor',
        'motion',
        'input',
        'parts',
        'structure',
        'corrections',
        'split',
        'detail',
        'expressions',
        'tracking',
        'inputRecovery',
    ]:
        require(dev[key]['passed'], 'Prior regression failed: ' + key)

    def broadcast(report):
        ui = report['broadcast']
        require(
            report['passed'] and report['appVersion'] == '0.18.0' and report['workerStopped'],
            'Broadcast report incomplete',
        )
        require(
            ui['passed']
            and ui['settingsRestore']
            and ui['rendererFailureKeepsRun']
            and ui['tokenRotation']
            and ui['restartReconnect']
            and ui['receiverSandbox'],
            'Output recovery incomplete',
        )
        require(
            [r['route'] for r in ui['routes']] == ['parts', 'single-image', 'split-image'],
            'Three output routes missing',
        )
        for route in ui['routes']:
            for key in [
                'passed',
                'actualRoutePreparation',
                'alpha',
                'avatarOnly',
                'motion',
                'expression',
                'hide',
                'workingEditIsolated',
                'workingSavePinned',
                'executionReplacement',
                'stalePublisherClears',
                'inputLossFallback',
            ]:
                require(route[key], route['route'] + ': ' + key)
        require(
            ui['externalOBS'] == 'NOT_RUN'
            and ui['osGlobalKeyDelivery'] == 'NOT_RUN'
            and not ui['physicalDevicesOpened']
            and not ui['rawCameraFramesSaved']
            and not ui['rawAudioSaved']
            and ui['m0'] == 'HOLD',
            'Receiver automation scope relabeled',
        )
        require(
            report['protections']
            == {
                'sandbox': True,
                'contextIsolation': True,
                'nodeIntegration': False,
                'externalNetworkBlocked': True,
            },
            'Protections changed',
        )

    broadcast(load(OUT / 'broadcast-development-run.json'))
    package = load(OUT / 'package-audit.json')
    require(
        package['passed']
        and package['appVersion'] == '0.18.0'
        and package['commonProjectSchema'] == '1.9'
        and not package['cleanWindowsOS']
        and not package['isolation']['developerToolsOnPath']
        and package['isolation']['freshProfiles'] == 2
        and not package['obsBundled'],
        'Package scope invalid',
    )
    for attempt in (1, 2):
        report = load(OUT / f'packaged-run-{attempt}.json')
        broadcast(report)
        require(
            report['packaged']
            and report['channel'] == 'release'
            and report['worker']['frozen']
            and report['worker']['dependencyFilesInsideBundle'],
            'Release worker incomplete',
        )
        if attempt == 2:
            require(report['windowSize'] == [1080, 720], 'Compact release missing')
    obs = load(OUT / 'obs-run.json')
    require(
        obs['passed']
        and obs['obsVersion'] == '33.0.1'
        and obs['obsWebSocketVersion'] == '5.7.6'
        and obs['rpcVersion'] == 1
        and obs['method'] == 'AUTOMATED_OBS_WEBSOCKET_SOURCE_AND_SCENE_PNG',
        'Actual OBS proof missing',
    )
    for key in [
        'motion',
        'expression',
        'shortcut',
        'workingEditIsolation',
        'saveDuringBroadcast',
        'executionChange',
        'publisherFailureTransparent',
        'publisherRecovery',
        'syntheticInputLossFallback',
        'settingsRestore',
        'outputRestart',
        'outputOffOn',
        'addressRotationReconnect',
    ]:
        require(obs[key], 'OBS recovery missing: ' + key)
    require(
        not obs['streamingStarted']
        and not obs['recordingStarted']
        and not obs['existingUserScenesModified']
        and not obs['physicalDevicesOpened']
        and not obs['performanceAcceptance']
        and obs['m0'] == 'HOLD'
        and 'outside-app OS delivery NOT_RUN' in obs['shortcutScope'],
        'Actual OBS scope relabeled',
    )
    require(
        len(obs['alphaComposites']) == 2
        and all(
            r['passed'] and r['fractionWithin2'] >= 0.99 and r['backgroundPixelsCorrect']
            for r in obs['alphaComposites']
        ),
        'OBS alpha composite failed',
    )
    for image in obs['images']:
        png = np.asarray(Image.open(OUT / (image['label'] + '.png')).convert('RGBA'))
        require(
            hashlib.sha256(png.tobytes()).hexdigest() == image['pixelSha256'],
            'OBS PNG changed: ' + image['label'],
        )
    portable = ROOT / 'out/make/zip/win32/x64/2DSketcher-win32-x64-0.18.0.zip'
    require(portable.is_file(), 'Portable ZIP missing')
    artifacts = [
        'README.md',
        'docs/Todo',
        'docs/PRD.md',
        'docs/Function.md',
        'docs/planning/05-decisions.md',
        'docs/planning/23-broadcast.md',
        'docs/architecture/broadcast.md',
        'scripts/verify-broadcast.mjs',
        'scripts/broadcast-package-check.mjs',
        'scripts/broadcast-audit.py',
    ]
    for name in artifacts:
        if not name.endswith(('.md', 'Todo')):
            continue
        doc = ROOT / name
        for link in re.findall(r'\]\(([^)]+)\)', doc.read_text(encoding='utf8')):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'):
                continue
            target = (doc.parent / link.split('#')[0]).resolve()
            require(
                target.exists() or target in (OUT / 'audit.json', OUT / 'manifest.json'),
                'Broken link: ' + name + ': ' + link,
            )
    artifacts += [
        str(p.relative_to(ROOT)).replace('\\', '/')
        for p in OUT.rglob('*')
        if p.is_file() and p.name not in ('audit.json', 'manifest.json')
    ]
    hashes = {name: sha(ROOT / name) for name in artifacts}
    hashes['docs/Todo'] = hashlib.sha256(docs['Todo'].encode('utf8')).hexdigest()
    save(
        OUT / 'manifest.json',
        {
            'phase': 23,
            'created': datetime.datetime.now(datetime.UTC).isoformat(),
            'appVersion': '0.18.0',
            'modelSchema': '1.9',
            'sourceSha256': verification['sourceSha256'],
            'verifiedLFEquivalent': equivalents,
            'artifacts': hashes,
            'todoFromIndex': '--todo-from-index' in sys.argv,
            'portableZip': {
                'path': str(portable.relative_to(ROOT)).replace('\\', '/'),
                'bytes': portable.stat().st_size,
                'sha256': sha(portable),
            },
            'frozenHistoricalDirectories': frozen,
            'm0': 'HOLD',
            'openM0Revalidations': 5,
        },
    )
    save(
        OUT / 'audit.json',
        {
            'passed': not errors,
            'errors': errors,
            'phase': 23,
            'completedTasks': 228,
            'remainingTasks': 182,
            'newTasksChecked': list(range(221, 231)),
            'task190Complete': False,
            'task209Complete': False,
            'nodeGroups': 275,
            'pythonGroups': 36,
            'samePcReleaseRuns': 2,
            'actualOBSVerified': True,
            'actualOSGlobalKeysVerified': False,
            'actualPhysicalDevicesChecked': False,
            'm0': 'HOLD',
            'openM0Revalidations': 5,
            'manifestSha256': sha(OUT / 'manifest.json'),
        },
    )
    print(json.dumps({'passed': not errors, 'errors': errors}))
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
