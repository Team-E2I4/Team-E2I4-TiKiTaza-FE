import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { BASE_PATH } from '@/generated/base';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import storageFactory from '@/utils/storageFactory';
import { I_GameRoomResponse } from '../types/websocketType';

const useWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();
  const [gameRoomRes, setGameRoomRes] = useState({} as I_GameRoomResponse);
  const [isWsError, setIsWsError] = useState(false);
  const { getItem } = storageFactory(localStorage);

  const token = getItem('MyToken', '');
  const connectHeaders = {
    Authorization: `Bearer ${token}`,
  };

  if (!roomId) {
    setIsWsError(true);
  }

  useEffect(() => {
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
        setIsWsError(true);
      },
    });

    const onConnected = () => {
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
      setGameRoomRes(responsePublish);
      if (checkIsEmptyObj(responsePublish)) {
        setIsWsError(true);
      }
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

  const publishGameRoom = (destination: string) => {
    stompClient.current?.publish({
      destination: `/to/game-room${destination}`,
      headers: connectHeaders,
    });
  };
  const handlePubReadyGame = () => {
    publishGameRoom(`/${roomId}/ready`);
  };

  const handlePubStartGame = () => {
    publishGameRoom(`/${roomId}/start`);
  };

  const handlePubKickUser = (kickedId: number) => {
    publishGameRoom(`/${roomId}/kick/${kickedId}`);
  };

  return {
    gameRoomRes,
    handlePubReadyGame,
    handlePubStartGame,
    handlePubKickUser,
    isWsError,
  };
};

export default useWebsocket;
