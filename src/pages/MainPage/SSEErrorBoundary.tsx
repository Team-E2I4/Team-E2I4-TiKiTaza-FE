import {
  cloneElement,
  Component,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { BASE_PATH } from '@/generated/base';
import useSSE, { I_ChangeGameRoomData, SSEErrorType } from '@/hooks/useSSE';
import storageFactory from '@/utils/storageFactory';

interface SSEErrorBoundary {
  fallback: ReactElement<
    unknown,
    string | FunctionComponent | typeof Component
  > | null;
  children: (data: I_ChangeGameRoomData[]) => ReactNode;
}

const SSE_TIME_OUT_LIMIT = 1000 * 60 * 60; //1hour

const SSEErrorBoundary = ({ fallback, children }: SSEErrorBoundary) => {
  const { getItem } = storageFactory(localStorage);
  const { data, isError, error } = useSSE({
    url: `${BASE_PATH}/api/v1/sse`,
    options: {
      headers: {
        Authorization: `Bearer ${getItem('MyToken', null)}`,
      },
      heartbeatTimeout: SSE_TIME_OUT_LIMIT,
      withCredentials: true,
    },
  });

  let newFallback = null;
  if (isValidElement<{ error: SSEErrorType }>(fallback)) {
    newFallback = cloneElement(fallback, {
      error,
    });
  } else {
    newFallback = fallback;
  }

  return isError ? newFallback : children(data);
};

export default SSEErrorBoundary;
