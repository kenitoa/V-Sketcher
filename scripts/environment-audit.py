"""Audit phase26 with separate live/target evidence and frozen historical scope."""

import datetime
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'evidence/phase26'


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def save(path, value):
    Path(path).write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n'
    )


def run():
    errors = []

    def require(value, message):
        if not value:
            errors.append(message)

    docs = {
        n: (ROOT / 'docs' / n).read_text(encoding='utf-8')
        for n in ('Todo', 'PRD.md', 'Function.md')
    }
    if '--todo-from-index' in sys.argv:
        docs['Todo'] = subprocess.check_output(['git', 'show', ':docs/Todo'], cwd=ROOT).decode(
            'utf-8'
        )
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', docs['Todo'], re.MULTILINE)
    expected = set(range(1, 190)) | set(range(191, 209)) | set(range(210, 261))
    require([int(n) for _, n in tasks] == list(range(1, 411)), 'Task order changed')
    require(
        all((mark == 'x') == (int(n) in expected) for mark, n in tasks),
        'Task completion scope changed',
    )
    for name, text in docs.items():
        require('v0.27' in text[:2000], name + ' version mismatch')
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
    ] + [f'evidence/phase{i:02}' for i in range(6, 26)]
    require(
        not subprocess.check_output(
            ['git', 'diff', 'HEAD', '--name-only', '--', *frozen], cwd=ROOT
        ).strip(),
        'Historical evidence changed',
    )
    verified = load(OUT / 'verification.json')
    require(
        verified['passed']
        and verified['nodeTestGroups'] == 328
        and verified['pythonTestGroups'] == 36
        and verified['settingsIntegration'],
        'Required checks incomplete',
    )
    equivalents = (
        load(OUT / 'manifest.json').get('verifiedLFEquivalent', {})
        if (OUT / 'manifest.json').exists()
        else {}
    )
    for name, digest in verified['sourceSha256'].items():
        data = (ROOT / name).read_bytes()
        actual = hashlib.sha256(data).hexdigest()
        prior = equivalents.get(name, {})
        require(
            actual == digest
            or b'\r\n' not in data
            and prior.get('testedSha256') == digest
            and prior.get('lfSha256') == actual,
            'Verified source changed: ' + name,
        )
        if actual == digest and b'\r\n' in data and b'\0' not in data:
            equivalents[name] = {
                'testedSha256': digest,
                'lfSha256': hashlib.sha256(data.replace(b'\r\n', b'\n')).hexdigest(),
            }
    prior = load(OUT / 'development-run.json')
    require(
        prior['passed'] and prior['workerStopped'] and prior['appVersion'] == '0.21.0',
        'Full prior regression incomplete',
    )
    for name in (
        'broadcast-development-run.json',
        'image-development-run.json',
        'image-pixel-quality.json',
        'avatar-development-run.json',
        'avatar-pixel-quality.json',
        'settings-report.json',
    ):
        require(load(OUT / name)['passed'], 'Integration failed: ' + name)
    settings = load(OUT / 'settings-report.json')['settings']
    for key in (
        'globalKeysSuspendedInSettings',
        'editorTracksReleased',
        'executionTracksReleased',
        'requestsRevokedBeforeMedia',
        'runContinuedLimited',
        'defaultFolderSaved',
        'originalAssetsPreserved',
        'qualityAppliedAndRestored',
        'diagnosticReviewed',
        'settingsSeparateFromProject',
        'sourceHashUnchanged',
        'persistenceReopened',
        'defaultFolderFileExists',
        'diagnosticPrivacyChecked',
    ):
        require(settings[key], 'Settings scenario missing: ' + key)
    require(
        not settings['physicalDevicesOpened']
        and settings['syntheticMediaOnly']
        and not settings['endToEndMeasured']
        and not settings['automaticQuality'],
        'Synthetic scope relabeled',
    )
    package = load(OUT / 'package-audit.json')
    require(
        package['passed']
        and package['appVersion'] == '0.21.0'
        and not package['cleanWindowsOS']
        and not package['isolation']['developerToolsOnPath']
        and package['isolation']['freshProfiles'] == 2,
        'Release scope changed',
    )
    for attempt in (1, 2):
        r = load(OUT / f'packaged-run-{attempt}.json')
        require(
            r['passed']
            and r['packaged']
            and r['worker']['frozen']
            and r['worker']['dependencyFilesInsideBundle']
            and r['workerStopped'],
            'Release incomplete',
        )
        require(
            r['settings']['diagnosticPrivacyChecked'] and r['settings']['executionTracksReleased'],
            'Release settings incomplete',
        )
        if attempt == 2:
            require(r['windowSize'] == [1080, 720], 'Compact release missing')
    external = load(OUT / 'external/external-run.json')
    require(
        external['passed']
        and len(external['runs']) == 6
        and not external['ourAppRequired']
        and external['nativeEmbeddedAnimations'],
        'Independent target incomplete',
    )
    outputs = {
        (r['route'], r['version']): r['sha256']
        for r in load(OUT / 'avatar-development-run.json')['avatarExport']['files']
    }
    for row in external['runs']:
        require(
            row['qualityPassed']
            and row['appProcessExited']
            and row['workerStopped']
            and row['sourceSha256'] == outputs[(row['route'], row['resultVersion'])],
            'Independent file mismatch',
        )
    live = load(OUT / 'live-device-run.json')
    require(
        live['passed']
        and live['live']['method'] == 'HUMAN_STARTED_REAL_MEDIA_STREAMS'
        and live['live']['realFacePreviewAttested']
        and live['live']['editorAndExecutionResourcesReleased']
        and not live['cameraFramesStored']
        and not live['microphonePCMStored'],
        'Real device connection not accepted',
    )
    obs = load(OUT / 'live-obs/report.json')
    require(
        obs['passed']
        and obs['method'] == 'OFFICIAL_OBS_BROWSER_SOURCE_LIVE_CHARACTER_ONLY'
        and not obs['streamingStarted']
        and not obs['recordingStarted']
        and not obs['existingUserScenesModified'],
        'Live official broadcast missing',
    )
    review = load(OUT / 'm3-review.json')
    require(
        review['connectedFlowReview'] == 'PASS'
        and review['milestoneReleaseApproval'] == 'HOLD'
        and review['m0'] == 'HOLD',
        'M3 review scope changed',
    )
    portable = ROOT / 'out/make/zip/win32/x64/2DSketcher-win32-x64-0.21.0.zip'
    require(portable.is_file(), 'ZIP missing')
    documents = [
        'README.md',
        'docs/Todo',
        'docs/PRD.md',
        'docs/Function.md',
        'docs/planning/05-decisions.md',
        'docs/planning/26-environment.md',
        'docs/architecture/environment.md',
        'docs/architecture/input-recovery.md',
    ]
    for name in documents:
        for link in re.findall(r'\]\(([^)]+)\)', (ROOT / name).read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'):
                continue
            target = ((ROOT / name).parent / link.split('#')[0]).resolve()
            require(
                target.exists() or target in (OUT / 'audit.json', OUT / 'manifest.json'),
                'Broken link: ' + name + ': ' + link,
            )
    artifacts = documents + [
        str(p.relative_to(ROOT)).replace('\\', '/')
        for p in OUT.rglob('*')
        if p.is_file() and p.name not in ('audit.json', 'manifest.json')
    ]
    hashes = {name: sha(ROOT / name) for name in artifacts}
    hashes['docs/Todo'] = hashlib.sha256(docs['Todo'].encode('utf-8')).hexdigest()
    save(
        OUT / 'manifest.json',
        {
            'phase': 26,
            'created': datetime.datetime.now(datetime.UTC).isoformat(),
            'appVersion': '0.21.0',
            'sourceSha256': verified['sourceSha256'],
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
        },
    )
    save(
        OUT / 'audit.json',
        {
            'passed': not errors,
            'errors': errors,
            'phase': 26,
            'completedTasks': 258,
            'remainingTasks': 152,
            'newTasksChecked': list(range(251, 261)),
            'nodeGroups': 328,
            'pythonGroups': 36,
            'samePcReleaseRuns': 2,
            'realDeviceConnectionTrial': live['passed'],
            'independentTargetRuns': 6,
            'connectedM3FlowReview': 'PASS',
            'milestoneReleaseApproval': 'HOLD',
            'task190Complete': False,
            'task209Complete': False,
            'm0': 'HOLD',
            'openM0Revalidations': 5,
            'manifestSha256': sha(OUT / 'manifest.json'),
        },
    )
    print(json.dumps({'passed': not errors, 'errors': errors}))
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
