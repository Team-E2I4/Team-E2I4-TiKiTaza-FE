import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col items-center w-100vw min-h-screen bg-beige-10'>
      {children}
    </div>
  );
};

export default Layout;
