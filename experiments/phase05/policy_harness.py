"""Phase05 policy experiments, not the product storage/concurrency implementation.

Faults are injected exceptions, not real disk exhaustion, power cuts or OS hotkeys.
All mutated files stay in a validated private fixture directory; no user file is opened.
"""
from pathlib import Path,PurePosixPath
from dataclasses import dataclass,field
from copy import deepcopy
import hashlib,json,os,shutil,stat,time,uuid,zipfile

BASE=Path(__file__).resolve().parent
SUPPORTED=(1,0)

def sha(data):return hashlib.sha256(data).hexdigest()
def payload(revision=1):
    asset=b'policy fixture payload, not illustration or image-decoder evidence'
    return {'schemaVersion':[1,0],'projectId':'fixture-project-A','revision':revision,
            'assets':[{'path':'assets/'+sha(asset)+'.png','sha256':sha(asset)}],
            'parts':[],'parameters':{},'futureMetadata':{'preserve':True}},asset

def inspect(path,budget=512*1024*1024):
    with zipfile.ZipFile(path) as z:
        names=[];keys=set()
        for i in z.infolist():
            name=i.filename;p=PurePosixPath(name)
            # Python on Windows normalizes filename separators; inspect the raw
            # archive name too so the policy does not accept ambiguous paths.
            if not name or '\\' in i.orig_filename or p.is_absolute() or '..' in p.parts or ':' in name:raise ValueError('unsafe_path')
            if stat.S_ISLNK(i.external_attr>>16):raise ValueError('symlink')
            key=name.casefold()
            if key in keys:raise ValueError('duplicate_name')
            if i.flag_bits&1:raise ValueError('encrypted_entry')
            keys.add(key);names.append(name)
        if len(names)>1024 or sum(i.file_size for i in z.infolist())>budget:raise ValueError('expanded_budget')
        if not {'manifest.json','project.json'}<=set(names):raise ValueError('required_file_missing')
        manifest=json.loads(z.read('manifest.json'))
        if set(manifest['files'])!=set(names)-{'manifest.json'}:raise ValueError('manifest_file_set')
        for name,digest in manifest['files'].items():
            if sha(z.read(name))!=digest:raise ValueError('hash_mismatch')
        project=json.loads(z.read('project.json'))
        major,minor=project['schemaVersion']
        if major!=SUPPORTED[0]:raise ValueError('unsupported_major')
        for asset in project['assets']:
            if asset['path'] not in manifest['files'] or asset['sha256']!=manifest['files'][asset['path']]:raise ValueError('asset_reference')
        return {'project':project,'readOnly':minor>SUPPORTED[1]}

def write_archive(path,project,asset):
    content={'project.json':json.dumps(project,sort_keys=True).encode(),project['assets'][0]['path']:asset}
    manifest={'files':{n:sha(d) for n,d in content.items()}}
    with zipfile.ZipFile(path,'w',compression=zipfile.ZIP_STORED) as z:
        for name,data in content.items():z.writestr(name,data)
        z.writestr('manifest.json',json.dumps(manifest))

def commit(path,project,asset,root,fail=None):
    if not path.resolve().is_relative_to(root.resolve()):raise ValueError('outside_fixture_root')
    if tuple(project['schemaVersion'])>SUPPORTED:raise ValueError('read_only_version')
    temporary=path.with_suffix('.tmp');backup=path.with_suffix('.backup')
    lock=path.with_suffix('.lock')
    fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    try:
        write_archive(temporary,project,asset)
        with temporary.open('r+b') as f:f.flush();os.fsync(f.fileno())
        inspect(temporary)
        if fail=='after_flush':raise OSError('injected disk-full/process-stop after temp flush')
        if path.exists():
            if fail=='backup':raise OSError('injected backup write failure')
            staged_backup=backup.with_suffix('.backup.tmp');shutil.copyfile(path,staged_backup)
            inspect(staged_backup);os.replace(staged_backup,backup)
        if fail=='before_replace':raise OSError('injected interruption before atomic replace')
        os.replace(temporary,path)
        if fail=='after_replace':raise OSError('injected process-stop after commit')
    finally:
        os.close(fd)
        # This is a single known fixture lock, never a recursive cleanup.
        lock.unlink()

@dataclass
class Session:
    project:str='A'
    revision:int=3
    saved_revision:int=2
    runtime_revision:int=2
    result:dict|None=None
    cancelled:set=field(default_factory=set)
    pending_runtime:int|None=None
    def accept(self,message):
        if message['project']!=self.project or message['revision']!=self.revision or message['job'] in self.cancelled:return False
        self.result=deepcopy(message['result']);self.revision+=1;return True
    def saved(self,revision):self.saved_revision=revision
    def frame_boundary(self):
        if self.pending_runtime is not None:self.runtime_revision=self.pending_runtime;self.pending_runtime=None

