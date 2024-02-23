import { I_AllMember } from '@/ws/types/wsResType';
import GameRoomUserItem from './GameRoomUserItem';

const GameRoomUserList = ({
  gameRoomUserList,
}: {
  gameRoomUserList: I_AllMember[];
}) => {
  return (
    <>
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[4rem] gap-y-[3rem]'>
        {gameRoomUserList &&
          gameRoomUserList.map((gameRoomUser) => (
            <GameRoomUserItem
              key={gameRoomUser.memberId}
              {...gameRoomUser}
            />
          ))}
      </main>
    </>
  );
};

export default GameRoomUserList;
