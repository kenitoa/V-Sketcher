"""Inventory all features/AC/FT without promoting automated checks to acceptance."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output-dir', required=True)
    out = Path(parser.parse_args().output_dir).resolve()
    assert out.is_relative_to(ROOT / 'evidence' / 'phase27')
    out.mkdir(parents=True, exist_ok=True)
    assert not (out / 'coverage.json').exists()
    function = (ROOT / 'docs/Function.md').read_text(encoding='utf-8-sig')
    prd = (ROOT / 'docs/PRD.md').read_text(encoding='utf-8-sig')
    features = re.findall(r'^### (F-[A-Z0-9]+-\d{3})\.', function, re.M)
    acceptance = re.findall(r'^\| (AC-\d{2}) \|', prd, re.M)
    scenarios = re.findall(r'^\| (FT-\d{2}) \|', function, re.M)
    assert len(features) == len(set(features)) == 52
    assert acceptance == [f'AC-{n:02}' for n in range(1, 16)]
    assert scenarios == [f'FT-{n:02}' for n in range(1, 24)]
    # Explicit traceability; this is a coverage review, never a test-pass assertion.
    groups = {
        'PRJ': ([8, 14], [9, 10, 17], 'projects'),
        'INP': ([2, 4, 14], [2, 5, 16, 18], 'input'),
        'PAR': ([1, 5, 12], [1, 20], 'parts'),
        'IMG': ([2, 3, 14], [2, 3, 4, 16, 18], 'structure/corrections'),
        'LYR': ([4, 12], [5, 20], 'split'),
        'EDT': ([1, 3, 4, 14], [3, 5, 18, 20], 'detail'),
        'MOT': ([5, 7], [6, 8], 'expressions/inputRecovery'),
        'TRK': ([6, 7], [7, 8], 'tracking/inputRecovery'),
        'RUN': ([5, 8, 9, 10], [6, 9, 11, 12, 19], 'execution/runtimeChanges'),
        'BRD': ([9, 10], [11, 12, 19], 'broadcast'),
        'EXP': ([11, 12, 13], [13, 14, 15, 18, 20], 'image/avatar'),
        'SET': ([6, 7, 10, 14, 15], [7, 8, 12, 17, 21], 'settings'),
    }
    rows = []
    for feature in features:
        family = feature.split('-')[1]
        if family in ('3D', 'GEN'):
            rows.append({'feature': feature, 'scope': 'MANDATORY_LONG_TERM',
                         'scenario': 'FT-22' if family == '3D' else 'FT-23'})
        else:
            ac, ft, evidence = groups[family]
            rows.append({'feature': feature, 'scope': 'INITIAL',
                         'acceptance': [f'AC-{n:02}' for n in ac],
                         'scenarios': [f'FT-{n:02}' for n in ft],
                         'automatedEvidenceSection': evidence,
                         'acceptanceStatus': 'REVIEW_REQUIRED'})
    initial = [r for r in rows if r['scope'] == 'INITIAL']
    assert len(initial) == 46
    assert set(acceptance) == {a for r in initial for a in r['acceptance']}
    assert set(scenarios[:21]) == {f for r in initial for f in r['scenarios']}
    result = {'inventoryPassed': True, 'initialFeatures': 46, 'longTermFeatures': 6,
              'features': rows, 'acceptance': acceptance, 'scenarios': scenarios,
              'unresolvedAcceptance': {
                  'AC-06': 'T-190 real human camera tracking/calibration not passed',
                  'AC-07': 'Physical unplug and human/noise environments not fully observed',
                  'AC-09': 'Fresh actual OBS receipt required for all three routes',
                  'AC-10': 'T-274/276 duration and end-to-end performance not measured',
                  'AC-11': 'Fresh official independent runtime receipt required',
                  'AC-14': 'T-271/272 physical storage and abnormal termination pending',
                  'AC-15': 'T-281/282 novice observation not performed'},
              'm0': 'HOLD', 'releasePassed': False}
    (out / 'coverage.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf8')
    print('Coverage: 52 features, 46 initial, 15 AC, 21 initial FT; acceptance remains separate.')


if __name__ == '__main__':
    main()
