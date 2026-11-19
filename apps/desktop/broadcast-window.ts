import { BrowserWindow, session } from 'electron';
import { randomUUID } from 'node:crypto';
import type { BroadcastServer } from './broadcast-server';
export async function createBroadcastWindow(
  output: BroadcastServer,
  visible: boolean,
): Promise<BrowserWindow> {
  const url = output.url();
  if (!url) throw new Error('E_OUTPUT_START');
  const { settings } = output.view();
  const partition = session.fromPartition('broadcast-' + randomUUID());
  partition.setPermissionCheckHandler(() => false);
  partition.setPermissionRequestHandler((_c, _p, done) => done(false));
  partition.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, done) =>
    done({ cancel: !details.url.startsWith(output.url() ?? 'invalid:') }),
  );
  const view = new BrowserWindow({
    width: Math.round(settings.width / 2),
    height: Math.round(settings.height / 2),
    useContentSize: true,
    show: false,
    resizable: false,
    backgroundColor: '#292334',
    title: '방송 출력 미리보기 · 어두운 바탕',
    autoHideMenuBar: true,
    webPreferences: {
      session: partition,
      zoomFactor: 0.5,
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      backgroundThrottling: false,
    },
  });
  view.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  view.webContents.on('will-navigate', (event, target) => {
    if (target !== output.url()) event.preventDefault();
  });
  await view.loadURL(url);
  if (visible) view.show();
  return view;
}
