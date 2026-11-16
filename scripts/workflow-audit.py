"""Phase08 task/document/provenance audit; distinct from behavior and packaged tests."""
from pathlib import Path
import datetime,hashlib,json,re,subprocess,sys
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'evidence/phase08'
def load(path):return json.loads(Path(path).read_text(encoding='utf-8'))
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def save(path,value):Path(path).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')

def run():
    errors=[]
    def require(condition,message):
        if not condition:errors.append(message)
    docs={name:(ROOT/'docs'/name).read_text(encoding='utf-8') for name in ['Todo','PRD.md','Function.md']}
    tasks=re.findall(r'^- \[([ x])\] T-(\d{3})',docs['Todo'],re.M)
    require([int(number) for _,number in tasks]==list(range(1,411)),'Task IDs/order changed')
    require(all((mark=='x')==(int(number)<=80) for mark,number in tasks),'Only T001..080 may be checked')
    baseline=load(ROOT/'experiments/phase05/results/baseline.json')
    for key,name,pattern in [('function_ids','Function.md',r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),('product_direction_ids','PRD.md',r'\bPD-\d{2}\b'),('acceptance_ids','PRD.md',r'\bAC-\d{2}\b')]:
        require(sorted(set(re.findall(pattern,docs[name])))==baseline[key],key+' changed')
    for name,text in docs.items():require('v0.9' in text[:1800],name+' version header incorrect')
    ledger=load(ROOT/'experiments/phase05/decisions.json')
    require(ledger['m0']['state']=='HOLD' and not ledger['m0']['passed'],'M0 incorrectly passed')
    require(len(ledger['m0']['open_revalidation'])==5 and all(v['state']=='OPEN' for v in ledger['m0']['open_revalidation']),'M0 returns changed')
    verification=load(OUT/'verification.json')
    require(verification['passed'] and verification['nodeTestGroups']==42 and verification['pythonTestGroups']==3 and verification['workflowNodeGroups']==20,'Functional/static evidence missing')
    require(verification['followup']==['T-268','T-271'],'Real integration must remain followup work')
    for name,digest in verification['sourceSha256'].items():require(sha(ROOT/name)==digest,'Verification source changed: '+name)
    development=load(OUT/'development-run.json')
    require(development['passed'] and development['channel']=='test' and development['appVersion']=='0.3.0','Development app evidence missing')
    ui=development['renderer']['workflowUI'];core=development['renderer']['workflowCore']
    require(ui['passed'] and ui['comparisonVisible'] and ui['comparisonValuesVisible'] and ui['manualCorrectionPreserved'] and ui['cancelled'] and ui['ownedResources']==0,'Actual review/cancel UI failed')
    require(core['passed'] and core['staleHeld'] and core['reviewApplied'] and core['latestEditPreserved'] and core['runtimeSnapshotPreserved'] and core['ownedResources']==0,'Browser core state check failed')
    package=load(OUT/'package-audit.json')
    require(package['passed'] and not package['cleanWindowsOS'] and len(package['reports'])==2,'Packaged same-PC scope/results incorrect')
    for attempt in [1,2]:
        report=load(OUT/f'packaged-run-{attempt}.json');renderer=report['renderer']
        require(report['passed'] and report['packaged'] and report['channel']=='release' and report['appVersion']=='0.3.0' and report['workerStopped'],'Packaged run failed')
        require(report['worker']['frozen'] and report['worker']['modelLoaded'] and report['worker']['dependencyFilesInsideBundle'],'Bundled worker not verified')
        require(renderer['workflowCore']['passed'] and renderer['workflowCore']['ownedResources']==0 and renderer['sampleRuntimeFrozen'],'Packaged lifecycle check failed')
        require(not renderer['workflowLabVisible'] and not renderer['diagnosticsVisible'] and not renderer['nodeExposed'],'Release exposes developer controls')
        require(renderer['modelPixels']['passed'] and renderer['projectModel']['schemaVersion']=='1.0','Existing model/GPU regressed')
    for item in package['files']:require(sha(ROOT/'out/2DSketcher-win32-x64'/item['path'])==item['sha256'],'Package content changed: '+item['path'])
    old02=load(ROOT/'experiments/phase02/assets/manifest.json')
    require(all(sha(ROOT/'experiments/phase02/assets'/name)==digest for name,digest in old02['files'].items()),'Phase02 assets changed')
    old03=load(ROOT/'experiments/phase03/results/verification.json')
    require(all(sha(ROOT/'experiments/phase03'/name)==digest for name,digest in old03['code_sha256'].items()),'Phase03 source changed')
    for phase in [4,5]:
        prefix=f'experiments/phase{phase:02d}/';old=load(ROOT/prefix/'results/artifact-manifest.json')
        require(all(sha(ROOT/name)==info['sha256'] for name,info in old['files'].items() if name.startswith(prefix)),'Phase history changed: '+prefix)
    previous=subprocess.check_output(['git','ls-tree','-r','HEAD','--','evidence/phase06','evidence/phase07'],cwd=ROOT).decode('utf-8').splitlines()
    for line in previous:
        meta,name=line.split('\t');data=(ROOT/name).read_bytes();oid=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
        require(oid==meta.split()[2],'Frozen phase06/07 evidence changed: '+name)
    documents=[ROOT/'README.md',ROOT/'CONTRIBUTING.md',*(ROOT/'docs'/name for name in docs),ROOT/'docs/planning/08-async-workflow.md',*sorted((ROOT/'docs/architecture').glob('*.md'))]
    generated={OUT/'audit.json',OUT/'artifact-manifest.json'}
    for doc in documents:
        for link in re.findall(r'\]\(([^)]+)\)',doc.read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:',link) or link.startswith('#'):continue
            target=(doc.parent/link.split('#')[0]).resolve();require(target.exists() or target in generated,'Broken local link: '+str(doc.relative_to(ROOT))+': '+link)
    summary={'passed':not errors,'errors':errors,'created':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Task/document/identity/provenance audit, not extra functional tests',
             'tasks':len(tasks),'completedTasks':sum(mark=='x' for mark,_ in tasks),'functionIDs':len(baseline['function_ids']),'productDirectionIDs':len(baseline['product_direction_ids']),'acceptanceIDs':len(baseline['acceptance_ids']),
             'functionalGroups':45,'newWorkflowNodeGroups':20,'actualReviewUI':True,'realChildAndScratchOwnership':True,'packagedRuns':2,'m0State':'HOLD','openM0Returns':5,
             'historical02to07Preserved':not any('histor' in e.lower() or 'phase' in e.lower() for e in errors),'hostedCIRun':False,'cleanWindowsOS':False,'realAnalysisAndSavingIntegration':'T-268/T-271 NOT_RUN'}
    save(OUT/'audit.json',summary)
    names=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z'],cwd=ROOT).decode('utf-8').split('\0');files={}
    for name in names:
        if not name or name.startswith(('experiments/','evidence/phase06/','evidence/phase07/')) or name=='evidence/phase08/artifact-manifest.json':continue
        path=ROOT/name
        if path.is_file():files[name]={'bytes':path.stat().st_size,'sha256':sha(path)}
    zipfile=ROOT/'out/make/zip/win32/x64/2DSketcher-win32-x64-0.3.0.zip'
    save(OUT/'artifact-manifest.json',{'scope':'Phase08 current source/docs/evidence/portable ZIP; previous evidence remains frozen','files':files,
                                   'portableZip':{'path':str(zipfile.relative_to(ROOT)).replace('\\','/'),'bytes':zipfile.stat().st_size,'sha256':sha(zipfile)}})
    print(json.dumps(summary,ensure_ascii=False))
    if errors:raise SystemExit(1)
if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8');run()
