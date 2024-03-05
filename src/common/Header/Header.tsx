import * as Avatar from '@radix-ui/react-avatar';
import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_car from '@/assets/logo_car.png';
import logo_taza from '@/assets/logo_taza.png';
import { PAUSE, PLAY } from '@/common/Header/constants/volume';
import { exchangeVolumeState } from '@/common/Header/utils/exchangeVolumeState';
import { useAuthCheck } from '@/hooks/useAuth';
import WrappedIcon from '../WrappedIcon/WrappedIcon';

export type VolumeType = 'play' | 'pause';

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
interface I_VolumeState {
  bgm: VolumeType;
  effect: VolumeType;
}

const Header = () => {
  const [volume, setVolume] = useState<I_VolumeState>({
    bgm: PAUSE,
    effect: PAUSE,
  });
  const navigate = useNavigate();

  const { data } = useAuthCheck();

  return (
    <header className='bg-green-100 h-[4.5rem] w-[100%] shrink-0 flex justify-between px-[4rem]'>
      <section
        onClick={() => {
          navigate('./main');
          navigate(0);
        }}
        className='h-full flex items-center cursor-pointer'>
        <img
          src={logo_car}
          className='h-[70%]'
          alt='차량 로고이미지'
        />
        <img
          src={logo_taza}
          className='h-4/6'
          alt='티키타자'
        />
      </section>
      <section className='h-full flex items-center justify-around w-[15rem]'>
        <button
          onClick={() =>
            setVolume({ ...volume, bgm: exchangeVolumeState(volume.bgm) })
          }
          className='hover:bg-gray-100 size-[2rem] flex items-center justify-center'>
          <WrappedIcon IconComponent={mappedIcons.bgm[volume.bgm]} />
        </button>
        <button
          onClick={() =>
            setVolume({ ...volume, effect: exchangeVolumeState(volume.effect) })
          }
          className='hover:bg-gray-100 size-[2rem] flex items-center justify-center'>
          <WrappedIcon IconComponent={mappedIcons.effect[volume.effect]} />
        </button>
        {data ? (
          <Avatar.Root className='cursor-pointer'>
            <Avatar.Image
              className='size-[3.5rem] rounded-full'
              src='https://picsum.photos/id/237/200/300'
              alt='프로필 이미지'
            />
            <Avatar.Fallback delayMs={1000}>프로필</Avatar.Fallback>
          </Avatar.Root>
        ) : (
          <button
            onClick={() => {
              navigate('/login');
              navigate(0);
            }}
            className='hover:bg-gray-100 flex items-center justify-center'>
            로그인
          </button>
        )}
      </section>
    </header>
  );
};

export default Header;
