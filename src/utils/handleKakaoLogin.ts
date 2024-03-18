import { KAKAO_AUTH_URL } from '@/pages/StartPage/OAuth';

export const handleKakaoLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};
