import { create } from 'zustand';

interface I_useCarImgStore {
  carImgStore: Record<number, number>;
  setCarImgStore: (carImgStore: Record<number, number>) => void;
}

const useCarImgStore = create<I_useCarImgStore>((set) => ({
  carImgStore: {},
  setCarImgStore: (carImgStore) => set({ carImgStore }),
}));

export default useCarImgStore;
