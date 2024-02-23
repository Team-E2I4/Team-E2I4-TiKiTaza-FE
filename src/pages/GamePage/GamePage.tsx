import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { I_GameRoomResponse } from '@/ws/types/wsResType';
// import useWebsocket from '@/ws/useWebsocket';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import GameWord from './GameWord/GameWord';
const { VITE_API_WS_END_POINT } = import.meta.env;
import { guestLogin } from '@/apis/api';
import storageFactory from '@/utils/storageFactory';

type GameModeType = 'waiting' | 'sentence' | 'code' | 'word' | 'finish';
const GamePage = () => {
  const [gameRoomInfo, setGameRoomInfo] = useState({} as I_GameRoomResponse);

  useEffect(() => {
    const stompClient = Stomp.over(
      () => new SockJS(`${VITE_API_WS_END_POINT}`)
    );

    // 테스트용 로그인 로직
    const { getItem, setItem } = storageFactory(localStorage);
    const guestLoginFn = async () => {
      const { data } = await guestLogin();
      setItem('token', data.data.accessToken);
      token = data.data.accessToken;
    };
    let token = getItem('token', '');
    if (!token) {
      guestLoginFn();
    }
    const connectHeaders = {
      Authorization: 'Bearer ' + token,
    };

    const ROOMID_TEST = 8; // 테스트용 RoomId ////////////////////////////////////

    const onConnected = () => {
      //TODO: roomId는 방입장 GET요청 응답값으로 사용
      stompClient.subscribe(
        `/from/game-room/${ROOMID_TEST}`,
        (e) => onMessageReceived(e),
        connectHeaders
      );
      stompClient.subscribe(
        `/from/game-room/${ROOMID_TEST}/error`,
        // eslint-disable-next-line no-console
        (e) => console.log('----subscribe error----', e),
        connectHeaders
      );
      stompClient.send(
        `/to/game-room/${ROOMID_TEST}/enter`,
        connectHeaders,
        '입장~'
      );
    };
    const onMessageReceived = ({ body }: { body: string }) => {
      const responsePublish = JSON.parse(body);
      // called when the client receives a STOMP message from the server
      // eslint-disable-next-line no-console
      console.log('onMessageReceived---', responsePublish);
      setGameRoomInfo(responsePublish);
    };

    stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
      onConnected();
    });
  }, []);

  // TODO:
  // 여기서 zustand 전역상태값(초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  // 방번호를 가지고 게임 상태에 대해 api 요청
  // const { initWebsocket } = useWebsocket();

  const [gameMode] = useState<GameModeType>('waiting'); //,,,

  switch (gameMode) {
    case 'waiting':
      return (
        'roomId' in gameRoomInfo && (
          <GameWaitingRoom gameRoomInfo={gameRoomInfo} />
        )
      );
    case 'sentence':
      return <GameSentence />;
    case 'code':
      return <GameCode />;
    case 'word':
      return <GameWord />;
    case 'finish':
      return <GameFinish />;
    default:
      return <GameWaitingRoom />;
  }
};
export default GamePage;
