"""Phase17 documentation, verified sources, frozen history and packaged scope audit."""
from pathlib import Path
import datetime,hashlib,json,re,subprocess,sys
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'evidence/phase17'
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def load(path):return json.loads(Path(path).read_text(encoding='utf-8'))
def save(path,value):Path(path).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
def run():
    errors=[]
    def require(value,message):
        if not value:errors.append(message)
    docs={name:(ROOT/'docs'/name).read_text(encoding='utf-8') for name in ('Todo','PRD.md','Function.md')};workspace=sha(ROOT/'docs/Todo')
    if '--todo-from-index' in sys.argv:docs['Todo']=subprocess.check_output(['git','show',':docs/Todo'],cwd=ROOT).decode('utf-8')
    tasks=re.findall(r'^- \[([ x])\] T-(\d{3})',docs['Todo'],re.M);require([int(n) for _,n in tasks]==list(range(1,411)),'Task IDs/order changed');require(all((mark=='x')==(int(n)<=170) for mark,n in tasks),'Only T001..170 may be checked')
    for name,text in docs.items():require('v0.18' in text[:1800],name+' version incorrect')
    baseline=load(ROOT/'experiments/phase05/results/baseline.json')
    for key,name,pattern in [('function_ids','Function.md',r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),('product_direction_ids','PRD.md',r'\bPD-\d{2}\b'),('acceptance_ids','PRD.md',r'\bAC-\d{2}\b')]:require(sorted(set(re.findall(pattern,docs[name])))==baseline[key],key+' changed')
    m0=load(ROOT/'experiments/phase05/decisions.json')['m0'];require(m0['state']=='HOLD' and not m0['passed'] and len(m0['open_revalidation'])==5 and all(v['state']=='OPEN' for v in m0['open_revalidation']),'M0 changed')
    frozen=['experiments/phase02','experiments/phase03','experiments/phase04','experiments/phase05']+[f'evidence/phase{i:02}' for i in range(6,17)]
    require(not subprocess.check_output(['git','diff','HEAD','--name-only','--',*frozen],cwd=ROOT).strip(),'Historical experiments/evidence changed')
    verification=load(OUT/'verification.json');require(verification['passed'] and verification['nodeTestGroups']==167 and verification['pythonTestGroups']==31 and verification['totalTestGroups']==198,'Required local gate incomplete');require(verification['newSplitNodeGroups']==18 and verification['newSplitPythonGroups']==5,'New split groups missing')
    prior=load(OUT/'manifest.json') if (OUT/'manifest.json').exists() else {};lf_equivalent=prior.get('verifiedLFEquivalent',{})
    for path,digest in verification['sourceSha256'].items():
        data=(ROOT/path).read_bytes();actual=hashlib.sha256(data).hexdigest()
        equivalent=lf_equivalent.get(path,{})
        require(actual==digest or b'\r\n' not in data and equivalent.get('testedSha256')==digest and equivalent.get('lfSha256')==actual,'Verified source changed: '+path)
        if actual==digest and b'\r\n' in data and b'\0' not in data:lf_equivalent[path]={'testedSha256':digest,'lfSha256':hashlib.sha256(data.replace(b'\r\n',b'\n')).hexdigest(),'reason':'Git text normalization only; tested bytes retained in verification sourceSha256'}
    dev=load(OUT/'development-run.json');require(dev['passed'] and dev['channel']=='test' and dev['appVersion']=='0.12.0','Development check missing')
    for key in ['projects','editor','motion','input','parts','structure','corrections']:require(dev[key]['passed'],'Development regression failed: '+key)
    require(dev['renderer']['partsPixels']['frames']==1472 and dev['renderer']['partsPixels']['passed'],'64 combination GPU regression failed')
    require(dev['corrections']['pixels']['passed'] and dev['structure']['pixels']['passed'] and dev['renderer']['motionPixels']['passed'],'Prior GPU regressions failed')
    def split_check(report):
        ui=report['split']
        for key in ['passed','manifest','ambiguousFolderRepair','emptyHiddenDuplicateNames','cycleBlocked','zoomPointer','mirrorViewOnly','reviewBeforeApply','compare','commonFiveControls','undoRedo','saveDuplicateReopen','reguide','sourceHashesPreserved','sourceBundleExport']:require(ui[key],'Split UI failed: '+key)
        for key in ['pixels','folderPixels']:
            g=ui[key];require(g['passed'] and g['frames']==25 and g['uniqueFrames']>=10 and g['neutralMeanDifference']<1 and g['neutralAlphaMeanDifference']<1 and g['glClean'] and g['buffersStable'],'Split GPU failed: '+key)
        require(not ui['devicesOpened'] and report['renderer']['projectModel']['schemaVersion']=='1.7','Scope/schema incorrect')
    def detail_check(report):
        ui=report['detail'];require(ui['passed'] and ui['m2FoundationChecked'] and not ui['m2ExitApproved'] and not ui['devicesOpened'],'Detailed/M2 scope invalid');require([v['route'] for v in ui['routes']]==['parts','single-image','split-image'],'Three actual routes missing')
        for route in ui['routes']:
            for key in ['passed','actualRoutePreparation','sameProjectSelection','cycleBlocked','previewBeforeApply','localMeshDrag','pivotAndVertex','otherMeshesPreserved','bindingsAddEditRemove','realPngReplacementPreview','deleteImpactAndUndoRedo','selectiveRestore','simpleConflictProtected','idFixLocations','saveDuplicateReopen','originalHashesPreserved']:require(route[key],'Detailed UI failed: '+route['route']+': '+key)
            g=route['pixels'];require(g['passed'] and g['frames']==12 and g['neutralMeanDifference']<.02 and g['extremeChangedChannels']>0 and g['glClean'] and g['buffersStable'],'Detailed GPU failed: '+route['route'])
            if route['route']=='single-image':require(route['emptyRestoration'] is True,'Empty project restoration missing')
        require(report['renderer']['projectModel']['schemaVersion']=='1.7','Detailed schema mismatch')
    require(verification['newDetailNodeGroups']==20,'New detail tests missing')
    detail_check(dev)
    split_check(dev)
    preservation=load(OUT/'preservation.json');require(preservation['passed'] and len(preservation['routes'])==3 and all(v['passed'] and v['selectedRestoreKeepsSettings'] and v['bundleRoundtrip'] for v in preservation['routes']),'Nonempty three-route preservation missing')
    package=load(OUT/'package-audit.json');require(package['passed'] and package['appVersion']=='0.12.0' and package['commonProjectSchema']=='1.7','Package audit missing');require(not package['cleanWindowsOS'] and package['isolation']['freshProfiles']==2 and not package['isolation']['developerToolsOnPath'],'Same-PC isolation incorrect')
    for item in package['files']:require(sha(ROOT/'out/2DSketcher-win32-x64'/item['path'])==item['sha256'],'Packaged file changed: '+item['path'])
    for attempt in [1,2]:
        report=load(OUT/f'packaged-run-{attempt}.json');require(report['passed'] and report['packaged'] and report['channel']=='release' and report['appVersion']=='0.12.0','Release failed');require(report['worker']['frozen'] and report['worker']['dependencyFilesInsideBundle'] and report['workerStopped'],'Frozen worker missing');require(report['priorRouteUI']=='NOT_RUN','Targeted release scope mislabeled');require(not report['renderer']['nodeExposed'] and not report['renderer']['shellExposed'] and not report['renderer']['diagnosticsVisible'] and not report['renderer']['workflowLabVisible'],'Release protections failed');detail_check(report)
        if attempt==2:require(report['windowSize']==[1080,720],'Compact check missing')
    provenance=load(ROOT/'assets/product/split/manifest.json');require(sha(ROOT/'assets/product'/provenance['path'])==provenance['sha256']==package['splitExampleSha256'],'Split example hash changed')
    for path,digest in provenance['sourceSha256'].items():require(sha(ROOT/path)==digest,'Premium source changed: '+path)
    portable=ROOT/'out/make/zip/win32/x64/2DSketcher-win32-x64-0.12.0.zip';require(portable.is_file(),'Portable ZIP missing')
    for doc in [ROOT/'README.md',*(ROOT/'docs'/name for name in docs),ROOT/'docs/planning/17-detail-editor.md',ROOT/'docs/architecture/detail-editor.md']:
        for link in re.findall(r'\]\(([^)]+)\)',doc.read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:',link) or link.startswith('#'):continue
            path=(doc.parent/link.split('#')[0]).resolve();require(path.exists() or path in (OUT/'audit.json',OUT/'manifest.json'),'Broken link: '+str(doc.relative_to(ROOT))+': '+link)
    artifact_paths=['docs/Todo','docs/PRD.md','docs/Function.md','docs/planning/17-detail-editor.md','docs/architecture/detail-editor.md','docs/planning/05-decisions.md','README.md','scripts/detail-audit.py','scripts/detail-preservation-check.mjs','scripts/verify-detail.mjs','scripts/detail-package-check.mjs']+[str(p.relative_to(ROOT)).replace('\\','/') for p in OUT.iterdir() if p.is_file() and p.name not in ('audit.json','manifest.json')]
    artifacts={path:sha(ROOT/path) for path in artifact_paths};artifacts['docs/Todo']=hashlib.sha256(docs['Todo'].encode('utf-8')).hexdigest()
    manifest={'phase':17,'created':datetime.datetime.now(datetime.timezone.utc).isoformat(),'appVersion':'0.12.0','modelSchema':'1.7','sourceSha256':verification['sourceSha256'],'verifiedLFEquivalent':lf_equivalent,'artifacts':artifacts,'todoWorkspaceSha256':workspace,'todoFromIndex':'--todo-from-index' in sys.argv,'portableZip':{'path':str(portable.relative_to(ROOT)).replace('\\','/'),'bytes':portable.stat().st_size,'sha256':sha(portable)} if portable.is_file() else None,'frozenHistoricalDirectories':frozen,'m0':'HOLD','openM0Revalidations':5}
    save(OUT/'manifest.json',manifest);save(OUT/'audit.json',{'passed':not errors,'errors':errors,'phase':17,'completedTasks':170,'remainingTasks':240,'nodeGroups':167,'pythonGroups':31,'newDetailGroups':20,'newSplitGroups':23,'samePcReleaseRuns':2,'packagedPriorRouteUI':'NOT_RUN; full development regression retained','m2ExitApproved':False,'m0':'HOLD','openM0Revalidations':5,'manifestSha256':sha(OUT/'manifest.json')});print(json.dumps({'passed':not errors,'errors':errors}));return not errors
if __name__=='__main__':raise SystemExit(0 if run() else 1)
