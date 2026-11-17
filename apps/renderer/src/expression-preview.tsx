import React,{useEffect,useRef,useState} from 'react';
import type {PreviewScene} from '../../../packages/scene-core';
import type {MotionPlayer} from '../../../packages/motion';
import {AvatarRenderer} from '../../../packages/avatar-renderer';
/** Observe the main editor clock. A second view must not advance the controller twice. */
export function ExpressionPreview({scene,player}:{scene:PreviewScene|null;player:MotionPlayer}){
 const canvas=useRef<HTMLCanvasElement>(null),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);const key=JSON.stringify(scene);
 useEffect(()=>{setReady(false);setFailed(false);if(!scene||!canvas.current)return;let disposed=false,animation=0;let r:AvatarRenderer;try{r=new AvatarRenderer(canvas.current,scene);}catch{setFailed(true);return;}void r.load(document.baseURI).then(()=>{if(disposed)return;const draw=()=>{r.draw(player.snapshot().parameters);setReady(true);animation=requestAnimationFrame(draw);};draw();}).catch(()=>setFailed(true));return()=>{disposed=true;cancelAnimationFrame(animation);r.dispose();};},[key,player]);
 return <aside className="expression-preview" aria-label="표정 미리보기"><canvas ref={canvas} width="480" height="600" hidden={!scene||failed} data-expression-preview={ready?'ready':'loading'}/>{failed&&<p role="alert">그림을 표시하지 못했어요. 파일 연결을 확인해 주세요.</p>}<small>현재 제어 결과</small></aside>;
}
