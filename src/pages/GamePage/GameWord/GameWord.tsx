import { Fragment, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Divider from '@/common/Divider/Divider';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import useWordsStore from '@/store/useWordsStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import {
  GameScoreType,
  I_AllMember,
  I_IngameWsResponse,
  PayloadType,
} from '../types/websocketType';
import WordCell from './WordCell';

export type WordQuestionType = { [key: string]: number };

interface WordRankProps {
  track: number;
  score: number;
  isMe: boolean;
}
const WordRank = ({
  gameScore,
  userId,
}: {
  gameScore: GameScoreType | I_AllMember[];
  userId: number;
}) => {
  const trackList = useRef<{ [key: string]: number }>();
  if (Object.prototype.toString.call(gameScore).slice(8, -1) === 'Array') {
    // I_AllMember[] 인 경우 정제하여 GameScoreType 형태의 값으로 만든 후 렌더하도록합니다
    const scoreFromMembers: { [key: string]: number } = {};
    for (const member of gameScore as I_AllMember[]) {
      scoreFromMembers[member.memberId.toString()] = 0;
    }
    trackList.current = scoreFromMembers;
  }
  const rankData = trackList.current || gameScore;

  return (
    <>
      {Object.entries(rankData).map(([memberId, score], i) => {
        return (
          <Fragment key={i}>
            <div className={'h-[24rem] flex justify-between'}>
              {i === 0 ? (
                <Divider
                  orientation='vertical'
                  className='border-r-[.2rem]'
                />
              ) : (
                <Divider
                  orientation='vertical'
                  className='border-dashed border-r-[.2rem]'
                />
              )}
              <WordRankTrack
                key={i}
                track={i}
                isMe={userId === Number(memberId)}
                score={score}
              />
              {i === Object.entries(gameScore).length - 1 && (
                <Divider
                  orientation='vertical'
                  className='border-r-[.2rem]'
                />
              )}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

const WordRankTrack = (data: WordRankProps) => {
  // 초기 기본값 2rem. 도착지점일때 20rem
  const calculatedBottom = `${2 + data.score * 0.2}rem`;
  return (
    <>
      <div className='w-28 h-[24rem] box-content relative'>
        <div className={'flex justify-between'}>
          <div
            style={{ bottom: calculatedBottom }}
            className={`w-full absolute text-center`}>
            <span>🚗</span>
          </div>
        </div>
        <div
          className={`w-full absolute bottom-0 text-center truncate h-[2rem] leading-8 border-t border-gray-300 pt-[0.1rem] ${data.isMe ? 'text-[1.8rem] text-green-100' : 'text-[1.4rem] text-gray-200'}`}>
          {data.track}
        </div>
      </div>
    </>
  );
};

const GameWord = ({
  ingameRoomRes,
  publishIngame,
  userId,
}: {
  ingameRoomRes: I_IngameWsResponse;
  publishIngame: (destination: string, payload: PayloadType) => void;
  userId: number;
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { wordsStore, setWordsStore, setSubmittedWord } = useWordsStore();

  useEffect(() => {
    if (ingameRoomRes.submittedWord) {
      const submittedWord: WordQuestionType = {};
      submittedWord[ingameRoomRes.submittedWord] = -1;
      setSubmittedWord(submittedWord);
    }
  }, [ingameRoomRes.submittedWord]);

  useEffect(() => {
    if (!checkIsEmptyObj(wordsStore)) {
      return;
    }
    const words: WordQuestionType = {};
    for (const idx in ingameRoomRes.questions) {
      words[ingameRoomRes.questions[Number(idx)].question] = Number(idx);
    }
    setWordsStore(words);
  }, [ingameRoomRes.questions]);

  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-around h-[60rem]'>
          <div className='h-[25rem] grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-[repeat(14,9rem)] text-[1.6rem] p-4 box-content bg-gray-10 rounded-2xl'>
            {!checkIsEmptyObj(wordsStore) &&
              Object.entries(wordsStore).map(([word, wordIdx], i) => {
                return (
                  <WordCell
                    key={i}
                    randomIndex={i % 3}>
                    {wordIdx >= 0 ? word : ' '}
                  </WordCell>
                );
              })}
          </div>
          <div className='flex flex-row items-end w-10/12 h-[30rem] mt-4'>
            <Dashboard
              type='wpm'
              value={300}
            />
            <div className='flex flex-col grow items-center'>
              <div className='grow flex relative w-full justify-center'>
                {ingameRoomRes.gameScore && (
                  <WordRank
                    gameScore={ingameRoomRes.gameScore}
                    userId={userId}
                  />
                )}
                {ingameRoomRes.allMembers && (
                  <WordRank
                    gameScore={ingameRoomRes.allMembers}
                    userId={userId}
                  />
                )}
              </div>
              <form
                onSubmit={handleSubmit(() => {
                  publishIngame('/word-info', { word: getValues('wordInput') });
                  setValue('wordInput', '');
                })}>
                <input
                  autoFocus
                  {...register('wordInput')}
                  className='w-[20rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl bg-white border-2 border-green-100 my-4 outline-0 text-gray-300 tracking-wider box-border'
                />
              </form>
            </div>
            <Dashboard
              type='accuracy'
              value={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWord;
