"""Explicit developer-only camera path comparison; derived aggregates, never images/audio."""

from pathlib import Path
import importlib.util, io, json, math, time
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('product_tracking', ROOT / 'worker/tracking.py')
tracking = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tracking)


class Observed:
    def __init__(self, detector):
        self.detector = detector
        self.count = 0
        self.poses = []

    def detect_for_video(self, image, timestamp):
        result = self.detector.detect_for_video(image, timestamp)
        self.count = len(result.face_landmarks)
        self.poses = []
        for matrix in result.facial_transformation_matrixes:
            r = np.asarray(matrix)[:3, :3]
            self.poses.append(
                [
                    math.degrees(math.atan2(-r[2, 0], math.hypot(r[0, 0], r[1, 0]))),
                    math.degrees(math.atan2(r[1, 0], r[0, 0])),
                ]
            )
        return result

    def close(self):
        self.detector.close()


def run():
    cap = None
    detector = None
    rows = []
    try:
        cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        if not cap.isOpened():
            return {'passed': False, 'code': 'E_CAMERA_OPEN', 'framesSaved': False}
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        detector = Observed(tracking.create_detector())
        end = time.monotonic() + 7
        seq = 0
        while time.monotonic() < end:
            ok, bgr = cap.read()
            if not ok:
                break
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(rgb)
            image.thumbnail((640, 480))
            data = io.BytesIO()
            image.save(data, format='JPEG', quality=65)
            seq += 1
            value = tracking.analyze(detector, data.getvalue(), seq)
            rows.append(
                {
                    'rawFaces': detector.count,
                    'validFaces': len(value['faces']),
                    'brightness': value['brightness'],
                    'std': float(rgb.std()),
                    'poses': detector.poses,
                    'width': int(rgb.shape[1]),
                    'height': int(rgb.shape[0]),
                }
            )
        return {
            'passed': bool(rows),
            'source': 'DirectShow index 0; identity not assumed equal to browser selection',
            'frames': len(rows),
            'framesWithRawFaces': sum(r['rawFaces'] > 0 for r in rows),
            'framesWithValidFaces': sum(r['validFaces'] > 0 for r in rows),
            'maxRawFaces': max((r['rawFaces'] for r in rows), default=0),
            'medianBrightness': float(np.median([r['brightness'] for r in rows])) if rows else None,
            'medianStd': float(np.median([r['std'] for r in rows])) if rows else None,
            'poseExamples': [r['poses'] for r in rows if r['poses']][:3],
            'sourceSize': [rows[0]['width'], rows[0]['height']] if rows else None,
            'framesSaved': False,
            'microphoneOpened': False,
        }
    except Exception:
        return {'passed': False, 'code': 'E_CAMERA_DIAGNOSTIC', 'framesSaved': False}
    finally:
        if cap:
            cap.release()
        if detector:
            detector.close()


if __name__ == '__main__':
    result = run()
    out = ROOT / '.local' / ('camera-diagnostic-' + str(int(time.time())) + '.json')
    out.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result))
