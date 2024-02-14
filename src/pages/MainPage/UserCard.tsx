import * as Avatar from '@radix-ui/react-avatar';

interface UserCardProps {
  userImage?: string;
  fallbackDelay?: number;
}

const UserCard = ({
  userImage = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  fallbackDelay = 6000,
}: UserCardProps) => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full p-[1.2rem]'>
      <div className='flex justify-between'>
        <span>닉네임</span>
        <button>(수정)</button>
      </div>
      <div className='py-[2.2rem] flex'>
        <Avatar.Root className='w-1/2'>
          <Avatar.Image
            className='size-[9rem] rounded-full'
            src={userImage}
            alt='프로필 이미지'
          />
          <Avatar.Fallback delayMs={fallbackDelay}>테스트</Avatar.Fallback>
        </Avatar.Root>
        <div className='flex flex-col-reverse w-1/2'>
          <span>무언가</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
