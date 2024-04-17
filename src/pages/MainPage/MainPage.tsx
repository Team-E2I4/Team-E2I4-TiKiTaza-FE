import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth/useAuth';
import useOnlineUsers from '@/hooks/useOnlineUsers';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { GameModeType } from '@/types/gameMode';
import CreateRoomModal from './CreateRoom/CreateRoomModal';
import EnterRoomErrorFallback from './EnterRoomErrorFallback';
import GameModeCheckBox from './GameModeCheckBox';
import GameRoomList from './GameRoomList';
import SseFallback from './SseFallback';
import SseFetcher from './SseFetcher';
import UserCard from './UserCard';
import UserList from './UserList';

export type FilteredGameModeType = GameModeType | 'ALL';

export type CheckedGameModeType = {
  [key in FilteredGameModeType]: boolean;
};

export type EntriesType<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const MainPage = () => {
  const navigate = useNavigate();
  const { data: userList } = useOnlineUsers();
  const { data: userData, isPending, error } = useAuthCheck();
  const { roomInfo, setRoomInfo } = useRoomInfoStore();

  const [checkedGameMode, setCheckedGameMode] = useState<CheckedGameModeType>({
    ALL: true,
    SENTENCE: true,
    CODE: true,
    WORD: true,
  });

  const checkedGameModeList = (
    Object.entries(checkedGameMode) as EntriesType<CheckedGameModeType>
  )
    .filter(([mode, state]) => mode !== 'ALL' && state)
    .map(([mode]) => mode) as Exclude<keyof CheckedGameModeType, 'ALL'>[];

  const { setDidAdminStart } = useGameWaitingRoomStore();
  useEffect(() => {
    setDidAdminStart(false);
    if (roomInfo) {
      setRoomInfo(null);
    }
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
        <article className='flex flex-col gap-[1rem] p-[2rem] bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[40rem] w-full'>
          <UserList
            userList={[...userList.data.data!]}
            myId={userData.data.data!.memberId}
          />
        </article>
        <article
          className='flex items-center justify-center bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[4.5rem] w-full cursor-pointer hover:bg-green-100 hover:text-white hover:text-[1.8rem] transition-all'
          onClick={() => navigate('/rank')}>
          <button>전체 랭킹</button>
        </article>
        <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full p-[1.2rem] group relative'>
          <UserCard
            nickname={userData.data.data!.nickname}
            isGuest={userData.data.data!.isGuest}
            rank={userData.data.data!.rank}
            gameCount={userData.data.data!.gameCount}
            averageCpm={userData.data.data!.averageCpm}
            averageAccuracy={userData.data.data!.averageAccuracy}
          />
        </article>
      </section>
      <section className='flex-1 grid grid-cols-[3fr_1fr_1fr] grid-rows-[5rem_auto] grid-flow-col gap-[3rem]'>
        <article className='rounded-[0.5rem] flex items-center justify-between gap-[3rem]'>
          <GameModeCheckBox
            checkedGameMode={checkedGameMode}
            setCheckedGameMode={setCheckedGameMode}
          />
        </article>
        <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-1 h-full flex items-center justify-center shadow-xl hover:bg-green-100 transition-all hover:text-white hover:text-[1.8rem]'>
          <button>연습모드!</button>
        </article>
        <CreateRoomModal>
          <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-1 h-full flex items-center justify-center shadow-xl hover:bg-green-100 transition-all hover:text-white hover:text-[1.8rem]'>
            <button>방 만들기</button>
          </article>
        </CreateRoomModal>
        <SseFetcher fallback={() => <SseFallback />}>
          {(data) => (
            <ErrorBoundary fallbackRender={EnterRoomErrorFallback}>
              <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-3'>
                <GameRoomList
                  data={data}
                  checkedGameModeList={checkedGameModeList}
                  className='shadow-xl'
                />
              </article>
            </ErrorBoundary>
          )}
        </SseFetcher>
      </section>
    </main>
  );
};

export default MainPage;
