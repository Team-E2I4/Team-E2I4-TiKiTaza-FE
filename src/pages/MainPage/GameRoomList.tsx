import GameRoomListItem from './GameRoonListItem';

const GAME_ROOM_LIST_CATRGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

const DUMMY_DATA = [
  {
    roomNumber: 23,
    title: '티기타자 한판 고다고',
    mode: 'short',
    headCount: 7,
  },
];

const GameRoomList = () => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      <ul className='flex flex-col items-center'>
        <li className='flex w-full'>
          {GAME_ROOM_LIST_CATRGORY.map((category, i) => (
            <>
              <span
                key={category}
                className={
                  category === '방 제목'
                    ? 'flex-[4_0_0] text-center'
                    : 'flex-1 text-center'
                }>
                {category}
              </span>
              {i !== category.length && <span>ㅣ</span>}
            </>
          ))}
        </li>
        {DUMMY_DATA.map(({ roomNumber, title, mode, headCount }) => (
          <GameRoomListItem
            key={roomNumber}
            roomNumber={roomNumber}
            title={title}
            mode={mode}
            headCount={headCount}
          />
        ))}
      </ul>
    </article>
  );
};

export default GameRoomList;