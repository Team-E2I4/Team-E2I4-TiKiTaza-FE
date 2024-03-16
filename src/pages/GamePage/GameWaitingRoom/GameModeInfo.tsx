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
  SENTENCE: `문장을 신속하고 정확하게 입력하여 경주에서 승리하세요!`,
  CODE: `코드를 신속하고 정확하게 입력하여 경주에서 승리하세요! 아무것도 입력할 것이 안 보인다면 줄 넘김이라 엔터키를 입력하면 됩니다!`,
  WORD: '단어를 신속하고 정확하게 입력하여 경주에서 승리하세요!',
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
