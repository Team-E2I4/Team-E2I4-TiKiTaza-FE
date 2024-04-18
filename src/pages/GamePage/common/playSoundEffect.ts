import { Howl } from 'howler';
import countDown from '@/assets/audio/countDown.mp3';
import soundEffect from '@/assets/audio/soundEffect.mp3';

const playSoundEffect = (type: 'SCORE' | 'COUNTDOWN') => {
  const src = type === 'SCORE' ? soundEffect : countDown;
  const sound = new Howl({
    src: [src],
  });
  return sound;
};
export default playSoundEffect;
