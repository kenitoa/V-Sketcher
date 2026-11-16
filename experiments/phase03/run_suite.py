"""Run actual phase03 experiments and store observations, including failed inputs.

Evaluation references are used here only, never by the image import adapter.
This is a technical operator run, not a novice-user observation or release gate.
"""
from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path
import hashlib
import importlib.metadata
import json
import math
import platform
import time

import cv2
import numpy as np
from PIL import Image, ImageDraw

from engine import *

RESULTS=BASE/"results"
CHECKS=[]


def check(name,condition,details=None):
    CHECKS.append({"name":name,"passed":bool(condition),"details":details})


def changed(a,b):
    return int(np.any(a!=b,axis=2).sum())


def image_save(path,array):
    path.parent.mkdir(parents=True,exist_ok=True);Image.fromarray(array).save(path)


def contact(images,path,columns=3,tile=(320,350)):
    sheet=Image.new("RGB",(columns*tile[0],math.ceil(len(images)/columns)*tile[1]),"#e9edf2")
    draw=ImageDraw.Draw(sheet)
    for i,(label,array) in enumerate(images):
        im=Image.fromarray(array);im.thumbnail((tile[0]-16,tile[1]-38),Image.Resampling.LANCZOS)
        x=(i%columns)*tile[0];y=(i//columns)*tile[1]
        bg=Image.new("RGBA",im.size,"#d8e0e8");bg.alpha_composite(im)
        sheet.paste(bg.convert("RGB"),(x+(tile[0]-im.width)//2,y+6))
        draw.text((x+10,y+tile[1]-25),label,fill="#24354b")
    sheet.save(path)


def exercise(project,key,animate=False):
    cases={"neutral":PARAMS,"minimum":dict(PARAMS,eye_left=0,eye_right=0,head_yaw=-1,head_roll=-1),
           "middle":dict(PARAMS,eye_left=.5,eye_right=.5,mouth=.5,head_yaw=.5,head_roll=.5),
           "maximum":dict(PARAMS,mouth=1,head_yaw=1,head_roll=1),"blink":dict(PARAMS,eye_left=0,eye_right=0)}
    tiles=[]
    for name,values in cases.items():
        frame=render(project,values)
        image_save(RESULTS/"renders"/key/f"{name}.png",frame)
        tiles.append((f"{key} / {name}",frame))
    folder=RESULTS/"projects"/key
    saved=save_project(project,folder);loaded=load_project(saved)
    for name,values in cases.items():check(f"reload:{key}:{name}",np.array_equal(render(loaded,values),render(project,values)))
    check(f"parameter_response:{key}",changed(render(project),render(project,dict(PARAMS,eye_left=0,eye_right=0,mouth=1)))>0)
    if animate:
        frames=[]
        for i in range(12):
            t=i/12*2*math.pi
            values=dict(PARAMS,eye_left=max(0,min(1,abs(math.sin(t))*2)),eye_right=max(0,min(1,abs(math.sin(t))*2)),mouth=(math.sin(t*2)+1)*.3,head_roll=math.sin(t)*.45,head_yaw=math.cos(t)*.35)
            im=Image.fromarray(render(project,values));im.thumbnail((640,640),Image.Resampling.LANCZOS);frames.append(im)
        frames[0].save(RESULTS/"renders"/key/"motion.apng",format="PNG",save_all=True,append_images=frames[1:],duration=120,loop=0)
    return tiles


def evaluation_reference(sid):
    # Known fixture geometry is an evaluation oracle only; engine has no access to it.
    base={"eye_right":[184,173,229,221],"eye_left":[284,173,329,221],"mouth":[232,250,281,266]}
    scale=3 if sid=="S-015" else 96/512 if sid=="S-010" else 1
    if sid=="S-006":return {k:[v[0]-175,v[1]-90,v[2]-175,v[3]-90] for k,v in base.items()}
    if sid=="S-003":
        out={};a=math.radians(-15)
        for k,b in base.items():
            points=np.array([[b[0],b[1]],[b[2],b[1]],[b[2],b[3]],[b[0],b[3]]])-256
            rot=points@np.array([[math.cos(a),math.sin(a)],[-math.sin(a),math.cos(a)]])+256
            out[k]=[*rot.min(axis=0).tolist(),*rot.max(axis=0).tolist()]
        return out
    return {k:[x*scale for x in b] for k,b in base.items()}


def center_checks(analysis,reference):
    results={}
    for key,box in analysis["regions"].items():
        if key not in reference:continue
        b=reference[key];cx,cy=(box[0]+box[2])/2,(box[1]+box[3])/2
        results[key]={"center_in_reference":bool(b[0]<=cx<=b[2] and b[1]<=cy<=b[3]),"center_error_px":round(math.hypot(cx-(b[0]+b[2])/2,cy-(b[1]+b[3])/2),3)}
    return results


def main():
    RESULTS.mkdir(exist_ok=True)
    start=time.perf_counter()
    manifest=json.loads((INPUTS/"manifest.json").read_text(encoding="utf-8"))
    input_hashes={row["path"]:sha(INPUTS/row["path"]) for row in manifest["samples"]}
    analyzer=Analyzer()
    parts=from_parts();split=from_split(INPUTS/"split/L-001.json");cropped=from_split(INPUTS/"split/L-009.json")
    source=rgba(INPUTS/"single/S-001.png")
    check("T021_original_coordinates_and_order",np.array_equal(render(parts),source))
    check("T021_split_original_pixels",np.array_equal(render(split),source))
    check("T021_cropped_part_coordinates",np.array_equal(render(cropped),source))
    tiny=np.array([[[0,0,255,128]]],np.uint8);red=np.array([[[255,0,0,128]]],np.uint8)
    expected=np.array(Image.alpha_composite(Image.fromarray(tiny),Image.fromarray(red)))
    check("T021_fractional_alpha",np.array_equal(blit(tiny.copy(),red),expected),{"actual":blit(tiny.copy(),red).tolist(),"expected":expected.tolist()})
    wrong=deepcopy(parts);next(p for p in wrong.parts if p.id=="hair_front").z=-1
    check("T021_order_affects_pixels",changed(render(wrong),source)>100)
    for bad in (float("nan"),float("inf")):
        try:render(parts,{"mouth":bad});rejected=False
        except ValueError:rejected=True
        check("T022_nonfinite_rejected",rejected)
    check("T022_range_clamp",effective_params(parts,{"head_yaw":7,"mouth":-1})["head_yaw"]==1 and effective_params(parts,{"mouth":-1})["mouth"]==0)
    analyses=[];singles={};predictions=[]
    for row in manifest["samples"]:
        if row["kind"] not in ("single","premium"):continue
        sid=row["id"];path=INPUTS/row["path"]
        record={"input_id":sid,"input_sha256":sha(path),"source_id":row["source_id"],"candidates":{}}
        for method in ("mediapipe","geometry"):
            t=time.perf_counter()
            try:
                image=rgba(path);analysis=analyzer.analyze(image,method=method)
                ref=evaluation_reference(sid) if sid.startswith("S-") and sid not in ("S-007","S-012","S-013","S-016") else {}
                centers=center_checks(analysis,ref)
                classification=analysis["status"]
                if any(not r["center_in_reference"] for r in centers.values()):classification="partial"
                if sid in ("S-004","S-005","S-006","S-010","HQ-001","HQ-002"):classification="partial"
                record["candidates"][method]={"classification":classification,"analysis":analysis,"reference_center_checks":centers,"wall_ms":round((time.perf_counter()-t)*1000,3)}
                if method=="mediapipe":
                    p=from_single(path,analyzer);singles[sid]=p
                    overlay=p.prepared.copy()
                    for key,b in p.regions.items():cv2.rectangle(overlay,tuple(b[:2]),tuple(b[2:]),(20,190,160,255),max(1,round(image.shape[1]/400)))
                    image_save(RESULTS/"recognition"/f"{sid}.png",overlay)
                    predictions.append((sid+" / "+classification,overlay))
            except SelectionRequired as e:
                record["candidates"][method]={"classification":"partial","reason":"explicit_target_selection_required","face_boxes":e.faces,"wall_ms":round((time.perf_counter()-t)*1000,3)}
                if method=="mediapipe":
                    selected=from_single(path,analyzer,target=0);singles[sid]=selected
                    check("T025_multiple_characters_require_selection",len(e.faces)>1)
            except (ValueError,OSError) as e:
                record["candidates"][method]={"classification":"failed","reason":str(e),"wall_ms":round((time.perf_counter()-t)*1000,3)}
        if sid in ("HQ-001","HQ-002"):
            record["quality_gate"]="partial: high-detail appearance and alpha/estimated-motion quality need further correction; detection is not quality approval"
        analyses.append(record)
        print("analysis",sid,{k:v["classification"] for k,v in record["candidates"].items()},flush=True)
    json_write(RESULTS/"recognition.json",{"evaluation_reference":"known procedural fixture boxes, evaluation only; HQ visual checks separate","records":analyses})
    fallback_records=[r["candidates"]["mediapipe"].get("analysis") for r in analyses if r["candidates"]["mediapipe"].get("analysis",{}).get("method")=="color-geometry"]
    check("T025_geometry_proposals_require_confirmation",bool(fallback_records) and all(not any(a["observed"].values()) for a in fallback_records))
    contact(predictions,RESULTS/"recognition-contact-sheet.png",4,(280,310))
    single=singles["S-001"]
    check("T026_no_preseparated_input",single.provenance["adapter"]=="single-v1" and len(single.parts)>=3)
    tiles=[]
    for key,p in [("parts",parts),("single",single),("split",split)]:tiles.extend(exercise(p,key,True))
    contact(tiles,RESULTS/"three-routes.png",5)
    high=singles.get("HQ-001")
    if high:
        tiles=exercise(high,"premium",True);contact(tiles,RESULTS/"premium-motion.png",5)
        neutral=render(high)
        face=high.face;x,y,x1,y1=face
        original=high.source[y:y1,x:x1,:3]
        actual=neutral[y:y1,x:x1,:3]
        opaque=neutral[y:y1,x:x1,3]==255
        check("T026_premium_neutral_visible_face_pixels_preserved",np.array_equal(actual[opaque],original[opaque]))
    # T023: actual CPU timings, not display FPS or camera-to-broadcast latency.
    timings=[];mode_tiles=[]
    for key,p in [("parts-512",parts),("premium-1254",high)]:
        if p is None:continue
        for mode in ("rigid","weighted"):
            values=dict(PARAMS,head_yaw=1,head_roll=1)
            render(p,values,mode)
            samples=[]
            for _ in range(3):
                t=time.perf_counter();frame=render(p,values,mode);samples.append((time.perf_counter()-t)*1000)
            baseline=render(p)
            lower=int(min(p.size[1],p.face[3]+(p.face[3]-p.face[1])*.55+2))
            lower_changed=changed(frame[lower:],baseline[lower:]) if lower<p.size[1] else None
            timings.append({"input":key,"mode":mode,"warmups":1,"repeats_ms":[round(v,3) for v in samples],"median_ms":round(float(np.median(samples)),3),"unchanged_neutral_pixels":changed(render(p,PARAMS,mode),baseline)==0,"lower_body_changed_pixels":lower_changed,"quality":"see images; no automatic aesthetic score","external_export":"parameter/texture mapping candidate only; target loading not tested"})
            mode_tiles.append((key+" / "+mode,frame))
    contact(mode_tiles,RESULTS/"deformation-comparison.png",2)
    json_write(RESULTS/"deformation.json",{"measurement":"CPU full-canvas evaluation, source-over plus remap; no Tk presentation or OBS", "records":timings})
    # T024: three actual replacement assets, stable bindings, other assets unchanged.
    replacements=[]
    for part_id in ("eye_left_open","hair_front","body"):
        p=deepcopy(parts);variant=deepcopy(parts)
        swap_part(variant,part_id,(.85,1.05,1.12),1.05)
        asset=deepcopy(next(q for q in variant.parts if q.id==part_id));asset.id=part_id+"-variant-v1"
        before_params=dict(p.params);before_other={q.id:hashlib.sha256(b"".join(im.tobytes() for im in q.states.values())).hexdigest() for q in p.parts if q.id!=part_id}
        replace_part(p,part_id,asset)
        after_other={q.id:hashlib.sha256(b"".join(im.tobytes() for im in q.states.values())).hexdigest() for q in p.parts if q.id!=part_id}
        check("T024_replace_preserves_parameters:"+part_id,p.params==before_params and before_other==after_other)
        check("T024_replacement_changes_pixels:"+part_id,changed(render(p),render(parts))>0)
        check("T024_replacement_motion_responds:"+part_id,changed(render(p,dict(PARAMS,eye_left=0,mouth=1)),render(p))>0)
        image_save(RESULTS/"swaps"/f"{part_id}.png",render(p,dict(PARAMS,mouth=.5)))
        save_project(p,RESULTS/"projects"/f"swap-{part_id}")
        replacements.append({"part_id":part_id,"replacement_asset_id":asset.id,"preserved_parameters":p.params==before_params,"other_assets_unchanged":before_other==after_other})
    try:replace_part(deepcopy(parts),"body",deepcopy(parts.parts[0]));rejected=False
    except ValueError:rejected=True
    check("T024_incompatible_replacement_rejected",rejected)
    json_write(RESULTS/"replacements.json",replacements)
    # T027: occlusion estimates vs restricted motion, with original untouched.
    completions=[];comp_tiles=[]
    for sid in ("S-004","S-005"):
        path=INPUTS/"single"/f"{sid}.png"
        for mode in ("restrict","mirror","inpaint"):
            p=from_single(path,analyzer,completion="restrict")
            # Explicit operator-confirmed locations isolate completion quality from detection error.
            for key,box in evaluation_reference(sid).items():correct_region(p,key,box)
            hidden="eye_left" if sid=="S-004" else "mouth"
            set_region_observed(p,hidden,False)
            rebuild_single(p,mode)
            check("T027_occluded_head_range_limited:"+sid+":"+mode,p.limits["head"]==.35)
            if mode in ("restrict","inpaint"):
                check("T027_hidden_motion_disabled:"+sid+":"+mode,not any(part.bind==hidden for part in p.parts))
            if sid=="S-004" and mode=="mirror":
                check("T027_mirror_is_marked_estimated",hidden in p.analysis["hidden_estimates"])
            frame=render(p,dict(PARAMS,eye_left=0,eye_right=0,mouth=1,head_roll=1))
            comp_tiles.append((sid+" / "+mode,frame));image_save(RESULTS/"completion"/f"{sid}-{mode}.png",frame)
            neutral=render(p)
            reference=rgba(INPUTS/"single/S-001.png");bx,by,bx1,by1=evaluation_reference(sid)[hidden]
            error=float(np.mean((neutral[by:by1,bx:bx1,:3].astype(float)-reference[by:by1,bx:bx1,:3])**2))
            burden={"restrict":"confirm limitation; no new feature artwork, hidden motion disabled","mirror":"review mirrored eye shape, highlight and edge; not an original restoration","inpaint":"review fill; no hidden eye/mouth artwork was produced; new artwork needed to enable feature"}[mode]
            completions.append({"input_id":sid,"mode":mode,"observed":p.analysis["observed"],"estimated_regions":p.analysis["estimated_regions"],"hidden_estimates":p.analysis["hidden_estimates"],"fill_only_regions":p.analysis["fill_only_regions"],"limits":p.limits,"effective_params":effective_params(p,dict(PARAMS,mouth=1,head_roll=1)),"neutral_changed_pixels":changed(neutral,p.prepared),"evaluation_only_hidden_reference_mse":round(error,3),"manual_setup_actions":len(p.corrections),"setup":"3 feature boxes and hidden flag explicitly operator-confirmed; not automatic detection success","correction_burden":burden,"real_user_correction_time":"not_measured","original_file_unchanged":sha(path)==input_hashes[path.relative_to(INPUTS).as_posix()]})
    contact(comp_tiles,RESULTS/"completion-comparison.png",3)
    json_write(RESULTS/"completion.json",{"truth":"mirror/inpaint are estimates, not recovered hidden artwork; operator-confirmed regions used for controlled comparison; unoccluded original used for evaluation only","records":completions})
    # T028: controlled wrong-location case, clearly distinguished from natural errors.
    p=deepcopy(single);correct=list(p.regions["mouth"]);wrong=[correct[0]+50,correct[1],correct[2]+50,correct[3]]
    correct_region(p,"mouth",wrong);before=render(p,dict(PARAMS,mouth=1))
    source_pixels=p.source.copy();correct_region(p,"mouth",correct);after=render(p,dict(PARAMS,mouth=1))
    check("T028_correction_changes_motion_region",changed(before,after)>0)
    check("T028_source_pixels_unchanged",np.array_equal(p.source,source_pixels))
    check("T028_other_feature_regions_preserved",p.regions["eye_left"]==single.regions["eye_left"] and p.regions["eye_right"]==single.regions["eye_right"])
    eye_correct=list(p.regions["eye_left"]);eye_wrong=[eye_correct[0]-20,eye_correct[1],eye_correct[2]-20,eye_correct[3]]
    correct_region(p,"eye_left",eye_wrong);eye_before=render(p,dict(PARAMS,eye_left=0))
    correct_region(p,"eye_left",eye_correct);eye_after=render(p,dict(PARAMS,eye_left=0))
    check("T028_eye_correction_changes_motion_region",changed(eye_before,eye_after)>0)
    check("T028_eye_correction_preserves_mouth",p.regions["mouth"]==correct)
    save_project(p,RESULTS/"projects/corrected")
    contact([("Injected +50px mouth error",before),("Corrected mouth proposal",after),("Injected -20px eye error",eye_before),("Corrected eye proposal",eye_after)],RESULTS/"correction-before-after.png",2)
    json_write(RESULTS/"correction.json",{"case":"controlled +50px mouth and -20px eye errors, not claimed natural recognition errors","mouth_before_box":wrong,"mouth_after_box":correct,"eye_before_box":eye_wrong,"eye_after_box":eye_correct,"center_error_vs_original_proposal_before_px":{"mouth":50,"eye_left":20},"after_px":{"mouth":0,"eye_left":0},"actions_executed":4,"source_preserved":True,"novice_user_validation":"not_run"})
    # T029: all prepared split cases, warning/failure results retained.
    split_records=[]
    for i in range(1,11):
        sid=f"L-{i:03d}"
        try:
            p=from_split(INPUTS/"split"/f"{sid}.json")
            classification="partial" if p.warnings else "success"
            frame=render(p);image_save(RESULTS/"split"/f"{sid}.png",frame)
            split_records.append({"input_id":sid,"classification":classification,"warnings":p.warnings,"role_suggestions":p.analysis["role_suggestions"],"part_count":len(p.parts)})
        except (ValueError,OSError) as e:split_records.append({"input_id":sid,"classification":"failed","reason":str(e)})
    expected_rejections={"L-003","L-005","L-007"}
    check("T029_known_invalid_structures_rejected",{r["input_id"] for r in split_records if r["classification"]=="failed"}==expected_rejections)
    ambiguous=from_split(INPUTS/"split/L-002.json")
    assignments={p.id:(p.role,p.side) for p in parts.parts}
    for part in ambiguous.parts:
        role,side=assignments[part.id];assign_role(ambiguous,part.id,role,side)
    check("T029_role_confirmation_responds",changed(render(ambiguous,dict(PARAMS,eye_left=0,mouth=1)),render(ambiguous))>0)
    json_write(RESULTS/"split.json",{"supported_experiment_format":"PNG bundle + explicit JSON pixel coordinates; PSD/Live2D not implemented","records":split_records})
    # Derived fixtures to verify nested group opacity and cycle handling.
    original_spec=json.loads((INPUTS/"split/L-001.json").read_text())
    group=deepcopy(original_spec)
    for row in group["layers"]:row["path"]="../../../phase02/assets/parts/"+Path(row["path"]).name
    group["groups"]=[{"id":"parent","opacity":.5},{"id":"child","parent":"parent","opacity":.5}]
    group["layers"][1]["group"]="child"
    gp=RESULTS/"fixtures/group-opacity.json";json_write(gp,group);pg=from_split(gp)
    check("T029_nested_group_opacity",next(p for p in pg.parts if p.id==group["layers"][1]["id"]).opacity==.25)
    group["groups"][0]["parent"]="child";cycle=RESULTS/"fixtures/group-cycle.json";json_write(cycle,group)
    try:from_split(cycle);rejected=False
    except ValueError as e:rejected=str(e)=="group_cycle"
    check("T029_group_cycle_rejected",rejected)
    # T030: imported routes share schema, renderer and parameter contract.
    contracts=[]
    for route,p in [("parts",parts),("single",single),("split",split)]:
        path=save_project(p,RESULTS/"projects"/route);d=json.loads(path.read_text(encoding="utf-8"))
        contracts.append({"route":route,"schema_version":d["schema_version"],"parameter_keys":sorted(d["params"]),"renderer":"engine.render","loaded_without_reanalysis":True})
    check("T030_same_schema_and_parameters",len({(r["schema_version"],tuple(r["parameter_keys"])) for r in contracts})==1)
    json_write(RESULTS/"common-contract.json",contracts)
    check("all_input_originals_preserved",all(sha(INPUTS/rel)==value for rel,value in input_hashes.items()))
    check("all_50_preparation_payloads_preserved",all(sha(INPUTS/rel)==value for rel,value in manifest["files"].items()))
    analyzer.close()
    report={"schema_version":1,"run_id":"phase03-001","timestamp_utc":datetime.now(timezone.utc).isoformat(),"config_id":CONFIG["id"],"config_sha256":sha(BASE/"config.json"),"code_sha256":{p.name:sha(p) for p in sorted(BASE.glob('*.py'))},"python":platform.python_version(),"dependencies":{name:importlib.metadata.version(name) for name in ("Pillow","numpy","opencv-contrib-python","mediapipe")},"model":json.loads((BASE/"models/source.json").read_text()),"environment_file":"../phase02/results/environment-current.json","environment_sha256":sha(BASE.parent/"phase02/results/environment-current.json"),"input_hashes":input_hashes,"checks":CHECKS,"passed":all(c["passed"] for c in CHECKS),"wall_seconds":round(time.perf_counter()-start,3),"scope":"technical feasibility on limited original fixtures; not full quality, novice observation, camera tracking, broadcasting or external-export verification"}
    json_write(RESULTS/"verification.json",report)
    print(f"Checks: {sum(c['passed'] for c in CHECKS)}/{len(CHECKS)}",flush=True)
    for c in CHECKS:
        if not c["passed"]:print("FAIL",c,flush=True)
    if not report["passed"]:raise SystemExit(1)


if __name__=="__main__":main()
