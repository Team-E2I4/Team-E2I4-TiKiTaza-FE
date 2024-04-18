import { FilteredGameModeType } from '../MainPage';

export const GAME_MODE_LIST: FilteredGameModeType[] = [
  'ALL',
  'SENTENCE',
  'CODE',
  'WORD',
];

type MappedGameModeListType = { [key in FilteredGameModeType]: string };

export const MAPPED_GAME_MODE_LIST: MappedGameModeListType = {
  ALL: '전체',
  SENTENCE: '문장',
  CODE: '코드',
  WORD: '단어',
};
