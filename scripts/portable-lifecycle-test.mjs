import assert from 'node:assert/strict';
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  symlinkSync,
  unlinkSync,
} from 'node:fs';
import { join } from 'node:path';
import { createTempArea } from '../tools/temp-area.cjs';
import { inventory, inside, removeOwned } from '../tools/portable-lifecycle.mjs';
const area = createTempArea('lifecycle');
process.on('exit', () => area.dispose());
const parent = area.path(),
  owned = join(parent, 'owned'),
  outside = join(parent, 'outside');
mkdirSync(owned, { recursive: true });
mkdirSync(outside);
writeFileSync(join(owned, 'app.txt'), 'application');
writeFileSync(join(outside, 'project.txt'), 'user project');
const expected = inventory(owned);
assert.equal(inside(parent, parent), false);
assert.equal(inside(owned, outside), false);
assert.equal(inside(parent, owned), true);
writeFileSync(join(owned, 'app.txt'), 'modified');
assert.throws(() => removeOwned(parent, owned, expected), /E_PORTABLE_MODIFIED/);
assert.ok(existsSync(join(owned, 'app.txt')));
writeFileSync(join(owned, 'app.txt'), 'application');
symlinkSync(outside, join(owned, 'linked'), 'junction');
assert.throws(() => removeOwned(parent, owned, expected), /E_PORTABLE_LINK/);
unlinkSync(join(owned, 'linked'));
assert.ok(existsSync(join(outside, 'project.txt')));
assert.throws(() => removeOwned(owned, outside, inventory(outside)), /E_PORTABLE_REMOVE_TARGET/);
removeOwned(parent, owned, expected);
assert.equal(existsSync(owned), false);
assert.equal(readFileSync(join(outside, 'project.txt'), 'utf8'), 'user project');
console.log(
  'Portable removal refuses changed files, links and outside targets; user project preserved.',
);
