"""Minimal Inochi2D 0.8.6 INP writer. Textures are embedded PNG; no Python runtime dependency."""
import io,json,struct,sys,math
import numpy as np
from pathlib import Path
from PIL import Image
from tracking import engine,BASE

def node(uid,name,z=0):
    return {'uuid':uid,'name':name,'type':'Node','enabled':True,'zsort':z,'lockToRoot':False,
            'transform':{'translation':[0,0,0],'rotation':[0,0,0],'scale':[1,1]},'children':[]}

def binding(uid,prop,values):
    return {'node':uid,'param_name':prop,'values':[[float(v)] for v in values],
            'isSet':[[True] for v in values],'interpolate_mode':'Linear'}

def export(project,out):
    root=node(1,'2DSketcher export');motion=node(2,'Limited planar head motion');root['children'].append(motion)
    textures=[];mapping=[];bindings={k:[] for k in engine.PARAMS};uid=10
    w,h=project.size
    for part in sorted(project.parts,key=lambda p:p.z):
        for state,im in part.states.items():
            uid+=1;n=node(uid,part.id+'::'+state,-part.z)
            n['type']='Part';x,y=part.origin;ih,iw=im.shape[:2]
            x-=w/2;y-=h/2
            n.update(mesh={'verts':[x,y,x+iw,y,x+iw,y+ih,x,y+ih],'uvs':[0,0,1,0,1,1,0,1],
                           'indices':[0,1,2,0,2,3],'origin':[0,0]},
                     textures=[len(textures),4294967295,4294967295],blend_mode='Normal',tint=[1,1,1],
                     screenTint=[0,0,0],masks=[],mask_threshold=.5,opacity=part.opacity)
            if part.bind:
                opened=state=='open';values=[0,1] if opened else [1,0]
                # All state node base opacities remain nonzero; param binding multiplies.
                bindings[part.bind].append(binding(uid,'opacity',values))
            motion['children'].append(n)
            # SDK 0.8.6 uploads embedded textures directly and blends premultiplied RGB.
            # Ordinary straight-alpha PNGs otherwise create bright rectangular seams.
            encoded=im.copy()
            encoded[:,:,:3]=((im[:,:,:3].astype(np.uint16)*im[:,:,3:4].astype(np.uint16))//255).astype(np.uint8)
            b=io.BytesIO();Image.fromarray(encoded).save(b,format='PNG');textures.append(b.getvalue())
            mapping.append({'part':part.id,'state':state,'uuid':uid,'texture':len(textures)-1,'sha256':__import__('hashlib').sha256(textures[-1]).hexdigest()})
    bindings['head_yaw']=[binding(2,'transform.t.x',[-18,0,18])]
    bindings['head_roll']=[binding(2,'transform.r.z',[-math.radians(8),0,math.radians(8)])]
    params=[];ids={}
    for i,(key,default) in enumerate(engine.PARAMS.items()):
        head=key.startswith('head');pid=100+i;ids[key]=pid
        params.append({'uuid':pid,'name':key,'is_vec2':False,'min':[-1 if head else 0,0],'max':[1,1],
                       'defaults':[default,0],'axis_points':[[0,.5,1] if head else [0,1],[0]],
                       'merge_mode':'Forced','bindings':bindings[key]})
    lanes=[]
    sequences={'eye_left':[(0,1),(18,1),(22,0),(27,1),(120,1)],
               'eye_right':[(0,1),(18,1),(22,0),(27,1),(120,1)],
               'mouth':[(0,0),(35,0),(45,1),(55,0),(65,1),(75,0),(120,0)],
               'head_yaw':[(0,0),(30,-1),(60,0),(90,1),(120,0)],
               'head_roll':[(0,0),(30,-1),(60,0),(90,1),(120,0)]}
    for key,frames in sequences.items():
        lanes.append({'uuid':ids[key],'target':0,'interpolation':'Linear','merge_mode':'Forced',
                      'keyframes':[{'frame':f,'value':v,'tension':.5} for f,v in frames]})
    puppet={'meta':{'name':'2DSketcher '+project.name,'version':'0.8.6','rigger':'2DSketcher phase04 prototype',
                    'artist':'Project generated asset','copyright':'Project test fixture','preservePixels':False},
            'physics':{'pixelsPerMeter':1000,'gravity':9.8},'nodes':root,'param':params,'automation':[],
            'animations':{'phase04-demo':{'timestep':1/30,'additive':False,'animationWeight':1,'length':121,
                                        'leadIn':0,'leadOut':120,'lanes':lanes}}}
    payload=json.dumps(puppet,separators=(',',':')).encode()
    blob=b'TRNSRTS\0'+struct.pack('>I',len(payload))+payload+b'TEX_SECT'+struct.pack('>I',len(textures))
    for t in textures:blob+=struct.pack('>IB',len(t),0)+t
    # Session emits Sleep after 5s without an active tracking zone. This autonomous
    # export demo intentionally keeps looping; it is not a live-tracking binding.
    extension=json.dumps([{'name':'phase04-demo','loop':True,'triggerType':'Event','playEvent':1,'stopEvent':0,'fullStopEvent':0}]).encode()
    name=b'com.inochi2d.inochi-session.animations'
    blob+=b'EXT_SECT'+struct.pack('>II',1,len(name))+name+struct.pack('>I',len(extension))+extension
    out=Path(out);out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(blob)
    engine.json_write(out.with_suffix('.json'),puppet)
    engine.json_write(out.with_suffix('.mapping.json'),{'target':'Inochi Session v0.8.7 / SDK ~0.8.6',
        'sha256':engine.sha(out),'texture_count':len(textures),'mapping':mapping,'embedded_alpha':'premultiplied RGB for SDK 0.8.6',
        'losses':['Weighted per-pixel head warp converted to rigid whole-avatar translation/rotation',
                  'Continuous eye compression converted to opacity crossfade between embedded open/closed artwork',
                  'No hidden part reconstruction, physics, Live2D moc3 or target webcam binding promised'],
        'independent_motion':'Embedded four-second keyframed demo triggered by target Load event; not live user tracking'})
    print(str(out),len(blob),'bytes')

if __name__=='__main__':export(engine.from_parts(),BASE/'exports/PARTS-001.inp')
