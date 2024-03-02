import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { BASE_PATH } from '@/generated/base';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { I_IngameWsResponse } from '../types/websocketType';
import { useToken } from './useToken';

const useIngameWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();
  const [ingameRoomRes, setIngameRoomRes] = useState({} as I_IngameWsResponse);
  const [isWsError, setIsWsError] = useState(false);

  const { connectHeaders } = useToken();

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
          handleConnectGame(roomId);
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
    const handleConnectGame = (roomId: number) => {
      client.publish({
        destination: `/to/game/${roomId}/connect`,
        headers: connectHeaders,
      });
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

  const publishIngame = (destination: string, payload: object) => {
    stompClient.current?.publish({
      destination: `/to/game${destination}`,
      headers: connectHeaders,
      body: JSON.stringify(payload),
    });
  };

  ///to/game/{roomId}/info  ( 문장, 코드 )
  const handlePubInfo = (roomId: number, currentScore: number) => {
    publishIngame(`/${roomId}/info`, { currentScore: currentScore });
  };

  ///to/game/{roomId}/word-info  ( 단어 )
  const handlePubWordInfo = (roomId: number, word: string) => {
    publishIngame(`/${roomId}/word-info`, { word: word });
  };

  ///to/game/{roomId}/round-finish ( 본인 라운드 종료 발행 )
  const handlePubRoundFinish = (roomId: number, currentRound: number) => {
    publishIngame(`/${roomId}/round-finish`, { currentRound: currentRound });
  };

  return {
    ingameRoomRes,
    handlePubInfo,
    handlePubWordInfo,
    handlePubRoundFinish,
    publishIngame,
    isWsError,
  };
};

export default useIngameWebsocket;
