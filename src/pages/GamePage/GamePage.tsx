import { Fragment, useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '@/common/Loading/Loading';
import { useAuthCheck } from '@/hooks/useAuth';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { checkIsEmptyObj } from '@/utils/checkIsEmptyObj';
import WsError from './common/WsError';
// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import GameCode from './GameCode/GameCode';
// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import GameWord from './GameWord/GameWord';
import useWebsocket from './hooks/useWebsocket';
import { IngameWSErrorBoundary } from './IngameWSErrorBoundary';

const GamePage = () => {
  // TODO: 초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출

  const { roomId, setRoomInfo, roomInfo } = useRoomInfoStore();

  const {
    gameRoomRes,
    handlePubReadyGame,
    handlePubStartGame,
    handlePubKickUser,
    isWsError,
  } = useWebsocket(roomId);

  const navigate = useNavigate();

  const isPlaying = useMemo(
    () => gameRoomRes.roomInfo?.isPlaying,
    [gameRoomRes.roomInfo]
  );
  const didAdminStart = useMemo(
    () => gameRoomRes.type === 'START',
    [gameRoomRes.type]
  );

  const { data, isError, isPending } = useAuthCheck();

  let userId = 0;
  if (data && data.data.data) {
    userId = data.data.data.memberId;
  }

  const isKicked = useMemo(
    () => gameRoomRes?.exitMemberId === userId,
    [gameRoomRes?.exitMemberId, userId]
  );

  useEffect(() => {
    if (gameRoomRes.roomInfo) {
      setRoomInfo(gameRoomRes.roomInfo);
    }

    if (isKicked || isPlaying) {
      navigate('/main', { replace: true });
      navigate(0);
    }
  }, [data, gameRoomRes, isKicked, isPlaying, navigate, setRoomInfo, userId]);

  if (!roomId || isWsError) {
    return <WsError />;
  }
  if (isPending) {
    // TODO: 로딩시 화면
    return <div>유저 정보 확인중 ..</div>;
  }

  if (isError) {
    alert('로그인이 필요한 페이지 입니다!');
    return (
      <Navigate
        to='/'
        replace={true}
      />
    );
  }

  if (checkIsEmptyObj(gameRoomRes)) {
    return <Loading />;
  }

  if (!didAdminStart) {
    return (
      <GameWaitingRoom
        gameRoomRes={gameRoomRes}
        handlePubReadyGame={handlePubReadyGame}
        handlePubStartGame={handlePubStartGame}
        handlePubKickUser={handlePubKickUser}
        userId={userId}
      />
    );
  }
  if (!roomInfo) {
    return <Fragment>{/* 로딩화면 */}</Fragment>;
  }
  return (
    <>
      <IngameWSErrorBoundary>
        {({ ingameRoomRes, publishIngame }) => (
          <>
            {!checkIsEmptyObj(ingameRoomRes) &&
              (roomInfo.gameMode === 'SENTENCE' ? (
                <GameSentence
                  ingameRoomRes={ingameRoomRes}
                  publishIngame={publishIngame}
                  userId={userId}
                />
              ) : roomInfo.gameMode === 'CODE' ? (
                <GameCode
                  ingameRoomRes={ingameRoomRes}
                  publishIngame={publishIngame}
                  userId={userId}
                />
              ) : (
                <GameWord
                  ingameRoomRes={ingameRoomRes}
                  publishIngame={publishIngame}
                  userId={userId}
                />
              ))}
          </>
        )}
      </IngameWSErrorBoundary>
    </>
  );
};
export default GamePage;
