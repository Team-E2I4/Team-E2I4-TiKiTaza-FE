import { KeyboardEvent, useCallback, useState } from 'react';

const blockedKeys: Record<string, boolean> = {
  ArrowLeft: true,
  ArrowUp: true,
  ArrowRight: true,
  ArrowDown: true,
  Delete: true,
};

const useTypingState = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [accurate, setAccurate] = useState(0);
  const [cpm, setCpm] = useState(0);
  const startTyping = () => {
    setStartTime(new Date());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (blockedKeys[e.key] || e.ctrlKey || e.altKey || e.metaKey) {
      e.preventDefault();
    }
    if (e.key === 'Backspace') {
      onInputChange(0, 0);
    }
  };

  const onInputChange = useCallback(
    (totalCharCompleted: number, totalChar: number) => {
      if (!startTime) {
        startTyping();
        return;
      }

      const endTime = new Date();
      const elapsedTimeInSeconds =
        (endTime.getTime() - startTime.getTime()) / 1000;

      let calculatedTypingSpeed =
        (totalCharCompleted / elapsedTimeInSeconds) * 200;
      let calculatedAccuracy = (totalCharCompleted / totalChar) * 100;

      calculatedTypingSpeed = Number.isNaN(calculatedTypingSpeed)
        ? 0
        : Math.floor(calculatedTypingSpeed);

      calculatedAccuracy = Number.isNaN(calculatedAccuracy)
        ? 0
        : Math.floor(calculatedAccuracy);

      setCpm(calculatedTypingSpeed);
      setAccurate(calculatedAccuracy);
    },
    [startTime]
  );

  const initializeTyping = () => {
    setStartTime(null);
    setCpm(0);
    setAccurate(0);
  };

  return {
    initializeTyping,
    onInputChange,
    cpm,
    accurate,
    onKeyDown,
  };
};

export default useTypingState;
