import unittest, tempfile, sys, json, copy
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'worker'))
from structure import analyze, build


class CorrectionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        p = json.loads((ROOT / 'assets/product/preview-project.json').read_text(encoding='utf-8'))
        a = next(a for a in p['assets'] if a['id'] == p['inputAssetIds'][0])
        cls.image = Image.open(
            ROOT / 'assets/product/preview' / (a['fingerprint']['sha256'] + '.png')
        ).convert('RGBA')
        cls.report = analyze(cls.image, ROOT / '.local/models/face_landmarker.task')

    def test_boundary_erase_restore_reconstructs_original_and_protects_excluded_pixels(self):
        report = copy.deepcopy(self.report)
        r = report['regions'][0]
        box = r['rect']
        mask = {'x': box['x'], 'y': box['y'], 'width': 10, 'height': box['height']}
        r['masks'] = [{'mode': 'erase', 'rect': mask}]
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp)
            result = build(self.image, report, target, 'estimated')
            base = Image.open(target / 'structure-base.png').convert('RGBA')
            neutral = base.copy()
            for region in result['regions']:
                key = region['key']
                state = 'closed' if key == 'mouth' else 'open'
                neutral.alpha_composite(
                    Image.open(target / f'structure-{key}-{state}.png'),
                    (region['rect']['x'], region['rect']['y']),
                )
            self.assertTrue(np.array_equal(np.array(neutral), np.array(self.image)))
            eye = np.array(Image.open(target / f'structure-{r["key"]}-closed.png'))
            self.assertTrue(np.all(eye[:, :10, 3] == 0))
            self.assertTrue(
                np.array_equal(
                    np.array(base)[box['y'] : box['y'] + box['height'], box['x'] : box['x'] + 10],
                    np.array(self.image)[
                        box['y'] : box['y'] + box['height'], box['x'] : box['x'] + 10
                    ],
                )
            )
            r['masks'].append({'mode': 'restore', 'rect': mask})
            build(self.image, report, target, 'estimated')
            eye = np.array(Image.open(target / f'structure-{r["key"]}-open.png'))
            self.assertTrue(np.any(eye[:, :10, 3] > 0))

    def test_partial_build_creates_only_requested_feature_and_shared_base(self):
        with tempfile.TemporaryDirectory() as tmp:
            r = build(self.image, self.report, Path(tmp), 'estimated', ['mouth'])
            self.assertEqual(
                set(r['files']),
                {'structure-base.png', 'structure-mouth-open.png', 'structure-mouth-closed.png'},
            )

    def test_skip_retains_original_area_and_disables_only_one_feature(self):
        report = copy.deepcopy(self.report)
        report['regions'][0]['enabled'] = False
        with tempfile.TemporaryDirectory() as tmp:
            r = build(self.image, report, Path(tmp), 'estimated')
            self.assertFalse(r['regions'][0]['enabled'])
            self.assertNotIn('structure-eye_right-open.png', r['files'])
            self.assertIn('structure-eye_left-open.png', r['files'])

    def test_overlapping_enabled_regions_are_blocked_without_corrupt_result(self):
        report = copy.deepcopy(self.report)
        report['regions'][1]['rect'] = report['regions'][0]['rect'].copy()
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaisesRegex(ValueError, 'OVERLAP'):
                build(self.image, report, Path(tmp), 'estimated')

    def test_apply_base_only_is_identical_to_full_build_base(self):
        with tempfile.TemporaryDirectory() as a, tempfile.TemporaryDirectory() as b:
            full = build(self.image, self.report, Path(a), 'estimated')
            partial = build(self.image, self.report, Path(b), 'estimated', [])
            self.assertEqual(partial['files'], ['structure-base.png'])
            self.assertEqual(
                (Path(a) / full['files'][0]).read_bytes(),
                (Path(b) / partial['files'][0]).read_bytes(),
            )


if __name__ == '__main__':
    unittest.main()
