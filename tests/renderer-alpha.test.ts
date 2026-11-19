import test from 'node:test';
import assert from 'node:assert/strict';
import { alphaAt, copyAlphaRows } from '../packages/avatar-renderer/alpha';

test('strip extraction preserves every source alpha, including transparent and threshold pixels', () => {
  const rgba = new Uint8ClampedArray([
    10, 20, 30, 0, 255, 0, 50, 1, 99, 88, 77, 8, 4, 5, 6, 127, 2, 3, 4, 254, 8, 8, 8, 255,
  ]);
  const plane = new Uint8Array(6);
  copyAlphaRows(rgba.subarray(0, 12), plane, 3, 0);
  copyAlphaRows(rgba.subarray(12), plane, 3, 1);
  assert.deepEqual([...plane], [0, 1, 8, 127, 254, 255]);
  assert.equal(plane.byteLength, rgba.byteLength / 4);
  for (let y = 0; y < 2; y++)
    for (let x = 0; x < 3; x++)
      assert.equal(alphaAt(plane, 3, 2, (x + 0.5) / 3, (y + 0.5) / 2), rgba[(y * 3 + x) * 4 + 3]);
});
test('picking outside an image remains transparent and malformed strip writes cannot escape the plane', () => {
  const plane = new Uint8Array([255, 9, 8, 0]);
  for (const [u, v] of [
    [-0.01, 0.5],
    [1, 0.5],
    [0.5, 1],
    [NaN, 0],
    [0, Infinity],
  ])
    assert.equal(alphaAt(plane, 2, 2, u!, v!), 0);
  assert.equal(alphaAt(plane, 2, 2, 0.999, 0.001), 9);
  assert.throws(() => copyAlphaRows(new Uint8ClampedArray(16), plane, 2, 1), /E_ALPHA_ROWS/);
  assert.throws(() => copyAlphaRows(new Uint8ClampedArray(3), plane, 2, 0), /E_ALPHA_ROWS/);
});
