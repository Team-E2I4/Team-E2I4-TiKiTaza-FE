import { useRef } from 'react';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import { InagmeWsChildrenProps } from '../IngameWSErrorBoundary';
import GameFormContainer from './GameFormContainer';
const sentenceDummy = [
  '저녁 때 돌아갈 집이 있다는 것',
  '힘들 때 마음 속으로 생각 할 사람이 있다는 것',
  '외로울 때 혼자서 부를 노래 있다는 것',
  '세상에 와서 내가 하는 말 가운데서',
  '가장 고운 말을 너에게 들려주고 싶다.',
  '세상에 와서 내가 가진 생각 가운데서',
  '가장 예쁜 생각을 너에게 주고 싶다.',
];

interface GameSentenceProps extends InagmeWsChildrenProps {
  userId: number;
}
const GameSentence = ({
  ingameRoomRes,
  publishIngame,
  userId,
}: GameSentenceProps) => {
  //이하 임의값 테스트 코드입니다
  /* 
  1. 유저 정보를 가져온다.
  2. ingameRoomRes객체에 gameScore객체가 들어있다면, gameScore[userId]로 점수를 가져온다.
    a. 만약 gameScore객체가 없다면, 점수는 0이다.
  3. 점수는 라운드 돌아가는 동안 들고있어야함.
  
  ...
  그렇다면 유저의 data가 필요하다. => 캐싱 해두는게 낫다. => 얼마나 캐싱 해야할까?...? => 게임중에는 refresh토큰을 계속 업데이트 해주어야하나?
  const { data, isPending } = useAuthCheck();

  const currentScore = ingameRoomRes?.gameScore ?? 0;
  */

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

  const currentScore = useRef<number>(ingameRoomRes?.gameScore?.[userId] ?? 0);

  const TotalSpacedWord = sentenceDummy.reduce(
    (acc, cur) => acc + cur.split(' ').length,
    0
  );

  const trackRatio = Number(((1 / TotalSpacedWord) * 100).toFixed(1));

  const handleUpdateScore = () => {
    publishIngame('/info', { currentScore: currentScore.current + trackRatio });
    currentScore.current += trackRatio;
  };

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
          <GameFormContainer
            sentenceList={sentenceDummy}
            handleUpdateScore={handleUpdateScore}
          />
        </div>
      </div>
    </>
  );
};

export default GameSentence;
