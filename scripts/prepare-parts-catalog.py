"""Measure immutable authored PNGs and write crop/placement metadata; never edit pixels."""

from pathlib import Path
import hashlib, json
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / 'assets/product/parts'
VERSION = '1.0.0'


def run():
    assets = []
    files = {}
    items = []

    def bbox(image):
        box = image.getchannel('A').point(lambda v: 255 if v > 128 else 0).getbbox()
        if box is None:
            raise ValueError('E_PARTS_EMPTY')
        return [
            max(0, box[0] - 3),
            max(0, box[1] - 3),
            min(image.width, box[2] + 3),
            min(image.height, box[3] + 3),
        ]

    def asset(name, key, box, matrix):
        path = ART / (name + '.png')
        data = path.read_bytes()
        im = Image.open(path)
        digest = hashlib.sha256(data).hexdigest()
        files[digest] = 'parts/' + path.name
        value = {
            'id': 'part-asset-' + key,
            'kind': 'part-texture',
            'origin': 'bundled',
            'parentAssetIds': [],
            'storage': {'path': 'resources/' + digest + '.png'},
            'fingerprint': {'sha256': digest, 'bytes': len(data)},
            'version': 1,
            'mediaType': 'image/png',
            'dimensions': {'width': im.width, 'height': im.height},
            'sourceRegion': {
                'x': box[0],
                'y': box[1],
                'width': box[2] - box[0],
                'height': box[3] - box[1],
            },
            'sourceToEdited': matrix,
            'colorSpace': 'srgb',
            'alphaMode': 'straight',
            'producer': {'name': 'atelier-luna/' + name, 'version': VERSION},
            'attribution': {
                'creator': '2DSketcher project · OpenAI ImageGen',
                'source': 'parts/generation-record.json#' + name,
                'usage': 'Project-generated modular artwork; see parts/USAGE.md. No exclusivity/copyright warranty. Public product release remains gated.',
                'status': 'verified',
            },
        }
        assets.append(value)
        return value

    def single(name, key, target):
        im = Image.open(ART / (name + '.png')).convert('RGBA')
        b = bbox(im)
        x, y, w, h = target
        sx = w / (b[2] - b[0])
        sy = h / (b[3] - b[1])
        return asset(name, key, b, [sx, 0, 0, sy, x - b[0] * sx, y - b[1] * sy])

    def template(key, role, side, order, a, anchor, tint=(0.45, 0.9, 0.18), state='default'):
        return {
            'key': key,
            'role': role,
            'side': side,
            'order': order,
            'anchor': anchor,
            'tint': tint,
            'textures': [
                {
                    'state': state,
                    'assetId': a['id'],
                    'assetVersion': 1,
                    'assetToLocal': [1, 0, 0, 1, 0, 0],
                }
            ],
        }

    def item(name, slot, label, templates, limits, thumb=None):
        first = assets[-1] if templates else None
        if thumb is None and first:
            thumb = {'assetId': first['id'], 'region': first['sourceRegion']}
        items.append(
            {
                'id': name,
                'version': VERSION,
                'slot': slot,
                'label': label,
                'family': 'atelier-bust-v1',
                'templates': templates,
                'thumbnail': thumb,
                'limits': dict(zip(['position', 'scale', 'rotation', 'hue'], limits)),
            }
        )

    for letter, label in [('a', '피치 · 부드러운 타원'), ('b', '허니 · 하트 윤곽')]:
        a = single('face-' + letter, 'face-' + letter, (340, 130, 344, 525))
        item(
            'face-' + letter,
            'face',
            label,
            [template('face', 'head', 'center', 10, a, [512, 400], (0, 1, 1))],
            [2, 0.01, 0.5, 0],
        )
    for letter, label in [('a', '라일락 · 웨이브'), ('b', '미드나이트 · 실키')]:
        back = single('hair-' + letter + '-back', 'hair-' + letter + '-back', (150, 70, 724, 1180))
        front = single(
            'hair-' + letter + '-front-v2', 'hair-' + letter + '-front', (187, 70, 650, 740)
        )
        item(
            'hair-' + letter,
            'hair',
            label,
            [
                template('hair-back', 'hair-back', 'center', 0, back, [512, 360]),
                template('hair-front', 'hair-front', 'center', 50, front, [512, 360]),
            ],
            [3, 0.01, 0.5, 12],
        )
    for letter, label in [('a', '자수정 · 라운드'), ('b', '에메랄드 · 캣아이')]:
        name = 'eyes-' + letter + '-clean'
        im = Image.open(ART / (name + '.png')).convert('RGBA')
        templates = []
        thumbnail = None
        for side, half, cx in [('character-right', 0, 438), ('character-left', 1, 586)]:
            key = 'eye-right' if half == 0 else 'eye-left'
            entries = []
            scale_factor = None
            reference_fraction = 0.64 if half == 0 else 0.36
            for row, state in [(0, 'open'), (1, 'half'), (2, 'closed')]:
                x0 = half * im.width // 2
                y0 = row * im.height // 3
                cell = im.crop((x0, y0, x0 + im.width // 2, (row + 1) * im.height // 3))
                b = bbox(cell)
                b = [b[0] + x0, b[1] + y0, b[2] + x0, b[3] + y0]
                if scale_factor is None:
                    scale_factor = 124 / (b[2] - b[0])
                sx = scale_factor
                anchor_x = b[0] + (b[2] - b[0]) * reference_fraction
                a = asset(
                    name,
                    'eyes-' + letter + '-' + key + '-' + state,
                    b,
                    [sx, 0, 0, sx, cx - anchor_x * sx, 305 - b[1] * sx],
                )
                entries.append(
                    {
                        'state': state,
                        'assetId': a['id'],
                        'assetVersion': 1,
                        'assetToLocal': [1, 0, 0, 1, 0, 0],
                    }
                )
            t = template(key, 'eye', side, 30, a, [cx, 360], (0.25, 0.9, 0.25))
            t['textures'] = entries
            templates.append(t)
        thumbnail = {
            'assetId': entries[0]['assetId'],
            'region': {'x': 0, 'y': 0, 'width': im.width, 'height': im.height / 3},
        }
        item('eyes-' + letter, 'eyes', label, templates, [2, 0.03, 1, 18], thumbnail)
    for letter, label in [('a', '로즈 · 내추럴'), ('b', '베리 · 큐피드')]:
        name = 'mouth-' + letter + '-clean'
        im = Image.open(ART / (name + '.png')).convert('RGBA')
        entries = []
        factor = None
        for row, state in [(0, 'closed'), (1, 'smile'), (2, 'open')]:
            top = row * im.height // 3
            cell = im.crop((0, top, im.width, (row + 1) * im.height // 3))
            b = bbox(cell)
            b = [b[0], b[1] + top, b[2], b[3] + top]
            if factor is None:
                factor = 76 / (b[2] - b[0])
            a = asset(
                name,
                'mouth-' + letter + '-' + state,
                b,
                [factor, 0, 0, factor, 512 - (b[0] + b[2]) / 2 * factor, 474 - b[1] * factor],
            )
            entries.append(
                {
                    'state': state,
                    'assetId': a['id'],
                    'assetVersion': 1,
                    'assetToLocal': [1, 0, 0, 1, 0, 0],
                }
            )
        t = template('mouth', 'mouth', 'center', 40, a, [512, 480], (0.9, 0.1, 0.3))
        t['textures'] = entries
        item(
            'mouth-' + letter,
            'mouth',
            label,
            [t],
            [2, 0.03, 1, 6],
            {'assetId': entries[0]['assetId'], 'region': assets[-3]['sourceRegion']},
        )
    for letter, label in [('a', '바이올렛 · 코르셋'), ('b', '틸 · 케이프 블라우스')]:
        a = single('outfit-' + letter, 'outfit-' + letter, (130, 595, 764, 655))
        item(
            'outfit-' + letter,
            'outfit',
            label,
            [template('outfit', 'body', 'center', 20, a, [512, 750])],
            [4, 0.02, 0.5, 12],
        )
    item('accessory-off', 'accessory', '장식 없음', [], [0, 0, 0, 0])
    a = single('accessory-on', 'accessory-on', (674, 180, 90, 154))
    item(
        'accessory-on',
        'accessory',
        '달빛 · 브로치',
        [template('accessory', 'accessory', 'center', 60, a, [719, 250], (0.6, 0.9, 0.25))],
        [6, 0.05, 2, 10],
    )
    catalog = {
        'id': 'atelier-luna',
        'version': VERSION,
        'family': 'atelier-bust-v1',
        'canvas': {'width': 1024, 'height': 1280},
        'assets': assets,
        'files': files,
        'items': items,
        'defaults': {slot: slot + '-a' for slot in ['face', 'hair', 'eyes', 'mouth', 'outfit']},
    }
    catalog['defaults']['accessory'] = 'accessory-on'
    (ART / 'catalog.json').write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n'
    )
    print(
        'Authored catalog:',
        len(items),
        'items,',
        len(assets),
        'state resources,',
        len(files),
        'PNG files, 64 combinations',
    )


if __name__ == '__main__':
    run()
