import { useMutation } from '@tanstack/react-query';
import { enterGameRoom } from '@/apis/api';

interface UseEnterGameRoomProps {
  onSuccess?: () => void;
}

const useEnterGameRoom = ({ onSuccess }: UseEnterGameRoomProps) => {
  return useMutation({
    mutationFn: enterGameRoom,
    mutationKey: ['enterGameRoom'],
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export default useEnterGameRoom;
