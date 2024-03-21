import { ReactNode, useState } from 'react';

interface GameModeDescriptionProps {
  children?: ReactNode;
  gameMode: 'SENTENCE' | 'CODE' | 'WORD';
  isAdmin: boolean;
}

const GAME_MODE_SHORT_DESCRIPTION = {
  SENTENCE: `문장을 신속하고 정확하게 입력하여 경주에서 승리하세요!\n`,
  CODE: `알고리즘 공부가 되는 게임이 있다?!?\n`,
  WORD: '100개 단어 선착순 맞추기 시-작!\n',
};

const GAME_MODE_DESCRIPTION = {
  SENTENCE: `\n1. 화면의 상단에 문제가 나오며 매 라운드는 3초 카운트다운 이후 시작됩니다!\n2. 라운드 별로 점수가 합산 되어서 최종 순위가 결정됩니다!\n3. 입력창에선 키보드 방향키로 이동할 수 없습니다! 지우기만 가능합니다!\n4. 틀리면 붉은색, 맞으면 초록색 글자가 나타나며 오타가 있으면 제출이 안됩니다!`,
  CODE: `\n1. 화면의 상단에 문제가 나오며 매 라운드는 3초 카운트다운 이후 시작됩니다!\n2. 라운드 별로 점수가 합산 되어서 최종 순위가 결정됩니다!\n3. 입력창에선 키보드 방향키로 이동할 수 없습니다! 지우기만 가능합니다!\n4. 틀리면 붉은색, 맞으면 초록색 글자가 나타나며 오타가 있으면 제출이 안됩니다!`,
  WORD: '\n1. 화면의 상단에 문제가 나오며 매 라운드는 3초 카운트다운 이후 시작됩니다!\n2. 라운드 별로 점수가 합산 되어서 최종 순위가 결정됩니다!\n3. 입력창에선 키보드 방향키로 이동할 수 없습니다! 지우기만 가능합니다!\n4. 틀린 단어를 입력하면 아무 일도 일어나지 않습니다!',
};

const GameModeDescription = ({
  children,
  gameMode,
  isAdmin,
}: GameModeDescriptionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[75%] transition-all delay-100 origin-bottom ${isHovered ? 'h-[22rem] duration-300 ease-in overflow-hidden -translate-y-[12rem]' : 'h-[10rem] truncate duration-200 ease-out'} flex items-center justify-end bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      <p
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`absolute top-0 left-0 ${isAdmin ? 'w-[85%]' : 'w-[100%]'} ${isHovered ? 'h-[22rem]' : 'h-[10rem]'}  whitespace-pre-line pl-[2rem] py-[2rem] text-left text-[1.6rem]`}>
        <strong> {GAME_MODE_SHORT_DESCRIPTION[gameMode]} </strong>
        {GAME_MODE_DESCRIPTION[gameMode]}
      </p>
      {children}
    </div>
  );
};

export default GameModeDescription;
