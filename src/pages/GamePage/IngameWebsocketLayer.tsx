import { useEffect } from 'react';
import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
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
  const { ingameRoomRes, isIngameWsError } = useIngameStore();

  useEffect(() => {
    onIngameConnected(); // 인게임 엔드포인트 구독
    handleConnectIngame(roomId); // 해당 인게임 연결 발행
  }, []);

  if (isIngameWsError || checkIsEmptyObj(ingameRoomRes)) {
    return <WsError />;
  }

  const rankData = ingameRoomRes.allMembers
    .map(({ nickname, score }) => ({
      nickname,
      score,
    }))
    .sort(({ score: prevScore }, { score: nextScore }) => nextScore - prevScore)
    .map((el, i) => ({ ...el, ranking: i + 1 }));

  if (ingameRoomRes.type === 'FINISH') {
    return <GameFinish rankData={rankData} />;
  }

  return (
    <>
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