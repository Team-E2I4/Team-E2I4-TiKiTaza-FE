import { useState } from 'react';
import { IngameHeader } from '@/common/Ingame/IngameHeader';
import IngameRankContainer from '@/common/Ingame/IngameRank';
import { SentenceNext, SentenceNow } from '@/common/Ingame/SentenceBlocks';
import { Input } from '@/common/Input/Input';
const sentenceDummy = [
  '저녁 때 돌아갈 집이 있다는 것',
  '힘들 때 마음 속으로 생각 할 사람이 있다는 것',
  '외로울 때 혼자서 부를 노래 있다는 것',
  '세상에 와서 내가 하는 말 가운데서',
  '가장 고운 말을 너에게 들려주고 싶다.',
  '세상에 와서 내가 가진 생각 가운데서',
  '가장 예쁜 생각을 너에게 주고 싶다.',
];
const GameSentencePage = () => {
  const [idx, setIdx] = useState(1);
  setTimeout(() => {
    setIdx((idx) => (idx + 1) % sentenceDummy.length);
  }, 30000);
  return (
    <>
      <IngameHeader />

      <div>
        <div className='absolute'>
          <IngameRankContainer />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[50rem] border-2 border-black'>
          <SentenceNow text={sentenceDummy[idx]} />
          <Input />
          <SentenceNext text={sentenceDummy[idx + 1]} />
          <SentenceNext text={sentenceDummy[idx + 2]} />
        </div>
      </div>
    </>
  );
};

export default GameSentencePage;
