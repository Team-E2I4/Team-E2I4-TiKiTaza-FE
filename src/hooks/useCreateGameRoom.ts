import { useMutation } from '@tanstack/react-query';
import { createGameRoom } from '@/apis/api';

interface I_UseCreateGameRoomProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const useCreateGameRoom = ({
  onSuccess,
  onError,
}: I_UseCreateGameRoomProps) => {
  return useMutation({
    mutationFn: createGameRoom,
    mutationKey: ['createGameRoom'],
    onSuccess,
    onError,
  });
};

export default useCreateGameRoom;
