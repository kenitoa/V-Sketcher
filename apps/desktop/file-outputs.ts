import { join } from 'node:path';
import { exportContentHash } from '../../packages/avatar-export/identity';
import { ipcMain, dialog, type BrowserWindow } from 'electron';
import type { ProjectSession } from '../../packages/project-session';
import { ImageExportService } from '../../packages/image-export/service';
import type { ImageRequest } from '../../packages/image-export/types';
import { CompatibilityService } from '../../packages/export-check/service';
import { assertTargetOptions, type TargetOptions } from '../../packages/export-check/types';
import { renderPNG } from './image-renderer';
import { installAvatarExports } from './avatar-exports';
export class FileOutputs {
  readonly image: ImageExportService;
  readonly compatibility: CompatibilityService;
  readonly avatar: ReturnType<typeof installAvatarExports>;
  constructor(
    window: BrowserWindow,
    project: ProjectSession,
    trusted: (e: Electron.IpcMainInvokeEvent) => void,
    modal: (value: boolean) => void,
    choose?: (name: string) => Promise<string | null>,
    avatarTest?: {
      choose: (name: string) => Promise<string | null>;
      locate: () => Promise<string | null>;
    },
    saveDirectory: () => string = () => '.',
  ) {
    const validate = (b: import('../../packages/execution/changes').InputBasis) => {
      try {
        return (
          project.runtimeInputBasis(b.source, b.projectId, b.revision).fingerprint === b.fingerprint
        );
      } catch {
        return false;
      }
    };
    const capture = project.captureFileInput.bind(project);
    this.image = new ImageExportService({
      capture,
      validate,
      running: () => project.runtimeBusy(),
      render: renderPNG,
      choose: async (name) => {
        modal(true);
        try {
          if (choose) return await choose(name);
          const result = await dialog.showSaveDialog(window, {
            title: '정지 PNG 이미지 저장',
            defaultPath: join(saveDirectory(), name),
            filters: [{ name: 'PNG RGBA/sRGB', extensions: ['png'] }],
          });
          return result.canceled ? null : (result.filePath ?? null);
        } finally {
          modal(false);
        }
      },
    });
    this.compatibility = new CompatibilityService(capture, validate);
    this.avatar = installAvatarExports(
      window,
      this.compatibility,
      validate,
      trusted,
      modal,
      avatarTest,
      () => project.runtimeBusy(),
      (basis, content) => {
        const p = project.view().project;
        return (
          basis.source === 'working' &&
          !!p &&
          p.projectId === basis.projectId &&
          p.revision === basis.revision &&
          exportContentHash(p) === content
        );
      },
      saveDirectory,
    );
    const error = (e: unknown, fallback: string) =>
      e instanceof Error && /^E_[A-Z_]{1,48}$/.test(e.message) ? e.message : fallback;
    ipcMain.handle('image-export:prepare', async (event, value: unknown) => {
      trusted(event);
      try {
        if (
          !value ||
          JSON.stringify(value).length > 8192 ||
          Object.keys(value).sort().join(',') !== 'id,live,projectId,revision,settings,source'
        )
          throw new Error('E_IMAGE_REQUEST');
        return { ok: true, ticket: await this.image.prepare(value as ImageRequest) };
      } catch (e) {
        return { ok: false, errorCode: error(e, 'E_IMAGE_RENDER') };
      }
    });
    ipcMain.handle('image-export:save', async (event, id: unknown) => {
      trusted(event);
      try {
        if (typeof id !== 'string') throw new Error('E_IMAGE_REQUEST');
        const receipt = await this.image.save(id);
        return receipt ? { ok: true, receipt } : { ok: true, cancelled: true };
      } catch (e) {
        const code = (e as NodeJS.ErrnoException).code;
        return {
          ok: false,
          errorCode:
            code === 'ENOSPC'
              ? 'E_IMAGE_SPACE'
              : code === 'EACCES' || code === 'EPERM'
                ? 'E_IMAGE_PERMISSION'
                : error(e, 'E_IMAGE_WRITE'),
        };
      }
    });
    ipcMain.handle('image-export:release', (event, id: unknown) => {
      trusted(event);
      if (typeof id === 'string') this.image.release(id);
    });
    ipcMain.handle('compatibility:command', async (event, type: unknown, value: unknown) => {
      trusted(event);
      try {
        const v = value as {
          source: 'working' | 'execution';
          projectId: string;
          revision: number;
          options: TargetOptions;
          id: string;
          signature: string;
          warningScope: string;
        };
        if (type === 'inspect') {
          if (!v || Object.keys(v).sort().join(',') !== 'options,projectId,revision,source')
            throw new Error('E_EXPORT_REQUEST');
          assertTargetOptions(v.options);
          return {
            ok: true,
            result: await this.compatibility.inspect(v.source, v.projectId, v.revision, v.options),
          };
        }
        if (type === 'verify' || type === 'acknowledge') assertTargetOptions(v.options);
        if (type === 'verify')
          return { ok: true, result: this.compatibility.verify(v.id, v.options) };
        if (type === 'acknowledge')
          return {
            ok: true,
            result: this.compatibility.acknowledge(v.id, v.signature, v.warningScope, v.options),
          };
        if (type === 'release') {
          this.compatibility.release(v.id);
          return { ok: true };
        }
        throw new Error('E_EXPORT_REQUEST');
      } catch (e) {
        return {
          ok: false,
          errorCode: error(e, 'E_EXPORT_CHECK'),
          stale: e instanceof Error && e.message === 'E_EXPORT_STALE',
        };
      }
    });
  }
  resource(path: string): Buffer | null {
    return path.startsWith('assets/avatar-export/')
      ? this.avatar.resource(path)
      : path.startsWith('assets/image-export/')
        ? this.image.resource(path)
        : this.compatibility.resource(path);
  }
  close(): void {
    this.avatar.close();
    this.image.close();
    this.compatibility.close();
  }
}
