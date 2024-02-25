import * as Avatar from '@radix-ui/react-avatar';
import close from '@/assets/close.png';
import { I_AllMember } from '@/ws/types/wsResType';

const GameRoomUserItem = ({ nickname, readyStatus }: I_AllMember) => {
  const rank = 3; // memberId로 회원조회!!
  return (
    <div className='w-[25.8rem] h-[21.2rem] p-[1.6rem] pb-[4rem] relative flex flex-col bg-white shadow-md shadow-black/50 rounded-[2.5rem]'>
      <button className='self-end'>
        <img
          src={close}
          alt='강퇴'
          className='w-[3rem]'
        />
      </button>
      <div className='flex grow gap-[2rem]'>
        <Avatar.Root className='w-1/2 self-center'>
          <Avatar.Image
            className='size-[10rem] rounded-full'
            src={
              'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80?&w=128&h=128&dpr=2&q=80'
            }
            alt='프로필 이미지'
          />
          {/*임시 이미지*/}
          <Avatar.Fallback delayMs={6000}>test</Avatar.Fallback>
        </Avatar.Root>
        <div className='w-1/2 flex flex-col justify-evenly text-center'>
          <div className='w-[10rem] py-[0.4rem] bg-green-70 rounded-[1rem]'>
            {nickname}
          </div>
          <div className='w-[5rem] py-[0.4rem] bg-green-70 rounded-[1rem] text-[1.4rem]'>
            {rank}등
          </div>
        </div>
      </div>
      <div
        className={`absolute w-[13rem] h-[4rem] rounded-[2rem_0_2.5rem] right-0 bottom-0 text-center leading-[4rem] font-[Giants-Inline] ${readyStatus && 'bg-green-100'}`}>
        {readyStatus && '준비'}
      </div>
    </div>
  );
};

export default GameRoomUserItem;
