import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { updateGameRoom } from '@/apis/api';
import { ApiResponseVoid, GameRoomUpdateRequest } from '@/generated';

interface I_UseUpdateGameRoomMutation {
  roomId: number;
  gameRoomUpdateRequest: GameRoomUpdateRequest;
}

export interface UseUpdateGameRoomProps {
  onSuccess?: (e: AxiosResponse<ApiResponseVoid>) => void;
}

const useUpdateGameRoom = ({ onSuccess }: UseUpdateGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseVoid>,
    Error | AxiosError<ErrorResponse>,
    I_UseUpdateGameRoomMutation,
    unknown
  >({
    mutationFn: ({ roomId, gameRoomUpdateRequest }) =>
      updateGameRoom(roomId, gameRoomUpdateRequest),
    mutationKey: ['updateGameRoom'],
    onSuccess: (e) => {
      onSuccess?.(e);
    },
    throwOnError: true,
  });
};

export default useUpdateGameRoom;
