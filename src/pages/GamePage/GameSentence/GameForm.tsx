import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { decomposeKrChar } from './decomposeKrChar';
import useTypingState from './useTypingState';

interface GameFormProps {
  inputName: 'sentence';
  sample: string;
}

//완성된 글자에 대해 오타검출
const getTypoCompletedKrChar = (
  decomposedSample: (string | string[])[],
  decomposedUserInput: (string | string[])[]
) => {
  const [sampleChosung, sampleJungsung, sampleJongsung] = decomposedSample;
  const [userChosung, userJungsung, userJongsung] = decomposedUserInput;

  if (sampleChosung === ' ') {
    return sampleChosung !== userChosung;
  }

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

const GameForm = ({
  inputName,
  sample = '띄어쓰기를 제외한 글자의 총 개수를 백분율화 한다',
}: GameFormProps) => {
  const { control, handleSubmit, setValue } = useForm<{ [inputName]: string }>({
    mode: 'onChange',
  });

  const { cpm, accurate, onInputChange, onKeyDown } = useTypingState();

  const sampleRef = useRef(null);
  const decomposedSample = useMemo(
    () => [...sample].map((el) => (el !== ' ' ? decomposeKrChar(el) : [' '])),
    [sample]
  );

  const [isTypoCheckList, setIsTypoCheckList] = useState(
    Array(decomposedSample.length).fill('')
  );

  const onSubmit = () => {
    // 제출 시 실행할 로직을 여기에 추가
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('sentence', e.target.value);

    setIsTypoCheckList(Array(decomposedSample.length).fill(''));
    if (!e.target.value) {
      return;
    }

    let isCorredKeyPressed = true;

    const inputText = e.target.value;

    const decomposedCurrentInput = [...inputText].map((el) =>
      el !== ' ' ? decomposeKrChar(el) : [' ']
    );

    const currentIndex = inputText.length - 1;

    const isTypoAtTypingChar = getTypoTypingKrChar(
      decomposedSample[currentIndex],
      decomposedCurrentInput[currentIndex]
    );

    if (isTypoAtTypingChar) {
      isCorredKeyPressed = false;
      setIsTypoCheckList((arr) => {
        const temp = [...arr];
        temp[currentIndex] = 'typo';
        return temp;
      });
    } else {
      setIsTypoCheckList((arr) => {
        const temp = [...arr];
        temp[currentIndex] = 'correct';
        return temp;
      });
    }

    //이전글자까지 비교
    //[]
    decomposedSample
      .slice(0, inputText.length - 1)
      .forEach((decomposedSampleEl, i) => {
        const isTypo = getTypoCompletedKrChar(
          decomposedSampleEl,
          decomposedCurrentInput[i]
        );
        if (isTypo) {
          isCorredKeyPressed = false;
          setIsTypoCheckList((arr) => {
            const temp = [...arr];
            temp[i] = 'typo';
            return temp;
          });
        } else {
          setIsTypoCheckList((arr) => {
            const temp = [...arr];
            temp[i] = 'correct';
            return temp;
          });
        }
      });

    onInputChange(isCorredKeyPressed);
  };
  return (
    <>
      <div ref={sampleRef}>
        {[...sample].map((char, i) => (
          <span
            className={`
            ${isTypoCheckList[i] === 'typo' ? 'text-red-500' : isTypoCheckList[i] === 'correct' ? 'text-black font-bold' : 'text-gray-500'}
            `}
            key={`${char}${i}`}
            data-index={i}>
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
            <>
              <input
                {...field}
                id={inputName}
                onChange={handleInputChange}
                maxLength={decomposedSample.length}
                onKeyDown={onKeyDown}
              />
            </>
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
