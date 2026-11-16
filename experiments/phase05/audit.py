"""Decision/document audit, separate from the 31 policy experiments or product tests."""
from pathlib import Path
import hashlib,json,re,sys,time
BASE=Path(__file__).resolve().parent
ROOT=BASE.parent.parent
def load(path):return json.loads(Path(path).read_text(encoding='utf-8'))
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def save(path,data):Path(path).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def run():
    baseline=load(BASE/'results/baseline.json');ledger=load(BASE/'decisions.json');policy=load(BASE/'results/policy-verification.json')
    errors=[]
    def require(condition,message):
        if not condition:errors.append(message)
    todo=(ROOT/'docs/Todo').read_text(encoding='utf-8');prd=(ROOT/'docs/PRD.md').read_text(encoding='utf-8');fn=(ROOT/'docs/Function.md').read_text(encoding='utf-8')
    tasks=re.findall(r'^- \[([ x])\] T-(\d{3})',todo,re.M)
    require([int(v) for _,v in tasks]==list(range(1,411)),'Todo identities/order must remain 001..410 exactly once')
    require(all((mark=='x')==(int(number)<=50) for mark,number in tasks),'Only first fifty tasks may be marked complete')
    for key,text,pattern in [('function_ids',fn,r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),('product_direction_ids',prd,r'\bPD-\d{2}\b'),('acceptance_ids',prd,r'\bAC-\d{2}\b')]:
        require(sorted(set(re.findall(pattern,text)))==baseline[key],key+' changed')
    for name,text in [('Todo',todo),('PRD',prd),('Function',fn)]:require('v0.6' in text[:1200],name+' version header not updated')
    ids=[v['id'] for v in ledger['decisions']]
    require(ids==[f'DEC-{i:02d}' for i in range(1,13)],'Twelve decisions required')
    require(all(v['state']=='ADOPTED_IMPLEMENTATION_POLICY' and not v['implementation_or_release_validation_complete'] for v in ledger['decisions']),'Decision versus implementation state mixed')
    require(ledger['m0']['review_completed'] and not ledger['m0']['passed'] and ledger['m0']['state']=='HOLD','M0 review must not become a product pass')
    risks=ledger['m0']['open_revalidation'];riskids={v['id'] for v in risks}
    require(riskids=={f'M0-R{i:02d}' for i in range(1,6)} and all(v['state']=='OPEN' and v['owner'] and v['required_evidence'] for v in risks),'Five concrete open M0 returns required')
    gateids={v['id'] for v in ledger['gates']}
    require(len(gateids)==26 and all(v['product_gate_state']=='NOT_RUN' for v in ledger['gates']),'Unrun product gates cannot be passed')
    require(all(set(v['gates'])<=gateids for v in risks),'Unknown gate in M0 return')
    require(all(set(v['revalidation'])<=riskids for v in ledger['decisions']),'Unknown revalidation in decision')
    require(policy['passed']==policy['total']==31 and policy['script_sha256']==sha(BASE/'policy_harness.py'),'Policy experiment results/source mismatch')
    require(not ledger['dependency_lockfile_or_packaged_product_created'] and ledger['actual_beginner_release_participants']==0,'Unperformed packaging/user trials must stay unperformed')
    docs=[ROOT/'docs/Todo',ROOT/'docs/PRD.md',ROOT/'docs/Function.md',ROOT/'docs/planning/01-decisions.md',ROOT/'docs/planning/01-metrics.md',
          *sorted((ROOT/'docs/planning').glob('05-*.md')),BASE/'README.md']
    future={BASE/'results/audit.json',BASE/'results/artifact-manifest.json'}
    missing=[]
    for doc in docs:
        text=doc.read_text(encoding='utf-8')
        for link in re.findall(r'\]\(([^)]+)\)',text):
            if re.match(r'^[a-z]+:',link) or link.startswith('#'):continue
            part=link.split('#')[0];target=(doc.parent/part).resolve()
            if part and target not in future and not target.exists():missing.append({'document':str(doc.relative_to(ROOT)),'link':link})
    require(not missing,'Broken local links')
    for item in ledger['decisions']:require(item['id'] in (ROOT/item['document']).read_text(encoding='utf-8'),'Missing decision section '+item['id'])
    phase02=load(ROOT/'experiments/phase02/assets/manifest.json')
    preserved02={name:sha(ROOT/'experiments/phase02/assets'/name)==digest for name,digest in phase02['files'].items()}
    require(all(preserved02.values()),'Historical input asset changed')
    phase03=load(ROOT/'experiments/phase03/results/verification.json')
    require(all(sha(ROOT/'experiments/phase03'/name)==digest for name,digest in phase03['code_sha256'].items()),'Phase03 source changed')
    phase04=load(ROOT/'experiments/phase04/results/artifact-manifest.json');preserved04={}
    for name,info in phase04['files'].items():
        if name.startswith('experiments/phase04/'):preserved04[name]=sha(ROOT/name)==info['sha256']
    require(all(preserved04.values()),'Historical phase04 source/artifact changed')
    summary={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'scope':'Decision/document identity/link/preservation audit; not product functional tests',
             'pass':not errors,'errors':errors,'missing_local_links':missing,'task_count':len(tasks),'completed_tasks':sum(mark=='x' for mark,_ in tasks),
             'function_ids':len(baseline['function_ids']),'product_direction_ids':len(baseline['product_direction_ids']),'acceptance_ids':len(baseline['acceptance_ids']),
             'decisions':len(ids),'product_gates':len(gateids),'m0_state':ledger['m0']['state'],'open_m0_revalidation':len(risks),
             'phase02_payloads_preserved':sum(preserved02.values()),'phase04_files_preserved':sum(preserved04.values()),
             'policy_experiments_passed':policy['passed']}
    save(BASE/'results/audit.json',summary)
    paths=[p for p in BASE.rglob('*') if p.is_file() and '.local' not in p.relative_to(BASE).parts and '__pycache__' not in p.relative_to(BASE).parts and p.name!='artifact-manifest.json']+docs
    inventory={str(p.relative_to(ROOT)).replace('\\','/'):{'bytes':p.stat().st_size,'sha256':sha(p)} for p in sorted(set(paths))}
    save(BASE/'results/artifact-manifest.json',{'created':summary['created'],'scope':'Final phase05 policy/decision source, research, records and documents','files':inventory})
    print(json.dumps(summary,ensure_ascii=False))
    if errors:raise SystemExit(1)

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8');run()
