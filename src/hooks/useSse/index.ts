import {
  Event,
  EventSourcePolyfill,
  EventSourcePolyfillInit,
  MessageEvent,
} from 'event-source-polyfill';

import { useEffect, useMemo, useRef, useState } from 'react';

interface UseSseProps<K> {
  url: string;
  customEvents?: K[];
  options?: EventSourcePolyfillInit;
}

export interface SseErrorEvent extends Event {
  status?: number;
  error?: Error;
}

export type SseErrorType = SseErrorEvent | null;

const useSse = <K extends string, T = unknown>({
  url,
  customEvents,
  options = {},
}: UseSseProps<K>) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<SseErrorType>(null);
  const isError = useMemo(() => !!error, [error]);
  const memorizedOptions = useRef(options);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(url, {
      ...memorizedOptions.current,
    });

    const handleCustomEventData = (e: Event) => {
      const messageEvent = e as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      setData(data);
    };

    eventSource.onopen = () => {
      setError(null);
      setIsConnected(true);

      customEvents?.forEach((customEvent) =>
        eventSource.addEventListener(customEvent, handleCustomEventData)
      );
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    eventSource.onerror = (e) => {
      setError(e);
      setIsConnected(false);
    };

    return () => {
      customEvents?.forEach((customEvents) =>
        eventSource.removeEventListener(customEvents, handleCustomEventData)
      );
      eventSource.close();
    };
  }, [url]);

  return { isConnected, data, error, isError };
};

export default useSse;
