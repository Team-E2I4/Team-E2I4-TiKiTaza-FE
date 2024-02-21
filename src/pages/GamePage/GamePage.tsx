import { useState } from 'react';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import GameWord from './GameWord/GameWord';

type GameModeType = 'waiting' | 'sentence' | 'code' | 'word' | 'finish';
const GamePage = () => {
  // TODO:
  // 여기서 zustand 전역상태값(초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  // 방번호를 가지고 게임 상태에 대해 api 요청
  const [gameMode] = useState<GameModeType>('waiting');

  switch (gameMode) {
    case 'waiting':
      return <GameWaitingRoom />;
    case 'sentence':
      return <GameSentence />;
    case 'code':
      return <GameCode />;
    case 'word':
      return <GameWord />;
    case 'finish':
      return <GameFinish />;
    default:
      return <GameWaitingRoom />;
  }
};
export default GamePage;
