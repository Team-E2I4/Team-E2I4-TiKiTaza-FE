import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import GameFormContainer from './GameFormContainer';

const GameSentence = ({
  ingameRoomRes,
  publishIngame,
}: InagmeWsChildrenProps) => {
  //이하 임의값 테스트 코드입니다

  // eslint-disable-next-line no-console
  console.log(ingameRoomRes, publishIngame); //unused disable용 콘솔입니다.

  // 전체영역 캔버스 생성
  /*   const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });

  interface I_CarCoord {
    x: number;
    y: number;
  }
  const carImageRef = useRef<HTMLImageElement | null>(null);
  const car1Ref = useRef<I_CarCoord>({ x: START_X, y: START_Y });
  // 추후: const carsRef = useRef<I_CarCoord[]>([]);
  const carDirRef = useRef(CAR_DIRECTION.RIGHT);

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

  const timerForTest = setInterval(() => {
    updateCarCoord(car1Ref.current);
  }, 15000); */

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
          {/*           <canvas
            ref={canvasRef}
            className='absolute w-full h-full'
          /> */}
          <GameFormContainer />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
