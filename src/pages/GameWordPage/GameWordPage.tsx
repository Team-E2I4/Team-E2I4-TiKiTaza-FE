import { ReactNode } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import Input from '@/common/Input/Input';
import { wordDummy, wordRankDummy } from './wordDummy';

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
interface WordRankProps {
  userId: number;
  track: number;
  userName: string;
  score: number;
}
const WordRank = (data: WordRankProps) => {
  return (
    <>
      <div className='w-24 box-content relative'>
        <div
          className={`border-black border-dashed border-r-2 h-[21rem] ${data.track === 0 && 'border-l-2 border-solid'}`}>
          <span className='absolute bottom-12 left-8'>🚗</span>
        </div>
        <div
          className={`flex justify-center pt-[0.5rem] ${data.userId === MYUSERID ? 'text-[1.8rem] text-green-100' : 'text-[1.4rem] text-gray-200'}`}>
          {data.userName}
        </div>
      </div>
    </>
  );
};
const MYUSERID = 3;
const GameWordPage = () => {
  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-around h-[60rem] border-2 border-black'>
          <div className='h-[25rem] grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-[repeat(15,7rem)] text-[1.4rem]'>
            {words.map((w, i) => {
              return <WordCell key={i + w}>{w}</WordCell>;
            })}
          </div>
          <div className='flex flex-row w-10/12 h-[30rem] mt-4'>
            <div className='w-[20rem]'></div>
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
              <Input style={`w-[20rem] h-[4rem]`} />
            </div>
            <div className='w-[20rem]'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWordPage;
