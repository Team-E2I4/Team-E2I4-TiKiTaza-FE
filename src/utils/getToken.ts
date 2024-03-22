import { getTokenStorage } from '@/apis/tokenStorage';

export const getToken = () => {
  const { getItem } = getTokenStorage();
  const token = getItem('MyToken', '');
  const connectHeaders = {
    Authorization: `Bearer ${token}`,
  };

  return connectHeaders;
};
