import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync, existsSync, symlinkSync } from 'node:fs';
import { createTempArea } from '../tools/temp-area.cjs';
import fs from 'node:fs';

test('temporary roots reject escaping paths and cleanup is idempotent', () => {
  const area = createTempArea('safety');
  const root = area.path();
  try {
    assert.throws(() => area.path('../outside'), /E_TEMP_PATH/);
    writeFileSync(area.path('generated.bin'), 'generated');
  } finally {
    area.dispose();
  }
  assert.equal(existsSync(root), false);
  area.dispose();
  assert.throws(() => area.path('again'), /E_TEMP_DISPOSED/);
});

test('cleanup removes a temporary junction without following its external target', () => {
  const outside = createTempArea('outside');
  const area = createTempArea('safety');
  try {
    writeFileSync(outside.path('keep.txt'), 'keep');
    mkdirSync(area.path('nested'));
    symlinkSync(outside.path(), area.path('nested/link'), 'junction');
    area.dispose();
    assert.equal(readFileSync(outside.path('keep.txt'), 'utf8'), 'keep');
  } finally {
    outside.dispose();
    area.dispose();
  }
});

test('a changed ownership marker prevents cleanup', () => {
  const area = createTempArea('safety');
  const marker = area.path('.owned-area.json');
  const original = readFileSync(marker);
  try {
    writeFileSync(marker, '{"token":"someone-else"}');
    assert.throws(() => area.dispose(), /E_TEMP_OWNER/);
    assert.equal(existsSync(area.path()), true);
  } finally {
    writeFileSync(marker, original);
    area.dispose();
  }
});

test('interrupted cleanup keeps the ownership marker for a safe retry', (t) => {
  const area = createTempArea('safety');
  const file = area.path('pending.bin');
  writeFileSync(file, 'pending');
  const originalUnlink = fs.unlinkSync;
  const interrupted = t.mock.method(fs, 'unlinkSync', (path: fs.PathLike) => {
    if (path === file) throw Object.assign(new Error(), { code: 'EIO' });
    originalUnlink(path);
  });
  try {
    assert.throws(() => area.dispose(), /E_TEMP_CLEANUP/);
    assert.ok(existsSync(area.path('.owned-area.json')));
  } finally {
    interrupted.mock.restore();
    area.dispose();
  }
  assert.equal(existsSync(file), false);
});
