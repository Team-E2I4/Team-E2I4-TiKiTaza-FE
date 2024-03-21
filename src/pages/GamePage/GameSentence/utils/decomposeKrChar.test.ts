import { expect, test } from 'vitest';
import { decomposeKrChar } from './decomposeKrChar';

test('decompose korean charactor', () => {
  expect(decomposeKrChar('ㅅ')).toEqual(['ㅅ', undefined, undefined]);
});

test('decompose korean charactor', () => {
  expect(decomposeKrChar('슭')).toEqual(['ㅅ', ['ㅡ'], ['ㄹ', 'ㄱ']]);
});

const temp = '슭기로운 생활';

test('decompose korean charactor', () => {
  expect(
    [...temp].map((el) => (el !== ' ' ? decomposeKrChar(el) : [el]))
  ).toEqual([
    ['ㅅ', ['ㅡ'], ['ㄹ', 'ㄱ']],
    ['ㄱ', ['ㅣ'], ['']],
    ['ㄹ', ['ㅗ'], ['']],
    ['ㅇ', ['ㅜ'], ['ㄴ']],
    [' '],
    ['ㅅ', ['ㅐ'], ['ㅇ']],
    ['ㅎ', ['ㅗ', 'ㅏ'], ['ㄹ']],
  ]);
});
