"""Independent original/native-conversion premultiplied RGBA quality comparison."""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image


def compare(original, converted):
    a = np.asarray(Image.open(original).convert('RGBA'), dtype=np.float64)
    b = np.asarray(Image.open(converted).convert('RGBA'), dtype=np.float64)
    if a.shape != b.shape:
        return {'passed': False, 'reason': 'dimensions'}
    for image in (a, b):
        image[:, :, :3] *= image[:, :, 3:4] / 255
    visible = np.maximum(a[:, :, 3], b[:, :, 3]) > 3
    error = np.abs(a - b)
    fraction = float(np.mean(np.max(error[visible], axis=1) <= 4)) if visible.any() else 0
    mean = float(error[visible].mean()) if visible.any() else 255
    return {'passed': bool(visible.sum() > 1000 and fraction >= .975 and mean <= 1.5),
            'visiblePixels': int(visible.sum()), 'fractionWithin4': fraction,
            'meanPremultipliedRGBAError': mean,
            'originalSha256': hashlib.sha256(Path(original).read_bytes()).hexdigest(),
            'convertedSha256': hashlib.sha256(Path(converted).read_bytes()).hexdigest()}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--report', required=True)
    parser.add_argument('--images-dir', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    report = json.loads(Path(args.report).read_text(encoding='utf8'))
    directory = Path(args.images_dir)
    checks = [{'route': row['route'], 'label': row['label'],
               **compare(directory/row['original'], directory/row['converted'])}
              for row in report['avatarExport']['images']]
    passed = len(checks) == 42 and all(row['passed'] for row in checks)
    result = {'passed': passed, 'method': 'Independent Pillow/NumPy decode; source versus actual INP interpretation',
              'threshold': 'Visible union >1000 pixels; >=97.5% premultiplied RGBA pixels within 4/255; mean <=1.5/255',
              'checks': checks}
    Path(args.output).write_text(json.dumps(result, indent=2)+'\n', encoding='utf8', newline='\n')
    print(json.dumps({'passed': passed, 'checks': len(checks), 'failures': [row for row in checks if not row['passed']]}))
    return passed


if __name__ == '__main__':
    raise SystemExit(0 if main() else 1)
