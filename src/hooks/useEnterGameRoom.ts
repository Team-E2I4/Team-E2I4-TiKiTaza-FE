import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { enterGameRoom } from '@/apis/api';
import { ApiResponseGameRoomEnterResponse, ErrorResponse } from '@/generated';
import { Toast } from '@/utils/toast';

interface UseEnterGameRoomProps {
  onSuccess?: (e: AxiosResponse<ApiResponseGameRoomEnterResponse>) => void;
  onError?: (e: AxiosError<ErrorResponse>) => void;
}

export interface I_UseEnterGameRoomMutation {
  roomId: number;
  password?: string;
}

const useEnterGameRoom = ({ onSuccess, onError }: UseEnterGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseGameRoomEnterResponse>,
    Error | AxiosError<ErrorResponse>,
    I_UseEnterGameRoomMutation
  >({
    mutationFn: ({ roomId, password }: I_UseEnterGameRoomMutation) =>
      enterGameRoom(roomId, { password }),
    mutationKey: ['enterGameRoom'],
    onSuccess: (e) => {
      onSuccess?.(e);
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        Toast.info(`${e.response?.data.errorMessage}`);
        onError?.(e);
      }
    },
    throwOnError: (e) => {
      if (!(e instanceof AxiosError)) {
        return true;
      }
      if (
        e.response?.status === 400 ||
        e.response?.status === 404 ||
        e.response?.status === 409
      ) {
        return false;
      }
      return true;
    },
  });
};

export default useEnterGameRoom;
