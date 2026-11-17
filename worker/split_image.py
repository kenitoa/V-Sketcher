"""Bounded PNG layer decoding; no face detector, rescaling, or guessed artwork."""
from pathlib import Path
import io,struct,warnings
from PIL import Image,ImageCms

def fail(code):raise ValueError('E_INPUT_SPLIT_'+code)

def decode_layer(data):
    if len(data)<33 or len(data)>64*1024*1024 or data[:8]!=b'\x89PNG\r\n\x1a\n':fail('PNG')
    if data[24]!=8 or data[25] not in (2,6):fail('COLOR')
    pos=8
    while pos+12<=len(data):
        n=struct.unpack('>I',data[pos:pos+4])[0]
        if data[pos+4:pos+8]==b'acTL':fail('ANIMATED')
        if n>len(data)-pos-12:fail('PNG')
        pos+=n+12
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error',Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(data)) as check:
                w,h=check.size
                if min(w,h)<1 or max(w,h)>4096 or w*h>16777216:fail('DIMENSIONS')
                if check.mode not in ('RGB','RGBA') or getattr(check,'n_frames',1)!=1:fail('COLOR')
                check.verify()
            image=Image.open(io.BytesIO(data));image.load()
        if image.getexif().get(274,1)!=1:fail('ORIENTATION')
        icc=image.info.get('icc_profile')
        if icc:
            try:
                alpha=image.getchannel('A') if image.mode=='RGBA' else None
                image=ImageCms.profileToProfile(image.convert('RGB'),ImageCms.ImageCmsProfile(io.BytesIO(icc)),ImageCms.createProfile('sRGB'),outputMode='RGB')
                if alpha is not None:image.putalpha(alpha)
            except Exception:fail('ICC')
        image=image.convert('RGBA');bounds=image.getchannel('A').getbbox()
        return image,{'width':w,'height':h,'bounds':None if bounds is None else {'x':bounds[0],'y':bounds[1],'width':bounds[2]-bounds[0],'height':bounds[3]-bounds[1]},'empty':bounds is None,'opaque':image.getchannel('A').getextrema()[0]==255,'iccConverted':bool(icc)}
    except ValueError:raise
    except Exception:fail('PNG')

def probe_batch(request):
    sources=request['sources'];target=Path(request['output'])
    if not isinstance(sources,list) or not 1<=len(sources)<=64:fail('COUNT')
    results=[];keys=set();decoded=0
    for item in sources:
        key=item['key']
        if not isinstance(key,str) or len(key)!=64 or any(c not in '0123456789abcdef' for c in key) or key in keys:fail('KEY')
        keys.add(key);data=Path(item['source']).read_bytes()
        if len(data)<24:fail('PNG')
        w,h=struct.unpack('>II',data[16:24]);decoded+=w*h*4
        if decoded>256*1024*1024:fail('MEMORY')
        image,report=decode_layer(data);image.save(target/(key+'.png'));results.append({'key':key,**report})
    return {'images':results,'decodedBytes':decoded,'configurationVersion':'1.0.0'}
