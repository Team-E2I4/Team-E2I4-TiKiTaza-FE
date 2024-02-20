import { VolumeType } from '@/common/Header/Header';
import { PAUSE, PLAY } from '@/constants/volume';

export const exchangeVolumeState = (currentState: VolumeType) => {
  return currentState === PLAY ? PAUSE : PLAY;
};
