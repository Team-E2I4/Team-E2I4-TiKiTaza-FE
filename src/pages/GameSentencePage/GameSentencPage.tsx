import { IngameHeader } from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';

const GameSentencePage = () => {
  return (
    <>
      <IngameHeader
        roomName='테스트방 이름이 길어진다면 1234567898765'
        participants={8}
        round={2}
        roundTotal={5}
      />
      <IngameRank
        isMe={false}
        rank={2}
        name='다른유저'
      />
      <IngameRank
        isMe={true}
        rank={3}
        name='나야나'
      />
    </>
  );
};

export default GameSentencePage;
