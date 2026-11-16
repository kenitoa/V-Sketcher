"""Cached Pillow compositor; explicitly limited planar preview, not weighted deformation."""
import math
from PIL import Image,ImageChops
from tracking import engine

class PreviewRenderer:
    def __init__(self,project,max_edge=640):
        self.project=project;self.scale=min(1,max_edge/max(project.size))
        self.size=tuple(round(v*self.scale) for v in project.size)
        self.parts=[]
        for part in sorted(project.parts,key=lambda p:p.z):
            states={}
            for key,arr in part.states.items():
                im=Image.fromarray(arr)
                if self.scale!=1:im=im.resize(tuple(max(1,round(v*self.scale)) for v in im.size),Image.Resampling.LANCZOS)
                if part.opacity!=1:im.putalpha(im.getchannel('A').point(lambda a:round(a*part.opacity)))
                states[key]=im
            cached=[]
            if part.bind and 'open' in states and 'closed' in states:
                if part.bind.startswith('eye'):cached=[states['closed'],states['open']]
                else:cached=[Image.blend(states['closed'],states['open'],i/8) for i in range(9)]
            self.parts.append((part.bind,tuple(round(v*self.scale) for v in part.origin),states,cached))

    def render(self,params):
        v=engine.effective_params(self.project,params)
        out=Image.new('RGBA',self.size)
        for bind,origin,states,cached in self.parts:
            if cached:
                im=cached[int(v[bind]>.55)] if bind.startswith('eye') else cached[round(v[bind]*8)]
            else:im=next(iter(states.values()))
            out.alpha_composite(im,origin)
        # Small portrait motion avoids the exaggerated bend of the old fixture.
        roll=v['head_roll']*3.;dx=v['head_yaw']*self.size[0]*.012
        cx=self.size[0]/2;cy=self.size[1]*.32
        if roll or dx:out=out.rotate(-roll,Image.Resampling.BICUBIC,center=(cx,cy),translate=(dx,0))
        return out
