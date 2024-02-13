import { ReactNode } from 'react';

const BodyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex-1 w-layout-w px-[2rem] pt-[4rem]'>
      {children}
    </div>
  );
};

export default BodyLayout;
