import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface UpdateNicknameModalProps {
  initialIsOpen: boolean;
}

const UpdateNicknameModal = ({
  initialIsOpen = false,
}: UpdateNicknameModalProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            'fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]'
          }
        />
        <Dialog.Content
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[45rem] h-[25rem] flex flex-col text-center p-[2rem] bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%]`}>
          <Dialog.Title className='text-[1.6rem] font-semibold'>
            닉네임 설정
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              aria-label='Close'
              className='hover:bg-gray-100 absolute top-[2rem] right-[2rem] rounded-[0.3rem]'>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateNicknameModal;
