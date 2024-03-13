import { useEffect, useRef, useState } from 'react';

export const SEC_MS = 1000;
export const MIN_MS = 60 * SEC_MS;

interface TimerProps {
  minutes: number;
  seconds: number;
  onFinishRound: () => void;
}

// 커스텀 훅 useTimer 정의
const useTimer = ({ minutes = 0, seconds = 0, onFinishRound }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MIN_MS + seconds * SEC_MS
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current!);
      onFinishRound();
      // 여기서는 시간이 0이 되었을 때의 로직만 처리합니다.
    }
  }, [timeLeft]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 타이머를 초기화하는 로직
  const resetTimer = () => {
    setTimeLeft(minutes * MIN_MS + seconds * SEC_MS);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    // 타이머 다시 시작
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);
  };

  return { timeLeft, resetTimer };
};

export default useTimer;
