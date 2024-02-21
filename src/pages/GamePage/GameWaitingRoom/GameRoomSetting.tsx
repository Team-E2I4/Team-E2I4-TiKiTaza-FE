import useGameModeStore from '@/stores/useGameModeStore';

const GameRoomSetting = () => {
  const handleChangeGameMode = useGameModeStore(
    (state) => state.changeGameMode
  );

  return (
    <div
      onClick={() => {
        handleChangeGameMode('word');
      }}
      className='w-[20%] flex justify-center items-center'>
      <button className='w-[8rem] aspect-square text-white text-[2rem] bg-gray-300/90 hover:bg-gray-200 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
        변경
      </button>
    </div>
  );
};

export default GameRoomSetting;
