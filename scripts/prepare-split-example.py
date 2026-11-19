"""Prepare a portable, authored PNG parts example from the existing premium catalog."""

from pathlib import Path
import hashlib, io, json, zipfile
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent


def digest(b):
    return hashlib.sha256(b).hexdigest()


def run():
    catalog = json.loads((ROOT / 'assets/product/parts/catalog.json').read_text(encoding='utf-8'))
    output = ROOT / 'assets/product/split'
    output.mkdir(exist_ok=True)
    layers = []
    files = {}
    hashes = {}
    source_hashes = {}
    for slot, item_id in catalog['defaults'].items():
        item = next(i for i in catalog['items'] if i['id'] == item_id)
        for template in item['templates']:
            primary = template['key']
            for index, texture in enumerate(template['textures']):
                a = next(a for a in catalog['assets'] if a['id'] == texture['assetId'])
                path = ROOT / 'assets/product' / catalog['files'][a['fingerprint']['sha256']]
                raw = path.read_bytes()
                assert digest(raw) == a['fingerprint']['sha256']
                source_hashes[str(path.relative_to(ROOT)).replace('\\', '/')] = digest(raw)
                sx, b, c, sy, tx, ty = a['sourceToEdited']
                assert (
                    b == c == 0
                    and sx > 0
                    and sy > 0
                    and texture['assetToLocal'] == [1, 0, 0, 1, 0, 0]
                )
                r = a['sourceRegion']
                image = (
                    Image.open(io.BytesIO(raw))
                    .convert('RGBA')
                    .crop((r['x'], r['y'], r['x'] + r['width'], r['y'] + r['height']))
                )
                image = image.resize(
                    (max(1, round(image.width * sx)), max(1, round(image.height * sy))),
                    Image.Resampling.LANCZOS,
                )
                origin = [round(r['x'] * sx + tx), round(r['y'] * sy + ty)]
                bounds = image.getchannel('A').getbbox()
                if bounds:
                    image = image.crop(bounds)
                    origin = [origin[0] + bounds[0], origin[1] + bounds[1]]
                data = io.BytesIO()
                image.save(data, format='PNG')
                value = data.getvalue()
                name = 'images/' + digest(value) + '.png'
                files[name] = value
                hashes[name] = digest(value)
                state = {'half': 'middle', 'smile': 'middle'}.get(
                    texture['state'], texture['state']
                )
                layer_id = primary if index == 0 else primary + '-' + state
                layers.append(
                    {
                        'id': layer_id,
                        'name': item['label'] if slot != 'accessory' else '장식',
                        'path': name,
                        'origin': origin,
                        'z': template['order'],
                        'role': template['role'],
                        'side': template['side'],
                        'visible': index == 0,
                        'opacity': 1,
                        'group': 'body' if slot == 'outfit' else 'details',
                        'parent': None if primary in ['face', 'outfit'] else 'face',
                        'usage': 'primary' if index == 0 else 'alternative',
                        'variantOf': None if index == 0 else primary,
                        'state': state,
                        'blendMode': 'normal',
                    }
                )
    empty = io.BytesIO()
    Image.new('RGBA', (1, 1)).save(empty, format='PNG')
    value = empty.getvalue()
    name = 'images/' + digest(value) + '.png'
    files[name] = value
    hashes[name] = digest(value)
    layers.append(
        {
            'id': 'empty',
            'name': '장식',
            'path': name,
            'origin': [0, 0],
            'z': 99,
            'role': 'custom',
            'side': 'none',
            'visible': True,
            'opacity': 1,
            'group': 'details',
            'parent': None,
            'usage': 'auxiliary',
            'variantOf': None,
            'state': 'default',
        }
    )
    accessory = next(l for l in layers if l['id'] == 'accessory')
    layers.append(
        {
            **accessory,
            'id': 'hidden-decoration',
            'name': '장식',
            'visible': False,
            'usage': 'auxiliary',
            'z': 100,
        }
    )
    manifest = {
        'format': '2dparts',
        'schemaVersion': {'major': 1, 'minor': 0},
        'canvas': catalog['canvas'],
        'layers': layers,
        'groups': [
            {'id': 'body', 'name': '기본', 'parent': None, 'visible': True, 'opacity': 1},
            {'id': 'details', 'name': '얼굴·장식', 'parent': 'body', 'visible': True, 'opacity': 1},
        ],
        'hashes': hashes,
    }
    files['manifest.json'] = json.dumps(manifest, ensure_ascii=False, separators=(',', ':')).encode(
        'utf-8'
    )
    target = output / 'premium-example.2dparts'
    with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for name, value in sorted(files.items()):
            info = zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, value)
    (output / 'manifest.json').write_text(
        json.dumps(
            {
                'path': 'split/premium-example.2dparts',
                'sha256': digest(target.read_bytes()),
                'bytes': target.stat().st_size,
                'layers': len(layers),
                'sourceSha256': source_hashes,
                'provenance': 'Cropped and scaled from the existing authored premium parts; no inferred or newly generated artwork.',
                'formatVersion': '1.0.0',
            },
            ensure_ascii=False,
            indent=2,
        )
        + '\n',
        encoding='utf-8',
        newline='\n',
    )
    print('Prepared premium split example:', len(layers), 'layers,', target.stat().st_size, 'bytes')


if __name__ == '__main__':
    run()
