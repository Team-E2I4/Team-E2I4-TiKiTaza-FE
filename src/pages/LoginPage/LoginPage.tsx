import google from '@/asssets/login/g-logo.png';
import kakao from '@/asssets/login/kakao_login.png';
import logo from '@/asssets/logo_big.png';

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center gap-[5rem]'>
      <img
        src={logo}
        className='object-cover h-[55rem]'
      />
      <div className='flex flex-col gap-[0.5rem]'>
        <div>
          <img
            src={kakao}
            className='w-[30rem]'
          />
        </div>
        <div className='flex items-center gap-[9rem] bg-white w-[30rem] h-[4.5rem] rounded-[0.6rem]'>
          <img
            src={google}
            alt='Google logo'
            className='w-[2rem] h-[2rem] ml-5'
          />
          <div className='text-[1.4rem]'>구글 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
