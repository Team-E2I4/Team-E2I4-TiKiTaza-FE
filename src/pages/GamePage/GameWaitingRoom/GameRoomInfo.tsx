import { GAME_TYPE } from '../constants';
import { I_AllMember, I_RoomInfo } from '../types/websocketType';

const GameRoomInfo = ({
  allMembers,
  roomInfo,
}: {
  allMembers: I_AllMember[];
  roomInfo: I_RoomInfo;
}) => {
  return (
    <div className='w-[105rem] h-[7.1rem] text-[2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        No.{roomInfo.id}
      </div>
      <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
        {roomInfo.title}
      </div>
      <div className='flex justify-center items-center w-[15%] h-[70%] border-r border-solid border-black'>
        {roomInfo && GAME_TYPE.get(roomInfo.gameMode)}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        {roomInfo && roomInfo.maxRound} 라운드
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${allMembers.length} 명 / ${roomInfo.maxPlayer} 명`}</div>
    </div>
  );
};

export default GameRoomInfo;
