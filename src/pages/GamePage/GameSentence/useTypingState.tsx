import { useState } from 'react';

const useTypingState = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [totalKeyDown, setTotalKeyDown] = useState(0);
  const [correctKeyDown, setCorrectKeyDown] = useState(0);
  const [accurate, setAccurate] = useState(0);
  const [cpm, setCpm] = useState(0);

  const startTyping = () => {
    setStartTime(new Date());
  };

  const onKeyDown = () => setTotalKeyDown((prevKeyDown) => prevKeyDown + 1);

  const onInputChange = (isCorrectKey: boolean) => {
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
    const calculatedTypingSpeed = (totalKeyDown / elapsedTimeInSeconds) * 60;
    const calculatedAccuracy = (correctKeyDown / totalKeyDown) * 100;

    setCpm(Math.floor(calculatedTypingSpeed));
    setAccurate(Math.floor(calculatedAccuracy));
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
    onKeyDown,
    onInputChange,
    cpm,
    accurate,
  };
};

export default useTypingState;
