import { ChangeEvent, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { decomposeKrChar } from './decomposeKrChar';

//완성된 글자에 대해 오타검출
const getTypoCompletedKrChar = (
  decomposedSample: (string | string[])[],
  decomposedUserInput: (string | string[])[]
) => {
  const [sampleChosung, sampleJungsung, sampleJongsung] = decomposedSample;
  const [userChosung, userJungsung, userJongsung] = decomposedUserInput;

  //공백일 경우
  if (sampleChosung === ' ') {
    return sampleChosung !== userChosung;
  }

  /* 
  초성 같은지 체크, 중성 길이 같은지 체크(중성없이 초성만 적을 수 있음), 중성길이 같으면 같은지 체크, 종성 체크
  */
  return (
    userChosung !== sampleChosung ||
    sampleJungsung.length !== userJungsung?.length ||
    [...sampleJungsung].every((el, i) => el !== userJungsung[i]) ||
    userJongsung !== sampleJongsung
  );
};

//현재 입력중인 글자에 대해 오타검출
const getTypoTypingKrChar = (
  decomposedSample: (string | string[])[],
  decomposedUserInput: (string | string[])[]
) => {
  const [sampleChosung, sampleJungsung] = decomposedSample;
  const [userChosung, userJungsung] = decomposedUserInput;

  //공백이거나 유저가 아직 초성만 입력했을 경우
  if (sampleChosung === ' ' || !userJungsung) {
    return sampleChosung !== userChosung;
  }

  return [...sampleJungsung]
    .slice(0, userJungsung.length)
    .every((el, i) => el !== userJungsung[i]);
};

interface GameFormProps {
  inputName: 'sentence';
  sample: string;
  handleCorrectWordSubmit?: () => void;
  cpm: number;
  accurate: number;
  onInputChange: (isCorrectKey: boolean, didTypo: boolean) => void;
}

const GameForm = ({
  inputName,
  sample = '띄어쓰기를 제외한 글자의 총 개수를 백분율화 한다',
  cpm,
  accurate,
  onInputChange,
}: GameFormProps) => {
  const { control, handleSubmit, setValue } = useForm<{ [inputName]: string }>({
    mode: 'onChange',
  });

  const decomposedSample = useMemo(
    () => [...sample].map((el) => (el !== ' ' ? decomposeKrChar(el) : [' '])),
    [sample]
  );

  const [isTypoCheckList, setIsTypoCheckList] = useState<string[]>(
    Array(decomposedSample.length).fill('')
  );

  const firstTypoIndex = useMemo(
    () => isTypoCheckList.indexOf('typo'),
    [isTypoCheckList]
  );

  const onSubmit = () => {
    // 제출 시 실행할 로직을 여기에 추가
  };

  const initTypoCheckList = () =>
    setIsTypoCheckList(Array(decomposedSample.length).fill(''));

  const handleCurrentCharTypoUi = (isTypo: boolean, index: number) =>
    setIsTypoCheckList((arr) =>
      arr.map((el, i) => (i === index ? (isTypo ? 'typo' : 'correct') : el))
    );

  const markTypoAfterIncorrectChar = (index: number) => {
    if (firstTypoIndex === -1) {
      return;
    }

    setIsTypoCheckList((arr) =>
      arr.map((el, i) => (firstTypoIndex <= i && index >= i ? 'typo' : el))
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    setValue('sentence', inputText);

    initTypoCheckList();

    if (!inputText) {
      return;
    }

    let isCorrectKeyPressed = true;

    const decomposedCurrentInput = [...inputText].map((el) =>
      el !== ' ' ? decomposeKrChar(el) : [' ']
    );

    const currentIndex = inputText.length - 1;

    const isTypoAtTypingChar = getTypoTypingKrChar(
      decomposedSample[currentIndex],
      decomposedCurrentInput[currentIndex]
    );

    if (isTypoAtTypingChar) {
      isCorrectKeyPressed = false;
    }

    //현재 타이핑하는 글자 오타를 UI반영하는 함수
    handleCurrentCharTypoUi(isTypoAtTypingChar, currentIndex);

    //이전 타이핑한 글자 오타를 UI반영하는 로직
    decomposedSample
      .slice(0, decomposedCurrentInput.length - 1)
      .forEach((decomposedSampleEl, i) => {
        const isTypo = getTypoCompletedKrChar(
          decomposedSampleEl,
          decomposedCurrentInput[i]
        );

        if (isTypo) {
          isCorrectKeyPressed = false;
        }

        handleCurrentCharTypoUi(isTypo, i);
      });

    markTypoAfterIncorrectChar(currentIndex);

    onInputChange(isCorrectKeyPressed, firstTypoIndex !== -1);
  };
  return (
    <>
      <div>
        {[...sample].map((char, i) => (
          <span
            className={`
            ${isTypoCheckList[i] === 'typo' ? 'text-red-500' : isTypoCheckList[i] === 'correct' ? 'text-black font-bold' : 'text-gray-500'}
            `}
            key={`${char}${i}`}>
            {char}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={inputName}
          control={control}
          defaultValue=''
          rules={{ required: '문장을 입력하세요' }}
          render={({ field }) => (
            <input
              {...field}
              id={inputName}
              onChange={handleInputChange}
              maxLength={decomposedSample.length}
            />
          )}
        />
      </form>
      <span>타수 : {cpm}</span>
      <span>정확도 : {accurate}%</span>
      {sample}
    </>
  );
};

export default GameForm;
