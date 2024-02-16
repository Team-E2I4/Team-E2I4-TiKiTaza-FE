import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps, ReactNode } from 'react';

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
            'fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100vw] h-[100vh] bg-black/30'
          }
        />
        <Dialog.Content
          className={
            className
              ? className
              : 'bg-blue-100 z-10 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          }>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>하이</Dialog.Description>
          <Dialog.Close asChild>
            <button aria-label='Close'>닫기2</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PrivateRoomModal;
