"""Rebuild source in a new project-local directory with fresh Node/venv/npm installations."""
from pathlib import Path
import datetime,json,os,shutil,subprocess,sys,time
ROOT=Path(__file__).resolve().parent.parent

def run():
    target=ROOT/'.local/repro'/f'run-{time.time_ns()}'/'source with spaces'
    if not target.resolve().is_relative_to((ROOT/'.local/repro').resolve()):raise ValueError('E_REPRO_PATH')
    target.mkdir(parents=True)
    names=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z'],cwd=ROOT).decode('utf-8').split('\0')
    count=0
    for name in names:
        if not name:continue
        source=ROOT/name;destination=target/name
        if not source.is_file():continue
        if not destination.resolve().is_relative_to(target.resolve()):raise ValueError('E_SOURCE_PATH')
        destination.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,destination);count+=1
    logdir=ROOT/'.local/repro';log=logdir/'latest.log'
    env={k:v for k,v in os.environ.items() if not k.upper().startswith(('PYTHON','NODE','NPM','ELECTRON','VIRTUAL_ENV','CONDA'))}
    commands=[[sys.executable,'scripts/bootstrap.py'],['cmd.exe','/d','/c','tools\\dev.cmd','ci'],
              ['cmd.exe','/d','/c','tools\\dev.cmd','run','check'],
              [str(target/'.local/toolchain/node-v24.22.3-win-x64/node.exe'),'scripts/smoke.mjs']]
    started=time.monotonic()
    with log.open('wb') as output:
        for command in commands:
            result=subprocess.run(command,cwd=target,env=env,stdout=output,stderr=subprocess.STDOUT)
            if result.returncode:raise SystemExit('Fresh-environment check failed; inspect .local/repro/latest.log')
    app=json.loads((target/'.local/smoke/development/report.json').read_text(encoding='utf-8'))
    if not app['passed']:raise ValueError('E_REPRO_APP')
    report={'passed':True,'date':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Fresh project directory and fresh developer installations on the same Windows PC',
            'sourceFilesCopied':count,'freshNode':True,'freshVenv':True,'npmCi':True,'hashedPipInstall':True,
            'requiredChecks':True,'appSmoke':app,'elapsedSeconds':round(time.monotonic()-started,2),'cleanWindowsOS':False}
    (ROOT/'evidence/phase06/reproducibility.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print('Fresh Node/venv/npm environment and app smoke passed; same-PC scope.')

if __name__=='__main__':run()
