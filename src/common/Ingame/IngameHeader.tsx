import { gameInfoDummy } from '@/pages/GamePage/GameDummys';
import useGameModeStore from '@/stores/useGameModeStore';
import Backward from '../Backward/Backward';

const IngameHeader = () => {
  const { gameRoomName, gameRoomUserList, gameRoundTotal } = gameInfoDummy; // TODO : 캐싱쿼리값
  const gameRoundCurrent = 2; //TODO: 현재 라운드로 수정. zustand?
  const handleChandGameMode = useGameModeStore((state) => state.changeGameMode);

  return (
    <div className='flex flex-row items-center gap-20 pb-12'>
      <Backward handleClickBackward={() => handleChandGameMode('waiting')} />
      <div className='w-[40rem] truncate text-4xl'>{gameRoomName}</div>
      <div className='grow'>참여 {gameRoomUserList.length}명</div>
      <div>
        🏁 {gameRoundCurrent} / {gameRoundTotal}
      </div>
    </div>
  );
};
export default IngameHeader;
