"""Evidence-based phase25 completion audit. Historical/M0 scope stays separate."""
import datetime
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT/'evidence/phase25'


def load(path):
    return json.loads(Path(path).read_text(encoding='utf8'))


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def save(path, value):
    Path(path).write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n', encoding='utf8', newline='\n')


def run():
    errors = []

    def require(value, message):
        if not value:
            errors.append(message)

    docs = {name: (ROOT/'docs'/name).read_text(encoding='utf8') for name in ('Todo', 'PRD.md', 'Function.md')}
    if '--todo-from-index' in sys.argv:
        docs['Todo'] = subprocess.check_output(['git', 'show', ':docs/Todo'], cwd=ROOT).decode('utf8')
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', docs['Todo'], re.MULTILINE)
    expected = set(range(1, 190)) | set(range(191, 209)) | set(range(210, 251))
    require([int(n) for _, n in tasks] == list(range(1, 411)), 'Task order changed')
    require(all((mark == 'x') == (int(n) in expected) for mark, n in tasks), 'Task completion scope changed')
    for name, text in docs.items():
        require('v0.26' in text[:2000], name+' version mismatch')
    baseline = load(ROOT/'experiments/phase05/results/baseline.json')
    for key, name, pattern in [('function_ids', 'Function.md', r'\bF-[A-Z0-9]{2,3}-\d{3}\b'), ('product_direction_ids', 'PRD.md', r'\bPD-\d{2}\b'), ('acceptance_ids', 'PRD.md', r'\bAC-\d{2}\b')]:
        require(sorted(set(re.findall(pattern, docs[name]))) == baseline[key], key+' changed')
    m0 = load(ROOT/'experiments/phase05/decisions.json')['m0']
    require(m0['state'] == 'HOLD' and not m0['passed'] and len(m0['open_revalidation']) == 5 and all(r['state'] == 'OPEN' for r in m0['open_revalidation']), 'M0 changed')
    frozen = ['experiments/phase02', 'experiments/phase03', 'experiments/phase04', 'experiments/phase05'] + [f'evidence/phase{i:02}' for i in range(6, 25)]
    require(not subprocess.check_output(['git', 'diff', 'HEAD', '--name-only', '--', *frozen], cwd=ROOT).strip(), 'Historical evidence changed')
    verification = load(OUT/'verification.json')
    require(verification['passed'] and verification['nodeTestGroups'] == 315 and verification['pythonTestGroups'] == 36 and verification['totalTestGroups'] == 351 and verification['newAvatarExportNodeGroups'] == 20, 'Required gate incomplete')
    prior = load(OUT/'manifest.json') if (OUT/'manifest.json').exists() else {}
    equivalents = prior.get('verifiedLFEquivalent', {})
    for path, digest in verification['sourceSha256'].items():
        data = (ROOT/path).read_bytes()
        actual = hashlib.sha256(data).hexdigest()
        equivalent = equivalents.get(path, {})
        require(actual == digest or b'\r\n' not in data and equivalent.get('testedSha256') == digest and equivalent.get('lfSha256') == actual, 'Verified source changed: '+path)
        if actual == digest and b'\r\n' in data and b'\0' not in data:
            equivalents[path] = {'testedSha256': digest, 'lfSha256': hashlib.sha256(data.replace(b'\r\n', b'\n')).hexdigest()}
    dev = load(OUT/'development-run.json')
    require(dev['passed'] and dev['appVersion'] == '0.20.0' and dev['workerStopped'], 'Prior full regression failed')
    for key in ['runtimeChanges', 'execution', 'projects', 'editor', 'motion', 'input', 'parts', 'structure', 'corrections', 'split', 'detail', 'expressions', 'tracking', 'inputRecovery']:
        require(dev[key]['passed'], 'Prior regression failed: '+key)
    require(load(OUT/'broadcast-development-run.json')['passed'] and load(OUT/'image-development-run.json')['passed'] and load(OUT/'image-pixel-quality.json')['passed'], 'Broadcast/PNG regression failed')

    def avatar_output(report, folder):
        ui = report['avatarExport']
        require(report['passed'] and report['appVersion'] == '0.20.0' and report['workerStopped'], 'Avatar run incomplete')
        require(ui['passed'] and ui['actualFileMoveReconnected'] and ui['resourcesReleased'] and ui['cancelledBuild'], 'Avatar recovery/cleanup incomplete')
        require([r['route'] for r in ui['routes']] == ['parts', 'single-image', 'split-image'], 'Three actual routes missing')
        for route in ui['routes']:
            require(all(route[k] for k in ['passed', 'actualRoutePreparation', 'conversionPreview', 'reviewRequired', 'realINPWrite', 'staleRejected', 'reexport', 'oldConfirmationStale', 'targetVersionRejected', 'settingsReopened']), 'Avatar scenario missing: '+route['route'])
        require(ui['deviceRequests'] == 0 and not ui['physicalDevicesOpened'] and ui['programmaticConfirmationOnly'] and not ui['actualExternalRuntimeVerified'] and ui['m0'] == 'HOLD', 'UI observation relabeled as external/physical acceptance')
        require(len(ui['files']) == 6 and len(ui['images']) == 42, 'Native outputs/references missing')
        for row in ui['files']:
            require(sha(folder/row['name']) == row['sha256'] and (folder/row['name']).read_bytes()[:8] == b'TRNSRTS\0', 'INP bytes/digest mismatch')
            require(row['textureCount'] > 0 and row['parameterCount'] == 5 and row['animationCount'] >= 2, 'Native content incomplete')
        for row in ui['images']:
            require(all((folder/row[k]).is_file() for k in ('original', 'converted', 'target')), 'Reference PNG missing')
        require(report['protections'] == {'sandbox': True, 'contextIsolation': True, 'nodeIntegration': False, 'externalNetworkBlocked': True}, 'App protections changed')

    avatar_output(load(OUT/'avatar-development-run.json'), OUT/'development-avatar')
    require(load(OUT/'avatar-pixel-quality.json')['passed'], 'Independent source/native pixel quality failed')
    package = load(OUT/'package-audit.json')
    require(package['passed'] and package['appVersion'] == '0.20.0' and package['commonProjectSchema'] == '1.9' and not package['cleanWindowsOS'] and not package['isolation']['developerToolsOnPath'] and package['isolation']['freshProfiles'] == 2 and not package['obsBundled'], 'Packaged scope changed')
    for attempt in (1, 2):
        r = load(OUT/f'packaged-run-{attempt}.json')
        avatar_output(r, OUT/f'packaged-{attempt}')
        require(load(OUT/f'pixel-quality-release-{attempt}.json')['passed'], 'Packaged pixel quality failed')
        require(r['packaged'] and r['channel'] == 'release' and r['worker']['frozen'] and r['worker']['dependencyFilesInsideBundle'], 'Release worker incomplete')
        if attempt == 2:
            require(r['windowSize'] == [1080, 720], 'Compact package missing')
    external = load(OUT/'external/external-run.json')
    require(external['passed'] and external['method'] == 'AUTOMATED_TARGET_ONLY_CAPTURE_AFTER_PRODUCT_EXIT' and external['targetVersion'] == '0.8.7' and external['sdkVersion'] == '0.8.6' and external['nativeEmbeddedAnimations'] and not external['programmaticTargetInput'] and not external['ourAppRequired'] and not external['ourFrameServerRequired'], 'Independent target not verified')
    require(not external['streamingStarted'] and not external['recordingStarted'] and not external['existingUserScenesModified'] and not external['physicalDevicesOpened'] and external['m0'] == 'HOLD', 'External test scope changed')
    require(len(external['runs']) == 6 and all(r['qualityPassed'] and r['appProcessExited'] and r['workerStopped'] and r['movedUnicodeAndSpacePath'] and r['externalFileUnchanged'] for r in external['runs']), 'Native initial/re-export route validation incomplete')
    outputs = {(r['route'], r['version']): r['sha256'] for r in load(OUT/'avatar-development-run.json')['avatarExport']['files']}
    for row in external['runs']:
        require(row['sourceSha256'] == outputs[(row['route'], row['resultVersion'])], 'External file was not the verified product output')
        quality = load(OUT/'external'/f"{row['route']}-v{row['resultVersion']}-quality.json")
        require(quality['passed'] and len(quality['checks']) == 7 and len(quality['classifiedPoses']) == 7, 'Target poses missing')
        for check in quality['checks']:
            require(check['passed'] and sha(OUT/'external'/check['image']) == check['sha256'], 'Target capture changed')
    portable = ROOT/'out/make/zip/win32/x64/2DSketcher-win32-x64-0.20.0.zip'
    require(portable.is_file(), 'Portable ZIP missing')
    artifacts = ['README.md', 'docs/Todo', 'docs/PRD.md', 'docs/Function.md', 'docs/planning/05-decisions.md', 'docs/planning/25-external-avatar.md', 'docs/architecture/avatar-export.md']
    for name in artifacts:
        for link in re.findall(r'\]\(([^)]+)\)', (ROOT/name).read_text(encoding='utf8')):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'):
                continue
            target = ((ROOT/name).parent/link.split('#')[0]).resolve()
            require(target.exists() or target in (OUT/'audit.json', OUT/'manifest.json'), 'Broken link: '+name+': '+link)
    artifacts += [str(p.relative_to(ROOT)).replace('\\', '/') for p in OUT.rglob('*') if p.is_file() and p.name not in ('audit.json', 'manifest.json')]
    digests = {name: sha(ROOT/name) for name in artifacts}
    digests['docs/Todo'] = hashlib.sha256(docs['Todo'].encode('utf8')).hexdigest()
    save(OUT/'manifest.json', {'phase': 25, 'created': datetime.datetime.now(datetime.UTC).isoformat(), 'appVersion': '0.20.0', 'modelSchema': '1.9', 'sourceSha256': verification['sourceSha256'], 'verifiedLFEquivalent': equivalents, 'artifacts': digests, 'todoFromIndex': '--todo-from-index' in sys.argv, 'portableZip': {'path': str(portable.relative_to(ROOT)).replace('\\', '/'), 'bytes': portable.stat().st_size, 'sha256': sha(portable)}, 'frozenHistoricalDirectories': frozen, 'm0': 'HOLD', 'openM0Revalidations': 5})
    save(OUT/'audit.json', {'passed': not errors, 'errors': errors, 'phase': 25, 'completedTasks': 248, 'remainingTasks': 162, 'newTasksChecked': list(range(241, 251)), 'task190Complete': False, 'task209Complete': False, 'nodeGroups': 315, 'pythonGroups': 36, 'samePcReleaseRuns': 2, 'independentOfficialTargetRuns': 6, 'actualExternalAvatarGenerated': True, 'physicalDevicesVerified': False, 'osGlobalKeysVerified': False, 'm0': 'HOLD', 'openM0Revalidations': 5, 'manifestSha256': sha(OUT/'manifest.json')})
    print(json.dumps({'passed': not errors, 'errors': errors}))
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
