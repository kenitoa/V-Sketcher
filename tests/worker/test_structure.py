import unittest,sys,json,tempfile
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'worker'))
from structure import analyze,build
ROOT=Path(__file__).resolve().parents[2]

class StructureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        p=json.loads((ROOT/'assets/product/preview-project.json').read_text(encoding='utf-8'));a=next(a for a in p['assets'] if a['id']==p['inputAssetIds'][0]);cls.image=Image.open(ROOT/'assets/product/preview'/(a['fingerprint']['sha256']+'.png')).convert('RGBA');cls.model=ROOT/'.local/models/face_landmarker.task';cls.report=analyze(cls.image,cls.model)
    def test_premium_real_landmarks_without_annotations(self):
        self.assertEqual(self.report['status'],'ready');self.assertEqual(len(self.report['regions']),3)
        self.assertTrue(all(r['observed'] for r in self.report['regions']));self.assertLessEqual(self.report['maxRollDegrees'],3.91)
        self.assertIn('hair-back',self.report['unconfirmed'])
    def test_neutral_pixels_and_alpha_original_reconstructed_exactly(self):
        before=np.array(self.image)
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp);r=build(self.image,self.report,target,'estimated');out=Image.open(target/'structure-base.png').convert('RGBA')
            for item in r['regions']:
                if item['enabled']:
                    state='closed' if item['key']=='mouth' else 'open';patch=Image.open(target/f"structure-{item['key']}-{state}.png");out.alpha_composite(patch,(item['rect']['x'],item['rect']['y']))
            self.assertTrue(np.array_equal(np.array(out),before));self.assertEqual(len(r['files']),7)
            mask=np.zeros(before.shape[:2],bool)
            for item in r['regions']:
                rect=item['rect'];mask[rect['y']:rect['y']+rect['height'],rect['x']:rect['x']+rect['width']]=True
            base=np.array(Image.open(target/'structure-base.png'));self.assertTrue(np.array_equal(base[~mask],before[~mask]));self.assertTrue(np.all(base[mask,3]==0))
    def test_estimated_states_change_only_declared_regions(self):
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp);r=build(self.image,self.report,target,'estimated')
            for item in r['regions']:
                a=np.array(Image.open(target/f"structure-{item['key']}-open.png"));b=np.array(Image.open(target/f"structure-{item['key']}-closed.png"))
                self.assertGreater(np.count_nonzero(a!=b),10);self.assertTrue(np.array_equal(a[:,:,3],b[:,:,3]));self.assertEqual(a.shape[1],item['rect']['width'])
    def test_occlusion_partial_no_guessed_hidden_feature_or_unrestricted_motion(self):
        r=analyze(self.image,self.model,True);self.assertEqual(r['status'],'partial');self.assertFalse(any(v['observed'] for v in r['regions']));self.assertEqual(r['headGain'],.35)
        with tempfile.TemporaryDirectory() as tmp:
            b=build(self.image,r,Path(tmp),'estimated');self.assertEqual(b['files'],['structure-base.png']);self.assertTrue(np.array_equal(np.array(Image.open(Path(tmp)/'structure-base.png')),np.array(self.image)))
    def test_restrict_alternative_has_no_expression_fabrication(self):
        with tempfile.TemporaryDirectory() as tmp:
            r=build(self.image,self.report,Path(tmp),'restrict');self.assertEqual(r['completion'],'restrict');self.assertFalse(any(v['enabled'] for v in r['regions']));self.assertEqual(len(r['files']),1)
    def test_nonface_fails_without_central_face_fallback(self):
        r=analyze(Image.new('RGBA',(512,512),(120,100,90,255)),self.model);self.assertEqual(r['status'],'failed');self.assertEqual(r['warnings'],['FACE_NOT_FOUND'])
    def test_invalid_completion_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaises(ValueError):build(self.image,self.report,Path(tmp),'restore-hidden-real-face')

if __name__=='__main__':unittest.main()
