"""Local Tk feasibility UI; all routes call engine.render with identical controls."""
import argparse
from pathlib import Path
from copy import deepcopy
import math
import re
import time
import tkinter as tk
from tkinter import ttk, filedialog
from PIL import Image, ImageTk, ImageDraw
import numpy as np

from engine import (BASE, INPUTS, PARAMS, Analyzer, SelectionRequired, from_single,
                    from_parts, from_split, render, correct_region, rebuild_single,
                    save_project, load_project, swap_part, replace_part, set_region_observed)


class App:
    def __init__(self, root, project_path=None):
        self.root=root;self.project=None;self.analyzer=None;self.drag=None;self.display=None
        self.last_signature=None;self.revision=0
        self.root.title("2DSketcher · 03 가능성 검증")
        self.root.geometry("1180x960")
        self.root.minsize(1040,900)
        self.root.configure(bg="#131921")
        style=ttk.Style();style.theme_use("clam")
        style.configure(".",font=("Malgun Gothic",10),background="#1d2632",foreground="#e8edf5")
        style.configure("TButton",padding=(10,7),background="#34455a",borderwidth=0)
        style.map("TButton",background=[("active","#466080")])
        style.configure("TCombobox",fieldbackground="#edf1f6",foreground="#14202f",padding=5)
        style.configure("TCheckbutton",background="#1d2632")
        header=tk.Frame(root,bg="#131921",padx=22,pady=15);header.pack(fill="x")
        tk.Label(header,text="2DSketcher",bg="#131921",fg="#f1f4f8",font=("Segoe UI",22,"bold")).pack(side="left")
        tk.Label(header,text="03  /  세 입력 경로 · 2D 움직임 실험",bg="#131921",fg="#a7bacf",font=("Malgun Gothic",11)).pack(side="left",padx=24)
        body=tk.Frame(root,bg="#131921");body.pack(fill="both",expand=True,padx=18,pady=(0,10))
        left=tk.Frame(body,bg="#1d2632",width=328,padx=16,pady=12);left.pack(side="left",fill="y");left.pack_propagate(False)
        right=tk.Frame(body,bg="#131921");right.pack(side="left",fill="both",expand=True,padx=(14,0))
        self.canvas=tk.Canvas(right,bg="#dfe4eb",highlightthickness=0);self.canvas.pack(fill="both",expand=True)
        self.status=tk.StringVar(value="입력을 선택해 불러오세요. 카메라·마이크 없이 시험합니다.")
        tk.Label(right,textvariable=self.status,bg="#131921",fg="#c3d0df",wraplength=760,justify="left",anchor="w",font=("Malgun Gothic",10),pady=10).pack(fill="x")
        def label(text):ttk.Label(left,text=text,font=("Malgun Gothic",10,"bold")).pack(anchor="w",pady=(9,4))
        label("1. 시작할 자료")
        self.route=tk.StringVar(value="한 장 그림")
        route=ttk.Combobox(left,textvariable=self.route,values=["한 장 그림","파츠 조합","분리 그림"],state="readonly");route.pack(fill="x")
        route.bind("<<ComboboxSelected>>",lambda e:self.update_inputs())
        self.input=tk.StringVar();self.input_combo=ttk.Combobox(left,textvariable=self.input,state="readonly");self.input_combo.pack(fill="x",pady=5)
        ttk.Button(left,text="선택 자료 불러오기",command=self.open_selected).pack(fill="x")
        tools=ttk.Frame(left);tools.pack(fill="x",pady=5)
        ttk.Button(tools,text="내 파일…",command=self.open_file).pack(side="left",expand=True,fill="x",padx=(0,4))
        ttk.Button(tools,text="저장본 열기…",command=self.open_saved).pack(side="left",expand=True,fill="x")
        label("2. 눈·입·고개 직접 움직이기")
        self.controls={};self.scales={}
        names={"eye_left":"왼눈 열림","eye_right":"오른눈 열림","mouth":"입 벌림","head_yaw":"고개 좌우 · 평면 이동","head_roll":"고개 기울기 · 최대 6°"}
        for key,value in PARAMS.items():
            row=tk.Frame(left,bg="#1d2632");row.pack(fill="x")
            tk.Label(row,text=names[key],bg="#1d2632",fg="#c7d4e2",font=("Malgun Gothic",9)).pack(anchor="w")
            var=tk.DoubleVar(value=value);self.controls[key]=var
            scale=tk.Scale(row,variable=var,from_=-1 if key.startswith("head") else 0,to=1,resolution=.01,orient="horizontal",length=275,bg="#1d2632",fg="#c7d4e2",highlightthickness=0,troughcolor="#394b61",activebackground="#7dd4c7",font=("Segoe UI",8),width=10)
            scale.pack(fill="x");self.scales[key]=scale
        row=ttk.Frame(left);row.pack(fill="x",pady=5)
        self.play=tk.BooleanVar(value=False)
        ttk.Checkbutton(row,text="예제 재생",variable=self.play).pack(side="left")
        ttk.Button(row,text="중립 복원",command=self.reset).pack(side="right")
        self.mode=tk.StringVar(value="weighted")
        ttk.Combobox(left,textvariable=self.mode,values=["weighted","rigid"],state="readonly").pack(fill="x",pady=4)
        label("3. 틀린 위치 고치기")
        self.handles=tk.BooleanVar(value=False)
        ttk.Checkbutton(left,text="눈·입 표시점을 끌어서 수정",variable=self.handles).pack(anchor="w")
        self.feature=tk.StringVar(value="mouth")
        feature_row=ttk.Frame(left);feature_row.pack(fill="x",pady=4)
        ttk.Combobox(feature_row,textvariable=self.feature,values=["eye_left","eye_right","mouth"],state="readonly",width=12).pack(side="left")
        ttk.Button(feature_row,text="가려짐 표시/해제",command=self.toggle_observed).pack(side="right")
        self.region_scale=tk.DoubleVar(value=1.0)
        row=ttk.Frame(left);row.pack(fill="x")
        ttk.Spinbox(row,from_=.5,to=1.5,increment=.1,textvariable=self.region_scale,width=5).pack(side="left")
        ttk.Button(row,text="영역 크기 적용",command=self.resize_region).pack(side="right")
        self.completion=tk.StringVar(value="restrict")
        combo=ttk.Combobox(left,textvariable=self.completion,values=["restrict","mirror","inpaint"],state="readonly");combo.pack(fill="x",pady=5)
        combo.bind("<<ComboboxSelected>>",lambda e:self.change_completion())
        ttk.Button(left,text="파츠 색·크기 교체 시험",command=self.swap).pack(fill="x",pady=4)
        ttk.Button(left,text="프로젝트 저장  ·  F5",command=self.save).pack(fill="x",pady=4)
        self.original=tk.BooleanVar(value=False)
        ttk.Checkbutton(left,text="원본 비교 (한 장 입력)",variable=self.original).pack(anchor="w")
        self.canvas.bind("<Button-1>",self.press);self.canvas.bind("<B1-Motion>",self.move);self.canvas.bind("<ButtonRelease-1>",self.release)
        self.root.bind("<F5>",lambda e:self.save())
        self.root.protocol("WM_DELETE_WINDOW",self.close)
        self.update_inputs()
        if project_path:self.set_project(load_project(project_path))
        else:self.root.after(200,self.open_selected)
        self.root.after(60,self.tick)

    def update_inputs(self):
        values={"한 장 그림":["HQ-001","HQ-002"]+[f"S-{n:03d}" for n in range(1,17)],"파츠 조합":["PARTS-001"],"분리 그림":[f"L-{n:03d}" for n in range(1,11)]}[self.route.get()]
        self.input_combo.configure(values=values);self.input.set(values[0])

    def get_analyzer(self):
        if self.analyzer is None:self.analyzer=Analyzer()
        return self.analyzer

    def set_project(self,project):
        self.project=project;self.revision+=1;self.reset();self.completion.set(project.analysis.get("completion","restrict"))
        route={"single":"한 장 그림","parts":"파츠 조합","split":"분리 그림"}[project.route]
        if self.route.get()!=route:self.route.set(route);self.update_inputs()
        match=re.match(r"^(HQ-\d{3}|S-\d{3}|L-\d{3}|PARTS-\d{3})",project.name)
        if match:self.input.set(match.group(1))
        self.status.set(f"{project.name} · {project.route} · {len(project.parts)} 부위\n"+" / ".join(project.warnings or ["공통 구조 준비됨 · 제품 품질 검증 전"]))

    def single(self,path):
        try:p=from_single(path,self.get_analyzer(),completion=self.completion.get())
        except SelectionRequired as e:
            # A visible explicit choice, never silently select a character.
            dialog=tk.Toplevel(self.root);dialog.title("사용할 캐릭터 선택");dialog.geometry("360x160")
            ttk.Label(dialog,text=f"얼굴 {len(e.faces)}개를 찾았습니다. 대상을 선택하세요.").pack(pady=14)
            for i,box in enumerate(e.faces):
                ttk.Button(dialog,text=f"대상 {i+1}  ·  위치 {box[0]}, {box[1]}",command=lambda n=i:(self.set_project(from_single(path,self.get_analyzer(),target=n)),dialog.destroy())).pack(fill="x",padx=15,pady=3)
            return
        self.set_project(p)

    def open_selected(self):
        try:
            sid=self.input.get()
            if self.route.get()=="파츠 조합":self.set_project(from_parts())
            elif self.route.get()=="분리 그림":self.set_project(from_split(INPUTS/"split"/f"{sid}.json"))
            else:
                catalog={"HQ-001":"premium/HQ-001-premium-portrait.png","HQ-002":"premium/HQ-002-alpha-edge-stress.png"}
                self.single(INPUTS/catalog.get(sid,f"single/{sid}.{'jpg' if sid=='S-014' else 'png'}"))
        except Exception as e:self.status.set(f"불러오지 못했습니다: {e}\n기존 작업은 유지했습니다.")

    def open_file(self):
        path=filedialog.askopenfilename(filetypes=[("그림","*.png *.jpg *.jpeg"),("분리 구조 JSON","*.json")])
        if not path:return
        try:
            if Path(path).suffix.lower()==".json":self.set_project(from_split(path))
            else:self.single(path)
        except Exception as e:self.status.set(f"입력 확인 필요: {e}")

    def open_saved(self):
        path=filedialog.askopenfilename(initialdir=BASE/"results/projects",filetypes=[("실험 프로젝트","project.json")])
        if path:
            try:self.set_project(load_project(path))
            except Exception as e:self.status.set(f"저장본 확인 필요: {e}")

    def reset(self):
        self.play.set(False)
        for key,var in self.controls.items():var.set(PARAMS[key])

    def change_completion(self):
        if self.project and self.project.route=="single":
            rebuild_single(self.project,self.completion.get())
            self.revision+=1
            self.status.set("보완 방식 적용: "+self.completion.get()+" · 보완은 추정이며 원본은 보존됩니다.")

    def toggle_observed(self):
        if self.project and self.project.route=="single":
            key=self.feature.get();observed=not self.project.analysis["observed"].get(key,False)
            set_region_observed(self.project,key,observed);self.revision+=1
            self.status.set(f"{key}: "+("보이는 부위로 확인" if observed else "가려진 부위로 표시 · 기본 동작 제한"))

    def swap(self):
        if self.project and self.project.route=="parts":
            variant=deepcopy(self.project)
            swap_part(variant,"hair_front",(.8,1.1,1.05),1.05)
            part=next(p for p in variant.parts if p.id=="hair_front");part.id="hair_front-variant"
            replace_part(self.project,"hair_front",part)
            self.revision+=1
            self.status.set("앞머리 색·크기 교체 · 매개변수 연결과 다른 파츠 유지")
        else:self.status.set("파츠 조합 자료에서 색·크기 교체를 시험할 수 있습니다.")

    def save(self):
        if not self.project:return
        self.project.params={k:v.get() for k,v in self.controls.items()}
        path=save_project(self.project,BASE/"results/projects"/f"user-{time.time_ns()}")
        self.status.set("저장 완료: "+str(path.relative_to(BASE)))

    def canvas_point(self,event):
        if not self.display:return None
        scale,ox,oy=self.display
        return ((event.x-ox)/scale,(event.y-oy)/scale)

    def press(self,event):
        if not (self.project and self.project.route=="single" and self.handles.get()):return
        point=self.canvas_point(event)
        if not point:return
        key=min(self.project.regions,key=lambda k:sum((point[j]-(self.project.regions[k][j]+self.project.regions[k][j+2])/2)**2 for j in (0,1)))
        self.feature.set(key);self.drag=(key,list(self.project.regions[key]))

    def move(self,event):
        if not self.drag:return
        x,y=self.canvas_point(event);key,box=self.drag;bw,bh=box[2]-box[0],box[3]-box[1]
        self.project.regions[key]=[int(x-bw/2),int(y-bh/2),int(x+bw/2),int(y+bh/2)]
        self.revision+=1

    def release(self,event):
        if not self.drag:return
        key,before=self.drag;after=list(self.project.regions[key]);self.project.regions[key]=before
        try:correct_region(self.project,key,after);self.revision+=1;self.status.set(f"{key} 위치 수정 적용 · 움직임으로 확인해 주세요.")
        except Exception as e:self.status.set(str(e))
        self.drag=None

    def resize_region(self):
        if not self.project or self.project.route!="single":return
        key=self.feature.get();x,y,x1,y1=self.project.regions[key];s=float(self.region_scale.get());cx,cy=(x+x1)/2,(y+y1)/2
        try:correct_region(self.project,key,[cx-(x1-x)*s/2,cy-(y1-y)*s/2,cx+(x1-x)*s/2,cy+(y1-y)*s/2]);self.revision+=1;self.status.set(f"{key} 영역 크기 수정 적용")
        except Exception as e:self.status.set(str(e))

    def tick(self):
        if self.project:
            v={k:var.get() for k,var in self.controls.items()}
            signature=(self.revision,tuple(v.items()),self.mode.get(),self.original.get(),self.handles.get(),self.feature.get(),self.canvas.winfo_width(),self.canvas.winfo_height())
            if not self.play.get() and signature==self.last_signature:
                self.root.after(70,self.tick);return
            self.last_signature=signature
            if self.play.get():
                t=time.monotonic();v.update(eye_left=max(0,min(1,abs(math.sin(t*1.2))*3)),eye_right=max(0,min(1,abs(math.sin(t*1.2))*3)),mouth=(math.sin(t*3)+1)*.3,head_roll=math.sin(t)*.45,head_yaw=math.sin(t*.7)*.35)
            image=self.project.source if self.original.get() and self.project.source is not None else render(self.project,v,self.mode.get())
            im=Image.fromarray(image)
            width,height=max(100,self.canvas.winfo_width()),max(100,self.canvas.winfo_height())
            scale=min((width-26)/im.width,(height-26)/im.height)
            im=im.resize((max(1,int(im.width*scale)),max(1,int(im.height*scale))),Image.Resampling.LANCZOS)
            bg=Image.new("RGBA",im.size,"#dfe4eb");bg.alpha_composite(im)
            if self.handles.get():
                d=ImageDraw.Draw(bg)
                for key,b in self.project.regions.items():
                    rect=tuple(int(v*scale) for v in b);color="#007a71" if key==self.feature.get() else "#bd4a5d"
                    d.rectangle(rect,outline=color,width=2);cx=(rect[0]+rect[2])/2;cy=(rect[1]+rect[3])/2;d.ellipse((cx-5,cy-5,cx+5,cy+5),fill=color)
            self.photo=ImageTk.PhotoImage(bg.convert("RGB"));self.canvas.delete("all")
            ox,oy=(width-im.width)//2,(height-im.height)//2;self.canvas.create_image(ox,oy,image=self.photo,anchor="nw");self.display=(scale,ox,oy)
        self.root.after(70,self.tick)

    def close(self):
        if self.analyzer:self.analyzer.close()
        self.root.destroy()


if __name__=="__main__":
    parser=argparse.ArgumentParser();parser.add_argument("--project",type=Path);args=parser.parse_args()
    root=tk.Tk();App(root,args.project);root.mainloop()
