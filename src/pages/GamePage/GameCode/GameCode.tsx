import { useCallback, useEffect, useMemo, useRef } from 'react';
import car1 from '@/assets/cars/car11.png';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CAR_DIRECTION,
  MAX_X,
  MAX_Y,
  MOVE_STEP_X,
  START_X,
  START_Y,
} from '@/common/Ingame/ingameConstants';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useCanvas from '@/hooks/useCanvas';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import CodeFormContainer from './CodeFormContainer';

interface GameCodeProps extends InagmeWsChildrenProps {
  userId: number;
}
interface I_CarCoord {
  x: number;
  y: number;
}

const GameCode = ({ ingameRoomRes, publishIngame, userId }: GameCodeProps) => {
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });
  const carImageRef = useRef<HTMLImageElement | null>(null);
  const car1Ref = useRef<I_CarCoord>({ x: START_X, y: START_Y });
  // 추후: const carsRef = useRef<I_CarCoord[]>([]);
  const carDirRef = useRef(CAR_DIRECTION.RIGHT);

  // TODO: 추후 서버에서 전달하는 문제를 여기서 꺼내기
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

  const convertedDummyCode = dummyCode.split('\n').map((row) => row.trim());

  const myCurrentScore = useRef(
    ingameRoomRes.allMembers.find(({ memberId }) => memberId === userId)
      ?.score ?? 0
  );

  const totalSpacedWord = useMemo(
    () =>
      convertedDummyCode.reduce((prev, cur) => prev + cur.split(' ').length, 0),
    [convertedDummyCode]
  );
  const scorePerSubmit = useMemo(
    () => Math.floor((1 / totalSpacedWord) * 100),
    [totalSpacedWord]
  );

  const handleUpdateScore = (_isAllSubmitted: boolean) => {
    myCurrentScore.current += scorePerSubmit;
    if (_isAllSubmitted) {
      myCurrentScore.current = 100;
    }
    publishIngame('/info', { currentScore: myCurrentScore.current });
  };

  const blockOverflowPos = useCallback((pos: I_CarCoord) => {
    if (pos.x === START_X && pos.y === START_Y) {
      // eslint-disable-next-line no-console
      console.log('끝!');
      clearInterval(timerForTest);
      return;
    }
    if (pos.x >= MAX_X && carDirRef.current === 'right') {
      carDirRef.current = CAR_DIRECTION.DOWN;
    }
    if (pos.y >= MAX_Y && carDirRef.current === 'down') {
      carDirRef.current = CAR_DIRECTION.LEFT;
    }
    if (pos.x <= 0 && carDirRef.current === 'left') {
      carDirRef.current = CAR_DIRECTION.UP;
    }
    if (pos.y <= 0 && carDirRef.current === 'up') {
      carDirRef.current = CAR_DIRECTION.RIGHT;
    }
    pos.x = Math.max(0, Math.min(pos.x, MAX_X));
    pos.y = Math.max(0, Math.min(pos.y, MAX_Y));
  }, []);

  const updateCarCoord = useCallback(
    (carCoord: I_CarCoord) => {
      const dir = carDirRef.current;
      if (dir === 'right') {
        carCoord.x += MOVE_STEP_X;
      } else if (dir === 'down') {
        carCoord.y += MOVE_STEP_X;
      } else if (dir === 'left') {
        carCoord.x -= MOVE_STEP_X;
      } else {
        carCoord.y -= MOVE_STEP_X; // up
      }
      blockOverflowPos(carCoord);
    },
    [blockOverflowPos]
  );

  const timerForTest = setInterval(() => {
    updateCarCoord(car1Ref.current);
  }, 1500);

  useEffect(() => {
    if (car1) {
      const img = new Image(20, 20); //FIX:사이즈 적용안됨.. car1.png를 불러와서 줄이고싶으면?
      img.src = car1;
      img.alt = '자동차';
      carImageRef.current = img;
      car1Ref.current = { x: START_X, y: START_Y };
    }

    let rafTimer: ReturnType<typeof requestAnimationFrame>;
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
    };
  }, []);

  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[60rem] relative'>
          <div className='absolute w-full h-full rounded-[14rem] border-2 border-black'></div>
          <div className='absolute w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-[14rem] border-2 border-black '></div>
          {/* <canvas
            ref={canvasRef}
            className='absolute w-full h-full'
          /> */}
          <CodeFormContainer
            dummyCode={dummyCode}
            convertedDummyCode={convertedDummyCode}
            handleUpdateScore={handleUpdateScore}
          />
        </div>
      </div>
    </>
  );
};

export default GameCode;
