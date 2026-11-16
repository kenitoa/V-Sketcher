"""Final artifact inventory; excludes tools, private config, downloads and scratch files."""
import json,re,time,sys
from pathlib import Path
from tracking import BASE,engine
ROOT=BASE.parent.parent

def run():
    manifest=json.loads((BASE.parent/'phase02/assets/manifest.json').read_text(encoding='utf-8'))
    preserved={name:engine.sha(BASE.parent/'phase02/assets'/name)==digest for name,digest in manifest['files'].items()}
    if not all(preserved.values()):raise ValueError('phase02_original_changed')
    output=BASE/'results/artifact-manifest.json'
    docs=[ROOT/'docs/Todo',ROOT/'docs/PRD.md',ROOT/'docs/Function.md',ROOT/'docs/planning/04-tracking-broadcast-export.md',BASE/'README.md',BASE/'assets/premium/generation-prompts.md']
    missing=[]
    for doc in docs:
        text=doc.read_text(encoding='utf-8')
        for link in re.findall(r'\]\(([^)]+)\)',text):
            if re.match(r'^[a-z]+:',link) or link.startswith('#'):continue
            path=link.split('#')[0]
            target=(doc.parent/path).resolve()
            if path and target!=output.resolve() and not target.exists():missing.append({'document':str(doc.relative_to(ROOT)),'link':link})
    todo=(ROOT/'docs/Todo').read_text(encoding='utf-8');tasks=re.findall(r'^- \[([ x])\] T-(\d{3})',todo,re.M)
    status_ok=len(tasks)==410 and all((mark=='x')==(int(number)<=40) for mark,number in tasks)
    functions=set(re.findall(r'\bF-[A-Z0-9]{2,3}-\d{3}\b',(ROOT/'docs/Function.md').read_text(encoding='utf-8')))
    checks={'phase02_payloads_unchanged':all(preserved.values()),'phase02_payload_count':len(preserved),
            'local_links_missing':missing,'todo_first_40_only_complete':status_ok,'function_id_count':len(functions)}
    files=[]
    for path in sorted(BASE.rglob('*')):
        if not path.is_file() or path==output:continue
        relative=path.relative_to(BASE)
        if any(p in relative.parts for p in ['.local','reference','__pycache__']):continue
        if relative.parts[0]=='tools' and relative.as_posix()!='tools/sources.json':continue
        if relative.as_posix().startswith('results/local-'):continue
        files.append(path)
    files+=docs
    inventory={str(p.relative_to(ROOT)).replace('\\','/'):{'bytes':p.stat().st_size,'sha256':engine.sha(p)} for p in files}
    engine.json_write(output,{'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'scope':'Final source and preserved artifacts; historical run numbers are not all the same code revision',
                             'checks':checks,'files':inventory})
    print(json.dumps(checks,ensure_ascii=False));print('Inventory',len(inventory),'files')
    if missing or not status_ok or len(functions)!=52:raise SystemExit(1)

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8');run()
