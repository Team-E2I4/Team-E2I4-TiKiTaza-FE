import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ApiResponseVoid>,
    Error | AxiosError,
    I_UseUpdateNicknameMutation
  >({
    mutationFn: ({ nicknameUpdateRequest }) =>
      updateMemberNickname(nicknameUpdateRequest),
    mutationKey: ['updateNickname'],
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ['getMyProfileInfo'] });
      onSuccess?.(e);
    },
    onError: (e) => {
      onError?.(e);
    },
    throwOnError: true,
  });
};

export default useUpdateNickname;
