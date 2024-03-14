import { Fragment, useState } from 'react';
import Divider from '@/common/Divider/Divider';
import { I_ChangeGameRoomData } from '@/hooks/useSSE';
import GameRoomListItem from './GameRoonListItem';
import { GameModeType } from './MainPage';
import PrivateRoomModal from './PrivateRoomModal';

const GAME_ROOM_LIST_CATEGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

interface GameRoomListProps {
  data: I_ChangeGameRoomData[];
  selectedGameMode: GameModeType;
}

const GameRoomList = ({ data, selectedGameMode }: GameRoomListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredRoomList =
    selectedGameMode !== 'ALL'
      ? data.filter(
          ({ isPlaying, gameMode }) =>
            !isPlaying && gameMode === selectedGameMode
        )
      : data;

  return (
    <article className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      <ul className='flex flex-col items-center px-[1.5rem]'>
        <li className='flex w-full h-[5rem]  py-[1rem]'>
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
          <ul className='w-full flex flex-col gap-[1rem] max-h-[60rem] overflow-y-auto scrollbar-hide pt-[1rem]'>
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
              선택하신 모드의 방 목록이 없습니다!
            </span>
          )}
        </li>
      </ul>
    </article>
  );
};

export default GameRoomList;
