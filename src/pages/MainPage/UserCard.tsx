import * as Avatar from '@radix-ui/react-avatar';
import formatNumber from '../GamePage/GameSentence/utils/formatNumber';
import UpdateNicknameModal from '../NicknamePage/UpdateNickname/UpdateNicknameModal';

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
  userImage = 'https://cdn.pixabay.com/photo/2019/10/24/19/51/dino-4575130_1280.png',
  userImageFallbackDelay = 6000,
  rank,
  isGuest,
  gameCount = 0,
  averageCpm = 0,
  averageAccuracy = 0,
}: UserCardProps) => {
  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full p-[1.2rem] group relative'>
      {isGuest && (
        <div className='w-0 h-full z-[50] overflow-hidden p-[3rem] bg-green-100 invisible absolute top-0 left-0 transition-all group-hover:w-full  group-hover:visible group-hover:cursor-pointer'>
          <span className='text-[3rem] text-white font-bold whitespace-nowrap'>
            로그인
          </span>
          <span className='text-[2rem] whitespace-nowrap'>하여 기록하기!</span>
        </div>
      )}
      <div className='flex justify-between'>
        {!isGuest ? (
          <UpdateNicknameModal>
            <span className='bg-green-100 rounded-[0.5rem] truncate px-[1rem] hover:text-white hover:text-[1.8rem] transition-all h-[2.5rem] flex items-center justify-center cursor-pointer'>
              {nickname}
            </span>
          </UpdateNicknameModal>
        ) : (
          <span className='bg-green-100 rounded-[0.5rem] truncate px-[1rem] hover:text-white hover:text-[1.8rem] transition-all h-[2.5rem] flex items-center justify-center cursor-pointer'>
            {nickname}
          </span>
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
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`${isGuest || rank === -1 ? '순위 없음' : `${rank}위`}`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`플레이 ${formatNumber(gameCount)}회`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`평균 ${formatNumber(averageCpm)}타`}</span>
          <span className='bg-coral-50 w-[10rem] text-center rounded-[0.5rem] h-[2.2rem] hover:bg-coral-100'>{`완벽함 ${formatNumber(averageAccuracy)}%`}</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
