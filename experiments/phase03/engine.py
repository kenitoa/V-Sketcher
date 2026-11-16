"""Phase03: three import adapters, one project and one CPU rendering path.

Image recognition never reads fixture names, annotations or separated source parts.
MediaPipe is used only for image landmarks, never camera/microphone capture.
"""
from __future__ import annotations
from dataclasses import dataclass, field
from pathlib import Path
from copy import deepcopy
import hashlib
import json
import math
import re

import cv2
import numpy as np
from PIL import Image

BASE = Path(__file__).resolve().parent
INPUTS = BASE.parent / "phase02" / "assets"
CONFIG = json.loads((BASE / "config.json").read_text(encoding="utf-8"))
PARAMS = {"eye_left": 1.0, "eye_right": 1.0, "mouth": 0.0, "head_yaw": 0.0, "head_roll": 0.0}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def json_write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def rgba(path):
    with Image.open(path) as im:
        if im.width * im.height > CONFIG["max_input_pixels"]:
            raise ValueError("input_too_large_for_experiment")
        return np.array(im.convert("RGBA"))


def clipped_box(box, size):
    w, h = size
    x0, y0, x1, y1 = [int(round(float(x))) for x in box]
    return [max(0, min(w-1, x0)), max(0, min(h-1, y0)), max(1, min(w, x1)), max(1, min(h, y1))]


def alpha_bbox(image):
    nz = cv2.findNonZero((image[:, :, 3] > 8).astype(np.uint8))
    if nz is None:
        raise ValueError("empty_image")
    x, y, w, h = cv2.boundingRect(nz)
    return [x, y, x+w, y+h]


def blit(dst, src, origin=(0, 0), opacity=1.0):
    """Straight-alpha source-over with clipped local origins; no implicit resize."""
    x, y = [int(v) for v in origin]
    h, w = src.shape[:2]
    dh, dw = dst.shape[:2]
    x0, y0, x1, y1 = max(0, x), max(0, y), min(dw, x+w), min(dh, y+h)
    if x1 <= x0 or y1 <= y0:
        return dst
    s = src[y0-y:y1-y, x0-x:x1-x].astype(np.float32)/255
    d = dst[y0:y1, x0:x1].astype(np.float32)/255
    sa, da = s[:, :, 3:4]*opacity, d[:, :, 3:4]
    a = sa + da*(1-sa)
    rgb = (s[:, :, :3]*sa + d[:, :, :3]*da*(1-sa))/np.maximum(a, 1e-8)
    dst[y0:y1, x0:x1] = np.rint(np.concatenate([rgb, a], axis=2)*255).clip(0, 255).astype(np.uint8)
    return dst


@dataclass
class Part:
    id: str
    role: str
    side: str
    z: int
    origin: list[int]
    states: dict[str, np.ndarray]
    opacity: float = 1.0
    bind: str | None = None
    estimated: bool = False


@dataclass
class Project:
    name: str
    route: str
    size: tuple[int, int]
    parts: list[Part]
    face: list[int]
    regions: dict = field(default_factory=dict)
    source: np.ndarray | None = None
    prepared: np.ndarray | None = None
    analysis: dict = field(default_factory=dict)
    warnings: list[str] = field(default_factory=list)
    params: dict = field(default_factory=lambda: dict(PARAMS))
    limits: dict = field(default_factory=lambda: {"head": 1.0, "mouth": 1.0})
    corrections: list = field(default_factory=list)
    provenance: dict = field(default_factory=dict)


class SelectionRequired(ValueError):
    def __init__(self, faces):
        super().__init__("multiple_characters_select_target")
        self.faces = faces


