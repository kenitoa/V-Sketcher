import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseRequest, parseResponse, matches } from '../packages/contracts';
import { ResultGate } from '../packages/jobs';
import { DiagnosticLog, safeEvent } from '../packages/diagnostics';
import { parameters, validateScene, type PreviewScene } from '../packages/scene-core';
import { inspectInp } from '../packages/export-adapter';
import { WorkerClient } from '../apps/desktop/worker-client';
const request = {
  protocol: 1,
  requestId: 'ddabcf15-18e9-4c67-9c98-d349c3f5e912',
  projectId: 'project-a',
  revision: 3,
  generation: 0,
  operation: 'ping',
} as const;
test('wire protocol rejects versions, extra paths, invalid numbers and malformed responses', () => {
  assert.equal(parseRequest(request).revision, 3);
  for (const invalid of [
    { ...request, protocol: 2 },
    { ...request, path: 'C:/private.png' },
    { ...request, revision: -1 },
    { ...request, revision: true },
    { ...request, generation: 0.5 },
    { ...request, operation: 'run-shell' },
  ])
    assert.throws(() => parseRequest(invalid));
  assert.throws(() => parseResponse('{bad'));
  assert.throws(() => parseResponse(' '.repeat(70000)));
  const response = parseResponse(
    JSON.stringify({
      protocol: 1,
      requestId: request.requestId,
      projectId: request.projectId,
      revision: 3,
      generation: 0,
      ok: true,
      result: {},
    }),
  );
  assert.ok(matches(request, response));
  assert.equal(matches(request, { ...response, revision: 4 }), false);
});
test('job gate rejects cancelled, stale, duplicate and cross-project completions', () => {
  const gate = new ResultGate('a', 3);
  const job = { jobId: '1', projectId: 'a', revision: 3, generation: 0 };
  assert.equal(gate.accept({ ...job, revision: 2 }), false);
  assert.equal(gate.accept({ ...job, projectId: 'b' }), false);
  gate.cancel('1');
  assert.equal(gate.accept(job), false);
  assert.ok(gate.accept({ ...job, jobId: '2' }));
  assert.equal(gate.accept({ ...job, jobId: '2' }), false);
  gate.switchProject('b', 1);
  assert.equal(gate.accept({ ...job, projectId: 'b', revision: 1, jobId: '3' }), false);
  assert.ok(gate.accept({ ...job, projectId: 'b', revision: 1, generation: 1, jobId: '3' }));
});
test('parameter contract clamps bounds and rejects non-finite values', () => {
  assert.equal(parameters({ head_yaw: 100 }).head_yaw, 1);
  assert.equal(parameters({ mouth: -5 }).mouth, 0);
  for (const value of [NaN, Infinity, -Infinity]) assert.throws(() => parameters({ mouth: value }));
});
test('scene rejects duplicate references, bad bounds and traversal paths', () => {
  const scene = JSON.parse(
    readFileSync('assets/product/preview-scene.json', 'utf8'),
  ) as PreviewScene;
  validateScene(scene);
  assert.throws(() => validateScene({ ...scene, canvas: [0, 1] }));
  assert.throws(() => validateScene({ ...scene, layers: [scene.layers[0]!, scene.layers[0]!] }));
  assert.throws(() =>
    validateScene({
      ...scene,
      layers: [{ ...scene.layers[0]!, states: { base: 'assets/../private.png' } }],
    }),
  );
});
test('normal diagnostics never retain secrets, raw input, personal paths or arbitrary error text', () => {
  const secret = 'private-token-value';
  const path = 'C:/Users/private/person.png';
  const event = safeEvent('request-end', {
    requestId: request.requestId,
    durationMs: 5,
    token: secret,
    rawAudio: [1, 2, 3],
    camera: path,
    error: path,
    message: secret,
    version: secret,
  });
  assert.equal(event.durationMs, 5);
  assert.equal(event.requestId, request.requestId);
  assert.ok(!JSON.stringify(event).includes(secret));
  assert.ok(!JSON.stringify(event).includes(path));
  const folder = mkdtempSync(scratchPath('log-test-'));
  const log = new DiagnosticLog(folder);
  log.write('worker-error', { token: secret, message: path, code: 'E_WORKER_EXIT' });
  assert.ok(readdirSync(folder).length === 1);
  const written = readFileSync(join(folder, 'events.jsonl'), 'utf8');
  assert.ok(!written.includes(secret));
  assert.ok(!written.includes(path));
});
test('actual native INP fixture has embedded textures and all five controls', () => {
  const data = readFileSync('experiments/phase04/exports/PREMIUM-003.inp');
  const result = inspectInp(data);
  assert.equal(result.textures, 7);
  assert.equal(result.parameters.length, 5);
  assert.ok(result.parameters.includes('head_yaw'));
  assert.throws(() => inspectInp(data.subarray(0, data.length - 7)));
  const bad = Buffer.from(data);
  bad[0] = 0;
  assert.throws(() => inspectInp(bad));
});

test('actual worker client ignores mismatched response, strips stderr and joins child shutdown', async () => {
  const folder = mkdtempSync(scratchPath('client-test-'));
  const client = new WorkerClient(
    process.execPath,
    ['tests/fixtures/worker.cjs'],
    process.env,
    new DiagnosticLog(folder),
  );
  try {
    assert.deepEqual(await client.request('ping'), { workerVersion: '0.1.0' });
  } finally {
    await client.stop();
  }
  const log = readFileSync(join(folder, 'events.jsonl'), 'utf8');
  assert.ok(log.includes('E_PROTOCOL_IDENTITY'));
  assert.ok(log.includes('worker-stop'));
  assert.ok(!log.includes('private-worker-path-and-token'));
});

test('actual worker client rejects malformed output and process start failure', async () => {
  for (const [executable, args] of [
    [process.execPath, ['tests/fixtures/worker.cjs', 'malformed']],
    [scratchPath('nonexistent-worker.exe'), []],
  ] as const) {
    const client = new WorkerClient(
      executable,
      [...args],
      process.env,
      new DiagnosticLog(mkdtempSync(scratchPath('client-failure-'))),
    );
    try {
      await assert.rejects(
        client.request('ping'),
        /E_PROTOCOL_RESPONSE|E_WORKER_START|E_WORKER_EXIT|E_WORKER_PIPE/,
      );
    } finally {
      await client.stop();
    }
  }
});
