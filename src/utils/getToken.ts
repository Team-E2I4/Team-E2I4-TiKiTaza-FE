import storageFactory from '@/utils/storageFactory';

export const getToken = () => {
  const { getItem } = storageFactory(localStorage);
  const token = getItem('MyToken', '');
  const connectHeaders = {
    Authorization: `Bearer ${token}`,
  };

  return connectHeaders;
};
