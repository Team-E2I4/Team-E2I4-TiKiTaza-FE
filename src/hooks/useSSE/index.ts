import {
  Event,
  EventSourcePolyfill,
  EventSourcePolyfillInit,
} from 'event-source-polyfill';
import { useEffect } from 'react';

type EventHandlersType = {
  eventType: string;
  handler: (event: Event) => void;
};

interface UseSSEProps {
  url: string;
  options?: EventSourcePolyfillInit;
  eventHandlers?: EventHandlersType[];
  handleError: (e: Event) => void;
}

//options가 중첩객체일 수 있으므로 memo해두어야함?
const useSSE = ({
  url,
  options = {},
  eventHandlers,
  handleError,
}: UseSSEProps) => {
  useEffect(() => {
    const sse = new EventSourcePolyfill(url, { ...options });

    sse.onopen = () => {
      eventHandlers?.forEach(({ eventType, handler }) => {
        sse.addEventListener(eventType, handler);
      });
    };

    sse.onerror = (e) => {
      handleError(e);
    };

    return () => {
      eventHandlers?.forEach(({ eventType, handler }) => {
        sse.removeEventListener(eventType, handler);
      });
      sse.close();
    };
  }, [url, options, eventHandlers, handleError]);
  return;
};

export default useSSE;
