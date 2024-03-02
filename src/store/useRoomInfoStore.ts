import { create } from 'zustand';
import { I_RoomInfo } from '@/pages/GamePage/types/websocketType';

interface I_useRoomState {
  roomId: null | number;
  roomInfo: I_RoomInfo | null;
  setRoomId: (roomId: number) => void;
  setRoomInfo: (roomInfo: I_RoomInfo) => void;
}

const useRoomInfoStore = create<I_useRoomState>((set) => ({
  roomId: null,
  roomInfo: null,
  setRoomId: (roomId: number) => set({ roomId }),
  setRoomInfo: (roomInfo: I_RoomInfo) => set({ roomInfo }),
}));

export default useRoomInfoStore;
