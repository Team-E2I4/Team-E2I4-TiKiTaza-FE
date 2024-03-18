import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from '@radix-ui/react-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgmFile from '@/assets/audio/bgm1.mp3';
import kakao from '@/assets/login/kakao-icon.svg';
import logo_car from '@/assets/logo/logo_car.png';
import logo_taza from '@/assets/logo/logo_taza.png';
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
    [PLAY]: PauseIcon,
    [PAUSE]: PlayIcon,
  },
  volumeSize: {
    [PLAY]: SpeakerLoudIcon,
    [PAUSE]: SpeakerOffIcon,
  },
};
interface I_VolumeState {
  bgm: VolumeType;
  volumeSize: number;
}

const VOLUME_STATE_KEY = 'volumeState';

const Header = () => {
  const initializeVolumeState = () => {
    const savedState = sessionStorage.getItem(VOLUME_STATE_KEY);
    return savedState ? JSON.parse(savedState) : { bgm: PLAY, volumeSize: 50 };
  };

  const [volume, setVolume] = useState<I_VolumeState>(initializeVolumeState());

  const audioRef = useRef<HTMLAudioElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isGameRoute = pathname === '/game';

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

  const onNavigateToMain = useCallback(() => {
    if (isGameRoute) {
      return;
    }
    navigate('/main', { replace: true });
    navigate(0);
  }, [isGameRoute]);

  useEffect(() => {
    sessionStorage.setItem(VOLUME_STATE_KEY, JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume.volumeSize / 100;
      if (volume.bgm === PLAY) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume.volumeSize, volume.bgm]);

  return (
    <header className='h-[4.5rem] w-[100%] shrink-0 flex justify-between px-[4rem]'>
      <section
        onClick={onNavigateToMain}
        className='flex cursor-pointer items-center'>
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
      <section className='h-full flex items-center justify-around w-[20rem]'>
        <button
          onClick={() =>
            setVolume({ ...volume, bgm: exchangeVolumeState(volume.bgm) })
          }
          className={`bg-beige-10 hover:shadow-hover flex items-center justify-center p-[1.2rem] rounded-[1rem] transition-all duration-300 ${volume.bgm === 'play' ? 'shadow-default' : 'shadow-hover'}`}>
          <WrappedIcon IconComponent={mappedIcons.bgm[volume.bgm]} />
        </button>
        <AudioPopover
          value={volume.volumeSize}
          onChange={(value) => setVolume({ ...volume, volumeSize: value })}>
          <button
            className={`bg-beige-10 hover:shadow-hover flex items-center justify-center p-[1.2rem] rounded-[1rem] transition-all duration-300`}>
            <WrappedIcon
              IconComponent={
                mappedIcons.volumeSize[volume.volumeSize > 0 ? PLAY : PAUSE]
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
