import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFocusInput from '../hooks/useFocusInput';

interface CodeFormProps {
  isLastSentence: boolean;
  isRoundFinish: boolean;
  codeItem: string;
  handleUpdateScore: () => void;
  onInputChange: (
    _totalCharCompleted: number,
    _totalChar: number,
    TYPING_CONSTANT?: number
  ) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  initializeTyping: () => void;

  handleUpdateProblem: () => void;
  handleRoundFinish: () => void;
  handleUpdateCodeItem: () => void;
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
  handleUpdateCodeItem,
}: CodeFormProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<{
    ['code']: string;
  }>();
  const { ref } = register('code');

  const { focusInput } = useFocusInput();

  const currentPublishIndex = useRef(0);

  const [checkedCorrectAndTypo, setCheckedCorrectAndTypo] = useState(
    Array.from({ length: codeItem?.length ?? 0 }, () => CHAR_STATE.PENDING)
  );

  const handlePublishBySpaceKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (codeItem === '') {
      return;
    }
    const divideBySpace = codeItem.split(' ');

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
    }
  };

  const handleCheckCorrectAndTypo = (currentTypingInput: string) => {
    const currentCharIndex = currentTypingInput.length;

    const slicedCurrentCode = codeItem.slice(0, currentCharIndex);

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
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTypingInput = e.target.value;

    setValue('code', currentTypingInput);
    handleCheckCorrectAndTypo(currentTypingInput);
  };

  const handleCheckInputCorrect = (currentInput: string) => {
    return currentInput === codeItem;
  };

  const handleActiveEnter = () => {
    const isCorrectInput = handleCheckInputCorrect(getValues('code'));

    if (isCorrectInput === false) {
      return;
    }

    setValue('code', '');
    initializeTyping();
    handleUpdateCodeItem();
    currentPublishIndex.current = 0;

    handleUpdateScore();
    if (isLastSentence) {
      handleUpdateProblem();
      handleRoundFinish();
    }

    // TODO: enter키 누르면 실시간 점수 publish
  };

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
              {[...codeItem].map((char, idx) => (
                <span
                  className={`${checkedCorrectAndTypo[idx] === CHAR_STATE.CORRECT ? 'text-black font-bold' : checkedCorrectAndTypo[idx] === CHAR_STATE.TYPO ? 'text-red-500 font-bold' : 'text-white'} 
                ${char === ' ' && checkedCorrectAndTypo[idx] === 'typo' && 'w-[0.5rem] h-[2rem] bg-red-500'}`}
                  key={`${char}${idx}`}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </>
          ) : null}
        </div>
      }
      <form onSubmit={handleSubmit(handleActiveEnter)}>
        <input
          autoComplete='off'
          type='text'
          className={`w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
        bg-white border-2 border-green-100 
        outline-0 text-gray-300 tracking-wider box-border`}
          placeholder={isRoundFinish ? '라운드가 끝났습니다!' : codeItem}
          maxLength={isRoundFinish ? 0 : codeItem.length}
          disabled={isRoundFinish ? true : false}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            onKeyDown(e);
            if (e.code === 'Space') {
              handlePublishBySpaceKey(e);
            }
          }}
          {...register('code', {
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
export default CodeForm;
