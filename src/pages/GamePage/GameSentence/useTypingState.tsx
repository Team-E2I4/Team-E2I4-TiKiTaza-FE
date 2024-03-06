import { KeyboardEvent, useState } from 'react';

const blockedKeys: Record<string, boolean> = {
  ArrowLeft: true,
  ArrowUp: true,
  ArrowRight: true,
  ArrowDown: true,
  Delete: true,
};

const useTypingState = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [totalKeyDown, setTotalKeyDown] = useState(0);
  const [correctKeyDown, setCorrectKeyDown] = useState(0);
  const [accurate, setAccurate] = useState(0);
  const [cpm, setCpm] = useState(0);

  const startTyping = () => {
    setStartTime(new Date());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (blockedKeys[e.key]) {
      e.preventDefault();
    }
    if (e.key === 'Backspace') {
      setTotalKeyDown(0);
      setCorrectKeyDown(0);
      setCpm(0);
      setAccurate(0);
    }
  };

  const onInputChange = (isCorrectKey: boolean, didTypo: boolean) => {
    if (!didTypo) {
      setTotalKeyDown((prevKeyDown) => prevKeyDown + 1);
    }
    if (isCorrectKey) {
      setCorrectKeyDown((prevCorrectKeyDown) => prevCorrectKeyDown + 1);
    }

    if (!startTime) {
      startTyping();
      return;
    }

    const endTime = new Date();
    const elapsedTimeInSeconds =
      (endTime.getTime() - startTime.getTime()) / 1000;
    let calculatedTypingSpeed = (totalKeyDown / elapsedTimeInSeconds) * 60;
    let calculatedAccuracy = (correctKeyDown / totalKeyDown) * 100;

    calculatedTypingSpeed = Number.isNaN(calculatedTypingSpeed)
      ? 0
      : Math.floor(calculatedTypingSpeed);

    calculatedAccuracy = Number.isNaN(calculatedAccuracy)
      ? 0
      : Math.floor(calculatedAccuracy);

    setCpm(calculatedTypingSpeed);
    setAccurate(calculatedAccuracy);
  };

  const initializeTyping = () => {
    setStartTime(null);
    setTotalKeyDown(0);
    setCorrectKeyDown(0);
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
