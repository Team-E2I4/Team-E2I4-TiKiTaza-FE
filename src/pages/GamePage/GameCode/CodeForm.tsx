import { ChangeEvent, FormEvent, useState } from 'react';

interface CodeFormProps {
  convertedDummyCode: string[];
}

const CodeForm = ({ convertedDummyCode }: CodeFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInputValue, setCurrentInputValue] = useState('');
  // const convertedDummyCode = ['ho', 'hi'];
  // console.log('convertedDummyCode', convertedDummyCode);
  const isRoundFinish = currentIndex === convertedDummyCode.length;

  if (isRoundFinish) {
    // TODO: 모든 코드 제출을 통해 한 라운드가 끝났음을 서버에 발행
    // TODO: 시간 종료를 통해 한 라운드가 끝났음을 서버에 발행
    // console.log('모든 코드 제출!');
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(e.target.value);
  };

  const handleCheckCorrect = (currentInput: string) => {
    return currentInput === convertedDummyCode[currentIndex];
  };

  const handleActiveEnter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCorrectCode = handleCheckCorrect(currentInputValue);
    // console.log('isCorrectCode', isCorrectCode);
    if (isCorrectCode === false || isRoundFinish) {
      return;
    }
    // TODO: enter키 누르면 실시간 점수 publish
    setCurrentIndex((prev) =>
      prev < convertedDummyCode.length ? prev + 1 : prev
    );

    setCurrentInputValue('');
    // console.log('정답 제출!');
  };

  return (
    <form onSubmit={handleActiveEnter}>
      <input
        autoFocus
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
        maxLength={isRoundFinish ? 0 : convertedDummyCode[currentIndex].length}
        disabled={isRoundFinish ? true : false}
        onChange={handleInputChange}
      />
    </form>
  );
};
export default CodeForm;
