"""Import artist-generated expression textures into the common Part/Project contract.

These manually specified ROIs are authored bindings, not automatic recognition evidence.
The original generated PNGs remain unchanged. Patches are derived runtime resources.
"""
from pathlib import Path
import numpy as np
from PIL import Image
from tracking import BASE,engine
from export_inp import export

def build():
    neutral=engine.rgba(BASE/'assets/premium/neutral.png')
    expression=engine.rgba(BASE/'assets/premium/blink-speaking.png')
    if neutral.shape!=expression.shape:raise ValueError('expression_canvas_mismatch')
    h,w=neutral.shape[:2]
    parts=[engine.Part('premium-illustration','body','center',0,[0,0],{'base':neutral})]
    regions={'eye_right':[510,250,615,325],'eye_left':[635,250,741,325],'mouth':[580,360,685,429]}
    # Coordinates authored on the actual 1254px generated canvas.
    regions={k:[round(v*(w/1254 if i%2==0 else h/1254)) for i,v in enumerate(box)] for k,box in regions.items()}
    for z,(key,(x,y,x1,y1)) in enumerate(regions.items(),1):
        yy,xx=np.mgrid[:y1-y,:x1-x]
        feather=np.clip(np.minimum.reduce([xx,yy,x1-x-1-xx,y1-y-1-yy])/8,0,1)
        states={}
        for name,source in [('neutral',neutral),('expression',expression)]:
            patch=source[y:y1,x:x1].copy();patch[:,:,3]=np.rint(patch[:,:,3]*feather).astype(np.uint8)
            states[('open' if key.startswith('eye') else 'closed') if name=='neutral' else ('closed' if key.startswith('eye') else 'open')]=patch
        parts.append(engine.Part(key,'eye' if key.startswith('eye') else 'mouth',key.split('_')[-1],z,[x,y],states,bind=key))
    p=engine.Project('PREMIUM-003','single', (w,h),parts,[509,190,749,453],regions=regions,
                     warnings=['Authored expression patches, not automatic rigging','Fine alpha fringe remains in generated source','Planar portrait motion only'],
                     analysis={'binding_method':'manual authored ROI over generated state pair','recognition_claim':False},
                     provenance={'neutral_sha256':engine.sha(BASE/'assets/premium/neutral.png'),
                                 'expression_sha256':engine.sha(BASE/'assets/premium/blink-speaking.png')})
    engine.save_project(p,BASE/'assets/premium/project')
    export(p,BASE/'exports/PREMIUM-003.inp')
    engine.json_write(BASE/'assets/premium/import.json',{'regions':regions,'size':p.size,'provenance':p.provenance,
                 'quality':'Premium source/state drawings; thin magenta/white alpha fringe remains unresolved; not final art approval'})
    return p

if __name__=='__main__':build()
