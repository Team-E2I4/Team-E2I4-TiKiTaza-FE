import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ComponentProps, ReactNode, useState } from 'react';

interface CreateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

const CreateRoomModal = ({ children, className }: CreateRoomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('sentence');

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
      placeholder: '없음',
      validatePattern: '[0-9]{4}',
      errorMessage: '비밀번호의 길이는 4자리입니다',
    },
  ];
  const selectList = [
    {
      name: '인원수',
      optionValues: Array.from({ length: 8 })
        .map((_, index) => ({
          value: index + 1,
          text: `${index + 1}명`,
        }))
        .slice(1),
    },
    {
      name: '라운드',
      optionValues: Array.from({ length: 8 })
        .map((_, index) => ({
          value: index + 1,
          text: `${index + 1}라운드`,
        }))
        .slice(1),
    },
  ];
  const modeList = [
    { value: '문장 모드', mode: 'sentence' },
    { value: '코딩 모드', mode: 'coding' },
    { value: '단어 모드', mode: 'word' },
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
          className={`rounded-[1rem] border-green-100 border-[0.3rem] w-[95rem] h-[60rem] flex flex-col items-start justify-start p-[2rem] bg-white z-10 fixed inset-1/2 translate-x-[-50%] translate-y-[-50%] ${className}`}>
          <Dialog.Title className='text-[2.4rem] font-semibold'>
            방 만들기
          </Dialog.Title>
          <div className='flex flex-1 w-full text-[1.8rem]'>
            <Form.Root className='flex flex-col w-1/2 gap-[3.5rem]'>
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
                    className='flex justify-between'
                    key={name}
                    name={name}>
                    <Form.Label className=''>{labelText}</Form.Label>
                    <div className='flex flex-col'>
                      <Form.Control asChild>
                        <input
                          className='w-[22.5rem] h-[3.6rem] p-[1rem] border-[0.2rem] border-gray-200 rounded-[0.8rem]'
                          type={type}
                          placeholder={placeholder}
                          pattern={validatePattern}
                          required
                        />
                      </Form.Control>
                      <Form.Message
                        className='FormMessage'
                        match='patternMismatch'>
                        {errorMessage}
                      </Form.Message>
                    </div>
                  </Form.Field>
                )
              )}
              <div className='flex justify-between'>
                {selectList.map(({ name, optionValues }) => (
                  <Form.Field
                    key={name}
                    name={name}>
                    <Form.Label>{name}</Form.Label>
                    <Form.Control asChild>
                      <select className='border-[0.2rem] border-gray-200 rounded-[0.8rem]'>
                        {optionValues.map(({ value, text }) => (
                          <option
                            key={text}
                            value={value}>
                            {text}
                          </option>
                        ))}
                      </select>
                    </Form.Control>
                  </Form.Field>
                ))}
              </div>
              <article className='flex flex-col gap-[2rem]'>
                {modeList.map(({ value, mode }) => (
                  <button
                    onClick={() => {
                      setSelectedMode(mode);
                      // TODO : 버튼 클릭시 오른쪽 섹션에 모드의 인게임 사진 보여줘야함
                    }}
                    key={value}
                    className={`relative p-[1.5rem] inline-block h-[6rem] text-left transition-all rounded-tl-[0.8rem] 
                      ${
                        selectedMode !== mode
                          ? `w-[23rem] bg-gray-100 rounded-br-[0.8rem]`
                          : `w-[30rem] bg-coral-100`
                      }`}>
                    {value}
                    <div
                      className={`absolute bg-none border-r-[3rem] border-t-[6rem] border-solid border-r-transparent h-0 left-auto top-0 w-0 transition-all
                        ${
                          selectedMode !== mode
                            ? `border-gray-100 right-0`
                            : `border-coral-100 right-[-3rem]`
                        }`}></div>
                  </button>
                ))}
              </article>

              <Form.Submit asChild>
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    wait().then(() => setIsOpen(false));
                  }}
                  className='w-[8rem] p-[0.5rem] rounded-[0.8rem] absolute bottom-[2rem] right-[2rem] bg-coral-100'>
                  방 생성
                </button>
              </Form.Submit>
            </Form.Root>
            <section className='w-1/2'></section>
          </div>
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
