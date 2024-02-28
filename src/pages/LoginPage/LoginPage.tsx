import axios from 'axios';
import google from '@/assets/login/g-logo.png';
import kakao from '@/assets/login/k-logo.png';
import logo from '@/assets/logo_big.png';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';
import { KAKAO_AUTH_URL } from './OAuth';

const LoginPage = () => {
  const { setItem } = storageFactory(localStorage);

  const AUTHORIZATION_CODE: string = new URL(
    document.location.toString()
  ).searchParams.get('code') as string;

  axios
    .get(`${BASE_PATH}/api/v1/auth/login/kakao?code=${AUTHORIZATION_CODE}`)
    .then((response) => {
      setItem('MyToken', response.data.accessToken);
    });

  return (
    <div className='flex flex-col items-center gap-[5rem]'>
      <img
        src={logo}
        className='object-cover h-[55rem]'
      />
      <div className='flex flex-col gap-[0.5rem]'>
        <a href={KAKAO_AUTH_URL}>
          <div className='flex items-center gap-[8rem] bg-[#FEE500] w-[30rem] h-[4.5rem] rounded-[0.6rem]'>
            <img
              src={kakao}
              alt='Kakao logo'
              className='w-[2rem] h-[2rem] ml-5'
            />
            <span className='text-[1.4rem]'>카카오 로그인</span>
          </div>
        </a>
        <div className='flex items-center gap-[9rem] bg-[#ffff] w-[30rem] h-[4.5rem] rounded-[0.6rem]'>
          <img
            src={google}
            alt='Google logo'
            className='w-[2rem] h-[2rem] ml-5'
          />
          <span className='text-[1.4rem]'>구글 로그인</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
