import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { AxiosError } from 'axios';
import { ComponentProps, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '@/generated';
import useEnterGameRoom from '@/hooks/useEnterGameRoom';
import useRoomInfoStore from '@/store/useRoomInfoStore';

interface PrivateRoomModalProps {
  className?: ComponentProps<'div'>['className'];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  roomId: number;
}

const PrivateRoomModal = ({
  className,
  isOpen,
  setIsOpen,
  roomId,
}: PrivateRoomModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<{ password: string }>();

  const { setRoomId } = useRoomInfoStore();

  const navigate = useNavigate();

  const { mutate: mutateEnterGameRoom } = useEnterGameRoom({
    onSuccess: () => {
      setRoomId(roomId);
      setIsOpen(false);
      navigate('/game');
    },
    onError: (e: AxiosError<ErrorResponse>) => {
      setError('password', { message: e.response?.data.errorMessage });
    },
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            'fixed inset-0 w-[100vw] h-[100vh] bg-black/30 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]'
          }
        />
        <Dialog.Content
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[30rem] h-[15rem] flex flex-col items-center justify-center bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%] ${className}`}>
          <Dialog.Title>비밀번호를 입력해주세요!</Dialog.Title>
          <Form.Root
            className='flex gap-[1rem] items-center'
            onSubmit={handleSubmit(() => {
              mutateEnterGameRoom({ roomId, password: getValues('password') });
            })}>
            <Form.Field name='password'>
              <Form.Control
                className={`${errors.password?.message ? 'border-red-500' : 'border-green-500'}`}
                asChild>
                <input
                  className='flex items-center pl-[1.75rem] rounded-2xl
              bg-white border-2 border-green-100 my-4
              outline-0 text-gray-300 tracking-wider w-[20rem] h-[3rem]'
                  maxLength={10}
                  type='password'
                  required
                  {...register('password')}
                />
              </Form.Control>
              <span className='block text-[1.3rem] h-[2rem] text-red-500 pt-[0.3rem] text-center'>
                {errors.password?.message}
              </span>
            </Form.Field>
            <button
              type='submit'
              className='hover:bg-gray-100 rounded-[0.3rem]'>
              <PaperPlaneIcon
                className='size-[2rem]'
                color='green'
              />
            </button>
          </Form.Root>
          <Dialog.Close asChild>
            <button
              aria-label='Close'
              className='hover:bg-gray-100 absolute top-[1rem] right-[1rem] rounded-[0.3rem]'>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PrivateRoomModal;
