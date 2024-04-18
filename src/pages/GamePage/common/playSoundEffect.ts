import { Howl } from 'howler';
import soundEffect from '@/assets/audio/soundEffect.mp3';

const playSoundEffect = () => {
  const sound = new Howl({
    src: [soundEffect],
  });
  return sound;
};
export default playSoundEffect;
