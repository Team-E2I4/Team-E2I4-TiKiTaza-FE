import { create } from 'zustand';
import { I_GameRoomResponse } from '@/pages/GamePage/types/websocketType';

interface I_useGameWaitingRoom {
  gameRoomRes: I_GameRoomResponse | null;
  setGameRoomRes: (gameRoomRes: I_GameRoomResponse) => void;
}

const useGameWaitingRoomStore = create<I_useGameWaitingRoom>((set) => ({
  gameRoomRes: null,
  setGameRoomRes: (gameRoomRes) => set({ gameRoomRes }),
}));

export default useGameWaitingRoomStore;
