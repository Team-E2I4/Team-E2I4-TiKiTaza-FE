import storageFactory from '@/utils/storageFactory';

export const getTokenStorage = () => {
  const { getItem: getSessionItem } = storageFactory(sessionStorage);
  if (getSessionItem('MyToken', '')) {
    return storageFactory(sessionStorage);
  }
  return storageFactory(localStorage);
};
