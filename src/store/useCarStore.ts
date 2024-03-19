import { create } from 'zustand';
import { NumberIndexSignitureType } from '@/pages/GamePage/types/ingameTypes';

interface I_useCarImgStore {
  carImgStore: NumberIndexSignitureType;
  setCarImgStore: (carImgStore: NumberIndexSignitureType) => void;
}

const useCarImgStore = create<I_useCarImgStore>((set) => ({
  carImgStore: {},
  setCarImgStore: (carImgStore) => set({ carImgStore }),
}));

export default useCarImgStore;
