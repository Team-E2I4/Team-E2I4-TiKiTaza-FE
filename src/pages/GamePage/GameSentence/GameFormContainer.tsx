import { useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import { SentenceNext } from '@/common/Ingame/SentenceBlocks';
import { PublishIngameType } from '../types/websocketType';
import GameForm from './GameForm';
import useTypingState from './useTypingState';

interface GameFormContainerProps {
  sentenceList: string[];
  trackRatio: number;
  publishIngame: PublishIngameType;
}

const GameFormContainer = ({
  sentenceList,
  trackRatio,
  publishIngame,
}: GameFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [idx, setIdx] = useState(1);

  const handleCorrectWordSubmit = () => {
    publishIngame('/info', { currentScore: trackRatio });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center z-10'>
        <GameForm
          inputName='sentence'
          sample={sentenceList[idx]}
          key={sentenceList[idx]}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          handleCorrectWordSubmit={handleCorrectWordSubmit}
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
