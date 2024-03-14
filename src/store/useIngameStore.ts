import { create } from 'zustand';
import { I_IngameWsResponse } from '@/pages/GamePage/types/websocketType';

interface I_useIngameStore {
  ingameRoomRes: I_IngameWsResponse;
  setIngameRoomRes: (ingameRoomRes: I_IngameWsResponse) => void;

  isIngameWsError: boolean;
  setIsIngameWsError: (isIngameWsError: boolean) => void;

  isRoundWaiting: boolean;
  setIsRoundWaiting: (isRoundWaiting: boolean) => void;
}

const useIngameStore = create<I_useIngameStore>((set) => ({
  ingameRoomRes: {} as I_IngameWsResponse,
  setIngameRoomRes: (ingameRoomRes) => set({ ingameRoomRes }),

  isIngameWsError: false,
  setIsIngameWsError: (isIngameWsError) => set({ isIngameWsError }),

  isRoundWaiting: true,
  setIsRoundWaiting: (isRoundWaiting) => set({ isRoundWaiting }),
}));

export default useIngameStore;
