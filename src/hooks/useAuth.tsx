import { useMutation } from '@tanstack/react-query';
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

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
