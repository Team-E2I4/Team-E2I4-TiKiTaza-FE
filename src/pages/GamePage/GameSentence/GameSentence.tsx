import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IngameHeader, { SECONDS_PER_MINUTE } from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { convertTime } from '@/common/Timer/utils/convertTime';
import useTimer from '@/hooks/useTimer';
import useIngameStore from '@/store/useIngameStore';
import CanvasTrack from '../common/CanvasTrack';
import useGameRound from '../hooks/useGameRound';
import { I_Question, PublishIngameType } from '../types/websocketType';
import GameFormContainer from './GameFormContainer';
interface GameSentenceProps {
  publishIngame: PublishIngameType;
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

const GameSentence = ({ publishIngame, userId }: GameSentenceProps) => {
  const { ingameRoomRes } = useIngameStore();

  const currentScore = ingameRoomRes.allMembers.find(
    ({ memberId }) => memberId === userId
  )!.score;

  //첫 응답에 quetions가 무조건 존재하므로 non-nullable
  const sentenceList = useRef<I_Question[]>(ingameRoomRes.questions!);

  const [sentenceIdx, setSentenceIdx] = useState(0);

  const timeLimit = sentenceList.current.length * SECONDS_PER_SENTENCE;

  const handleNextRound = useCallback(() => {
    sentenceList.current = ingameRoomRes.questions!;
    setSentenceIdx(0);
  }, [ingameRoomRes.questions]);

  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onNextRound: handleNextRound,
    onRoundFinish: (currentRound) =>
      publishIngame('/round-finish', { currentRound }),
  });

  const { timeLeft, resetTimer } = useTimer({
    minutes: Math.floor(timeLimit / SECONDS_PER_MINUTE),
    seconds: timeLimit % SECONDS_PER_MINUTE,
    onFinishRound: () => {
      handleRoundFinish();
    },
  });

  useEffect(() => {
    if (ingameRoomRes.type === 'NEXT_ROUND_START') {
      resetTimer();
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

  const TotalSpacedWord = sentenceList.current.reduce(
    (acc, cur) => acc + cur.question.split(' ').length,
    0
  );

  const scorePerTrankLength = Math.ceil((1 / TotalSpacedWord) * 100);

  const handleUpdateScore: UpdateScoreType = useCallback(
    (lastUpdate: boolean = false) => {
      const newScore = currentScore + scorePerTrankLength;
      publishIngame('/info', {
        currentScore: lastUpdate ? 100 : newScore,
      });
    },
    [currentScore, publishIngame, scorePerTrankLength]
  );

  return (
    <>
      <IngameHeader
        currentRound={currentRound}
        timeLeft={convertTime(timeLeft)}
      />
      <div>
        <div className='absolute'>
          <IngameRank rankInfos={rankInfoList} />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] relative'>
          <div className='absolute w-full h-full rounded-[14rem] border-2 border-black'></div>
          <div className='absolute w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-[14rem] border-2 border-black '></div>
          <CanvasTrack allMembers={ingameRoomRes.allMembers} />
          <GameFormContainer
            sentenceList={sentenceList.current}
            sentenceIdx={sentenceIdx}
            handleLineEnd={() => setSentenceIdx((prev) => prev + 1)}
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
