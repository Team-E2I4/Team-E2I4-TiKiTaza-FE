import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backward from '@/common/Backward/Backward';
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
  // TODO :
  // main -> game 으로 enterGameRoom을 통해 넘어올 때
  // navigate 에 state로 memberId를 넣어주거나,
  // 본인 정보 조회 API를 통해 자기 자신의 id를 roomInfo의 hostId와 비교

  const navigate = useNavigate();
  const { allMembers, roomInfo } = gameRoomRes;
  const [isAlert, setIsAlert] = useState(false);

  // 임시 TEST
  const myUserId = 2;
  const isAdmin = myUserId === roomInfo?.hostId;

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
