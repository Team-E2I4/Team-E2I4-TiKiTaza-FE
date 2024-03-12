import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { updateMemberNickname } from '@/apis/api';
import { ApiResponseVoid, NicknameUpdateRequest } from '@/generated';

interface I_UseUpdateNicknameMutation {
  nicknameUpdateRequest: NicknameUpdateRequest;
}

interface UseUpdateNicknameProps {
  onSuccess?: (e: AxiosResponse<ApiResponseVoid>) => void;
}

const useUpdateNickname = ({ onSuccess }: UseUpdateNicknameProps) => {
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
    throwOnError: true,
  });
};

export default useUpdateNickname;
