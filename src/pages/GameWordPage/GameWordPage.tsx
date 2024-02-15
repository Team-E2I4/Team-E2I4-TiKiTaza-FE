import { ReactNode } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import Input from '@/common/Input/Input';
import { wordDummy } from './wordDummy';

const positions = ['center', 'left', 'right'];
const WordCell = ({ children }: { children: ReactNode }) => {
  const random = positions[Math.floor(Math.random() * positions.length)];
  return (
    <span
      className={`p-1 text-${random} ${Math.round(Math.random()) && 'mt-auto'} ${Math.round(Math.random()) && 'mb-auto'}`}>
      {children}
    </span>
  );
};
// 총 120개의 cell. 서버로부터 받을 단어 100개 + 랜덤20개로 구성해야함
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}
const words = shuffle(wordDummy.concat(Array(20).fill('')));

const GameWordPage = () => {
  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] border-2 border-black'>
          <div className='h-[25rem] grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-[repeat(15,7rem)] text-[1.4rem]'>
            {words.map((w, i) => {
              return <WordCell key={i + w}>{w}</WordCell>;
            })}
          </div>
          <div className='flex flex-row h-[30rem] bg-slate-200 mt£-4'>
            <div>left</div>
            <div>
              <div>cars</div>
              <Input style={`w-[20rem] h-[4rem]`} />
            </div>
            <div>right</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWordPage;
