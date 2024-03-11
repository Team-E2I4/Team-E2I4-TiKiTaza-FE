const isKorean = (char: string): boolean => {
  const unicodeVal: number = char.charCodeAt(0);
  return (
    (44032 <= unicodeVal && unicodeVal <= 55203) || // 한글 음절 범위
    (12593 <= unicodeVal && unicodeVal <= 12678) // 자음-모음 범위
  );
};

export default isKorean;
