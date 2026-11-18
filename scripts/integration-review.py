"""Review fresh integration receipts; never infer human acceptance from automation."""
import argparse
import datetime
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load(path):
    return json.loads(path.read_text(encoding='utf8'))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--run', required=True)
    parser.add_argument('--obs', default='obs-03/obs-run.json')
    args = parser.parse_args()
    run = (ROOT / args.run).resolve()
    assert run.is_relative_to(ROOT / 'evidence/phase27')
    assert not (run / 'review.json').exists()
    gate, coverage = load(run / 'verification.json'), load(run / 'coverage.json')
    assert gate['passed'] and gate['scope'] == 'AUTOMATED_INTEGRATION_ONLY'
    assert coverage['inventoryPassed'] and coverage['initialFeatures'] == 46
    assert all(stage['passed'] for stage in gate['stages'])
    full = load(run / 'development-run.json')
    assert full['passed'] and full['workerStopped']
    for name in ['detail', 'runtimeChanges', 'inputRecovery', 'tracking', 'expressions']:
        assert full[name]['passed'] and len(full[name]['routes']) == 3
    avatar = load(run / 'avatar/report.json')['avatarExport']
    assert len(avatar['files']) == 6 and len(avatar['images']) == 42
    assert load(run / 'avatar-pixel-quality.json')['passed']
    assert load(run / 'image-pixel-quality.json')['passed']
    obs = load(run / args.obs) if (run / args.obs).exists() else None
    external = load(run / 'external-03/external-run.json') if (run / 'external-03/external-run.json').exists() else None
    obs_pixels = (run / args.obs).parent / 'pixel-quality.json'
    actual_obs = bool(obs and obs['passed'] and len(obs['routes']) == 3
                      and obs_pixels.exists() and load(obs_pixels)['passed'])
    actual_external = bool(external and external['passed'] and len(external['runs']) == 6)
    completed = [261, 266, 268]
    if actual_obs and actual_external:
        completed.append(269)
    result = {
        'created': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'automatedIntegrationPassed': True,
        'nodeTestGroups': gate['nodeTestGroups'], 'pythonTestGroups': gate['pythonTestGroups'],
        'completedTasks': completed,
        'pendingTasks': [n for n in range(261, 271) if n not in completed],
        'actualOBSAllRoutes': actual_obs, 'officialIndependentTargetSixRuns': actual_external,
        'phase27Complete': False, 'm0': 'HOLD',
        'blockers': [
            'T-260 predecessor review remains incomplete',
            'One project identity through preparation, reopen, live run, OBS, PNG and external export needs a linear scenario',
            'T-190 real human camera calibration and T-209 OS global keys remain pending',
            'Human voice/noise and physical device unplug observation remain pending',
            'AC-10 duration/performance and AC-15 novice observation remain separate gates',
        ],
        'evidenceSha256': {},
    }
    for path in [run / 'verification.json', run / 'coverage.json', run / 'development-run.json',
                 run / 'image-pixel-quality.json', run / 'avatar-pixel-quality.json',
                 run / args.obs, obs_pixels, run / 'external-03/external-run.json',
                 run / 'camera-path-comparison.json']:
        if path.is_file():
            result['evidenceSha256'][path.relative_to(run).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    (run / 'review.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf8')
    print('Integration review recorded; phase27 completion and M0 remain HOLD.')


if __name__ == '__main__':
    main()
