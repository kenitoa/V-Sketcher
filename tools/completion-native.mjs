import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { writeFileSync, existsSync } from 'node:fs';
export function compileProbe(directory) {
  const framework = join(
    process.env.SystemRoot ?? 'C:\\Windows',
    'Microsoft.NET/Framework64/v4.0.30319',
  );
  const file = join(directory, 'Run-CleanWindows.exe');
  const build = spawnSync(
    join(framework, 'csc.exe'),
    [
      '/nologo',
      '/target:exe',
      '/platform:x64',
      '/codepage:65001',
      '/out:' + file,
      '/reference:' + join(framework, 'System.Web.Extensions.dll'),
      '/reference:' + join(framework, 'System.IO.Compression.dll'),
      '/reference:' + join(framework, 'System.IO.Compression.FileSystem.dll'),
      resolve('tools/completion-clean-windows.cs'),
    ],
    { windowsHide: true, encoding: 'utf8', timeout: 60000 },
  );
  const log = (build.stdout ?? '') + (build.stderr ?? '');
  if (log) writeFileSync(join(directory, 'private-build.log'), log, { flag: 'wx' });
  if (build.status !== 0 || !existsSync(file)) throw Error('E_COMPLETION_PROBE_BUILD');
  return file;
}
