import type {SessionCommand,SessionReply,SessionView} from '../../../packages/project-session/contracts';
import {guideTopics} from '../../../packages/user-guide';
import {clickCommittedControl} from './ui-check-control';

export async function checkGuideUI(host:{current:()=>SessionView|null;command:(c:SessionCommand)=>Promise<SessionReply>;settled:()=>Promise<unknown>},openExisting=false){
 const pause=()=>new Promise(r=>setTimeout(r,80));
 const verify=(value:unknown,code:string)=>{if(!value)throw new Error(code);};
 const click=async(selector:string)=>{await clickCommittedControl(selector,host.current);await host.settled();await pause();};
 const snapshot=()=>JSON.stringify(host.current()?.project);
 const media=navigator.mediaDevices,originalGet=media.getUserMedia;let requests=0;
 Object.defineProperty(media,'getUserMedia',{configurable:true,value:async()=>{requests++;throw new Error('E_GUIDE_UNEXPECTED_DEVICE');}});
 try{
  if(openExisting){await host.command({type:'open'});verify(host.current()?.project&&!host.current()?.errorCode,'E_GUIDE_EXISTING_PROJECT');}
  await host.command({type:'new',name:'안내 확인 원본',sourceType:'parts'});
  await host.command({type:'parts-start',expectedRevision:host.current()!.project!.revision});
  const before=snapshot();const help=document.querySelector<HTMLButtonElement>('[data-help]')!;help.focus();
  await click('[data-help]');verify(document.querySelector('[role=dialog]')?.contains(document.activeElement),'E_GUIDE_FOCUS');
  for(const topic of guideTopics){await click('[data-guide-topic="'+topic.id+'"]');verify(document.querySelector('[data-guide-content]')?.textContent?.includes(topic.title),'E_GUIDE_TOPIC');}
  const search=document.querySelector<HTMLInputElement>('[data-guide-search]')!;
  const set=async(value:string)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')!.set!.call(search,value);search.dispatchEvent(new Event('input',{bubbles:true}));await pause();};
  await set('OBS');verify(document.querySelector('[data-guide-content]')?.textContent?.includes('OBS'),'E_GUIDE_SEARCH');
  await set('찾을수없는도움말999');verify(document.querySelector('.guide-dialog [role=status]')?.textContent?.includes('없어요'),'E_GUIDE_EMPTY');await set('');
  const dialog=document.querySelector<HTMLElement>('.guide-dialog')!;
  verify(dialog.scrollWidth<=dialog.clientWidth+1,'E_GUIDE_OVERFLOW');
  verify(dialog.clientWidth>=Math.min(1000,innerWidth-64),'E_GUIDE_WIDTH');
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await pause();
  verify(!document.querySelector('[role=dialog]')&&document.activeElement===help&&!document.getElementById('root')!.inert,'E_GUIDE_RESTORE');verify(snapshot()===before,'E_GUIDE_MUTATION');
  for(const route of ['parts','single-image','split-image']){
   await click('[data-help]');await click('[data-guide-topic=start]');await click('[data-guide-route="'+route+'"]');
   verify(document.querySelector('[data-new-route="'+route+'"][aria-pressed=true]'),'E_GUIDE_ROUTE');await click('[data-new-cancel]');verify(snapshot()===before,'E_GUIDE_CANCEL_MUTATION');
  }
  // Native self-check discards only in its isolated profile. A normal user still gets the unsaved dialog.
  await click('[data-help]');await click('[data-guide-topic=start]');await click('[data-guide-example]');
  for(let n=0;n<100&&!host.current()?.project?.assembly;n++)await pause();
  verify(host.current()?.project?.displayName==='처음 만나는 캐릭터'&&host.current()?.project?.assembly,'E_GUIDE_EXAMPLE');
  verify(host.current()?.project?.projectId!==JSON.parse(before!).projectId,'E_GUIDE_NEW_ID');
  await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));await pause();
  verify(document.querySelector('[data-step-heading]')?.textContent?.includes('움직임'),'E_GUIDE_MOTION_STEP');
  verify(requests===0,'E_GUIDE_DEVICE_REQUEST');
  await host.command({type:'save'});verify(!host.current()?.dirty,'E_GUIDE_EXAMPLE_SAVE');
  await click('[data-help]');await click('[data-guide-topic=broadcast]');
  return {passed:true,existingProjectOpened:openExisting,topics:guideTopics.length,threeRouteChoices:true,search:true,noResults:true,escapeFocusRestored:true,openingAndCancellingPreservesProject:true,premiumPartsExample:true,exampleNavigatesToMotion:true,deviceRequests:requests,noviceObservation:false};
 }finally{Object.defineProperty(media,'getUserMedia',{configurable:true,value:originalGet});}
}
