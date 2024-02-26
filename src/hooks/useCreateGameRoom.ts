import { useMutation } from '@tanstack/react-query';
import { createGameRoom } from '@/apis/api';

const useCreateGameRoom = () => {
  return useMutation({
    mutationFn: createGameRoom,
    mutationKey: ['createGameRoom'],
  });
};

export default useCreateGameRoom;
