import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { updateMemberNickname } from '@/apis/api';
import { ApiResponseVoid, NicknameUpdateRequest } from '@/generated';

interface I_UseUpdateNicknameMutation {
  nicknameUpdateRequest: NicknameUpdateRequest;
}

interface UseUpdateNicknameProps {
  onSuccess?: (e: AxiosResponse<ApiResponseVoid>) => void;
  onError?: (e: Error | AxiosError) => void;
}

const useUpdateNickname = ({ onSuccess, onError }: UseUpdateNicknameProps) => {
  return useMutation<
    AxiosResponse<ApiResponseVoid>,
    Error | AxiosError,
    I_UseUpdateNicknameMutation
  >({
    mutationFn: ({ nicknameUpdateRequest }) =>
      updateMemberNickname(nicknameUpdateRequest),
    mutationKey: ['updateNickname'],
    onSuccess: (e) => {
      onSuccess?.(e);
    },
    onError: (e) => {
      onError?.(e);
    },
    throwOnError: true,
  });
};

export default useUpdateNickname;
