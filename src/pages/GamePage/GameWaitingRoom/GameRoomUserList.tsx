import { I_GameRoomUserCard } from '../types/gameInfoType';
import GameRoomUserItem from './GameRoomUserItem';

const GameRoomUserList = ({
  gameRoomUserList,
}: {
  gameRoomUserList: Array<I_GameRoomUserCard>;
}) => {
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
