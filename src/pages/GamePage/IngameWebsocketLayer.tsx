import useIngameStore from '@/store/useIngameStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import WsError from './common/WsError';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWord from './GameWord/GameWord';
import useIngameWebsocket from './hooks/useIngameWebsocket';

const IngameWebsocketLayer = ({ userId }: { userId: number }) => {
  const { roomId, roomInfo } = useRoomInfoStore();
  const { ingameRoomRes, isWsError } = useIngameStore();

  const { publishIngame } = useIngameWebsocket(roomId);

  if (isWsError || checkIsEmptyObj(ingameRoomRes)) {
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

  /* 
    점수까지 다 가공해서 스토어에
  
    GameContainer 로직가공.... => props로 전달 or 커스텀훅, GameXXX 렌더링
    <Input/> 컴포넌트 => form로직, 오타로직, 타수로직
    <GameXXX/> 컴포넌트 => 게임 로직
  */

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
