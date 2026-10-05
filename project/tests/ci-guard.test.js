import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote, DEFAULT_CATALOG } from '../app/domain.js';

test('CI checks the 100-unit discount threshold', () => {
  assert.equal(calculateQuote(DEFAULT_CATALOG[0], 100).discount, 0.1);
});
