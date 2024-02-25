import { CompatClient } from '@stomp/stompjs';
import Backward from '@/common/Backward/Backward';
import { I_GameRoomResponse } from '@/ws/types/wsResType';
import GameModeInfo from './GameModeInfo';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomLinkInvitation from './GameRoomLinkInvitation';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = ({
  gameRoomInfo,
  ws,
}: {
  gameRoomInfo: I_GameRoomResponse;
  ws: CompatClient;
}) => {
  const { allMembers } = gameRoomInfo;
  return (
    <div className='w-full flex flex-col justify-center items-center gap-[3rem] select-none'>
      <header className='flex gap-[5rem]'>
        <Backward />
        <GameRoomInfo gameRoomInfo={gameRoomInfo} />
      </header>
      {allMembers && <GameRoomUserList gameRoomUserList={allMembers} />}
      <footer className='w-[114.8rem] flex gap-[5rem]'>
        <GameModeInfo>
          <GameRoomSetting />
        </GameModeInfo>
        <GameRoomLinkInvitation />
        <GameReadyAndStart ws={ws} />
      </footer>
    </div>
  );
};

export default GameWaitingRoom;
