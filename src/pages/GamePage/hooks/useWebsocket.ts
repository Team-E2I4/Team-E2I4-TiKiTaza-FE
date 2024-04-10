import './init.ts';
import { Client, StompSubscription } from '@stomp/stompjs';
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
  const ingameSubscription = useRef<StompSubscription>();

  const connectHeaders = getToken();

  const { setGameRoomRes, setIsRoomWsError, setDidAdminStart, setAllMembers } =
    useGameWaitingRoomStore();
  const { setIsIngameWsError, setIngameRoomRes } = useIngameStore();

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

      onStompError: (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setIsRoomWsError(true);
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

    const onMessageReceived = ({ body }: { body: string }) => {
      const responsePublish = JSON.parse(body);
      setGameRoomRes(responsePublish);
      if (checkIsEmptyObj(responsePublish)) {
        setIsRoomWsError(true);
      }

      if (responsePublish.type === 'START') {
        setDidAdminStart(true);
      }
      if (
        responsePublish.type === 'ENTER' ||
        responsePublish.type === 'READY' ||
        responsePublish.type === 'MODIFIED' ||
        responsePublish.type === 'EXIT'
      ) {
        setAllMembers(responsePublish.allMembers);
      }
      if (
        responsePublish.type === 'EXIT' &&
        responsePublish.roomInfo.isPlaying
      ) {
        setIngameRoomRes(responsePublish);
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
      destination: `/to/game-room/${roomId}${destination}`,
      headers: connectHeaders,
    });
  };

  const onIngameConnected = () => {
    ingameSubscription.current = stompClient.current?.subscribe(
      `/from/game/${roomId}`,
      (e) => onIngameMessageReceived(e),
      connectHeaders
    );
  };
  const disconnectIngameWs = () => {
    ingameSubscription.current?.unsubscribe();
  };

  const handleConnectIngame = (roomId: number) => {
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
    if (responsePublish.type === 'FINISH') {
      disconnectIngameWs();
      setAllMembers(responsePublish.allMembers);
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
    publishGameRoom,
    onIngameConnected,
    handleConnectIngame,
    publishIngame,
  };
};

export default useWebsocket;
