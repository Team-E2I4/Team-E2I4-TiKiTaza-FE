
import { useCallback, useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import useTypingState from '../GameSentence/useTypingState';
import { I_Question } from '../types/websocketType';
import CodeContainer from './CodeContainer';
import CodeForm from './CodeForm';

interface CodeFormContainerProps {

  codeList: I_Question[];
  convertedCodeList: string[][];
  handleUpdateScore: (_isAllSubmitted: boolean) => void;
  handleRoundFinish: () => void;
}

const CodeFormContainer = ({
  codeList,
  convertedCodeList,
  handleUpdateScore,
  handleRoundFinish,
}: CodeFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const handleUpdateProblem = useCallback(() => {
    setCurrentProblemIndex((prev) => prev + 1);
  }, []);


  return (
    <div className='flex flex-col items-center justify-center z-10'>
      <div className='flex items-end gap-4'>
        <Dashboard
          type='cpm'
          value={cpm}
        />

        <CodeContainer
          codeItem={
            currentProblemIndex === convertedCodeList.length
              ? codeList[currentProblemIndex - 1].question
              : codeList[currentProblemIndex].question
          }
        />

        <Dashboard
          type='accuracy'
          value={accurate}
        />
      </div>
      <CodeForm

        key={`${codeList[0].question}${currentProblemIndex}`}
        isLastSentence={currentProblemIndex === convertedCodeList.length - 1}
        isRoundFinish={currentProblemIndex === convertedCodeList.length}
        codeItem={convertedCodeList?.[currentProblemIndex] ?? []}

        handleUpdateScore={handleUpdateScore}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        initializeTyping={initializeTyping}

        handleUpdateProblem={handleUpdateProblem}
        handleRoundFinish={handleRoundFinish}

      />
    </div>
  );
};

export default CodeFormContainer;
