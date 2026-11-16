"""Local derived-value tracking. Never persists webcam frames or microphone PCM."""
from pathlib import Path
import sys, time, math, json, threading
import numpy as np
import cv2
import sounddevice as sd

BASE = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE.parent / 'phase03'))
import engine

NEUTRAL = dict(engine.PARAMS)

class Controller:
    def __init__(self):
        self.value = dict(NEUTRAL)
        self.baseline = {'yaw': 0., 'roll': 0.}
        self.gain = {'yaw': 1., 'roll': 1.}
        self.sign = {'yaw': 1., 'roll': 1.}
        self.last_face = -1e9
        self.mic_threshold = .015
        self.mic_gain = 12.
        self.mouth_source = 'camera'
        self.mouth_gain = 12.

    def calibrate(self, samples):
        if not samples: raise ValueError('no_face_for_calibration')
        self.baseline = {k: float(np.median([s[k] for s in samples])) for k in ('yaw','roll')}

    def update(self, face, rms, now, dt):
        if face is not None and (any(k not in face for k in ['blink_left','blink_right','jaw','yaw','roll']) or
                                 not all(math.isfinite(v) for v in face.values())):
            face=None
        if rms is not None and not math.isfinite(rms):rms=None
        target = dict(NEUTRAL)
        if face is not None:
            self.last_face = now
            target.update(eye_left=1-face['blink_left'], eye_right=1-face['blink_right'], mouth=face['jaw']*self.mouth_gain)
            for key, limit in [('yaw',30.), ('roll',25.)]:
                target['head_'+key] = (face[key]-self.baseline[key])/limit*self.gain[key]*self.sign[key]
        elif now-self.last_face <= .3:
            target = dict(self.value)
        if self.mouth_source == 'microphone':
            target['mouth'] = max(0., (rms-self.mic_threshold)*self.mic_gain) if rms is not None else 0.
        for k in target:
            target[k] = float(np.clip(target[k], -1 if k.startswith('head') else 0, 1))
        # Capture reopen/contention can block for seconds. Do not turn that gap into
        # an immediate jump on the first recovered sample; limit each update step.
        bounded_dt=min(max(0,dt),1/30)
        alpha = 1-math.exp(-bounded_dt/.12)
        for k in self.value:
            delta=(target[k]-self.value[k])*alpha
            self.value[k] += float(np.clip(delta,-6*bounded_dt,6*bounded_dt))
        return dict(self.value)

class Camera:
    def __init__(self, index=0):
        import mediapipe as mp
        self.mp = mp
        model=engine.BASE/'models/face_landmarker.task'
        if engine.sha(model) != json.loads((engine.BASE/'models/source.json').read_text())['sha256']:
            raise ValueError('model_hash_mismatch')
        self.cap=cv2.VideoCapture(index,cv2.CAP_DSHOW)
        if not self.cap.isOpened(): raise RuntimeError('camera_open_failed_permission_or_busy_not_distinguishable')
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH,640);self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT,480)
        opts=mp.tasks.vision.FaceLandmarkerOptions(
            base_options=mp.tasks.BaseOptions(model_asset_buffer=model.read_bytes()),
            running_mode=mp.tasks.vision.RunningMode.VIDEO, num_faces=1,
            output_face_blendshapes=True, output_facial_transformation_matrixes=True)
        self.detector=mp.tasks.vision.FaceLandmarker.create_from_options(opts)
        self.timestamp=0

    def read(self):
        start=time.perf_counter();ok,bgr=self.cap.read()
        capture_ms=(time.perf_counter()-start)*1000
        if not ok:return None, {'camera_read':False,'capture_ms':capture_ms}
        rgb=cv2.cvtColor(bgr,cv2.COLOR_BGR2RGB)
        self.timestamp=max(self.timestamp+1,int(time.monotonic()*1000))
        start=time.perf_counter()
        result=self.detector.detect_for_video(self.mp.Image(image_format=self.mp.ImageFormat.SRGB,data=rgb),self.timestamp)
        meta={'camera_read':True,'width':bgr.shape[1],'height':bgr.shape[0], 'capture_ms':capture_ms,
              'inference_ms':(time.perf_counter()-start)*1000}
        if not result.face_landmarks:return None,meta
        scores={c.category_name:float(c.score) for c in result.face_blendshapes[0]}
        rot=np.asarray(result.facial_transformation_matrixes[0])[:3,:3]
        yaw=math.degrees(math.atan2(-rot[2,0],math.hypot(rot[0,0],rot[1,0])))
        roll=math.degrees(math.atan2(rot[1,0],rot[0,0]))
        return {'blink_left':scores.get('eyeBlinkLeft',0.),'blink_right':scores.get('eyeBlinkRight',0.),
                'jaw':scores.get('jawOpen',0.),'yaw':yaw,'roll':roll},meta

    def close(self):
        self.cap.release();self.detector.close()

