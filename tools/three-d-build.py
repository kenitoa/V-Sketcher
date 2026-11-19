"""Phase31 image-conditioned volume prior. Not learned or ground-truth reconstruction."""

from pathlib import Path
import argparse
import hashlib
import json
import math
import struct
import time
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def make_model(source, depth=0.18, width=1.0, upper=1.0, tint=0.0):
    if not (
        0.08 <= depth <= 0.30 and 0.8 <= width <= 1.2 and 0.85 <= upper <= 1.2 and 0 <= tint <= 1
    ):
        raise ValueError('E_3D_CONTROL_RANGE')
    started = time.perf_counter()
    raw = source.read_bytes()
    reference = json.loads((ROOT / 'tools/three-d-reference.json').read_text(encoding='utf-8'))
    if hashlib.sha256(raw).hexdigest() != reference['sourceSha256']:
        raise ValueError('E_3D_ANNOTATION_REQUIRED')
    image = Image.open(source).convert('RGBA')
    pixels = np.asarray(image)
    alpha = pixels[:, :, 3] > 100
    yy, xx = np.where(alpha)
    if not len(xx):
        raise ValueError('E_3D_EMPTY')
    x0, x1, y0, y1 = int(xx.min()), int(xx.max()), int(yy.min()), int(yy.max())
    rows, segments = 80, 96

    def world(point):
        return [
            (point[0] * image.width - (x0 + x1) / 2) / (y1 - y0) * 1.05 * width,
            2 - (point[1] * image.height - y0) / (y1 - y0) * 1.05,
            0,
        ]

    def ramp(value, lo, hi):
        v = max(0, min(1, (value - lo) / (hi - lo)))
        return v * v * (3 - 2 * v)

    positions, uv, joints, weights = [], [], [], []
    morphs = [[], [], []]
    for row in range(rows + 1):
        t = row / rows
        py = int(round(y0 + (y1 - y0) * t))
        stripe = alpha[max(y0, py - 2) : min(y1 + 1, py + 3)]
        xs = np.where(stripe)[1]
        lo, hi = (int(xs.min()), int(xs.max())) if len(xs) else (x0, x1)
        center, radius = (lo + hi) / 2, max(2, (hi - lo) / 2)
        for col in range(segments + 1):
            angle = -math.pi + 2 * math.pi * col / segments
            px = center + radius * math.sin(angle)
            raw_x = (px - (x0 + x1) / 2) / (y1 - y0) * 1.05
            x = raw_x * width
            y = 2.0 - t * 1.05
            profile = 0.45 + 0.55 * math.sin(math.pi * t) ** 0.5
            z = depth * math.cos(angle) * profile
            # A declared prior, not inferred anatomy: front face ridge from a fixed bust proportion.
            front = max(0, math.cos(angle)) ** 8
            z += (
                front
                * 0.035
                * (depth / 0.18)
                * math.exp(-(((t - 0.31) / 0.11) ** 2))
                * math.exp(-((raw_x / 0.13) ** 2))
            )
            x *= 1 + (upper - 1) * max(0, min(1, (y - 1.4) / 0.4))
            positions.append([x, y, z])
            uv.append([px / image.width, py / image.height])
            nx, ny = px / image.width, py / image.height
            head_weight = 1 - ramp(ny, 0.38, 0.46)
            # Annotated sleeve bands, not automatic anatomical segmentation. Hair overlap remains a risk.
            arm = ramp(ny, 0.445, 0.515) * math.exp(-(((abs(nx - 0.5) - 0.20) / 0.075) ** 4)) * 0.94
            lower = ramp(ny, 0.64, 0.73)
            side_joint = 6 if nx >= 0.5 else 10
            influence = {
                4: head_weight,
                2: (1 - head_weight) * (1 - arm),
                side_joint: (1 - head_weight) * arm * (1 - lower),
                side_joint + 1: (1 - head_weight) * arm * lower,
            }
            active = [(j, w) for j, w in influence.items() if w > 1e-8]
            total = sum(w for _, w in active)
            joints.append([j for j, _ in active] + [0] * (4 - len(active)))
            weights.append([w / total for _, w in active] + [0] * (4 - len(active)))
            for i, eye in enumerate(reference['eyes']):
                mask = (
                    front
                    * math.exp(-(((nx - eye[0]) / 0.038) ** 4))
                    * math.exp(-(((ny - eye[1]) / 0.023) ** 4))
                )
                morphs[i].append([0, -(y - world(eye)[1]) * 0.92 * mask, 0])
            mouth_point = reference['mouth']
            mouth = (
                front
                * math.exp(-(((nx - mouth_point[0]) / 0.035) ** 4))
                * math.exp(-(((ny - mouth_point[1]) / 0.023) ** 4))
            )
            morphs[2].append([0, (y - world(mouth_point)[1]) * 1.4 * mouth, 0.004 * mouth])
    front_indices, back_indices = [], []
    for row in range(rows):
        for col in range(segments):
            a = row * (segments + 1) + col
            b, c, d = a + segments + 1, a + 1, a + segments + 2
            angles = -math.pi + 2 * math.pi * (col + 0.5) / segments
            target = front_indices if math.cos(angles) >= 0 else back_indices
            target.extend([a, b, c, c, b, d])
    # End caps make a volume; top/bottom use their own fan, not a billboard or displaced plane.
    for row, flip in [(0, False), (rows, True)]:
        ring = np.asarray(positions[row * (segments + 1) : (row + 1) * (segments + 1)])
        center = ring.mean(axis=0).tolist()
        index = len(positions)
        positions.append(center)
        uv.append([0.5, y0 / image.height if row == 0 else y1 / image.height])
        joints.append([4 if row == 0 else 2, 0, 0, 0])
        weights.append([1, 0, 0, 0])
        for m in morphs:
            m.append([0, 0, 0])
        for col in range(segments):
            a = row * (segments + 1) + col
            back_indices.extend([index, a, a + 1] if flip else [index, a + 1, a])
    positions = np.asarray(positions, dtype='<f4')
    normals = np.zeros_like(positions)
    for tri in np.asarray(front_indices + back_indices).reshape(-1, 3):
        a, b, c = positions[tri]
        n = np.cross(b - a, c - a)
        for at in tri:
            normals[at] += n
    lengths = np.linalg.norm(normals, axis=1)
    normals /= np.maximum(lengths[:, None], 1e-8)
    bones = [
        ('hips', 0, [0, 1, 0]),
        ('spine', 1, [0, 1.25, 0]),
        ('chest', 2, world(reference['chest'])),
        ('neck', 3, world(reference['neck'])),
        ('head', 4, world(reference['neck'])),
        ('leftShoulder', 3, world([0.60, 0.46])),
        ('leftUpperArm', 6, world(reference['leftShoulder'])),
        ('leftLowerArm', 7, world(reference['leftElbow'])),
        ('leftHand', 8, world([0.72, 0.97])),
        ('rightShoulder', 3, world([0.40, 0.46])),
        ('rightUpperArm', 10, world(reference['rightShoulder'])),
        ('rightLowerArm', 11, world(reference['rightElbow'])),
        ('rightHand', 12, world([0.25, 0.97])),
        ('leftUpperLeg', 1, [0.10, 0.96, 0]),
        ('leftLowerLeg', 14, [0.10, 0.50, 0]),
        ('leftFoot', 15, [0.10, 0.08, 0.08]),
        ('rightUpperLeg', 1, [-0.10, 0.96, 0]),
        ('rightLowerLeg', 17, [-0.10, 0.50, 0]),
        ('rightFoot', 18, [-0.10, 0.08, 0.08]),
    ]
    nodes = [{'name': 'ResearchRoot', 'children': [1]}]
    world = [[0, 0, 0]] + [b[2] for b in bones]
    for i, (name, parent, pos) in enumerate(bones, 1):
        node = {'name': name, 'translation': [pos[k] - world[parent][k] for k in range(3)]}
        children = [j for j, b in enumerate(bones, 1) if b[1] == i]
        if children:
            node['children'] = children
        nodes.append(node)
    nodes.append({'name': 'ImageConditionedBust', 'mesh': 0, 'skin': 0, 'weights': [0, 0, 0]})
    matrices = []
    for _, _, pos in bones:
        matrix = np.eye(4, dtype='<f4')
        matrix[:3, 3] = -np.asarray(pos)
        matrices.append(matrix.T.reshape(-1))
    buffers, views, accessors = [], [], []

    def add(data, component, kind, count, bounds=False, target=None):
        payload = data.tobytes() if hasattr(data, 'tobytes') else data
        offset = sum(len(b) for b in buffers)
        view = {'buffer': 0, 'byteOffset': offset, 'byteLength': len(payload)}
        if target:
            view['target'] = target
        views.append(view)
        buffers.append(payload + b'\x00' * ((-len(payload)) % 4))
        accessor = {
            'bufferView': len(views) - 1,
            'componentType': component,
            'count': count,
            'type': kind,
        }
        if bounds:
            accessor['min'] = np.asarray(data).reshape(count, -1).min(axis=0).tolist()
            accessor['max'] = np.asarray(data).reshape(count, -1).max(axis=0).tolist()
        accessors.append(accessor)
        return len(accessors) - 1

    attrs = {
        'POSITION': add(positions, 5126, 'VEC3', len(positions), True, 34962),
        'NORMAL': add(normals, 5126, 'VEC3', len(normals), target=34962),
        'TEXCOORD_0': add(np.asarray(uv, dtype='<f4'), 5126, 'VEC2', len(uv), target=34962),
        'JOINTS_0': add(np.asarray(joints, dtype='<u2'), 5123, 'VEC4', len(joints), target=34962),
        'WEIGHTS_0': add(
            np.asarray(weights, dtype='<f4'), 5126, 'VEC4', len(weights), target=34962
        ),
    }
    targets = [
        {'POSITION': add(np.asarray(m, dtype='<f4'), 5126, 'VEC3', len(m), True, 34962)}
        for m in morphs
    ]
    primitives = []
    for material, indices in enumerate([front_indices, back_indices]):
        index = add(np.asarray(indices, dtype='<u2'), 5123, 'SCALAR', len(indices), target=34963)
        attributes = (
            attrs if material == 0 else {k: v for k, v in attrs.items() if k != 'TEXCOORD_0'}
        )
        primitives.append(
            {'attributes': attributes, 'indices': index, 'material': material, 'targets': targets}
        )
    inverse = add(np.asarray(matrices, dtype='<f4'), 5126, 'MAT4', len(bones))
    times = add(np.asarray([0, 1, 2], dtype='<f4'), 5126, 'SCALAR', 3, True)
    rotations = add(
        np.asarray([[0, 0, 0, 1], [0, math.sin(0.2), 0, math.cos(0.2)], [0, 0, 0, 1]], dtype='<f4'),
        5126,
        'VEC4',
        3,
    )
    expression_values = add(np.asarray([0, 0, 0, 1, 1, 1, 0, 0, 0], dtype='<f4'), 5126, 'SCALAR', 9)
    offset = sum(len(b) for b in buffers)
    views.append({'buffer': 0, 'byteOffset': offset, 'byteLength': len(raw)})
    image_view = len(views) - 1
    buffers.append(raw + b'\x00' * ((-len(raw)) % 4))
    binary = b''.join(buffers)
    doc = {
        'asset': {'version': '2.0', 'generator': '2DSketcher Phase31 volume-prior prototype 0.1'},
        'scene': 0,
        'scenes': [{'nodes': [0, 20]}],
        'nodes': nodes,
        'buffers': [{'byteLength': len(binary)}],
        'bufferViews': views,
        'accessors': accessors,
        'images': [{'bufferView': image_view, 'mimeType': 'image/png'}],
        'textures': [{'source': 0, 'sampler': 0}],
        'samplers': [{'magFilter': 9729, 'minFilter': 9729, 'wrapS': 33071, 'wrapT': 33071}],
        'materials': [
            {
                'name': 'ObservedFront',
                'pbrMetallicRoughness': {
                    'baseColorTexture': {'index': 0},
                    'baseColorFactor': [1, 1 - 0.25 * tint, 1, 1],
                    'metallicFactor': 0,
                    'roughnessFactor': 1,
                },
                'alphaMode': 'BLEND',
                'doubleSided': False,
                'extensions': {'KHR_materials_unlit': {}},
            },
            {
                'name': 'EstimatedBack',
                'pbrMetallicRoughness': {
                    'baseColorFactor': [0.32, 0.20, 0.43, 1],
                    'metallicFactor': 0,
                    'roughnessFactor': 0.9,
                },
                'doubleSided': False,
            },
        ],
        'meshes': [
            {
                'name': 'VolumePriorBust',
                'primitives': primitives,
                'extras': {'targetNames': ['blinkLeft', 'blinkRight', 'aa']},
            }
        ],
        'skins': [{'joints': list(range(1, 20)), 'inverseBindMatrices': inverse, 'skeleton': 1}],
        'animations': [
            {
                'name': 'HeadAndExpressionProbe',
                'samplers': [
                    {'input': times, 'output': rotations},
                    {'input': times, 'output': expression_values},
                ],
                'channels': [
                    {'sampler': 0, 'target': {'node': 5, 'path': 'rotation'}},
                    {'sampler': 1, 'target': {'node': 20, 'path': 'weights'}},
                ],
            }
        ],
        'extensionsUsed': ['KHR_materials_unlit'],
        'extras': {
            'phase': 31,
            'researchOnly': True,
            'sourceSha256': hashlib.sha256(raw).hexdigest(),
            'observed': 'front-image colors and silhouette',
            'estimated': [
                'all depth',
                'side/back anatomy',
                'rig weights',
                'facial deformations',
                'unrendered full-body bone references',
            ],
            'anatomy': reference,
            'productionReconstruction': False,
        },
    }
    vrm = {
        'specVersion': '1.0',
        'meta': {
            'name': 'Violet local research bust',
            'version': '0.1',
            'authors': ['2DSketcher project local research'],
            'copyrightInformation': 'AI-generated project reference; local technical experiment only; not a public redistribution grant',
            'licenseUrl': 'https://vrm.dev/licenses/1.0/',
            'avatarPermission': 'onlyAuthor',
            'commercialUsage': 'personalNonProfit',
            'creditNotation': 'required',
            'allowRedistribution': False,
            'modification': 'allowModification',
        },
        'humanoid': {'humanBones': {name: {'node': i} for i, (name, _, _) in enumerate(bones, 1)}},
        'expressions': {
            'preset': {
                name: {
                    'morphTargetBinds': [{'node': 20, 'index': i, 'weight': 1}],
                    'isBinary': False,
                }
                for i, name in enumerate(['blinkLeft', 'blinkRight', 'aa'])
            }
        },
    }
    metrics = {
        'vertices': len(positions),
        'triangles': (len(front_indices) + len(back_indices)) // 3,
        'depthRange': float(np.ptp(positions[:, 2])),
        'joints': len(bones),
        'morphTargets': 3,
        'sourceSha256': doc['extras']['sourceSha256'],
        'textureSize': list(image.size),
        'buildMs': (time.perf_counter() - started) * 1000,
        'observedViews': ['front'],
        'estimatedViews': ['side', 'rear'],
        'actualGroundTruthSideRear': False,
        'defaultVisibleArtwork': 'existing premium reference',
        'researchOnly': True,
    }
    metrics['anatomyMethod'] = reference['method']
    metrics['weightedVertices'] = {
        name: sum(
            1 for js, ws in zip(joints, weights) if any(j == i and w > 0.01 for j, w in zip(js, ws))
        )
        for i, (name, _, _) in enumerate(bones)
    }
    metrics['unsupportedParts'] = reference['unsupported']
    return doc, binary, vrm, metrics


