import * as Dialog from '@radix-ui/react-dialog';

interface RoundWaitModalProps {
  isOpen: boolean;
  timeLeft: number;
}

const RoundWaitModal = ({ isOpen, timeLeft }: RoundWaitModalProps) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='z-100 fixed inset-0 w-[100vw] h-[100vh] bg-black/70 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]' />
        <Dialog.Content className='`rounded-[1rem] border-green-100 border-[0.3rem] w-[30rem] h-[15rem] flex flex-col items-center justify-center bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%]'>
          {timeLeft}
          ㅎㅇ
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RoundWaitModal;
