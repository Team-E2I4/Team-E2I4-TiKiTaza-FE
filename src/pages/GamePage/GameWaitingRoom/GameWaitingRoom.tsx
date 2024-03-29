import { useCallback, useEffect, useState } from 'react';
import Backward from '@/common/Backward/Backward';
import useCarImgStore from '@/store/useCarStore';
import DisconnectModal from '../common/DisconnectModal';
import { NumberIndexSignatureType } from '../types/ingameTypes';
import {
  HandlePubKickUserType,
  HandlePubReadyGameType,
  HandlePubStartGameType,
  I_AllMember,
  I_RoomInfo,
} from '../types/websocketType';
import GameModeDescription from './GameModeDescription';
import GameReadyAndStart from './GameReadyAndStart';
import GameRoomInfo from './GameRoomInfo';
import GameRoomSetting from './GameRoomSetting';
import GameRoomUserList from './GameRoomUserList';

const GameWaitingRoom = ({
  allMembers,
  roomInfo,
  handlePubReadyGame,
  handlePubStartGame,
  handlePubKickUser,
  userId,
}: {
  allMembers: I_AllMember[];
  roomInfo: I_RoomInfo;
  handlePubReadyGame: HandlePubReadyGameType;
  handlePubStartGame: HandlePubStartGameType;
  handlePubKickUser: HandlePubKickUserType;
  userId: number;
}) => {
  const [isAlert, setIsAlert] = useState(false);

  const isAdmin = userId === roomInfo?.hostId;
  const { setCarImgStore } = useCarImgStore();

  const handleClickBackward = useCallback(() => {
    setIsAlert(true);
  }, []);

  const handleClickCancel = useCallback(() => {
    setIsAlert(false);
  }, []);

  useEffect(() => {
    const carIdxArray: NumberIndexSignatureType = {};
    allMembers.forEach((car, idx) => {
      const { memberId } = car;
      carIdxArray[memberId] = idx;
    });
    setCarImgStore(carIdxArray);
  }, [allMembers]);

  return (
    <>
      <DisconnectModal
        isOpen={isAlert}
        handleClickCancel={handleClickCancel}
      />
      <div className='w-full flex flex-col justify-center items-center gap-[3rem] select-none'>
        <header className='flex gap-[5rem]'>
          <Backward handleClickBackward={handleClickBackward} />
          <GameRoomInfo
            allMembers={allMembers}
            roomInfo={roomInfo}
          />
        </header>
        {allMembers && (
          <GameRoomUserList
            gameRoomUserList={allMembers}
            hostId={roomInfo?.hostId}
            userId={userId}
            handlePubKickUser={handlePubKickUser}
          />
        )}
        <footer className='w-[114.8rem] h-[10rem] flex gap-[5rem]'>
          <GameModeDescription
            gameMode={roomInfo?.gameMode ?? 'SENTENCE'}
            isAdmin={isAdmin}>
            {isAdmin && <GameRoomSetting />}
          </GameModeDescription>
          {/* <GameRoomLinkInvitation /> */}
          <GameReadyAndStart
            isAdmin={isAdmin}
            userId={userId}
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
