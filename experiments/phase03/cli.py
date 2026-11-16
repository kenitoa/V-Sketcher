"""Import any experimental route, save the common project, render without reanalysis."""
import argparse
import json
from pathlib import Path
from PIL import Image
from engine import Analyzer, SelectionRequired, from_parts, from_single, from_split, save_project, load_project, render, PARAMS

parser=argparse.ArgumentParser(description=__doc__)
sub=parser.add_subparsers(dest="command",required=True)
p=sub.add_parser("import")
p.add_argument("--route",choices=["parts","single","split"],required=True)
p.add_argument("--input",type=Path)
p.add_argument("--output",type=Path,required=True)
p.add_argument("--target",type=int)
p.add_argument("--completion",choices=["restrict","mirror","inpaint"],default="restrict")
p=sub.add_parser("render")
p.add_argument("--project",type=Path,required=True)
p.add_argument("--output",type=Path,required=True)
p.add_argument("--mode",choices=["weighted","rigid"],default="weighted")
for key,value in PARAMS.items():p.add_argument("--"+key.replace("_","-"),type=float,default=value)
args=parser.parse_args()
if args.command=="import":
    if args.route!="parts" and args.input is None:parser.error("--input is required for single/split")
    if args.route=="parts":project=from_parts()
    elif args.route=="split":project=from_split(args.input)
    else:
        analyzer=Analyzer()
        try:project=from_single(args.input,analyzer,args.target,args.completion)
        except SelectionRequired as e:
            print(json.dumps({"status":"target_selection_required","face_boxes":e.faces}));raise SystemExit(2)
        finally:analyzer.close()
    path=save_project(project,args.output)
    print(json.dumps({"project":str(path),"route":project.route,"warnings":project.warnings},ensure_ascii=False))
else:
    project=load_project(args.project)
    values={key:getattr(args,key) for key in PARAMS}
    frame=render(project,values,args.mode)
    args.output.parent.mkdir(parents=True,exist_ok=True)
    Image.fromarray(frame).save(args.output)
    print(json.dumps({"output":str(args.output),"canvas":project.size,"renderer":"engine.render"}))
