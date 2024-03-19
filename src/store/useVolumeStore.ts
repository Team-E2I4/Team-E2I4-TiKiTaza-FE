import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type VolumeType = 'play' | 'pause';

interface I_VolumeStore {
  volume: { bgm: VolumeType; volumeSize: number };
  setVolume: (newVolume: { bgm: VolumeType; volumeSize: number }) => void;
}
const useVolumeStore = create(
  persist<I_VolumeStore>(
    (set) => ({
      volume: { bgm: 'pause', volumeSize: 50 },
      setVolume: (newVolume) => set({ volume: newVolume }),
    }),
    {
      name: 'volume-storage', // 스토리지에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useVolumeStore;
