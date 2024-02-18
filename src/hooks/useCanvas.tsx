// 캔버스를 생성하는 훅
// 캔버스를 생성하고 생성된 캔버스 요소의 ref를 반환하자

import { useEffect, useRef } from 'react';

interface UseCanvasProps {
  setCanvas: (canvas: HTMLCanvasElement) => void;
}
const useCanvas = ({ setCanvas }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    setCanvas(canvas);
  }, []);
  return canvasRef;
};

export default useCanvas;
