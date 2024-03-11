import * as Avatar from '@radix-ui/react-avatar';

interface UserCardProps {
  userImage?: string;
  userImageFallbackDelay?: number;
  rank?: number;
}

const UserCard = ({
  //테스트용으로 기본값 추가해두었습니다.
  userImage = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  userImageFallbackDelay = 6000,
  rank = 0,
}: UserCardProps) => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full p-[1.2rem]'>
      <div className='flex justify-between'>
        <span className='truncate flex-1'>
          닉네임이겁나길수도있습니다이렇게
        </span>
        <button>(수정)</button>
      </div>
      <div className='py-[2.2rem] flex'>
        <Avatar.Root className='w-1/2'>
          <Avatar.Image
            className='size-[9rem] rounded-full'
            src={userImage}
            alt='프로필 이미지'
          />
          <Avatar.Fallback delayMs={userImageFallbackDelay}>
            테스트
          </Avatar.Fallback>
        </Avatar.Root>
        <div className='flex flex-col-reverse  mx-[1.2rem]'>
          <span className='bg-coral-50 w-[6.8rem] text-center'>{`${rank ? `${rank}위` : '순위없음'}`}</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
