import { PAUSE, PLAY } from '@/common/Header/constants/volume';
import { VolumeType } from '@/common/Header/Header';

export const exchangeVolumeState = (currentState: VolumeType) => {
  return currentState === PLAY ? PAUSE : PLAY;
};
