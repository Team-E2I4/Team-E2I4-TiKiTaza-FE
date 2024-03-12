
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import CanvasTrack from '../common/CanvasTrack';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import { I_Question } from '../types/websocketType';

import CodeFormContainer from './CodeFormContainer';

interface GameCodeProps extends InagmeWsChildrenProps {
  userId: number;
}


const SECONDS_PER_SENTENCE = 7;

const GameCode = ({ ingameRoomRes, publishIngame, userId }: GameCodeProps) => {
  const codeList = useRef<I_Question[]>(ingameRoomRes.questions!);

  const [currentRound, setCurrentRound] = useState(1);

  const didRoundFinishSubmitted = useRef(false);

  const convertedCodeList = codeList.current.map(({ question }) =>
    question.split('\n').map((code) => code.trim())
  );

  const myCurrentScore = ingameRoomRes.allMembers.find(
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

  const handleUpdateScore = useCallback(
    (_isAllSubmitted: boolean) => {
      const newScore = _isAllSubmitted ? 100 : myCurrentScore + scorePerSubmit;
      publishIngame('/info', { currentScore: newScore });
    },
    [myCurrentScore, publishIngame, scorePerSubmit]
  );

  const handleRoundFinish = useCallback(() => {
    if (didRoundFinishSubmitted.current) {
      return;
    }

    publishIngame('/round-finish', { currentRound });
    didRoundFinishSubmitted.current = true;
  }, [currentRound, publishIngame]);

  useEffect(() => {
    if (ingameRoomRes.type === 'NEXT_ROUND_START') {
      setCurrentRound((prev) => prev + 1);
      codeList.current = ingameRoomRes.questions!;
      didRoundFinishSubmitted.current = false;
      return;
    }
  }, [ingameRoomRes.type]);

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
