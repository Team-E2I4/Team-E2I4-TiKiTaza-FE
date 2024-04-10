import { I_AllMember, PublishGameRoomType } from '../types/websocketType';
import GameRoomUserItem from './GameRoomUserItem';

const GameRoomUserList = ({
  gameRoomUserList,
  hostId,
  userId,
  publishGameRoom,
}: {
  gameRoomUserList: I_AllMember[];
  hostId: number | undefined;
  userId: number;
  publishGameRoom: PublishGameRoomType;
}) => {
  return (
    <>
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[4rem] gap-y-[3rem]'>
        {gameRoomUserList &&
          gameRoomUserList.map((gameRoomUser, idx) => (
            <GameRoomUserItem
              key={gameRoomUser.memberId}
              idx={idx}
              hostId={hostId}
              gameRoomUser={gameRoomUser}
              userId={userId}
              publishGameRoom={publishGameRoom}
            />
          ))}
      </main>
    </>
  );
};

export default GameRoomUserList;
