import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth';

const AuthRoute = () => {
  const { pathname } = useLocation();
  const { data, isSuccess, isLoading } = useAuthCheck();
  if (isLoading) {
    return <div>로딩중~</div>;
  }
  if (!data && !isSuccess) {
    if (pathname === '/login' || pathname === '/') {
      return <Outlet />;
    } else {
      alert('로그인이 필요한 페이지 입니다');
      return <Navigate to='/' />;
    }
  }

  return <Outlet />;
};

export default AuthRoute;
