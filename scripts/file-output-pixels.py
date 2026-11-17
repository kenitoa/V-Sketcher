"""Independent PNG decode/alpha/color and variant checks on actual saved files."""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image


def check(report_path, folder):
    report = json.loads(report_path.read_text(encoding='utf8'))
    rows = report['fileOutput']['images']
    checks = []
    decoded = {}
    for row in rows:
        path = folder / row['name']
        raw = path.read_bytes()
        with Image.open(path) as image:
            assert image.format == 'PNG' and image.mode == 'RGBA'
            rgba = np.asarray(image)
        assert list(rgba.shape[:2]) == [row['height'], row['width']]
        assert hashlib.sha256(raw).hexdigest() == row['sha256']
        alpha = rgba[:, :, 3]
        assert int((alpha > 0).sum()) == row['visiblePixels']
        assert int((alpha == 0).sum()) == row['transparentPixels']
        assert row['previewSaveByteIdentical']
        corner = rgba[0, 0].tolist()
        assert corner == ([225, 214, 239, 255] if row['variant'] == 'background' else [0, 0, 0, 0])
        decoded[row['route'], row['variant']] = rgba
        checks.append({'name': row['name'], 'sha256': row['sha256'], 'mode': 'RGBA8', 'width': row['width'], 'height': row['height'], 'corner': corner, 'passed': True})
    composites = []
    for route in ['parts', 'single-image', 'split-image']:
        transparent = decoded[route, 'transparent']
        background = decoded[route, 'background']
        expected = np.asarray(Image.alpha_composite(Image.new('RGBA', (transparent.shape[1], transparent.shape[0]), (225, 214, 239, 255)), Image.fromarray(transparent)))
        error = np.abs(expected.astype(np.int16)-background.astype(np.int16)).max(axis=2)
        within = float((error <= 2).mean())
        assert within >= .995
        changed = int(np.any(transparent != decoded[route, 'expression'], axis=2).sum())
        assert changed > 0
        assert int((decoded[route, 'placement'][:, :, 3] > 0).sum()) < int((transparent[:, :, 3] > 0).sum())
        composites.append({'route': route, 'sRGBStraightAlphaSourceOverWithin2': within, 'expressionChangedPixels': changed, 'placementReducedArea': True, 'passed': True})
    assert len(rows) == 14
    return {'passed': True, 'method': 'Independent Pillow/NumPy decode of actual PNGs; exact preview/save SHA256, alpha, background, expression and placement', 'checks': checks, 'composites': composites, 'rawDeviceDataIncluded': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--images-dir', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = check(args.report, args.images_dir)
    args.output.write_text(json.dumps(result, indent=2)+'\n', encoding='utf8')
    print(json.dumps({'passed': result['passed'], 'images': len(result['checks'])}))
