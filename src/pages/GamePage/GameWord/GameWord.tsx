import IngameHeader from '@/common/Ingame/IngameHeader';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import WordGameLayout from './WordGameLayout';

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
            <WordGameLayout
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
