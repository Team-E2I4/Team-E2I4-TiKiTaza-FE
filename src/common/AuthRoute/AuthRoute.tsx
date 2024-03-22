import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuth/useAuth';
import storageFactory from '@/utils/storageFactory';

const authMap = new Map([
  ['/', 1],
  ['/login/oauth2/code/kakao', 1],
]);

const AuthRoute = () => {
  const { pathname } = useLocation();
  const { data: profileData, error, isPending } = useAuthCheck();

  const { getItem: sessionGetItem } = storageFactory(sessionStorage);
  const { getItem: localGetItem } = storageFactory(localStorage);

  //로컬스토리지에 토큰이 없을때
  if (!localGetItem('MyToken', '') && !sessionGetItem('MyToken', '')) {
    if (authMap.get(pathname)) {
      return <Outlet />;
    }
    return <Navigate to='/' />;
  }

  //로컬스토리지에 토큰이 존재할때
  if (isPending) {
    return <div>로딩중 입니다</div>;
  }

  if (profileData?.data?.data?.nickname === '' && pathname !== '/nickname') {
    // Todo: 토스트 메시지 추가
    return <Navigate to='/nickname' />;
  }

  //로그인 하지 않았을 때(400, 401, 404, 409일때 로그인 안했다고 처리함)
  if (error) {
    //로그인관련 페이지라면 그대로 보여준다
    if (authMap.get(pathname)) {
      return <Outlet />;
    }

    //로그인이 필요한 페이지라면 스타트 페이지로
    return <Navigate to='/' />;
  }

  //로그인 했을때, 로그인 관련 페이지는 접근 불가
  if (authMap.get(pathname)) {
    return <Navigate to='/main' />;
  }

  //로그인 했을때, 나머지 페이지는 접근 가능
  return <Outlet />;
};

export default AuthRoute;
