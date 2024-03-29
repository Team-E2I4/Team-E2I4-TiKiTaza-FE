import {
  Event,
  EventSourcePolyfill,
  EventSourcePolyfillInit,
  MessageEvent,
} from 'event-source-polyfill';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SSE_CHANGE_GAME_ROOM, SSE_CONNECT } from './constants';

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
interface UseSSEProps {
  url: string;
  options?: EventSourcePolyfillInit;
}

export interface SSEErrorEvent extends Event {
  status?: number;
  error?: Error;
}

export type SSEErrorType = SSEErrorEvent | null;

const useSSE = ({ url, options = {} }: UseSSEProps) => {
  const [error, setError] = useState<SSEErrorType>(null);
  const [data, setData] = useState<I_ChangeGameRoomData[]>([]);

  const isError = useMemo(() => !!error, [error]);
  const memorizedOptions = useRef(options);

  useEffect(() => {
    const sse = new EventSourcePolyfill(url, { ...memorizedOptions.current });

    const handleChangeGameRoom = (e: Event) => {
      const messageEvent = e as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      setData(data);
    };

    const handleInitConnect = (e: Event) => {
      const messageEvent = e as MessageEvent;
      const data = JSON.parse(messageEvent.data);

      setData(data);
    };

    sse.onopen = () => {
      setError(null);

      sse.addEventListener(SSE_CHANGE_GAME_ROOM, handleChangeGameRoom);
      sse.addEventListener(SSE_CONNECT, handleInitConnect);
    };

    sse.onerror = (e: Event) => {
      setError(e);
    };

    return () => {
      sse.removeEventListener(SSE_CHANGE_GAME_ROOM, handleChangeGameRoom);
      sse.removeEventListener(SSE_CONNECT, handleInitConnect);
      sse.close();
    };
  }, [url, memorizedOptions]);

  return {
    data,
    isError,
    error,
  };
};

export default useSSE;
