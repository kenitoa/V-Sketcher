"""One-time, hash-verified conversion of frozen prepared results; no new rigging claim."""

from pathlib import Path
import hashlib, json, shutil
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IDENTITY = [1, 0, 0, 1, 0, 0]


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n'
    )


def convert(route, source, target, premium=False):
    legacy = json.loads((source / 'project.json').read_text(encoding='utf-8'))
    assets = []
    parts = []
    inputs = []
    bindings = []
    by_hash = {}
    sources = {}
    prefix = 'premium' if premium else route

    def resource(file, origin, parents, kind='part-texture', expected=None):
        digest = sha(file)
        if expected and digest != expected:
            raise ValueError('E_FROZEN_ASSET_HASH')
        if digest in by_hash:
            return by_hash[digest]
        width, height = Image.open(file).size
        asset_id = 'asset-' + digest[:24]
        by_hash[digest] = asset_id
        destination = target / 'resources' / f'{digest}.png'
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(file, destination)
        sources[str(file.relative_to(ROOT)).replace('\\', '/')] = digest
        assets.append(
            {
                'id': asset_id,
                'kind': kind,
                'origin': origin,
                'parentAssetIds': parents,
                'storage': {'path': f'resources/{digest}.png'},
                'fingerprint': {'sha256': digest, 'bytes': file.stat().st_size},
                'version': 1,
                'mediaType': 'image/png',
                'dimensions': {'width': width, 'height': height},
                'sourceRegion': {'x': 0, 'y': 0, 'width': width, 'height': height},
                'sourceToEdited': IDENTITY,
                'colorSpace': 'srgb',
                'alphaMode': 'straight',
                'producer': {'name': 'frozen-prepared-model-import', 'version': '1.0.0'},
                'attribution': {
                    'creator': '2DSketcher experiment',
                    'source': str(file.relative_to(ROOT)).replace('\\', '/'),
                    'usage': 'Premium preview; public rights review pending'
                    if premium
                    else 'Development structural fixture only',
                    'status': 'unverified',
                },
            }
        )
        return asset_id

    parents = []
    if premium:
        for name, key in [
            ('neutral.png', 'neutral_sha256'),
            ('blink-speaking.png', 'expression_sha256'),
        ]:
            parents.append(
                resource(
                    source.parent / name,
                    'generated',
                    [],
                    'original-image',
                    legacy['provenance'][key],
                )
            )
        inputs = parents[:]
    elif route == 'single-image':
        parents = [
            resource(
                source / 'source.png',
                'imported',
                [],
                'original-image',
                legacy['provenance']['input_sha256'],
            )
        ]
        inputs = parents[:]
        parents = [resource(source / 'prepared.png', 'auto-preparation', parents, 'edited-image')]
    elif route == 'split-image':
        original = ROOT / 'experiments/phase02/assets/split/L-001.json'
        layers = json.loads(original.read_text(encoding='utf-8'))['layers']
        inputs = [
            resource((original.parent / layer['path']).resolve(), 'imported', [], 'original-image')
            for layer in layers
        ]
        parents = inputs[:]
    for part in legacy['parts']:
        textures = []
        for state, ref in part['states'].items():
            origin = (
                'manual-edit' if premium else 'bundled' if route == 'parts' else 'auto-preparation'
            )
            asset_id = resource(source / ref['path'], origin, parents, expected=ref['sha256'])
            if route == 'parts' and asset_id not in inputs:
                inputs.append(asset_id)
            textures.append(
                {'state': state, 'assetId': asset_id, 'assetVersion': 1, 'assetToLocal': IDENTITY}
            )
        role = part['role'].replace('_', '-')
        if role.startswith('eye'):
            role = 'eye'
        if role not in [
            'base',
            'body',
            'head',
            'hair-front',
            'hair-back',
            'eye',
            'mouth',
            'accessory',
        ]:
            role = 'base' if premium and not parts else 'custom'
        part_id = 'part-' + part['id']
        x, y = part['origin']
        parts.append(
            {
                'id': part_id,
                'displayName': part['id'],
                'role': role,
                'side': {
                    'left': 'character-left',
                    'right': 'character-right',
                    'unspecified': 'none',
                    'mouth': 'center',
                }.get(part['side'], part['side']),
                'parentId': None,
                'groupId': 'group-character',
                'textures': textures,
                'localTransform': [1, 0, 0, 1, x, y],
                'drawOrder': part['z'],
                'visible': True,
                'opacity': part['opacity'],
                'correctionOrigin': 'manual' if premium else 'automatic',
                'limitations': legacy.get('warnings', []),
            }
        )
        if part['bind']:
            bindings.append(
                {
                    'id': 'binding-' + part['id'],
                    'parameterId': 'parameter-' + part['bind'],
                    'partId': part_id,
                    'kind': 'state-blend',
                    'mapping': {'minimumState': 'closed', 'maximumState': 'open'},
                }
            )
    parameters = [
        {
            'id': 'parameter-' + key,
            'displayName': key,
            'semantic': key.replace('_', '-'),
            'unit': 'ratio',
            'min': -1 if key.startswith('head') else 0,
            'neutral': value,
            'max': 1,
            'previewKey': key,
        }
        for key, value in legacy['params'].items()
    ]
    input_bindings = [
        {
            'id': 'input-' + p['previewKey'],
            'source': 'face',
            'channel': p['previewKey'],
            'parameterId': p['id'],
            'inputRange': [p['min'], p['max']],
            'invert': False,
            'gain': 1,
            'offset': 0,
            'smoothingMs': 80,
            'fallback': {'mode': 'neutral', 'value': p['neutral'], 'returnMs': 250},
        }
        for p in parameters
    ]
    project = {
        'projectId': 'example-' + prefix,
        'schemaVersion': {'major': 1, 'minor': 0},
        'displayName': legacy['name'],
        'sourceType': route,
        'createdAt': '2026-11-16T00:00:00.000Z',
        'modifiedAt': '2026-11-16T00:00:00.000Z',
        'revision': 1,
        'savedRevision': None,
        'canvas': dict(zip(['width', 'height'], legacy['canvas'])),
        'inputAssetIds': inputs,
        'assets': assets,
        'parts': parts,
        'groups': [
            {
                'id': 'group-character',
                'displayName': 'Character',
                'parentGroupId': None,
                'visible': True,
            }
        ],
        'parameters': parameters,
        'partBindings': bindings,
        'inputBindings': input_bindings,
        'expressions': [
            {
                'id': 'expression-blink',
                'displayName': 'Blink',
                'values': [
                    {'parameterId': p['id'], 'value': 0, 'locked': True}
                    for p in parameters
                    if p['previewKey'].startswith('eye')
                ],
                'transitionMs': 100,
                'release': 'live-input',
            }
        ],
        'runtimeProfile': {
            'id': 'runtime-default',
            'revision': 0,
            'mode': 'idle',
            'mirror': False,
            'fallbackExpressionId': 'expression-blink',
        },
        'broadcastProfiles': [
            {
                'id': 'broadcast-default',
                'revision': 0,
                'displayName': 'OBS transparent',
                'width': 1920,
                'height': 1080,
                'fps': 30,
                'transparent': True,
                'region': {
                    'x': 0,
                    'y': 0,
                    'width': legacy['canvas'][0],
                    'height': legacy['canvas'][1],
                },
                'fit': 'contain',
            }
        ],
        'exportProfiles': [
            {
                'id': 'export-inp',
                'revision': 0,
                'displayName': 'INP compatibility target',
                'target': 'inochi2d',
                'targetVersion': '0.8.7',
                'format': 'inp',
                'converterVersion': '0.1.0',
                'parameterMap': [
                    {'parameterId': p['id'], 'targetName': p['previewKey']} for p in parameters
                ],
            }
        ],
        'provenance': {
            'preparation': 'Converted frozen prepared result; not a newly executed preparation pipeline',
            'limitations': legacy.get('warnings', [])
            + (
                ['Development structural fixture; not premium art']
                if not premium
                else ['Manual authored patches; not a fully separated rig']
            ),
        },
        'derivedProjects': [],
    }
    save(target / 'project.json', project)
    return {
        'route': route,
        'parts': len(parts),
        'assets': len(assets),
        'sourceProject': str((source / 'project.json').relative_to(ROOT)).replace('\\', '/'),
        'sourceProjectSha256': sha(source / 'project.json'),
        'resources': sources,
        'legacySideCorrections': [
            {'partId': part['id'], 'from': part['side'], 'to': 'center'}
            for part in legacy['parts']
            if part['side'] == 'mouth'
        ],
    }


