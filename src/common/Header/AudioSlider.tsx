import * as Slider from '@radix-ui/react-slider';
import * as Tooltip from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';

interface AudioSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const AudioSlider = forwardRef<HTMLFormElement, AudioSliderProps>(
  ({ value, onChange }) => {
    return (
      <form>
        <Slider.Root
          className='flex relative items-center h-[2rem] w-[15rem]'
          defaultValue={[value]}
          max={100}
          step={1}
          onValueChange={(values) => onChange(values[0])}>
          <Slider.Track className=' bg-white relative grow rounded-[999rem] h-2'>
            <Slider.Range className='absolute bg-green-300 rounded-[999rem] h-full' />
          </Slider.Track>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Slider.Thumb
                  className='block w-8 h-8 bg-white rounded-full shadow-md shadow-black/50'
                  aria-label='Volume'
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className='bg-white p-2 rounded-md shadow-md shadow-black/50 flex items-center justify-center gap-2'
                  side='bottom'
                  sideOffset={8}>
                  {value}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Slider.Root>
      </form>
    );
  }
);

AudioSlider.displayName = 'AudioSlider';

export default AudioSlider;
