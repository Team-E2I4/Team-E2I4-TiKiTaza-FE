import { ReactNode } from 'react';

interface GameModeDescriptionProps {
  children?: ReactNode;
  gameMode: 'SENTENCE' | 'CODE' | 'WORD';
}
const GAME_MODE = {
  SENTENCE: '문장',
  CODE: '코딩',
  WORD: '단어',
};
const GAME_MODE_DESCRIPTION = {
  SENTENCE: `문장을 신속하고 정확하게 입력하여 경주에서 승리하세요!`,
  CODE: `코드를 신속하고 정확하게 입력하여 경주에서 승리하세요!`,
  WORD: '단어를 신속하고 정확하게 입력하여 경주에서 승리하세요!',
};

const GameModeDescription = ({
  children,
  gameMode,
}: GameModeDescriptionProps) => {
  return (
    <div className='w-[69.3rem] h-[10rem] flex items-center bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]'>
      <p className='w-[80%] ml-[2rem] overflow-y-auto text-left text-[2rem]'>
        <strong>{GAME_MODE[gameMode]} 모드입니다. </strong>
        {GAME_MODE_DESCRIPTION[gameMode]}
      </p>
      {children}
    </div>
  );
};

export default GameModeDescription;
