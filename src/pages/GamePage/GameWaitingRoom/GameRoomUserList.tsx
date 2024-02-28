import { I_AllMember } from '../types/websocketType';
import GameRoomUserItem from './GameRoomUserItem';

const GameRoomUserList = ({
  gameRoomUserList,
  hostId,
  userId,
}: {
  gameRoomUserList: I_AllMember[];
  hostId: number | undefined;
  userId: number;
}) => {
  return (
    <>
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[4rem] gap-y-[3rem]'>
        {gameRoomUserList &&
          gameRoomUserList.map((gameRoomUser) => (
            <GameRoomUserItem
              key={gameRoomUser.memberId}
              hostId={hostId}
              gameRoomUser={gameRoomUser}
              userId={userId}
            />
          ))}
      </main>
    </>
  );
};

export default GameRoomUserList;
