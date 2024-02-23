import { I_AllMember, I_RoomInfo } from '@/ws/types/wsResType';

interface GameRoomInfoProps {
  roomInfo: I_RoomInfo;
  allMembers: I_AllMember[];
}
const GameRoomInfo = ({ roomInfo, allMembers }: GameRoomInfoProps) => {
  return (
    <div className='w-[105rem] h-[7.1rem] text-[2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
      <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
        {roomInfo.id}
      </div>
      <div className='flex justify-center items-center w-[35%] h-[70%] border-r border-solid border-black'>
        {roomInfo.title}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
        {roomInfo.mode}
      </div>
      <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${allMembers.length} / ${roomInfo.maxPlayer}`}</div>
    </div>
  );
};

export default GameRoomInfo;
