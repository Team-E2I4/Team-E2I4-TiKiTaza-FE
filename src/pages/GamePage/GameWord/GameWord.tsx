import IngameHeader from '@/common/Ingame/IngameHeader';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import GameWordContainer from './GameWordContainer';

interface GameWordProps extends InagmeWsChildrenProps {
  userId: number;
}

const GameWord = ({ ingameRoomRes, publishIngame, userId }: GameWordProps) => {
  return (
    <>
      <IngameHeader />
      <div className='grow'>
        <div className='flex flex-col items-center justify-between h-[61rem]'>
          {!checkIsEmptyObj(ingameRoomRes) && (
            <GameWordContainer
              ingameRoomRes={ingameRoomRes}
              publishIngame={publishIngame}
              userId={userId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameWord;
