"""Local landmark proposals and explicitly estimated expression patches, v1.

No fixture names, annotations, separated source art, network or camera inputs.
Neutral reconstruction uses original pixels; unseen surfaces are never claimed restored.
"""
import math
import numpy as np
import cv2
from PIL import Image

VERSION='1.0.0'
FEATURES={'eye_right':[33,160,158,133,153,144], 'eye_left':[362,385,387,263,373,380], 'mouth':[61,40,37,0,267,270,291,321,314,17,84,91]}

def box(points,pad,w,h):
    lo=points.min(axis=0)-pad;hi=points.max(axis=0)+pad
    x=max(0,math.floor(lo[0]));y=max(0,math.floor(lo[1]));r=min(w,math.ceil(hi[0]));b=min(h,math.ceil(hi[1]))
    return {'x':x,'y':y,'width':max(1,r-x),'height':max(1,b-y)}

def analyze(image,model,occluded=False):
    import mediapipe as mp
    from image_input import detection_rgb
    small=image.copy();small.thumbnail((1024,1024),Image.Resampling.LANCZOS)
    options=mp.tasks.vision.FaceLandmarkerOptions(base_options=mp.tasks.BaseOptions(model_asset_buffer=model.read_bytes()),num_faces=8,min_face_detection_confidence=.25,min_face_presence_confidence=.25)
    with mp.tasks.vision.FaceLandmarker.create_from_options(options) as detector:
        faces=detector.detect(mp.Image(image_format=mp.ImageFormat.SRGB,data=np.asarray(detection_rgb(small)))).face_landmarks
    report={'version':VERSION,'method':'mediapipe-landmarks-pixel-evidence','status':'failed','face':None,'regions':[],'unconfirmed':['hair-front','hair-back','eyebrows','body-separation'],'warnings':[],'headGain':0.35,'maxRollDegrees':2.1,'completion':'estimated','files':[]}
    if len(faces)!=1:
        report['warnings']=['MULTIPLE_FACES' if faces else 'FACE_NOT_FOUND'];return report
    points=np.array([(p.x*image.width,p.y*image.height) for p in faces[0]],np.float32)
    face=box(points,np.array([0,0]),*image.size);report['face']=face
    if face['width']*small.width/image.width<80:report['warnings'].append('SMALL_FACE')
    if occluded:report['warnings'].append('OCCLUSION_REPORTED')
    yaw=abs((points[1,0]-(points[33,0]+points[263,0])/2)/max(1,abs(points[263,0]-points[33,0])))
    if yaw>.24:report['warnings'].append('POSE_UNSUPPORTED')
    pixels=np.asarray(image)
    for key,indices in FEATURES.items():
        q=points[indices];pad=np.array([face['width']*.035,face['height']*(.035 if key.startswith('eye') else .025)])
        rect=box(q,pad,*image.size);x,y,rw,rh=[rect[k] for k in ['x','y','width','height']]
        patch=pixels[y:y+rh,x:x+rw];gray=cv2.cvtColor(patch[:,:,:3],cv2.COLOR_RGB2GRAY)
        valid=patch[:,:,3]>200;values=gray[valid];contrast=float(np.percentile(values,95)-np.percentile(values,5)) if len(values) else 0
        observed=bool(valid.mean()>.95 and contrast>(38 if key.startswith('eye') else 18) and not occluded and not report['warnings'] and rw>=8 and rh>=5)
        # Closed / heavily covered eyes do not contain reliable open-eye texture.
        if key.startswith('eye'):
            aperture=float((q[:,1].max()-q[:,1].min())/max(1,q[:,0].max()-q[:,0].min()))
            observed=observed and aperture>.10
        report['regions'].append({'key':key,'rect':rect,'observed':observed,'reason':'LANDMARK_AND_PIXEL_EVIDENCE' if observed else 'CONFIRM_VISIBLE_FEATURE','estimatedStates':['closed'] if key.startswith('eye') else ['open']})
        if not observed:report['unconfirmed'].append(key)
    report['status']='ready' if all(r['observed'] for r in report['regions']) else 'partial'
    # Always restrict head motion: no hidden hair, side face or back surface recovered.
    report['warnings'].append('PLANAR_HEAD_ONLY')
    report['headGain']=.35 if report['status']=='partial' else .65
    report['maxRollDegrees']=6*report['headGain']
    return report

