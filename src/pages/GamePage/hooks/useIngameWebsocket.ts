import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { BASE_PATH } from '@/generated/base';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import storageFactory from '@/utils/storageFactory';
import { I_IngameWsResponse } from '../types/websocketType';

const useIngameWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();
  const [ingameRoomRes, setIngameRoomRes] = useState({} as I_IngameWsResponse);
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
        }
      },
      onDisconnect: () => {},
      onStompError: (err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setIsWsError(true);
      },
    });

    const onConnected = () => {
      client.subscribe(
        `/from/game/${roomId}`,
        (e) => onMessageReceived(e),
        connectHeaders
      );
    };

    const onMessageReceived = ({ body }: { body: string }) => {
      const responsePublish = JSON.parse(body);
      setIngameRoomRes(responsePublish);
      if (checkIsEmptyObj(responsePublish)) {
        setIsWsError(true);
      }
    };

    client.activate();
    stompClient.current = client;
    return () => {
      client.deactivate();
    };
  }, []);

  ///to/game/{roomId}/word-info  ( 단어 )
  const handlePubInfo = (roomId: number, currentScore: number) => {
    stompClient.current &&
      stompClient.current.publish({
        destination: `/to/game/${roomId}/info`,
        headers: connectHeaders,
        body: JSON.stringify({ currentScore: currentScore }),
      });
  };

  ///to/game/{roomId}/info  ( 문장, 코드 )
  const handlePubWordInfo = (roomId: number, word: number) => {
    stompClient.current &&
      stompClient.current.publish({
        destination: `/to/game/${roomId}/info`,
        headers: connectHeaders,
        body: JSON.stringify({ currentScore: word }),
      });
  };

  ///to/game/{roomId}/round-finish
  const handlePubRoundFinish = (roomId: number, currentRound: number) => {
    stompClient.current &&
      stompClient.current.publish({
        destination: `/to/game/${roomId}/round-finish`,
        headers: connectHeaders,
        body: JSON.stringify({ currentRound: currentRound }),
      });
  };

  return {
    ingameRoomRes,
    handlePubInfo,
    handlePubWordInfo,
    handlePubRoundFinish,
    isWsError,
  };
};

export default useIngameWebsocket;
