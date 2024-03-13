import { useCallback, useMemo, useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
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

  const handleNextRound = useCallback(() => {
    sentenceList.current = ingameRoomRes.questions!;
  }, [ingameRoomRes.questions]);

  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onNextRound: handleNextRound,
    onRoundFinish: (currentRound) =>
      publishIngame('/round-finish', { currentRound }),
  });

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

  return (
    <>
      <IngameHeader
        handleRoundFinish={handleRoundFinish}
        currentRound={currentRound}
        timeLimit={sentenceList.current.length * SECONDS_PER_SENTENCE}
        isNextRound={ingameRoomRes.type === 'NEXT_ROUND_START'}
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
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
