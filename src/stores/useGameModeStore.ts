import { create } from 'zustand';
import { GameModeType } from '@/types/GameModeType';

interface I_UseGameModeStore {
  mode: GameModeType;
  changeGameMode: (value: GameModeType) => void;
}

const useGameModeStore = create<I_UseGameModeStore>((set) => ({
  mode: 'waiting',
  changeGameMode: (value) => set({ mode: value }),
}));

export default useGameModeStore;
