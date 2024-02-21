import Backward from '@/common/Backward/Backward';
import { gameInfoDummy } from '../GameDummys';
import GameModeInfo from './GameModeInfo';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomLinkInvitation from './GameRoomLinkInvitation';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = () => {
  const { gameRoomUserList } = gameInfoDummy;
  return (
    <div className='w-full flex flex-col justify-center items-center gap-[3rem] select-none'>
      <header className='flex gap-[5rem]'>
        <Backward />
        <GameRoomInfo {...gameInfoDummy} />
      </header>
      <GameRoomUserList gameRoomUserList={gameRoomUserList} />
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
