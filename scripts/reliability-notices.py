"""Verify local notice/provenance bytes; does not grant publication or legal approval."""

import argparse
import hashlib
import importlib.metadata
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read(path):
    return json.loads(path.read_text(encoding='utf8'))


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    output = (ROOT / parser.parse_args().output).resolve()
    assert output.is_relative_to(ROOT / 'evidence/phase28') and not output.exists()
    notices = ROOT / 'dist/notices'
    records = []
    for source, copy in [
        ('NOTICE.md', 'NOTICE.md'),
        ('worker/resources/model-source.json', 'model-source.json'),
        ('assets/product/parts/catalog.json', 'parts-catalog.json'),
        ('assets/product/parts/generation-record.json', 'parts-generation-record.json'),
        ('assets/product/parts/USAGE.md', 'parts-USAGE.md'),
        ('assets/product/split/manifest.json', 'split-provenance.json'),
    ]:
        assert sha(ROOT / source) == sha(notices / copy), source
        records.append({'source': source, 'notice': copy, 'sha256': sha(ROOT / source)})
    manifest = read(ROOT / 'assets/product/manifest.json')
    for asset in manifest['assets']:
        path = ROOT / 'assets/product' / asset['path']
        assert sha(path) == asset['sha256'] and path.stat().st_size == asset['bytes']
    catalog = read(ROOT / 'assets/product/parts/catalog.json')
    for asset in catalog['assets']:
        path = ROOT / 'assets/product' / catalog['files'][asset['fingerprint']['sha256']]
        assert sha(path) == asset['fingerprint']['sha256']
        assert path.stat().st_size == asset['fingerprint']['bytes']
        assert all(asset['attribution'].get(k) for k in ['creator', 'source', 'usage'])
    split = read(ROOT / 'assets/product/split/manifest.json')
    assert sha(ROOT / 'assets/product' / split['path']) == split['sha256']
    for name, digest in split['sourceSha256'].items():
        assert sha(ROOT / name) == digest
    model = read(ROOT / 'worker/resources/model-source.json')
    assert sha(ROOT / '.local/models/face_landmarker.task') == model['sha256']
    inventory = read(notices / 'dependency-inventory.json')
    overrides = read(ROOT / 'worker/resources/license-overrides.json')
    assert read(notices / 'license-overrides.json') == overrides
    for name, record in overrides.items():
        assert sha(ROOT / record['path']) == record['sha256']
        assert sha(notices / 'python' / name / 'LICENSE') == record['sha256']
    assert inventory['public_distribution_approved'] is False
    runtime = [p for p in inventory['npm'] if p['scope'] == 'runtime']
    lock = read(ROOT / 'package-lock.json')['packages']
    license_rows = []
    for package in runtime:
        candidates = [
            ROOT / key
            for key, value in lock.items()
            if key.endswith('node_modules/' + package['name'])
            and value.get('version') == package['version']
            and not value.get('dev')
        ]
        assert candidates, package['name']
        directory = candidates[0]
        installed = read(directory / 'package.json')
        assert installed['version'] == package['version'] and package['license']
        files = [
            p
            for p in (notices / 'npm' / package['name'].replace('/', '_')).glob('*')
            if p.is_file()
        ]
        assert files, package['name']
        originals = [
            p
            for p in directory.iterdir()
            if p.is_file() and p.name.lower().startswith(('license', 'notice', 'copying'))
        ]
        assert all(any(sha(p) == sha(q) for q in files) for p in originals)
        license_rows.append(
            {
                'name': package['name'],
                'version': package['version'],
                'license': package['license'],
                'copiedTexts': len(files),
            }
        )
    python_missing_text = []
    for package in inventory['python']:
        assert importlib.metadata.version(package['name']) == package['version']
        if not any((notices / 'python' / package['name']).glob('*')):
            python_missing_text.append(package['name'])
    electron = ROOT / 'node_modules/electron/dist'
    assert (electron / 'LICENSE').is_file() and (electron / 'LICENSES.chromium.html').is_file()
    assert not python_missing_text, python_missing_text
    result = {
        'localInventoryPassed': True,
        'sourceNoticeCopies': records,
        'premiumPreviewAssets': len(manifest['assets']),
        'partsStateAssets': len(catalog['assets']),
        'modelPinnedHashVerified': True,
        'nodeRuntime': license_rows,
        'installedPythonPackages': len(inventory['python']),
        'pythonPackagesWithoutCopiedLicenseText': python_missing_text,
        'pythonBundledSubsetAndTransitiveNoticesApproved': False,
        'electronLicenseAndChromiumNoticesPresent': True,
        'thirdPartyExecutableBundlingApproved': False,
        'publicDistributionApproved': False,
        'licenseTextOverrides': overrides,
        'scope': 'Current private build local attribution/inventory consistency; no new legal interpretation or publication approval',
        'm0': 'HOLD',
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf8')
    print(
        f'Local notices: {len(runtime)} Node runtime, {len(inventory["python"])} Python inventory; publication stays HOLD.'
    )


if __name__ == '__main__':
    main()
