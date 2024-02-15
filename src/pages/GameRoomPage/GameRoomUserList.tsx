import { I_gameRoomUserCard } from './GameRoomPage';
import GameRoomUserItem from './GameRoomUserItem';

interface GameRoomUserListProps {
  gameRoomUserList: Array<I_gameRoomUserCard>;
}

const GameRoomUserList = ({ gameRoomUserList }: GameRoomUserListProps) => {
  return (
    <>
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[5rem] gap-y-[6rem]'>
        {gameRoomUserList.map((gameRoomUser) => (
          <GameRoomUserItem
            key={gameRoomUser.userName}
            {...gameRoomUser}
          />
        ))}
      </main>
    </>
  );
};

export default GameRoomUserList;
