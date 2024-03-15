import { ReactNode } from 'react';
import backgroundFlag from '@/assets/backgroundFlag.jpeg';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col items-center w-100vw min-h-screen'>
      <img
        src={backgroundFlag}
        className='absolute w-full opacity-[0.1] z-[-1] h-screen'
      />
      {children}
    </div>
  );
};

export default Layout;
