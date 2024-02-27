import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { guestLogin } from '@/apis/api';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';
import { I_GameRoomResponse } from '../../types/websocketType';

type RoomIdType = number | null;

const useWebsocket = (roomId: RoomIdType) => {
  const stompClient = useRef<Client>();
  const [gameRoomRes, setGameRoomRes] = useState({} as I_GameRoomResponse);
  const [isWsError, setIsWsError] = useState(false);

  if (!roomId) {
    setIsWsError(true);
  }

  useEffect(() => {
    const { getItem, setItem } = storageFactory(localStorage);

    const guestLoginFn = async () => {
      const { data } = await guestLogin();
      setItem('MyToken', data.data?.accessToken);
      token = data.data?.accessToken;
    };
    let token = getItem('MyToken', '');
    if (!token) {
      guestLoginFn();
    }
    const connectHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const client = new Client({
      webSocketFactory: () => new SockJS(`${BASE_PATH}/ws`),
      connectHeaders: connectHeaders,

      onConnect: () => {
        if (roomId) {
          onConnected();
          handleEnterGameRoom(roomId);
        }
      },
      onDisconnect: () => {
        if (roomId) {
          onDisconnected(roomId);
        }
      },
      onStompError: (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      },
    });

    const onConnected = () => {
      //TODO: roomId는 방입장 GET요청 응답값으로 사용
      client.subscribe(
        `/from/game-room/${roomId}`,
        (e) => onMessageReceived(e),
        connectHeaders
      );
      client.subscribe(
        `/from/game-room/${roomId}/error`,
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
  }, []);

  const { getItem, setItem } = storageFactory(localStorage);

  const guestLoginFn = async () => {
    const { data } = await guestLogin();
    setItem('MyToken', data.data?.accessToken);
    token = data.data?.accessToken;
  };
  let token = getItem('MyToken', '');
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
    isWsError,
  };
};

export default useWebsocket;
