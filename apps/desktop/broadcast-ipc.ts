import { ipcMain, clipboard, type BrowserWindow } from 'electron';
import type { ProjectSession } from '../../packages/project-session';
import type { OutputFrame, OutputSettings } from '../../packages/broadcast';
import { BroadcastServer } from './broadcast-server';
import { createBroadcastWindow } from './broadcast-window';
export async function installBroadcast(
  window: BrowserWindow,
  project: ProjectSession,
  directory: string,
  rendererRoot: string,
  trusted: (event: Electron.IpcMainInvokeEvent) => void,
  acceptFrame = () => true,
): Promise<BroadcastServer> {
  const output = new BroadcastServer(directory, rendererRoot);
  await output.init();
  output.subscribe(() => {
    if (!window.isDestroyed()) window.webContents.send('broadcast:changed', output.view());
  });
  let syncing: string | null = null,
    latest: OutputFrame | null = null,
    preview: BrowserWindow | null = null;
  ipcMain.on('broadcast:frame', (event, value: OutputFrame) => {
    try {
      trusted(event as Electron.IpcMainInvokeEvent);
      if (
        !acceptFrame() ||
        !value ||
        typeof value.sourceId !== 'string' ||
        !project.activeRuntime(value.sourceId) ||
        output.view().state !== 'SOURCE_READY'
      )
        return;
      latest = value;
      if (output.view().sourceId === value.sourceId) {
        output.publish(value);
        return;
      }
      if (syncing) return;
      syncing = value.sourceId;
      void project
        .broadcastSnapshot(value.sourceId)
        .then((source) => {
          if (output.view().state === 'SOURCE_READY' && project.activeRuntime(source.id)) {
            output.setSource(source);
            if (latest?.sourceId === source.id) output.publish(latest);
          }
        })
        .catch(() => {})
        .finally(() => {
          syncing = null;
        });
    } catch {
      /* untrusted renderer data cannot control or diagnose the output server */
    }
  });
  ipcMain.handle('broadcast:command', async (event, type: unknown, value: unknown) => {
    trusted(event);
    try {
      if (type === 'view') return output.view();
      if (type === 'preview') {
        if (preview && !preview.isDestroyed()) {
          const v = output.view();
          preview.setContentSize(v.settings.width / 2, v.settings.height / 2);
          await preview.loadURL(output.url()!);
          preview.show();
        } else preview = await createBroadcastWindow(output, true);
        return true;
      }
      if (type === 'stop') return output.stop();
      if (type === 'copy') {
        const url = output.url();
        if (!url) return false;
        clipboard.writeText(url);
        return true;
      }
      if (type === 'configure') return await output.configure(value as OutputSettings);
      if (type === 'restore') return await output.restore();
      if (type === 'rotate') return await output.rotate();
      if (type === 'confirm')
        return await output.confirm(value as Parameters<BroadcastServer['confirm']>[0]);
      if (type === 'restart') {
        const id = output.view().sourceId;
        if (!id) throw new Error('E_OUTPUT_RUN');
        await output.configure(output.view().settings);
        await output.close();
        return await output.start(await project.broadcastSnapshot(id));
      }
      if (type === 'start') {
        if (typeof value !== 'string' || !/^[a-f0-9-]{36}$/.test(value))
          throw new Error('E_OUTPUT_RUN');
        return await output.start(await project.broadcastSnapshot(value));
      }
      throw new Error('E_OUTPUT_COMMAND');
    } catch (e) {
      return {
        ...output.view(),
        errorCode:
          e instanceof Error && /^E_OUTPUT_[A-Z_]+$/.test(e.message)
            ? e.message
            : 'E_OUTPUT_OPERATION',
      };
    }
  });
  return output;
}
