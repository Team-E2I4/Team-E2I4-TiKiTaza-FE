import { useCallback, useMemo, useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useIngameStore from '@/store/useIngameStore';
import CanvasTrack from '../common/CanvasTrack';
import TrackLine from '../common/TrackLine';
import useTypingState from '../GameSentence/useTypingState';
import useGameRound from '../hooks/useGameRound';
import { I_Question, PublishIngameType } from '../types/websocketType';
import CodeContainer from './CodeContainer';
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
    onRoundFinish: (currentRound: number) => {
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
  }, [currentScore, scorePerSubmit]);

  return (
    <>
      <IngameHeader
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
          <TrackLine />
          <CanvasTrack allMembers={ingameRoomRes.allMembers} />
          <CodeFormContainer
            key={codeList.current[0].question}
            codeList={codeList.current}
            convertedCodeList={convertedCodeList[0] ?? []}
            handleUpdateScore={handleUpdateScore}
            handleRoundFinish={handleRoundFinish}
            cpm={cpm}
            accurate={accurate}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
            initializeTyping={initializeTyping}>
            <CodeContainer codeItem={codeList.current[0].question} />
          </CodeFormContainer>
        </div>
      </div>
    </>
  );
};

export default GameCode;
