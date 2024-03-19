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
  const [totalCpm, setTotalCpm] = useState<number[]>([0]);
  const [totalAccurate, setTotalAccurate] = useState<number[]>([0]);

  const averageCpm =
    totalCpm.reduce((acc, cur) => acc + cur, 0) / totalCpm.length;

  const averageAccurate =
    totalAccurate.reduce((acc, cur) => acc + cur, 0) / totalAccurate.length;

  const startTyping = () => {
    setStartTime(new Date());
  };

  const onInputChange = useCallback(
    (totalCharCompleted: number, totalChar: number, TYPING_CONSTANT = 200) => {
      if (!startTime) {
        startTyping();
        return;
      }

      const endTime = new Date();
      const elapsedTimeInSeconds =
        (endTime.getTime() - startTime.getTime()) / 1000;
      let calculatedTypingSpeed =
        (totalCharCompleted / elapsedTimeInSeconds) * TYPING_CONSTANT;
      let calculatedAccuracy = (totalCharCompleted / totalChar) * 100;

      calculatedTypingSpeed = Number.isNaN(calculatedTypingSpeed)
        ? 0
        : Math.floor(calculatedTypingSpeed);

      calculatedAccuracy = Number.isNaN(calculatedAccuracy)
        ? 0
        : Math.floor(calculatedAccuracy);

      setCpm(calculatedTypingSpeed);
      setAccurate(calculatedAccuracy);

      if (
        calculatedAccuracy > 0 &&
        calculatedTypingSpeed > 0 &&
        !Number.isNaN(calculatedTypingSpeed) &&
        !Number.isNaN(calculatedAccuracy)
      ) {
        setTotalAccurate((prev) => [...prev, calculatedAccuracy]);
        setTotalCpm((prev) => [...prev, calculatedTypingSpeed]);
      }
    },
    [startTime]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (blockedKeys[e.key] || e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault();
      }
      if (e.key === 'Backspace') {
        onInputChange(0, 0);
      }
    },
    [onInputChange]
  );

  const initializeTyping = useCallback(() => {
    setCpm(0);
    setAccurate(0);
    setStartTime(null);
  }, []);

  const initializeAverage = useCallback(() => {
    setTotalCpm([0]);
    setTotalAccurate([0]);
  }, []);

  return {
    initializeTyping,
    initializeAverage,
    onInputChange,
    cpm,
    accurate,
    onKeyDown,
    averageCpm: isFinite(averageCpm) ? +averageCpm.toFixed(1) : 0,
    averageAccurate: isFinite(averageAccurate)
      ? +averageAccurate.toFixed(1)
      : 0,
  };
};

export default useTypingState;
