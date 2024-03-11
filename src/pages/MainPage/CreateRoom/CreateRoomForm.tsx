import * as Form from '@radix-ui/react-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GameRoomCreateRequest } from '@/generated';
import useCreateGameRoom from '@/hooks/useCreateGameRoom';
import useUpdateGameRoom from '@/hooks/useUpdateGameRoom';
import useRoomInfoStore from '@/store/useRoomInfoStore';
import getRandomItem from '@/utils/getRandomItem';
import {
  CREATE_ROOM_INPUT_LIST,
  CREATE_ROOM_SELECT_LIST,
  GAME_MODE_LIST,
} from './constants/createRoom';
import { DEFAULT_TITLES } from './constants/defaultTitles';
import { SettingModeType } from './CreateRoomModal';
import { I_CreateRoomInputName, I_CreateRoomSelectName } from './types';

interface CreateRoomFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  settingMode: SettingModeType;
  setSettingMode: Dispatch<SetStateAction<SettingModeType>>;
}

type CreateRoomFormType = I_CreateRoomInputName & I_CreateRoomSelectName;

const CreateRoomForm = ({
  setIsOpen,
  settingMode,
  setSettingMode,
}: CreateRoomFormProps) => {
  const navigate = useNavigate();
  const { setRoomId, roomInfo, roomId } = useRoomInfoStore();

  useEffect(() => {
    if (roomInfo) {
      setSettingMode('Update');
      return;
    }
    setSettingMode('Create');
  }, [roomInfo, setSettingMode]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<CreateRoomFormType>({
    mode: 'onChange',
    defaultValues: {
      title: roomInfo?.title ?? '',
      password: roomInfo?.password ?? '',
      round: roomInfo?.maxRound ?? 2,
      maxPlayer: roomInfo?.maxPlayer ?? 2,
    },
  });

  const { mutate: mutateCreateGameRoom } = useCreateGameRoom({
    onSuccess: (e) => {
      if (!e.data.data) {
        return;
      }
      alert('방 생성 성공');
      setRoomId(e.data.data.roomId);
      setIsOpen(false);
      navigate('/game');
    },
  });

  const { mutate: mutateUpdateGameRoom } = useUpdateGameRoom({
    onSuccess: () => {
      alert('방 수정 성공');
      setIsOpen(false);
    },
  });

  const [selectedMode, setSelectedMode] = useState('SENTENCE');

  const randomTitle = useRef(getRandomItem({ items: DEFAULT_TITLES }));

  /* ToDo: getValues로 form 값들 하나씩 말고 한번에 가져와보기 */
  const getRoomSettings = () => {
    const roomSetting: GameRoomCreateRequest = {
      ...getValues(),
      title: getValues('title').trim() || randomTitle.current,
      gameType: selectedMode,
    };

    //getValues로 인하여 password에 빈 문자열이 들어올 수 있음
    if (roomSetting.password !== undefined && !roomSetting.password.length) {
      delete roomSetting.password;
    }

    return roomSetting;
  };

  const onCreateRoom = () => {
    const roomSetting = getRoomSettings();
    if (settingMode === 'Create') {
      mutateCreateGameRoom({ ...roomSetting });
      return;
    }
    mutateUpdateGameRoom({
      roomId,
      gameRoomUpdateRequest: { ...roomSetting },
    });
  };

  return (
    <div className='flex flex-1 w-full text-[1.8rem] pt-[3rem]'>
      <Form.Root
        onSubmit={handleSubmit(onCreateRoom)}
        className='flex flex-col w-1/2 gap-[1rem]'>
        {/* 방이름, 비밀번호 설정 */}
        {CREATE_ROOM_INPUT_LIST.map(
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
                    placeholder={
                      name === 'title' ? randomTitle.current : placeholder
                    }
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
        {/* 인원수, 라운드 설정 */}
        <div className='flex justify-between'>
          {CREATE_ROOM_SELECT_LIST.map(({ name, label, optionValues }) => (
            <Form.Field
              key={name}
              name={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control asChild>
                <select
                  className='border-[0.2rem] border-gray-200 rounded-[0.8rem] px-[0.5rem] ml-[3rem]'
                  {...register(name)}>
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
        {/* 모드 설정 버튼 */}
        <article className='flex flex-col gap-[2rem] pt-[4rem]'>
          {GAME_MODE_LIST.map(({ value, mode }) => (
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
            className='w-[8rem] p-[0.5rem] rounded-[0.8rem] absolute bottom-[2rem] right-[2rem] bg-coral-100 disabled:cursor-not-allowed disabled:opacity-50 transition-all'
            disabled={!isValid}>
            {settingMode === 'Create' ? '방 생성' : '수정'}
          </button>
        </Form.Submit>
      </Form.Root>
      <section className='w-1/2 border-black border-[0.1rem]'>
        이미지 자리
      </section>
    </div>
  );
};

export default CreateRoomForm;
