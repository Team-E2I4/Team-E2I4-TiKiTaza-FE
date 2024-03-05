export const decomposeKrChar = (char: string) => {
  const BASE_CODE = 44032; // '가'의 유니코드 코드 포인트
  const JUNGSUNG_COUNT = 21; // 중성 개수
  const JONGSUNG_COUNT = 28; // 종성 개수

  const getCodePoint = (char: string) => char.charCodeAt(0) - BASE_CODE;

  const chosungList = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  const jungsungList = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
  ];

  const jongsungList = [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

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
