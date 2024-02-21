import { create } from 'zustand';

type GameModeType = 'waiting' | 'sentence' | 'code' | 'word' | 'finish';
interface I_UseGameModeStore {
  mode: GameModeType;
  changeGameMode: (value: GameModeType) => void;
}

const useGameModeStore = create<I_UseGameModeStore>((set) => ({
  mode: 'waiting',
  changeGameMode: (value) => set({ mode: value }),
}));

export default useGameModeStore;
