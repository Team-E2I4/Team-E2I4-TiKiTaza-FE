import { create } from 'zustand';
import {
  I_GameRoomResponse,
  I_IngameWsResponse,
} from '@/pages/GamePage/types/websocketType';

type IngameRoomResSetterType = I_GameRoomResponse | I_IngameWsResponse;
interface I_useIngameStore {
  ingameRoomRes: I_IngameWsResponse;
  setIngameRoomRes: <T extends IngameRoomResSetterType>(props: T) => void;

  isIngameWsError: boolean;
  setIsIngameWsError: (isIngameWsError: boolean) => void;

  isRoundWaiting: boolean;
  setIsRoundWaiting: (isRoundWaiting: boolean) => void;
}

const useIngameStore = create<I_useIngameStore>((set) => ({
  ingameRoomRes: {} as I_IngameWsResponse,
  setIngameRoomRes: (props: I_GameRoomResponse | I_IngameWsResponse) => {
    if ('roomId' in props) {
      set((prev) => ({
        ingameRoomRes: {
          ...prev.ingameRoomRes,
          allMembers: prev.ingameRoomRes.allMembers.filter(({ memberId }) =>
            props.allMembers?.some(
              ({ memberId: newMemberId }) => newMemberId === memberId
            )
          ),
          type: props.type === 'EXIT' ? 'EXIT' : prev.ingameRoomRes.type,
        },
      }));
    } else {
      set({ ingameRoomRes: props });
    }
  },

  isIngameWsError: false,
  setIsIngameWsError: (isIngameWsError) => set({ isIngameWsError }),

  isRoundWaiting: true,
  setIsRoundWaiting: (isRoundWaiting) => set({ isRoundWaiting }),
}));

export default useIngameStore;
