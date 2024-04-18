import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { GAME_MODE_LIST, MAPPED_GAME_MODE_LIST } from './constants/gameMode';
import { CheckedGameModeType, FilteredGameModeType } from './MainPage';

interface GameModeCheckBoxProps {
  setCheckedGameMode: Dispatch<SetStateAction<CheckedGameModeType>>;
  checkedGameMode: CheckedGameModeType;
}

const GameModeCheckBox = ({
  checkedGameMode,
  setCheckedGameMode,
}: GameModeCheckBoxProps) => {
  const onCheckedChange = (mode: FilteredGameModeType) => {
    setCheckedGameMode((prevState) => {
      const isNewMode = !prevState[mode];
      if (mode === 'ALL') {
        const newState = { ...prevState };
        let checkGameModeState: keyof CheckedGameModeType;
        for (checkGameModeState in prevState) {
          newState[checkGameModeState] = isNewMode;
        }
        return newState;
      }
      return { ...prevState, [mode]: isNewMode };
    });
  };
  return (
    <form className='flex gap-[3rem]'>
      {GAME_MODE_LIST.map((mode, i) => {
        //매 렌더링시 생성되므로 map 바깥으로 뺀다?
        return (
          <div
            className='flex items-center gap-[0.5em]'
            key={mode}>
            <Checkbox.Root
              checked={checkedGameMode[mode]}
              onClick={() => onCheckedChange(mode)}
              className='bg-white w-[3rem] h-[3rem] rounded-md flex items-center justify-center shadow-md hover:bg-gray-100/50'
              id={`c${i}`}>
              <Checkbox.Indicator className=''>
                <CheckIcon className='size-[3rem]' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className='cursor-pointer text-[2rem] font-bold'
              htmlFor={`c${i}`}>
              {MAPPED_GAME_MODE_LIST[mode]}
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default GameModeCheckBox;
