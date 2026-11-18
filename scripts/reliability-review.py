"""Freeze bounded evidence and explicit non-passing endurance/latency gates."""
import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load(path):
    return json.loads(path.read_text(encoding='utf8'))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--run', required=True)
    run = (ROOT / parser.parse_args().run).resolve()
    assert run.is_relative_to(ROOT / 'evidence/phase28') and not (run / 'review.json').exists()
    gate, storage = load(run / 'verification.json'), load(run / 'storage.json')
    cycles, gpu = load(run / 'cycles-privacy.json'), load(run / 'gpu/gpu.json')
    notices = load(run / 'notices.json')
    assert gate['passed'] and storage['passed'] and cycles['passed'] and gpu['passed']
    assert all(stage['passed'] for stage in gate['stages'])
    assert cycles['cycles'] == 60 and len(gpu['cycles']) == 12 and len(gpu['stages']) == 3
    assert all(row['passed'] for row in storage['results'])
    expected = {
        'actual-path-error-preserves-normal', 'actual-readonly-error-retry-and-save-as',
        'controlled-ENOSPC-at-six-boundaries', 'actual-recovery-budget-exhaustion',
        'actual-process-kill-save-boundaries', 'actual-process-kill-edit-recovery',
        'actual-process-kill-export', 'actual-analysis-worker-kill-and-real-retry',
        'actual-missing-move-relink-and-future-versions',
    }
    assert {row['name'] for row in storage['results']} == expected
    assert notices['localInventoryPassed'] and not notices['pythonPackagesWithoutCopiedLicenseText']
    assert load(run / 'package-license.json')['passed']
    assert load(run / 'package/package-audit.json')['passed']
    assert all(load(run / f'package/packaged-run-{n}.json')['passed'] for n in (1, 2))
    for name, digest in gate['sourceSha256'].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, name
    frozen = [f'experiments/phase{n:02}' for n in range(2, 6)] + [f'evidence/phase{n:02}' for n in range(6, 28)]
    # Phase26/27 were already uncommitted before this task; compare tracked history only.
    assert not subprocess.check_output(['git', 'diff', 'HEAD', '--name-only', '--', *[p for p in frozen if p not in ('evidence/phase26', 'evidence/phase27')]], cwd=ROOT).strip()
    scan = []
    for path in run.rglob('*.json'):
        text = path.read_text(encoding='utf8')
        assert not re.search(r'[A-Za-z]:[\\/]+Users[\\/]', text, re.I), path.name
        scan.append(path.relative_to(run).as_posix())
    statuses = {
        'T-271': 'PARTIAL: actual permission/path/budget errors and controlled ENOSPC; physical filesystem exhaustion NOT_RUN',
        'T-272': 'PASS: 34 owned product-code/worker process terminations and recovery/retry; whole Electron/OS power loss NOT_RUN',
        'T-273': 'PASS: actual missing resource, hash relink, portable bundle move and future versions',
        'T-274': 'NOT_RUN: each route two hours with actual camera/microphone/OBS recording required',
        'T-275': 'PARTIAL: 60 host-service cycles and 12 WebGL allocation cycles; physical devices/long-duration accumulation NOT_RUN',
        'T-276': 'NOT_RUN for input-to-OBS latency; render wall/frame-interval diagnostics only',
        'T-277': 'PARTIAL: one-scene 36-second bounded render/load sweep; full input set and concurrent OBS/device load NOT_RUN',
        'T-278': 'PASS in current local boundaries: log/diagnostic/HTTP canaries and output protections; no human media collected',
        'T-279': 'PASS current private build inventory/notices/package bytes; public distribution approval remains false',
        'T-280': 'BLOCKED: prior stage, real tracking, endurance, full latency/load and release approvals unresolved',
    }
    result = {'boundedChecksPassed': True, 'tasks': statuses, 'completedTasks': [272, 273, 278, 279],
              'phase28Complete': False, 'releaseDecision': 'HOLD', 'm0': 'HOLD',
              'privacyJSONFilesScanned': scan, 'webglDiagnostics': gpu['stages'],
              'enduranceRequiredMsPerRoute': 7200000, 'enduranceActualCompletedRuns': 0,
              'sensorToOBSLatency': 'NOT_RUN', 'cleanWindowsVerified': False,
              'publicDistributionApproved': False, 'evidenceSha256': {}}
    for name in ['verification.json', 'storage.json', 'cycles-privacy.json', 'gpu/gpu.json',
                 'notices.json', 'package-license.json', 'package/package-audit.json']:
        result['evidenceSha256'][name] = hashlib.sha256((run / name).read_bytes()).hexdigest()
    (run / 'review.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf8')
    print('T272/273/278/279 bounded checks complete; phase28 and release remain HOLD.')


if __name__ == '__main__':
    main()
