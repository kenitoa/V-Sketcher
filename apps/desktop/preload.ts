import { contextBridge, ipcRenderer, webUtils } from 'electron';
import type { StudioInfo } from '../../packages/contracts';
import type { SessionCommand,SessionView,SessionReply } from '../../packages/project-session/contracts';
contextBridge.exposeInMainWorld('studio', Object.freeze({
  microphone:Object.freeze({begin:()=>ipcRenderer.invoke('microphone:begin'),end:()=>ipcRenderer.invoke('microphone:end'),profiles:()=>ipcRenderer.invoke('microphone:profiles'),save:(value:unknown)=>ipcRenderer.invoke('microphone:save',value)}),
  tracking:Object.freeze({begin:()=>ipcRenderer.invoke('tracking:begin'),end:()=>ipcRenderer.invoke('tracking:end'),frame:(seq:number,jpeg:Uint8Array)=>ipcRenderer.invoke('tracking:frame',seq,jpeg),profiles:()=>ipcRenderer.invoke('tracking:profiles'),saveCalibration:(value:unknown)=>ipcRenderer.invoke('tracking:calibration',value)}),
  info: (): Promise<StudioInfo> => ipcRenderer.invoke('studio:info'),
  health: (): Promise<{ ready: boolean }> => ipcRenderer.invoke('studio:health'),
  projects:Object.freeze({ dropImage:(file:File):Promise<SessionReply> => { const path=webUtils.getPathForFile(file);if(!path)return Promise.reject(new Error('E_INPUT_NATIVE_FILE'));return ipcRenderer.invoke('projects:drop-image',path); },view:():Promise<SessionView> => ipcRenderer.invoke('projects:view'),command:(command:SessionCommand):Promise<SessionReply> => ipcRenderer.invoke('projects:command',command),subscribe:(listener:(view:SessionView)=>void):(()=>void) => { const receive = (_event:Electron.IpcRendererEvent,view:SessionView):void => listener(view); ipcRenderer.on('projects:changed',receive); return () => ipcRenderer.removeListener('projects:changed',receive); } })
}));