def write_glb(path, doc, binary):
    text = json.dumps(doc, separators=(',', ':')).encode('utf-8')
    text += b' ' * ((-len(text)) % 4)
    path.write_bytes(
        struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(text) + 8 + len(binary))
        + struct.pack('<II', len(text), 0x4E4F534A)
        + text
        + struct.pack('<II', len(binary), 0x004E4942)
        + binary
    )


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--source', required=True)
    p.add_argument('--output', required=True)
    p.add_argument('--depth', type=float, default=0.18)
    p.add_argument('--width', type=float, default=1.0)
    p.add_argument('--upper', type=float, default=1.0)
    p.add_argument('--tint', type=float, default=0.0)
    args = p.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=False)
    source = Path(args.source)
    doc, binary, vrm, metrics = make_model(source, args.depth, args.width, args.upper, args.tint)
    write_glb(out / 'model.glb', doc, binary)
    doc['extensionsUsed'].append('VRMC_vrm')
    doc['extensions'] = {'VRMC_vrm': vrm}
    write_glb(out / 'model.vrm', doc, binary)
    (out / 'metrics.json').write_text(json.dumps(metrics, indent=2) + '\n', encoding='utf-8')
    print(
        json.dumps(
            {
                'passed': True,
                'vertices': metrics['vertices'],
                'triangles': metrics['triangles'],
                'researchOnly': True,
            }
        )
    )


if __name__ == '__main__':
    main()
