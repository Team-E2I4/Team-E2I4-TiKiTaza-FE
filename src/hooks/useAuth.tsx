import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMyProfileInfo } from '@/apis/api';
import { ApiResponseAccountGetResponse, ErrorResponse } from '@/generated';
import { guestLoginFn } from '@/pages/StartPage/guestLoginFn';
import storageFactory from '@/utils/storageFactory';

export interface AuthProps {
  onSuccess?: () => void;
}

const { setItem, getItem } = storageFactory(localStorage);

export const useGuestLogin = ({ onSuccess }: AuthProps = {}) => {
  return useMutation({
    mutationFn: guestLoginFn,
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        setItem('MyToken', response.data.accessToken);
      }

      onSuccess?.();
    },
  });
};

export const useAuthCheck = () => {
  return useQuery<
    AxiosResponse<ApiResponseAccountGetResponse>,
    Error | AxiosError<ErrorResponse>
  >({
    queryFn: getMyProfileInfo,
    queryKey: ['getMyProfileInfo'],
    retryOnMount: false,
    gcTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!getItem('MyToken', ''),
    throwOnError: (e) => {
      if (!(e instanceof AxiosError)) {
        return true;
      }
      if (
        e.response?.status === 400 ||
        e.response?.status === 401 ||
        e.response?.status === 404 ||
        e.response?.status === 409
      ) {
        return false;
      }
      return true;
    },
  });
};
