import type { BrowserWindow } from 'electron';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { BroadcastServer } from './broadcast-server';
/** Only called by the explicit self-check CLI; not a renderer or HTTP command API. */
export async function broadcastOBSBridge(host: {
  window: BrowserWindow;
  output: BroadcastServer;
  directory: string;
  hold: (value: boolean) => void;
}) {
  const { window, output, directory } = host;
  await mkdir(directory, { recursive: true });
  const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
  let last = '';
  const step = (action: string, value?: unknown) =>
    window.webContents.executeJavaScript(
      `window.broadcastCheckStep(${JSON.stringify(action)},${JSON.stringify(value) ?? 'undefined'})`,
    );
  const connection = () =>
    writeFile(join(directory, 'connection.json'), JSON.stringify({ url: output.url() }));
  await connection();
  await writeFile(
    join(directory, 'ready.json'),
    JSON.stringify({ ready: true, state: output.view().state, sourceId: output.view().sourceId }),
  );
  const deadline = Date.now() + 600000;
  try {
    while (Date.now() < deadline) {
      let q: { id: string; action: string; value?: unknown };
      try {
        q = JSON.parse(await readFile(join(directory, 'command.json'), 'utf8'));
      } catch {
        await pause(50);
        continue;
      }
      if (q.id === last || !/^[a-f0-9-]{36}$/.test(q.id)) {
        await pause(50);
        continue;
      }
      last = q.id;
      try {
        let result: unknown;
        if (
          q.action === 'step' &&
          typeof q.value === 'string' &&
          [
            'state',
            'motion',
            'neutral',
            'expression',
            'edit',
            'apply',
            'save',
            'input-loss',
            'panel',
          ].includes(q.value)
        )
          result = await step(q.value);
        else if (q.action === 'hold') {
          host.hold(q.value === true);
          result = output.view();
        } else if (q.action === 'configure')
          result = await output.configure(q.value as Parameters<BroadcastServer['configure']>[0]);
        else if (q.action === 'restore') result = await output.restore();
        else if (q.action === 'restart')
          result = await window.webContents.executeJavaScript('window.studio.broadcast.restart()');
        else if (q.action === 'rotate') result = await output.rotate();
        else if (q.action === 'off') result = output.stop();
        else if (q.action === 'on') {
          const state = (await step('state')) as { runId: string };
          result = await window.webContents.executeJavaScript(
            `window.studio.broadcast.start(${JSON.stringify(state.runId)})`,
          );
        } else if (q.action === 'key' && ['F8', 'F9', 'F10', '1'].includes(String(q.value))) {
          await step('panel');
          window.show();
          window.focus();
          await window.webContents.executeJavaScript(
            `document.querySelector('[data-run-action="hide"]')?.focus()`,
          );
          await pause(200);
          window.webContents.sendInputEvent({
            type: 'keyDown',
            keyCode: String(q.value),
            modifiers: ['control', 'alt', 'shift'],
          });
          window.webContents.sendInputEvent({
            type: 'keyUp',
            keyCode: String(q.value),
            modifiers: ['control', 'alt', 'shift'],
          });
          await pause(250);
          result = await step('state');
        } else if (q.action === 'quit') {
          const report = JSON.parse(await readFile(join(directory, 'result.json'), 'utf8'));
          await writeFile(join(directory, 'reply-' + q.id + '.json'), JSON.stringify({ ok: true }));
          return report;
        } else throw new Error('E_OBS_BRIDGE_COMMAND');
        await connection();
        await writeFile(
          join(directory, 'reply-' + q.id + '.json'),
          JSON.stringify({ ok: true, result }),
        );
      } catch (e) {
        await writeFile(
          join(directory, 'reply-' + q.id + '.json'),
          JSON.stringify({
            ok: false,
            code:
              e instanceof Error
                ? (e.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_OBS_BRIDGE')
                : 'E_OBS_BRIDGE',
          }),
        );
      }
    }
    throw new Error('E_OBS_BRIDGE_TIMEOUT');
  } finally {
    host.hold(false);
  }
}
