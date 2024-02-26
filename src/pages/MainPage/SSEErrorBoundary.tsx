import { Component, FunctionComponent, ReactElement, ReactNode } from 'react';
import { BASE_PATH } from '@/generated/base';
import useSSE, { I_ChangeGameRoomData, SSEErrorType } from '@/hooks/useSSE';
import storageFactory from '@/utils/storageFactory';

interface SSEErrorBoundaryProps {
  fallback: (
    error: SSEErrorType
  ) => ReactElement<
    unknown,
    string | FunctionComponent | typeof Component
  > | null;
  children: (data: I_ChangeGameRoomData[]) => ReactNode;
}

const SSE_TIME_OUT_LIMIT = 1000 * 60 * 60; //1hour

const SSEErrorBoundary = ({ fallback, children }: SSEErrorBoundaryProps) => {
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

  return isError ? fallback(error) : children(data);
};

export default SSEErrorBoundary;