class Analyzer:
    def __init__(self):
        import mediapipe as mp
        self.mp = mp
        model = BASE / "models" / "face_landmarker.task"
        source = json.loads((BASE / "models" / "source.json").read_text())
        if not model.is_file() or sha(model) != source["sha256"]:
            raise ValueError("model_missing_or_hash_mismatch; run setup_model.py")
        opts = mp.tasks.vision.FaceLandmarkerOptions(
            # Native model loading on Windows mishandles some Unicode absolute paths.
            base_options=mp.tasks.BaseOptions(model_asset_buffer=model.read_bytes()),
            num_faces=CONFIG["max_faces"],
            min_face_detection_confidence=CONFIG["face_detection_confidence"],
            min_face_presence_confidence=CONFIG["face_presence_confidence"])
        self.detector = mp.tasks.vision.FaceLandmarker.create_from_options(opts)

    def close(self):
        self.detector.close()

    def landmarks(self, image):
        rgb = image[:, :, :3].copy()
        # Composite transparent pixels onto neutral gray; hidden RGB is not evidence.
        alpha = image[:, :, 3:4]/255
        rgb = np.rint(rgb*alpha + 220*(1-alpha)).astype(np.uint8)
        result = self.detector.detect(self.mp.Image(image_format=self.mp.ImageFormat.SRGB, data=rgb))
        h, w = image.shape[:2]
        return [np.array([(p.x*w, p.y*h) for p in face], np.float32) for face in result.face_landmarks]

    @staticmethod
    def geometric(image):
        """Independent color/shape baseline; intentionally limited to warm face colors."""
        r, g, b = [image[:, :, i].astype(np.int16) for i in range(3)]
        mask = ((r > 130) & (r > g) & (g > b+8) & (r-g < 80) & (image[:, :, 3] > 32)).astype(np.uint8)
        count, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
        h, w = mask.shape
        candidates = []
        for x, y, bw, bh, area in stats[1:]:
            if area > w*h*.015 and bw > w*.1 and bh > h*.12 and x > 0 and y > 0 and x+bw < w and y+bh < h and y < h*.6:
                candidates.append((int(area), [int(x), int(y), int(x+bw), int(y+bh)]))
        if not candidates:
            return None
        _, face = max(candidates)
        x, y, x1, y1 = face
        # Occlusion can truncate the skin component; do not move a mouth into the eyes.
        y1=min(h,int(max(y1,y+(x1-x)*1.1)))
        face=[x,y,x1,y1]
        fw, fh = x1-x, y1-y
        return face, {"eye_right": [x+.16*fw, y+.32*fh, x+.39*fw, y+.57*fh],
                      "eye_left": [x+.61*fw, y+.32*fh, x+.84*fw, y+.57*fh],
                      "mouth": [x+.30*fw, y+.65*fh, x+.70*fw, y+.85*fh]}

    def analyze(self, image, target=None, method="mediapipe"):
        h, w = image.shape[:2]
        alpha_bbox(image)
        faces = self.landmarks(image) if method == "mediapipe" else []
        warnings = []
        if method == "mediapipe" and len(faces) > 1 and target is None:
            raise SelectionRequired([clipped_box([*p.min(axis=0), *p.max(axis=0)], (w, h)) for p in faces])
        if faces:
            if target is not None and not 0 <= target < len(faces):
                raise ValueError("target_index_out_of_range")
            p = faces[target or 0]
            face = clipped_box([*p.min(axis=0), *p.max(axis=0)], (w, h))
            fw, fh = face[2]-face[0], face[3]-face[1]
            regions = {}
            for key, indices in {"eye_right": [33,160,158,133,153,144], "eye_left": [362,385,387,263,373,380], "mouth": [61,40,37,0,267,270,291,321,314,17,84,91]}.items():
                q = p[indices]
                lo, hi = q.min(axis=0), q.max(axis=0)
                pad = np.array([fw*.035, fh*.065])
                regions[key] = clipped_box([*(lo-pad), *(hi+pad)], (w, h))
                if key.startswith("eye"):
                    regions[key]=refine_eye(image,regions[key],face)
            # The pixel refinement searches a bounded landmark proposal, not fixture metadata.
            regions["mouth"] = refine_mouth(image, regions["mouth"], face)
        else:
            fallback = self.geometric(image)
            if fallback is None:
                raise ValueError("character_or_face_not_found")
            face, regions = fallback
            regions = {k: clipped_box(v, (w, h)) for k, v in regions.items()}
            warnings.append("color_geometry_estimate_requires_confirmation")
        visible = {}
        for key, box in regions.items():
            x, y, x1, y1 = box
            patch = image[y:y1, x:x1, :3]
            lum = cv2.cvtColor(patch, cv2.COLOR_RGB2GRAY)
            span = float(np.percentile(lum, 95)-np.percentile(lum, 5))
            visible[key] = bool(faces and span > (38 if key.startswith("eye") else 22) and (np.percentile(lum, 90) > 175 if key.startswith("eye") else True))
            if not visible[key]:
                warnings.append(f"unobserved_or_low_contrast:{key}")
        return {"method": method if faces else "color-geometry", "model_face_count": len(faces),
                "target": target, "face": face, "regions": regions, "observed": visible,
                "warnings": warnings, "status": "success" if all(visible.values()) and faces else "partial"}


