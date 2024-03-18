import { create } from 'zustand';
import { VolumeType } from '@/common/Header/Header';

export interface I_VolumeStore {
  volume: { bgm: VolumeType; volumeSize: number };
  setVolume: (newVolume: { bgm: VolumeType; volumeSize: number }) => void;
}
const useVolumeStore = create<I_VolumeStore>((set) => ({
  volume: { bgm: 'pause', volumeSize: 50 },
  setVolume: (newVolume) => set({ volume: newVolume }),
}));

export default useVolumeStore;
