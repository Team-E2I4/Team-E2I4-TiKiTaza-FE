import axios from 'axios';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';

const KaKaoLoginPage = () => {
  const { setItem } = storageFactory(localStorage);
  const AUTHORIZATION_CODE: string = new URL(
    document.location.toString()
  ).searchParams.get('code') as string;

  axios
    .post(`${BASE_PATH}/api/v1/auth/login/kakao?code=${AUTHORIZATION_CODE}`)
    .then((response) => {
      setItem('MyToken', response.data.accessToken);
    });
  return (
    <div>
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};
export default KaKaoLoginPage;
