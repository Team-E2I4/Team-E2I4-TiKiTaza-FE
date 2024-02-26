import { I_CreateRoomInput, I_CreateRoomSelect } from '../types';

export const CREATE_ROOM_INPUT_LIST: I_CreateRoomInput[] = [
  {
    name: 'roomName',
    value: '',
    type: 'text',
    label: '방 이름',
    placeholder: '티기타자 고다고',
    required: false,
    validate: {
      minLength: {
        value: 2,
        message: '방 이름은 2글자 이상이어야 합니다.',
      },
      maxLength: {
        value: 14,
        message: '방 이름은 14글자를 초과할 수 없습니다.',
      },
    },
  },
  {
    name: 'roomPassword',
    value: '',
    type: 'password',
    label: '비밀번호 설정',
    placeholder: '비공개방을 만들고 싶으시면 입력!',
    required: false,
    validate: {
      maxLength: {
        value: 10,
        message: '비밀번호는 10글자를 초과할 수 없습니다.',
      },
    },
  },
];

export const CREATE_ROOM_SELECT_LIST: I_CreateRoomSelect[] = [
  {
    name: 'roomMaxPlayer',
    optionValues: Array.from({ length: 8 })
      .map((_, index) => ({
        value: index + 1,
        text: `${index + 1}명`,
      }))
      .slice(1),
  },
  {
    name: 'roomRound',
    optionValues: Array.from({ length: 8 })
      .map((_, index) => ({
        value: index + 1,
        text: `${index + 1}라운드`,
      }))
      .slice(1),
  },
];

export const GAME_MODE_LIST = [
  { value: '문장 모드', mode: 'sentence' },
  { value: '코딩 모드', mode: 'coding' },
  { value: '단어 모드', mode: 'word' },
];
