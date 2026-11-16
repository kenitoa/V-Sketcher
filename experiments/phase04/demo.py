"""One entry point for the high-quality feasibility demo; defaults never use the diagram fixture."""
import argparse,json,subprocess,os,time,threading,sys
from pathlib import Path
import psutil
from tracking import BASE,engine
from runtime import Runtime,server
from obs_control import OBS,prepare,OBSClient

def external():
    exe=BASE/'tools/inochi-session/inochi-session.exe'
    env=os.environ.copy();data=BASE/'.local/inochi-appdata';data.mkdir(parents=True,exist_ok=True)
    env.update(APPDATA=str(data),LOCALAPPDATA=str(data))
    # Native avatar viewer is intentionally visible for inspection; no console helper window.
    with (BASE/'.local/demo-session-stdout.txt').open('ab') as stdout, (BASE/'.local/demo-session-stderr.txt').open('ab') as stderr:
        return subprocess.Popen([str(exe),str(BASE/'exports/PREMIUM-003.inp')],cwd=exe.parent,env=env,
                                creationflags=subprocess.CREATE_NO_WINDOW,stdout=stdout,stderr=stderr)

def configure_obs():
    own=OBS/'bin/64bit/obs64.exe'
    running=any((p.info['exe'] or '').lower()==str(own).lower() for p in psutil.process_iter(['exe']))
    if not running:
        prepare();si=subprocess.STARTUPINFO();si.dwFlags|=subprocess.STARTF_USESHOWWINDOW;si.wShowWindow=0
        subprocess.Popen([str(own),'--portable','--profile','Phase04'],
                         cwd=own.parent,startupinfo=si)
    c=None
    for _ in range(40):
        try:c=OBSClient();break
        except Exception:time.sleep(.25)
    if not c:raise RuntimeError('isolated_obs_api_not_ready')
    profiles=c.request('GetProfileList')
    if 'Phase04' not in profiles['profiles']:c.request('CreateProfile',profileName='Phase04')
    if c.request('GetProfileList')['currentProfileName']!='Phase04':c.request('SetCurrentProfile',profileName='Phase04')
    scenes=c.request('GetSceneList')['scenes']
    if not any(s['sceneName']=='Phase04Avatar' for s in scenes):c.request('CreateScene',sceneName='Phase04Avatar')
    inputs=c.request('GetInputList')['inputs'];names={v['inputName'] for v in inputs}
    # A new local session URL forces CEF to recover even if it cached an offline
    # error page while this server was stopped. The handler ignores the query.
    settings={'url':f'http://127.0.0.1:18764/?run={time.time_ns()}','width':640,'height':640,'fps':30,'fps_custom':True,'shutdown':False,
              'css':'body { background-color: rgba(0,0,0,0); margin:0; overflow:hidden; }'}
    if 'AvatarRGBA' not in names:c.request('CreateInput',sceneName='Phase04Avatar',inputName='AvatarRGBA',inputKind='browser_source',inputSettings=settings,sceneItemEnabled=True)
    else:c.request('SetInputSettings',inputName='AvatarRGBA',inputSettings=settings,overlay=True)
    for test_source in ['ExternalSession','AlphaBackdrop']:
        if test_source in names:
            i=c.request('GetSceneItemId',sceneName='Phase04Avatar',sourceName=test_source)['sceneItemId']
            c.request('SetSceneItemEnabled',sceneName='Phase04Avatar',sceneItemId=i,sceneItemEnabled=False)
    for v in c.request('GetSpecialInputs').values():
        if v:c.request('SetInputMute',inputName=v,inputMuted=True)
    c.request('SetCurrentProgramScene',sceneName='Phase04Avatar')
    return c

def run(mode,seconds,show=True):
    if mode=='external':
        p=external();print('Premium native avatar opened. Our runtime/server was not started. PID',p.pid);return
    project=engine.load_project(BASE/'assets/premium/project/project.json')
    replay=json.loads((BASE/'results/live-input.json').read_text(encoding='utf-8'))['samples'] if mode=='replay' else None
    runtime=Runtime(project,mode=='live',replay,'preview');http=server(runtime,18764)
    threading.Thread(target=http.serve_forever,daemon=True).start()
    try:
        c=configure_obs()
        if show:c.request('OpenSourceProjector',sourceName='AvatarRGBA')
        c.close();print('Premium avatar output connected to isolated OBS; no stream or recording started.',flush=True)
        runtime.stop.wait(seconds)
    except KeyboardInterrupt:pass
    finally:
        http.shutdown();runtime.close();engine.json_write(BASE/'results/local-demo.json',runtime.report())

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    p=argparse.ArgumentParser();p.add_argument('--mode',choices=['live','replay','external'],default='live');p.add_argument('--seconds',type=float,default=60);p.add_argument('--no-projector',action='store_true')
    a=p.parse_args();run(a.mode,a.seconds,not a.no_projector)
