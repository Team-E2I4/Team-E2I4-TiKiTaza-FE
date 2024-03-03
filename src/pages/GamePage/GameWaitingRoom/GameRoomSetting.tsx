import CreateRoomModal from '@/pages/MainPage/CreateRoom/CreateRoomModal';

const GameRoomSetting = () => {
  return (
    <div className='w-[20%] flex justify-center items-center'>
      <CreateRoomModal>
        <div className='w-[8rem] flex justify-center items-center aspect-square text-white text-[2rem] bg-gray-300/90 hover:bg-gray-200 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
          변경
        </div>
      </CreateRoomModal>
    </div>
  );
};

export default GameRoomSetting;
