export const SOUND_SCORE = 'SCORE';
export const SOUND_COUNTDOWN = 'COUNTDOWN';
type SoundEffectType = typeof SOUND_SCORE | typeof SOUND_COUNTDOWN;

const mappedSoundFiles: Record<SoundEffectType, () => Promise<string>> = {
  SCORE: () =>
    import('@/assets/audio/soundEffect.mp3').then((module) => module.default),
  COUNTDOWN: () =>
    import('@/assets/audio/countDown.mp3').then((module) => module.default),
};

const playSoundEffect = async (type: SoundEffectType) => {
  const src = await mappedSoundFiles[type]();
  const audio = new Audio(src);
  return audio;
};
export default playSoundEffect;
