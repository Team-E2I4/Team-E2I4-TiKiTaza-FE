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
}: {
  gameRoomInfo: I_GameRoomResponse;
}) => {
  const { roomInfo, allMembers } = gameRoomInfo;

  return (
    <div className='w-full flex flex-col justify-center items-center gap-[3rem] select-none'>
      <header className='flex gap-[5rem]'>
        <Backward />
        <GameRoomInfo
          roomInfo={roomInfo}
          allMembers={allMembers}
        />
      </header>
      <GameRoomUserList gameRoomUserList={allMembers} />
      <footer className='w-[114.8rem] flex gap-[5rem]'>
        <GameModeInfo>
          <GameRoomSetting />
        </GameModeInfo>
        <GameRoomLinkInvitation />
        <GameReadyAndStart />
      </footer>
    </div>
  );
};

export default GameWaitingRoom;
