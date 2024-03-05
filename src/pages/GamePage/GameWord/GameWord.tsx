import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Divider from '@/common/Divider/Divider';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import useWordsStore from '@/store/useWordsStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { I_IngameWsResponse, PayloadType } from '../types/websocketType';
import WordCell from './WordCell';
import { wordRankDummy } from './wordDummy';

export type WordQuestionType = { [key: string]: number };

interface WordRankProps {
  userId: number;
  track: number;
  userName: string;
  score: number;
}

const MY_USER_ID = 3;
const HEAD_COUNT = 8; // TODO: 참여자수는 게임룸에서부터 받아와햘것 같습니다. 전역 관리 등

const WordRank = (data: WordRankProps) => {
  return (
    <>
      <div className='w-28 box-content relative'>
        <div className={'h-[21rem] flex justify-between'}>
          {data.track === 0 ? (
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

          <div className='w-full absolute bottom-12 text-center'>
            <span>🚗</span>
          </div>
          {data.track === HEAD_COUNT - 1 && (
            <Divider
              orientation='vertical'
              className='border-r-[.2rem]'
            />
          )}
        </div>

        <div
          className={`w-full text-center truncate pt-[0.5rem] ${data.userId === MY_USER_ID ? 'text-[1.8rem] text-green-100' : 'text-[1.4rem] text-gray-200'}`}>
          {data.userName}
        </div>
      </div>
    </>
  );
};

const GameWord = ({
  ingameRoomRes,
  publishIngame,
}: {
  ingameRoomRes: I_IngameWsResponse;
  publishIngame: (destination: string, payload: PayloadType) => void;
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
                {wordRankDummy.map((rank, i) => {
                  const { userId, userName, score } = rank;
                  return (
                    <WordRank
                      key={i}
                      track={i}
                      userId={userId}
                      userName={userName}
                      score={score}
                    />
                  );
                })}
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
