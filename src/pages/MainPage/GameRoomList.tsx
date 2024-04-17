import { Fragment, useState } from 'react';
import Divider from '@/common/Divider/Divider';
import { GameModeType } from '@/types/gameMode';
import GameRoomListItem from './GameRoonListItem';
import PrivateRoomModal from './PrivateRoomModal';
import { I_ChangeGameRoomData } from './SseFetcher';

const GAME_ROOM_LIST_CATEGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

interface GameRoomListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: I_ChangeGameRoomData[];
  checkedGameModeList: GameModeType[];
}

const GameRoomList = ({ data, checkedGameModeList }: GameRoomListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredRoomList = checkedGameModeList.flatMap((mode) =>
    data.filter(({ gameMode }) => gameMode === mode)
  );

  return (
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
            방 목록이 존재하지 않아요 😫
          </span>
        )}
      </li>
    </ul>
  );
};

export default GameRoomList;
