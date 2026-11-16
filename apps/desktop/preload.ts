import { contextBridge, ipcRenderer } from 'electron';
import type { StudioInfo } from '../../packages/contracts';
import type { SessionCommand,SessionView,SessionReply } from '../../packages/project-session/contracts';
contextBridge.exposeInMainWorld('studio', Object.freeze({
  info: (): Promise<StudioInfo> => ipcRenderer.invoke('studio:info'),
  health: (): Promise<{ ready: boolean }> => ipcRenderer.invoke('studio:health'),
  projects:Object.freeze({ view:():Promise<SessionView> => ipcRenderer.invoke('projects:view'),command:(command:SessionCommand):Promise<SessionReply> => ipcRenderer.invoke('projects:command',command),subscribe:(listener:(view:SessionView)=>void):(()=>void) => { const receive = (_event:Electron.IpcRendererEvent,view:SessionView):void => listener(view); ipcRenderer.on('projects:changed',receive); return () => ipcRenderer.removeListener('projects:changed',receive); } })
}));
