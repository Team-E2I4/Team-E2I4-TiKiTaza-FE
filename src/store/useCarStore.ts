import { create } from 'zustand';
import { NumberIndexSignatureType } from '@/types/indexSignatureType';

interface I_useCarImgStore {
  carImgStore: NumberIndexSignatureType;
  setCarImgStore: (carImgStore: NumberIndexSignatureType) => void;
}

const useCarImgStore = create<I_useCarImgStore>((set) => ({
  carImgStore: {},
  setCarImgStore: (carImgStore) => set({ carImgStore }),
}));

export default useCarImgStore;
