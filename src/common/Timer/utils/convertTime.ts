import { MS } from '../constants/time';

export const convertTime = (time: number) => {
  return (
    String(Math.floor(time / MS / 60)).padStart(2, '0') +
    ':' +
    String((time / MS) % 60).padStart(2, '0')
  );
};
