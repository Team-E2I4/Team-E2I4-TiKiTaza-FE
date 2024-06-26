import { LockClosedIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@/common/Divider/Divider';
import useEnterGameRoom from '@/hooks/useEnterGameRoom';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { I_ChangeGameRoomData } from './SseFetcher';

const MODE_TYPE = {
  WORD: '단어 게임',
  SENTENCE: '문장 게임',
  CODE: '코드 게임',
};

interface GameRoomListItemProps extends I_ChangeGameRoomData {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const GameRoomListItem = ({
  id,
  title,
  gameMode,
  maxPlayer,
  currentPlayer,
  isPrivate,
  isPlaying,
  setIsOpen,
}: GameRoomListItemProps) => {
  const { setRoomId } = useRoomInfoStore();

  const navigate = useNavigate();

  const { mutate: mutateEnterGameRoom } = useEnterGameRoom({
    onSuccess: () => {
      setRoomId(id);
      navigate('/game');
    },
  });

  return (
    <div className='filter drop-shadow-lg'>
      <li
        onClick={
          isPrivate
            ? () => setIsOpen(true)
            : () => mutateEnterGameRoom({ roomId: id })
        }
        className={`${isPlaying ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-myGradient hover:animate-gameRoomList'} 
        h-[5rem] flex items-center shrink-0 w-full py-[1rem] bg-gray-10 [clip-path:polygon(97%_0%,100%_50%,97%_100%,0%_100%,0%_0%)]`}>
        <span className='text-center truncate flex-1'>{`No.${id}`}</span>
        <Divider
          orientation='vertical'
          className='border-gray-200'
        />
        <div className='flex-[4_0_0] truncate flex justify-center items-center'>
          {isPrivate && <LockClosedIcon className='size-[2rem]' />}
          <span className='text-center truncate max-w-[60%] px-[1rem]'>
            {title}
          </span>
          <span
            className={`text-white font-semibold rounded-[0.5rem] px-[0.4rem] ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}>
            {isPlaying ? '게임 중' : '대기 중'}
          </span>
        </div>
        <Divider
          orientation='vertical'
          className='border-gray-200'
        />
        <span className='text-center truncate flex-1'>
          {MODE_TYPE[gameMode]}
        </span>
        <Divider
          orientation='vertical'
          className='border-gray-200'
        />
        <span className='text-center truncate flex-1'>{`${currentPlayer}/${maxPlayer}`}</span>
      </li>
    </div>
  );
};

export default GameRoomListItem;
