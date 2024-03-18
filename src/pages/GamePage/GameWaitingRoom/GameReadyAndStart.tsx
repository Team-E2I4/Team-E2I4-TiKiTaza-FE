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
        className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] transition-all duration-300 shadow-md shadow-black/50 relative
overflow-hidden
bg-coral-50
        ${isAllUserReady ? ` hover:bg-coral-100` : `opacity-[0.5] cursor-not-allowed`}
        `}>
        {isAllUserReady && (
          <>
            <span className='absolute block top-0 left-0 w-full h-[0.3rem] bg-gradient-to-l from-coral-100 animate-neonTop'></span>
            <span className='absolute block top-[-100%] right-0 w-[0.3rem] h-full bg-gradient-to-t from-coral-100 animate-neonRight'></span>
            <span className='absolute block bottom-0 right-0 w-full h-[0.3rem] bg-gradient-to-r from-coral-100 animate-neonBottom'></span>
            <span className='absolute block bottom-[-100%] left-0 w-[0.3rem] h-full bg-gradient-to-b from-coral-100 animate-neonLeft'></span>
          </>
        )}
        시작
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        handlePubReadyGame();
      }}
      className={`group w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50
        relative overflow-hidden
        shadow-md shadow-black/50 z-[0] 
        `}>
      <span
        className='absolute box-border transition-all ease-in-out duration-500 z-[-1] w-0 h-0 border-0 border-solid rotate-[360deg] 
            bottom-0 left-0 border-t-transparent border-r-transparent border-b-transparent border-l-coral-100 group-hover:border-y-[10rem] group-hover:border-x-[calc(25.3rem*1.05)]'></span>
      <span
        className='absolute box-border transition-all ease-in-out duration-500 z-[-1] w-0 h-0 border-0 border-solid rotate-[360deg] 
      top-0 right-0 border-t-transparent border-r-coral-100 border-b-transparent border-l-transparent group-hover:border-y-[10rem] group-hover:border-x-[calc(25.3rem*1.05)]'></span>
      준비
    </button>
  );
};

export default GameReadyAndStart;
