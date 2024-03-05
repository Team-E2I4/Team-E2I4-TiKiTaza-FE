import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface CodeFormProps {
  convertedDummyCode?: string[];
}
const CodeForm = ({ convertedDummyCode }: CodeFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInputValue, setCurrentInputValue] = useState('');

  // console.log('convertedDummyCode', convertedDummyCode);
  if (convertedDummyCode === undefined) {
    return;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(e.target.value);
  };

  const handleCheckCorrect = (currentInput: string) => {
    return currentInput === convertedDummyCode[currentIndex];
  };

  const handleActiveEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isCorrectCode = handleCheckCorrect(currentInputValue);
      // console.log('isCorrectCode', isCorrectCode);
      if (isCorrectCode) {
        // TODO: enter키 누르면 publish
        // TODO: 다음 문장 입력되도록 currentIndex 증가
        setCurrentIndex((prev) =>
          prev < convertedDummyCode.length ? prev + 1 : prev
        );

        setCurrentInputValue('');
        // console.log('정답 제출!');
      }
    }
  };

  return (
    <>
      <input
        autoFocus
        type='text'
        className={`w-[60rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl
bg-white border-2 border-green-100 my-4
outline-0 text-gray-300 tracking-wider box-border`}
        value={currentInputValue}
        placeholder={convertedDummyCode[currentIndex]}
        maxLength={convertedDummyCode[currentIndex].length}
        onChange={handleInputChange}
        onKeyDown={handleActiveEnter}
      />
    </>
  );
};
export default CodeForm;
