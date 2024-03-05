import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { decomposeKrChar } from './decomposeKrChar';

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
    if (!e.target.value) {
      return;
    }
    /* 
      1. 현재 입력중인 단어는 종성제외 맞으면 ok
      2. 다음 단어로 넘어갔을 시 종성이 다르면 에러처리
    */
    setIsTypoArr((arr) => {
      let temp = [...arr];
      temp = Array(decomposedSample.length).fill(0);
      return temp;
    });
    const inputText = e.target.value;

    const decomposedCurrentInput = [...inputText].map((el) =>
      el !== ' ' ? decomposeKrChar(el) : [' ']
    );
    //현재글자만 비교
    const currentIndex = inputText.length - 1;
    const [userChosung, userJungsung] = decomposedCurrentInput[currentIndex];
    const [sampleChosung, sampleJungsung] = decomposedSample[currentIndex];
    if (userChosung && sampleChosung && userChosung !== sampleChosung) {
      setIsTypoArr((arr) => {
        const temp = [...arr];
        temp[currentIndex] = 1;
        return temp;
      });
    }
    if (userJungsung && sampleJungsung && userJungsung !== sampleJungsung) {
      setIsTypoArr((arr) => {
        const temp = [...arr];
        temp[currentIndex] = 1;
        return temp;
      });
    }

    //이전글자까지 비교
    for (let i = 0; i < inputText.length - 1; i++) {
      const [userChosung, userJungsung, userJongsung] =
        decomposedCurrentInput[i];

      const [sampleChosung, sampleJungsung, sampleJongsung] =
        decomposedSample[i];

      const isTypo =
        userChosung !== sampleChosung ||
        userJungsung !== sampleJungsung ||
        userJongsung !== sampleJongsung;
      if (isTypo) {
        setIsTypoArr((arr) => {
          const temp = [...arr];
          temp[i] = 1;
          return temp;
        });
      }
    }
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
              />
            </>
          )}
        />
      </form>
      {sample}
    </>
  );
};

export default GameForm;
