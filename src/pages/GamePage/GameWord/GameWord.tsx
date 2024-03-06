import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import { I_IngameWsResponse, PayloadType } from '../types/websocketType';
import WordCell from './WordCell';
import WordRankContainer from './WordRankContainer';

export type WordQuestionType = { [key: string]: number };

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

  useEffect(() => {
    if (ingameRoomRes.submittedWord) {
      const submittedWord: WordQuestionType = {};
      submittedWord[ingameRoomRes.submittedWord] = -1;
    }
  }, [ingameRoomRes.submittedWord]);

  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-around h-[60rem]'>
          <div className='h-[25rem] grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-[repeat(14,9rem)] text-[1.6rem] p-4 box-content bg-gray-10 rounded-2xl'>
            {ingameRoomRes.questions?.map((w, i) => {
              return (
                <WordCell
                  key={i}
                  randomIndex={i % 3}>
                  {w.question.startsWith('#') ? ' ' : w.question}
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
                  <WordRankContainer
                    gameScore={ingameRoomRes.gameScore}
                    userId={userId}
                  />
                )}
                {ingameRoomRes.allMembers && (
                  <WordRankContainer
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
                  autoComplete='off'
                  onPaste={(e) => e.preventDefault()}
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
