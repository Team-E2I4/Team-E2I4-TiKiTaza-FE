import { expect, test } from 'vitest';
import { decomposeKrChar } from './decomposeKrChar';

test('decompose korean charactor', () => {
  expect(decomposeKrChar('ㅅ')).toEqual(['ㅅ', undefined, undefined]);
});

test('decompose korean charactor', () => {
  expect(decomposeKrChar('슭')).toEqual(['ㅅ', 'ㅡ', 'ㄺ']);
});

const temp = '슭기로운 생활';

test('decompose korean charactor', () => {
  expect(
    [...temp].map((el) => (el !== ' ' ? decomposeKrChar(el) : el))
  ).toEqual([
    ['ㅅ', 'ㅡ', 'ㄺ'],
    ['ㄱ', 'ㅣ', ''],
    ['ㄹ', 'ㅗ', ''],
    ['ㅇ', 'ㅜ', 'ㄴ'],
    ' ',
    ['ㅅ', 'ㅐ', 'ㅇ'],
    ['ㅎ', 'ㅘ', 'ㄹ'],
  ]);
});
