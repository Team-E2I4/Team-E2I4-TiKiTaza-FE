import Dashboard from '@/common/Ingame/Dashboard';
import useTypingState from '../GameSentence/useTypingState';
import CodeContainer from './CodeContainer';
import CodeForm from './CodeForm';

interface CodeFormContainerProps {
  dummyCode: string;
  convertedDummyCode: string[];
  handleUpdateScore: (_isAllSubmitted?: boolean) => void;
}

const CodeFormContainer = ({
  dummyCode,
  convertedDummyCode,
  handleUpdateScore,
}: CodeFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();
  return (
    <div className='flex flex-col items-center justify-center z-10'>
      <div className='flex items-end gap-4'>
        <Dashboard
          type='cpm'
          value={cpm}
        />
        <CodeContainer dummyCode={dummyCode} />
        <Dashboard
          type='accuracy'
          value={accurate}
        />
      </div>
      <CodeForm
        inputName='code'
        convertedDummyCode={convertedDummyCode}
        handleUpdateScore={handleUpdateScore}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        initializeTyping={initializeTyping}
      />
    </div>
  );
};

export default CodeFormContainer;
