import { expect, test } from 'vitest';
import { exchangeVolumeState } from './exchangeVolumeState';

test('exchange state play and pause', () => {
  expect(exchangeVolumeState('pause')).toBe('play');
});

test('exchange state play and pause', () => {
  expect(exchangeVolumeState('play')).toBe('pause');
});
