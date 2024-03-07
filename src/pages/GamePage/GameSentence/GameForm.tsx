import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/common/Input/Input';
import { decomposeKrChar } from './utils/decomposeKrChar';

//예시 글자와 입력중인 글자에 대해 오타 검출
const getTypoKrChar = (
  decomposedSample: (string | string[])[],
  decomposedUserInput: (string | string[])[],
  isPrev = false
) => {
  const [sampleChosung, sampleJungsung, sampleJongsung] = decomposedSample;
  const [userChosung, userJungsung, userJongsung] = decomposedUserInput;

  const isUserJungsung = !!userJungsung?.length;
  const isSampleJungsung = !!sampleJungsung?.length;
  const isUserJongsung = !!userJongsung?.length && userJongsung[0] !== '';
  const isSampleJongsung = !!sampleJongsung?.length && sampleJongsung[0] !== '';

  //이전 글자 검사할땐 초,중,종성 모두 검사
  if (isPrev) {
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

interface GameFormProps {
  inputName: 'sentence';
  sample: string;
  onInputChange: (_totalCharCompleted: number, _totalChar: number) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleCorrectWordSubmit: () => void;
  handleLineEnd: () => void;
  initializeTyping: () => void;
}

type TypoMarkListType = '' | 'typo' | 'correct';

const GameForm = ({
  inputName,
  sample,
  onInputChange,
  onKeyDown,
  initializeTyping,
  handleLineEnd,
  handleCorrectWordSubmit,
}: GameFormProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<{
    [inputName]: string;
  }>();

  const [typoMarkList, setTypoMarkList] = useState<TypoMarkListType[]>(
    Array(sample.length).fill('')
  );

  const isTypoAtLeastOnce = typoMarkList.some((el) => el === 'typo');

  const decomposedSample = useMemo(
    () => [...sample].map((el) => (el !== ' ' ? decomposeKrChar(el) : [' '])),
    [sample]
  );

  const maxSpacingIndex = useRef(-1);

  const initializeTypoMakrList = () =>
    setTypoMarkList(Array(sample.length).fill(''));

  const onSpacing = (currentSpacingIndex: number) => {
    //이미 submit한 공백위치면 리턴
    if (maxSpacingIndex.current >= currentSpacingIndex) {
      return;
    }

    handleCorrectWordSubmit();

    //차량이동 api 호출
  };

  const onSubmit = () => {
    maxSpacingIndex.current = -1;
    handleLineEnd();
    initializeTypoMakrList();
    initializeTyping();
    setValue('sentence', '');
  };

  const removeTypoMarksAfterCurrentChar = (currentIndex: number) =>
    setTypoMarkList((arr) =>
      arr.map((el, index) => (index > currentIndex ? '' : el))
    );

  const handleTypoMark = (isTypo: boolean, markIndex: number) =>
    setTypoMarkList((arr) =>
      arr.map((el, i) => (i === markIndex ? (isTypo ? 'typo' : 'correct') : el))
    );

  //상태가 바로 동기화 되지 않는문제로 인하여 effect 사용
  useEffect(() => {
    onInputChange(
      typoMarkList.filter((el) => el === 'correct').length,
      getValues('sentence').length
    );
  }, [typoMarkList]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //지정한 input 최대길이 넘어갈 시, 한 글자 자르기 (조합문자는 완성되어야 최대길이 넘어섰다고 판정됨)
    if (e.target.value.length > decomposedSample.length) {
      e.target.value = e.target.value.slice(0, decomposedSample.length);
      return;
    }

    const inputText = e.target.value;

    removeTypoMarksAfterCurrentChar(inputText.length - 1);

    if (!inputText) {
      return;
    }

    const decomposedCurrentInput = [...inputText].map((el) =>
      el !== ' ' ? decomposeKrChar(el) : [' ']
    );

    const currentIndex = inputText.length - 1;

    //현재 글자 + 바로 이전글자의 오타 boolean
    let isLeastCharTypo = false;

    //현재 글자에 대해서 오타 검출
    const isTypoAtTypingChar = getTypoKrChar(
      decomposedSample[currentIndex],
      decomposedCurrentInput[currentIndex]
    );

    if (isTypoAtTypingChar) {
      isLeastCharTypo = true;
    }

    handleTypoMark(isTypoAtTypingChar, currentIndex);

    //바로 이전글자도 오타검출. 이전 예시글자가 공백이 아닐때만.
    if (
      currentIndex - 1 >= 0 &&
      decomposedSample[currentIndex - 1][0] !== ' '
    ) {
      const isTypoPrevChar = getTypoKrChar(
        decomposedSample[currentIndex - 1],
        decomposedCurrentInput[currentIndex - 1],
        true
      );
      if (isTypoAtTypingChar) {
        isLeastCharTypo = true;
      }
      handleTypoMark(isTypoPrevChar, currentIndex - 1);
    }

    if (!isLeastCharTypo && !isTypoAtLeastOnce && inputText.at(-1) === ' ') {
      onSpacing(currentIndex);
      maxSpacingIndex.current = currentIndex;
    }
  };

  return (
    <>
      <div className='w-[70rem] h-[4.5rem] flex items-center pl-8 rounded-2xl bg-green-100 tracking-wider'>
        {[...sample].map((char, i) => (
          <span
            className={`
            text-[2rem]
            ${typoMarkList[i] === 'typo' ? 'text-red-500' : typoMarkList[i] === 'correct' ? 'text-black font-bold' : 'text-white'}
            ${char === ' ' ? (typoMarkList[i] === 'typo' ? 'bg-red-500 w-[0.5rem] h-[2rem]' : 'w-[0.5rem] h-[2rem]') : ''}
            `}
            key={`${char}${i}`}>
            {char}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoFocus
          autoComplete='off'
          onKeyDown={onKeyDown}
          maxLength={decomposedSample.length}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          {...register('sentence', {
            onChange: (e) => handleInputChange(e),
          })}
        />
      </form>
    </>
  );
};

export default GameForm;
