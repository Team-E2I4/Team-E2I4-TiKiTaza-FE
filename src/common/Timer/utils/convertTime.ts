import { SECOND } from '@/hooks/useTimer';

export const convertTime = (time: number) => {
  return (
    String(Math.floor(time / SECOND / 60)).padStart(2, '0') +
    ':' +
    String((time / SECOND) % 60).padStart(2, '0')
  );
};
