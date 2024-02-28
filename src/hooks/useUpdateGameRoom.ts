import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { updateGameRoom } from '@/apis/api';
import { ApiResponseVoid, GameRoomUpdateRequest } from '@/generated';
import { UseEnterGameRoomProps } from './useEnterGameRoom';

interface I_UseUpdateGameRoomMutation {
  roomId: number;
  gameRoomUpdateRequest: GameRoomUpdateRequest;
}

const useUpdateGameRoom = ({ onSuccess, onError }: UseEnterGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseVoid>,
    Error | AxiosError<ErrorResponse>,
    I_UseUpdateGameRoomMutation
  >({
    mutationFn: ({ roomId, gameRoomUpdateRequest }) =>
      updateGameRoom(roomId, gameRoomUpdateRequest),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
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

export default useUpdateGameRoom;
