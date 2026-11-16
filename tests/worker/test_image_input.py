from pathlib import Path
import importlib.util,io,unittest
from unittest.mock import patch
from PIL import Image,ImageCms
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('image_input',ROOT/'worker/image_input.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
def encoded(image,kind='PNG',**options):
    stream=io.BytesIO();image.save(stream,format=kind,**options);return stream.getvalue()
class ImageInputTests(unittest.TestCase):
    def test_supported_transparency_and_unchanged_original(self):
        source=Image.new('RGBA',(512,512),(30,40,50,0));source.paste((200,100,50,255),(100,100,400,450));data=encoded(source);before=bytes(data);image,report=module.decode(data,'.png');self.assertEqual(data,before);self.assertEqual(image.getpixel((0,0))[3],0);self.assertEqual(report['orientation'],1)
    def test_signature_extension_empty_corrupt_and_unsupported(self):
        rgb=Image.new('RGB',(256,256),'red');png=encoded(rgb)
        for data,suffix,code in [(b'', '.png','EMPTY'),(b'not image','.png','SIGNATURE'),(png,'.jpg','EXTENSION_MISMATCH'),(png,'.webp','EXTENSION'),(png[:-25],'.png','CORRUPT'),(encoded(rgb,'JPEG')[:-40],'.jpg','CORRUPT'),(encoded(Image.new('I;16',(256,256))),'.png','COLOR'),(encoded(Image.new('CMYK',(256,256)),'JPEG'),'.jpg','COLOR'),(encoded(Image.new('P',(256,256))),'.png','COLOR'),(encoded(Image.new('RGBA',(256,256))),'.png','TRANSPARENT')]:
            with self.subTest(code=code),self.assertRaisesRegex(ValueError,'E_INPUT_'+code):module.decode(data,suffix)
    def test_limits_before_decode_and_large_edit_copy(self):
        with self.assertRaisesRegex(ValueError,'E_INPUT_SMALL'):module.decode(encoded(Image.new('RGB',(255,256))),'.png')
        with self.assertRaisesRegex(ValueError,'E_INPUT_DIMENSIONS'):module.decode(encoded(Image.new('RGB',(4097,256))),'.png')
        image,report=module.decode(encoded(Image.new('RGB',(4096,4096),'navy')),'.png');self.assertEqual(image.size,(2048,2048));self.assertTrue(report['reduced']);self.assertLessEqual(report['estimatedWorkingBytes'],384*1024*1024)
    def test_all_exif_orientations_and_icc(self):
        for orientation in range(1,9):
            source=Image.new('RGB',(400,300),'white');source.paste('red',(0,0,100,100));exif=source.getexif();exif[274]=orientation
            image,report=module.decode(encoded(source,'JPEG',exif=exif),'.jpeg');self.assertEqual(image.size,(300,400) if orientation>=5 else (400,300));self.assertEqual(report['orientation'],orientation);self.assertEqual(len(report['sourceToNormalized']),6);a,b,c,d,tx,ty=report['sourceToNormalized'];pixel=image.getpixel((round(a*50+c*50+tx),round(b*50+d*50+ty)));self.assertGreater(pixel[0],180);self.assertLess(pixel[1],80)
        profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes();_,report=module.decode(encoded(Image.new('RGB',(256,256)),icc_profile=profile),'.png');self.assertTrue(report['iccConverted'])
        with self.assertRaisesRegex(ValueError,'E_INPUT_ICC'):module.decode(encoded(Image.new('RGB',(256,256)),icc_profile=b'bad'),'.png')
    def test_animated_png_rejected(self):
        data=encoded(Image.new('RGB',(256,256),'red'),save_all=True,append_images=[Image.new('RGB',(256,256),'blue')],duration=100)
        with self.assertRaisesRegex(ValueError,'E_INPUT_ANIMATED'):module.decode(data,'.png')
    def test_multiple_alpha_candidates_and_crop_mask_coordinates(self):
        source=Image.new('RGBA',(600,400));source.paste((200,30,40,255),(20,20,200,390));source.paste((40,20,200,255),(350,20,570,390));self.assertEqual(len(module.candidates(source,[])),2)
        selection={'rect':{'x':10,'y':10,'width':200,'height':380},'masks':[{'mode':'erase','rect':{'x':20,'y':20,'width':30,'height':30}},{'mode':'restore','rect':{'x':30,'y':30,'width':10,'height':10}}],'backgroundTolerance':None,'occluded':True}
        with patch.object(module,'faces',return_value=[]):edited,analysis,report=module.select(source,selection,None)
        self.assertEqual(edited.size,(200,380));self.assertEqual(edited.getpixel((15,15))[3],0);self.assertEqual(edited.getpixel((25,25))[3],255);self.assertIn('OCCLUDED_USER_REPORTED',report['warnings']);self.assertEqual(analysis.size,edited.size)
        visible=module.detection_rgb(edited);self.assertEqual(visible.getpixel((15,15)),(127,127,127));self.assertNotEqual(visible.getpixel((25,25)),(127,127,127))
    def test_background_connected_edges_preserve_enclosed_color(self):
        image=Image.new('RGBA',(300,300),'white');image.paste('black',(50,50,250,250));image.paste('white',(100,100,200,200));selection={'rect':{'x':0,'y':0,'width':300,'height':300},'masks':[],'backgroundTolerance':0,'occluded':False}
        with patch.object(module,'faces',return_value=[]):edited,_,_=module.select(image,selection,None)
        self.assertEqual(edited.getpixel((0,0))[3],0);self.assertEqual(edited.getpixel((150,150))[3],255)
    def test_regions_and_multi_face_rejected_and_small_face_warned(self):
        selection={'rect':{'x':0,'y':0,'width':300,'height':300},'masks':[],'backgroundTolerance':None,'occluded':False};image=Image.new('RGBA',(300,300),'black');face={'x':50,'y':50,'width':30,'height':40}
        with patch.object(module,'faces',return_value=[face,face]),self.assertRaisesRegex(ValueError,'E_INPUT_MULTIPLE_SELECTED'):module.select(image,selection,None)
        with patch.object(module,'faces',return_value=[face]):self.assertIn('SMALL_FACE',module.select(image,selection,None)[2]['warnings'])
        with patch.object(module,'faces',side_effect=ValueError('E_INPUT_DETECTOR')):self.assertIn('DETECTOR_UNAVAILABLE',module.select(image,selection,None)[2]['warnings'])
        selection['rect']['x']=1
        with self.assertRaisesRegex(ValueError,'E_INPUT_REGION'):module.select(image,selection,None)
