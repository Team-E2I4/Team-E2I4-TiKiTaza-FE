import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { BASE_PATH } from '@/generated/base';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { getToken } from '@/utils/getToken';
import { I_IngameWsResponse } from '../types/websocketType';
import { PayloadType } from '../types/websocketType';

const useIngameWebsocket = (roomId: number | null) => {
  const stompClient = useRef<Client>();
  const [ingameRoomRes, setIngameRoomRes] = useState({} as I_IngameWsResponse);
  const [isWsError, setIsWsError] = useState(false);

  const connectHeaders = getToken();

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
      // eslint-disable-next-line no-console
      console.log('responsePublish-----', responsePublish);
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

  const publishIngame = (destination: string, payload: PayloadType) => {
    stompClient.current?.publish({
      destination: `/to/game/${roomId}${destination}`,
      headers: connectHeaders,
      body: JSON.stringify(payload),
    });
  };

  return {
    ingameRoomRes,
    publishIngame,
    isWsError,
  };
};

export default useIngameWebsocket;
