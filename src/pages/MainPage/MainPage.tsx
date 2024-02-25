import CreateRoomModal from './CreateRoom/CreateRoomModal';
import GameRoomList from './GameRoomList';
import SSEErrorBoundary from './SSEErrorBoundary';
import SSEFallBack from './SSEFallBack';
import UserCard from './UserCard';
import UserList from './UserList';

const MainPage = () => {
  return (
    <main className='flex pb-[4rem] gap-[3rem]'>
      <section className='flex flex-col gap-[3rem] w-[25rem]'>
        <UserList />
        <article className='flex items-center justify-center bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[4.5rem] w-full'></article>
        <UserCard />
      </section>
      <section className='flex-1 grid grid-cols-[3fr_1fr] grid-rows-[5rem_auto] grid-flow-col gap-[3rem]'>
        <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100'>
          검색 or 서버이름
        </article>
        <CreateRoomModal>
          <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-1 h-full'>
            방 만들기
          </article>
        </CreateRoomModal>

        <SSEErrorBoundary fallback={<SSEFallBack />}>
          {(data) => <GameRoomList data={data} />}
        </SSEErrorBoundary>
      </section>
    </main>
  );
};

export default MainPage;
