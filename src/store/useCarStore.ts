import { create } from 'zustand';

interface I_useCarImgStore {
  carImgStore: Record<number, string>;
  setCarImgStore: (carImgStore: Record<number, string>) => void;
}

const useCarImgStore = create<I_useCarImgStore>((set) => ({
  carImgStore: {},
  setCarImgStore: (carImgStore) => set({ carImgStore }),
}));

export default useCarImgStore;
