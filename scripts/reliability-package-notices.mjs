import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { open } from 'yauzl';
const output = resolve(process.argv[2]),
  record = JSON.parse(readFileSync('worker/resources/license-overrides.json')).flatbuffers,
  hash = (b) => createHash('sha256').update(b).digest('hex');
assert.equal(
  hash(readFileSync('out/2DSketcher-win32-x64/resources/notices/python/flatbuffers/LICENSE')),
  record.sha256,
);
const dir = resolve('out/make/zip/win32/x64'),
  zip = readdirSync(dir)
    .filter((v) => v.endsWith('.zip'))
    .map((name) => ({ name, time: statSync(join(dir, name)).mtimeMs }))
    .sort((a, b) => b.time - a.time)[0];
assert.ok(zip);
let count = 0;
await new Promise((yes, no) =>
  open(join(dir, zip.name), { lazyEntries: true }, (error, z) => {
    if (error) return no(error);
    z.on('error', no);
    z.on('entry', (entry) => {
      if (!entry.fileName.endsWith('resources/notices/python/flatbuffers/LICENSE'))
        return z.readEntry();
      z.openReadStream(entry, (e, stream) => {
        if (e) return no(e);
        const chunks = [];
        stream.on('error', no);
        stream.on('data', (b) => chunks.push(b));
        stream.on('end', () => {
          try {
            assert.equal(hash(Buffer.concat(chunks)), record.sha256);
            count++;
            z.readEntry();
          } catch (err) {
            no(err);
          }
        });
      });
    });
    z.on('end', yes);
    z.readEntry();
  }),
);
assert.equal(count, 1);
writeFileSync(
  output,
  JSON.stringify(
    {
      passed: true,
      source: record.source,
      version: record.version,
      licenseSha256: record.sha256,
      portableFolderVerified: true,
      portableZipVerified: true,
      publicDistributionApproved: false,
    },
    null,
    2,
  ) + '\n',
);
console.log('Pinned FlatBuffers license verified in actual portable folder and ZIP.');