class Microphone:
    def __init__(self):
        self.rms=0.;self.errors=[];self.blocks=0
        device=sd.query_devices(kind='input');self.device=str(device['name']);self.rate=int(device['default_samplerate'])
        def callback(data,frames,timing,status):
            self.rms=float(np.sqrt(np.mean(np.square(data,dtype=np.float64))))
            self.blocks+=1
            if status:self.errors.append(str(status))
        self.stream=sd.InputStream(channels=1,samplerate=self.rate,blocksize=1024,callback=callback)
        self.stream.start()
    def close(self): self.stream.stop();self.stream.close()

def summarize(rows):
    def stats(vals):
        if not vals:return None
        return {k:float(v) for k,v in zip(['min','p50','p95','max'],np.percentile(vals,[0,50,95,100]))}
    result={'samples':len(rows),'face_found':sum(r['face'] is not None for r in rows),
            'capture_ms':stats([r['device']['capture_ms'] for r in rows]),
            'inference_ms':stats([r['device']['inference_ms'] for r in rows if 'inference_ms' in r['device']]),
            'face_ranges':{k:stats([r['face'][k] for r in rows if r['face']]) for k in ['blink_left','blink_right','jaw','yaw','roll']},
            'by_stage':{}}
    for stage in dict.fromkeys(r['stage'] for r in rows):
        subset=[r for r in rows if r['stage']==stage]
        result['by_stage'][stage]={'samples':len(subset),'rms':stats([r['rms'] for r in subset if r['rms'] is not None])}
    return result

def probe(out, seconds=45):
    """Stage times are instructions, not automatic proof that a person complied."""
    cam=Camera();mic=None;mic_error=None
    try:mic=Microphone()
    except Exception as exc:mic_error=str(exc)
    controller=Controller();rows=[];cal=[]
    start=last=time.monotonic()
    try:
        while time.monotonic()-start<seconds:
            face,device=cam.read();now=time.monotonic();elapsed=now-start
            stage='neutral_quiet' if elapsed<10 else 'blink_head' if elapsed<22 else 'speech' if elapsed<34 else 'noise_clap'
            if elapsed<7 and face:cal.append(face)
            if elapsed>=7 and cal:controller.calibrate(cal);cal=[]
            rms=mic.rms if mic else None
            value=controller.update(face,rms,now,now-last);last=now
            rows.append({'t':round(elapsed,4),'stage':stage,'face':face,'rms':rms,'params':value,'device':device})
        # Actual device close -> reopen, while controller follows neutral fallback.
        cam.close();cam=None
        before=dict(controller.value);fallback=[]
        for i in range(50):
            now+=.02;fallback.append(controller.update(None,None,now,.02))
        reopened=False;reopen_error=None
        try:
            cam=Camera();face,device=cam.read();reopened=bool(device['camera_read'])
        except Exception as exc:reopen_error=str(exc)
        payload={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'raw_media_saved':False,
                 'stage_labels':'requested timeline; actions require range inspection/user observation',
                 'summary':summarize(rows),'duration':rows[-1]['t'],'fps':len(rows)/rows[-1]['t'],
                 'calibration':controller.baseline,'microphone':{'device':mic.device if mic else None,'error':mic_error,
                 'blocks':mic.blocks if mic else 0,'callback_errors':mic.errors if mic else []},
                 'disconnect':{'method':'actual capture.release then reopen; physical unplug not tested',
                 'reopened':reopened,'error':reopen_error,'before':before,'fallback':fallback},'samples':rows}
        engine.json_write(out,payload)
        print(json.dumps(payload['summary'],ensure_ascii=False));print('Saved derived values:',out)
    finally:
        if cam:cam.close()
        if mic:mic.close()

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--out',default=str(BASE/'results/live-input.json'));p.add_argument('--seconds',type=float,default=45)
    args=p.parse_args();probe(args.out,args.seconds)
