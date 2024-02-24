import { Component, FunctionComponent, ReactElement, ReactNode } from 'react';
import { BASE_PATH } from '@/generated/base';
import useSSE, { I_ChangeGameRoomData } from '@/hooks/useSSE';
import storageFactory from '@/utils/storageFactory';

interface SSEProps {
  fallback: ReactElement<
    unknown,
    string | FunctionComponent | typeof Component
  > | null;
  children: (data: I_ChangeGameRoomData[]) => ReactNode;
}
const SSE = ({ fallback, children }: SSEProps) => {
  const { getItem } = storageFactory(localStorage);
  const { data, isError } = useSSE({
    url: `${BASE_PATH}/api/v1/sse`,
    options: {
      headers: {
        Authorization: `Bearer ${getItem('MyToken', null)}`,
      },
      heartbeatTimeout: 1000 * 60 * 60,
      withCredentials: true,
    },
  });

  return isError ? fallback : children(data);
};

// eslint-disable-next-line react-refresh/only-export-components
export default SSE;
