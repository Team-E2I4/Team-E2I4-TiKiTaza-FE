/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
import { TRACK_CARS } from '@/assets/canvasCars';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CAR_SIZE,
  EAST_LAST_SCORE,
  EAST_START_Y,
  MOVE_STEP_X,
  MOVE_STEP_Y,
  NORTH_LAST_SCORE,
  SOUTH_LAST_SCORE,
  SOUTH_START_X,
  START_X,
  WEST_LAST_SCORE,
  WEST_START_Y,
} from '@/common/Ingame/ingameConstants';
import useCanvas from '@/hooks/useCanvas';
import useCarImgStore from '@/store/useCarStore';
import { CarImgType } from '../types/ingameTypes';
import { I_AllMember } from '../types/websocketType';

interface I_CarCoord {
  x: number;
  y: number;
  userId?: string; // 인덱스번호 처럼 쓸 userId/ 0~3(g1), 4~7(g2)
  idx?: number; // 인덱스 번호 -> 트랙 라인 식별용
}

const CanvasTrack = ({ allMembers }: { allMembers: I_AllMember[] }) => {
  // 전체영역 캔버스 생성
  const canvasRef = useCanvas({
    setCanvas: (canvas: HTMLCanvasElement) => {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    },
  });
  const { carImgStore } = useCarImgStore();

  const prevData = useRef<CarImgType>({});
  const carImagesRef = useRef<HTMLImageElement[] | null>(null);
  const carsRef = useRef<I_CarCoord[]>([]);
  carsRef.current = [];

  useEffect(() => {
    // 캔버스 세팅
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx) {
      return;
    }

    // 자동차 이미지 로드
    if (allMembers.length) {
      const carImagesArr: HTMLImageElement[] | null = [];
      allMembers.forEach(({ memberId }) => {
        const newImg = new Image(20, 20);
        newImg.src = TRACK_CARS[carImgStore[memberId]];
        newImg.alt = '자동차';
        carImagesArr.push(newImg);
      });
      carImagesRef.current = carImagesArr;
    }

    // allMembers 유저수 만큼 좌표 지정
    allMembers.forEach((member, idx) => {
      const { score } = member;
      const lineGap = (idx % 4) * 10;

      let x = 0;
      let y = 0;

      // // 변화 없는 유저 얼리리턴
      if (prevData.current[idx] === member.score) {
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
        x = lineGap;
        y = WEST_START_Y - MOVE_STEP_Y * (score - (SOUTH_LAST_SCORE + 1));
        if (score === WEST_LAST_SCORE) {
          x += CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score > WEST_LAST_SCORE) {
        x = START_X + MOVE_STEP_X * (score - 100);
        y = lineGap;
      }
      carsRef.current[idx] = { x, y, idx };
      prevData.current[member.memberId] = member.score;
    });

    //자동차를 화면에 그린다
    let rafTimer: ReturnType<typeof requestAnimationFrame>;
    const coordCars = carsRef.current;
    const animate = () => {
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 이전 값 삭제
      const imgrefcurrent = carImagesRef.current;
      if (imgrefcurrent) {
        coordCars.forEach((eachCarCoord, idx) => {
          const carImg = imgrefcurrent[idx];
          //이미지 로드 이후 drawImage에 전달 가능
          if (carImg) {
            ctx.drawImage(carImg, eachCarCoord.x, eachCarCoord.y, 20, 20);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };

    rafTimer = requestAnimationFrame(animate);
    return () => {
      rafTimer && cancelAnimationFrame(rafTimer);
    };
  }, [allMembers]);

  return (
    <canvas
      ref={canvasRef}
      className='absolute w-full h-full'
    />
  );
};

export default CanvasTrack;
