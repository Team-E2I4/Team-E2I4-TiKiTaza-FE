import { ComponentProps } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: ComponentProps<'div'>['className'];
}

const Divider = ({ orientation = 'horizontal', className }: DividerProps) => {
  const orientationStyle = new Map([
    ['horizontal', 'h-[0.1rem]'],
    ['vertical', 'w-[0.1rem]'],
  ]);
  return (
    <div
      className={`bg-blue-100 ${className} ${orientationStyle.get(orientation)}`}></div>
  );
};

export default Divider;
