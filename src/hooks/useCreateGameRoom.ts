import { AxiosError, AxiosResponse } from 'axios';
import { createGameRoom } from '@/apis/api';
import {
  ApiResponseGameRoomCreateResponse,
  GameRoomCreateRequest,
} from '@/generated';
import { useDebouncedMutation } from './useDebouncedMutation';

export interface UseCreateGameRoomProps {
  onSuccess?: (e: AxiosResponse<ApiResponseGameRoomCreateResponse>) => void;
}

const useCreateGameRoom = ({ onSuccess }: UseCreateGameRoomProps) => {
  return useDebouncedMutation<
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
