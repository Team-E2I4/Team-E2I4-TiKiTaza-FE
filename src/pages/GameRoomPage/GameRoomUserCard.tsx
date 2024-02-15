import * as Avatar from '@radix-ui/react-avatar';

interface GameRoomUserCardProps {
  userName: string;
  rank: number;
  userImage: string;
  userImageFallbackDelay: number;
}

const GameRoomUserCard = ({
  userName,
  rank,
  userImage,
  userImageFallbackDelay,
}: GameRoomUserCardProps) => {
  return (
    <div className='w-[25.8rem] h-[21.2rem] flex flex-col bg-white shadow-md shadow-black/50 rounded-[2.5rem]'>
      <button className='self-end pt-[1.6rem] pr-[2.7rem] text-[1.6rem]'>
        ❌
      </button>
      <div className='px-[2rem] py-[1rem] flex gap-[2rem]'>
        <Avatar.Root className='w-1/2 self-center'>
          <Avatar.Image
            className='size-[10rem] rounded-full'
            src={userImage}
            alt='프로필 이미지'
          />
          <Avatar.Fallback delayMs={userImageFallbackDelay}>
            test
          </Avatar.Fallback>
        </Avatar.Root>
        <div className='w-1/2 flex flex-col items-center justify-around text-center'>
          <div className='w-[10rem] py-[0.4rem] flex items-center justify-center bg-green-70 rounded-[2.5rem] '>
            {userName}
          </div>
          <div className='w-[10rem] py-[0.4rem] flex items-center justify-center bg-green-70 rounded-[2.5rem]'>
            {rank}등
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoomUserCard;
