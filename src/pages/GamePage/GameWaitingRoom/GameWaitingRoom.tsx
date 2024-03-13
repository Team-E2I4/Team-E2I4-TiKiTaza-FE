import { useState } from 'react';
import Backward from '@/common/Backward/Backward';
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
  userId,
}: {
  gameRoomRes: I_GameRoomResponse;
  handlePubReadyGame: HandlePubReadyGameType;
  handlePubStartGame: HandlePubStartGameType;
  handlePubKickUser: HandlePubKickUserType;
  userId: number;
}) => {
  const { allMembers, roomInfo } = gameRoomRes;
  const [isAlert, setIsAlert] = useState(false);

  const isAdmin = userId === roomInfo?.hostId;

  const handleClickBackward = () => {
    setIsAlert(true);
  };
  return (
    <>
      <DisconnectModal
        isOpen={isAlert}
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
          <GameModeInfo gameMode={roomInfo?.gameMode ?? 'SENTENCE'}>
            {isAdmin && <GameRoomSetting />}
          </GameModeInfo>
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
