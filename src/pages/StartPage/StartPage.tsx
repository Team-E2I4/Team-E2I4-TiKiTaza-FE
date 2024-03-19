import { useNavigate } from 'react-router-dom';
import kakao from '@/assets/login/kakao-icon.svg';
import logo_big_shadow from '@/assets/logo/logo_big_shadow.png';
import { useGuestLogin } from '@/hooks/useAuth/useAuth';
import useVolumeStore from '@/store/useVolumeStore';
import storageFactory from '@/utils/storageFactory';
import { KAKAO_AUTH_URL } from './OAuth';

const StartPage = () => {
  const navigate = useNavigate();

  const { removeItem } = storageFactory(localStorage);

  const { setVolume } = useVolumeStore();

  const { mutate: guestLoginMutate } = useGuestLogin({
    onSuccess: () => {
      alert('로그인 성공!');
      navigate('/main');
      setVolume({ bgm: 'play', volumeSize: 30 });
    },
  });

  const handleGuestLogin = () => {
    removeItem('MyToken');
    guestLoginMutate();
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <main className='w-full h-full flex flex-col justify-center items-center gap-[2rem]'>
      <img
        alt='티키타자 로고'
        src={logo_big_shadow}
        className='object-cover h-[55rem]'
      />
      <div className='flex items-center gap-6'>
        <button
          onClick={handleGuestLogin}
          className='w-[28rem] h-[6rem] font-[Giants-Inline] text-[2.2rem] shadow-md shadow-black/50 bg-green-100 hover:bg-green-200 transition-all rounded-full'>
          게스트로 시작하기
        </button>
        <button onClick={handleKakaoLogin}>
          <img
            src={kakao}
            alt='Kakao logo'
            className='w-[6rem] h-[6rem]'
          />
        </button>
      </div>
      <span className='font-bold font-[Giants-Inline] text-[3rem]'>
        당신의 손가락이 빠르고 정확한지 확인해보세요!
      </span>
    </main>
  );
};

export default StartPage;
