import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, ReactNode } from 'react';
import Input from '@/common/Input/Input';

interface PrivateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const PrivateRoomModal = ({ children, className }: PrivateRoomModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            'fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]'
          }
        />
        <Dialog.Content
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[30rem] h-[15rem] flex flex-col items-center justify-center bg-white z-10 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${className}`}>
          <Dialog.Title>비밀번호를 입력해주세요!</Dialog.Title>
          <Dialog.Description>
            <Input whSize='w-[24rem] h-[3rem]' />
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              aria-label='Close'
              className='hover:bg-gray-100'>
              [x]
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PrivateRoomModal;
