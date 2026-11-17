import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { run, root, electronPath } from './common.mjs';
const target = resolve(root, '.local/smoke/development'); mkdirSync(target, { recursive: true });
const report = resolve(target, 'report.json');
run(electronPath(), ['.',`--expression-screenshot=${resolve(target,'expressions.png')}`,`--expression-extremes=${resolve(target,'expression-extremes.png')}`,`--detail-screenshot=${resolve(target,'detail.png')}`,`--detail-extremes=${resolve(target,'detail-extremes.png')}`,`--split-screenshot=${resolve(target,'split.png')}`,`--split-extremes=${resolve(target,'split-extremes.png')}`,`--correction-screenshot=${resolve(target,'correction.png')}`,`--correction-extremes=${resolve(target,'correction-extremes.png')}`, `--structure-screenshot=${resolve(target,'structure.png')}`,`--structure-extremes=${resolve(target,'structure-extremes.png')}`, `--profile-dir=${resolve(target, 'profile-'+Date.now())}`, `--self-check-report=${report}`, `--screenshot=${resolve(target, 'studio.png')}`, `--project-screenshot=${resolve(target,'project.png')}`, `--editor-screenshot=${resolve(target,'editor.png')}`, `--parts-screenshot=${resolve(target,'parts.png')}`,`--parts-extremes=${resolve(target,'parts-extremes.png')}`,`--parts-contact=${resolve(target,'parts-contact.png')}`,`--input-screenshot=${resolve(target,'input.png')}`, `--motion-screenshot=${resolve(target,'motion.png')}`, `--workflow-screenshot=${resolve(target,'workflow.png')}`], { timeout: 1800000 });
if (!existsSync(report)) throw new Error('Self-check report missing');
const data = JSON.parse(readFileSync(report, 'utf8')); if (!data.passed) throw new Error(JSON.stringify(data));
console.log(JSON.stringify(data, null, 2));
