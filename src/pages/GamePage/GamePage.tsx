import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guestLogin } from '@/apis/api';
import { checkEmptyObj } from '@/utils/checkEmptyObj';
import storageFactory from '@/utils/storageFactory';
import { WS_END_POINT } from '@/ws/endpoint';
import { I_GameRoomResponse } from '@/ws/types/wsResType';
import GameCode from './GameCode/GameCode';
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import WsError from './GameWaitingRoom/WsError';
import GameWord from './GameWord/GameWord';

const GamePage = () => {
  const navigate = useNavigate();

  const [gameRoomRes, setGameRoomRes] = useState({} as I_GameRoomResponse);
  const ws = useRef<CompatClient | null>(null);

  useEffect(() => {
    const stompClient = Stomp.over(() => new SockJS(`${WS_END_POINT}`));

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
      Authorization: `Bearer ${token}`,
    };

    const ROOMID_TEST = 37; // 테스트용 RoomId ////////////////////////////////////

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
      setGameRoomRes(responsePublish);
    };

    stompClient.connect(connectHeaders, () => {
      onConnected();
    });

    ws.current = stompClient;
  }, []);

  const isSuccess = useMemo(() => !checkEmptyObj(gameRoomRes), [gameRoomRes]);
  const [selectedMode, isPlaying] = useMemo(
    () => [gameRoomRes.roomInfo?.gameMode, gameRoomRes.roomInfo?.isPlaying],
    [gameRoomRes.roomInfo]
  );
  const didBossStart = useMemo(
    () => gameRoomRes.type === 'START',
    [gameRoomRes]
  ); //모두 준비인상태에서 방장이 시작했다면 'START' type 이 옴 -> 참여자들 컴포넌트 전환 필요

  if (!isSuccess) {
    return <WsError />;
  }
  if (isPlaying) {
    navigate('/main');
  }
  return (
    <>
      {didBossStart ? (
        selectedMode === 'SENTENCE' ? (
          <GameSentence />
        ) : selectedMode === 'CODE' ? (
          <GameCode />
        ) : (
          <GameWord />
        )
      ) : (
        <GameWaitingRoom
          gameRoomRes={gameRoomRes}
          ws={ws.current}
        />
      )}
    </>
  );
};
export default GamePage;
