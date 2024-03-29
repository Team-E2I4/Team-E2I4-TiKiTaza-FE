import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import {
  getMyProfileInfo,
  guestLogin,
  kakaoLogin,
  logout,
  logout1,
} from '@/apis/api';
import {
  ApiResponseAccountGetResponse,
  ApiResponseAuthResponse,
  ApiResponseVoid,
  ErrorResponse,
} from '@/generated';
import storageFactory from '@/utils/storageFactory';
import { MINUTE } from './constants';

export interface AuthProps {
  onSuccess?: (e: AxiosResponse<ApiResponseAuthResponse>) => void;
  onError?: (e: AxiosError) => void;
}

interface LogoutProps {
  onSuccess?: (e: AxiosResponse<ApiResponseVoid>) => void;
}

const {
  setItem: localSetItem,
  getItem: localGetItem,
  removeItem: localRemoveItem,
} = storageFactory(localStorage);
const {
  setItem: sessionSetItem,
  getItem: sessionGetItem,
  removeItem: sessionRemoveItem,
} = storageFactory(sessionStorage);

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
        sessionSetItem('MyToken', token);
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

export const useKaKaoLogin = ({ onSuccess }: AuthProps = {}) => {
  return useMutation<
    AxiosResponse<ApiResponseAuthResponse>,
    Error | AxiosError,
    string
  >({
    mutationFn: kakaoLogin,
    mutationKey: ['kakaoLogin'],
    onSuccess: (e) => {
      const token = e.data.data?.accessToken;

      if (token) {
        localSetItem('MyToken', token);
      }

      onSuccess?.(e);
    },
    onError: (e) => {
      throw new Error(e.message);
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

export const useLogout = ({ onSuccess }: LogoutProps) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ApiResponseVoid>, Error | AxiosError>({
    mutationFn: () => logout(),
    mutationKey: ['logout'],
    onSuccess: (e) => {
      localRemoveItem('MyToken');

      queryClient.invalidateQueries({ queryKey: ['getMyProfileInfo'] });

      onSuccess?.(e);
    },
  });
};

export const useGuestLogout = ({ onSuccess }: LogoutProps) => {
  return useMutation<AxiosResponse<ApiResponseVoid>, Error | AxiosError>({
    mutationFn: () => logout1(),
    mutationKey: ['logout'],
    onSuccess: (e) => {
      sessionRemoveItem('MyToken');

      onSuccess?.(e);
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
    gcTime: MINUTE * 15,
    staleTime: MINUTE * 10,
    refetchOnWindowFocus: false,
    enabled: !!sessionGetItem('MyToken', '') || !!localGetItem('MyToken', ''),
    meta: {
      errorMessage: 'failed to fetch getMyProfile',
    },
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
