import { Client, StompSubscription } from '@stomp/stompjs';
import { MutableRefObject } from 'react';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useIngameStore from '@/store/useIngameStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import { getToken } from '@/utils/getToken';
import { PayloadType } from '../types/websocketType';

interface I_useIngame {
  roomId: number;
  stompClient: MutableRefObject<Client | undefined>;
  ingameSubscription: MutableRefObject<StompSubscription | undefined>;
}
const useIngameWebsocket = ({
  roomId,
  stompClient,
  ingameSubscription,
}: I_useIngame) => {
  const connectHeaders = getToken();
  const { setIsIngameWsError, setIngameRoomRes } = useIngameStore();
  const { setAllMembers } = useGameWaitingRoomStore();

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
    onIngameConnected,
    handleConnectIngame,
    publishIngame,
  };
};

export default useIngameWebsocket;
