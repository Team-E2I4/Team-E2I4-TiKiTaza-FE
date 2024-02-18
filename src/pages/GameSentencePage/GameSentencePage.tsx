import { useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { SentenceNext, SentenceNow } from '@/common/Ingame/SentenceBlocks';
import Input from '@/common/Input/Input';
import useCanvas from '@/hooks/useCanvas';

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
  //이하 임의값 테스트 코드입니다
  const [idx, setIdx] = useState(1);
  setInterval(() => {
    setIdx((idx) => (idx + 1) % sentenceDummy.length);
  }, 30000);
  const [wpmTest, setWpmTest] = useState(0);
  const [accTest, setAccTest] = useState(0);
  setInterval(() => {
    setWpmTest(Math.floor(Math.random() * 1001));
    setAccTest(Math.floor(Math.random() * 101));
  }, 2000);

  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = 1160;
      canvas.height = 500;
    },
  });

  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[50rem] relative z-[2]'>
          <div className='flex flex-col items-center justify-center'>
            <SentenceNow text={sentenceDummy[idx]} />
            <Input />
            <SentenceNext text={sentenceDummy[idx + 1]} />
            <SentenceNext text={sentenceDummy[idx + 2]} />
            <canvas
              ref={canvasRef}
              className='absolute w-full h-full z-[-1] bg-[pink] border-2 border-black '
            />
          </div>
          <div className='w-full flex justify-evenly mt-20'>
            <Dashboard
              type='wpm'
              value={wpmTest}
            />
            <Dashboard
              type='accuracy'
              value={accTest}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSentencePage;
