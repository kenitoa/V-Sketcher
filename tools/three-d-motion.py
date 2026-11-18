"""Confidence-gated image-plane body deltas. No inferred movement for missing joints."""
import math

CHANNELS = ('chest', 'leftUpperArm', 'leftLowerArm', 'rightUpperArm', 'rightLowerArm')
SEGMENTS = {'chest': (11, 12), 'leftUpperArm': (11, 13), 'leftLowerArm': (13, 15),
            'rightUpperArm': (12, 14), 'rightLowerArm': (14, 16)}


def angle_delta(current, baseline):
    return math.atan2(math.sin(current-baseline), math.cos(current-baseline))


def body_controls(landmarks, calibration):
    values, observed, absolute = {name: 0.0 for name in CHANNELS}, {}, {}

    def good(index):
        if not landmarks or len(landmarks) != 33:
            return False
        p = landmarks[index]
        return (all(math.isfinite(v) for v in (p.x, p.y, p.visibility, p.presence))
                and p.visibility >= .55 and p.presence >= .55 and 0 <= p.x <= 1 and 0 <= p.y <= 1)

    for name, (a, b) in SEGMENTS.items():
        indices = (a, b)
        observed[name] = all(good(index) for index in indices)
        if not observed[name]:
            continue
        ax, ay = landmarks[a].x, landmarks[a].y
        bx, by = landmarks[b].x, landmarks[b].y
        if math.hypot(bx-ax, by-ay) < .035:
            observed[name] = False
            continue
        absolute[name] = math.atan2(-(by-ay), (bx-ax)*4/3)
        # First reliable observation establishes this segment's neutral. Never calibrate missing joints.
        calibration.setdefault(name, absolute[name])
        values[name] = max(-.8, min(.8, angle_delta(absolute[name], calibration[name])))
    # Bones inherit their parent's rotation: convert absolute image-plane deltas to local deltas.
    for name, parent in [('leftLowerArm', 'leftUpperArm'), ('rightLowerArm', 'rightUpperArm'),
                         ('leftUpperArm', 'chest'), ('rightUpperArm', 'chest')]:
        if observed[name]:
            values[name] = max(-1.2, min(1.2, values[name]-values[parent]))
    return values, observed
