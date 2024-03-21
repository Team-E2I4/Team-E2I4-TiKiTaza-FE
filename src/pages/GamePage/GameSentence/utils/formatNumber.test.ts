import { expect, test } from 'vitest';
import formatNumber from './formatNumber';

test('decompose korean charactor', () => {
  expect(formatNumber(100.66, 1)).toBe(100.7);
});

test('decompose korean charactor', () => {
  expect(formatNumber(100, 3)).toBe(100);
});
