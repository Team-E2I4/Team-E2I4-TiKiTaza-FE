import { useEffect, useState } from 'react';
import useTimer from '@/hooks/useTimer';
import DisconnectModal from '@/pages/GamePage/common/DisconnectModal';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import Backward from '../Backward/Backward';
import { convertTime } from '../Timer/utils/convertTime';

interface IngameHeaderProps {
  handleRoundFinish: () => void;
  currentRound: number;
  timeLimit: number;
  isNextRound: boolean;
}

export const SECONDS_PER_MINUTE = 60;

const IngameHeader = ({
  handleRoundFinish,
  currentRound,
  timeLimit,
  isNextRound,
}: IngameHeaderProps) => {
  const { roomInfo } = useRoomInfoStore();
  const [isAlert, setIsAlert] = useState(false);
  const { timeLeft, resetTimer } = useTimer({
    minutes: Math.floor(timeLimit / SECONDS_PER_MINUTE),
    seconds: timeLimit % SECONDS_PER_MINUTE,
    onTimeFinish: () => {
      handleRoundFinish();
    },
  });

  useEffect(() => {
    isNextRound && resetTimer();
  }, [isNextRound]);

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
        <div>
          <span className='font-bold font-[Giants-Inline] text-[3.2rem]'>
            남은 시간 : {convertTime(timeLeft)}
          </span>
        </div>
        <div className='text-[3rem]'>
          🏁 {currentRound} / {roomInfo?.maxRound}
        </div>
      </div>
    </>
  );
};
export default IngameHeader;
