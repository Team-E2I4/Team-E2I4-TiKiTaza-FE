import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateNicknameForm from './UpdateNicknameForm';

interface UpdateNicknameModalProps {
  initialIsOpen?: boolean;
  children?: React.ReactNode;
}

const UpdateNicknameModal = ({
  initialIsOpen = false,
  children,
}: UpdateNicknameModalProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}>
      {children ? <Dialog.Trigger asChild>{children}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            'fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]'
          }
        />
        <Dialog.Content
          className={
            'rounded-[1rem] border-green-100 border-[0.3rem] w-[40rem] h-[20rem] flex flex-col gap-[2.5rem] text-center p-[2rem] bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%]'
          }>
          <Dialog.Title className='font-bold font-[Giants-Inline] text-[2rem]'>
            닉네임 설정
          </Dialog.Title>
          <UpdateNicknameForm onClose={() => setIsOpen(false)} />
          <Dialog.Close asChild>
            <button
              aria-label='Close'
              className='hover:bg-gray-100 absolute top-[2rem] right-[2rem] rounded-[0.3rem]'
              onClick={() => navigate('/main')}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateNicknameModal;
