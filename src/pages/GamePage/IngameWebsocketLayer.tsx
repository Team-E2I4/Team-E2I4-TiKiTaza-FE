import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import WsError from './common/WsError';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWord from './GameWord/GameWord';
import { PublishIngameType } from './types/websocketType';

const IngameWebsocketLayer = ({
  userId,
  publishIngame,
}: {
  userId: number;
  publishIngame: PublishIngameType;
}) => {
  const { roomInfo } = useRoomInfoStore();
  const { ingameRoomRes, isIngameWsError } = useIngameStore();

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
