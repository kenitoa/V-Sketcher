"""In-process Tk widget/callback integration test; not an OS mouse inspection."""
from pathlib import Path
from types import SimpleNamespace
import hashlib
import json
import tkinter as tk

import numpy as np

from engine import BASE, INPUTS, PARAMS, load_project, render, sha, json_write
from viewer import App

root=tk.Tk()
app=App(root,BASE/"results/projects/premium/project.json")
checks=[]
def check(name,value,details=None):checks.append({"name":name,"passed":bool(value),"details":details})
def widgets(parent):
    for child in parent.winfo_children():
        yield child
        yield from widgets(child)
try:
    root.update_idletasks();root.update();app.tick()
    check("premium_project_loaded",app.project.route=="single" and app.project.size==(1254,1254))
    check("canvas_has_image_and_transform",app.photo is not None and app.display is not None)
    buttons=[w for w in widgets(root) if w.winfo_class()=="TButton"]
    save_button=next(w for w in buttons if "F5" in w.cget("text"))
    check("save_button_inside_window",save_button.winfo_rooty()+save_button.winfo_height()<=root.winfo_rooty()+root.winfo_height(),{"button_bottom":save_button.winfo_rooty()+save_button.winfo_height(),"window_bottom":root.winfo_rooty()+root.winfo_height()})
    app.controls["mouth"].set(.5);app.controls["eye_left"].set(0)
    app.tick()
    requested={k:v.get() for k,v in app.controls.items()}
    check("manual_controls_affect_common_renderer",np.any(render(app.project,requested)!=render(app.project,PARAMS)))
    app.reset();app.handles.set(True);app.tick()
    original=app.project.source.copy()
    box=list(app.project.regions["mouth"]);cx,cy=(box[0]+box[2])/2,(box[1]+box[3])/2
    scale,ox,oy=app.display
    start=SimpleNamespace(x=cx*scale+ox,y=cy*scale+oy)
    end=SimpleNamespace(x=(cx+12)*scale+ox,y=(cy+5)*scale+oy)
    app.press(start);app.move(end);app.release(end);app.tick()
    check("drag_callback_updates_source_coordinates",app.project.regions["mouth"][0]>=box[0]+10)
    check("drag_preserves_original",np.array_equal(original,app.project.source))
    app.region_scale.set(1.1);before=list(app.project.regions["mouth"]);app.resize_region()
    check("size_control_updates_region",app.project.regions["mouth"][2]-app.project.regions["mouth"][0]>before[2]-before[0])
    eye=list(app.project.regions["eye_left"]);cx,cy=(eye[0]+eye[2])/2,(eye[1]+eye[3])/2
    app.tick();scale,ox,oy=app.display
    a=SimpleNamespace(x=cx*scale+ox,y=cy*scale+oy);b=SimpleNamespace(x=(cx-8)*scale+ox,y=cy*scale+oy)
    app.press(a);app.move(b);app.release(b)
    check("eye_drag_callback_changes_eye_region",app.project.regions["eye_left"][0]<=eye[0]-6)
    app.feature.set("eye_left");app.toggle_observed()
    check("occlusion_control_limits_motion",app.project.analysis["observed"]["eye_left"] is False and app.project.limits["head"]==.35)
    app.toggle_observed()
    check("occlusion_control_can_restore_feature",app.project.analysis["observed"]["eye_left"] is True)
    before_dirs=set((BASE/"results/projects").glob("user-*"))
    save_button.invoke();root.update_idletasks()
    after_dirs=set((BASE/"results/projects").glob("user-*"))
    created=list(after_dirs-before_dirs)
    check("save_widget_creates_project",len(created)==1)
    if created:
        restored=load_project(created[0]/"project.json")
        check("saved_corrections_and_parameters_reopen",restored.regions==app.project.regions and restored.params==app.project.params and np.array_equal(render(restored),render(app.project)))
    app.route.set("파츠 조합");app.update_inputs();app.open_selected()
    check("parts_route_load_button",app.project.route=="parts")
    before=render(app.project);app.swap()
    check("replacement_button_changes_asset",np.any(before!=render(app.project)))
    app.route.set("분리 그림");app.update_inputs();app.open_selected()
    check("split_route_load_button",app.project.route=="split")
    app.input.set("L-003");retained=app.project;app.open_selected()
    check("invalid_input_preserves_active_project",app.project is retained)
    check("invalid_input_shows_next_state",bool(app.status.get()))
    result={"scope":"in-process Tk widget/callback integration, no Computer Use mouse/visual inspection; desktop native pipe unavailable after documented recovery retries","checks":checks,"passed":all(c["passed"] for c in checks),"code_sha256":{p.name:sha(p) for p in [BASE/"engine.py",BASE/"viewer.py",BASE/"ui_smoke.py"]},"created_project":str((created[0]/"project.json").relative_to(BASE)) if created else None}
    json_write(BASE/"results/ui-integration.json",result)
    print(f"Tk integration: {sum(c['passed'] for c in checks)}/{len(checks)}",flush=True)
    for c in checks:
        if not c["passed"]:print(c,flush=True)
    if not result["passed"]:raise SystemExit(1)
finally:
    app.close()
