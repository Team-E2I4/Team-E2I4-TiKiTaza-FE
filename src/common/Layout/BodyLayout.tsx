import { ReactNode } from 'react';

const BodyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-layout-w h-[68.5rem] box-content px-[2rem] py-[2rem] mt-[1rem] flex flex-col bg-bodyLayoutBgColor rounded-[1rem]'>
      {children}
    </div>
  );
};

export default BodyLayout;
