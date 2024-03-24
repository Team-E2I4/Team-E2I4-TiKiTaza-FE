import { Component, FunctionComponent, ReactElement, ReactNode } from 'react';
import { BASE_PATH } from '@/generated/base';
import { SSE_CHANGE_GAME_ROOM, SSE_CONNECT } from '@/hooks/useSse/constants';
import useServerSentEvents, { SseErrorType } from '@/hooks/useSse/useSse';
import storageFactory from '@/utils/storageFactory';
export interface I_ChangeGameRoomData {
  id: number;
  hostId?: number;
  title: string;
  gameMode: 'WORD' | 'SENTENCE' | 'CODE';
  maxRound: number;
  inviteCode?: string;
  maxPlayer: number;
  currentPlayer: number;
  isPlaying: boolean;
  isPrivate: boolean;
}
interface SseFetcherProps {
  fallback: (
    error: SseErrorType
  ) => ReactElement<
    unknown,
    string | FunctionComponent | typeof Component
  > | null;
  children: (data: I_ChangeGameRoomData[]) => ReactNode;
}

const SSE_TIME_OUT_LIMIT = 1000 * 60; // 60 seconds

const SseFetcher = ({ fallback, children }: SseFetcherProps) => {
  const { getItem } = storageFactory(localStorage);
  const { data, error } = useServerSentEvents<
    'changeGameRoom' | 'connect',
    I_ChangeGameRoomData[]
  >({
    url: `${BASE_PATH}/api/v1/sse`,
    customEvents: [SSE_CHANGE_GAME_ROOM, SSE_CONNECT],
    options: {
      headers: {
        Authorization: `Bearer ${getItem('MyToken', '')}`,
      },
      heartbeatTimeout: SSE_TIME_OUT_LIMIT,
      withCredentials: true,
    },
  });

  if (data) {
    return children(data);
  }

  return fallback(error);
};

export default SseFetcher;
