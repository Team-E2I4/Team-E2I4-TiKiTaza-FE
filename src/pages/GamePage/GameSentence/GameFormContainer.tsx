import { useState } from 'react';
import Dashboard from '@/common/Ingame/Dashboard';
import { SentenceNext } from '@/common/Ingame/SentenceBlocks';
import GameForm from './GameForm';
import useTypingState from './useTypingState';

const sentenceDummy = [
  '저녁 때 돌아갈 집이 있다는 것',
  '힘들 때 마음 속으로 생각 할 사람이 있다는 것',
  '외로울 때 혼자서 부를 노래 있다는 것',
  '세상에 와서 내가 하는 말 가운데서',
  '가장 고운 말을 너에게 들려주고 싶다.',
  '세상에 와서 내가 가진 생각 가운데서',
  '가장 예쁜 생각을 너에게 주고 싶다.',
];

const GameFormContainer = () => {
  const { cpm, accurate, onInputChange, onKeyDown, initializeTyping } =
    useTypingState();

  const [idx, setIdx] = useState(1);
  return (
    <>
      <div className='flex flex-col items-center justify-center z-10'>
        <GameForm
          inputName='sentence'
          sample={sentenceDummy[idx]}
          key={sentenceDummy[idx]}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          handleLineEnd={() =>
            setIdx((idx) => (idx + 1) % sentenceDummy.length)
          }
          initializeTyping={initializeTyping}
        />
        <SentenceNext text={sentenceDummy[idx + 1]} />
        <SentenceNext text={sentenceDummy[idx + 2]} />
      </div>
      <div className='w-full flex justify-evenly mt-20'>
        <Dashboard
          type='cpm'
          value={cpm}
        />
        <Dashboard
          type='accuracy'
          value={accurate}
        />
      </div>
    </>
  );
};

export default GameFormContainer;
