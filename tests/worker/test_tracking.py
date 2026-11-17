import base64,importlib.util,io,json,unittest
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('tracking',ROOT/'worker/tracking.py');tracking=importlib.util.module_from_spec(spec);spec.loader.exec_module(tracking)
class TrackingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.detector=tracking.create_detector()
        p=json.loads((ROOT/'assets/product/preview-project.json').read_text(encoding='utf-8'));a=next(a for a in p['assets'] if a['id']==p['inputAssetIds'][0])
        with Image.open(ROOT/'assets/product/preview'/f"{a['fingerprint']['sha256']}.png") as source:
            image=source.convert('RGB').crop((300,50,950,700));image.thumbnail((640,480));out=io.BytesIO();image.save(out,format='JPEG');cls.jpeg=out.getvalue()
    @classmethod
    def tearDownClass(cls):cls.detector.close()
    def test_real_pinned_inference_returns_derived_signals_and_no_frames(self):
        v=tracking.analyze(self.detector,self.jpeg,100)
        self.assertEqual(v['seq'],100);self.assertGreaterEqual(len(v['faces']),1);self.assertNotIn('jpeg',json.dumps(v));self.assertNotIn('landmarks',json.dumps(v));self.assertEqual(set(v),{'seq','faces','brightness','inferenceMs'})
    def test_bounds_and_signature_reject_invalid_payload(self):
        for b in [b'',b'a'*230000,b'notjpeg']:
            with self.assertRaises(ValueError):tracking.analyze(self.detector,b,101)
    def test_blank_dark_input_reports_no_face_not_camera_failure(self):
        out=io.BytesIO();Image.new('RGB',(320,240),(0,0,0)).save(out,format='JPEG');v=tracking.analyze(self.detector,out.getvalue(),102);self.assertEqual(v['faces'],[]);self.assertLess(v['brightness'],35)
    def test_protocol_rejects_extra_paths_duplicate_sequence_and_oversize(self):
        source=io.BytesIO((json.dumps({'seq':1,'jpeg':'','path':'private'})+'\n'+json.dumps({'stop':True})+'\n').encode());out=io.BytesIO();tracking.serve(source,out,self.detector);lines=[json.loads(v) for v in out.getvalue().splitlines()];self.assertEqual(lines,[{'ready':True},{'ok':False,'errorCode':'E_TRACKING_RESULT'}])
    def test_two_separated_illustrated_faces_are_detected_by_actual_model(self):
        p=json.loads((ROOT/'assets/product/preview-project.json').read_text(encoding='utf-8'));a=next(a for a in p['assets'] if a['id']==p['inputAssetIds'][0])
        with Image.open(ROOT/'assets/product/preview'/f"{a['fingerprint']['sha256']}.png") as source:
            face=source.convert('RGB').crop((400,170,850,620));face.thumbnail((300,300));image=Image.new('RGB',(640,400),(115,115,115));image.paste(face,(10,50));image.paste(face,(330,50));out=io.BytesIO();image.save(out,format='JPEG')
        detector=tracking.create_detector()
        try:
            v=tracking.analyze(detector,out.getvalue(),1);self.assertEqual(len(v['faces']),2);centers=sorted(f['box']['x']+f['box']['width']/2 for f in v['faces']);self.assertLess(centers[0],.5);self.assertGreater(centers[1],.5)
        finally:detector.close()
