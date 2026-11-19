"""Verify final remediation evidence, source snapshot and documentation consistency."""

from pathlib import Path
import hashlib
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'evidence/remediation26-31'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def main():
    review_dir = BASE / 'review-02'
    review = read(review_dir / 'review.json')
    assert review['passedLocalRemediation'] and not review['allRequestedTasksComplete']
    assert len(review['newlyCompleted']) == 14 and len(review['remainingOpen']) == 20
    assert review['requiredGate']['total'] == 384 and review['actualMediaOpenCloseCycles'] == 72
    todo = (ROOT / 'docs/Todo').read_text(encoding='utf-8')
    rows = re.findall(r'^- \[([ x])\] T-(\d+)\b', todo, re.M)
    assert len(rows) == 410 and sum(state == 'x' for state, _ in rows) == 288
    requested = [(state, number) for state, number in rows if 251 <= int(number) <= 310]
    assert len(requested) == 60 and sum(state == 'x' for state, _ in requested) == 40
    assert {'T-' + number for state, number in requested if state == ' '} == set(
        review['remainingOpen']
    )
    linear = read(BASE / 'linear-08/linear.json')
    assert linear['passed'] and len(linear['rows']) == 6 and linear['independentTarget']['passed']
    captures = [image for row in linear['rows'] for image in row['obsImages']]
    assert len(captures) == 18
    for image in captures:
        assert image['pixels']['passed'] and image['sourceReadyBeforeCapture']
        assert image['sha256'] == digest(BASE / 'linear-08' / image['file'])
    package = read(BASE / 'package-02/package.json')
    assert package['zip']['sha256'] == digest(ROOT / package['zip']['file'])
    assert package['signature'] == 'NotSigned' and package['releaseDecision'] == 'HOLD'
    manifest = read(review_dir / 'source-manifest.json')
    with zipfile.ZipFile(review_dir / 'source.zip') as archive:
        assert set(archive.namelist()) == {row['file'] for row in manifest}
        for row in manifest:
            assert digest(ROOT / row['file']) == row['sha256']
            assert hashlib.sha256(archive.read(row['file'])).hexdigest() == row['sha256']
    # Match only drive paths; do not mistake https:// links for Windows paths.
    for file in BASE.rglob('*.json'):
        raw = file.read_text(encoding='utf-8')
        assert not re.search(r'(?<![A-Za-z])[A-Za-z]:[\\/]', raw), 'E_PUBLIC_PATH'
    planning = ROOT / 'docs/planning/26-31-remediation.md'
    for link in re.findall(r'\]\(([^)]+)\)', planning.read_text(encoding='utf-8')):
        if not re.match(r'https?://', link):
            assert (planning.parent / link.split('#')[0]).resolve().exists(), 'E_REMEDIATION_LINK'
    for name in ['PRD.md', 'Function.md', 'Todo']:
        text = (ROOT / 'docs' / name).read_text(encoding='utf-8')
        assert 'review-02/review.json' in text and '0.22.1' in text
    print(
        'Final evidence verified: 14 new completions; 40/60 complete, 20 open; source, ZIP and 18 OBS hashes match'
    )


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_REMEDIATION_FINAL_CHECK')
        raise SystemExit(1)
