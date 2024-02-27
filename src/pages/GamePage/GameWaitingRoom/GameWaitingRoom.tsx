import { CompatClient } from '@stomp/stompjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backward from '@/common/Backward/Backward';
import { I_GameRoomResponse } from '@/ws/types/wsResType';
import DisconnectModal from '../DisconnectModal';
import GameModeInfo from './GameModeInfo';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomLinkInvitation from './GameRoomLinkInvitation';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = ({
  gameRoomRes,
  ws,
}: {
  gameRoomRes: I_GameRoomResponse;
  ws: CompatClient;
}) => {
  const navigate = useNavigate();

  const { allMembers, roomInfo } = gameRoomRes;
  // 각각 optional 이라 undefined 일수 있다고 추론됨 ..

  const [isAlert, setIsAlert] = useState(false);
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
          <GameModeInfo>
            <GameRoomSetting />
          </GameModeInfo>
          <GameRoomLinkInvitation />
          <GameReadyAndStart ws={ws} />
        </footer>
      </div>
    </>
  );
};

export default GameWaitingRoom;
