import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import CanvasTrack from '../common/CanvasTrack';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import { I_Question } from '../types/websocketType';
import GameFormContainer from './GameFormContainer';
interface GameSentenceProps extends InagmeWsChildrenProps {
  userId: number;
}

const SECONDS_PER_SENTENCE = 7;

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
      sentencList.current = ingameRoomRes.questions!;
      didRoundFinishSubmitted.current = false;
      return;
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

  const TotalSpacedWord = sentencList.current.reduce(
    (acc, cur) => acc + cur.question.split(' ').length,
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

  return (
    <>
      <IngameHeader
        handleRoundFinish={handleRoundFinish}
        currentRound={currentRound}
        timeLimit={sentencList.current.length * SECONDS_PER_SENTENCE}
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
            sentenceList={sentencList.current.slice(0, 2)}
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
