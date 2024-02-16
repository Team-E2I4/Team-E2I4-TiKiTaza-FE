import * as Avatar from '@radix-ui/react-avatar';
import bgm_volume from '@/asssets/bgm_volume.svg';
import effect_volume from '@/asssets/effect_volume.svg';
import logo_car from '@/asssets/logo_car.png';
import logo_taza from '@/asssets/logo_taza.png';

const Header = () => {
  return (
    <header className='bg-green-100 h-[4.5rem] w-[100%] shrink-0 flex justify-between px-[4rem]'>
      <section className='h-full flex items-center'>
        <img
          src={logo_car}
          className='h-[70%]'
        />
        <img
          src={logo_taza}
          className='h-1/2'
        />
      </section>
      <section className='h-full flex items-center justify-around w-[15rem]'>
        <button>
          <img src={bgm_volume} />
        </button>
        <button>
          <img src={effect_volume} />
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
