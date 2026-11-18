"""Recognize landmarks in the project-owned drawing, not a user's camera frames."""
from pathlib import Path
import argparse
import hashlib
import json
import mediapipe as mp
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
POSE_SHA = '59929e1d1ee95287735ddd833b19cf4ac46d29bc7afddbbf6753c459690d574a'


def detect_reference(source):
    image = np.asarray(Image.open(source).convert('RGBA'), dtype=np.float32)
    alpha = image[:, :, 3:4]/255
    rgb = np.asarray(image[:, :, :3]*alpha+128*(1-alpha), dtype=np.uint8)
    data = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    face_bytes = (ROOT/'.local/models/face_landmarker.task').read_bytes()
    pose_bytes = (ROOT/'.local/research31/pose_landmarker_lite.task').read_bytes()
    if hashlib.sha256(pose_bytes).hexdigest() != POSE_SHA:
        raise ValueError('E_3D_POSE_MODEL_HASH')
    face = mp.tasks.vision.FaceLandmarker.create_from_options(mp.tasks.vision.FaceLandmarkerOptions(
        base_options=mp.tasks.BaseOptions(model_asset_buffer=face_bytes),
        running_mode=mp.tasks.vision.RunningMode.IMAGE, num_faces=1,
        min_face_detection_confidence=.5, min_face_presence_confidence=.5))
    body = mp.tasks.vision.PoseLandmarker.create_from_options(mp.tasks.vision.PoseLandmarkerOptions(
        base_options=mp.tasks.BaseOptions(model_asset_buffer=pose_bytes),
        running_mode=mp.tasks.vision.RunningMode.IMAGE, num_poses=1,
        min_pose_detection_confidence=.5, min_pose_presence_confidence=.5))
    try:
        f, p = face.detect(data), body.detect(data)
        points = f.face_landmarks[0] if f.face_landmarks else []
        landmarks = p.pose_landmarks[0] if p.pose_landmarks else []
        result = {'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                  'sourceIsProjectArtwork': True, 'faceCount': len(f.face_landmarks),
                  'bodyCount': len(p.pose_landmarks), 'faceLandmarks': len(points),
                  'poseModelSha256': POSE_SHA, 'parts': {}, 'faceRegions': {}}

        def region(indices):
            xs, ys = [points[i].x for i in indices], [points[i].y for i in indices]
            return {'x': min(xs), 'y': min(ys), 'width': max(xs)-min(xs), 'height': max(ys)-min(ys)}

        if points:
            result['faceRegions'] = {'face': region([10, 152, 234, 454]),
                                     'blinkLeft': region([263, 362, 386, 374]),
                                     'blinkRight': region([33, 133, 159, 145]),
                                     'aa': region([61, 291, 13, 14])}
            result['parts']['head'] = {'state': 'detected', 'landmarkCount': len(points)}
        else:
            result['parts']['head'] = {'state': 'not-detected'}
        for name, index in {'leftShoulder': 11, 'rightShoulder': 12, 'leftElbow': 13, 'rightElbow': 14,
                            'leftWrist': 15, 'rightWrist': 16, 'leftHip': 23, 'rightHip': 24}.items():
            v = landmarks[index] if landmarks else None
            good = v is not None and v.visibility >= .55 and v.presence >= .55 and 0 <= v.x <= 1 and 0 <= v.y <= 1
            result['parts'][name] = {'state': 'detected' if good else 'not-observed',
                                     'confidence': float(min(v.visibility, v.presence)) if v else 0}
            if good:
                result['parts'][name].update(x=v.x, y=v.y)
        return result
    finally:
        face.close()
        body.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    result = detect_reference(Path(args.source))
    Path(args.output).write_text(json.dumps(result, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({'faceCount': result['faceCount'], 'bodyCount': result['bodyCount'],
                      'parts': {name: p['state'] for name, p in result['parts'].items()}}))
