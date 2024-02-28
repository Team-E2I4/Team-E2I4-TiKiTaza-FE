import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backward from '@/common/Backward/Backward';
import { useAuthCheck } from '@/hooks/useAuth';
import DisconnectModal from '../DisconnectModal';
import {
  HandleReadyGameType,
  I_GameRoomResponse,
} from '../types/websocketType';
import GameModeInfo from './GameModeInfo';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomLinkInvitation from './GameRoomLinkInvitation';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = ({
  roomId,
  gameRoomRes,
  handleReadyGame,
}: {
  roomId: number;
  gameRoomRes: I_GameRoomResponse;
  handleReadyGame: HandleReadyGameType;
}) => {
  const navigate = useNavigate();
  const { allMembers, roomInfo } = gameRoomRes;
  const [isAlert, setIsAlert] = useState(false);
  const { data, isLoading } = useAuthCheck();

  if (isLoading) {
    // TODO: 로딩시 화면
    return <div>유저 정보 확인중 ..</div>;
  }
  let userId = 0;
  if (data && data.data.data) {
    userId = data.data.data.memberId;
  }
  const isAdmin = userId === roomInfo?.hostId;

  const handleClickBackward = () => {
    setIsAlert(true);
  };
  return (
    <>
      <DisconnectModal
        isOpen={isAlert}
        handleClickAction={() => {
          navigate('/main');
          navigate(0);
        }}
        handleClickCancel={() => {
          setIsAlert(false);
        }}
      />
      <div className='w-full flex flex-col justify-center items-center gap-[3rem] select-none'>
        <header className='flex gap-[5rem]'>
          <Backward handleClickBackward={handleClickBackward} />
          <GameRoomInfo gameRoomRes={gameRoomRes} />
        </header>
        {allMembers && (
          <GameRoomUserList
            gameRoomUserList={allMembers}
            hostId={roomInfo?.hostId}
          />
        )}
        <footer className='w-[114.8rem] flex gap-[5rem]'>
          <GameModeInfo>{isAdmin && <GameRoomSetting />}</GameModeInfo>
          <GameRoomLinkInvitation />
          <GameReadyAndStart
            isAdmin={isAdmin}
            allMembers={allMembers}
            handleReadyGame={handleReadyGame}
            myRoomId={roomId}
          />
        </footer>
      </div>
    </>
  );
};

export default GameWaitingRoom;
