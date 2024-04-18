import { Client } from '@stomp/stompjs';
import React, { MutableRefObject, Suspense, useEffect } from 'react';
import Spinner from '@/common/Spinner/Spinner';
import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import RoundWaitModal from './common/RoundWaitModal';
import WsError from './common/WsError';
import useIngameWebsocket from './hooks/useIngameWebsocket';

interface IngameWebsocketLayerProps {
  userId: number;
  stompClient: MutableRefObject<Client | undefined>;
}

const GameCode = React.lazy(() => import('./GameCode/GameCode'));
const GameFinish = React.lazy(() => import('./GameFinish/GameFinish'));
const GameWord = React.lazy(() => import('./GameWord/GameWord'));
const GameSentence = React.lazy(() => import('./GameSentence/GameSentence'));

const IngameWebsocketLayer = ({
  userId,
  stompClient,
}: IngameWebsocketLayerProps) => {
  const { roomId, roomInfo } = useRoomInfoStore();
  const { ingameRoomRes, isIngameWsError, isRoundWaiting, setIsRoundWaiting } =
    useIngameStore();

  const { onIngameConnected, handleConnectIngame, publishIngame } =
    useIngameWebsocket({ roomId, stompClient });
  useEffect(() => {
    onIngameConnected(); // 인게임 엔드포인트 구독
    handleConnectIngame(roomId); // 해당 인게임 연결 발행
  }, []);

  useEffect(() => {
    if (
      ingameRoomRes.type === 'FIRST_ROUND_START' ||
      ingameRoomRes.type === 'NEXT_ROUND_START'
    ) {
      setIsRoundWaiting(true);
    }
  }, [ingameRoomRes]);

  if (isIngameWsError || checkIsEmptyObj(ingameRoomRes)) {
    return <WsError />;
  }

  if (ingameRoomRes.type === 'FINISH') {
    return (
      <Suspense fallback={<Spinner />}>
        <GameFinish
          allMembers={ingameRoomRes.allMembers}
          userId={userId}
        />
      </Suspense>
    );
  }

  return (
    <>
      <RoundWaitModal
        isOpen={isRoundWaiting}
        onTimeFinish={() => setIsRoundWaiting(false)}
      />
      <Suspense fallback={<Spinner />}>
        {roomInfo?.gameMode === 'SENTENCE' && (
          <GameSentence
            publishIngame={publishIngame}
            userId={userId}
          />
        )}
        {roomInfo?.gameMode === 'CODE' && (
          <GameCode
            publishIngame={publishIngame}
            userId={userId}
          />
        )}
        {roomInfo?.gameMode === 'WORD' && (
          <GameWord
            publishIngame={publishIngame}
            userId={userId}
          />
        )}
      </Suspense>
    </>
  );
};

export default IngameWebsocketLayer;
