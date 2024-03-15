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
import AudioPopover from './AudioPopover';
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
  effect: number;
}

const VOLUME_STATE_KEY = 'volumeState';

const Header = () => {
  const initializeVolumeState = () => {
    const savedState = sessionStorage.getItem(VOLUME_STATE_KEY);
    return savedState ? JSON.parse(savedState) : { bgm: PLAY, effect: 50 };
  };

  const [volume, setVolume] = useState<I_VolumeState>(initializeVolumeState());

  const audioRef = useRef<HTMLAudioElement>(null);

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
    sessionStorage.setItem(VOLUME_STATE_KEY, JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume.effect / 100;
    }
  }, [volume.effect]);

  return (
    <header className='bg-green-100 h-[4.5rem] w-[100%] shrink-0 flex justify-between px-[4rem]'>
      <section
        onClick={() => {
          navigate('./main');
          navigate(0);
        }}
        className='h-full flex cursor-pointer'>
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
        <AudioPopover
          value={volume.effect}
          onChange={(value) => setVolume({ ...volume, effect: value })}>
          <button className='hover:bg-gray-100 size-[2rem] flex items-center justify-center'>
            <WrappedIcon
              IconComponent={
                mappedIcons.effect[volume.effect > 0 ? PLAY : PAUSE]
              }
            />
          </button>
        </AudioPopover>
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
        <div style={{ display: 'none' }}>
          {volume.bgm === PLAY ? (
            <audio
              ref={audioRef}
              src={bgmFile}
              autoPlay
              loop
            />
          ) : null}
        </div>
      </section>
    </header>
  );
};

export default Header;
