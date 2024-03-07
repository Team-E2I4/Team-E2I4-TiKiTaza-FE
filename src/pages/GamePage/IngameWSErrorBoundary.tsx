import useRoomInfoStore from '@/store/useRoomInfoStore';
import WsError from './common/WsError';
import useIngameWebsocket, { PayloadType } from './hooks/useIngameWebsocket';
import { I_IngameWsResponse } from './types/websocketType';

export type PublishIngameType = (
  destination: string,
  payload: PayloadType
) => void;

export interface InagmeWsChildrenProps {
  ingameRoomRes: I_IngameWsResponse;
  publishIngame: PublishIngameType;
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
