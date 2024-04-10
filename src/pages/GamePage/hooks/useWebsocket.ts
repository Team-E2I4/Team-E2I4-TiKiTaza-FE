import './init.ts';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { BASE_PATH } from '@/generated/base';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useIngameStore from '@/store/useIngameStore.ts';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { getToken } from '@/utils/getToken';

const useWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();
  const ingameSubscription = useRef<StompSubscription>();

  const connectHeaders = getToken();

  const { setGameRoomRes, setIsRoomWsError, setDidAdminStart, setAllMembers } =
    useGameWaitingRoomStore();
  const { setIngameRoomRes } = useIngameStore();

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

  return {
    publishGameRoom,
    stompClient,
    ingameSubscription,
  };
};

export default useWebsocket;
