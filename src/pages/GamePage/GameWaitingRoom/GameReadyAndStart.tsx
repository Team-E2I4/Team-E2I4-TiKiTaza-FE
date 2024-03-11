import {
  HandlePubReadyGameType,
  HandlePubStartGameType,
  I_AllMember,
} from '../types/websocketType';

interface GameReadyAndStartProps {
  isAdmin: boolean;
  allMembers: I_AllMember[] | undefined;
  handlePubReadyGame: HandlePubReadyGameType;
  handlePubStartGame: HandlePubStartGameType;
}

const GameReadyAndStart = ({
  isAdmin,
  allMembers,
  handlePubReadyGame,
  handlePubStartGame,
}: GameReadyAndStartProps) => {
  const isAllUserReady =
    allMembers?.every((user) => user.readyStatus === true) &&
    allMembers?.length !== 1;

  if (isAdmin) {
    return (
      <button
        onClick={() => {
          isAllUserReady && handlePubStartGame();
        }}
        className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]
        ${isAllUserReady ? `bg-coral-100` : `bg-coral-50 opacity-[0.5] cursor-not-allowed`}
        `}>
        시작
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        handlePubReadyGame();
      }}
      className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      준비
    </button>
  );
};

export default GameReadyAndStart;
