import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/common/Input/Input';
import useIngameStore from '@/store/useIngameStore';
import { UpdateScoreType } from './GameSentence';
import { decomposeKrChar } from './utils/decomposeKrChar';
import getTypo from './utils/getTypo';

//예시 글자와 입력중인 글자에 대해 오타 검출

interface GameFormProps {
  sample: string;
  onInputChange: (_totalCharCompleted: number, _totalChar: number) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  initializeTyping: () => void;
  handleUpdateScore: UpdateScoreType;
  handleLineEnd: () => void;
  handleRoundFinish: () => void;
  isLastSentence: boolean;
}

type TypoMarkListType = '' | 'typo' | 'correct';

const GameForm = ({
  sample,
  onInputChange,
  onKeyDown,
  initializeTyping,
  handleLineEnd,
  handleUpdateScore,
  handleRoundFinish,
  isLastSentence,
}: GameFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    setError,
  } = useForm<{
    ['sentence']: string;
  }>();

  const { ref } = register('sentence');

  const focusInput = useRef<HTMLInputElement | null>(null);

  const { isRoundWaiting } = useIngameStore();

  const [typoMarkList, setTypoMarkList] = useState<TypoMarkListType[]>(
    Array(sample.length).fill('')
  );

  const oneLineDone = useRef(false);

  const isTypoAtLeastOnce = typoMarkList.some((el) => el === 'typo');

  const maxSpacingIndex = useRef(-1);

  const initializeTypoMakrList = () =>
    setTypoMarkList(Array(sample.length).fill(''));

  const onSpacing = (currentSpacingIndex: number) => {
    if (maxSpacingIndex.current >= currentSpacingIndex) {
      return;
    }

    handleUpdateScore();
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

  const onSubmit = () => {
    if (
      typoMarkList.some((el) => el === 'typo') ||
      getValues('sentence').length !== sample.length ||
      !oneLineDone.current
    ) {
      setError('sentence', {
        message: '오타가 존재하거나 입력을 마치지 않았습니다!',
      });
      return;
    }
    handleUpdateScore();
    if (isLastSentence) {
      handleRoundFinish();
    }
    handleLineEnd();
    oneLineDone.current = false;
    maxSpacingIndex.current = -1;
    initializeTypoMakrList();
    initializeTyping();
    setValue('sentence', '');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //지정한 input 최대길이 넘어갈 시, 한 글자 자르기 (조합문자는 완성되어야 최대길이 넘어섰다고 판정됨)
    if (e.target.value.length > sample.length) {
      e.target.value = e.target.value.slice(0, sample.length);
      return;
    }

    const inputText = e.target.value;

    removeTypoMarksAfterCurrentChar(inputText.length - 1);

    if (!inputText) {
      return;
    }

    const currentIndex = inputText.length - 1;

    //현재 글자 + 바로 이전글자의 오타 boolean
    let isCurrentCharTypo = false;
    let isPrevCharTypo = false;

    //현재 글자 오타검출
    const isTypoAtTypingChar = getTypo(
      sample[currentIndex],
      inputText[currentIndex]
    );

    isCurrentCharTypo = isTypoAtTypingChar;

    handleTypoMark(isTypoAtTypingChar, currentIndex);

    //바로 이전글자 오타검출.
    if (currentIndex - 1 >= 0 && sample[currentIndex - 1] !== ' ') {
      const isTypoPrevChar = getTypo(
        sample[currentIndex - 1],
        inputText[currentIndex - 1],
        true
      );

      isPrevCharTypo = isTypoPrevChar;

      handleTypoMark(isTypoPrevChar, currentIndex - 1);
    }

    if (inputText.length === sample.length) {
      oneLineDone.current =
        decomposeKrChar(sample).reduce(
          (acc, cur) => acc + [...cur].flat(3).filter((el) => !!el).length,
          0
        ) ===
        decomposeKrChar(inputText).reduce(
          (acc, cur) => acc + [...cur].flat(3).filter((el) => !!el).length,
          0
        );
    }

    //현재+바로이전글자 오타 or 지금까지 최소한번의 오타 or 이전글자가 공백이 아니면 return
    if (
      isPrevCharTypo ||
      isCurrentCharTypo ||
      isTypoAtLeastOnce ||
      inputText.at(-1) !== ' '
    ) {
      return;
    }

    onSpacing(currentIndex);
    maxSpacingIndex.current = currentIndex;
  };

  useEffect(() => {
    if (isRoundWaiting || !focusInput.current) {
      return;
    }
    focusInput.current.focus();

    return () => {
      focusInput.current = null;
    };
  }, [isRoundWaiting]);

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
      <form
        className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          isError={!!errors['sentence']?.message}
          autoFocus
          autoComplete='off'
          onKeyDown={onKeyDown}
          maxLength={sample.length}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          {...register('sentence', {
            onChange: (e) => handleInputChange(e),
          })}
          ref={(e) => {
            ref(e);
            focusInput.current = e;
          }}
        />
      </form>
    </>
  );
};

export default GameForm;
