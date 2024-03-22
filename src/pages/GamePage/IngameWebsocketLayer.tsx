import React, { Suspense, useEffect } from 'react';
import Spinner from '@/common/Spinner/Spinner';
import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import RoundWaitModal from './common/RoundWaitModal';
import WsError from './common/WsError';
import { PublishIngameType } from './types/websocketType';

interface IngameWebsocketLayerProps {
  userId: number;
  publishIngame: PublishIngameType;
  onIngameConnected: () => void;
  handleConnectIngame: (roomId: number) => void;
}

const GameCode = React.lazy(() => import('./GameCode/GameCode'));
const GameFinish = React.lazy(() => import('./GameFinish/GameFinish'));
const GameWord = React.lazy(() => import('./GameWord/GameWord'));
const GameSentence = React.lazy(() => import('./GameSentence/GameSentence'));

const IngameWebsocketLayer = ({
  userId,
  publishIngame,
  onIngameConnected,
  handleConnectIngame,
}: IngameWebsocketLayerProps) => {
  const { roomId, roomInfo } = useRoomInfoStore();
  const { ingameRoomRes, isIngameWsError, isRoundWaiting, setIsRoundWaiting } =
    useIngameStore();

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
      {roomInfo?.gameMode === 'SENTENCE' && (
        <Suspense fallback={<Spinner />}>
          <GameSentence
            publishIngame={publishIngame}
            userId={userId}
          />
        </Suspense>
      )}
      {roomInfo?.gameMode === 'CODE' && (
        <Suspense fallback={<Spinner />}>
          <GameCode
            publishIngame={publishIngame}
            userId={userId}
          />
        </Suspense>
      )}
      {roomInfo?.gameMode === 'WORD' && (
        <Suspense fallback={<Spinner />}>
          <GameWord
            publishIngame={publishIngame}
            userId={userId}
          />
        </Suspense>
      )}
    </>
  );
};

export default IngameWebsocketLayer;