def refine_mouth(image, proposal, face):
    x, y, x1, y1 = proposal
    fh = face[3]-face[1]
    y = max(0, int(y-fh*.06))
    patch = image[y:y1, x:x1, :3]
    if patch.size == 0:
        return proposal
    gray = cv2.cvtColor(patch, cv2.COLOR_RGB2GRAY)
    # Works on outlined mouths; low-contrast shaded lips retain model proposal.
    mask = ((gray < 95) & (image[y:y1, x:x1, 3] > 100)).astype(np.uint8)
    n, _, stats, _ = cv2.connectedComponentsWithStats(mask)
    components = [s for s in stats[1:] if s[2] > patch.shape[1]*.45 and s[2] > s[3]*1.6 and s[4] > 5
                  and abs(s[0]+s[2]/2-patch.shape[1]/2)<patch.shape[1]*.25]
    if not components:
        return proposal
    bx, by, bw, bh, _ = max(components, key=lambda s: s[4])
    pad = max(3, int(bw*.12))
    return clipped_box([x+bx-pad, y+by-pad, x+bx+bw+pad, y+by+bh+pad], (image.shape[1], image.shape[0]))


def refine_eye(image, proposal, face):
    x,y,x1,y1=proposal
    pad=max(2,int((face[3]-face[1])*.06))
    x,y,x1,y1=clipped_box([x-pad,y-pad,x1+pad,y1+pad],(image.shape[1],image.shape[0]))
    patch=image[y:y1,x:x1,:3]
    mask=((np.min(patch,axis=2)>215)&(np.max(patch,axis=2).astype(np.int16)-np.min(patch,axis=2)<45)).astype(np.uint8)
    _,_,stats,_=cv2.connectedComponentsWithStats(mask)
    options=[s for s in stats[1:] if s[2]>(proposal[2]-proposal[0])*.45 and s[0]>0 and s[1]>0 and s[0]+s[2]<patch.shape[1] and s[1]+s[3]<patch.shape[0]]
    if not options:return proposal
    bx,by,bw,bh,_=max(options,key=lambda s:s[4])
    margin=max(2,round(bw*.12))
    return clipped_box([x+bx-margin,y+by-margin,x+bx+bw+margin,y+by+bh+margin],(image.shape[1],image.shape[0]))


