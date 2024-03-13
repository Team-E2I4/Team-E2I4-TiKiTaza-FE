import { create } from 'zustand';
import {
  I_AllMember,
  I_GameRoomResponse,
} from '@/pages/GamePage/types/websocketType';

interface I_UseGameWaitingRoom {
  gameRoomRes: I_GameRoomResponse | null;
  setGameRoomRes: (gameRoomRes: I_GameRoomResponse) => void;
  isWsError: boolean;
  setIsWsError: (isWsError: boolean) => void;

  didAdminStart: boolean;
  setDidAdminStart: (didAdminStart: boolean) => void;

  allMembers: I_AllMember[] | undefined;
  setAllMembers: (allMembers: I_AllMember[]) => void;
}

const useGameWaitingRoomStore = create<I_UseGameWaitingRoom>((set) => ({
  gameRoomRes: null,
  setGameRoomRes: (gameRoomRes) => set({ gameRoomRes }),
  isWsError: false,
  setIsWsError: (isWsError) => set({ isWsError }),

  didAdminStart: false,
  setDidAdminStart: (didAdminStart) => set({ didAdminStart }),

  allMembers: undefined,
  setAllMembers: (allMembers) => set({ allMembers }),
}));

export default useGameWaitingRoomStore;
