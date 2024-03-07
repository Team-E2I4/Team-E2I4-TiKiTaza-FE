import { useCallback, useEffect, useRef } from 'react';
import car1 from '@/assets/cars/car11.png';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CAR_DIRECTION,
  MAX_X,
  MAX_Y,
  MOVE_STEP,
  START_X,
  START_Y,
} from '@/common/Ingame/ingameConstants';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useCanvas from '@/hooks/useCanvas';

interface I_CarCoord {
  x: number;
  y: number;
}

const GameSentence = () => {
  // 전체영역 캔버스 생성
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });

  const carImageRef = useRef<HTMLImageElement | null>(null);
  const car1Ref = useRef<I_CarCoord>({ x: START_X, y: START_Y });
  // 추후: const carsRef = useRef<I_CarCoord[]>([]);
  const carDirRef = useRef(CAR_DIRECTION.RIGHT); // 자동차가 이동할 방향(상하좌우)

  let isArrived = 0;

  const changeCarDir = useCallback((pos: I_CarCoord) => {
    if (pos.x === START_X && pos.y === START_Y) {
      // eslint-disable-next-line no-console
      console.log('끝!');
      isArrived = 1;
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

  // 자동차 위치 바꾸는 함수
  const updateCarCoord = useCallback(
    (carCoord: I_CarCoord) => {
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
      changeCarDir(carCoord);
    },
    [changeCarDir]
  );

  useEffect(() => {
    // 자동차 이미지 로드
    if (car1) {
      const img = new Image(20, 20); //FIXME: 사이즈 적용안됨.. car1.png를 불러와서 줄이고싶으면?
      img.src = car1;
      img.alt = '자동차';
      carImageRef.current = img;
      car1Ref.current = { x: START_X, y: START_Y };
    }

    //자동차를 화면에 그린다
    let rafTimer: ReturnType<typeof requestAnimationFrame>;
    const coord = car1Ref.current;
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx) {
      return;
    }

    const animate = () => {
      // console.log('ANI');
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 이전 값 삭제
      const car = carImageRef.current;
      if (car) {
        ctx.drawImage(car, coord.x, coord.y); // 위치!px단위
      }
      if (!isArrived) {
        // 도착전까지만 animate를 실행한다.
        rafTimer = requestAnimationFrame(animate);
      }
    };

    rafTimer = requestAnimationFrame(animate);
    return () => {
      rafTimer && cancelAnimationFrame(rafTimer);
    };
  }, []);

  const timerForTest = setInterval(() => {
    updateCarCoord(car1Ref.current);
  }, 1500);
  // console.log('컴포넌트가 렌더링');
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
          <canvas
            ref={canvasRef}
            className='absolute w-full h-full'
          />
          <div className='flex flex-col items-center justify-center z-10'>
            {/* <SentenceNow text={sentenceDummy[idx]} />
            <GameForm
              inputName='sentence'
              sample='gd'
              cpm={cpm}
              accurate={accurate}
              onInputChange={onInputChange}
            />
            <SentenceNext text={sentenceDummy[idx + 1]} />
            <SentenceNext text={sentenceDummy[idx + 2]} /> */}
          </div>
          <div className='w-full flex justify-evenly mt-20'>
            {/* <Dashboard
              type='wpm'
              value={wpmTest}
            />
            <Dashboard
              type='accuracy'
              value={accTest}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSentence;
