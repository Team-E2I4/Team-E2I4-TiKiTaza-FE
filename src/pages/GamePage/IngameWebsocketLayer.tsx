import { useEffect } from 'react';
import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import RoundWaitModal from './common/RoundWaitModal';
import WsError from './common/WsError';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWord from './GameWord/GameWord';
import { PublishIngameType } from './types/websocketType';

interface IngameWebsocketLayerProps {
  userId: number;
  publishIngame: PublishIngameType;
  onIngameConnected: () => void;
  handleConnectIngame: (roomId: number) => void;
}
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
      <GameFinish
        allMembers={ingameRoomRes.allMembers}
        userId={userId}
      />
    );
  }

  return (
    <>
      <RoundWaitModal
        isOpen={isRoundWaiting}
        onTimeFinish={() => setIsRoundWaiting(false)}
      />
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
    </>
  );
};

export default IngameWebsocketLayer;
