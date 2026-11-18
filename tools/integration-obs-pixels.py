"""Independently decode the nine avatar-only OBS captures from this run."""
import argparse
import json
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--directory', required=True)
    directory = (ROOT / parser.parse_args().directory).resolve()
    assert directory.is_relative_to(ROOT / 'evidence/phase27')
    output = directory / 'pixel-quality.json'
    assert not output.exists()
    metrics = runpy.run_path(str(ROOT / 'scripts/broadcast-pixels.py'))['metrics']
    rows = []
    for route in ['parts', 'single-image', 'split-image']:
        states = []
        for state in ['neutral', 'expression', 'motion']:
            row = metrics(directory / f'{route}-{state}.png')
            assert (row['width'], row['height']) == (1920, 1080)
            assert row['visiblePixels'] > 10000 and row['transparentPixels'] > 10000
            assert row['partialAlphaPixels'] > 0
            states.append({'state': state, **row})
        assert len({row['pixelSha256'] for row in states}) == 3
        rows.append({'route': route, 'states': states})
    output.write_text(json.dumps({'passed': True, 'routes': rows}, indent=2) + '\n', encoding='utf8')
    print('Three actual OBS routes: visible avatar, transparent/partial alpha and distinct poses passed.')


if __name__ == '__main__':
    main()
