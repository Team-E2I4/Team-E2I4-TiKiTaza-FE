import IngameHeader from '@/common/Ingame/IngameHeader';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import useGameRound from '../hooks/useGameRound';
import { IngameWsChildrenProps } from '../IngameWSErrorBoundary';
import WordGameLayout from './WordGameLayout';

interface GameWordProps extends IngameWsChildrenProps {
  userId: number;
}

const SECONDS_FOR_ALL_WORDS = 120;

/* 
  1. 인게임헤더
  2. 트랙
  3. 대시보드
  4. 공통로직
  
  GameXXX (공통로직 보유) => Sentence, Word, Code
*/

const GameWord = ({ ingameRoomRes, publishIngame, userId }: GameWordProps) => {
  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onRoundFinish: (currentRound) =>
      publishIngame('/round-finish', { currentRound }),
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameWord;
