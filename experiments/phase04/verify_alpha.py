"""Check actual OBS composition over two colored backdrops, not just PNG metadata."""
import time
from PIL import Image
from obs_control import BASE,OBSClient
from tracking import engine
def run():
    c=OBSClient();scene='Phase04Avatar';name='AlphaBackdrop'
    kinds=c.request('GetInputKindList')['inputKinds'];kind=next(k for k in kinds if k.startswith('color_source'))
    if not any(v['inputName']==name for v in c.request('GetInputList')['inputs']):
        c.request('CreateInput',sceneName=scene,inputName=name,inputKind=kind,inputSettings={'width':1920,'height':1080,'color':0xff332211},sceneItemEnabled=True)
    item=c.request('GetSceneItemId',sceneName=scene,sourceName=name)['sceneItemId']
    c.request('SetSceneItemEnabled',sceneName=scene,sceneItemId=item,sceneItemEnabled=True)
    c.request('SetSceneItemIndex',sceneName=scene,sceneItemId=item,sceneItemIndex=0)
    result=[]
    try:
        for label,color in [('dark',0xff332211),('light',0xffeee2ea)]:
            c.request('SetInputSettings',inputName=name,inputSettings={'color':color},overlay=True);time.sleep(.3)
            bg=BASE/f'results/alpha-{label}-background.png';out=BASE/f'results/alpha-{label}-obs.png'
            c.screenshot(name,bg);c.screenshot(scene,out)
            expected=Image.open(bg).convert('RGBA').getpixel((0,0));im=Image.open(out).convert('RGBA')
            points=[(0,0),(630,0),(0,630),(639,639)]
            actual=[im.getpixel(point) for point in points]
            result.append({'background':label,'expected_rgba':expected,'outside_avatar_rgba':actual,'pass':all(v==expected for v in actual),
                           'screenshot':str(out.relative_to(BASE)).replace('\\','/')})
    finally:
        c.request('SetSceneItemEnabled',sceneName=scene,sceneItemId=item,sceneItemEnabled=False);c.close()
    engine.json_write(BASE/'results/obs-alpha-composite.json',{'method':'Actual OBS browser-source canvas retained after local replay; two real color source backgrounds',
                    'editor_or_raw_capture_source':False,'checks':result,'pass':all(v['pass'] for v in result)})
    print(result)
    if not all(v['pass'] for v in result):raise SystemExit(1)
if __name__=='__main__':run()
