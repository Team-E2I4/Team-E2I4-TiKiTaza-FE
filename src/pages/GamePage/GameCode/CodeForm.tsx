import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from 'react';

interface CodeFormProps {
  convertedDummyCode: string[];
}

const CHAR_STATE = {
  PENDING: 'pending',
  CORRECT: 'correct',
  TYPO: 'typo',
};

const CodeForm = ({ convertedDummyCode }: CodeFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInputValue, setCurrentInputValue] = useState('');

  const currentPublishIndex = useRef(0);
  const divideBySpace = convertedDummyCode[currentIndex]?.split(' ') || null;

  const isRoundFinish = currentIndex === convertedDummyCode.length;

  const checkedCorrectAndTypo = useMemo(
    () =>
      Array.from(
        { length: convertedDummyCode[currentIndex]?.length || 0 },
        () => CHAR_STATE.PENDING
      ),
    [convertedDummyCode, currentIndex]
  );

  if (isRoundFinish) {
    // TODO: 모든 코드 제출을 통해 한 라운드가 끝났음을 서버에 발행
    // TODO: 시간 종료를 통해 한 라운드가 끝났음을 서버에 발행
  }

  const handlePublishBySpaceKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (divideBySpace === null) {
      return;
    }

    const currentTypingInput = e.currentTarget.value;

    handleCheckCorrectAndTypo(currentTypingInput);

    const splittedTypingInput = currentTypingInput.split(' ');
    const numberOfSpaceKey = splittedTypingInput.length;

    const isLastWord = currentTypingInput.includes(
      divideBySpace[divideBySpace.length - 1]
    );
    const isPublished = numberOfSpaceKey <= currentPublishIndex.current;
    const isSameCodeWord =
      divideBySpace[currentPublishIndex.current] ===
      splittedTypingInput[numberOfSpaceKey - 1];
    const isEveryCharCorrect = checkedCorrectAndTypo
      .slice(0, currentTypingInput.length)
      .every((charState) => charState === CHAR_STATE.CORRECT);

    if (
      isLastWord === false &&
      isPublished === false &&
      isSameCodeWord &&
      isEveryCharCorrect
    ) {
      currentPublishIndex.current += 1;
      //TODO: publish
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTypingInput = e.target.value;
    setCurrentInputValue(() => currentTypingInput);
    handleCheckCorrectAndTypo(currentTypingInput);
  };

  const handleCheckCorrectAndTypo = (currentTypingInput: string) => {
    const currentCharIndex = currentTypingInput.length;
    const slicedCurrentCode = convertedDummyCode[currentIndex].slice(
      0,
      currentCharIndex
    );

    let isTypoExist = false;
    Array(...currentTypingInput).forEach((currentInputChar, idx) => {
      if (
        currentInputChar === slicedCurrentCode[idx] &&
        isTypoExist === false
      ) {
        checkedCorrectAndTypo[idx] = CHAR_STATE.CORRECT;
      } else {
        checkedCorrectAndTypo[idx] = CHAR_STATE.TYPO;
        isTypoExist = true;
      }
    });

    checkedCorrectAndTypo.forEach((_, idx) => {
      if (idx >= currentCharIndex) {
        checkedCorrectAndTypo[idx] = CHAR_STATE.PENDING;
      }
    });
  };

  const handleCheckInputCorrect = (currentInput: string) => {
    return currentInput === convertedDummyCode[currentIndex];
  };

  const handleActiveEnter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCorrectInput = handleCheckInputCorrect(currentInputValue);

    if (isCorrectInput === false || isRoundFinish) {
      return;
    }

    setCurrentIndex((prev) =>
      prev < convertedDummyCode.length ? prev + 1 : prev
    );

    setCurrentInputValue('');

    currentPublishIndex.current = 0;
    // TODO: enter키 누르면 실시간 점수 publish
  };

  return (
    <>
      {!isRoundFinish && (
        <div
          className='w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-white border-2 border-green-100 my-4
        outline-0 text-gray-300 tracking-wider box-border'>
          {[...convertedDummyCode[currentIndex]].map((char, idx) => (
            <span
              className={`${checkedCorrectAndTypo[idx] === CHAR_STATE.CORRECT ? 'text-green-600 font-bold' : checkedCorrectAndTypo[idx] === CHAR_STATE.TYPO ? 'text-red-500' : 'text-black'}`}
              key={`${checkedCorrectAndTypo[idx]}${idx}`}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      )}
      <form onSubmit={handleActiveEnter}>
        <input
          autoFocus
          autoComplete='off'
          type='text'
          className={`w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-white border-2 border-green-100 my-4
        outline-0 text-gray-300 tracking-wider box-border`}
          value={currentInputValue}
          placeholder={
            isRoundFinish
              ? '라운드가 끝났습니다!'
              : convertedDummyCode[currentIndex]
          }
          maxLength={
            isRoundFinish ? 0 : convertedDummyCode[currentIndex].length
          }
          disabled={isRoundFinish ? true : false}
          onChange={handleInputChange}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onCopy={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) => {
            if (
              e.code === 'ArrowLeft' ||
              e.code === 'ArrowRight' ||
              e.code === 'ArrowUp' ||
              e.code === 'ArrowDown'
            ) {
              e.preventDefault();
            }
            if (e.code === 'Space') {
              handlePublishBySpaceKey(e);
            }
          }}
        />
      </form>
    </>
  );
};
export default CodeForm;
