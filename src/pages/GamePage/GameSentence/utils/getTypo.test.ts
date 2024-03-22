import { expect, test } from 'vitest';
import getTypo from './getTypo';

test('get typo at char', () => {
  expect(getTypo('a', 'a')).toBe(false);
});

test('get typo at char', () => {
  expect(getTypo('사', '살')).toBe(false);
});

test('get typo at char', () => {
  expect(getTypo('슭', '슳')).toBe(false);
});
