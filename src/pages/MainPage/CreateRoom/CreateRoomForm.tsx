import * as Form from '@radix-ui/react-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { inputList, modeList, selectList } from './constants/createRoom';
import { I_CreateRoomInputName } from './types';

interface CreateRoomFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

const CreateRoomForm = ({ setIsOpen }: CreateRoomFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_CreateRoomInputName>({
    mode: 'onChange',
  });

  const [selectedMode, setSelectedMode] = useState('sentence');

  const onCreateRoom = () => {
    wait().then(() => setIsOpen(false));
  };

  return (
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
                selectedMode !== mode ? `border-gray-100` : `border-coral-100`
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
  );
};

export default CreateRoomForm;
