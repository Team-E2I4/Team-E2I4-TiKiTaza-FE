import {
  chosungList,
  jongsungList,
  jungsungList,
} from '../constants/koreanCharacters';

export const decomposeKrChar = (char: string) => {
  const BASE_CODE = 44032; // '가'의 유니코드 코드 포인트
  const JUNGSUNG_COUNT = 21; // 중성 개수
  const JONGSUNG_COUNT = 28; // 종성 개수

  const getCodePoint = (char: string) => char.charCodeAt(0) - BASE_CODE;

  const code = getCodePoint(char);
  const chosungIndex = Math.floor(code / (JUNGSUNG_COUNT * JONGSUNG_COUNT));
  const jungsungIndex = Math.floor(
    (code % (JUNGSUNG_COUNT * JONGSUNG_COUNT)) / JONGSUNG_COUNT
  );
  const jongsungIndex = code % JONGSUNG_COUNT;

  const chosung = chosungList[chosungIndex];
  const jungsung = jungsungList[jungsungIndex];
  const jongsung = jongsungList[jongsungIndex];

  return [chosung ?? char, jungsung, jongsung];
};
