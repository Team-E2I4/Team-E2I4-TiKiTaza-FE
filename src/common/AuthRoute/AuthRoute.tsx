import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth';

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { data, isSuccess, isLoading, error } = useAuthCheck();

  if (isLoading) {
    return;
  }

  if (error instanceof AxiosError) {
    if (error.response?.data.errorCode === 'sec-401/01') {
      if (pathname === '/login' || pathname === '/') {
        alert('로그인한 유저는 들어갈 수 없는 페이지 입니다');
        return <Navigate to={'/main'} />;
      }
      alert(error.response?.data.errorMessage);
    } else {
      if (data && isSuccess) {
        return children;
      }
    }
  }

  return <Navigate to={'/'} />;
};

export default AuthRoute;
