"""Compare official target-only window captures with independently decoded references."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image


def run():
    p = argparse.ArgumentParser()
    for name in ('report', 'images-dir', 'capture-dir', 'output-dir', 'route', 'version', 'canvas'):
        p.add_argument('--'+name, required=True)
    p.add_argument('--target-reference-dir')
    args = p.parse_args()
    report = json.loads(Path(args.report).read_text(encoding='utf8'))
    source, captures, output = Path(args.images_dir), Path(args.capture_dir), Path(args.output_dir)
    references_directory = Path(args.target_reference_dir) if args.target_reference_dir else source
    canvas = json.loads(args.canvas)
    prefix = 'v2-' if args.version == '2' else ''
    rows = [row for row in report['avatarExport']['images'] if row['route'] == args.route
            and row['label'].startswith('v2-') == bool(prefix)]
    expected, labels, bounds = [], [], []
    for row in rows:
        image = Image.open(references_directory/row['target']).convert('RGBA')
        if image.size != (1024, 1024):
            raise ValueError('native_reference_resolution')
        frame = Image.new('RGBA', (1024, 1024), (0, 0, 0, 255))
        frame.alpha_composite(image)
        a = np.asarray(frame)[:, :, :3].astype(np.float64)
        mask = a.max(axis=2) > 5
        yy, xx = np.where(mask)
        if not len(xx):
            raise ValueError('empty_reference')
        bounds.append((max(0, xx.min()-24), max(22, yy.min()-24), min(1024, xx.max()+25), min(1024, yy.max()+25)))
        expected.append(a)
        labels.append(row['label'].removeprefix('v2-'))
    x0, y0 = min(b[0] for b in bounds), min(b[1] for b in bounds)
    x1, y1 = max(b[2] for b in bounds), max(b[3] for b in bounds)
    references = np.stack([a[y0:y1, x0:x1] for a in expected])
    best = [None]*len(labels)
    classifications = set()
    for path in sorted(captures.glob('frame-*.png')):
        image = np.asarray(Image.open(path).convert('RGB'), dtype=np.float64)
        if image.shape[:2] != (1024, 1024):
            raise ValueError('target_window_dimensions')
        cropped = image[y0:y1, x0:x1]
        error = np.abs(references-cropped)
        scores = np.mean(error, axis=(1, 2, 3))
        winner = int(np.argmin(scores))
        classifications.add(labels[winner])
        for i, score in enumerate(scores):
            fraction = float(np.mean(np.max(error[i], axis=2) <= 12))
            if best[i] is None or score < best[i]['meanRGBError']:
                best[i] = {'label': labels[i], 'source': path.name, 'meanRGBError': float(score),
                           'fractionWithin12': fraction, 'classifiedAs': labels[winner],
                           'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    checks = []
    for i, row in enumerate(best):
        if row is None:
            checks.append({'label': labels[i], 'passed': False})
            continue
        row['passed'] = bool(row['meanRGBError'] <= 4 and row['fractionWithin12'] >= .96
                             and labels[i] in classifications)
        name = args.route+'-v'+args.version+'-'+row['label']+'.png'
        shutil.copyfile(captures/row.pop('source'), output/name)
        row['image'] = name
        checks.append(row)
    result = {'passed': len(checks) == 7 and all(row['passed'] for row in checks),
              'route': args.route, 'version': int(args.version),
              'method': 'Official Session target-only OBS PNG; fixed 0.5 target camera; direct 1024px mipmapped reference; nearest reference classification',
              'threshold': 'Mean RGB error <=4/255 and >=96% pixels within12/255; every pose must occur as nearest reference',
              'roi': [int(v) for v in (x0, y0, x1, y1)], 'classifiedPoses': sorted(classifications), 'checks': checks}
    (output/(args.route+'-v'+args.version+'-quality.json')).write_text(json.dumps(result, indent=2)+'\n', encoding='utf8', newline='\n')
    print(json.dumps(result))
    return result['passed']


if __name__ == '__main__':
    raise SystemExit(0 if run() else 1)
