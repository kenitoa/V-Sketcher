"""Bounded, local still-image preparation. Files are private host-owned snapshots."""
from pathlib import Path
import io,json,math,struct,sys,warnings
from PIL import Image,ImageOps,ImageCms

MAX_BYTES=64*1024*1024
MAX_PIXELS=4096*4096
VERSION='1.0.0'

def fail(code):raise ValueError(code)

def decode(data,suffix):
    if not data:fail('E_INPUT_EMPTY')
    if len(data)>MAX_BYTES:fail('E_INPUT_BYTES')
    png=data.startswith(b'\x89PNG\r\n\x1a\n');jpeg=data.startswith(b'\xff\xd8\xff')
    if suffix.lower() not in ['.png','.jpg','.jpeg']:fail('E_INPUT_EXTENSION')
    if not png and not jpeg:fail('E_INPUT_SIGNATURE')
    if png != (suffix.lower()=='.png'):fail('E_INPUT_EXTENSION_MISMATCH')
    if png and len(data)>=26 and (data[24]!=8 or data[25] not in [2,6]):fail('E_INPUT_COLOR')
    if png:
        pos=8
        while pos+12<=len(data):
            size=struct.unpack('>I',data[pos:pos+4])[0];kind=data[pos+4:pos+8]
            if kind==b'acTL':fail('E_INPUT_ANIMATED')
            pos+=size+12
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error',Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(data)) as check:
                w,h=check.size
                if min(w,h)<256:fail('E_INPUT_SMALL')
                if max(w,h)>4096 or w*h>MAX_PIXELS:fail('E_INPUT_DIMENSIONS')
                if w*h*20>384*1024*1024:fail('E_INPUT_MEMORY')
                if getattr(check,'n_frames',1)!=1:fail('E_INPUT_ANIMATED')
                if check.mode not in ['RGB','RGBA']:fail('E_INPUT_COLOR')
                check.verify()
            image=Image.open(io.BytesIO(data));image.load()
        orientation=image.getexif().get(274,1)
        if orientation not in range(1,9):fail('E_INPUT_ORIENTATION')
        icc=image.info.get('icc_profile');image=ImageOps.exif_transpose(image)
        if icc:
            try:
                alpha=image.getchannel('A') if image.mode=='RGBA' else None
                image=ImageCms.profileToProfile(image.convert('RGB'),ImageCms.ImageCmsProfile(io.BytesIO(icc)),ImageCms.createProfile('sRGB'),outputMode='RGB')
                if alpha is not None:image.putalpha(alpha)
            except Exception:fail('E_INPUT_ICC')
        image=image.convert('RGBA')
        if image.getchannel('A').getbbox() is None:fail('E_INPUT_TRANSPARENT')
        transforms={1:[1,0,0,1,0,0],2:[-1,0,0,1,w,0],3:[-1,0,0,-1,w,h],4:[1,0,0,-1,0,h],5:[0,1,1,0,0,0],6:[0,1,-1,0,h,0],7:[0,-1,-1,0,h,w],8:[0,-1,1,0,0,w]}
        scale=min(1,2048/max(image.size));nw,nh=[max(1,round(v*scale)) for v in image.size]
        sx=nw/image.width;sy=nh/image.height
        matrix=transforms[orientation];matrix=[matrix[0]*sx,matrix[1]*sy,matrix[2]*sx,matrix[3]*sy,matrix[4]*sx,matrix[5]*sy]
        if scale<1:image=image.resize((nw,nh),Image.Resampling.LANCZOS)
        return image,{'originalSize':{'width':w,'height':h},'orientation':orientation,'iccConverted':bool(icc),'sourceToNormalized':matrix,'reduced':scale<1,'estimatedWorkingBytes':w*h*20,'format':'png' if png else 'jpeg'}
    except ValueError:raise
    except (Image.DecompressionBombError,Image.DecompressionBombWarning):fail('E_INPUT_DIMENSIONS')
    except Exception:fail('E_INPUT_CORRUPT')

