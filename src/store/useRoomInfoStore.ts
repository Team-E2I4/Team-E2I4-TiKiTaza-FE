import { create } from 'zustand';
import { I_RoomInfo } from '@/pages/GamePage/types/websocketType';

interface I_useRoomInfo {
  roomInfo: I_RoomInfo | null;
  setRoomInfo: (roomInfo: I_RoomInfo) => void;
}

const useRoomInfoStore = create<I_useRoomInfo>((set) => ({
  roomInfo: null,
  setRoomInfo: (roomInfo: I_RoomInfo) => set({ roomInfo }),
}));

export default useRoomInfoStore;
