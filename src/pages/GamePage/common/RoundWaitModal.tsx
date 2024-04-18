import * as Dialog from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { convertTime } from '@/common/Timer/utils/convertTime';
import useTimer from '@/hooks/useTimer';
import playSoundEffect from './playSoundEffect';

interface RoundWaitModalProps {
  isOpen: boolean;
  onTimeFinish: () => void;
}

const RoundWaitModal = ({ isOpen, onTimeFinish }: RoundWaitModalProps) => {
  const { timeLeft, resetTimer, startTimer } = useTimer({
    seconds: 3,
    onTimeFinish: () => {
      onTimeFinish();
      resetTimer();
    },
    autoStart: false,
  });
  const sound = playSoundEffect('COUNTDOWN');
  useEffect(() => {
    if (isOpen) {
      startTimer();
      sound.play();
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='z-[100] fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]' />
        <Dialog.Content className='z-[100] w-[30rem] h-[15rem] flex flex-col items-center justify-center fixed inset-1/2 translate-x-[-50%] translate-y-[-50%]'>
          <span className='text-[10rem]'>
            {timeLeft === 0 ? 'start' : convertTime(timeLeft).split(':')[1]}!
          </span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RoundWaitModal;
