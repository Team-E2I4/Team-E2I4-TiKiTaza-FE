import { ReactNode } from 'react';
import Divider from '@/common/Divider/Divider';
import IngameHeader from '@/common/Ingame/IngameHeader';
import Input from '@/common/Input/Input';
import { wordDummy, wordRankDummy } from './wordDummy';

const EMPTY_WORD = 20;
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
// 총 120개의 cell. 서버로부터 받을 단어 100개 + 랜덤20개(EMPTY_WORD)로 구성해야함
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}
const words = shuffle(wordDummy.concat(Array(EMPTY_WORD).fill('')));
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

const GameWordPage = () => {
  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-around h-[60rem]'>
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
                    <>
                      <WordRank
                        key={i}
                        track={i}
                        userId={userId}
                        userName={userName}
                        score={score}
                      />
                    </>
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
