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
          className='PopoverContent'
          sideOffset={5}>
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
