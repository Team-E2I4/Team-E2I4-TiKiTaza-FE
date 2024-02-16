import * as Dialog from '@radix-ui/react-dialog';

const PrivateRoomModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>열기</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>하이</Dialog.Description>
          <Dialog.Close asChild>
            <button>닫기1</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button aria-label='Close'>닫기2</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PrivateRoomModal;
