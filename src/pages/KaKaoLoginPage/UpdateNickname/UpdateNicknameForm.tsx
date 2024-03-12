import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';
import useUpdateNickname from '@/hooks/useUpdateNickname';

const UpdateNicknameForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
    getValues,
  } = useForm();

  const { mutate: mutateUpdateNickname } = useUpdateNickname({
    onSuccess: () => {
      alert('닉네임 변경 성공');
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
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name='nickname'>
          <Form.Control asChild>
            <input
              type='text'
              {...register('nickname', { required: true })}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button>변경</button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default UpdateNicknameForm;
