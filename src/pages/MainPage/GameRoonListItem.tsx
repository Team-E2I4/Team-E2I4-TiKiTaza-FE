import locked from '@/asssets/locked.svg';
import Divider from '@/common/Divider/Divider';
export interface GameRoomListItemProps {
  roomNumber: number;
  title: string;
  isLocked: boolean;
  mode: 'word' | 'sentence' | 'code';
  headCount: number;
}

const MAX_ROOM_HEAD_COUNT = 8;

const MODE_TYPE = {
  word: '짧은 단어',
  sentence: '문장',
  code: '코드',
};

const GameRoomListItem = ({
  roomNumber,
  title,
  isLocked = false,
  mode,
  headCount,
}: GameRoomListItemProps) => {
  return (
    <li className='h-[5rem] flex items-center shrink-0 w-full py-[1rem] bg-gray-10 hover:bg-coral-50 cursor-pointer'>
      <span className='text-center truncate flex-1'>{`No.${roomNumber}`}</span>
      <span>ㅣ</span>
      <div className='flex-[4_0_0] truncate flex justify-center'>
        {isLocked && (
          <img
            src={locked}
            alt='비공개'
            className='px-[1rem]'
          />
        )}
        <span className='text-center truncate max-w-[60%]'>{title}</span>
      </div>
      <Divider orientation='vertical' />
      <span className='text-center truncate flex-1'>{MODE_TYPE[mode]}</span>
      <span>ㅣ</span>
      <span className='text-center truncate flex-1'>{`${headCount}/${MAX_ROOM_HEAD_COUNT}`}</span>
    </li>
  );
};

export default GameRoomListItem;
