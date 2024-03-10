import IngameHeader from '@/common/Ingame/IngameHeader';
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
          <GameWordContainer
            ingameRoomRes={ingameRoomRes}
            publishIngame={publishIngame}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
};

export default GameWord;
