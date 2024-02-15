import backward from '@/assets/backward.png';

interface I_gameRoomUserList {
  userName: string;
  rank: number;
  userImage: string;
  userImageFallbackDelay: number;
}

interface GameRoomHeaderProps {
  gameRoomId: string;
  gameRoomName: string;
  gameMode: string;
  gameRoomMaximumHeadCount: number;
  gameRoomUserList: Array<I_gameRoomUserList>;
}

const GameRoomHeader = ({
  // DummyData for Test
  gameRoomId = 'no.23',
  gameRoomName = '티키타자 한판 고다고',
  gameMode = '문장',
  gameRoomMaximumHeadCount = 8,
  gameRoomUserList = [
    {
      userName: '신종욱',
      rank: 10,
      userImage:
        'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
      userImageFallbackDelay: 6000,
    },
    {
      userName: '신종욱2',
      rank: 9,
      userImage:
        'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
      userImageFallbackDelay: 6000,
    },
  ],
}: GameRoomHeaderProps) => {
  return (
    <>
      <header className='flex gap-[5rem]'>
        <button type='button'>
          <img
            src={backward}
            className='w-[4.8rem]'
            alt='뒤로가기'
          />
        </button>
        <div className='w-[105rem] h-[7.1rem] text-[3.2rem] flex bg-beige-100 rounded-[2.5rem] shadow-md shadow-black/50 items-center '>
          <div className='flex justify-center items-center w-[25%] h-[70%] border-r border-solid border-black'>
            {gameRoomId}
          </div>
          <div className='flex justify-center items-center w-[35%] h-[70%] border-r border-solid border-black'>
            {gameRoomName}
          </div>
          <div className='flex justify-center items-center w-[20%] h-[70%] border-r border-solid border-black'>
            {gameMode}
          </div>
          <div className='flex justify-center items-center w-[20%] h-[70%]'>{`${gameRoomUserList.length} / ${gameRoomMaximumHeadCount}`}</div>
        </div>
      </header>
    </>
  );
};

export default GameRoomHeader;