/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
// eslint-disable-next-line prettier/prettier
import { car1,car2,car3,car4,car5,car6,car7,car8 } from '@/assets/canvasCars';
// eslint-disable-next-line prettier/prettier
import {CANVAS_HEIGHT, CANVAS_WIDTH, CAR_SIZE, EAST_LAST_SCORE, EAST_START_Y, MOVE_STEP_X, MOVE_STEP_Y, NORTH_LAST_SCORE, SOUTH_LAST_SCORE, SOUTH_START_X, START_X, TRACK_WIDHT, WEST_LAST_SCORE, WEST_START_Y} from '@/common/Ingame/ingameConstants';
import useCanvas from '@/hooks/useCanvas';
import { I_AllMember } from '../types/websocketType';

interface I_CarCoord {
  x: number;
  y: number;
  userId?: string; // 인덱스번호 처럼 쓸 userId/ 0~3(g1), 4~7(g2)
  idx?: number; // 인덱스 번호 -> 트랙 라인 식별용
}

const CanvasTrack = ({
  allMembers,
  isNextRoundStart,
}: {
  allMembers: I_AllMember[];
  isNextRoundStart: boolean;
}) => {
  // 전체영역 캔버스 생성
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });

  const prevData = useRef<I_AllMember[]>(allMembers);
  const carImagesRef = useRef<HTMLImageElement[] | null>(null);
  const carsRef = useRef<I_CarCoord[]>([]);

  const carImgs = [car1, car2, car3, car4, car5, car6, car7, car8];
  let isArrived = 0;
  console.log(carsRef.current);
  useEffect(() => {
    // 캔버스 세팅
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx || isNextRoundStart) {
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

    // allMembers 유저수 만큼 좌표 지정
    allMembers.forEach((member, idx) => {
      const { score } = member;
      const lineGap = (idx % 4) * 10;

      let x = 0;
      let y = 0;

      // 변화 없는 유저 얼리리턴
      if (prevData.current[idx].score === member.score) {
        if (score === 0) {
          x = START_X + Math.floor(idx / 4) * 20;
          y = lineGap;
          carsRef.current[idx] = { x, y, idx };
        }
        return;
      }

      if (score <= NORTH_LAST_SCORE) {
        x = START_X + MOVE_STEP_X * score;
        y = lineGap;
        if (score === NORTH_LAST_SCORE) {
          x -= CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score <= EAST_LAST_SCORE) {
        x = CANVAS_WIDTH - lineGap - CAR_SIZE;
        y = EAST_START_Y + MOVE_STEP_Y * (score - (NORTH_LAST_SCORE + 1));
        if (score === EAST_LAST_SCORE) {
          x -= CAR_SIZE;
          y -= CAR_SIZE;
        }
      } else if (score <= SOUTH_LAST_SCORE) {
        x = SOUTH_START_X - MOVE_STEP_X * (score - (EAST_LAST_SCORE + 1));
        y = CANVAS_HEIGHT - lineGap - CAR_SIZE;
        if (score === SOUTH_LAST_SCORE) {
          x += CAR_SIZE;
          y -= CAR_SIZE;
        }
      } else if (score <= WEST_LAST_SCORE) {
        x = TRACK_WIDHT - lineGap - CAR_SIZE;
        y = WEST_START_Y - MOVE_STEP_Y * (score - (SOUTH_LAST_SCORE + 1));
        if (score === WEST_LAST_SCORE) {
          x += CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score === 100) {
        x = START_X;
        y = lineGap;
      }
      carsRef.current[idx] = { x, y, idx };
      prevData.current[idx].score = member.score;
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
            ctx.drawImage(carImg, eachCarCoord.x, eachCarCoord.y);
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
  }, [allMembers]);

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
