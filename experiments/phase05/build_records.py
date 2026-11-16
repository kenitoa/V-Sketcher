"""Machine-readable decision/gate ledger derived from the reviewed phase05 contracts."""
from pathlib import Path
import json,hashlib,time
BASE=Path(__file__).resolve().parent
ROOT=BASE.parent.parent
def read(path):return json.loads(Path(path).read_text(encoding='utf-8'))
def write(path,data):Path(path).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def run():
    measured=read(BASE.parent/'phase04/results/obs-encoded-load.json')
    choices=[
        ('01','Windows 11 x64, self-contained portable ZIP/EXE','T-041',['M0-R05']),
        ('02','PNG/JPEG; explicit supported composition and 4096px/16MP target','T-042',['M0-R02','M0-R03']),
        ('03','Transparent PNG folder and 2dparts bundle, explicit origins and 64-part target','T-042',['M0-R02','M0-R05']),
        ('04','One premium style family, 64 valid combinations as release asset target','T-043',['M0-R02']),
        ('05','Five normalized controls, GPU mesh/curves, 6deg/4.5pct-face motion target','T-043',['M0-R01','M0-R02','M0-R04']),
        ('06','OBS 33.0.1 Browser Source; shared local WebGL2 output','T-044',['M0-R01','M0-R05']),
        ('07','INP, Inochi Session v0.8.7 / SDK v0.8.6 compatibility profile','T-044',['M0-R04']),
        ('08','2dsketch ZIP, hashes, revision snapshots, validated backups and atomic replacement','T-045',['M0-R05']),
        ('09','Project/revision/job/generation isolation; frame-boundary runtime snapshots','T-046',['M0-R05']),
        ('10','Local 2D processing; no required server/account or raw media retention','T-046',['M0-R05']),
        ('11','Fixed performance/art/usability/sample gates v1.0; unmeasured is not pass','T-047',['M0-R01','M0-R02','M0-R03','M0-R04','M0-R05']),
        ('12','Local hotkeys default; opt-in global registration with explicit failure/fallback','T-046',['M0-R05'])]
    decs=[{'id':'DEC-'+number,'decision':summary,'state':'ADOPTED_IMPLEMENTATION_POLICY','owner':'Codex','date':'2026-11-16',
           'todo':todo,'implementation_or_release_validation_complete':False,'revalidation':risks,
           'document':'docs/planning/05-decisions.md'} for number,summary,todo,risks in choices]
    risks=[
        {'id':'M0-R01','title':'Shared GPU renderer and real-time OBS performance','gates':['PERF-01','PERF-02','PERF-03','OUT-01'],
         'required_evidence':'Actual Electron/OBS GPU runs, three routes, fixed scenes and repeated load/latency records'},
        {'id':'M0-R02','title':'Premium parts, automatic preparation, correction and microphone response','gates':['ART-01','ART-03','RUN-04'],
         'required_evidence':'Real separated premium combinations and single/split samples; independent art review; real sound trials'},
        {'id':'M0-R03','title':'Real beginner flow','gates':['UX-M0'],
         'required_evidence':'At least three actual beginners, one first route each; observed correction and first motion without operator takeover'},
        {'id':'M0-R04','title':'External motion preservation and independent use','gates':['OUT-02','OUT-03'],
         'required_evidence':'Matched internal/native-target poses and expressions; direct independent native use and device-binding walkthrough'},
        {'id':'M0-R05','title':'Packaged worker, offline resources and integrated state/storage policy','gates':['DATA-01'],
         'required_evidence':'Developer-tool-free Windows package run, Unicode paths, actual IPC cancellation/revision isolation and normal-file preservation'}]
    for r in risks:r.update(state='OPEN',owner='Codex',document='docs/planning/05-m0-review.md')
    gate_ids=[f'PERF-{i:02d}' for i in range(1,8)]+[f'RUN-{i:02d}' for i in range(1,6)]+['DATA-01']+[f'ART-{i:02d}' for i in range(1,4)]+[f'OUT-{i:02d}' for i in range(1,4)]+['UX-M0']+[f'UX-{i:02d}' for i in range(1,7)]
    gates=[{'id':gid,'contract_version':'1.0','product_gate_state':'NOT_RUN','document':'docs/planning/05-release-gates.md'} for gid in gate_ids]
    for gate in gates:
        if gate['id']=='PERF-01':gate['historical_cpu_path_state']='FAIL';gate['measured_cpu_canvas']=[640,640];gate['measured_cpu_fps']=measured['summary']['avatar_unique_fps']
        if gate['id'] in ['OUT-01','OUT-02','RUN-02','DATA-01']:gate['historical_spike_evidence']='LIMITED_PASS_NOT_PRODUCT_GATE_PASS'
    packages=read(BASE/'results/package-research.json')['packages']
    selected={p['name']:p['version'] for p in packages}
    selected['python']='3.14.10';selected['node']='24.22.3';selected['npm']='11.19.1'
    state={'schema_version':1,'contract_version':'1.0','date':'2026-11-16','scope':'Decisions and review completed, not product implementation or release approval',
           'todo_completed_in_phase':[f'T-{i:03d}' for i in range(41,51)],'decisions':decs,'selected_top_level_versions':selected,
           'dependency_lockfile_or_packaged_product_created':False,
           'm0':{'review_completed':True,'passed':False,'state':'HOLD','open_revalidation':risks},
           'gates':gates,'actual_beginner_release_participants':0,'current_premium_parts_library_complete':False,
           'mandatory_scope_preserved':['parts','single-image','split-image','in-app-runtime','broadcast','independent-2d-export','future-3d','future-self-developed-generation-model'],
           'evidence':{'policy_test':'experiments/phase05/results/policy-verification.json','existing_tracking_broadcast_export':'docs/planning/04-tracking-broadcast-export.md'}}
    write(BASE/'decisions.json',state)
    print('Recorded',len(decs),'decisions,',len(gates),'gates and',len(risks),'OPEN M0 revalidations')

if __name__=='__main__':run()
