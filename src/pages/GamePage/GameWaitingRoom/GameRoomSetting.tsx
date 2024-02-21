import useGameModeStore from '@/stores/useGameModeStore';

const GameRoomSetting = () => {
  const moveCurrent = useGameModeStore((state) => state.mode); //현재 모드 상태값을 가져온다<!DOCTYPE html>
  const handleClickTest = useGameModeStore((state) => state.changeGameMode); // 모드 변경 함수를 불러오는 것!! 넘겨주는건 호출할 때!

  return (
    <div
      onClick={() => {
        handleClickTest('code');
      }}
      className='w-[20%] flex justify-center items-center'>
      <button className='w-[8rem] aspect-square text-white text-[2rem] bg-gray-300/90 hover:bg-gray-200 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
        변경 {moveCurrent}
      </button>
    </div>
  );
};

export default GameRoomSetting;
