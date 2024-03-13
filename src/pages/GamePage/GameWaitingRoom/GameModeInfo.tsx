import { ReactNode } from 'react';

interface GameModeInfoProps {
  children?: ReactNode;
  gameMode: 'SENTENCE' | 'CODE' | 'WORD';
}
const GAME_MODE = {
  SENTENCE: '문장',
  CODE: '코드',
  WORD: '단어',
};
const GAME_MODE_INFO = {
  SENTENCE: `주어진 문장을 맞게 입력하면 됩니다.`,
  CODE: `주어진 코드를 맞게 입력하면 됩니다. 아무것도 입력할 것이 안 보인다면 줄 넘김이라 엔터키를 입력하면 됩니다!`,
  WORD: '주어진 단어를 맞게 입력하며 됩니다.',
};

const GameModeInfo = ({ children, gameMode }: GameModeInfoProps) => {
  return (
    <div className='w-[69.3rem] h-[10rem] flex bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]'>
      <p className='w-[80%] my-[2.5rem] ml-[2rem] overflow-y-scroll text-left'>
        <strong>{GAME_MODE[gameMode]} 모드입니다. </strong>
        {GAME_MODE_INFO[gameMode]}
      </p>
      {children}
    </div>
  );
};

export default GameModeInfo;
