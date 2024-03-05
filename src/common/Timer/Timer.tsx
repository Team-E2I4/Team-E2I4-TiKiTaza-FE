import { useEffect, useRef, useState } from 'react';

interface TimerProps {
  minutes: number;
  seconds: number;
}

const MS = 1000;
const MIN_MS = 60 * MS;

const convertTime = (time: number) => {
  return (
    String(Math.floor(time / MS / 60)).padStart(2, '0') +
    ':' +
    String((time / MS) % 60).padStart(2, '0')
  );
};

const Timer = ({ minutes = 0, seconds = 0 }: TimerProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MIN_MS + seconds * MS
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
      setTimeLeft(0);
      //TODO: 타이머 끝난 후 진행하는 이벤트
      alert('타이머 끝났어요!');
    }
  }, [timeLeft]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - MS);
    }, MS);

    return () => {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Timer</h1>
      <h2>{convertTime(timeLeft)}</h2>
    </div>
  );
};

export default Timer;
