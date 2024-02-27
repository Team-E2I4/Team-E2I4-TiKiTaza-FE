import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosPromise } from 'axios';
import { getMyProfileInfo } from '@/apis/api';
import { ApiResponseAccountGetResponse, ErrorResponse } from '@/generated';
import { guestLoginFn } from '@/pages/StartPage/guestLoginFn';
import storageFactory from '@/utils/storageFactory';

export interface AuthProps {
  onSuccess?: () => void;
}

const { setItem } = storageFactory(localStorage);

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

/*
페이지 이동할때마다 새로 쿼리를 업데이트함. => 이동할때마다 인증처리 + 본인정보 저장
캐시타임을 짧게 가져간다
*/
export const useAuthCheck = () => {
  return useQuery<
    AxiosPromise<ApiResponseAccountGetResponse>,
    Error | AxiosError<ErrorResponse>
  >({
    queryFn: getMyProfileInfo,
    queryKey: ['getMyProfileInfo'],
    retryOnMount: false,
    gcTime: 0,
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
