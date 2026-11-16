"""Real camera handle loss/reopen plus real-time neutral/recovery controller observation."""
import time,sys,cv2,numpy as np
from tracking import BASE,engine,Camera,Controller

def run():
    camera=Camera();c=Controller();rows=[];last=time.monotonic();start=last
    def collect(seconds,label):
        nonlocal last
        end=time.monotonic()+seconds
        while time.monotonic()<end:
            if camera is not None:face,device=camera.read()
            else:time.sleep(.02);face=None;device={'camera_read':False,'reason':'handle_released'}
            now=time.monotonic();value=c.update(face,None,now,now-last);last=now
            rows.append({'t':now-start,'stage':label,'face_found':face is not None,'params':value,'device':device})
    try:
        collect(2,'connected')
        # Attempt a second real DirectShow open while the first owner remains active.
        second=cv2.VideoCapture(0,cv2.CAP_DSHOW);opened=second.isOpened();read_ok=False
        if opened:read_ok,frame=second.read();del frame
        second.release()
        contention={'second_handle_opened':opened,'second_read_succeeded':bool(read_ok),
                    'interpretation':'This driver result only; API does not reliably distinguish busy from permission errors'}
        collect(1,'after_contention')
        camera.close();camera=None;collect(2,'disconnected')
        camera=Camera();collect(2,'reconnected')
    finally:
        if camera:camera.close()
    steps=[max(abs(b['params'][k]-a['params'][k]) for k in engine.PARAMS) for a,b in zip(rows,rows[1:])]
    lost=[r for r in rows if r['stage']=='disconnected'];end_error=max(abs(lost[-1]['params'][k]-engine.PARAMS[k]) for k in engine.PARAMS)
    result={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'method':'Real release/reopen of capture; NOT physical USB unplug or privacy toggle',
            'raw_media_saved':False,'contention':contention,'samples':rows,'neutral_error_after_2s':end_error,
            'max_observed_parameter_step':max(steps),'reconnected_frames':sum(r['device'].get('camera_read',False) for r in rows if r['stage']=='reconnected'),
            'reconnected_face_frames':sum(r['face_found'] for r in rows if r['stage']=='reconnected')}
    engine.json_write(BASE/'results/device-recovery.json',result)
    print({k:v for k,v in result.items() if k!='samples'})

if __name__=='__main__':run()
