"""Explicit opt-in prototype input. Only controls/aggregate counts cross stdout; no media files."""
from pathlib import Path
import importlib.util
import io
import json
import math
import hashlib
import sys
import time
import cv2
import numpy as np
import mediapipe as mp
import sounddevice as sd
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('phase31_tracking', ROOT/'worker/tracking.py')
tracking = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tracking)
motion_spec = importlib.util.spec_from_file_location('phase31_motion', ROOT/'tools/three-d-motion.py')
motion = importlib.util.module_from_spec(motion_spec)
motion_spec.loader.exec_module(motion)


def emit(value):
    print(json.dumps(value, separators=(',', ':'), allow_nan=False), flush=True)


def main():
    detector = None
    body = None
    cap = None
    audio = None
    frames, faces, blocks, maximum_rms = 0, 0, 0, 0.0
    ranges = {k: [1e9, -1e9] for k in ['yaw', 'roll', 'mouth', 'blinkLeft', 'blinkRight']}
    current_rms = 0.0
    calibration = {}
    body_counts = {key: 0 for key in motion.CHANNELS}
    body_diagnostics = {name: dict.fromkeys(['noPose', 'outsideFrame', 'lowConfidence', 'observed'], 0)
                        for name in ['leftShoulder', 'rightShoulder', 'leftElbow', 'rightElbow', 'leftWrist', 'rightWrist']}
    filtered = {key: 0.0 for key in motion.CHANNELS}
    ranges.update({key: [1e9, -1e9] for key in motion.CHANNELS})

    def microphone(data, _frames, _time, _status):
        nonlocal blocks, maximum_rms, current_rms
        current_rms = float(np.sqrt(np.mean(np.asarray(data, dtype=np.float32)**2)))
        maximum_rms = max(maximum_rms, current_rms)
        blocks += 1

    started = time.monotonic()
    code = None
    stop = next((Path(v.split('=', 1)[1]) for v in sys.argv if v.startswith('--stop-file=')), None)
    try:
        detector = tracking.create_detector()
        pose_bytes = (ROOT/'.local/research31/pose_landmarker_lite.task').read_bytes()
        if hashlib.sha256(pose_bytes).hexdigest() != '59929e1d1ee95287735ddd833b19cf4ac46d29bc7afddbbf6753c459690d574a':
            raise ValueError('E_3D_POSE_MODEL_HASH')
        body = mp.tasks.vision.PoseLandmarker.create_from_options(mp.tasks.vision.PoseLandmarkerOptions(
            base_options=mp.tasks.BaseOptions(model_asset_buffer=pose_bytes),
            running_mode=mp.tasks.vision.RunningMode.VIDEO, num_poses=1,
            min_pose_detection_confidence=.5, min_pose_presence_confidence=.5, min_tracking_confidence=.5))
        cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        if not cap.isOpened():
            raise ValueError('E_3D_CAMERA_OPEN')
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        audio = sd.InputStream(channels=1, samplerate=16000, blocksize=1024, callback=microphone)
        audio.start()
        emit({'type': 'ready', 'source': 'DirectShow index 0 + default microphone', 'framesStored': False, 'pcmStored': False})
        started = time.monotonic()
        while time.monotonic()-started < 55:
            if stop and stop.exists():
                code = 'E_3D_LIVE_CANCELLED'
                break
            ok, frame = cap.read()
            if not ok:
                raise ValueError('E_3D_CAMERA_READ')
            image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            image.thumbnail((640, 480))
            encoded = io.BytesIO()
            image.save(encoded, format='JPEG', quality=65)
            frames += 1
            result = tracking.analyze(detector, encoded.getvalue(), frames)
            body_result = body.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.asarray(image)), max(frames, int((time.monotonic()-started)*1000)))
            landmarks = body_result.pose_landmarks[0] if body_result.pose_landmarks else []
            for name, index in zip(body_diagnostics, [11, 12, 13, 14, 15, 16]):
                point = landmarks[index] if landmarks else None
                reason = ('noPose' if point is None else 'outsideFrame' if not (0 <= point.x <= 1 and 0 <= point.y <= 1)
                          else 'lowConfidence' if point.visibility < .55 or point.presence < .55 else 'observed')
                body_diagnostics[name][reason] += 1
            body_values, observed = motion.body_controls(landmarks, calibration)
            value = result['faces'][0]['values'] if result['faces'] else None
            pose = {'yaw': 0.0, 'roll': 0.0, 'mouth': min(1.0, current_rms*30), 'blinkLeft': 0.0, 'blinkRight': 0.0}
            if value:
                faces += 1
                pose.update(yaw=max(-0.65, min(0.65, math.radians(value['head_yaw']))),
                            roll=max(-0.4, min(0.4, math.radians(value['head_roll']))),
                            mouth=max(value['mouth'], pose['mouth']),
                            blinkLeft=1-value['eye_left'], blinkRight=1-value['eye_right'])
            for key, number in body_values.items():
                body_counts[key] += int(observed[key])
                # Missing parts return toward neutral, never continue a fabricated movement.
                filtered[key] += .35*(number-filtered[key])
                pose[key] = filtered[key]
            for key, number in pose.items():
                ranges[key][0] = min(ranges[key][0], number)
                ranges[key][1] = max(ranges[key][1], number)
            emit({'type': 'pose', 'faces': len(result['faces']), 'seconds': round(time.monotonic()-started, 1), 'rms': round(current_rms, 5), 'bodyObserved': observed, **pose})
            del frame, image, encoded, result, value, body_result
            time.sleep(0.025)
    except Exception as error:
        code = str(error) if str(error) in ['E_3D_CAMERA_OPEN', 'E_3D_CAMERA_READ'] else 'E_3D_LIVE_INPUT'
    finally:
        if audio:
            audio.stop()
            audio.close()
        if cap:
            cap.release()
        if detector:
            detector.close()
        if body:
            body.close()
        emit({'type': 'summary', 'passed': code is None and frames > 30 and faces > 15 and blocks > 20,
              'code': code, 'frames': frames, 'framesWithFace': faces, 'microphoneBlocks': blocks,
              'maximumRMS': maximum_rms, 'controlRanges': ranges if frames else {},
              'bodyObservedFrames': body_counts, 'bodyMotionAccepted': all(body_counts[k] >= 15 and ranges[k][1]-ranges[k][0] > .12 for k in motion.CHANNELS),
              'bodyJointDiagnostics': body_diagnostics,
              'bodyTrackingScope': 'confidence-gated image-plane shoulder roll and arm angles; not 3D body reconstruction',
              'seconds': time.monotonic()-started, 'resourcesReleased': True,
              'framesStored': False, 'pcmStored': False, 'sourceIdentityComparedWith2DBrowser': False})


if __name__ == '__main__':
    main()
