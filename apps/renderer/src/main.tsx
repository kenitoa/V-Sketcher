import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { readProject } from '../../../packages/project-model';
import { projectToPreview } from '../../../packages/project-model/preview';
import { checkMotionPixels } from './motion-self-check';
import { checkModelPixels } from './model-self-check';
import { Workflow } from '../../../packages/workflow';
import { WorkflowLab } from './workflow-lab';
import { checkWorkflow } from './workflow-self-check';
import type { Project } from '../../../packages/project-model';
import type { StudioInfo } from '../../../packages/contracts';
import type { SessionView } from '../../../packages/project-session/contracts';
import { ProjectDesk } from './project-desk';
import './studio.css';
import './editor.css';
import { Modal } from './ui-foundations';

function Icon({ kind }: { kind: 'home' | 'layers' | 'image' | 'parts' | 'arrow' | 'settings' }) {
  const paths = { home: 'M3 10 12 3l9 7v10H7V10m3 10v-6h4v6', layers: 'm3 7 9-4 9 4-9 4-9-4m0 5 9 4 9-4M3 17l9 4 9-4', image: 'M3 4h18v16H3zm0 12 6-6 5 5 3-3 4 4M15 8h.01', parts: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z', arrow: 'M5 12h14m-5-5 5 5-5 5', settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m0-5v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4' };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>;
}
function Studio() {
  const canvas = useRef<HTMLCanvasElement>(null); const renderer = useRef<AvatarRenderer | null>(null);
  const project = useRef<Project | null>(null);
  const workflow = useRef<Workflow | null>(null);
  const [labOpen,setLabOpen] = useState(false);
  const [sessionView,setSessionView] = useState<SessionView | null>(null);
  const [info, setInfo] = useState<StudioInfo | null>(null); const [about, setAbout] = useState(false);
  const [previewReady, setPreviewReady] = useState(false); const [error, setError] = useState(false);
  useEffect(() => { void window.studio.info().then(setInfo); }, []);
  useEffect(() => { if (!about) return; const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setAbout(false); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [about]);
  useEffect(() => {
    let frame = 0; let disposed = false;
    void (async () => {
      const opened = readProject(await (await fetch(new URL('assets/preview-project.json', document.baseURI))).json());
      if (opened.mode !== 'read-write') throw new Error('E_SCHEMA_READ_ONLY');
      project.current = opened.project;
      const flow = new Workflow(opened.project); workflow.current = flow;
      const scene = projectToPreview(flow.project());
      if (!canvas.current || disposed) return;
      const render = new AvatarRenderer(canvas.current, scene); renderer.current = render; await render.load(document.baseURI); if (disposed) { render.dispose(); return; }
      setPreviewReady(true);
      flow.stageRuntime(); let published = false;
      const animate = (now: number) => {
        if (!published) { flow.publishAtFrameBoundary(); published = true; }
        const t = now / 1000; const blink = Math.abs(t % 6 - 5.4) < .11 ? 0 : 1;
        render.draw({ eye_left: blink, eye_right: blink, mouth: 0, head_yaw: Math.sin(t * .3) * .14, head_roll: Math.sin(t * .38) * .16 });
        frame = requestAnimationFrame(animate);
      }; frame = requestAnimationFrame(animate);
    })().catch(() => setError(true));
    return () => { disposed = true; cancelAnimationFrame(frame); renderer.current?.dispose(); void workflow.current?.close(); };
  }, []);
  useEffect(() => {
    if (!info || !previewReady || !renderer.current) return;
    window.foundationSelfCheck = async () => {
      const health = await window.studio.health();
      document.querySelector<HTMLButtonElement>('[data-about]')?.click();
      await new Promise(resolve => setTimeout(resolve, 80));
      const dialog = document.querySelector('[role="dialog"]') !== null;
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 80));
      const globals = window as unknown as Record<string, unknown>;
      const modelPixels = await checkModelPixels(project.current!); const motionPixels = await checkMotionPixels(project.current!);
      const workflowCore = await checkWorkflow(project.current!);
      let workflowUI:Record<string,unknown> = { passed:true,developmentOnly:true,visible:false };
      if (info.channel !== 'release') {
        document.querySelector<HTMLButtonElement>('[data-workflow-lab]')?.click();
        const start = performance.now(); while (!window.workflowLabCheck) { if (performance.now()-start > 5000) throw new Error('E_WORKFLOW_UI_TIMEOUT'); await new Promise(resolve => setTimeout(resolve,10)); }
        workflowUI = await window.workflowLabCheck();
        await new Promise(resolve => setTimeout(resolve,50));
      }
      return { ...renderer.current!.report(), modelPixels,motionPixels,workflowCore,workflowUI,sampleRuntimeFrozen:workflow.current?.runtimeSnapshot() !== null,workflowLabVisible:document.querySelector('[data-workflow-lab]') !== null, workerReady: health.ready, nodeExposed: typeof globals.require !== 'undefined',
        shellExposed: typeof (window.studio as unknown as Record<string, unknown>).shell !== 'undefined',
        appInfoDialog: dialog && document.querySelector('[role="dialog"]') === null,
        diagnosticsVisible: document.querySelector('[data-development]') !== null,
        projectRoutesEnabled: document.querySelectorAll('[data-create]').length === 3 && [...document.querySelectorAll<HTMLButtonElement>('[data-create]')].every(button => !button.disabled) };
    };
    return () => { delete window.foundationSelfCheck; };
  }, [info, previewReady]);
  return <div className={`studio ${sessionView?.mode === 'editable' ? 'is-editing' : ''}`}><a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <aside className="sidebar"><div className="brand"><span className="brand-mark">S<span/></span><div>2D<span>SKETCHER</span></div></div>
      <div className="nav-caption">YOUR STUDIO</div><nav aria-label="주 메뉴"><button className="nav active" aria-current="page" onClick={() => window.dispatchEvent(new Event('studio:home'))}><Icon kind="home"/>작업실</button>
        <button className="nav" onClick={() => window.dispatchEvent(new Event('studio:recent'))}><Icon kind="layers"/>내 프로젝트</button><button className="nav" disabled><Icon kind="parts"/>파츠 보관함</button></nav>
      <div className="sidebar-bottom"><div className="local-dot"/>내 기기에서, 나의 작업실<div className="sidebar-sub">당신만의 캐릭터를 위한 공간</div><button data-about onClick={() => setAbout(true)} className="nav settings"><Icon kind="settings"/>앱 정보</button></div>
    </aside>
    <main id="main-content" tabIndex={-1}><header className="topbar"><span>작업실 <span className="crumb">/</span> <strong>{sessionView?.project ? '캐릭터 편집' : '시작하기'}</strong></span><div><span className="version">EARLY PREVIEW</span><span className="avatar-letter">S</span></div></header>
      <div className="workspace"><section className="welcome" hidden={sessionView?.mode !== undefined && sessionView.mode !== 'empty'}><span className="eyebrow">A NEW CHAPTER STARTS HERE</span><h1>상상하던 모습이,<br/><em>나의 캐릭터로.</em></h1><p>그림을 준비하는 순간부터 무대에 오르기까지.<br/>당신의 이야기가 시작될 작은 작업실이에요.</p></section>
        <ProjectDesk onView={setSessionView}/>
        <footer className="workspace-footer"><span>2DSketcher Studio</span><span>프로젝트 저장·복구 가능 · 자동 제작·추적은 준비 중</span>{info && info.channel !== 'release' && <><span data-development className="dev-badge">{info.channel === 'test' ? '시험 빌드' : '개발 빌드'}</span><button data-workflow-lab onClick={() => setLabOpen(true)}>작업 상태 시험</button></>}</footer>
      </div>
    </main>
    <aside className="character-panel"><div className="preview-top"><span><i/>샘플 미리보기</span><span className="preview-label">ORIGINAL CHARACTER</span></div><div className="stage"><div className="stage-halo"/><div className="stage-line line-one"/><div className="stage-line line-two"/><canvas hidden={!!sessionView && sessionView.mode !== 'empty'} ref={canvas} width="800" height="1000" aria-label="고급 보라색 캐릭터 샘플"/>{error && <div className="preview-error">샘플을 불러오지 못했어요.<br/>앱을 다시 열어 확인해 주세요.</div>}</div><div className="character-caption"><span className="character-index">SAMPLE / 001</span><h2>{sessionView?.project?.displayName ?? (sessionView?.mode === 'read-only' ? 'Read only' : 'Violet')}</h2><p>섬세한 선과 빛, 온전히 당신의 모습으로.</p><div className="preview-status"><span className={previewReady ? 'status-dot ready' : 'status-dot'}/>{previewReady ? '아트 미리보기' : '샘플을 준비하고 있어요'}<span className="status-separator"/>입력 장치 연결 전</div></div></aside>
    {about && <Modal titleId="about-title" onClose={() => setAbout(false)}><span className="eyebrow">YOUR LOCAL STUDIO</span><h2 id="about-title">2DSketcher</h2><p>버전 {info?.version} · 초기 미리보기</p><p>고급 캐릭터 미리보기를 제공하는 개발 초기 버전입니다.<br/>프로젝트 생성·저장·복구·되돌리기를 제공합니다. 자동 제작·장치 추적은 준비 중입니다.</p><button className="primary" onClick={() => setAbout(false)}>작업실로 돌아가기</button></Modal>}
    {labOpen && project.current && info?.channel !== 'release' && <WorkflowLab project={project.current} onClose={() => setLabOpen(false)}/>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<Studio/>);
