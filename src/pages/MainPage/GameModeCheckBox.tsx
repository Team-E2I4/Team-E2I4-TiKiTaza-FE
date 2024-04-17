import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { gameModeList, mappedGameModeList, TestType } from './MainPage';

interface GameModeCheckBoxProps {
  setCheckedGameMode: Dispatch<SetStateAction<TestType>>;
  checkedGameMode: TestType;
}

const GameModeCheckBox = ({
  checkedGameMode,
  setCheckedGameMode,
}: GameModeCheckBoxProps) => {
  return (
    <form className='flex'>
      {gameModeList.map((mode, i) => {
        const onCheckedChange = () => {
          setCheckedGameMode((prevState) => {
            const isNewMode = !prevState[mode];
            return { ...prevState, [mode]: isNewMode };
          });
        };
        return (
          <div
            className='flex items-center'
            key={mode}>
            <Checkbox.Root
              checked={checkedGameMode[mode]}
              onClick={onCheckedChange}
              className='bg-white w-[2.5rem] h-[2.5rem] rounded-md flex items-center justify-center shadow-md hover:bg-gray-100/50'
              id={`c${i}`}>
              <Checkbox.Indicator className='CheckboxIndicator'>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className='cursor-pointer'
              htmlFor={`c${i}`}>
              {mappedGameModeList[mode]}
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default GameModeCheckBox;
