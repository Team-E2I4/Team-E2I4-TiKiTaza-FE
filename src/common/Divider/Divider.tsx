import { ComponentProps } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: ComponentProps<'div'>['className'];
}

const Divider = ({
  orientation = 'horizontal',
  className = '',
}: DividerProps) => {
  const orientationStyle = new Map([
    ['horizontal', `w-full h-[0.1rem] border-t-[0.1rem]`],
    ['vertical', `h-full w-[0.1rem] border-r-[0.1rem]`],
  ]);
  return (
    <div
      className={`border-black ${orientationStyle.get(orientation)} ${className}`}></div>
  );
};

export default Divider;
