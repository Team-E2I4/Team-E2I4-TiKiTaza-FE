import {
  Event,
  EventSourcePolyfill,
  EventSourcePolyfillInit,
  MessageEvent,
} from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { SSE_CHANGE_GAME_ROOM } from './constants';

export interface I_ChangeGameRoomData {
  id: number;
  hostId: number;
  title: string;
  gameMode: string;
  maxRound: number;
  inviteCode: null | string;
  maxPlayer: number;
  currentPlayer: number;
  isPlaying: boolean;
  isPrivate: boolean;
}
interface UseSSEProps {
  url: string;
  options?: EventSourcePolyfillInit;
}

//options가 중첩객체일 수 있으므로 memo해두어야함?
const useSSE = ({ url, options = {} }: UseSSEProps) => {
  const [error, setError] = useState<{ isError: boolean; data: Event | null }>({
    isError: false,
    data: null,
  });
  const [data, setData] = useState('');

  useEffect(() => {
    const sse = new EventSourcePolyfill(url, { ...options });

    const handleChangeGameRoom = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      setData(data);
    };

    sse.onopen = () => {
      setError((prev) => ({ ...prev, isError: false }));
      sse.addEventListener(SSE_CHANGE_GAME_ROOM, handleChangeGameRoom);
    };

    sse.onerror = (e: Event) => {
      setError((prev) => ({ ...prev, isError: true, data: e }));
    };

    return () => {
      sse.close();
    };
  }, [url, options, error]);

  return { data, isError: error.isError, error: error.data };
};

export default useSSE;
