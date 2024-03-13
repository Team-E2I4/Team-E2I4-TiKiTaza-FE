import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth/useAuth';
import useOnlineUsers from '@/hooks/useOnlineUsers';
import CreateRoomModal from './CreateRoom/CreateRoomModal';
import EnterRoomErrorFallback from './EnterRoomErrorFallback';
import GameRoomList from './GameRoomList';
import SSEErrorBoundary from './SSEErrorBoundary';
import SSEFallBack from './SSEFallBack';
import UserCard from './UserCard';
import UserList from './UserList';

const MainPage = () => {
  const navigate = useNavigate();
  const { data: userList } = useOnlineUsers();
  const { data: userData, isPending, error } = useAuthCheck();

  if (isPending) {
    return <div>유저 정보 불러오는중...</div>;
  }

  if (error) {
    return <div>유저 정보 불러오는 중 에러</div>;
  }

  return (
    <main className='flex pb-[4rem] gap-[3rem]'>
      <section className='flex flex-col gap-[3rem] w-[25rem]'>
        <UserList
          userList={[...userList.data.data!]}
          myId={userData.data.data!.memberId}
        />
        <article className='flex items-center justify-center bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[4.5rem] w-full cursor-pointer hover:bg-green-100 transition-all'>
          <button onClick={() => navigate('/rank')}>전체 랭킹 페이지</button>
        </article>
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
        <SSEErrorBoundary fallback={(error) => <SSEFallBack error={error} />}>
          {(data) => (
            <ErrorBoundary fallbackRender={EnterRoomErrorFallback}>
              <GameRoomList data={data} />
            </ErrorBoundary>
          )}
        </SSEErrorBoundary>
      </section>
    </main>
  );
};

export default MainPage;
