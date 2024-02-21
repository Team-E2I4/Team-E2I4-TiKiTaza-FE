import { I_GameInfo } from '../types/gameInfoType';

const GameRoomInfo = ({
  gameRoomId,
  gameRoomName,
  gameMode,
  gameRoomMaximumHeadCount,
  gameRoomUserList,
}: I_GameInfo) => {
  return (
    <div className='w-[105rem] h-[7.1rem] text-[2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
      <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
        {gameRoomId}
      </div>
      <div className='flex justify-center items-center w-[35%] h-[70%] border-r border-solid border-black'>
        {gameRoomName}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        {gameMode}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${gameRoomUserList.length} / ${gameRoomMaximumHeadCount}`}</div>
    </div>
  );
};

export default GameRoomInfo;
