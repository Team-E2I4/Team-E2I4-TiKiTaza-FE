import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

interface CodeFormProps {
  isLastSentence: boolean;
  isRoundFinish: boolean;
  codeItem: string[];
  handleUpdateScore: (_isAllSubmitted: boolean) => void;
  onInputChange: (
    _totalCharCompleted: number,
    _totalChar: number,
    TYPING_CONSTANT?: number
  ) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  initializeTyping: () => void;

  handleUpdateProblem: () => void;
  handleRoundFinish: () => void;
}

const CHAR_STATE = {
  PENDING: 'pending',
  CORRECT: 'correct',
  TYPO: 'typo',
};

const CodeForm = ({
  isLastSentence,
  isRoundFinish,
  codeItem,
  handleUpdateScore,
  onInputChange,
  onKeyDown,
  initializeTyping,

  handleUpdateProblem,
  handleRoundFinish,
}: CodeFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { register, handleSubmit, setValue, getValues } = useForm<{
    ['code']: string;
  }>();

  const currentPublishIndex = useRef(0);
  const divideBySpace = codeItem?.[currentIndex]?.split(' ') ?? null;

  const [checkedCorrectAndTypo, setCheckedCorrectAndTypo] = useState(
    Array.from(
      { length: codeItem[currentIndex]?.length ?? 0 },
      () => CHAR_STATE.PENDING
    )
  );

  const initializeCheckedCorrectAndTypo = () => {
    setCheckedCorrectAndTypo(
      Array.from(
        { length: codeItem[currentIndex]?.length ?? 0 },
        () => CHAR_STATE.PENDING
      )
    );
  };

  const handlePublishBySpaceKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
        handleUpdateScore(false);
      }
    },
    [divideBySpace, handleUpdateScore]
  );

  const handleCheckCorrectAndTypo = useCallback(
    (currentTypingInput: string) => {
      const currentCharIndex = currentTypingInput.length;

      const slicedCurrentCode = codeItem[currentIndex].slice(
        0,
        currentCharIndex
      );

      let isTypoExist = false;

      setCheckedCorrectAndTypo((prevState) =>
        prevState.map((_, idx) => {
          if (idx >= currentCharIndex) {
            return CHAR_STATE.PENDING;
          }

          if (
            isTypoExist === false &&
            currentTypingInput[idx] === slicedCurrentCode[idx]
          ) {
            return CHAR_STATE.CORRECT;
          }

          isTypoExist = true;
          return CHAR_STATE.TYPO;
        })
      );
    },

    [codeItem, currentIndex]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentTypingInput = e.target.value;

      setValue('code', currentTypingInput);
      handleCheckCorrectAndTypo(currentTypingInput);
    },
    [handleCheckCorrectAndTypo, setValue]
  );

  const handleCheckInputCorrect = useCallback(
    (currentInput: string) => {
      return currentInput === codeItem[currentIndex];
    },
    [codeItem, currentIndex]
  );

  const handleActiveEnter = useCallback(() => {
    const isCorrectInput = handleCheckInputCorrect(getValues('code'));

    if (isCorrectInput === false) {
      return;
    }

    setValue('code', '');
    initializeTyping();

    setCurrentIndex((prev) => (prev < codeItem.length ? prev + 1 : prev));
    currentPublishIndex.current = 0;

    const isLastSentenceOfLastProblem =
      isLastSentence && currentIndex === codeItem.length - 1;

    handleUpdateScore(isLastSentenceOfLastProblem);
    if (currentIndex === codeItem.length - 1) {
      handleUpdateProblem();
      setCurrentIndex(0);
    }
    isLastSentenceOfLastProblem && handleRoundFinish();

    // TODO: enter키 누르면 실시간 점수 publish
  }, [
    codeItem.length,
    currentIndex,
    getValues,
    handleCheckInputCorrect,
    handleRoundFinish,
    handleUpdateProblem,
    handleUpdateScore,
    initializeTyping,
    isLastSentence,
    setValue,
  ]);

  useEffect(() => {
    if (isRoundFinish) {
      return;
    }
    initializeCheckedCorrectAndTypo();
  }, [currentIndex]);

  useEffect(() => {
    if (isRoundFinish) {
      return;
    }
    onInputChange(
      checkedCorrectAndTypo.filter((el) => el === CHAR_STATE.CORRECT).length,
      getValues('code').length,
      70
    );
  }, [checkedCorrectAndTypo]);

  return (
    <>
      {
        <div
          className='w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-green-100 border-2 border-green-100 mt-[1rem] mb-[0.5rem]
        outline-0 text-gray-300 tracking-wider box-border'>
          {isRoundFinish === false ? (
            <>
              {[...codeItem[currentIndex]].map((char, idx) => (
                <span
                  className={`${checkedCorrectAndTypo[idx] === CHAR_STATE.CORRECT ? 'text-black font-bold' : checkedCorrectAndTypo[idx] === CHAR_STATE.TYPO ? 'text-red-500 font-bold' : 'text-white'}`}
                  key={`${checkedCorrectAndTypo[idx]}${idx}`}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </>
          ) : null}
        </div>
      }
      <form onSubmit={handleSubmit(handleActiveEnter)}>
        <input
          autoFocus
          autoComplete='off'
          type='text'
          className={`w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-white border-2 border-green-100 
        outline-0 text-gray-300 tracking-wider box-border`}
          placeholder={
            isRoundFinish ? '라운드가 끝났습니다!' : codeItem[currentIndex]
          }
          maxLength={isRoundFinish ? 0 : codeItem[currentIndex].length}
          disabled={isRoundFinish ? true : false}
          {...register('code', {
            onChange: (e) => handleInputChange(e),
          })}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            onKeyDown(e);
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
