import * as Avatar from '@radix-ui/react-avatar';
import { useMemo } from 'react';
import close from '@/assets/close.png';
import { HandlePubKickUserType, I_AllMember } from '../types/websocketType';

const GameRoomUserItem = ({
  hostId,
  gameRoomUser,
  userId,
  handlePubKickUser,
}: {
  hostId: number | undefined;
  gameRoomUser: I_AllMember;
  userId: number;
  handlePubKickUser: HandlePubKickUserType;
}) => {
  const {
    memberId,
    nickname,
    ranking = 0,
    readyStatus: isReady,
  } = gameRoomUser;

  const isAdmin = useMemo(() => hostId === memberId, [hostId, memberId]); // 방장인지
  const isAdminMe = useMemo(() => hostId === userId, [hostId, userId]); //본인이 방장인지
  const isMe = useMemo(() => memberId === userId, [memberId, userId]); // 각 유저가 본인인지 -> 방장이자 본인일떄 강퇴식별용

  return (
    <div className='w-[25.8rem] h-[21.2rem] p-[1.6rem] pb-[4rem] relative flex flex-col bg-white shadow-md shadow-black/50 rounded-[2.5rem]'>
      <div className='h-[3rem] self-end'>
        <button
          onClick={() => {
            handlePubKickUser(memberId);
          }}>
          {isAdminMe && !isMe && (
            <img
              src={close}
              alt='강퇴'
              className='w-[3rem]'
            />
          )}
        </button>
      </div>
      <div className='flex grow gap-[2rem]'>
        <Avatar.Root className='w-1/2 self-center'>
          <Avatar.Image
            className='size-[10rem] rounded-full'
            src={
              'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80?&w=128&h=128&dpr=2&q=80'
            }
            alt='프로필 이미지'
          />
          {/*임시 이미지*/}
          <Avatar.Fallback delayMs={6000}>test</Avatar.Fallback>
        </Avatar.Root>
        <div className='w-1/2 flex flex-col justify-evenly text-center'>
          <div className='w-[10rem] h-[3rem] py-[0.4rem] bg-green-70 rounded-[1rem]'>
            {nickname}
          </div>
          <div className='w-[10rem] h-[3rem] py-[0.4rem] bg-green-70 rounded-[1rem] text-[1.4rem]'>
            {ranking === -1
              ? '등수 없음'
              : ranking === 0
                ? '랭킹 반영중'
                : `${ranking}등`}
          </div>
        </div>
      </div>
      {((isAdminMe && isMe) || isReady) && (
        <div className='absolute w-[13rem] h-[4rem] rounded-[2rem_0_2.5rem] right-0 bottom-0 text-center leading-[4rem] font-[Giants-Inline] bg-green-100'>
          {isAdmin ? '방장' : isReady && '준비'}
        </div>
      )}
    </div>
  );
};

export default GameRoomUserItem;
