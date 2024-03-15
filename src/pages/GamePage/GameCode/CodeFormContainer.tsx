import { ReactNode, useCallback, useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import useTypingState from '../GameSentence/useTypingState';
import { I_Question } from '../types/websocketType';
import CodeForm from './CodeForm';

interface CodeFormContainerProps {
  children: ReactNode;
  codeList: I_Question[];
  convertedCodeList: string[];
  handleUpdateScore: () => void;
  handleRoundFinish: () => void;
}

const CodeFormContainer = ({
  children,
  codeList,
  convertedCodeList,
  handleUpdateScore,
  handleRoundFinish,
}: CodeFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentCodeItemIndex, setCurrentCodeItemIndex] = useState(0);

  const handleUpdateProblem = useCallback(() => {
    setCurrentProblemIndex((prev) => prev + 1);
  }, []);

  const handleUpdateCodeItem = useCallback(() => {
    setCurrentCodeItemIndex((prev) => (prev + 1) % convertedCodeList.length);
  }, [convertedCodeList.length]);

  return (
    <div className='flex flex-col items-center justify-center z-10 w-[100rem]'>
      <div className='flex items-end gap-4'>
        <Dashboard
          type='cpm'
          value={cpm}
        />
        {children}
        <Dashboard
          type='accuracy'
          value={accurate}
        />
      </div>
      <CodeForm
        key={`${codeList[0].question}${currentCodeItemIndex}`}
        isLastSentence={currentCodeItemIndex === convertedCodeList.length - 1}
        isRoundFinish={currentProblemIndex === codeList.length}
        codeItem={convertedCodeList?.[currentCodeItemIndex] ?? ''}
        handleUpdateScore={handleUpdateScore}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        initializeTyping={initializeTyping}
        handleUpdateProblem={handleUpdateProblem}
        handleRoundFinish={handleRoundFinish}
        handleUpdateCodeItem={handleUpdateCodeItem}
      />
    </div>
  );
};

export default CodeFormContainer;
