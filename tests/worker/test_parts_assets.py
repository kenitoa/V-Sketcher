from pathlib import Path
import hashlib,json,unittest
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
class PartsAssetsTests(unittest.TestCase):
    def setUp(self):self.c=json.loads((ROOT/'assets/product/parts/catalog.json').read_text(encoding='utf-8'))
    def test_selected_pngs_hash_alpha_and_decoded_budget(self):
        pixels=0
        for digest,name in self.c['files'].items():
            file=ROOT/'assets/product'/name;self.assertEqual(hashlib.sha256(file.read_bytes()).hexdigest(),digest)
            with Image.open(file) as im:
                im.load();self.assertEqual(im.mode,'RGBA');self.assertLessEqual(max(im.size),2048);alpha=im.getchannel('A');self.assertEqual(alpha.getextrema()[0],0);self.assertGreaterEqual(alpha.getextrema()[1],250);self.assertLessEqual(alpha.getpixel((0,0)),2);pixels+=im.width*im.height
        self.assertEqual(len(self.c['files']),13);self.assertLess(pixels*4,128*1024*1024)
    def test_all_registered_states_have_visible_alpha_and_valid_regions(self):
        for a in self.c['assets']:
            with Image.open(ROOT/'assets/product'/self.c['files'][a['fingerprint']['sha256']]) as im:
                r=a['sourceRegion'];self.assertLessEqual(r['x']+r['width'],im.width);self.assertLessEqual(r['y']+r['height'],im.height);crop=im.crop((r['x'],r['y'],r['x']+r['width'],r['y']+r['height']));self.assertIsNotNone(crop.getchannel('A').point(lambda v:255 if v>128 else 0).getbbox())
        self.assertEqual(len(self.c['assets']),27)
    def test_variants_are_distinct_art_not_renamed_or_recolored_duplicates(self):
        for slot in ['face','hair','eyes','mouth','outfit']:
            variants=[v for v in self.c['items'] if v['slot']==slot];files=[]
            for v in variants:
                asset=next(a for a in self.c['assets'] if a['id']==v['templates'][0]['textures'][0]['assetId']);files.append(ROOT/'assets/product'/self.c['files'][asset['fingerprint']['sha256']])
            self.assertNotEqual(files[0].read_bytes(),files[1].read_bytes());a=np.asarray(Image.open(files[0]).getchannel('A'))>128;b=np.asarray(Image.open(files[1]).getchannel('A'))>128;self.assertEqual(a.shape,b.shape);self.assertGreater(np.count_nonzero(a!=b),100)
