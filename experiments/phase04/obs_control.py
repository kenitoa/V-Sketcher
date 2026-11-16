"""OBS 5.x WebSocket authenticated local API. Never starts a stream."""
from pathlib import Path
import base64, hashlib, json, secrets, time
import websocket
BASE=Path(__file__).resolve().parent
OBS=BASE/'tools/obs'
LOCAL=BASE/'.local';LOCAL.mkdir(exist_ok=True)
def prepare():
    path=LOCAL/'obs-secret.json'
    config=json.loads(path.read_text()) if path.exists() else {'port':18456,'password':secrets.token_urlsafe(32)}
    path.write_text(json.dumps(config))
    plugin=OBS/'config/obs-studio/plugin_config/obs-websocket';plugin.mkdir(parents=True,exist_ok=True)
    (plugin/'config.json').write_text(json.dumps({'server_enabled':True,'server_port':config['port'],
        'auth_required':True,'server_password':config['password'],'first_load':False,'alerts_enabled':False}))
    (OBS/'portable_mode.txt').write_text('')
    # OBS 33 keeps FirstRun in user.ini, not the legacy global.ini. Preseeding the
    # wrong file leaves the hidden first-run wizard disabling output start.
    user=OBS/'config/obs-studio/user.ini'
    if not user.exists():user.write_text('[General]\nFirstRun=true\n')

class OBSClient:
    def __init__(self):
        cfg=json.loads((LOCAL/'obs-secret.json').read_text())
        self.ws=websocket.create_connection(f"ws://127.0.0.1:{cfg['port']}",timeout=10,origin='http://127.0.0.1')
        hello=json.loads(self.ws.recv())['d'];identify={'rpcVersion':1,'eventSubscriptions':0}
        if 'authentication' in hello:
            a=hello['authentication']
            secret=base64.b64encode(hashlib.sha256((cfg['password']+a['salt']).encode()).digest()).decode()
            identify['authentication']=base64.b64encode(hashlib.sha256((secret+a['challenge']).encode()).digest()).decode()
        self.ws.send(json.dumps({'op':1,'d':identify}))
        assert json.loads(self.ws.recv())['op']==2
        self.n=0
    def request(self,kind,**data):
        self.n+=1;rid=str(self.n)
        self.ws.send(json.dumps({'op':6,'d':{'requestId':rid,'requestType':kind,'requestData':data}}))
        while True:
            msg=json.loads(self.ws.recv())
            if msg['op']==7 and msg['d']['requestId']==rid:
                d=msg['d']
                if not d['requestStatus']['result']:raise RuntimeError(json.dumps(d))
                return d.get('responseData',{})
    def screenshot(self,name,path):
        r=self.request('GetSourceScreenshot',sourceName=name,imageFormat='png')
        Path(path).write_bytes(base64.b64decode(r['imageData'].split(',',1)[1]))
        return r
    def close(self):self.ws.close()

if __name__=='__main__':prepare();print('Prepared isolated portable OBS with authenticated API.')
