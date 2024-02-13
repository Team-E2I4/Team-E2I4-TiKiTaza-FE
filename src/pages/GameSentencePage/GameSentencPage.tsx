import { IngameHeader } from '@/common/Ingame/IngameHeader';

const GameSentencePage = () => {
  return (
    <>
      <IngameHeader
        roomName='테스트방'
        participants={8}
        round={2}
        roundTotal={5}
      />
      <div> game sentence page</div>
    </>
  );
};

export default GameSentencePage;
