import test from 'node:test';
import assert from 'node:assert/strict';
import { findGuides, guideTopics, routeHints } from '../packages/user-guide';
test('guide search covers routes and recovery without losing full guide after empty query', () => {
  assert.equal(new Set(guideTopics.map((t) => t.id)).size, guideTopics.length);
  for (const route of Object.keys(routeHints)) assert.ok(guideTopics.some((t) => t.id === route));
  assert.ok(findGuides('OBS 33.0.1').some((t) => t.id === 'broadcast'));
  assert.ok(findGuides('복구').some((t) => t.id === 'recovery'));
  assert.deepEqual(findGuides('   '), guideTopics);
  assert.deepEqual(findGuides('xxxx-unmatched-999'), []);
});
