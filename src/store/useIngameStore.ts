import { create } from 'zustand';
import { I_IngameWsResponse } from '@/pages/GamePage/types/websocketType';

interface I_useIngameStore {
  ingameRoomRes: I_IngameWsResponse;
  setIngameRoomRes: (ingameRoomRes: I_IngameWsResponse) => void;
  isWsError: boolean;
  setIsWsError: (isWsError: boolean) => void;
}

const useIngameStore = create<I_useIngameStore>((set) => ({
  ingameRoomRes: {} as I_IngameWsResponse,
  setIngameRoomRes: (ingameRoomRes) => set({ ingameRoomRes }),
  isWsError: false,
  setIsWsError: (isWsError) => set({ isWsError }),
}));

export default useIngameStore;