def detection_rgb(image):
    rgb=Image.new('RGB',image.size,(127,127,127));rgb.paste(image.convert('RGB'),mask=image.getchannel('A'));return rgb

def _faces(image,model):
    import mediapipe as mp
    import numpy as np
    options=mp.tasks.vision.FaceLandmarkerOptions(base_options=mp.tasks.BaseOptions(model_asset_buffer=Path(model).read_bytes()),num_faces=8,min_face_detection_confidence=.35,min_face_presence_confidence=.35)
    with mp.tasks.vision.FaceLandmarker.create_from_options(options) as detector:
        result=detector.detect(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.asarray(detection_rgb(image))))
    out=[]
    for landmarks in result.face_landmarks:
        xs=[p.x*image.width for p in landmarks];ys=[p.y*image.height for p in landmarks]
        x=max(0,min(xs));y=max(0,min(ys));r=min(image.width,max(xs));b=min(image.height,max(ys))
        if r>x and b>y:out.append({'x':x,'y':y,'width':r-x,'height':b-y})
    return sorted(out,key=lambda r:r['x'])

def faces(image,model):
    try:return _faces(image,model)
    except Exception:fail('E_INPUT_DETECTOR')

def candidates(image,detected):
    # Foreground components propose whole subjects, faces provide alternatives on RGB backgrounds.
    import cv2
    import numpy as np
    alpha=np.asarray(image.getchannel('A'))
    count,_,stats,_=cv2.connectedComponentsWithStats((alpha>16).astype('uint8'),8)
    regions=[{'x':int(x),'y':int(y),'width':int(w),'height':int(h)} for x,y,w,h,area in stats[1:] if area>image.width*image.height*.015 and h>image.height*.2]
    if 1<=len(regions)<=8 and np.any(alpha<16):return [{'rect':r,'method':'alpha'} for r in sorted(regions,key=lambda r:r['x'])]
    if detected:
        output=[]
        for i,face in enumerate(detected):
            cx=face['x']+face['width']/2
            left=0 if i==0 else (detected[i-1]['x']+detected[i-1]['width']/2+cx)/2
            right=image.width if i==len(detected)-1 else (cx+detected[i+1]['x']+detected[i+1]['width']/2)/2
            output.append({'rect':{'x':math.floor(left),'y':0,'width':math.ceil(right)-math.floor(left),'height':image.height},'method':'face'})
        return output
    return [{'rect':{'x':0,'y':0,'width':image.width,'height':image.height},'method':'manual-required'}]

def region(value,w,h):
    if not isinstance(value,dict) or set(value)!={'x','y','width','height'} or any(type(v) not in [int,float] or not math.isfinite(v) for v in value.values()):fail('E_INPUT_REGION')
    x,y,rw,rh=[value[k] for k in ['x','y','width','height']]
    if x<0 or y<0 or rw<1 or rh<1 or x+rw>w or y+rh>h:fail('E_INPUT_REGION')
    return [math.floor(x),math.floor(y),math.ceil(x+rw),math.ceil(y+rh)]

