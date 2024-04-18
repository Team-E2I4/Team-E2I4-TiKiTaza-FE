import { useCallback, useMemo, useRef, useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { SentenceNext } from '@/common/Ingame/SentenceBlocks';
import playSoundEffect from '@/pages/GamePage/common/playSoundEffect';
import useIngameStore from '@/store/useIngameStore';
import CanvasTrack from '../common/CanvasTrack';
import TrackLine from '../common/TrackLine';
import { SECONDS_PER_SENTENCE } from '../constants';
import useGameRound from '../hooks/useGameRound';
import { I_Question, PublishIngameType } from '../types/websocketType';
import GameForm from './GameForm';
import useTypingState from './useTypingState';
interface GameSentenceProps {
  publishIngame: PublishIngameType;
  userId: number;
}

export type UpdateScoreType = () => void;

export interface I_RankInfoList {
  memberId: number;
  nickname: string;
  currentScore: number;
  isMe: boolean;
}

const GameSentence = ({ publishIngame, userId }: GameSentenceProps) => {
  const { ingameRoomRes, isRoundWaiting } = useIngameStore();

  const currentScore = ingameRoomRes.allMembers.find(
    ({ memberId }) => memberId === userId
  )!.score;

  //첫 응답에 quetions가 무조건 존재하므로 non-nullable
  const sentenceList = useRef<I_Question[]>(ingameRoomRes.questions!);

  const [sentenceIdx, setSentenceIdx] = useState(0);

  const handleNextRound = useCallback(() => {
    sentenceList.current = ingameRoomRes.questions!;
    setSentenceIdx(0);
  }, [ingameRoomRes.questions]);

  const {
    cpm,
    accurate,
    averageCpm,
    averageAccurate,
    onInputChange,
    onKeyDown,
    initializeTyping,
    initializeAverage,
  } = useTypingState();

  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onNextRound: handleNextRound,
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
  const handleUpdateScore: UpdateScoreType = useCallback(() => {
    const newScore = currentScore + scorePerTrankLength;
    publishIngame('/info', {
      currentScore: newScore,
    });
    const sound = playSoundEffect();
    sound.play();
  }, [currentScore, scorePerTrankLength]);

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
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative w-[110rem]'>
          <TrackLine />
          <CanvasTrack allMembers={ingameRoomRes.allMembers} />
          <div className='flex flex-col items-center justify-center z-10'>
            <GameForm
              key={sentenceList.current[sentenceIdx]?.question ?? ''}
              sample={sentenceList.current[sentenceIdx]?.question ?? ''}
              onInputChange={onInputChange}
              onKeyDown={onKeyDown}
              handleUpdateScore={handleUpdateScore}
              handleLineEnd={() => {
                initializeTyping();
                setSentenceIdx((prev) => prev + 1);
              }}
              isLastSentence={sentenceList.current.length - 1 === sentenceIdx}
              handleRoundFinish={handleRoundFinish}
              isRoundWaiting={isRoundWaiting}
            />
            <SentenceNext
              text={sentenceList.current[sentenceIdx + 1]?.question ?? ''}
            />
            <SentenceNext
              text={sentenceList.current[sentenceIdx + 2]?.question ?? ''}
            />
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
        </div>
      </div>
    </>
  );
};

export default GameSentence;
