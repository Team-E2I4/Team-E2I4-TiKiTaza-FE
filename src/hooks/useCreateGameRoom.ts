import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { createGameRoom } from '@/apis/api';
import {
  ApiResponseGameRoomCreateResponse,
  GameRoomCreateRequest,
} from '@/generated';

interface I_UseCreateGameRoomProps {
  onSuccess?: () => void;
  onError?: (e: Error | AxiosError) => void;
}

const useCreateGameRoom = ({
  onSuccess,
  onError,
}: I_UseCreateGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseGameRoomCreateResponse>,
    Error | AxiosError,
    GameRoomCreateRequest,
    unknown
  >({
    mutationFn: createGameRoom,
    mutationKey: ['createGameRoom'],
    onSuccess,
    onError: (e) => onError?.(e),
  });
};

export default useCreateGameRoom;