def select(image,selection,model):
    import numpy as np
    import cv2
    crop=region(selection['rect'],*image.size);pixels=np.array(image)
    tolerance=selection['backgroundTolerance']
    if tolerance is not None:
        if type(tolerance) is not int or not 0<=tolerance<=80:fail('E_INPUT_MASK')
        rgb=pixels[:,:,:3].astype('int16');background=pixels[0,0,:3].astype('int16')
        similar=(np.max(np.abs(rgb-background),axis=2)<=tolerance).astype('uint8')
        _,labels=cv2.connectedComponents(similar,8);edges=set(np.concatenate([labels[0],labels[-1],labels[:,0],labels[:,-1]]).tolist())-{0}
        pixels[:,:,3][np.isin(labels,list(edges))]=0
    masks=selection['masks']
    if not isinstance(masks,list) or len(masks)>64:fail('E_INPUT_MASK')
    original=np.asarray(image.getchannel('A'))
    for mask in masks:
        box=region(mask['rect'],*image.size);x,y,r,b=box
        if mask['mode']=='erase':pixels[y:b,x:r,3]=0
        elif mask['mode']=='restore':pixels[y:b,x:r,3]=original[y:b,x:r]
        else:fail('E_INPUT_MASK')
    edited=Image.fromarray(pixels).crop(crop)
    if edited.getchannel('A').getbbox() is None:fail('E_INPUT_MASK_EMPTY')
    analysis=edited.copy();analysis.thumbnail((1024,1024),Image.Resampling.LANCZOS)
    warnings=[]
    try:detected=faces(analysis,model)
    except ValueError:
        detected=[];warnings.append('DETECTOR_UNAVAILABLE')
    if not detected:warnings.append('FACE_UNCONFIRMED')
    if len(detected)>1:fail('E_INPUT_MULTIPLE_SELECTED')
    if detected and min(detected[0]['width'],detected[0]['height'])<80:warnings.append('SMALL_FACE')
    alpha=np.asarray(edited.getchannel('A'))
    if np.any(alpha[0]>16) or np.any(alpha[-1]>16) or np.any(alpha[:,0]>16) or np.any(alpha[:,-1]>16):warnings.append('EDGE_CROPPED_POSSIBLE')
    if selection['occluded']:warnings.append('OCCLUDED_USER_REPORTED')
    return edited,analysis,{'faces':detected,'warnings':warnings,'crop':{'x':crop[0],'y':crop[1],'width':crop[2]-crop[0],'height':crop[3]-crop[1]},'analysisSize':{'width':analysis.width,'height':analysis.height}}

def execute(request):
    if request['operation']=='split-probe':
        from split_image import probe_batch
        return probe_batch(request)
    root=Path(sys._MEIPASS) if getattr(sys,'frozen',False) else Path(__file__).resolve().parent.parent/'.local'
    model=root/'models/face_landmarker.task';target=Path(request['output'])
    if request['operation'] in ['structure-analyze','structure-build']:
        from structure import analyze,build
        image=Image.open(request['source']).convert('RGBA')
        if max(image.size)>4096 or image.width*image.height>MAX_PIXELS:fail('E_INPUT_DIMENSIONS')
        settings=request['selection']
        if request['operation']=='structure-analyze':return analyze(image,model,settings['occluded'])
        return build(image,settings['report'],target,settings['completion'],settings.get('keys'))
    if request['operation']=='probe':
        data=Path(request['source']).read_bytes();image,report=decode(data,request['suffix']);image.save(target/'normalized.png')
        small=image.copy();small.thumbnail((1024,1024),Image.Resampling.LANCZOS);available=True
        try:detected=faces(small,model)
        except ValueError:detected=[];available=False
        # Candidate face coordinates are mapped back to the editable image.
        detected=[{k:v*(image.width/small.width if k in ['x','width'] else image.height/small.height) for k,v in r.items()} for r in detected]
        return {**report,'detectorAvailable':available,'size':{'width':image.width,'height':image.height},'hasAlpha':image.getchannel('A').getextrema()[0]<255,'candidates':candidates(image,detected),'faceCount':len(detected)}
    image=Image.open(request['source']).convert('RGBA');edited,analysis,report=select(image,request['selection'],model);edited.save(target/'selected.png');analysis.save(target/'analysis.png');return report

def cli():
    try:
        line=sys.stdin.buffer.readline(32769)
        if len(line)>32768:fail('E_INPUT_REQUEST')
        result={'ok':True,'report':execute(json.loads(line))}
    except Exception as error:
        code=str(error) if isinstance(error,ValueError) and str(error).startswith('E_INPUT_') else 'E_INPUT_PROCESSING'
        result={'ok':False,'code':code}
    print(json.dumps(result,separators=(',',':')))
