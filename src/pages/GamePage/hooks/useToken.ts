import storageFactory from '@/utils/storageFactory';

export const useToken = () => {
  const { getItem } = storageFactory(localStorage);
  const token = getItem('MyToken', '');
  const connectHeaders = {
    Authorization: `Bearer ${token}`,
  };

  return { connectHeaders };
};
