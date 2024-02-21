import { useMutation } from '@tanstack/react-query';

interface User {
  username: string;
  password: string;
}

interface ResponseData {
  status: number;
  token: string;
}

interface AuthProps {
  onSuccess?: () => void;
}

export const mockLoginApi = (user: User): Promise<ResponseData> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.username === 'guest' && user.password === 'password') {
        resolve({ status: 200, token: '1234567890abcdef' });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 2000);
  });

export const useSignIn = ({ onSuccess }: AuthProps = {}) => {
  return useMutation({
    mutationFn: mockLoginApi,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('token', data.token);

        if (onSuccess) {
          onSuccess();
        }
      }
    },
  });
};
