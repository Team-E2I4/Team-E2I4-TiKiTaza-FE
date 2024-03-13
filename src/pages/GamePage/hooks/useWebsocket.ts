import './init.ts';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { BASE_PATH } from '@/generated/base';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useIngameStore from '@/store/useIngameStore.ts';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { getToken } from '@/utils/getToken';
import { PayloadType } from '../types/websocketType.ts';

const useWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();

  const connectHeaders = getToken();

  const { setGameRoomRes, isWsError, setIsWsError } = useGameWaitingRoomStore();
  const { setIsIngameWsError, setIngameRoomRes } = useIngameStore();

  useEffect(() => {
    if (!roomId) {
      setIsWsError(true);
      return;
    }
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

  const onIngameWSConnected = () => {
    stompClient.current?.subscribe(
      `/from/game/${roomId}`,
      (e) => onIngameMessageReceived(e),
      connectHeaders
    );
  };
  const handleConnectGame = (roomId: number) => {
    stompClient.current?.publish({
      destination: `/to/game/${roomId}/connect`,
      headers: connectHeaders,
    });
  };
  const onIngameMessageReceived = ({ body }: { body: string }) => {
    const responsePublish = JSON.parse(body);
    // eslint-disable-next-line no-console
    console.log('ingameResponsePublish-----', responsePublish);
    setIngameRoomRes(responsePublish);
    if (checkIsEmptyObj(responsePublish)) {
      setIsIngameWsError(true);
    }
  };
  const publishIngame = (destination: string, payload: PayloadType) => {
    stompClient.current?.publish({
      destination: `/to/game/${roomId}${destination}`,
      headers: connectHeaders,
      body: JSON.stringify(payload),
    });
  };
  return {
    handlePubReadyGame,
    handlePubStartGame,
    handlePubKickUser,
    isWsError,
    onIngameWSConnected,
    handleConnectGame,
    publishIngame,
  };
};

export default useWebsocket;
