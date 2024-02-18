import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, ReactNode, useState } from 'react';
import Input from '@/common/Input/Input';

interface PrivateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

const PrivateRoomModal = ({ children, className }: PrivateRoomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}>
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
            <form
              className='flex gap-[1rem]'
              onSubmit={(e) => {
                e.preventDefault();
                wait().then(() => setIsOpen(false));
              }}>
              <Input whSize='w-[20rem] h-[3rem]' />
              <button type='submit'>입장!</button>
            </form>
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
