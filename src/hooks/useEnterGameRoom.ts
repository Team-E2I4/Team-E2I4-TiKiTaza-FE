import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { enterGameRoom } from '@/apis/api';
import { ApiResponseGameRoomEnterResponse, ErrorResponse } from '@/generated';

interface UseEnterGameRoomProps {
  onSuccess?: (e: AxiosResponse<ApiResponseGameRoomEnterResponse>) => void;
  onError?: (e: AxiosError<ErrorResponse>) => void;
}

export interface I_UseEnterGameRoomMutation {
  roomId: number;
  password?: string;
}

const useEnterGameRoom = ({ onSuccess, onError }: UseEnterGameRoomProps) => {
  const navigate = useNavigate();
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
        alert(e.response?.data.errorMessage);
        navigate(0);
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
