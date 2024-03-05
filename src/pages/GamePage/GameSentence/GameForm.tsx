import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { decomposeKrChar } from './decomposeKrChar';
import useTypingState from './useTypingState';

interface GameFormProps {
  inputName: 'sentence';
  sample: string;
}

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

  const [isTypoArr, setIsTypoArr] = useState(
    Array(decomposedSample.length).fill(0)
  );

  const onSubmit = () => {
    // 제출 시 실행할 로직을 여기에 추가
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('sentence', e.target.value);

    setIsTypoArr((arr) => {
      let temp = [...arr];
      temp = Array(decomposedSample.length).fill(0);
      return temp;
    });

    if (!e.target.value) {
      return;
    }
    let isCorredKeyPressed = true;

    const inputText = e.target.value;

    const decomposedCurrentInput = [...inputText].map((el) =>
      el !== ' ' ? decomposeKrChar(el) : [' ']
    );
    //현재글자만 비교
    const currentIndex = inputText.length - 1;

    const [userChosung, userJungsung] = decomposedCurrentInput[currentIndex];

    const [sampleChosung, sampleJungsung] = decomposedSample[currentIndex];

    const isChosungTypo =
      userChosung && sampleChosung && userChosung !== sampleChosung;

    if (isChosungTypo) {
      isCorredKeyPressed = false;
      setIsTypoArr((arr) => {
        const temp = [...arr];
        temp[currentIndex] = 1;
        return temp;
      });
    }

    const isJungsungTyping = userJungsung?.length;
    if (isJungsungTyping) {
      const isJungsungTypo = [...sampleJungsung]
        .slice(0, userJungsung.length)
        .every((el, i) => el !== userJungsung[i]);
      if (isJungsungTypo) {
        isCorredKeyPressed = false;
        setIsTypoArr((arr) => {
          const temp = [...arr];
          temp[currentIndex] = 1;
          return temp;
        });
      }
    }

    //이전글자까지 비교
    for (let i = 0; i < inputText.length - 1; i++) {
      const [userChosung, userJungsung, userJongsung] =
        decomposedCurrentInput[i];

      const [sampleChosung, sampleJungsung, sampleJongsung] =
        decomposedSample[i];

      const isTypo =
        userChosung !== sampleChosung ||
        [...sampleJungsung].every((el, i) => el !== userJungsung[i]) ||
        userJongsung !== sampleJongsung;

      if (isTypo) {
        isCorredKeyPressed = false;
        setIsTypoArr((arr) => {
          const temp = [...arr];
          temp[i] = 1;
          return temp;
        });
      }
    }

    onInputChange(isCorredKeyPressed);
  };
  return (
    <>
      <div ref={sampleRef}>
        {[...sample].map((char, i) => (
          <span
            className={`${isTypoArr[i] && 'bg-red-500'}`}
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
