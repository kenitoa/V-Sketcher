import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import type { PreviewScene } from '../../../packages/scene-core';
import type { StudioInfo } from '../../../packages/contracts';
import './studio.css';

function Icon({ kind }: { kind: 'home' | 'layers' | 'image' | 'parts' | 'arrow' | 'settings' }) {
  const paths = { home: 'M3 10 12 3l9 7v10H7V10m3 10v-6h4v6', layers: 'm3 7 9-4 9 4-9 4-9-4m0 5 9 4 9-4M3 17l9 4 9-4', image: 'M3 4h18v16H3zm0 12 6-6 5 5 3-3 4 4M15 8h.01', parts: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z', arrow: 'M5 12h14m-5-5 5 5-5 5', settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m0-5v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4' };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>;
}
function Studio() {
  const canvas = useRef<HTMLCanvasElement>(null); const renderer = useRef<AvatarRenderer | null>(null);
  const [info, setInfo] = useState<StudioInfo | null>(null); const [about, setAbout] = useState(false);
  const [previewReady, setPreviewReady] = useState(false); const [error, setError] = useState(false);
  useEffect(() => { void window.studio.info().then(setInfo); }, []);
  useEffect(() => { if (!about) return; const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setAbout(false); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [about]);
  useEffect(() => {
    let frame = 0; let disposed = false;
    void (async () => {
      const scene = await (await fetch(new URL('assets/preview-scene.json', document.baseURI))).json() as PreviewScene;
      if (!canvas.current || disposed) return;
      const render = new AvatarRenderer(canvas.current, scene); renderer.current = render; await render.load(document.baseURI); if (disposed) { render.dispose(); return; }
      setPreviewReady(true);
      const animate = (now: number) => {
        const t = now / 1000; const blink = Math.abs(t % 6 - 5.4) < .11 ? 0 : 1;
        render.draw({ eye_left: blink, eye_right: blink, mouth: 0, head_yaw: Math.sin(t * .3) * .14, head_roll: Math.sin(t * .38) * .16 });
        frame = requestAnimationFrame(animate);
      }; frame = requestAnimationFrame(animate);
    })().catch(() => setError(true));
    return () => { disposed = true; cancelAnimationFrame(frame); renderer.current?.dispose(); };
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
      return { ...renderer.current!.report(), workerReady: health.ready, nodeExposed: typeof globals.require !== 'undefined',
        shellExposed: typeof (window.studio as unknown as Record<string, unknown>).shell !== 'undefined',
        appInfoDialog: dialog && document.querySelector('[role="dialog"]') === null,
        diagnosticsVisible: document.querySelector('[data-development]') !== null,
        creationControlsDisabled: [...document.querySelectorAll<HTMLButtonElement>('[data-create]')].every(button => button.disabled) };
    };
    return () => { delete window.foundationSelfCheck; };
  }, [info, previewReady]);
  return <div className="studio">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">S<span/></span><div>2D<span>SKETCHER</span></div></div>
      <div className="nav-caption">YOUR STUDIO</div><nav aria-label="주 메뉴"><button className="nav active" aria-current="page"><Icon kind="home"/>작업실</button>
        <button className="nav" disabled><Icon kind="layers"/>내 프로젝트<span className="nav-note">준비 중</span></button><button className="nav" disabled><Icon kind="parts"/>파츠 보관함</button></nav>
      <div className="sidebar-bottom"><div className="local-dot"/>내 기기에서, 나의 작업실<div className="sidebar-sub">당신만의 캐릭터를 위한 공간</div><button data-about onClick={() => setAbout(true)} className="nav settings"><Icon kind="settings"/>앱 정보</button></div>
    </aside>
    <main><header className="topbar"><span>작업실 <span className="crumb">/</span> <strong>시작하기</strong></span><div><span className="version">EARLY PREVIEW</span><span className="avatar-letter">S</span></div></header>
      <div className="workspace"><section className="welcome"><span className="eyebrow">A NEW CHAPTER STARTS HERE</span><h1>상상하던 모습이,<br/><em>나의 캐릭터로.</em></h1><p>그림을 준비하는 순간부터 무대에 오르기까지.<br/>당신의 이야기가 시작될 작은 작업실이에요.</p></section>
        <section className="start-section" aria-labelledby="start-title"><div className="section-heading"><h2 id="start-title">어디에서 시작할까요?</h2><span>제작 기능 준비 중</span></div>
          <div className="routes">{[{ kind: 'parts' as const, n: '01', title: '파츠로 시작', desc: '어울리는 모습을 골라 조합하기' }, { kind: 'image' as const, n: '02', title: '그림 한 장', desc: '소중한 그림에서 시작하기' }, { kind: 'layers' as const, n: '03', title: '분리된 그림', desc: '준비된 부위들을 함께 연결하기' }].map(route => <button disabled data-create className="route" key={route.n}><span className="route-top"><Icon kind={route.kind}/><span>{route.n}</span></span><strong>{route.title}</strong><small>{route.desc}</small><span className="route-arrow"><Icon kind="arrow"/></span></button>)}</div>
        </section><section className="recent"><h2>이어서 작업하기</h2><div className="empty-project"><Icon kind="layers"/><div><strong>첫 번째 이야기를 기다리고 있어요</strong><p>프로젝트를 만들고 다시 이어가는 기능을 준비하고 있어요.</p></div></div></section>
        <footer className="workspace-footer"><span>2DSketcher Studio</span><span>제작 · 저장 · 추적 기능은 아직 준비 중이에요.</span>{info?.channel !== 'release' && <span data-development className="dev-badge">{info?.channel === 'test' ? '시험 빌드' : '개발 빌드'}</span>}</footer>
      </div>
    </main>
    <aside className="character-panel"><div className="preview-top"><span><i/>샘플 미리보기</span><span className="preview-label">ORIGINAL CHARACTER</span></div><div className="stage"><div className="stage-halo"/><div className="stage-line line-one"/><div className="stage-line line-two"/><canvas ref={canvas} width="800" height="1000" aria-label="고급 보라색 캐릭터 샘플"/>{error && <div className="preview-error">샘플을 불러오지 못했어요.<br/>앱을 다시 열어 확인해 주세요.</div>}</div><div className="character-caption"><span className="character-index">SAMPLE / 001</span><h2>Violet</h2><p>섬세한 선과 빛, 온전히 당신의 모습으로.</p><div className="preview-status"><span className={previewReady ? 'status-dot ready' : 'status-dot'}/>{previewReady ? '아트 미리보기' : '샘플을 준비하고 있어요'}<span className="status-separator"/>입력 장치 연결 전</div></div></aside>
    {about && <div className="modal-backdrop" role="presentation"><section className="about" role="dialog" aria-modal="true" aria-labelledby="about-title"><button className="close" onClick={() => setAbout(false)} aria-label="닫기">×</button><span className="eyebrow">YOUR LOCAL STUDIO</span><h2 id="about-title">2DSketcher</h2><p>버전 {info?.version} · 초기 미리보기</p><p>고급 캐릭터 미리보기를 제공하는 개발 초기 버전입니다.<br/>캐릭터 제작·저장·장치 추적 기능은 준비 중입니다.</p><button className="primary" onClick={() => setAbout(false)}>작업실로 돌아가기</button></section></div>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<Studio/>);
