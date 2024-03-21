import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaKaoLogin } from '@/hooks/useAuth/useAuth';
import { Toast } from '@/utils/toast';

const KaKaoLoginPage = () => {
  const navigate = useNavigate();

  const url = new URL(document.location.href);
  const AUTHORIZATION_CODE = url.searchParams.get('code');

  const { mutate: mutateKaKaoLogin, error } = useKaKaoLogin({
    onSuccess: () => {
      Toast.success('카카오 로그인 성공');
      navigate('/nickname');
    },
    onError: () => {
      Toast.success('카카오 로그인 실패');
    },
  });

  useEffect(() => {
    if (!AUTHORIZATION_CODE) {
      navigate('/login');
      return;
    }

    mutateKaKaoLogin(AUTHORIZATION_CODE);
  }, [AUTHORIZATION_CODE, mutateKaKaoLogin, navigate]);

  return <div>{error && <p>{error.message}</p>}</div>;
};
export default KaKaoLoginPage;
