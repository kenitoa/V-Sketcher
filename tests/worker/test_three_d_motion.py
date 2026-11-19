"""Research body mapping: missing joints, wraparound, isolation and local rotations."""

from pathlib import Path
from types import SimpleNamespace
import importlib.util
import math
import unittest

spec = importlib.util.spec_from_file_location(
    'three_d_motion', Path(__file__).resolve().parents[2] / 'tools/three-d-motion.py'
)
motion = importlib.util.module_from_spec(spec)
spec.loader.exec_module(motion)


def person():
    points = [SimpleNamespace(x=0.5, y=0.5, visibility=0, presence=0) for _ in range(33)]
    for i, x, y in [
        (11, 0.65, 0.3),
        (12, 0.35, 0.3),
        (13, 0.7, 0.55),
        (14, 0.3, 0.55),
        (15, 0.72, 0.8),
        (16, 0.28, 0.8),
    ]:
        points[i] = SimpleNamespace(x=x, y=y, visibility=0.99, presence=0.99)
    return points


class ThreeDResearchMotionTests(unittest.TestCase):
    def test_missing_body_does_not_calibrate_or_move(self):
        calibration = {}
        values, visible = motion.body_controls([], calibration)
        self.assertEqual(set(values.values()), {0})
        self.assertFalse(any(visible.values()))
        self.assertEqual(calibration, {})

    def test_neutral_and_repeated_frame_are_zero(self):
        calibration = {}
        for _ in range(2):
            values, visible = motion.body_controls(person(), calibration)
            self.assertEqual(set(values.values()), {0})
            self.assertTrue(all(visible.values()))

    def test_left_arm_change_does_not_move_right_or_chest(self):
        points, calibration = person(), {}
        motion.body_controls(points, calibration)
        points[13].x, points[13].y = 0.85, 0.4
        values, _ = motion.body_controls(points, calibration)
        self.assertGreater(abs(values['leftUpperArm']), 0.2)
        self.assertEqual(values['rightUpperArm'], 0)
        self.assertEqual(values['rightLowerArm'], 0)
        self.assertEqual(values['chest'], 0)

    def test_occluded_wrist_is_not_fabricated(self):
        points, calibration = person(), {}
        motion.body_controls(points, calibration)
        points[15].visibility = 0.1
        points[15].x = 0.95
        values, visible = motion.body_controls(points, calibration)
        self.assertFalse(visible['leftLowerArm'])
        self.assertEqual(values['leftLowerArm'], 0)
        self.assertTrue(visible['rightLowerArm'])

    def test_out_of_frame_and_nan_are_not_observed(self):
        for x in [1.1, -0.1, math.nan]:
            points = person()
            points[15].x = x
            values, visible = motion.body_controls(points, {})
            self.assertFalse(visible['leftLowerArm'])
            self.assertEqual(values['leftLowerArm'], 0)

    def test_angle_wrap_is_shortest_rotation(self):
        self.assertAlmostEqual(motion.angle_delta(-math.pi + 0.02, math.pi - 0.02), 0.04)

    def test_lower_arm_is_parent_relative(self):
        points, calibration = person(), {}
        motion.body_controls(points, calibration)
        # Rotate a whole left arm rigidly around its shoulder in aspect-corrected coordinates.
        for i in [13, 15]:
            dx, dy = (points[i].x - 0.65) * 4 / 3, -(points[i].y - 0.3)
            angle = 0.3
            points[i].x = 0.65 + (dx * math.cos(angle) - dy * math.sin(angle)) * 3 / 4
            points[i].y = 0.3 - (dx * math.sin(angle) + dy * math.cos(angle))
        values, visible = motion.body_controls(points, calibration)
        self.assertTrue(visible['leftLowerArm'])
        self.assertAlmostEqual(values['leftUpperArm'], 0.3)
        self.assertAlmostEqual(values['leftLowerArm'], 0)


if __name__ == '__main__':
    unittest.main()
