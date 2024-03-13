import * as Avatar from '@radix-ui/react-avatar';

interface UserCardProps {
  nickname: string;
  userImage?: string;
  userImageFallbackDelay?: number;
  rank?: number;
  isGuest: boolean;
  gameCount: number;
  averageCpm: number;
  averageAccuracy: number;
}

const UserCard = ({
  //테스트용으로 기본값 추가해두었습니다.
  nickname,
  userImage = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  userImageFallbackDelay = 6000,
  rank,
  isGuest,
  gameCount = 0,
  averageCpm = 0,
  averageAccuracy = 0,
}: UserCardProps) => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full p-[1.2rem]'>
      <div className='flex justify-between'>
        <span className='truncate flex-1'>{nickname}</span>
        {!isGuest && (
          <button className='w-[6rem] h-[2.5rem] bg-red-100'>수정</button>
        )}
      </div>
      <div className='pb-[2.2rem] flex'>
        <Avatar.Root className='w-1/2 pt-[2.2rem]'>
          <Avatar.Image
            className='size-[9rem] rounded-full'
            src={userImage}
            alt='프로필 이미지'
          />
          <Avatar.Fallback delayMs={userImageFallbackDelay}>
            테스트
          </Avatar.Fallback>
        </Avatar.Root>

        {/* Todo: 각 정보 눌렀을때 랭크페이지 이동? */}
        <div className='flex flex-col-reverse  mx-[1.2rem] gap-[1rem] text-[1.4rem]'>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`${!isGuest ? `${rank}위` : '순위없음'}`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`플레이 ${gameCount}회`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`타수 ${averageCpm}타`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`정확도 ${averageAccuracy}%`}</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
