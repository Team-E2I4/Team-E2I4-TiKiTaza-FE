import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ComponentProps, ReactNode, useState } from 'react';
import { Path, RegisterOptions, useForm } from 'react-hook-form';

interface CreateRoomModalProps {
  children: ReactNode;
  className?: ComponentProps<'div'>['className'];
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

interface I_CreateRoomInputName {
  roomName: string;
  roomPassword: string;
}

interface I_CreateRoomInput {
  name: Path<I_CreateRoomInputName>;
  value: string;
  type: string;
  required: boolean;
  label: string;
  placeholder: string;
  validate?: RegisterOptions;
}

const CreateRoomModal = ({ children, className }: CreateRoomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('sentence');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_CreateRoomInputName>({
    mode: 'onChange',
  });

  const inputList: I_CreateRoomInput[] = [
    {
      name: 'roomName',
      value: '',
      type: 'text',
      label: '방 이름',
      placeholder: '티기타자 고다고',
      required: false,
      validate: {
        minLength: {
          value: 2,
          message: '방 이름은 2글자 이상이어야 합니다.',
        },
        maxLength: {
          value: 14,
          message: '방 이름은 14글자를 초과할 수 없습니다.',
        },
      },
    },
    {
      name: 'roomPassword',
      value: '',
      type: 'password',
      label: '비밀번호 설정',
      placeholder: '비공개방을 만들고 싶으시면 입력!',
      required: false,
      validate: {
        maxLength: {
          value: 10,
          message: '비밀번호는 10글자를 초과할 수 없습니다.',
        },
      },
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

  const onCreateRoom = () => {
    wait().then(() => setIsOpen(false));
  };

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
          <div className='flex flex-1 w-full text-[1.8rem] pt-[3rem]'>
            <Form.Root
              onSubmit={handleSubmit(onCreateRoom)}
              className='flex flex-col w-1/2 gap-[2.5rem]'>
              {inputList.map(
                ({ name, type, label, placeholder, required, validate }) => (
                  <Form.Field
                    className='flex justify-between'
                    key={name}
                    name={name}>
                    <Form.Label>{label}</Form.Label>
                    <div className='flex flex-col h-[6rem]'>
                      <Form.Control
                        className={`${errors[name]?.message ? 'border-red-500' : 'border-green-500'}`}
                        asChild>
                        <input
                          className='w-[26rem] h-[3.6rem] p-[1rem] border-[0.2rem] border-gray-200 rounded-[0.8rem] focus:outline-none'
                          type={type}
                          placeholder={placeholder}
                          {...register(name, {
                            required,
                            ...validate,
                          })}
                        />
                      </Form.Control>
                      <span className='block text-[1.3rem] h-[2rem] text-red-500 pt-[0.3rem] text-center'>
                        {errors[name]?.message}
                      </span>
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
                    type='button'
                    onClick={() => {
                      setSelectedMode(mode);
                      // TODO : 버튼 클릭시 오른쪽 섹션에 모드의 인게임 사진 보여줘야함
                    }}
                    key={value}
                    className={`relative p-[1.5rem] inline-block h-[6rem] text-left transition-all rounded-tl-[0.8rem]
                      ${
                        selectedMode !== mode
                          ? `w-[23rem] bg-gray-100 font-medium`
                          : `w-[30rem] bg-coral-100 font-semibold`
                      }`}>
                    {value}
                    <div
                      className={`absolute bg-none border-r-[3rem] border-t-[6rem] border-solid border-r-transparent h-0 left-auto top-0 w-0 transition-all right-[-3rem]
                        ${
                          selectedMode !== mode
                            ? `border-gray-100`
                            : `border-coral-100`
                        }`}></div>
                  </button>
                ))}
              </article>

              <Form.Submit asChild>
                <button
                  type='submit'
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