def build(image,report,target,completion):
    if completion not in ['estimated','restrict']:raise ValueError('E_INPUT_STRUCTURE_OPTIONS')
    if report.get('version')!=VERSION or report.get('status') not in ['ready','partial']:raise ValueError('E_INPUT_STRUCTURE_FACE')
    source=np.array(image);base=source.copy();hole=np.zeros(source.shape[:2],np.uint8);patches=[];files=[]
    for item in report['regions']:
        if not item['observed'] or completion=='restrict':continue
        key=item['key'];r=item['rect'];x,y,w,h=[r[k] for k in ['x','y','width','height']]
        if min(x,y)<0 or min(w,h)<1 or x+w>image.width or y+h>image.height:raise ValueError('E_INPUT_REGION')
        patch=source[y:y+h,x:x+w].copy();cv2.ellipse(hole,(x+w//2,y+h//2),(max(1,round(w*.46)),max(1,round(h*.43))),0,0,360,255,-1);patches.append((key,r,patch))
    if hole.any():
        filled=cv2.inpaint(source[:,:,:3],hole,3,cv2.INPAINT_TELEA);base[hole>0,:3]=filled[hole>0]
        # The patch owns its original alpha; avoid double alpha at semi-transparent skin pixels.
        for _,r,_ in patches:base[r['y']:r['y']+r['height'],r['x']:r['x']+r['width'],3]=0
    Image.fromarray(base).save(target/'structure-base.png');files.append('structure-base.png')
    for key,r,patch in patches:
        x,y,w,h=[r[k] for k in ['x','y','width','height']];plate=base[y:y+h,x:x+w].copy();plate[:,:,3]=patch[:,:,3]
        if key.startswith('eye'):
            # Local cheek texture supplies an estimated lid surface, retaining the source lash palette.
            # This is a bounded estimate, not recovered original eyelid art.
            closed=patch.copy();lower=np.median(patch[max(0,h-4):h,:,:3],axis=0).astype(np.float32)
            lower=cv2.GaussianBlur(lower[None,:,:],(0,0),max(1,w*.035))[0]
            skin=np.repeat(lower[None,:,:],h,axis=0);yy,xx=np.mgrid[:h,:w]
            mask=np.clip((1-((xx-w/2)/max(1,w*.49))**2-((yy-h/2)/max(1,h*.49))**2)*6,0,1)
            closed[:,:,:3]=np.rint(skin*mask[:,:,None]+patch[:,:,:3]*(1-mask[:,:,None])).clip(0,255).astype(np.uint8)
            inner=patch[max(0,h//5):max(1,4*h//5),w//8:max(w//8+1,7*w//8),:3];gray=cv2.cvtColor(inner,cv2.COLOR_RGB2GRAY);palette=inner[gray<=np.percentile(gray,12)];ink=tuple(int(v) for v in np.median(palette,axis=0))
            xs=np.linspace(w*.12,w*.88,32);ys=h*.49+np.sin(np.linspace(0,math.pi,32))*h*.10
            curve=np.rint(np.column_stack([xs,ys])).astype(np.int32);cv2.polylines(closed,[curve],False,(*ink,255),max(1,round(h*.055)),cv2.LINE_AA)
            closed[:,:,3]=patch[:,:,3]
            states={'open':patch,'closed':closed}
        else:
            yy,xx=np.mgrid[:h,:w].astype(np.float32);cy=h/2
            displacement=np.sign(yy-cy)*min(h*.10,w*.035)*np.exp(-((xx-w/2)/max(2,w*.25))**2)*np.exp(-((yy-cy)/max(2,h*.35))**2)
            opened=cv2.remap(patch,xx,yy-displacement,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT)
            central=patch[max(0,h//4):max(1,3*h//4),w//4:max(w//4+1,3*w//4),:3];gray=cv2.cvtColor(central,cv2.COLOR_RGB2GRAY)
            color=tuple(int(v*.45) for v in central.reshape(-1,3)[gray.argmin()])
            cv2.ellipse(opened,(w//2,h//2),(max(1,round(w*.20)),max(1,round(min(h*.10,w*.045)))),0,0,360,(*color,255),-1,cv2.LINE_AA)
            opened[:,:,3]=patch[:,:,3];states={'closed':patch,'open':opened}
        for state,pixels in states.items():
            name=f'structure-{key}-{state}.png';Image.fromarray(pixels).save(target/name);files.append(name)
    return {**report,'completion':completion,'files':files,'regions':[{**r,'enabled':r['observed'] and completion=='estimated'} for r in report['regions']]}
