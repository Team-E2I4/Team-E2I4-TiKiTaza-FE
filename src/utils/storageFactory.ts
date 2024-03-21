import { checkIsJson } from './checkIsJson';
import { Toast } from './toast';

const storageFactory = (storage: Storage) => {
  const getItem = <D>(key: string, defaultValue: D | unknown) => {
    try {
      const storedValue = storage.getItem(key);
      if (storedValue) {
        return checkIsJson(storedValue) ? JSON.parse(storedValue) : storedValue;
      }
      return defaultValue;
    } catch (e) {
      if (e instanceof Error) {
        Toast.error(`${storage}에서 아이템 꺼내는 도중 오류 발생 ${e.message}`);
      }
    }
  };

  const setItem = <V>(key: string, value: V | unknown) => {
    try {
      storage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
    } catch (e) {
      if (e instanceof Error) {
        Toast.error(`${storage}에 아이템 넣는중 도중 오류 발생 ${e.message}`);
      }
    }
  };

  const removeItem = (key: string) => storage.removeItem(key);

  return { getItem, setItem, removeItem };
};

export default storageFactory;
