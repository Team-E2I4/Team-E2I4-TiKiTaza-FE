import { useCallback, useEffect, useRef, useState } from 'react';

export const SECOND = 1000;
export const MIN_SECOND = 60 * SECOND;

interface TimerProps {
  minutes?: number;
  seconds: number;
  onTimeFinish?: () => void;
  autoStart?: boolean;
}

// 커스텀 훅 useTimer 정의
const useTimer = ({
  minutes = 0,
  seconds = 0,
  onTimeFinish,
  autoStart = true,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MIN_SECOND + seconds * SECOND
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - SECOND);
    }, SECOND);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current!);
      onTimeFinish?.();
      // 여기서는 시간이 0이 되었을 때의 로직만 처리합니다.
    }
  }, [timeLeft]);

  useEffect(() => {
    autoStart && startTimer();
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 타이머를 초기화하는 로직
  const resetTimer = () => {
    setTimeLeft(minutes * MIN_SECOND + seconds * SECOND);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    // 타이머 다시 시작
    autoStart && startTimer();
  };

  return { timeLeft, resetTimer, startTimer };
};

export default useTimer;
