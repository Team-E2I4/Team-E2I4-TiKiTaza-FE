import { useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import { SentenceNext } from '@/common/Ingame/SentenceBlocks';
import GameForm from './GameForm';
import useTypingState from './useTypingState';

interface GameFormContainerProps {
  sentenceList: string[];
  handleUpdateScore: () => void;
}

const GameFormContainer = ({
  sentenceList,
  handleUpdateScore,
}: GameFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [idx, setIdx] = useState(1);

  return (
    <>
      <div className='flex flex-col items-center justify-center z-10'>
        <GameForm
          key={sentenceList[idx]}
          inputName='sentence'
          sample={sentenceList[idx]}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          handleUpdateScore={handleUpdateScore}
          handleLineEnd={() => setIdx((idx) => (idx + 1) % sentenceList.length)}
          initializeTyping={initializeTyping}
        />
        <SentenceNext text={sentenceList[idx + 1]} />
        <SentenceNext text={sentenceList[idx + 2]} />
      </div>
      <div className='w-full flex justify-evenly mt-20'>
        <Dashboard
          type='cpm'
          value={cpm}
        />
        <Dashboard
          type='accuracy'
          value={accurate}
        />
      </div>
    </>
  );
};

export default GameFormContainer;
