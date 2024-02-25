import { useMutation } from '@tanstack/react-query';
import { createGameRoom } from '@/apis/api';

const useCreateGameRoom = () => {
  const { data, mutate, error, isSuccess } = useMutation({
    mutationFn: createGameRoom,
    mutationKey: ['createGameRoom'],
  });

  return { data, mutate, error, isSuccess };
};

export default useCreateGameRoom;
