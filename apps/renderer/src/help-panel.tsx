import React,{useState} from 'react';
import type {SourceType} from '../../../packages/project-model';
import {findGuides,guideTopics,routeHints} from '../../../packages/user-guide';
import {Modal} from './ui-foundations';
import './help.css';

export function HelpPanel({initialTopic,onClose,onRoute,onExample,exampleDisabled}:{initialTopic:string;exampleDisabled:boolean;onClose:()=>void;onRoute:(route:SourceType)=>void;onExample:()=>void}){
 const [query,setQuery]=useState(''),[selected,setSelected]=useState(initialTopic);
 const results=findGuides(query),topic=results.find(t=>t.id===selected)??results[0];
 return <Modal titleId="help-title" className="help-dialog guide-dialog" onClose={onClose}>
  <header><div><p className="eyebrow">처음부터 차근차근</p><h2 id="help-title">작업실 도움말</h2></div><button data-guide-close aria-label="도움말 닫기" onClick={onClose}>닫기</button></header>
  <label className="guide-search">무엇이 궁금한가요?<input data-guide-search data-initial-focus type="search" value={query} placeholder="예: OBS, 복구, 리깅" onChange={e=>setQuery(e.target.value)}/></label>
  <div className="guide-layout"><nav aria-label="도움말 주제">{results.map(t=><button key={t.id} data-guide-topic={t.id} aria-current={topic?.id===t.id?'page':undefined} onClick={()=>setSelected(t.id)}>{t.title}</button>)}{!results.length&&<p role="status">찾은 설명이 없어요. 다른 말로 검색해 보세요.</p>}</nav>
  <article data-guide-content aria-live="polite">{topic&&<><h3>{topic.title}</h3><p className="guide-summary">{topic.summary}</p><ol>{topic.steps.map((s,i)=><li key={i}>{s}</li>)}</ol><p className="guide-check">{topic.check}</p>{topic.id==='start'&&<><button data-guide-example disabled={exampleDisabled} className="primary" onClick={onExample}>예제로 움직임 시작</button><p className="guide-note">준비된 고급 파츠 예제예요. 내 그림의 자동 리깅 결과가 아니에요.</p><div className="guide-routes">{(['parts','single-image','split-image'] as const).map(r=><button key={r} data-guide-route={r} onClick={()=>onRoute(r)}>{guideTopics.find(t=>t.id===r)!.title}<small>{routeHints[r]}</small></button>)}</div></>}</>}</article></div>
 </Modal>;
}
