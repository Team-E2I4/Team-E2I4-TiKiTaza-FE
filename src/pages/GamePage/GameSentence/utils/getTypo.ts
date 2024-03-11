import { decomposeKrChar } from './decomposeKrChar';
import isKorean from './isKorean';

//오타를 반환하는 함수라서 ===가 아닌 !==를 반환해야 합니다.
const getTypo = (
  sampleChar: string,
  userInputChar: string,
  isPrevChar = false
) => {
  if (!isKorean(sampleChar)) {
    return sampleChar !== userInputChar;
  }

  const [sampleChosung, sampleJungsung, sampleJongsung] =
    decomposeKrChar(sampleChar);
  const [userChosung, userJungsung, userJongsung] =
    decomposeKrChar(userInputChar);

  const isUserJungsung = !!userJungsung?.length;
  const isSampleJungsung = !!sampleJungsung?.length;
  const isUserJongsung = !!userJongsung?.length && userJongsung[0] !== '';
  const isSampleJongsung = !!sampleJongsung?.length && sampleJongsung[0] !== '';

  //이전 글자 검사할땐 초,중,종성 모두 검사
  if (isPrevChar) {
    //유저 입력글자에 중성이 없으면, 오타(이전글자 검사에 공백은 들어오지 않는다.)
    if (!isUserJungsung) {
      return true;
    }
    //샘플에 종성이 있는데, 입력글자에 없었다면 오타
    if (isSampleJongsung && !isUserJongsung) {
      return true;
    }
    return (
      [...sampleJongsung].join('') !== [...userJongsung].join('') ||
      [...sampleJungsung].join('') !== [...userJungsung].join('') ||
      sampleChosung !== userChosung
    );
  }

  //현재 글자 검사할땐, 먼저 중성검사. 중성을 입력한 길이까지 검사한다.
  if (isUserJungsung && isSampleJungsung) {
    return (
      [...sampleJungsung].slice(0, userJungsung.length).join('') !==
        [...userJungsung].join('') || sampleChosung !== userChosung
    );
  }

  //그다음 초성검사. 공백이거나, 초성만 입력시 초성끼리만 비교한다.
  if (sampleChosung === ' ' || !isUserJungsung) {
    return sampleChosung !== userChosung;
  }

  //나머지. 예시글자에 종성이 없지만, 유저가 종성을 입력한 경우 오타가 아님.
  return false;
};

export default getTypo;
