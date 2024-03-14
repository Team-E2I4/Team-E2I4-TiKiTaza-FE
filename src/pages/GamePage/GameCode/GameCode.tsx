import { useCallback, useMemo, useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useIngameStore from '@/store/useIngameStore';
import CanvasTrack from '../common/CanvasTrack';
import useGameRound from '../hooks/useGameRound';
import { I_Question, PublishIngameType } from '../types/websocketType';
import CodeFormContainer from './CodeFormContainer';
interface GameCodeProps {
  publishIngame: PublishIngameType;
  userId: number;
}

const SECONDS_PER_SENTENCE = 7;

const GameCode = ({ publishIngame, userId }: GameCodeProps) => {
  const { ingameRoomRes } = useIngameStore();
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
    () => Math.ceil((1 / totalSpacedWord) * 100),
    [totalSpacedWord]
  );

  const handleUpdateScore = useCallback(() => {
    const newScore = currentScore + scorePerSubmit;
    publishIngame('/info', { currentScore: newScore });
  }, [currentScore, publishIngame, scorePerSubmit]);

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
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative w-[110rem]'>
          <div className='absolute w-[110rem] h-full rounded-[10rem] border-2 border-black'></div>
          <div className='absolute w-[100rem] h-[calc(100%-10rem)] rounded-[5rem] border-2 border-black'></div>
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
