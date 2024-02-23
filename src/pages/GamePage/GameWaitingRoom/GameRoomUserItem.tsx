import * as Avatar from '@radix-ui/react-avatar';
import close from '@/assets/close.png';
import { I_AllMember } from '@/ws/types/wsResType';

const GameRoomUserItem = ({ nickname }: I_AllMember) => {
  const rank = 3; // memberId로 회원조회!!
  return (
    <div className='w-[25.8rem] h-[21.2rem] flex flex-col bg-white shadow-md shadow-black/50 rounded-[2.5rem]'>
      <button className='self-end pt-[1.6rem] pr-[1.6rem] '>
        <img
          src={close}
          alt='강퇴'
          className='w-[3rem]'
        />
      </button>
      <div className='px-[2rem] py-[1rem] flex gap-[2rem]'>
        <Avatar.Root className='w-1/2 self-center'>
          <Avatar.Image
            className='size-[10rem] rounded-full'
            src={
              'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
            }
            alt='프로필 이미지'
          />
          {/*임시 이미지*/}
          <Avatar.Fallback delayMs={6000}>test</Avatar.Fallback>
        </Avatar.Root>
        <div className='w-1/2 flex flex-col items-center justify-around text-center'>
          <div className='w-[10rem] py-[0.4rem] bg-green-70 rounded-[2.5rem]'>
            {nickname}
          </div>
          <div className='w-[10rem] py-[0.4rem] bg-green-70 rounded-[2.5rem]'>
            {rank}등
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoomUserItem;
