import type {SessionView} from '../../../packages/project-session/contracts';
/** Match the committed React view and invoke the control in the same JS turn. */
export async function clickCommittedControl(selector:string,current:()=>SessionView|null):Promise<void>{
 await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
 const start=Date.now();
 for(;;){
  const view=current();const committed=Number(document.querySelector('[data-session-sequence]')?.getAttribute('data-session-sequence'));
  const control=document.querySelector<HTMLElement>(selector);
  if(view&&committed===view.sequence&&control&&!control.matches(':disabled')&&!control.closest('[inert]')){control.click();return;}
  if(Date.now()-start>65000){window.editorFailureState={...window.editorFailureState,control:selector,committedSequence:committed,expectedSequence:view?.sequence,errorCode:view?.errorCode};throw new Error('E_UI_CONTROL_TIMEOUT');}
  await new Promise(resolve=>setTimeout(resolve,20));
 }
}
