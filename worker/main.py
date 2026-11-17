"""Versioned local worker. Foundation health checks never open a camera or microphone."""
from pathlib import Path
import hashlib,json,sys

PROTOCOL=1
VERSION='0.1.0'
MAX_BYTES=64*1024
MODEL_SHA='64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff'
OPERATIONS={'ping','validate-runtime','shutdown'}

def validate(value):
    import re
    required={'protocol','requestId','projectId','revision','generation','operation'}
    if not isinstance(value,dict) or set(value)!=required:raise ValueError('E_PROTOCOL_REQUEST')
    if type(value['protocol']) is not int or value['protocol']!=PROTOCOL:raise ValueError('E_PROTOCOL_VERSION')
    if any(not isinstance(value[k],str) or not re.fullmatch(r'[A-Za-z0-9-]{1,64}',value[k]) for k in ['requestId','projectId']):raise ValueError('E_PROTOCOL_IDENTITY')
    if any(type(value[k]) is not int or value[k]<0 for k in ['revision','generation']):raise ValueError('E_PROTOCOL_REVISION')
    if value['operation'] not in OPERATIONS:raise ValueError('E_PROTOCOL_OPERATION')
    return value

def runtime_health():
    import numpy as np
    import cv2
    import mediapipe as mp
    import sounddevice as sd
    import PIL
    frozen=bool(getattr(sys,'frozen',False))
    root=Path(sys._MEIPASS) if frozen else Path(__file__).resolve().parent.parent/'.local'
    model=root/'models/face_landmarker.task'
    data=model.read_bytes()
    if hashlib.sha256(data).hexdigest()!=MODEL_SHA:raise ValueError('E_MODEL_HASH')
    options=mp.tasks.vision.FaceLandmarkerOptions(base_options=mp.tasks.BaseOptions(model_asset_buffer=data),num_faces=1)
    detector=mp.tasks.vision.FaceLandmarker.create_from_options(options);detector.close()
    modules=[np,cv2,mp,sd,PIL]
    inside=all(Path(m.__file__).resolve().is_relative_to(root.resolve()) for m in modules) if frozen else False
    return {'workerVersion':VERSION,'python':sys.version.split()[0],'frozen':frozen,
            'dependencyFilesInsideBundle':inside,'modelSha256':MODEL_SHA,'modelLoaded':True,
            'cameraOpened':False,'microphoneOpened':False,
            'dependencies':{'numpy':np.__version__,'opencv':cv2.__version__,'mediapipe':mp.__version__,'sounddevice':sd.__version__,'pillow':PIL.__version__}}

def serve(source,sink):
    while True:
        line=source.readline(MAX_BYTES+2)
        if not line:return
        request={'requestId':'rejected','projectId':'none','revision':0,'generation':0}
        shutdown=False
        try:
            if len(line)>MAX_BYTES:raise ValueError('E_PROTOCOL_SIZE')
            request=validate(json.loads(line.decode('utf-8')))
            if request['operation']=='validate-runtime':result=runtime_health()
            else:result={'workerVersion':VERSION,'protocol':PROTOCOL,'frozen':bool(getattr(sys,'frozen',False))}
            shutdown=request['operation']=='shutdown'
            reply={'protocol':PROTOCOL,**{k:request[k] for k in ['requestId','projectId','revision','generation']},'ok':True,'result':result}
        except Exception as error:
            code=str(error) if isinstance(error,ValueError) and str(error).startswith('E_') else 'E_WORKER_OPERATION'
            reply={'protocol':PROTOCOL,**{k:request.get(k,default) for k,default in [('requestId','rejected'),('projectId','none'),('revision',0),('generation',0)]},'ok':False,'error':{'code':code}}
        sink.write((json.dumps(reply,separators=(',',':'))+'\n').encode());sink.flush()
        if shutdown or len(line)>MAX_BYTES:return

if __name__=='__main__':
    if '--tracking' in sys.argv:
        if getattr(sys,'frozen',False):
            from tracking import cli
        else:
            import importlib.util
            spec=importlib.util.spec_from_file_location('tracking',Path(__file__).with_name('tracking.py'))
            module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);cli=module.cli
        cli()
    elif '--image-input' in sys.argv:
        if getattr(sys,'frozen',False):
            from image_input import cli
        else:
            import importlib.util
            split_spec=importlib.util.spec_from_file_location('split_image',Path(__file__).with_name('split_image.py'))
            split_module=importlib.util.module_from_spec(split_spec);sys.modules['split_image']=split_module;split_spec.loader.exec_module(split_module)
            structure_spec=importlib.util.spec_from_file_location('structure',Path(__file__).with_name('structure.py'))
            structure_module=importlib.util.module_from_spec(structure_spec);sys.modules['structure']=structure_module;structure_spec.loader.exec_module(structure_module)
            spec=importlib.util.spec_from_file_location('image_input',Path(__file__).with_name('image_input.py'))
            module=importlib.util.module_from_spec(spec);sys.modules['image_input']=module;spec.loader.exec_module(module);cli=module.cli
        cli()
    else:serve(sys.stdin.buffer,sys.stdout.buffer)
