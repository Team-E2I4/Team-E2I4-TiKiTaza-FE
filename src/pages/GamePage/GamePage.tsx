import { useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '@/common/Loading/Loading';
import { useAuthCheck } from '@/hooks/useAuth/useAuth';
import useGameWaitingRoomStore from '@/store/useGameWaitingRoomStore';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import { Toast } from '@/utils/toast';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import useWebsocket from './hooks/useWebsocket';
import IngameWebsocketLayer from './IngameWebsocketLayer';

const GamePage = () => {
  // TODO: 초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  const navigate = useNavigate();

  const { roomId, setRoomInfo, roomInfo } = useRoomInfoStore();
  const {
    publishGameRoom,
    // onIngameConnected,
    // publishIngame,
    // handleConnectIngame,
    stompClient,
    ingameSubscription,
  } = useWebsocket(roomId);

  const { gameRoomRes, isRoomWsError, didAdminStart, allMembers } =
    useGameWaitingRoomStore();

  //Todo => useSuspenseQuery로 변경...
  const { data, isError, isPending } = useAuthCheck();

  const userId = data?.data.data?.memberId;

  const isKicked = useMemo(
    () => gameRoomRes?.exitMemberId === userId,
    [gameRoomRes?.exitMemberId, userId]
  );

  useEffect(() => {
    const preventKeyboardRefresh = (event: KeyboardEvent) => {
      if (
        event.key === 'F5' ||
        (event.metaKey && event.key === 'r') ||
        (event.ctrlKey && event.key === 'r')
      ) {
        event.preventDefault();
      }
    };
    const preventMouseRefresh = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener('keydown', preventKeyboardRefresh);
    window.addEventListener('contextmenu', preventMouseRefresh);

    return () => {
      window.removeEventListener('keydown', preventKeyboardRefresh);
      window.removeEventListener('contextmenu', preventMouseRefresh);
    };
  }, []);

  useEffect(() => {
    if (isKicked) {
      navigate('/main', { replace: true });
      navigate(0);
    }
  }, [isKicked]);

  useEffect(() => {
    if (gameRoomRes?.roomInfo) {
      setRoomInfo(gameRoomRes.roomInfo);
    }

    if (gameRoomRes?.type === 'MODIFIED') {
      gameRoomRes.roomInfo?.hostId !== userId &&
        Toast.info('게임 설정이 변경되었습니다!');
    }
  }, [gameRoomRes]);

  if (!roomId || isRoomWsError) {
    navigate('/main', { replace: true });
    navigate(0);
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

  if (isPending || !allMembers || !roomInfo) {
    return <Loading />;
  }

  if (!userId) {
    return;
  }

  if (!didAdminStart) {
    return (
      <GameWaitingRoom
        allMembers={allMembers}
        roomInfo={roomInfo}
        publishGameRoom={publishGameRoom}
        userId={userId}
      />
    );
  }

  return (
    <IngameWebsocketLayer
      userId={userId}
      stompClient={stompClient}
      ingameSubscription={ingameSubscription}
    />
  );
};
export default GamePage;

/*
useWebsocket 분리..
처음 GamePage 들어오면 useWebsocket 연결하면서 게임대기룸 웹소켓 연결함
인게임 시작되면 인게임 웹소켓도 연결해야함. 교체아님 쌓여야함
인게임 종료되면 인게임 웹소켓 끊어야함!!! <- 쌓이지 않게
인게임 웹소켓을 분리하고 싶다..

구상1
usWebsocekt에서 ingameSubscription를 반환한다.
이걸로 인게임 unsubscribe 해야해서 ..
*/
