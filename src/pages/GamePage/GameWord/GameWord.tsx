import { useForm } from 'react-hook-form';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import WordCell from './WordCell';
import WordRankContainer from './WordRankContainer';

interface GameWordProps extends InagmeWsChildrenProps {
  userId: number;
}

const GameWord = ({ ingameRoomRes, publishIngame, userId }: GameWordProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-between h-[60rem]'>
          <div className='h-[27rem] grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-[repeat(14,9rem)] text-[1.6rem] p-4 box-content bg-gray-10 rounded-2xl'>
            {ingameRoomRes.questions?.map((questionObj, i) => {
              return (
                <WordCell
                  key={i}
                  randomIndex={i % 3}>
                  {questionObj.question.startsWith('#')
                    ? ' '
                    : questionObj.question}
                </WordCell>
              );
            })}
          </div>
          <div className='flex flex-row items-end w-10/12 h-[30rem] mt-4'>
            <Dashboard
              type='cpm'
              value={300}
            />
            <div className='flex flex-col grow items-center'>
              <div className='grow flex relative w-full justify-center'>
                {ingameRoomRes.allMembers && (
                  <WordRankContainer
                    allMembers={ingameRoomRes.allMembers}
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
