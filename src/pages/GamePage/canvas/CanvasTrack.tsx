/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
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
  CAR_SIZE,
  EAST_START_Y,
  MOVE_STEP_X,
  MOVE_STEP_Y,
  SOUTH_START_X,
  START_X,
  TRACK_WIDHT,
  WEST_START_Y,
} from '@/common/Ingame/ingameConstants';
import useCanvas from '@/hooks/useCanvas';
import { GameScoreType } from '../types/websocketType';

interface I_CarCoord {
  x: number;
  y: number;
  userId?: string; // 인덱스번호 처럼 쓸 userId/ 0~3(g1), 4~7(g2)
  idx?: number; // 인덱스 번호 -> 트랙 라인 식별용
}

const CanvasTrack = ({
  gameScore,
  messageType,
}: {
  gameScore: GameScoreType;
  messageType: string;
}) => {
  // 전체영역 캔버스 생성
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });

  const carImagesRef = useRef<HTMLImageElement[] | null>(null);
  const carsRef = useRef<I_CarCoord[]>([]);

  const carImgs = [car1, car2, car3, car4, car5, car6, car7, car8];
  let isArrived = 0;

  useEffect(() => {
    // 캔버스 세팅
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx || messageType === 'NEXT_ROUND_START') {
      return;
    }

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

    // gameScore의 자동차 갯수 만큼 좌표 지정
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(gameScore).forEach(([userId, score], idx) => {
      const lineGap = (idx % 4) * 10;
      let x = 0;
      let y = 0;
      if (score === 0) {
        x = START_X + Math.floor(idx / 4) * 20;
        y = lineGap;
      } else if (score <= 31) {
        x = START_X + MOVE_STEP_X * score;
        y = lineGap;
        if (score === 31) {
          x -= CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score <= 49) {
        x = CANVAS_WIDTH - lineGap - CAR_SIZE;
        y = EAST_START_Y + MOVE_STEP_Y * (score - 32); //32번부터 하강
        if (score === 49) {
          x -= CAR_SIZE;
          y -= CAR_SIZE;
        }
      } else if (score <= 81) {
        x = SOUTH_START_X - MOVE_STEP_X * (score - 50); //50번부터 좌측으로 이동
        y = CANVAS_HEIGHT - lineGap;
        if (score === 81) {
          x += CAR_SIZE;
          y -= CAR_SIZE;
        }
      } else if (score <= 99) {
        x = TRACK_WIDHT - lineGap;
        y = WEST_START_Y - MOVE_STEP_Y * (score - 82); //82번부터 상승
        if (score === 99) {
          x += CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score === 100) {
        x = START_X;
        y = lineGap;
      }
      carsRef.current[idx] = { x, y, idx };
    });
    console.log(carsRef.current);

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
  }, [gameScore]);

  // const timerForTest = setInterval(() => {
  // carsRef.current.forEach((eachCarCoord, ix) => {
  //   updateCarCoord(eachCarCoord);
  // });
  // }, 1500);
  setTimeout(() => {
    isArrived = 1;
    console.log('임시 종료');
  }, 5000);

  return (
    <canvas
      ref={canvasRef}
      className='absolute w-full h-full'
    />
  );
};

export default CanvasTrack;
