import { ReactNode, useState } from 'react';

interface GameModeDescriptionProps {
  children?: ReactNode;
  gameMode: 'SENTENCE' | 'CODE' | 'WORD';
  isAdmin: boolean;
}

const GAME_MODE_DESCRIPTION = {
  SENTENCE: `문장을 신속하고 정확하게 입력하여 경주에서 승리하세요!\n`,
  CODE: `코드를 신속하고 정확하게 입력하여 경주에서 승리하세요!\n`,
  WORD: '단어를 신속하고 정확하게 입력하여 경주에서 승리하세요!\n단어를 입력하면 단어가 사라집니다!',
  ALL: `\n1. 화면의 상단에 문제가 나오며 라운드가 시작되면 입력 창을 누를 필요 없이 바로 입력하시면 됩니다!\n2. 라운드 별로 점수가 합산 되어서 최종 순위가 결정됩니다!\n3. 틀리면 붉은색 글자가 나타납니다. 맞으면 초록색 글자가 나타납니다.\n4. 입력창에선 키보드 방향키로 이동할 수 없습니다! 지우기만 가능합니다!`,
};

const GameModeDescription = ({
  children,
  gameMode,
  isAdmin,
}: GameModeDescriptionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[69.3rem] transition-all delay-100 ${isHovered ? 'h-[30rem] duration-300 ease-in overflow-hidden' : 'h-[10rem] truncate duration-200 ease-out'} flex items-center justify-end bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      <p
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`absolute top-0 left-0 ${isAdmin ? 'w-[75%]' : 'w-full'} whitespace-pre-line ml-[2rem] py-[2rem] text-left text-[2rem] `}>
        <strong> {GAME_MODE_DESCRIPTION[gameMode]} </strong>
        {GAME_MODE_DESCRIPTION['ALL']}
      </p>

      {children}
    </div>
  );
};

export default GameModeDescription;
