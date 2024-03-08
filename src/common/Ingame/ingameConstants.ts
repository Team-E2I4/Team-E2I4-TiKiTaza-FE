export const CAR_SIZE = 24;
export const START_X = 100;
export const START_Y = 0;
export const MOVE_STEP_X = 30;
export const MOVE_STEP_Y = 26;
export const CANVAS_WIDTH = 1100;
export const CANVAS_HEIGHT = 610;

export const TRACK_WIDHT = 50; //트랙너비 50px(5rem)
export const EAST_START_Y = 100; //동쪽 하강하는 트랙 시작y좌표
export const SOUTH_START_X = 1000; //남쪽 좌측이동 트랙 시작 x좌표
export const WEST_START_Y = 510; // 서쪽 상승하는 트랙시작 좌표

export const MAX_X = 1110;
export const MAX_Y = 600;
export const GROUP_GAP = 20; // 맨처음 뒷줄(g1), 앞줄(g2) 사이 x좌표차이

export const enum CAR_DIRECTION {
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
  UP = 'up',
  RIGHTDOWN = 'rightDown',
  LEFTDOWN = 'leftDown',
  LEFTUP = 'leftUp',
  RIGHTUP = 'rightUp',
}
