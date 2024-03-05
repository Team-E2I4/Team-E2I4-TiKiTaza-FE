import useRoomInfoStore from '@/store/useRoomInfoStore';
import WsError from './common/WsError';
export interface InagmeWsChildrenProps {
  ingameRoomRes: I_IngameWsResponse;
  publishIngame: (destination: string, payload: PayloadType) => void;
}
import useIngameWebsocket from './hooks/useIngameWebsocket';
import { I_IngameWsResponse, PayloadType } from './types/websocketType';

export const IngameWSErrorBoundary = ({
  children,
}: {
  children: ({
    ingameRoomRes,
    publishIngame,
  }: InagmeWsChildrenProps) => JSX.Element;
}) => {
  const { roomId } = useRoomInfoStore();

  const { ingameRoomRes, isWsError, publishIngame } =
    useIngameWebsocket(roomId);

  return isWsError ? <WsError /> : children({ ingameRoomRes, publishIngame });
};
