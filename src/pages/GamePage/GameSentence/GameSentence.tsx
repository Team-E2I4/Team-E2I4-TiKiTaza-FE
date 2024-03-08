import { useEffect, useRef, useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import CanvasTrack from '../common/CanvasTrack';
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

export interface I_RankInfoList {
  memberId: number;
  nickname: string;
  currentScore: number;
  isMe: boolean;
}
const GameSentence = ({
  ingameRoomRes,
  publishIngame,
  userId,
}: GameSentenceProps) => {
  const currentScore = useRef<number>(ingameRoomRes?.gameScore?.[userId] ?? 0);

  const currentMembers = useRef(ingameRoomRes.allMembers);

  const initialRankInfo = () =>
    currentMembers.current?.map((el) => ({
      memberId: el.memberId,
      nickname: el.nickname,
      currentScore: 0,
      isMe: el.memberId === userId,
    }));

  const [rankInfoList, setRankInfoList] = useState(initialRankInfo);

  useEffect(() => {
    if (rankInfoList && ingameRoomRes?.gameScore) {
      const temp = { ...ingameRoomRes.gameScore };
      setRankInfoList(() => {
        const tempInfoList = [...rankInfoList]
          .map((rankInfo) => ({
            ...rankInfo,
            currentScore: temp[rankInfo.memberId],
          }))
          .sort((prev, next) => next.currentScore - prev.currentScore);
        return tempInfoList;
      });
    }
  }, [ingameRoomRes.gameScore]);

  const TotalSpacedWord = sentenceDummy.reduce(
    (acc, cur) => acc + cur.split(' ').length,
    0
  );

  const scorePerTrankLength = Number(((1 / TotalSpacedWord) * 100).toFixed(1));

  const handleUpdateScore = () => {
    publishIngame('/info', {
      currentScore: currentScore + scorePerTrankLength,
    });
  };
  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank rankInfos={rankInfoList as I_RankInfoList[]} />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative w-[110rem]'>
          <div className='absolute w-[110rem] h-full rounded-[10rem] border-2 border-black'></div>
          <div className='absolute w-[100rem] h-[calc(100%-10rem)] rounded-[5rem] border-2 border-black'></div>
          <CanvasTrack
            allMembers={ingameRoomRes.allMembers}
            isNextRoundStart={ingameRoomRes.type === 'NEXT_ROUND_START'}
          />
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
