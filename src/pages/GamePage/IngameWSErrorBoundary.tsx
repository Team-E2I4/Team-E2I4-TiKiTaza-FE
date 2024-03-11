import useRoomInfoStore from '@/store/useRoomInfoStore';
import WsError from './common/WsError';
import useIngameWebsocket from './hooks/useIngameWebsocket';
import { I_IngameWsResponse, PublishIngameType } from './types/websocketType';

export interface InagmeWsChildrenProps {
  ingameRoomRes: I_IngameWsResponse;
  publishIngame: PublishIngameType;
}

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
