import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ComponentProps, ReactNode, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';

interface CreateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const CreateRoomModal = ({ children, className }: CreateRoomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            'fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]'
          }
        />
        {/* Todo: 색상대신 깃발 펄럭이는 이미지 배경에 깔아두기 */}
        <Dialog.Content
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[95rem] h-[60rem] flex flex-col items-start justify-start p-[2rem] bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%] ${className}`}>
          <Dialog.Title className='text-[2.4rem] font-semibold'>
            방 만들기
          </Dialog.Title>
          <CreateRoomForm setIsOpen={setIsOpen} />
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

export default CreateRoomModal;
