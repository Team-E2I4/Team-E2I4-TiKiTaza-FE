import useRoomInfoStore from '@/store/useRoomInfoStore';
import WsError from './common/WsError';
import useIngameWebsocket from './hooks/useIngameWebsocket';
import { I_IngameWsResponse } from './types/websocketType';

export const IngameWSErrorBoundary = ({
  children,
}: {
  children: (
    ingameRoomRes: I_IngameWsResponse,
    publishIngame: (destination: string, payload: object) => void
  ) => JSX.Element;
}) => {
  const { roomId } = useRoomInfoStore();

  const { ingameRoomRes, isWsError, publishIngame } =
    useIngameWebsocket(roomId);

  return isWsError ? <WsError /> : children(ingameRoomRes, publishIngame);
};
