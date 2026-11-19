import { app, dialog, ipcMain, shell, type BrowserWindow } from 'electron';
import { readFile, open, rename, unlink, mkdir, readdir, lstat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { SettingsStore } from '../../packages/settings/store';
import { assertSettings, diagnosticData, type EnvironmentSettings } from '../../packages/settings';
export async function installEnvironment(
  window: BrowserWindow,
  store: SettingsStore,
  trusted: (e: Electron.IpcMainInvokeEvent) => void,
  root: string,
  version: string,
  apply: (v: EnvironmentSettings) => Promise<void>,
  modal: (on: boolean) => void,
  testPath?: string,
): Promise<void> {
  const notices = app.isPackaged
    ? join(process.resourcesPath, 'notices')
    : join(root, 'dist/notices');
  const versions = {
    app: version,
    project: '1.9',
    electron: process.versions.electron ?? 'unknown',
    chromium: process.versions.chrome ?? 'unknown',
    tracking:
      'MediaPipe ' +
      (JSON.parse(await readFile(join(notices, 'dependency-inventory.json'), 'utf8')).python.find(
        (p: { name: string }) => p.name.toLowerCase() === 'mediapipe',
      )?.version ?? 'bundled'),
    checker: '1.1.0',
    converter: '0.3.0',
    broadcast: 'OBS Studio 33.0.1',
    avatar: 'Inochi Session 0.8.7 / SDK 0.8.6',
  };
  let busy = false,
    lastMetric = 0;
  const exclusive = async <T>(action: () => Promise<T>): Promise<T> => {
    if (busy) throw new Error('E_SETTINGS_BUSY');
    busy = true;
    modal(true);
    try {
      return await action();
    } finally {
      modal(false);
      busy = false;
    }
  };
  ipcMain.handle('settings:view', (e) => {
    trusted(e);
    return store.view();
  });
  ipcMain.handle('settings:save', async (e, value: unknown) => {
    trusted(e);
    try {
      assertSettings(value);
      await store.save(value);
      await apply(store.view().value);
      window.webContents.send('settings:changed', store.view());
      return { ok: true };
    } catch {
      return { ok: false, errorCode: 'E_SETTINGS_WRITE' };
    }
  });
  ipcMain.handle('settings:folder', async (e, clear: unknown = false) => {
    trusted(e);
    try {
      return await exclusive(async () => {
        if (typeof clear !== 'boolean') throw new Error();
        let folder: string | null = null;
        if (!clear) {
          if (testPath) {
            folder = join(testPath, 'default-saves');
            await mkdir(folder, { recursive: true });
          } else {
            const result = await dialog.showOpenDialog(window, {
              title: '기본 저장 폴더 선택',
              properties: ['openDirectory'],
            });
            if (result.canceled) return { ok: true, selected: !!store.folder };
            folder = result.filePaths[0] ?? null;
          }
        }
        await store.setFolder(folder);
        return { ok: true, selected: !!store.folder };
      });
    } catch {
      return { ok: false, selected: !!store.folder };
    }
  });
  ipcMain.handle('settings:metrics', (e) => {
    trusted(e);
    const now = performance.now(),
      metrics = app.getAppMetrics(),
      elapsed = lastMetric ? now - lastMetric : 0;
    lastMetric = now;
    return {
      kind: 'MEASURED',
      windowMs: elapsed,
      processes: metrics.length,
      cpuPercent: elapsed > 250 ? metrics.reduce((n, p) => n + p.cpu.percentCPUUsage, 0) : null,
      rssMiB: metrics.reduce((n, p) => n + p.memory.workingSetSize, 0) / 1024,
      gpu: 'UNMEASURED',
      scope: 'ELECTRON_PROCESSES',
    };
  });
  ipcMain.handle('settings:diagnostic', async (e, input: unknown) => {
    trusted(e);
    try {
      return await exclusive(async () => {
        const data = diagnosticData(input, versions);
        let destination: string | null = null;
        if (testPath) destination = join(testPath, 'minimal-diagnostic.json');
        else {
          const result = await dialog.showSaveDialog(window, {
            title: '최소 진단 파일 저장',
            defaultPath: join(
              store.folder ?? app.getPath('documents'),
              '2DSketcher-diagnostic.json',
            ),
            filters: [{ name: 'JSON 진단', extensions: ['json'] }],
          });
          destination = result.canceled ? null : (result.filePath ?? null);
        }
        if (!destination) return { ok: true, cancelled: true };
        if (
          !destination.endsWith('.json') ||
          destination.startsWith('\\\\') ||
          (await lstat(dirname(destination))).isSymbolicLink()
        )
          throw new Error();
        try {
          if ((await lstat(destination)).isSymbolicLink()) throw new Error();
        } catch (err) {
          if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
        }
        const temporary = destination + '.' + randomUUID() + '.tmp';
        try {
          const fd = await open(temporary, 'wx', 0o600);
          try {
            await fd.writeFile(JSON.stringify(data, null, 2) + '\n');
            await fd.sync();
          } finally {
            await fd.close();
          }
          await rename(temporary, destination);
        } finally {
          await unlink(temporary).catch(() => {});
        }
        return { ok: true, cancelled: false };
      });
    } catch {
      return { ok: false, errorCode: 'E_DIAGNOSTIC_WRITE' };
    }
  });
  ipcMain.handle('settings:clear-logs', async (e) => {
    trusted(e);
    try {
      const directory = join(app.getPath('userData'), 'logs');
      for (const name of await readdir(directory).catch(() => [] as string[]))
        if (/^events(?:\.[1-4])?\.jsonl$/.test(name)) {
          const path = join(directory, name);
          if (!(await lstat(path)).isSymbolicLink()) await unlink(path);
        }
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });
  ipcMain.handle('settings:support', async (e) => {
    trusted(e);
    const p = JSON.parse(
      await readFile(join(root, 'dist/renderer/assets/preview-project.json'), 'utf8'),
    );
    const rows = p.assets.map(
      (a: { attribution: { creator: string; source: string; usage: string } }) => ({
        author: a.attribution.creator,
        source: a.attribution.source,
        license: a.attribution.usage,
      }),
    );
    return {
      versions,
      attributions: rows,
      noticesAvailable: !!(await lstat(notices).catch(() => null)),
    };
  });
  ipcMain.handle('settings:data-folder', async (e) => {
    trusted(e);
    return testPath ? true : (await shell.openPath(app.getPath('userData'))) === '';
  });
  ipcMain.handle('settings:notices', async (e) => {
    trusted(e);
    return testPath ? true : (await shell.openPath(notices)) === '';
  });
}
