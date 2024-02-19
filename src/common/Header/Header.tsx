import * as Avatar from '@radix-ui/react-avatar';
import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { FC, useState } from 'react';
import logo_car from '@/assets/logo_car.png';
import logo_taza from '@/assets/logo_taza.png';

const PLAY = 'play';
const PAUSE = 'pause';

type MusicStateType = 'play' | 'pause';

const exchangeMusicState = (currentState: MusicStateType) => {
  return currentState === PLAY ? PAUSE : PLAY;
};

const Header = () => {
  const [volume, setVolume] = useState<{
    bgm: MusicStateType;
    effect: MusicStateType;
  }>({
    bgm: PAUSE,
    effect: PLAY,
  });

  const mappedIcons = {
    bgm: {
      [PLAY]: PlayIcon,
      [PAUSE]: PauseIcon,
    },
    effect: {
      [PLAY]: SpeakerLoudIcon,
      [PAUSE]: SpeakerOffIcon,
    },
  };

  interface MyIconProps extends IconProps {
    IconComponent: FC<IconProps>;
  }

  const MyIcon = ({ IconComponent, className }: MyIconProps) => (
    <IconComponent className={className} />
  );

  return (
    <header className='bg-green-100 h-[4.5rem] w-[100%] shrink-0 flex justify-between px-[4rem]'>
      <section className='h-full flex items-center cursor-pointer'>
        <img
          src={logo_car}
          className='h-[70%]'
          alt='차량 로고이미지'
        />
        <img
          src={logo_taza}
          className='h-1/2'
          alt='티키타자'
        />
      </section>
      <section className='h-full flex items-center justify-around w-[15rem]'>
        <button
          onClick={() =>
            setVolume({ ...volume, bgm: exchangeMusicState(volume.bgm) })
          }
          className='hover:bg-gray-100 size-[2rem] flex items-center justify-center'>
          <MyIcon IconComponent={mappedIcons.bgm[volume.bgm]} />
        </button>
        <button
          onClick={() =>
            setVolume({ ...volume, effect: exchangeMusicState(volume.effect) })
          }
          className='hover:bg-gray-100 size-[2rem] flex items-center justify-center'>
          <MyIcon IconComponent={mappedIcons.effect[volume.effect]} />
        </button>
        <Avatar.Root className='cursor-pointer'>
          <Avatar.Image
            className='size-[3.5rem] rounded-full'
            src='https://picsum.photos/id/237/200/300'
            alt='프로필 이미지'
          />
          <Avatar.Fallback delayMs={1000}>프로필</Avatar.Fallback>
        </Avatar.Root>
      </section>
    </header>
  );
};

export default Header;
