"""Phase20 evidence integrity and explicitly bounded acceptance; never rewrites historical runs."""
from pathlib import Path
import datetime,hashlib,json,re,subprocess,sys
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'evidence/phase20'
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):return json.loads(Path(p).read_text(encoding='utf-8'))
def save(p,v):Path(p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
def run():
    errors=[]
    def require(ok,message):
        if not ok:errors.append(message)
    docs={name:(ROOT/'docs'/name).read_text(encoding='utf-8') for name in ('Todo','PRD.md','Function.md')};workspace=sha(ROOT/'docs/Todo')
    if '--todo-from-index' in sys.argv:docs['Todo']=subprocess.check_output(['git','show',':docs/Todo'],cwd=ROOT).decode('utf-8')
    tasks=re.findall(r'^- \[([ x])\] T-(\d{3})',docs['Todo'],re.M);expected=set(range(1,190))|set(range(191,201))
    require([int(n) for _,n in tasks]==list(range(1,411)),'Task IDs/order changed');require(all((mark=='x')==(int(n) in expected) for mark,n in tasks),'Task completion scope differs; T190 must remain open')
    for name,text in docs.items():require('v0.21' in text[:2000],name+' version incorrect')
    baseline=load(ROOT/'experiments/phase05/results/baseline.json')
    for key,name,pattern in [('function_ids','Function.md',r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),('product_direction_ids','PRD.md',r'\bPD-\d{2}\b'),('acceptance_ids','PRD.md',r'\bAC-\d{2}\b')]:require(sorted(set(re.findall(pattern,docs[name])))==baseline[key],key+' changed')
    m0=load(ROOT/'experiments/phase05/decisions.json')['m0'];require(m0['state']=='HOLD' and not m0['passed'] and len(m0['open_revalidation'])==5 and all(v['state']=='OPEN' for v in m0['open_revalidation']),'M0 changed')
    frozen=['experiments/phase02','experiments/phase03','experiments/phase04','experiments/phase05']+[f'evidence/phase{i:02}' for i in range(6,20)];require(not subprocess.check_output(['git','diff','HEAD','--name-only','--',*frozen],cwd=ROOT).strip(),'Historical evidence changed')
    require(not load(ROOT/'evidence/phase19/live-summary.json')['passed'],'T190 actual failure was relabeled')
    verification=load(OUT/'verification.json');require(verification['passed'] and verification['nodeTestGroups']==225 and verification['pythonTestGroups']==36 and verification['totalTestGroups']==261 and verification['newInputControlNodeGroups']==20,'Required gate incomplete')
    prior=load(OUT/'manifest.json') if (OUT/'manifest.json').exists() else {};equivalents=prior.get('verifiedLFEquivalent',{})
    for path,digest in verification['sourceSha256'].items():
        data=(ROOT/path).read_bytes();actual=hashlib.sha256(data).hexdigest();e=equivalents.get(path,{})
        require(actual==digest or b'\r\n' not in data and e.get('testedSha256')==digest and e.get('lfSha256')==actual,'Verified source changed: '+path)
        if actual==digest and b'\r\n' in data and b'\0' not in data:equivalents[path]={'testedSha256':digest,'lfSha256':hashlib.sha256(data.replace(b'\r\n',b'\n')).hexdigest(),'reason':'Git text normalization only'}
    def input_check(report):
        ui=report['inputRecovery'];require(ui['passed'] and ui['syntheticAudioGraph'] and ui['actualLocalFaceInference'] and not ui['devicesOpened'] and not ui['automaticReconnect'] and ui['physicalUnplug']=='NOT_RUN' and ui['actualHumanVoice']=='NOT_RUN' and not ui['pcmSaved'] and not ui['framesSaved'],'Automated input scope invalid')
        require([v['route'] for v in ui['routes']]==['parts','single-image','split-image'],'Three actual routes missing')
        for route in ui['routes']:
            for key in ['passed','actualRoutePreparation','realAudioWorklet','independentDisplayClock','syntheticDeviceIdentityStable','syntheticMediaOnly','validSilence','noiseCalibration','cancelPreservesFloor','deviceSettingsOnly','sensitivityApplied','cameraOcclusionAndMicIndependent','simulatedTrackEnded','watchdogWithoutCallbacks','expressionPriority','manualReconnect','projectSaveReopen','appearancePreserved','rawAudioExcluded']:require(route[key],'Input UI failed: '+route['route']+': '+key)
        require(report['renderer']['projectModel']['schemaVersion']=='1.9','Project schema changed unexpectedly')
        require(report['protections']=={'sandbox':True,'contextIsolation':True,'nodeIntegration':False,'externalNetworkBlocked':True},'Protections changed')
    dev=load(OUT/'development-run.json');require(dev['passed'] and dev['channel']=='test' and dev['appVersion']=='0.15.0','Full development run missing');input_check(dev)
    for key in ['projects','editor','motion','input','parts','structure','corrections','split','detail','expressions','tracking']:require(dev[key]['passed'],'Prior regression failed: '+key)
    require(dev['renderer']['partsPixels']['passed'] and dev['renderer']['partsPixels']['frames']==1472 and dev['renderer']['motionPixels']['passed'],'Prior GPU regression failed')
    package=load(OUT/'package-audit.json');require(package['passed'] and package['appVersion']=='0.15.0' and package['commonProjectSchema']=='1.9' and not package['cleanWindowsOS'] and not package['isolation']['developerToolsOnPath'] and package['isolation']['freshProfiles']==2,'Package isolation invalid')
    for item in package['files']:require(sha(ROOT/'out/2DSketcher-win32-x64'/item['path'])==item['sha256'],'Package changed: '+item['path'])
    for attempt in (1,2):
        report=load(OUT/f'packaged-run-{attempt}.json');require(report['passed'] and report['packaged'] and report['channel']=='release' and report['appVersion']=='0.15.0','Release failed');input_check(report)
        require(report['worker']['frozen'] and report['worker']['dependencyFilesInsideBundle'] and report['workerStopped'] and report['priorRouteUI']=='NOT_RUN','Packaged scope invalid')
        require(not report['renderer']['nodeExposed'] and not report['renderer']['shellExposed'] and not report['renderer']['diagnosticsVisible'] and not report['renderer']['workflowLabVisible'] and not report['devicesOpened'],'Release privacy invalid')
        if attempt==2:require(report['windowSize']==[1080,720],'Compact run missing')
    live=load(OUT/'live-microphone-summary.json');require(not live['pcmSaved'] and not live['framesSaved'] and live['physicalUnplug']=='NOT_RUN','Live evidence retention/scope invalid')
    if live['levelReadPassed']:
        actual=load(OUT/live['selectedRun'])['inputLive'];require(actual['passed'] and actual['manualStopAndReconnect'] and actual['projectUnchanged'] and not actual['cameraOpened'] and not actual['pcmSaved'],'Live microphone read/reconnect invalid')
    portable=ROOT/'out/make/zip/win32/x64/2DSketcher-win32-x64-0.15.0.zip';require(portable.is_file(),'Portable ZIP missing')
    artifacts=['README.md','docs/Todo','docs/PRD.md','docs/Function.md','docs/planning/05-decisions.md','docs/planning/20-input-recovery.md','docs/architecture/input-recovery.md','scripts/verify-input-recovery.mjs','scripts/input-recovery-audit.py','scripts/input-recovery-package-check.mjs']
    for name in artifacts:
        if not name.endswith(('.md','Todo')):continue
        doc=ROOT/name
        for link in re.findall(r'\]\(([^)]+)\)',doc.read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:',link) or link.startswith('#'):continue
            path=(doc.parent/link.split('#')[0]).resolve();require(path.exists() or path in (OUT/'audit.json',OUT/'manifest.json'),'Broken link: '+name+': '+link)
    artifacts += [str(p.relative_to(ROOT)).replace('\\','/') for p in OUT.iterdir() if p.is_file() and p.name not in ('audit.json','manifest.json')]
    hashes={name:sha(ROOT/name) for name in artifacts};hashes['docs/Todo']=hashlib.sha256(docs['Todo'].encode('utf-8')).hexdigest()
    save(OUT/'manifest.json',{'phase':20,'created':datetime.datetime.now(datetime.timezone.utc).isoformat(),'appVersion':'0.15.0','modelSchema':'1.9','sourceSha256':verification['sourceSha256'],'verifiedLFEquivalent':equivalents,'artifacts':hashes,'todoWorkspaceSha256':workspace,'todoFromIndex':'--todo-from-index' in sys.argv,'portableZip':{'path':str(portable.relative_to(ROOT)).replace('\\','/'),'bytes':portable.stat().st_size,'sha256':sha(portable)},'frozenHistoricalDirectories':frozen,'m0':'HOLD','openM0Revalidations':5})
    save(OUT/'audit.json',{'passed':not errors,'errors':errors,'phase':20,'completedTasks':199,'remainingTasks':211,'newTasksChecked':list(range(191,201)),'task190Complete':False,'nodeGroups':225,'pythonGroups':36,'newInputControlGroups':20,'samePcReleaseRuns':2,'automatedCompositeInputScenarios':True,'actualMicrophoneReadChecked':live['levelReadPassed'],'humanAudioScenesChecked':live['humanScenesConfirmed'],'physicalUnplugChecked':False,'actualCameraScenesChecked':False,'m0':'HOLD','openM0Revalidations':5,'auditScope':'Source/document/evidence integrity and bounded automated compound scenarios; physical compatibility and T190 remain separate','manifestSha256':sha(OUT/'manifest.json')})
    print(json.dumps({'passed':not errors,'errors':errors}));return not errors
if __name__=='__main__':raise SystemExit(0 if run() else 1)
