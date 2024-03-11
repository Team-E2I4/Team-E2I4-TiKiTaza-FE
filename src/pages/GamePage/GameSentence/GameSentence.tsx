import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import CanvasTrack from '../common/CanvasTrack';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import { I_Question } from '../types/websocketType';
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

export type UpdateScoreType = (lastUpdate?: boolean) => void;

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
  //참여자중에 본인은 무조건 존재하므로 non-nullable
  const currentScore = ingameRoomRes.allMembers.find(
    ({ memberId }) => memberId === userId
  )!.score;

  //첫 응답에 quetions가 무조건 존재하므로 non-nullable
  const sentencList = useRef<I_Question[]>(ingameRoomRes.questions!);

  const [currentRound, setCurrentRound] = useState(1);

  const didRoundFinishSubmitted = useRef(false);

  useEffect(() => {
    if (ingameRoomRes.type === 'NEXT_ROUND_START') {
      setCurrentRound((prev) => prev + 1);
      didRoundFinishSubmitted.current = false;
      return;
    }
    if (ingameRoomRes.type === 'FINISH') {
      //게임이 끝났을때 로직
    }
  }, [ingameRoomRes.type]);

  const rankInfoList = useMemo(
    () =>
      ingameRoomRes.allMembers
        .map(({ memberId, nickname, score }) => ({
          memberId,
          nickname,
          currentScore: score ?? 0,
          isMe: memberId === userId,
        }))
        .sort((prev, next) => next.currentScore - prev.currentScore),
    [ingameRoomRes.allMembers, userId]
  );

  const TotalSpacedWord = sentenceDummy.reduce(
    (acc, cur) => acc + cur.split(' ').length,
    0
  );

  const scorePerTrankLength = Math.floor((1 / TotalSpacedWord) * 100);

  const handleUpdateScore: UpdateScoreType = useCallback(
    (lastUpdate: boolean = false) => {
      const newScore = lastUpdate ? 100 : currentScore + scorePerTrankLength;
      publishIngame('/info', {
        currentScore: newScore,
      });
    },
    [currentScore, publishIngame, scorePerTrankLength]
  );

  const handleRoundFinish = useCallback(() => {
    if (didRoundFinishSubmitted.current) {
      return;
    }

    publishIngame('/round-finish', { currentRound });
    didRoundFinishSubmitted.current = true;
  }, [currentRound, publishIngame]);

  //현재 유저의 게임 점수가 100점 이상일시 handleRoundFinsh 호출 && 100점 미만인데 시간 지나면 호출

  //처음에는 allMembers의 nickname, 점수가 바뀌면 gameScore에서 userId

  return (
    <>
      <IngameHeader
        handleRoundFinish={handleRoundFinish}
        currentRound={currentRound}
      />
      <div>
        <div className='absolute'>
          <IngameRank rankInfos={rankInfoList} />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] relative'>
          <div className='absolute w-full h-full rounded-[14rem] border-2 border-black'></div>
          <div className='absolute w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-[14rem] border-2 border-black '></div>
          <CanvasTrack
            allMembers={ingameRoomRes.allMembers}
            isNextRoundStart={ingameRoomRes.type === 'NEXT_ROUND_START'}
          />
          <GameFormContainer
            sentenceList={sentencList.current.slice(0, 5)}
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
