import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth/useAuth';
import useOnlineUsers from '@/hooks/useOnlineUsers';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { GameModeType } from '@/types/gameMode';
import CreateRoomModal from './CreateRoom/CreateRoomModal';
import EnterRoomErrorFallback from './EnterRoomErrorFallback';
import GameRoomList from './GameRoomList';
import SSEErrorBoundary from './SSEErrorBoundary';
import SSEFallBack from './SSEFallBack';
import UserCard from './UserCard';
import UserList from './UserList';

export type FilteredGameModeType = GameModeType | 'ALL';

const gameModeList: FilteredGameModeType[] = [
  'ALL',
  'SENTENCE',
  'CODE',
  'WORD',
];

const mappedGameModeList = {
  ALL: '전체',
  SENTENCE: '문장',
  CODE: '코드',
  WORD: '단어',
};

const MainPage = () => {
  const navigate = useNavigate();
  const { data: userList } = useOnlineUsers();
  const { data: userData, isPending, error } = useAuthCheck();
  const { roomInfo, setRoomInfo } = useRoomInfoStore();

  const [selectedGameMode, setSelectedGameMode] =
    useState<FilteredGameModeType>('ALL');

  useEffect(() => {
    roomInfo && setRoomInfo(null);
  }, []);
  if (isPending) {
    return <div>유저 정보 불러오는중...</div>;
  }

  if (error) {
    return <div>유저 정보 불러오는 중 에러</div>;
  }

  return (
    <main className='flex gap-[3rem]'>
      <section className='flex flex-col gap-[3rem] w-[25rem] [&>article]:shadow-xl'>
        <UserList
          userList={[...userList.data.data!]}
          myId={userData.data.data!.memberId}
        />
        <article
          className='flex items-center justify-center bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[4.5rem] w-full cursor-pointer hover:bg-green-100 hover:text-white hover:text-[1.8rem] transition-all'
          onClick={() => navigate('/rank')}>
          <button>전체 랭킹 페이지</button>
        </article>
        <UserCard
          nickname={userData.data.data!.nickname}
          isGuest={userData.data.data!.isGuest}
          rank={userData.data.data!.rank}
          gameCount={userData.data.data!.gameCount}
          averageCpm={userData.data.data!.averageCpm}
          averageAccuracy={userData.data.data!.averageAccuracy}
        />
      </section>
      <section className='flex-1 grid grid-cols-[3fr_1fr] grid-rows-[5rem_auto] grid-flow-col gap-[3rem] [&>article]:shadow-xl'>
        <article className='rounded-[0.5rem] flex items-center justify-between gap-[3rem] '>
          {gameModeList.map((el) => (
            <span
              className={`flex-1 h-full font-[Giants-Inline] text-[2rem] flex items-center justify-center cursor-pointer rounded-[0.3rem] ${selectedGameMode === el ? 'bg-green-100' : 'bg-green-70'} hover:bg-green-100 hover:scale-110 transition-all`}
              key={el}
              onClick={() => setSelectedGameMode(el)}>
              {mappedGameModeList[el]}
            </span>
          ))}
        </article>
        <CreateRoomModal>
          <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-1 h-full flex items-center justify-center shadow-xl'>
            <span>방 만들기</span>
          </article>
        </CreateRoomModal>
        <SSEErrorBoundary fallback={(error) => <SSEFallBack error={error} />}>
          {(data) => (
            <ErrorBoundary fallbackRender={EnterRoomErrorFallback}>
              <GameRoomList
                data={data}
                selectedGameMode={selectedGameMode}
              />
            </ErrorBoundary>
          )}
        </SSEErrorBoundary>
      </section>
    </main>
  );
};

export default MainPage;
