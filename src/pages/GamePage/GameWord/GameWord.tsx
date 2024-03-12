
import { useCallback, useEffect, useRef, useState } from 'react';

import IngameHeader from '@/common/Ingame/IngameHeader';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import WordGameLayout from './WordGameLayout';

interface GameWordProps extends InagmeWsChildrenProps {
  userId: number;
}

const SECONDS_FOR_ALL_WORDS = 120;

const GameWord = ({ ingameRoomRes, publishIngame, userId }: GameWordProps) => {
  const [currentRound, setCurrentRound] = useState(1);
  const didRoundFinishSubmitted = useRef(false);

  useEffect(() => {
    if (ingameRoomRes.type === 'NEXT_ROUND_START') {
      setCurrentRound((prev) => prev + 1);
      didRoundFinishSubmitted.current = false;
      return;
    }
  }, [ingameRoomRes.type]);

  const handleRoundFinish = useCallback(() => {
    if (didRoundFinishSubmitted.current) {
      return;
    }
    publishIngame('/round-finish', { currentRound });
    didRoundFinishSubmitted.current = true;
  }, [currentRound, publishIngame]);

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

            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameWord;
