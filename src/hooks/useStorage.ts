interface UseStorageProps {
  storage: Storage;
}

const useStorage = ({ storage }: UseStorageProps) => {
  const getItem = <D>(key: string, defaultValue: D | unknown) => {
    try {
      const storedValue = storage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return defaultValue;
    } catch (e) {
      if (e instanceof Error) {
        alert(`${storage}에서 아이템 꺼내는 도중 오류 발생 ${e.message}`);
      }
    }
  };

  const setItem = <V>(key: string, value: V | unknown) => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e instanceof Error) {
        alert(`${storage}에 아이템 넣는중 도중 오류 발생 ${e.message}`);
      }
    }
  };

  const removeItem = (key: string) => {
    try {
      storage.removeItem(key);
    } catch (e) {
      if (e instanceof Error) {
        alert(`${storage}에서 아이템 삭제하는중 오류 발생 ${e.message}`);
      }
    }
  };

  return { getItem, setItem, removeItem };
};

export default useStorage;
