import { SEC_MS } from '@/hooks/useTimer';

export const convertTime = (time: number) => {
  const minutes = Math.floor(time / SEC_MS / 60); // 분
  const seconds = Math.floor((time / SEC_MS) % 60); // 초
  const frames = Math.floor((time % SEC_MS) / 10); // 프레임

  const MMSS = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // MM:SS
  const MMSSFF = `${MMSS}:${String(frames).padStart(2, '0')}`; // MM:SS:FF
  return { MMSS, MMSSFF };
};
