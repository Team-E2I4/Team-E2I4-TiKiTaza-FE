import * as Popover from '@radix-ui/react-popover';
import AudioSlider from './AudioSlider';

interface AudioPopoverProps {
  children: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
}

const AudioPopover = ({ children, value, onChange }: AudioPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='rounded-[1rem] border-green-70 border-[0.3rem] flex p-2 bg-white '
          sideOffset={8}>
          <AudioSlider
            value={value}
            onChange={onChange}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AudioPopover;
