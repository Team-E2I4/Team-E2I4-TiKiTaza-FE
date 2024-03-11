import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { createGameRoom } from '@/apis/api';
import {
  ApiResponseGameRoomCreateResponse,
  GameRoomCreateRequest,
} from '@/generated';

export interface UseCreateGameRoomProps {
  onSuccess?: (e: AxiosResponse<ApiResponseGameRoomCreateResponse>) => void;
}

const useCreateGameRoom = ({ onSuccess }: UseCreateGameRoomProps) => {
  return useMutation<
    AxiosResponse<ApiResponseGameRoomCreateResponse>,
    Error | AxiosError,
    GameRoomCreateRequest,
    unknown
  >({
    mutationFn: createGameRoom,
    mutationKey: ['createGameRoom'],
    onSuccess: (e) => {
      onSuccess?.(e);
    },
    throwOnError: true,
  });
};

export default useCreateGameRoom;
