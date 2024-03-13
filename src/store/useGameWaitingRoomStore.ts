import { create } from 'zustand';
import { I_GameRoomResponse } from '@/pages/GamePage/types/websocketType';

interface I_UseGameWaitingRoom {
  gameRoomRes: I_GameRoomResponse | null;
  setGameRoomRes: (gameRoomRes: I_GameRoomResponse) => void;
  isWsError: boolean;
  setIsWsError: (isWsError: boolean) => void;
}

const useGameWaitingRoomStore = create<I_UseGameWaitingRoom>((set) => ({
  gameRoomRes: null,
  setGameRoomRes: (gameRoomRes) => set({ gameRoomRes }),
  isWsError: false,
  setIsWsError: (isWsError) => set({ isWsError }),
}));

export default useGameWaitingRoomStore;
