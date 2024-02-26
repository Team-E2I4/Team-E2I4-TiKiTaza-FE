import { I_GameRoomResponse } from '@/ws/types/wsResType';
import { GAME_TYPE } from '../constants';

const GameRoomInfo = ({ gameRoomRes }: { gameRoomRes: I_GameRoomResponse }) => {
  return (
    <div className='w-[105rem] h-[7.1rem] text-[2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
      <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
        No.{gameRoomRes.roomId}
      </div>
      <div className='flex justify-center items-center w-[35%] h-[70%] border-r border-solid border-black'>
        {gameRoomRes.roomInfo?.title}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        {gameRoomRes.roomInfo && GAME_TYPE.get(gameRoomRes.roomInfo?.gameMode)}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${gameRoomRes.allMembers?.length} / ${gameRoomRes.roomInfo?.maxPlayer}`}</div>
    </div>
  );
};

export default GameRoomInfo;
