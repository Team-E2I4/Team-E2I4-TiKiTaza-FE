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

  const {
    setGameRoomRes,
    isWsError,
    setIsWsError,
    setDidAdminStart,
    setAllMembers,
  } = useGameWaitingRoomStore();
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

    const onMessageReceived = ({ body }: { body: string }) => {
      const responsePublish = JSON.parse(body);
      if (responsePublish.type === 'EXIT') {
        if (responsePublish.roomInfo.isPlaying) {
          setIngameRoomRes(responsePublish.exitMemberId);
        } else {
          setAllMembers(responsePublish.allMembers);
        }
      }
      setGameRoomRes(responsePublish);
      if (checkIsEmptyObj(responsePublish)) {
        setIsWsError(true);
      }

      if (responsePublish.type === 'START') {
        setDidAdminStart(true);
      }
      if (
        responsePublish.type === 'ENTER' ||
        responsePublish.type === 'READY' ||
        responsePublish.type === 'MODIFIED'
      ) {
        setAllMembers(responsePublish.allMembers);
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

  const onIngameConnected = () => {
    stompClient.current?.subscribe(
      `/from/game/${roomId}`,
      (e) => onIngameMessageReceived(e),
      connectHeaders
    );
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
    handlePubReadyGame,
    handlePubStartGame,
    handlePubKickUser,
    isWsError,
    onIngameConnected,
    handleConnectIngame,
    publishIngame,
  };
};

export default useWebsocket;
