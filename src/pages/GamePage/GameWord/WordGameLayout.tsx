import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Dashboard from '@/common/Ingame/Dashboard';
import useTypingState from '../GameSentence/useTypingState';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import WordCell from './WordCell';
import WordRankContainer from './WordRankContainer';

interface GameWordProps extends InagmeWsChildrenProps {
  userId: number;
  handleRoundFinish: () => void;
}

const WordGameLayout = ({
  ingameRoomRes,
  publishIngame,
  userId,
  handleRoundFinish,
}: GameWordProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { cpm, onInputChange, initializeTyping } = useTypingState();

  const submitCount = useRef(0);
  const currentScore =
    ingameRoomRes.allMembers.find(({ memberId }) => memberId === userId)
      ?.score ?? 0;

  const submittedQuestions = ingameRoomRes.questions?.filter((question) =>
    question.question.startsWith('#')
  );
  if (submittedQuestions?.length === 100) {
    handleRoundFinish();
  }

  useEffect(() => {
    onInputChange(0, 100, 150); //동기화..
  }, [ingameRoomRes]);

  return (
    <>
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
          value={cpm}
        />
        <div className='flex flex-col grow items-center'>
          <div className='grow flex relative w-full justify-center'>
            <WordRankContainer
              allMembers={ingameRoomRes.allMembers}
              userId={userId}
            />
          </div>
          <form
            onSubmit={handleSubmit(() => {
              publishIngame('/word-info', { word: getValues('wordInput') });
              setValue('wordInput', '');
              initializeTyping();
              submitCount.current += 1;
            })}>
            <input
              autoFocus
              autoComplete='off'
              onPaste={(e) => e.preventDefault()}
              {...register('wordInput', {
                onChange: (e) =>
                  onInputChange(e.target.value.trim().length, 100, 150), // 단어게임에선 totalChar가 없습니다
              })}
              className='w-[20rem] h-[4rem] flex items-center pl-[1.75rem] rounded-2xl bg-white border-2 border-green-100 my-4 outline-0 text-gray-300 tracking-wider box-border'
            />
          </form>
        </div>
        <Dashboard
          type='accuracy'
          value={Math.floor((currentScore / submitCount.current) * 100) || 0}
        />
      </div>
    </>
  );
};
export default WordGameLayout;
