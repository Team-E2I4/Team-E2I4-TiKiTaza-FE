import { useCallback, useMemo, useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import CanvasTrack from '../common/CanvasTrack';
import useGameRound from '../hooks/useGameRound';
import { IngameWsChildrenProps } from '../IngameWSErrorBoundary';
import { I_Question } from '../types/websocketType';
import CodeFormContainer from './CodeFormContainer';

interface GameCodeProps extends IngameWsChildrenProps {
  userId: number;
}

const SECONDS_PER_SENTENCE = 7;

const GameCode = ({ ingameRoomRes, publishIngame, userId }: GameCodeProps) => {
  const codeList = useRef<I_Question[]>(ingameRoomRes.questions!);

  const convertedCodeList = codeList.current.map(({ question }) =>
    question.split('\n').map((code) => code.trim())
  );

  const handleNextRound = useCallback(() => {
    codeList.current = ingameRoomRes.questions!;
  }, [ingameRoomRes.questions]);

  const { currentRound, handleRoundFinish } = useGameRound({
    isNextRound: ingameRoomRes.type === 'NEXT_ROUND_START',
    onNextRound: handleNextRound,
    onRoundFinish: (currentRound: number) =>
      publishIngame('/round-finish', { currentRound }),
  });

  const rankInfoList = useMemo(
    () =>
      ingameRoomRes.allMembers
        .map(({ memberId, nickname, score }) => ({
          memberId,
          nickname,
          currentScore: score,
          isMe: memberId === userId,
        }))
        .sort((prev, next) => next.currentScore - prev.currentScore),
    [ingameRoomRes.allMembers, userId]
  );

  const currentScore = ingameRoomRes.allMembers.find(
    ({ memberId }) => memberId === userId
  )!.score;

  const totalSpacedWord = useMemo(
    () =>
      convertedCodeList.reduce(
        (numOfArray, currentArray) =>
          numOfArray +
          currentArray
            .map((code) => code.split(' ').length)
            .reduce((prevNum, currentNum) => prevNum + currentNum, 0),
        0
      ),
    [convertedCodeList]
  );

  const scorePerSubmit = useMemo(
    () => Math.floor((1 / totalSpacedWord) * 100),
    [totalSpacedWord]
  );

  const handleUpdateScore = useCallback(
    (_isAllSubmitted: boolean) => {
      const newScore = _isAllSubmitted ? 100 : currentScore + scorePerSubmit;
      publishIngame('/info', { currentScore: newScore });
    },
    [currentScore, publishIngame, scorePerSubmit]
  );

  return (
    <>
      <IngameHeader
        key={codeList.current[0].question}
        handleRoundFinish={handleRoundFinish}
        currentRound={currentRound}
        timeLimit={
          convertedCodeList.reduce((prev, cur) => prev + cur.length, 0) *
          SECONDS_PER_SENTENCE
        }
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
          <CodeFormContainer
            key={codeList.current[0].question}
            codeList={codeList.current}
            convertedCodeList={convertedCodeList}
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
          />
        </div>
      </div>
    </>
  );
};

export default GameCode;
