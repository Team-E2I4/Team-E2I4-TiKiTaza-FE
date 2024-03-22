import storageFactory from '@/utils/storageFactory';

export const getTokenStorage = () => {
  const { getItem: localGetItem } = storageFactory(localStorage);
  const { getItem: sessionGetItem } = storageFactory(sessionStorage);
  if (localGetItem('MyToken', '')) {
    return localStorage;
  } else if (sessionGetItem('MyToken', '')) {
    return sessionStorage;
  } else {
    return localStorage; // 기본값으로 localStorage 설정
  }
};
