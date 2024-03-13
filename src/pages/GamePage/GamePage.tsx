import { useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '@/common/Loading/Loading';
import { useAuthCheck } from '@/hooks/useAuth';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import WsError from './common/WsError';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import useWebsocket from './hooks/useWebsocket';
import IngameWebsocketLayer from './IngameWebsocketLayer';

const GamePage = () => {
  // TODO: 초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  const navigate = useNavigate();

  const { roomId, setRoomInfo, roomInfo } = useRoomInfoStore();

  const { handlePubReadyGame, handlePubStartGame, handlePubKickUser } =
    useWebsocket(roomId);

  const { gameRoomRes, isWsError } = useGameWaitingRoomStore();

  const isPlaying = useMemo(
    () => gameRoomRes?.roomInfo?.isPlaying,
    [gameRoomRes?.roomInfo]
  );

  const didAdminStart = useMemo(
    () => gameRoomRes?.type === 'START',
    [gameRoomRes?.type]
  );

  //Todo => useSuspenseQuery로 변경...
  const { data, isError, isPending } = useAuthCheck();

  const userId = data?.data.data?.memberId;

  const isKicked = useMemo(
    () => gameRoomRes?.exitMemberId === userId,
    [gameRoomRes?.exitMemberId, userId]
  );

  useEffect(() => {
    if (gameRoomRes?.roomInfo) {
      setRoomInfo(gameRoomRes.roomInfo);
    }

    if (isKicked || isPlaying) {
      navigate('/main', { replace: true });
      navigate(0);
    }
  }, [gameRoomRes, isKicked, isPlaying]);

  if (!roomId || isWsError) {
    return <WsError />;
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

  if (isPending || !gameRoomRes || !roomInfo) {
    return <Loading />;
  }

  if (!userId) {
    return;
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
  return <IngameWebsocketLayer userId={userId} />;
};
export default GamePage;
