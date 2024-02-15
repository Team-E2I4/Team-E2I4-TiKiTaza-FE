import * as Avatar from '@radix-ui/react-avatar';
import GameRoomHeader from './GameRoomHeader';

interface I_gameRoomUserList {
  userName: string;
  rank: number;
  userImage: string;
  userImageFallbackDelay: number;
}

interface GameRoomPageProps {
  gameRoomId: string;
  gameRoomName: string;
  gameMode: string;
  gameRoomMaximumHeadCount: number;
  gameRoomUserList: Array<I_gameRoomUserList>;
}

const GameRoomPage = (props: GameRoomPageProps) => {
  const {
    gameRoomUserList = [
      {
        userName: '신종욱',
        rank: 1,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱2',
        rank: 2,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱3',
        rank: 3,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱4',
        rank: 4,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱5',
        rank: 5,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱6',
        rank: 6,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱7',
        rank: 7,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱8',
        rank: 8,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
    ],
  } = props;
  return (
    <div className='w-full flex flex-col justify-center items-center gap-[6rem]'>
      <GameRoomHeader {...props} />
      <main className='flex-1 grid grid-rows-2 grid-cols-4 gap-x-[5rem] gap-y-[6rem]'>
        {gameRoomUserList.map((gameRoomUser) => (
          <div
            key={gameRoomUser.userName}
            className='w-[25.8rem] h-[21.2rem] flex flex-col bg-white shadow-md shadow-black/50 rounded-[2.5rem]'>
            <button className='self-end pt-[1.6rem] pr-[2.7rem] text-[1.6rem]'>
              ❌
            </button>
            <div className='px-[2rem] py-[1rem] flex gap-[2rem]'>
              <Avatar.Root className='w-1/2 self-center'>
                <Avatar.Image
                  className='size-[10rem] rounded-full'
                  src={gameRoomUser.userImage}
                  alt='프로필 이미지'
                />
                <Avatar.Fallback delayMs={gameRoomUser.userImageFallbackDelay}>
                  test
                </Avatar.Fallback>
              </Avatar.Root>
              <div className='w-1/2 flex flex-col items-center justify-around text-center'>
                <div className='w-[10rem] py-[0.4rem] flex items-center justify-center bg-green-70 rounded-[2.5rem] '>
                  {gameRoomUser.userName}
                </div>
                <div className='w-[10rem] py-[0.4rem] flex items-center justify-center bg-green-70 rounded-[2.5rem]'>
                  {gameRoomUser.rank}등
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <footer className='w-[114.8rem] flex gap-[5rem]'>
        <div className='w-[45.3rem] h-[20.9rem] flex bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]'>
          <p className='w-[60%] p-[3rem] overflow-y-scroll text-center text-[2rem]'>
            게임 모드 설명이 매우 길어 진다면 어떻게 될까요. 궁금해집니다. 한번
            알아볼까요? 한번 알아볼까요???
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
          </p>
          <div className='w-[40%] flex justify-center items-center'>
            <button className='w-[12rem] aspect-square text-white text-[3.2rem] bg-gray-300/90 hover:bg-gray-200 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
              변경
            </button>
          </div>
        </div>
        <button className='w-[36.1rem] h-[10rem] flex justify-center items-center text-[3.2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
          링크 초대
        </button>
        <button
          className={`w-[36.1rem] h-[10rem] flex justify-center items-center text-[3.2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
          {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
          시작
        </button>
      </footer>
    </div>
  );
};

export default GameRoomPage;
