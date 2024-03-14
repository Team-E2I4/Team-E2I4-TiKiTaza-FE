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
  sentenceIdx: number;
  handleLineEnd: () => void;
}

const GameFormContainer = ({
  sentenceList,
  handleUpdateScore,
  handleRoundFinish,
  sentenceIdx,
  handleLineEnd,
}: GameFormContainerProps) => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <GameForm
          key={sentenceList[sentenceIdx]?.question ?? ''}
          sample={sentenceList[sentenceIdx]?.question ?? ''}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          initializeTyping={initializeTyping}
          handleUpdateScore={handleUpdateScore}
          handleLineEnd={handleLineEnd}
          isLastSentence={sentenceList.length - 1 === sentenceIdx}
          handleRoundFinish={() => {
            handleRoundFinish();
          }}
        />
        <SentenceNext text={sentenceList[sentenceIdx + 1]?.question ?? ''} />
        <SentenceNext text={sentenceList[sentenceIdx + 2]?.question ?? ''} />
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
