"""Observe official target window through OBS while the app/frame server is stopped."""
import sys,json,time,psutil,socket
import numpy as np
from PIL import Image
from tracking import BASE,engine
from obs_control import OBSClient

def run():
    c=OBSClient()
    item=c.request('GetSceneItemId',sceneName='Phase04Avatar',sourceName='ExternalSession')['sceneItemId']
    c.request('SetSceneItemEnabled',sceneName='Phase04Avatar',sceneItemId=item,sceneItemEnabled=True)
    c.request('SetInputSettings',inputName='ExternalSession',inputSettings={'window':'','method':1},overlay=True)
    time.sleep(.2)
    c.request('SetInputSettings',inputName='ExternalSession',inputSettings={'window':'Inochi Session v0.8.7:SDL_app:inochi-session.exe','method':1},overlay=True)
    time.sleep(2)
    paths=[]
    for i in range(16):
        p=BASE/f'results/external-premium-{i:02d}.png';c.screenshot('ExternalSession',p);paths.append(p);time.sleep(.29)
    images=[Image.open(p).convert('RGB') for p in paths]
    a=[np.array(im) for im in images]
    images[0].save(BASE/'results/external-premium.gif',save_all=True,append_images=images[1:],duration=290,loop=0)
    runtime=[{'pid':p.pid,'name':p.info['name']} for p in psutil.process_iter(['name','cmdline'])
             if (p.info['name'] or '').lower().startswith('python') and any('phase04/runtime.py' in s for s in p.info['cmdline'] or [])]
    s=socket.socket();listening=s.connect_ex(('127.0.0.1',18764))==0;s.close()
    diff=[int(np.abs(im[180:850,240:810].astype(int)-a[0][180:850,240:810].astype(int)).sum()) for im in a]
    result={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'target':'Official Inochi Session v0.8.7',
            'model_sha256':engine.sha(BASE/'exports/PREMIUM-003.inp'),'our_runtime_processes':runtime,
            'our_frame_server_running':listening,'animation':'Native embedded four-second Load-triggered loop; no external parameter sender',
            'capture':'OBS window_capture BitBlt method1; target only; no desktop capture',
            'frames':[str(p.relative_to(BASE)).replace('\\','/') for p in paths], 'avatar_roi_diff_from_first':diff,
            'pass':not runtime and not listening and sum(v>10000 for v in diff)>=3}
    engine.json_write(BASE/'results/external-independent.json',result);c.close();print(json.dumps(result))
    if not result['pass']:raise SystemExit('Independent motion NOT proven')

if __name__=='__main__':run()
