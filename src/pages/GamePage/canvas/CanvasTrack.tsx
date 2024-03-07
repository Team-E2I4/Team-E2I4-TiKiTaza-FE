/* eslint-disable no-console */
import { useCallback, useEffect, useRef } from 'react';
import car1 from '@/assets/canvasCars/car1.png';
import car2 from '@/assets/canvasCars/car2.png';
import car3 from '@/assets/canvasCars/car3.png';
import car4 from '@/assets/canvasCars/car4.png';
import car5 from '@/assets/canvasCars/car5.png';
import car6 from '@/assets/canvasCars/car6.png';
import car7 from '@/assets/canvasCars/car7.png';
import car8 from '@/assets/canvasCars/car8.png';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CAR_DIRECTION,
  MAX_X,
  MAX_Y,
  MOVE_STEP_X,
  MOVE_STEP_Y,
  START_X,
  START_Y,
} from '@/common/Ingame/ingameConstants';
import IngameHeader from '@/common/Ingame/IngameHeader';
import IngameRank from '@/common/Ingame/IngameRank';
import useCanvas from '@/hooks/useCanvas';
import { DirectionType } from '../types/trackType';
import { responseDummy } from './testDummy';

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

  const carImagesRef = useRef<HTMLImageElement[] | null>(null);
  const carsRef = useRef<I_CarCoord[]>([]);
  const carDirRef = useRef(CAR_DIRECTION.RIGHT); // 자동차가 이동할 방향(상하좌우)

  const carImgs = [car1, car2, car3, car4, car5, car6, car7, car8];
  let isArrived = 0;

  // 자동차 진행 방향 바꾸는 함수
  const changeCarDir = useCallback((pos: I_CarCoord) => {
    if (pos.x === START_X && pos.y === START_Y) {
      // eslint-disable-next-line no-console
      console.log('끝!');
      isArrived = 1;
      clearInterval(timerForTest);
      return;
    }
    changeDir(pos, carDirRef.current);
    pos.x = Math.max(0, Math.min(pos.x, MAX_X));
    pos.y = Math.max(0, Math.min(pos.y, MAX_Y));
  }, []);

  // 방향에 따라 테두리에 도달할 시 방향 바꾸는 함수
  const changeDir = (pos: I_CarCoord, dir: DirectionType) => {
    const change = {
      right: () => {
        if (pos.x >= MAX_X) {
          carDirRef.current = CAR_DIRECTION.DOWN;
        }
      },
      down: () => {
        if (pos.y >= MAX_Y) {
          carDirRef.current = CAR_DIRECTION.LEFT;
        }
      },
      left: () => {
        if (pos.x <= 0) {
          carDirRef.current = CAR_DIRECTION.UP;
        }
      },
      up: () => {
        if (pos.y <= 0) {
          carDirRef.current = CAR_DIRECTION.RIGHT;
        }
      },
    };
    return change[dir]();
  };

  // 자동차 위치 바꾸는 함수
  const updateCarCoord = useCallback(
    (carCoord: I_CarCoord) => {
      const dir = carDirRef.current;
      moveByDir(carCoord, dir);
      changeCarDir(carCoord);
    },
    [changeCarDir]
  );

  // 방향에 따라 진행중인 방향으로 이동시키는 함수
  const moveByDir = (carCoord: I_CarCoord, dir: DirectionType) => {
    const move = {
      right: (carCoord: I_CarCoord) => (carCoord.x += MOVE_STEP_X),
      down: (carCoord: I_CarCoord) => (carCoord.y += MOVE_STEP_Y),
      left: (carCoord: I_CarCoord) => (carCoord.x -= MOVE_STEP_X),
      up: (carCoord: I_CarCoord) => (carCoord.y -= MOVE_STEP_Y),
    };
    return move[dir](carCoord);
  };

  useEffect(() => {
    // 자동차 이미지 로드
    if (carImgs.length) {
      const carImagesArr = [];
      for (const carImg of carImgs) {
        const newImg = new Image(20, 20);
        newImg.src = carImg;
        newImg.alt = '자동차';
        carImagesArr.push(newImg);
      }
      carImagesRef.current = carImagesArr;
    }

    // 필요한 자동차 갯수 만큼 자동차 초기 좌표 지정
    Object.entries(responseDummy.gameScore).forEach((_, idx) => {
      const x = START_X + Math.floor(idx / 4) * 20;
      const y = START_Y + (idx % 4) * 10;
      carsRef.current.push({ x, y });
    });

    // 캔버스 세팅
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx) {
      return;
    }
    //자동차를 화면에 그린다
    let rafTimer: ReturnType<typeof requestAnimationFrame>;
    const coordCars = carsRef.current;
    const animate = () => {
      console.log('animate 호출');
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 이전 값 삭제
      const imgrefcurrent = carImagesRef.current;
      if (imgrefcurrent) {
        coordCars.forEach((eachCarCoord, idx) => {
          const carImg = imgrefcurrent[idx];
          //이미지 로드 이후 drawImage에 전달 가능
          if (carImg) {
            ctx.drawImage(carImg, eachCarCoord.x, eachCarCoord.y); // 위치!px단위
          }
        });
      }

      // 도착전까지만 animate를 실행한다. (임시)
      if (!isArrived) {
        rafTimer = requestAnimationFrame(animate);
      }
    };

    rafTimer = requestAnimationFrame(animate); //////////////실행
    return () => {
      rafTimer && cancelAnimationFrame(rafTimer);
    };
  }, []);

  const timerForTest = setInterval(() => {
    // carsRef.current.forEach((eachCarCoord, ix) => {
    //   updateCarCoord(eachCarCoord);
    // });
  }, 1500);
  setTimeout(() => {
    isArrived = 1;
    console.log('임시 종료');
  }, 1000);
  console.log('컴포넌트가 렌더링');
  return (
    <>
      <IngameHeader />
      <div>
        <div className='absolute'>
          <IngameRank />
        </div>
        <div className='flex flex-col items-center justify-center ml-80 h-[61rem] relative'>
          <div className='absolute w-[110rem] h-full rounded-[10rem] border-2 border-black'></div>
          <div className='absolute w-[100rem] h-[calc(100%-10rem)] rounded-[5rem] border-2 border-black '></div>
          <canvas
            ref={canvasRef}
            className='absolute w-full h-full'
          />
          <div className='flex flex-col items-center justify-center z-10 h-[51rem] bg-slate-400 mt-[5rem]'>
            <div>
              <button
                onClick={() => {
                  updateCarCoord(carsRef.current[1]);
                }}>
                그린카
              </button>
              <button
                onClick={() => {
                  updateCarCoord(carsRef.current[2]);
                }}>
                블루카
              </button>
            </div>
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