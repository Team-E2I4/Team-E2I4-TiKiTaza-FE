import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaKaoLogin } from '@/hooks/useAuth';

const KaKaoLoginPage = () => {
  const navigate = useNavigate();

  const AUTHORIZATION_CODE: string = new URL(
    document.location.toString()
  ).searchParams.get('code') as string;

  const { mutate: mutateKaKaoLogin } = useKaKaoLogin({
    onSuccess: () => {
      alert('로그인 성공');
      navigate('/main');
    },
  });

  useEffect(() => {
    if (!AUTHORIZATION_CODE) {
      navigate('/login');
      return;
    }

    try {
      mutateKaKaoLogin(AUTHORIZATION_CODE);
    } catch (error) {
      //ToDo: Toast 에러 메시지 처리
      navigate('/login');
    }
  }, [AUTHORIZATION_CODE, mutateKaKaoLogin, navigate]);

  return (
    <div>
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};
export default KaKaoLoginPage;
