"""Experimental avatar-only loopback output. No editor or raw media endpoint."""
import io, json, time, threading, argparse, sys
from copy import deepcopy
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
import numpy as np
from PIL import Image
from tracking import BASE, engine, Controller, Camera, Microphone

def compact(project):
    """Losslessly crop union alpha bounds; origins preserve the shared coordinate system."""
    result=deepcopy(project)
    for part in result.parts:
        boxes=[engine.alpha_bbox(im) for im in part.states.values()]
        x=min(b[0] for b in boxes);y=min(b[1] for b in boxes)
        x1=max(b[2] for b in boxes);y1=max(b[3] for b in boxes)
        part.states={k:im[y:y1,x:x1].copy() for k,im in part.states.items()}
        part.origin=[part.origin[0]+x,part.origin[1]+y]
    return result

class Runtime:
    def __init__(self, project, live=False, replay=None, renderer='reference'):
        self.project=compact(project);self.live=live;self.stop=threading.Event();self.lock=threading.Lock()
        self.controller=Controller();self.params=dict(engine.PARAMS);self.frame=b'';self.seq=0
        self.events=[];self.frames=[];self.acks=[];self.errors=[];self.calibration=[]
        self.replay=replay;self.started=time.monotonic();self.input_mode='live' if live else 'replay' if replay else 'manual'
        self.renderer_name=renderer
        self.preview=None
        if renderer=='preview':
            from preview_renderer import PreviewRenderer
            self.preview=PreviewRenderer(self.project)
        self.camera=None;self.mic=None
        if live:
            try:self.camera=Camera()
            except Exception as exc:self.errors.append(str(exc))
            try:self.mic=Microphone()
            except Exception as exc:self.errors.append(str(exc))
        self.threads=[]
        if self.camera:
            self.threads.append(threading.Thread(target=self.capture,daemon=True))
        self.threads.append(threading.Thread(target=self.render,daemon=True))
        for thread in self.threads:thread.start()

    def capture(self):
        last=time.monotonic()
        while not self.stop.is_set():
            try:face,device=self.camera.read()
            except Exception as exc:face=None;device={'error':str(exc)}
            now=time.monotonic();rms=self.mic.rms if self.mic else None
            if now-self.started<3 and face:self.calibration.append(face)
            elif self.calibration:self.controller.calibrate(self.calibration);self.calibration=[]
            value=self.controller.update(face,rms,now,now-last);last=now
            with self.lock:
                self.params=value
                self.events.append({'t':now-self.started,'face_found':face is not None,'params':value,'rms':rms,'device':device})
                self.events=self.events[-10000:]

    def render(self):
        while not self.stop.is_set():
            start=time.monotonic()
            with self.lock:value=dict(self.params)
            if self.replay:
                t=(start-self.started)%self.replay[-1]['t']
                row=min(self.replay,key=lambda r:abs(r['t']-t));value=row['params']
            image=self.preview.render(value) if self.preview else Image.fromarray(engine.render(self.project,value))
            buf=io.BytesIO();image.save(buf,format='PNG',compress_level=1)
            now=time.monotonic()
            with self.lock:
                self.seq+=1;self.frame=buf.getvalue()
                self.frames.append({'seq':self.seq,'t':now-self.started,'ms':(now-start)*1000,'params':value})
                self.frames=self.frames[-10000:]
            self.stop.wait(max(0,1/30-(now-start)))

    def report(self):
        with self.lock:
            return {'route':self.project.route,'name':self.project.name,'input_mode':self.input_mode,
                    'size':self.preview.size if self.preview else self.project.size,'renderer':self.renderer_name,
                    'seq':self.seq,'params':dict(self.params),'errors':list(self.errors),
                    'baseline':dict(self.controller.baseline),'frames':list(self.frames),'input':list(self.events),
                    'browser_ack':list(self.acks),'raw_media_saved':False}

    def close(self):
        self.stop.set()
        for t in self.threads:t.join(5)
        if self.camera:self.camera.close()
        if self.mic:self.mic.close()

HTML=b'''<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent;overflow:hidden}canvas{display:block}</style><canvas width="512" height="512"></canvas><script>
const c=document.querySelector('canvas'),ctx=c.getContext('2d');
async function tick(){try{const r=await fetch('/frame.png',{cache:'no-store'}),seq=+r.headers.get('X-Sequence');const b=await createImageBitmap(await r.blob());if(c.width!==b.width||c.height!==b.height){c.width=b.width;c.height=b.height}ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(b,0,0);b.close();fetch('/ack',{method:'POST',body:JSON.stringify({seq}),headers:{'Content-Type':'application/json'}}).catch(()=>{});}catch(e){}requestAnimationFrame(tick)}tick();</script>'''

def server(runtime,port):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,*args):pass
        def do_GET(self):
            path=self.path.split('?')[0]
            if path=='/':data=HTML;kind='text/html'
            elif path=='/frame.png':
                with runtime.lock:data=runtime.frame;seq=runtime.seq
                kind='image/png'
            elif path=='/state':data=json.dumps(runtime.report()).encode();kind='application/json'
            else:self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store')
            if path=='/frame.png':self.send_header('X-Sequence',str(seq))
            self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        def do_POST(self):
            if self.path!='/ack':self.send_error(404);return
            length=int(self.headers.get('Content-Length',0))
            if length>128:self.send_error(413);return
            try:seq=int(json.loads(self.rfile.read(length))['seq'])
            except Exception:self.send_error(400);return
            with runtime.lock:
                runtime.acks.append({'seq':seq,'t':time.monotonic()-runtime.started})
                runtime.acks=runtime.acks[-10000:]
            self.send_response(204);self.end_headers()
    return ThreadingHTTPServer(('127.0.0.1',port),Handler)

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    p=argparse.ArgumentParser();p.add_argument('--live',action='store_true');p.add_argument('--replay',action='store_true')
    p.add_argument('--port',type=int,default=18764);p.add_argument('--duration',type=float,default=180)
    p.add_argument('--project');p.add_argument('--renderer',choices=['reference','preview'],default='preview')
    p.add_argument('--out',default='runtime.json');args=p.parse_args()
    default=BASE/'assets/premium/project/project.json'
    project=engine.load_project(args.project or default)
    replay=json.loads((BASE/'results/live-input.json').read_text())['samples'] if args.replay else None
    runtime=Runtime(project,args.live,replay,args.renderer);http=server(runtime,args.port)
    thread=threading.Thread(target=http.serve_forever,daemon=True);thread.start()
    print('Avatar-only output:',f'http://127.0.0.1:{args.port}',flush=True)
    try:runtime.stop.wait(args.duration)
    except KeyboardInterrupt:pass
    finally:
        http.shutdown();runtime.close();engine.json_write(BASE/'results'/args.out,runtime.report())
