import { useMutation } from '@tanstack/react-query';
import { guestLoginFn } from '@/pages/StartPage/guestLoginFn';

export interface AuthProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useGuestLogin = ({ onSuccess, onError }: AuthProps = {}) => {
  return useMutation({
    mutationFn: guestLoginFn,
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        // 방어코드
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      // if (response?.data?.refreshToken) {
      //   // 방어코드
      //   localStorage.setItem('refreshToken', response.data.refreshToken);
      // }

      if (onSuccess) {
        onSuccess();
      }

      if (onError) {
        onError(response);
      }
    },
  });
};
