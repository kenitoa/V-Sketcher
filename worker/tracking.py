"""Bounded in-memory camera inference. No capture devices, frames on disk or raw stderr forwarding."""

from pathlib import Path
import base64, hashlib, io, json, math, sys, time

MAX_BYTES = 320 * 1024
MODEL_SHA = '64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff'


def create_detector():
    import mediapipe as mp

    root = (
        Path(sys._MEIPASS)
        if getattr(sys, 'frozen', False)
        else Path(__file__).resolve().parent.parent / '.local'
    )
    data = (root / 'models/face_landmarker.task').read_bytes()
    if hashlib.sha256(data).hexdigest() != MODEL_SHA:
        raise ValueError('E_MODEL_HASH')
    return mp.tasks.vision.FaceLandmarker.create_from_options(
        mp.tasks.vision.FaceLandmarkerOptions(
            base_options=mp.tasks.BaseOptions(model_asset_buffer=data),
            running_mode=mp.tasks.vision.RunningMode.VIDEO,
            num_faces=4,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5,
            output_face_blendshapes=True,
            output_facial_transformation_matrixes=True,
        )
    )


def analyze(detector, data, seq):
    import mediapipe as mp
    import numpy as np
    from PIL import Image

    if len(data) > 220 * 1024 or not data.startswith(b'\xff\xd8\xff'):
        raise ValueError('E_TRACKING_FRAME')
    with Image.open(io.BytesIO(data)) as source:
        w, h = source.size
        if source.format != 'JPEG' or not (64 <= w <= 640 and 64 <= h <= 480) or w * h > 307200:
            raise ValueError('E_TRACKING_FRAME')
        rgb = np.asarray(source.convert('RGB'))
    timestamp = max(getattr(detector, '_tracking_timestamp', 0) + 1, int(time.monotonic() * 1000))
    detector._tracking_timestamp = timestamp
    start = time.perf_counter()
    result = detector.detect_for_video(
        mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb), timestamp
    )
    elapsed = (time.perf_counter() - start) * 1000
    faces = []
    for landmarks, shapes, matrix in zip(
        result.face_landmarks, result.face_blendshapes, result.facial_transformation_matrixes
    ):
        scores = {s.category_name: float(s.score) for s in shapes}
        r = np.asarray(matrix)[:3, :3]
        x0 = max(0.0, min(float(p.x) for p in landmarks))
        y0 = max(0.0, min(float(p.y) for p in landmarks))
        x1 = min(1.0, max(float(p.x) for p in landmarks))
        y1 = min(1.0, max(float(p.y) for p in landmarks))
        values = {
            'eye_left': 1 - scores.get('eyeBlinkLeft', 0.0),
            'eye_right': 1 - scores.get('eyeBlinkRight', 0.0),
            'mouth': scores.get('jawOpen', 0.0),
            'head_yaw': math.degrees(math.atan2(-r[2, 0], math.hypot(r[0, 0], r[1, 0]))),
            'head_roll': math.degrees(math.atan2(r[1, 0], r[0, 0])),
        }
        if (
            x1 - x0 <= 0.01
            or y1 - y0 <= 0.01
            or not all(math.isfinite(v) for v in values.values())
            or abs(values['head_yaw']) > 80
            or abs(values['head_roll']) > 70
        ):
            continue
        roi = rgb[
            max(0, int(y0 * h)) : min(h, math.ceil(y1 * h)),
            max(0, int(x0 * w)) : min(w, math.ceil(x1 * w)),
        ]
        faces.append(
            {
                'box': {'x': x0, 'y': y0, 'width': x1 - x0, 'height': y1 - y0},
                'values': values,
                'brightness': float(roi.mean()),
            }
        )
    return {'seq': seq, 'faces': faces, 'brightness': float(rgb.mean()), 'inferenceMs': elapsed}


def serve(source, sink, detector):
    last = -1

    def emit(value):
        sink.write((json.dumps(value, separators=(',', ':'), allow_nan=False) + '\n').encode())
        sink.flush()

    emit({'ready': True})
    while True:
        line = source.readline(MAX_BYTES + 2)
        if not line:
            return
        try:
            if len(line) > MAX_BYTES:
                raise ValueError('E_TRACKING_FRAME')
            v = json.loads(line)
            if v == {'stop': True}:
                return
            if (
                not isinstance(v, dict)
                or set(v) != {'seq', 'jpeg'}
                or type(v['seq']) is not int
                or v['seq'] <= last
                or v['seq'] > 2**53 - 2
                or not isinstance(v['jpeg'], str)
            ):
                raise ValueError('E_TRACKING_FRAME')
            last = v['seq']
            data = base64.b64decode(v['jpeg'], validate=True)
            result = analyze(detector, data, last)
            emit({'ok': True, 'result': result})
            del data, result
        except Exception:
            emit({'ok': False, 'errorCode': 'E_TRACKING_RESULT'})
        if len(line) > MAX_BYTES:
            return


def cli():
    detector = None
    try:
        detector = create_detector()
        serve(sys.stdin.buffer, sys.stdout.buffer, detector)
    except Exception:
        sys.stdout.write('{"ready":false}\n')
        sys.stdout.flush()
    finally:
        if detector:
            detector.close()