def run():
    report = []
    for route, legacy in [('parts', 'parts'), ('single-image', 'single'), ('split-image', 'split')]:
        report.append(
            convert(
                route,
                ROOT / f'experiments/phase03/results/projects/{legacy}',
                ROOT / f'tests/fixtures/common-model/{route}',
            )
        )
    temp = ROOT / '.local/model-preview-import'
    report.append(
        convert('single-image', ROOT / 'experiments/phase04/assets/premium/project', temp, True)
    )
    product = ROOT / 'assets/product'
    project = json.loads((temp / 'project.json').read_text(encoding='utf-8'))
    manifest = json.loads((product / 'manifest.json').read_text(encoding='utf-8'))
    for asset in project['assets']:
        digest = asset['fingerprint']['sha256']
        path = 'preview/' + digest + '.png'
        file = product / path
        if not file.exists():
            shutil.copyfile(temp / asset['storage']['path'], file)
        if not any(a['sha256'] == digest for a in manifest['assets']):
            manifest['assets'].append(
                {
                    'path': path,
                    'sha256': digest,
                    'bytes': asset['fingerprint']['bytes'],
                    'source': asset['attribution']['source'],
                    'use': 'bundled-preview-source',
                }
            )
    save(product / 'manifest.json', manifest)
    save(product / 'preview-project.json', project)
    save(
        ROOT / 'evidence/phase07/example-import.json',
        {
            'scope': 'Frozen prepared data imported into common model, not new preparation or art validation',
            'examples': report,
        },
    )
    print('Converted three route examples and premium preview; historical sources untouched.')


if __name__ == '__main__':
    run()
