import { expect, test } from 'vitest';
import { sortedRank, sortedRankTie } from './sortScore';

const members = [
  {
    nickname: '에지니22',
    score: 237,
  },
  {
    nickname: '손님624c1',
    score: 129,
  },
  {
    nickname: '종욱',
    score: 237,
  },
  {
    nickname: 'ddd',
    score: 99,
  },
];
const sortedTieResult = [
  {
    nickname: '에지니22',
    score: 237,
    ranking: 1,
  },
  {
    nickname: '종욱',
    score: 237,
    ranking: 1,
  },
  {
    nickname: '손님624c1',
    score: 129,
    ranking: 3,
  },
  {
    nickname: 'ddd',
    score: 99,
    ranking: 4,
  },
];
const sortedResult = [
  {
    nickname: '에지니22',
    score: 237,
  },
  {
    nickname: '종욱',
    score: 237,
  },
  {
    nickname: '손님624c1',
    score: 129,
  },
  {
    nickname: 'ddd',
    score: 99,
  },
];
test('공동 등수', () => {
  expect(sortedRankTie({ members })).toEqual(sortedTieResult);
});
test('등수', () => {
  expect(sortedRank({ members })).toEqual(sortedResult);
});
