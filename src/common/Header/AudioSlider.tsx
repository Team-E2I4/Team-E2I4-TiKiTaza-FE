import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';

interface AudioSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const AudioSlider = ({ value, onChange }: AudioSliderProps) => {
  const [previousValue, setPreviousValue] = useState<number>(value);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (value !== 0 && !isMuted) {
      setPreviousValue(value);
    }
    if (value === 0 && !isMuted) {
      setIsMuted(true);
    }
  }, [value, isMuted]);

  const toggleMute = () => {
    if (!isMuted) {
      onChange(0);
      setIsMuted(true);
    } else {
      onChange(previousValue);
      setIsMuted(false);
    }
  };

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
    if (isMuted && values[0] !== 0) {
      setIsMuted(false);
    }
  };

  return (
    <form className='flex gap-4 items-center'>
      <Slider.Root
        className='flex relative items-center h-[2rem] w-[15rem]'
        defaultValue={[value]}
        max={100}
        step={1}
        onValueChange={handleValueChange}>
        <Slider.Track className=' bg-white relative grow rounded-[999rem] h-2'>
          <Slider.Range className='absolute bg-green-300 rounded-[999rem] h-full' />
        </Slider.Track>
        <Slider.Thumb
          className='block w-8 h-8 bg-white rounded-full shadow-md shadow-black/50 cursor-pointer'
          aria-label='Volume'
        />
      </Slider.Root>
      {isMuted ? (
        <SpeakerOffIcon
          onClick={toggleMute}
          className='cursor-pointer'
        />
      ) : (
        <SpeakerLoudIcon
          onClick={toggleMute}
          className='cursor-pointer'
        />
      )}
    </form>
  );
};

export default AudioSlider;
