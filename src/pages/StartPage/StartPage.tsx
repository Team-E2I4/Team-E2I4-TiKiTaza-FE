import { useNavigate } from 'react-router-dom';
import logo_big_shadow from '@/assets/logo/logo_big_shadow.png';
import { useGuestLogin } from '@/hooks/useAuth/useAuth';
import storageFactory from '@/utils/storageFactory';

const StartPage = () => {
  const navigate = useNavigate();

  const { removeItem } = storageFactory(localStorage);

  const { mutate: guestLoginMutate } = useGuestLogin({
    onSuccess: () => {
      alert('로그인 성공!');
      navigate('/main');
    },
  });

  const handleClick = () => {
    removeItem('MyToken');
    guestLoginMutate();
  };

  return (
    <main className='w-full h-full flex flex-col justify-center items-center gap-[2rem]'>
      <img
        alt='티키타자 로고'
        src={logo_big_shadow}
        className='object-cover h-[55rem]'
      />
      <button
        onClick={handleClick}
        className='w-[33.9rem] h-[8.8rem] font-[Giants-Inline] text-[3.2rem] shadow-md shadow-black/50 bg-green-100 hover:bg-green-200 transition-all rounded-full'>
        시작하기
      </button>
      <span className='font-bold font-[Giants-Inline] text-[3.2rem]'>
        당신의 손가락이 빠르고 정확한지 확인해보세요!
      </span>
    </main>
  );
};

export default StartPage;
