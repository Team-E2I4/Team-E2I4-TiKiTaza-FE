import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaKaoLogin } from '@/hooks/useAuth/useAuth';

const KaKaoLoginPage = () => {
  const navigate = useNavigate();

  const url = new URL(document.location.href);
  const AUTHORIZATION_CODE = url.searchParams.get('code');

  const { mutate: mutateKaKaoLogin, error } = useKaKaoLogin({
    onSuccess: () => {
      alert('로그인 성공');
      navigate('/nickname');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    if (!AUTHORIZATION_CODE) {
      navigate('/login');
      return;
    }

    mutateKaKaoLogin(AUTHORIZATION_CODE);
  }, [AUTHORIZATION_CODE, mutateKaKaoLogin, navigate]);

  return (
    <div>
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
      {error && <p>{error.message}</p>}
    </div>
  );
};
export default KaKaoLoginPage;
