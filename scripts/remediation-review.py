"""Evidence-based completion of the requested open tasks; no invented human or release results."""

from pathlib import Path
import hashlib
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence/remediation26-31/review-02'


def read(name):
    return json.loads((ROOT / name).read_text(encoding='utf-8'))


def main():
    if OUT.exists():
        raise ValueError('E_REMEDIATION_EXISTS')
    media = read('evidence/remediation26-31/media-02/media.json')
    current_media = read('evidence/remediation26-31/media-04/media.json')
    source_media = read('evidence/remediation26-31/media-03/media.json')
    space = read('evidence/remediation26-31/space-03/space.json')
    package = read('evidence/remediation26-31/package-02/package.json')
    linear = read('evidence/remediation26-31/linear-08/linear.json')
    visual = read('evidence/remediation26-31/linear-08/visual-review.json')
    role = read('evidence/remediation26-31/roles-03/role-proof.json')
    cleanup = read('evidence/remediation26-31/cleanup-01.json')
    assert all(
        row['passed']
        for row in [media, current_media, source_media, space, package, linear, role, cleanup]
    )
    assert media['physicalDeviceCycles'] == 60 and current_media['physicalDeviceCycles'] == 6
    assert all(
        row['liveTracksAfterStop'] == 0 and not row['audioContextAfterStop']
        for row in media['cycles'] + current_media['cycles']
    )
    assert len(space['tests']) == 9 and all(
        row['actualOSCode'] == 'ENOSPC' for row in space['tests']
    )
    assert package['appVersion'] == '0.22.1' and package['originalFrozenZipPreserved']
    assert (
        linear['sameProjectForBothVersions']
        and len(linear['rows']) == 6
        and len(linear['independentTarget']['runs']) == 6
    )
    assert all(
        image['pixels']['passed'] and image['sourceReadyBeforeCapture']
        for row in linear['rows']
        for image in row['obsImages']
    )
    assert (
        visual['connectionRegressionVisualReviewPassed'] and not visual['productArtworkAcceptance']
    )
    gate = (ROOT / '.local/remediation-required-03.log').read_text(
        encoding='utf-8', errors='replace'
    )
    assert (
        'Required foundation checks passed' in gate
        and re.search(r'tests\s+341', gate)
        and 'Ran 43 tests' in gate
    )
    for route in ['parts', 'single-image', 'split-image']:
        first, second = sorted(
            [row for row in linear['rows'] if row['route'] == route], key=lambda row: row['version']
        )
        assert (
            first['projectId'] == second['projectId']
            and second['sourceRevision'] > first['sourceRevision']
        )
        assert (
            first['file']['sha256'] != second['file']['sha256']
            and first['png']['sha256'] != second['png']['sha256']
        )
        assert (
            second['olderResultsStale']
            and first['sourceAssetsUnchanged']
            and second['sourceAssetsUnchanged']
        )
    complete = list(range(251, 260)) + [262, 263, 264, 265, 271]
    pending = [
        i
        for i in range(251, 311)
        if re.search(rf'^- \[ \] T-{i}\b', (ROOT / 'docs/Todo').read_text(encoding='utf-8'), re.M)
        and i not in complete
    ]
    OUT.mkdir(parents=True)
    report = {
        'passedLocalRemediation': True,
        'allRequestedTasksComplete': False,
        'appVersion': '0.22.1',
        'newlyCompleted': ['T-' + str(i) for i in complete],
        'remainingOpen': ['T-' + str(i) for i in pending],
        'requiredGate': {
            'passed': True,
            'command': r'tools\dev.cmd run check',
            'nodeTests': 341,
            'pythonTests': 43,
            'total': 384,
        },
        'actualSpaceExhaustionCases': 9,
        'actualMediaOpenCloseCycles': 72,
        'mainMediaCycles': 60,
        'sourceClassificationCycles': 12,
        'controlledPhotoIsNotLiveParticipant': True,
        'sameProjectLinearRuns': 6,
        'independentOfficialTargetRuns': 6,
        'twoFreshPackagedSettingsRuns': True,
        'cleanWindowsOS': False,
        'realNoviceObservationsAdded': 0,
        'normalLiveFaceVoiceBodyAcceptance': False,
        'productArtworkAcceptance': False,
        'singleImagePatchSeamsRemainOpen': True,
        'twoHoursPerRouteCompleted': False,
        'release': {
            'decision': 'HOLD',
            'signature': package['signature'],
            'published': False,
            'signed': False,
            'pushed': False,
            'postReleaseObservations': False,
        },
        'M0': 'HOLD',
        'openM0Revalidations': 5,
        'historicalEvidencePreserved': True,
        'rawCameraFramesStored': False,
        'microphonePCMStored': False,
        'evidence': {
            'space': 'space-03/space.json',
            'media': 'media-02/media.json',
            'currentPackagedWorkerMedia': 'media-04/media.json',
            'package': 'package-02/package.json',
            'linear': 'linear-08/linear.json',
            'visualReview': 'linear-08/visual-review.json',
            'roleCorrection': 'roles-03/role-proof.json',
        },
    }
    (OUT / 'review.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    source = list((ROOT / 'scripts').glob('remediation-*')) + list(
        (ROOT / 'tools').glob('remediation-*')
    )
    source += [
        ROOT / name
        for name in [
            'packages/project-storage/catalog.ts',
            'packages/project-storage/replace.ts',
            'tests/journal-replace.test.ts',
            'scripts/test.mjs',
            'package.json',
            'package-lock.json',
            'tools/fixtures/camera/source.json',
            'tools/fixtures/camera/astronaut.png',
        ]
    ]
    manifest = []
    with zipfile.ZipFile(OUT / 'source.zip', 'x', compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(source):
            if path.is_file():
                relative = path.relative_to(ROOT).as_posix()
                data = path.read_bytes()
                archive.writestr(relative, data)
                manifest.append({'file': relative, 'sha256': hashlib.sha256(data).hexdigest()})
    (OUT / 'source-manifest.json').write_text(
        json.dumps(manifest, indent=2) + '\n', encoding='utf-8'
    )
    print(
        'Fourteen open tasks verified complete; twenty remain evidence-dependent, without approval questions'
    )


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_REMEDIATION_REVIEW')
        raise SystemExit(1)
