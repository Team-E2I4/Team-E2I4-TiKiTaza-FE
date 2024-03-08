import { useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import GameFormContainer from './GameFormContainer';
const sentenceDummy = [
  '저녁 때 돌아갈 집이 있다는 것',
  '힘들 때 마음 속으로 생각 할 사람이 있다는 것',
  '외로울 때 혼자서 부를 노래 있다는 것',
  '세상에 와서 내가 하는 말 가운데서',
  '가장 고운 말을 너에게 들려주고 싶다.',
  '세상에 와서 내가 가진 생각 가운데서',
  '가장 예쁜 생각을 너에게 주고 싶다.',
];

interface GameSentenceProps extends InagmeWsChildrenProps {
  userId: number;
}
const GameSentence = ({
  ingameRoomRes,
  publishIngame,
  userId,
}: GameSentenceProps) => {
  const currentScore = useRef<number>(ingameRoomRes?.gameScore?.[userId] ?? 0);

  const TotalSpacedWord = sentenceDummy.reduce(
    (acc, cur) => acc + cur.split(' ').length,
    0
  );

  const scorePerTrankLength = Number(((1 / TotalSpacedWord) * 100).toFixed(1));

  const handleUpdateScore = () => {
    publishIngame('/info', {
      currentScore: currentScore.current + scorePerTrankLength,
    });
    currentScore.current += scorePerTrankLength;
  };

  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] relative'>
          <div className='absolute w-full h-full rounded-[14rem] border-2 border-black'></div>
          <div className='absolute w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-[14rem] border-2 border-black '></div>
          <GameFormContainer
            sentenceList={sentenceDummy}
            handleUpdateScore={handleUpdateScore}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
