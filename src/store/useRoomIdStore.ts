import { create } from 'zustand';

interface I_RoomIdState {
  roomId: null | number;
  setRoomId: (roomId: number) => void;
}

const useRoomIdStore = create<I_RoomIdState>((set) => ({
  roomId: null,
  setRoomId: (roomId: number) => {
    set(() => ({ roomId }));
  },
}));

export default useRoomIdStore;
