import Divider from '@/common/Divider/Divider';
import GameRoomListItem from './GameRoonListItem';

const GAME_ROOM_LIST_CATRGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

const DUMMY_DATA = [
  {
    roomNumber: 23,
    title: '티기타자 한판 고다고',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 56,
    title: '제목이 이렇게 길어지면 어쩌려고 그러시는지 솰라솰라',
    mode: 'short',
    headCount: 3,
  },
  {
    roomNumber: 77,
    title:
      'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 23,
    title: '티기타자 한판 고다고',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 56,
    title: '제목이 이렇게 길어지면 어쩌려고 그러시는지 솰라솰라',
    mode: 'short',
    headCount: 3,
  },
  {
    roomNumber: 77,
    title:
      'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 23,
    title: '티기타자 한판 고다고',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 56,
    title: '제목이 이렇게 길어지면 어쩌려고 그러시는지 솰라솰라',
    mode: 'short',
    headCount: 3,
  },
  {
    roomNumber: 77,
    title:
      'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 23,
    title: '티기타자 한판 고다고',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 56,
    title: '제목이 이렇게 길어지면 어쩌려고 그러시는지 솰라솰라',
    mode: 'short',
    headCount: 3,
  },
  {
    roomNumber: 77,
    title:
      'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    mode: 'short',
    headCount: 7,
  },
  {
    roomNumber: 77,
    title:
      'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    mode: 'short',
    headCount: 7,
  },
];

const GameRoomList = () => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      <ul className='flex flex-col items-center p-[1.5rem] gap-[1rem]'>
        <li className='flex w-full'>
          {GAME_ROOM_LIST_CATRGORY.map((category, i) => (
            <>
              <span
                key={category}
                className={`text-center ${category === '방 제목' ? 'flex-[4_0_0]' : 'flex-1'}`}>
                {category}
              </span>
              {i !== category.length && <span>ㅣ</span>}
            </>
          ))}
        </li>
        <Divider />
        <div className='w-full flex flex-col gap-[1rem] max-h-[60rem] overflow-y-auto scrollbar-hide'>
          {DUMMY_DATA.map(({ roomNumber, title, mode, headCount }) => (
            <GameRoomListItem
              key={roomNumber}
              roomNumber={roomNumber}
              title={title}
              mode={mode}
              headCount={headCount}
            />
          ))}
        </div>
      </ul>
    </article>
  );
};

export default GameRoomList;
