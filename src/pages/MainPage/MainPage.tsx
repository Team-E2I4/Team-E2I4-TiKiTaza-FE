import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import CreateRoomModal from './CreateRoom/CreateRoomModal';
import GameRoomList from './GameRoomList';
import UserCard from './UserCard';
import UserList from './UserList';

const MainPage = () => {
  useEffect(() => {
    const sse = new EventSourcePolyfill(
      'http://ec2-3-38-182-155.ap-northeast-2.compute.amazonaws.com/api/v1/sse',
      {
        headers: {
          Authorization: `Bearer ${stored}`,
        },
        withCredentials: true,
      }
    );
    //서버측 emitter네임과 클라이언트측 이벤트 이름이 같아야 함
    sse.addEventListener('changeGameRoom', () => {});
  }, []);
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
        <GameRoomList />
      </section>
    </main>
  );
};

export default MainPage;
