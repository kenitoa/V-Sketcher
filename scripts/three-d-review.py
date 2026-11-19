"""Assemble new, immutable phase31 evidence; never promote a failed device trial."""

from pathlib import Path
import hashlib
import json
import re
import zipfile
import subprocess
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence/phase31'


def read(relative):
    return json.loads((ROOT / relative).read_text(encoding='utf-8'))


def main():
    corpus = OUT / 'corpus-01'
    review = OUT / 'review-01'
    if corpus.exists() or review.exists():
        raise ValueError('E_3D_OUTPUT_EXISTS')
    assets = read('assets/product/manifest.json')
    entries = []
    for asset in assets['assets']:
        source = ROOT / 'assets/product' / asset['path']
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        if digest != asset['sha256']:
            raise ValueError('E_3D_SOURCE_HASH')
        entries.append(
            {
                'file': source.relative_to(ROOT).as_posix(),
                'sha256': digest,
                'role': 'front input'
                if len(entries) == 0
                else 'existing aligned expression/appearance comparison',
                'origin': 'project-generated premium reference',
                'publicRedistributionApproved': False,
            }
        )
    annotation = read('tools/three-d-reference.json')
    anatomy = read('.local/research31/anatomy-01.json')
    if (
        anatomy['sourceSha256'] != entries[0]['sha256']
        or annotation['sourceSha256'] != entries[0]['sha256']
    ):
        raise ValueError('E_3D_ANNOTATION_HASH')
    poses = [{'name': 'neutral', 'controls': {}, 'expected': 'no motion'}]
    for key, values in {
        'yaw': [-0.4, 0.4],
        'blinkLeft': [1],
        'blinkRight': [1],
        'mouth': [1],
        'chest': [-0.2, 0.2],
        'leftUpperArm': [-0.3, 0.3],
        'leftLowerArm': [-0.3, 0.3],
        'rightUpperArm': [-0.3, 0.3],
        'rightLowerArm': [-0.3, 0.3],
    }.items():
        for number in values:
            poses.append(
                {
                    'name': key + '-' + str(number),
                    'controls': {key: number},
                    'expected': 'only this part and its descendants, with declared skin blending',
                }
            )
    ui = read('evidence/phase31/run-05/ui-summary.json')
    auto = read('evidence/phase31/run-05/auto-report.json')
    target = read('evidence/phase31/run-05/target-report.json')
    final_ui = read('evidence/phase31/run-07/auto-report.json')
    final_validation = read('evidence/phase31/validation-01/summary.json')
    assert (
        final_ui['passed']
        and final_ui['syntheticInputResetVerified']
        and final_validation['passed']
    )
    blender = read('evidence/phase31/run-05/blender/report.json')
    live = read('evidence/phase31/live-02/obs-live.json')
    latest_live = read('evidence/phase31/live-03/obs-live.json')
    assert all(v['passed'] for v in [ui, auto, target, blender])
    raw_gate = (ROOT / '.local/phase31-required-check-02.log').read_bytes()
    gate = (
        raw_gate.decode('utf-16')
        if raw_gate.startswith(b'\xff\xfe')
        else raw_gate.decode('utf-8-sig')
    )
    assert 'Required foundation checks passed' in gate and 'Ran 43 tests' in gate
    assert re.search(r'tests\s+338', gate)
    learned_dir = OUT / 'learned-02'
    learned = (
        read('evidence/phase31/learned-02/report.json')
        if (learned_dir / 'report.json').exists()
        else read('evidence/phase31/learned-02/failure.json')
    )
    if learned.get('passed'):
        assert read('evidence/phase31/learned-02/blender/report.json')['passed']
    higher_resolution = read('evidence/phase31/learned-03/report.json')
    assert (
        higher_resolution['passed']
        and read('evidence/phase31/learned-03/blender-unlit/report.json')['passed']
    )
    corpus.mkdir()
    (corpus / 'manifest.json').write_text(
        json.dumps(
            {
                'version': 1,
                'scope': 'rights-traceable exploratory corpus; not release-quality coverage',
                'assets': entries,
                'sourceRecord': 'experiments/phase04/assets/premium/generation-prompts.md',
                'annotation': annotation,
                'sourceRecognition': anatomy,
                'controlCases': poses,
                'realSideRearGroundTruthAvailable': False,
                'independentFinished3DReferenceAvailable': False,
                'missingForRelease': [
                    '12 rights-cleared characters',
                    'same-character real side/rear views or 3D references',
                    'independent quality ratings',
                    'novice completion observations',
                ],
                'humanFramesStored': False,
                'humanPCMStored': False,
                'productTrainingPermission': False,
            },
            indent=2,
        )
        + '\n',
        encoding='utf-8',
    )
    review.mkdir()
    complete = ['T-301', 'T-302', 'T-303', 'T-304', 'T-305', 'T-306', 'T-308', 'T-309', 'T-310']
    report = {
        'date': datetime.now(timezone.utc).isoformat(),
        'section31Complete': False,
        'completed': complete,
        'open': ['T-307'],
        'decision': 'HOLD for product 3D; continue bounded research',
        'M0': 'HOLD',
        'prior2DReleaseHoldsPreserved': True,
        'requiredGate': {'passed': True, 'nodeTests': 338, 'pythonTests': 43, 'total': 381},
        'sourceOriginalUnchanged': ui['sourceUnchanged'],
        'partWeightProof': auto['bodyWeightsVerified'],
        'finalUISource': 'evidence/phase31/run-07',
        'syntheticStopReturnsToNeutral': final_ui['syntheticInputResetVerified'],
        'sourceAutoFaceDetections': anatomy['faceCount'],
        'sourceAutoBodyDetections': anatomy['bodyCount'],
        'independentGLB': blender['passed'],
        'officialVRMLibraryLoad': target['independentVRM'],
        'independentVRMDesktopTrackingAccepted': False,
        'actualOBS': {
            'version': live['obsVersion'],
            'uniqueAvatarImages': live['uniqueImages'],
            'faceBroadcastPassed': live['faceBroadcastPassed'],
            'bodyMotionAccepted': live['bodyMotionAccepted'],
            'overallPassed': live['passed'],
        },
        'latestTrial': {
            'file': 'evidence/phase31/live-03/obs-live.json',
            'overallPassed': latest_live['passed'],
            'framesWithFace': latest_live['live']['framesWithFace'],
            'bodyObservedFrames': latest_live['live']['bodyObservedFrames'],
        },
        'learnedCandidate': learned,
        'learnedHigherResolution': higher_resolution,
        'criticalRisks': ['D31-R01', 'D31-R02', 'D31-R03', 'D31-R04', 'D31-R05', 'D31-R06'],
        'rawCameraFramesStored': False,
        'microphonePCMStored': False,
        'productPackagingChangedBy31': False,
        'published': False,
        'signed': False,
        'pushed': False,
        'historicalRunsPreserved': True,
    }
    (review / 'review.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    (learned_dir / 'provenance.json').write_text(
        json.dumps(read('.local/research31/triposr-receipt.json'), indent=2) + '\n',
        encoding='utf-8',
    )
    snapshot_files = sorted(
        list((ROOT / 'tools').glob('three-d-*'))
        + list((ROOT / 'scripts').glob('three-d-*'))
        + [ROOT / 'tests/worker/test_three_d_motion.py']
    )
    snapshot_manifest = []
    with zipfile.ZipFile(
        review / 'reproduction-source.zip', 'x', compression=zipfile.ZIP_DEFLATED
    ) as archive:
        for source in snapshot_files:
            if not source.is_file():
                continue
            relative = source.relative_to(ROOT).as_posix()
            data = source.read_bytes()
            archive.writestr(relative, data)
            snapshot_manifest.append({'file': relative, 'sha256': hashlib.sha256(data).hexdigest()})
        for name in ['package.json', 'package-lock.json']:
            archive.writestr(
                'research-dependencies/' + name, (ROOT / '.local/research31' / name).read_bytes()
            )
    (review / 'source-manifest.json').write_text(
        json.dumps(snapshot_manifest, indent=2) + '\n', encoding='utf-8'
    )
    (review / 'required-check.json').write_text(
        json.dumps(
            {
                'passed': True,
                'command': r'tools\dev.cmd run check',
                'nodeTests': 338,
                'pythonTests': 43,
                'total': 381,
                'typecheck': True,
                'workerStaticCheck': True,
                'testBuild': True,
                'rawLogPublished': False,
                'knownWarnings': ['Vite chunk-size advisory', 'existing module-type advisory'],
                'packagedCheckRequiredForThisChange': False,
                'packagingChangedBy31': False,
            },
            indent=2,
        )
        + '\n',
        encoding='utf-8',
    )
    packages = subprocess.run(
        [
            str(ROOT / '.local/research31/triposr-env/Scripts/python.exe'),
            '-I',
            '-m',
            'pip',
            'list',
            '--format=json',
        ],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        encoding='utf-8',
    )
    (review / 'research-python-packages.json').write_text(
        json.dumps(json.loads(packages.stdout), indent=2) + '\n', encoding='utf-8'
    )
    print('Phase31 evidence assembled: 9 complete, T-307 open, product/M0 HOLD')


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_3D_REVIEW')
        raise SystemExit(1)
