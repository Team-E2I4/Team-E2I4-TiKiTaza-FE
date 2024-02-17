import { I_gameRoomUserCard } from './GameRoomPage';
import GameRoomUserItem from './GameRoomUserItem';

interface GameRoomUserListProps {
  gameRoomUserList: Array<I_gameRoomUserCard>;
}

const GameRoomUserList = ({ gameRoomUserList }: GameRoomUserListProps) => {
  return (
    <>
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[4rem] gap-y-[3rem]'>
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
