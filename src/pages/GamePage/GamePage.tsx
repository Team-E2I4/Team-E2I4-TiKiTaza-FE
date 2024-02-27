import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmptyObj } from '@/utils/checkEmptyObj';
import GameCode from './GameCode/GameCode';
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import useWebsocket from './GameWaitingRoom/hooks/useWebsocket';
import WsError from './GameWaitingRoom/WsError';
import GameWord from './GameWord/GameWord';

const GamePage = () => {
  // TODO: zustand 전역상태값(초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출

  const { gameRoomRes, handleReadyGame } = useWebsocket();
  const navigate = useNavigate();

  const isConnectSuccess = useMemo(
    () => !checkEmptyObj(gameRoomRes),
    [gameRoomRes]
  );
  const [selectedMode, isPlaying] = useMemo(
    () => [gameRoomRes.roomInfo?.gameMode, gameRoomRes.roomInfo?.isPlaying],
    [gameRoomRes.roomInfo]
  );
  const didBossStart = useMemo(
    () => gameRoomRes.type === 'START',
    [gameRoomRes.type]
  ); //모두 준비인상태에서 방장이 시작했다면 'START' type 이 옴 -> 참여자들 컴포넌트 전환 필요

  if (!isConnectSuccess) {
    return <WsError />;
  }

  if (isPlaying) {
    navigate('/main');
  }
  return (
    <>
      {didBossStart ? (
        selectedMode === 'SENTENCE' ? (
          <GameSentence />
        ) : selectedMode === 'CODE' ? (
          <GameCode />
        ) : (
          <GameWord />
        )
      ) : (
        <GameWaitingRoom
          gameRoomRes={gameRoomRes}
          handleReadyGame={handleReadyGame}
        />
      )}
    </>
  );
};
export default GamePage;
