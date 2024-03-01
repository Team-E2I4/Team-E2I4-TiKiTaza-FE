import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Backward from '@/common/Backward/Backward';
import { useAuthCheck } from '@/hooks/useAuth';
import DisconnectModal from '../common/DisconnectModal';
import {
  HandlePubKickUserType,
  HandlePubReadyGameType,
  HandlePubStartGameType,
  I_GameRoomResponse,
} from '../types/websocketType';
import GameModeInfo from './GameModeInfo';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomLinkInvitation from './GameRoomLinkInvitation';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = ({
  gameRoomRes,
  handlePubReadyGame,
  handlePubStartGame,
  handlePubKickUser,
}: {
  gameRoomRes: I_GameRoomResponse;
  handlePubReadyGame: HandlePubReadyGameType;
  handlePubStartGame: HandlePubStartGameType;
  handlePubKickUser: HandlePubKickUserType;
}) => {
  const navigate = useNavigate();
  const { allMembers, roomInfo } = gameRoomRes;
  const [isAlert, setIsAlert] = useState(false);
  const { data, isError, isPending } = useAuthCheck();

  if (isPending) {
    // TODO: 로딩시 화면
    return <div>유저 정보 확인중 ..</div>;
  }

  if (isError) {
    alert('로그인이 필요한 페이지 입니다!');
    return (
      <Navigate
        to='/'
        replace={true}
      />
    );
  }
  let userId = 0;
  if (data.data.data) {
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
          navigate('/main', { replace: true });
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
            userId={userId}
            handlePubKickUser={handlePubKickUser}
          />
        )}
        <footer className='w-[114.8rem] flex gap-[5rem]'>
          <GameModeInfo>{isAdmin && <GameRoomSetting />}</GameModeInfo>
          <GameRoomLinkInvitation />
          <GameReadyAndStart
            isAdmin={isAdmin}
            allMembers={allMembers}
            handlePubReadyGame={handlePubReadyGame}
            handlePubStartGame={handlePubStartGame}
          />
        </footer>
      </div>
    </>
  );
};

export default GameWaitingRoom;
