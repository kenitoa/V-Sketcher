import unittest,sys,io,tempfile,struct,hashlib
from pathlib import Path
from PIL import Image,ImageCms
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'worker'))
from split_image import decode_layer,probe_batch

def png(size=(8,6),color=(20,40,60,180),**kwargs):
    b=io.BytesIO();Image.new('RGBA',size,color).save(b,format='PNG',**kwargs);return b.getvalue()

class SplitImageTests(unittest.TestCase):
    def test_tiny_empty_hidden_crop_and_exact_pixel_preservation(self):
        image,report=decode_layer(png((1,1),(0,0,0,0)));self.assertTrue(report['empty']);self.assertIsNone(report['bounds']);self.assertEqual(image.size,(1,1))
        data=png();image,report=decode_layer(data);self.assertEqual(image.getpixel((3,2)),(20,40,60,180));self.assertEqual(report['bounds'],{'x':0,'y':0,'width':8,'height':6});self.assertFalse(report['opaque'])
    def test_png_only_rejects_palette_grayscale_corruption_animation_and_orientation(self):
        for mode in ('P','L'):
            b=io.BytesIO();Image.new(mode,(4,4)).save(b,format='PNG')
            with self.assertRaises(ValueError):decode_layer(b.getvalue())
        with self.assertRaises(Exception):decode_layer(png()[:-18])
        b=io.BytesIO();Image.new('RGBA',(4,4)).save(b,format='PNG',save_all=True,append_images=[Image.new('RGBA',(4,4),'red')],duration=100,loop=0)
        with self.assertRaisesRegex(ValueError,'ANIMATED'):decode_layer(b.getvalue())
        exif=Image.Exif();exif[274]=6
        with self.assertRaisesRegex(ValueError,'ORIENTATION'):decode_layer(png(exif=exif))
    def test_srgb_conversion_retains_alpha_and_bad_icc_is_explicit(self):
        profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes();image,report=decode_layer(png(icc_profile=profile));self.assertTrue(report['iccConverted']);self.assertEqual(image.getpixel((0,0))[3],180)
        with self.assertRaisesRegex(ValueError,'ICC'):decode_layer(png(icc_profile=b'bad'))
    def test_batch_count_keys_and_decoded_budget_are_bounded_before_decode(self):
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp);source=target/'source.png';data=png();source.write_bytes(data);entry={'key':hashlib.sha256(data).hexdigest(),'source':str(source)}
            for sources in ([],[entry]*65,[entry,entry],[{**entry,'key':'../escape'}]):
                with self.assertRaises(ValueError):probe_batch({'sources':sources,'output':tmp})
            fake=bytearray(data);fake[16:24]=struct.pack('>II',9000,9000);source.write_bytes(fake)
            with self.assertRaisesRegex(ValueError,'MEMORY'):probe_batch({'sources':[entry],'output':tmp})
    def test_real_batch_writes_only_hash_png_with_exact_dimensions_and_alpha(self):
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp);data=png((3,7));source=target/'input.png';source.write_bytes(data);key=hashlib.sha256(data).hexdigest();report=probe_batch({'sources':[{'key':key,'source':str(source)}],'output':tmp});self.assertEqual(report['decodedBytes'],84);self.assertEqual(report['images'][0]['width'],3);self.assertEqual(Image.open(target/(key+'.png')).getpixel((0,0)),(20,40,60,180))
