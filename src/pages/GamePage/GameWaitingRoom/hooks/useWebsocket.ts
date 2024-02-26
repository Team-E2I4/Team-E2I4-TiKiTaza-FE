import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { guestLogin } from '@/apis/api';
import storageFactory from '@/utils/storageFactory';
import { I_GameRoomResponse } from '../../types/websocketType';
const { VITE_API_WS_END_POINT } = import.meta.env;

const useWebsocket = () => {
  const stompClient = useRef<Client>();
  const [gameRoomRes, setGameRoomRes] = useState({} as I_GameRoomResponse);

  const ROOM_ID_TEST = 14;

  useEffect(() => {
    const { getItem, setItem } = storageFactory(localStorage);

    const guestLoginFn = async () => {
      const { data } = await guestLogin();
      setItem('token', data.data?.accessToken);
      token = data.data?.accessToken;
    };
    let token = getItem('token', '');
    if (!token) {
      guestLoginFn();
    }
    const connectHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const client = new Client({
      webSocketFactory: () => new SockJS(VITE_API_WS_END_POINT),
      connectHeaders: connectHeaders,

      onConnect: () => {
        onConnected();
        handleEnterGameRoom(ROOM_ID_TEST);
      },
      onDisconnect: () => {
        onDisconnected(ROOM_ID_TEST);
      },
      onStompError: (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      },
    });

    const onConnected = () => {
      //TODO: roomId는 방입장 GET요청 응답값으로 사용
      client.subscribe(
        `/from/game-room/${ROOM_ID_TEST}`,
        (e) => onMessageReceived(e),
        connectHeaders
      );
      client.subscribe(
        `/from/game-room/${ROOM_ID_TEST}/error`,
        // eslint-disable-next-line no-console
        (e) => console.log('----subscribe error----', e),
        connectHeaders
      );
    };

    const onDisconnected = (roomId: number) => {
      client.publish({
        destination: `/to/game-room/${roomId}`,
        headers: connectHeaders,
      });
    };

    const onMessageReceived = ({ body }: { body: string }) => {
      const responsePublish = JSON.parse(body);
      // called when the client receives a STOMP message from the server
      setGameRoomRes(responsePublish);
    };

    const handleEnterGameRoom = (roomId: number) => {
      client.publish({
        destination: `/to/game-room/${roomId}/enter`,
        headers: connectHeaders,
      });
    };

    client.activate();
    stompClient.current = client;
    return () => {
      client.deactivate();
    };
  }, []);

  const { getItem, setItem } = storageFactory(localStorage);

  const guestLoginFn = async () => {
    const { data } = await guestLogin();
    setItem('token', data.data?.accessToken);
    token = data.data?.accessToken;
  };
  let token = getItem('token', '');
  if (!token) {
    guestLoginFn();
  }
  const connectHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const handleReadyGame = (roomId: number) => {
    if (!stompClient.current) {
      return;
    }
    stompClient.current.publish({
      destination: `/to/game-room/${roomId}/ready`,
      headers: connectHeaders,
    });
  };

  const handleStartGame = (roomId: number) => {
    if (!stompClient.current) {
      return;
    }
    stompClient.current.publish({
      destination: `/to/game-room/${roomId}/start`,
      headers: connectHeaders,
    });
  };

  return {
    gameRoomRes,
    handleReadyGame,
    handleStartGame,
  };
};

export default useWebsocket;
