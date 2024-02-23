import { I_GameRoomResponse } from '@/ws/types/wsResType';

const GameRoomInfo = ({
  gameRoomInfo,
}: {
  gameRoomInfo: I_GameRoomResponse;
}) => {
  return (
    <div className='w-[105rem] h-[7.1rem] text-[2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
      <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
        {gameRoomInfo.roomId}
      </div>
      <div className='flex justify-center items-center w-[35%] h-[70%] border-r border-solid border-black'>
        {gameRoomInfo.roomInfo?.title}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        {gameRoomInfo.roomInfo?.mode}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${gameRoomInfo.allMembers?.length} / ${gameRoomInfo.roomInfo?.maxPlayer}`}</div>
    </div>
  );
};

export default GameRoomInfo;
