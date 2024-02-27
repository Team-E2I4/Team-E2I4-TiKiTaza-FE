import { afterEach, beforeEach, expect, test, vitest } from 'vitest';
import getRandomTitle from './getRandomTitle';

beforeEach(() => {
  vitest.spyOn(Math, 'random').mockReturnValue(0.9);
});

afterEach(() => {
  vitest.spyOn(Math, 'random').mockRestore();
});

test('get random title in array', () => {
  expect(
    getRandomTitle({
      titles: ['티키타자 고다고', '너만 오면 고', '타자승부 한판 ㄱㄱ!!'],
    })
  ).toBe('타자승부 한판 ㄱㄱ!!');
});
