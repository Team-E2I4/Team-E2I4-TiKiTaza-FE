import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoomIdStore from '@/store/useRoomIdStore';
import WsError from './common/WsError';
// import GameCode from './GameCode/GameCode';
// import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import GameWord from './GameWord/GameWord';
import useWebsocket from './hooks/useWebsocket';
import { IngameWSErrorBoundary } from './IngameWSErrorBoundary';

const GamePage = () => {
  // TODO: 초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  const { roomId } = useRoomIdStore();

  const {
    gameRoomRes,
    handlePubReadyGame,
    handlePubStartGame,
    handlePubKickUser,
    isWsError,
  } = useWebsocket(roomId);
  const navigate = useNavigate();

  // 아래 TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMode, isPlaying] = useMemo(
    () => [gameRoomRes.roomInfo?.gameMode, gameRoomRes.roomInfo?.isPlaying],
    [gameRoomRes.roomInfo]
  );
  const didAdminStart = useMemo(
    () => gameRoomRes.type === 'START',
    [gameRoomRes.type]
  ); //모두 준비인상태에서 방장이 시작했다면 'START' type 이 옴 -> 참여자들 컴포넌트 전환 필요

  const isKicked = false;
  // TODO: userId useQuery로 가져오기
  // useMemo(
  //   () => gameRoomRes?.exitMemberId  === myId,
  //   [gameRoomRes?.exitMemberId]
  // );

  if (!roomId || isWsError) {
    return <WsError />;
  }
  if (isPlaying || isKicked) {
    navigate('/main', { replace: true });
  }

  if (!didAdminStart) {
    return (
      <GameWaitingRoom
        gameRoomRes={gameRoomRes}
        handlePubReadyGame={handlePubReadyGame}
        handlePubStartGame={handlePubStartGame}
        handlePubKickUser={handlePubKickUser}
      />
    );
  }

  return (
    <>
      <IngameWSErrorBoundary>
        {(ingameRoomRes) => (
          <>
            <GameWord ingameRoomRes={ingameRoomRes} />
            {/* // TODO : issue#92 roomInfo전체를 store에 가지면 그걸로 selectedMode 판단 */}

            {/* {selectedMode === 'SENTENCE' && (
              <GameSentence ingameRoomRes={ingameRoomRes} />
            )}
            {selectedMode === 'CODE' && (
              <GameCode ingameRoomRes={ingameRoomRes} />
            )}
            {selectedMode === 'WORD' && (
              <GameWord ingameRoomRes={ingameRoomRes} />
            )} */}
          </>
        )}
      </IngameWSErrorBoundary>
    </>
  );
};
export default GamePage;
