import { create } from 'zustand';
import { I_IngameWsResponse } from '@/pages/GamePage/types/websocketType';

type SetByNewOneType = (ingameRoomRes: I_IngameWsResponse) => void;
type SetByExitType = (exitmemberId: number) => void;
interface I_useIngameStore {
  ingameRoomRes: I_IngameWsResponse;
  setIngameRoomRes: SetByNewOneType | SetByExitType;

  isIngameWsError: boolean;
  setIsIngameWsError: (isIngameWsError: boolean) => void;

  isRoundWaiting: boolean;
  setIsRoundWaiting: (isRoundWaiting: boolean) => void;
}

const useIngameStore = create<I_useIngameStore>((set) => ({
  ingameRoomRes: {} as I_IngameWsResponse,
  setIngameRoomRes: (props: number | I_IngameWsResponse) => {
    if (typeof props === 'number') {
      set((prev) => ({
        ingameRoomRes: {
          type: prev.ingameRoomRes.type,
          allMembers: prev.ingameRoomRes.allMembers.filter(
            ({ memberId }) => memberId !== props
          ),
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
