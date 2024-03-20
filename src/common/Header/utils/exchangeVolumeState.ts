import { PAUSE, PLAY } from '@/common/Header/constants/volume';
import { VolumeType } from '@/store/useVolumeStore';

export const exchangeVolumeState = (currentState: VolumeType) => {
  return currentState === PLAY ? PAUSE : PLAY;
};
