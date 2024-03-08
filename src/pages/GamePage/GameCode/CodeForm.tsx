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
  handleUpdateScore: (_isAllSubmitted?: boolean) => void;
  onInputChange: (
    _totalCharCompleted: number,
    _totalChar: number,
    TYPING_CONSTANT?: number
  ) => void;
  initializeTyping: () => void;
}

const CHAR_STATE = {
  PENDING: 'pending',
  CORRECT: 'correct',
  TYPO: 'typo',
};

const CodeForm = ({
  convertedDummyCode,
  handleUpdateScore,
  onInputChange,
  initializeTyping,
}: CodeFormProps) => {
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
    [currentIndex]
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

    const splittedTypingInput = currentTypingInput.split(' ');
    const numberOfSpaceKey = splittedTypingInput.length;

    const isLastWord = currentTypingInput.includes(
      divideBySpace[divideBySpace.length - 1]
    );
    const isPublished = numberOfSpaceKey <= currentPublishIndex.current;
    const isSameCodeWord =
      divideBySpace[currentPublishIndex.current] ===
      splittedTypingInput[numberOfSpaceKey - 1];

    if (isLastWord === false && isPublished === false && isSameCodeWord) {
      currentPublishIndex.current += 1;
      handleUpdateScore();
      //TODO: publish
    }
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTypingInput = e.target.value;
    setCurrentInputValue(() => currentTypingInput);

    handleCheckCorrectAndTypo(currentTypingInput);

    if (
      currentTypingInput.slice(0, currentTypingInput.length - 1) ===
      currentInputValue
    ) {
      onInputChange(
        checkedCorrectAndTypo.filter((el) => el === CHAR_STATE.CORRECT).length,
        currentTypingInput.length,
        50
      );
    }
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
    initializeTyping();

    currentPublishIndex.current = 0;
    if (currentIndex === convertedDummyCode.length - 1) {
      const isAllSubmitted = true;
      handleUpdateScore(isAllSubmitted);
      return;
    }
    handleUpdateScore();
    // TODO: enter키 누르면 실시간 점수 publish
  };

  return (
    <>
      {!isRoundFinish && (
        <div
          className='w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-green-100 border-2 border-green-100 mt-[1rem] mb-[0.5rem]
        outline-0 text-gray-300 tracking-wider box-border'>
          {[...convertedDummyCode[currentIndex]].map((char, idx) => (
            <span
              className={`${checkedCorrectAndTypo[idx] === CHAR_STATE.CORRECT ? 'text-black font-bold' : checkedCorrectAndTypo[idx] === CHAR_STATE.TYPO ? 'text-red-500 font-bold' : 'text-white'}`}
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
        bg-white border-2 border-green-100 
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
              e.code === 'ArrowDown' ||
              e.code === 'Meta' ||
              e.code === 'Control'
            ) {
              e.preventDefault();
            }
            if (e.code === 'Space') {
              handlePublishBySpaceKey(e);
            }
            if (e.code === 'Backspace') {
              onInputChange(0, 0);
            }
          }}
        />
      </form>
    </>
  );
};
export default CodeForm;
