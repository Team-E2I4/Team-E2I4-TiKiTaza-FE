import './index.css';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AuthRoute from './common/AuthRoute/AuthRoute.tsx';
import Header from './common/Header/Header.tsx';
import BodyLayout from './common/Layout/BodyLayout.tsx';
import Layout from './common/Layout/Layout.tsx';
import GamePage from './pages/GamePage/GamePage.tsx';
import KaKaoLoginPage from './pages/KaKaoLoginPage/KaKaoLoginPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import DefaultErrorFallback from './pages/MainPage/DefaultErrorFallback.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import RankPage from './pages/RankPage/RankPage.tsx';
import SettingPage from './pages/SettingPage/SettingPage.tsx';
import StartPage from './pages/StartPage/StartPage.tsx';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        element: (
          <Layout>
            <Header />
            <BodyLayout>
              <ErrorBoundary fallback={<div>연유를 모르는 에러</div>}>
                <AuthRoute />
              </ErrorBoundary>
            </BodyLayout>
          </Layout>
        ),
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary
                FallbackComponent={({ error, resetErrorBoundary }) => (
                  <div>
                    게스트 로그인 에러 발생: {error.message}
                    <button onClick={resetErrorBoundary}>다시 시도</button>
                  </div>
                )}>
                <StartPage />
              </ErrorBoundary>
            ),
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/settings',
            element: <SettingPage />,
          },
          {
            path: '/main',
            element: (
              <ErrorBoundary fallbackRender={DefaultErrorFallback}>
                <Suspense>
                  <MainPage />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: '/game',
            element: <GamePage />,
          },
          {
            path: '/rank',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <RankPage />
              </Suspense>
            ),
          },
          {
            path: '/login/oauth2/code/kakao',
            element: <KaKaoLoginPage />,
          },

          {
            path: '/*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
