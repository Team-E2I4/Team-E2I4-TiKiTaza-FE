import * as Form from '@radix-ui/react-form';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUpdateNickname from '@/hooks/useUpdateNickname';
import useVolumeStore from '@/store/useVolumeStore';
import { NicknamePageProps } from '../NicknamePage';

type UpdateNicknameFormType = {
  nickname: string;
};

interface UpdataeNicknameFormProps {
  onClose: () => void;
}

const UpdateNicknameForm = ({ onClose }: UpdataeNicknameFormProps) => {
  const navigate = useNavigate();
  const { setVolume } = useVolumeStore();
  const queryClient = useQueryClient();

  const profileData = queryClient.getQueryData<NicknamePageProps>([
    'getMyProfileInfo',
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<UpdateNicknameFormType>({
    mode: 'onChange',
    defaultValues: {
      nickname: profileData?.data?.data?.nickname || '',
    },
  });

  const { mutate: mutateUpdateNickname } = useUpdateNickname({
    onSuccess: () => {
      alert('닉네임 변경 성공');
      onClose();
      navigate('/main');
      setVolume({ bgm: 'play', volumeSize: 30 });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError('nickname', {
            type: 'manual',
            message: '이미 사용 중인 닉네임입니다.',
          });
        }
      }
    },
  });

  const onSubmit = () => {
    const nickname = getValues('nickname');
    mutateUpdateNickname({
      nicknameUpdateRequest: {
        nickname,
      },
    });
  };

  return (
    <div>
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4'>
        <Form.Field name='nickname'>
          <Form.Control asChild>
            <input
              type='text'
              {...register('nickname', {
                required: '닉네임은 필수 입력 사항입니다.', // 필수 입력 필드로 설정, 입력하지 않았을 때 메시지 설정
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2자 이상이어야 합니다.', // 최소 길이 설정 및 메시지 설정
                },
                maxLength: {
                  value: 8,
                  message: '닉네임은 최대 8자를 초과할 수 없습니다.', // 최대 길이 설정 및 메시지 설정
                },
                pattern: {
                  value: /^[a-zA-Z0-9가-힣_]+$/, // 정규 표현식 패턴 설정
                  message: '닉네임은 영문, 숫자, 밑줄, 한글만 사용 가능합니다.', // 패턴 불일치 시 메시지 설정
                },
              })}
              placeholder='닉네임을 입력해주세요.'
              className='w-[26rem] h-[3.6rem] p-[1rem] border-[0.2rem] border-gray-200 rounded-[0.8rem] focus:outline-none'
            />
          </Form.Control>
          <span className='block text-[1.3rem] h-[2rem] text-red-500 py-[0.3rem] text-center'>
            {errors['nickname']?.message}
          </span>
        </Form.Field>
        <Form.Submit asChild>
          <button
            type='submit'
            className='w-[7rem] p-[0.5rem] rounded-[0.8rem] bg-coral-100 disabled:cursor-not-allowed disabled:opacity-50 transition-all'
            disabled={!isValid}>
            변경
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default UpdateNicknameForm;
