import { useCallback, useEffect, useRef } from 'react';
import Highlight from 'react-highlight';
import car1 from '@/asssets/cars/car11.png';
import Dashboard from '@/common/Ingame/Dashboard';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_X,
  MAX_Y,
  MOVE_STEP,
  START_X,
} from '@/common/Ingame/ingameConstants';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useCanvas from '@/hooks/useCanvas';

const GameContainer = () => {
  const dummyCode = `function dfs(graph, start, visited) {
    const stack = [];
    stack.push(start);
    while (stack.length) {
      let v = stack.pop();
      if (!visited[v]) {
        console.log(v);
        visited[v] = true;
        for (let node of graph[v]) {
          if (!visited[node]) {
            stack.push(node);
          }
        }
      }
    }
  }`;
  return (
    <>
      <div className='w-[60rem] select-none'>
        <Highlight className='javascript'>{dummyCode}</Highlight>
      </div>
    </>
  );
};
const GameCodePage = () => {
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });

  interface ICarCoord {
    x: number;
    y: number;
  }
  const carImageRef = useRef<HTMLImageElement | null>(null);
  const car1Ref = useRef<ICarCoord>({ x: START_X, y: 0 });
  // 추후: const carsRef = useRef<ICarCoord[]>([]);
  const carDirRef = useRef('right');

  const blockOverflowPos = useCallback((pos: ICarCoord) => {
    if (pos.x === START_X && pos.y === 0) {
      // eslint-disable-next-line no-console
      console.log('끝!');
      clearInterval(timerForTest);
      return;
    }
    if (pos.x >= MAX_X && carDirRef.current === 'right') {
      carDirRef.current = 'down';
    }
    if (pos.y >= MAX_Y && carDirRef.current === 'down') {
      carDirRef.current = 'left';
    }
    if (pos.x <= 0 && carDirRef.current === 'left') {
      carDirRef.current = 'up';
    }
    if (pos.y <= 0 && carDirRef.current === 'up') {
      carDirRef.current = 'right';
    }
    pos.x = pos.x >= MAX_X ? MAX_X : pos.x < 0 ? 0 : pos.x;
    pos.y = pos.y >= MAX_Y ? MAX_Y : pos.y < 0 ? 0 : pos.y;
  }, []);
  const updateCarCoord = useCallback(
    (carCoord: ICarCoord) => {
      const dir = carDirRef.current;
      if (dir === 'right') {
        carCoord.x += MOVE_STEP;
      } else if (dir === 'down') {
        carCoord.y += MOVE_STEP;
      } else if (dir === 'left') {
        carCoord.x -= MOVE_STEP;
      } else {
        carCoord.y -= MOVE_STEP; // up
      }
      blockOverflowPos(carCoord);
    },
    [blockOverflowPos]
  );
  useEffect(() => {
    if (car1) {
      const img = new Image(20, 20); //FIX:사이즈 적용안됨.. car1.png를 불러와서 줄이고싶으면?
      img.src = car1;
      img.alt = '자동차';
      carImageRef.current = img;
      car1Ref.current = { x: START_X, y: 0 };
    }

    let rafTimer: number | undefined;
    const coord = car1Ref.current;
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx) {
      return;
    }
    const animate = () => {
      const car = carImageRef.current;
      if (car) {
        ctx.drawImage(car, coord.x, coord.y); // 위치!px단위
      }
      rafTimer = requestAnimationFrame(animate);
    };
    rafTimer = requestAnimationFrame(animate);
    return () => {
      rafTimer && cancelAnimationFrame(rafTimer);
      rafTimer = undefined;
    };
  });
  const timerForTest = setInterval(() => {
    updateCarCoord(car1Ref.current);
  }, 1500);
  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] relative z-[2]'>
          <div className='absolute w-full h-full z-[2] rounded-[14rem] border-2 border-black'></div>
          <div className='absolute w-[calc(100%-5rem)] h-[calc(100%-5rem)] z-[2] rounded-[14rem] border-2 border-black '></div>
          <canvas
            ref={canvasRef}
            className='absolute w-full h-full z-[-1]'
          />
          <div className='flex items-end gap-4'>
            <Dashboard
              type='wpm'
              value={90}
            />
            <GameContainer />
            <Dashboard
              type='accuracy'
              value={100}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCodePage;
