import { useEffect, useRef } from 'react';
import useIngameStore from '@/store/useIngameStore';

const useFocusInput = () => {
  const focusInput = useRef<HTMLInputElement | null>(null);

  const { isRoundWaiting } = useIngameStore();

  useEffect(() => {
    if (isRoundWaiting || !focusInput.current) {
      return;
    }
    focusInput.current.focus();
    return () => {
      focusInput.current = null;
    };
  }, [isRoundWaiting]);

  return { focusInput };
};

export default useFocusInput;