def run():
    root=(BASE/'.local'/('policy-'+uuid.uuid4().hex)).resolve()
    if not root.is_relative_to((BASE/'.local').resolve()):raise ValueError('fixture_location_invalid')
    root.mkdir(parents=True)
    checks=[]
    def check(name,ok):
        checks.append({'name':name,'pass':bool(ok)})
        if not ok:print('FAIL',name)
    def raises(fn,expected):
        try:fn()
        except Exception as e:return expected in str(e)
        return False
    project,asset=payload();target=root/'project.2dsketch';commit(target,project,asset,root)
    check('valid bundle and original content hash roundtrip',inspect(target)['project']==project)
    original=target.read_bytes();p2,_=payload(2)
    for stage in ['after_flush','backup','before_replace']:
        check('fault '+stage+' reported',raises(lambda:commit(target,p2,asset,root,stage),'injected'))
        check('fault '+stage+' preserves previous normal project',target.read_bytes()==original and inspect(target)['project']['revision']==1)
    check('post-commit interruption reported',raises(lambda:commit(target,p2,asset,root,'after_replace'),'injected'))
    check('post-commit normal project and previous backup remain valid',inspect(target)['project']['revision']==2 and inspect(target.with_suffix('.backup'))['project']['revision']==1)
    target.write_bytes(b'corrupt fixture only')
    check('corrupt normal file is rejected',raises(lambda:inspect(target),'zip file'))
    check('last normal backup can be selected explicitly',inspect(target.with_suffix('.backup'))['project']['revision']==1)
    for label,name in [('traversal','../escape.png'),('windows_path','C:/escape.png'),('backslash','assets\\escape.png')]:
        malicious=root/(label+'.zip')
        with zipfile.ZipFile(malicious,'w') as z:z.writestr(name,b'x')
        if label=='backslash':malicious.write_bytes(malicious.read_bytes().replace(b'assets/escape.png',b'assets\\escape.png'))
        check(label+' archive rejected before extraction',raises(lambda:inspect(malicious),'unsafe_path'))
    duplicate=root/'duplicate.zip'
    with zipfile.ZipFile(duplicate,'w') as z:z.writestr('Assets/a.png',b'1');z.writestr('assets/A.png',b'2')
    check('case insensitive duplicate resources rejected',raises(lambda:inspect(duplicate),'duplicate_name'))
    p3,_=payload();p3['schemaVersion']=[2,0];newer=root/'newer.zip';write_archive(newer,p3,asset)
    check('future major version blocked',raises(lambda:inspect(newer),'unsupported_major'))
    p3['schemaVersion']=[1,1];write_archive(newer,p3,asset)
    check('future minor version opens read-only with unknown metadata preserved',inspect(newer)['readOnly'] and inspect(newer)['project']['futureMetadata']['preserve'])
    check('future minor cannot overwrite project',raises(lambda:commit(target,p3,asset,root),'read_only_version'))
    normal=root/'normal.zip';write_archive(normal,project,asset)
    check('expanded byte budget enforced',raises(lambda:inspect(normal,budget=1),'expanded_budget'))
    tampered=root/'tampered.zip'
    with zipfile.ZipFile(normal) as src,zipfile.ZipFile(tampered,'w') as dst:
        for name in src.namelist():dst.writestr(name,b'changed' if name.endswith('.png') else src.read(name))
    check('changed asset bytes rejected',raises(lambda:inspect(tampered),'hash_mismatch'))
    target.with_suffix('.lock').write_bytes(b'owned by fixture writer')
    check('second writer cannot silently replace a locked project',raises(lambda:commit(target,project,asset,root),'exist'))
    target.with_suffix('.lock').unlink()
    session=Session();message={'project':'A','revision':3,'job':'job-1','result':{'parts':['prepared']}}
    check('cross-project completion rejected',not session.accept(dict(message,project='B')))
    check('stale revision completion rejected',not session.accept(dict(message,revision=2)))
    session.cancelled.add('job-1');check('cancelled job late completion rejected',not session.accept(message))
    message['job']='job-2';check('matching result applies once and increments edit revision',session.accept(message) and session.revision==4)
    check('duplicate completion no longer matches revision',not session.accept(message))
    check('structural edit does not replace running snapshot',session.runtime_revision==2)
    session.pending_runtime=4;check('staged runtime change waits for frame boundary',session.runtime_revision==2)
    session.frame_boundary();check('explicit frame boundary commits complete snapshot',session.runtime_revision==4)
    session.revision=5;session.saved(4);check('save finishing after new edit leaves document dirty',session.saved_revision!=session.revision)
    snapshot=deepcopy({'revision':session.revision,'parts':['v1']});session.revision+=1
    check('export snapshot remains tied to its captured revision',snapshot['revision']==5 and session.revision==6)
    result={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'scope':'Policy fixtures and injected failures only. Not product integration, power-loss, actual disk-full or global-hotkey verification.',
            'passed':sum(v['pass'] for v in checks),'total':len(checks),'checks':checks,
            'fixture_directory':str(root.relative_to(BASE)).replace('\\','/'),'script_sha256':sha(Path(__file__).read_bytes())}
    out=BASE/'results/policy-verification.json';out.parent.mkdir(exist_ok=True);out.write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
    print(result['passed'],'/',result['total'])
    if result['passed']!=result['total']:raise SystemExit(1)

if __name__=='__main__':run()
