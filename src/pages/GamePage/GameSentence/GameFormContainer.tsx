import { useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import { SentenceNext } from '@/common/Ingame/SentenceBlocks';
import { I_Question } from '../types/websocketType';
import GameForm from './GameForm';
import { UpdateScoreType } from './GameSentence';
import useTypingState from './useTypingState';

interface GameFormContainerProps {
  sentenceList: I_Question[];
  handleUpdateScore: UpdateScoreType;
  handleRoundFinish: () => void;
}

const GameFormContainer = ({
  sentenceList,
  handleUpdateScore,
  handleRoundFinish,
}: GameFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [idx, setIdx] = useState(0);

  return (
    <>
      <div className='flex flex-col items-center justify-center z-10'>
        <GameForm
          key={sentenceList[idx]?.question}
          sample={sentenceList[idx]?.question ?? ''}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          initializeTyping={initializeTyping}
          handleUpdateScore={handleUpdateScore}
          handleLineEnd={() => setIdx((prevIdx) => prevIdx + 1)}
          isLastSentence={sentenceList.length - 1 === idx}
          handleRoundFinish={handleRoundFinish}
        />
        <SentenceNext text={sentenceList[idx + 1]?.question ?? ''} />
        <SentenceNext text={sentenceList[idx + 2]?.question ?? ''} />
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
