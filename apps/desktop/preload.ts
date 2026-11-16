import { contextBridge, ipcRenderer } from 'electron';
import type { StudioInfo } from '../../packages/contracts';
contextBridge.exposeInMainWorld('studio', Object.freeze({
  info: (): Promise<StudioInfo> => ipcRenderer.invoke('studio:info'),
  health: (): Promise<{ ready: boolean }> => ipcRenderer.invoke('studio:health')
}));
