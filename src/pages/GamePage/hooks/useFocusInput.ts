import { useEffect, useRef } from 'react';

const useFocusInput = (isFocus: boolean) => {
  const focusInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isFocus || !focusInput.current) {
      return;
    }
    focusInput.current.focus();
    return () => {
      focusInput.current = null;
    };
  }, [isFocus]);

  return { focusInput };
};

export default useFocusInput;
