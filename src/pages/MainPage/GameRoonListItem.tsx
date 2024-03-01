import { LockClosedIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@/common/Divider/Divider';
import useEnterGameRoom from '@/hooks/useEnterGameRoom';
import { I_ChangeGameRoomData } from '@/hooks/useSSE';
import PrivateRoomModal from './PrivateRoomModal';

const MODE_TYPE = {
  WORD: '짧은 단어',
  SENTENCE: '문장',
  CODE: '코드',
};

const GameRoomListItem = ({
  id,
  title,
  gameMode,
  maxPlayer,
  currentPlayer,
  isPlaying,
  isPrivate,
}: I_ChangeGameRoomData) => {
  const { setRoomId } = useRoomInfoStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: mutateEnterGameRoom } = useEnterGameRoom({
    onSuccess: (e) => {
      if (!e.data.data) {
        throw new Error('roomId가 존재하지 않습니다');
      }
      setRoomId(e.data.data.roomId);
      navigate('/game');
    },
  });

  if (isPlaying) {
    return;
  }

  const handleEnterRoomMap = new Map([
    [true, () => setIsOpen(true)],
    [false, () => mutateEnterGameRoom({ roomId: id })],
  ]);

  return (
    <li
      onClick={() => {
        handleEnterRoomMap.get(isPrivate)?.();
      }}
      className='h-[5rem] flex items-center shrink-0 w-full py-[1rem] bg-gray-10 hover:bg-coral-50 cursor-pointer'>
      {isPrivate && (
        <PrivateRoomModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          roomId={id}
        />
      )}
      <span className='text-center truncate flex-1'>{`No.${id}`}</span>
      <Divider
        orientation='vertical'
        className='border-gray-200'
      />
      <div className='flex-[4_0_0] truncate flex justify-center'>
        {isPrivate && <LockClosedIcon className='size-[2rem]' />}
        <span className='text-center truncate max-w-[60%] px-[1rem]'>
          {title}
        </span>
      </div>
      <Divider
        orientation='vertical'
        className='border-gray-200'
      />
      <span className='text-center truncate flex-1'>{MODE_TYPE[gameMode]}</span>
      <Divider
        orientation='vertical'
        className='border-gray-200'
      />
      <span className='text-center truncate flex-1'>{`${currentPlayer}/${maxPlayer}`}</span>
    </li>
  );
};

export default GameRoomListItem;
