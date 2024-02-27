import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { enterGameRoom } from '@/apis/api';
import { ApiResponseGameRoomEnterResponse } from '@/generated';

interface UseEnterGameRoomProps {
  onSuccess?: () => void;
}

export interface I_UseEnterGameRoomMutation {
  roomId: number;
  password?: string;
}

const useEnterGameRoom = ({ onSuccess }: UseEnterGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseGameRoomEnterResponse>,
    Error,
    I_UseEnterGameRoomMutation
  >({
    mutationFn: ({ roomId, password }: I_UseEnterGameRoomMutation) =>
      enterGameRoom(roomId, { password }),
    mutationKey: ['enterGameRoom'],
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export default useEnterGameRoom;
