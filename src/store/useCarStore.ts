import { create } from 'zustand';
import { CarImgType } from '@/pages/GamePage/types/ingameTypes';

interface I_useCarImgStore {
  carImgStore: CarImgType;
  setCarImgStore: (carImgStore: CarImgType) => void;
}

const useCarImgStore = create<I_useCarImgStore>((set) => ({
  carImgStore: {},
  setCarImgStore: (carImgStore) => set({ carImgStore }),
}));

export default useCarImgStore;
