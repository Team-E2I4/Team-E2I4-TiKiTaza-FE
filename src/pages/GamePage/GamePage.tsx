import useGameModeStore from '@/stores/useGameModeStore';
import GameCode from './GameCode/GameCode';
import GameFinish from './GameFinish/GameFinish';
import GameSentence from './GameSentence/GameSentence';
import GameWaitingRoom from './GameWaitingRoom/GameWaitingRoom';
import GameWord from './GameWord/GameWord';

const GamePage = () => {
  const gameMode = useGameModeStore((state) => state.mode); //현재 모드 상태값을 가져온다
  // TODO:
  // 여기서 zustand 전역상태값(초대로 들어온 사람이라면 url의 해시값->정제->유효검사 후 상태값) 으로 방번호 추출
  // 방번호를 가지고 게임 상태에 대해 api 요청

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
