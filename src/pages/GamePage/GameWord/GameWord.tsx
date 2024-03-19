import { useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import useIngameStore from '@/store/useIngameStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import useTypingState from '../GameSentence/useTypingState';
import useGameRound from '../hooks/useGameRound';
import { PublishIngameType } from '../types/websocketType';
import WordGameLayout from './WordGameLayout';

interface GameWordProps {
  publishIngame: PublishIngameType;
  userId: number;
}

const SECONDS_FOR_ALL_WORDS = 120;

const GameWord = ({ publishIngame, userId }: GameWordProps) => {
  const { ingameRoomRes } = useIngameStore();
  const {
    cpm,
    averageCpm,
    onInputChange,
    initializeTyping,
    initializeAverage,
  } = useTypingState();

  const [averageAccurate, setAverageAccurate] = useState(0);

  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onRoundFinish: (currentRound) => {
      publishIngame('/round-finish', {
        currentRound,
        cpm: averageCpm,
        accuracy: averageAccurate,
      });
      initializeTyping();
      initializeAverage();
    },
  });

  return (
    <>
      <IngameHeader
        handleRoundFinish={handleRoundFinish}
        currentRound={currentRound}
        timeLimit={Math.ceil(
          SECONDS_FOR_ALL_WORDS / ingameRoomRes.allMembers.length
        )}
        isNextRound={ingameRoomRes.type === 'NEXT_ROUND_START'}
      />

      <div className='grow'>
        <div className='flex flex-col items-center justify-between h-[61rem]'>
          {!checkIsEmptyObj(ingameRoomRes) && (
            <WordGameLayout
              ingameRoomRes={ingameRoomRes}
              publishIngame={publishIngame}
              userId={userId}
              handleRoundFinish={handleRoundFinish}
              onInputChange={onInputChange}
              initializeTyping={initializeTyping}
              cpm={cpm}
              setAverageAccurate={setAverageAccurate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameWord;
