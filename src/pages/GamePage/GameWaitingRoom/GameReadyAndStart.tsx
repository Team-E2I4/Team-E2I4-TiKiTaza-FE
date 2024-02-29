import {
  HandleReadyGameType,
  HandleStartGameType,
  I_AllMember,
} from '../types/websocketType';

interface GameReadyAndStartProps {
  isAdmin: boolean;
  allMembers: I_AllMember[] | undefined;
  handleReadyGame: HandleReadyGameType;
  handleStartGame: HandleStartGameType;
  myRoomId: number;
}

const GameReadyAndStart = ({
  isAdmin,
  allMembers,
  handleReadyGame,
  handleStartGame,
  // myRoomId,
}: GameReadyAndStartProps) => {
  //TODO : isAdmin에 따라 시작, 준비 버튼
  //TODO : allMembers의 readyStatus에 따라 방장이면 시작 버튼 활성화
  //TODO : allMembers의 readyStatus에 따라 일반 유저면 준비, 준비완료 버튼

  const isAllUserReady =
    allMembers?.every((user) => user.readyStatus === true) &&
    allMembers?.length !== 1;

  if (isAdmin) {
    return (
      <button
        onClick={() => {
          handleStartGame();
        }}
        className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]
        ${isAllUserReady ? `bg-coral-100` : `bg-coral-50 opacity-[0.5] cursor-not-allowed`}
        `}>
        {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
        시작
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        handleReadyGame();
      }}
      className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
      준비
    </button>
  );
};

export default GameReadyAndStart;
