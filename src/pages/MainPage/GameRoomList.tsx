import { Fragment, useState } from 'react';
import Divider from '@/common/Divider/Divider';
import { I_ChangeGameRoomData } from '@/hooks/useSSE';
import GameRoomListItem from './GameRoonListItem';
import { FilteredGameModeType } from './MainPage';
import PrivateRoomModal from './PrivateRoomModal';

const GAME_ROOM_LIST_CATEGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

interface GameRoomListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: I_ChangeGameRoomData[];
  selectedGameMode: FilteredGameModeType;
}

const GameRoomList = ({ data, selectedGameMode }: GameRoomListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const waitingRoomList = data.filter(({ isPlaying }) => !isPlaying);
  const filteredRoomList =
    selectedGameMode !== 'ALL'
      ? waitingRoomList.filter(({ gameMode }) => gameMode === selectedGameMode)
      : waitingRoomList;

  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      <ul className='flex flex-col items-center px-[1.5rem]'>
        <li className='flex w-full h-[5rem] py-[1rem] items-center'>
          {GAME_ROOM_LIST_CATEGORY.map((category, i) => (
            <Fragment key={i}>
              <span
                className={`text-center ${category === '방 제목' ? 'flex-[4_0_0]' : 'flex-1'}`}>
                {category}
              </span>
              {i !== category.length && (
                <Divider
                  orientation='vertical'
                  className='border-gray-200'
                />
              )}
            </Fragment>
          ))}
        </li>
        <Divider className='border-gray-200' />
        <li className='w-full'>
          <ul className='w-full flex flex-col gap-[1.2rem] max-h-[50rem] overflow-y-auto py-[1rem]'>
            {filteredRoomList.map((roomData) => (
              <Fragment key={roomData.id}>
                <GameRoomListItem
                  key={roomData.id}
                  setIsOpen={setIsOpen}
                  {...roomData}
                />
                {roomData.isPrivate && (
                  <PrivateRoomModal
                    roomId={roomData.id}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                  />
                )}
              </Fragment>
            ))}
          </ul>
          {!filteredRoomList.length && (
            <span className='text-[2rem] font-bold w-full text-center block'>
              {selectedGameMode === 'ALL'
                ? '현재 생성된 게임이 없습니다!'
                : '선택하신 모드의 방 목록이 없습니다!'}
            </span>
          )}
        </li>
      </ul>
    </article>
  );
};

export default GameRoomList;
