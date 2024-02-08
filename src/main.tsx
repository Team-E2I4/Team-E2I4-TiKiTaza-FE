import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import GameCodePage from './pages/GameCodePage/GameCodePage.tsx';
import GameFinishPage from './pages/GameFinishPage/GameFinishPage.tsx';
import GameRoomPage from './pages/GameRoomPage/GameRoomPage.tsx';
import GameSentencePage from './pages/GameSentencePage/GameSentencPage.tsx';
import GameWordPage from './pages/GameWordPage/GameWordPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
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
        element: <StartPage />,
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
        element: <MainPage />,
      },
      {
        path: '/gameroom/:roomId',
        element: <GameRoomPage />,
      },
      {
        path: '/gameroom/:roomId',
        element: <GameCodePage />,
      },
      {
        path: '/gameroom/:roomId',
        element: <GameSentencePage />,
      },
      {
        path: '/gameroom/:roomId',
        element: <GameWordPage />,
      },
      {
        path: '/gameroom/:roomId',
        element: <GameFinishPage />,
      },
      {
        path: '/rank',
        element: <RankPage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
