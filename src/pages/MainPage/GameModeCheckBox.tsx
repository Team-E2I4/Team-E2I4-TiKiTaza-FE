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
    <form className='flex gap-[2rem]'>
      {gameModeList.map((mode, i) => {
        //매 렌더링시 생성되므로 map 바깥으로 뺀다?
        const onCheckedChange = () => {
          setCheckedGameMode((prevState) => {
            const isNewMode = !prevState[mode];
            if (mode === 'ALL') {
              const newState = { ...prevState };
              let checkGameModeState: keyof TestType;
              for (checkGameModeState in prevState) {
                newState[checkGameModeState] = isNewMode;
              }
              return newState;
            }
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
