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
import { NumberIndexSignatureType } from '../../../types/indexSignatureType';
import { I_AllMember } from '../types/websocketType';

interface I_CarCoord {
  x: number;
  y: number;
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

  const idScore = useRef<NumberIndexSignatureType>(
    allMembers.reduce((object: NumberIndexSignatureType, value) => {
      object[value.memberId] = value.score;
      return object;
    }, {})
  );
  const originUsers = useRef(allMembers.map(({ memberId }) => memberId));
  const carImagesRef = useRef<HTMLImageElement[] | null>(null);
  const carsRef = useRef<{ [key: number]: I_CarCoord }>({});

  useEffect(() => {
    // 캔버스 세팅
    const cvs = canvasRef.current;
    const ctx = cvs?.getContext('2d');
    if (!ctx) {
      return;
    }

    // 자동차 이미지 로드
    if (originUsers.current.length) {
      const carImagesArr: HTMLImageElement[] | null = [];
      originUsers.current.forEach((memberId) => {
        const newImg = new Image(20, 20);
        newImg.src = TRACK_CARS[carImgStore[memberId]];
        newImg.alt = '자동차';
        carImagesArr.push(newImg);
      });
      carImagesRef.current = carImagesArr;
    }

    allMembers.forEach(({ memberId, score }) => {
      const idx = originUsers.current.indexOf(memberId);
      const verticalLineGap = (idx % 4) * 12 - 2;
      const horizontalLineGap = (idx % 4) * 10 + 2;
      let x = 0;
      let y = verticalLineGap;

      // // 변화 없는 유저 얼리리턴
      if (idScore.current[memberId] === score) {
        if (score === 0) {
          x = START_X + Math.floor(idx / 4) * 20;
          y = verticalLineGap;
          carsRef.current[memberId] = { x, y };
        }
        return;
      }

      if (score > WEST_LAST_SCORE) {
        score -= WEST_LAST_SCORE + 1;
      }
      if (score <= NORTH_LAST_SCORE) {
        x = START_X + MOVE_STEP_X * score;
        y = verticalLineGap;
        if (score === NORTH_LAST_SCORE) {
          x -= CAR_SIZE;
          y += CAR_SIZE;
        }
      } else if (score <= EAST_LAST_SCORE) {
        x = CANVAS_WIDTH - horizontalLineGap - CAR_SIZE;
        y = EAST_START_Y + MOVE_STEP_Y * (score - (NORTH_LAST_SCORE + 1));
        if (score === EAST_LAST_SCORE) {
          x -= CAR_SIZE;
          y -= CAR_SIZE;
        }
      } else if (score <= SOUTH_LAST_SCORE) {
        x = SOUTH_START_X - MOVE_STEP_X * (score - (EAST_LAST_SCORE + 1));
        y = CANVAS_HEIGHT - verticalLineGap - CAR_SIZE + 3;
      } else if (score <= WEST_LAST_SCORE) {
        x = horizontalLineGap;
        y = WEST_START_Y - MOVE_STEP_Y * (score - (SOUTH_LAST_SCORE + 1));
        if (score === WEST_LAST_SCORE) {
          y += CAR_SIZE;
        }
      }
      carsRef.current[memberId] = { x, y };
      idScore.current[memberId] = score;
    });

    //자동차를 화면에 그린다
    let rafTimer: ReturnType<typeof requestAnimationFrame>;
    const coordCars = carsRef.current;
    const animate = () => {
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 이전 값 삭제
      const imgrefcurrent = carImagesRef.current;
      if (imgrefcurrent) {
        allMembers.forEach(({ memberId }) => {
          const carImg = imgrefcurrent[originUsers.current.indexOf(memberId)];
          //이미지 로드 이후 drawImage에 전달 가능
          if (carImg) {
            ctx.drawImage(
              carImg,
              coordCars[memberId].x,
              coordCars[memberId].y,
              20,
              20
            );
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
