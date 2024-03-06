import { useState } from 'react';
import DisconnectModal from '@/pages/GamePage/common/DisconnectModal';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import Backward from '../Backward/Backward';

const IngameHeader = () => {
  const { roomInfo } = useRoomInfoStore();
  const [isAlert, setIsAlert] = useState(false);

  const handleClickBackward = () => {
    setIsAlert(true);
  };

  return (
    <>
      <DisconnectModal
        isOpen={isAlert}
        handleClickCancel={() => {
          setIsAlert(false);
        }}
      />
      <div className='flex flex-row items-center gap-20 pb-8 font-[Giants-Inline] select-none'>
        <Backward handleClickBackward={handleClickBackward} />
        <div className='w-[40rem] truncate text-[4rem]'>{roomInfo?.title}</div>
        <div className='grow'>참여 {roomInfo?.currentPlayer}명</div>
        <div className='text-[3rem]'>
          🏁 {roomInfo?.currentPlayer} / {roomInfo?.maxPlayer}
        </div>
      </div>
    </>
  );
};
export default IngameHeader;