def foreground(image, analysis):
    out = image.copy()
    h, w = image.shape[:2]
    if np.min(image[:, :, 3]) == 255:
        # A bounded classical baseline, not claimed as high-quality hair matting.
        small = cv2.resize(image[:, :, :3], (min(w, 512), max(2, round(h*min(w,512)/w))))
        sh, sw = small.shape[:2]
        samples = np.vstack([small[:max(1,sh//25), :max(1,sw//12)].reshape(-1,3), small[:max(1,sh//25), -max(1,sw//12):].reshape(-1,3)])
        bg = np.median(samples, axis=0)
        distance = np.max(np.abs(small.astype(np.float32)-bg), axis=2)
        mask = np.where(distance < 10, cv2.GC_BGD, np.where(distance > 38, cv2.GC_PR_FGD, cv2.GC_PR_BGD)).astype(np.uint8)
        x, y, x1, y1 = analysis["face"]
        sx, sy = sw/w, sh/h
        cv2.ellipse(mask, (int((x+x1)*sx/2), int((y+y1)*sy/2)), (max(2,int((x1-x)*sx*.25)), max(2,int((y1-y)*sy*.3))), 0, 0, 360, cv2.GC_FGD, -1)
        if np.any(mask == cv2.GC_BGD):
            cv2.setRNGSeed(20261116)
            cv2.grabCut(small, mask, None, np.zeros((1,65),np.float64), np.zeros((1,65),np.float64), 3, cv2.GC_INIT_WITH_MASK)
            a = np.where((mask == cv2.GC_FGD)|(mask == cv2.GC_PR_FGD),255,0).astype(np.uint8)
            # Protect enclosed pale skin/fabric regions, without filling border-connected background.
            n,labels,stats,centers=cv2.connectedComponentsWithStats((a==0).astype(np.uint8))
            for i in range(1,n):
                bx,by,bw,bh,area=stats[i];cx,cy=centers[i]
                if bx>0 and by>0 and bx+bw<sw and by+bh<sh and x*sx<cx<x1*sx and cy>y*sy:
                    a[labels==i]=255
            out[:, :, 3] = cv2.resize(a, (w,h), interpolation=cv2.INTER_LINEAR)
            analysis["warnings"].append("estimated_background_mask_check_fine_hair")
    if analysis["model_face_count"] > 1:
        x,y,x1,y1=analysis["face"]
        center=(x+x1)/2
        radius=(x1-x)*.88
        left,right=max(0,int(center-radius)),min(w,int(center+radius))
        out[:, :left, 3]=0
        out[:, right:, 3]=0
        analysis["warnings"].append("target_extent_estimated_check_crop")
    return out


def from_single(path, analyzer, target=None, completion="restrict", method="mediapipe"):
    image = rgba(path)
    analysis = analyzer.analyze(image, target, method)
    prepared = foreground(image, analysis)
    project = Project(Path(path).stem, "single", (image.shape[1],image.shape[0]), [], analysis["face"],
                      deepcopy(analysis["regions"]), image, prepared, analysis,
                      list(analysis["warnings"]), provenance={"input_sha256":sha(path), "adapter":"single-v1"})
    return rebuild_single(project, completion)


def rebuild_single(project, completion="restrict"):
    image = project.prepared
    h,w=image.shape[:2]
    hole = np.zeros((h,w),np.uint8)
    feature_parts=[];hidden_estimates=[];fill_only=[]
    for key, box in project.regions.items():
        x,y,x1,y1=clipped_box(box, project.size)
        if x1<=x or y1<=y:
            raise ValueError("invalid_correction_region")
        observed=project.analysis["observed"].get(key,False)
        source = image[y:y1,x:x1].copy()
        estimated=False
        if not observed:
            other="eye_right" if key=="eye_left" else "eye_left"
            if completion=="mirror" and key.startswith("eye") and project.analysis["observed"].get(other):
                ox,oy,ox1,oy1=project.regions[other]
                source=cv2.resize(image[oy:oy1,ox:ox1][:,::-1],(x1-x,y1-y))
                estimated=True
                hidden_estimates.append(key)
            elif completion=="inpaint":
                cv2.ellipse(hole,((x+x1)//2,(y+y1)//2),(max(1,(x1-x)//2),max(1,(y1-y)//2)),0,0,360,255,-1)
                fill_only.append(key)
                continue
            else:
                continue
        mask=np.zeros((y1-y,x1-x),np.uint8)
        cv2.ellipse(mask,(mask.shape[1]//2,mask.shape[0]//2),(max(1,mask.shape[1]//2),max(1,mask.shape[0]//2)),0,0,360,255,-1)
        source[:,:,3]=np.minimum(source[:,:,3],mask)
        hole[y:y1,x:x1]=np.maximum(hole[y:y1,x:x1],mask)
        if key.startswith("eye"):
            closed=np.zeros_like(source)
            thickness=max(2,round((y1-y)*.1))
            gray=cv2.cvtColor(source[:,:,:3],cv2.COLOR_RGB2GRAY)
            ink_pixels=source[:,:,:3][source[:,:,3]>0]
            ink=tuple(int(c) for c in ink_pixels[np.argmin(gray[source[:,:,3]>0])]) if len(ink_pixels) else (40,40,50)
            xs=np.linspace((x1-x)*.10,(x1-x)*.90,24)
            ys=(y1-y)*.48+np.sin(np.linspace(0,math.pi,24))*(y1-y)*.12
            curve=np.rint(np.column_stack([xs,ys])).astype(np.int32)
            cv2.polylines(closed,[curve],False,(*ink,255),max(1,thickness//2),cv2.LINE_AA)
            states={"open":source,"closed":closed}
        else:
            # A small inferred inner opening; keep original lip/skin texture around it.
            # This is explicitly not a reconstructed mouth interior.
            ph,pw=source.shape[:2]
            yy,xx=np.mgrid[:ph,:pw].astype(np.float32)
            cx,cy=pw/2,ph/2
            sigma=max(2,pw*.23)
            shift=np.sign(yy-cy)*min(ph*.06,pw*.035)*np.exp(-((xx-cx)/sigma)**2)*np.exp(-((yy-cy)/max(2,ph*.3))**2)
            opened=cv2.remap(source,xx,yy-shift,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT)
            gray=cv2.cvtColor(source[:,:,:3],cv2.COLOR_RGB2GRAY)
            valid=source[:,:,3]>0
            candidates=source[:,:,:3][valid]
            color=tuple(int(c*.4) for c in candidates[np.argmin(gray[valid])]) if len(candidates) else (40,20,30)
            cv2.ellipse(opened,(pw//2,ph//2),(max(2,int(pw*.3)),max(2,int(min(ph*.17,pw*.07)))),0,0,360,(*color,255),-1,lineType=cv2.LINE_AA)
            opened[:,:,3]=np.minimum(opened[:,:,3],mask)
            states={"closed":source,"open":opened}
        feature_parts.append(Part(key,key,"left" if key.endswith("left") else "right" if key.endswith("right") else "center",10,[x,y],states,bind=key,estimated=True))
    base=image.copy()
    if np.any(hole):
        # Copy only hole pixels back; inpaint is an estimate and never original restoration.
        filled=cv2.inpaint(cv2.cvtColor(image[:,:,:3],cv2.COLOR_RGB2BGR),hole,3,cv2.INPAINT_TELEA)
        base[hole>0,:3]=cv2.cvtColor(filled,cv2.COLOR_BGR2RGB)[hole>0]
    project.parts=[Part("base","base","center",0,[0,0],{"base":base})]+feature_parts
    project.limits={"head":CONFIG["occluded_head_limit"] if not all(project.analysis["observed"].values()) else 1.0,"mouth":CONFIG["safe_mouth_open"]}
    project.analysis["completion"]=completion
    project.analysis["estimated_regions"]=[p.id for p in feature_parts if p.estimated]
    project.analysis["hidden_estimates"]=hidden_estimates
    project.analysis["fill_only_regions"]=fill_only
    return project


def suggest_role(name, bbox, size):
    s=name.lower()
    for term,role in [("eye","eye"),("눈","eye"),("mouth","mouth"),("입","mouth"),("hair","hair"),("머리카락","hair"),("head","head"),("얼굴","head"),("body","body"),("몸","body"),("accessory","accessory")]:
        if term in s:
            side="left" if "left" in s or "왼" in s else "right" if "right" in s or "오른" in s else "center"
            return role,side,"name"
    x,y,x1,y1=bbox; w,h=size
    if .28*h < (y+y1)/2 < .48*h and x1-x < .25*w and y1-y < .2*h:
        return "eye","left" if (x+x1)/2>w/2 else "right","position-estimate"
    if .47*h < (y+y1)/2 < .60*h and x1-x < .3*w and y1-y < .16*h:
        return "mouth","center","position-estimate"
    return "unassigned","center","confirmation-required"


def from_split(path):
    path=Path(path)
    spec=json.loads(path.read_text(encoding="utf-8"))
    size=tuple(spec["canvas"])
    parts=[];ids=set();warnings=[]; suggestions=[]
    groups={g["id"]:g for g in spec.get("groups",[])}
    for gid in groups:
        seen=set();current=gid
        while current:
            if current in seen:raise ValueError("group_cycle")
            seen.add(current)
            if current not in groups:raise ValueError("group_parent_missing")
            current=groups[current].get("parent")
    for i,row in enumerate(spec["layers"]):
        if row["id"] in ids:
            raise ValueError("duplicate_part_id")
        ids.add(row["id"])
        origin=row.get("origin")
        if not isinstance(origin,list) or len(origin)!=2 or not all(isinstance(v,(int,float)) and math.isfinite(v) for v in origin):
            raise ValueError("coordinates_missing_or_invalid")
        resource=(path.parent/row["path"]).resolve()
        if not resource.is_relative_to(INPUTS.resolve()) and not resource.is_relative_to(path.parent.resolve()):
            raise ValueError("resource_outside_input_bundle")
        if not resource.is_file():
            raise ValueError("resource_missing")
        im=rgba(resource)
        try: localbox=alpha_bbox(im)
        except ValueError:
            warnings.append(f"empty_optional_layer:{row['id']}");continue
        bbox=[localbox[j]+origin[j%2] for j in range(4)]
        role,side,reason=suggest_role(row.get("name",""),bbox,size)
        if row.get("role"):
            role=row["role"];side=row.get("side",side);reason="explicit-role"
        if role=="eye":
            geometric_side="left" if (bbox[0]+bbox[2])/2>size[0]/2 else "right"
            if side in ("left","right") and side!=geometric_side:
                warnings.append(f"side_conflict:{row['id']}")
        if reason in ("position-estimate","confirmation-required"):
            warnings.append(f"confirm_role:{row['id']}")
        opacity=float(row.get("opacity",1))
        gid=row.get("group")
        while gid:
            if gid not in groups:raise ValueError("layer_group_missing")
            opacity*=float(groups[gid].get("opacity",1));gid=groups[gid].get("parent")
        if not math.isfinite(opacity) or not 0<=opacity<=1:raise ValueError("invalid_opacity")
        if row.get("blend_mode","normal")!="normal":warnings.append(f"unsupported_blend_mode:{row['id']}")
        bind=f"eye_{side}" if role=="eye" and side in ("left","right") else "mouth" if role=="mouth" else None
        states={"open" if role=="eye" else "closed" if role=="mouth" else "base":im}
        parts.append(Part(row["id"],role,side,int(row.get("z",i)),[int(v) for v in origin],states,opacity,bind))
        suggestions.append({"id":row["id"],"role":role,"side":side,"reason":reason})
    roles={p.role for p in parts}
    for required in ("head","body","eye","mouth"):
        if required not in roles:warnings.append(f"missing_role:{required}")
    head_z=max((p.z for p in parts if p.role=="head"),default=-100)
    for part in parts:
        if part.role in ("eye","mouth","hair_front") and part.z<head_z:warnings.append(f"check_visual_order:{part.id}")
    # Existing bundle contains static states only; derive an explicit limited preview state.
    for p in parts:
        if p.bind:
            current=next(iter(p.states.values()))
            bb=alpha_bbox(current);x,y,x1,y1=bb
            if p.role=="eye":
                alt=np.zeros_like(current);strip=cv2.resize(current[y:y1,x:x1],(x1-x,max(2,(y1-y)//10)),interpolation=cv2.INTER_AREA)
                cy=(y+y1-strip.shape[0])//2;alt[cy:cy+strip.shape[0],x:x1]=strip;p.states["closed"]=alt
            else:
                alt=current.copy();cv2.ellipse(alt,((x+x1)//2,(y+y1)//2),(max(2,(x1-x)//3),max(3,(y1-y)//2)),0,0,360,(70,35,50,255),-1);p.states["open"]=alt;p.estimated=True
    heads=[p for p in parts if p.role=="head"]
    face=alpha_bbox(heads[0].states["base"]) if heads else [int(size[0]*.25),int(size[1]*.15),int(size[0]*.75),int(size[1]*.65)]
    if heads:face=[v+heads[0].origin[j%2] for j,v in enumerate(face)]
    return Project(path.stem,"split",size,parts,face,analysis={"role_suggestions":suggestions,"groups":deepcopy(spec.get("groups",[])),"group_transform_support":"opacity-only; transforms unsupported"},warnings=warnings,provenance={"input_sha256":sha(path),"adapter":"split-v1"})


def from_parts(path=INPUTS/"parts/library.json"):
    spec=json.loads(Path(path).read_text(encoding="utf-8"))
    indexed={p["id"]:p for p in spec["parts"]}
    parts=[]
    for z,pid in enumerate(spec["default_order"]):
        row=indexed[pid]
        states={row["state"]:rgba(INPUTS/row["path"])}
        if row["role"] in ("eye","mouth"):
            for other in spec["parts"]:
                if other["role"]==row["role"] and other["side"]==row["side"]:
                    states[other["state"]]=rgba(INPUTS/other["path"])
        bind=f"eye_{row['side']}" if row["role"]=="eye" else "mouth" if row["role"]=="mouth" else None
        parts.append(Part(pid,row["role"],row["side"],z,row["origin"],states,bind=bind))
    face=alpha_bbox(next(p for p in parts if p.role=="head").states["base"])
    return Project("PARTS-001","parts",tuple(spec["canvas"]),parts,face,provenance={"input_sha256":sha(path),"adapter":"parts-v1"})


def effective_params(project, params):
    values=dict(PARAMS)
    for key,val in params.items():
        if key not in values:raise ValueError("unknown_parameter")
        if not isinstance(val,(int,float)) or not math.isfinite(val):raise ValueError("non_finite_parameter")
        values[key]=max(-1 if key.startswith("head") else 0,min(1,float(val)))
    values["mouth"]=min(project.limits["mouth"],values["mouth"])
    for key in ("head_yaw","head_roll"):
        values[key]=max(-project.limits["head"],min(project.limits["head"],values[key]))
    return values


def render(project, params=None, mode="weighted"):
    v=effective_params(project,project.params if params is None else params)
    w,h=project.size
    out=np.zeros((h,w,4),np.uint8)
    for part in sorted(project.parts,key=lambda p:p.z):
        if part.bind and "open" in part.states and "closed" in part.states:
            if part.bind.startswith("eye") and 0<v[part.bind]<1:
                opened=part.states["open"]
                x,y,x1,y1=alpha_bbox(opened)
                height=max(1,round((y1-y)*v[part.bind]))
                strip=cv2.resize(opened[y:y1,x:x1],(x1-x,height),interpolation=cv2.INTER_AREA)
                im=np.zeros_like(opened)
                im[(y+y1-height)//2:(y+y1-height)//2+height,x:x1]=strip
                blit(out,im,part.origin,part.opacity)
                continue
            t=v[part.bind]
            if part.bind.startswith("eye"):
                t=1-t
            # Blend straight RGBA states in premultiplied space to avoid dark fringes.
            opened=part.states["closed" if part.bind.startswith("eye") else "open"]
            closed=part.states["open" if part.bind.startswith("eye") else "closed"]
            a=opened[:,:,3:4].astype(np.float32)/255;b=closed[:,:,3:4].astype(np.float32)/255
            alpha=a*t+b*(1-t)
            rgb=(opened[:,:,:3]*a*t+closed[:,:,:3]*b*(1-t))/np.maximum(alpha,1e-8)
            im=np.rint(np.concatenate([rgb,alpha*255],axis=2)).clip(0,255).astype(np.uint8)
        else:im=next(iter(part.states.values()))
        blit(out,im,part.origin,part.opacity)
    if v["head_yaw"]==0 and v["head_roll"]==0:
        return out
    return head_warp(out,project.face,v["head_yaw"],v["head_roll"],mode)


def head_warp(image, face, yaw, roll, mode):
    h,w=image.shape[:2];x,y,x1,y1=face;cx,cy=(x+x1)/2,(y+y1)/2
    angle=math.radians(roll*CONFIG["head_roll_degrees"])
    dx=yaw*(x1-x)*CONFIG["head_yaw_face_width_fraction"]
    yy,xx=np.mgrid[:h,:w].astype(np.float32)
    if mode=="weighted":
        weight=np.clip((y1+(y1-y)*.55-yy)/max(1,(y1-y)*.55),0,1)
        weight=weight*weight*(3-2*weight)
    elif mode=="rigid":weight=np.ones_like(xx)
    else:raise ValueError("unknown_deformation_mode")
    a=-angle*weight
    mx=cx+(xx-cx-dx*weight)*np.cos(a)-(yy-cy)*np.sin(a)
    my=cy+(xx-cx-dx*weight)*np.sin(a)+(yy-cy)*np.cos(a)
    data=image.astype(np.float32)/255
    data[:,:,:3]*=data[:,:,3:4]
    warped=cv2.remap(data,mx.astype(np.float32),my.astype(np.float32),cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    warped[:,:,:3]/=np.maximum(warped[:,:,3:4],1e-8)
    return np.rint(warped*255).clip(0,255).astype(np.uint8)


def correct_region(project,key,box):
    if project.route!="single" or key not in ("eye_left","eye_right","mouth"):
        raise ValueError("correction_requires_single_image_feature")
    box=clipped_box(box,project.size)
    if box[2]<=box[0]+2 or box[3]<=box[1]+2:raise ValueError("correction_region_too_small")
    before=deepcopy(project.regions.get(key))
    project.regions[key]=box
    project.analysis["observed"][key]=True
    project.corrections.append({"feature":key,"before":before,"after":box,"type":"manual-region-confirmation"})
    return rebuild_single(project,project.analysis.get("completion","restrict"))


def set_region_observed(project,key,observed):
    if project.route!="single" or key not in project.regions:raise ValueError("unknown_single_image_feature")
    project.analysis["observed"][key]=bool(observed)
    project.corrections.append({"type":"visibility-confirmed","feature":key,"observed":bool(observed)})
    return rebuild_single(project,project.analysis.get("completion","restrict"))


def swap_part(project,part_id,color=None,scale=1.0):
    if not .7<=scale<=1.3:raise ValueError("swap_scale_out_of_range")
    part=next(p for p in project.parts if p.id==part_id)
    for key,im in list(part.states.items()):
        result=im.copy()
        if color is not None:
            mask=result[:,:,3]>0
            # Hue/value preserving multiplicative tint, not a replacement texture.
            result[mask,:3]=np.rint(result[mask,:3].astype(np.float32)*np.array(color)).clip(0,255).astype(np.uint8)
        if scale!=1:
            x,y,x1,y1=alpha_bbox(result);patch=result[y:y1,x:x1]
            patch=cv2.resize(patch,None,fx=scale,fy=scale,interpolation=cv2.INTER_LINEAR)
            result[:]=0
            blit(result,patch,(int((x+x1-patch.shape[1])/2),int((y+y1-patch.shape[0])/2)))
        part.states[key]=result
    return project


def replace_part(project,part_id,replacement):
    index=next(i for i,p in enumerate(project.parts) if p.id==part_id)
    previous=project.parts[index]
    if (previous.role,previous.side)!=(replacement.role,replacement.side):raise ValueError("replacement_role_or_side_incompatible")
    updated=deepcopy(replacement)
    updated.id=previous.id;updated.bind=previous.bind;updated.z=previous.z;updated.origin=list(previous.origin)
    project.parts[index]=updated
    project.corrections.append({"type":"part-replaced","part_id":part_id,"replacement_asset_id":replacement.id,"preserved":["binding","origin","z","parameters"]})
    return project


def assign_role(project,part_id,role,side="center"):
    if role not in ("eye","mouth","head","body","hair_front","hair_back","accessory","unassigned"):
        raise ValueError("unknown_role")
    if role=="eye" and side not in ("left","right"):raise ValueError("eye_side_required")
    part=next(p for p in project.parts if p.id==part_id)
    original=next(iter(part.states.values())).copy()
    part.role=role;part.side=side
    part.bind=f"eye_{side}" if role=="eye" else "mouth" if role=="mouth" else None
    if role=="eye":
        x,y,x1,y1=alpha_bbox(original);closed=np.zeros_like(original)
        strip=cv2.resize(original[y:y1,x:x1],(x1-x,max(2,(y1-y)//10)),interpolation=cv2.INTER_AREA)
        cy=(y+y1-strip.shape[0])//2;closed[cy:cy+strip.shape[0],x:x1]=strip
        part.states={"open":original,"closed":closed}
    elif role=="mouth":
        x,y,x1,y1=alpha_bbox(original);opened=original.copy()
        cv2.ellipse(opened,((x+x1)//2,(y+y1)//2),(max(2,(x1-x)//3),max(2,(y1-y)//2)),0,0,360,(70,35,50,255),-1)
        part.states={"closed":original,"open":opened};part.estimated=True
    else:part.states={"base":original}
    project.corrections.append({"type":"role-confirmed","part_id":part_id,"role":role,"side":side})
    return project


def save_project(project, folder):
    folder=Path(folder);folder.mkdir(parents=True,exist_ok=True)
    records=[]
    for i,part in enumerate(project.parts):
        states={}
        for key,im in part.states.items():
            rel=f"textures/{i:02d}-{key}.png";p=folder/rel;p.parent.mkdir(exist_ok=True)
            Image.fromarray(im).save(p);states[key]={"path":rel,"sha256":sha(p)}
        records.append({"id":part.id,"role":part.role,"side":part.side,"z":part.z,"origin":part.origin,"opacity":part.opacity,"bind":part.bind,"estimated":part.estimated,"states":states})
    for name,im in [("source",project.source),("prepared",project.prepared)]:
        if im is not None:Image.fromarray(im).save(folder/f"{name}.png")
    data={"schema_version":1,"name":project.name,"route":project.route,"canvas":project.size,"parts":records,"face":project.face,"regions":project.regions,
          "source": "source.png" if project.source is not None else None,"prepared":"prepared.png" if project.prepared is not None else None,
          "analysis":project.analysis,"warnings":project.warnings,"params":project.params,"limits":project.limits,"corrections":project.corrections,"provenance":project.provenance}
    json_write(folder/"project.json",data)
    return folder/"project.json"


def load_project(path):
    path=Path(path);d=json.loads(path.read_text(encoding="utf-8"))
    if d.get("schema_version")!=1:raise ValueError("unsupported_experiment_schema")
    parts=[]
    for row in d["parts"]:
        images={}
        for key,value in row["states"].items():
            p=(path.parent/value["path"]).resolve()
            if not p.is_relative_to(path.parent.resolve()) or sha(p)!=value["sha256"]:raise ValueError("texture_integrity")
            images[key]=rgba(p)
        parts.append(Part(row["id"],row["role"],row["side"],row["z"],row["origin"],images,row["opacity"],row["bind"],row["estimated"]))
    return Project(d["name"],d["route"],tuple(d["canvas"]),parts,d["face"],d["regions"],rgba(path.parent/d["source"]) if d["source"] else None,
                   rgba(path.parent/d["prepared"]) if d["prepared"] else None,d["analysis"],d["warnings"],d["params"],d["limits"],d["corrections"],d["provenance"])
