import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgmFile from '@/assets/audio/bgm1.mp3';
import kakao from '@/assets/login/kakao-icon.svg';
import logo_car from '@/assets/logo_car.png';
import logo_taza from '@/assets/logo_taza.png';
import { PAUSE, PLAY } from '@/common/Header/constants/volume';
import { exchangeVolumeState } from '@/common/Header/utils/exchangeVolumeState';
import { useAuthCheck, useLogout } from '@/hooks/useAuth/useAuth';
import { handleKakaoLogin } from '@/utils/handleKakaoLogin';
import WrappedIcon from '../WrappedIcon/WrappedIcon';
import KakaoTooltip from './KakaoTooltip';

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
  const bgmAudioRef = useRef(new Audio(bgmFile));
  const effectAudioRef = useRef(new Audio(bgmFile));

  const navigate = useNavigate();

  const { data } = useAuthCheck();

  const { mutate: mutateLogout } = useLogout({
    onSuccess: () => {
      navigate('/');
      navigate(0);
    },
  });

  const handleLogout = () => {
    mutateLogout();
  };

  useEffect(() => {
    if (volume.bgm === PLAY) {
      bgmAudioRef.current.play();
    } else {
      bgmAudioRef.current.pause();
    }
    if (volume.effect === PLAY) {
      effectAudioRef.current.play();
    } else {
      effectAudioRef.current.pause();
    }
  }, [volume.bgm, volume.effect]);

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
          data.data.data?.isGuest ? (
            <KakaoTooltip>
              <img
                src={kakao}
                alt='Kakao logo'
                className='w-[3rem] cursor-pointer'
                onClick={handleKakaoLogin}
              />
            </KakaoTooltip>
          ) : (
            <button
              onClick={handleLogout}
              className='hover:bg-gray-100 flex items-center justify-center'>
              로그아웃
            </button> // 카카오 로그인
          )
        ) : (
          <></>
        )}
      </section>
    </header>
  );
};

export default Header;
