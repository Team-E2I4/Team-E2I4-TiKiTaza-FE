import { Fragment, useState } from 'react';
import Divider from '@/common/Divider/Divider';
import useEnterGameRoom, {
  I_UseEnterGameRoomMutation,
} from '@/hooks/useEnterGameRoom';
import { I_ChangeGameRoomData } from '@/hooks/useSSE';
import GameRoomListItem from './GameRoonListItem';
import PrivateRoomModal from './PrivateRoomModal';

const GAME_ROOM_LIST_CATEGORY = ['방 번호', '방 제목', '게임 모드', '인원수'];

const GameRoomList = ({ data }: { data: I_ChangeGameRoomData[] }) => {
  const { mutate: mutateEnterGameRoom } = useEnterGameRoom({});
  const [isOpen, setIsOpen] = useState(false);
  const handleEnterGameRoom = ({
    roomId,
    password,
  }: I_UseEnterGameRoomMutation) => {
    mutateEnterGameRoom({ roomId, password });
  };
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
            {data.map((roomData) =>
              roomData.isPrivate ? (
                <PrivateRoomModal
                  key={roomData.id}
                  handlePasswordSubmit={handleEnterGameRoom}
                  setIsOpen={setIsOpen}
                  roomId={roomData.id}
                  isOpen={isOpen}>
                  <GameRoomListItem {...roomData} />
                </PrivateRoomModal>
              ) : (
                <GameRoomListItem
                  key={roomData.id}
                  {...roomData}
                  handleGameRoomItemClick={handleEnterGameRoom}
                />
              )
            )}
          </ul>
        </li>
      </ul>
    </article>
  );
};

export default GameRoomList;
