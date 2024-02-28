import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMyProfileInfo, guestLogin } from '@/apis/api';
import {
  ApiResponseAccountGetResponse,
  ApiResponseAuthResponse,
  ErrorResponse,
} from '@/generated';
import storageFactory from '@/utils/storageFactory';

export interface AuthProps {
  onSuccess?: (e: AxiosResponse<ApiResponseAuthResponse>) => void;
}

const { setItem, getItem } = storageFactory(localStorage);

export const useGuestLogin = ({ onSuccess }: AuthProps = {}) => {
  return useMutation<
    AxiosResponse<ApiResponseAuthResponse>,
    Error | AxiosError
  >({
    mutationFn: guestLogin,
    mutationKey: ['guestLogin'],
    onSuccess: (e) => {
      const token = e.data.data?.accessToken;

      if (token) {
        setItem('MyToken', token);
      }

      onSuccess?.(e);
    },
    throwOnError: (e) => {
      if (!(e instanceof AxiosError)) {
        return true;
      }
      if (
        e.response?.status === 400 ||
        e.response?.status === 401 ||
        e.response?.status === 403 ||
        e.response?.status === 500
      ) {
        return false;
      }
      return true;
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
