import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ComponentProps, ReactNode, useState } from 'react';

interface CreateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const CreateRoomModal = ({ children, className }: CreateRoomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputList = [
    {
      name: 'roomName',
      value: '',
      type: 'text',
      labelText: '방 이름',
      placeholder: '랜덤 방 이름',
      validatePattern: '[0-9]{4}',
      errorMessage: '방 이름의 길이는 4자리입니다',
    },
    {
      name: 'roomPassword',
      value: '',
      type: 'password',
      labelText: '비밀번호 설정',
      placeholder: '',
      validatePattern: '[0-9]{4}',
      errorMessage: '비밀번호의 길이는 4자리입니다',
    },
  ];

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
        <Dialog.Content
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[30rem] h-[15rem] flex flex-col items-center justify-center bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%] ${className}`}>
          <Dialog.Title>방 만들기</Dialog.Title>
          <Form.Root>
            {inputList.map(
              ({
                name,
                type,
                labelText,
                placeholder,
                validatePattern,
                errorMessage,
              }) => (
                <Form.Field
                  key={name}
                  name={name}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                    }}>
                    <Form.Label>{labelText}</Form.Label>
                    <Form.Message
                      className='FormMessage'
                      match='patternMismatch'>
                      {errorMessage}
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      type={type}
                      placeholder={placeholder}
                      pattern={validatePattern}
                      required
                    />
                  </Form.Control>
                </Form.Field>
              )
            )}

            <Form.Submit asChild>
              <button style={{ marginTop: 10 }}>방 생성</button>
            </Form.Submit>
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

export default CreateRoomModal;
