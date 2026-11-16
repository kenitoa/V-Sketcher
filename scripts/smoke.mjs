import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { run, root, electronPath } from './common.mjs';
const target = resolve(root, '.local/smoke/development'); mkdirSync(target, { recursive: true });
const report = resolve(target, 'report.json');
run(electronPath(), ['.', `--profile-dir=${resolve(target, 'profile-'+Date.now())}`, `--self-check-report=${report}`, `--screenshot=${resolve(target, 'studio.png')}`, `--project-screenshot=${resolve(target,'project.png')}`, `--workflow-screenshot=${resolve(target,'workflow.png')}`], { timeout: 90000 });
if (!existsSync(report)) throw new Error('Self-check report missing');
const data = JSON.parse(readFileSync(report, 'utf8')); if (!data.passed) throw new Error(JSON.stringify(data));
console.log(JSON.stringify(data, null, 2));
